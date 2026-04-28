<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Terms of Service · Sigil Auth</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href="https://sigilauth.com/terms" />
</svelte:head>

<LegalPage
	title={data.title}
	html={data.html}
	headings={data.headings}
	effectiveDate="2026-04-24"
	effectiveDateLabel="24 April 2026"
	otherPageHref="/privacy"
	otherPageLabel="Privacy Policy"
/>
