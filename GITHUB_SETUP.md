# Create the GitHub repository

Use this folder, containing README.md and pattu-books-integration, as the repository root. Do not upload node_modules or the whole workspace through a browser file picker; Git honours the supplied ignore rules.

## 1. Review the files

The application README explains how to install, build and test. The optional contentss import archive stays local; imported runtime content is included. Generated reports, screenshots and dist/learn stay local too. The editable Books files inside dist are deliberately included.

## 2. Create an empty repository

Create a repository in your GitHub account with your preferred name and visibility. Leave its initial README, .gitignore and licence empty because the local files already exist. No general project licence has been selected; choose one separately if you want to grant reuse rights.

## 3. Commit locally and connect it

Run from this repository root. Replace YOUR-USERNAME and YOUR-REPOSITORY with your actual values:

```sh
git init
git branch -M main
git add .
git status --short
git diff --cached --stat
```

Review the staged list before committing. It should include source, package-lock.json, docs, tests, imported learning assets, font licences and Books source. It should exclude node_modules, contentss, dist/learn, outputs and environment files.

```sh
git commit -m "Initial Pattu Books and Pattu Learn application"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Use GitHub's normal authentication when prompted; never put tokens in source files or remote URLs. If this folder already has Git history or an origin remote when you perform setup, inspect git status and git remote -v before adapting these commands rather than replacing existing history.

## 4. Verify a fresh clone

Clone into a separate folder, enter pattu-books-integration, then run:

```sh
npm ci
npm run validate:content
npm test
npm run build
npm run preview
```

Open http://127.0.0.1:4173 and /learn/. No original contentss archive or private configuration is required. For full browser verification, install Chromium and run npm run test:e2e.

## Deployment

A Pages deployment workflow is included at .github/workflows/pages.yml. After pushing main, open Settings → Pages and choose GitHub Actions as Source. Then run or rerun Deploy GitHub Pages in the Actions tab. Follow [the hosting guide](pattu-books-integration/doc/deployment.md). The workflow builds the correct repository paths and direct activity pages automatically.
