/**
 * Loader for legal documents. Reads from the repo-root `working/legal/`
 * directory so the canonical source stays with the rest of the legal
 * drafts (and travels with self-host forks).
 */
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Runtime: build/server/chunks/ → ../../../working/legal = /app/working/legal
const LEGAL_ROOT = resolve(__dirname, '../../../working/legal');

export type LegalSlug = 'privacy' | 'terms';

const PAGE_META: Record<LegalSlug, { title: string; description: string }> = {
	privacy: {
		title: 'Privacy Policy',
		description:
			'How Wagmi Labs collects, uses, and protects information when you use Sigil Auth apps, the relay service, and the website.'
	},
	terms: {
		title: 'Terms of Service',
		description:
			'Terms governing your use of Sigil Auth mobile apps, desktop apps, the push relay service, and the website.'
	}
};

export interface LegalDoc {
	slug: LegalSlug;
	title: string;
	description: string;
	body: string;
}

export async function loadLegalDoc(slug: LegalSlug): Promise<LegalDoc | null> {
	if (slug !== 'privacy' && slug !== 'terms') return null;
	try {
		const body = await readFile(resolve(LEGAL_ROOT, `${slug}.md`), 'utf-8');
		// Render as-is: the canonical copy (Effective/Last-Updated/Contact/Operator,
		// including ACN TBD placeholder Kaity needs to review) stays in the prose.
		// The .prose `h1 { display: none }` rule in prose.css suppresses the duplicate
		// H1; the page chrome supplies a visible title and date strip above.
		return { slug, body, ...PAGE_META[slug] };
	} catch {
		return null;
	}
}
