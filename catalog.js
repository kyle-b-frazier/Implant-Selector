/* =========================================================================
   CATALOG DATA — every implant system's parts, article numbers (REFs) and
   display grouping, plus the Favorites preset and the system registry.
   Loaded by index.html as a plain script before the app code, so all of
   these are globals. Product data only: the rules for which part fits
   which implant live in compatibility.js.
   ========================================================================= */
const CATALOG_BLC = {
"Implants": [
  {label:"Ø 3.3mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","035.9008S"],["10mm","035.9010S"],["12mm","035.9012S"],["14mm","035.9014S"],["16mm","035.9016S"],["18mm","035.9018S"]
  ]},
  {label:"Ø 3.75mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.9206S"],["8mm","035.9208S"],["10mm","035.9210S"],["12mm","035.9212S"],["14mm","035.9214S"],["16mm","035.9216S"],["18mm","035.9218S"]
  ]},
  {label:"Ø 4.0mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.9306S"],["8mm","035.9308S"],["10mm","035.9310S"],["12mm","035.9312S"],["14mm","035.9314S"],["16mm","035.9316S"],["18mm","035.9318S"]
  ]},
  {label:"Ø 4.5mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.9406S"],["8mm","035.9408S"],["10mm","035.9410S"],["12mm","035.9412S"],["14mm","035.9414S"],["16mm","035.9416S"],["18mm","035.9418S"]
  ]},
  {label:"Ø 5.0mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.9506S"],["8mm","035.9508S"],["10mm","035.9510S"],["12mm","035.9512S"],["14mm","035.9514S"],["16mm","035.9516S"],["18mm","035.9518S"]
  ]},
  {label:"Ø 5.5mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.9706S"],["8mm","035.9708S"],["10mm","035.9710S"],["12mm","035.9712S"],["14mm","035.9714S"],["16mm","035.9716S"]
  ]},
  {label:"Ø 6.5mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.9806S"],["8mm","035.9808S"],["10mm","035.9810S"],["12mm","035.9812S"],["14mm","035.9814S"],["16mm","035.9816S"]
  ]},
  {label:"Ø 3.3mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","035.8008S"],["10mm","035.8010S"],["12mm","035.8012S"],["14mm","035.8014S"],["16mm","035.8016S"],["18mm","035.8018S"]
  ]},
  {label:"Ø 3.75mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.8206S"],["8mm","035.8208S"],["10mm","035.8210S"],["12mm","035.8212S"],["14mm","035.8214S"],["16mm","035.8216S"],["18mm","035.8218S"]
  ]},
  {label:"Ø 4.0mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.8306S"],["8mm","035.8308S"],["10mm","035.8310S"],["12mm","035.8312S"],["14mm","035.8314S"],["16mm","035.8316S"],["18mm","035.8318S"]
  ]},
  {label:"Ø 4.5mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.8406S"],["8mm","035.8408S"],["10mm","035.8410S"],["12mm","035.8412S"],["14mm","035.8414S"],["16mm","035.8416S"],["18mm","035.8418S"]
  ]},
  {label:"Ø 5.0mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.8506S"],["8mm","035.8508S"],["10mm","035.8510S"],["12mm","035.8512S"],["14mm","035.8514S"],["16mm","035.8516S"],["18mm","035.8518S"]
  ]},
  {label:"Ø 5.5mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.8706S"],["8mm","035.8708S"],["10mm","035.8710S"],["12mm","035.8712S"],["14mm","035.8714S"],["16mm","035.8716S"]
  ]},
  {label:"Ø 6.5mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["6mm","035.8806S"],["8mm","035.8808S"],["10mm","035.8810S"],["12mm","035.8812S"],["14mm","035.8814S"],["16mm","035.8816S"]
  ]}
],

"Closure Caps": [
  {label:"RB Closure Cap", material:"Ti / TAN", items:[
    ["0.4mm, Titanium","064.4100S"],["0.4mm, H 2mm, TAN","064.4101S"]
  ]},
  {label:"WB Closure Cap", material:"Ti / TAN", items:[
    ["0.5mm, Titanium","064.8102S"],["0.5mm, H 2mm, TAN","064.8103S"]
  ]}
],

"Healing Abutments — Crown": [
  {label:"RB/WB, Ø3.8mm platform (Crown ∅4mm)", material:"TAN", items:[
    ["GH 1.5 / AH 2mm (3.5mm)","064.4202S"],["GH 1.5 / AH 4mm (5.5mm)","064.4203S"],["GH 1.5 / AH 6mm (7.5mm)","064.4238S"],
    ["GH 2.5 / AH 2mm (4.5mm)","064.4204S"],["GH 2.5 / AH 4mm (6.5mm)","064.4205S"],["GH 2.5 / AH 6mm (8.5mm)","064.4239S"],
    ["GH 3.5 / AH 2mm (5.5mm)","064.4206S"],["GH 3.5 / AH 4mm (7.5mm)","064.4207S"],["GH 3.5 / AH 6mm (9.5mm)","064.4240S"]
  ]},
  {label:"RB/WB, Ø4.5mm platform (Crown ∅5mm)", material:"TAN", items:[
    ["GH 1.5 / AH 2mm (3.5mm)","064.4212S"],["GH 1.5 / AH 4mm (5.5mm)","064.4213S"],["GH 1.5 / AH 6mm (7.5mm)","064.4241S"],
    ["GH 2.5 / AH 2mm (4.5mm)","064.4214S"],["GH 2.5 / AH 4mm (6.5mm)","064.4215S"],["GH 2.5 / AH 6mm (8.5mm)","064.4243S"],
    ["GH 3.5 / AH 2mm (5.5mm)","064.4216S"],["GH 3.5 / AH 4mm (7.5mm)","064.4217S"],["GH 3.5 / AH 6mm (9.5mm)","064.4244S"]
  ]},
  {label:"RB/WB, Ø6.0mm platform (Crown ∅6.5mm)", material:"TAN", items:[
    ["GH 1.5 / AH 2mm (3.5mm)","064.4222S"],["GH 1.5 / AH 4mm (5.5mm)","064.4223S"],
    ["GH 2.5 / AH 2mm (4.5mm)","064.4224S"],["GH 2.5 / AH 4mm (6.5mm)","064.4225S"],
    ["GH 3.5 / AH 2mm (5.5mm)","064.4226S"],["GH 3.5 / AH 4mm (7.5mm)","064.4227S"]
  ]},
  {label:"WB, Wide Profile ∅6.0mm (wide molar crown)", material:"TAN", items:[
    ["GH 0.75 / AH 2mm (2.75mm)","064.8201S"],["GH 0.75 / AH 4mm (4.75mm)","064.8202S"],
    ["GH 1.5 / AH 2mm (3.5mm)","064.8212S"],["GH 1.5 / AH 4mm (5.5mm)","064.8213S"]
  ]},
  {label:"WB, Wide Profile ∅7.5mm (wide molar crown)", material:"TAN", items:[
    ["GH 0.75 / AH 2mm (2.75mm)","064.8203S"],["GH 0.75 / AH 4mm (4.75mm)","064.8204S"],
    ["GH 1.5 / AH 2mm (3.5mm)","064.8214S"],["GH 1.5 / AH 4mm (5.5mm)","064.8215S"]
  ]}
],

"Healing Abutments — Bridge": [
  {label:"RB/WB, Ø4.5mm platform (Bridge/Bar ∅5mm)", material:"Titanium", items:[
    ["GH 1.5 / AH 2mm (3.5mm)","064.4232S"],["GH 1.5 / AH 4mm (5.5mm)","064.4233S"]
  ]}
],

"Anatomic Healing Abutments XC": [
  {label:"RB/WB S shape, Ø3.8mm", material:"PEEK / TAN", items:[
    ["GH 1.5, H 4.5mm","064.4432S"],["GH 2.5, H 5.5mm","064.4433S"]
  ]},
  {label:"RB/WB S1 shape, Ø3.8mm", material:"PEEK / TAN", items:[
    ["GH 1.5, H 4.5mm","064.4514S"],["GH 2.5, H 5.5mm","064.4515S"]
  ]},
  {label:"RB/WB M shape, Ø3.8mm", material:"PEEK / TAN", items:[
    ["GH 1.5, H 4.5mm","064.4452S"],["GH 2.5, H 5.5mm","064.4453S"]
  ]},
  {label:"RB/WB XL shape, Ø4.5mm", material:"PEEK / TAN", items:[
    ["GH 1.5, H 4.5mm","064.4482S"],["GH 2.5, H 5.5mm","064.4483S"]
  ]},
  {label:"WB XL shape, Ø5.5mm", material:"PEEK / TAN",
    note:"Wide Base (WB) implants only — on an RB implant the connection would overhang the implant shoulder.",
    items:[
    ["GH 1.5, H 4.5mm","064.8482S"],["GH 2.5, H 5.5mm","064.4510S"]
  ]},
  {label:"WB XL shape, Ø6.5mm", material:"PEEK / TAN",
    note:"Wide Base (WB) implants only. Straumann recalled 2025 lots of 064.4522S/064.4523S whose blister labels wrongly read RB/WB — the outer carton is correct.",
    items:[
    ["GH 1.5, H 4.5mm","064.4522S"],["GH 2.5, H 5.5mm","064.4523S"]
  ]}
],

"Impression Components": [
  {label:"RB/WB — for Crown", material:"TAN", items:[
    ["Open Tray, short, 16.5mm","065.0031"],["Open Tray, long, 24mm","065.0033"],["Closed Tray, 13mm","065.4310"]
  ]},
  {label:"RB/WB — for Bridge/Bar", material:"TAN", items:[
    ["Open Tray, short, 16.5mm","065.0146"],["Open Tray, long, 24mm","065.0148"],["Closed Tray, 13mm","065.0150"]
  ]},
  {label:"WB", material:"TAN", items:[
    ["Open Tray, short, 16.5mm","065.0032"],["Open Tray, long, 24mm","065.0034"],["Closed Tray, 13mm","065.4810"]
  ]}
],

"Analogs & Digital Impression": [
  {label:"Implant Analogs", material:"TAN", items:[
    ["RB Implant Analog, 12mm","065.0021"],["WB Implant Analog, 12mm","065.0022"],
    ["RB Repositionable Analog, 17mm","065.0023"],["WB Repositionable Analog, 17mm","065.0024"]
  ]},
  {label:"Digital Scan Components", material:"SST / TAN", items:[
    ["Scanbody RB/WB, ∅4.0mm, H13mm","065.0103"],["ScanPost S RB/WB, L (Dentsply Sirona)","065.0038"]
  ]}
],

"Temporary Abutments": [
  {label:"VITA CAD-Temp®", material:"PMMA / TAN", items:[
    ["RB/WB ∅3.8mm, GH 1.5mm","064.4361"],["RB/WB ∅4.5mm, GH 1.5mm","064.4371"],["WB ∅5.5mm, GH 1.5mm","064.4390"]
  ]},
  {label:"For Crowns — RB/WB ∅3.8mm", material:"TAN", items:[
    ["GH 1.5mm","064.4362"],["GH 2.5mm","064.4363"],["GH 3.5mm","064.4364"]
  ]},
  {label:"For Crowns — RB/WB ∅4.5mm", material:"TAN", items:[
    ["GH 1.5mm","064.4372"],["GH 2.5mm","064.4373"],["GH 3.5mm","064.4374"]
  ]},
  {label:"For Crowns — RB/WB ∅6.0mm", material:"TAN", items:[
    ["GH 2.5mm","064.4382"],["GH 3.5mm","064.4383"]
  ]},
  {label:"For Crowns — WB ∅5.5mm", material:"TAN", items:[
    ["GH 0.75mm","064.4391"],["GH 1.5mm","064.4392"]
  ]},
  {label:"For Bridge/Bar — RB/WB ∅4.5mm", material:"TAN", items:[
    ["GH 1.5 / AH 10mm","064.4352"]
  ]},
  {label:"Immediate Temporary Abutments (sterile) — ∅3.8mm", material:"TAN", items:[
    ["GH 1.5mm, sterile","064.4322S"],["GH 2.5mm, sterile","064.4323S"],["GH 3.5mm, sterile","064.4324S"]
  ]},
  {label:"Immediate Temporary Abutments (sterile) — ∅4.5mm", material:"TAN", items:[
    ["GH 1.5mm, sterile","064.4332S"],["GH 2.5mm, sterile","064.4333S"],["GH 3.5mm, sterile","064.4334S"]
  ]},
  {label:"Accessories", material:"PMMA", items:[
    ["Plastic Coping for Immediate Temp. Abutment (2 pcs)","023.0033V2"]
  ]}
],

"Replacement Screws": [
  {label:"Basal & Occlusal Screws", material:"TAN", items:[
    ["RB/WB Basal Screw, 6.1mm","065.0036"],
    ["RB/WB Basal Screw AS, 6.5mm (AS driver only)","065.0037"],
    ["Occlusal Screw, 3.7mm","023.4763"]
  ]}
],

"Anatomic Abutments": [
  {label:"RB/WB Anatomic Abutment", material:"TAN", items:[
    ["Straight, GH 2.5mm","062.4103"],["Straight, GH 3.5mm","062.4104"],
    ["Angled 17°, GH 2.5mm","062.4153"],["Angled 17°, GH 3.5mm","062.4154"]
  ]}
],

"Gold Abutments": [
  {label:"RB/WB Gold Abutment (incl. screw 065.0036)", material:"Ceramicor® / POM", items:[
    ["Crown, ∅3.8mm, GH 1.5mm","062.4410"],["Crown, ∅4.5mm, GH 1.5mm","062.4420"],
    ["Bridge/Bar, ∅4.5mm, GH 1.5mm","062.4430"]
  ]},
  {label:"WB Gold Abutment", material:"Ceramicor® / POM", items:[
    ["Crown, ∅5.5mm, GH 1.5mm","062.8410"]
  ]}
],

"Variobase® for Crown": [
  {label:"RB/WB ∅3.8mm — incl. screw, AH 5.5mm", material:"TAN", items:[
    ["GH 1.5mm","062.4934"],["GH 2.5mm","062.4935"],["GH 3.5mm","062.4936"]
  ]},
  {label:"RB/WB ∅4.5mm — incl. screw, AH 5.5mm", material:"TAN", items:[
    ["GH 1.5mm","062.4944"],["GH 2.5mm","062.4945"],["GH 3.5mm","062.4946"]
  ]},
  {label:"WB ∅5.5mm — incl. screw, AH 5.5mm", material:"TAN", items:[
    ["GH 0.75mm","062.4953"],["GH 1.5mm","062.4954"]
  ]},
  {label:"Burn-out Copings", material:"POM", items:[
    ["∅3.8mm, AH 5.5mm","065.0014"],["∅4.5mm, AH 5.5mm","065.0015"],["WB ∅5.5mm, AH 5.5mm","065.0016"]
  ]}
],

