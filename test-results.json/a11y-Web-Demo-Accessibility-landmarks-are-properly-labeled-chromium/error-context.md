# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Web Demo Accessibility >> landmarks are properly labeled
- Location: tests/a11y.spec.ts:122:2

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - text: ◈
        - generic [ref=e7]:
          - generic [ref=e8]: Scratchee
          - generic [ref=e9]: Admin Console
      - button "Toggle sidebar" [ref=e10]:
        - img [ref=e11]
    - navigation [ref=e13]:
      - generic [ref=e14]: Navigation
      - link "Dashboard" [ref=e15] [cursor=pointer]:
        - /url: /
        - img [ref=e16]
        - text: Dashboard
      - link "Games" [ref=e21] [cursor=pointer]:
        - /url: /games
        - img [ref=e22]
        - text: Games
      - link "Assets" [ref=e26] [cursor=pointer]:
        - /url: /assets
        - img [ref=e27]
        - text: Assets
      - link "Verify Card" [ref=e31] [cursor=pointer]:
        - /url: /verify
        - img [ref=e32]
        - text: Verify Card
      - generic [ref=e34]: Coming Soon
      - link "Team" [ref=e35] [cursor=pointer]:
        - /url: /team
        - img [ref=e36]
        - text: Team
      - link "Reports" [ref=e41] [cursor=pointer]:
        - /url: /reports
        - img [ref=e42]
        - text: Reports
      - link "Support" [ref=e44] [cursor=pointer]:
        - /url: /support
        - img [ref=e45]
        - text: Support
      - link "Audit Log" [ref=e47] [cursor=pointer]:
        - /url: /audit-log
        - img [ref=e48]
        - text: Audit Log
    - generic [ref=e51]:
      - generic [ref=e52]: AD
      - generic [ref=e53]:
        - generic [ref=e54]: Admin
        - generic [ref=e55]: Platform Manager
  - main [ref=e56]:
    - generic [ref=e57]:
      - generic [ref=e58]:
        - heading "Dashboard" [level=1] [ref=e59]
        - paragraph [ref=e60]: Platform overview
      - generic [ref=e61]:
        - generic [ref=e62]:
          - generic [ref=e63]: Active Games
          - generic [ref=e64]: "0"
          - generic [ref=e65]: 6 total games
        - generic [ref=e66]:
          - generic [ref=e67]: Cards Dealt Today
          - generic [ref=e68]: "0"
          - generic [ref=e69]: across all active games
        - generic [ref=e70]:
          - generic [ref=e71]: Prizes Paid (Month)
          - generic [ref=e72]: $0
          - generic [ref=e73]: prize value this month
        - generic [ref=e74]:
          - generic [ref=e75]: Avg Payout Ratio
          - generic [ref=e76]: 0.0%
          - generic [ref=e77]: "target: 35–40%"
      - generic [ref=e78]:
        - generic [ref=e79]:
          - generic [ref=e80]:
            - generic [ref=e81]: Card Volume — 14 days
            - generic [ref=e82]: Daily deals across all active games
          - generic [ref=e83]:
            - generic [ref=e84]: Cards Dealt
            - generic [ref=e85]: Prize Value ($)
        - generic [ref=e87]: No data for last 14 days
      - generic [ref=e88]:
        - generic [ref=e89]:
          - generic [ref=e90]: Active Games
          - link "View all games →" [ref=e91] [cursor=pointer]:
            - /url: /games
        - table [ref=e92]:
          - rowgroup [ref=e93]:
            - row "Game Status Cards Dealt Prizes Paid Payout Rolls" [ref=e94]:
              - columnheader "Game" [ref=e95]
              - columnheader "Status" [ref=e96]
              - columnheader "Cards Dealt" [ref=e97]
              - columnheader "Prizes Paid" [ref=e98]
              - columnheader "Payout" [ref=e99]
              - columnheader "Rolls" [ref=e100]
          - rowgroup [ref=e101]:
            - row "◫ No active games Commission and activate a game to see it here. New Game" [ref=e102]:
              - cell "◫ No active games Commission and activate a game to see it here. New Game" [ref=e103]:
                - generic [ref=e104]:
                  - generic [ref=e105]: ◫
                  - generic [ref=e106]: No active games
                  - generic [ref=e107]: Commission and activate a game to see it here.
                  - link "New Game" [ref=e108] [cursor=pointer]:
                    - /url: /games/new
```

# Test source

```ts
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
  130 | 		const nav = await page.locator('nav').count();
  131 | 		if (nav > 0) {
  132 | 			// Nav should have aria-label or aria-labelledby
  133 | 			const navLabeled = await page
  134 | 				.locator('nav[aria-label], nav[aria-labelledby]')
  135 | 				.count();
> 136 | 			expect(navLabeled).toBe(nav);
      |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  137 | 		}
  138 | 	});
  139 | 
  140 | 	test('page works at 200% zoom', async ({ page }) => {
  141 | 		await page.goto('/pairing');
  142 | 		await page.setViewportSize({ width: 640, height: 480 });
  143 | 
  144 | 		// Emulate 200% zoom by setting smaller viewport
  145 | 		await page.setViewportSize({ width: 320, height: 240 });
  146 | 
  147 | 		// Check no horizontal scroll
  148 | 		const hasHorizontalScroll = await page.evaluate(() => {
  149 | 			return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  150 | 		});
  151 | 
  152 | 		expect(hasHorizontalScroll).toBe(false);
  153 | 	});
  154 | 
  155 | 	test('color contrast meets AA standards', async ({ page }) => {
  156 | 		await page.goto('/');
  157 | 
  158 | 		const colorContrastResults = await new AxeBuilder({ page })
  159 | 			.withTags(['wcag2aa'])
  160 | 			.include('body')
  161 | 			.analyze();
  162 | 
  163 | 		const contrastViolations = colorContrastResults.violations.filter((v) =>
  164 | 			v.id.includes('color-contrast')
  165 | 		);
  166 | 		expect(contrastViolations).toEqual([]);
  167 | 	});
  168 | });
  169 | 
```