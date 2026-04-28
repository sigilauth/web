<script lang="ts">
	import { page } from '$app/state';

	const isActive = (href: string) => {
		const current = page.url.pathname;
		if (href === '/') return current === '/';
		return current === href || current.startsWith(href + '/');
	};
</script>

<header class="nav">
	<div class="nav__inner">
		<a href="/" class="nav__brand" aria-label="Sigil Auth — home">
			<img src="/sigil.png" alt="" aria-hidden="true" />
			<span>Sigil Auth</span>
		</a>
		<ul class="nav__links" role="list">
			<li>
				<a href="/" class="nav__link" class:nav__link--active={isActive('/')}>Home</a>
			</li>
			<li>
				<a href="/docs" class="nav__link" class:nav__link--active={isActive('/docs')}>Docs</a>
			</li>
			<li>
				<a href="/status" class="nav__link" class:nav__link--active={isActive('/status')}
					>Status</a
				>
			</li>
			<li>
				<a
					href="https://github.com/sigilauth"
					class="nav__link nav__link--external nav__link--hide-mobile"
					target="_blank"
					rel="noopener"
				>
					GitHub
				</a>
			</li>
		</ul>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: saturate(180%) blur(12px);
		-webkit-backdrop-filter: saturate(180%) blur(12px);
		border-bottom: 1px solid var(--border);
	}

	.nav__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--s4) var(--s6);
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav__brand {
		display: inline-flex;
		align-items: center;
		gap: var(--s3);
		font-weight: 600;
		font-size: 1rem;
		letter-spacing: -0.01em;
		color: var(--text);
		text-decoration: none;
	}

	.nav__brand img {
		width: 32px;
		height: 32px;
	}

	.nav__links {
		display: flex;
		align-items: center;
		gap: var(--s8);
		list-style: none;
	}

	.nav__link {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--text-muted);
		padding: var(--s2) 0;
		position: relative;
		text-decoration: none;
		transition: color var(--t-fast);
	}

	.nav__link:hover {
		color: var(--text);
	}

	.nav__link--active {
		color: var(--text);
	}

	.nav__link--active::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -17px;
		height: 1px;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
	}

	.nav__link--external::after {
		content: ' ↗';
		color: var(--text-dim);
		font-size: 0.875em;
	}

	@media (max-width: 767px) {
		.nav__link--hide-mobile {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.nav__links {
			gap: var(--s5);
		}
		.nav__link {
			font-size: 0.875rem;
		}
	}
</style>
