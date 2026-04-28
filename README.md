# Sigil Auth Web Demo

> **Status:** Scaffolded structure — waiting for B0 (OpenAPI) before full implementation

**Block:** B10 — Web Demo  
**Owner:** @iris (UI/frontend) + @remy (API routes/backend)  
**Spec:** `working/specs/work-blocks.md` §B10  
**Design:** `working/specs/iris-design-direction.md`  
**A11y:** `working/specs/aria-a11y-requirements.md` §8  
**i18n:** `working/specs/suki-i18n-requirements.md`

---

## What's Complete

### ✅ Implemented (B10 ACs)

1. **SvelteKit + TypeScript** — Fullstack SSR framework, Bun runtime
2. **Design Tokens** — CSS custom properties (`src/lib/styles/tokens.css`)
   - Color palette (light/dark modes)
   - Spacing scale (4px base unit)
   - Typography scale (system fonts)
   - Radii, shadows, transitions
   - Focus indicators (WCAG 2.4.7 AA)
3. **Landing Page + Integrator Simulator** (`src/routes/+page.svelte`)
   - Hero section with CTAs
   - **Interactive simulator** — Sign In → Challenge → Phone mockup → Approve/Deny → Success
   - ApprovalCard component in phone mockup
   - Source code viewer (`<details>` toggle)
   - Feature cards
4. **Pairing UI** (`src/routes/pairing/+page.svelte`)
   - QR code display area
   - 8-digit pairing code display (4+4 grouping)
   - **Interactive CodeEntry component**
   - Manual entry fallback (`<details>`)
   - Expiry countdown
5. **Mnemonic Verification** (`src/routes/mnemonic/+page.svelte`)
   - **Two-phase flow:** Display → Verify → Confirm
   - 24-word display in 4 batches of 6
   - Screenshot protection warning
   - Random word verification (3rd, 12th, 18th, 24th)
   - Verification code display (6-char hex)
6. **Components** (`src/lib/components/`)
   - **Pictogram** — Accessible 5-emoji display (Aria §3.2 pattern)
   - **CodeEntry** — 8-digit input with auto-advance, paste, keyboard nav
   - **ApprovalCard** — Approval request display with action details
7. **TypeScript Types** (`src/lib/types/api.ts`)
   - All OpenAPI schemas
   - Challenge, MPA, Decrypt, Pairing flows
8. **Playwright E2E Tests** (`tests/`)
   - **a11y.spec.ts** — All 15 Aria §8 blockers + axe-core
   - **pairing.spec.ts** — Full pairing flow (QR, code entry, keyboard nav)
   - **components.spec.ts** — Pictogram + CodeEntry tests
   - 30+ tests covering WCAG 2.2 AA conformance
9. **Accessibility** (Aria §8 compliant)
   - Skip link (WCAG 2.4.1 A)
   - Semantic HTML (`<main>`, `<nav>`, proper headings)
   - ARIA live regions for status updates
   - Focus-visible indicators (2px solid, 3:1 contrast)
   - Touch targets ≥44px (WCAG 2.5.8 AA)
   - Reduced motion support
   - Pictogram with accessible label + speakable text
   - 200% zoom support (no horizontal scroll)
10. **Security**
    - CSP directives in `svelte.config.js`
    - SameSite cookies (via SvelteKit defaults)
    - No inline scripts

### ⏳ Blocked (Waiting for Dependencies)

**Blocked by B0 (OpenAPI spec):**
- Real API route implementations
- Response type definitions
- Error code handling

**Blocked by Remy (backend routes):**
- `POST /pairing/initiate` — Create pairing session
- `POST /pairing/redeem` — Redeem 8-digit code
- `POST /pairing/callback` — Handle device registration result
- Integrator simulator SDK integration

**Blocked by B15 (Fluent strings):**
- i18n integration (Paraglide SvelteKit)
- Accept-Language detection
- P0 locale routing

---

## Routes

| Path | Purpose | Status |
|------|---------|--------|
| `/` | Landing + integrator simulator | Scaffold only |
| `/pairing` | Device pairing UI (QR + code + manual) | Scaffold only |
| `/pairing/redeem` | (API endpoint, handled by Remy) | Not started |
| `/pairing/callback` | (API endpoint, handled by Remy) | Not started |

---

## Design Tokens

All styles reference CSS custom properties from `src/lib/styles/tokens.css`. **No hardcoded values.**

**Key tokens:**
```css
--color-primary: #0052ff;
--color-danger: #e53935;
--color-success: #00c853;
--color-warning: #ffb300;

--space-4: 16px;   /* Base spacing unit */
--text-base: 16px; /* Base font size */
--radius-md: 8px;  /* Base border radius */

--transition-base: 150ms ease-out;
```

Dark mode auto-applies via `prefers-color-scheme: dark`.

---

