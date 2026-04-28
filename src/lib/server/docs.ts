/**
 * Doc discovery + frontmatter parsing. Reads markdown files from the repo's
 * top-level `docs/` folder (one level up from the web/ package).
 */
import { readFile, readdir, access } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try multiple paths for docs folder to support both monorepo and standalone deployment
async function findDocsRoot(): Promise<string> {
	const candidates = [
		resolve(__dirname, '../../../../docs'), // Monorepo: src/lib/server → ../../../../docs
		resolve(__dirname, '../../../docs'), // Standalone: src/lib/server → ../../../docs (copied into web root)
		'/app/docs' // Docker: absolute path if mounted/copied
	];

	for (const candidate of candidates) {
		try {
			await access(candidate);
			return candidate;
		} catch {
			continue;
		}
	}

	throw new Error(
		`Docs folder not found. Tried: ${candidates.join(', ')}. Ensure docs are copied into the build context.`
	);
}

const DOCS_ROOT = await findDocsRoot();

/** Docs that are internal-only and must not render as public pages. */
const EXCLUDED_SLUGS = new Set(['quarantined-tests']);

export interface DocMeta {
	slug: string;
	title: string;
	description: string;
	difficulty?: 'beginner' | 'intermediate' | 'advanced' | string;
	tags?: string[];
	publishedAt?: string;
}

export interface DocContent extends DocMeta {
	body: string;
}

export async function listDocs(): Promise<DocMeta[]> {
	const entries = await readdir(DOCS_ROOT, { withFileTypes: true });
	const docs: DocMeta[] = [];

	for (const entry of entries) {
		if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
		const slug = entry.name.replace(/\.md$/, '');
		if (EXCLUDED_SLUGS.has(slug)) continue;

		const filepath = join(DOCS_ROOT, entry.name);
		const raw = await readFile(filepath, 'utf-8');
		const parsed = matter(raw);

		if (!parsed.data.title) continue; // skip docs without frontmatter (internal)

		docs.push({
			slug,
			title: String(parsed.data.title),
			description: String(parsed.data.description ?? ''),
			difficulty: parsed.data.difficulty,
			tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : undefined,
			publishedAt: parsed.data.publishedAt ? String(parsed.data.publishedAt) : undefined
		});
	}

	// Stable ordering: beginner → intermediate → advanced, then alphabetical by title
	const rank = (d: DocMeta) =>
		({ beginner: 0, intermediate: 1, advanced: 2 } as Record<string, number>)[d.difficulty ?? ''] ??
		99;
	docs.sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title));
	return docs;
}

export async function loadDoc(slug: string): Promise<DocContent | null> {
	if (EXCLUDED_SLUGS.has(slug)) return null;
	if (!/^[a-z0-9-]+$/.test(slug)) return null; // path-traversal guard

	const filepath = join(DOCS_ROOT, `${slug}.md`);
	let raw: string;
	try {
		raw = await readFile(filepath, 'utf-8');
	} catch {
		return null;
	}

	const parsed = matter(raw);
	if (!parsed.data.title) return null;

	return {
		slug,
		title: String(parsed.data.title),
		description: String(parsed.data.description ?? ''),
		difficulty: parsed.data.difficulty,
		tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : undefined,
		publishedAt: parsed.data.publishedAt ? String(parsed.data.publishedAt) : undefined,
		body: parsed.content
	};
}
