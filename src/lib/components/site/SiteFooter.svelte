<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="wrap">
		<div class="footer__grid">
			<div class="footer__brand">
				<div class="footer__brand-row">
					<img src="/sigil.png" alt="" aria-hidden="true" />
					<span>Sigil Auth</span>
				</div>
				<p>
					Open source strong authentication. Hardware-backed keys, mutual signing, push delivery,
					multi-party approval. A project by Wagmi Labs.
				</p>
			</div>

			<div class="footer__col">
				<h4>Product</h4>
				<ul role="list">
					<li><a href="/docs">Documentation</a></li>
					<li><a href="/docs/sdk-node">Node SDK</a></li>
					<li><a href="/docs/sdk-go">Go SDK</a></li>
					<li><a href="/docs/mpa-setup">MPA setup</a></li>
				</ul>
			</div>

			<div class="footer__col">
				<h4>Source</h4>
				<ul role="list">
					<li>
						<a href="https://github.com/sigilauth" target="_blank" rel="noopener">GitHub ↗</a>
					</li>
					<li><a href="/docs/self-hosting">Self-hosting</a></li>
					<li><a href="/docs/integrator-quickstart">Quickstart</a></li>
				</ul>
			</div>

			<div class="footer__col">
				<h4>Legal</h4>
				<ul role="list">
					<li><a href="/privacy">Privacy policy</a></li>
					<li><a href="/terms">Terms of service</a></li>
					<li>
						<a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener"
							>AGPL-3.0 (code)</a
						>
					</li>
					<li>
						<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener"
							>Apache-2.0 (specs)</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="footer__meta">
			<span>© {currentYear} Wagmi Labs</span>
			<span
				>Last updated <time datetime="2026-04-24">April 2026</time></span
			>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: var(--s12) 0 var(--s8);
		border-top: 1px solid var(--border);
		background: var(--bg-raised);
	}

	.wrap {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--s6);
	}

	.footer__grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: var(--s8);
		padding-bottom: var(--s10);
		border-bottom: 1px solid var(--border);
	}

	.footer__brand {
		display: flex;
		flex-direction: column;
		gap: var(--s4);
		max-width: 320px;
	}

	.footer__brand-row {
		display: flex;
		align-items: center;
		gap: var(--s3);
		font-weight: 600;
		color: var(--text);
	}

	.footer__brand-row img {
		width: 28px;
		height: 28px;
	}

	.footer__brand p {
		color: var(--text-muted);
		font-size: 0.875rem;
		line-height: 1.55;
	}

	.footer__col h4 {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-dim);
		font-weight: 500;
		margin-bottom: var(--s4);
	}

	.footer__col ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--s3);
	}

	.footer__col a {
		color: var(--text-muted);
		font-size: 0.9375rem;
		text-decoration: none;
		transition: color var(--t-fast);
	}

	.footer__col a:hover {
		color: var(--text);
	}

	.footer__meta {
		margin-top: var(--s6);
		display: flex;
		justify-content: space-between;
		font-size: 0.8125rem;
		color: var(--text-dim);
		font-family: var(--font-mono);
	}

	.footer__meta time {
		color: var(--text-muted);
	}

	@media (max-width: 780px) {
		.footer__grid {
			grid-template-columns: 1fr 1fr;
		}
		.footer__brand {
			grid-column: span 2;
		}
		.footer__meta {
			flex-direction: column;
			gap: var(--s2);
			text-align: center;
		}
	}
</style>
