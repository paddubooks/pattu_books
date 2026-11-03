# Mobile UI review — 3 November 2026

Reviewed Books and Learn at 320, 360, 390, 430, 768 and 1365px widths using Chromium browser emulation and screenshots.

## Findings and fixes
- Books header consumed 209px at 360px width and 261px at 320px width. Compact two-row navigation reduces it to 135px at 360px, with a regression limit below 150px at phone widths.
- Removed the duplicate mobile header book action; retained the hero book action and all navigation destinations.
- Made the pre-order and Learn entry buttons full width on phones. Navigation controls have at least 44px targets.
- Reduced Learn welcome card spacing and illustration size while preserving readable copy.
- Added horizontal carousel swipes with vertical-gesture rejection; arrows, dots and keyboard navigation remain available.

## Verification
Content validation: no errors. Unit tests: 15 passed. TypeScript and production build: passed. Existing browser tests: all 45 passed. Four new phone tests initially failed because synthetic Touch events lacked required identifiers; after correcting the test setup, all four passed on rerun. No horizontal overflow detected at reviewed sizes. Screenshots reviewed for Books and Learn.

Screenshots: outputs/previews/mobile-books-after.png and outputs/previews/mobile-learn-after.png. No learning questions, answer rules or coverage changed. Browser emulation does not replace testing on physical iOS and Android devices. Changes remain local; not published.
