# Devpost Submission — Necropolis: GeoCities Reborn

Kiroween 2026 · https://kiroween.devpost.com/
Deadline: **Fri 4 Dec 2026, 2:00 PM PT (Sat 5 Dec 2026, 05:00 WIB)**

## Fields to fill on Devpost

| Field | Value |
|---|---|
| Title | Necropolis: GeoCities Reborn |
| Category | Resurrection |
| Description | The personal homepage is dead. Necropolis brings it back: pick a haunted theme, build your 90s-style personal homepage in a visual editor (sections, guestbook, visitor counter, webring), let the template-based "Medium" write your page copy in 90s-web voice, and export it as one standalone static HTML file. No servers, no accounts, no tracking — your page is yours. |
| GitHub repo | https://github.com/mamskie/necropolis-kiroween (create first — see below) |
| App URL | https://mamskie.github.io/necropolis-kiroween/ (deploy after push; GitHub Pages from repo root) |
| Demo video | Public YouTube video, < 3 minutes (record after deploy) |
| Kiro usage | Paste `KIROWRITEUP.md` |

## Remaining user steps (in order)

1. **Create the repo** on GitHub: `mamskie/necropolis-kiroween`, public,
   empty, MIT license. Do NOT add a README from GitHub (one is in the
   repo already).
2. **Push this directory** as the repo root:
   ```sh
   cd ~/workspace/kiroween/necropolis
   git init && git add . && git commit -m "Necropolis: GeoCities reborn (Kiroween 2026)"
   git branch -M main
   git remote add origin https://github.com/mamskie/necropolis-kiroween.git
   git push -u origin main
   ```
   Verify `.kiro/` is in the repo (it must NOT be gitignored).
3. **Enable GitHub Pages**: repo Settings → Pages → deploy from `main`
   branch, root. The app URL is
   `https://mamskie.github.io/necropolis-kiroween/`.
4. **Record the demo video** (< 3 min): editor → theme change → Medium
   → guestbook sign → export → open the exported file. Upload to
   YouTube as public.
5. **Submit on Devpost** with the fields above. Indonesia is not on the
   excluded-countries list in the 2026 rules (re-verify at submit time).

## What is already done

- App built and tested locally (see `screenshots/`).
- MIT LICENSE, README, `.kiro/` specs/steering/hooks, KIROWRITEUP.md.
- No push, no deploy, no Devpost submission has been made from here.