"Variobase® for Crown AS": [
  {label:"Abutments — incl. screw, AH 5.5mm", material:"TAN", items:[
    ["RB/WB ∅4.5mm, GH 1.5mm","062.4972"],["WB ∅5.5mm, GH 1.5mm","062.4971"]
  ]},
  {label:"Burn-out Copings — 25°", material:"POM", items:[
    ["∅4.5mm, AH 5.5mm","065.0018"],["WB ∅5.5mm, AH 5.5mm","065.0019"]
  ]}
],

"Variobase® for Bridge/Bar Cylindrical": [
  {label:"RB/WB ∅4.5mm — incl. screw + Cementation Aid 3", material:"TAN", items:[
    ["GH 1.5 / AH 3.5mm","062.4961"]
  ]},
  {label:"Burn-out Coping", material:"POM", items:[
    ["∅4.5mm, AH 3.5mm — single","065.0017"],["∅4.5mm, AH 3.5mm (4 pack)","065.0017V4"]
  ]}
],

"Variobase® XC for Crown": [
  {label:"∅3.8mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5017"],["GH 2.5mm","062.5018"],["GH 3.5mm","062.5019"]
  ]},
  {label:"∅4.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5020"],["GH 2.5mm","062.5021"],["GH 3.5mm","062.5022"]
  ]},
  {label:"WB ∅5.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 0.75mm","062.5023"],["GH 1.5mm","062.5024"],["GH 2.5mm","062.5059"]
  ]},
  {label:"WB ∅6.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5061"],["GH 2.5mm","062.5062"]
  ]},
  {label:"Burn-out Copings", material:"POM", items:[
    ["∅3.8mm","065.0106"],["∅4.5mm","065.0107"],["WB ∅5.5mm","065.0108"],["WB ∅6.5mm","065.0124"]
  ]}
],

"Variobase® XC for Crown AS": [
  {label:"∅4.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5009"],["GH 2.5mm","062.5010"],["GH 3.5mm","062.5011"]
  ]},
  {label:"WB ∅5.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 0.75mm","062.5012"],["GH 1.5mm","062.5013"],["GH 2.5mm","062.5060"]
  ]},
  {label:"WB ∅6.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5063"],["GH 2.5mm","062.5064"]
  ]},
  {label:"Burn-out Copings", material:"POM", items:[
    ["∅4.5mm","065.0112"],["WB ∅5.5mm","065.0113"],["WB ∅6.5mm","065.0126"]
  ]}
],

"Variobase® XC for Bridge/Bar": [
  {label:"∅3.8mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5065"],["GH 2.5mm","062.5066"],["GH 3.5mm","062.5067"]
  ]},
  {label:"∅4.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5068"],["GH 2.5mm","062.5069"],["GH 3.5mm","062.5070"]
  ]},
  {label:"WB ∅5.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 0.75mm","062.5071"],["GH 1.5mm","062.5072"]
  ]},
  {label:"Burn-out Copings", material:"POM", items:[
    ["∅3.8mm","065.0131"],["∅4.5mm","065.0132"],["WB ∅5.5mm","065.0133"]
  ]}
],

"Variobase® XC for Bridge/Bar AS": [
  {label:"∅4.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 1.5mm","062.5073"],["GH 2.5mm","062.5074"],["GH 3.5mm","062.5075"]
  ]},
  {label:"WB ∅5.5mm — incl. screw, AH 7mm", material:"TAN", items:[
    ["GH 0.75mm","062.5076"],["GH 1.5mm","062.5077"]
  ]},
  {label:"Burn-out Copings", material:"POM", items:[
    ["∅4.5mm","065.0135"],["WB ∅5.5mm","065.0136"]
  ]}
],

"Variobase® C (Dentsply Sirona)": [
  {label:"∅3.8mm — incl. screw 065.0036", material:"TAN", items:[
    ["GH 1.5mm","062.4981"],["GH 2.5mm","062.5028"],["GH 3.5mm","062.5029"]
  ]},
  {label:"∅4.5mm — incl. screw 065.0036", material:"TAN", items:[
    ["GH 1.5mm","062.4982"],["GH 2.5mm","062.5030"],["GH 3.5mm","062.5031"]
  ]},
  {label:"WB ∅5.5mm — incl. screw 065.0036", material:"TAN", items:[
    ["GH 0.75mm","062.5032"],["GH 1.5mm","062.4983"]
  ]}
],

"Screw-retained / Multi-unit Abutments": [
  {label:"Straight, angulation 0° (sterile)", material:"TAN", items:[
    ["∅4.6mm, GH 1.5mm","062.4722S"],["∅4.6mm, GH 2.5mm","062.4723S"],
    ["∅4.6mm, GH 3.5mm","062.4724S"],["∅4.6mm, GH 4.5mm","062.4725S"]
  ]},
  {label:"Angled 17° (sterile)", material:"TAN", items:[
    ["∅4.6mm, GH 3.5mm","062.4733S"],["∅4.6mm, GH 4.5mm","062.4734S"],["∅4.6mm, GH 5.5mm","062.4735S"]
  ]},
  {label:"Angled 30° (sterile)", material:"TAN", items:[
    ["∅4.6mm, GH 3.5mm","062.4743S"],["∅4.6mm, GH 4.5mm","062.4744S"],["∅4.6mm, GH 5.5mm","062.4745S"]
  ]},
  {label:"Plan Abutments (try-in)", material:"POM", items:[
    ["0°, GH 1.5–4.5mm (4 pack)","025.0073V4"],["17°, GH 3.5–5.5mm (4 pack)","025.0074V4"],["30°, GH 3.5–5.5mm (4 pack)","025.0075V4"]
  ]},
  {label:"Impression Posts — abutment level (engaging)", material:"TAN / POM", items:[
    ["Open Tray, ∅4.6mm","025.2244"],["Closed Tray, ∅4.6mm","025.2246"]
  ]},
  {label:"Impression Posts — multi-unit (non-engaging)", material:"TAN / POM", items:[
    ["Open Tray, ∅4.6mm","025.0012"],["Closed Tray, ∅4.6mm","025.0014"]
  ]},
  {label:"Digital & Analogs", material:"SST / TAN", items:[
    ["Scanbody, ∅4.6mm (incl. retention screw)","025.0081"],["Repositionable Analog, ∅4.6mm","025.0008"],
    ["Analog, straight","023.4756"],["Analog, edentulous straight","025.0050"],["Analog, angled 17°/30°","023.4757"]
  ]},
  {label:"Lab Auxiliaries", material:"TAN / SST", items:[
    ["Polishing Aid","025.0005"],["Polishing Aid (4 pack)","025.0005V4"],
    ["Lab Processing Screw, 20mm","025.0006"],["Lab Processing Screw, 10mm","025.0052"]
  ]},
  {label:"Protective Caps (4 pack, PEEK/TAN)", material:"PEEK / TAN", items:[
    ["H 5.1mm, ∅5.0mm","024.4323-04"],["H 6.6mm, ∅5.0mm","024.4324-04"],
    ["H 8.1mm, ∅5.0mm","024.4325-04"],["H 4.5mm, wide","024.0020-04"]
  ]},
  {label:"Copings & Coping Auxiliaries", material:"TAN / Ti / Ceramicor® / POM", items:[
    ["Variobase B/B Cyl. Coping (+screw+Cem. Aid 3)","023.0028"],
    ["Burn-out Coping (single)","023.0032"],["Burn-out Coping (4 pack)","023.0032V4"],
    ["Variobase XC Crown Coping","023.0038"],["Variobase XC Bridge/Bar Coping","023.0040"],
    ["Variobase XC Bridge/Bar AS Coping","023.0041"],
    ["Ti Coping, crown, H11mm","023.4747"],["Ti Coping, bridge, H11mm","023.4751"],
    ["Temporary Coping, crown, H11.5mm","024.0023"],["Temporary Coping, bridge, H11.5mm","024.0024"],
    ["Gold Coping, crown","023.4753"],["Gold Coping, bridge","023.4754"],
    ["Bar Gold Coping","023.4755"],["Bar Ti Coping","023.4752"],["Bar Burn-out Coping","023.4758"]
  ]},
  {label:"Auxiliary Parts", material:"TAV/Ti / TAN / SST", items:[
    ["Straumann Planning Guide (Pro Arch)","026.0016"],["Transfer & Alignment Pin","025.0009"],
    ["Hexagonal Screwdriver, 30mm","046.421"]
  ]}
],

"Pre-milled Abutment Blanks": [
  {label:"RB/WB", material:"TAN", items:[
    ["MEDENTiKA® Holder, ∅11.5mm","062.4601"],["MEDENTiKA® Holder, ∅15.8mm","062.4602"],["M-Series, ∅12mm","062.4603"]
  ]},
  {label:"WB", material:"TAN", items:[
    ["MEDENTiKA® Holder, ∅11.5mm","062.4605"],["MEDENTiKA® Holder, ∅15.8mm","062.4606"],["M-Series, ∅12mm","062.4607"]
  ]}
],

"Novaloc® Abutments": [
  {label:"Straight, angulation 0°, ∅3.8mm", material:"TAV / ADLC", items:[
    ["GH 1.5mm","062.4501"],["GH 2.5mm","062.4502"],["GH 3.5mm","062.4503"],
    ["GH 4.5mm","062.4504"],["GH 5.5mm","062.4505"],["GH 6.5mm","062.4506"]
  ]},
  {label:"Angled 15°, ∅3.8mm", material:"TAV / ADLC", items:[
    ["GH 2.5mm","062.4507"],["GH 3.5mm","062.4508"],["GH 4.5mm","062.4509"],
    ["GH 5.5mm","062.4510"],["GH 6.5mm","062.4511"],["GH 7.5mm","062.4512"]
  ]},
  {label:"Impression / Model Fabrication", material:"PEEK / Al", items:[
    ["Impression Coping, red (4 pcs)","2010.722-NOV"],["Model Analog, blue (4 pcs)","2010.721-NOV"],
    ["Model Analog, angled 15°, red (4 pcs)","2010.720-NOV"]
  ]},
  {label:"Processing Packages", material:"Ti / PEEK / POM / Silicone", items:[
    ["Processing Package, Titanium","2010.601-NOV"],["Processing Package, PEEK","2010.611-NOV"]
  ]},
  {label:"Matrix Housings", material:"Ti / POM / PEEK", items:[
    ["Matrix Housing, Titanium (4 pcs)","2010.701-NOV"],["Matrix Housing, PEEK (4 pcs)","2010.702-NOV"],
    ["Matrix Housing, Extended (4 pcs)","2010.703-NOV"]
  ]},
  {label:"Retention Inserts (4 pcs)", material:"PEEK", items:[
    ["Red — extra-light, ~300g","2010.710-NOV"],["White — light, ~750g","2010.711-NOV"],
    ["Yellow — medium, ~1200g","2010.712-NOV"],["Green — strong, ~1650g","2010.713-NOV"],
    ["Blue — extra-strong, ~2050g","2010.714-NOV"],["Black — ultra-strong, ~2450g","2010.715-NOV"]
  ]},
  {label:"Tools & Auxiliaries", material:"POM / Silicone / Al / SST", items:[
    ["Equipment Box (3 instruments)","2010.101-NOV"],["Block Out Spacer, white (4 pcs)","2010.723-NOV"],
    ["Processing Collar, white (10 pcs)","2010.724-NOV"],["Processing Insert, white (4 pcs)","2010.725-NOV"],
    ["Processing Insert Removal Instrument","2010.731-NOV"],["Retention Insert Instrument","2010.741-NOV"],
    ["Matrix Housing Extraction Instrument","2010.751-NOV"]
  ]}
],

