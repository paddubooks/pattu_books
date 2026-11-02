# Architecture

The existing project was a buildless static site, not an established React application. `dist/index.html`, `dist/assets/css/styles.css`, `dist/assets/js/main.js` and the SVG artwork remain the Books implementation. A learning navigation link, header Start learning action and mobile navigation styles are added. Its original catalogue data and JavaScript are preserved.

Vite compiles the new `index.html` and `src/main.tsx` to `dist/learn`. `scripts/finalize.mjs` places local content at its URL paths and emits a revisioned learning service worker. The Node preview server serves Books at `/` and returns the learning shell for extensionless `/learn/*` routes. Production hosting must configure the same learning-only fallback. Python's original static server is suitable for Books alone, not learning deep links.

Routes:

```
/learn
/learn/subjects/maths
/learn/subjects/maths/grades/kindergarten
/learn/subjects/maths/grades/kindergarten/topics/:topicSlug
/learn/subjects/maths/grades/kindergarten/topics/:topicSlug/activities/:activityId
```

`model.ts` contains independent answer rules, flattened round sequencing and domain types. `repositories.ts` provides ContentRepository, ProgressRepository and AssetResolver with local JSON/localStorage adapters. `QuestionView.tsx` renders controls by mode; `main.tsx` handles routing, catalogue and activity lifecycle. `offline.ts` owns topic downloads.

Data flow: source JSON → repeatable import → versioned per-activity JSON/catalogue → content repository → renderer. UI answers → pure answer checking → session repository. Examples have isolated state and do not write attempts or completion. Images/audio resolve through one local asset boundary.

Only Maths/Kindergarten has a current route collection. The schema supports other subjects, grades and languages; adding their route configuration is required alongside their content. See adding-content.md rather than assuming routes are fully data-generated.

Guided-first-question teaching uses `guidance.ts` for pure state transitions and `GuidedFirstQuestion.tsx` for presentation. ActivityPage selects it for new sessions or an explicit restart. Completed guided work updates the normal activity position without moving later progress backwards. Vite redirects `/learn` to `/learn/`; Tailwind source scanning is restricted to `src/`.

Before dev/build, prepare-catalogue.mjs derives catalogue-summary.json and topic-assets manifests from the full catalogue. The content repository fetches the summary; downloadTopic fetches the selected manifest on demand. Generated files are excluded from Git.

GitHub Pages uses scripts/build-pages.mjs and a separate outputs/pages artifact. src/site-paths.ts separates internal React routes from prefixed browser URLs; BrowserRouter uses a hosting basename. Every valid catalogue route is emitted as a directory entry file. The normal build still uses dist/learn and its learning-only server fallback.
