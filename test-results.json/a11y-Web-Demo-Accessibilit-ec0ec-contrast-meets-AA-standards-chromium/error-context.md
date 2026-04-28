# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Web Demo Accessibility >> color contrast meets AA standards
- Location: tests/a11y.spec.ts:155:2

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 303

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 3.59,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#ef4444",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.59 (foreground color: #ef4444, background color: #f8fafc, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body data-sveltekit-preload-data=\"hover\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.59 (foreground color: #ef4444, background color: #f8fafc, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"stat-card__value s-Mpr7qy0notmL\" style=\"color: var(--color-error)\">0.0%</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".stat-card.s-Mpr7qy0notmL:nth-child(4) > .stat-card__value.s-Mpr7qy0notmL",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 2.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#94a3b8",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<th class=\"s-xNukQrJByfVM\">Game</th>",
+                 "target": Array [
+                   "th:nth-child(1)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<th class=\"s-xNukQrJByfVM\">Game</th>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "th:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 2.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#94a3b8",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<th class=\"s-xNukQrJByfVM\">Status</th>",
+                 "target": Array [
+                   "th:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<th class=\"s-xNukQrJByfVM\">Status</th>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "th:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 2.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#94a3b8",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<th style=\"text-align: right\" class=\"s-xNukQrJByfVM\">Cards Dealt</th>",
+                 "target": Array [
+                   "th:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<th style=\"text-align: right\" class=\"s-xNukQrJByfVM\">Cards Dealt</th>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "th:nth-child(3)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 2.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#94a3b8",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<th style=\"text-align: right\" class=\"s-xNukQrJByfVM\">Prizes Paid</th>",
+                 "target": Array [
+                   "th:nth-child(4)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<th style=\"text-align: right\" class=\"s-xNukQrJByfVM\">Prizes Paid</th>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "th:nth-child(4)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 2.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#94a3b8",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<th style=\"text-align: right\" class=\"s-xNukQrJByfVM\">Payout</th>",
+                 "target": Array [
+                   "th:nth-child(5)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<th style=\"text-align: right\" class=\"s-xNukQrJByfVM\">Payout</th>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "th:nth-child(5)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f8fafc",
+               "contrastRatio": 2.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#94a3b8",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<th class=\"s-xNukQrJByfVM\">Rolls</th>",
+                 "target": Array [
+                   "th:nth-child(6)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.45 (foreground color: #94a3b8, background color: #f8fafc, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<th class=\"s-xNukQrJByfVM\">Rolls</th>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "th:nth-child(6)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#6366f1",
+               "contrastRatio": 4.46,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#ffffff",
+               "fontSize": "9.8pt (13px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.46 (foreground color: #ffffff, background color: #6366f1, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"/games/new\" class=\"btn btn-primary btn-sm s-xNukQrJByfVM\">New Game</a>",
+                 "target": Array [
+                   ".btn",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.46 (foreground color: #ffffff, background color: #6366f1, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<a href=\"/games/new\" class=\"btn btn-primary btn-sm s-xNukQrJByfVM\">New Game</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".btn",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]: ◈
        - generic [ref=e8]:
          - generic [ref=e9]: Scratchee
          - generic [ref=e10]: Admin Console
      - button "Toggle sidebar" [ref=e11] [cursor=pointer]:
        - img [ref=e12]
    - navigation [ref=e14]:
      - generic [ref=e15]: Navigation
      - link "Dashboard" [ref=e16] [cursor=pointer]:
        - /url: /
        - img [ref=e17]
        - generic [ref=e22]: Dashboard
      - link "Games" [ref=e23] [cursor=pointer]:
        - /url: /games
        - img [ref=e24]
        - generic [ref=e28]: Games
      - link "Assets" [ref=e29] [cursor=pointer]:
        - /url: /assets
        - img [ref=e30]
        - generic [ref=e34]: Assets
      - link "Verify Card" [ref=e35] [cursor=pointer]:
        - /url: /verify
        - img [ref=e36]
        - generic [ref=e38]: Verify Card
      - generic [ref=e39]: Coming Soon
      - link "Team" [ref=e40]:
        - /url: /team
        - img [ref=e41]
        - generic [ref=e46]: Team
      - link "Reports" [ref=e47]:
        - /url: /reports
        - img [ref=e48]
        - generic [ref=e50]: Reports
      - link "Support" [ref=e51]:
        - /url: /support
        - img [ref=e52]
        - generic [ref=e54]: Support
      - link "Audit Log" [ref=e55]:
        - /url: /audit-log
        - img [ref=e56]
        - generic [ref=e59]: Audit Log
    - generic [ref=e60]:
      - generic [ref=e61]: AD
      - generic [ref=e62]:
        - generic [ref=e63]: Admin
        - generic [ref=e64]: Platform Manager
  - main [ref=e65]:
    - generic [ref=e66]:
      - generic [ref=e67]:
        - heading "Dashboard" [level=1] [ref=e68]
        - paragraph [ref=e69]: Platform overview
      - generic [ref=e70]:
        - generic [ref=e71]:
          - generic [ref=e73]: Active Games
          - generic [ref=e74]: "0"
          - generic [ref=e75]: 6 total games
        - generic [ref=e76]:
          - generic [ref=e78]: Cards Dealt Today
          - generic [ref=e79]: "0"
          - generic [ref=e80]: across all active games
        - generic [ref=e81]:
          - generic [ref=e83]: Prizes Paid (Month)
          - generic [ref=e84]: $0
          - generic [ref=e85]: prize value this month
        - generic [ref=e86]:
          - generic [ref=e88]: Avg Payout Ratio
          - generic [ref=e89]: 0.0%
          - generic [ref=e90]: "target: 35–40%"
      - generic [ref=e91]:
        - generic [ref=e92]:
          - generic [ref=e93]:
            - generic [ref=e94]: Card Volume — 14 days
            - generic [ref=e95]: Daily deals across all active games
          - generic [ref=e96]:
            - generic [ref=e97]: Cards Dealt
            - generic [ref=e99]: Prize Value ($)
        - generic [ref=e102]: No data for last 14 days
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]: Active Games
          - link "View all games →" [ref=e106] [cursor=pointer]:
            - /url: /games
        - table [ref=e107]:
          - rowgroup [ref=e108]:
            - row "Game Status Cards Dealt Prizes Paid Payout Rolls" [ref=e109]:
              - columnheader "Game" [ref=e110]
              - columnheader "Status" [ref=e111]
              - columnheader "Cards Dealt" [ref=e112]
              - columnheader "Prizes Paid" [ref=e113]
              - columnheader "Payout" [ref=e114]
              - columnheader "Rolls" [ref=e115]
          - rowgroup [ref=e116]:
            - row "◫ No active games Commission and activate a game to see it here. New Game" [ref=e117]:
              - cell "◫ No active games Commission and activate a game to see it here. New Game" [ref=e118]:
                - generic [ref=e119]:
                  - generic [ref=e120]: ◫
                  - generic [ref=e121]: No active games
                  - generic [ref=e122]: Commission and activate a game to see it here.
                  - link "New Game" [ref=e123] [cursor=pointer]:
                    - /url: /games/new
```

# Test source

```ts
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
  136 | 			expect(navLabeled).toBe(nav);
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
> 166 | 		expect(contrastViolations).toEqual([]);
      |                              ^ Error: expect(received).toEqual(expected) // deep equality
  167 | 	});
  168 | });
  169 | 
```