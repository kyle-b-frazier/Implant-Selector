/* =========================================================================
   COMPATIBILITY RULES — which catalog parts fit which implants. Platform,
   surface-generation and diameter matching, the per-system wizard steps,
   the multi-unit healing cap / temporary coping links, and the order
   mismatch check. Pure functions over the catalog data in catalog/*.js (no
   page or DOM access), so test/catalog.test.js can run them in Node.
   ========================================================================= */
/* ---------- Platform cross-check ----------
   Detects likely platform/diameter mismatches within an order: e.g. an
   RB-platform implant selected alongside a WB-platform cover screw for the
   same system. Deliberately permissive — a single order can legitimately
   contain multiple platforms (e.g. a 3.3mm RB implant for one site and a
   5.0mm WB implant for another), so this only flags a component whose
   platform doesn't match ANY implant platform present for that system in
   the order. Zygoma parts are also checked for implant surface generation
   (TiUltra vs TiUnite), and Neodent implant analogs for implant diameter
   (Neodent has one GM connection, so it has no platform check). */
const PLATFORM_CHECK_CATEGORY_NAME = {
  blc:"Implants", blx:"Implants", blt:"Implants",
  nrcc:"Implants", nact:"Implants", npcc:"Implants",
  nas:"Implants", nps:"Implants", nrs:"Implants",
  nzcc:"Implants", nzeh:"Implants",
  gm:"Implants — Helix GM®" // no platforms, but its implant analogs are diameter-specific
};
/* Every platform a label names. A part labelled for two platforms
   ("RB/WB", "RP/WP", "NC/RC") fits exactly those two — never a third one,
   so this returns all of them rather than collapsing to "unspecified".
   An empty list means the label doesn't name a platform at all. */
const NOBEL_PLATFORM_SYSTEMS = new Set(['nrcc','nact','npcc','nas','nps','nrs','nzcc','nzeh']);
function platformTokens(systemId, text){
  const t = text || '';
  const tokens = [];
  if(systemId==='blc' || systemId==='blx'){
    if(/\bRB\b/.test(t)) tokens.push('RB');
    if(/\bWB\b/.test(t)) tokens.push('WB');
  } else if(NOBEL_PLATFORM_SYSTEMS.has(systemId)){
    if(/\bNP\b/.test(t)) tokens.push('NP');
    if(/\bRP\b/.test(t)) tokens.push('RP');
    if(/\bWP\b/.test(t)) tokens.push('WP');
    if(/\b3\.0(?![\d.])/.test(t)) tokens.push('3.0'); // e.g. "3.0 Platform" — not "3.0mm" mid-number
  } else if(systemId==='blt'){
    if(/\bSC\b/.test(t)) tokens.push('SC');
    if(/\bNC\b/.test(t)) tokens.push('NC');
    if(/\bRC\b/.test(t)) tokens.push('RC');
  }
  return tokens; // Neodent (gm): one GM connection for every diameter, nothing to check
}

/* NobelActive and NobelParallel CC implant groups are labeled only by
   diameter ("NobelActive® — Ø3.5mm"), with no NP/RP/WP text — unlike
   NobelReplace CC, which spells the platform out. Confirmed against
   Nobel Biocare's own shop listings (e.g. NobelActive RP 5.0mm — note
   5.0mm is RP, not WP; only 5.5mm is WP). Used only as a fallback, and
   only for these two systems' Implants category. */
const NACT_NPCC_DIAMETER_TO_PLATFORM = [
  [3.0, '3.0'], [3.5, 'NP'], [3.75, 'NP'], [4.3, 'RP'], [5.0, 'RP'], [5.5, 'WP']
];
function diameterPlatformFallback(text){
  const m = text.match(/Ø\s*([\d.]+)\s*mm/);
  if(!m) return null;
  const dia = parseFloat(m[1]);
  const found = NACT_NPCC_DIAMETER_TO_PLATFORM.find(([d])=>Math.abs(d-dia)<0.01);
  return found ? found[1] : null;
}