"Surgical Instruments": [
  {label:"Modular Cassette, A Module — core tray", material:"SST", items:[
    ["Straumann® Modular Cassette, A Module","041.761"],["A Module Ratchet Tray","041.766"],
    ["Ratchet","046.119"],["Torque Control Device","066.1100"],["Holding Key","046.064"],
    ["Grommet Tray, 3 small + 3 large","041.764"],["Grommet Tray, 6 small","041.762"],
    ["A Module Ratchet w/ Torque Control Tray","041.791"],["Ratchet with Torque Control","046.821"]
  ]},
  {label:"SCS Screwdrivers", material:"SST", items:[
    ["For Ratchet, extra-short","046.400"],["For Ratchet, short","046.401"],["For Ratchet, long","046.402"],
    ["For Handpiece, extra-short","046.410"],["For Handpiece, short","046.411"],["For Handpiece, long","046.412"]
  ]},
  {label:"Depth Gauge & Bone Profilers", material:"SST", items:[
    ["Implant Depth Gauge Tray","041.771"],["Implant Depth Gauge","066.2000"],
    ["BL Bone Profiler 1, ∅5.2mm","026.0022"],["BL Bone Profiler 2, ∅6.6mm","026.0023"],["BL Bone Profiler 3, ∅6mm","026.0024"],
    ["BLX/BLC Guiding Cylinder for Bone Profiler","066.0025S"]
  ]},
  {label:"Profile Drills (freehand)", material:"SST", items:[
    ["BLC/TLC Profile Drill, ∅3.3mm, L27mm","034.362"],["BLC/TLC Profile Drill, ∅3.75mm, L26mm","034.363"],
    ["BLC Profile Drill, ∅4.0mm, L26mm","034.364"],["BLC/TLC Profile Drill, ∅4.5mm, L26mm","034.365"],
    ["BLC Profile Drill, ∅5.0mm, L26mm","034.382"],["BLC/TLC Profile Drill, ∅5.5mm, L26mm","034.366"],
    ["BLC/TLC Profile Drill, ∅6.5mm, L26mm","034.367"]
  ]},
  {label:"VeloDrills™ — short (4–12mm implants)", material:"SST", items:[
    ["Pilot VeloDrill, ∅2.2mm","066.1301"],["VeloDrill, ∅2.8mm","066.1302"],["VeloDrill, ∅3.2mm","066.1303"],
    ["VeloDrill, ∅3.5mm","066.1304"],["VeloDrill, ∅3.7mm","066.1305"],["VeloDrill, ∅4.2mm","066.1306"],
    ["VeloDrill, ∅4.7mm","066.1307"],["VeloDrill, ∅5.2mm","066.1308"],["VeloDrill, ∅6.2mm","066.1309"]
  ]},
  {label:"VeloDrills™ — medium", material:"SST", items:[
    ["Pilot VeloDrill, ∅2.2mm","066.1501"],["VeloDrill, ∅2.8mm","066.1502"],["VeloDrill, ∅3.2mm","066.1503"],
    ["VeloDrill, ∅3.5mm","066.1504"],["VeloDrill, ∅3.7mm","066.1505"],["VeloDrill, ∅4.2mm","066.1506"],
    ["VeloDrill, ∅4.7mm","066.1507"],["VeloDrill, ∅5.2mm","066.1508"],["VeloDrill, ∅6.2mm","066.1509"]
  ]},
  {label:"VeloDrills™ — long (4–18mm implants)", material:"SST", items:[
    ["Pilot VeloDrill, ∅2.2mm","066.1701"],["VeloDrill, ∅2.8mm","066.1702"],["VeloDrill, ∅3.2mm","066.1703"],
    ["VeloDrill, ∅3.5mm","066.1704"],["VeloDrill, ∅3.7mm","066.1705"],["VeloDrill, ∅4.2mm","066.1706"],["VeloDrill, ∅4.7mm","066.1707"]
  ]},
  {label:"Depth Gauges (loose)", material:"SST", items:[
    ["∅2.2mm","046.799"],["∅2.8mm","046.800"],["∅3.2mm","046.801"],["∅3.5mm","046.802"],
    ["∅3.7mm","046.803"],["∅4.2mm","046.804"],["∅4.7mm","046.805"],["∅5.2mm","046.806"],["∅6.2mm","046.807"]
  ]},
  {label:"TorcFit™ Implant Drivers", material:"SST", items:[
    ["For Ratchet, short","066.4201"],["For Ratchet, medium","066.4207"],["For Ratchet, long","066.4202"],
    ["For Handpiece, short","066.4101"],["For Handpiece, medium","066.4107"],
    ["For Handpiece, long","066.4102"],["For Handpiece, extra-long","066.4108"]
  ]},
  {label:"Removal Kit & Misc.", material:"SST", items:[
    ["TorcFit™ Removal Tool, for Basal Screw","065.0007"],
    ["For TorcFit™ Basal Screw, LH, L27mm","065.0008"],["For TorcFit™ Basal Screw, LH, L21mm","065.0009"],
    ["Drill Extender","040.563"]
  ]},
  {label:"ProClean™ Cassettes & Parts", material:"SST / Silicone", items:[
    ["ProClean™ Cassette, iEXCEL BLC/TLC/BLX/TLX","041.800"],
    ["Grommet Pack, colored","041.812"],["Grommet Pack, transparent","041.813"]
  ]}
]
};
/* All-on-X Components: a convenience grouping for full-arch treatment
   planning. Every item here already exists in its home category above —
   nothing is removed from there. Assigned last so lookups elsewhere still
   resolve to an item's true home category. Each duplicated group is tagged
   with sourceCategory so its on-screen label always reads with its true,
   full component name (e.g. "Screw-retained / Multi-unit Abutments —
   Angled 30° (sterile)") instead of a bare "Angled 30° (sterile)". */
function withSource(groups, sourceCategory){
  return groups.map(g => ({...g, sourceCategory}));
}
CATALOG_BLC["All-on-X Components"] = [
  ...withSource(CATALOG_BLC["Screw-retained / Multi-unit Abutments"], "Screw-retained / Multi-unit Abutments"),
  ...withSource(CATALOG_BLC["Healing Abutments — Bridge"], "Healing Abutments — Bridge"),
  ...withSource(CATALOG_BLC["Variobase® for Bridge/Bar Cylindrical"], "Variobase® for Bridge/Bar Cylindrical"),
  ...withSource([CATALOG_BLC["Temporary Abutments"].find(g=>g.label==="For Bridge/Bar — RB/WB ∅4.5mm")], "Temporary Abutments")
];

/* =========================================================================
   STRAUMANN BLX — shares its ENTIRE prosthetic and surgical-instrument line
   with BLC (per the official iEXCEL catalog, section headers literally read
   "BLC AND BLX ..." throughout). Only the implants themselves differ. Source
   for BLX implants: same iEXCEL catalog, sections 1.1.2 (SLActive®) and
   1.1.4 (SLA®). */
