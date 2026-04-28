type ServiceStatus = {
	name: string;
	url: string;
	status: 'ok' | 'degraded' | 'down';
	responseTime: number | null;
	version?: string;
	error?: string;
};

type AvailabilityPill = {
	timestamp: number;
	status: 'green' | 'yellow' | 'orange' | 'red' | 'grey';
	avgLatencyMs: number | null;
	p95LatencyMs: number | null;
	lossRate: number | null;
};

type LiveStats = {
	status: 'green' | 'yellow' | 'orange' | 'red' | 'grey';
	avgLatencyMs: number | null;
	p95LatencyMs: number | null;
	lossRate: number | null;
};

async function checkHealth(
	name: string,
	url: string,
	timeoutMs: number = 2500
): Promise<ServiceStatus> {
	const start = performance.now();

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

		const response = await fetch(url, {
			signal: controller.signal,
			headers: { 'User-Agent': 'SigilAuth-Status/1.0' }
		});

		clearTimeout(timeoutId);
		const responseTime = performance.now() - start;

		if (!response.ok) {
			return {
				name,
				url,
				status: 'down',
				responseTime,
				error: `HTTP ${response.status}`
			};
		}

		let data: any;
		try {
			data = await response.json();
		} catch {
			data = {};
		}

		return {
			name,
			url,
			status: 'ok',
			responseTime,
			version: data.version
		};
	} catch (error: any) {
		const responseTime = performance.now() - start;

		if (error.name === 'AbortError') {
			return {
				name,
				url,
				status: 'down',
				responseTime: null,
				error: 'Timeout'
			};
		}

		return {
			name,
			url,
			status: 'down',
			responseTime,
			error: error.message || 'Connection failed'
		};
	}
}