/* The single entry point everything else should use to find the set of
   platforms an item fits: checks the group label, then the item's own name
   (many Nobel groups bundle multiple platforms as separate items rather
   than separate groups — e.g. Cover Screws' one group holds "3.0 Platform"/
   "NP"/"RP"/"WP" as four items), then — for NobelActive/NobelParallel CC
   implants only — falls back to diameter. An empty set means the item
   names no platform and fits any implant in its system. */
function deriveItemPlatforms(systemId, category, groupLabel, itemName){
  let tokens = platformTokens(systemId, groupLabel);
  if(!tokens.length) tokens = platformTokens(systemId, itemName);
  if(!tokens.length && (systemId==='nact' || systemId==='npcc') && WIZARD_IMPLANTS_CATEGORY_NAME[systemId] === category){
    const p = diameterPlatformFallback((groupLabel||'') + ' ' + (itemName||''));
    if(p) tokens = [p];
  }
  return new Set(tokens);
}
function platformLabel(platforms){ return [...platforms].join('/'); }

/* Implant surface generation (TiUltra® vs TiUnite®). Only NobelZygoma
   pairs each surface generation with its own abutment line (TiUltra with
   the Xeal Zygoma abutments, TiUnite with the older external-hex ones), so
   only those two systems are filtered on it. Elsewhere — e.g. the S series
   and the conical-connection line — Xeal multi-unit abutments fit both
   TiUltra and TiUnite implants, so generation must not narrow anything. */
const GENERATION_SYSTEMS = new Set(['nzcc','nzeh']);
function generationTokens(systemId, text){
  if(!GENERATION_SYSTEMS.has(systemId)) return [];
  const t = text || '';
  const tokens = [];
  if(/TiUltra/i.test(t) || /\bXeal\b/i.test(t)) tokens.push('TiUltra');
  if(/TiUnite/i.test(t)) tokens.push('TiUnite');
  return tokens;
}
function deriveItemGenerations(systemId, groupLabel, itemName){
  let tokens = generationTokens(systemId, groupLabel);
  if(!tokens.length) tokens = generationTokens(systemId, itemName);
  return new Set(tokens);
}

/* Diameters listed in an item name such as "Ø3.5/3.75mm" or "Ø5.0/6.0/7.0mm"
   (Neodent's implant analogs are matched to implant diameter this way). */
function nameDiameters(text){
  const m = (text||'').match(/Ø\s*([\d.\/]+)\s*mm/);
  return m ? m[1].split('/').map(parseFloat).filter(n=>!isNaN(n)) : [];
}

/* An implant "profile" — every platform, surface generation and diameter
   a case's implants have. A single implant yields one of each; the
   All-on-X wizard accumulates them across every implant picked. */
function makeProfile(){ return {platforms:new Set(), generations:new Set(), diameters:new Set()}; }
function cloneProfile(p){ return {platforms:new Set(p.platforms), generations:new Set(p.generations), diameters:new Set(p.diameters)}; }
function mergeProfile(into, from){
  from.platforms.forEach(x=>into.platforms.add(x));
  from.generations.forEach(x=>into.generations.add(x));
  from.diameters.forEach(x=>into.diameters.add(x));
}
function implantProfileFor(systemId, category, groupLabel, itemName){
  const p = makeProfile();
  deriveItemPlatforms(systemId, category, groupLabel, itemName).forEach(x=>p.platforms.add(x));
  deriveItemGenerations(systemId, groupLabel, itemName).forEach(x=>p.generations.add(x));
  const d = nameDiameters(groupLabel)[0] || nameDiameters(itemName)[0];
  if(d) p.diameters.add(d);
  return p;
}
/* Accepts a profile, a platform string, or a Set of platforms (plus an
   optional generation) and always returns a profile. */