const CATALOG_BLX = {
  ...CATALOG_BLC,
  "Implants": [
    {label:"Ø 3.5mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["8mm","061.3308"],["10mm","061.3310"],["12mm","061.3312"],["14mm","061.3314"],["16mm","061.3316"],["18mm","061.3318"]
    ]},
    {label:"Ø 3.75mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.4306"],["8mm","061.4308"],["10mm","061.4310"],["12mm","061.4312"],["14mm","061.4314"],["16mm","061.4316"],["18mm","061.4318"]
    ]},
    {label:"Ø 4.0mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.5306"],["8mm","061.5308"],["10mm","061.5310"],["12mm","061.5312"],["14mm","061.5314"],["16mm","061.5316"],["18mm","061.5318"]
    ]},
    {label:"Ø 4.5mm RB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.6306"],["8mm","061.6308"],["10mm","061.6310"],["12mm","061.6312"],["14mm","061.6314"],["16mm","061.6316"],["18mm","061.6318"]
    ]},
    {label:"Ø 5.0mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.7306"],["8mm","061.7308"],["10mm","061.7310"],["12mm","061.7312"],["14mm","061.7314"],["16mm","061.7316"],["18mm","061.7318"]
    ]},
    {label:"Ø 5.5mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.8306"],["8mm","061.8308"],["10mm","061.8310"],["12mm","061.8312"],["14mm","061.8314"],["16mm","061.8316"]
    ]},
    {label:"Ø 6.5mm WB — SLActive®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.9306"],["8mm","061.9308"],["10mm","061.9310"],["12mm","061.9312"],["14mm","061.9314"],["16mm","061.9316"]
    ]},
    {label:"Ø 3.5mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["8mm","061.3508"],["10mm","061.3510"],["12mm","061.3512"],["14mm","061.3514"],["16mm","061.3516"],["18mm","061.3518"]
    ]},
    {label:"Ø 3.75mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.4506"],["8mm","061.4508"],["10mm","061.4510"],["12mm","061.4512"],["14mm","061.4514"],["16mm","061.4516"],["18mm","061.4518"]
    ]},
    {label:"Ø 4.0mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.5506"],["8mm","061.5508"],["10mm","061.5510"],["12mm","061.5512"],["14mm","061.5514"],["16mm","061.5516"],["18mm","061.5518"]
    ]},
    {label:"Ø 4.5mm RB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.6506"],["8mm","061.6508"],["10mm","061.6510"],["12mm","061.6512"],["14mm","061.6514"],["16mm","061.6516"],["18mm","061.6518"]
    ]},
    {label:"Ø 5.0mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.7506"],["8mm","061.7508"],["10mm","061.7510"],["12mm","061.7512"],["14mm","061.7514"],["16mm","061.7516"],["18mm","061.7518"]
    ]},
    {label:"Ø 5.5mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.8506"],["8mm","061.8508"],["10mm","061.8510"],["12mm","061.8512"],["14mm","061.8514"],["16mm","061.8516"]
    ]},
    {label:"Ø 6.5mm WB — SLA®, Roxolid®", material:"Roxolid®", items:[
      ["6mm","061.9506"],["8mm","061.9508"],["10mm","061.9510"],["12mm","061.9512"],["14mm","061.9514"],["16mm","061.9516"]
    ]}
  ]
};

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
  {label:"Ø 2.9mm SC — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["10mm","021.0010"],["12mm","021.0012"],["14mm","021.0014"]
  ]},
  {label:"Ø 3.3mm NC — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","021.3308"],["10mm","021.3310"],["12mm","021.3312"],["14mm","021.3314"],["16mm","021.3316"],["18mm","021.3318"]
  ]},
  {label:"Ø 4.1mm RC — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","021.5308"],["10mm","021.5310"],["12mm","021.5312"],["14mm","021.5314"],["16mm","021.5316"],["18mm","021.5318"]
  ]},
  {label:"Ø 4.8mm RC — SLActive®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","021.7308"],["10mm","021.7310"],["12mm","021.7312"],["14mm","021.7314"],["16mm","021.7316"],["18mm","021.7318"]
  ]},
  {label:"Ø 2.9mm SC — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["10mm","021.0110"],["12mm","021.0112"],["14mm","021.0114"]
  ]},
  {label:"Ø 3.3mm NC — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","021.3508"],["10mm","021.3510"],["12mm","021.3512"],["14mm","021.3514"],["16mm","021.3516"],["18mm","021.3518"]
  ]},
  {label:"Ø 4.1mm RC — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","021.5508"],["10mm","021.5510"],["12mm","021.5512"],["14mm","021.5514"],["16mm","021.5516"],["18mm","021.5518"]
  ]},
  {label:"Ø 4.8mm RC — SLA®, Roxolid®", material:"Roxolid®", items:[
    ["8mm","021.7508"],["10mm","021.7510"],["12mm","021.7512"],["14mm","021.7514"],["16mm","021.7516"],["18mm","021.7518"]
  ]}
],
"Closure Caps": [
  {label:"SC", material:"Ti", items:[
    ["∅2.4mm, H0.5mm","024.0006S"]
  ]},
  {label:"NC", material:"Ti", items:[
    ["Small, H0mm","024.2100S"],["Small, H0mm (4/pkg)","024.2100S-04"],
    ["Large, H0.5mm","024.2105S"],["Large, H0.5mm (4/pkg)","024.2105S-04"]
  ]},
  {label:"RC", material:"Ti", items:[
    ["Small, H0mm","024.4100S"],["Small, H0mm (4/pkg)","024.4100S-04"],
    ["Large, H0.5mm","024.4105S"],["Large, H0.5mm (4/pkg)","024.4105S-04"]
  ]}
],
"Healing Abutments": [
  {label:"SC — conical, oval", material:"Ti", items:[
    ["H 2mm","024.0007S"],["H 3.5mm","024.0008S"],["H 5mm","024.0009S"],["H 6.5mm","024.0010S"]
  ]},
  {label:"NC — Ø3.6mm, conical", material:"Ti", items:[
    ["H 2mm","024.2222S"],["H 3.5mm","024.2224S"],["H 5mm","024.2226S"]
  ]},
  {label:"NC — Ø4.8mm, conical", material:"Ti", items:[
    ["H 2mm","024.2242S"],["H 3.5mm","024.2244S"],["H 5mm","024.2246S"]
  ]},
  {label:"NC — bottle-shaped", material:"Ti", items:[
    ["∅3.3mm, H3.5mm","024.2234S"],["∅3.3mm, H5mm","024.2236S"]
  ]},
  {label:"NC — Ø5mm, customizable", material:"PEEK", items:[
    ["H 7mm","024.2270S"]
  ]},
  {label:"NC — Ceramic", material:"ZrO2 / Ti", items:[
    ["Ø3.6mm, H2mm","024.2222Z"],["Ø3.6mm, H3.5mm","024.2224Z"],["Ø3.6mm, H5mm","024.2226Z"],
    ["Ø4.8mm, H2mm","024.2242Z"],["Ø4.8mm, H3.5mm","024.2244Z"],["Ø4.8mm, H5mm","024.2246Z"]
  ]},
  {label:"RC — Ø4.5/5/6/6.5mm, conical", material:"Ti", items:[
    ["Ø4.5mm, H2mm","024.0000S"],["Ø4.5mm, H4mm","024.0001S"],["Ø4.5mm, H6mm","024.0002S"],
    ["Ø5mm, H2mm","024.4222S"],["Ø5mm, H4mm","024.4224S"],["Ø5mm, H6mm","024.4226S"],
    ["Ø6mm, H2mm","024.0003S"],["Ø6mm, H4mm","024.0004S"],["Ø6mm, H6mm","024.0005S"],
    ["Ø6.5mm, H2mm","024.4242S"],["Ø6.5mm, H4mm","024.4244S"],["Ø6.5mm, H6mm","024.4246S"]
  ]},
  {label:"RC — bottle-shaped", material:"Ti", items:[
    ["Ø4.4mm, H4mm","024.4234S"],["Ø4.7mm, H6mm","024.4236S"]
  ]},
  {label:"RC — Ø7mm, customizable", material:"PEEK", items:[
    ["H 7mm","024.4270S"]
  ]},
  {label:"RC — Ceramic", material:"ZrO2 / Ti", items:[
    ["Ø4.5mm, H2mm","024.0000Z"],["Ø4.5mm, H4mm","024.0001Z"],["Ø4.5mm, H6mm","024.0002Z"],
    ["Ø5mm, H2mm","024.4222Z"],["Ø5mm, H4mm","024.4224Z"],["Ø5mm, H6mm","024.4226Z"],
    ["Ø6mm, H2mm","024.0003Z"],["Ø6mm, H4mm","024.0004Z"],["Ø6mm, H6mm","024.0005Z"],
    ["Ø6.5mm, H2mm","024.4242Z"],["Ø6.5mm, H4mm","024.4244Z"],["Ø6.5mm, H6mm","024.4246Z"]
  ]}
],
"Impression Components": [
  {label:"SC", material:"TAN / POM", items:[
    ["Open Tray, short, 17.1mm","025.0021"],["Open Tray, long, 24mm","025.0022"],
    ["Closed Tray, long, 19mm","025.0020"],["Closed Tray, short, 12mm","025.0062"],
    ["Implant Analog, 11mm","025.0023"],["Scanbody, Ø3.5mm, H10mm","025.0025"],
    ["Repositionable Analog, 17mm","025.0024"]
  ]},
  {label:"NC", material:"TAN / POM", items:[
    ["Open Tray, engaging, short, 16.5mm","025.2202"],["Open Tray, non-engaging, short, 16.5mm","025.0057"],
    ["Open Tray, engaging, long, 30mm","025.2205"],["Open Tray, non-engaging, long, 30mm","025.0058"],
    ["Closed Tray, 12.3mm","025.2201"],["Implant Analog, 11mm","025.2101"],
    ["Scanbody, Ø3.5mm, H10mm","025.2915"],["Repositionable Analog, 17mm","025.2102"],
    ["Bite Registration Aid, short, H8mm (4/pkg)","025.2208-04"],["Bite Registration Aid, long, H12mm (4/pkg)","025.2212-04"]
  ]}
],
"Temporary Abutments": [
  {label:"SC — for crowns, oval (incl. screw 025.0031)", material:"TAN", items:[
    ["GH 1mm","024.0011"],["GH 2mm","024.0015"],["GH 3mm","024.0016"]
  ]},
  {label:"NC — VITA CAD-Temp® (incl. screw 025.2908)", material:"PMMA / TAN", items:[
    ["Ø5mm, H11mm","024.2372"]
  ]},
  {label:"NC — for crowns/bridges (incl. screw 025.2900)", material:"TAN", items:[
    ["Crown, Ø3.5mm, H11mm","024.2371"],["Bridge, Ø3.5mm, H11mm","024.2375"]
  ]},
  {label:"NC — Immediate Temporary Abutment", material:"TAN", items:[
    ["GH 1mm","022.0115S"],["GH 2mm","022.0116S"],["GH 3mm","022.0117S"]
  ]},
  {label:"Accessories (for NC Immediate Temporary Abutment)", material:"PMMA", items:[
    ["Plastic Coping for Immediate Temp. Abutment (2/pkg)","023.0033V2"]
  ]}
],
"Anatomic & Cementable Abutments": [
  {label:"NC Anatomic Abutment (incl. screw 025.2900)", material:"Ti", items:[
    ["Straight, GH 2mm","022.2102"],["Straight, GH 3.5mm","022.2104"],
    ["Angled 15°, GH 2mm","022.2152"],["Angled 15°, GH 3.5mm","022.2154"]
  ]},
  {label:"NC Cementable Abutment, Ø3.5mm emergence (incl. screw 025.2908)", material:"Ti", items:[
    ["GH1/AH4mm","022.2311"],["GH2/AH4mm","022.2312"],["GH3/AH4mm","022.2313"],
    ["GH1/AH5.5mm","022.2315"],["GH2/AH5.5mm","022.2316"],["GH3/AH5.5mm","022.2317"]
  ]},
  {label:"NC Cementable Abutment, Ø5mm emergence (incl. screw 025.2908)", material:"Ti", items:[
    ["GH1/AH4mm","022.2321"],["GH2/AH4mm","022.2322"],["GH3/AH4mm","022.2323"],
    ["GH1/AH5.5mm","022.2325"],["GH2/AH5.5mm","022.2326"],["GH3/AH5.5mm","022.2327"]
  ]}
],
"Variobase & Gold Abutments": [
  {label:"NC Variobase® for Crown, Ø3.8mm/H3.5mm (incl. screw 025.2900)", material:"TAN", items:[
    ["GH1mm","025.2921"],["GH2mm","022.0102"],["GH3mm","022.0104"]
  ]},
  {label:"NC Variobase® for Crown, Ø3.8mm/H5.5mm (incl. screw 025.2900)", material:"TAN", items:[
    ["GH1mm","022.0027"],["GH2mm","022.0106"],["GH3mm","022.0108"]
  ]},
  {label:"NC Variobase® for Crown AS (incl. screw 025.0055)", material:"TAN", items:[
    ["Ø4.1mm, H3.5mm, GH1mm","022.0084"],["Ø4.1mm, H5.5mm, GH1mm","022.0093"]
  ]},
  {label:"NC Variobase® for Bridge/Bar Cylindrical (incl. screw 025.2926 + Cementation Aid 2)", material:"TAN", items:[
    ["Ø4.5mm, H3.5mm","022.0110"]
  ]},
  {label:"NC Variobase® C — Dentsply® Sirona® (incl. screw 025.2900)", material:"TAN", items:[
    ["Ø3.8mm, H4.7mm, GH1mm","022.0043"]
  ]},
  {label:"NC Gold Abutment — crown (incl. screw 025.2900)", material:"Ceramicor® / POM", items:[
    ["H3.7mm","022.2410"]
  ]},
  {label:"RC Variobase® for Crown (incl. screw)", material:"TAN", items:[
    ["Ø4.5mm, AH3.5mm, GH2mm","022.0103"]
  ]},
  {label:"RC Variobase® for Crown AS (incl. screw)", material:"TAN", items:[
    ["Ø4.7mm, AH3.5mm, GH1mm","022.0087"],["Ø4.7mm, AH5.5mm, GH1mm","022.0096"]
  ]},
  {label:"RC Variobase® C", material:"TAN", items:[
    ["GH1mm","022.0044"]
  ]}
],
"Screw-retained Abutments": [
  {label:"RC Screw-retained Abutment, straight 0°", material:"TAN", items:[
    ["Ø4.6mm, GH1.5mm","022.0132S"]
  ]}
],
"Replacement Screws": [
  {label:"NC Basal Screws", material:"TAN", items:[
    ["For Anatomic/Variobase Crown/Variobase C/Gold/bar Abutments, 7.9mm","025.2900"],
    ["For IPS e.max®/CARES® Zirconia Abutments, 8.9mm","025.2906"],
    ["For VITA CAD-Temp®/Cementable Abutments, 7.9mm","025.2908"]
  ]},
  {label:"NC/RC Shared Screws", material:"TAN", items:[
    ["SRBB Bone Level Screw (Variobase Bridge/Bar Cylindrical), 7.9mm","025.2926"],
    ["Basal Screw AS (Variobase Crown AS), 7.9mm","025.0055"],
    ["Occlusal Screw (Ti/Gold/Burn-out/Variobase copings, Screw-retained Abutments), 3.7mm","023.4763"]
  ]},
  {label:"SC Screws", material:"TAN / SST", items:[
    ["Basal Screw B, 7mm","025.0031"],["Polishing Aid","025.0029"]
  ]}
]
};


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
  {label:"3.0 Platform, Ø3.2mm", material:"Ti", items:[
    ["H 3mm","36794"],["H 5mm","36795"],["H 7mm","36796"]
  ]},
  {label:"3.0 Platform, Ø3.8mm", material:"Ti", items:[
    ["H 3mm","36797"],["H 5mm","36798"],["H 7mm","36799"]
  ]},
  {label:"NP, Ø3.6mm", material:"Ti", items:[
    ["H 3mm","36639"],["H 5mm","36640"],["H 7mm","36867"]
  ]},
  {label:"NP, Ø5.0mm", material:"Ti", items:[
    ["H 3mm","36641"],["H 5mm","36642"],["H 7mm","36868"]
  ]},
  {label:"RP, Ø3.6mm", material:"Ti", items:[
    ["H 3mm","36643"],["H 5mm","36644"],["H 7mm","36872"]
  ]},
  {label:"RP, Ø5.0mm", material:"Ti", items:[
    ["H 3mm","36645"],["H 5mm","36646"],["H 7mm","36873"]
  ]},
  {label:"RP, Ø6.0mm", material:"Ti", items:[
    ["H 3mm","36647"],["H 5mm","36648"],["H 7mm","36874"]
  ]},
  {label:"WP, Ø5.0mm", material:"Ti", items:[
    ["H 3mm","37813"],["H 5mm","37814"]
  ]},
  {label:"WP, Ø6.5mm", material:"Ti", items:[
    ["H 3mm","37815"],["H 5mm","37816"]
  ]}
],
"Healing Abutments — Bridge": [
  /* Platform per Nobel's conical connection product overview and store
     ("Healing Abutment Conical Connection WP Bridge Ø 6 x 3 mm" = 37817):
     Ø4.0 is NP, Ø5.0 is RP, Ø6.0 is WP. Each fits only its own platform. */
  {label:"NP, Ø4.0mm", material:"Ti", items:[
    ["H 3mm","36864"],["H 5mm","36865"],["H 7mm","36866"]
  ]},
  {label:"RP, Ø5.0mm", material:"Ti", items:[
    ["H 3mm","36869"],["H 5mm","36870"],["H 7mm","36871"]
  ]},
  {label:"WP, Ø6.0mm", material:"Ti", items:[
    ["H 3mm","37817"],["H 5mm","37818"]
  ]}
],
"Anatomic Healing Abutments (PEEK)": [
  {label:"WP", material:"PEEK", items:[
    ["6.0 × 7.0mm","37819"],["7.0 × 8.0mm","37820"]
  ]}
],
"Impression Copings": [
  {label:"3.0 Platform — Closed & Open Tray", material:"Ti", items:[
    ["Open Tray, Ø3.2mm, H14mm","36800"],["Closed Tray, Ø3.3mm, H13mm","36801"],
    ["Open Tray, Ø3.8mm, H14mm","36802"],["Closed Tray, Ø3.8mm, H13mm","36803"]
  ]},
  {label:"NP — Closed Tray", material:"Ti", items:[
    ["Ø3.6mm, H13mm","36538"],["Ø5.0mm, H13mm","36539"]
  ]},
  {label:"NP — Open Tray", material:"Ti", items:[
    ["Ø3.6mm, H10mm","36258"],["Ø3.6mm, H14mm","36260"],["Ø5.0mm, H10mm","36259"],["Ø5.0mm, H14mm","36261"]
  ]},
  {label:"RP — Closed Tray", material:"Ti", items:[
    ["Ø3.6mm, H9mm","36541"],["Ø3.6mm, H13mm","36540"],["Ø5.0mm, H9mm","36543"],["Ø5.0mm, H13mm","36542"],
    ["Ø6.0mm, H9mm","36545"],["Ø6.0mm, H13mm","36544"]
  ]},
  {label:"RP — Open Tray", material:"Ti", items:[
    ["Ø3.6mm, H10mm","36263"],["Ø3.6mm, H14mm","36262"],["Ø5.0mm, H10mm","36265"],["Ø5.0mm, H14mm","36264"],
    ["Ø6.0mm, H10mm","36267"],["Ø6.0mm, H14mm","36266"]
  ]},
  {label:"WP — Closed Tray", material:"Ti", items:[
    ["Ø5.0mm, H9mm","37851"],["Ø5.0mm, H13mm","37850"],["Ø6.5mm, H9mm","37853"],["Ø6.5mm, H13mm","37852"]
  ]},
  {label:"WP — Open Tray", material:"Ti", items:[
    ["Ø5.0mm, H10mm","37855"],["Ø5.0mm, H14mm","37854"],["Ø6.5mm, H10mm","37857"],["Ø6.5mm, H14mm","37856"]
  ]},
  {label:"Bridge — Open Tray", material:"Ti", items:[
    ["NP, H12mm","36930"],["RP, H12mm","36931"],["WP, H12mm","37858"]
  ]}
],
"Temporary Abutments": [
  {label:"Temporary Snap Abutment, Engaging (single-unit)", material:"Ti", items:[
    ["NP, H1.5mm","38760"],["RP, H1.5mm","38761"],["WP, H1.5mm","38762"],
    ["NP, H3.0mm","38847"],["RP, H3.0mm","38848"],["WP, H3.0mm","38849"]
  ]},
  {label:"Temporary Abutment, Engaging (single-unit, incl. clinical screw)", material:"Ti", items:[
    ["3.0, H1.5mm","36779"],["NP, H1.5mm","36663"],["RP, H1.5mm","36664"],["WP, H1.5mm","37823"],["WP, H3.0mm","37824"]
  ]},
  {label:"Temporary Abutment, Non-Engaging (bridge, incl. clinical screw)", material:"Ti", items:[
    ["NP, H1.5mm","36661"],["RP, H1.5mm","36662"],["WP, H1.5mm","37825"],["WP, H3.0mm","37826"]
  ]},
  {label:"Temporary Abutment Anatomical PEEK (WP)", material:"PEEK", items:[
    ["6.0 × 7.0mm","37821"],["7.0 × 8.0mm","37822"]
  ]}
],
"Implant Replicas & Analogs": [
  {label:"Implant Replica", material:"SST", items:[
    ["3.0 Platform","36791"],["NP","36697"],["RP","36698"],["WP","37879"]
  ]},
  {label:"IOS Model Replica", material:"SST", items:[
    ["3.0 Platform","38188"],["NP","38189"],["RP","38190"],["WP","38191"]
  ]}
],
"Esthetic Abutments & Universal Base": [
  {label:"Esthetic Abutment, straight (incl. clinical screw)", material:"Ti", items:[
    ["3.0, H1.5mm","36782"],["3.0, H3.0mm","36783"],["3.0, H4.5mm","36814"],
    ["NP, H1.5mm","36665"],["NP, H3.0mm","36666"],["NP, H4.5mm","36249"],
    ["RP, H1.5mm","36669"],["RP, H3.0mm","36671"],["RP, H4.5mm","36251"],
    ["WP, 6.0×7.0mm","37827"],["WP, 7.0×8.0mm","37828"]
  ]},
  {label:"Esthetic Abutment 15° (incl. clinical screw)", material:"Ti", items:[
    ["3.0, H1.5mm","36784"],["3.0, H3.0mm","36785"],["3.0, H4.5mm","36815"],
    ["NP, H1.5mm","36667"],["NP, H3.0mm","36668"],["NP, H4.5mm","36250"],
    ["RP, H1.5mm","36672"],["RP, H3.0mm","36673"],["RP, H4.5mm","36252"]
  ]},
  {label:"Universal Base (incl. burn-out coping + clinical screw)", material:"Ti / POM",
    note:"International article numbers. Nobel's US catalog lists the Universal Base under newer 3011xx numbers (e.g. NP 1.5mm engaging = 301101) — confirm with your Nobel rep when ordering in the US.",
    items:[
    ["NP, H1.5mm","38213"],["NP, H3.0mm","38216"],
    ["RP, H1.5mm","38214"],["RP, H3.0mm","38217"],
    ["WP, H1.5mm","38215"],["WP, H3.0mm","38218"]
  ]}
],
"Multi-unit Abutments Plus": [
  {label:"Straight", material:"Ti", items:[
    ["NP, H1.5mm","38878"],["RP, H1.5mm","38879"],["WP, H1.5mm","38880"],
    ["NP, H2.5mm","38881"],["RP, H2.5mm","38882"],["WP, H2.5mm","38883"],
    ["NP, H3.5mm","38884"],["RP, H3.5mm","38885"],["WP, H3.5mm","38886"],
    ["RP, H4.5mm","38887"]
  ]},
  {label:"17°", material:"Ti", items:[
    ["NP, H2.5mm","38888"],["RP, H2.5mm","38889"],["WP, H2.5mm","38890"],
    ["NP, H3.5mm","38891"],["RP, H3.5mm","38892"],["WP, H3.5mm","38893"]
  ]},
  {label:"30°", material:"Ti", items:[
    ["NP, H3.5mm","38894"],["RP, H3.5mm","38895"],["NP, H4.5mm","38896"],["RP, H4.5mm","38897"]
  ]},
  {label:"Multi-unit Accessories", material:"Ti / POM / SST", items:[
    ["Impression Coping, Open Tray","29089"],["Impression Coping, Closed Tray","38924"],
    ["Healing Cap Ø5.0, H4.1mm (2/pkg)","300162"],["Healing Cap Ø6.0, H4.1mm (2/pkg)","300164"],["Healing Cap Wide, H4.1mm (2/pkg)","300166"],
    ["Healing Cap Ø5.0, H5.5mm (2/pkg)","300163"],["Healing Cap Ø6.0, H5.5mm (2/pkg)","300165"],["Healing Cap Wide, H5.5mm (2/pkg)","300167"],
    ["Multi-unit Aligning Instrument","300161"],["Temporary Snap Coping (Multi-unit Abutment Xeal only)","38915"],["Temporary Coping","29046"],
    ["Drill Guide, Multi-unit","38917"],["Protection Analog, Multi-unit (5/pkg)","29123"]
  ]}
],
"Locator R-Tx® Abutments": [
  {label:"NP", material:"Ti", items:[
    ["H1.0mm","REF30506-01"],["H2.0mm","REF30506-02"],["H3.0mm","REF30506-03"],["H4.0mm","REF30506-04"],["H5.0mm","REF30506-05"],["H6.0mm","REF30506-06"]
  ]},
  {label:"RP", material:"Ti", items:[
    ["H1.0mm","REF30507-01"],["H2.0mm","REF30507-02"],["H3.0mm","REF30507-03"],["H4.0mm","REF30507-04"],["H5.0mm","REF30507-05"],["H6.0mm","REF30507-06"]
  ]},
  {label:"WP", material:"Ti", items:[
    ["H1.0mm","REF30508-01"],["H2.0mm","REF30508-02"],["H3.0mm","REF30508-03"],["H4.0mm","REF30508-04"],["H5.0mm","REF30508-05"]
  ]},
  {label:"Processing Components (4/pkg)", material:"Various", items:[
    ["Processing Insert","REF30012-01"],["Denture Attachment Processing Assembly","REF30013-01"],
    ["Processing Spacer","REF30018-01"],["Impression Coping","REF30017-01"],
    ["Block Out Spacer (20/pkg)","REF08514"]
  ]},
  {label:"Retention Inserts (4/pkg)", material:"Various", items:[
    ["Zero Retention Insert","REF30001-01"],["Low Retention Insert","REF30002-01"],
    ["Medium Retention Insert","REF30003-01"],["High Retention Insert","REF30004-01"]
  ]},
  {label:"Female Analogs", material:"Ti", items:[
    ["Ø3.35mm (4/pkg)","REF30014-01"],["Ø4.0mm (4/pkg)","REF30015-01"],["Ø4.0mm (20/pkg)","REF08530-20"],
    ["Ø5.0mm (4/pkg)","REF30016-01"],["Ø5.0mm (20/pkg)","REF08516-20"]
  ]}
],
"Clinical & Laboratory Screws": [
  {label:"For Esthetic Abutment, Universal Base, Temporary Abutments, NobelProcera Ti Abutments/Bars", material:"Ti", items:[
    ["Clinical Screw, 3.0","37890"],["Clinical Screw, NP","37891"],["Clinical Screw, RP/WP","37892"],
    ["Laboratory Screw, 3.0","36805"],["Laboratory Screw, NP","37894"],["Laboratory Screw, RP/WP (5/pkg)","37895"]
  ]},
  {label:"For NobelProcera Zirconia ASC (Angulated Screw Channel)", material:"Ti", items:[
    ["Omnigrip Clinical Screw, NP","37367"],["Omnigrip Clinical Screw, RP/WP","37606"],
    ["Omnigrip Laboratory Screw, NP","37374"],["Omnigrip Laboratory Screw, RP/WP","37607"]
  ]},
  {label:"For Multi-unit Abutment restorations", material:"Ti", items:[
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
  {label:"NobelReplace® Conical Connection — NP (Ø3.5mm)", material:"TiUnite®", items:[
    ["8mm","36699"],["10mm","36700"],["11.5mm","36701"],["13mm","36702"],["16mm","36703"]
  ]},
  {label:"NobelReplace® Conical Connection — RP (Ø4.3mm)", material:"TiUnite®", items:[
    ["8mm","36704"],["10mm","36705"],["11.5mm","36707"],["13mm","36708"],["16mm","36709"]
  ]},
  {label:"NobelReplace® Conical Connection — RP (Ø5.0mm)", material:"TiUnite®", items:[
    ["8mm","36710"],["10mm","36711"],["11.5mm","36712"],["13mm","36713"],["16mm","36714"]
  ]},
  {label:"NobelReplace® CC PMC (0.75mm machined collar, cover screw included) — NP", material:"TiUnite®", items:[
    ["8mm","37284"],["10mm","37285"],["11.5mm","37287"],["13mm","37288"],["16mm","37289"]
  ]},
  {label:"NobelReplace® CC PMC (cover screw included) — RP", material:"TiUnite®", items:[
    ["8mm","37290"],["10mm","37291"],["11.5mm","37292"],["13mm","37293"],["16mm","37294"]
  ]},
  {label:"NobelReplace® CC PMC (cover screw included) — RP (Ø5.0mm)", material:"TiUnite®", items:[
    ["8mm","37295"],["10mm","37296"],["11.5mm","37297"],["13mm","37298"],["16mm","37299"]
  ]}
],
"Cover Screws": [
  {label:"All platforms", material:"Ti", items:[
    ["3.0 Platform","36775"],["NP","36649"],["RP","36650"],["WP","37812"]
  ]}
],
"Surgical Instruments": [
  /* NobelReplace CC comes in NP and RP only: its catalog pages (2024/2025
     ed. p.20-21) list just NP/RP drivers and bone mills. */
  {label:"Implant Drivers", material:"SST", items:[
    ["NP, 28mm","36718"],["NP, 37mm","36719"],
    ["RP, 28mm","36720"],["RP, 37mm","36721"]
  ]},
  {label:"Bone Mills & Guides", material:"SST", items:[
    ["NP Ø4.4mm, Bone Mill with Guide","37863"],["NP Ø5.2mm, Bone Mill with Guide","37864"],["NP, Bone Mill Guide","37865"],
    ["RP Ø5.2mm, Bone Mill with Guide","37866"],["RP Ø6.2mm, Bone Mill with Guide","37867"],["RP, Bone Mill Guide","37868"]
  ]},
  {label:"Drills", material:"SST", items:[
    ["NP Ø3.5mm, 8mm","32075"],["NP Ø3.5mm, 10mm","29367"],["NP Ø3.5mm, 11.5mm","36113"],["NP Ø3.5mm, 13mm","29368"],["NP Ø3.5mm, 16mm","29369"],
    ["RP Ø4.3mm, 8mm","32076"],["RP Ø4.3mm, 10mm","29370"],["RP Ø4.3mm, 11.5mm","36114"],["RP Ø4.3mm, 13mm","29371"],["RP Ø4.3mm, 16mm","29372"],
    ["RP Ø5.0mm, 8mm","32077"],["RP Ø5.0mm, 10mm","29373"],["RP Ø5.0mm, 11.5mm","36115"],["RP Ø5.0mm, 13mm","29374"],["RP Ø5.0mm, 16mm","29375"]
  ]},
  {label:"Dense Bone Drills", material:"SST", items:[
    ["NP Ø3.5mm, 13mm","29377"],["NP Ø3.5mm, 16mm","29378"],
    ["RP Ø4.3mm, 13mm","29380"],["RP Ø4.3mm, 16mm","29381"],
    ["RP Ø5.0mm, 13mm","29383"],["RP Ø5.0mm, 16mm","29384"]
  ]},
  {label:"Screw Taps", material:"SST", items:[
    ["NP Ø3.5mm","36717"],["RP Ø4.3mm","32090"],["RP Ø5.0mm","32091"]
  ]},
  {label:"Additional Drills & Sets", material:"SST", items:[
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
  {label:"NobelActive® — Ø3.0mm", material:"TiUnite®", items:[
    ["10mm","36769"],["11.5mm","36770"],["13mm","36771"],["15mm","36772"]
  ]},
  {label:"NobelActive® — Ø3.5mm", material:"TiUnite®", items:[
    ["8.5mm","35221"],["10mm","34125"],["11.5mm","34126"],["13mm","34127"],["15mm","34128"],["18mm","35215"]
  ]},
  {label:"NobelActive® — Ø4.3mm", material:"TiUnite®", items:[
    ["8.5mm","35223"],["10mm","34131"],["11.5mm","34132"],["13mm","34133"],["15mm","34134"],["18mm","35219"]
  ]},
  {label:"NobelActive® — Ø5.0mm", material:"TiUnite®", items:[
    ["8.5mm","35225"],["10mm","34137"],["11.5mm","34138"],["13mm","34139"],["15mm","34140"],["18mm","35220"]
  ]},
  {label:"NobelActive® — Ø5.5mm", material:"TiUnite®", items:[
    ["7mm","37806"],["8.5mm","37807"],["10mm","37808"],["11.5mm","37809"],["13mm","37810"],["15mm","37811"]
  ]}
],
"Cover Screws": [
  {label:"All platforms", material:"Ti", items:[
    ["3.0 Platform","36775"],["NP","36649"],["RP","36650"],["WP","37812"]
  ]}
],
"Surgical Instruments": [
  {label:"Implant Drivers", material:"SST", items:[
    ["3.0, 28mm","36773"],["3.0, 37mm","36774"],["NP, 28mm","36718"],["NP, 37mm","36719"],
    ["RP, 28mm","36720"],["RP, 37mm","36721"],["WP, 28mm","37859"],["WP, 37mm","37860"]
  ]},
  {label:"Twist Drills", material:"SST", items:[
    ["Ø1.5mm, 7–15mm","31278"],["Ø2.0mm, 7–10mm","32296"],["Ø2.0mm, 7–15mm","32297"],["Ø2.0mm, 10–18mm","32299"]
  ]},
  {label:"Twist Step Drills", material:"SST", items:[
    ["Ø2.4/2.8mm, 7–10mm","32260"],["Ø2.4/2.8mm, 7–15mm","32261"],["Ø2.4/2.8mm, 10–18mm","32262"],
    ["Ø2.8/3.2mm, 7–10mm","37873"],["Ø2.8/3.2mm, 7–15mm","34638"],["Ø2.8/3.2mm, 10–18mm","34639"],
    ["Ø3.2/3.6mm, 7–10mm","32263"],["Ø3.2/3.6mm, 7–15mm","32264"],["Ø3.2/3.6mm, 10–18mm","32265"],
    ["Ø3.8/4.2mm, 7–10mm","32275"],["Ø3.8/4.2mm, 7–15mm","32276"],["Ø3.8/4.2mm, 10–18mm","32277"],
    ["Ø4.2/4.6mm, 7–10mm","37874"],["Ø4.2/4.6mm, 7–15mm","34582"],["Ø4.2/4.6mm, 10–18mm","34583"],
    ["Ø4.2/5.0mm, 7–10mm","37875"],["Ø4.2/5.0mm, 7–15mm","37876"]
  ]},
  {label:"Screw Taps", material:"SST", items:[
    ["Ø3.0mm","36816"],["Ø3.5mm","36236"],["Ø4.3mm","36237"],["Ø5.0mm","36238"],
    ["Ø5.5mm, 7–10mm","37871"],["Ø5.5mm, 11.5–15mm","37872"]
  ]},
  {label:"Sets", material:"—", items:[
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
  {label:"NobelParallel® CC — Ø3.75mm", material:"TiUnite®", items:[
    ["7mm","37963"],["8.5mm","37964"],["10mm","37965"],["11.5mm","37966"],["13mm","37967"],["15mm","37968"],["18mm","37969"]
  ]},
  {label:"NobelParallel® CC — Ø4.3mm", material:"TiUnite®", items:[
    ["7mm","37970"],["8.5mm","37971"],["10mm","37972"],["11.5mm","37973"],["13mm","37974"],["15mm","37975"],["18mm","37976"]
  ]},
  {label:"NobelParallel® CC — Ø5.0mm", material:"TiUnite®", items:[
    ["7mm","37977"],["8.5mm","37978"],["10mm","37979"],["11.5mm","37980"],["13mm","37981"],["15mm","37982"],["18mm","37983"]
  ]},
  {label:"NobelParallel® CC — Ø5.5mm", material:"TiUnite®", items:[
    ["7mm","37984"],["8.5mm","37985"],["10mm","37986"],["11.5mm","37987"],["13mm","37988"],["15mm","37989"]
  ]}
],
"Cover Screws": [
  {label:"All platforms", material:"Ti", items:[
    ["3.0 Platform","36775"],["NP","36649"],["RP","36650"],["WP","37812"]
  ]}
],
"Surgical Instruments": [
  /* NobelParallel CC has no 3.0 implant: its catalog pages (2024/2025 ed.
     p.16-17) list NP/RP/WP drivers and bone mills, and twist drills from
     Ø2.0 (the Ø1.5 drill is NobelActive only). */
  {label:"Implant Drivers", material:"SST", items:[
    ["NP, 28mm","36718"],["NP, 37mm","36719"],
    ["RP, 28mm","36720"],["RP, 37mm","36721"],["WP, 28mm","37859"],["WP, 37mm","37860"]
  ]},
  {label:"Bone Mills & Guides", material:"SST", items:[
    ["NP Ø4.4mm, Bone Mill with Guide","37863"],["NP Ø5.2mm, Bone Mill with Guide","37864"],["NP, Bone Mill Guide","37865"],
    ["RP Ø5.2mm, Bone Mill with Guide","37866"],["RP Ø6.2mm, Bone Mill with Guide","37867"],["RP, Bone Mill Guide","37868"],
    ["WP Ø6.7mm, Bone Mill with Guide","37869"],["WP, Bone Mill Guide","37870"]
  ]},
  {label:"Twist Drills (shared with NobelActive)", material:"SST", items:[
    ["Ø2.0mm, 7–10mm","32296"],["Ø2.0mm, 7–15mm","32297"],["Ø2.0mm, 10–18mm","32299"]
  ]},
  {label:"Twist Step Drills (shared with NobelActive)", material:"SST", items:[
    ["Ø2.4/2.8mm, 7–10mm","32260"],["Ø2.4/2.8mm, 7–15mm","32261"],["Ø2.4/2.8mm, 10–18mm","32262"],
    ["Ø2.8/3.2mm, 7–10mm","37873"],["Ø2.8/3.2mm, 7–15mm","34638"],["Ø2.8/3.2mm, 10–18mm","34639"],
    ["Ø3.2/3.6mm, 7–10mm","32263"],["Ø3.2/3.6mm, 7–15mm","32264"],["Ø3.2/3.6mm, 10–18mm","32265"],
    ["Ø3.8/4.2mm, 7–10mm","32275"],["Ø3.8/4.2mm, 7–15mm","32276"],["Ø3.8/4.2mm, 10–18mm","32277"],
    ["Ø4.2/4.6mm, 7–10mm","37874"],["Ø4.2/4.6mm, 7–15mm","34582"],["Ø4.2/4.6mm, 10–18mm","34583"],
    ["Ø4.2/5.0mm, 7–10mm","37875"],["Ø4.2/5.0mm, 7–15mm","37876"]
  ]},
  {label:"Cortical Drills (NobelParallel CC)", material:"SST", items:[
    ["Ø3.75mm","38000"],["Ø4.3mm","38001"],["Ø5.0mm","38002"],["Ø5.5mm","38003"]
  ]},
  {label:"Screw Taps (NobelParallel CC)", material:"SST", items:[
    ["Ø3.75mm, 7–13mm","37990"],["Ø3.75mm, 7–18mm","37991"],
    ["Ø4.3mm, 7–13mm","37992"],["Ø4.3mm, 7–18mm","37993"],
    ["Ø5.0mm, 7–13mm","37994"],["Ø5.0mm, 7–18mm","37995"],
    ["Ø5.5mm, 7–10mm","37996"],["Ø5.5mm, 7–15mm","37997"]
  ]},
  {label:"Sets", material:"—", items:[
    ["NobelParallel® CC PureSet (instruments, all NobelParallel CC implants)","87295"]
  ]}
],
...NOBEL_CONICAL_SHARED
};

/* =========================================================================
   NEODENT® GRAND MORSE® (GM) — Helix GM® Implant Line, Acqua® & NeoPoros®
   surfaces. Source: Neodent® GM Product Catalog 2026, Global Edition
   (Straumann Group). Implants, cover screws, healing abutments, impression
   components, core abutments, screws and surgical instruments below are
   transcribed directly from the catalog. A handful of deeper restorative
   lines (Titanium Base gingival-height variants, angled/CoCr/custom
   abutments) were left out where the source table's platform/height
   pairing could not be reconstructed with full confidence — for those,
   consult the Neodent catalog or your rep. */
const CATALOG_NEODENT_GM = {
"Implants — Helix GM®": [
  {label:"Ø 3.5mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.943"],["10mm","140.944"],["11.5mm","140.945"],["13mm","140.946"],["16mm","140.947"],["18mm","140.988"]
  ]},
  {label:"Ø 3.75mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.976"],["10mm","140.977"],["11.5mm","140.978"],["13mm","140.979"],["16mm","140.980"],["18mm","140.981"]
  ]},
  {label:"Ø 4.0mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.982"],["10mm","140.983"],["11.5mm","140.984"],["13mm","140.985"],["16mm","140.986"],["18mm","140.987"]
  ]},
  {label:"Ø 4.3mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.948"],["10mm","140.949"],["11.5mm","140.950"],["13mm","140.951"],["16mm","140.952"],["18mm","140.989"]
  ]},
  {label:"Ø 5.0mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.953"],["10mm","140.954"],["11.5mm","140.955"],["13mm","140.956"],["16mm","140.957"],["18mm","140.990"]
  ]},
  {label:"Ø 6.0mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.1009"],["10mm","140.1010"],["11.5mm","140.1011"],["13mm","140.1012"]
  ]},
  {label:"Ø 7.0mm — Acqua® hydrophilic surface", material:"Titanium, Acqua®", items:[
    ["8mm","140.1059"],["10mm","140.1060"],["11.5mm","140.1061"],["13mm","140.1062"]
  ]},
  {label:"Ø 3.5mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.943"],["10mm","109.944"],["11.5mm","109.945"],["13mm","109.946"],["16mm","109.947"],["18mm","109.988"]
  ]},
  {label:"Ø 3.75mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.976"],["10mm","109.977"],["11.5mm","109.978"],["13mm","109.979"],["16mm","109.980"],["18mm","109.981"]
  ]},
  {label:"Ø 4.0mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.982"],["10mm","109.983"],["11.5mm","109.984"],["13mm","109.985"],["16mm","109.986"],["18mm","109.987"]
  ]},
  {label:"Ø 4.3mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.948"],["10mm","109.949"],["11.5mm","109.950"],["13mm","109.951"],["16mm","109.952"],["18mm","109.989"]
  ]},
  {label:"Ø 5.0mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.953"],["10mm","109.954"],["11.5mm","109.955"],["13mm","109.956"],["16mm","109.957"],["18mm","109.990"]
  ]},
  {label:"Ø 6.0mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.1009"],["10mm","109.1010"],["11.5mm","109.1011"],["13mm","109.1012"]
  ]},
  {label:"Ø 7.0mm — NeoPoros® surface", material:"Titanium, NeoPoros®", items:[
    ["8mm","109.1059"],["10mm","109.1060"],["11.5mm","109.1061"],["13mm","109.1062"]
  ]}
],
"GM Cover Screw": [
  {label:"All GM implant diameters — use manual Neo Screwdriver, max 10 N.cm", material:"Titanium", items:[
    ["0mm profile","117.021"],["2mm profile","117.022"]
  ]}
],
"GM Healing Abutments": [
  {label:"GM Healing Abutment, Ø3.3mm", material:"Titanium", items:[
    ["Profile 0.8mm","106.207"],["Profile 1.5mm","106.208"],["Profile 2.5mm","106.209"],
    ["Profile 3.5mm","106.210"],["Profile 4.5mm","106.211"],["Profile 5.5mm","106.212"]
  ]},
  {label:"GM Healing Abutment, Ø4.5mm", material:"Titanium", items:[
    ["Profile 0.8mm","106.213"],["Profile 1.5mm","106.214"],["Profile 2.5mm","106.215"],
    ["Profile 3.5mm","106.216"],["Profile 4.5mm","106.217"],["Profile 5.5mm","106.218"]
  ]},
  {label:"GM Customizable Healing Abutment, Ø5.5mm", material:"Titanium", items:[
    ["Profile 1.5mm","106.223"],["Profile 2.5mm","106.224"],["Profile 3.5mm","106.225"],
    ["Profile 4.5mm","106.226"],["Profile 5.5mm","106.227"]
  ]},
  {label:"GM Customizable Healing Abutment, Ø7.0mm", material:"Titanium", items:[
    ["Profile 1.5mm","106.228"],["Profile 2.5mm","106.229"],["Profile 3.5mm","106.230"],
    ["Profile 4.5mm","106.231"],["Profile 5.5mm","106.232"]
  ]}
],
"Impression Components & Analogs": [
  {label:"GM Implant Exact Impression Coping", material:"Titanium", items:[
    ["Closed Tray, Regular","108.160"],["Closed Tray, Long","108.161"],
    ["Open Tray, Regular","108.162"],["Open Tray, Long","108.163"]
  ]},
  {label:"GM Implant Analog (hybrid repositionable, conventional/digital)", material:"Titanium",
    fitsImplantDiameters: true, // each analog only matches the implant diameters in its name
    items:[
    ["Ø3.5/3.75mm","101.089"],["Ø4.0/4.3mm","101.103"],["Ø5.0/6.0/7.0mm","101.090"]
  ]},
  {label:"Digital", material:"SST", items:[
    ["GM Implant Intraoral Scanbody","108.207"]
  ]}
],
"Abutments": [
  {label:"GM Exact Abutment (single-unit screw-retained, Ø4.8mm, incl. Neo Removable Screw)", material:"Titanium", items:[
    ["GH 0.8mm","115.269"],["GH 1.5mm","115.270"],["GH 2.5mm","115.271"],["GH 3.5mm","115.272"],["GH 4.5mm","115.273"]
  ]},
  {label:"GM Abutment — Accessories", material:"Titanium / SST", items:[
    ["Impression Coping, Closed Tray","108.179"],["Hybrid Repositionable Analog","101.101"],
    ["Coping for Crown — Digital Workflow","118.362"],["Scanbody","108.220"],
    ["Protection Cylinder","106.221"],["Titanium Coping","118.300"]
  ]},
  {label:"GM Micro Abutment (Ø3.5mm, incl. Neo Removable Screw)", material:"Titanium", items:[
    ["GH 0.8mm","115.255"],["GH 1.5mm","115.256"],["GH 2.5mm","115.257"],
    ["GH 3.5mm","115.258"],["GH 4.5mm","115.259"],["GH 5.5mm","115.260"]
  ]},
  {label:"GM Micro Abutment — Accessories", material:"Titanium / SST", items:[
    ["Impression Coping, Closed Tray (single-unit)","108.182"],["Impression Coping, Open Tray Slim (multi-unit)","108.178"],
    ["Hybrid Repositionable Analog","101.091"],["Scanbody","108.219"],
    ["Protection Cylinder","106.267"],["Polishing Protector","123.015"]
  ]}
],
"GM Mini Conical Abutments (Multi-unit)": [
  {label:"GM Mini Conical Abutment, straight (Ø4.8mm, multi-unit screw-retained)", material:"Titanium", items:[
    ["GH 0.8mm","115.243"],["GH 1.5mm","115.244"],["GH 2.5mm","115.245"],
    ["GH 3.5mm","115.246"],["GH 4.5mm","115.247"],["GH 5.5mm","115.248"]
  ]},
  {label:"GM Exact Mini Conical Abutment, 17°", material:"Titanium", items:[
    ["GH 1.5mm","115.275"],["GH 2.5mm","115.276"],["GH 3.5mm","115.277"]
  ]},
  {label:"GM Exact Mini Conical Abutment, 30°", material:"Titanium", items:[
    ["GH 1.5mm","115.278"],["GH 2.5mm","115.279"],["GH 3.5mm","115.280"]
  ]},
  {label:"GM Mini Conical Abutment — Accessories", material:"Titanium / SST", items:[
    ["Analog","101.092"],["Scanbody, Regular","108.218"],["Scanbody, Long","118.410"],
    ["Protection Cylinder, Regular","106.268"],["Protection Cylinder, Wide","106.278"],
    ["Polishing Protector","123.008"]
  ]}
],
"Replacement Screws": [
  {label:"Neo GM Screw (restorative, abutment reseating)", material:"Titanium", items:[
    ["Short — for GH 0.8mm abutments","116.290"],["Standard — for GH 1.5–2.5mm abutments","116.291"],["Long — for GH 3.5–5.5mm abutments","116.292"]
  ]},
  {label:"Neotorque® Replacement Coping Screw", material:"Titanium", items:[
    ["For GM Abutment coping","116.266"],["For GM Abutment coping (alt.)","116.267"],
    ["For GM Mini Conical Abutment coping","116.269"],["For GM Mini Conical Abutment coping (alt.)","116.270"]
  ]},
  {label:"DirectFit™ Screw", material:"Titanium", items:[
    ["Neodent DirectFit Screw","116.303"]
  ]}
],
"Surgical Instruments": [
  {label:"Screwdrivers", material:"SST", items:[
    ["Neo Screwdriver Torque Connection, Short (16.5mm)","105.133"],
    ["Neo Screwdriver Torque Connection, Medium (22mm)","105.132"],
    ["Neo Screwdriver Torque Connection, Long (32mm)","105.157"],
    ["Neo Manual Screwdriver, Short (21mm)","104.058"],
    ["Neo Manual Screwdriver, Medium (25mm)","104.060"],
    ["Neo Manual Screwdriver, Long (37mm)","104.070"]
  ]},
  {label:"Implant Drivers", material:"SST", items:[
    ["GM Implant Driver — Contra-angle, max 35 N.cm","105.131"],
    ["GM Implant Driver — Torque Wrench, Short (22mm)","105.129"],
    ["GM Implant Driver — Torque Wrench, Long (30mm)","105.130"]
  ]},
  {label:"Drills — Initial & Tapered (Helix GM®)", material:"SST", items:[
    ["Initial Drill, Ø2.0mm","103.170"],["Tapered Drill Ø3.5mm","103.513"],["Tapered Drill Ø3.75mm","103.514"],
    ["Tapered Drill Ø4.0mm","103.515"],["Tapered Drill Ø4.3mm","103.516"],["Tapered Drill Ø5.0mm","103.517"]
  ]},
  {label:"Direction Indicators & Measurement", material:"Titanium", items:[
    ["Direction Indicator 2.8/3.5","128.019"],["Direction Indicator 3.0/3.75","128.020"],
    ["Direction Indicator 3.3/4.0","128.021"],["Direction Indicator 3.6/4.3","128.022"],["Direction Indicator 4.3/5.0","128.023"],
    ["GM Height Measurer","128.028"],["Depth Probe","129.034"]
  ]},
  {label:"Torque & Bone Profiling", material:"SST", items:[
    ["Torque Wrench","104.050"],["GM Bone Profile Drill with Guide","103.424"],["Drill Extension","103.426"]
  ]}
]
};
/* All-on-X Components: a convenience grouping for full-arch treatment
   planning. Every item here already exists in its home category above —
   nothing is removed from there. Assigned last so lookups elsewhere still
   resolve to an item's true home category. Each duplicated group is tagged
   with sourceCategory so its on-screen label always reads with its true,
   full component name. */
