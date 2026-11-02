# Content schema

Types are in `src/features/learn/model.ts`. Every imported record has `schemaVersion: 1` and a deterministic `contentVersion` from source content plus importer revision. Subject, grade, age range and language are independent fields.

An activity retains `id`, `title`, `topic`, `topicCode`, `skill`, `objective`, `referenceSkills`, `extension`, `difficulty`, `questions` and source paths. Added relationships include `subjectId: maths`, `gradeId: kindergarten`, `language: en`, `ageRange: {min:4,max:6}`, `topicSlug`, `interactionType` and `examples`.

Example: MATH-K-001 belongs to topic A, Numbers to 3, and maps to reference skill A.1. Its first question MATH-K-001-Q01 asks “Find one.”, has mode `choice`, answer `1`, four numeric options and a local SVG. Object options use stable `label` values for checking and optional `text`, `accessible`, `image` fields for presentation. Labels are not always the displayed answer text.

Questions include IDs, prompt, answer, mode, options, feedback and hint. Optional fields describe image/audio, counters, capacity, cards, claims, equation parts/tokens and reference choices. `rounds` recursively contains cards; `match` checks all card answers together. A worked example stores its question, explanation steps, human-readable answer and a similar try question.

Topic records include stable code, display title, slug, skill count, activity IDs and an asset manifest. The catalogue contains only activity summaries; full questions load on demand.

Validation checks IDs, known interactions, local asset existence, option/answer consistency, counts, equations, arithmetic prompts, capacities, distinct semantic sets and source skill coverage. Runtime loading checks schema compatibility. These checks are not a complete mathematical proof or accessibility audit. See `reports/content-validation.json`.

Progress sessions may also contain optional `tutorial` data (version 1): stage, questionIndex, demoStep, answer, checked, attempts and mistakes. This is backwards-compatible with existing sessions. Invalid tutorial data is dropped without deleting the activity session. See guided-first-question.md.
