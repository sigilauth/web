import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Tests (Aria §8)
 *
 * Tests all 15 WCAG 2.2 AA blockers from aria-a11y-requirements.md §10.
 * Uses axe-core for automated checks + manual tests for complex patterns.
 */

test.describe('Web Demo Accessibility', () => {
	test('landing page meets WCAG 2.2 AA', async ({ page }) => {
		await page.goto('/');

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('pairing page meets WCAG 2.2 AA', async ({ page }) => {
		await page.goto('/pairing');

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('skip link is first focusable element', async ({ page }) => {
		await page.goto('/');

		// Tab once - should focus skip link
		await page.keyboard.press('Tab');
		const focused = await page.evaluate(() => document.activeElement?.textContent);
		expect(focused).toBe('Skip to main content');
	});

	test('skip link navigates to main content', async ({ page }) => {
		await page.goto('/');

		// Focus and activate skip link
		await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');

		// Verify focus moved to main
		const mainFocused = await page.evaluate(
			() => document.activeElement?.closest('main') !== null
		);
		expect(mainFocused).toBe(true);
	});

	test('page has proper heading hierarchy', async ({ page }) => {
		await page.goto('/');

		// Check for h1 (should be exactly one)
		const h1Count = await page.locator('h1').count();
		expect(h1Count).toBe(1);

		// Check headings are in order (h1 → h2, no skipped levels)
		const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
		const levels = await Promise.all(
			headings.map(async (h) => {
				const tag = await h.evaluate((el) => el.tagName);
				return parseInt(tag.substring(1));
			})
		);

		// Verify no level is skipped (e.g., h1 → h3)
		for (let i = 1; i < levels.length; i++) {
			const diff = levels[i] - levels[i - 1];
			expect(diff).toBeLessThanOrEqual(1);
		}
	});

	test('focus indicators are visible', async ({ page }) => {
		await page.goto('/pairing');

		// Focus first button
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab'); // Skip link first

		// Check computed outline style
		const outlineWidth = await page.evaluate(() => {
			const focused = document.activeElement;
			return window.getComputedStyle(focused!).outlineWidth;
		});

		expect(outlineWidth).not.toBe('0px');
	});

	test('all images have alt text or role', async ({ page }) => {
		await page.goto('/');

		const imagesWithoutAlt = await page
			.locator('img:not([alt]):not([role="presentation"]):not([role="img"])')
			.count();
		expect(imagesWithoutAlt).toBe(0);
	});

	test('form inputs have associated labels', async ({ page }) => {
		await page.goto('/pairing');

		// Get all inputs
		const inputs = await page.locator('input').all();

		for (const input of inputs) {
			const id = await input.getAttribute('id');
			const ariaLabel = await input.getAttribute('aria-label');
			const ariaLabelledBy = await input.getAttribute('aria-labelledby');

			// Input must have one of: associated label, aria-label, or aria-labelledby
			const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false;
			const isLabeled = hasLabel || !!ariaLabel || !!ariaLabelledBy;

			expect(isLabeled).toBe(true);
		}
	});

	test('landmarks are properly labeled', async ({ page }) => {
		await page.goto('/');

		// Check for main landmark
		const main = await page.locator('main').count();
		expect(main).toBeGreaterThan(0);

		// Check for navigation (if present)
		const nav = await page.locator('nav').count();
		if (nav > 0) {
			// Nav should have aria-label or aria-labelledby
			const navLabeled = await page
				.locator('nav[aria-label], nav[aria-labelledby]')
				.count();
			expect(navLabeled).toBe(nav);
		}
	});

	test('page works at 200% zoom', async ({ page }) => {
		await page.goto('/pairing');
		await page.setViewportSize({ width: 640, height: 480 });

		// Emulate 200% zoom by setting smaller viewport
		await page.setViewportSize({ width: 320, height: 240 });

		// Check no horizontal scroll
		const hasHorizontalScroll = await page.evaluate(() => {
			return document.documentElement.scrollWidth > document.documentElement.clientWidth;
		});

		expect(hasHorizontalScroll).toBe(false);
	});

	test('color contrast meets AA standards', async ({ page }) => {
		await page.goto('/');

		const colorContrastResults = await new AxeBuilder({ page })
			.withTags(['wcag2aa'])
			.include('body')
			.analyze();

		const contrastViolations = colorContrastResults.violations.filter((v) =>
			v.id.includes('color-contrast')
		);
		expect(contrastViolations).toEqual([]);
	});
});
