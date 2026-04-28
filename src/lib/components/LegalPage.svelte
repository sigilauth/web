<script lang="ts">
	import type { Heading } from '$lib/server/markdown';

	interface Props {
		title: string;
		html: string;
		headings: Heading[];
		/** ISO date string — used for the `<time datetime>` attribute. */
		effectiveDate: string;
		/** Human-readable date, e.g. "24 April 2026". */
		effectiveDateLabel: string;
		/** Link to the complementary legal page (terms ↔ privacy). */
		otherPageHref: string;
		otherPageLabel: string;
	}

	let {
		title,
		html,
		headings,
		effectiveDate,
		effectiveDateLabel,
		otherPageHref,
		otherPageLabel
	}: Props = $props();
</script>

<article class="legal">
	<div class="wrap">
		<nav class="legal__breadcrumb" aria-label="Breadcrumb">
			<a href="/">Home</a>
			<span class="sep">/</span>
			<span aria-current="page">{title}</span>
		</nav>

		<header class="legal__head">
			<h1>{title}</h1>
			<p class="legal__dates">
				Effective <time datetime={effectiveDate}>{effectiveDateLabel}</time>
				<span class="sep">·</span>
				Last updated <time datetime={effectiveDate}>{effectiveDateLabel}</time>
			</p>
		</header>

		{#if headings.length > 2}
			<div class="prose-layout">
				<div class="prose prose-body">
					{@html html}
				</div>

				<aside class="prose-toc" aria-label="Table of contents">
					<h2>On this page</h2>
					<ul role="list">
						{#each headings as h}
							<li class="prose-toc__item prose-toc__item--l{h.level}">
								<a href="#{h.slug}">{h.text}</a>
							</li>
						{/each}
					</ul>
				</aside>
			</div>
		{:else}
			<div class="prose prose-body prose-body--solo">
				{@html html}
			</div>
		{/if}

		<footer class="legal__footer">
			<a href={otherPageHref} class="legal__other">Read the {otherPageLabel} →</a>
			<a href="/" class="legal__home">← Back to home</a>
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

	.legal {
		padding: var(--s12) 0 var(--s20);
	}

	.legal__breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--s2);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
		margin-bottom: var(--s8);
	}
	.legal__breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--t-fast);
	}
	.legal__breadcrumb a:hover {
		color: var(--accent);
	}
	.legal__breadcrumb .sep {
		color: var(--border-bright);
	}

	.legal__head {
		margin-bottom: var(--s10);
		padding-bottom: var(--s8);
		border-bottom: 1px solid var(--border);
	}

	.legal__head h1 {
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

	.legal__dates {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-muted);
		display: flex;
		flex-wrap: wrap;
		gap: var(--s2);
		align-items: baseline;
	}
	.legal__dates time {
		color: var(--text);
	}
	.legal__dates .sep {
		color: var(--border-bright);
	}

	.legal__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--s8);
		margin-top: var(--s12);
		border-top: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		flex-wrap: wrap;
		gap: var(--s4);
	}

	.legal__other,
	.legal__home {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--t-fast);
	}
	.legal__other:hover,
	.legal__home:hover {
		color: var(--accent);
	}
</style>
