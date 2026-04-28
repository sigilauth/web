<script lang="ts">
	/**
	 * Pictogram Component
	 *
	 * Displays a 5-emoji device/server fingerprint with accessible text alternative.
	 * Implements Aria §3.2 accessible pictogram pattern.
	 *
	 * @param pictogram - Array of 5 emoji strings (e.g., ["🍎", "🍌", "✈️", "🚗", "🐕"])
	 * @param speakable - Hyphen-separated speakable form (e.g., "apple-banana-plane-car-dog")
	 * @param size - Display size: "large" (64px) or "compact" (32px)
	 * @param label - Accessible label (default: "Device fingerprint")
	 */

	interface Props {
		pictogram: string[];
		speakable: string;
		size?: 'large' | 'compact';
		label?: string;
	}

	let { pictogram, speakable, size = 'large', label = 'Device fingerprint' }: Props = $props();

	// Derive emoji names for detailed description (from speakable)
	const emojiNames = $derived(speakable.split('-'));
</script>

<div class="pictogram pictogram--{size}">
	<!-- Visual emoji display with image role -->
	<div
		class="pictogram__visual"
		role="img"
		aria-label="{label}: {emojiNames.join(', ')}"
	>
		{#each pictogram as emoji}
			<span class="pictogram__emoji">{emoji}</span>
		{/each}
	</div>

	<!-- Speakable text (visible, accessible) -->
	<div class="pictogram__speakable">
		<span class="visually-hidden">Speakable form:</span>
		{speakable}
	</div>

	<!-- Detailed emoji list (expandable for screen readers) -->
	<details class="pictogram__details">
		<summary>Emoji descriptions</summary>
		<ol class="pictogram__list">
			{#each pictogram as emoji, i}
				<li>{emojiNames[i]} {emoji}</li>
			{/each}
		</ol>
	</details>
</div>

<style>
	.pictogram {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		align-items: center;
	}

	.pictogram__visual {
		display: flex;
		gap: var(--space-2);
		justify-content: center;
	}

	/* Large size (64px emoji) - default for pairing/enrollment screens */
	.pictogram--large .pictogram__emoji {
		font-size: 64px;
		line-height: 1;
	}

	/* Compact size (32px emoji) - for list items, status displays */
	.pictogram--compact .pictogram__visual {
		gap: var(--space-1);
	}

	.pictogram--compact .pictogram__emoji {
		font-size: 32px;
		line-height: 1;
	}

	.pictogram__speakable {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-align: center;
	}

	/* Increase speakable text size for large pictograms */
	.pictogram--large .pictogram__speakable {
		font-size: var(--text-base);
	}

	.pictogram__details {
		margin-top: var(--space-2);
		width: 100%;
		max-width: 300px;
	}

	.pictogram__details summary {
		cursor: pointer;
		padding: var(--space-2);
		background: var(--color-surface-secondary);
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		text-align: center;
	}

	.pictogram__details summary:hover {
		background: var(--color-border);
	}

	.pictogram__details summary:focus-visible {
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
	}

	.pictogram__list {
		margin-top: var(--space-2);
		padding-left: var(--space-6);
		font-size: var(--text-sm);
	}

	.pictogram__list li {
		margin-bottom: var(--space-1);
	}

	/* Accessibility: Ensure emojis scale with dynamic type */
	@media (prefers-reduced-motion: reduce) {
		.pictogram__details[open] {
			animation: none;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.pictogram__speakable {
			color: var(--color-text);
		}

		.pictogram__details summary {
			border: 2px solid var(--color-border-strong);
		}
	}

	/* Layout reflows at 320px viewport (400% zoom) */
	@media (max-width: 320px) {
		.pictogram__visual {
			flex-wrap: wrap;
		}
	}
</style>
