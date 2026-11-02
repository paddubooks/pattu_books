# Decisions

- Keep the static Books site and build only `/learn`; no existing router/framework needed replacement.
- Introduce npm because the source site had no package manager or lockfile. Commit package-lock.json for reproducibility.
- Use a scoped service worker because Books has no offline shell and should not have its caching changed.
- Use local system fonts in Learn; preserve original Books fonts and assets.
- Preserve source curriculum mapping. The supplied https://www.ixl.com/math/kindergarten redirected to https://in.ixl.com/maths/ukg during inspection, which has a different regional organisation. Do not relabel the 369 source US mappings as that redirected curriculum. Money remains US coins/cents.
- The Prakriti product page was readable at https://prakritiproject.org/products/satvic-kids-food-book?Title=Default+Title. No proprietary artwork, logo or exact layout is copied. No teaching screenshot was attached with the request.
- Keep corrections in the importer and source files untouched. Reuse assets for worked examples instead of duplicating media.
- Future Django/DRF/MariaDB work is documentation only. No deployment was requested or performed.
