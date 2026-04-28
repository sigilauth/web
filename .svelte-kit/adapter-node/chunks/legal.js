import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname$1 = dirname(fileURLToPath(import.meta.url));
const LEGAL_ROOT = resolve(__dirname$1, "../../../working/legal");
const PAGE_META = {
  privacy: {
    title: "Privacy Policy",
    description: "How Wagmi Labs collects, uses, and protects information when you use Sigil Auth apps, the relay service, and the website."
  },
  terms: {
    title: "Terms of Service",
    description: "Terms governing your use of Sigil Auth mobile apps, desktop apps, the push relay service, and the website."
  }
};
async function loadLegalDoc(slug) {
  if (slug !== "privacy" && slug !== "terms") return null;
  try {
    const body = await readFile(resolve(LEGAL_ROOT, `${slug}.md`), "utf-8");
    return { slug, body, ...PAGE_META[slug] };
  } catch {
    return null;
  }
}
export {
  loadLegalDoc as l
};
