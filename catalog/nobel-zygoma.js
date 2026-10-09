/* Catalog data: NobelZygoma.
   One of the catalog/*.js files that index.html loads, in order, before
   compatibility.js and the app code; see catalog/common.js. */

/* Torque & driver: from the icons in the Nobel 2024/2025 catalog — zygoma
   multi-unit abutments pp.122–123 (all 35 Ncm; Unigrip, or the multi-unit
   screwdriver for the straight 0° ones), CC RP cover screw p.72, impression
   coping p.124, healing caps and temporary coping p.126. The Brånemark
   zygoma cover screw and abutment screws have no icon, so carry none. */

/* =========================================================================
   NOBEL ZYGOMA — two systems, split by implant head angle (0° and 45°).
   NOTE: the 0° system's TiUltra implants use the Conical Connection, but
   its TiUnite implants (38275-38282) are External Hex — verified against
   Nobel Biocare's store, as are their 45°/60° External Hex multi-unit
   abutments (37624 etc.), which Nobel lists specifically for NobelZygoma
   0° implants. The generation filter keeps each implant on its own line. Source:
   Nobel Biocare Product Catalog 2024/2025 (valid from Aug 1, 2024),
   Implant systems pp. 42 (implants) and Prosthetics pp. 122–124 —
   transcribed directly from the official catalog.

   Each connection type offers TWO implant surface generations that pair
   with DIFFERENT prosthetic abutment lines — exactly like the Conical
   Connection/S-series pattern already in this tool:
   - TiUltra® surface implants pair with the newer "Xeal" multi-unit
     abutments (angled, S/M/L/XL sized).
   - TiUnite® surface implants (older generation, still sold) pair with
     the older-style "Multi-unit Abutments RP" (height-sized, no Xeal
     branding).
   Both implants and prosthetics are all a single platform: RP.

   IMPLANT LENGTH CAVEAT: the catalog gives a nominal length name plus a
   separate "actual/total length" value that differs from it — sometimes
   by a constant offset, sometimes not (see 0° TiUnite, which is +1mm for
   every length except 35mm, which is +1.7mm — a real irregularity in the
   source, not a transcription pattern to "correct"). Both values are
   folded into each item's name for visibility, matching how the S-series
   caveat was handled.

   MULTI-UNIT HEALING CAPS AND TEMPORARY COPING: pp.122 and 123 refer
   every zygoma multi-unit abutment (Xeal and the older TiUnite-paired RP
   ones) to the standard multi-unit prosthetic components ("listed on
   page 124"). The titanium healing caps (300162–300167) and the regular
   temporary coping (29046) on p.126 are listed for NP/RP/WP, "compatible
   with all multi-unit abutments except multi-unit abutment Brånemark WP
   (external hex)"; the zygoma abutments are all RP, so both fit. The
   Temporary Snap Coping (38915) is left out: p.126 limits it to
   "Multi-unit abutment Xeal for CC and TCC", which doesn't clearly cover
   the zygoma Xeal abutments.
   ========================================================================= */
/* Standard multi-unit healing caps and temporary coping, shared by both
   zygoma systems (see MULTI-UNIT HEALING CAPS above). Item names match the
   conical connection line's "Multi-unit Accessories" for the same REFs. */