async function queryPrometheus(query: string, start: number, end: number, step: number) {
	const PROM_URL = 'http://10.79.0.9:9090/api/v1/query_range';
	const url = `${PROM_URL}?query=${encodeURIComponent(query)}&start=${start}&end=${end}&step=${step}`;

	try {
		const response = await fetch(url, {
			signal: AbortSignal.timeout(5000),
			headers: { 'User-Agent': 'SigilAuth-Status/1.0' }
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		if (data.status !== 'success' || !data.data?.result?.[0]?.values) {
			return null;
		}

		return data.data.result[0].values as [number, string][];
	} catch (error) {
		return null;
	}
}

async function queryPrometheusInstant(query: string): Promise<number | null> {
	const PROM_URL = 'http://10.79.0.9:9090/api/v1/query';
	const url = `${PROM_URL}?query=${encodeURIComponent(query)}`;

	try {
		const response = await fetch(url, {
			signal: AbortSignal.timeout(5000),
			headers: { 'User-Agent': 'SigilAuth-Status/1.0' }
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		if (data.status !== 'success' || !data.data?.result?.[0]?.value?.[1]) {
			return null;
		}

		const value = parseFloat(data.data.result[0].value[1]);
		return isNaN(value) ? null : value;
	} catch (error) {
		return null;
	}
}

function calculatePillColor(p95Ms: number | null, lossRate: number | null): AvailabilityPill['status'] {
	const loss = lossRate ?? 0;
	if (p95Ms === null || isNaN(p95Ms) || isNaN(loss)) {
		return 'grey';
	}

	if (p95Ms > 3000 || loss > 0.25) return 'red';
	if (p95Ms > 1000 || loss > 0.05) return 'orange';
	if (p95Ms > 200 || loss > 0) return 'yellow';
	return 'green';
}

async function queryLiveStats(): Promise<LiveStats> {
	const p95Query = `histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket{job="sigil-relay"}[60m])))`;
	const avgQuery = `sum(rate(http_request_duration_seconds_sum{job="sigil-relay"}[60m])) / sum(rate(http_request_duration_seconds_count{job="sigil-relay"}[60m]))`;
	const lossQuery = `sum(rate(http_request_duration_seconds_count{job="sigil-relay",status=~"5.."}[60m])) / sum(rate(http_request_duration_seconds_count{job="sigil-relay"}[60m]))`;

	const [p95, avg, loss] = await Promise.all([
		queryPrometheusInstant(p95Query),
		queryPrometheusInstant(avgQuery),
		queryPrometheusInstant(lossQuery)
	]);

	const p95Ms = p95 !== null ? p95 * 1000 : null;
	const avgMs = avg !== null ? avg * 1000 : null;

	return {
		status: calculatePillColor(p95Ms, loss),
		p95LatencyMs: p95Ms,
		avgLatencyMs: avgMs,
		lossRate: loss
	};
}

async function queryRelayAvailability(): Promise<AvailabilityPill[]> {
	const now = Math.floor(Date.now() / 1000);
	const currentHourStart = Math.floor(now / 3600) * 3600;
	const latestBucket = currentHourStart - 3600;
	const step = 3600;
	const start = latestBucket - (47 * 3600);

	const p95Query = `histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket{job="sigil-relay"}[1h])))`;
	const avgQuery = `sum(rate(http_request_duration_seconds_sum{job="sigil-relay"}[1h])) / sum(rate(http_request_duration_seconds_count{job="sigil-relay"}[1h]))`;
	const lossQuery = `sum(rate(http_request_duration_seconds_count{job="sigil-relay",status=~"5.."}[1h])) / sum(rate(http_request_duration_seconds_count{job="sigil-relay"}[1h]))`;

	const [p95Data, avgData, lossData] = await Promise.all([
		queryPrometheus(p95Query, start, latestBucket, step),
		queryPrometheus(avgQuery, start, latestBucket, step),
		queryPrometheus(lossQuery, start, latestBucket, step)
	]);

	const dataByTimestamp = new Map<number, { p95?: number; avg?: number; loss?: number }>();

	if (p95Data) {
		for (const [ts, value] of p95Data) {
			const v = parseFloat(value);
			if (!dataByTimestamp.has(ts)) dataByTimestamp.set(ts, {});
			dataByTimestamp.get(ts)!.p95 = isNaN(v) ? undefined : v * 1000;
		}
	}

	if (avgData) {
		for (const [ts, value] of avgData) {
			const v = parseFloat(value);
			if (!dataByTimestamp.has(ts)) dataByTimestamp.set(ts, {});
			dataByTimestamp.get(ts)!.avg = isNaN(v) ? undefined : v * 1000;
		}
	}

	if (lossData) {
		for (const [ts, value] of lossData) {
			const v = parseFloat(value);
			if (!dataByTimestamp.has(ts)) dataByTimestamp.set(ts, {});
			dataByTimestamp.get(ts)!.loss = isNaN(v) ? undefined : v;
		}
	}

	const pills: AvailabilityPill[] = [];
	for (let i = 0; i < 48; i++) {
		const bucketStart = latestBucket - ((47 - i) * 3600);
		const metrics = dataByTimestamp.get(bucketStart);

		const p95Ms = metrics?.p95 ?? null;
		const avgMs = metrics?.avg ?? null;
		const loss = metrics?.loss ?? null;

		pills.push({
			timestamp: bucketStart,
			status: calculatePillColor(p95Ms, loss),
			p95LatencyMs: p95Ms,
			avgLatencyMs: avgMs,
			lossRate: loss
		});
	}

	return pills;
}

export async function load() {
	const services = [
		{
			name: 'Push Relay',
			url: 'http://relay.sigil.svc.cluster.local:8080/health'
		}
	];

	const [results, availability, liveStats] = await Promise.all([
		Promise.all(services.map((s) => checkHealth(s.name, s.url))),
		queryRelayAvailability(),
		queryLiveStats()
	]);

	const overall =
		results.every((r) => r.status === 'ok')
			? 'ok'
			: results.some((r) => r.status === 'ok')
				? 'degraded'
				: 'down';

	return {
		services: results,
		overall,
		checkedAt: new Date().toISOString(),
		availability,
		liveStats
	};
}
