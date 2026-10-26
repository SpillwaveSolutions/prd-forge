# Section 7 (continued). Wireframes

**Kind** `wireframes` · **Schema** `prd-forge/wireframes@1` · **File** `08-wireframes.md`

## What this section is

A text sketch of every screen a person works in and every report a person reads,
drawn in characters so it reads the same in the pane, in a pull request, and in
the printed PRD. Each sketch names the requirements it makes concrete, the
persona who looks at it, and the journey stage where they do.

A wireframe is an **illustration, not a design**. It shows what a person sees
and what they can do there. It never decides layout, color, type, platform, or
how anything is built. The design team owns those.

## Why it matters

Requirements say what a person can do. A sketch shows whether the requirements
together make a page a person could use. Drawing one finds what the words hide:
a decision the journey names with nothing on screen to make it, a number the
report needs that no requirement produces, a button that serves no requirement.

An engineering lead and a designer read a sketch in seconds. They read a page of
requirements in minutes and still argue about what it meant.

## When a wireframe is required

Every functional requirement carries `shown_in`: where the user meets the
outcome.

| `shown_in` | Meaning | Wireframe |
| --- | --- | --- |
| `screen` | The person works in something they look at | Required |
| `report` | The person reads an output: a printout, an export, a summary | Required |
| `conversation` | The person talks or types, and reads replies | Not required |
| `none` | Nothing the person looks at changes | Not required |

The validator fails the set when a `screen` or `report` requirement has no
wireframe that illustrates it. One wireframe usually illustrates several
requirements.

## What belongs in it

- One `WF-nnn` per screen or report, each with `title`, `type` (`screen` or
  `report`), `persona`, `journey_stage`, `illustrates` (FR or NFR IDs), and
  `shows`: one line per mark in the sketch, in mark order.
- In the body, for each one: a heading that holds its ID and title, one line
  that says "Illustration, not a design" and names the requirements, then a
  fence opened with ` ```wireframe ` holding the sketch.
- Real content from the domain: the expert's own names, numbers, and dates.
- The empty state, or the exception state, where a scenario names one. Draw it
  as a second, smaller sketch with its own ID.

## How to draw the sketch

Keep every line at 60 characters or fewer. The validator enforces it, because
the pane and the printed page are both about that wide.

| Element | Draw it as |
| --- | --- |
| Frame of a screen or a page | `┌─ Title ─────┐`, `│ … │`, `└─────────────┘` |
| Divider between areas | `├─────────────┤` |
| Button | `[ Approve ]` |
| Text field | `[ Customer name________ ]` |
| Drop-down | `[ All carriers       ▾ ]` |
| Checkbox, chosen and not | `[x] Hazmat`, `[ ] Hazmat` |
| One-of choice, chosen and not | `(•) Today`, `( ) This week` |
| Table | Column titles, a `─` rule, three real rows, then `…` |
| Link | `› View load` |
| Mark that `shows` explains | `<1>`, `<2>`, in reading order |

Put a mark on each part a person decides with or reads a number from. Do not
mark the frame.

## Draw it again in PlantUML Salt

The text sketch is what the pane shows. The Word and PDF export shows a drawing
instead: a PlantUML Salt version of the same sketch, with the same marks. After
the expert confirms a sketch, write its drawing to
`<set>/diagrams/WF-nnn.puml`, then render the set's diagrams:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/prd-diagrams.mjs" <set directory>
```

The script renders each drawing to `.svg` and `.png` and links the `.svg` under
the sketch it draws. The validator fails the set when a wireframe has no
drawing.

| Sketch | Salt |
| --- | --- |
| Frame and title | `@startsalt`, `title WF-001 …`, `{+`, `{/ <b>Title</b> }` … `}`, `@endsalt` |
| Divider | `--`, or `==` between major areas |
| Button | `[Approve]` |
| Text field | `"Customer name      "` |
| Drop-down | `^All carriers^` |
| Checkbox, chosen and not | `[X] Hazmat`, `[] Hazmat` |
| One-of choice, chosen and not | `(X) Today`, `() This week` |
| Columns side by side | `{ [Assign] \| <4> }` |
| Table | `{#` then one row per line, cells split by `\|`, then `}` |
| Bold | `<b>Functional requirements` |
| Mark | `<1>`, written as text, exactly as in the sketch |