CATALOG_NEODENT_GM["All-on-X Components"] = [
  ...withSource(CATALOG_NEODENT_GM["GM Mini Conical Abutments (Multi-unit)"], "GM Mini Conical Abutments (Multi-unit)"),
  ...withSource([CATALOG_NEODENT_GM["GM Healing Abutments"].find(g=>g.label==="GM Customizable Healing Abutment, Ø5.5mm")], "GM Healing Abutments"),
  ...withSource([CATALOG_NEODENT_GM["GM Healing Abutments"].find(g=>g.label==="GM Customizable Healing Abutment, Ø7.0mm")], "GM Healing Abutments"),
  ...withSource(CATALOG_NEODENT_GM["Replacement Screws"], "Replacement Screws")
];

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

   IMPLANT LENGTH CAVEAT — stated directly in the brochure article-number
   tables and folded into each implant group's label below for visibility:
   NobelActive S / NobelParallel S actual length is 0.5mm SHORTER than the
   name states; NobelReplace S actual length is 0.6mm LONGER than the name
   states. Opposite directions — easy to get wrong, worth double-checking
   against the brochure before ordering a length-critical case.
   ========================================================================= */
const S_SERIES_SHARED = {
"Cover Screws": [
  {label:"NP (all implant sizes)", material:"Ti", items:[
    ["Cover Screw","36649"]
  ]}
],
"Healing Abutments": [
  {label:"Healing Abutment, Ø4.0mm", material:"Ti", items:[
    ["H3.0mm","302039"],["H4.0mm","302040"],["H5.0mm","302041"],["H7.0mm","302042"]
  ]},
  {label:"Healing Abutment, Ø5.0mm", material:"Ti", items:[
    ["H3.0mm","302043"],["H4.0mm","302044"],["H5.0mm","302045"],["H7.0mm","302046"]
  ]},
  {label:"Healing Abutment Bridge, Ø4.0mm", material:"Ti", items:[
    ["H3.0mm","36864"],["H5.0mm","36865"],["H7.0mm","36866"]
  ]}
],
"Temporary Abutments": [
  {label:"Temporary Abutment, Engaging (single-unit), Ø4.1mm", material:"PEEK", items:[
    ["H1.5mm","302164"],["H2.5mm","302165"],["H3.5mm","302166"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Temporary Abutment, Non-Engaging (bridge), Ø4.1mm", material:"PEEK", items:[
    ["H1.5mm","302175"],["H2.5mm","302176"],["H3.5mm","302177"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."}
],
"Impression Copings": [
  {label:"Closed Tray, Ø4.0mm", material:"POM / Ti", items:[
    ["H13.0mm","302096"]
  ]},
  {label:"Closed Tray, Ø5.0mm", material:"POM / Ti", items:[
    ["H13.0mm","302097"]
  ]},
  {label:"Open Tray, Ø4.0mm", material:"POM / Ti", items:[
    ["H10.0mm","302080"],["H14.0mm","302081"]
  ]},
  {label:"Open Tray, Ø5.0mm", material:"POM / Ti", items:[
    ["H10.0mm","302082"],["H14.0mm","302083"]
  ]},
  {label:"Bridge Open Tray", material:"POM / Ti", items:[
    ["H12.0mm","36930"]
  ]}
],
"Scan Bodies": [
  {label:"Scan Body — Conical Connection, Single", material:"PEEK / Ti", items:[
    ["Position Locator","301932"],["Spare Screw (5/pkg)","302265"]
  ]},
  {label:"Scan Body — Conical Connection, Bridge", material:"PEEK / Ti", items:[
    ["Position Locator","302254"],["Spare Screw (5/pkg)","302265"]
  ]}
],
"Multi-unit PoLo & Accessories": [
  {label:"Links for Bridge and Multi-unit PoLo", material:"POM", items:[
    ["10mm","301947"],["15mm","301948"],["20mm","301949"]
  ]},
  {label:"Multi-unit PoLo", material:"Ti", items:[
    ["8mm","302485"],["11mm","302486"]
  ]},
  {label:"Multi-unit PoLo Replacement Screws (5/pkg)", material:"Ti", items:[
    ["Replacement Screw","302489"]
  ]},
  {label:"Multi-unit Abutment, NP", material:"Ti", items:[
    ["Multi-unit Abutment","301950"]
  ]}
],
"Multi-unit Abutments": [
  {label:"Multi-unit Abutment Xeal, straight", material:"Ti", items:[
    ["H1.5mm","300171"],["H2.5mm","300174"],["H3.5mm","300177"]
  ]},
  {label:"17° Multi-unit Abutment Xeal", material:"Ti", items:[
    ["H2.5mm","300181"],["H3.5mm","300184"]
  ]},
  {label:"30° Multi-unit Abutment Xeal", material:"Ti", items:[
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
  {label:"Multi-unit Healing Cap (2/pkg) — compatible with all Multi-unit Abutments", material:"Ti", items:[
    ["Ø5.0, H4.1mm","300162"],["Ø6.0, H4.1mm","300164"],["Wide, H4.1mm","300166"],
    ["Ø5.0, H5.5mm","300163"],["Ø6.0, H5.5mm","300165"],["Wide, H5.5mm","300167"]
  ]}
],
"Esthetic Abutments": [
  {label:"Esthetic Abutment 15°", material:"Ti", items:[
    ["H1.5mm","36667"],["H3.0mm","36668"],["H4.5mm","36250"]
  ]},
  {label:"Esthetic Abutment", material:"Ti", items:[
    ["H1.5mm","36665"],["H3.0mm","36666"],["H4.5mm","36249"]
  ]}
],
"Universal Base ASC": [
  {label:"Universal Base ASC, Engaging (single-unit), Ø4.1mm", material:"Ti", items:[
    ["Collar 1.0mm","302190"],["Collar 1.5mm","302191"],["Collar 2.5mm","302192"],["Collar 3.5mm","302193"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Universal Base ASC, Non-Engaging (bridge), Ø4.1mm", material:"Ti", items:[
    ["Collar 1.0mm","302207"],["Collar 1.5mm","302208"],["Collar 2.5mm","302209"],["Collar 3.5mm","302210"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Universal Base Multi-unit Abutment ASC, Ø5mm", material:"Ti", items:[
    ["Universal Base","302223"]
  ], pendingNote:"Under FDA and Health Canada review — not yet available for sale in the US or Canada, per the S series brochure."},
  {label:"Titanium Blanks", material:"Ti", items:[
    ["Ø10mm","TRM60.041"],["Ø14mm","TRM64.041"]
  ]}
],
"Guided Surgical Components": [
  {label:"Guided Implant Mount — NobelActive S", material:"Ti / SST", items:[
    ["Ø4.3mm","302565"],["Ø5.0/5.5mm","302583"]
  ]},
  {label:"Guided Implant Mount — CC S (NobelParallel S / NobelReplace S)", material:"Ti / SST", items:[
    ["Ø4.3mm","302567"],["Ø5.0/5.5mm","302568"]
  ]},
  {label:"Guided Template Abutment w/Screw — CC S", material:"Ti", items:[
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
    {label:"Ø3.5mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"Roxolid-equiv. Ti / TiUltra®", items:[
      ["8.5mm","302273"],["10mm","302274"],["11.5mm","302275"],["13mm","302276"],["15mm","302277"],["18mm","302278"]
    ]},
    {label:"Ø4.3mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["8.5mm","302279"],["10mm","302280"],["11.5mm","302281"],["13mm","302282"],["15mm","302283"],["18mm","302284"]
    ]},
    {label:"Ø5.0mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["8.5mm","302285"],["10mm","302286"],["11.5mm","302287"],["13mm","302288"],["15mm","302289"],["18mm","302290"]
    ]},
    {label:"Ø5.5mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302291"],["8.5mm","302292"],["10mm","302293"],["11.5mm","302294"],["13mm","302295"],["15mm","302296"]
    ]},
    {label:"Ø3.5mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["8.5mm","302342"],["10mm","302343"],["11.5mm","302344"],["13mm","302345"],["15mm","302346"],["18mm","302347"]
    ]},
    {label:"Ø4.3mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["8.5mm","302348"],["10mm","302349"],["11.5mm","302350"],["13mm","302351"],["15mm","302352"],["18mm","302353"]
    ]},
    {label:"Ø5.0mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["8.5mm","302354"],["10mm","302355"],["11.5mm","302356"],["13mm","302357"],["15mm","302358"],["18mm","302359"]
    ]},
    {label:"Ø5.5mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302360"],["8.5mm","302361"],["10mm","302362"],["11.5mm","302363"],["13mm","302364"],["15mm","302365"]
    ]}
  ]
};

