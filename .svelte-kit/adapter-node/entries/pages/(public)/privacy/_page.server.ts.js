import { error } from "@sveltejs/kit";
import { l as loadLegalDoc } from "../../../../chunks/legal.js";
import { p as parseMarkdown } from "../../../../chunks/markdown.js";
const load = async () => {
  const doc = await loadLegalDoc("privacy");
  if (!doc) throw error(500, "Privacy policy source missing");
  const { html, headings } = await parseMarkdown(doc.body);
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    html,
    headings
  };
};
export {
  load
};
