# Kindergarten Maths Activities

Pattu Books + Pattu Learn: a static children's book showcase and kindergarten maths application with guided activities, local progress and optional offline topic downloads.

## Start here

Requires Node.js 22.12+ and npm.

```sh
cd pattu-books-integration
npm ci
npm run dev
```

Open http://127.0.0.1:5173 for Books or http://127.0.0.1:5173/learn/ for Learn.

- [Application README](pattu-books-integration/README.md): commands, structure, editing and features.
- [Documentation](pattu-books-integration/doc/README.md): architecture, content, offline support and limitations.
- [GitHub setup](GITHUB_SETUP.md): first commit and push instructions.
- [Contributing](CONTRIBUTING.md): development and validation workflow.

## Repository layout

The runnable application lives in `pattu-books-integration/`. The local `contentss/` folder is the original import archive and is excluded from Git to avoid duplicating the imported content. All runtime content needed to build and test is included under `pattu-books-integration/public/learn/`.

Dependencies, generated learning builds, offline manifests, test reports, screenshots and local hosting configuration are excluded. **Books source in `pattu-books-integration/dist/index.html` and `dist/assets/` is intentionally tracked.** Do not delete the entire `dist` folder.

No general open-source licence has been chosen for the code or educational content. Included fonts retain their own licences. The GitHub Pages workflow builds and deploys on pushes to main after Pages is enabled. See [hosting setup](pattu-books-integration/doc/deployment.md).
