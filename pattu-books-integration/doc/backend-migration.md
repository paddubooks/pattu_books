# Proposed future backend migration

This is a proposal only. No Python server, Django, Django REST Framework, MariaDB, Django Admin, account system or API is implemented by this release.

## Retained frontend and adapters

Keep React routes, learning controls, pure local answer rules, catalogue styling and the ContentRepository/ProgressRepository/AssetResolver boundaries. Add asynchronous API adapters to fetch catalogues, activities, examples and progress through DRF; keep a cached local adapter for offline use. Current progress calls are synchronous and would need an async-compatible facade or locally cached write-through implementation.

Proposed endpoints include GET /api/v1/catalogue, GET /api/v1/activities/{id}, POST /api/v1/attempts and GET /api/v1/profiles/{id}/progress. Treat these as proposals, not existing contracts.

## Proposed entities and relationships

Subject → GradeCollection → Topic → Activity → Question/WorkedExample. GradeCollection stores education-system identity; age ranges and language editions remain separate related entities. Skill has a many-to-many relationship with Activity. ContentVersion pins published revisions. Asset stores a stable key, checksum, mime type and storage URL. ParentTeacherAccount owns ChildProfiles; ProfileActivityProgress and Attempt reference profile, stable activity ID and content version. Attempt includes a client-generated UUID and idempotency constraint.

Use Django Admin for editing, validation and staged publishing. Import source JSON through an idempotent management command keyed by stable IDs. Never renumber IDs on reimport. Use transactions, dry-run reports, checksums and explicit archived status for removed content. Separate asset storage (object store or managed media) from content records; resolve stable keys through AssetResolver. Keep immutable asset versions and local offline manifests.

## Identity, permissions and checking

The inspected Books site has no authentication. If Books later adds auth, integrate with its verified session/identity system rather than duplicating accounts. Choose secure HttpOnly session cookies with CSRF protection for a same-origin app; evaluate token/OIDC integration only when necessary. Parents/teachers manage profiles; child access is restricted to assigned profiles. Enforce ownership and role permissions server-side, limit data collection, rate-limit endpoints and keep secrets in deployment configuration.

Server-side answer checking can verify online submissions against a pinned published question revision. Offline answer checking requires answer information on the device. Frontend answer keys cannot be kept secret; do not claim that bundling, minifying or hiding JSON secures them.

## Progress and synchronisation

Offer guest-progress migration only after explicit consent and a preview of the profile receiving it. Preserve the local copy until the server acknowledges import. Queue offline attempts in IndexedDB with UUID, content version, timestamp and device sequence. Send bounded batches, retry with backoff and deduplicate by UUID server-side. Record immutable attempts; derive completion deterministically. Define conflict rules for resets, parallel devices and revised questions before launch.

Version API schemas and published content separately. If a question changes materially, preserve old attempts against the old version and define explicit progress compatibility rules. Do not silently mark new questions complete based on old answers.

## Operations and phases

1. Approve privacy, entity model, permission model and API contracts.
2. Provision Django/DRF/MariaDB and Admin in a separate development environment; add repeatable imports with unchanged IDs.
3. Add read-only API adapters behind a feature flag; compare catalogue, asset and answer outputs with local data.
4. Add adult identity/profile management and permission tests; retain guest local use.
5. Implement online attempts, server checking, idempotency and cross-device progress.
6. Implement consent-based guest migration and offline synchronisation; test loss, duplication, clock skew and conflicts.
7. Stage a limited rollout with backups, restore drills, migration rollback, performance/security checks and monitoring.

Back up MariaDB, uploaded media and content versions; test restores regularly. Use migrations and CI checks before deployment. Deploy frontend/API independently behind a controlled same-origin proxy where practical, with HTTPS, secure cookies, health checks and least-privilege database credentials. Maintain the static/local mode until the new path is proven.
