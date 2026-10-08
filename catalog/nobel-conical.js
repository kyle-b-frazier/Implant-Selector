/* Catalog data: NobelReplace CC, NobelActive and NobelParallel CC.
   One of the catalog/*.js files that index.html loads, in order, before
   compatibility.js and the app code; see catalog/common.js. */

/* =========================================================================
   NOBEL BIOCARE — Conical Connection prosthetic portfolio
   Shared by NobelReplace CC, NobelActive & NobelParallel CC (same NP/RP/WP
   platform prosthetics). Source: Nobel Biocare "Conical connection implants
   & prosthetics" Product Overview (doc. 81657F, Rev.03) + 2024/25 Product
   Catalog. Some multi-platform tables in the source PDF list several
   platform/diameter combinations in a single flattened row. The healing
   abutment, bridge healing abutment and NobelActive implant tables below
   were re-checked article by article against Nobel Biocare's online store
   and the FDA GUDID database (Oct 2026), and corrected: each healing
   abutment is single-platform (NP, RP or WP — none is shared RP/WP), and
   the NobelActive length/article pairs had been shifted by one length. */
const NOBEL_CONICAL_SHARED = {
"Healing Abutments — Crown": [
  {label:"3.0 Platform, Ø3.2mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36794"],["H 5mm","36795"],["H 7mm","36796"]
  ]},
  {label:"3.0 Platform, Ø3.8mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36797"],["H 5mm","36798"],["H 7mm","36799"]
  ]},
  {label:"NP, Ø3.6mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36639"],["H 5mm","36640"],["H 7mm","36867"]
  ]},
  {label:"NP, Ø5.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36641"],["H 5mm","36642"],["H 7mm","36868"]
  ]},
  {label:"RP, Ø3.6mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36643"],["H 5mm","36644"],["H 7mm","36872"]
  ]},
  {label:"RP, Ø5.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36645"],["H 5mm","36646"],["H 7mm","36873"]
  ]},
  {label:"RP, Ø6.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36647"],["H 5mm","36648"],["H 7mm","36874"]
  ]},
  {label:"WP, Ø5.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","37813"],["H 5mm","37814"]
  ]},
  {label:"WP, Ø6.5mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","37815"],["H 5mm","37816"]
  ]}
],
"Healing Abutments — Bridge": [
  /* Platform per Nobel's conical connection product overview and store
     ("Healing Abutment Conical Connection WP Bridge Ø 6 x 3 mm" = 37817):
     Ø4.0 is NP, Ø5.0 is RP, Ø6.0 is WP. Each fits only its own platform. */
  {label:"NP, Ø4.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36864"],["H 5mm","36865"],["H 7mm","36866"]
  ]},
  {label:"RP, Ø5.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","36869"],["H 5mm","36870"],["H 7mm","36871"]
  ]},
  {label:"WP, Ø6.0mm", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["H 3mm","37817"],["H 5mm","37818"]
  ]}
],
"Anatomic Healing Abutments (PEEK)": [
  {label:"WP", source:"Nobel 2024/2025 p.72", material:"PEEK", items:[
    ["6.0 × 7.0mm","37819"],["7.0 × 8.0mm","37820"]
  ]}
],
"Impression Copings": [
  {label:"3.0 Platform — Closed & Open Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Open Tray, Ø3.2mm, H14mm","36800"],["Closed Tray, Ø3.3mm, H13mm","36801"],
    ["Open Tray, Ø3.8mm, H14mm","36802"],["Closed Tray, Ø3.8mm, H13mm","36803"]
  ]},
  {label:"NP — Closed Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Ø3.6mm, H13mm","36538"],["Ø5.0mm, H13mm","36539"]
  ]},
  {label:"NP — Open Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Ø3.6mm, H10mm","36258"],["Ø3.6mm, H14mm","36260"],["Ø5.0mm, H10mm","36259"],["Ø5.0mm, H14mm","36261"]
  ]},
  {label:"RP — Closed Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Ø3.6mm, H9mm","36541"],["Ø3.6mm, H13mm","36540"],["Ø5.0mm, H9mm","36543"],["Ø5.0mm, H13mm","36542"],
    ["Ø6.0mm, H9mm","36545"],["Ø6.0mm, H13mm","36544"]
  ]},
  {label:"RP — Open Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Ø3.6mm, H10mm","36263"],["Ø3.6mm, H14mm","36262"],["Ø5.0mm, H10mm","36265"],["Ø5.0mm, H14mm","36264"],
    ["Ø6.0mm, H10mm","36267"],["Ø6.0mm, H14mm","36266"]
  ]},
  {label:"WP — Closed Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Ø5.0mm, H9mm","37851"],["Ø5.0mm, H13mm","37850"],["Ø6.5mm, H9mm","37853"],["Ø6.5mm, H13mm","37852"]
  ]},
  {label:"WP — Open Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["Ø5.0mm, H10mm","37855"],["Ø5.0mm, H14mm","37854"],["Ø6.5mm, H10mm","37857"],["Ø6.5mm, H14mm","37856"]
  ]},
  {label:"Bridge — Open Tray", source:"Nobel 2024/2025 p.70", material:"Ti", items:[
    ["NP, H12mm","36930"],["RP, H12mm","36931"],["WP, H12mm","37858"]
  ]}
],
"Temporary Abutments": [
  {label:"Temporary Snap Abutment, Engaging (single-unit)", source:"Nobel 2024/2025 p.73", material:"Ti", items:[
    ["NP, H1.5mm","38760"],["RP, H1.5mm","38761"],["WP, H1.5mm","38762"],
    ["NP, H3.0mm","38847"],["RP, H3.0mm","38848"],["WP, H3.0mm","38849"]
  ]},
  {label:"Temporary Abutment, Engaging (single-unit, incl. clinical screw)", source:"Nobel 2024/2025 p.73", material:"Ti", items:[
    ["3.0, H1.5mm","36779"],["NP, H1.5mm","36663"],["RP, H1.5mm","36664"],["WP, H1.5mm","37823"],["WP, H3.0mm","37824"]
  ]},
  {label:"Temporary Abutment, Non-Engaging (bridge, incl. clinical screw)", source:"Nobel 2024/2025 p.73", material:"Ti", items:[
    ["NP, H1.5mm","36661"],["RP, H1.5mm","36662"],["WP, H1.5mm","37825"],["WP, H3.0mm","37826"]
  ]},
  {label:"Temporary Abutment Anatomical PEEK (WP)", source:"Nobel 2024/2025 p.73", material:"PEEK", items:[
    ["6.0 × 7.0mm","37821"],["7.0 × 8.0mm","37822"]
  ]}
],
"Implant Replicas & Analogs": [
  {label:"Implant Replica", source:"Nobel 2024/2025 p.80", material:"SST", items:[
    ["3.0 Platform","36791"],["NP","36697"],["RP","36698"],["WP","37879"]
  ]},
  {label:"IOS Model Replica", source:"Nobel 2024/2025 p.80", material:"SST", items:[
    ["3.0 Platform","38188"],["NP","38189"],["RP","38190"],["WP","38191"]
  ]}
],
"Esthetic Abutments & Universal Base": [
  {label:"Esthetic Abutment, straight (incl. clinical screw)", source:"Nobel 2024/2025 p.74", material:"Ti", items:[
    ["3.0, H1.5mm","36782"],["3.0, H3.0mm","36783"],["3.0, H4.5mm","36814"],
    ["NP, H1.5mm","36665"],["NP, H3.0mm","36666"],["NP, H4.5mm","36249"],
    ["RP, H1.5mm","36669"],["RP, H3.0mm","36671"],["RP, H4.5mm","36251"],
    ["WP, 6.0×7.0mm","37827"],["WP, 7.0×8.0mm","37828"]
  ]},
  {label:"Esthetic Abutment 15° (incl. clinical screw)", source:"Nobel 2024/2025 p.74", material:"Ti", items:[
    ["3.0, H1.5mm","36784"],["3.0, H3.0mm","36785"],["3.0, H4.5mm","36815"],
    ["NP, H1.5mm","36667"],["NP, H3.0mm","36668"],["NP, H4.5mm","36250"],
    ["RP, H1.5mm","36672"],["RP, H3.0mm","36673"],["RP, H4.5mm","36252"]
  ]},
  {label:"Universal Base, engaging (incl. clinical screw)", source:"Nobel 2024/2025 p.74", material:"Ti",
    note:"US article numbers. Outside the US the same bases are 38213–38218 and also include a burn-out coping (Nobel Biocare 2024/2025 catalog p.74).",
    items:[
    ["NP, H1.5mm","301101"],["NP, H3.0mm","301104"],
    ["RP, H1.5mm","301102"],["RP, H3.0mm","301105"],
    ["WP, H1.5mm","301103"],["WP, H3.0mm","301106"]
  ]}
],
"Multi-unit Abutments Plus": [
  {label:"Straight", source:"Nobel 2024/2025 p.76", material:"Ti", items:[
    ["NP, H1.5mm","38878"],["RP, H1.5mm","38879"],["WP, H1.5mm","38880"],
    ["NP, H2.5mm","38881"],["RP, H2.5mm","38882"],["WP, H2.5mm","38883"],
    ["NP, H3.5mm","38884"],["RP, H3.5mm","38885"],["WP, H3.5mm","38886"],
    ["RP, H4.5mm","38887"]
  ]},
  {label:"17°", source:"Nobel 2024/2025 p.76", material:"Ti", items:[
    ["NP, H2.5mm","38888"],["RP, H2.5mm","38889"],["WP, H2.5mm","38890"],
    ["NP, H3.5mm","38891"],["RP, H3.5mm","38892"],["WP, H3.5mm","38893"]
  ]},
  {label:"30°", source:"Nobel 2024/2025 p.76", material:"Ti", items:[
    ["NP, H3.5mm","38894"],["RP, H3.5mm","38895"],["NP, H4.5mm","38896"],["RP, H4.5mm","38897"]
  ]},
  {label:"Multi-unit Accessories", source:"Nobel 2024/2025 pp.124, 126, 128–129", material:"Ti / POM / SST", items:[
    ["Impression Coping, Open Tray","29089"],["Impression Coping, Closed Tray","38924"],
    ["Healing Cap Ø5.0, H4.1mm (2/pkg)","300162"],["Healing Cap Ø6.0, H4.1mm (2/pkg)","300164"],["Healing Cap Wide, H4.1mm (2/pkg)","300166"],
    ["Healing Cap Ø5.0, H5.5mm (2/pkg)","300163"],["Healing Cap Ø6.0, H5.5mm (2/pkg)","300165"],["Healing Cap Wide, H5.5mm (2/pkg)","300167"],
    ["Multi-unit Aligning Instrument","300161"],["Temporary Snap Coping (Multi-unit Abutment Xeal only)","38915"],["Temporary Coping","29046"],
    ["Drill Guide, Multi-unit","38917"],["Protection Analog, Multi-unit (5/pkg)","29123"]
  ]}
],
"Locator R-Tx® Abutments": [
  {label:"NP", source:"Nobel 2024/2025 p.77", material:"Ti", items:[
    ["H1.0mm","REF30506-01"],["H2.0mm","REF30506-02"],["H3.0mm","REF30506-03"],["H4.0mm","REF30506-04"],["H5.0mm","REF30506-05"]
  ]},
  {label:"NP (6mm)", unverified:"Not in Nobel 2024/2025, which lists REF30506-07 for NP 6mm (p.77)", material:"Ti",
    caution:"Article number needs confirming: Nobel's 2024/2025 catalog (p.77) lists the NP 6mm Locator R-Tx abutment as REF30506-07, not REF30506-06 as shown here. Confirm with Nobel before ordering.",
    items:[
    ["H6.0mm","REF30506-06"]
  ]},
  {label:"RP", source:"Nobel 2024/2025 p.77", material:"Ti", items:[
    ["H1.0mm","REF30507-01"],["H2.0mm","REF30507-02"],["H3.0mm","REF30507-03"],["H4.0mm","REF30507-04"],["H5.0mm","REF30507-05"],["H6.0mm","REF30507-06"]
  ]},
  {label:"WP", source:"Nobel 2024/2025 p.77", material:"Ti", items:[
    ["H1.0mm","REF30508-01"],["H2.0mm","REF30508-02"],["H3.0mm","REF30508-03"],["H4.0mm","REF30508-04"],["H5.0mm","REF30508-05"]
  ]},
  {label:"Processing Components (4/pkg)", source:"Nobel 2024/2025 p.133", material:"Various", items:[
    ["Processing Insert","REF30012-01"],["Denture Attachment Processing Assembly","REF30013-01"],
    ["Processing Spacer","REF30018-01"],["Impression Coping","REF30017-01"],
    ["Block Out Spacer (20/pkg)","REF08514"]
  ]},
  {label:"Retention Inserts (4/pkg)", source:"Nobel 2024/2025 p.133", material:"Various", items:[
    ["Zero Retention Insert","REF30001-01"],["Low Retention Insert","REF30002-01"],
    ["Medium Retention Insert","REF30003-01"],["High Retention Insert","REF30004-01"]
  ]},
  {label:"Female Analogs", source:"Nobel 2024/2025 p.133", material:"Ti", items:[
    ["Ø3.35mm (4/pkg)","REF30014-01"],["Ø4.0mm (4/pkg)","REF30015-01"],["Ø4.0mm (20/pkg)","REF08530-20"],
    ["Ø5.0mm (4/pkg)","REF30016-01"],["Ø5.0mm (20/pkg)","REF08516-20"]
  ]}
],
"Clinical & Laboratory Screws": [
  {label:"For Esthetic Abutment, Universal Base, Temporary Abutments, NobelProcera Ti Abutments/Bars", source:"Nobel 2024/2025 p.79", material:"Ti", items:[
    ["Clinical Screw, 3.0","37890"],["Clinical Screw, NP","37891"],["Clinical Screw, RP/WP","37892"],
    ["Laboratory Screw, 3.0","36805"],["Laboratory Screw, NP","37894"],["Laboratory Screw, RP/WP (5/pkg)","37895"]
  ]},
  {label:"For NobelProcera Zirconia ASC (Angulated Screw Channel)", source:"Nobel 2024/2025 p.79", material:"Ti", items:[
    ["Omnigrip Clinical Screw, NP","37367"],["Omnigrip Clinical Screw, RP/WP","37606"],
    ["Omnigrip Laboratory Screw, NP","37374"],["Omnigrip Laboratory Screw, RP/WP","37607"]
  ]},
  {label:"For Multi-unit Abutment restorations", source:"Nobel 2024/2025 pp.79, 128", unverified:"38420 is not in Nobel 2024/2025", material:"Ti", items:[
    ["Screw, Angled Abutment (NP)","36892"],["Screw, Angled Abutment (RP/WP)","37893"],
    ["Laboratory Screw, Angled Abutment (NP)","37896"],["Laboratory Screw, Angled Abutment (RP/WP)","37897"],
    ["Prosthetic Screw","29285"],["Laboratory Prosthetic Screw (5/pkg)","29287"],["Laboratory Prosthetic Screw (1/pkg)","38420"]
  ]}
]
};
/* All-on-X Components: a convenience grouping for full-arch treatment
   planning, shared by NobelReplace CC and NobelActive. Every item here
   already exists in its home category above — nothing is removed from
   there. Assigned last so lookups elsewhere still resolve to an item's
   true home category. Each duplicated group is tagged with sourceCategory
   so its on-screen label always reads with its true, full component name. */
