# Adding content

1. Prepare source records with stable activity/question IDs, explicit subject/grade/language/age metadata, skill mappings and local assets. Do not equate grade with age internationally.
2. Extend the importer to include the collection; add only usable subjects/grades. Retain stable topic codes and choose unique URL slugs. Current routing/path helpers are Maths/Kindergarten-specific and must be extended for another collection.
3. Supply at least ten semantically distinct valid sets per activity, answers, hints and worked examples. Changing only option order is insufficient.
4. Place activity art under `images/<activity-ID>_<name>/`; reuse source paths where applicable. Keep audio local and currency explicit. Include all asset references in the topic manifest.
5. For a new interaction, extend Mode and Question types, implement accessible controls in QuestionView, implement its pure answer rule and add unit/browser tests. Use tap alternatives and no mandatory dragging.
6. Reimport, validate, build and test. Review the real student screen and update coverage, corrections, schema, activity-types and handover documentation.

Do not put content loading, storage calls or future API logic directly inside individual controls. Add future adapters behind the existing interfaces.
