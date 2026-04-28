import { a1 as head, e as escape_html, a2 as ensure_array_like, a as attr_class, a3 as attr, a0 as derived } from "../../../chunks/renderer.js";
/* empty css                                                      */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentBatch = 0;
    const mnemonic = [
      "abandon",
      "ability",
      "able",
      "about",
      "above",
      "absent",
      "absorb",
      "abstract",
      "absurd",
      "abuse",
      "access",
      "accident",
      "account",
      "accuse",
      "achieve",
      "acid",
      "acoustic",
      "acquire",
      "across",
      "act",
      "action",
      "actor",
      "actress",
      "actual"
    ];
    const batches = derived(() => [
      mnemonic.slice(0, 6),
      mnemonic.slice(6, 12),
      mnemonic.slice(12, 18),
      mnemonic.slice(18, 24)
    ]);
    head("4l9lvd", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Generate Recovery Phrase — Sigil Auth</title>`);
      });
      $$renderer3.push(`<meta name="robots" content="noindex, nofollow"/>`);
    });
    $$renderer2.push(`<main id="main" class="mnemonic-container svelte-4l9lvd"><a href="/help" class="help-icon svelte-4l9lvd" aria-label="Get help with recovery phrase"><span aria-hidden="true">?</span></a> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mnemonic-display"><h1 class="svelte-4l9lvd">Write Down Your Recovery Phrase</h1> <p class="warning svelte-4l9lvd" role="alert">⚠️ Screenshot protection active. Write these words on paper. Keep them safe and secret.</p> <div class="batch-indicator svelte-4l9lvd"><span class="batch-label svelte-4l9lvd">Batch ${escape_html(currentBatch + 1)} of 4</span> <div class="batch-progress svelte-4l9lvd"><!--[-->`);
      const each_array = ensure_array_like(batches());
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        $$renderer2.push(`<div${attr_class("batch-dot svelte-4l9lvd", void 0, { "batch-dot--active": i === currentBatch })}></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div role="status" aria-live="polite" aria-atomic="true" class="visually-hidden svelte-4l9lvd">Showing batch ${escape_html(currentBatch + 1)} of 4</div> <ol class="word-list svelte-4l9lvd" role="list"${attr("start", currentBatch * 6 + 1)}><!--[-->`);
      const each_array_1 = ensure_array_like(batches()[currentBatch]);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let word = each_array_1[i];
        $$renderer2.push(`<li class="word-item svelte-4l9lvd"><span class="word-number svelte-4l9lvd">${escape_html(currentBatch * 6 + i + 1)}</span> <span class="word-text svelte-4l9lvd">${escape_html(word)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ol> <div class="navigation svelte-4l9lvd">`);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn btn-primary svelte-4l9lvd">${escape_html("Next Batch")}</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