NOBEL_CONICAL_SHARED["All-on-X Components"] = [
  ...withSource(NOBEL_CONICAL_SHARED["Multi-unit Abutments Plus"], "Multi-unit Abutments Plus"),
  ...withSource(NOBEL_CONICAL_SHARED["Healing Abutments — Bridge"], "Healing Abutments — Bridge"),
  ...withSource(NOBEL_CONICAL_SHARED["Anatomic Healing Abutments (PEEK)"], "Anatomic Healing Abutments (PEEK)"),
  ...withSource([NOBEL_CONICAL_SHARED["Impression Copings"].find(g=>g.label==="Bridge — Open Tray")], "Impression Copings"),
  ...withSource([NOBEL_CONICAL_SHARED["Temporary Abutments"].find(g=>g.label==="Temporary Abutment, Non-Engaging (bridge, incl. clinical screw)")], "Temporary Abutments"),
  ...withSource([NOBEL_CONICAL_SHARED["Temporary Abutments"].find(g=>g.label==="Temporary Abutment Anatomical PEEK (WP)")], "Temporary Abutments"),
  ...withSource([NOBEL_CONICAL_SHARED["Clinical & Laboratory Screws"].find(g=>g.label==="For Multi-unit Abutment restorations")], "Clinical & Laboratory Screws")
];

