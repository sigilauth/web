/**
 * Server-side markdown parser for docs pages.
 * Parses .md → HTML with syntax-highlighted code blocks (Shiki) and anchor links
 * on headings. Rewrites internal `./*.md` links → `/docs/slug` SvelteKit routes.
 */
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import Shiki from '@shikijs/markdown-it';

export interface Heading {
	level: number;
	text: string;
	slug: string;
}

export interface ParsedDoc {
	html: string;
	headings: Heading[];
}

let mdPromise: Promise<MarkdownIt> | null = null;

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

async function getMd(): Promise<MarkdownIt> {
	if (mdPromise) return mdPromise;
	mdPromise = (async () => {
		const md = MarkdownIt({
			html: false,
			linkify: true,
			typographer: true,
			breaks: false
		});

		md.use(
			await Shiki({
				themes: { dark: 'dracula' },
				defaultColor: 'dark'
			})
		);

		md.use(anchor, {
			slugify,
			permalink: anchor.permalink.headerLink({ safariReaderFix: true })
		});

		// Rewrite relative markdown links: ./foo.md → /docs/foo, ./foo.md#bar → /docs/foo#bar
		const defaultLinkOpen =
			md.renderer.rules.link_open ||
			((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

		md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
			const token = tokens[idx];
			const hrefIdx = token.attrIndex('href');
			if (hrefIdx >= 0 && token.attrs) {
				const href = token.attrs[hrefIdx][1];
				const mdLink = href.match(/^\.?\/?([\w-]+)\.md(#.*)?$/);
				const canonical = href.match(/^https?:\/\/(?:www\.)?sigilauth\.com(\/[^\s]*)?$/);
				if (mdLink) {
					// ./foo.md → /docs/foo
					const slug = mdLink[1];
					const anchor = mdLink[2] ?? '';
					token.attrs[hrefIdx][1] = `/docs/${slug}${anchor}`;
				} else if (canonical) {
					// https://sigilauth.com/path → /path (treat as internal, no new tab)
					token.attrs[hrefIdx][1] = canonical[1] || '/';
				} else if (/^https?:\/\//.test(href)) {
					token.attrSet('target', '_blank');
					token.attrSet('rel', 'noopener');
				}
			}
			return defaultLinkOpen(tokens, idx, options, env, self);
		};

		return md;
	})();
	return mdPromise;
}

/** Normalize non-standard code-fence language tags so Shiki doesn't throw. */
function normalizeLanguageTags(source: string): string {
	// Strip parenthetical qualifiers: ```bash(no-numbers) → ```bash
	let out = source.replace(/^(```)([a-zA-Z][\w-]*)\([^)]*\)/gm, '$1$2');
	// Map unsupported plain-text aliases to an empty language tag (Shiki renders plain).
	out = out.replace(/^(```)(text|txt|plaintext|plain)(\s|$)/gm, '$1$3');
	return out;
}

export async function parseMarkdown(source: string): Promise<ParsedDoc> {
	source = normalizeLanguageTags(source);
	const md = await getMd();
	const headings: Heading[] = [];

	// Collect headings by hooking the heading_open rule via a side pass
	const env = {};
	const tokens = md.parse(source, env);
	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i];
		if (t.type === 'heading_open') {
			const inline = tokens[i + 1];
			// markdown-it leaves `inline.content` empty and puts the parsed tokens in `children`.
			// Concatenate text + code_inline children to get the rendered heading label.
			const text =
				inline?.children
					?.filter((c) => c.type === 'text' || c.type === 'code_inline')
					.map((c) => c.content)
					.join('') ?? '';
			const level = Number(t.tag.slice(1));
			if (level >= 2 && level <= 3 && text) {
				headings.push({ level, text, slug: slugify(text) });
			}
		}
	}

	const html = md.renderer.render(tokens, md.options, env);
	return { html, headings };
}