const CATALOG_NPS = {
  ...S_SERIES_SHARED,
  "Implants": [
    {label:"Ø3.75mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302297"],["8.5mm","302298"],["10mm","302299"],["11.5mm","302300"],["13mm","302301"],["15mm","302302"],["18mm","302303"]
    ]},
    {label:"Ø4.3mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302304"],["8.5mm","302305"],["10mm","302306"],["11.5mm","302307"],["13mm","302308"],["15mm","302309"],["18mm","302310"]
    ]},
    {label:"Ø5.0mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302314"],["8.5mm","302315"],["10mm","302316"],["11.5mm","302317"],["13mm","302318"],["15mm","302319"],["18mm","302320"]
    ]},
    {label:"Ø5.5mm NP — TiUltra®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUltra®", items:[
      ["7mm","302321"],["8.5mm","302322"],["10mm","302323"],["11.5mm","302324"],["13mm","302325"],["15mm","302326"]
    ]},
    {label:"Ø3.75mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302366"],["8.5mm","302367"],["10mm","302368"],["11.5mm","302369"],["13mm","302370"],["15mm","302371"],["18mm","302372"]
    ]},
    {label:"Ø4.3mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302373"],["8.5mm","302374"],["10mm","302375"],["11.5mm","302376"],["13mm","302377"],["15mm","302378"],["18mm","302379"]
    ]},
    {label:"Ø5.0mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302383"],["8.5mm","302384"],["10mm","302385"],["11.5mm","302386"],["13mm","302387"],["15mm","302388"],["18mm","302389"]
    ]},
    {label:"Ø5.5mm NP — TiUnite®", note:"Actual length runs 0.5mm shorter than the stated size.", material:"TiUnite®", items:[
      ["7mm","302390"],["8.5mm","302391"],["10mm","302392"],["11.5mm","302393"],["13mm","302394"],["15mm","302395"]
    ]}
  ]
};

