# Progress and offline

Progress uses `pattu-learn:progress:v1`; preferences use `pattu-learn:preferences:v1:<name>`. Sessions contain content version, flattened step, answer, checked state, attempt count, completion and update time. They restore partial answers and successful checks. There is no personal account or cross-device synchronisation.

Malformed records are discarded; unknown storage versions are not interpreted as current records. Incompatible content sessions are not resumed. Read/write failures show a notice and keep an in-memory fallback. Reset asks for confirmation. Clearing browser site data removes progress and downloads. Current attempts are a count rather than an event history.

The service worker is registered only at `/learn/sw.js` with scope `/learn/`. There was no pre-existing Books worker. Its revisioned shell cache contains the HTML, bundled CSS/JS, catalogue, icon and manifest. Installation must finish successfully; updates wait until existing controlled tabs close. Activation removes old shell caches, leaving user topic downloads.

Download topic writes all question JSON, example references, SVG images and required audio into a temporary Cache Storage cache. Progress is per file. Only a completed download becomes offline-ready; failures clean temporary data and offer retry. Removal deletes that topic cache without resetting progress. No full image-library download occurs automatically, and no media enters localStorage.

Initial online loading and a successful topic download are required. Service workers need localhost or HTTPS. The Vite development server does not register the production worker; test offline using a production build and `npm run preview`. A return-to-Books click while offline shows a message and keeps the child in Learn.

Browser quota or eviction can remove cached data. Topic downloads currently use a v1 cache namespace, not automatic content-version replacement: remove and redownload topics after content updates. Download manifests do not estimate byte size. A full attempt-sync queue and multi-device migration are future work.

The interactive first-question guide shares the versioned session repository. Its step and answers survive refreshes. It uses already-downloaded questions and examples, so no extra topic assets are required. Existing saved sessions continue ordinary practice unless Restart guide is selected.

The shell contains catalogue-summary.json and local fonts. Per-topic asset manifests are fetched when a download is requested; the full catalogue and all picture files are not automatically precached.
