/* =========================================================================
   CATALOG DATA — every implant system's parts, article numbers (REFs) and
   display grouping, split into one file per manufacturer line:

     common.js              catalog names (CATALOG_SOURCES) and helpers
     straumann-blc-blx.js   Straumann BLC and BLX (BLX reuses BLC's parts)
     straumann-blt.js       Straumann BLT
     nobel-conical.js       NobelReplace CC, NobelActive, NobelParallel CC
     nobel-s-series.js      NobelActive S, NobelParallel S, NobelReplace S
     nobel-zygoma.js        NobelZygoma 0° and 45°
     neodent-gm.js          Neodent GM
     systems.js             Favorites, tab order and the system registry

   index.html loads them as plain scripts in that order (each file can use
   what the files before it define), so everything here is a global. The
   tests load the same list from index.html. Product data only: the rules
   for which part fits which implant live in compatibility.js.

   Every group carries `source`: the catalog and printed page(s) where its
   article numbers are listed, e.g. "Straumann iEXCEL 2026 p.27". A group
   whose numbers (or some of them) aren't in any uploaded catalog carries
   `unverified` instead or as well, saying what's missing; FOLLOW-UP.md
   tracks those. Catalog names in both are keys of CATALOG_SOURCES.
   ========================================================================= */
const CATALOG_SOURCES = {
  "Straumann iEXCEL 2026": "Straumann iEXCEL Product Catalog 2026 (450.036/en/F/00)",
  "Straumann 2022/2023": "Straumann Product Catalog 2022/2023 Special Edition (452.201/en)",
  "Nobel 2024/2025": "Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024)",
  "Nobel S series 2026": "Nobel Biocare S series solution brochure (MKT-6268 Rev 00, Jan 2026)",
  "Neodent 2026": "Neodent 2026 Product Catalog (CALIT.2040, 6/2026)",
  "Neodent GM 2018": "Neodent Grand Morse Catalog 2018"
};

/* Copies groups into another tab (All-on-X Components, Favorites), tagging
   each copy with its home category; see the All-on-X note in
   straumann-blc-blx.js. */
function withSource(groups, sourceCategory){
  return groups.map(g => ({...g, sourceCategory}));
}