const CATALOG_NOBEL_RC = {
"Implants": [
  {label:"NobelReplace® Conical Connection — NP (Ø3.5mm)", source:"Nobel 2024/2025 p.19", material:"TiUnite®", items:[
    ["8mm","36699"],["10mm","36700"],["11.5mm","36701"],["13mm","36702"],["16mm","36703"]
  ]},
  {label:"NobelReplace® Conical Connection — RP (Ø4.3mm)", source:"Nobel 2024/2025 p.19", material:"TiUnite®", items:[
    ["8mm","36704"],["10mm","36705"],["11.5mm","36707"],["13mm","36708"],["16mm","36709"]
  ]},
  {label:"NobelReplace® Conical Connection — RP (Ø5.0mm)", source:"Nobel 2024/2025 p.19", material:"TiUnite®", items:[
    ["8mm","36710"],["10mm","36711"],["11.5mm","36712"],["13mm","36713"],["16mm","36714"]
  ]},
  {label:"NobelReplace® CC PMC (0.75mm machined collar, cover screw included) — NP", source:"Nobel 2024/2025 p.19", material:"TiUnite®", items:[
    ["8mm","37284"],["10mm","37285"],["11.5mm","37287"],["13mm","37288"],["16mm","37289"]
  ]},
  {label:"NobelReplace® CC PMC (cover screw included) — RP", source:"Nobel 2024/2025 p.19", material:"TiUnite®", items:[
    ["8mm","37290"],["10mm","37291"],["11.5mm","37292"],["13mm","37293"],["16mm","37294"]
  ]},
  {label:"NobelReplace® CC PMC (cover screw included) — RP (Ø5.0mm)", source:"Nobel 2024/2025 p.19", material:"TiUnite®", items:[
    ["8mm","37295"],["10mm","37296"],["11.5mm","37297"],["13mm","37298"],["16mm","37299"]
  ]}
],
"Cover Screws": [
  {label:"All platforms", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["3.0 Platform","36775"],["NP","36649"],["RP","36650"],["WP","37812"]
  ]}
],
"Surgical Instruments": [
  /* NobelReplace CC comes in NP and RP only: its catalog pages (2024/2025
     ed. p.20-21) list just NP/RP drivers and bone mills. */
  {label:"Implant Drivers", source:"Nobel 2024/2025 p.13", material:"SST", items:[
    ["NP, 28mm","36718"],["NP, 37mm","36719"],
    ["RP, 28mm","36720"],["RP, 37mm","36721"]
  ]},
  {label:"Bone Mills & Guides", source:"Nobel 2024/2025 p.13", material:"SST", items:[
    ["NP Ø4.4mm, Bone Mill with Guide","37863"],["NP Ø5.2mm, Bone Mill with Guide","37864"],["NP, Bone Mill Guide","37865"],
    ["RP Ø5.2mm, Bone Mill with Guide","37866"],["RP Ø6.2mm, Bone Mill with Guide","37867"],["RP, Bone Mill Guide","37868"]
  ]},
  {label:"Drills", source:"Nobel 2024/2025 p.20", material:"SST", items:[
    ["NP Ø3.5mm, 8mm","32075"],["NP Ø3.5mm, 10mm","29367"],["NP Ø3.5mm, 11.5mm","36113"],["NP Ø3.5mm, 13mm","29368"],["NP Ø3.5mm, 16mm","29369"],
    ["RP Ø4.3mm, 8mm","32076"],["RP Ø4.3mm, 10mm","29370"],["RP Ø4.3mm, 11.5mm","36114"],["RP Ø4.3mm, 13mm","29371"],["RP Ø4.3mm, 16mm","29372"],
    ["RP Ø5.0mm, 8mm","32077"],["RP Ø5.0mm, 10mm","29373"],["RP Ø5.0mm, 11.5mm","36115"],["RP Ø5.0mm, 13mm","29374"],["RP Ø5.0mm, 16mm","29375"]
  ]},
  {label:"Dense Bone Drills", source:"Nobel 2024/2025 p.20", material:"SST", items:[
    ["NP Ø3.5mm, 13mm","29377"],["NP Ø3.5mm, 16mm","29378"],
    ["RP Ø4.3mm, 13mm","29380"],["RP Ø4.3mm, 16mm","29381"],
    ["RP Ø5.0mm, 13mm","29383"],["RP Ø5.0mm, 16mm","29384"]
  ]},
  {label:"Screw Taps", source:"Nobel 2024/2025 p.20", material:"SST", items:[
    ["NP Ø3.5mm","36717"],["RP Ø4.3mm","32090"],["RP Ø5.0mm","32091"]
  ]},
  {label:"Additional Drills & Sets", source:"Nobel 2024/2025 p.20", material:"SST", items:[
    ["Drill with Tip Tapered, Ø2.0mm","36117"],["Precision Drill","36118"],["Guide Drill","35426"],
    ["NobelReplace® CC PureSet (instruments + drills, all NobelReplace CC)","87296"]
  ]}
],
...NOBEL_CONICAL_SHARED
};