function toProfile(implantPlatform, implantGeneration){
  if(implantPlatform && implantPlatform.platforms instanceof Set) return implantPlatform;
  const p = makeProfile();
  if(implantPlatform instanceof Set) implantPlatform.forEach(x=>p.platforms.add(x));
  else if(implantPlatform) p.platforms.add(implantPlatform);
  if(implantGeneration instanceof Set) implantGeneration.forEach(x=>p.generations.add(x));
  else if(implantGeneration) p.generations.add(implantGeneration);
  return p;
}

/* Records a just-picked implant into a tracker — either a full profile
   (All-on-X case wizard) or a bare Set of platforms. */
function trackImplantProfile(tracker, systemId, category, groupLabel, itemName){
  if(!tracker) return;
  const picked = implantProfileFor(systemId, category, groupLabel, itemName);
  if(tracker.platforms instanceof Set) mergeProfile(tracker, picked);
  else if(tracker instanceof Set) picked.platforms.forEach(x=>tracker.add(x));
}

/* Whether one catalog item fits the implant(s) described by `profile`.
   A part that names platforms must share one with the implants; a part
   that names no platform fits any. Same for surface generation (zygoma
   only) and, for groups flagged `fitsImplantDiameters`, implant diameter.
   Never "falls back" to showing everything when nothing fits — offering
   another platform's part is exactly the mistake this exists to prevent. */
function partFits(systemId, category, group, itemName, profile){
  if(!profile) return true;
  const plats = deriveItemPlatforms(systemId, category, group.label, itemName);
  if(plats.size && profile.platforms.size && ![...plats].some(x=>profile.platforms.has(x))) return false;
  const gens = deriveItemGenerations(systemId, group.label, itemName);
  if(gens.size && profile.generations.size && ![...gens].some(x=>profile.generations.has(x))) return false;
  if(group.fitsImplantDiameters && profile.diameters.size){
    const ds = nameDiameters(itemName);
    if(ds.length && !ds.some(d=>[...profile.diameters].some(x=>Math.abs(x-d)<0.01))) return false;
  }
  return true;
}
/* Every system's Implants category, including Neodent (excluded from the
   platform mismatch check above since it has no platform system, but the
   wizard still applies there — just without platform filtering). */
const WIZARD_IMPLANTS_CATEGORY_NAME = {
  blc:"Implants", blx:"Implants", blt:"Implants",
  nrcc:"Implants", nact:"Implants", npcc:"Implants",
  gm:"Implants — Helix GM®",
  nas:"Implants", nps:"Implants", nrs:"Implants",
  nzcc:"Implants", nzeh:"Implants"
};

/* ---------- Treatment Wizard configuration ----------
   For each system, the list of "part types" the wizard can offer after an
   implant is selected. Each part type has one or more "options" (its
   subtypes, e.g. Regular vs Anatomic/Contoured healing abutments); each
   option points at a real catalog category, optionally narrowed further by
   a label filter (used where a system keeps subtypes in one category, like
   Neodent's Customizable healing abutments). The wizard filters that
   category's groups down to the implant's platform (RB/WB, NP/RP/WP,
   SC/NC/RC) when derivable, then lets the person pick diameter (=group)
   and size/gingival height (=item) from what's left — reusing the same
   catalog structure rather than a separate compatibility database. */
