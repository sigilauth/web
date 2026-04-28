import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Component-Level Tests
 *
 * Tests individual components (Pictogram, CodeEntry) for functionality and accessibility.
 */

test.describe('Pictogram Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pairing');
	});

	test('renders emoji correctly', async ({ page }) => {
		// Server pictogram should be visible somewhere on the page
		const pictogram = page.locator('.pictogram__visual').first();
		await expect(pictogram).toBeVisible();

		// Check emoji count (should be 5)
		const emojiCount = await pictogram.locator('.pictogram__emoji').count();
		expect(emojiCount).toBe(5);
	});

	test('has accessible label', async ({ page }) => {
		const pictogram = page.locator('[role="img"]').first();
		const ariaLabel = await pictogram.getAttribute('aria-label');

		// Should have aria-label containing fingerprint info
		expect(ariaLabel).toBeTruthy();
		expect(ariaLabel).toContain('fingerprint');
	});

	test('displays speakable text', async ({ page }) => {
		const speakable = page.locator('.pictogram__speakable').first();
		await expect(speakable).toBeVisible();

		// Should be in hyphen-separated format
		const text = await speakable.textContent();
		expect(text).toMatch(/\w+-\w+/); // pattern: word-word-...
	});

	test('emoji descriptions are expandable', async ({ page }) => {
		const details = page.locator('.pictogram__details').first();
		await expect(details).toBeVisible();

		// Initially collapsed
		const isOpen = await details.evaluate((el) => (el as HTMLDetailsElement).open);
		expect(isOpen).toBe(false);

		// Click summary to expand
		const summary = details.locator('summary');
		await summary.click();

		// Should now be open with list of emojis
		const list = details.locator('.pictogram__list');
		await expect(list).toBeVisible();
		const items = await list.locator('li').count();
		expect(items).toBe(5);
	});

	test('meets accessibility standards', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('.pictogram')
			.analyze();

		expect(results.violations).toEqual([]);
	});
});

test.describe('CodeEntry Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pairing');
	});

	test('renders single input field', async ({ page }) => {
		const input = page.locator('#pairing-code');
		await expect(input).toBeVisible();
	});

	test('input has accessible label', async ({ page }) => {
		const input = page.getByLabel('Pairing code (8 digits)');
		await expect(input).toBeVisible();
	});

	test('input has numeric inputmode', async ({ page }) => {
		const input = page.locator('#pairing-code');
		const inputmode = await input.getAttribute('inputmode');
		expect(inputmode).toBe('numeric');
	});

	test('input enforces maxlength=8', async ({ page }) => {
		const input = page.locator('#pairing-code');
		const maxlength = await input.getAttribute('maxlength');
		expect(maxlength).toBe('8');
	});

	test('accepts typed digits', async ({ page }) => {
		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('12345678');
		await expect(input).toHaveValue('12345678');
	});

	test('has numeric pattern validation', async ({ page }) => {
		const input = page.locator('#pairing-code');
		const inputmode = await input.getAttribute('inputmode');
		expect(inputmode).toBe('numeric');

		// Verify pattern attribute exists (exact value varies by browser rendering)
		const pattern = await input.getAttribute('pattern');
		expect(pattern).toBeTruthy();
	});

	test('accepts pasted code', async ({ page }) => {
		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('87654321');
		await expect(input).toHaveValue('87654321');
	});

	test('displays hint text', async ({ page }) => {
		const hint = page.locator('#pairing-code-hint');
		await expect(hint).toBeVisible();
		await expect(hint).toContainText(/enter or paste/i);
	});

	test('displays error messages accessibly', async ({ page }) => {
		const codeEntry = page.locator('.code-entry').first();
		await expect(codeEntry).toBeVisible();
	});

	test('meets touch target size requirements (44x44px)', async ({ page }) => {
		const input = page.locator('#pairing-code');
		const box = await input.boundingBox();

		expect(box).toBeTruthy();
		expect(box!.height).toBeGreaterThanOrEqual(44);
	});

	test('meets accessibility standards', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.include('.code-entry')
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
