/* Catalog data: Straumann BLT.
   One of the catalog/*.js files that index.html loads, in order, before
   compatibility.js and the app code; see catalog/common.js. */

/* =========================================================================
   STRAUMANN BLT (Bone Level Tapered) — uses the CrossFit® connection
   (SC/NC/RC platforms), entirely different from BLC/BLX's TorcFit®
   connection, so this is a full separate prosthetic line, not a reuse.
   Source: Straumann Product Catalog 2022/2023 International Edition
   (452.200-en), Bone Level Implants + Bone Level Tapered SC/NC/RC
   prosthetics sections, cross-checked against individual product pages
   on shop.straumann.com. Every article below was re-checked against the
   Product Catalog 2022/2023 Special Edition (452.201/en) in Oct 2026.
   NOTE: BLT's edentulous/multi-unit ("Prosthetics for Edentulous RC")
   line exists in Straumann's catalog but wasn't verified in enough
   depth to include here with confidence — no
   All-on-X Components section for BLT yet. RC-platform coverage below is
   solid for Screw-retained/Variobase basics but thinner than NC; verify
   any RC restorative item against the current catalog before ordering. */
const CATALOG_BLT = {
"Implants": [
  {label:"Ø 2.9mm SC — SLActive®, Roxolid®", source:"Straumann 2022/2023 p.26", material:"Roxolid®", items:[
    ["10mm","021.0010"],["12mm","021.0012"],["14mm","021.0014"]
  ]},
  {label:"Ø 3.3mm NC — SLActive®, Roxolid®", source:"Straumann 2022/2023 p.28", material:"Roxolid®", items:[
    ["8mm","021.3308"],["10mm","021.3310"],["12mm","021.3312"],["14mm","021.3314"],["16mm","021.3316"],["18mm","021.3318"]
  ]},
  {label:"Ø 4.1mm RC — SLActive®, Roxolid®", source:"Straumann 2022/2023 p.30", material:"Roxolid®", items:[
    ["8mm","021.5308"],["10mm","021.5310"],["12mm","021.5312"],["14mm","021.5314"],["16mm","021.5316"],["18mm","021.5318"]
  ]},
  {label:"Ø 4.8mm RC — SLActive®, Roxolid®", source:"Straumann 2022/2023 p.33", material:"Roxolid®", items:[
    ["8mm","021.7308"],["10mm","021.7310"],["12mm","021.7312"],["14mm","021.7314"],["16mm","021.7316"],["18mm","021.7318"]
  ]},
  {label:"Ø 2.9mm SC — SLA®, Roxolid®", source:"Straumann 2022/2023 p.26", material:"Roxolid®", items:[
    ["10mm","021.0110"],["12mm","021.0112"],["14mm","021.0114"]
  ]},
  {label:"Ø 3.3mm NC — SLA®, Roxolid®", source:"Straumann 2022/2023 p.28", material:"Roxolid®", items:[
    ["8mm","021.3508"],["10mm","021.3510"],["12mm","021.3512"],["14mm","021.3514"],["16mm","021.3516"],["18mm","021.3518"]
  ]},
  {label:"Ø 4.1mm RC — SLA®, Roxolid®", source:"Straumann 2022/2023 p.30", material:"Roxolid®", items:[
    ["8mm","021.5508"],["10mm","021.5510"],["12mm","021.5512"],["14mm","021.5514"],["16mm","021.5516"],["18mm","021.5518"]
  ]},
  {label:"Ø 4.8mm RC — SLA®, Roxolid®", source:"Straumann 2022/2023 p.33", material:"Roxolid®", items:[
    ["8mm","021.7508"],["10mm","021.7510"],["12mm","021.7512"],["14mm","021.7514"],["16mm","021.7516"],["18mm","021.7518"]
  ]}
],
"Closure Caps": [
  {label:"SC", source:"Straumann 2022/2023 p.27", material:"Ti", items:[
    ["∅2.4mm, H0.5mm","024.0006S"]
  ]},
  {label:"NC", source:"Straumann 2022/2023 p.29", material:"Ti", items:[
    ["Small, H0mm","024.2100S"],["Small, H0mm (4/pkg)","024.2100S-04"],
    ["Large, H0.5mm","024.2105S"],["Large, H0.5mm (4/pkg)","024.2105S-04"]
  ]},
  {label:"RC", source:"Straumann 2022/2023 p.31", material:"Ti", items:[
    ["Small, H0mm","024.4100S"],["Small, H0mm (4/pkg)","024.4100S-04"],
    ["Large, H0.5mm","024.4105S"],["Large, H0.5mm (4/pkg)","024.4105S-04"]
  ]}
],
"Healing Abutments": [
  {label:"SC — conical, oval", source:"Straumann 2022/2023 p.27", material:"Ti", items:[
    ["H 2mm","024.0007S"],["H 3.5mm","024.0008S"],["H 5mm","024.0009S"],["H 6.5mm","024.0010S"]
  ]},
  {label:"NC — Ø3.6mm, conical", source:"Straumann 2022/2023 p.29", material:"Ti", items:[
    ["H 2mm","024.2222S"],["H 3.5mm","024.2224S"],["H 5mm","024.2226S"]
  ]},
  {label:"NC — Ø4.8mm, conical", source:"Straumann 2022/2023 p.29", material:"Ti", items:[
    ["H 2mm","024.2242S"],["H 3.5mm","024.2244S"],["H 5mm","024.2246S"]
  ]},
  {label:"NC — bottle-shaped", source:"Straumann 2022/2023 p.29", material:"Ti", items:[
    ["∅3.3mm, H3.5mm","024.2234S"],["∅3.3mm, H5mm","024.2236S"]
  ]},
  {label:"NC — Ø5mm, customizable", source:"Straumann 2022/2023 p.29", material:"PEEK", items:[
    ["H 7mm","024.2270S"]
  ]},
  {label:"NC — Ceramic", source:"Straumann 2022/2023 p.29", material:"ZrO2 / Ti", items:[
    ["Ø3.6mm, H2mm","024.2222Z"],["Ø3.6mm, H3.5mm","024.2224Z"],["Ø3.6mm, H5mm","024.2226Z"],
    ["Ø4.8mm, H2mm","024.2242Z"],["Ø4.8mm, H3.5mm","024.2244Z"],["Ø4.8mm, H5mm","024.2246Z"]
  ]},
  {label:"RC — Ø4.5/5/6/6.5mm, conical", source:"Straumann 2022/2023 p.31", material:"Ti", items:[
    ["Ø4.5mm, H2mm","024.0000S"],["Ø4.5mm, H4mm","024.0001S"],["Ø4.5mm, H6mm","024.0002S"],
    ["Ø5mm, H2mm","024.4222S"],["Ø5mm, H4mm","024.4224S"],["Ø5mm, H6mm","024.4226S"],
    ["Ø6mm, H2mm","024.0003S"],["Ø6mm, H4mm","024.0004S"],["Ø6mm, H6mm","024.0005S"],
    ["Ø6.5mm, H2mm","024.4242S"],["Ø6.5mm, H4mm","024.4244S"],["Ø6.5mm, H6mm","024.4246S"]
  ]},
  {label:"RC — bottle-shaped", source:"Straumann 2022/2023 p.31", material:"Ti", items:[
    ["Ø4.4mm, H4mm","024.4234S"],["Ø4.7mm, H6mm","024.4236S"]
  ]},
  {label:"RC — Ø7mm, customizable", source:"Straumann 2022/2023 p.31", material:"PEEK", items:[
    ["H 7mm","024.4270S"]
  ]},
  {label:"RC — Ceramic", source:"Straumann 2022/2023 pp.31–32", material:"ZrO2 / Ti", items:[
    ["Ø4.5mm, H2mm","024.0000Z"],["Ø4.5mm, H4mm","024.0001Z"],["Ø4.5mm, H6mm","024.0002Z"],
    ["Ø5mm, H2mm","024.4222Z"],["Ø5mm, H4mm","024.4224Z"],["Ø5mm, H6mm","024.4226Z"],
    ["Ø6mm, H2mm","024.0003Z"],["Ø6mm, H4mm","024.0004Z"],["Ø6mm, H6mm","024.0005Z"],
    ["Ø6.5mm, H2mm","024.4242Z"],["Ø6.5mm, H4mm","024.4244Z"],["Ø6.5mm, H6mm","024.4246Z"]
  ]}
],
"Impression Components": [
  {label:"SC", source:"Straumann 2022/2023 p.108", material:"TAN / POM", items:[
    ["Open Tray, short, 17.1mm","025.0021"],["Open Tray, long, 24mm","025.0022"],
    ["Closed Tray, long, 19mm","025.0020"],["Closed Tray, short, 12mm","025.0062"],
    ["Implant Analog, 11mm","025.0023"],["Scanbody, Ø3.5mm, H10mm","025.0025"],
    ["Repositionable Analog, 17mm","025.0024"]
  ]},
  {label:"NC", source:"Straumann 2022/2023 p.112", material:"TAN / POM", items:[
    ["Open Tray, engaging, short, 16.5mm","025.2202"],["Open Tray, non-engaging, short, 16.5mm","025.0057"],
    ["Open Tray, engaging, long, 30mm","025.2205"],["Open Tray, non-engaging, long, 30mm","025.0058"],
    ["Closed Tray, 12.3mm","025.2201"],["Implant Analog, 11mm","025.2101"],
    ["Scanbody, Ø3.5mm, H10mm","025.2915"],["Repositionable Analog, 17mm","025.2102"],
    ["Bite Registration Aid, short, H8mm (4/pkg)","025.2208-04"],["Bite Registration Aid, long, H12mm (4/pkg)","025.2212-04"]
  ]}
],
"Temporary Abutments": [
  {label:"SC — for crowns, oval (incl. screw 025.0031)", source:"Straumann 2022/2023 p.108", material:"TAN", items:[
    ["GH 1mm","024.0011"],["GH 2mm","024.0015"],["GH 3mm","024.0016"]
  ]},
  {label:"NC — VITA CAD-Temp® (incl. screw 025.2908)", source:"Straumann 2022/2023 p.113", material:"PMMA / TAN", items:[
    ["Ø5mm, H11mm","024.2372"]
  ]},
  {label:"NC — for crowns/bridges (incl. screw 025.2900)", source:"Straumann 2022/2023 p.113", material:"TAN", items:[
    ["Crown, Ø3.5mm, H11mm","024.2371"],["Bridge, Ø3.5mm, H11mm","024.2375"]
  ]},
  {label:"NC — Immediate Temporary Abutment", source:"Straumann 2022/2023 p.113", material:"TAN", items:[
    ["GH 1mm","022.0115S"],["GH 2mm","022.0116S"],["GH 3mm","022.0117S"]
  ]},
  {label:"Accessories (for NC Immediate Temporary Abutment)", source:"Straumann 2022/2023 p.113", material:"PMMA", items:[
    ["Plastic Coping for Immediate Temp. Abutment (2/pkg)","023.0033V2"]
  ]}
],
"Anatomic & Cementable Abutments": [
  {label:"NC Anatomic Abutment (incl. screw 025.2900)", source:"Straumann 2022/2023 p.113", material:"Ti", items:[
    ["Straight, GH 2mm","022.2102"],["Straight, GH 3.5mm","022.2104"],
    ["Angled 15°, GH 2mm","022.2152"],["Angled 15°, GH 3.5mm","022.2154"]
  ]},
  {label:"NC Cementable Abutment, Ø3.5mm emergence (incl. screw 025.2908)", source:"Straumann 2022/2023 p.115", material:"Ti", items:[
    ["GH1/AH4mm","022.2311"],["GH2/AH4mm","022.2312"],["GH3/AH4mm","022.2313"],
    ["GH1/AH5.5mm","022.2315"],["GH2/AH5.5mm","022.2316"],["GH3/AH5.5mm","022.2317"]
  ]},
  {label:"NC Cementable Abutment, Ø5mm emergence (incl. screw 025.2908)", source:"Straumann 2022/2023 p.116", material:"Ti", items:[
    ["GH1/AH4mm","022.2321"],["GH2/AH4mm","022.2322"],["GH3/AH4mm","022.2323"],
    ["GH1/AH5.5mm","022.2325"],["GH2/AH5.5mm","022.2326"],["GH3/AH5.5mm","022.2327"]
  ]}
],
"Variobase & Gold Abutments": [
  {label:"NC Variobase® for Crown, Ø3.8mm/H3.5mm (incl. screw 025.2900)", source:"Straumann 2022/2023 p.122", material:"TAN", items:[
    ["GH1mm","025.2921"],["GH2mm","022.0102"],["GH3mm","022.0104"]
  ]},
  {label:"NC Variobase® for Crown, Ø3.8mm/H5.5mm (incl. screw 025.2900)", source:"Straumann 2022/2023 p.122", material:"TAN", items:[
    ["GH1mm","022.0027"],["GH2mm","022.0106"],["GH3mm","022.0108"]
  ]},
  {label:"NC Variobase® for Crown AS (incl. screw 025.0055)", source:"Straumann 2022/2023 p.122", material:"TAN", items:[
    ["Ø4.1mm, H3.5mm, GH1mm","022.0084"],["Ø4.1mm, H5.5mm, GH1mm","022.0093"]
  ]},
  {label:"NC Variobase® for Bridge/Bar Cylindrical (incl. screw 025.2926 + Cementation Aid 2)", source:"Straumann 2022/2023 p.122", material:"TAN", items:[
    ["Ø4.5mm, H3.5mm","022.0110"]
  ]},
  {label:"NC Variobase® C — Dentsply® Sirona® (incl. screw 025.2900)", source:"Straumann 2022/2023 p.122", material:"TAN", items:[
    ["Ø3.8mm, H4.7mm, GH1mm","022.0043"]
  ]},
  {label:"NC Gold Abutment — crown (incl. screw 025.2900)", source:"Straumann 2022/2023 p.121", material:"Ceramicor® / POM", items:[
    ["H3.7mm","022.2410"]
  ]},
  {label:"RC Variobase® for Crown (incl. screw)", source:"Straumann 2022/2023 p.149", material:"TAN", items:[
    ["Ø4.5mm, AH3.5mm, GH2mm","022.0103"]
  ]},
  {label:"RC Variobase® for Crown AS (incl. screw)", source:"Straumann 2022/2023 p.149", material:"TAN", items:[
    ["Ø4.7mm, AH3.5mm, GH1mm","022.0087"],["Ø4.7mm, AH5.5mm, GH1mm","022.0096"]
  ]},
  {label:"RC Variobase® C", source:"Straumann 2022/2023 p.149", material:"TAN", items:[
    ["GH1mm","022.0044"]
  ]}
],
"Screw-retained Abutments": [
  {label:"RC Screw-retained Abutment, straight 0°", source:"Straumann 2022/2023 p.152", material:"TAN", items:[
    ["Ø4.6mm, GH1.5mm","022.0132S"]
  ]}
],
"Replacement Screws": [
  {label:"NC Basal Screws", source:"Straumann 2022/2023 p.222", material:"TAN", items:[
    ["For Anatomic/Variobase Crown/Variobase C/Gold/bar Abutments, 7.9mm","025.2900"],
    ["For IPS e.max®/CARES® Zirconia Abutments, 8.9mm","025.2906"],
    ["For VITA CAD-Temp®/Cementable Abutments, 7.9mm","025.2908"]
  ]},
  {label:"NC/RC Shared Screws", source:"Straumann 2022/2023 p.119", material:"TAN", items:[
    ["SRBB Bone Level Screw (Variobase Bridge/Bar Cylindrical), 7.9mm","025.2926"],
    ["Basal Screw AS (Variobase Crown AS), 7.9mm","025.0055"],
    ["Occlusal Screw (Ti/Gold/Burn-out/Variobase copings, Screw-retained Abutments), 3.7mm","023.4763"]
  ]},
  {label:"SC Screws", source:"Straumann 2022/2023 p.108", material:"TAN / SST", items:[
    ["Basal Screw B, 7mm","025.0031"],["Polishing Aid","025.0029"]
  ]}
]
};
