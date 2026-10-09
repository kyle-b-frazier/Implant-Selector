/* Catalog data: tab order and the system registry.
   One of the catalog/*.js files that index.html loads, in order, before
   compatibility.js and the app code; see catalog/common.js. */

/* =========================================================================
   SYSTEM REGISTRY — one entry per implant system. Each has its own catalog,
   category display order, surgical/prosthetic grouping, and any category
   name that should get a special descriptive prefix in the order output.
   ========================================================================= */
const CATEGORY_ORDER_BLC = [
  "Implants","Surgical Instruments","Closure Caps","Healing Abutments — Crown",
  "Healing Abutments — Bridge","Anatomic Healing Abutments XC","Impression Components",
  "Analogs & Digital Impression","Temporary Abutments","Replacement Screws","All-on-X Components",
  "Anatomic Abutments","Gold Abutments","Variobase® for Crown","Variobase® for Crown AS",
  "Variobase® for Bridge/Bar Cylindrical","Variobase® XC for Crown","Variobase® XC for Crown AS",
  "Variobase® XC for Bridge/Bar","Variobase® XC for Bridge/Bar AS","Variobase® C (Dentsply Sirona)",
  "Screw-retained / Multi-unit Abutments","Pre-milled Abutment Blanks","Novaloc® Abutments"
];
const SURGICAL_CATEGORIES_BLC = new Set([
  "Implants","Surgical Instruments","Closure Caps","Healing Abutments — Crown",
  "Healing Abutments — Bridge","Anatomic Healing Abutments XC","Impression Components",
  "Analogs & Digital Impression","Temporary Abutments","Replacement Screws","All-on-X Components"
]);

/* BLX reuses BLC's category order and surgical/prosthetic grouping wholesale,
   since it reuses BLC's entire catalog aside from the Implants list. */
const CATEGORY_ORDER_BLX = CATEGORY_ORDER_BLC;
const SURGICAL_CATEGORIES_BLX = SURGICAL_CATEGORIES_BLC;

const CATEGORY_ORDER_BLT = [
  "Implants","Closure Caps","Healing Abutments","Impression Components","Temporary Abutments",
  "Anatomic & Cementable Abutments","Variobase & Gold Abutments","Screw-retained Abutments","Replacement Screws"
];
const SURGICAL_CATEGORIES_BLT = new Set([
  "Implants","Closure Caps","Healing Abutments","Impression Components","Temporary Abutments","Replacement Screws"
]);

const CATEGORY_ORDER_NOBEL = [
  "Implants","Cover Screws","Surgical Instruments","Healing Abutments — Crown",
  "Healing Abutments — Bridge","Anatomic Healing Abutments (PEEK)","Impression Copings",
  "Temporary Abutments","Implant Replicas & Analogs","All-on-X Components",
  "Esthetic Abutments & Universal Base","Multi-unit Abutments Plus","Locator R-Tx® Abutments",
  "Clinical & Laboratory Screws"
];
const SURGICAL_CATEGORIES_NOBEL = new Set([
  "Implants","Cover Screws","Surgical Instruments","Healing Abutments — Crown",
  "Healing Abutments — Bridge","Anatomic Healing Abutments (PEEK)","Impression Copings",
  "Temporary Abutments","Implant Replicas & Analogs","All-on-X Components"
]);

const CATEGORY_ORDER_NEODENT = [
  "Implants — Helix GM®","GM Cover Screw","Surgical Instruments","GM Healing Abutments",
  "Impression Components & Analogs","Replacement Screws","All-on-X Components",
  "Abutments","GM Mini Conical Abutments (Multi-unit)"
];
const SURGICAL_CATEGORIES_NEODENT = new Set([
  "Implants — Helix GM®","GM Cover Screw","Surgical Instruments","GM Healing Abutments",
  "Impression Components & Analogs","Replacement Screws","All-on-X Components"
]);

/* S series (NobelActive S / NobelParallel S / NobelReplace S) — identical
   category order and surgical/prosthetic split across all three, since
   they share one prosthetic line (S_SERIES_SHARED). */
const CATEGORY_ORDER_S_SERIES = [
  "Implants","Cover Screws","Healing Abutments","Impression Copings","Scan Bodies",
  "Temporary Abutments","All-on-X Components","Guided Surgical Components",
  "Multi-unit Abutments","Multi-unit PoLo & Accessories","Esthetic Abutments","Universal Base ASC"
];
const SURGICAL_CATEGORIES_S_SERIES = new Set([
  "Implants","Cover Screws","Healing Abutments","Impression Copings","Scan Bodies",
  "Temporary Abutments","All-on-X Components","Guided Surgical Components"
]);

/* NobelZygoma — same category order/grouping for both connection types
   (CC and Ext Hex), since both catalogs are structured identically. */
const CATEGORY_ORDER_ZYGOMA = [
  "Implants","Cover Screws","All-on-X Components","Multi-unit Abutments",
  "Impression & Position Locators","Surgical Instruments & Sets"
];
const SURGICAL_CATEGORIES_ZYGOMA = new Set([
  "Implants","Cover Screws","All-on-X Components","Surgical Instruments & Sets"
]);

