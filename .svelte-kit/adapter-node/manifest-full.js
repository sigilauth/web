export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","generated/hero-bg.jpeg","generated/og-image.jpeg","generated/phone-mpa.png","generated/phone-push.png","sigil-1200.png","sigil-1200.webp","sigil.png","sigil.svg","sigil.webp"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.D-R7K5qz.js",app:"_app/immutable/entry/app.nUhxhTXs.js",imports:["_app/immutable/entry/start.D-R7K5qz.js","_app/immutable/chunks/BtHQISyW.js","_app/immutable/chunks/BhExsuTL.js","_app/immutable/chunks/CjreT1OL.js","_app/immutable/entry/app.nUhxhTXs.js","_app/immutable/chunks/BhExsuTL.js","_app/immutable/chunks/Bn-n7f5p.js","_app/immutable/chunks/C3jC_bnQ.js","_app/immutable/chunks/BzBFOlJr.js","_app/immutable/chunks/CjreT1OL.js","_app/immutable/chunks/BvOKunhn.js","_app/immutable/chunks/D7-Tdjy7.js","_app/immutable/chunks/CPrk3Ur8.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(public)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(public)/docs",
				pattern: /^\/docs\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(public)/docs/[slug]",
				pattern: /^\/docs\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/mnemonic",
				pattern: /^\/mnemonic\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/pairing",
				pattern: /^\/pairing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(public)/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(public)/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
