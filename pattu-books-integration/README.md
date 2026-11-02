# Pattu Books + Pattu Learn

A children's book showcase and kindergarten maths activity site. Books opens at /; Learn opens at /learn/. The application is entirely static: no backend, accounts, API keys, or database are required. Learning progress stays in the current browser.

## Quick start

Requires Node.js 22.12 or newer and npm. Run these commands from this directory (pattu-books-integration):

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173 for Books or http://127.0.0.1:5173/learn/ for Learn.

## Production build and preview

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173. The build generates dist/learn and preserves the Books source in dist/index.html and dist/assets. **Do not delete or ignore the entire dist directory.** A build copies the large learning asset collection and can take longer than compiling the JavaScript.

## Book showcase

The Books shelf features the available title, **Nila at Paatti’s Home**, using supplied front and front/back cover images. Storybooks shows this title; Activity books shows an empty collection message. Pricing is intentionally omitted until confirmed; enquiries use the existing contact setup.

## What is included

- 52 topics, 705 activities and 8,460 question sets covering 369 source skill mappings.
- Guided first questions, worked examples, answer feedback, hints and saved progress.
- Search, difficulty filters, responsive controls and optional offline topic downloads.
- Local images, number audio, Nunito and Outfit fonts.
- Shared menu colour #FFE292; announcement markup retained in comments.

The initial catalogue loads separately from offline asset lists. Topic files are downloaded only when requested. Offline operation requires a successful initial online visit and topic download through the built preview or HTTPS hosting; it is not enabled by the development server.

## Project structure

| Path | Purpose |
| --- | --- |
| src/main.tsx | Learning pages and routing |
| src/features/learn/ | Models, answer rules, UI, storage and offline downloads |
| src/style.css | Learning styles |
| dist/index.html | Editable Books HTML source |
| dist/assets/ | Editable Books CSS, JavaScript and SVG artwork |
| public/learn/ | Imported learning content, media and licensed fonts |
| scripts/ | Import, validation, catalogue preparation, build and preview helpers |
| tests/ | Unit and browser tests |
| doc/ | Architecture, content, operations and limitations |
| dist/learn/ | Generated production learning application; excluded from Git |

## Quality checks

```sh
npm run validate:content
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Finish the build before running browser tests. Playwright starts the production preview if needed. See [testing](doc/testing.md) for coverage and generated reports.

## Editing and content

Edit Books text in dist/index.html, its catalogue/contact settings in dist/assets/js/main.js, and its artwork in dist/assets/images/scene.svg. Shared colours and fonts live in dist/assets/css/pattu-tokens.css. Keep the Books source when rebuilding Learn.

Imported content is included, so the original contentss archive is not needed to install, develop, build or test. For reimporting an externally supplied source collection, see [content import](doc/content-import.md). Do not edit generated catalogue-summary.json or topic-assets manifests; dev/build regenerate them.

## Deployment and limitations

For GitHub Pages, use the included root .github/workflows/pages.yml and select GitHub Actions in Settings → Pages. It builds a separate outputs/pages artifact with repository-aware URLs and direct activity pages. See [deployment](doc/deployment.md) for step-by-step setup. The ordinary dist build remains available for hosts with learning-route fallbacks.

Books uses sample catalogue/prices and unset ordering destinations. Educational explanations and diagram accessibility still need broader review. Long examples and dense activities can require scrolling. See [known issues](doc/known-issues.md).

## Documentation and contributions

Start with the [documentation index](doc/README.md), [architecture](doc/architecture.md), [contributing guide](../CONTRIBUTING.md), and [GitHub setup](../GITHUB_SETUP.md). Font licences are included under public/learn/fonts. No general open-source licence has been selected for the application or educational content.
