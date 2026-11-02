# Interactive first-question guide

Every newly started activity opens a four-stage guide: welcome, completed example, interactive first question, and success. It uses the actual activity's first question set, including all nested round parts. Existing saved practice sessions without guide metadata continue normally; Restart guide opens the new experience without discarding their practice progress.

The demonstration shows a different source question with its completed controls and one explanation step at a time. Practice uses the same accessible QuestionView and pure answer rules as normal activities. The question area and Check control are highlighted. Instructions change with the interaction and answer state. Wrong answers cannot advance. Hints appear after a mistake, on request, or after 20 seconds without an answer change; after two mistakes the hint explains the answer and the child must still construct/select and check it.

Next, Back, Skip guide, Try Again and Restart guide are available at their relevant stages. Completion credits the real first question set; it does not complete the entire activity. The success view offers continued practice and another unfinished activity from the same topic where possible. Replaying a guide never moves later activity progress backwards. Skipping during practice retains that real question's current answer when no later progress exists.

`Session.tutorial` is an optional version-1 nested record: stage, question index, demonstration step, answer, checked state, attempts and mistakes. It is persisted through ProgressRepository alongside existing sessions. Invalid guide records are discarded without losing valid activity progress. No separate backend or account is introduced. Resetting all learning progress also clears guides. Content-version incompatibility uses the existing session reset behaviour.

Implementation: `src/features/learn/guidance.ts` contains pure transitions, validation and hints; `GuidedFirstQuestion.tsx` handles the interface; `ActivityPage` selects the guide or ordinary practice. Source questions, answers, IDs and offline manifests are unchanged. The guide works from a downloaded topic with the updated application shell.

Tests cover answer gating, nested rounds, preserving later progress, malformed state, restoration after reload, Back/Skip/Restart, explicit and idle hints, mobile completion, and recommendations. Student screenshots are `outputs/previews/desktop-guide-practice.png` and `phone-guide-complete.png`.


## Navigation and feedback update

Demonstration headings identify the current instruction, and the Back/Next/Skip row sits before changing demonstration content. The `advanceDemo` transition advances exactly one stored instruction, including a restored step-two session. Success and retry feedback use `AnswerFeedback`; only the success dialog's Next question action advances the first-set part. Retry clears the attempt while retaining mistake history for hints. Closing or escaping either popup never advances. The native dialog blocks background interaction and restores focus on dismissal.
