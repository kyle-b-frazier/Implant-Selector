/* Catalog data: Nobel S series.
   One of the catalog/*.js files that index.html loads, in order, before
   compatibility.js and the app code; see catalog/common.js. */

/* Torque & driver: the S series brochure gives none. Groups whose article
   numbers are the same conical connection NP parts listed in the Nobel
   2024/2025 catalog carry that catalog's icon values: cover screw and
   bridge healing abutment p.72, bridge impression coping p.70, esthetic
   abutments p.74, Multi-unit Abutments Xeal p.76, healing cap p.126.
   S-series-only parts have none. */

/* =========================================================================
   NOBEL BIOCARE S SERIES — a new platform (separate from the existing NP/
   RP/WP conical-connection Nobel systems above) built around ONE prosthetic
   connection size across three implant body designs: NobelActive S,
   NobelParallel S, NobelReplace S. Source: Nobel Biocare "S series implant
   portfolio" solution brochure (96517 NA 2603, Rev 00, 03/26). All three
   implant lines share the identical prosthetic line (S_SERIES_SHARED
   below), mirroring how BLX shares BLC's prosthetics.

   REGULATORY STATUS (per brochure footnotes, read carefully — this
   determines what's actually orderable for a US-based practice):
   - Implants, Healing Abutments, Impression Copings, and Scan Bodies are
     flagged "under Health Canada review, not available in Canada" only —
     no US restriction stated, so these ARE orderable in the US.
   - Temporary Abutments and the entire Universal Base ASC family (engaging,
     non-engaging, and Universal Base Multi-unit Abutment ASC) are flagged
     "under FDA AND Health Canada review, not available in the US or
     Canada" — these are NOT yet orderable in the US. Flagged with
     pendingNote below by design: include them, but visibly
     marked as pending rather than excluded.
   - LiteSet trays are also FDA-pending but have no article number given in
     the brochure at all, so there's nothing to add as a catalog item.
   - Article numbers re-checked (Oct 2026) against the S series brochure
     MKT-6268 Rev 00 (Jan 2026), which says the whole S series was then
     under FDA 510(k) and Health Canada review. Everything below matches
     it except the Guided Surgical Components, which it doesn't list.

   IMPLANT LENGTH CAVEAT — stated directly in the brochure article-number
   tables and folded into each implant group's label below for visibility:
   NobelActive S / NobelParallel S actual length is 0.5mm SHORTER than the
   name states; NobelReplace S actual length is 0.6mm LONGER than the name
   states. Opposite directions — easy to get wrong, worth double-checking
   against the brochure before ordering a length-critical case.
   ========================================================================= */
