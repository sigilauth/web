// @ts-nocheck
import { error } from '@sveltejs/kit';
import { loadLegalDoc } from '$lib/server/legal';
import { parseMarkdown } from '$lib/server/markdown';
import type { PageServerLoad } from './$types';

export const load = async () => {
	const doc = await loadLegalDoc('privacy');
	if (!doc) throw error(500, 'Privacy policy source missing');

	const { html, headings } = await parseMarkdown(doc.body);

	return {
		slug: doc.slug,
		title: doc.title,
		description: doc.description,
		html,
		headings
	};
};
;null as any as PageServerLoad;