const SYSTEMS = {
  blc: {
    id:"blc", name:"Straumann BLC", sub:"iEXCEL Catalog · 2026 Ed.",
    fullMeta:"Catalog ref. 450.036/en/F/00 — 2026 international edition",
    catalog: CATALOG_BLC, order: CATEGORY_ORDER_BLC, surgical: SURGICAL_CATEGORIES_BLC,
    prefix: { "Implants": "Straumann BLC™ Implant" }
  },
  blx: {
    id:"blx", name:"Straumann BLX", sub:"iEXCEL Catalog · shares BLC prosthetics",
    fullMeta:"Catalog ref. 450.036/en/F/00 — 2026 international edition",
    catalog: CATALOG_BLX, order: CATEGORY_ORDER_BLX, surgical: SURGICAL_CATEGORIES_BLX,
    prefix: { "Implants": "Straumann BLX™ Implant" }
  },
  blt: {
    id:"blt", name:"Straumann BLT", sub:"CrossFit® Connection (SC/NC/RC)",
    fullMeta:"Straumann Product Catalog 2022/2023 Special Edition (452.201/en)",
    caveat:"RC-platform prosthetic components run thinner than NC — confirm platform before ordering.",
    catalog: CATALOG_BLT, order: CATEGORY_ORDER_BLT, surgical: SURGICAL_CATEGORIES_BLT,
    prefix: { "Implants": "Straumann BLT™ Implant" }
  },
  nrcc: {
    id:"nrcc", name:"NobelReplace CC", sub:"Nobel Biocare · Conical Connection",
    fullMeta:"Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024)",
    catalog: CATALOG_NOBEL_RC, order: CATEGORY_ORDER_NOBEL, surgical: SURGICAL_CATEGORIES_NOBEL,
    prefix: { "Implants": "" }
  },
  nact: {
    id:"nact", name:"NobelActive", sub:"Nobel Biocare · Conical Connection",
    fullMeta:"Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024)",
    catalog: CATALOG_NOBEL_NA, order: CATEGORY_ORDER_NOBEL, surgical: SURGICAL_CATEGORIES_NOBEL,
    prefix: { "Implants": "" }
  },
  npcc: {
    id:"npcc", name:"NobelParallel CC", sub:"Nobel Biocare · Conical Connection",
    fullMeta:"Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024)",
    catalog: CATALOG_NOBEL_PARALLEL, order: CATEGORY_ORDER_NOBEL, surgical: SURGICAL_CATEGORIES_NOBEL,
    prefix: { "Implants": "" }
  },
  nas: {
    id:"nas", name:"NobelActive S", sub:"Nobel Biocare · S Series · NP conical connection",
    fullMeta:"Nobel Biocare S series brochure 96517 NA 2603, Rev 00 (03/26)",
    caveat:"US availability needs confirming: Nobel's January 2026 S series brochure (MKT-6268) says all S series implants and components were under FDA 510(k) review and not for sale in the US; the March 2026 NA brochure (96517) lists implants and some components as available. Items still pending are flagged individually.",
    catalog: CATALOG_NAS, order: CATEGORY_ORDER_S_SERIES, surgical: SURGICAL_CATEGORIES_S_SERIES,
    prefix: { "Implants": "NobelActive® S Implant" }
  },
  nps: {
    id:"nps", name:"NobelParallel S", sub:"Nobel Biocare · S Series · NP conical connection",
    fullMeta:"Nobel Biocare S series brochure 96517 NA 2603, Rev 00 (03/26)",
    caveat:"US availability needs confirming: Nobel's January 2026 S series brochure (MKT-6268) says all S series implants and components were under FDA 510(k) review and not for sale in the US; the March 2026 NA brochure (96517) lists implants and some components as available. Items still pending are flagged individually.",
    catalog: CATALOG_NPS, order: CATEGORY_ORDER_S_SERIES, surgical: SURGICAL_CATEGORIES_S_SERIES,
    prefix: { "Implants": "NobelParallel™ S Implant" }
  },
  nrs: {
    id:"nrs", name:"NobelReplace S", sub:"Nobel Biocare · S Series · NP conical connection",
    fullMeta:"Nobel Biocare S series brochure 96517 NA 2603, Rev 00 (03/26)",
    caveat:"US availability needs confirming: Nobel's January 2026 S series brochure (MKT-6268) says all S series implants and components were under FDA 510(k) review and not for sale in the US; the March 2026 NA brochure (96517) lists implants and some components as available. Items still pending are flagged individually.",
    catalog: CATALOG_NRS, order: CATEGORY_ORDER_S_SERIES, surgical: SURGICAL_CATEGORIES_S_SERIES,
    prefix: { "Implants": "NobelReplace® S Implant" }
  },
  nzcc: {
    id:"nzcc", name:"NobelZygoma 0°", sub:"Nobel Biocare · Zygoma 0° · TiUltra CC / TiUnite Ext Hex, RP",
    fullMeta:"Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024) — Implant systems p.42, Prosthetics pp.122,124",
    catalog: CATALOG_NZCC, order: CATEGORY_ORDER_ZYGOMA, surgical: SURGICAL_CATEGORIES_ZYGOMA,
    prefix: { "Implants": "NobelZygoma® 0° Implant" }
  },
  nzeh: {
    id:"nzeh", name:"NobelZygoma 45° Ext Hex", sub:"Nobel Biocare · Zygoma 45° · External Hex, RP",
    fullMeta:"Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024) — Implant systems p.42, Prosthetics pp.123,124",
    catalog: CATALOG_NZEH, order: CATEGORY_ORDER_ZYGOMA, surgical: SURGICAL_CATEGORIES_ZYGOMA,
    prefix: { "Implants": "NobelZygoma® 45° Ext Hex Implant" }
  },
  gm: {
    id:"gm", name:"Neodent GM Helix Acqua", sub:"Straumann Group · Grand Morse®",
    fullMeta:"Neodent 2026 Product Catalog (CALIT.2040, 6/2026)",
    catalog: CATALOG_NEODENT_GM, order: CATEGORY_ORDER_NEODENT, surgical: SURGICAL_CATEGORIES_NEODENT,
    prefix: { "Implants — Helix GM®": "" }
  }
};
const SYSTEM_IDS = Object.keys(SYSTEMS);