const S_SERIES_SHARED = {
"Cover Screws": [
  {label:"NP (all implant sizes)", source:"Nobel S series 2026 p.28", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["Cover Screw","36649"]
  ]}
],
"Healing Abutments": [
  {label:"Healing Abutment, Ø4.0mm", source:"Nobel S series 2026 p.28", material:"Ti", items:[
    ["H3.0mm","302039"],["H4.0mm","302040"],["H5.0mm","302041"],["H7.0mm","302042"]
  ]},
  {label:"Healing Abutment, Ø5.0mm", source:"Nobel S series 2026 p.28", material:"Ti", items:[
    ["H3.0mm","302043"],["H4.0mm","302044"],["H5.0mm","302045"],["H7.0mm","302046"]
  ]},
  {label:"Healing Abutment Bridge, Ø4.0mm", source:"Nobel S series 2026 p.28", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H3.0mm","36864"],["H5.0mm","36865"],["H7.0mm","36866"]
  ]}
],
"Temporary Abutments": [
  {label:"Temporary Abutment, Engaging (single-unit), Ø4.1mm", source:"Nobel S series 2026 p.28", material:"PEEK", items:[
    ["H1.5mm","302164"],["H2.5mm","302165"],["H3.5mm","302166"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Temporary Abutment, Non-Engaging (bridge), Ø4.1mm", source:"Nobel S series 2026 p.28", material:"PEEK", items:[
    ["H1.5mm","302175"],["H2.5mm","302176"],["H3.5mm","302177"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."}
],
"Impression Copings": [
  {label:"Closed Tray, Ø4.0mm", source:"Nobel S series 2026 p.29", material:"POM / Ti", items:[
    ["H13.0mm","302096"]
  ]},
  {label:"Closed Tray, Ø5.0mm", source:"Nobel S series 2026 p.29", material:"POM / Ti", items:[
    ["H13.0mm","302097"]
  ]},
  {label:"Open Tray, Ø4.0mm", source:"Nobel S series 2026 p.29", material:"POM / Ti", items:[
    ["H10.0mm","302080"],["H14.0mm","302081"]
  ]},
  {label:"Open Tray, Ø5.0mm", source:"Nobel S series 2026 p.29", material:"POM / Ti", items:[
    ["H10.0mm","302082"],["H14.0mm","302083"]
  ]},
  {label:"Bridge Open Tray", source:"Nobel S series 2026 p.29", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"POM / Ti", items:[
    ["H12.0mm","36930"]
  ]}
],
"Scan Bodies": [
  {label:"Scan Body — Conical Connection, Single", source:"Nobel S series 2026 p.28", material:"PEEK / Ti", items:[
    ["Position Locator","301932"],["Spare Screw (5/pkg)","302265"]
  ]},
  {label:"Scan Body — Conical Connection, Bridge", source:"Nobel S series 2026 p.28", material:"PEEK / Ti", items:[
    ["Position Locator","302254"],["Spare Screw (5/pkg)","302265"]
  ]}
],
"Multi-unit PoLo & Accessories": [
  {label:"Links for Bridge and Multi-unit PoLo", source:"Nobel S series 2026 p.28", material:"POM", items:[
    ["10mm","301947"],["15mm","301948"],["20mm","301949"]
  ]},
  {label:"Multi-unit PoLo", source:"Nobel S series 2026 p.28", material:"Ti", items:[
    ["8mm","302485"],["11mm","302486"]
  ]},
  {label:"Multi-unit PoLo Replacement Screws (5/pkg)", source:"Nobel S series 2026 p.28", material:"Ti", items:[
    ["Replacement Screw","302489"]
  ]},
  {label:"Multi-unit Abutment, NP", source:"Nobel S series 2026 p.28", material:"Ti", items:[
    ["Multi-unit Abutment","301950"]
  ]}
],
"Multi-unit Abutments": [
  {label:"Multi-unit Abutment Xeal, straight", source:"Nobel S series 2026 p.29", torque:"35 Ncm", driver:"Multi-unit screwdriver", material:"Ti", items:[
    ["H1.5mm","300171"],["H2.5mm","300174"],["H3.5mm","300177"]
  ]},
  {label:"17° Multi-unit Abutment Xeal", source:"Nobel S series 2026 p.29", torque:"15 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H2.5mm","300181"],["H3.5mm","300184"]
  ]},
  {label:"30° Multi-unit Abutment Xeal", source:"Nobel S series 2026 p.29", torque:"15 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H3.5mm","300187"],["H4.5mm","300189"]
  ]},
  /* Verified against Nobel Biocare's official "Conical connection implants
     & prosthetics" product overview (86168B GB 1906): the S series NP
     Multi-unit Abutment Xeal REFs (300171/300174/300177/300181/300184/
     300187/300189) are the exact same NP-platform SKUs used across
     NobelReplace CC/NobelActive/NobelParallel CC's Conical Connection
     line — not S-series-exclusive. The same source footnotes this healing
     cap as "compatible with all Multi-unit Abutments," so it's the correct
     cap for the Xeal MUA line above, same REFs as the other Nobel systems
     already in this tool. */
  {label:"Multi-unit Healing Cap (2/pkg) — compatible with all Multi-unit Abutments", source:"Nobel 2024/2025 p.126", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["Ø5.0, H4.1mm","300162"],["Ø6.0, H4.1mm","300164"],["Wide, H4.1mm","300166"],
    ["Ø5.0, H5.5mm","300163"],["Ø6.0, H5.5mm","300165"],["Wide, H5.5mm","300167"]
  ]}
],
"Esthetic Abutments": [
  {label:"Esthetic Abutment 15°", source:"Nobel S series 2026 p.29", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H1.5mm","36667"],["H3.0mm","36668"],["H4.5mm","36250"]
  ]},
  {label:"Esthetic Abutment", source:"Nobel S series 2026 p.29", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H1.5mm","36665"],["H3.0mm","36666"],["H4.5mm","36249"]
  ]}
],
"Universal Base ASC": [
  {label:"Universal Base ASC, Engaging (single-unit), Ø4.1mm", source:"Nobel S series 2026 p.29", material:"Ti", items:[
    ["Collar 1.0mm","302190"],["Collar 1.5mm","302191"],["Collar 2.5mm","302192"],["Collar 3.5mm","302193"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Universal Base ASC, Non-Engaging (bridge), Ø4.1mm", source:"Nobel S series 2026 p.29", material:"Ti", items:[
    ["Collar 1.0mm","302207"],["Collar 1.5mm","302208"],["Collar 2.5mm","302209"],["Collar 3.5mm","302210"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Universal Base Multi-unit Abutment ASC, Ø5mm", source:"Nobel S series 2026 p.29", material:"Ti", items:[
    ["Universal Base","302223"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Titanium Blanks", source:"Nobel S series 2026 p.29", material:"Ti", items:[
    ["Ø10mm","TRM60.041"],["Ø14mm","TRM64.041"]
  ]}
],
"Guided Surgical Components": [
  {label:"Guided Implant Mount — NobelActive S", unverified:"Not in Nobel S series 2026 or Nobel 2024/2025", material:"Ti / SST", items:[
    ["Ø4.3mm","302565"],["Ø5.0/5.5mm","302583"]
  ]},
  {label:"Guided Implant Mount — CC S (NobelParallel S / NobelReplace S)", unverified:"Not in Nobel S series 2026 or Nobel 2024/2025", material:"Ti / SST", items:[
    ["Ø4.3mm","302567"],["Ø5.0/5.5mm","302568"]
  ]},
  {label:"Guided Template Abutment w/Screw — CC S", unverified:"Not in Nobel S series 2026 or Nobel 2024/2025", material:"Ti", items:[
    ["Ø4.3mm","302569"],["Ø5.0/5.5mm","302570"]
  ]}
]
};
/* All-on-X Components: a convenience grouping for full-arch treatment
   planning. Every item here already exists in its home category above —
   nothing is removed from there. Includes the pending Temporary Abutment
   group (still shown, per instruction, just flagged) since it's a normal
   part of an All-on-X staging workflow once cleared. */
S_SERIES_SHARED["All-on-X Components"] = [
  ...withSource(S_SERIES_SHARED["Multi-unit Abutments"], "Multi-unit Abutments"),
  ...withSource(S_SERIES_SHARED["Multi-unit PoLo & Accessories"], "Multi-unit PoLo & Accessories"),
  ...withSource(S_SERIES_SHARED["Universal Base ASC"], "Universal Base ASC"),
  ...withSource([S_SERIES_SHARED["Scan Bodies"].find(g=>g.label==="Scan Body — Conical Connection, Bridge")], "Scan Bodies"),
  ...withSource(S_SERIES_SHARED["Temporary Abutments"], "Temporary Abutments")
];

const CATALOG_NAS = {
  ...S_SERIES_SHARED,
  "Implants": [
    {label:"Ø3.5mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["8.5mm","302273"],["10mm","302274"],["11.5mm","302275"],["13mm","302276"],["15mm","302277"],["18mm","302278"]
    ]},
    {label:"Ø4.3mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["8.5mm","302279"],["10mm","302280"],["11.5mm","302281"],["13mm","302282"],["15mm","302283"],["18mm","302284"]
    ]},
    {label:"Ø5.0mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["8.5mm","302285"],["10mm","302286"],["11.5mm","302287"],["13mm","302288"],["15mm","302289"],["18mm","302290"]
    ]},
    {label:"Ø5.5mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302291"],["8.5mm","302292"],["10mm","302293"],["11.5mm","302294"],["13mm","302295"],["15mm","302296"]
    ]},
    {label:"Ø3.5mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["8.5mm","302342"],["10mm","302343"],["11.5mm","302344"],["13mm","302345"],["15mm","302346"],["18mm","302347"]
    ]},
    {label:"Ø4.3mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["8.5mm","302348"],["10mm","302349"],["11.5mm","302350"],["13mm","302351"],["15mm","302352"],["18mm","302353"]
    ]},
    {label:"Ø5.0mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["8.5mm","302354"],["10mm","302355"],["11.5mm","302356"],["13mm","302357"],["15mm","302358"],["18mm","302359"]
    ]},
    {label:"Ø5.5mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302360"],["8.5mm","302361"],["10mm","302362"],["11.5mm","302363"],["13mm","302364"],["15mm","302365"]
    ]}
  ]
};

