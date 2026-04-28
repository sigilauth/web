<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatTime(ms: number | null): string {
		if (ms === null) return '—';
		if (ms < 1000) {
			return ms < 1 ? `${ms.toFixed(2)}ms` : `${Math.round(ms)}ms`;
		}
		return `${(ms / 1000).toFixed(2)}s`;
	}

	function formatTimestamp(iso: string): string {
		const date = new Date(iso);
		return date.toLocaleString('en-AU', {
			timeZone: 'Australia/Brisbane',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
	}

	function formatPillTime(timestamp: number): string {
		const aligned = Math.floor(timestamp / 3600) * 3600;
		const date = new Date(aligned * 1000);
		return date.toLocaleString('en-AU', {
			timeZone: 'Australia/Brisbane',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	function formatPillTooltip(
		timestamp: number,
		avgMs: number | null,
		p95Ms: number | null,
		loss: number | null
	): string {
		const time = formatPillTime(timestamp);
		const avg = avgMs !== null ? `${avgMs.toFixed(2)}ms` : '—';
		const p95 = p95Ms !== null ? `${p95Ms.toFixed(0)}ms` : '—';
		const lossPercent = loss !== null ? `${(loss * 100).toFixed(1)}%` : p95Ms !== null ? '0.0%' : '—';
		return `${time}\nAvg: ${avg}\np95: ${p95}\nLoss: ${lossPercent}`;
	}
</script>

<svelte:head>
	<title>Service Status — Sigil Auth</title>
	<meta
		name="description"
		content="Real-time service status for Sigil Auth authentication services."
	/>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="status">
	<div class="wrap">
		<div class="status__head">
			<h1>Service Status</h1>
			<p class="status__sub">
				Real-time health checks for Sigil Auth services. This page is server-rendered — refresh to
				update.
			</p>
		</div>

		<div class="status__overall" aria-live="polite" role="status">
			<div class="status__overall-inner">
				<span class="status__overall-label">Overall Status</span>
				<div class="status__overall-pill status__overall-pill--{data.overall}">
					<span class="status__dot"></span>
					<span class="status__text">{data.overall === 'ok' ? 'All Systems Operational' : data.overall === 'degraded' ? 'Partial Outage' : 'Service Disruption'}</span>
				</div>
			</div>
			<div class="status__checked">
				Checked at {formatTimestamp(data.checkedAt)} AEST
			</div>
		</div>

		<div class="services" role="region" aria-label="Individual service status">
			{#each data.services as service}
				<article class="service service--{service.status}">
					<div class="service__header">
						<h2 class="service__name">{service.name}</h2>
						<div class="service__pill">
							<span class="service__dot"></span>
							<span class="service__status-text">
								{service.status === 'ok' ? 'Operational' : service.status === 'degraded' ? 'Degraded' : 'Down'}
							</span>
						</div>
					</div>

					<div class="service__meta">
						{#if service.responseTime !== null}
							<div class="service__metric">
								<span class="service__metric-label">Response Time</span>
								<span class="service__metric-value">{formatTime(service.responseTime)}</span>
							</div>
						{/if}

						{#if service.version}
							<div class="service__metric">
								<span class="service__metric-label">Version</span>
								<span class="service__metric-value">{service.version}</span>
							</div>
						{/if}

						{#if service.error}
							<div class="service__metric service__metric--error">
								<span class="service__metric-label">Error</span>
								<span class="service__metric-value">{service.error}</span>
							</div>
						{/if}

						{#if service.name === 'Push Relay' && data.liveStats}
							<div class="service__metric service__metric--live">
								<span class="service__metric-label">Last 60 minutes</span>
								<div class="live-stats">
									<div class="live-stats__pill pill--{data.liveStats.status}"></div>
									<div class="live-stats__values">
										{#if data.liveStats.avgLatencyMs !== null}
											<span
												>Avg:
												<abbr
													class="info-icon"
													title="Average request duration"
													aria-label="Average request duration"
													tabindex="0">ⓘ</abbr
												>
												{data.liveStats.avgLatencyMs.toFixed(2)}ms</span
											>
										{:else}
											<span>Avg: —</span>
										{/if}
										{#if data.liveStats.p95LatencyMs !== null}
											<span
												>p95:
												<abbr
													class="info-icon"
													title="95% of queries process faster than {data.liveStats.p95LatencyMs.toFixed(
														0
													)}ms"
													aria-label="95% of queries process faster than {data.liveStats.p95LatencyMs.toFixed(
														0
													)}ms"
													tabindex="0">ⓘ</abbr
												>
												{data.liveStats.p95LatencyMs.toFixed(0)}ms</span
											>
										{:else}
											<span>p95: —</span>
										{/if}
										{#if data.liveStats.lossRate !== null}
											<span
												>Loss:
												<abbr
													class="info-icon"
													title="Failed requests (5xx errors) as % of total"
													aria-label="Failed requests (5xx errors) as % of total"
													tabindex="0">ⓘ</abbr
												>
												{(data.liveStats.lossRate * 100).toFixed(1)}%</span
											>
										{:else if data.liveStats.p95LatencyMs !== null}
											<span
												>Loss:
												<abbr
													class="info-icon"
													title="Failed requests (5xx errors) as % of total"
													aria-label="Failed requests (5xx errors) as % of total"
													tabindex="0">ⓘ</abbr
												>
												0.0%</span
											>
										{:else}
											<span>Loss: —</span>
										{/if}
									</div>
								</div>
							</div>
						{/if}
					</div>

					{#if service.name === 'Push Relay' && data.availability}
						<div class="availability">
							<div class="availability__header">
								<span class="availability__label">Previous 48 Hours</span>
								<span class="availability__meta">{data.availability.length} × 1h buckets</span>
							</div>
							<div class="availability__grid" role="img" aria-label="48-hour availability history">
								{#each data.availability as pill}
									<div
										class="availability__pill pill--{pill.status}"
										title={formatPillTooltip(
											pill.timestamp,
											pill.avgLatencyMs,
											pill.p95LatencyMs,
											pill.lossRate
										)}
										role="presentation"
									></div>
								{/each}
							</div>
						</div>
					{/if}
				</article>
			{/each}
		</div>

		<div class="status__note">
			<p>
				<strong>Note:</strong> This is a server-side rendered status page. Health checks are performed
				when you load this page. Refresh the page to see updated status.
			</p>
		</div>
	</div>
</section>

<style>
	.wrap {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 0 var(--s6);
	}

	.status {
		padding: var(--s16) 0 var(--s24);
	}

	.status__head {
		margin-bottom: var(--s10);
	}

	.status__head h1 {
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin-bottom: var(--s3);
	}

	.status__sub {
		font-size: 1.0625rem;
		color: var(--text-muted);
		line-height: 1.6;
		max-width: 600px;
	}

	.status__overall {
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		padding: var(--s8);
		margin-bottom: var(--s8);
	}

	.status__overall-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--s4);
		margin-bottom: var(--s3);
	}

	.status__overall-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-dim);
	}

	.status__overall-pill {
		display: inline-flex;
		align-items: center;
		gap: var(--s2);
		padding: var(--s2) var(--s4);
		border-radius: 999px;
		font-size: 0.9375rem;
		font-weight: 500;
		border: 1px solid;
	}

	.status__overall-pill--ok {
		background: rgba(0, 230, 118, 0.08);
		border-color: var(--success);
		color: var(--success);
	}

	.status__overall-pill--degraded {
		background: rgba(255, 179, 0, 0.08);
		border-color: var(--warning);
		color: var(--warning);
	}

	.status__overall-pill--down {
		background: rgba(255, 90, 90, 0.08);
		border-color: var(--danger);
		color: var(--danger);
	}

	.status__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.status__overall-pill--ok .status__dot {
		background: var(--success);
		box-shadow: 0 0 8px var(--success);
		animation: pulse 2s ease-in-out infinite;
	}

	.status__overall-pill--degraded .status__dot {
		background: var(--warning);
	}

	.status__overall-pill--down .status__dot {
		background: var(--danger);
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.status__checked {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
	}

	.services {
		display: flex;
		flex-direction: column;
		gap: var(--s4);
		margin-bottom: var(--s10);
	}

	.service {
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-md);
		padding: var(--s6);
		position: relative;
	}

	.service::before {
		content: '';
		position: absolute;
		left: 0;
		top: var(--s3);
		bottom: var(--s3);
		width: 3px;
		border-radius: 0 2px 2px 0;
	}

	.service--ok::before {
		background: var(--success);
		box-shadow: 0 0 8px rgba(0, 230, 118, 0.3);
	}

	.service--degraded::before {
		background: var(--warning);
	}

	.service--down::before {
		background: var(--danger);
	}

	.service__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--s4);
		margin-bottom: var(--s4);
	}

	.service__name {
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.service__pill {
		display: inline-flex;
		align-items: center;
		gap: var(--s2);
		padding: var(--s1) var(--s3);
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border: 1px solid;
	}

	.service--ok .service__pill {
		background: rgba(0, 230, 118, 0.08);
		border-color: var(--success);
		color: var(--success);
	}

	.service--degraded .service__pill {
		background: rgba(255, 179, 0, 0.08);
		border-color: var(--warning);
		color: var(--warning);
	}

	.service--down .service__pill {
		background: rgba(255, 90, 90, 0.08);
		border-color: var(--danger);
		color: var(--danger);
	}

	.service__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.service--ok .service__dot {
		background: var(--success);
	}

	.service--degraded .service__dot {
		background: var(--warning);
	}

	.service--down .service__dot {
		background: var(--danger);
	}

	.service__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s6);
		padding-top: var(--s4);
		border-top: 1px solid var(--border);
	}

	.service__metric {
		display: flex;
		flex-direction: column;
		gap: var(--s1);
	}

	.service__metric-label {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-dim);
	}

	.service__metric-value {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--text);
	}

	.service__metric--error .service__metric-value {
		color: var(--danger);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
	}

	.service__metric--live {
		flex: 1 0 100%;
	}

	.live-stats {
		display: flex;
		align-items: center;
		gap: var(--s3);
		margin-top: var(--s2);
	}

	.live-stats__pill {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.live-stats__pill.pill--green {
		background: var(--success);
	}

	.live-stats__pill.pill--yellow {
		background: var(--warning);
	}

	.live-stats__pill.pill--orange {
		background: #ff8c42;
	}

	.live-stats__pill.pill--red {
		background: var(--danger);
	}

	.live-stats__pill.pill--grey {
		background: var(--border);
		opacity: 0.4;
	}

	.live-stats__values {
		display: flex;
		gap: var(--s4);
		font-size: 0.875rem;
		color: var(--text);
	}

	.live-stats__values span {
		font-family: var(--font-mono);
	}

	.info-icon {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--text-muted);
		text-decoration: none;
		cursor: help;
		opacity: 0.7;
		margin-left: 0.25em;
		transition: opacity var(--t-fast);
	}

	.info-icon:hover,
	.info-icon:focus {
		opacity: 1;
	}

	.availability {
		margin-top: var(--s6);
		padding-top: var(--s6);
		border-top: 1px solid var(--border);
	}

	.availability__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--s4);
		margin-bottom: var(--s4);
	}

	.availability__label {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-dim);
	}

	.availability__meta {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.availability__grid {
		display: flex;
		width: 100%;
		gap: 3px;
	}

	.availability__pill {
		flex: 1;
		height: 32px;
		border-radius: 2px;
		transition: transform var(--t-fast);
		cursor: help;
	}

	.pill {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 2px;
		transition: transform var(--t-fast);
		cursor: help;
	}

	.pill:hover {
		transform: scale(1.4);
		z-index: var(--z-dropdown);
		box-shadow: 0 0 8px currentColor;
	}

	.pill--green {
		background: var(--success);
	}

	.pill--yellow {
		background: var(--warning);
	}

	.pill--orange {
		background: #ff8c42;
	}

	.pill--red {
		background: var(--danger);
	}

	.pill--grey {
		background: var(--border);
		opacity: 0.4;
	}

	.status__note {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--r-md);
		padding: var(--s5);
	}

	.status__note p {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.status__note strong {
		color: var(--text);
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.status__overall-inner {
			flex-direction: column;
			align-items: flex-start;
		}

		.service__header {
			flex-direction: column;
			align-items: flex-start;
		}

		.service__meta {
			gap: var(--s4);
		}
	}
</style>
