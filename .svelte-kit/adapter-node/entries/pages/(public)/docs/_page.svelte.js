import { a1 as head, a2 as ensure_array_like, a3 as attr, a4 as stringify, a as attr_class, e as escape_html } from "../../../../chunks/renderer.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("39516l", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Documentation · Sigil Auth</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Sigil Auth documentation — SDK reference, quickstart, self-hosting, multi-party approval setup, and end-user onboarding."/> <link rel="canonical" href="https://sigilauth.com/docs"/>`);
    });
    $$renderer2.push(`<section class="docs-index svelte-39516l"><div class="wrap svelte-39516l"><header class="docs-index__head svelte-39516l"><span class="section-label svelte-39516l">Documentation</span> <h1 class="svelte-39516l">Everything you need to ship.</h1> <p class="svelte-39516l">SDKs for Node and Go, a self-hosting guide, multi-party approval setup, and end-user
				onboarding. The protocol spec is public; the source is AGPL-3.0.</p></header> <ul class="docs-index__list svelte-39516l" role="list"><!--[-->`);
    const each_array = ensure_array_like(data.docs);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let doc = each_array[$$index_1];
      $$renderer2.push(`<li><a${attr("href", `/docs/${stringify(doc.slug)}`)} class="docs-card svelte-39516l"><div class="docs-card__meta svelte-39516l">`);
      if (doc.difficulty) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span${attr_class(`docs-card__pill docs-card__pill--${stringify(doc.difficulty)}`, "svelte-39516l")}>${escape_html(doc.difficulty)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (doc.tags) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(doc.tags.slice(0, 3));
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let tag = each_array_1[$$index];
          $$renderer2.push(`<span class="docs-card__tag svelte-39516l">${escape_html(tag)}</span>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <h2 class="svelte-39516l">${escape_html(doc.title)}</h2> `);
      if (doc.description) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="svelte-39516l">${escape_html(doc.description)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <span class="docs-card__arrow svelte-39516l" aria-hidden="true">Read →</span></a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></section>`);
  });
}
export {
  _page as default
};
