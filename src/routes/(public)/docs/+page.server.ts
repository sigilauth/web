import { listDocs } from '$lib/server/docs';

export async function load() {
	const docs = await listDocs();
	return { docs };
}