const WIZARD_CONFIG = {
  blc: [
    {label:"Cover Screw", options:[{label:"Closure Cap", category:"Closure Caps"}]},
    {label:"Healing Abutment", options:[
      {label:"Regular (Crown)", category:"Healing Abutments — Crown"},
      {label:"Regular (Bridge)", category:"Healing Abutments — Bridge"},
      {label:"Anatomic / Contoured (XC)", category:"Anatomic Healing Abutments XC"}
    ]},
    {label:"Impression Coping", options:[{label:"Impression Component", category:"Impression Components"}]},
    {label:"Temporary Abutment", options:[{label:"Temporary Abutment", category:"Temporary Abutments"}]},
    {label:"Analog", options:[{label:"Analog / Digital Impression", category:"Analogs & Digital Impression"}]},
    // Only the abutments themselves — the same category also holds their
    // impression posts, analogs, protective caps, copings and lab parts.
    {label:"Multi-unit Abutment", options:[{label:"Screw-retained / Multi-unit Abutment", category:"Screw-retained / Multi-unit Abutments",
      labelMustInclude:["Straight, angulation 0°", "Angled 17°", "Angled 30°"]}]},
    {label:"Final Abutment", options:[
      {label:"Anatomic (cementable)", category:"Anatomic Abutments"},
      {label:"Variobase® (screw-retained crown)", category:"Variobase® for Crown"},
      {label:"Gold", category:"Gold Abutments"},
      {label:"Novaloc® (overdenture)", category:"Novaloc® Abutments", labelMustInclude:["angulation","Angled"]}
    ]},
    {label:"Replacement Screw", options:[{label:"Replacement Screw", category:"Replacement Screws"}]}
  ],
  blt: [
    {label:"Cover Screw", options:[{label:"Closure Cap", category:"Closure Caps"}]},
    {label:"Healing Abutment", options:[{label:"Healing Abutment", category:"Healing Abutments"}]},
    {label:"Impression Coping", options:[{label:"Impression Component", category:"Impression Components"}]},
    {label:"Temporary Abutment", options:[{label:"Temporary Abutment", category:"Temporary Abutments"}]},
    {label:"Final Abutment", options:[{label:"Anatomic / Cementable Abutment", category:"Anatomic & Cementable Abutments"}]},
    {label:"Replacement Screw", options:[{label:"Replacement Screw", category:"Replacement Screws"}]}
  ],
  gm: [
    {label:"Cover Screw", options:[{label:"GM Cover Screw", category:"GM Cover Screw"}]},
    {label:"Healing Abutment", options:[
      {label:"Standard", category:"GM Healing Abutments", labelMustExclude:"Customizable"},
      {label:"Customizable / Contoured", category:"GM Healing Abutments", labelMustInclude:"Customizable"}
    ]},
    {label:"Impression / Analog", options:[{label:"Impression Component / Analog", category:"Impression Components & Analogs"}]},
    {label:"Multi-unit Abutment", options:[{label:"GM Mini Conical Abutment", category:"GM Mini Conical Abutments (Multi-unit)", labelMustExclude:"Accessories"}]},
    {label:"Multi-unit Abutment Screw", options:[{label:"Neo GM Screw", category:"Replacement Screws", labelMustInclude:"Neo GM Screw"}]},
    {label:"Final Abutment", options:[
      {label:"GM Abutment (standard)", category:"Abutments", labelMustInclude:"GM Exact Abutment", labelMustExclude:"Accessories"},
      {label:"GM Micro Abutment", category:"Abutments", labelMustInclude:"GM Micro Abutment", labelMustExclude:"Accessories"}
    ]},
    {label:"Replacement Screw", options:[{label:"Replacement Screw", category:"Replacement Screws"}]}
  ]
};
// NobelReplace CC, NobelActive, NobelParallel CC share the same conical connection prosthetics
WIZARD_CONFIG.nrcc = [
  {label:"Cover Screw", options:[{label:"Cover Screw", category:"Cover Screws"}]},
  {label:"Healing Abutment", options:[
    {label:"Regular (Crown)", category:"Healing Abutments — Crown"},
    {label:"Regular (Bridge)", category:"Healing Abutments — Bridge"},
    {label:"Anatomic (PEEK)", category:"Anatomic Healing Abutments (PEEK)"}
  ]},
  {label:"Impression Coping", options:[{label:"Impression Coping", category:"Impression Copings"}]},
  {label:"Temporary Abutment", options:[{label:"Temporary Abutment", category:"Temporary Abutments"}]},
  {label:"Implant Replica / Analog", options:[{label:"Implant Replica / Analog", category:"Implant Replicas & Analogs"}]},
  {label:"Multi-unit Abutment", options:[{label:"Multi-unit Abutment Plus", category:"Multi-unit Abutments Plus", labelMustExclude:"Accessories"}]},
  {label:"Multi-unit Abutment Screw", options:[{label:"Screw for Multi-unit Abutment", category:"Clinical & Laboratory Screws", labelMustInclude:"Multi-unit Abutment restorations"}]},
  {label:"Final Abutment", options:[
    {label:"Esthetic Abutment, straight", category:"Esthetic Abutments & Universal Base", labelMustInclude:"straight"},
    {label:"Esthetic Abutment, 15°", category:"Esthetic Abutments & Universal Base", labelMustInclude:"15°"},
    {label:"Universal Base", category:"Esthetic Abutments & Universal Base", labelMustInclude:"Universal Base"}
  ]}
];
WIZARD_CONFIG.nact = WIZARD_CONFIG.nrcc;
WIZARD_CONFIG.npcc = WIZARD_CONFIG.nrcc;
// BLX shares BLC's entire catalog, so the same wizard config applies
WIZARD_CONFIG.blx = WIZARD_CONFIG.blc;