const CATALOG_NPS = {
  ...S_SERIES_SHARED,
  "Implants": [
    {label:"Ø3.75mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302297"],["8.5mm","302298"],["10mm","302299"],["11.5mm","302300"],["13mm","302301"],["15mm","302302"],["18mm","302303"]
    ]},
    {label:"Ø4.3mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302304"],["8.5mm","302305"],["10mm","302306"],["11.5mm","302307"],["13mm","302308"],["15mm","302309"],["18mm","302310"]
    ]},
    {label:"Ø5.0mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302314"],["8.5mm","302315"],["10mm","302316"],["11.5mm","302317"],["13mm","302318"],["15mm","302319"],["18mm","302320"]
    ]},
    {label:"Ø5.5mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302321"],["8.5mm","302322"],["10mm","302323"],["11.5mm","302324"],["13mm","302325"],["15mm","302326"]
    ]},
    {label:"Ø3.75mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302366"],["8.5mm","302367"],["10mm","302368"],["11.5mm","302369"],["13mm","302370"],["15mm","302371"],["18mm","302372"]
    ]},
    {label:"Ø4.3mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302373"],["8.5mm","302374"],["10mm","302375"],["11.5mm","302376"],["13mm","302377"],["15mm","302378"],["18mm","302379"]
    ]},
    {label:"Ø5.0mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302383"],["8.5mm","302384"],["10mm","302385"],["11.5mm","302386"],["13mm","302387"],["15mm","302388"],["18mm","302389"]
    ]},
    {label:"Ø5.5mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302390"],["8.5mm","302391"],["10mm","302392"],["11.5mm","302393"],["13mm","302394"],["15mm","302395"]
    ]}
  ]
};

