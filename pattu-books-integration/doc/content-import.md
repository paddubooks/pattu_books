# Content import

Optional original import source (kept locally, excluded from Git): `../contentss`. The supplied directory is named `contentss`, not `contents`. It remains intact and is not moved into or edited by the application.

The imported runtime content is already included. Reimport only when the original source collection is available. Run from pattu-books-integration:

```
npm run import:content -- "../contentss"
npm run validate:content
```

The importer reads `data/catalogue.json` and `data/coverage.json`; preserves source IDs and relationships; writes compact activity JSON and catalogue to `public/learn`; copies images and number audio; and derives three worked-example candidates per activity from existing questions. Source spreadsheets remain the original catalogue/coverage/image index. Current integration reports are JSON and do not overwrite those spreadsheets.

Three activities, MATH-K-024, MATH-K-104 and MATH-K-118, repeated complete round combinations. The importer retains their first unique sets and replaces repeated sets with distinct combinations of valid existing cards. Top-level question IDs remain stable; replacement nested IDs are derived from their parent. `reports/corrections.json` lists each change. Original source files are unchanged.

Duplicate detection ignores answer-option ordering and hashes illustrations rather than comparing image filenames. Different card combinations count as different coherent sets. Assets referenced by examples are included in topic manifests. Reimport after changes, rebuild and re-run validation/tests. Bump the importer revision whenever correction or example generation changes affect compatibility.
