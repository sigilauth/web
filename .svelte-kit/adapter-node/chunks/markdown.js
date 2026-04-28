import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import Shiki from "@shikijs/markdown-it";
let mdPromise = null;
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}
async function getMd() {
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
        themes: { dark: "dracula" },
        defaultColor: "dark"
      })
    );
    md.use(anchor, {
      slugify,
      permalink: anchor.permalink.headerLink({ safariReaderFix: true })
    });
    const defaultLinkOpen = md.renderer.rules.link_open || ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const hrefIdx = token.attrIndex("href");
      if (hrefIdx >= 0 && token.attrs) {
        const href = token.attrs[hrefIdx][1];
        const mdLink = href.match(/^\.?\/?([\w-]+)\.md(#.*)?$/);
        const canonical = href.match(/^https?:\/\/(?:www\.)?sigilauth\.com(\/[^\s]*)?$/);
        if (mdLink) {
          const slug = mdLink[1];
          const anchor2 = mdLink[2] ?? "";
          token.attrs[hrefIdx][1] = `/docs/${slug}${anchor2}`;
        } else if (canonical) {
          token.attrs[hrefIdx][1] = canonical[1] || "/";
        } else if (/^https?:\/\//.test(href)) {
          token.attrSet("target", "_blank");
          token.attrSet("rel", "noopener");
        }
      }
      return defaultLinkOpen(tokens, idx, options, env, self);
    };
    return md;
  })();
  return mdPromise;
}
function normalizeLanguageTags(source) {
  let out = source.replace(/^(```)([a-zA-Z][\w-]*)\([^)]*\)/gm, "$1$2");
  out = out.replace(/^(```)(text|txt|plaintext|plain)(\s|$)/gm, "$1$3");
  return out;
}
async function parseMarkdown(source) {
  source = normalizeLanguageTags(source);
  const md = await getMd();
  const headings = [];
  const env = {};
  const tokens = md.parse(source, env);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === "heading_open") {
      const inline = tokens[i + 1];
      const text = inline?.children?.filter((c) => c.type === "text" || c.type === "code_inline").map((c) => c.content).join("") ?? "";
      const level = Number(t.tag.slice(1));
      if (level >= 2 && level <= 3 && text) {
        headings.push({ level, text, slug: slugify(text) });
      }
    }
  }
  const html = md.renderer.render(tokens, md.options, env);
  return { html, headings };
}
export {
  parseMarkdown as p
};