const CATALOG_NRS = {
  ...S_SERIES_SHARED,
  "Implants": [
    {label:"Ø3.5mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUltra®", items:[
      ["8mm","302327"],["10mm","302328"],["11.5mm","302329"],["13mm","302330"],["16mm","302331"]
    ]},
    {label:"Ø4.3mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUltra®", items:[
      ["8mm","302332"],["10mm","302333"],["11.5mm","302334"],["13mm","302335"],["16mm","302336"]
    ]},
    {label:"Ø5.0mm NP — TiUltra®", source:"Nobel S series 2026 p.26", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUltra®", items:[
      ["8mm","302337"],["10mm","302338"],["11.5mm","302339"],["13mm","302340"],["16mm","302341"]
    ]},
    {label:"Ø3.5mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUnite®", items:[
      ["8mm","302396"],["10mm","302397"],["11.5mm","302398"],["13mm","302399"],["16mm","302400"]
    ]},
    {label:"Ø4.3mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUnite®", items:[
      ["8mm","302401"],["10mm","302402"],["11.5mm","302403"],["13mm","302404"],["16mm","302405"]
    ]},
    {label:"Ø5.0mm NP — TiUnite®", source:"Nobel S series 2026 p.27", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUnite®", items:[
      ["8mm","302406"],["10mm","302407"],["11.5mm","302408"],["13mm","302409"],["16mm","302410"]
    ]}
  ]
};