// S series (NobelActive S / NobelParallel S / NobelReplace S) share one
// prosthetic line, so one wizard config covers all three.
WIZARD_CONFIG.nas = [
  {label:"Cover Screw", options:[{label:"Cover Screw", category:"Cover Screws"}]},
  {label:"Healing Abutment", options:[{label:"Healing Abutment", category:"Healing Abutments"}]},
  {label:"Impression Coping", options:[{label:"Impression Coping", category:"Impression Copings"}]},
  {label:"Temporary Abutment", options:[{label:"Temporary Abutment", category:"Temporary Abutments"}]},
  {label:"Scan Body", options:[{label:"Scan Body", category:"Scan Bodies"}]},
  {label:"Multi-unit Abutment", options:[{label:"Multi-unit Abutment Xeal", category:"Multi-unit Abutments", labelMustExclude:"Healing Cap"}]},
  {label:"Final Abutment", options:[
    {label:"Esthetic Abutment, straight", category:"Esthetic Abutments", labelMustExclude:"15°"},
    {label:"Esthetic Abutment, 15°", category:"Esthetic Abutments", labelMustInclude:"15°"},
    {label:"Universal Base ASC", category:"Universal Base ASC", labelMustInclude:"Universal Base"}
  ]}
];
WIZARD_CONFIG.nps = WIZARD_CONFIG.nas;
WIZARD_CONFIG.nrs = WIZARD_CONFIG.nas;

// NobelZygoma — both connection types share the same wizard shape (their
// catalogs are structured identically, just different category contents).
WIZARD_CONFIG.nzcc = [
  {label:"Cover Screw", options:[{label:"Cover Screw", category:"Cover Screws"}]},
  {label:"Multi-unit Abutment", options:[{label:"Multi-unit Abutment", category:"Multi-unit Abutments", labelMustExclude:["Screw", "Healing Abutment", "Impression Coping"]}]},
  {label:"Multi-unit Abutment Screw", options:[{label:"Multi-unit Abutment Screw", category:"Multi-unit Abutments", labelMustInclude:"Screw"}]},
  {label:"Impression / Position Locator", options:[{label:"Impression or Position Locator", category:"Impression & Position Locators"}]}
];
WIZARD_CONFIG.nzeh = WIZARD_CONFIG.nzcc;

/* Option-level group filters: labelMustInclude / labelMustExclude narrow a
   category down to the groups a wizard step is about. Each takes a string
   or a list: a group is kept if its label contains any of the includes and
   none of the excludes. */
function applyOptionLabelFilters(groups, option){
  let out = groups;
  if(option && option.labelMustInclude){
    const inc = [].concat(option.labelMustInclude);
    out = out.filter(g=>inc.some(s=>g.label.includes(s)));
  }
  if(option && option.labelMustExclude){
    const exc = [].concat(option.labelMustExclude);
    out = out.filter(g=>!exc.some(s=>g.label.includes(s)));
  }
  return out;
}

/* A category's groups that hold at least one item fitting the implant(s).
   `implantPlatform` may be a platform string, a Set of platforms, or a full
   implant profile (see toProfile). If nothing fits, the result is empty —
   the caller tells the person so, rather than offering other platforms'
   parts. */