Keep the drawing to what the sketch shows. A drawing is not a place to add
detail the sketch and the requirements do not have.

## What does not belong

- Colors, fonts, pixel sizes, icons, logos, or brand.
- A platform or a component library: "iOS", "a React table", "a Material card".
- A control no requirement asks for. If the sketch needs one, the requirement is
  missing. Go back to section 7 and write it, or leave the control out.
- Screens for setup, settings, or administration that no journey stage visits.
- Lorem ipsum, `XXX`, or `Name 1`, `Name 2`. Ask for real values.

## How to interview for it

Interview after section 7 is drafted. Walk the release line one stage at a time.

1. "At this stage, what is in front of you? A screen, a printout, a message?"
   Record the answer as `shown_in` on each requirement of the stage.
2. "When you open it, what do you look at first?" Draw that at the top.
3. "What do you decide here? What do you need in front of you to decide it?"
   Each answer is a mark. Check that a requirement produces each one.
4. "Give me three real rows, as they would look on a normal morning."
5. "What does it look like when there is nothing to show, or when it went
   wrong?" Draw the state that a scenario names.
6. Show the sketch and ask: "What is missing, and what would you never use?"
   Delete what they would never use.

Draw it in the chat first. Write the file after they confirm it.

## Worked example (domain: freight transportation)

```yaml
wireframes:
  - id: WF-001
    title: Load board, morning dispatch
    type: screen
    persona: PER-001
    journey_stage: ST-002
    illustrates: [FR-003, FR-004, FR-006]
    shows:
      - The loads still without a carrier, oldest pickup first
      - The pickup window the dispatcher must meet
      - The carriers that have taken this lane before, by on-time rate
      - Assign sends the offer to the chosen carrier
```

The body for the same wireframe:

````markdown
## WF-001 Load board, morning dispatch

Illustration, not a design. Illustrates FR-003, FR-004 and FR-006.
PER-001 sees it at ST-002.

```wireframe
┌─ Load board ─────────────────── Tue 14 May, 06:40 ─┐
│ Unassigned: 12 <1>       [ All lanes          ▾ ]  │
├────────────────────────────────────────────────────┤
│ Load    Lane            Pickup <2>        Weight   │
│ ────────────────────────────────────────────────── │
│ L-4471  Leeds › Hull    07:00, 09:00       18.2 t   │
│ L-4472  York › Derby    08:30, 10:00        9.6 t   │
│ L-4475  Hull › Leeds    11:00, 13:00       21.0 t   │
│ …                                                  │
├────────────────────────────────────────────────────┤
│ L-4471 carriers on this lane <3>                   │
│ (•) Northline Haulage    96% on time               │
│ ( ) Pennine Freight      91% on time               │
│                                     [ Assign ] <4> │
└────────────────────────────────────────────────────┘
```
````

## Rubric

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Coverage | Screens or reports with no sketch | Most have one | Every `screen` and `report` requirement is illustrated |
| Traceability | Sketches stand alone | Some name requirements | Every sketch names its requirements, persona, and stage |
| The person's view | A system diagram | Some of what they see | What the person sees and decides at that stage, and nothing else |
| Real content | Placeholders | Mixed | The expert's own names, numbers, and dates |
| Marks explained | No marks | Some marks, some lines in `shows` | Every mark has its line in `shows`, in order |
| No design | Colors, fonts, or a platform | Occasional leak | Nothing but what the person sees and does |
| States | Happy path only | Mentioned | Empty and exception states drawn where a scenario names them |
| Every control earns its place | Controls no requirement asks for | One or two | Every control traces to a requirement |

## Blocking defects

- A requirement with `shown_in: screen` or `shown_in: report` that no wireframe
  illustrates.
- A wireframe that illustrates an ID that does not exist.
- A wireframe with no ` ```wireframe ` fence under its heading.
- A sketch line wider than 60 characters.
- A wireframe with no PlantUML Salt drawing in `diagrams/`.
- A sketch that names a technology, a platform, a vendor, or a component
  library.

## Industry-standard wording

- Say "wireframe" for the sketch, "screen" for something a person works in, and
  "report" for something a person reads.
- Say "illustration, not a design" once per wireframe, in the line above the
  sketch.
- Name parts by what the person does with them: "the assign button", not "the
  primary CTA".
