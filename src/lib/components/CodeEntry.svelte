<script lang="ts">
	/**
	 * CodeEntry Component (v0.1.0 Single-Field Descope)
	 *
	 * Single text input for 8-digit pairing code.
	 * Auto-calls onComplete when 8 digits entered.
	 *
	 * Original 8-input pattern deferred to v0.2 pending Svelte 5 reactivity investigation.
	 *
	 * @param code - Bindable code value (8 digits or empty string)
	 * @param onComplete - Callback when 8 digits entered
	 * @param disabled - Disable input
	 * @param error - Error message to display
	 */

	interface Props {
		code?: string;
		onComplete?: (code: string) => void;
		disabled?: boolean;
		error?: string;
	}

	let { code = $bindable(''), onComplete, disabled = false, error }: Props = $props();

	function handleInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const val = input.value.replace(/\D/g, '').slice(0, 8);
		code = val;
		if (val.length === 8) {
			onComplete?.(val);
		}
	}
</script>

<div class="code-entry" class:code-entry--error={error}>
	<label for="pairing-code" class="code-entry__label">Pairing code (8 digits)</label>

	<input
		id="pairing-code"
		type="text"
		inputmode="numeric"
		pattern="\d{8}"
		maxlength="8"
		autocomplete="one-time-code"
		disabled={disabled}
		value={code}
		oninput={handleInput}
		placeholder="1 2 3 4 5 6 7 8"
		class="code-entry__input"
		aria-invalid={error ? 'true' : 'false'}
		aria-describedby={error ? 'code-error pairing-code-hint' : 'pairing-code-hint'}
	/>

	<p id="pairing-code-hint" class="code-entry__hint">
		Enter or paste the 8-digit code from your other device.
	</p>

	{#if error}
		<p id="code-error" class="code-entry__error" role="alert">
			{error}
		</p>
	{/if}
</div>

<style>
	.code-entry {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.code-entry__label {
		font-weight: var(--weight-medium);
		font-size: var(--text-sm);
		color: var(--color-text);
	}

	.code-entry__input {
		width: 100%;
		max-width: 320px;
		min-height: 56px;
		padding: var(--space-4);
		text-align: center;
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.25em;
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: border-color var(--transition-base);
		color: var(--color-text);
	}

	.code-entry__input::placeholder {
		color: var(--color-text-tertiary);
		letter-spacing: 0.15em;
	}

	.code-entry__input:focus {
		border-color: var(--color-primary);
		outline: none;
	}

	.code-entry__input:focus-visible {
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
	}

	.code-entry__input:disabled {
		background: var(--color-surface-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.code-entry--error .code-entry__input {
		border-color: var(--color-danger);
	}

	.code-entry__hint {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin: 0;
		text-align: center;
	}

	.code-entry__error {
		color: var(--color-danger);
		font-size: var(--text-sm);
		margin: 0;
		text-align: center;
	}

	/* Touch target (WCAG 2.5.8 AA - 44×44px minimum) */
	.code-entry__input {
		min-height: 56px;
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.code-entry__input {
			border-width: 3px;
		}

		.code-entry--error .code-entry__input {
			border-color: var(--color-danger-dark);
		}
	}

	/* Mobile responsive */
	@media (max-width: 480px) {
		.code-entry__input {
			max-width: 100%;
			font-size: var(--text-xl);
			letter-spacing: 0.2em;
		}
	}
</style>