function wizardCandidateGroups(systemId, categoryName, implantPlatform, option, implantGeneration){
  const sys = SYSTEMS[systemId];
  const profile = toProfile(implantPlatform, implantGeneration);
  const groups = applyOptionLabelFilters((sys.catalog[categoryName] || []).slice(), option);
  return groups.filter(g=>wizardCandidateItems(systemId, categoryName, g, g.items, profile).length>0);
}

/* The items in one group that fit the implant(s). Handles platforms
   encoded per item as well as per group (e.g. Nobel's Cover Screws holds
   one group with "3.0 Platform"/"NP"/"RP"/"WP" as four separate items). */
function wizardCandidateItems(systemId, categoryName, group, items, implantPlatform, implantGeneration){
  const profile = toProfile(implantPlatform, implantGeneration);
  return items.filter(([name])=>partFits(systemId, categoryName, group, name, profile));
}

/* ---------- Multi-unit abutment healing cap prompt ----------
   Each system brands the cap that sits on a multi-unit-style abutment
   during healing differently — Nobel calls it a "Healing Cap" outright;
   Straumann's equivalent line is "Protective Caps"; Neodent's closest
   analog is its "Protection Cylinder". Triggers the same way the implant
   wizard does: offered right after the abutment itself is added, matched
   against the item's TRUE category (so it still fires whether the
   abutment was added from its home tab or from All-on-X Components). */
const MULTI_UNIT_CAP_TRIGGER = {
  blc: {
    category: "Screw-retained / Multi-unit Abutments",
    capLabel: "Protective Cap",
    capGroupLabel: "Protective Caps (4 pack, PEEK/TAN)"
  },
  gm: {
    category: "GM Mini Conical Abutments (Multi-unit)",
    capLabel: "Protection Cylinder",
    capGroupLabel: "GM Mini Conical Abutment — Accessories",
    capNameFilter: "Protection Cylinder"
  },
  nrcc: {
    category: "Multi-unit Abutments Plus",
    capLabel: "Healing Cap",
    capGroupLabel: "Multi-unit Accessories",
    capNameFilter: "Healing Cap"
  }
};
MULTI_UNIT_CAP_TRIGGER.nas = {
  category: "Multi-unit Abutments",
  capLabel: "Healing Cap",
  capGroupLabel: "Multi-unit Healing Cap (2/pkg) — compatible with all Multi-unit Abutments"
};
MULTI_UNIT_CAP_TRIGGER.nps = MULTI_UNIT_CAP_TRIGGER.nas;
MULTI_UNIT_CAP_TRIGGER.nrs = MULTI_UNIT_CAP_TRIGGER.nas;
MULTI_UNIT_CAP_TRIGGER.blx = MULTI_UNIT_CAP_TRIGGER.blc;
MULTI_UNIT_CAP_TRIGGER.nact = MULTI_UNIT_CAP_TRIGGER.nrcc;
MULTI_UNIT_CAP_TRIGGER.npcc = MULTI_UNIT_CAP_TRIGGER.nrcc;

/* Multi-unit temporary/pick-up copings — used for the immediate provisional
   restoration. No confirmed data for Neodent or BLT, so those are left out
   rather than guessed; the case wizard skips this step for them. */
const MULTI_UNIT_TEMP_COPING_CONFIG = {
  blc: {
    category: "Screw-retained / Multi-unit Abutments",
    label: "Temporary Coping",
    groupLabel: "Copings & Coping Auxiliaries",
    nameFilter: "Temporary Coping"
  },
  nrcc: {
    category: "Multi-unit Abutments Plus",
    label: "Temporary Coping",
    groupLabel: "Multi-unit Accessories",
    // Not the Temporary Snap Coping: Nobel lists it as compatible with
    // Multi-unit Abutment Xeal only, and this line's abutments are MUA Plus.
    nameFilter: "Temporary Coping"
  }
};
MULTI_UNIT_TEMP_COPING_CONFIG.blx = MULTI_UNIT_TEMP_COPING_CONFIG.blc;
MULTI_UNIT_TEMP_COPING_CONFIG.nact = MULTI_UNIT_TEMP_COPING_CONFIG.nrcc;
MULTI_UNIT_TEMP_COPING_CONFIG.npcc = MULTI_UNIT_TEMP_COPING_CONFIG.nrcc;

