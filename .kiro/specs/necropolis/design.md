# Design — Necropolis: GeoCities Reborn

## Architecture
Single-page static app, three files, no framework:

```
index.html   — app shell (editor + live preview pane)
styles.css   — editor chrome + the four haunted 90s themes
app.js       — state, rendering, generator, guestbook, export
templates/   — starter-page JSON (three pre-haunted personas)
```

The live preview is an `<iframe>` fed by `srcdoc`, rendered from the
same `renderPage(state)` function used by Export. One renderer, two
outputs — preview and export can never drift apart.

## State model (localStorage key `necropolis.v1`)
```json
{
  "theme": "mansion | pumpkin | crypt | carnival",
  "owner": "string",
  "title": "string",
  "tagline": "string",
  "about": "string",
  "links": [{ "label": "string", "url": "string" }],
  "guestbook": [{ "name": "string", "message": "string", "ts": 0 }],
  "visits": 0,
  "ambience": true,
  "webring": { "prev": "url", "next": "url" }
}
```

## Themes (all CSS, no images)
- **Haunted Mansion** — deep purple, lime text, candle glow.
- **Pumpkin Patch** — black + orange, jack-o-lantern accents.
- **Crypt Keeper** — dark green, bone white, moss borders.
- **Midnight Carnival** — hot pink + teal on near-black.

Each theme is a CSS class on the preview root; the exported page inlines
the theme CSS so the file is self-contained.

## The Medium (template generator)
`generateCopy(theme, section)` picks from hand-written phrase tables:
openers, 90s sign-offs ("~*~*~*~"), under-construction banners,
"best viewed at 800x600" badges, and per-theme flavor lines. A seeded
pick keeps output stable until the user asks for another reading.

## Ambience
- CSS fog (animated gradients) + candle flicker on the preview.
- WebAudio drone: two detuned low oscillators + slow LFO, started only
  on user toggle (no autoplay, no files).

## Export
`exportHTML()` calls `renderPage(state)` with theme CSS inlined, then
downloads it as `<slug>.html` via a Blob. The exported page includes its
own guestbook form (localStorage on the visitor's browser) and counter.

## Security / privacy
No network calls at all. No analytics. Guestbook data never leaves the
visitor's browser except inside the exported file the owner publishes.