const CATALOG_NRS = {
  ...S_SERIES_SHARED,
  "Implants": [
    {label:"Ø3.5mm NP — TiUltra®", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUltra®", items:[
      ["8mm","302327"],["10mm","302328"],["11.5mm","302329"],["13mm","302330"],["16mm","302331"]
    ]},
    {label:"Ø4.3mm NP — TiUltra®", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUltra®", items:[
      ["8mm","302332"],["10mm","302333"],["11.5mm","302334"],["13mm","302335"],["16mm","302336"]
    ]},
    {label:"Ø5.0mm NP — TiUltra®", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUltra®", items:[
      ["8mm","302337"],["10mm","302338"],["11.5mm","302339"],["13mm","302340"],["16mm","302341"]
    ]},
    {label:"Ø3.5mm NP — TiUnite®", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUnite®", items:[
      ["8mm","302396"],["10mm","302397"],["11.5mm","302398"],["13mm","302399"],["16mm","302400"]
    ]},
    {label:"Ø4.3mm NP — TiUnite®", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUnite®", items:[
      ["8mm","302401"],["10mm","302402"],["11.5mm","302403"],["13mm","302404"],["16mm","302405"]
    ]},
    {label:"Ø5.0mm NP — TiUnite®", note:"Actual length runs 0.6mm longer than the stated size.", material:"TiUnite®", items:[
      ["8mm","302406"],["10mm","302407"],["11.5mm","302408"],["13mm","302409"],["16mm","302410"]
    ]}
  ]
};

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

   OPEN GAP: no healing cap/coping was found in the captured pages for the
   NEWER TiUltra/Xeal-paired multi-unit abutments (Image 7) — only the
   OLDER TiUnite-paired "Healing Abutment" (32332/32333, CC only) was
   listed. Not enough to assume the standard Ø5.0/Ø6.0/Wide healing cap
   (300162 etc.) fits the zygoma-specific Xeal abutment collar geometry,
   so nothing was added for that gap rather than guess — flag if you find
   the correct part.
   ========================================================================= */
