# Contributing

## Development

Run commands inside pattu-books-integration. Install Node.js 22.12+ and run npm ci, then npm run dev. Commit package-lock.json when dependencies change. Never commit node_modules or generated output.

Keep changes focused and describe the user-visible result. Follow the application AGENTS.md for content preservation and accessibility rules. Keep activity IDs and skill relationships stable. Changes to imported content belong in the importer and require the original source collection; do not invent extra distinct questions by shuffling options.

## Before submitting a change

```sh
npm run validate:content
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Run browser tests after the build completes. For UI changes, inspect generated screenshots and test relevant phone/tablet/desktop sizes. Update affected documentation and describe tests and any remaining limitations in the pull request. See doc/testing.md inside the application for scope.

## Files to keep out of commits

The root .gitignore excludes the original contentss archive, dependencies, generated Learn build, test output, topic download manifests and machine-specific files. Existing local files are retained. dist/index.html and dist/assets inside the application are editable Books source and must be committed.

Do not include credentials or account-specific hosting identity. Project and educational-content licensing has not yet been selected; preserve the existing font licence notices.
