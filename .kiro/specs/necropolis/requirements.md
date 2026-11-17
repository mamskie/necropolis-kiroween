# Requirements — Necropolis: GeoCities Reborn

Kiroween 2026, category: **Resurrection**. Deadline: Fri 4 Dec 2026, 2:00 PM PT
(Sat 5 Dec 2026, 05:00 WIB).

## Problem
The personal homepage is dead. GeoCities closed in 2009 and took the
hand-made, haunted, gloriously ugly personal web with it. Modern profiles
are identical templates on rented platforms. People who never built a 90s
homepage have never felt the joy of a visitor counter, a guestbook, and a
webring.

## What the app does
Necropolis is a static web app that resurrects the personal homepage:

1. **Visual editor** — pick a haunted theme, fill in your identity
   (name, tagline, about), add links, and watch a live 90s-style preview.
2. **Medium generator** — a template-based content generator that writes
   page copy in authentic 90s-web voice. No external AI calls, no keys,
   no network: it runs entirely in the browser from phrase tables.
3. **Guestbook** — visitors sign it; entries persist in localStorage.
4. **Visitor counter** — a retro odometer-style counter, persisted locally.
5. **Webring** — prev / random / next links joining the Necropolis ring of
   resurrected homepages.
6. **Ambience** — a toggleable spooky atmosphere (fog, flicker, and a
   WebAudio-generated drone — no audio files, no autoplay).
7. **Export** — download the finished homepage as one standalone static
   HTML file that works on any static host with no backend.

## Constraints
- Static only: HTML/CSS/JS, no build step, no server, no paid APIs.
- Must work from `file://` and any static host (GitHub Pages, Netlify).
- State persists in `localStorage`; export must never depend on it.
- All assets inline or local; no external fonts or images (offline-safe).
- Repo must contain `/.kiro` at the root, with specs, steering, and hooks.

## Acceptance criteria
- Editor → preview updates live with no reload.
- Exported HTML opens standalone, shows the same content, guestbook
  form, counter, and webring.
- Guestbook entries survive a page reload.
- App works with JavaScript disabled? No — JS is required, but the
  exported page degrades gracefully (content still renders).
- Zero console errors on load and on every editor action.