const CATALOG_NZCC = {
"Implants": [
  {label:"0° CC RP — TiUltra®", note:"Length shown is nominal; each option lists its actual total length in parentheses.", material:"TiUltra®", items:[
    ["30mm (actual 31.5mm)","301541"],["32.5mm (actual 34mm)","301542"],["35mm (actual 36.5mm)","301543"],
    ["37.5mm (actual 39mm)","301544"],["40mm (actual 41.5mm)","301545"],["42.5mm (actual 44mm)","301546"],
    ["45mm (actual 46.5mm)","301547"],["47.5mm (actual 49mm)","301548"],["50mm (actual 51.5mm)","301549"],
    ["52.5mm (actual 54mm)","301550"],["55mm (actual 56.5mm)","301551"],["57.5mm (actual 59mm)","301552"],
    ["60mm (actual 61.5mm)","301553"]
  ]},
  {label:"0° Ext Hex RP, Ø4.4mm — TiUnite®", note:"External hex connection (not conical). Length shown is nominal; each option lists its actual total length / narrow-diameter portion length in parentheses.", material:"TiUnite®", items:[
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
  {label:"CC RP — for TiUltra® implants (same REF as standard Conical Connection RP)", material:"Ti", items:[
    ["Cover Screw","36650"]
  ]},
  {label:"Brånemark System Zygoma Cover Screw — for TiUnite® implants", material:"Ti", items:[
    ["Cover Screw","32424"]
  ]}
],
"Multi-unit Abutments": [
  {label:"Multi-unit Abutment Xeal Zygoma CC RP, 45° (for TiUltra® implants)", material:"Ti", items:[
    ["S","301575"],["M","301576"],["L","301577"],["XL","301578"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma CC RP, 60° (for TiUltra® implants)", material:"Ti", items:[
    ["S","301652"],["M","301653"],["L","301654"],["XL","301655"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Screw, 45°/60°, all sizes", material:"Ti", items:[
    ["Screw","301759"]
  ]},
  {label:"Multi-unit Abutment External Hex RP, 45° (for 0° TiUnite® implants)", material:"Ti", items:[
    ["H6mm","37624"],["H8mm","37625"],["H10mm","37626"]
  ]},
  {label:"Multi-unit Abutment External Hex RP, 60° (for 0° TiUnite® implants)", material:"Ti", items:[
    ["H6mm","37774"],["H8mm","37775"]
  ]},
  {label:"Multi-unit Abutment Screw — for TiUnite® 45°/60° abutments", material:"Ti", items:[
    ["Abutment Screw","38615"]
  ]},
  {label:"Healing Abutment — for TiUnite® 45°/60° multi-unit abutments", material:"Ti", items:[
    ["Ø4×3mm","32332"],["Ø4×5mm","32333"]
  ]}
],
"Impression & Position Locators": [
  {label:"Impression Coping (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", material:"POM / Ti", items:[
    ["Open Tray (15mm guide pin incl.)","29089"],["Closed Tray","38924"]
  ]},
  {label:"Elos Accurate® Intra-oral Position Locator (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", material:"Ti", items:[
    ["Multi-unit, IO 2C-A","IO 2C-A"],["Kit","IO 2C KIT"]
  ]},
  {label:"Position Locator, Desktop (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", material:"Ti", items:[
    ["Desktop Locator","300473"]
  ]}
],
"Surgical Instruments & Sets": [
  {label:"TiUltra® Sets", material:"—", items:[
    ["NobelZygoma TiUltra PureSet","108236"],["PureSet Tray","PUR1000"],["PureSet Plate","PUR1001"],
    ["TiUltra PureSet Wallchart EU","301981"],["TiUltra PureSet Wallchart US","301982"]
  ]},
  {label:"TiUltra® Drills", material:"SST", items:[
    ["Precision Drill","301585"],["Round Bur","301601"],["Lateral Bur Coarse","301586"],["Lateral Bur Fine","301694"],
    ["Twist Drill Ø2.9mm, Regular","301602"],["Twist Drill Ø2.9mm, Short","301603"],
    ["Twist Drill Ø3.5mm, Regular","301606"],["Twist Drill Ø3.5mm, Short","301607"],
    ["Pilot Drill Ø3.5mm, Regular","301604"],["Pilot Drill Ø3.5mm, Short","301605"]
  ]},
  {label:"TiUltra® Instruments", material:"SST", items:[
    ["Handle","301582"],["Handpiece Adapter","301583"],["Drill Guard","37787"],["Drill Guard Short","37788"],
    ["Depth Indicator Straight","301656"],["Depth Indicator Angled","301657"],["Manual Torque Wrench Prosthetic","29165"]
  ]},
  {label:"TiUltra® Bone Mills, RP 0°", material:"SST", items:[
    ["Bone Mill with Guide","301658"],["Guide","301660"]
  ]},
  {label:"TiUltra® Bone Mills, RP 45°", material:"SST", items:[
    ["Bone Mill with Guide","301659"],["Guide","301584"]
  ]},
  {label:"TiUnite® Sets", material:"—", items:[
    ["NobelZygoma TiUnite PureSet","88521"],["PureSet Tray","PUR1000"],["PureSet Plate","PUR1001"],
    ["TiUnite PureSet Wallchart EU","301893"],["TiUnite PureSet Wallchart US","301894"]
  ]},
  {label:"TiUnite® Drills", material:"SST", items:[
    ["Brånemark System Zygoma Round Bur","DIA 578-0"],
    ["Brånemark System Zygoma Pilot Drill Ø3.5mm, Regular","32630"],["Brånemark System Zygoma Pilot Drill Ø3.5mm, Short","32791"],
    ["Brånemark System Zygoma Twist Drill Ø2.9mm, Regular","32628"],["Brånemark System Zygoma Twist Drill Ø2.9mm, Short","32629"],
    ["Brånemark System Zygoma Twist Drill Ø3.5mm, Regular","32631"],["Brånemark System Zygoma Twist Drill Ø3.5mm, Short","32632"],
    ["NobelZygoma 0° Twist Drill Ø2.9mm, Regular","37766"],["NobelZygoma 0° Twist Drill Ø2.9mm, Short","37767"],
    ["NobelZygoma 0° Twist Drill Ø3.5mm, Regular","37768"],["NobelZygoma 0° Twist Drill Ø3.5mm, Short","37769"],
    ["NobelZygoma 0° Twist Drill Ø4.0mm, Regular","37770"],["NobelZygoma 0° Twist Drill Ø4.0mm, Short","37771"],
    ["NobelZygoma 0° Twist Drill Ø4.4mm, Regular","37772"],["NobelZygoma 0° Twist Drill Ø4.4mm, Short","37773"]
  ]},
  {label:"TiUnite® Instruments", material:"SST", items:[
    ["Handle","37786"],["Drill Guard","37787"],["Drill Guard Short","37788"],
    ["Depth Indicator Straight","37789"],["Depth Indicator Angled","37790"],["Manual Torque Wrench Prosthetic","29165"]
  ]},
  {label:"TiUnite® Other Accessories", material:"SST", items:[
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
  {label:"45° Ext Hex RP — TiUltra®", note:"Length shown is nominal; each option lists its actual total length in parentheses.", material:"TiUltra®", items:[
    ["30mm (actual 31.5mm)","301554"],["32.5mm (actual 34mm)","301555"],["35mm (actual 36.5mm)","301556"],
    ["37.5mm (actual 39mm)","301557"],["40mm (actual 41.5mm)","301558"],["42.5mm (actual 44mm)","301559"],
    ["45mm (actual 46.5mm)","301560"],["47.5mm (actual 49mm)","301561"],["50mm (actual 51.5mm)","301562"],
    ["52.5mm (actual 54mm)","301563"],["55mm (actual 56.5mm)","301564"],["57.5mm (actual 59mm)","301565"],
    ["60mm (actual 61.5mm)","301566"]
  ]},
  {label:"45° Ext Hex RP — TiUnite®", note:"Length shown is nominal; each option lists its actual total length / narrow-diameter portion length in parentheses.", material:"TiUnite®", items:[
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
  {label:"Brånemark System Zygoma Cover Screw — for TiUltra® and TiUnite® implants", material:"Ti", items:[
    ["Cover Screw","32424"]
  ]}
],
"Multi-unit Abutments": [
  {label:"Multi-unit Abutment Xeal Zygoma Ext Hex RP, 0° (for TiUltra® implants)", material:"Ti", items:[
    ["S","301567"],["M","301568"],["L","301569"],["XL","301570"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Ext Hex RP, 17° (for TiUltra® implants — only S/M offered)", material:"Ti", items:[
    ["S","301571"],["M","301572"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Screw, 0°", material:"Ti", items:[
    ["S","301754"],["M","301755"],["L","301756"],["XL","301757"]
  ]},
  {label:"Multi-unit Abutment Xeal Zygoma Screw, 17°, all sizes", material:"Ti", items:[
    ["Screw","301995"]
  ]},
  {label:"Multi-unit Abutment RP, 0° (for TiUnite® implants — only 3mm/5mm offered)", material:"Ti", items:[
    ["H3mm","32330"],["H5mm","32331"]
  ]},
  {label:"Multi-unit Abutment RP, 17° (for TiUnite® implants — only 2mm/3mm offered)", material:"Ti", items:[
    ["H2mm","32328"],["H3mm","32329"]
  ]},
  {label:"Multi-unit Abutment Screw — for TiUnite® 0°/17° abutments", material:"Ti", items:[
    ["Abutment Screw","33397"],["Angled Multi-unit Abutment Screw","38621"]
  ]},
  {label:"Impression Coping — for TiUnite® 0°/17° multi-unit abutments", material:"Ti", items:[
    ["Open Tray Ø4mm","33396"]
  ]}
],
"Impression & Position Locators": [
  {label:"Impression Coping (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", material:"POM / Ti", items:[
    ["Open Tray (15mm guide pin incl.)","29089"],["Closed Tray","38924"]
  ]},
  {label:"Elos Accurate® Intra-oral Position Locator (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", material:"Ti", items:[
    ["Multi-unit, IO 2C-A","IO 2C-A"],["Kit","IO 2C KIT"]
  ]},
  {label:"Position Locator, Desktop (fits all multi-unit abutments except the Brånemark System wide-platform external hex)", material:"Ti", items:[
    ["Desktop Locator","300473"]
  ]}
],
"Surgical Instruments & Sets": CATALOG_NZCC["Surgical Instruments & Sets"]
};
CATALOG_NZEH["All-on-X Components"] = [
  ...withSource(CATALOG_NZEH["Multi-unit Abutments"], "Multi-unit Abutments"),
  ...withSource(CATALOG_NZEH["Impression & Position Locators"], "Impression & Position Locators")
];

/* =========================================================================
   FAVORITES — a curated preset. Fixed set, not
   user-toggled: implants limited to 3–5mm diameters (SLActive only for
   BLC, Acqua only for Neodent), plus healing abutments (standard +
   contoured/customizable), cover screws / closure caps, and All-on-X
   components for all four systems.
   ========================================================================= */
function pickGroups(groups, labels){
  return labels.map(l => groups.find(g => g.label === l)).filter(Boolean);
}
const FAVORITES_PRESET_CATEGORIES = ["Implants","Healing Abutments","Cover Screws / Closure Caps","All-on-X Components"];
const FAVORITES_PRESET = {
  blc: {
    "Implants": withSource(pickGroups(CATALOG_BLC["Implants"], [
      "Ø 3.3mm RB — SLActive®, Roxolid®",
      "Ø 3.75mm RB — SLActive®, Roxolid®",
      "Ø 4.0mm RB — SLActive®, Roxolid®",
      "Ø 4.5mm WB — SLActive®, Roxolid®",
      "Ø 5.0mm WB — SLActive®, Roxolid®"
    ]), "Implants"),
    "Healing Abutments": [
      ...withSource(CATALOG_BLC["Healing Abutments — Crown"], "Healing Abutments — Crown"),
      ...withSource(CATALOG_BLC["Healing Abutments — Bridge"], "Healing Abutments — Bridge"),
      ...withSource(CATALOG_BLC["Anatomic Healing Abutments XC"], "Anatomic Healing Abutments XC")
    ],
    "Cover Screws / Closure Caps": withSource(CATALOG_BLC["Closure Caps"], "Closure Caps"),
    "All-on-X Components": CATALOG_BLC["All-on-X Components"]
  },
  nrcc: {
    "Implants": withSource(CATALOG_NOBEL_RC["Implants"], "Implants"),
    "Healing Abutments": [
      ...withSource(CATALOG_NOBEL_RC["Healing Abutments — Crown"], "Healing Abutments — Crown"),
      ...withSource(CATALOG_NOBEL_RC["Healing Abutments — Bridge"], "Healing Abutments — Bridge"),
      ...withSource(CATALOG_NOBEL_RC["Anatomic Healing Abutments (PEEK)"], "Anatomic Healing Abutments (PEEK)")
    ],
    "Cover Screws / Closure Caps": withSource(CATALOG_NOBEL_RC["Cover Screws"], "Cover Screws"),
    "All-on-X Components": CATALOG_NOBEL_RC["All-on-X Components"]
  },
  nact: {
    "Implants": withSource(pickGroups(CATALOG_NOBEL_NA["Implants"], [
      "NobelActive® — Ø3.0mm",
      "NobelActive® — Ø3.5mm",
      "NobelActive® — Ø4.3mm",
      "NobelActive® — Ø5.0mm"
    ]), "Implants"),
    "Healing Abutments": [
      ...withSource(CATALOG_NOBEL_NA["Healing Abutments — Crown"], "Healing Abutments — Crown"),
      ...withSource(CATALOG_NOBEL_NA["Healing Abutments — Bridge"], "Healing Abutments — Bridge"),
      ...withSource(CATALOG_NOBEL_NA["Anatomic Healing Abutments (PEEK)"], "Anatomic Healing Abutments (PEEK)")
    ],
    "Cover Screws / Closure Caps": withSource(CATALOG_NOBEL_NA["Cover Screws"], "Cover Screws"),
    "All-on-X Components": CATALOG_NOBEL_NA["All-on-X Components"]
  },
  gm: {
    "Implants": withSource(pickGroups(CATALOG_NEODENT_GM["Implants — Helix GM®"], [
      "Ø 3.5mm — Acqua® hydrophilic surface",
      "Ø 3.75mm — Acqua® hydrophilic surface",
      "Ø 4.0mm — Acqua® hydrophilic surface",
      "Ø 4.3mm — Acqua® hydrophilic surface",
      "Ø 5.0mm — Acqua® hydrophilic surface"
    ]), "Implants — Helix GM®"),
    "Healing Abutments": withSource(CATALOG_NEODENT_GM["GM Healing Abutments"], "GM Healing Abutments"),
    "Cover Screws / Closure Caps": withSource(CATALOG_NEODENT_GM["GM Cover Screw"], "GM Cover Screw"),
    "All-on-X Components": CATALOG_NEODENT_GM["All-on-X Components"]
  },
  /* BLX only appears in the Favorites preset for All-on-X — it's
     not offered on the Implants/Healing Abutments/Cover Screws tabs there
     (BLC already covers those). Reuses BLC's shared All-on-X prosthetic
     line, same as the main catalog does. */
  blx: {
    "All-on-X Components": CATALOG_BLX["All-on-X Components"]
  }
};

/* The three systems offered on the All-on-X Components tab of
   Favorites specifically: BLX (not BLC), NobelActive (not
   NobelReplace CC), and Neodent Helix GM Acqua. Other Favorites
   tabs (Implants, Healing Abutments, Cover Screws) are unaffected and keep
   showing BLC/NobelReplace CC/NobelActive/Neodent GM as before. */
const FAVORITES_ALLONX_SYSTEM_IDS = ["blx","nact","gm"];

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
    caveat:"Some S series items are pending FDA/Health Canada clearance — flagged individually where it applies.",
    catalog: CATALOG_NAS, order: CATEGORY_ORDER_S_SERIES, surgical: SURGICAL_CATEGORIES_S_SERIES,
    prefix: { "Implants": "NobelActive® S Implant" }
  },
  nps: {
    id:"nps", name:"NobelParallel S", sub:"Nobel Biocare · S Series · NP conical connection",
    fullMeta:"Nobel Biocare S series brochure 96517 NA 2603, Rev 00 (03/26)",
    caveat:"Some S series items are pending FDA/Health Canada clearance — flagged individually where it applies.",
    catalog: CATALOG_NPS, order: CATEGORY_ORDER_S_SERIES, surgical: SURGICAL_CATEGORIES_S_SERIES,
    prefix: { "Implants": "NobelParallel™ S Implant" }
  },
  nrs: {
    id:"nrs", name:"NobelReplace S", sub:"Nobel Biocare · S Series · NP conical connection",
    fullMeta:"Nobel Biocare S series brochure 96517 NA 2603, Rev 00 (03/26)",
    caveat:"Some S series items are pending FDA/Health Canada clearance — flagged individually where it applies.",
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
    fullMeta:"Neodent® GM Product Catalog 2026, Global Edition (Straumann Group)",
    catalog: CATALOG_NEODENT_GM, order: CATEGORY_ORDER_NEODENT, surgical: SURGICAL_CATEGORIES_NEODENT,
    prefix: { "Implants — Helix GM®": "" }
  }
};
const SYSTEM_IDS = Object.keys(SYSTEMS);
