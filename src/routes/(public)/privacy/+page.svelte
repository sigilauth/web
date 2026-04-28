<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Privacy Policy · Sigil Auth</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href="https://sigilauth.com/privacy" />
</svelte:head>

<LegalPage
	title={data.title}
	html={data.html}
	headings={data.headings}
	effectiveDate="2026-04-24"
	effectiveDateLabel="24 April 2026"
	otherPageHref="/terms"
	otherPageLabel="Terms of Service"
/>