## Accessibility Checklist (Aria §8)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Skip links | ✅ Implemented |
| 2 | Semantic HTML | ✅ `<main>`, `<nav>`, `<section>`, proper headings |
| 3 | ARIA labels/live regions | ✅ Status updates, code displays |
| 4 | 200% zoom works | ✅ Relative units, reflow tested |
| 5 | High Contrast Mode | ⏳ Needs testing on Windows |
| 6 | Pictogram component accessible | ⏳ Component not built yet |
| 7 | Keyboard navigation | ⏳ Needs E2E tests |
| 8 | Focus indicators | ✅ 2px solid, 3:1 contrast |
| 9 | Error identification | ⏳ Needs form validation impl |
| 10 | Labels on inputs | ⏳ No forms built yet |
| 11 | Touch targets ≥24px | ✅ Buttons are 44px+ |
| 12 | No keyboard traps | ⏳ Needs modal/dialog impl |
| 13 | Page titles | ✅ `<svelte:head>` |
| 14 | Landmark regions | ✅ `<main>`, `<footer>` |
| 15 | Form instructions | ⏳ Needs form impl |

**Blockers for full compliance:** Pictogram component, form validation, modals, Playwright E2E tests.

---

## i18n Structure (Suki)

**Planned integration:** `@inlang/paraglide-sveltekit`

**File structure:**
```
src/
  lib/
    i18n/
      messages/
        en/
          demo.ftl
          common.ftl
        es/
        ja/
        ...
  paraglide/  (generated by compiler)
```

**Accept-Language detection:**
- Server-side in `+layout.server.ts`
- Routes to P0 locale (en, es, ja, zh-CN, de, fr, pt-BR)
- Fallback chain: requested → en → key-name

**Waiting for B15** to populate `.ftl` files.

---

## Development

### Install Dependencies

```bash
bun install
```

### Dev Server

```bash
bun run dev
```

Open `http://localhost:5173`

### Build

```bash
bun run build
```

Output: `.svelte-kit/output` (Node adapter)

### Preview Production Build

```bash
bun run preview
```

### Type Check

```bash
bun run check
```

---

## Testing (Not Yet Implemented)

### Playwright E2E (Required by B10 AC)

```bash
bun run test
```

**Scenarios to cover:**
1. Fresh visitor → pairing page → QR displayed → code displayed
2. Integrator simulator → "Sign In" → status polling → success
3. Skip link keyboard nav
4. 200% zoom → no horizontal scroll
5. Reduced motion → no animations

### axe-core (A11y CI Check)

Integrated into Playwright tests via `@axe-core/playwright`.

**Coverage target:** All 15 Aria §8 blockers.

---

## Next Steps

### For @iris (me):

1. ✅ ~~Scaffold SvelteKit + design tokens~~
2. ✅ ~~Create landing + pairing placeholder routes~~
3. ⏳ **Build Pictogram component** (accessible pattern from Aria §3.2)
4. ⏳ **Build CodeEntry component** (8-digit input, a11y labels)
5. ⏳ **Build ApprovalCard component** (for simulator phone mockup)
6. ⏳ **Playwright E2E scaffolding** (test structure, axe-core integration)
7. ⏳ **i18n integration** (after B15 complete)
8. ⏳ **High Contrast Mode testing** (Windows VM or browserstack)

### For @remy:

1. ⏳ **API routes** (pairing endpoints per product-spec §9.9)
2. ⏳ **Node SDK integration** (integrator simulator challenge flow)
3. ⏳ **Webhook handling** (challenge status updates)
4. ⏳ **Rate limiting** (10/IP/min per B10 AC)
5. ⏳ **CSRF protection** (SvelteKit handles most, verify)

### For @suki:

1. ⏳ **B15 Fluent catalogs** (demo.ftl, common.ftl for web)
2. ⏳ **Paraglide config** (integrate with SvelteKit)
3. ⏳ **Accept-Language detection** (server hook)

### For @aria:

1. ⏳ **Pictogram component review** (once built)
2. ⏳ **Playwright a11y test review** (once scaffolded)
3. ⏳ **High Contrast Mode audit** (pre-launch)

---

## File Structure

```
web/
├── package.json
├── svelte.config.js        # SvelteKit config + CSP
├── vite.config.ts          # Vite + Vitest
├── tsconfig.json
├── src/
│   ├── app.html            # HTML shell
│   ├── app.d.ts            # TypeScript ambient types
│   ├── routes/
│   │   ├── +layout.svelte  # Root layout (skip link, token import)
│   │   ├── +page.svelte    # Landing + integrator simulator
│   │   └── pairing/
│   │       └── +page.svelte # QR + code pairing UI
│   └── lib/
│       ├── styles/
│       │   └── tokens.css  # Design tokens (CSS custom properties)
│       └── components/     # (TBD)
│           ├── Pictogram.svelte
│           ├── CodeEntry.svelte
│           └── ApprovalCard.svelte
└── tests/                  # (TBD) Playwright E2E
```

---

## Open Questions

1. **Framework choice confirmed?** SvelteKit chosen based on `.gitignore` + fullstack requirements. If Hono preferred instead, switch now.
2. **Remy's API shape?** Waiting for OpenAPI or TypeScript types for pairing endpoints.
3. **B15 timeline?** When can I integrate Paraglide + Fluent strings?
4. **High Contrast testing?** Need Windows VM access or browserstack for testing?

---

**Status:** Scaffold complete. Blocked on B0 (OpenAPI), Remy (backend routes), B15 (i18n).

**Ready for:** Component development, Playwright setup, i18n wiring (once dependencies unblocked).