/* Resolves an item back to its TRUE home category, even if it was added
   from the All-on-X Components duplicate tab (which carries a different
   category string but tags the group with its real sourceCategory). */
function resolveTrueCategory(systemId, category, groupLabel){
  const sys = SYSTEMS[systemId];
  const group = (sys.catalog[category] || []).find(g=>g.label===groupLabel);
  return (group && group.sourceCategory) || category;
}

function findGroup(sid, category, groupLabel){
  return ((SYSTEMS[sid].catalog[category]) || []).find(g=>g.label===groupLabel) || {label: groupLabel};
}
/* `order` is the selection map, `${systemId}::${ref}` -> {name, group, category, system, ...}. */
function detectPlatformMismatches(order){
  const warnings = [];
  const bySystem = {};
  Object.values(order).forEach(it=>{ (bySystem[it.system] = bySystem[it.system] || []).push(it); });

  Object.keys(bySystem).forEach(sid=>{
    const implantsCat = PLATFORM_CHECK_CATEGORY_NAME[sid];
    if(!implantsCat) return;
    const items = bySystem[sid];

    const implants = makeProfile();
    let anyImplant = false;
    items.forEach(it=>{
      if(it.category === implantsCat){
        anyImplant = true;
        mergeProfile(implants, implantProfileFor(sid, it.category, it.group, it.name));
      }
    });
    if(!anyImplant) return; // no implants in this system's order — nothing to check against

    items.forEach(it=>{
      if(it.category === implantsCat) return;
      const group = findGroup(sid, it.category, it.group);
      if(partFits(sid, it.category, group, it.name, implants)) return;
      warnings.push({ system: sid, item: it, reason: mismatchReason(sid, it, implants) });
    });
  });
  return warnings;
}
function mismatchReason(sid, it, implants){
  const plats = deriveItemPlatforms(sid, it.category, it.group, it.name);
  if(plats.size && implants.platforms.size && ![...plats].some(x=>implants.platforms.has(x))){
    return `${platformLabel(plats)}-platform part, but this order's implants are ${platformLabel(implants.platforms)}-platform`;
  }
  const gens = deriveItemGenerations(sid, it.group, it.name);
  if(gens.size && implants.generations.size && ![...gens].some(x=>implants.generations.has(x))){
    return `${[...gens].join('/')} part, but this order's implants are ${[...implants.generations].join('/')}`;
  }
  return `sized for Ø${nameDiameters(it.name).join('/')}mm implants, but this order's implants are Ø${[...implants.diameters].join('/')}mm`;
}
function formatMismatchLine(w){
  return `${SYSTEMS[w.system].name} — "${w.item.name}" (${w.item.group}): ${w.reason}`;
}

/* Catalog citation for one order line, for the "catalog pages" switch on
   the order output: the catalog page its group cites, or the group's
   `unverified` note when this item's number is one the catalogs don't
   list. Looks in the line's own category first, then the rest (All-on-X
   lines can carry a copy's category). */
function catalogSourceFor(it){
  const cat = SYSTEMS[it.system].catalog;
  const cats = [it.category, ...Object.keys(cat).filter(c=>c!==it.category)];
  for(const c of cats){
    const group = (cat[c]||[]).find(g=>g.label===it.group && g.items.some(([,r])=>r===it.ref));
    if(!group) continue;
    if(group.unverified && (!group.source || group.unverified.includes(it.ref.replace(/^REF\s*/,'')))){
      return { unverified: group.unverified };
    }
    return { source: group.source };
  }
  return { unverified: 'Not found in the catalog data' };
}
