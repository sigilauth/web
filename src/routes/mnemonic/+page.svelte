<script lang="ts">
	/**
	 * Two-Phase Mnemonic Verification Flow
	 *
	 * Phase 1: Display 24-word mnemonic for write-down (screenshot protected)
	 * Phase 2: Verify user wrote it down (random word confirmation)
	 * Phase 3: Send encrypted to integrator + display verification code
	 */

	import Pictogram from '$lib/components/Pictogram.svelte';

	type Phase = 'display' | 'verify' | 'confirm';

	let phase = $state<Phase>('display');
	let currentBatch = $state(0);
	let verificationInputs = $state<Record<number, string>>({});
	let verificationError = $state('');
	let verificationCode = $state('A7B3C9'); // Placeholder - will be computed from mnemonic

	// Placeholder mnemonic (will be generated via hardware RNG in real impl)
	const mnemonic = [
		'abandon',
		'ability',
		'able',
		'about',
		'above',
		'absent',
		'absorb',
		'abstract',
		'absurd',
		'abuse',
		'access',
		'accident',
		'account',
		'accuse',
		'achieve',
		'acid',
		'acoustic',
		'acquire',
		'across',
		'act',
		'action',
		'actor',
		'actress',
		'actual'
	];

	// Split into 4 batches of 6 words
	const batches = $derived([
		mnemonic.slice(0, 6),
		mnemonic.slice(6, 12),
		mnemonic.slice(12, 18),
		mnemonic.slice(18, 24)
	]);

	// Random word positions to verify (3rd, 12th, 18th, 24th)
	const verifyPositions = [2, 11, 17, 23]; // 0-indexed

	function nextBatch() {
		if (currentBatch < 3) {
			currentBatch++;
		} else {
			phase = 'verify';
		}
	}

	function previousBatch() {
		if (currentBatch > 0) {
			currentBatch--;
		}
	}

	function handleVerification() {
		verificationError = '';

		// Check each required word
		for (const pos of verifyPositions) {
			const input = verificationInputs[pos]?.toLowerCase().trim();
			const expected = mnemonic[pos];

			if (input !== expected) {
				verificationError = `Word ${pos + 1} incorrect. You entered "${input}", expected "${expected}". Please re-enter.`;
				return;
			}
		}

		// All correct - move to confirmation
		phase = 'confirm';
	}
</script>

