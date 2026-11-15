(() => {
"use strict";
/* ===== EDIT ME: publish these as employment history only if they are accurate. ===== */
const CONFIG = {
  email: "rolysajwan@gmail.com",
  phone: "+91-7289954971",
  location: "Gurugram, Haryana, India",
  skills: [
    ["Data & records", ["Data Entry and Data Verification", "Financial Record Management", "Record Accuracy and Data Validation"]],
    ["Excel & MIS", ["Microsoft Excel", "VLOOKUP and HLOOKUP", "Pivot Tables", "MIS Reporting", "Sorting, Filtering and Conditional Formatting"]],
    ["Accounts & documentation", ["Accounts Operations", "Account Reconciliation Support", "Financial Documentation", "Microsoft Word"]]
  ],
  experience: [
    { title: "Data Entry Operator | Accounts Executive | MIS Reporting", company: "Accenture", period: "November 2022 – Present",
      description: "Support accurate business records, reporting workflows and documentation through structured data handling and spreadsheet-based reporting.",
      points: ["Maintain and verify records while checking entries for completeness and accuracy", "Prepare and update Excel reports for routine tracking and review", "Use spreadsheet functions, filters and pivot tables to organize information", "Maintain supporting documentation and follow established data-handling procedures"],
      skills: ["Data accuracy", "Microsoft Excel", "MIS reporting", "Documentation"] },
    { title: "Operations | Data Management & Reporting", company: "IBM", period: "September 2019 – October 2022",
      description: "Organize operational information, verify source records and support reporting and documentation tasks.",
      points: ["Review records against source information and flag inconsistencies for correction", "Maintain organized digital records and supporting documents", "Update spreadsheets and recurring reports for internal tracking", "Coordinate with team members to resolve data and documentation queries"],
      skills: ["Data management", "Record verification", "Excel reporting", "Process documentation"] },
    { title: "Process Associate | Data Processing & Quality Checks", company: "Genpact", period: "December 2018 – August 2019",
      description: "Support process accuracy through careful data processing, record checks and consistent documentation.",
      points: ["Enter and review information carefully, following defined process instructions", "Check records for missing or inconsistent details before submission", "Keep files and process documentation organized for easy reference", "Escalate exceptions and discrepancies to the appropriate team member"],
      skills: ["Data entry", "Quality checks", "Attention to detail", "Process support"] }
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
