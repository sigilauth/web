import "clsx";
import { a as attr_class } from "../../../chunks/renderer.js";
import { p as page } from "../../../chunks/index.js";
function SiteHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const isActive = (href) => {
      const current = page.url.pathname;
      if (href === "/") return current === "/";
      return current === href || current.startsWith(href + "/");
    };
    $$renderer2.push(`<header class="nav svelte-k3slgy"><div class="nav__inner svelte-k3slgy"><a href="/" class="nav__brand svelte-k3slgy" aria-label="Sigil Auth — home"><img src="/sigil.png" alt="" aria-hidden="true" class="svelte-k3slgy"/> <span>Sigil Auth</span></a> <ul class="nav__links svelte-k3slgy" role="list"><li><a href="/"${attr_class("nav__link svelte-k3slgy", void 0, { "nav__link--active": isActive("/") })}>Home</a></li> <li><a href="/docs"${attr_class("nav__link svelte-k3slgy", void 0, { "nav__link--active": isActive("/docs") })}>Docs</a></li> <li><a href="https://github.com/sigilauth" class="nav__link nav__link--external svelte-k3slgy" target="_blank" rel="noopener">GitHub</a></li></ul></div></header>`);
  });
}
function SiteFooter($$renderer) {
  $$renderer.push(`<footer class="footer svelte-a7xpyw"><div class="wrap svelte-a7xpyw"><div class="footer__grid svelte-a7xpyw"><div class="footer__brand svelte-a7xpyw"><div class="footer__brand-row svelte-a7xpyw"><img src="/sigil.png" alt="" aria-hidden="true" class="svelte-a7xpyw"/> <span>Sigil Auth</span></div> <p class="svelte-a7xpyw">Open source strong authentication. Hardware-backed keys, mutual signing, push delivery,
					multi-party approval. A project by Wagmi Labs.</p></div> <div class="footer__col svelte-a7xpyw"><h4 class="svelte-a7xpyw">Product</h4> <ul role="list" class="svelte-a7xpyw"><li><a href="/docs" class="svelte-a7xpyw">Documentation</a></li> <li><a href="/docs/sdk-node" class="svelte-a7xpyw">Node SDK</a></li> <li><a href="/docs/sdk-go" class="svelte-a7xpyw">Go SDK</a></li> <li><a href="/docs/mpa-setup" class="svelte-a7xpyw">MPA setup</a></li></ul></div> <div class="footer__col svelte-a7xpyw"><h4 class="svelte-a7xpyw">Source</h4> <ul role="list" class="svelte-a7xpyw"><li><a href="https://github.com/sigilauth" target="_blank" rel="noopener" class="svelte-a7xpyw">GitHub ↗</a></li> <li><a href="/docs/self-hosting" class="svelte-a7xpyw">Self-hosting</a></li> <li><a href="/docs/integrator-quickstart" class="svelte-a7xpyw">Quickstart</a></li></ul></div> <div class="footer__col svelte-a7xpyw"><h4 class="svelte-a7xpyw">Legal</h4> <ul role="list" class="svelte-a7xpyw"><li><a href="/privacy" class="svelte-a7xpyw">Privacy policy</a></li> <li><a href="/terms" class="svelte-a7xpyw">Terms of service</a></li> <li><a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener" class="svelte-a7xpyw">AGPL-3.0 (code)</a></li> <li><a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener" class="svelte-a7xpyw">Apache-2.0 (specs)</a></li></ul></div></div> <div class="footer__meta svelte-a7xpyw"><span>© 2026 Wagmi Labs</span> <span>Last updated <time datetime="2026-04-24" class="svelte-a7xpyw">April 2026</time></span></div></div></footer>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  SiteHeader($$renderer);
  $$renderer.push(`<!----> <main id="main" tabindex="-1" class="svelte-1l0quee">`);
  children?.($$renderer);
  $$renderer.push(`<!----></main> `);
  SiteFooter($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
