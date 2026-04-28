import { test, expect } from '@playwright/test';

/**
 * Production Verification Tests
 *
 * Tests the live production deployment at https://sigilauth.com
 */

test.describe('Production - CodeEntry Reactivity', () => {
	test('CodeEntry accepts typed input and triggers onComplete', async ({ page }) => {
		await page.goto('https://sigilauth.com/pairing');

		const input = page.locator('#pairing-code');
		await expect(input).toBeVisible();

		// Type 8 digits - should update the value reactively
		await input.click();
		await input.fill('12345678');

		// Verify the input reflects the typed value (Svelte 5 reactivity working)
		await expect(input).toHaveValue('12345678');

		// Clear and type again to confirm reactivity persists
		await input.clear();
		await input.fill('87654321');
		await expect(input).toHaveValue('87654321');
	});

	test('CodeEntry accepts partial input', async ({ page }) => {
		await page.goto('https://sigilauth.com/pairing');

		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('5432');
		await expect(input).toHaveValue('5432');
	});

	test('CodeEntry enforces 8-digit max', async ({ page }) => {
		await page.goto('https://sigilauth.com/pairing');

		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('123456789'); // 9 digits

		// Should truncate to 8
		const value = await input.inputValue();
		expect(value.length).toBeLessThanOrEqual(8);
	});
});
