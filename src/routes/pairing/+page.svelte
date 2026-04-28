<script lang="ts">
	import Pictogram from '$lib/components/Pictogram.svelte';
	import CodeEntry from '$lib/components/CodeEntry.svelte';

	// Placeholder data (will be loaded from server in +page.server.ts)
	const serverPictogram = ['🔒', '🛡️', '🔐', '🗝️', '⚡'];
	const serverPictogramSpeakable = 'lock-shield-key-oldkey-lightning';
	const pairingCode = '84729135';

	let codeValue = $state('');
	let codeError = $state('');
	let copyStatus = $state('');

	function handleCodeChange(code: string) {
		codeValue = code;
		codeError = ''; // Clear error on change
	}

	function handleCodeComplete(code: string) {
		console.log('Code complete:', code);
		// TODO: Call pairing redemption endpoint
	}

	async function handleCopy(text: string, label: string) {
		try {
			await navigator.clipboard.writeText(text);
			copyStatus = `${label} copied to clipboard`;
			setTimeout(() => { copyStatus = ''; }, 3000);
		} catch (err) {
			copyStatus = `Failed to copy ${label}`;
			setTimeout(() => { copyStatus = ''; }, 3000);
		}
	}
</script>

<svelte:head>
	<title>Pair Device — Sigil Auth</title>
</svelte:head>

