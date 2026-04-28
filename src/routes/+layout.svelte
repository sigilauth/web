<script lang="ts">
	import '$lib/styles/tokens.css';
	import '$lib/styles/prose.css';

	let { children } = $props();

	function handleSkipLink(e: Event) {
		e.preventDefault();
		const main = document.getElementById('main');
		if (main) {
			// Ensure element can receive focus
			if (!main.hasAttribute('tabindex')) {
				main.setAttribute('tabindex', '-1');
			}
			// Small delay to ensure DOM is ready
			setTimeout(() => {
				main.focus();
				main.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 0);
		}
	}
</script>

<!-- Skip link for accessibility (WCAG 2.4.1 A) -->
<a href="#main" class="skip-link" onclick={handleSkipLink}>Skip to main content</a>

<div id="app">
	{@render children()}
</div>

<style>
	#app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
