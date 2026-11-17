# Steering — Tech

- Static only: HTML + CSS + vanilla JS. No build step, no framework,
  no bundler, no external requests.
- One renderer (`renderPage`) feeds both the live preview iframe and
  the export. Never duplicate rendering logic.
- All state in one object, persisted to `localStorage` under
  `necropolis.v1`. Every mutation goes through `save()` then `render()`.
- Escape all user text before injecting into HTML (guestbook, links,
  about). The export must be safe to publish.
- Keep files small and readable; a judge should be able to read the
  whole app in one sitting.
