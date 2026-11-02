# Shared Pattu design system

Books and Learn share `dist/assets/css/pattu-tokens.css`. Books imports it directly; Vite bundles it into Learn. Change semantic tokens there rather than adding palette overrides. Mathematical source artwork is deliberately unchanged.

| Token | Colour | Use |
| --- | --- | --- |
| green | #00652D | Primary actions and navigation |
| purple | #782A90 | Learning headings, selection and focus |
| ink | #231F20 | Body text |
| yellow | #FCE292 | Teaching and welcoming surfaces |
| bright-green | #37B549 | Decorative details |
| orange | #F78C1E | Decorative accents |
| gold | #FBCB0F | Small highlights |
| berry | #7B0045 | Error feedback |
| cream | #FFFAF0 | Page surface |

Nunito variable is locally hosted under `public/learn/fonts`, with its SIL Open Font License. Outfit is also locally hosted solely for the Pattu wordmark. Both fonts are included in the service-worker shell. No Google Fonts runtime request remains.

Use white on green for the primary action, outlined secondary controls, purple selection with a checkmark, and berry errors with text and an exclamation symbol. Pale mint/lavender/white surfaces support the palette. Semantic text colour pairs meet 4.5:1; functional boundary and focus pairs meet 3:1, verified in `tests/design.test.ts`. Bright accents are not text colours.

Controls and answer buttons are at least 48px, with navigation and supplementary targets at least 44px. Spacing follows 8/12/16/24/32px steps; cards use rounded corners and subtle shadows. `TeachingPanel` and `LearningProgress` are reusable presentation components. Worked examples separate Question, Let's work it out, Answer and Try one. The live practice workspace remains mounted while viewing examples.

The catalogue uses three desktop, two tablet and one phone columns; topic activity lists follow the same progression. Books uses natural hero height instead of forced viewport spacing. Both header actions remain visible, with no separate Learn promotional section. The existing animal artwork, animation toggle, keyboard controls, reduced motion and learning content are preserved.

The secondary Prakriti product-page reference was visually inspected for rounded typography, neutral surfaces, spacing and image-led composition. No branding or reference artwork was copied. Actual responsive screenshots are in `outputs/previews/redesign-*`.

## Compact layout and answer dialogs

The Learn-only announcement strip is removed. Header, breadcrumbs, introductions and question spacing are compact; the existing palette, artwork and fonts are unchanged. Guide navigation stays above the changing demonstration content in a stable action row, and each example instruction is identified in the heading as well as its counter. `advanceDemo` advances the stored instruction index once per activation, including after restoring step two.

`AnswerFeedback` uses a native modal dialog: one active feedback result, inert background, contained keyboard focus, Escape/close dismissal without advancement, and focus restoration. Correct answers advance only through **Next question →**. Incorrect answers offer **Retry**, reset the attempted answer and stay on the same question. Guide attempts/hints and saved progress remain intact. Worked-example success returns to the original practice position rather than crediting an unanswered practice question.

Long lessons and large question sets remain naturally scrollable; text is not clipped or scaled down to fit an entire lesson. Opening sections, question diagrams and action spacing adapt to the viewport. Popup height is bounded to the viewport and scrolls internally if enlarged text requires it. Reduced-motion preferences suppress the entry animation.

On phones, Search and filters is an expandable disclosure so the first activity appears earlier. All filtering controls remain available.


## 2 November 2026 — book shelf and learning welcome

Replaced four sample titles and prices with Nila at Paatti’s Home (ages 4–6). The responsive feature includes the supplied front cover and a front/back image carousel. Category filters retain Storybooks and Activity books, with an explicit empty state for Activity books. Confirm pricing and add the existing WhatsApp configuration before enabling direct ordering.

The Learn welcome uses a normal-flow curiosity card with separate number and shape tiles, replacing the overlapping garden decoration. Saved progress and Continue learning remain intact. Books source lives in dist/index.html and dist/assets; npm run build regenerates dist/learn. Learning content and coverage are unchanged.

The Books reading promise uses a lavender callout, a yellow book illustration, and purple/green emphasis on the two quoted phrases. It stacks below the section title on smaller screens. Verified at 320, 390, 768 and 1365 pixels without horizontal overflow.


### Pre-order update
Nila at Paatti’s Home is not released yet. It appears in both Storybooks and Activity books, with a Pre-order now button. Book and contact buttons open WhatsApp at +94 70 185 6427 (wa.me/94701856427), with pre-filled enquiry text. No message is sent automatically. Price and release date are not specified.
