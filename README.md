# Necropolis — GeoCities Reborn

**Kiroween 2026 · Category: Resurrection**

The personal homepage is dead. Necropolis brings it back: a static web
app that lets anyone build a haunted 90s-style personal homepage in a
visual editor — themes, a template-based "Medium" copy generator,
guestbook, visitor counter, webring — and export it as one standalone
static HTML file.

## Run it

No build step, no server, no keys. Any static host works:

```sh
# option 1: open directly
open index.html

# option 2: serve locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How it works

- **Editor** (left): name, title, tagline, about, links, theme, webring.
- **Live preview** (right): the same renderer that powers export, so
  preview and export can never drift apart.
- **The Medium**: a template-based generator that writes page copy in
  90s-web voice. Runs entirely in the browser — no AI calls, no network.
- **Guestbook + counter**: persist in `localStorage`; exported pages
  carry their entries with them.
- **Export**: downloads one self-contained `.html` file. Publish it on
  GitHub Pages, Netlify, or any static host.

## Project layout

```
index.html                 app shell (editor + preview)
styles.css                 editor chrome + 4 haunted themes
app.js                     state, renderer, Medium, export
templates/                 3 starter personas (JSON)
.kiro/                     specs, steering, hooks (do not gitignore)
  specs/necropolis/        requirements.md, design.md, tasks.md
  steering/                product.md, tech.md, style.md
  hooks/hooks.json         save-and-render + export-check hooks
KIROWRITEUP.md             how Kiro artifacts were used
SUBMISSION.md              Devpost fields + remaining steps
```

## License

MIT — see `LICENSE`.