const CATALOG_NOBEL_NA = {
"Implants": [
  /* Article/length pairs re-verified against Nobel Biocare's store and the
     FDA GUDID (e.g. 36769 = 3.0 x 10mm, 35221 = NP 3.5 x 8.5mm, 34125 =
     NP 3.5 x 10mm, 35225 = RP 5.0 x 8.5mm, 37806 = WP 5.5 x 7mm, 37808 =
     WP 5.5 x 10mm). The previous table had every length shifted by one. */
  {label:"NobelActive® — Ø3.0mm", source:"Nobel 2024/2025 p.11", material:"TiUnite®", items:[
    ["10mm","36769"],["11.5mm","36770"],["13mm","36771"],["15mm","36772"]
  ]},
  {label:"NobelActive® — Ø3.5mm", source:"Nobel 2024/2025 p.11", material:"TiUnite®", items:[
    ["8.5mm","35221"],["10mm","34125"],["11.5mm","34126"],["13mm","34127"],["15mm","34128"],["18mm","35215"]
  ]},
  {label:"NobelActive® — Ø4.3mm", source:"Nobel 2024/2025 p.11", material:"TiUnite®", items:[
    ["8.5mm","35223"],["10mm","34131"],["11.5mm","34132"],["13mm","34133"],["15mm","34134"],["18mm","35219"]
  ]},
  {label:"NobelActive® — Ø5.0mm", source:"Nobel 2024/2025 p.11", material:"TiUnite®", items:[
    ["8.5mm","35225"],["10mm","34137"],["11.5mm","34138"],["13mm","34139"],["15mm","34140"],["18mm","35220"]
  ]},
  {label:"NobelActive® — Ø5.5mm", source:"Nobel 2024/2025 p.11", material:"TiUnite®", items:[
    ["7mm","37806"],["8.5mm","37807"],["10mm","37808"],["11.5mm","37809"],["13mm","37810"],["15mm","37811"]
  ]}
],
"Cover Screws": [
  {label:"All platforms", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["3.0 Platform","36775"],["NP","36649"],["RP","36650"],["WP","37812"]
  ]}
],
"Surgical Instruments": [
  {label:"Implant Drivers", source:"Nobel 2024/2025 p.13", material:"SST", items:[
    ["3.0, 28mm","36773"],["3.0, 37mm","36774"],["NP, 28mm","36718"],["NP, 37mm","36719"],
    ["RP, 28mm","36720"],["RP, 37mm","36721"],["WP, 28mm","37859"],["WP, 37mm","37860"]
  ]},
  {label:"Twist Drills", source:"Nobel 2024/2025 p.12", material:"SST", items:[
    ["Ø1.5mm, 7–15mm","31278"],["Ø2.0mm, 7–10mm","32296"],["Ø2.0mm, 7–15mm","32297"],["Ø2.0mm, 10–18mm","32299"]
  ]},
  {label:"Twist Step Drills", source:"Nobel 2024/2025 p.12", material:"SST", items:[
    ["Ø2.4/2.8mm, 7–10mm","32260"],["Ø2.4/2.8mm, 7–15mm","32261"],["Ø2.4/2.8mm, 10–18mm","32262"],
    ["Ø2.8/3.2mm, 7–10mm","37873"],["Ø2.8/3.2mm, 7–15mm","34638"],["Ø2.8/3.2mm, 10–18mm","34639"],
    ["Ø3.2/3.6mm, 7–10mm","32263"],["Ø3.2/3.6mm, 7–15mm","32264"],["Ø3.2/3.6mm, 10–18mm","32265"],
    ["Ø3.8/4.2mm, 7–10mm","32275"],["Ø3.8/4.2mm, 7–15mm","32276"],["Ø3.8/4.2mm, 10–18mm","32277"],
    ["Ø4.2/4.6mm, 7–10mm","37874"],["Ø4.2/4.6mm, 7–15mm","34582"],["Ø4.2/4.6mm, 10–18mm","34583"],
    ["Ø4.2/5.0mm, 7–10mm","37875"],["Ø4.2/5.0mm, 7–15mm","37876"]
  ]},
  {label:"Screw Taps", source:"Nobel 2024/2025 p.12", material:"SST", items:[
    ["Ø3.0mm","36816"],["Ø3.5mm","36236"],["Ø4.3mm","36237"],["Ø5.0mm","36238"],
    ["Ø5.5mm, 7–10mm","37871"],["Ø5.5mm, 11.5–15mm","37872"]
  ]},
  {label:"Sets", source:"Nobel 2024/2025 p.12", material:"—", items:[
    ["NobelActive® PureSet (instruments, all NobelActive implants)","87294"]
  ]}
],
...NOBEL_CONICAL_SHARED
};

