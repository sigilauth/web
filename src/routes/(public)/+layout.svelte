<script lang="ts">
	import SiteHeader from '$lib/components/site/SiteHeader.svelte';
	import SiteFooter from '$lib/components/site/SiteFooter.svelte';

	let { children } = $props();
</script>

<SiteHeader />

<main id="main" tabindex="-1">
	{@render children?.()}
</main>

<SiteFooter />

<style>
	main {
		min-height: 60vh;
	}
</style>
