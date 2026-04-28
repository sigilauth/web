import { e as escape_html, a3 as attr, a2 as ensure_array_like, a as attr_class, a4 as stringify } from "./renderer.js";
import { h as html } from "./html.js";
function LegalPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      html: html$1,
      headings,
      effectiveDate,
      effectiveDateLabel,
      otherPageHref,
      otherPageLabel
    } = $$props;
    $$renderer2.push(`<article class="legal svelte-1gmktme"><div class="wrap svelte-1gmktme"><nav class="legal__breadcrumb svelte-1gmktme" aria-label="Breadcrumb"><a href="/" class="svelte-1gmktme">Home</a> <span class="sep svelte-1gmktme">/</span> <span aria-current="page">${escape_html(title)}</span></nav> <header class="legal__head svelte-1gmktme"><h1 class="svelte-1gmktme">${escape_html(title)}</h1> <p class="legal__dates svelte-1gmktme">Effective <time${attr("datetime", effectiveDate)} class="svelte-1gmktme">${escape_html(effectiveDateLabel)}</time> <span class="sep svelte-1gmktme">·</span> Last updated <time${attr("datetime", effectiveDate)} class="svelte-1gmktme">${escape_html(effectiveDateLabel)}</time></p></header> `);
    if (headings.length > 2) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose-layout"><div class="prose prose-body">${html(html$1)}</div> <aside class="prose-toc" aria-label="Table of contents"><h2>On this page</h2> <ul role="list"><!--[-->`);
      const each_array = ensure_array_like(headings);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let h = each_array[$$index];
        $$renderer2.push(`<li${attr_class(`prose-toc__item prose-toc__item--l${stringify(h.level)}`, "svelte-1gmktme")}><a${attr("href", `#${stringify(h.slug)}`)} class="svelte-1gmktme">${escape_html(h.text)}</a></li>`);
      }
      $$renderer2.push(`<!--]--></ul></aside></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="prose prose-body prose-body--solo">${html(html$1)}</div>`);
    }
    $$renderer2.push(`<!--]--> <footer class="legal__footer svelte-1gmktme"><a${attr("href", otherPageHref)} class="legal__other svelte-1gmktme">Read the ${escape_html(otherPageLabel)} →</a> <a href="/" class="legal__home svelte-1gmktme">← Back to home</a></footer></div></article>`);
  });
}
export {
  LegalPage as L
};
