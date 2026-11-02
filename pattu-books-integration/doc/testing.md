# Testing

Run from pattu-books-integration with Node.js 22.12+:

```sh
npm ci
npm run validate:content
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

On Linux CI, Playwright may require browser OS dependencies; use npx playwright install --with-deps chromium on a runner where package installation is permitted. Do not rebuild while tests use dist/learn. Playwright starts the production server at http://127.0.0.1:4173 if it is not running; ensure any existing server serves this checkout.

## Coverage

- Content validation checks skill mapping, asset presence, semantic duplicates, question structure and selected arithmetic rules.
- Vitest checks answer modes, imported answers, storage recovery, guide transitions and colour contrast.
- Playwright checks Books/Learn navigation, filters, interactions, saved sessions, guides, feedback dialogs, offline downloads, local fonts and responsive layouts.
- viewport.spec.js checks MATH-K-004 answer controls without scrolling at 320, 390, 768, 1365 and 1705px widths; menus, announcements and lightweight initial loading are checked too.

The latest application baseline is 15 unit and 45 browser tests passing. See handover.md for the dated result. Automated coverage does not verify every educational explanation or every physical device. Dense activities and long examples may still scroll.

## Generated output

Browser results: doc/reports/playwright.json. Validation results: doc/reports/content-validation.json. Screenshots: outputs/previews. Failure artifacts: test-results. These outputs are excluded from Git; regenerate them as needed. Import corrections and source-coverage.json are retained because they explain transformations and support validation.

With npm run dev already running, node scripts/check-dev.mjs checks development navigation and node scripts/check-loading.mjs measures local loading. Timings vary by machine and cache state.

The build may warn that shared /learn/fonts URLs are unresolved during CSS compilation. They resolve from copied local fonts at runtime; browser tests check online and offline font availability.

## GitHub Pages checks

After npm run build:pages, run npm run test:pages. The dedicated static server has no SPA fallback. Checks cover Books/Learn navigation, direct links and refreshes, valid-route files, missing asset 404s, and offline topic downloads under the configured repository prefix. Normal browser tests still use npm run build followed by npm run test:e2e.
