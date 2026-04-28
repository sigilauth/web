<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Documentation · Sigil Auth</title>
	<meta
		name="description"
		content="Sigil Auth documentation — SDK reference, quickstart, self-hosting, multi-party approval setup, and end-user onboarding."
	/>
	<link rel="canonical" href="https://sigilauth.com/docs" />
</svelte:head>

<section class="docs-index">
	<div class="wrap">
		<header class="docs-index__head">
			<span class="section-label">Documentation</span>
			<h1>Everything you need to ship.</h1>
			<p>
				SDKs for Node and Go, a self-hosting guide, multi-party approval setup, and end-user
				onboarding. The protocol spec is public; the source is AGPL-3.0.
			</p>
		</header>

		<ul class="docs-index__list" role="list">
			{#each data.docs as doc}
				<li>
					<a href="/docs/{doc.slug}" class="docs-card">
						<div class="docs-card__meta">
							{#if doc.difficulty}
								<span class="docs-card__pill docs-card__pill--{doc.difficulty}">
									{doc.difficulty}
								</span>
							{/if}
							{#if doc.tags}
								{#each doc.tags.slice(0, 3) as tag}
									<span class="docs-card__tag">{tag}</span>
								{/each}
							{/if}
						</div>
						<h2>{doc.title}</h2>
						{#if doc.description}
							<p>{doc.description}</p>
						{/if}
						<span class="docs-card__arrow" aria-hidden="true">Read →</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.wrap {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 var(--s6);
	}

	.section-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--accent);
		margin-bottom: var(--s4);
	}

	.docs-index {
		padding: var(--s16) 0 var(--s20);
	}

	.docs-index__head {
		margin-bottom: var(--s12);
		max-width: 720px;
	}

	.docs-index__head h1 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin-bottom: var(--s4);
		background: linear-gradient(180deg, var(--text) 0%, var(--text-muted) 140%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.docs-index__head p {
		color: var(--text-muted);
		font-size: 1.125rem;
		line-height: 1.6;
	}

	.docs-index__list {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--s5);
	}

	@media (max-width: 780px) {
		.docs-index__list {
			grid-template-columns: 1fr;
		}
	}

	.docs-card {
		display: flex;
		flex-direction: column;
		gap: var(--s3);
		padding: var(--s6);
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		text-decoration: none;
		color: var(--text);
		transition:
			transform var(--t-base),
			border-color var(--t-base),
			background var(--t-base);
		position: relative;
		overflow: hidden;
	}

	.docs-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent-dim);
		background: linear-gradient(180deg, var(--surface) 0%, var(--bg-raised) 100%);
	}

	.docs-card:hover .docs-card__arrow {
		color: var(--accent);
	}

	.docs-card__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s2);
	}

	.docs-card__pill {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 2px 8px;
		border-radius: 999px;
		border: 1px solid transparent;
	}
	.docs-card__pill--beginner {
		background: var(--accent-bg);
		color: var(--accent);
		border-color: var(--accent-dim);
	}
	.docs-card__pill--intermediate {
		background: rgba(77, 136, 255, 0.1);
		color: var(--primary);
		border-color: rgba(77, 136, 255, 0.3);
	}
	.docs-card__pill--advanced {
		background: rgba(255, 179, 0, 0.1);
		color: var(--warning);
		border-color: rgba(255, 179, 0, 0.3);
	}

	.docs-card__tag {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-dim);
		padding: 2px 6px;
	}

	.docs-card h2 {
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.3;
		margin: 0;
	}

	.docs-card p {
		color: var(--text-muted);
		font-size: 0.9375rem;
		line-height: 1.55;
		flex: 1;
	}

	.docs-card__arrow {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
		margin-top: auto;
		transition: color var(--t-fast);
	}
</style>
