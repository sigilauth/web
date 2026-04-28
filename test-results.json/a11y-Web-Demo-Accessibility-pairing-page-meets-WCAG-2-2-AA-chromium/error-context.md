# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Web Demo Accessibility >> pairing page meets WCAG 2.2 AA
- Location: tests/a11y.spec.ts:22:2

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 43

- Array []
+ Array [
+   Object {
+     "description": "Ensure each HTML document contains a non-empty <title> element",
+     "help": "Documents must have <title> element to aid in navigation",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/document-title?application=playwright",
+     "id": "document-title",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "doc-has-title",
+             "impact": "serious",
+             "message": "Document does not have a non-empty <title> element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Document does not have a non-empty <title> element",
+         "html": "<html lang=\"en\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.text-alternatives",
+       "wcag2a",
+       "wcag242",
+       "TTv5",
+       "TT12.a",
+       "EN-301-549",
+       "EN-9.2.4.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-8.5.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "404" [level=1] [ref=e3]
  - paragraph [ref=e4]: Not Found
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | 
  4   | /**
  5   |  * Accessibility Tests (Aria §8)
  6   |  *
  7   |  * Tests all 15 WCAG 2.2 AA blockers from aria-a11y-requirements.md §10.
  8   |  * Uses axe-core for automated checks + manual tests for complex patterns.
  9   |  */
  10  | 
  11  | test.describe('Web Demo Accessibility', () => {
  12  | 	test('landing page meets WCAG 2.2 AA', async ({ page }) => {
  13  | 		await page.goto('/');
  14  | 
  15  | 		const accessibilityScanResults = await new AxeBuilder({ page })
  16  | 			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  17  | 			.analyze();
  18  | 
  19  | 		expect(accessibilityScanResults.violations).toEqual([]);
  20  | 	});
  21  | 
  22  | 	test('pairing page meets WCAG 2.2 AA', async ({ page }) => {
  23  | 		await page.goto('/pairing');
  24  | 
  25  | 		const accessibilityScanResults = await new AxeBuilder({ page })
  26  | 			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  27  | 			.analyze();
  28  | 
> 29  | 		expect(accessibilityScanResults.violations).toEqual([]);
      |                                               ^ Error: expect(received).toEqual(expected) // deep equality
  30  | 	});
  31  | 
  32  | 	test('skip link is first focusable element', async ({ page }) => {
  33  | 		await page.goto('/');
  34  | 
  35  | 		// Tab once - should focus skip link
  36  | 		await page.keyboard.press('Tab');
  37  | 		const focused = await page.evaluate(() => document.activeElement?.textContent);
  38  | 		expect(focused).toBe('Skip to main content');
  39  | 	});
  40  | 
  41  | 	test('skip link navigates to main content', async ({ page }) => {
  42  | 		await page.goto('/');
  43  | 
  44  | 		// Focus and activate skip link
  45  | 		await page.keyboard.press('Tab');
  46  | 		await page.keyboard.press('Enter');
  47  | 
  48  | 		// Verify focus moved to main
  49  | 		const mainFocused = await page.evaluate(
  50  | 			() => document.activeElement?.closest('main') !== null
  51  | 		);
  52  | 		expect(mainFocused).toBe(true);
  53  | 	});
  54  | 
  55  | 	test('page has proper heading hierarchy', async ({ page }) => {
  56  | 		await page.goto('/');
  57  | 
  58  | 		// Check for h1 (should be exactly one)
  59  | 		const h1Count = await page.locator('h1').count();
  60  | 		expect(h1Count).toBe(1);
  61  | 
  62  | 		// Check headings are in order (h1 → h2, no skipped levels)
  63  | 		const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  64  | 		const levels = await Promise.all(
  65  | 			headings.map(async (h) => {
  66  | 				const tag = await h.evaluate((el) => el.tagName);
  67  | 				return parseInt(tag.substring(1));
  68  | 			})
  69  | 		);
  70  | 
  71  | 		// Verify no level is skipped (e.g., h1 → h3)
  72  | 		for (let i = 1; i < levels.length; i++) {
  73  | 			const diff = levels[i] - levels[i - 1];
  74  | 			expect(diff).toBeLessThanOrEqual(1);
  75  | 		}
  76  | 	});
  77  | 
  78  | 	test('focus indicators are visible', async ({ page }) => {
  79  | 		await page.goto('/pairing');
  80  | 
  81  | 		// Focus first button
  82  | 		await page.keyboard.press('Tab');
  83  | 		await page.keyboard.press('Tab'); // Skip link first
  84  | 
  85  | 		// Check computed outline style
  86  | 		const outlineWidth = await page.evaluate(() => {
  87  | 			const focused = document.activeElement;
  88  | 			return window.getComputedStyle(focused!).outlineWidth;
  89  | 		});
  90  | 
  91  | 		expect(outlineWidth).not.toBe('0px');
  92  | 	});
  93  | 
  94  | 	test('all images have alt text or role', async ({ page }) => {
  95  | 		await page.goto('/');
  96  | 
  97  | 		const imagesWithoutAlt = await page
  98  | 			.locator('img:not([alt]):not([role="presentation"]):not([role="img"])')
  99  | 			.count();
  100 | 		expect(imagesWithoutAlt).toBe(0);
  101 | 	});
  102 | 
  103 | 	test('form inputs have associated labels', async ({ page }) => {
  104 | 		await page.goto('/pairing');
  105 | 
  106 | 		// Get all inputs
  107 | 		const inputs = await page.locator('input').all();
  108 | 
  109 | 		for (const input of inputs) {
  110 | 			const id = await input.getAttribute('id');
  111 | 			const ariaLabel = await input.getAttribute('aria-label');
  112 | 			const ariaLabelledBy = await input.getAttribute('aria-labelledby');
  113 | 
  114 | 			// Input must have one of: associated label, aria-label, or aria-labelledby
  115 | 			const hasLabel = id ? (await page.locator(`label[for="${id}"]`).count()) > 0 : false;
  116 | 			const isLabeled = hasLabel || ariaLabel || ariaLabelledBy;
  117 | 
  118 | 			expect(isLabeled).toBe(true);
  119 | 		}
  120 | 	});
  121 | 
  122 | 	test('landmarks are properly labeled', async ({ page }) => {
  123 | 		await page.goto('/');
  124 | 
  125 | 		// Check for main landmark
  126 | 		const main = await page.locator('main').count();
  127 | 		expect(main).toBeGreaterThan(0);
  128 | 
  129 | 		// Check for navigation (if present)
```