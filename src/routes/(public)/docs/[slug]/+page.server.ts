import { error } from '@sveltejs/kit';
import { loadDoc } from '$lib/server/docs';
import { parseMarkdown } from '$lib/server/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const doc = await loadDoc(params.slug);
	if (!doc) throw error(404, 'Doc not found');

	const { html, headings } = await parseMarkdown(doc.body);

	return {
		slug: doc.slug,
		title: doc.title,
		description: doc.description,
		difficulty: doc.difficulty ?? null,
		tags: doc.tags ?? [],
		publishedAt: doc.publishedAt ?? null,
		html,
		headings
	};
};
