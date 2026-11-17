/* Necropolis — GeoCities Reborn. Static app, no network, no build step. */
"use strict";

const STORE_KEY = "necropolis.v1";
const RING_HUB = "https://kiroween.devpost.com/";

/* ---------- themes: CSS injected into the preview / export ---------- */
const THEMES = {
  mansion: {
    name: "Haunted Mansion",
    css: "body{background:#1a0b2e;color:#c8ffb0;font-family:'Times New Roman',serif}h1{color:#b6ff5e;text-shadow:0 0 12px #7CFC00}a{color:#ff9dff}hr{border-color:#7CFC00}.badge{background:#2b0f4d;border:2px solid #7CFC00}.counter{color:#39ff6a}"
  },
  pumpkin: {
    name: "Pumpkin Patch",
    css: "body{background:#140a00;color:#ffd9a0;font-family:'Comic Sans MS','Comic Sans',cursive}h1{color:#ff8c00;text-shadow:2px 2px 0 #000}a{color:#ffb347}hr{border-color:#ff8c00}.badge{background:#3d1e00;border:2px solid #ff8c00}.counter{color:#ffb347}"
  },
  crypt: {
    name: "Crypt Keeper",
    css: "body{background:#0a1410;color:#d8e8d0;font-family:Georgia,serif}h1{color:#a8d8a0;text-shadow:0 0 8px #3a7d44}a{color:#9fd8ff}hr{border-color:#3a7d44}.badge{background:#12261a;border:2px solid #3a7d44}.counter{color:#9fd8a8}"
  },
  carnival: {
    name: "Midnight Carnival",
    css: "body{background:#160a1e;color:#ffd6f2;font-family:Verdana,sans-serif}h1{color:#ff4fd8;text-shadow:2px 2px 0 #00e5d4}a{color:#00e5d4}hr{border-color:#ff4fd8}.badge{background:#2a0f28;border:2px solid #ff4fd8}.counter{color:#00e5d4}"
  }
};

/* ---------- the Medium: template-based 90s copy generator ---------- */
const MEDIUM = {
  openers: [
    "Welcome to my corner of the cyberspace!",
    "You have entered the haunted halls of {owner}'s homepage!",
    "Greetings, traveler! You found my little haunted house on the web.",
    "Welcome, welcome! Mind the cobwebs — they've been here since 1997.",
    "Halt! Who goes there? Oh — it's you. Come in, come in."
  ],
  abouts: [
    "{owner} haunts the internet since the days of dial-up. Hobbies: collecting haunted GIFs, writing in the guestbook of strangers, and keeping this page under eternal construction.",
    "This is {owner}'s personal page. I like spooky things, slow modems, and websites that look like they were built by hand — because this one was.",
    "Hi! I'm {owner}. This page is my digital haunted house: a little crooked, a little dusty, and 100% mine. Best viewed at 800x600 with the lights off.",
    "{owner} lives on the web. Not in the cloud — ON the web. In a house. With a guestbook. You are here now. That makes you a guest. Sign the book."
  ],
  signoffs: [
    "~*~*~*~ Thanks for stopping by! ~*~*~*~",
    "— {owner}, keeper of this haunted corner",
    "Best viewed at 800x600 · Netscape Navigator 4.0 or better",
    "This page is under eternal construction. It will never be finished. Neither will you.",
    "You are visitor number {visits}. The counter never lies. The counter never forgets."
  ],
  banners: ["UNDER CONSTRUCTION", "NEW!", "ENTER IF YOU DARE", "SIGN MY GUESTBOOK OR BE CURSED"]
};

function pick(arr, seed) {
  return arr[Math.abs(seed) % arr.length];
}
function fill(str, s) {
  return str.replaceAll("{owner}", s.owner || "a mysterious stranger")
            .replaceAll("{visits}", String(s.visits || 0));
}
function mediumCopy(section, state) {
  const seed = (state.visits || 0) + section.length * 7 + Date.now() % 997;
  if (section === "about") return fill(pick(MEDIUM.abouts, seed), state);
  if (section === "signoff") return fill(pick(MEDIUM.signoffs, seed + 3), state);
  return fill(pick(MEDIUM.openers, seed), state);
}

