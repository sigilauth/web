
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const TERM_PROGRAM: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const NODE: string;
	export const SHELL: string;
	export const TERM: string;
	export const TMPDIR: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TERM_SESSION_ID: string;
	export const HEYGEN_API_KEY: string;
	export const npm_config_local_prefix: string;
	export const GIT_EDITOR: string;
	export const USER: string;
	export const RUNPOD_API_KEY: string;
	export const HUGGINGFACE_S3_SECRRET: string;
	export const COMMAND_MODE: string;
	export const HUGGINGFACE_TOKEN: string;
	export const SSH_AUTH_SOCK: string;
	export const CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const TERM_FEATURES: string;
	export const npm_execpath: string;
	export const MAX_THINKING_TOKENS: string;
	export const CLAUDE_CODE_SUBAGENT_MODEL: string;
	export const GOOGLE_MAPS_API_KEY: string;
	export const CLAUDE_CODE_MAX_OUTPUT_TOKENS: string;
	export const PATH: string;
	export const TERMINFO_DIRS: string;
	export const RUNPOD_S3_KEY: string;
	export const _: string;
	export const npm_package_json: string;
	export const __CFBundleIdentifier: string;
	export const PWD: string;
	export const npm_command: string;
	export const AWS_SECRET_ACCESS_KEY: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const npm_lifecycle_event: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const ITERM_PROFILE: string;
	export const DOCKER_HUB_USER: string;
	export const XPC_FLAGS: string;
	export const FORCE_COLOR: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const DEBUG_COLORS: string;
	export const RUNPOD_S3_SECRET: string;
	export const AWS_ACCESS_KEY_ID: string;
	export const RUNPOD_S3_SECRRET: string;
	export const GEMINI_API_KEY: string;
	export const COLORFGBG: string;
	export const HOME: string;
	export const SHLVL: string;
	export const LC_TERMINAL_VERSION: string;
	export const HUGGINGFACE_S3_KEY: string;
	export const xGITHUB_TOKEN: string;
	export const CLAUDE_CODE_EXECPATH: string;
	export const NANOBANANA_API_KEY: string;
	export const ITERM_SESSION_ID: string;
	export const LOGNAME: string;
	export const npm_lifecycle_script: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const BROWSER: string;
	export const npm_config_user_agent: string;
	export const PLAYWRIGHT_TEST: string;
	export const LC_TERMINAL: string;
	export const PLAYWRIGHT_TEST_BASE_URL: string;
	export const OSLogRateLimit: string;
	export const CLAUDE_CODE_TEAMMATE_COMMAND: string;
	export const HF_TOKEN: string;
	export const CLAUDECODE: string;
	export const DOCKER_HUB_PAT: string;
	export const CRUSH_DISABLE_METRICS: string;
	export const CLAUDE_AUTOCOMPACT_PCT_OVERRIDE: string;
	export const COLORTERM: string;
	export const npm_node_execpath: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		NoDefaultCurrentDirectoryInExePath: string;
		TERM_PROGRAM: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		NODE: string;
		SHELL: string;
		TERM: string;
		TMPDIR: string;
		TERM_PROGRAM_VERSION: string;
		TERM_SESSION_ID: string;
		HEYGEN_API_KEY: string;
		npm_config_local_prefix: string;
		GIT_EDITOR: string;
		USER: string;
		RUNPOD_API_KEY: string;
		HUGGINGFACE_S3_SECRRET: string;
		COMMAND_MODE: string;
		HUGGINGFACE_TOKEN: string;
		SSH_AUTH_SOCK: string;
		CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: string;
		__CF_USER_TEXT_ENCODING: string;
		TERM_FEATURES: string;
		npm_execpath: string;
		MAX_THINKING_TOKENS: string;
		CLAUDE_CODE_SUBAGENT_MODEL: string;
		GOOGLE_MAPS_API_KEY: string;
		CLAUDE_CODE_MAX_OUTPUT_TOKENS: string;
		PATH: string;
		TERMINFO_DIRS: string;
		RUNPOD_S3_KEY: string;
		_: string;
		npm_package_json: string;
		__CFBundleIdentifier: string;
		PWD: string;
		npm_command: string;
		AWS_SECRET_ACCESS_KEY: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		npm_lifecycle_event: string;
		LANG: string;
		npm_package_name: string;
		ITERM_PROFILE: string;
		DOCKER_HUB_USER: string;
		XPC_FLAGS: string;
		FORCE_COLOR: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		DEBUG_COLORS: string;
		RUNPOD_S3_SECRET: string;
		AWS_ACCESS_KEY_ID: string;
		RUNPOD_S3_SECRRET: string;
		GEMINI_API_KEY: string;
		COLORFGBG: string;
		HOME: string;
		SHLVL: string;
		LC_TERMINAL_VERSION: string;
		HUGGINGFACE_S3_KEY: string;
		xGITHUB_TOKEN: string;
		CLAUDE_CODE_EXECPATH: string;
		NANOBANANA_API_KEY: string;
		ITERM_SESSION_ID: string;
		LOGNAME: string;
		npm_lifecycle_script: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		BROWSER: string;
		npm_config_user_agent: string;
		PLAYWRIGHT_TEST: string;
		LC_TERMINAL: string;
		PLAYWRIGHT_TEST_BASE_URL: string;
		OSLogRateLimit: string;
		CLAUDE_CODE_TEAMMATE_COMMAND: string;
		HF_TOKEN: string;
		CLAUDECODE: string;
		DOCKER_HUB_PAT: string;
		CRUSH_DISABLE_METRICS: string;
		CLAUDE_AUTOCOMPACT_PCT_OVERRIDE: string;
		COLORTERM: string;
		npm_node_execpath: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
