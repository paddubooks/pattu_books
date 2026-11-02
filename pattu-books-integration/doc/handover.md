# Maintainer handover

## Current application

The application directory is pattu-books-integration. It runs independently of the optional original contentss archive. Books is editable static source in dist/index.html and dist/assets; Learn is built from src and public/learn into dist/learn. Do not remove the Books source during cleanup.

Current features include guided learning, examples, local progress, topic downloads, accessible answer dialogs, compact activity layouts and #FFE292 menu backgrounds. Announcement blocks remain commented out. No backend, accounts or public deployment are configured by setup commands.

## Verification baseline — 1 November 2026

- Content validation: 705 activities, 52 topics, 8,460 question sets, 369 mapped skills; no errors or duplicate sets.
- Unit tests: 15 passed.
- Browser tests: 45 passed, including offline download/replay and the pictured audio activity at five viewport sizes.
- TypeScript and production build: passed.

These results describe the last application verification before repository documentation cleanup. Rerun the documented checks for future code changes; they do not constitute a manual educator review of every activity.

## Loading behaviour

The initial catalogue was reduced from 1,904,713 to 482,808 bytes. scripts/prepare-catalogue.mjs generates a summary and per-topic offline manifests before dev/build. Offline file lists are fetched on demand. Local single-run measurements were 241ms for Books content and 350ms for the activity; these are not internet benchmarks.

## Next maintainer tasks

1. Follow the root GITHUB_SETUP.md to create and push the repository.
2. Choose a project/content licence before offering reuse rights; retain the included font licences.
3. Review sample book/contact settings and educational/accessibility limitations before public launch.
4. Configure host-specific learning route fallbacks before deployment.

Generated reports and screenshots stay local and can be recreated with the tests. Import correction and source coverage records remain versioned. No credentials or account-specific hosting configuration are needed to run the application.

## Repository preparation verified — 2 November 2026

The repository root now provides README.md, CONTRIBUTING.md, GITHUB_SETUP.md, .gitignore and .gitattributes. Application documentation uses portable paths and documents deployment routing, generated assets and the unusual Books source under dist. Node.js requirements are recorded in package.json and the lockfile.

After preparation, content validation passed with zero errors, all 15 unit tests and 45 browser tests passed, and the TypeScript/production build passed. All relative links across 20 Markdown documents resolved. Git ignore-rule auditing confirmed dependencies, original archive and generated outputs are excluded while Books source and learning content remain included. Local files were retained; no project Git repository, GitHub repository, commit, push or deployment was created.

## GitHub Pages support — 2 November 2026

The root .github/workflows/pages.yml builds and deploys on main after GitHub Actions is selected as the Pages source. It obtains the host prefix from configure-pages. The application stays in pattu-books-integration; the nested paddubooks clone is excluded and is not the repository root.

Pages output is generated separately in outputs/pages, with prefixed browser/resource URLs, scoped service-worker URLs and 759 physical learning-route entry pages. Tested at /Kindergarten_Maths_Activities/ on a strict static server without fallback routing: all three Pages checks passed, covering navigation, deep links/refresh, fonts/assets, missing-file 404s and offline download/reload. The artifact contains about 177 MB of static files. Source docs links resolve.

No repository was pushed or published from this workspace. The repository name supplied was Kindergarten_Maths_Activities; its full remote URL and actual hosted deployment remain unverified. Follow deployment.md to enable Pages and obtain the real URL.

Final regression verification: content validation returned zero errors; all 15 unit tests, 45 normal browser tests and 3 Pages-specific tests passed. Both normal and repository-prefixed production builds passed. Reviewed generated responsive Books preview. The hosted GitHub deployment still requires pushing the parent repository and enabling Pages; no live deployment result is claimed.
