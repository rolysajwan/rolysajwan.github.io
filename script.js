(() => {
"use strict";

/* ============ EDIT ME: central configuration ============
   Empty URLs are hidden/disabled automatically. Never put secrets here. */
const CONFIG = {
  name: "Rahul Singh Sajwan",
  username: "rolysajwan",
  title: "Systems & AI Architect",
  intro: "Exploring the intersection of intelligent systems, software architecture, and cybersecurity. Building experimental tools, studying complex technical systems, and turning ideas into practical digital experiences.",
  roles: ["Systems & AI Architect", "Cybersecurity Enthusiast", "Building Next-Gen Engines", "Exploring Intelligent Systems"],
  email: "",                    // e.g. "you@example.com" enables the mailto fallback + email link
  formEndpoint: "",             // e.g. a Formspree URL; POSTs JSON. Empty = mailto or demo mode
  resumeUrl: "",                // real file/URL shows the resume button
  socialLinks: { github: "", linkedin: "", website: "" },
  focusAreas: [
    ["Intelligent systems", "Neural-network concepts and model behavior"],
    ["System architecture", "How components fit, fail and scale"],
    ["Security fundamentals", "Defensive thinking and cryptography concepts"]
  ],
  // status: CONCEPT | IN DEVELOPMENT | DEMO AVAILABLE | REPOSITORY LINK PENDING
  projects: [
    { slug: "ai-neural-network-engine", title: "AI Neural Network Engine", category: "AI / ML", status: "CONCEPT", icon: "neural",
      description: "An experimental environment for exploring neural-network concepts, model behavior, and intelligent computation workflows.",
      tags: ["Python", "AI / ML", "Neural Networks", "Data Processing"], repositoryUrl: "", demoUrl: "" },
    { slug: "quantum-encryption-core", title: "Quantum Encryption Core", category: "Cryptography", status: "CONCEPT", icon: "lattice",
      description: "An educational cryptography project exploring encryption concepts, secure communication principles, and post-quantum cryptography research.",
      tags: ["Cryptography", "Python", "Security Research", "Algorithms"], repositoryUrl: "", demoUrl: "" },
    { slug: "cyber-security-scanner", title: "Cyber Security Scanner", category: "Security", status: "CONCEPT", icon: "scan",
      description: "A security-learning project concept focused on organizing authorized diagnostic checks and presenting technical findings in a readable interface.",
      tags: ["Python", "Security", "Diagnostics", "Reporting"], repositoryUrl: "", demoUrl: "" }
  ],
  // Interests, not expertise claims. `level` is optional free text (e.g. "Learning").
  tech: [
    { cat: "Systems & Infrastructure", items: ["Linux", "Docker", "Git", "GitHub", "Shell Scripting"] },
    { cat: "Programming", items: ["Python", "JavaScript", "TypeScript", "Rust", "HTML5", "CSS3"] },
    { cat: "AI & Data", items: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Data Processing", "Automation"] },
    { cat: "Development Environment", items: ["Neovim", "Visual Studio Code", "Git CLI", "Terminal Workflows"] },
    { cat: "Security & Architecture", items: ["Cybersecurity Fundamentals", "Cryptography Concepts", "System Architecture", "Network Fundamentals", "Secure Development"] }
  ],
  techLevels: {},               // e.g. { Python: "Daily use" }
  // Add VERIFIED records only: { org, role, location, dates, points: [], tech: [] }. Empty hides the section.
  experience: []
};

/* ============ helpers ============ */
const $ = (s, r = document) => r.querySelector(s);
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const NS = "http://www.w3.org/2000/svg";
const el = (tag, props = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") n.className = v; else if (k === "text") n.textContent = v; else n.setAttribute(k, v);
  }
  kids.forEach(k => n.append(k));
  return n;
};
const svg = (d, extra = "") => {
  const s = document.createElementNS(NS, "svg");
  s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
  s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "1.6");
  s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
  const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); s.append(p);
  if (extra) s.setAttribute("class", extra);
  return s;
};
const isUrl = u => { try { const p = new URL(u); return p.protocol === "https:" || p.protocol === "http:"; } catch { return false; } };
const ICONS = {
  neural: "M5 6a2 2 0 100 .01M5 18a2 2 0 100 .01M12 12a2 2 0 100 .01M19 6a2 2 0 100 .01M19 18a2 2 0 100 .01M7 6l3.5 5M7 18l3.5-5M14 11l3.5-4M14 13l3.5 4",
  lattice: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 3v18M4 7.5l16 9M20 7.5l-16 9",
  scan: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7a5 5 0 100 10 5 5 0 000-10zM12 12l5-5",
  tech: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  github: "M9 19c-4 1-4-2-6-2m12 4v-3.5a3 3 0 00-.8-2.3c2.700-.3 5.500-1.300 5.500-6a4.700 4.700 0 00-1.300-3.300 4.400 4.400 0 00-.1-3.300s-1-.3-3.400 1.300a11.700 11.700 0 00-6 0C6.500 2.700 5.500 3 5.500 3a4.400 4.400 0 00-.1 3.300A4.700 4.700 0 004 9.500c0 4.700 2.800 5.700 5.500 6A3 3 0 008.700 18V21",
  linkedin: "M4 9h4v11H4zM6 4a2 2 0 100 .01M10 9h4v1.500c.8-1.200 2-1.800 3.500-1.800 2.700 0 3.500 1.800 3.500 4.300V20h-4v-6c0-1.200-.4-2-1.500-2S14 12.800 14 14v6h-4z",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
};