/* =========================================================================
   NOBELPARALLEL® CONICAL CONNECTION — third member of the conical
   connection family (with NobelReplace CC and NobelActive), sharing the
   exact same prosthetic portfolio. Source: same Nobel Biocare Conical
   Connection Implants & Prosthetics Product Overview (doc. 81657F, Rev.03)
   used for NobelReplace CC/NobelActive. Implant lengths run 0.5mm shorter
   than the name indicates, per Nobel's own footnote — same convention as
   NobelActive. */
const CATALOG_NOBEL_PARALLEL = {
"Implants": [
  {label:"NobelParallel® CC — Ø3.75mm", source:"Nobel 2024/2025 p.15", material:"TiUnite®", items:[
    ["7mm","37963"],["8.5mm","37964"],["10mm","37965"],["11.5mm","37966"],["13mm","37967"],["15mm","37968"],["18mm","37969"]
  ]},
  {label:"NobelParallel® CC — Ø4.3mm", source:"Nobel 2024/2025 p.15", material:"TiUnite®", items:[
    ["7mm","37970"],["8.5mm","37971"],["10mm","37972"],["11.5mm","37973"],["13mm","37974"],["15mm","37975"],["18mm","37976"]
  ]},
  {label:"NobelParallel® CC — Ø5.0mm", source:"Nobel 2024/2025 p.15", material:"TiUnite®", items:[
    ["7mm","37977"],["8.5mm","37978"],["10mm","37979"],["11.5mm","37980"],["13mm","37981"],["15mm","37982"],["18mm","37983"]
  ]},
  {label:"NobelParallel® CC — Ø5.5mm", source:"Nobel 2024/2025 p.15", material:"TiUnite®", items:[
    ["7mm","37984"],["8.5mm","37985"],["10mm","37986"],["11.5mm","37987"],["13mm","37988"],["15mm","37989"]
  ]}
],
"Cover Screws": [
  {label:"All platforms", source:"Nobel 2024/2025 p.72", material:"Ti", items:[
    ["3.0 Platform","36775"],["NP","36649"],["RP","36650"],["WP","37812"]
  ]}
],
"Surgical Instruments": [
  /* NobelParallel CC has no 3.0 implant: its catalog pages (2024/2025 ed.
     p.16-17) list NP/RP/WP drivers and bone mills, and twist drills from
     Ø2.0 (the Ø1.5 drill is NobelActive only). */
  {label:"Implant Drivers", source:"Nobel 2024/2025 p.13", material:"SST", items:[
    ["NP, 28mm","36718"],["NP, 37mm","36719"],
    ["RP, 28mm","36720"],["RP, 37mm","36721"],["WP, 28mm","37859"],["WP, 37mm","37860"]
  ]},
  {label:"Bone Mills & Guides", source:"Nobel 2024/2025 p.13", material:"SST", items:[
    ["NP Ø4.4mm, Bone Mill with Guide","37863"],["NP Ø5.2mm, Bone Mill with Guide","37864"],["NP, Bone Mill Guide","37865"],
    ["RP Ø5.2mm, Bone Mill with Guide","37866"],["RP Ø6.2mm, Bone Mill with Guide","37867"],["RP, Bone Mill Guide","37868"],
    ["WP Ø6.7mm, Bone Mill with Guide","37869"],["WP, Bone Mill Guide","37870"]
  ]},
  {label:"Twist Drills (shared with NobelActive)", source:"Nobel 2024/2025 p.12", material:"SST", items:[
    ["Ø2.0mm, 7–10mm","32296"],["Ø2.0mm, 7–15mm","32297"],["Ø2.0mm, 10–18mm","32299"]
  ]},
  {label:"Twist Step Drills (shared with NobelActive)", source:"Nobel 2024/2025 p.12", material:"SST", items:[
    ["Ø2.4/2.8mm, 7–10mm","32260"],["Ø2.4/2.8mm, 7–15mm","32261"],["Ø2.4/2.8mm, 10–18mm","32262"],
    ["Ø2.8/3.2mm, 7–10mm","37873"],["Ø2.8/3.2mm, 7–15mm","34638"],["Ø2.8/3.2mm, 10–18mm","34639"],
    ["Ø3.2/3.6mm, 7–10mm","32263"],["Ø3.2/3.6mm, 7–15mm","32264"],["Ø3.2/3.6mm, 10–18mm","32265"],
    ["Ø3.8/4.2mm, 7–10mm","32275"],["Ø3.8/4.2mm, 7–15mm","32276"],["Ø3.8/4.2mm, 10–18mm","32277"],
    ["Ø4.2/4.6mm, 7–10mm","37874"],["Ø4.2/4.6mm, 7–15mm","34582"],["Ø4.2/4.6mm, 10–18mm","34583"],
    ["Ø4.2/5.0mm, 7–10mm","37875"],["Ø4.2/5.0mm, 7–15mm","37876"]
  ]},
  {label:"Cortical Drills (NobelParallel CC)", source:"Nobel 2024/2025 p.16", material:"SST", items:[
    ["Ø3.75mm","38000"],["Ø4.3mm","38001"],["Ø5.0mm","38002"],["Ø5.5mm","38003"]
  ]},
  {label:"Screw Taps (NobelParallel CC)", source:"Nobel 2024/2025 p.16", material:"SST", items:[
    ["Ø3.75mm, 7–13mm","37990"],["Ø3.75mm, 7–18mm","37991"],
    ["Ø4.3mm, 7–13mm","37992"],["Ø4.3mm, 7–18mm","37993"],
    ["Ø5.0mm, 7–13mm","37994"],["Ø5.0mm, 7–18mm","37995"],
    ["Ø5.5mm, 7–10mm","37996"],["Ø5.5mm, 7–15mm","37997"]
  ]},
  {label:"Sets", source:"Nobel 2024/2025 p.16", material:"—", items:[
    ["NobelParallel® CC PureSet (instruments, all NobelParallel CC implants)","87295"]
  ]}
],
...NOBEL_CONICAL_SHARED
};