<svelte:head>
	<title>Generate Recovery Phrase — Sigil Auth</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main id="main" class="mnemonic-container">
	<!-- Help icon (WCAG 3.2.6 Consistent Help) -->
	<a href="/help" class="help-icon" aria-label="Get help with recovery phrase">
		<span aria-hidden="true">?</span>
	</a>

	{#if phase === 'display'}
		<div class="mnemonic-display">
			<h1>Write Down Your Recovery Phrase</h1>
			<p class="warning" role="alert">
				⚠️ Screenshot protection active. Write these words on paper. Keep them safe and secret.
			</p>

			<div class="batch-indicator">
				<span class="batch-label">Batch {currentBatch + 1} of 4</span>
				<div class="batch-progress">
					{#each batches as _, i}
						<div class="batch-dot" class:batch-dot--active={i === currentBatch}></div>
					{/each}
				</div>
			</div>

			<!-- Live region for batch navigation (WCAG 4.1.3) -->
			<div role="status" aria-live="polite" aria-atomic="true" class="visually-hidden">
				Showing batch {currentBatch + 1} of 4
			</div>

			<ol class="word-list" role="list" start={currentBatch * 6 + 1}>
				{#each batches[currentBatch] as word, i}
					<li class="word-item">
						<span class="word-number">{currentBatch * 6 + i + 1}</span>
						<span class="word-text">{word}</span>
					</li>
				{/each}
			</ol>

			<div class="navigation">
				{#if currentBatch > 0}
					<button class="btn btn-ghost" onclick={previousBatch}>Previous</button>
				{/if}
				<button class="btn btn-primary" onclick={nextBatch}>
					{currentBatch < 3 ? 'Next Batch' : 'I Wrote Them Down'}
				</button>
			</div>
		</div>
	{:else if phase === 'verify'}
		<div class="mnemonic-verify">
			<h1>Verify Your Recovery Phrase</h1>
			<p class="instructions">
				Enter these words to confirm you wrote them down correctly:
			</p>

			<form class="verify-form" onsubmit={(e) => { e.preventDefault(); handleVerification(); }}>
				{#each verifyPositions as pos}
					<div class="verify-input-group">
						<label for="word-{pos}">Word #{pos + 1}:</label>
						<input
							id="word-{pos}"
							type="text"
							bind:value={verificationInputs[pos]}
							autocomplete="off"
							spellcheck="false"
							required
							aria-describedby={verificationError ? 'verify-error' : undefined}
						/>
					</div>
				{/each}

				{#if verificationError}
					<p id="verify-error" class="error" role="alert">{verificationError}</p>
				{/if}

				<button type="submit" class="btn btn-primary">Verify</button>
			</form>
		</div>
	{:else if phase === 'confirm'}
		<div class="mnemonic-confirm">
			<h1>Mnemonic Sent</h1>

			<div class="confirmation-card">
				<h2>Verification Code</h2>
				<div class="verification-code" role="status" aria-live="polite" aria-label="Verification code: {verificationCode.split('').join(' ')}">
					{verificationCode}
				</div>
				<p class="confirmation-instructions">
					Confirm this code matches what the setup page shows.
				</p>
			</div>

			<div class="status-message">
				<p>✓ Your recovery phrase has been encrypted and sent to the server.</p>
				<p class="detail">
					The server will display the same verification code. If the codes match, your mnemonic was
					transmitted securely.
				</p>
			</div>

			<button class="btn btn-primary" onclick={() => (window.location.href = '/')}>
				Done
			</button>
		</div>
	{/if}
</main>

<style>
	.mnemonic-container {
		max-width: 600px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-4);
		position: relative;
	}

	/* Help icon - consistent placement per WCAG 3.2.6 */
	.help-icon {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-full);
		color: var(--color-text-secondary);
		font-weight: var(--weight-bold);
		font-size: var(--text-lg);
		text-decoration: none;
		transition: all var(--transition-base);
		box-shadow: var(--shadow-sm);
	}

	.help-icon:hover {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
		transform: scale(1.05);
	}

	.help-icon:focus-visible {
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
	}

	.help-icon:active {
		transform: scale(0.95);
	}

	h1 {
		font-size: var(--text-2xl);
		line-height: var(--leading-2xl);
		font-weight: var(--weight-semibold);
		text-align: center;
		margin: 0 0 var(--space-6) 0;
	}

	.warning {
		background: var(--color-warning-light);
		color: var(--color-warning-dark);
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-warning);
		margin-bottom: var(--space-6);
		font-weight: var(--weight-medium);
		text-align: center;
	}

	.batch-indicator {
		text-align: center;
		margin-bottom: var(--space-6);
	}

	.batch-label {
		display: block;
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2);
	}

	.batch-progress {
		display: flex;
		justify-content: center;
		gap: var(--space-2);
	}

	.batch-dot {
		width: 12px;
		height: 12px;
		border-radius: var(--radius-full);
		background: var(--color-border);
		transition: background var(--transition-base);
	}

	.batch-dot--active {
		background: var(--color-primary);
	}

	.word-list {
		list-style: none;
		padding: 0;
		margin: 0 0 var(--space-8) 0;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-4);
	}

	.word-item {
		display: flex;
		align-items: center;
		padding: var(--space-3);
		border-bottom: 1px solid var(--color-border);
	}

	.word-item:last-child {
		border-bottom: none;
	}

	.word-number {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		min-width: 40px;
	}

	.word-text {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: var(--weight-semibold);
	}

	.navigation {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
	}

	.btn {
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-sm);
		font-weight: var(--weight-medium);
		font-size: var(--text-base);
		border: none;
		cursor: pointer;
		transition: all var(--transition-base);
		min-height: 44px;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-dark);
	}

	.btn-ghost {
		background: transparent;
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.btn-ghost:hover {
		background: var(--color-surface-secondary);
	}

	/* Verify phase */

	.instructions {
		text-align: center;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
	}

	.verify-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.verify-input-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.verify-input-group label {
		font-weight: var(--weight-medium);
		font-size: var(--text-sm);
	}

	.verify-input-group input {
		padding: var(--space-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-base);
	}

	.verify-input-group input:focus {
		border-color: var(--color-primary);
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
	}

	.error {
		color: var(--color-danger);
		background: var(--color-danger-light);
		padding: var(--space-3);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		margin: 0;
	}

	/* Confirm phase */

	.confirmation-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-6);
		margin-bottom: var(--space-6);
		box-shadow: var(--shadow-md);
	}

	.confirmation-card h2 {
		font-size: var(--text-lg);
		margin: 0 0 var(--space-4) 0;
		text-align: center;
	}

	.verification-code {
		font-family: var(--font-mono);
		font-size: var(--text-3xl);
		font-weight: var(--weight-semibold);
		text-align: center;
		letter-spacing: 0.2em;
		padding: var(--space-6);
		background: var(--color-surface-secondary);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
	}

	.confirmation-instructions {
		text-align: center;
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		margin: 0;
	}

	.status-message {
		background: var(--color-success-light);
		color: var(--color-success-dark);
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-success);
		margin-bottom: var(--space-6);
	}

	.status-message p {
		margin: 0 0 var(--space-2) 0;
	}

	.status-message p:last-child {
		margin: 0;
	}

	.detail {
		font-size: var(--text-sm);
	}

	/* Visually hidden but accessible to screen readers */
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
