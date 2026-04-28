<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.title} · Sigil Auth Docs</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href="https://sigilauth.com/docs/{data.slug}" />
</svelte:head>

<article class="doc">
	<div class="wrap">
		<nav class="doc__breadcrumb" aria-label="Breadcrumb">
			<a href="/docs">Docs</a>
			<span class="sep">/</span>
			<span aria-current="page">{data.title}</span>
		</nav>

		<header class="doc__head">
			<div class="doc__meta">
				{#if data.difficulty}
					<span class="doc__pill doc__pill--{data.difficulty}">{data.difficulty}</span>
				{/if}
				{#each data.tags as tag}
					<span class="doc__tag">{tag}</span>
				{/each}
			</div>
			<h1>{data.title}</h1>
			{#if data.description}
				<p class="doc__lede">{data.description}</p>
			{/if}
		</header>

		{#if data.headings.length > 2}
			<div class="prose-layout">
				<div class="prose prose-body">
					{@html data.html}
				</div>

				<aside class="prose-toc" aria-label="Table of contents">
					<h2>On this page</h2>
					<ul role="list">
						{#each data.headings as h}
							<li class="prose-toc__item prose-toc__item--l{h.level}">
								<a href="#{h.slug}">{h.text}</a>
							</li>
						{/each}
					</ul>
				</aside>
			</div>
		{:else}
			<div class="prose prose-body prose-body--solo">
				{@html data.html}
			</div>
		{/if}

		<footer class="doc__footer">
			{#if data.publishedAt}
				<span
					>Published <time datetime={data.publishedAt}
						>{new Date(data.publishedAt).toLocaleDateString('en-GB', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}</time
					></span
				>
			{/if}
			<a href="/docs" class="doc__back">← Back to all docs</a>
		</footer>
	</div>
</article>

<style>
	.wrap {
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 var(--s6);
	}

	.doc {
		padding: var(--s12) 0 var(--s20);
	}

	.doc__breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--s2);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
		margin-bottom: var(--s8);
	}
	.doc__breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--t-fast);
	}
	.doc__breadcrumb a:hover {
		color: var(--accent);
	}
	.doc__breadcrumb .sep {
		color: var(--border-bright);
	}

	.doc__head {
		margin-bottom: var(--s10);
		padding-bottom: var(--s8);
		border-bottom: 1px solid var(--border);
	}

	.doc__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s2);
		margin-bottom: var(--s5);
	}

	.doc__pill {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 3px 10px;
		border-radius: 999px;
		border: 1px solid transparent;
	}
	.doc__pill--beginner {
		background: var(--accent-bg);
		color: var(--accent);
		border-color: var(--accent-dim);
	}
	.doc__pill--intermediate {
		background: rgba(77, 136, 255, 0.1);
		color: var(--primary);
		border-color: rgba(77, 136, 255, 0.3);
	}
	.doc__pill--advanced {
		background: rgba(255, 179, 0, 0.1);
		color: var(--warning);
		border-color: rgba(255, 179, 0, 0.3);
	}

	.doc__tag {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-dim);
		padding: 3px 6px;
	}

	.doc__head h1 {
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.15;
		margin-bottom: var(--s4);
		background: linear-gradient(180deg, var(--text) 0%, var(--text-muted) 140%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.doc__lede {
		font-size: 1.125rem;
		color: var(--text-muted);
		line-height: 1.6;
		max-width: 720px;
	}

	.doc__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--s8);
		margin-top: var(--s12);
		border-top: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
		flex-wrap: wrap;
		gap: var(--s4);
	}

	.doc__back {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--t-fast);
	}
	.doc__back:hover {
		color: var(--accent);
	}
</style>
