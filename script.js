(() => {
"use strict";
/* ===== EDIT ME ===== */
const CONFIG = {
  email: "rolysajwan@gmail.com",
  phone: "+91-7289954971",
  location: "Gurugram, Haryana, India",
  // Skills as listed by Rahul. Groups render as ledger sections.
  skills: [
    ["Accounts & records", ["Accounts Management", "Financial Record Management", "Account Reconciliation Support"]],
    ["Excel & MIS", ["Microsoft Excel", "VLOOKUP and HLOOKUP", "Pivot Tables", "MIS Reporting", "Microsoft Word"]],
    ["Documentation & accuracy", ["Financial Documentation", "Data Validation", "Reporting and Record Accuracy"]]
  ],
  // SAMPLE ENTRIES for design only. Replace with verified companies, dates and duties.
  experience: [
    { title: "Accounts Executive — Financial Records & Reconciliation", company: "Sample Company A (technology, Gurugram)", period: "Sample period 1",
      description: "Sample entry showing how a records and reconciliation role would be presented.",
      points: ["Maintain day-to-day financial records and supporting files", "Support account reconciliation and flag differences for review", "Prepare Excel schedules for the accounts team"],
      skills: ["Account reconciliation", "Excel", "Record management"] },
    { title: "Accountant — Accounts Operations & Financial Documentation", company: "Sample Company B (financial services, Gurugram)", period: "Sample period 2",
      description: "Sample entry showing how an accounts operations role would be presented.",
      points: ["Process and file financial documents in an orderly, auditable way", "Check entries against source documents", "Coordinate with internal teams on documentation queries"],
      skills: ["Accounts operations", "Documentation", "Data validation"] },
    { title: "MIS & Accounts Executive — Excel Reporting & Data Management", company: "Sample Company C (corporate services, Gurugram)", period: "Sample period 3",
      description: "Sample entry showing how an MIS and reporting role would be presented.",
      points: ["Build recurring MIS reports in Excel using lookups and pivot tables", "Validate data before reports are shared", "Keep reporting formats consistent and easy to review"],
      skills: ["MIS reporting", "VLOOKUP / HLOOKUP", "Pivot tables"] }
  ]
};

const $ = (s, r = document) => r.querySelector(s);
const H = (tag, props = {}, ...kids) => { const n = document.createElement(tag); for (const k in props) k === "class" ? n.className = props[k] : k === "text" ? n.textContent = props[k] : n.setAttribute(k, props[k]); n.append(...kids); return n; };

function initNav() {
  const b = $("#burger"), m = $("#menu"); if (!b || !m) return;
  const set = o => { m.classList.toggle("open", o); b.setAttribute("aria-expanded", o); };
  b.addEventListener("click", () => set(!m.classList.contains("open")));
  m.addEventListener("click", e => e.target.closest("a") && set(false));
  document.addEventListener("keydown", e => e.key === "Escape" && set(false));
  if (!("IntersectionObserver" in window)) return;
  const links = [...m.querySelectorAll("a")];
  const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting && links.forEach(a => a.classList.toggle("on", a.hash === "#" + en.target.id))), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const t = $(a.hash); t && io.observe(t); });
}
function renderSkills() {
  const root = $("#skill-list"); if (!root) return;
  let n = 0;
  CONFIG.skills.forEach(([g, items]) => root.append(H("div", { class: "group reveal" }, H("h3", { class: "mono", text: g }),
    ...items.map(s => H("div", { class: "skill" }, H("span", { text: s }), H("span", { "aria-hidden": "true", text: String(++n).padStart(2, "0") }))))));
}
function renderExperience() {
  const ol = $("#timeline"); if (!ol) return;
  CONFIG.experience.forEach(j => ol.append(H("li", { class: "job reveal" },
    H("p", { class: "mono when", text: j.period }),
    H("div", {}, H("h3", { text: j.title }), H("p", { class: "mono co", text: j.company }), H("p", { text: j.description }),
      H("ul", {}, ...j.points.map(p => H("li", { text: p }))),
      H("ul", { class: "chips", "aria-label": "Skills used" }, ...j.skills.map(s => H("li", { text: s })))))));
}
function renderContact() {
  const ul = $("#links"); if (!ul) return;
  const tel = CONFIG.phone.replace(/[^\d+]/g, "");
  [["Email", CONFIG.email, "mailto:" + CONFIG.email], ["Phone", CONFIG.phone, "tel:" + tel]].forEach(([l, t, h]) =>
    ul.append(H("li", {}, H("a", { href: h }, H("span", { text: t }), H("small", { text: l })))));
  ul.append(H("li", {}, H("a", { href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.location), target: "_blank", rel: "noopener noreferrer" }, H("span", { text: CONFIG.location }), H("small", { text: "Location" }))));
}
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return items.forEach(i => i.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  items.forEach(i => io.observe(i));
}
function init() {
  document.documentElement.classList.add("js");
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  [initNav, renderSkills, renderExperience, renderContact, initReveal].forEach(f => { try { f(); } catch (e) { console.error(f.name, e); } });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
