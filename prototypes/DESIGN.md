# blink · social — DESIGN.md

The design gate for the five social-feature prototypes. One stated direction, the
tokens that serve it, and the design-for-ai audit they were taken through.

## Aesthetic direction — *neon-noir nightlife*

Three words: **dark, electric, nocturnal.** The product is about who is physically
out *right now*, so the canvas is a true-black OLED night and presence is the one
thing that glows. This is a deliberate direction, not "dark mode by default": the
dark+neon pairing is justified by the medium (a going-out app used at night, on a
phone, glanced at in a dim room) — exactly the case ai-tells.md names as a *valid*
reason for dark UI, not a tell.

What makes it authored (choices a generic AI wouldn't default to):

- **One signal colour, used as meaning, not decoration.** Electric lime `#5ff780`
  *only* ever means presence: online, live, "happening now", you. It is never a
  generic accent. Pink `#ff75e1` is reserved for unseen stories. Place categories
  (park/club/bar/square/rooftop) each carry their own hue so the map reads by type.
- **Montserrat, all lowercase.** Geometric, friendly, gen-z — and the enforced
  lowercase gives every screen a calm, spoken voice instead of shouty UI caps.
- **iOS-native chrome, honestly rendered.** Real status bar, notch, blurred tab
  bar, bottom sheets — the prototype wears the platform it ships on rather than a
  bespoke web frame.
- **Real map pieces as content.** Event cards are actual map crops of the venue
  with a teardrop pin; "people nearby" is a real spotlight map. The geography *is*
  the UI.

AI-slop test: shown these screens, you would not believe "an AI made this" — the
map-crop cards, the single-meaning lime, and the lowercase voice are specific
decisions, not the Inter-on-cards default.

## Tokens (source of truth: `shared.css` `:root`)

| Token | Value | Role |
|---|---|---|
| canvas | `#000` (screen) / `#08080a` (deck) | true-black OLED night |
| `--green` | `#5ff780` | presence — online / live / now / you |
| `--pink` | `#ff75e1` | unseen stories only |
| `--text` → `--text-muted` | `#fff` `#d7d7dc` `#a9a9b2` `#8a8a93` | 4-step text ramp |
| surfaces | `#1c1c1e … #3a3a3c` | raised UI on black |
| place hues | park/club/bar/square/rooftop | map legibility by type |
| `--font-ui` | Montserrat (embedded woff2) | all interface type, lowercase |
| `--ease` | `cubic-bezier(.32,.72,0,1)` | one ease-out curve, no overshoot |
| radii | `18 / 22 / 999` | card / CTA / pill |

Contrast: the text ramp clears WCAG AA on both `#000` and the raised surfaces
(`--text-muted` ≈ 5.7:1 on black, ≈ 4.7:1 on `--surface`). Lime and pink on black
are far above AA.

## Architecture

- `presentation.html` — the deck. Five slides (description left, live prototype
  right in an iframe), bottom pager + arrows + keyboard nav. **This is the entry point.**
- `prototypes/fN-*.html` — one self-contained, separately-editable file per feature.
- `prototypes/shared.css` — embedded font + all tokens + shared components.
- `prototypes/shared.js` — the "Proto" core (screen nav, sheets, toggles, send).

Each prototype runs standalone *and* embedded in the deck — open any
`prototypes/fN-*.html` directly to polish it in isolation.

## design-for-ai audit — applied fixes

Run against `ai-tells`, `motion`, `interaction`, `usability`, `content-design`.

**Motion** (`motion.md`)
- Removed the notification-entry **overshoot/bounce** (`@keyframes pushin` no longer
  scales past 1.0) → clean exponential ease-out. *No bounce/elastic in UI.*
- Story progress bar and poll result bars now animate **`transform: scaleX`**, not
  `width` → GPU-composited, no per-frame layout. Bars also **stagger** (70ms) on reveal.
- Durations pulled into the **100 / 300 / 500** rule (push 500ms, bars 500ms).
- `prefers-reduced-motion: reduce` neutralises all motion (shared.css).
- Ambient loops (live reply bubbles, event pulse, orb aura) are *purposeful* —
  each communicates presence/liveness — and animate transform/opacity only.

**Interaction** (`interaction.md`)
- Added a keyboard **`:focus-visible`** lime ring globally; every `outline:none`
  input (composers in F1/F3 + the shared one) now has a visible `:focus-within` ring.
- **Touch targets** raised to ≥44×44 on the nav/back/close buttons and the send
  button; poll options are 60px.
- Hover + active feedback on the primary CTA and icon buttons (8-state coverage).
- Poll reveal acknowledges the user's own pick (`· ты`) and marks the winner by
  **length + number + colour** (not colour alone).

**AI-tells / composition** (`ai-tells.md`)
- Stated direction above; single-meaning colour; asymmetric deck layout (text left,
  device right); varied presentation per feature (map, feed, chat, orb, poll) rather
  than one repeated card.

**Content** (`content-design.md`) — UI voice is lowercase, casual, human; labels are
concrete ("брось реплику в эфир", "как это работает"), no robotic filler.
