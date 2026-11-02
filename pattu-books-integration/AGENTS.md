# Pattu Books and Pattu Learn

Pattu Books at `/` is the main entry point. Preserve its book catalogue, artwork, controls and links in `dist/index.html` and `dist/assets/`. Pattu Learn is the React/TypeScript/Vite/Tailwind section at `/learn`, with React Router confined to learning pages. No learning backend or accounts without an explicit user request.

## Commands

- Install: `npm ci` (Node 22.12+; npm lockfile is authoritative).
- Develop: `npm run dev`; open `http://127.0.0.1:5173/learn/`.
- Import: `npm run import:content -- "../contentss"`.
- Validate: `npm run validate:content`.
- Unit tests: `npm test`.
- Build: `npm run build` (writes only `dist/learn`).
- Production preview: `npm run preview`; open `http://127.0.0.1:4173`.
- Browser setup: `npx playwright install chromium`.
- Browser tests: `npm run test:e2e`; run after the build finishes.

## Rules

Keep the original `contentss` source intact. Preserve activity IDs, topic codes, reference skill relationships and valid questions. Import changes belong in `scripts/import-content.mjs`; record corrections in `doc/reports`. Never use shuffled answers to inflate distinct-question totals.

Learning models, answer rules and repositories live in `src/features/learn/`. UI components use the content, progress and asset interfaces; keep localStorage out of activity components. Progress keys start `pattu-learn:`. Learning assets are local under `public/learn`; Cache Storage holds downloaded topics. Do not cache the entire picture library automatically.

Use short English, 44px minimum controls, keyboard-operable buttons, visible focus, text feedback and reduced-motion support. Avoid emoji as learning illustrations. Check mathematical answers and picture quantities; currency is US coins/cents. Grade, age range and language remain separate fields.

Add content through the importer/schema; add a renderer, answer rule and tests for each new interaction. Preserve navigation to Books on every learning route. Never overwrite `dist/` as a whole during builds. Retain `.openai/hosting.json` and existing services. Do not publish without a request.

Before completion run validation, unit tests, TypeScript/build and Playwright. Review student previews and report remaining limitations honestly. Update README and affected `doc/` pages, coverage/correction reports and handover. See [documentation](doc/README.md), [architecture](doc/architecture.md), [adding content](doc/adding-content.md) and [testing](doc/testing.md).

Guided first questions use `guidance.ts` and `GuidedFirstQuestion.tsx`. Keep optional `Session.tutorial` state backwards-compatible. Require correct answers for every first-set part, preserve later practice when replaying, and update guide tests/documentation after changes. Keep Tailwind source scanning confined to `src/`.