<main id="main" tabindex="-1" class="pairing-container">
	<!-- Help icon (WCAG 3.2.6 Consistent Help) -->
	<a href="/help" class="help-icon" aria-label="Get help with pairing">
		<span aria-hidden="true">?</span>
	</a>

	<h1>Pair Your Device</h1>
	<p class="intro">Choose a method to pair your Sigil Auth app with this server.</p>

	<div class="pairing-methods">
		<section class="method" aria-labelledby="qr-heading">
			<h2 id="qr-heading">Scan QR Code</h2>
			<div class="qr-placeholder">
				<div class="qr-frame" role="status" aria-label="QR code for pairing with this server. Cannot scan? Enter the 8-digit code below instead.">
					<!-- QR code will be rendered here by server -->
					<!-- TODO: When QR renders as <img>, add alt="QR code for pairing with [Server Name]. Cannot scan? Enter code below." -->
					<!-- TODO: If rendered as <svg>, use role="img" aria-label="..." -->
					<p class="qr-loading">Generating QR code...</p>
				</div>
			</div>
			<div class="server-identity">
				<p class="identity-label">Server:</p>
				<Pictogram
					pictogram={serverPictogram}
					speakable={serverPictogramSpeakable}
					size="compact"
					label="Server fingerprint"
				/>
			</div>
			<ol class="instructions">
				<li>Open Sigil Auth app</li>
				<li>Tap "Scan QR Code"</li>
				<li>Point camera at this code</li>
			</ol>
			<p class="expiry" role="status" aria-live="polite">Expires in <strong>4:58</strong></p>
		</section>

		<section class="method" aria-labelledby="code-heading">
			<h2 id="code-heading">Enter Pairing Code</h2>
			<p class="method-description">Can't scan the QR code? Enter this 8-digit code instead.</p>
			<div class="pairing-code-display" aria-label="Pairing code: 8 4 7 2 9 1 3 5">
				<span class="code-group">
					<span class="code-digit">8</span>
					<span class="code-digit">4</span>
					<span class="code-digit">7</span>
					<span class="code-digit">2</span>
				</span>
				<span class="code-group">
					<span class="code-digit">9</span>
					<span class="code-digit">1</span>
					<span class="code-digit">3</span>
					<span class="code-digit">5</span>
				</span>
			</div>

			<p class="method-note">Or enter the code in your app:</p>
			<CodeEntry
				bind:code={codeValue}
				onComplete={handleCodeComplete}
				error={codeError}
			/>
			<ol class="instructions">
				<li>Open Sigil Auth app</li>
				<li>Tap "Enter Pairing Code"</li>
				<li>Enter: 84729135</li>
			</ol>
			<p class="code-info" role="status">
				Attempts remaining: <strong>3</strong>
			</p>
		</section>
	</div>

	<!-- Page-specific help (complements top-right help icon per WCAG 3.2.6) -->
	<details class="help-section">
		<summary>Cannot scan QR code?</summary>
		<p>
			If you're unable to use the QR code or pairing code, you can manually enter the server
			details:
		</p>
		<dl class="manual-entry">
			<dt>Server URL:</dt>
			<dd>
				<code>https://sigil.example.com:8443</code>
				<button class="copy-btn" aria-label="Copy server URL" onclick={() => handleCopy('https://sigil.example.com:8443', 'Server URL')}>Copy</button>
			</dd>
			<dt>Server public key:</dt>
			<dd>
				<code>Ag8xYzI3ZWRkNDUzYmNlYzVmMTJjNmI5MzA4OGY0...</code>
				<button class="copy-btn" aria-label="Copy public key" onclick={() => handleCopy('Ag8xYzI3ZWRkNDUzYmNlYzVmMTJjNmI5MzA4OGY0...', 'Server public key')}>Copy</button>
			</dd>
			<dt>Session token:</dt>
			<dd>
				<code>stk_a1b2c3d4e5f6...</code>
				<button class="copy-btn" aria-label="Copy session token" onclick={() => handleCopy('stk_a1b2c3d4e5f6...', 'Session token')}>Copy</button>
			</dd>
		</dl>
	</details>

	<!-- Live region for copy status announcements (WCAG 4.1.3) -->
	{#if copyStatus}
		<div role="status" aria-live="polite" aria-atomic="true" class="visually-hidden">
			{copyStatus}
		</div>
	{/if}
</main>

<style>
	.pairing-container {
		max-width: 1000px;
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
		margin: 0 0 var(--space-4) 0;
	}

	.intro {
		text-align: center;
		color: var(--color-text-secondary);
		margin: 0 0 var(--space-12) 0;
	}

	.pairing-methods {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-8);
		margin-bottom: var(--space-12);
	}

	.method {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-6);
		box-shadow: var(--shadow-sm);
	}

	.method h2 {
		font-size: var(--text-lg);
		margin: 0 0 var(--space-4) 0;
	}

	.method-description {
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		margin: 0 0 var(--space-4) 0;
	}

	.qr-frame {
		width: 250px;
		height: 250px;
		margin: 0 auto var(--space-4);
		background: var(--color-surface-secondary);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.qr-loading {
		color: var(--color-text-secondary);
	}

	.pairing-code-display {
		display: flex;
		justify-content: center;
		gap: var(--space-3);
		margin: 0 0 var(--space-4) 0;
	}

	.method-note {
		text-align: center;
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin: var(--space-4) 0;
	}

	.code-group {
		display: flex;
		gap: var(--space-1);
	}

	.code-digit {
		width: 48px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: var(--text-xl);
		font-weight: var(--weight-semibold);
		background: var(--color-surface-secondary);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	.instructions {
		list-style: decimal;
		padding-left: var(--space-6);
		margin: 0 0 var(--space-4) 0;
		color: var(--color-text-secondary);
	}

	.instructions li {
		margin-bottom: var(--space-2);
	}

	.expiry {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-align: center;
		margin: 0;
	}

	.server-identity {
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border);
	}

	.identity-label {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-align: center;
		margin: 0 0 var(--space-2) 0;
	}

	.help-section {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-4);
	}

	.help-section summary {
		cursor: pointer;
		font-weight: var(--weight-medium);
		padding: var(--space-2);
	}

	.help-section summary:hover {
		background: var(--color-surface-secondary);
		border-radius: var(--radius-sm);
	}

	.manual-entry {
		margin-top: var(--space-4);
	}

	.manual-entry dt {
		font-weight: var(--weight-medium);
		margin-top: var(--space-3);
	}

	.manual-entry dd {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: var(--space-2) 0;
	}

	.manual-entry code {
		flex: 1;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface-secondary);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-sm);
		overflow-x: auto;
	}

	.copy-btn {
		padding: var(--space-2) var(--space-3);
		border: 1px solid var(--color-border);
		background: transparent;
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		transition: background var(--transition-base);
	}

	.copy-btn:hover {
		background: var(--color-surface-secondary);
	}

	.copy-btn:focus-visible {
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
	}

	.copy-btn:active {
		transform: scale(0.98);
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

	/* WCAG 1.4.10 Reflow - no horizontal scroll at 320px viewport (400% zoom) */
	@media (max-width: 480px) {
		.pairing-methods {
			grid-template-columns: 1fr;
		}

		.pairing-container {
			padding: var(--space-4) var(--space-2);
		}

		.method {
			padding: var(--space-4);
		}

		.code-digit {
			width: 36px;
			height: 44px;
			font-size: var(--text-base);
		}

		.pairing-code-display {
			gap: var(--space-2);
		}

		.code-group {
			gap: 2px;
		}

		.qr-frame {
			width: 100%;
			max-width: 250px;
			height: 250px;
		}
	}
</style>
