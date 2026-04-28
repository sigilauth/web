import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
const __dirname$1 = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = resolve(__dirname$1, "../../../../docs");
const EXCLUDED_SLUGS = /* @__PURE__ */ new Set(["quarantined-tests"]);
async function listDocs() {
  const entries = await readdir(DOCS_ROOT, { withFileTypes: true });
  const docs = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const slug = entry.name.replace(/\.md$/, "");
    if (EXCLUDED_SLUGS.has(slug)) continue;
    const filepath = join(DOCS_ROOT, entry.name);
    const raw = await readFile(filepath, "utf-8");
    const parsed = matter(raw);
    if (!parsed.data.title) continue;
    docs.push({
      slug,
      title: String(parsed.data.title),
      description: String(parsed.data.description ?? ""),
      difficulty: parsed.data.difficulty,
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : void 0,
      publishedAt: parsed.data.publishedAt ? String(parsed.data.publishedAt) : void 0
    });
  }
  const rank = (d) => ({ beginner: 0, intermediate: 1, advanced: 2 })[d.difficulty ?? ""] ?? 99;
  docs.sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title));
  return docs;
}
async function loadDoc(slug) {
  if (EXCLUDED_SLUGS.has(slug)) return null;
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filepath = join(DOCS_ROOT, `${slug}.md`);
  let raw;
  try {
    raw = await readFile(filepath, "utf-8");
  } catch {
    return null;
  }
  const parsed = matter(raw);
  if (!parsed.data.title) return null;
  return {
    slug,
    title: String(parsed.data.title),
    description: String(parsed.data.description ?? ""),
    difficulty: parsed.data.difficulty,
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : void 0,
    publishedAt: parsed.data.publishedAt ? String(parsed.data.publishedAt) : void 0,
    body: parsed.content
  };
}
export {
  loadDoc as a,
  listDocs as l
};
