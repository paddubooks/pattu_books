# GitHub Pages deployment

The repository root must contain .github/workflows/pages.yml and pattu-books-integration/. Keep the application nested as shown; the workflow runs its commands in that directory.

```text
Kindergarten_Maths_Activities/
  .github/workflows/pages.yml
  .gitignore
  README.md
  GITHUB_SETUP.md
  pattu-books-integration/
    package.json
    package-lock.json
    src/
    public/learn/
    dist/index.html             # editable Books source
    dist/assets/                # editable Books source
    scripts/
    tests/
    doc/
```

Do not use the almost-empty paddubooks folder inside the application as the upload root. It is an unrelated nested Git clone and is ignored. Commit the parent repository structure above. Do not commit node_modules, generated output or the optional original content archive.

## Enable hosting

1. Push the parent folder's source files, including .github/workflows/pages.yml, to the main branch of your GitHub repository.
2. Open the repository on GitHub and select Settings → Pages.
3. Under Build and deployment, set Source to GitHub Actions.
4. Open Actions → Deploy GitHub Pages. If the initial run occurred before Pages was enabled, rerun it or select Run workflow.
5. Wait for build and deploy to succeed. The deployment and Settings → Pages show the actual published URL.

For a repository named Kindergarten_Maths_Activities, a normal project URL is https://YOUR-USERNAME.github.io/Kindergarten_Maths_Activities/. Use the username and URL actually shown by GitHub. No manually entered token is required by the workflow.

## What the workflow does

It installs the locked dependencies with Node 22, validates content, runs unit tests, builds the Pages site, runs static-host browser checks, uploads outputs/pages, and deploys it. The base path comes from configure-pages, supporting repository subpaths and domain-root hosting. Pushes to main and manual runs trigger the workflow.

The Pages build writes only to outputs/pages. It preserves normal dist source/build files. It prefixes Books links, React resource URLs, fonts, manifest and service-worker scope with the hosting path. Each valid learning route gets its own index.html, so fresh activity links and refreshes do not depend on an unsupported server fallback. Unknown URLs return 404.

## Local Pages verification

From pattu-books-integration in PowerShell:

```powershell
$env:SITE_BASE_PATH='/Kindergarten_Maths_Activities'
npm run build:pages
npm run test:pages
Remove-Item Env:SITE_BASE_PATH
```

Install Chromium first using npx playwright install chromium. To inspect the built site manually, run node scripts/serve-pages.mjs and open its printed URL. It uses port 4174 and deliberately has no SPA fallback.

Ordinary local development remains npm run dev; normal build/preview remain npm run build and npm run preview. The normal build expects domain-root hosting and a learning-only fallback. Use build:pages for GitHub Pages.

## Updates and offline content

GitHub Pages uses HTTPS. Existing tabs may need to close before a newly installed service worker activates. Remove and redownload topics after content changes. Topic caches are scoped by hosting path so different project sites on the same origin do not share downloaded topic files.

Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