/* ============ nav ============ */
function initNav() {
  const burger = $("#burger"), menu = $("#menu");
  if (!burger || !menu) return;
  const set = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open)); };
  burger.addEventListener("click", () => set(!menu.classList.contains("open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
  const links = [...menu.querySelectorAll("a")];
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
}

/* ============ hero ============ */
function initHero() {
  $("#intro").textContent = CONFIG.intro;
  const idline = $("#idline");
  if (reduced.matches) idline.textContent = "IDENTITY VERIFIED // " + CONFIG.name.toUpperCase();
  else setTimeout(() => { idline.textContent = "IDENTITY VERIFIED // " + CONFIG.name.toUpperCase(); }, 1400);
  const r = $("#resume");
  if (r && isUrl(CONFIG.resumeUrl)) { r.href = CONFIG.resumeUrl; r.hidden = false; }
  const g = $("#nodes");
  if (g) [[40,40],[130,90],[40,110],[130,150],[40,180],[230,60],[230,130],[290,100]].forEach(([x, y], i) => {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", 5);
    c.setAttribute("fill", i % 3 === 0 ? "#A855F7" : "#38BDF8"); g.append(c);
  });
}

function initTypewriter() {
  const out = $("#type"); if (!out) return;
  const roles = CONFIG.roles; let i = 0, n = 0, del = false, t;
  if (reduced.matches) { // static: cycle slowly without typing
    out.textContent = roles[0];
    t = setInterval(() => { i = (i + 1) % roles.length; out.textContent = roles[i]; }, 3500);
    return;
  }
  const tick = () => {
    const w = roles[i];
    n += del ? -1 : 1; out.textContent = w.slice(0, n);
    let d = del ? 35 : 70;
    if (!del && n === w.length) { del = true; d = 1600; }
    else if (del && n === 0) { del = false; i = (i + 1) % roles.length; d = 350; }
    t = setTimeout(tick, d);
  };
  tick();
  document.addEventListener("visibilitychange", () => { if (document.hidden) clearTimeout(t); else { clearTimeout(t); tick(); } });
}

/* ============ canvas background ============ */
function initCanvas() {
  const cv = $("#bg"), ctx = cv && cv.getContext && cv.getContext("2d");
  if (!ctx) return; // fallback: CSS gradients remain
  let w, h, dpr, pts = [], raf = 0, running = false, resizeT;
  const mouse = { x: -999, y: -999 };
  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.round(w * h / (w < 600 ? 16000 : 16000 * 1.1)));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.4 + .8, c: Math.random() < .7 ? "56,189,248" : "168,85,247", a: Math.random() * .4 + .3
    }));
  };
  const LINK = 130, REACH = 140;
  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < REACH * REACH && d2 > 1) { const f = (1 - Math.sqrt(d2) / REACH) * .6, d = Math.sqrt(d2); p.vx += dx / d * f * .05; p.vy += dy / d * f * .05; }
      p.vx *= .995; p.vy *= .995;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - Math.sqrt(d2) / LINK) * .28})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${a.c},${a.a})`; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!running && !reduced.matches) { running = true; raf = requestAnimationFrame(frame); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  build();
  if (reduced.matches) { frame(); stop(); } else start(); // static single frame when reduced
  addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
  addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(build, 200); });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  reduced.addEventListener("change", () => reduced.matches ? stop() : start());
}

/* ============ render: projects / tech / focus / experience / links ============ */
function renderProjects() {
  const grid = $("#project-grid"); if (!grid) return;
  CONFIG.projects.forEach(p => {
    const ok = p.status === "DEMO AVAILABLE";
    const actions = el("div", { class: "actions" });
    const link = (url, label) => isUrl(url)
      ? el("a", { class: "btn", href: url, target: "_blank", rel: "noopener noreferrer", "aria-label": `${label}: ${p.title}`, text: label })
      : null;
    const repo = link(p.repositoryUrl, "REPOSITORY"), demo = link(p.demoUrl, "VIEW DEMO");
    [repo, demo].filter(Boolean).forEach(a => actions.append(a));
    if (!repo && !demo) actions.append(el("span", { class: "btn unavail mono", role: "note", text: "LINK NOT YET AVAILABLE" }));
    grid.append(el("article", { class: "card glass reveal", id: p.slug },
      el("span", { class: "pulse", "aria-hidden": "true" }),
      svg(ICONS[p.icon] || ICONS.tech),
      el("p", { class: "mono cat", text: p.category }),
      el("h3", { text: p.title }),
      el("span", { class: "badge mono" + (ok ? " ok" : ""), text: p.status }),
      el("p", { text: p.description }),
      el("ul", { class: "tags mono", "aria-label": "Technologies" }, ...p.tags.map(t => el("li", { text: t }))),
      actions));
  });
}

function renderTech() {
  const root = $("#stack-grid"); if (!root) return;
  CONFIG.tech.forEach(g => {
    root.append(el("h3", { class: "cat-h mono", text: g.cat }),
      el("ul", { class: "badges" }, ...g.items.map(name => {
        const lvl = CONFIG.techLevels[name];
        return el("li", { class: "tech glass reveal" }, svg(ICONS.tech),
          el("span", { text: name }, ...(lvl ? [el("small", { text: lvl })] : [])));
      })));
  });
}

function renderFocus() {
  const ul = $("#focus"); if (!ul) return;
  CONFIG.focusAreas.forEach(([t, d]) => ul.append(el("li", {}, el("b", { text: t }), el("span", { text: d }))));
}

function renderExperience() {
  const sec = $("#experience"), ol = $("#timeline");
  if (!sec || !ol || !CONFIG.experience.length) return; // stays hidden until real data exists
  CONFIG.experience.forEach(x => ol.append(el("li", {},
    el("h3", { text: `${x.role} — ${x.org}` }),
    el("p", { class: "mono accent", text: [x.dates, x.location].filter(Boolean).join(" | ") }),
    el("ul", {}, ...(x.points || []).map(t => el("li", { text: t }))),
    el("ul", { class: "tags mono" }, ...(x.tech || []).map(t => el("li", { text: t }))))));
  sec.hidden = false;
}

function renderLinks() {
  const ul = $("#links"); if (!ul) return;
  const s = CONFIG.socialLinks;
  const rows = [["GitHub", s.github, "github"], ["LinkedIn", s.linkedin, "linkedin"], ["Website", s.website, "globe"]]
    .filter(r => isUrl(r[1])).map(([l, u, i]) => [l, u, i, true]);
  if (CONFIG.email) rows.push(["Email", "mailto:" + CONFIG.email, "mail", false]);
  if (!rows.length) { ul.append(el("li", { class: "mono", text: "Add your links in CONFIG (script.js) to show them here." })); return; }
  rows.forEach(([l, u, i, ext]) => {
    const a = el("a", { class: "glass", href: u, "aria-label": l }, svg(ICONS[i]), el("span", { text: l }));
    if (ext) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    ul.append(el("li", {}, a));
  });
}

/* ============ terminal (strict allowlist, text-only output) ============ */
function initTerminal() {
  const out = $("#out"), form = $("#term-form"), input = $("#cmd"), box = $("#term");
  if (!out || !form || !input) return;
  const print = (text, cls = "") => { out.append(el("div", { class: cls, text })); out.scrollTop = out.scrollHeight; };
  const COMMANDS = {
    help: () => [["Available commands:", "t-info"], ["  help      list commands"], ["  about     short introduction"], ["  skills    technology interests"], ["  projects  featured demonstrations"], ["  contact   contact options"], ["  whoami    portfolio identity"], ["  date      your local date and time"], ["  matrix    toggle highlight"], ["  clear     clear output"]],
    about: () => [[CONFIG.intro, "t-info"]],
    skills: () => CONFIG.tech.map(g => [`${g.cat}: ${g.items.join(", ")}`, "t-info"]),
    projects: () => CONFIG.projects.map(p => [`${p.slug} [${p.status}]`, "t-ok"]),
    contact: () => {
      const s = CONFIG.socialLinks, r = [];
      if (CONFIG.email) r.push(["email: " + CONFIG.email, "t-ok"]);
      if (isUrl(s.github)) r.push(["github: " + s.github, "t-ok"]);
      if (isUrl(s.linkedin)) r.push(["linkedin: " + s.linkedin, "t-ok"]);
      return r.length ? r : [["No public contact links configured yet. Use the form below.", "t-info"]];
    },
    whoami: () => [[`${CONFIG.username} // ${CONFIG.name} // ${CONFIG.title}`, "t-ok"]],
    date: () => [[new Date().toLocaleString(), "t-ok"]],
    matrix: () => { const on = document.body.classList.toggle("matrix"); return [[on ? "Highlight on. Run again to turn off." : "Highlight off.", "t-ok"]]; }
  };
  const run = raw => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    print("visitor@rolysajwan:~$ " + raw.trim(), "t-cmd");
    if (cmd === "clear") { out.textContent = ""; return; }
    const fn = Object.prototype.hasOwnProperty.call(COMMANDS, cmd) ? COMMANDS[cmd] : null;
    if (!fn) return print("Command not recognized. Type 'help' to see available commands.", "t-err");
    fn().forEach(([t, c]) => print(t, c));
  };
  const hist = []; let hi = 0;
  form.addEventListener("submit", e => { e.preventDefault(); const v = input.value; if (v.trim()) { hist.push(v); hi = hist.length; } run(v); input.value = ""; });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = hist[hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ""; }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.textContent = ""; }
  });
  box.addEventListener("click", e => { if (!getSelection().toString() && !e.target.closest("input")) input.focus({ preventScroll: true }); });
  const boot = ["[BOOT] Initializing portfolio interface...", "[CORE] Loading frontend modules...", "[NETWORK] Establishing simulated session...", "[AI] Neural visualization initialized.", "[SECURITY] Local demo environment ready.", "[STATUS] Welcome, visitor. Type 'help'."];
  let booted = false;
  const startBoot = () => {
    if (booted) return; booted = true;
    boot.forEach((l, i) => setTimeout(() => print(l, i === boot.length - 1 ? "t-ok" : "t-info"), reduced.matches ? 0 : i * 280));
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { startBoot(); io.disconnect(); } }, { threshold: .3 });
    io.observe(box);
  } else startBoot();
}

