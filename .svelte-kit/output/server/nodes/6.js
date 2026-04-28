import * as server from '../entries/pages/(public)/privacy/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(public)/privacy/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(public)/privacy/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.DtNdCjVA.js","_app/immutable/chunks/BzBFOlJr.js","_app/immutable/chunks/BhExsuTL.js","_app/immutable/chunks/iATC6rQG.js","_app/immutable/chunks/CWSC7qQ_.js","_app/immutable/chunks/8qe6N56v.js","_app/immutable/chunks/Bn-n7f5p.js","_app/immutable/chunks/C3jC_bnQ.js","_app/immutable/chunks/BvOKunhn.js","_app/immutable/chunks/D7-Tdjy7.js","_app/immutable/chunks/DPHiKY1R.js","_app/immutable/chunks/DRqT5Klv.js"];
export const stylesheets = ["_app/immutable/assets/LegalPage.CvLookKP.css"];
export const fonts = [];
