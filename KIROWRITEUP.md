# Kiro Usage Write-up — Necropolis (Kiroween 2026, Resurrection)

## What Kiro artifacts were actually used

This project was built following the Kiro spec-driven workflow, with the
artifacts committed in `.kiro/` at the repo root:

1. **Specs** (`.kiro/specs/necropolis/`):
   - `requirements.md` — the problem, the seven features (editor,
     Medium generator, guestbook, counter, webring, ambience, export),
     constraints (static only, no server, no paid APIs), and acceptance
     criteria. Written before any code.
   - `design.md` — the architecture decision (one `renderPage`
     renderer feeding both the live preview iframe and the export),
     the state model, the four CSS-only themes, and the Medium's
     phrase-table design.
   - `tasks.md` — the implementation checklist, checked off as each
     piece landed; the remaining items are the user-side steps
     (repo creation, deploy, video, Devpost submit).
2. **Steering** (`.kiro/steering/`): `product.md` (the "would this have
   existed on GeoCities in 1998?" test), `tech.md` (static-only, one
   renderer, escape user text), `style.md` (90s voice in generated
   copy, calm modern editor chrome). These rules were followed while
   writing every file.
3. **Hooks** (`.kiro/hooks/hooks.json`): `save-and-render` (every editor
   change persists to localStorage and re-renders the preview) and
   `export-check` (export requires a name and at least one link). Both
   are implemented as real behavior in `app.js`.

## What was NOT done

- No Kiro IDE agent chat sessions were used to generate this code in
  the Kiro IDE itself; the spec/steering/hook artifacts above are the
  Kiro workflow as applied here. Nothing in this write-up claims IDE
  usage that did not happen.
- The "Medium" content generator is template-based phrase tables in
  `app.js`. It makes no model calls and is not presented as AI.

## Verification

The app was tested in headless Chromium: editor → live preview →
guestbook sign → export, with screenshots in `screenshots/`. It runs
from a static host with no backend.
