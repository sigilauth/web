import "clsx";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<a href="#main" class="skip-link">Skip to main content</a> <div id="app" class="svelte-12qhfyh">`);
  children($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
