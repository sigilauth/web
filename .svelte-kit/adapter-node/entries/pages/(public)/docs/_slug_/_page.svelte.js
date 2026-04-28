import { a1 as head, e as escape_html, a as attr_class, a4 as stringify, a2 as ensure_array_like, a3 as attr } from "../../../../../chunks/renderer.js";
import { h as html } from "../../../../../chunks/html.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("ceziqz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.title)} · Sigil Auth Docs</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", data.description)}/> <link rel="canonical"${attr("href", `https://sigilauth.com/docs/${stringify(data.slug)}`)}/>`);
    });
    $$renderer2.push(`<article class="doc svelte-ceziqz"><div class="wrap svelte-ceziqz"><nav class="doc__breadcrumb svelte-ceziqz" aria-label="Breadcrumb"><a href="/docs" class="svelte-ceziqz">Docs</a> <span class="sep svelte-ceziqz">/</span> <span aria-current="page">${escape_html(data.title)}</span></nav> <header class="doc__head svelte-ceziqz"><div class="doc__meta svelte-ceziqz">`);
    if (data.difficulty) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span${attr_class(`doc__pill doc__pill--${stringify(data.difficulty)}`, "svelte-ceziqz")}>${escape_html(data.difficulty)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array = ensure_array_like(data.tags);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      $$renderer2.push(`<span class="doc__tag svelte-ceziqz">${escape_html(tag)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <h1 class="svelte-ceziqz">${escape_html(data.title)}</h1> `);
    if (data.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="doc__lede svelte-ceziqz">${escape_html(data.description)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> `);
    if (data.headings.length > 2) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose-layout"><div class="prose prose-body">${html(data.html)}</div> <aside class="prose-toc" aria-label="Table of contents"><h2>On this page</h2> <ul role="list"><!--[-->`);
      const each_array_1 = ensure_array_like(data.headings);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let h = each_array_1[$$index_1];
        $$renderer2.push(`<li${attr_class(`prose-toc__item prose-toc__item--l${stringify(h.level)}`, "svelte-ceziqz")}><a${attr("href", `#${stringify(h.slug)}`)} class="svelte-ceziqz">${escape_html(h.text)}</a></li>`);
      }
      $$renderer2.push(`<!--]--></ul></aside></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="prose prose-body prose-body--solo">${html(data.html)}</div>`);
    }
    $$renderer2.push(`<!--]--> <footer class="doc__footer svelte-ceziqz">`);
    if (data.publishedAt) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span>Published <time${attr("datetime", data.publishedAt)}>${escape_html(new Date(data.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }))}</time></span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <a href="/docs" class="doc__back svelte-ceziqz">← Back to all docs</a></footer></div></article>`);
  });
}
export {
  _page as default
};