const NOBEL_ZYGOMA_MU_ACCESSORIES = {label:"Multi-unit Accessories (fit all zygoma multi-unit abutments)", source:"Nobel 2024/2025 p.126", torque:"Hand-tight (temporary coping: 15 Ncm)", driver:"Unigrip screwdriver", material:"Ti", items:[
  ["Healing Cap Ø5.0, H4.1mm (2/pkg)","300162"],["Healing Cap Ø6.0, H4.1mm (2/pkg)","300164"],["Healing Cap Wide, H4.1mm (2/pkg)","300166"],
  ["Healing Cap Ø5.0, H5.5mm (2/pkg)","300163"],["Healing Cap Ø6.0, H5.5mm (2/pkg)","300165"],["Healing Cap Wide, H5.5mm (2/pkg)","300167"],
  ["Temporary Coping","29046"]
]};
const CATALOG_NZCC = {
"Implants": [
  {label:"0° CC RP — TiUltra®", source:"Nobel 2024/2025 p.42", note:"Length shown is nominal; each option lists its actual total length in parentheses.", material:"TiUltra®", items:[
    ["30mm (actual 31.5mm)","301541"],["32.5mm (actual 34mm)","301542"],["35mm (actual 36.5mm)","301543"],
    ["37.5mm (actual 39mm)","301544"],["40mm (actual 41.5mm)","301545"],["42.5mm (actual 44mm)","301546"],
    ["45mm (actual 46.5mm)","301547"],["47.5mm (actual 49mm)","301548"],["50mm (actual 51.5mm)","301549"],
    ["52.5mm (actual 54mm)","301550"],["55mm (actual 56.5mm)","301551"],["57.5mm (actual 59mm)","301552"],
    ["60mm (actual 61.5mm)","301553"]
  ]},
  {label:"0° Ext Hex RP, Ø4.4mm — TiUnite®", source:"Nobel 2024/2025 p.44", note:"External hex connection (not conical). Length shown is nominal; each option lists its actual total length / narrow-diameter portion length in parentheses.", material:"TiUnite®", items:[
    ["30mm (total 31mm)","38275"],
    ["35mm (total 36.7mm, narrow-Ø portion 8.5mm)","38276"],
    ["37.5mm (total 38.5mm, narrow-Ø portion 11mm)","38277"],
    ["40mm (total 41mm, narrow-Ø portion 13.5mm)","38278"],
    ["42.5mm (total 43.5mm, narrow-Ø portion 16mm)","38279"],
    ["45mm (total 46mm, narrow-Ø portion 18.5mm)","38280"],
    ["47.5mm (total 48.5mm, narrow-Ø portion 21mm)","38281"],
    ["50mm (total 51mm, narrow-Ø portion 23.5mm)","38282"]
  ]}
],
"Cover Screws": [
  {label:"CC RP — for TiUltra® implants (same REF as standard Conical Connection RP)", source:"Nobel 2024/2025 p.72", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["Cover Screw","36650"]
  ]},
  {label:"Brånemark System Zygoma Cover Screw — for TiUnite® implants", source:"Nobel 2024/2025 p.122", material:"Ti", items:[
    ["Cover Screw","32424"]
  ]}
],
"Multi-unit Abutments": [
  {label:"Multi-unit Abutment Xeal Zygoma CC RP, 45° (for TiUltra® implants)", source:"Nobel 2024/2025 p.122", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["S","301575"],["M","301576"],["L","301577"],["XL","301578"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma CC RP, 60° (for TiUltra® implants)", source:"Nobel 2024/2025 p.122", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["S","301652"],["M","301653"],["L","301654"],["XL","301655"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Screw, 45°/60°, all sizes", source:"Nobel 2024/2025 p.122", material:"Ti", items:[
    ["Screw","301759"]
  ]},
  {label:"Multi-unit Abutment External Hex RP, 45° (for 0° TiUnite® implants)", source:"Nobel 2024/2025 p.123", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H6mm","37624"],["H8mm","37625"],["H10mm","37626"]
  ]},
  {label:"Multi-unit Abutment External Hex RP, 60° (for 0° TiUnite® implants)", source:"Nobel 2024/2025 p.123", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H6mm","37774"],["H8mm","37775"]
  ]},
  {label:"Multi-unit Abutment Screw — for TiUnite® 45°/60° abutments", source:"Nobel 2024/2025 p.123", material:"Ti", items:[
    ["Abutment Screw","38615"]
  ]},
  {label:"Healing Abutment — for TiUnite® 45°/60° multi-unit abutments", unverified:"Not in Nobel 2024/2025", material:"Ti", items:[
    ["Ø4×3mm","32332"],["Ø4×5mm","32333"]
  ]},
  NOBEL_ZYGOMA_MU_ACCESSORIES
],
"Impression & Position Locators": [
  {label:"Impression Coping (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", source:"Nobel 2024/2025 p.124", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"POM / Ti", items:[
    ["Open Tray (15mm guide pin incl.)","29089"],["Closed Tray","38924"]
  ]},
  {label:"Elos Accurate® Intra-oral Position Locator (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", source:"Nobel 2024/2025 p.124", material:"Ti", items:[
    ["Multi-unit, IO 2C-A","IO 2C-A"],["Kit","IO 2C KIT"]
  ]},
  {label:"Position Locator, Desktop (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", source:"Nobel 2024/2025 p.124", material:"Ti", items:[
    ["Desktop Locator","300473"]
  ]}
],
"Surgical Instruments & Sets": [
  {label:"TiUltra® Sets", source:"Nobel 2024/2025 p.46", material:"—", items:[
    ["NobelZygoma TiUltra PureSet","108236"],["PureSet Tray","PUR1000"],["PureSet Plate","PUR1001"],
    ["TiUltra PureSet Wallchart EU","301981"],["TiUltra PureSet Wallchart US","301982"]
  ]},
  {label:"TiUltra® Drills", source:"Nobel 2024/2025 p.46", material:"SST", items:[
    ["Precision Drill","301585"],["Round Bur","301601"],["Lateral Bur Coarse","301586"],["Lateral Bur Fine","301694"]
  ]},
  {label:"TiUltra® Twist & Pilot Drills", source:"Nobel 2024/2025 p.46", unverified:"301606 and 301607 are not in Nobel 2024/2025 (p.46 is misprinted)", material:"SST",
    caution:"Article numbers need confirming: Nobel's 2024/2025 catalog (p.46) lists Twist Drill Ø2.9mm as Regular 301603 / Short 301602 (the reverse of this list) and Twist Drill Ø3.5mm as Regular 301604 / Short 301605. Its Pilot Drill row repeats numbers used elsewhere, so that page has a misprint, and 301606/301607 don't appear in it. Confirm with Nobel before ordering.",
    items:[
    ["Twist Drill Ø2.9mm, Regular","301602"],["Twist Drill Ø2.9mm, Short","301603"],
    ["Twist Drill Ø3.5mm, Regular","301606"],["Twist Drill Ø3.5mm, Short","301607"],
    ["Pilot Drill Ø3.5mm, Regular","301604"],["Pilot Drill Ø3.5mm, Short","301605"]
  ]},
  {label:"TiUltra® Instruments", source:"Nobel 2024/2025 pp.46, 59", material:"SST", items:[
    ["Handle","301582"],["Handpiece Adapter","301583"],["Drill Guard","37787"],["Drill Guard Short","37788"],
    ["Depth Indicator Straight","301656"],["Depth Indicator Angled","301657"],["Manual Torque Wrench Prosthetic","29165"]
  ]},
  {label:"TiUltra® Bone Mills, RP 0°", source:"Nobel 2024/2025 p.46", material:"SST", items:[
    ["Bone Mill with Guide","301658"],["Guide","301660"]
  ]},
  {label:"TiUltra® Bone Mills, RP 45°", source:"Nobel 2024/2025 p.46", material:"SST", items:[
    ["Bone Mill with Guide","301659"],["Guide","301584"]
  ]},
  {label:"TiUnite® Sets", source:"Nobel 2024/2025 p.47", material:"—", items:[
    ["NobelZygoma TiUnite PureSet","88521"],["PureSet Tray","PUR1000"],["PureSet Plate","PUR1001"],
    ["TiUnite PureSet Wallchart EU","301893"],["TiUnite PureSet Wallchart US","301894"]
  ]},
  {label:"TiUnite® Drills", source:"Nobel 2024/2025 p.47", material:"SST", items:[
    ["Brånemark System Zygoma Round Bur","DIA 578-0"],
    ["Brånemark System Zygoma Pilot Drill Ø3.5mm, Regular","32630"],["Brånemark System Zygoma Pilot Drill Ø3.5mm, Short","32791"],
    ["Brånemark System Zygoma Twist Drill Ø2.9mm, Regular","32628"],["Brånemark System Zygoma Twist Drill Ø2.9mm, Short","32629"],
    ["Brånemark System Zygoma Twist Drill Ø3.5mm, Regular","32631"],["Brånemark System Zygoma Twist Drill Ø3.5mm, Short","32632"],
    ["NobelZygoma 0° Twist Drill Ø2.9mm, Regular","37766"],["NobelZygoma 0° Twist Drill Ø2.9mm, Short","37767"],
    ["NobelZygoma 0° Twist Drill Ø3.5mm, Regular","37768"],["NobelZygoma 0° Twist Drill Ø3.5mm, Short","37769"],
    ["NobelZygoma 0° Twist Drill Ø4.0mm, Regular","37770"],["NobelZygoma 0° Twist Drill Ø4.0mm, Short","37771"],
    ["NobelZygoma 0° Twist Drill Ø4.4mm, Regular","37772"],["NobelZygoma 0° Twist Drill Ø4.4mm, Short","37773"]
  ]},
  {label:"TiUnite® Instruments", source:"Nobel 2024/2025 pp.47, 59", material:"SST", items:[
    ["Handle","37786"],["Drill Guard","37787"],["Drill Guard Short","37788"],
    ["Depth Indicator Straight","37789"],["Depth Indicator Angled","37790"],["Manual Torque Wrench Prosthetic","29165"]
  ]},
  {label:"TiUnite® Other Accessories", source:"Nobel 2024/2025 p.47", material:"SST", items:[
    ["Cover Screw Driver Brånemark System Hexagon","DIB 097-0"],["Screwdriver Machine Unigrip 25mm","29152"],
    ["Screwdriver Manual Unigrip 28mm","29149"],["Screwdriver Manual Multi-unit 25mm","29156"],
    ["Connection to Handpiece","29081"]
  ]}
]
};
CATALOG_NZCC["All-on-X Components"] = [
  ...withSource(CATALOG_NZCC["Multi-unit Abutments"], "Multi-unit Abutments"),
  ...withSource(CATALOG_NZCC["Impression & Position Locators"], "Impression & Position Locators")
];

