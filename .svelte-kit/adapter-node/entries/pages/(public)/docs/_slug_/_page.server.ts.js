import { error } from "@sveltejs/kit";
import { a as loadDoc } from "../../../../../chunks/docs.js";
import { p as parseMarkdown } from "../../../../../chunks/markdown.js";
const load = async ({ params }) => {
  const doc = await loadDoc(params.slug);
  if (!doc) throw error(404, "Doc not found");
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
export {
  load
};
