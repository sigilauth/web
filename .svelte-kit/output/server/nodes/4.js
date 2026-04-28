import * as server from '../entries/pages/(public)/docs/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(public)/docs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(public)/docs/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.Bsv5X15R.js","_app/immutable/chunks/BzBFOlJr.js","_app/immutable/chunks/BhExsuTL.js","_app/immutable/chunks/Bn-n7f5p.js","_app/immutable/chunks/C3jC_bnQ.js","_app/immutable/chunks/BvOKunhn.js","_app/immutable/chunks/D7-Tdjy7.js","_app/immutable/chunks/CWSC7qQ_.js","_app/immutable/chunks/iATC6rQG.js","_app/immutable/chunks/DRqT5Klv.js"];
export const stylesheets = ["_app/immutable/assets/4.BGSW3KMg.css"];
export const fonts = [];
