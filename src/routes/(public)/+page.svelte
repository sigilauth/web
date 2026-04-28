<svelte:head>
	<title>Sigil Auth — Open Source Push Authentication with Hardware-Backed Keys</title>
	<meta
		name="description"
		content="Open source push authentication using ECDSA keys backed by Secure Enclave (iOS) and StrongBox (Android). Mutual authentication, M-of-N approval, zero shared secrets. Self-hosted, AGPL-3.0."
	/>
	<meta name="author" content="Wagmi Labs" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://sigilauth.com/" />

	<meta property="og:title" content="Sigil Auth — Open Source Push Authentication" />
	<meta
		property="og:description"
		content="Hardware-backed keys, mutual authentication, multi-party approval. No passwords, no shared secrets. Self-hosted, AGPL-3.0."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sigilauth.com/" />
	<meta property="og:image" content="https://sigilauth.com/generated/og-image.jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Sigil Auth" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Sigil Auth — Open Source Push Authentication" />
	<meta
		name="twitter:description"
		content="Hardware-backed keys, mutual authentication, M-of-N approval. No passwords. Self-hosted."
	/>
	<meta name="twitter:image" content="https://sigilauth.com/generated/og-image.jpeg" />

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Sigil Auth',
		url: 'https://sigilauth.com',
		logo: 'https://sigilauth.com/sigil.png',
		description: 'Open source push authentication with hardware-backed keys',
		parentOrganization: { '@type': 'Organization', name: 'Wagmi Labs' },
		sameAs: ['https://github.com/sigilauth', 'https://www.linkedin.com/company/wagmi-labs']
	})}<\/script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Sigil Auth',
		applicationCategory: 'SecurityApplication',
		operatingSystem: ['iOS', 'Android', 'macOS', 'Windows', 'Linux'],
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		license: 'https://www.gnu.org/licenses/agpl-3.0.html',
		downloadUrl: 'https://github.com/sigilauth',
		softwareVersion: '1.0.0'
	})}<\/script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is Sigil Auth?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Sigil Auth is an open source push authentication system that uses hardware-backed ECDSA keys. Private keys are generated in Secure Enclave (iOS) or StrongBox (Android) and never leave the device."
				}
			},
			{
				'@type': 'Question',
				name: 'How is Sigil Auth different from WebAuthn?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Sigil Auth provides push-based authentication and multi-party authorization (M-of-N approval) — capabilities WebAuthn doesn't offer. Both use asymmetric cryptography; Sigil adds the push channel."
				}
			},
			{
				'@type': 'Question',
				name: 'Is Sigil Auth free?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes. Sigil Auth is open source under AGPL-3.0 (code) and Apache-2.0 (API specs). No per-seat licensing, no commercial plans.'
				}
			},
			{
				'@type': 'Question',
				name: 'Does Sigil Auth work offline?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Authentication requires network connectivity to deliver push notifications and verify signatures. The cryptographic keys remain in device hardware regardless of network state.'
				}
			},
			{
				'@type': 'Question',
				name: 'What happens if I lose my phone?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Each device has its own keypair. If you lose a device, the admin can revoke that device's public key from the server. Your other registered devices continue to work."
				}
			}
		]
	})}<\/script>`}
</svelte:head>

<!-- HERO -->
<section class="hero">
	<div class="hero__bg" role="presentation" aria-hidden="true"></div>
	<div class="hero__inner">
		<div class="hero__right">
			<div class="hero__eyebrows">
				<span class="eyebrow"><span class="dot"></span> v0.1.0 released</span>
				<a
					href="https://github.com/sigilauth"
					class="eyebrow eyebrow--license"
					target="_blank"
					rel="noopener"
					aria-label="AGPL-3.0 licensed, source on GitHub"
				>
					<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"
						><path
							d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.32c-2.23.48-2.7-1.08-2.7-1.08-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/></svg
					>
					Open source · AGPL-3.0
				</a>
			</div>
			<h1>
				Hardware keys. <span class="accent">Multi-party approval.</span> Open source.
			</h1>
			<p class="hero__sub">
				Your private key lives in your device's secure chip and never leaves. Critical actions need
				sign-off from multiple people. No passwords. No shared secrets. Just proof.
			</p>
			<div class="btn-row">
				<a href="/docs" class="btn btn--primary">Read the docs</a>
				<a
					href="https://github.com/sigilauth"
					class="btn btn--ghost"
					target="_blank"
					rel="noopener"
				>
					<svg class="gh-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"
						><path
							d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.32c-2.23.48-2.7-1.08-2.7-1.08-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/></svg
					>
					Star on GitHub
				</a>
			</div>
			<div class="hero__meta">
				<strong>iOS</strong>
				<span class="sep">·</span>
				<strong>Android</strong>
				<span class="sep">·</span>
				<strong>macOS</strong>
				<span class="sep">·</span>
				<strong>Windows</strong>
				<span class="sep">·</span>
				<strong>Linux</strong>
				<span class="sep">·</span>
				<span>AGPL-3.0</span>
			</div>
		</div>
	</div>
</section>

<!-- DEFINITION (AI citability) -->
<section class="definition">
	<div class="wrap">
		<div class="definition__card">
			<strong>Sigil Auth</strong> is an open source push authentication system that uses ECDSA P-256
			keys stored in device hardware. Authentication is cryptographic challenge-response — no
			passwords, no TOTP seeds, no shared secrets. The private key lives in the Secure Enclave (iOS)
			or StrongBox (Android) and never leaves the chip.
		</div>
	</div>
</section>

<!-- HOW IT WORKS -->
<section class="how" id="how">
	<div class="wrap">
		<div class="how__grid">
			<div>
				<span class="section-label">How it works</span>
				<div class="how__head">
					<h2>Tap to approve. That's it.</h2>
					<p>
						Push arrives. Biometric gate. Cryptographic signature. Mutual authentication — both
						sides prove identity, every time.
					</p>
				</div>

				<div class="steps">
					<div class="step">
						<span class="step__num">1</span>
						<div class="step__body">
							<h4>Server signs a challenge</h4>
							<p>
								Your app calls the SDK. Server generates a random challenge, signs it with its
								private key, pushes to the device.
							</p>
						</div>
					</div>
					<div class="step">
						<span class="step__num">2</span>
						<div class="step__body">
							<h4>Device verifies, user approves</h4>
							<p>
								Device verifies the server signature — phishing sites can't fake it. User sees
								what they're approving and confirms with Face ID or fingerprint.
							</p>
						</div>
					</div>
					<div class="step">
						<span class="step__num">3</span>
						<div class="step__body">
							<h4>Device signs the response</h4>
							<p>
								Hardware chip signs with the private key that never leaves. Server verifies the
								signature against the stored public key. Done.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="codeblock" role="region" aria-label="Example integration">
				<div class="codeblock__head">
					<span class="codeblock__dots">
						<span class="codeblock__dot"></span>
						<span class="codeblock__dot"></span>
						<span class="codeblock__dot"></span>
					</span>
					<span class="codeblock__title">server.ts</span>
					<span class="codeblock__lang">Node</span>
				</div>
				<pre><code><span class="tok-k">import</span> {'{'} sigil {'}'} <span class="tok-k">from</span> <span class="tok-s">'@sigilauth/sdk'</span>;

<span class="tok-c">// Create a challenge bound to an action</span>
<span class="tok-k">const</span> challenge = <span class="tok-k">await</span> sigil.auth.<span class="tok-f">createChallenge</span>({'({'}
  <span class="tok-p">userId</span>:  <span class="tok-s">'user_123'</span>,
  <span class="tok-p">action</span>:  <span class="tok-s">'Sign in to acme-corp.com'</span>,
  <span class="tok-p">ttl</span>:     <span class="tok-n">120</span>,
{'});'}

<span class="tok-c">// Push arrives on user's device</span>
<span class="tok-c">// User approves with Face ID</span>
<span class="tok-c">// Hardware signs with key that never leaves the chip</span>

<span class="tok-k">const</span> {'{'} verified, pictogram {'}'} = <span class="tok-k">await</span>
  sigil.auth.<span class="tok-f">verify</span>(challenge.<span class="tok-p">id</span>);

<span class="tok-c">// verified:  true</span>
<span class="tok-c">// pictogram: ['🍎','🍌','✈️','🚗','🐕']</span></code></pre>
			</div>
		</div>
	</div>
</section>

<!-- FEATURES (asymmetric grid) -->
<section class="features">
	<div class="wrap">
		<div class="features__head">
			<span class="section-label">Why Sigil</span>
			<h2>Hardware-backed, from the chip up.</h2>
			<p>
				Private keys generated in Secure Enclave or StrongBox. Stateless service. Native
				multi-party quorum. Open source from day one.
			</p>
		</div>

		<div class="features__grid">
			<article class="feat feat--wide feat--highlight">
				<div class="feat__body">
					<span class="feat__icon" aria-hidden="true">🔒</span>
					<h3>Your keys never leave your device.</h3>
					<p>
						Private keys are generated inside the Secure Enclave (iOS) or StrongBox (Android). The
						chip signs; it doesn't export. A server breach yields only public keys — which are, by
						definition, public.
					</p>
					<p>
						No TOTP seeds sitting in databases. No SMS codes to intercept. No shared secrets to
						steal.
					</p>
				</div>
				<div class="feat__visual">
					<img
						src="/generated/phone-push.png"
						alt="Phone showing a Sigil Auth push notification to approve sign-in, with a glowing Approve with Face ID button"
					/>
				</div>
			</article>

			<article class="feat">
				<span class="feat__icon" aria-hidden="true">🧩</span>
				<h3>Stateless, by design.</h3>
				<p>
					The auth service stores nothing. No user database. No key table. Identity is
					mnemonic-derived and deployed as a single Docker image. Your app keeps its own user →
					device_public_key mapping.
				</p>
				<p>Nothing to breach. Nothing to migrate. Nothing to pay per-seat for.</p>
			</article>

			<article class="feat">
				<span class="feat__icon" aria-hidden="true">🛠️</span>
				<h3>Test without a device.</h3>
				<p>
					The CLI tool simulates an iOS/Android device for integration testing. Perfect for CI
					pipelines, local dev loops, and smoke tests. No phone required.
				</p>
				<p>
					<a href="/docs/cli-device" style="color: var(--accent); text-decoration: underline;">Get the CLI →</a>
				</p>
			</article>
		</div>
	</div>
</section>

<!-- MPA SECTION -->
<section class="mpa" id="mpa">
	<div class="wrap">
		<div class="mpa__grid">
			<div class="mpa__copy">
				<span class="section-label">Multi-party approval</span>
				<h2>Big decisions need more than one yes.</h2>
				<p>
					Destructive operations shouldn't hinge on a single compromised credential. Sigil supports
					native <strong class="mpa__accent">M-of-N</strong> quorum — delete the production database?
					That's going to need sign-off from 2-of-3 admins first.
				</p>
				<ul class="mpa__bullets">
					<li>
						<span
							><strong>Group-based</strong> — quorum is over <em>people</em>, not devices. Same
							person on two phones counts once.</span
						>
					</li>
					<li>
						<span
							><strong>Action-scoped</strong> — every approver sees exactly what they're signing.
							No blind approvals.</span
						>
					</li>
					<li>
						<span
							><strong>Cryptographically verified</strong> — each signature is checked against a
							registered public key. No fakes.</span
						>
					</li>
					<li>
						<span
							><strong>Unique to Sigil</strong> — Duo locks this behind enterprise. WebAuthn can't
							express it. Passkeys don't approve together.</span
						>
					</li>
				</ul>
			</div>
			<div class="mpa__visual">
				<img
					src="/generated/phone-mpa.png"
					alt="Phone showing multi-party approval UI with Sarah Johnson approved, user pending, and Mike Chen not required"
				/>
			</div>
		</div>
	</div>
</section>

<!-- COMPARISON TABLE -->
<section class="compare" id="compare">
	<div class="wrap">
		<div class="compare__head">
			<span class="section-label">Compared</span>
			<h2>How Sigil stacks up.</h2>
			<p>Every method has trade-offs. Here are the ones that matter.</p>
		</div>

		<div class="table-wrap">
			<table class="compare__table">
				<thead>
					<tr>
						<th>Method</th>
						<th>Secret</th>
						<th>Hardware</th>
						<th>Push</th>
						<th>M-of-N</th>
						<th>License</th>
						<th>Self-host</th>
					</tr>
				</thead>
				<tbody>
					<tr class="compare__row--hero">
						<td>Sigil Auth</td>
						<td><span class="yes">None</span></td>
						<td><span class="yes">Yes</span></td>
						<td><span class="yes">Yes</span></td>
						<td><span class="yes">Native</span></td>
						<td><span class="yes">AGPL-3.0</span></td>
						<td><span class="yes">Yes</span></td>
					</tr>
					<tr>
						<td>WebAuthn / Passkeys</td>
						<td><span class="yes">None</span></td>
						<td><span class="yes">Yes</span></td>
						<td><span class="no">No</span></td>
						<td><span class="no">No</span></td>
						<td><span class="maybe">Spec only</span></td>
						<td><span class="yes">Yes</span></td>
					</tr>
					<tr>
						<td>TOTP (Authy, Google Auth)</td>
						<td><span class="no">Yes — seed</span></td>
						<td><span class="no">No</span></td>
						<td><span class="no">No</span></td>
						<td><span class="no">No</span></td>
						<td><span class="maybe">Various</span></td>
						<td><span class="yes">Yes</span></td>
					</tr>
					<tr>
						<td>Duo / Okta MFA</td>
						<td><span class="yes">None</span></td>
						<td><span class="maybe">Optional</span></td>
						<td><span class="yes">Yes</span></td>
						<td><span class="no">Enterprise only</span></td>
						<td><span class="no">No</span></td>
						<td><span class="no">No</span></td>
					</tr>
					<tr>
						<td>YubiKey (hardware token)</td>
						<td><span class="yes">None</span></td>
						<td><span class="yes">Yes</span></td>
						<td><span class="no">No</span></td>
						<td><span class="no">No</span></td>
						<td><span class="no">Firmware closed</span></td>
						<td><span class="maybe">N/A</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- PICTOGRAM -->
<section class="pictogram">
	<div class="wrap wrap--narrow">
		<span class="section-label">Pictogram verification</span>
		<h2>Five emoji. One proof.</h2>
		<p class="pictogram__sub">
			Every device and server gets a 5-emoji pictogram deterministically derived from its public
			key. Speak it over the phone. Compare it with your admin. Confirm you're paired with the right
			endpoint before any trust is established.
		</p>
		<div
			class="pictogram__row"
			role="img"
			aria-label="Example device pictogram: apple, banana, plane, car, dog"
		>
			<span class="pictogram__emoji">🍎</span>
			<span class="pictogram__emoji">🍌</span>
			<span class="pictogram__emoji">✈️</span>
			<span class="pictogram__emoji">🚗</span>
			<span class="pictogram__emoji">🐕</span>
		</div>
		<div class="pictogram__label">apple · banana · plane · car · dog</div>
		<p class="pictogram__caption">
			256-emoji speakable set. Skin-tone-free. Flag-free. Compound-free. Derived from
			SHA-256(public_key).
		</p>
	</div>
</section>

<!-- FAQ -->
<section class="faq" id="faq">
	<div class="wrap wrap--narrow">
		<div class="faq__head">
			<span class="section-label">FAQ</span>
			<h2>Answers.</h2>
		</div>
		<div class="faq__list">
			<article class="faq__item">
				<h3>What is Sigil Auth?</h3>
				<p>
					Sigil Auth is an open source push authentication system that uses ECDSA P-256 keys stored
					in device hardware. Authentication is cryptographic challenge-response — no passwords, no
					TOTP seeds, no shared secrets. The private key lives in the Secure Enclave (iOS) or
					StrongBox (Android) and never leaves the chip.
				</p>
			</article>
			<article class="faq__item">
				<h3>How is Sigil Auth different from WebAuthn?</h3>
				<p>
					Sigil Auth provides push-based authentication and multi-party authorization (M-of-N
					approval) — capabilities WebAuthn doesn't offer. Both use asymmetric cryptography; Sigil
					adds the push channel and group approval workflows.
				</p>
			</article>
			<article class="faq__item">
				<h3>Is Sigil Auth free?</h3>
				<p>
					Yes. Sigil Auth is open source under AGPL-3.0 (code) and Apache-2.0 (API specs). No
					per-seat licensing, no commercial plans. Use it, modify it, deploy it at any scale
					without paying licensing fees.
				</p>
			</article>
			<article class="faq__item">
				<h3>Does Sigil Auth work offline?</h3>
				<p>
					Authentication requires network connectivity to deliver push notifications and verify
					signatures. The cryptographic keys remain in device hardware regardless of network state
					— once a challenge is delivered, the device can sign it without internet access, but the
					response must be transmitted back to the server for verification.
				</p>
			</article>
			<article class="faq__item">
				<h3>What happens if I lose my phone?</h3>
				<p>
					Each device has its own keypair. If you lose a device, the admin can revoke that device's
					public key from the server. Your other registered devices continue to work. For account
					recovery, the admin registers a new device using the pairing flow (QR code or 8-digit
					code).
				</p>
			</article>
			<article class="faq__item">
				<h3>What platforms does Sigil Auth support?</h3>
				<p>
					Native apps for iOS (Secure Enclave) and Android (StrongBox). Desktop apps for macOS,
					Windows, and Linux. The auth service runs in Docker and works with Go and Node SDKs for
					integration into your application.
				</p>
			</article>
			<article class="faq__item">
				<h3>Can I use Sigil alongside my existing login?</h3>
				<p>
					Yes. Sigil is designed as Tier 2/3 — step-up authentication and multi-party approval, not
					initial login. Use passwords or passkeys for sign-in, then use Sigil to gate sensitive
					operations that deserve stronger proof.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="cta">
	<div class="wrap">
		<div class="cta__inner">
			<span class="eyebrow eyebrow--muted">Ship it this week</span>
			<h2>Ready when you are.</h2>
			<p>
				Read the docs. Clone the repo. Self-host in an afternoon. Or ask a question — the protocol
				spec is public.
			</p>
			<div class="btn-row">
				<a href="/docs" class="btn btn--primary">Read the docs</a>
				<a
					href="https://github.com/sigilauth"
					class="btn btn--ghost"
					target="_blank"
					rel="noopener"
				>
					<svg class="gh-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"
						><path
							d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.32c-2.23.48-2.7-1.08-2.7-1.08-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/></svg
					>
					View on GitHub
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.wrap {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--s6);
	}
	.wrap--narrow {
		max-width: 820px;
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: var(--s2);
		padding: var(--s1) var(--s3);
		border-radius: 999px;
		background: var(--accent-bg);
		border: 1px solid var(--accent-dim);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.eyebrow--muted {
		background: var(--surface);
		border-color: var(--border);
		color: var(--text-muted);
	}

	.eyebrow--license {
		background: var(--surface);
		border-color: var(--border-bright);
		color: var(--text-muted);
		transition:
			color var(--t-fast),
			border-color var(--t-fast);
	}
	.eyebrow--license:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}
	.eyebrow--license :global(svg) {
		flex-shrink: 0;
	}

	.hero__eyebrows {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s2);
	}

	.eyebrow :global(.dot) {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.45;
		}
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

	:global(h1, h2, h3, h4) {
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	h1 {
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		background: linear-gradient(180deg, var(--text) 0%, var(--text-muted) 140%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h1 .accent {
		background: linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h2 {
		font-size: clamp(1.75rem, 3vw, 2.5rem);
	}

	h3 {
		font-size: 1.375rem;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	/* ============ BUTTONS ============ */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--s2);
		padding: var(--s3) var(--s6);
		border-radius: var(--r-md);
		font-family: var(--font-sans);
		font-size: 0.9375rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		cursor: pointer;
		border: 1px solid transparent;
		transition:
			transform var(--t-fast),
			background var(--t-fast),
			box-shadow var(--t-base),
			border-color var(--t-fast);
		white-space: nowrap;
		text-decoration: none;
	}

	.btn--primary {
		background: var(--accent);
		color: var(--bg);
		box-shadow:
			0 0 0 0 var(--accent),
			0 4px 20px -4px rgba(61, 252, 232, 0.4);
	}

	.btn--primary:hover {
		box-shadow:
			0 0 0 4px var(--accent-bg),
			0 8px 30px -4px rgba(61, 252, 232, 0.55);
		transform: translateY(-1px);
	}
	.btn--primary:active {
		transform: translateY(0);
	}

	.btn--ghost {
		background: transparent;
		color: var(--text);
		border-color: var(--border-bright);
	}
	.btn--ghost:hover {
		background: var(--surface);
		border-color: var(--text-dim);
	}

	.btn-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s3);
	}

	.btn .gh-icon {
		width: 16px;
		height: 16px;
	}

	/* ============ HERO ============ */
	.hero {
		position: relative;
		padding: var(--s20) 0 var(--s24);
		overflow: hidden;
		border-bottom: 1px solid var(--border);
	}

	.hero__bg {
		position: absolute;
		inset: 0;
		background-image: url('/generated/hero-bg.jpeg');
		background-size: cover;
		background-position: center left;
		opacity: 0.9;
		z-index: 0;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			radial-gradient(ellipse 80% 60% at 80% 50%, var(--bg) 0%, transparent 70%),
			linear-gradient(180deg, transparent 0%, var(--bg) 100%);
	}

	.hero__inner {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: flex-end;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--s6);
	}

	.hero__right {
		display: flex;
		flex-direction: column;
		gap: var(--s6);
		max-width: 600px;
	}

	.hero__sub {
		font-size: 1.125rem;
		color: var(--text-muted);
		max-width: 560px;
		line-height: 1.6;
	}

	.hero__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--s4);
		padding-top: var(--s4);
		border-top: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
	}
	.hero__meta strong {
		color: var(--text-muted);
		font-weight: 500;
	}
	.hero__meta .sep {
		color: var(--border-bright);
	}

	@media (max-width: 900px) {
		.hero {
			padding: var(--s16) 0 var(--s20);
		}
		.hero__bg {
			opacity: 0.35;
			background-position: center;
		}
		.hero::before {
			background: radial-gradient(
				ellipse 100% 80% at 50% 50%,
				transparent 0%,
				var(--bg) 90%
			);
		}
		.hero__inner {
			justify-content: flex-start;
			text-align: left;
		}
		.hero__right {
			max-width: 100%;
		}
	}

	/* ============ DEFINITION ============ */
	.definition {
		padding: var(--s16) 0;
	}

	.definition__card {
		position: relative;
		padding: var(--s8) var(--s10);
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		font-size: 1.125rem;
		line-height: 1.65;
		color: var(--text);
	}

	.definition__card::before {
		content: '';
		position: absolute;
		left: 0;
		top: var(--s8);
		bottom: var(--s8);
		width: 3px;
		background: var(--accent);
		box-shadow: 0 0 16px var(--accent);
		border-radius: 0 2px 2px 0;
	}

	.definition__card strong {
		color: var(--accent);
		font-weight: 500;
	}

	/* ============ HOW IT WORKS ============ */
	.how {
		padding: var(--s20) 0;
		border-top: 1px solid var(--border);
	}

	.how__grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: var(--s12);
		align-items: start;
	}

	.how__head {
		margin-bottom: var(--s8);
	}
	.how__head h2 {
		margin-bottom: var(--s3);
	}
	.how__head p {
		color: var(--text-muted);
		max-width: 480px;
	}

	.step {
		display: flex;
		gap: var(--s4);
		padding: var(--s4) 0;
		border-top: 1px solid var(--border);
	}
	.step:first-of-type {
		border-top: 0;
		padding-top: 0;
	}
	.step__num {
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 600;
		background: var(--accent-bg);
		color: var(--accent);
		border: 1px solid var(--accent-dim);
	}
	.step__body h4 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: var(--s1);
	}
	.step__body p {
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.55;
	}

	.codeblock {
		background: var(--code-bg);
		border: 1px solid var(--code-border);
		border-radius: var(--r-lg);
		overflow: hidden;
		box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.5);
	}

	.codeblock__head {
		display: flex;
		align-items: center;
		gap: var(--s3);
		padding: var(--s3) var(--s4);
		background: var(--surface);
		border-bottom: 1px solid var(--code-border);
	}

	.codeblock__dots {
		display: flex;
		gap: 6px;
	}
	.codeblock__dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--border-bright);
	}

	.codeblock__title {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--text-dim);
		margin-left: var(--s2);
	}

	.codeblock__lang {
		margin-left: auto;
		padding: 2px var(--s2);
		background: var(--accent-bg);
		border: 1px solid var(--accent-dim);
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.codeblock pre {
		padding: var(--s5) var(--s6);
		font-family: var(--font-mono);
		font-size: 13.5px;
		line-height: 1.7;
		color: var(--text);
		overflow-x: auto;
	}

	.codeblock :global(.tok-k) {
		color: var(--code-keyword);
	}
	.codeblock :global(.tok-s) {
		color: var(--code-string);
	}
	.codeblock :global(.tok-n) {
		color: var(--code-number);
	}
	.codeblock :global(.tok-c) {
		color: var(--code-comment);
		font-style: italic;
	}
	.codeblock :global(.tok-p) {
		color: var(--code-prop);
	}
	.codeblock :global(.tok-f) {
		color: var(--accent);
	}

	@media (max-width: 900px) {
		.how__grid {
			grid-template-columns: 1fr;
			gap: var(--s8);
		}
	}

	/* ============ FEATURES ============ */
	.features {
		padding: var(--s20) 0;
		border-top: 1px solid var(--border);
	}

	.features__head {
		text-align: center;
		margin-bottom: var(--s12);
	}
	.features__head h2 {
		margin-bottom: var(--s3);
	}
	.features__head p {
		color: var(--text-muted);
		max-width: 600px;
		margin: 0 auto;
	}

	.features__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--s5);
	}

	.feat {
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		padding: var(--s8);
		position: relative;
		overflow: hidden;
		transition:
			transform var(--t-base),
			border-color var(--t-base),
			background var(--t-base);
	}

	.feat:hover {
		transform: translateY(-2px);
		border-color: var(--border-bright);
	}

	.feat__icon {
		width: 44px;
		height: 44px;
		border-radius: var(--r-md);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--accent-bg);
		border: 1px solid var(--accent-dim);
		color: var(--accent);
		font-size: 22px;
		margin-bottom: var(--s5);
	}

	.feat h3 {
		margin-bottom: var(--s3);
	}
	.feat p {
		color: var(--text-muted);
		font-size: 0.9375rem;
		line-height: 1.6;
	}
	.feat p + p {
		margin-top: var(--s3);
	}

	.feat--wide {
		grid-column: span 2;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--s8);
		align-items: center;
	}

	.feat--wide .feat__body {
		max-width: 440px;
	}

	.feat--wide .feat__visual {
		position: relative;
		width: 200px;
		height: 260px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.feat--wide .feat__visual img {
		max-width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 20px 40px rgba(61, 252, 232, 0.15));
	}

	.feat--highlight {
		background: linear-gradient(180deg, var(--surface) 0%, var(--bg-raised) 100%);
		border-color: var(--border-bright);
	}

	.feat--highlight::after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 60%;
		height: 1px;
		transform: translateX(-50%);
		background: linear-gradient(90deg, transparent, var(--accent), transparent);
		box-shadow: 0 0 12px var(--accent);
	}

	@media (max-width: 900px) {
		.features__grid {
			grid-template-columns: 1fr;
		}
		.feat--wide {
			grid-column: span 1;
			grid-template-columns: 1fr;
		}
		.feat--wide .feat__visual {
			width: 100%;
			height: 220px;
			margin-top: var(--s4);
		}
	}

	/* ============ MPA ============ */
	.mpa {
		position: relative;
		padding: var(--s24) 0;
		border-top: 1px solid var(--border);
		background:
			radial-gradient(
				ellipse 60% 50% at 20% 50%,
				rgba(61, 252, 232, 0.06),
				transparent 70%
			),
			radial-gradient(
				ellipse 50% 40% at 80% 80%,
				rgba(77, 136, 255, 0.05),
				transparent 70%
			);
		overflow: hidden;
	}

	.mpa__grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--s12);
		align-items: center;
	}

	.mpa__copy h2 {
		margin-bottom: var(--s5);
	}
	.mpa__copy p {
		color: var(--text-muted);
		margin-bottom: var(--s5);
		max-width: 520px;
		font-size: 1.0625rem;
		line-height: 1.65;
	}
	.mpa__accent {
		color: var(--accent);
	}

	.mpa__bullets {
		list-style: none;
		margin-top: var(--s6);
	}
	.mpa__bullets li {
		display: flex;
		gap: var(--s3);
		align-items: start;
		padding: var(--s3) 0;
		color: var(--text-muted);
		font-size: 0.9375rem;
		border-top: 1px solid var(--border);
	}
	.mpa__bullets li:first-child {
		border-top: 0;
	}
	.mpa__bullets li::before {
		content: '';
		flex-shrink: 0;
		width: 6px;
		height: 6px;
		margin-top: 9px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
	}
	.mpa__bullets strong {
		color: var(--text);
		font-weight: 500;
	}

	.mpa__visual {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.mpa__visual img {
		max-height: 560px;
		filter: drop-shadow(0 40px 80px rgba(61, 252, 232, 0.18));
	}

	@media (max-width: 900px) {
		.mpa__grid {
			grid-template-columns: 1fr;
		}
		.mpa__visual {
			order: -1;
		}
		.mpa__visual img {
			max-height: 420px;
		}
	}

	/* ============ COMPARE ============ */
	.compare {
		padding: var(--s20) 0;
		border-top: 1px solid var(--border);
	}

	.compare__head {
		text-align: center;
		margin-bottom: var(--s10);
	}
	.compare__head h2 {
		margin-bottom: var(--s3);
	}
	.compare__head p {
		color: var(--text-muted);
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		background: var(--bg-raised);
	}

	table.compare__table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9375rem;
	}

	.compare__table thead {
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}

	.compare__table th {
		text-align: left;
		padding: var(--s4);
		font-weight: 500;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-muted);
		vertical-align: bottom;
	}

	.compare__table th:first-child {
		padding-left: var(--s6);
	}
	.compare__table th:last-child {
		padding-right: var(--s6);
	}

	.compare__table tbody tr {
		border-bottom: 1px solid var(--border);
		transition: background var(--t-fast);
	}
	.compare__table tbody tr:last-child {
		border-bottom: 0;
	}

	.compare__table tbody tr:hover {
		background: var(--surface);
	}

	.compare__table td {
		padding: var(--s4);
		color: var(--text-muted);
		vertical-align: middle;
		white-space: nowrap;
		font-size: 0.9375rem;
	}

	.compare__table td:first-child {
		padding-left: var(--s6);
		color: var(--text);
		font-weight: 500;
	}
	.compare__table td:last-child {
		padding-right: var(--s6);
	}

	@media (max-width: 980px) {
		.compare__table th,
		.compare__table td {
			padding: var(--s3);
			font-size: 0.8125rem;
		}
		.compare__table th:first-child,
		.compare__table td:first-child {
			padding-left: var(--s4);
		}
		.compare__table th:last-child,
		.compare__table td:last-child {
			padding-right: var(--s4);
		}
	}

	.compare__row--hero {
		background: linear-gradient(90deg, var(--accent-bg) 0%, transparent 100%);
		position: relative;
	}

	.compare__row--hero td:first-child {
		color: var(--text);
		font-weight: 600;
		position: relative;
	}

	.compare__row--hero td:first-child::before {
		content: '';
		position: absolute;
		left: 0;
		top: 6px;
		bottom: 6px;
		width: 3px;
		background: var(--accent);
		border-radius: 0 2px 2px 0;
		box-shadow: 0 0 12px var(--accent);
	}

	.compare__table tbody tr.compare__row--hero:hover {
		background: linear-gradient(90deg, rgba(61, 252, 232, 0.12) 0%, transparent 100%);
	}

	.yes,
	.no,
	.maybe {
		display: inline-flex;
		align-items: center;
		gap: var(--s1);
		font-weight: 500;
	}
	.yes {
		color: var(--accent);
	}
	.no {
		color: var(--danger);
		opacity: 0.7;
	}
	.maybe {
		color: var(--warning);
		opacity: 0.8;
	}

	.yes::before,
	.no::before,
	.maybe::before {
		content: '';
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.yes::before {
		background: var(--accent);
		box-shadow: 0 0 6px var(--accent);
	}
	.no::before {
		background: var(--danger);
		opacity: 0.8;
	}
	.maybe::before {
		background: var(--warning);
	}

	/* ============ PICTOGRAM ============ */
	.pictogram {
		padding: var(--s20) 0;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.pictogram h2 {
		margin-bottom: var(--s3);
	}
	.pictogram__sub {
		color: var(--text-muted);
		max-width: 580px;
		margin: 0 auto var(--s10);
	}

	.pictogram__row {
		display: inline-flex;
		gap: var(--s6);
		padding: var(--s6) var(--s8);
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		position: relative;
	}

	.pictogram__row::before,
	.pictogram__row::after {
		content: '';
		position: absolute;
		top: 50%;
		width: 60px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--accent-dim));
	}
	.pictogram__row::before {
		right: 100%;
		margin-right: 8px;
		transform: translateY(-50%);
	}
	.pictogram__row::after {
		left: 100%;
		margin-left: 8px;
		transform: translateY(-50%);
		background: linear-gradient(90deg, var(--accent-dim), transparent);
	}

	.pictogram__emoji {
		font-size: 48px;
		line-height: 1;
		width: 56px;
		text-align: center;
		filter: drop-shadow(0 2px 8px rgba(61, 252, 232, 0.15));
	}

	.pictogram__label {
		margin-top: var(--s4);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-dim);
		letter-spacing: 0.05em;
	}

	.pictogram__caption {
		margin-top: var(--s6);
		font-size: 0.875rem;
		color: var(--text-dim);
		max-width: 460px;
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 640px) {
		.pictogram__row {
			gap: var(--s3);
			padding: var(--s4);
		}
		.pictogram__emoji {
			font-size: 36px;
			width: 40px;
		}
		.pictogram__row::before,
		.pictogram__row::after {
			display: none;
		}
	}

	/* ============ FAQ ============ */
	.faq {
		padding: var(--s20) 0;
		border-top: 1px solid var(--border);
	}

	.faq__head {
		margin-bottom: var(--s10);
	}
	.faq__head h2 {
		margin-bottom: var(--s3);
	}

	.faq__item {
		padding: var(--s6) 0;
		border-top: 1px solid var(--border);
	}
	.faq__item:first-of-type {
		border-top: 0;
		padding-top: 0;
	}

	.faq__item h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: var(--s3);
		display: flex;
		align-items: baseline;
		gap: var(--s3);
	}

	.faq__item h3::before {
		content: counter(faq, decimal-leading-zero);
		counter-increment: faq;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--accent);
		min-width: 36px;
	}

	.faq__item p {
		color: var(--text-muted);
		line-height: 1.65;
		padding-left: calc(36px + var(--s3));
	}

	.faq__list {
		counter-reset: faq;
	}

	@media (max-width: 640px) {
		.faq__item h3::before {
			min-width: 28px;
		}
		.faq__item p {
			padding-left: 0;
		}
	}

	/* ============ CTA ============ */
	.cta {
		padding: var(--s24) 0;
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--border);
	}

	.cta::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				ellipse 70% 80% at 50% 100%,
				rgba(61, 252, 232, 0.12),
				transparent 70%
			),
			radial-gradient(
				ellipse 40% 60% at 20% 30%,
				rgba(77, 136, 255, 0.08),
				transparent 70%
			);
	}

	.cta__inner {
		position: relative;
		text-align: center;
		max-width: 680px;
		margin: 0 auto;
	}

	.cta h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: var(--s5);
		background: linear-gradient(180deg, var(--text) 0%, var(--text-muted) 130%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.cta p {
		color: var(--text-muted);
		font-size: 1.125rem;
		margin-bottom: var(--s8);
	}
	.cta .btn-row {
		justify-content: center;
	}
</style>