const CATALOG_NZEH = {
"Implants": [
  {label:"45° Ext Hex RP — TiUltra®", source:"Nobel 2024/2025 p.43", note:"Length shown is nominal; each option lists its actual total length in parentheses.", material:"TiUltra®", items:[
    ["30mm (actual 31.5mm)","301554"],["32.5mm (actual 34mm)","301555"],["35mm (actual 36.5mm)","301556"],
    ["37.5mm (actual 39mm)","301557"],["40mm (actual 41.5mm)","301558"],["42.5mm (actual 44mm)","301559"],
    ["45mm (actual 46.5mm)","301560"],["47.5mm (actual 49mm)","301561"],["50mm (actual 51.5mm)","301562"],
    ["52.5mm (actual 54mm)","301563"],["55mm (actual 56.5mm)","301564"],["57.5mm (actual 59mm)","301565"],
    ["60mm (actual 61.5mm)","301566"]
  ]},
  {label:"45° Ext Hex RP — TiUnite®", source:"Nobel 2024/2025 p.45", note:"Length shown is nominal; each option lists its actual total length / narrow-diameter portion length in parentheses.", material:"TiUnite®", items:[
    ["30mm (total 34.7mm, narrow-Ø portion 27.9mm)","38283"],
    ["32.5mm (total 37.2mm, narrow-Ø portion 30.4mm)","38284"],
    ["35mm (total 39.7mm, narrow-Ø portion 32.9mm)","38285"],
    ["37.5mm (total 42.2mm, narrow-Ø portion 35.4mm)","38286"],
    ["40mm (total 44.7mm, narrow-Ø portion 37.8mm)","38287"],
    ["42.5mm (total 47.2mm, narrow-Ø portion 40.4mm)","38288"],
    ["45mm (total 49.7mm, narrow-Ø portion 42.9mm)","38289"],
    ["47.5mm (total 52.2mm, narrow-Ø portion 45.4mm)","38290"],
    ["50mm (total 54.7mm, narrow-Ø portion 47.9mm)","38291"],
    ["52.5mm (total 57.2mm, narrow-Ø portion 50.4mm)","38292"]
  ]}
],
"Cover Screws": [
  {label:"Brånemark System Zygoma Cover Screw — for TiUltra® and TiUnite® implants", source:"Nobel 2024/2025 p.122", material:"Ti", items:[
    ["Cover Screw","32424"]
  ]}
],
"Multi-unit Abutments": [
  {label:"Multi-unit Abutment Xeal Zygoma Ext Hex RP, 0° (for TiUltra® implants)", source:"Nobel 2024/2025 p.122", torque:"35 Ncm", driver:"Multi-unit screwdriver", material:"Ti", items:[
    ["S","301567"],["M","301568"],["L","301569"],["XL","301570"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Ext Hex RP, 17° (for TiUltra® implants — only S/M offered)", source:"Nobel 2024/2025 p.122", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["S","301571"],["M","301572"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Screw, 0°", source:"Nobel 2024/2025 p.122", material:"Ti", items:[
    ["S","301754"],["M","301755"],["L","301756"],["XL","301757"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Screw, 17°, all sizes", source:"Nobel 2024/2025 p.122", material:"Ti", items:[
    ["Screw","301995"]
  ]},
  {label:"Multi-unit Abutment RP, 0° (for TiUnite® implants — only 3mm/5mm offered)", source:"Nobel 2024/2025 p.123", torque:"35 Ncm", driver:"Multi-unit screwdriver", material:"Ti", items:[
    ["H3mm","32330"],["H5mm","32331"]
  ]},
  {label:"Multi-unit Abutment RP, 17° (for TiUnite® implants — only 2mm/3mm offered)", source:"Nobel 2024/2025 p.123", torque:"35 Ncm", driver:"Unigrip screwdriver", material:"Ti", items:[
    ["H2mm","32328"],["H3mm","32329"]
  ]},
  {label:"Multi-unit Abutment Screw — for TiUnite® 0°/17° abutments", source:"Nobel 2024/2025 p.123", material:"Ti", items:[
    ["Abutment Screw","33397"],["Angled Multi-unit Abutment Screw","38621"]
  ]},
  {label:"Impression Coping — for TiUnite® 0°/17° multi-unit abutments", source:"Nobel 2024/2025 p.123", material:"Ti", items:[
    ["Open Tray Ø4mm","33396"]
  ]},
  NOBEL_ZYGOMA_MU_ACCESSORIES
],
"Impression & Position Locators": [
  {label:"Impression Coping (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", source:"Nobel 2024/2025 p.124", torque:"Hand-tight", driver:"Unigrip screwdriver", material:"POM / Ti", items:[
    ["Open Tray (15mm guide pin incl.)","29089"],["Closed Tray","38924"]
  ]},
  {label:"Elos Accurate® Intra-oral Position Locator (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", source:"Nobel 2024/2025 p.124", material:"Ti", items:[
    ["Multi-unit, IO 2C-A","IO 2C-A"],["Kit","IO 2C KIT"]
  ]},
  {label:"Position Locator, Desktop (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", source:"Nobel 2024/2025 p.124", material:"Ti", items:[
    ["Desktop Locator","300473"]
  ]}
],
"Surgical Instruments & Sets": CATALOG_NZCC["Surgical Instruments & Sets"]
};
CATALOG_NZEH["All-on-X Components"] = [
  ...withSource(CATALOG_NZEH["Multi-unit Abutments"], "Multi-unit Abutments"),
  ...withSource(CATALOG_NZEH["Impression & Position Locators"], "Impression & Position Locators")
];