/* ============ reveals ============ */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  items.forEach(i => io.observe(i));
}

/* ============ contact form ============ */
function initForm() {
  const form = $("#form"), status = $("#form-status"), btn = $("#send");
  if (!form) return;
  const rules = {
    name: v => v.trim().length >= 2 || "Enter your name (2+ characters).",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email, like name@example.com.",
    subject: v => v.trim().length >= 3 || "Enter a subject (3+ characters).",
    message: v => v.trim().length >= 10 || "Write at least 10 characters."
  };
  const check = f => {
    const inp = form.elements[f], r = rules[f](inp.value), err = $("#e-" + f);
    inp.setAttribute("aria-invalid", String(r !== true)); err.textContent = r === true ? "" : r;
    return r === true;
  };
  Object.keys(rules).forEach(f => form.elements[f].addEventListener("blur", () => check(f)));
  const say = (msg, cls = "") => { status.textContent = msg; status.className = "mono " + cls; };
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const bad = Object.keys(rules).filter(f => !check(f));
    if (bad.length) { form.elements[bad[0]].focus(); return say("Fix the highlighted fields.", "bad"); }
    const data = Object.fromEntries(new FormData(form));
    if (isUrl(CONFIG.formEndpoint)) {
      btn.disabled = true; say("Sending...");
      try {
        const res = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        form.reset(); say("Message sent.", "ok");
      } catch { say("Sending failed. Try again or use another contact option.", "bad"); }
      finally { btn.disabled = false; }
    } else if (CONFIG.email) {
      const q = `subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;
      say("Opening your email app. Nothing is sent until you send it there.");
      location.href = `mailto:${CONFIG.email}?${q}`;
    } else {
      say("Demo mode: no endpoint or email is configured, so nothing was sent.", "bad");
    }
  });
}

/* ============ init ============ */
function init() {
  document.documentElement.classList.add("js");
  document.title = `${CONFIG.name} — ${CONFIG.title}`;
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  [initNav, initHero, initTypewriter, initCanvas, renderProjects, renderTech, renderFocus, renderExperience, renderLinks, initTerminal, initForm, initReveal]
    .forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
