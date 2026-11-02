# Activity types

| Mode | Interaction | Answer rule |
|---|---|---|
| choice | Select one text/picture | Normalised scalar equality |
| multi | Toggle all fitting choices | Exact unordered set |
| input | Type a number/word | Trimmed case-insensitive equality |
| build | Fill/remove counter spaces | Quantity equality |
| buildpair | Build A and B separately | Ordered pair equality |
| tapcount | Mark objects, then choose total | Chosen total equals answer |
| ordinal | Choose an object from the left | Position equality |
| order | Build a sequence with tap/undo | Exact ordered sequence |
| equation | Build a number sentence | Exact token sequence |
| classify | Choose fits/does not fit for each claim | Ordered claim answers |
| match | Choose an answer for every card | Ordered card answers |
| rounds | Solve nested cards sequentially | Each leaf must pass |

Use `checkAnswer` and `flattenQuestions` outside the renderer. A question set can contain multiple sequential parts, while catalogue counts count the set once. Retry clears the current answer; restart requires confirmation and resets the activity. Completion is reached after the final successful Next action.

Worked examples reuse this renderer, use a separate answer state and return to the saved practice step. Examples are generated using topic/prompt teaching rules; their educational quality still needs independent review. Audio buttons are shown only when a local recording is referenced.