/* ---------- state ---------- */
const DEFAULT_STATE = {
  theme: "mansion", owner: "Morticia", title: "Morticia's Haunted Mansion",
  tagline: "Welcome to my corner of the cyberspace!",
  about: "This is Morticia's personal page. I like spooky things, slow modems, and websites built by hand — because this one was.",
  links: [
    { label: "My haunted photo album", url: "https://example.com/photos" },
    { label: "My favorite spooky links", url: "https://example.com/links" }
  ],
  guestbook: [], visits: 1, ambience: true, ringPrev: "", ringNext: ""
};
let state = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign({}, DEFAULT_STATE, JSON.parse(raw));
  } catch (e) { /* corrupted storage: start fresh */ }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------- rendering: one renderer for preview AND export ---------- */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function renderPage(s, standalone) {
  const theme = THEMES[s.theme] || THEMES.mansion;
  const prev = s.ringPrev || RING_HUB, next = s.ringNext || RING_HUB;
  const links = s.links.map(l =>
    `<li>👻 <a href="${esc(l.url)}">${esc(l.label)}</a></li>`).join("\n");
  const gb = s.guestbook.slice(-10).reverse().map(e =>
    `<p class="gb"><b>${esc(e.name)}</b> — ${esc(e.message)} <i>(${esc(e.ts)})</i></p>`).join("\n") ||
    "<p><i>No souls have signed yet. Be the first… if you dare.</i></p>";
  const fog = s.ambience ? '<div class="fog"></div>' : "";
  const banner = pick(MEDIUM.banners, (s.visits || 0) + 1);
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>${esc(s.title)}</title>
<style>
body{margin:0;padding:24px;text-align:center}
${theme.css}
h1{font-size:42px;margin:8px 0}
.marquee{font-weight:bold;letter-spacing:2px}
.badge{display:inline-block;padding:4px 10px;margin:4px;border-radius:4px;font-size:13px}
.counter{font-family:'Courier New',monospace;font-size:20px;border:2px solid currentColor;display:inline-block;padding:4px 12px;margin:10px}
ul{list-style:none;padding:0}
.gb{text-align:left;max-width:520px;margin:6px auto}
.fog{position:fixed;inset:0;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(200,200,255,.08));animation:fogmove 14s linear infinite alternate}
@keyframes fogmove{from{opacity:.2}to{opacity:.6}}
.webring{margin-top:18px;font-size:14px}
footer{margin-top:24px;font-size:12px;opacity:.8}
</style></head><body>
${fog}
<p class="marquee">✦ ${esc(banner)} ✦</p>
<h1>🪦 ${esc(s.title)}</h1>
<p><i>${esc(s.tagline)}</i></p>
<hr>
<h2>About ${esc(s.owner)}</h2>
<p style="max-width:560px;margin:0 auto">${esc(s.about)}</p>
<hr>
<h2>My Haunted Links</h2>
<ul>${links}</ul>
<hr>
<p class="counter">👁 You are visitor № ${String(s.visits).padStart(6, "0")}</p>
<h2>✒ Guestbook</h2>
<div>${gb}</div>
${standalone ? '<p><i>Sign the guestbook on the live site — this exported copy keeps the entries it was made with.</i></p>' : ""}
<div class="webring">🕸️ Necropolis Webring:
<a href="${esc(prev)}">← Prev</a> |
<a href="${RING_HUB}">Ring Hub</a> |
<a href="${esc(next)}">Next →</a></div>
<footer><p>${esc(mediumCopy("signoff", s))}</p>
<p>Made with Necropolis — GeoCities Reborn · Best viewed at 800x600</p></footer>
</body></html>`;
}

/* ---------- editor wiring ---------- */
const $ = id => document.getElementById(id);
function render() {
  $("preview").srcdoc = renderPage(state, false);
  $("counterBadge").textContent = "👁 Visitors: " + state.visits;
  document.querySelectorAll(".theme-swatch").forEach(b =>
    b.classList.toggle("active", b.dataset.theme === state.theme));
  $("guestbookList").innerHTML = state.guestbook.slice().reverse().map(e =>
    `<div class="gb-entry"><b>${esc(e.name)}</b> — ${esc(e.message)}<br><time>${esc(e.ts)}</time></div>`).join("") ||
    "<p class='hint'>No signatures yet.</p>";
  renderLinks();
}
function renderLinks() {
  $("linksList").innerHTML = state.links.map((l, i) =>
    `<div class="link-row"><input data-i="${i}" data-f="label" value="${esc(l.label)}"><input data-i="${i}" data-f="url" value="${esc(l.url)}"><button data-del="${i}" type="button">✕</button></div>`).join("");
  document.querySelectorAll("#linksList input").forEach(inp =>
    inp.addEventListener("input", () => {
      state.links[+inp.dataset.i][inp.dataset.f] = inp.value;
      save(); renderPreviewOnly();
    }));
  document.querySelectorAll("#linksList [data-del]").forEach(btn =>
    btn.addEventListener("click", () => {
      state.links.splice(+btn.dataset.del, 1); save(); render();
    }));
}
function renderPreviewOnly() { $("preview").srcdoc = renderPage(state, false); }

function bind(id, key) {
  $(id).value = state[key];
  $(id).addEventListener("input", () => { state[key] = $(id).value; save(); renderPreviewOnly(); });
}
function toast(msg) {
  const t = document.createElement("div");
  t.id = "toast"; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  bind("ownerInput", "owner"); bind("titleInput", "title");
  bind("taglineInput", "tagline"); bind("aboutInput", "about");
  bind("ringPrev", "ringPrev"); bind("ringNext", "ringNext");

  document.querySelectorAll(".theme-swatch").forEach(b =>
    b.addEventListener("click", () => { state.theme = b.dataset.theme; save(); render(); }));

  $("mediumBtn").addEventListener("click", () => {
    state.tagline = mediumCopy("opener", state);
    $("taglineInput").value = state.tagline; save(); renderPreviewOnly();
    toast("🔮 The Medium has spoken.");
  });
  $("mediumAboutBtn").addEventListener("click", () => {
    state.about = mediumCopy("about", state);
    $("aboutInput").value = state.about; save(); renderPreviewOnly();
    toast("🔮 Your About was written by the Medium.");
  });

  $("addLinkBtn").addEventListener("click", () => {
    const label = $("linkLabel").value.trim(), url = $("linkUrl").value.trim();
    if (!label || !url) { toast("Give the link a label and a URL first."); return; }
    state.links.push({ label, url });
    $("linkLabel").value = ""; $("linkUrl").value = "";
    save(); render();
  });

  $("templateSelect").addEventListener("change", async e => {
    const name = e.target.value;
    if (!name) return;
    try {
      const res = await fetch("templates/" + name + ".json");
      const tpl = await res.json();
      Object.assign(state, tpl);
      state.guestbook = state.guestbook || [];
      ["owner", "title", "tagline", "about", "ringPrev", "ringNext"].forEach(k => {
        const el = $(k + "Input") || $(k);
        if (el) el.value = state[k] || "";
      });
      save(); render();
      toast("Template loaded: " + tpl.owner);
    } catch (err) { toast("Could not load that template."); }
  });

  $("guestbookForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("gbName").value.trim(), msg = $("gbMsg").value.trim();
    if (!name || !msg) return;
    state.guestbook.push({ name, message: msg, ts: new Date().toLocaleString() });
    state.visits += 1;
    $("gbName").value = ""; $("gbMsg").value = "";
    save(); render();
    toast("✒ Signed! The dead thank you.");
  });

  $("exportBtn").addEventListener("click", () => {
    if (!state.owner.trim() || state.links.length === 0) {
      toast("Add a name and at least one link before exporting."); return;
    }
    const html = renderPage(state, true);
    const slug = (state.owner || "my-haunted-homepage").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slug + ".html";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast("⬇ Exported " + slug + ".html — publish it anywhere static.");
  });

  $("copyBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(renderPage(state, true)); toast("📋 HTML copied."); }
    catch (e) { toast("Clipboard blocked — use Export instead."); }
  });

  $("resetBtn").addEventListener("click", () => {
    if (!confirm("Reset everything to the default haunted mansion?")) return;
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    save(); location.reload();
  });

  $("ambienceBtn").addEventListener("click", () => {
    state.ambience = !state.ambience;
    $("ambienceBtn").textContent = state.ambience ? "👻 Ambience: On" : "👻 Ambience: Off";
    save(); renderPreviewOnly();
    if (state.ambience) startDrone(); else stopDrone();
  });

  render();
});

/* ---------- ambience drone: WebAudio, no files, user-gated ---------- */
let audioCtx = null, droneNodes = null;
function startDrone() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    if (droneNodes) return;
    const gain = audioCtx.createGain(); gain.gain.value = 0.04; gain.connect(audioCtx.destination);
    const o1 = audioCtx.createOscillator(); o1.type = "sine"; o1.frequency.value = 55;
    const o2 = audioCtx.createOscillator(); o2.type = "triangle"; o2.frequency.value = 55.7;
    const lfo = audioCtx.createOscillator(); lfo.frequency.value = 0.07;
    const lfoGain = audioCtx.createGain(); lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain); lfoGain.connect(gain.gain);
    o1.connect(gain); o2.connect(gain);
    o1.start(); o2.start(); lfo.start();
    droneNodes = { o1, o2, lfo, gain };
  } catch (e) { /* audio unavailable: ambience stays visual only */ }
}
function stopDrone() {
  if (!droneNodes) return;
  try { droneNodes.o1.stop(); droneNodes.o2.stop(); droneNodes.lfo.stop(); } catch (e) {}
  droneNodes = null;
}
