import { a1 as head, a3 as attr } from "../../../../chunks/renderer.js";
import { L as LegalPage } from "../../../../chunks/LegalPage.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("6kohmd", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Terms of Service · Sigil Auth</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", data.description)}/> <link rel="canonical" href="https://sigilauth.com/terms"/>`);
    });
    LegalPage($$renderer2, {
      title: data.title,
      html: data.html,
      headings: data.headings,
      effectiveDate: "2026-04-24",
      effectiveDateLabel: "24 April 2026",
      otherPageHref: "/privacy",
      otherPageLabel: "Privacy Policy"
    });
  });
}
export {
  _page as default
};
