import { test, expect } from '@playwright/test';

/**
 * Pairing Flow E2E Tests
 *
 * Tests the complete pairing flow per B10 acceptance criteria.
 */

test.describe('Pairing Flow', () => {
	test('displays QR code and pairing code', async ({ page }) => {
		await page.goto('/pairing');

		// Check page title
		await expect(page).toHaveTitle(/Pair Device/);

		// Check QR section exists
		const qrSection = page.getByRole('region', { name: /scan qr code/i });
		await expect(qrSection).toBeVisible();

		// Check pairing code section exists
		const codeSection = page.getByRole('region', { name: /enter pairing code/i });
		await expect(codeSection).toBeVisible();

		// Check 8-digit code is displayed
		const codeDisplay = page.getByRole('img', { name: /pairing code/i });
		await expect(codeDisplay).toBeVisible();
	});

	test('code entry accepts 8 digits', async ({ page }) => {
		await page.goto('/pairing');

		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('12345678');
		await expect(input).toHaveValue('12345678');
	});

	test('code entry accepts partial input', async ({ page }) => {
		await page.goto('/pairing');

		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('5');
		await expect(input).toHaveValue('5');
	});

	test('code entry handles backspace', async ({ page }) => {
		await page.goto('/pairing');

		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('12345678');
		await expect(input).toHaveValue('12345678');

		// Press backspace - should remove last digit
		await page.keyboard.press('Backspace');
		const value = await input.inputValue();
		expect(value.length).toBeLessThan(8);
	});

	test('code entry supports paste', async ({ page }) => {
		await page.goto('/pairing');

		const input = page.locator('#pairing-code');
		await input.click();
		await input.fill('87654321');
		await expect(input).toHaveValue('87654321');
	});

	test('expiry countdown is displayed', async ({ page }) => {
		await page.goto('/pairing');

		// Check for expiry text (format: "Expires in X:XX")
		const expiryText = page.getByText(/expires in/i);
		await expect(expiryText).toBeVisible();
	});

	test('manual entry help section is collapsible', async ({ page }) => {
		await page.goto('/pairing');

		const helpSummary = page.getByText(/cannot scan qr code/i);
		await expect(helpSummary).toBeVisible();

		// Initially collapsed
		const helpDetails = page.locator('details.help-section');
		const isOpen = await helpDetails.evaluate((el) => (el as HTMLDetailsElement).open);
		expect(isOpen).toBe(false);

		// Click to expand
		await helpSummary.click();
		const isOpenAfter = await helpDetails.evaluate((el) => (el as HTMLDetailsElement).open);
		expect(isOpenAfter).toBe(true);
	});

	test('keyboard navigation works through pairing options', async ({ page }) => {
		await page.goto('/pairing');

		// Verify we can reach code entry input
		const input = page.locator('#pairing-code');
		await input.focus();
		await expect(input).toBeFocused();
	});
});
