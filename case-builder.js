/* Case builder: the one-screen replacement for the old step-by-step
   wizards. Two kinds share it:

   - "case"   — single crown(s) / bridge. Mark teeth, pick the system and
                the implant, tick which parts the case needs, and pick each
                one from choices already narrowed to the implant's
                platform. Each extra implant tooth follows the first one
                ("same as #8") until it is changed.
   - "allonx" — full arch. Implants and parts are counted rather than
                picked one per tooth.

   Each part starts on whatever was picked for it last time on the same
   system and platform (remembered in this browser only); nothing is
   ticked until it is asked for. Loaded after compatibility.js; the app
   code in index.html provides selected, render, renderOrder, showModal,
   showToast, confirmGroupCaution and navigateWithFade. The helpers at the
   top touch no page state and are tested in test/catalog.test.js. */

/* ---------- Catalog helpers ---------- */

/* Detects "sold N per package" items — e.g. "Protective Caps (4 pack,
   PEEK/TAN)", "(2/pkg)" or "(4 pcs)". The pack size can live on the item's
   own name or on its group's label (Straumann's Protective Caps state it on
   the group only). Returns 1 when nothing matches. Quantities in the order
   are packages, so 3 pieces of a 4-pack item is 1 package. */
function parsePackSize(name, groupLabel){
  const re = /\((\d+)\s*(?:pack|pcs)\b|\((\d+)\/pkg\)/i;
  let m = (name||'').match(re);
  if(!m) m = (groupLabel||'').match(re);
  if(!m) return 1;
  const n = parseInt(m[1]||m[2],10);
  return (n && n>1) ? n : 1;
}

/* "GH 1.5 / AH 2mm (3.5mm)" — gingival height, abutment height and the
   total height in parentheses. */
function parseGHAH(name){
  const m = name.match(/GH\s*([\d.]+)\s*\/\s*AH\s*([\d.]+)\s*mm(?:\s*\(([\d.]+)mm\))?/i);
  if(!m) return null;
  return { gh: m[1], ah: m[2], total: m[3] || null };
}

/* Lays a system's implant groups out as a grid: one row per diameter,
   one column per length, with a variant switch (surface, or connection
   line) above it when the system has more than one. Group labels read
   "<diameter> — <variant>" or "<line> — <diameter>"; whichever side holds
   the "Ø" is the row label. Any system whose labels don't split cleanly
   gets one row per group instead. */
function implantGrid(systemId){
  const category = WIZARD_IMPLANTS_CATEGORY_NAME[systemId];
  const groups = SYSTEMS[systemId].catalog[category] || [];
  const split = groups.map(g=>g.label.split(' — '));
  let rows = null;
  if(groups.length && split.every(p=>p.length===2)){
    const sides = [new Set(split.map(p=>p[0])), new Set(split.map(p=>p[1]))];
    const withO = side => split.filter(p=>p[side].includes('Ø')).length;
    const diam = sides[0].size===1 ? 1 : sides[1].size===1 ? 0 : (withO(1) > withO(0) ? 1 : 0);
    const hasVariants = sides[1-diam].size > 1;
    rows = groups.map((g,i)=>({ group:g, label:split[i][diam], variant: hasVariants ? split[i][1-diam] : '' }));
    if(new Set(rows.map(r=>r.variant+'\u0000'+r.label)).size !== rows.length) rows = null;
  }
  if(!rows) rows = groups.map(g=>({ group:g, label:g.label, variant:'' }));
  return { category, variants:[...new Set(rows.map(r=>r.variant))], rows };
}

/* Column heading for an implant length: "30mm (actual 31.5mm)" → "30". */
function lengthKey(name){ return name.split(' (')[0].replace(/mm$/,''); }
function gridColumns(rows){
  const keys = new Set();
  rows.forEach(r=>r.group.items.forEach(([nm])=>keys.add(lengthKey(nm))));
  return [...keys].sort((a,b)=>parseFloat(a)-parseFloat(b));
}

/* Overdenture attachments, for systems whose catalogs have them: the
   abutment (narrowed to the implant's platform), then the denture-side
   parts, which fit any of that line's abutments. */
const OVERDENTURE_PARTS = {
  blc: [
    {label:"Overdenture Abutment", options:[{label:"Novaloc® abutment", category:"Novaloc® Abutments", labelMustInclude:["angulation","Angled"]}]},
    {label:"Retention Inserts", options:[{label:"Novaloc® retention insert", category:"Novaloc® Abutments", labelMustInclude:"Retention Inserts", anyPlatform:true}]},
    {label:"Overdenture Processing", options:[{label:"Novaloc® processing", category:"Novaloc® Abutments", labelMustInclude:["Processing Packages","Matrix Housings"], anyPlatform:true}]},
    {label:"Overdenture Impression / Analog", options:[{label:"Novaloc® impression / analog", category:"Novaloc® Abutments", labelMustInclude:"Impression / Model", anyPlatform:true}]}
  ],
  nrcc: [
    {label:"Overdenture Abutment", options:[{label:"Locator R-Tx® abutment", category:"Locator R-Tx® Abutments", labelMustInclude:["NP","RP","WP"]}]},
    {label:"Retention Inserts", options:[{label:"Locator R-Tx® retention insert", category:"Locator R-Tx® Abutments", labelMustInclude:"Retention Inserts", anyPlatform:true}]},
    {label:"Overdenture Processing", options:[{label:"Locator R-Tx® processing / impression", category:"Locator R-Tx® Abutments", labelMustInclude:"Processing Components", anyPlatform:true}]}
  ]
};
OVERDENTURE_PARTS.blx = OVERDENTURE_PARTS.blc;
OVERDENTURE_PARTS.nact = OVERDENTURE_PARTS.nrcc;
OVERDENTURE_PARTS.npcc = OVERDENTURE_PARTS.nrcc;
const OVERDENTURE_CATEGORIES = new Set(Object.values(OVERDENTURE_PARTS).flatMap(l=>l.flatMap(p=>p.options.map(o=>o.category))));
function overdentureLabels(systemId){ return (OVERDENTURE_PARTS[systemId] || []).map(p=>p.label); }

/* The part types the case builder offers for a system: the wizard steps
   from compatibility.js, plus the multi-unit healing cap right after the
   multi-unit abutment for systems that have one, and the overdenture
   parts at the end. The cap fits any multi-unit abutment of its line, so
   it isn't narrowed by implant platform. Overdenture abutments are left
   out of "Final Abutment", since they have their own card. */
function builderPartTypes(systemId){
  const steps = (WIZARD_CONFIG[systemId] || []).map(s=>({ label:s.label, options:s.options.filter(o=>!OVERDENTURE_CATEGORIES.has(o.category)) }))
    .filter(s=>s.options.length)
    .concat(OVERDENTURE_PARTS[systemId] || []);
  const cap = MULTI_UNIT_CAP_TRIGGER[systemId];
  const mu = steps.findIndex(s=>s.label==='Multi-unit Abutment');
  if(cap && mu>=0){
    steps.splice(mu+1, 0, { label:`Multi-unit ${cap.capLabel}`, options:[{
      label:cap.capLabel, category:cap.category, labelMustInclude:cap.capGroupLabel,
      itemNameFilter:cap.capNameFilter, anyPlatform:true
    }]});
  }
  return steps;
}

/* One option's groups, each with only the items that fit `profile`;
   groups left with nothing are dropped. */
function optionGroups(systemId, option, profile){
  const prof = option.anyPlatform ? makeProfile() : profile;
  const groups = applyOptionLabelFilters((SYSTEMS[systemId].catalog[option.category] || []).slice(), option);
  return groups.map(g=>{
    let items = g.items;
    if(option.itemNameFilter) items = items.filter(([nm])=>nm.includes(option.itemNameFilter));
    return { group:g, items: wizardCandidateItems(systemId, option.category, g, items, prof) };
  }).filter(x=>x.items.length);
}

/* GH × AH table for a group whose every item follows the GH/AH naming,
   or null. `cells[gh][ah]` is the item. */
function ghahTable(items){
  const parsed = items.map(it=>({ it, p: parseGHAH(it[0]) }));
  if(parsed.length<2 || !parsed.every(x=>x.p)) return null;
  const ghs = [...new Set(parsed.map(x=>x.p.gh))].sort((a,b)=>a-b);
  const ahs = [...new Set(parsed.map(x=>x.p.ah))].sort((a,b)=>a-b);
  if(ghs.length<2) return null;
  const cells = {};
  parsed.forEach(({it,p})=>{ (cells[p.gh] = cells[p.gh] || {})[p.ah] = { item:it, total:p.total }; });
  return { ghs, ahs, cells };
}

/* A table for a group whose items are all "<row>, <column>" (e.g.
   "Ø4.5mm, H2mm") and fill most of a grid, or null. */
function axisTable(items){
  const parsed = items.map(it=>({ it, p: it[0].split(', ') }));
  if(parsed.length<4 || !parsed.every(x=>x.p.length===2)) return null;
  const rows = [...new Set(parsed.map(x=>x.p[0]))];
  const num = t => parseFloat((t.match(/[\d.]+/)||['0'])[0]);
  const cols = [...new Set(parsed.map(x=>x.p[1]))].sort((a,b)=>num(a)-num(b));
  if(rows.length<2 || cols.length<2 || parsed.length < rows.length*cols.length*0.6) return null;
  const cells = {};
  for(const {it,p} of parsed){
    cells[p[0]] = cells[p[0]] || {};
    if(cells[p[0]][p[1]]) return null;
    cells[p[0]][p[1]] = it;
  }
  return { rows, cols, cells };
}

/* Long lists of group names like "For Crowns — RB/WB ∅3.8mm" are offered
   in two steps: the part before " — ", then the part after. Null when
   that would not shorten the list. */
function splitTypeLabels(labels){
  if(labels.length<5) return null;
  const parts = labels.map(l=>{ const i = l.indexOf(' — '); return i<0 ? [l, ''] : [l.slice(0,i), l.slice(i+3)]; });
  const heads = [...new Set(parts.map(x=>x[0]))];
  if(heads.length<2 || heads.length>labels.length-2) return null;
  const at = l => parts[labels.indexOf(l)] || [l, ''];
  return { heads, head: l=>at(l)[0], tail: l=>at(l)[1] || at(l)[0] };
}

/* The labels without the words they all start or end with, e.g.
   "Healing Cap Ø5.0" / "Healing Cap Wide" -> "Ø5.0" / "Wide". */
function trimShared(labels){
  if(labels.length<2) return labels.slice();
  const words = labels.map(l=>l.split(' '));
  let pre = 0, suf = 0;
  const min = Math.min(...words.map(w=>w.length));
  while(pre<min-1 && words.every(w=>w[pre]===words[0][pre])) pre++;
  while(suf<min-1-pre && words.every(w=>w[w.length-1-suf]===words[0][words[0].length-1-suf])) suf++;
  return words.map(w=>w.slice(pre, w.length-suf).join(' '));
}

/* A lead-in every label shares, up to a ", " or " — " (e.g. "RB/WB, "),
   so chips can leave it off. */
function commonLead(labels){
  if(labels.length<2) return '';
  let lead = labels[0];
  labels.forEach(l=>{ while(lead && !l.startsWith(lead)) lead = lead.slice(0,-1); });
  const m = lead.match(/^.*(?:, | — )/);
  return m && labels.every(l=>l.length>m[0].length) ? m[0] : '';
}

/* Fills in a part pick: keeps whatever of `pick` is still valid, takes
   the only choice wherever there is just one, then falls back to the
   remembered pick. Returns {opt, group, ref} with nulls for what is
   still open. */
function resolvePartPick(systemId, partType, profile, pick, remembered){
  const out = { opt:null, group:null, ref:null };
  const opts = partType.options;
  const tryOpt = i => (i!=null && opts[i]) ? i : null;
  out.opt = tryOpt(pick && pick.opt);
  if(out.opt==null && opts.length===1) out.opt = 0;
  if(out.opt==null && remembered) out.opt = tryOpt(remembered.opt);
  if(out.opt==null) return out;
  const groups = optionGroups(systemId, opts[out.opt], profile);
  const findG = label => groups.find(g=>g.group.label===label) || null;
  let g = (pick && pick.opt===out.opt && findG(pick.group)) || null;
  if(!g && groups.length===1) g = groups[0];
  if(!g && remembered && remembered.opt===out.opt) g = findG(remembered.group);
  if(!g) return out;
  out.group = g.group.label;
  const hasRef = ref => ref && g.items.some(([,r])=>r===ref);
  if(pick && pick.group===out.group && hasRef(pick.ref)) out.ref = pick.ref;
  else if(g.items.length===1) out.ref = g.items[0][1];
  else if(remembered && remembered.group===out.group && hasRef(remembered.ref)) out.ref = remembered.ref;
  return out;
}

/* ---------- Remembered picks (this browser only) ---------- */

const CB_MEMORY_KEY = 'caseBuilderMemory';
function cbLoadMemory(){
  try{ return JSON.parse(localStorage.getItem(CB_MEMORY_KEY)) || {}; }catch(e){ return {}; }
}
function cbSaveMemory(mem){
  try{ localStorage.setItem(CB_MEMORY_KEY, JSON.stringify(mem)); }catch(e){}
}
function profileKey(profile){
  return [...profile.platforms].sort().join('/') + '|' + [...profile.generations].sort().join('/') + '|' + [...profile.diameters].sort().join('/');
}
function memoryKey(systemId, partLabel, profile){ return `${systemId}|${partLabel}|${profileKey(profile)}`; }

/* ---------- Builder state ---------- */

let cb = null;

function newCase(kind){
  return {
    kind,                 // 'case' | 'allonx'
    type:'single',        // 'single' | 'bridge'
    teeth:{},             // tooth number -> 'implant' | 'pontic'
    sys:null,
    variant:null,
    needed:[],            // part labels ticked under "Parts needed"
    lead:{ implant:null, picks:{} },   // first implant tooth; also the parts-only case
    own:{},               // tooth -> its own config, once changed away from the lead
    activeTooth:null,
    fixedImplant:null,    // parts-only: the implant already in the order
    counts:{},            // allonx: part label -> { ref -> packages }
    implantCounts:{ 'Primary Implants':{}, 'Backup Implants':{} },
    dgOpen:null,          // which card's explanatory drawing is showing
    editing:new Set(),    // finished cards reopened to change them
    confirmed:new Set(),  // parts picked by a tap (not just remembered) — see cbConfKey
    narrow:{},            // two-step type chips: the first step picked
    pickers:{},           // allonx: each card's size picker
    adding:{},            // allonx: cards with "add another size" open
    follow:{},            // allonx: card -> the one part whose count follows the implant count
    touched:{},           // allonx: cards whose counts were changed by hand
    showMissing:false
  };
}

/* Opens the builder. `opts`: {kind, sys, fixedImplant:{group, name, ref, qty}}. */
function openCaseBuilder(opts){
  opts = opts || {};
  cb = newCase(opts.kind || 'case');
  if(opts.sys) cbSetSystem(opts.sys);
  if(opts.fixedImplant){
    cb.fixedImplant = opts.fixedImplant;
    cb.lead.implant = { group:opts.fixedImplant.group, ref:opts.fixedImplant.ref };
  }
  navigateWithFade(()=>{ viewMode = 'builder'; render(); window.scrollTo(0,0); });
}

function cbImplantTeeth(){
  return Object.keys(cb.teeth).filter(t=>cb.teeth[t]==='implant').map(Number).sort((a,b)=>a-b);
}
function cbPontics(){
  return Object.keys(cb.teeth).filter(t=>cb.teeth[t]==='pontic').map(Number).sort((a,b)=>a-b);
}
function cbIsLead(tooth){ const t = cbImplantTeeth(); return !t.length || tooth===t[0]; }
/* The config a tooth uses: the lead's, unless it has been changed. */
function cbConfig(tooth){
  if(cb.fixedImplant || cbIsLead(tooth)) return cb.lead;
  return cb.own[tooth] || cb.lead;
}
/* The config to edit for the active tooth — copies the lead's first if
   this tooth was still following it. */
function cbEditableConfig(){
  const tooth = cb.activeTooth;
  if(cb.fixedImplant || tooth==null || cbIsLead(tooth)) return cb.lead;
  if(!cb.own[tooth]){
    cb.own[tooth] = JSON.parse(JSON.stringify(cb.lead));
    [...cb.confirmed].filter(k=>k.startsWith('lead|')).forEach(k=>cb.confirmed.add(tooth + k.slice(4)));
  }
  return cb.own[tooth];
}

function cbImplantGroup(implant){
  if(!implant || !cb.sys) return null;
  const cat = WIZARD_IMPLANTS_CATEGORY_NAME[cb.sys];
  return (SYSTEMS[cb.sys].catalog[cat] || []).find(g=>g.label===implant.group) || null;
}
function cbProfileFor(implant){
  if(!implant) return makeProfile();
  return implantProfileFor(cb.sys, WIZARD_IMPLANTS_CATEGORY_NAME[cb.sys], implant.group, '');
}

function cbSetSystem(sysId){
  if(cb.sys === sysId) return;
  cb.sys = sysId;
  const grid = implantGrid(sysId);
  const mem = cbLoadMemory();
  const v = mem[`${sysId}|variant`];
  cb.variant = grid.variants.includes(v) ? v : grid.variants[0];
  const labels = cbNeedLabels();
  const lastNeeded = mem[`${sysId}|aox|needed`];
  if(cb.kind==='allonx' && !cb.needed.length && Array.isArray(lastNeeded)) cb.needed = lastNeeded.slice();
  cb.needed = cb.needed.filter(l=>labels.includes(l));
  cb.lead = { implant:null, picks:{} };
  cb.own = {};
  cb.counts = {};
  cb.implantCounts = { 'Primary Implants':{}, 'Backup Implants':{} };
  cb.narrow = {}; cb.pickers = {}; cb.adding = {}; cb.editing = new Set(); cb.confirmed = new Set(); cb.follow = {}; cb.touched = {}; cb.fromLast = {};
}

/* Every "Parts needed" chip in order: All-on-X starts with its implants;
   a crown, bridge or overdenture case ends with backup implants. */
function cbNeedLabels(){
  const parts = cbPartTypes().map(p=>p.label);
  if(cb.kind==='allonx') return ['Primary Implants','Backup Implants'].concat(parts);
  return cb.fixedImplant ? parts : parts.concat('Backup Implants');
}

function cbPartTypes(){
  if(!cb.sys) return [];
  return cb.kind==='allonx' ? allOnXPartTypes(cb.sys) : builderPartTypes(cb.sys);
}

/* Re-checks every pick of a config against its implant, filling in
   single choices and remembered picks. */
function cbRefresh(config){
  const mem = cbLoadMemory();
  const profile = cbProfileFor(config.implant);
  cbPartTypes().forEach(pt=>{
    if(!cb.needed.includes(pt.label)) return;
    config.picks[pt.label] = resolvePartPick(cb.sys, pt, profile, config.picks[pt.label], mem[memoryKey(cb.sys, pt.label, profile)]);
  });
}
function cbRefreshAll(){
  if(cb.kind!=='case') return;
  cbRefresh(cb.lead);
  Object.values(cb.own).forEach(cbRefresh);
}

/* ---------- All-on-X part types ---------- */

/* The All-on-X builder's counted parts, in the old case wizard's order:
   multi-unit abutments, temporary copings, healing caps, cover screws,
   then the optional extras. Implants are handled separately. */
function allOnXPartTypes(systemId){
  const cfg = WIZARD_CONFIG[systemId] || [];
  const out = [];
  const mu = cfg.find(s=>s.label==='Multi-unit Abutment');
  if(mu) out.push({ label:'Multi-unit Abutments', options:mu.options });
  const coping = MULTI_UNIT_TEMP_COPING_CONFIG[systemId];
  if(coping && mu) out.push({ label:'Temporary Copings', options:[{ label:coping.label, category:coping.category, labelMustInclude:coping.groupLabel, itemNameFilter:coping.nameFilter }] });
  const cap = MULTI_UNIT_CAP_TRIGGER[systemId];
  if(cap && mu) out.push({ label:`${cap.capLabel}s`, options:[{ label:cap.capLabel, category:cap.category, labelMustInclude:cap.capGroupLabel, itemNameFilter:cap.capNameFilter }] });
  const cover = cfg.find(s=>s.label==='Cover Screw');
  if(cover) out.push({ label:'Cover Screws', options:cover.options });
  const extras = ['Impression Coping','Analog','Implant Replica / Analog','Replacement Screw','Temporary Abutment','Impression / Analog','Healing Abutment'];
  cfg.filter(s=>extras.includes(s.label)).forEach(s=>out.push({ label:s.label, options:s.options }));
  return out;
}

/* Every platform, generation and diameter among the counted implants. */
function cbAllOnXProfile(){
  const p = makeProfile();
  const cat = WIZARD_IMPLANTS_CATEGORY_NAME[cb.sys];
  Object.values(cb.implantCounts).forEach(counts=>{
    Object.keys(counts).forEach(ref=>{
      if(!counts[ref]) return;
      const g = (SYSTEMS[cb.sys].catalog[cat] || []).find(g=>g.items.some(([,r])=>r===ref));
      if(g) mergeProfile(p, implantProfileFor(cb.sys, cat, g.label, ''));
    });
  });
  return p;
}

/* ---------- Rendering ---------- */

function cbEsc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function cbChip(label, on, action, extra, sub){
  return `<button type="button" class="cb-chip${on?' on':''}" data-a="${action}"${extra||''}>${cbEsc(label)}${sub?`<small class="cb-chip-sub${sub.startsWith('✓')?' sug':''}">${cbEsc(sub)}</small>`:''}</button>`;
}
function cbData(obj){
  return Object.entries(obj).map(([k,v])=>` data-${k}="${cbEsc(v)}"`).join('');
}

/* The "Explain:" link for a card's explanatory drawing, and the drawing
   itself when it is open. */
function cbDiagram(key, kinds){
  kinds = diagramKindsToOffer([].concat(kinds || []));
  if(!kinds.length) return '';
  let open = null;
  const btns = kinds.map(kind=>{
    const on = cb.dgOpen===key+'|'+kind;
    if(on) open = kind;
    return `<button type="button" class="dg-btn${on?' on':''}" data-a="dg"${cbData({k:key+'|'+kind})}>${cbEsc(DIAGRAM_BUTTON_LABELS[kind])}</button>`;
  }).join('');
  return `<div class="dg-row"><span class="dg-lead">Explain:</span>${btns}</div>${open?diagramHtml(open):''}`;
}

function renderCaseBuilder(){
  const el = document.getElementById('builderView');
  if(!cb){ el.innerHTML = ''; return; }
  cbRefreshAll();
  const parts = [];
  if(cb.kind==='allonx'){
    parts.push(`<div class="cb-head"><p class="cb-eyebrow">${cb.editCaseId!=null ? 'Editing case' : 'New case'}</p><h2>All-on-X</h2></div>`);
    parts.push(cbSystemCard());
    if(cb.sys) parts.push(cbNeededCard(), cbAllOnXCards());
  } else if(cb.fixedImplant){
    const it = cb.fixedImplant;
    parts.push(`<div class="cb-head"><p class="cb-eyebrow">${cbEsc(SYSTEMS[cb.sys].name)}</p><h2>Parts for this implant</h2></div>`);
    parts.push(`<div class="cb-card"><div class="cb-summary"><b>${cbEsc(it.group)}, ${cbEsc(it.name)}</b><span class="cb-ref">REF ${cbEsc(it.ref)} · already in your order${it.qty>1?` · qty ${it.qty}`:''}</span></div></div>`);
    parts.push(cbNeededCard(), cbPartCards());
  } else {
    parts.push(`<div class="cb-head"><p class="cb-eyebrow">${cb.editCaseId!=null ? 'Editing case' : 'New case'}</p><h2>${cb.type==='overdenture' ? 'Overdenture' : 'Crown &amp; Bridge'}</h2></div>`);
    parts.push(cbTeethCard(), cbSystemCard());
    if(cb.sys && cbImplantTeeth().length){
      parts.push(cbToothTabs(), cbImplantCard(), cbNeededCard(), cbPartCards());
      if(cb.needed.includes('Backup Implants')) parts.push(cbCountImplantCard('Backup Implants'));
    }
  }
  parts.push(cbFooter());
  el.innerHTML = `<div class="cb-wrap">${parts.join('')}</div>`;
}

function cbTeethCard(){
  const tooth = n => {
    const s = cb.teeth[n];
    return `<button type="button" class="cb-tooth${s?' '+s:''}" data-a="tooth"${cbData({n})}>${n}</button>`;
  };
  let upper = '', lower = '';
  for(let n=1; n<=16; n++) upper += tooth(n);
  for(let n=32; n>=17; n--) lower += tooth(n);
  const implants = cbImplantTeeth(), pontics = cbPontics();
  let summary = 'Tap a tooth to mark an implant' + (cb.type==='bridge' ? ', tap again for a pontic.' : '.');
  if(implants.length || pontics.length){
    summary = (implants.length ? `<b>Implant:</b> #${implants.join(', #')}` : '') +
      (pontics.length ? `${implants.length?' &nbsp;·&nbsp; ':''}<b>Pontic:</b> #${pontics.join(', #')}` : '');
  }
  return `<div class="cb-card">
    <div class="cb-seg">${cbChip('Single crown(s)', cb.type==='single', 'type', cbData({v:'single'}))}${cbChip('Bridge', cb.type==='bridge', 'type', cbData({v:'bridge'}))}${cbChip('Overdenture', cb.type==='overdenture', 'type', cbData({v:'overdenture'}))}</div>
    <div class="cb-arch">Upper</div><div class="cb-odo">${upper}</div>
    <div class="cb-odo">${lower}</div><div class="cb-arch">Lower</div>
    <p class="cb-note">${summary}</p>
  </div>`;
}

function cbSystemCard(){
  const ids = cb.kind==='allonx'
    ? SYSTEM_IDS.filter(id=>(SYSTEMS[id].catalog['All-on-X Components']||[]).length>0)
    : SYSTEM_IDS;
  if(cb.sys && !cb.editing.has(cbEditKey('sys'))) return cbDoneCard('cb-system', 'System', SYSTEMS[cb.sys].name, '', 'sys', false);
  // Grouped by maker; chips drop the brand name the heading already shows.
  // Nobel splits further into rows (conical, S series, zygoma), each ordered
  // Replace, Active, Parallel.
  const brands = [];
  ids.forEach(id=>{
    const brand = systemBrand(id);
    let b = brands.find(x=>x.brand===brand);
    if(!b) brands.push(b = { brand, rows:[] });
    const sub = systemSubgroup(id);
    let r = b.rows.find(x=>x.sub===sub);
    if(!r) b.rows.push(r = { sub, ids:[] });
    r.ids.push(id);
  });
  const line = n => /Replace/.test(n) ? 0 : /Active/.test(n) ? 1 : /Parallel/.test(n) ? 2 : 3;
  const chips = ids => `<div class="cb-chips">${ids.slice().sort((a,b)=>line(SYSTEMS[a].name)-line(SYSTEMS[b].name))
    .map(id=>cbChip(SYSTEMS[id].name.replace(/^(?:Straumann|Neodent) |^Nobel(?=[A-Z])/, ''), cb.sys===id, 'sys', cbData({id}))).join('')}</div>`;
  return `<div class="cb-card"><div class="cb-lbl">System</div>${brands.map(b=>`<div class="cb-brand">${cbEsc(b.brand)}</div>${
    b.rows.map(r=>r.sub ? `<div class="cb-subgroup"><div class="cb-sublbl">${cbEsc(r.sub)}</div>${chips(r.ids)}</div>` : chips(r.ids)).join('')}`).join('')}</div>`;
}
function systemSubgroup(id){
  const name = SYSTEMS[id].name;
  if(!/^Nobel/.test(name)) return '';
  return /Zygoma/.test(name) ? 'Zygomatic' : / S$/.test(name) ? 'S series' : 'Conical connection';
}
function systemBrand(id){
  const name = SYSTEMS[id].name;
  return /^Straumann/.test(name) ? 'Straumann' : /^Nobel/.test(name) ? 'Nobel Biocare' : /^Neodent/.test(name) ? 'Neodent' : 'Other';
}

function cbToothTabs(){
  const teeth = cbImplantTeeth();
  if(teeth.length<2) return '';
  if(cb.activeTooth==null || !teeth.includes(cb.activeTooth)) cb.activeTooth = teeth[0];
  const lead = teeth[0];
  const tabs = teeth.map(t=>{
    const sub = t===lead ? '' : (cb.own[t] ? 'own picks' : `same as #${lead}`);
    return `<button type="button" class="cb-tab${t===cb.activeTooth?' on':''}" data-a="tab"${cbData({n:t})}><b>#${t}</b>${sub?`<small>${sub}</small>`:''}</button>`;
  }).join('');
  const active = cb.activeTooth;
  const reset = (active!==lead && cb.own[active])
    ? `<button type="button" class="cb-link" data-a="relink">Make #${active} the same as #${lead}</button>` : '';
  const note = active===lead
    ? `Picks for #${lead} also apply to every tooth marked “same as #${lead}”.`
    : (cb.own[active] ? '' : `#${active} is following #${lead}. Change anything below to give it its own picks.`);
  return `<div class="cb-tabs">${tabs}</div>${note?`<p class="cb-note">${note}</p>`:''}${reset}`;
}

function cbImplantCard(){
  const config = cbConfig(cb.activeTooth ?? cbImplantTeeth()[0]);
  const grid = implantGrid(cb.sys);
  const rows = grid.rows.filter(r=>r.variant===cb.variant);
  const cols = gridColumns(rows);
  const sel = config.implant;
  const g = cbImplantGroup(sel);
  const selItem = g && g.items.find(([,r])=>r===sel.ref);
  if(selItem && !cb.editing.has(cbEditKey('implant'))){
    return cbDoneCard('cb-implant', `Implant${cbImplantTeeth().length>1?` · #${cb.activeTooth}`:''}`, `${g.label}, ${selItem[0]}`,
      `REF ${cbEsc(selItem[1])}${g.caution?` · <span class="cb-warn-i">⚠ ${cbEsc(g.caution)}</span>`:''}`, 'implant', false);
  }
  const variants = grid.variants.length>1
    ? `<div class="cb-chips cb-variants">${grid.variants.map(v=>cbChip(v, v===cb.variant, 'variant', cbData({v}))).join('')}</div>` : '';
  const head = `<tr><th></th>${cols.map(c=>`<th>${cbEsc(c)}</th>`).join('')}</tr>`;
  const body = rows.map(r=>{
    const cells = cols.map(c=>{
      const item = r.group.items.find(([nm])=>lengthKey(nm)===c);
      if(!item) return `<td class="na"></td>`;
      const on = sel && sel.group===r.group.label && sel.ref===item[1];
      return `<td><button type="button" class="cb-cell${on?' on':''}" data-a="implant"${cbData({g:r.group.label, r:item[1]})} title="${cbEsc(r.group.label+', '+item[0]+' — REF '+item[1])}"></button></td>`;
    }).join('');
    return `<tr><th>${cbEsc(r.label)}</th>${cells}</tr>`;
  }).join('');
  const summary = selItem
    ? `<div class="cb-summary"><b>${cbEsc(g.label)}, ${cbEsc(selItem[0])}</b><span class="cb-ref">REF ${cbEsc(selItem[1])}</span>${g.caution?`<span class="cb-warn">⚠ ${cbEsc(g.caution)}</span>`:''}</div>`
    : `<p class="cb-note${cb.showMissing?' cb-missing':''}">Tap the diameter (row) and length (column).</p>`;
  return `<div class="cb-card" id="cb-implant"><h3>Implant${cbImplantTeeth().length>1?` · #${cb.activeTooth}`:''}</h3>${cbDiagram('implant','implant')}${variants}
    <div class="cb-gridwrap"><table class="cb-grid"><thead>${head}</thead><tbody>${body}</tbody></table></div>
    <p class="cb-note cb-axis">Rows: diameter · Columns: length (mm)</p>${summary}</div>`;
}

function cbNeededCard(){
  const all = cbNeedLabels().map(label=>({label}));
  const noOd = cb.kind==='case' && cb.type==='overdenture' && !overdentureLabels(cb.sys).length
    ? `<p class="cb-warn">This app has no overdenture attachments for ${cbEsc(SYSTEMS[cb.sys].name)} yet. Order them from the manufacturer's catalog or your rep.</p>` : '';
  return `<div class="cb-card"><h3>Parts needed</h3><p class="cb-note cb-top">Tick only what this case needs.</p>${noOd}<div class="cb-chips">${
    all.map(pt=>cbChip((cb.needed.includes(pt.label)?'✓ ':'+ ')+pt.label, cb.needed.includes(pt.label), 'need', cbData({l:pt.label}))).join('')}</div></div>`;
}

/* The chips that narrow a part type down to one item: option, then type
   (in two steps when the type names share lead-ins), then the item, as a
   table when the names allow. `mode` is 'x' for the All-on-X cards. */
function cbChooser(pt, pick, profile, mode){
  const L = pt.label, m = mode || '';
  const res = { html:'', group:null, item:null, kinds:[] };
  if(pt.options.length>1){
    res.html += `<div class="cb-chips">${pt.options.map((o,i)=>cbChip(o.label, pick.opt===i, 'opt', cbData({l:L, i, m}))).join('')}</div>`;
  }
  if(pick.opt==null) return res;
  const opt = pt.options[pick.opt];
  const groups = optionGroups(cb.sys, opt, profile);
  const shown = groups.find(g=>g.group.label===pick.group) || groups[0];
  if(shown) res.kinds = diagramKindsFor(cb.sys, shown.group.sourceCategory || opt.category, { ...shown.group, items: shown.items });
  if(!groups.length){
    res.html += `<p class="cb-warn">None of these fit ${m?'the implants picked':'this implant'}. Order directly from the manufacturer's catalog or your rep if you need one.</p>`;
    return res;
  }
  if(groups.length>1){
    const labels = groups.map(g=>g.group.label);
    // Straumann XC shapes: mark the one made for this tooth.
    const tooth = m || cb.fixedImplant ? null : (cb.activeTooth ?? cbImplantTeeth()[0]);
    const want = tooth!=null ? xcShapeForTooth(tooth) : null;
    const hint = l => {
      const h = groups.find(g=>g.group.label===l).group.hint || '';
      const shape = (l.match(/\b(S1|S|M|XL) shape\b/) || [])[1];
      return h && want && shape===want ? `✓ For #${tooth} · ${h}` : h;
    };
    const split = splitTypeLabels(labels);
    if(split){
      const cur = pick.group ? split.head(pick.group) : cb.narrow[cbNarrowKey(L, m)];
      res.html += `<div class="cb-lbl">${cbAxisName(split.heads, 'Type')}</div><div class="cb-chips">${split.heads.map(h=>cbChip(h, cur===h, 'gpre', cbData({l:L, p:h, m}))).join('')}</div>`;
      const inHead = labels.filter(l=>split.head(l)===cur);
      if(inHead.length>1){
        res.html += `<div class="cb-lbl">${cbAxisName(inHead.map(split.tail), 'Size')}</div><div class="cb-chips">${inHead.map(l=>cbChip(split.tail(l), pick.group===l, 'group', cbData({l:L, g:l, m}), hint(l))).join('')}</div>`;
      }
    } else {
      const lead = commonLead(labels);
      res.html += `<div class="cb-lbl">${cbAxisName(labels.map(l=>l.slice(lead.length)), 'Type')}</div><div class="cb-chips">${labels.map(l=>cbChip(l.slice(lead.length), pick.group===l, 'group', cbData({l:L, g:l, m}), hint(l))).join('')}</div>`;
    }
  }
  const g = groups.find(g=>g.group.label===pick.group);
  if(!g) return res;
  res.group = g.group;
  const on = rf => !m && pick.ref===rf;
  const ghah = ghahTable(g.items), axis = !ghah && axisTable(g.items);
  if(ghah){
    res.html += `<div class="cb-lbl">GH × AH (mm) · cells show total height</div><table class="cb-grid cb-ghah"><thead><tr><th></th>${ghah.ahs.map(a=>`<th>AH ${a}</th>`).join('')}</tr></thead><tbody>${
      ghah.ghs.map(gh=>`<tr><th>GH ${gh}</th>${ghah.ahs.map(ah=>{
        const c = ghah.cells[gh][ah];
        if(!c) return `<td class="na"></td>`;
        return `<td><button type="button" class="cb-cell txt${on(c.item[1])?' on':''}" data-a="item"${cbData({l:L, r:c.item[1], m})}>${cbEsc(c.total || '✓')}</button></td>`;
      }).join('')}</tr>`).join('')}</tbody></table>`;
  } else if(axis){
    const rowName = trimShared(axis.rows), colName = trimShared(axis.cols);
    res.html += `<table class="cb-grid cb-ghah"><thead><tr><th></th>${axis.cols.map((c,i)=>`<th>${cbEsc(colName[i])}</th>`).join('')}</tr></thead><tbody>${
      axis.rows.map((r,ri)=>`<tr><th>${cbEsc(rowName[ri])}</th>${axis.cols.map(c=>{
        const it = axis.cells[r][c];
        if(!it) return `<td class="na"></td>`;
        return `<td><button type="button" class="cb-cell${m?' txt':''}${on(it[1])?' on':''}" data-a="item"${cbData({l:L, r:it[1], m})} title="${cbEsc(it[0])}">${m?'+':''}</button></td>`;
      }).join('')}</tr>`).join('')}</tbody></table>`;
  } else if(g.items.length>1 || m){
    res.html += `<div class="cb-lbl">${cbAxisName(g.items.map(([nm])=>nm), groups.length>1 ? 'Size / option' : 'Pick one')}</div><div class="cb-chips">${g.items.map(([nm,rf])=>cbChip(nm, on(rf), 'item', cbData({l:L, r:rf, m}))).join('')}</div>`;
  }
  if(!m) res.item = g.items.find(([,r])=>r===pick.ref) || null;
  return res;
}
/* Name a row of chips by what they share: "Ø5.0mm" chips are a diameter,
   "H 3mm" chips a height. Anything mixed keeps the generic name. */
function cbAxisName(values, fallback){
  const all = re => values.length>0 && values.every(v=>re.test(v));
  if(all(/^[Ø∅]\s?[\d.]+\s?mm( \(.*\))?$/)) return 'Diameter';
  if(all(/^GH\s?[\d.]+\s?mm$/)) return 'Gingival height (GH)';
  if(all(/^H\s?[\d.]+\s?mm$/)) return 'Height';
  if(all(/^(Straight\b|\d+°)/) && values.some(v=>/^\d+°/.test(v))) return 'Angle';
  return fallback;
}
/* Straumann's anatomic healing abutment (XC) shape for a tooth, by
   Universal number: S for upper centrals and canines, S1 for upper
   laterals and lower incisors and canines, M for premolars, XL for
   molars (Straumann AHA XC basic information). */
function xcShapeForTooth(n){
  const upper = n<=16, pos = upper ? Math.abs(n - 8.5) + 0.5 : Math.abs(n - 24.5) + 0.5; // 1 = central … 8 = third molar
  if(pos>=6) return 'XL';
  if(pos>=4) return 'M';
  if(!upper) return 'S1';
  return pos===2 ? 'S1' : 'S';
}
function cbNarrowKey(label, mode){ return `${mode||''}|${mode ? '' : cb.activeTooth}|${label}`; }
function cbEditKey(key){ return `${cb.activeTooth}|${key}`; }
/* Teeth that share the first tooth's picks share its confirmations too. */
function cbConfKey(label){ return `${cb.own[cb.activeTooth] ? cb.activeTooth : 'lead'}|${label}`; }

/* A finished card, folded to one line; tapping it opens it again. */
function cbDoneCard(id, title, summary, sub, key, removable){
  return `<div class="cb-card cb-done" id="${id}"><button type="button" class="cb-donebtn" data-a="edit"${cbData({k:key})}>
    <span class="cb-done-t">✓ ${cbEsc(title)}</span><b>${cbEsc(summary)}</b>${sub?`<small>${sub}</small>`:''}<span class="cb-done-c">Change</span></button>${
    removable ? `<button type="button" class="cb-x" data-a="need"${cbData({l:title})} title="Not needed">✕</button>` : ''}</div>`;
}

function cbPartCards(){
  const tooth = cb.activeTooth ?? cbImplantTeeth()[0];
  const config = cbConfig(tooth);
  if(!config.implant) return cb.needed.length ? `<p class="cb-note cb-pad">Pick the implant first; parts are narrowed to its platform.</p>` : '';
  const profile = cbProfileFor(config.implant);
  return cbPartTypes().filter(pt=>cb.needed.includes(pt.label)).map(pt=>{
    const pick = config.picks[pt.label] || {};
    const id = 'cb-part-' + pt.label.replace(/\W+/g,'-');
    const c = cbChooser(pt, pick, profile, '');
    const pack = c.item ? parsePackSize(c.item[0], c.group.label) : 1;
    const tq = c.item ? torqueText(c.group) : '';
    const sub = c.item ? `REF ${cbEsc(c.item[1])}${pack>1?` · ships ${pack}/pkg`:''}${tq?` · 🔧 ${cbEsc(tq)}`:''}${c.group.caution?` · <span class="cb-warn-i">⚠ confirm before ordering</span>`:''}` : '';
    // A part that had to be this one folds; one only filled in from the
    // last case stays open, pre-picked, so the other choices still show.
    const forced = c.item && resolvePartPick(cb.sys, pt, profile, null, null).ref===c.item[1];
    const fromMemory = c.item && !forced && !cb.confirmed.has(cbConfKey(pt.label));
    if(c.item && !fromMemory && !cb.editing.has(cbEditKey(pt.label))){
      return cbDoneCard(id, pt.label, `${c.group.label}, ${c.item[0]}`, sub, pt.label, true);
    }
    const missing = !c.item && cb.showMissing;
    const done = fromMemory
      ? `<p class="cb-note cb-last">Auto-picked from your last case. Review and change if needed.</p>`
      : c.item
      ? `<div class="cb-summary"><b>${cbEsc(c.group.label)}, ${cbEsc(c.item[0])}</b><span class="cb-ref">REF ${cbEsc(c.item[1])}${pack>1?` · ships ${pack}/pkg`:''}${tq?` · 🔧 ${cbEsc(tq)}`:''}</span>${c.group.caution?`<span class="cb-warn">⚠ ${cbEsc(c.group.caution)}</span>`:''}</div>`
      : '';
    return `<div class="cb-card${missing?' cb-missing-card':''}" id="${id}"><h3>${cbEsc(pt.label)}<button type="button" class="cb-x" data-a="need"${cbData({l:pt.label})} title="Not needed">✕</button></h3>${cbDiagram(pt.label, c.kinds)}${c.html}${done}</div>`;
  }).join('');
}

/* How many implants the All-on-X case has, for default part counts. */
function cbAllOnXImplantTotal(){
  return Object.values(cb.implantCounts['Primary Implants'] || {}).reduce((n,x)=>n+(x||0),0);
}

function cbAllOnXCards(){
  const out = [];
  ['Primary Implants','Backup Implants'].forEach(role=>{
    if(cb.needed.includes(role)) out.push(cbCountImplantCard(role));
  });
  const profile = cbAllOnXProfile();
  allOnXPartTypes(cb.sys).forEach(pt=>{
    const L = pt.label;
    if(!cb.needed.includes(L)) return;
    const counts = cb.counts[L] = cb.counts[L] || {};
    const total = cbAllOnXImplantTotal();
    // Only one part fits: add it without asking, one per implant.
    const cands = [];
    pt.options.forEach(opt=>optionGroups(cb.sys, opt, profile).forEach(g=>g.items.forEach(([,rf])=>cands.push(rf))));
    const last = cbLoadMemory()[`${cb.sys}|aox|${L}`];
    if(total && !Object.keys(counts).length && !cb.touched[L]){
      if(cands.length===1) cb.follow[L] = cands[0];
      else if(cands.includes(last)){ cb.follow[L] = last; cb.fromLast = { ...cb.fromLast, [L]:true }; }
    }
    // A part added for every implant keeps up as implants are added or removed.
    const fr = cb.follow[L];
    if(fr && Object.keys(counts).every(r=>r===fr) && cands.includes(fr)) counts[fr] = Math.max(1, Math.ceil(total / cbPackFor(L, fr)));
    else if(fr) delete cb.follow[L];
    const lines = [];
    let groupCount = 0;
    pt.options.forEach(opt=>optionGroups(cb.sys, opt, profile).forEach(g=>{ groupCount++; g.items.forEach(([nm,rf])=>{
      if(counts[rf]) lines.push({ g, nm, rf, cat: opt.category });
    }); }));
    const followNote = cb.follow[L] && counts[cb.follow[L]]
      ? `<p class="cb-note">${cands.length===1 ? 'The only one that fits, so it was added. ' : (cb.fromLast && cb.fromLast[L] ? 'Same as your last All-on-X case. ' : '')}One per implant; the count follows the implants above.</p>` : '';
    let html = lines.map(l=>cbCountRow(L, groupCount>1 ? `${l.g.group.label} · ${l.nm}` : l.nm, l.rf, counts[l.rf], parsePackSize(l.nm, l.g.group.label), l.g.group.caution)).join('');
    let kinds = lines.flatMap(l=>diagramKindsFor(cb.sys, l.g.group.sourceCategory || l.cat, { ...l.g.group, items: l.g.items }));
    html += followNote;
    if(!lines.length || cb.adding[L]){
      const r = resolvePartPick(cb.sys, pt, profile, cb.pickers[L], null);
      const picker = cb.pickers[L] = { opt:r.opt, group:r.group, ref:null };
      const c = cbChooser(pt, picker, profile, 'x');
      kinds = c.kinds.concat(kinds);
      html += `<div class="cb-picker">${lines.length?`<div class="cb-lbl">Add another</div>`:''}${c.html}${
        c.group ? `<p class="cb-note">Tap a size to add it${cbAllOnXImplantTotal()?', one per implant':''}.</p>` : ''}${
        lines.length ? `<button type="button" class="cb-link" data-a="xadd"${cbData({l:L})}>Done adding</button>` : ''}</div>`;
    } else {
      if(cands.length>1) html += `<button type="button" class="cb-link" data-a="xadd"${cbData({l:L})}>+ Add another size</button>`;
    }
    const missing = !lines.length && cb.showMissing;
    out.push(`<div class="cb-card${missing?' cb-missing-card':''}" id="cb-part-${L.replace(/\W+/g,'-')}"><h3>${cbEsc(L)}<button type="button" class="cb-x" data-a="need"${cbData({l:L})} title="Not needed">✕</button></h3>${cbDiagram(L, kinds)}${html}</div>`);
  });
  return out.join('');
}

function cbCountRow(label, name, ref, n, pack, caution){
  return `<div class="cb-row${n?' on':''}"><div class="t"><b>${cbEsc(name)}</b><small>REF ${cbEsc(ref)}${pack>1?` · ships ${pack}/pkg`:''}${caution?' · ⚠ confirm before ordering':''}</small></div>
    <div class="cb-step"><button type="button" data-a="cnt"${cbData({l:label, r:ref, d:-1})}${n?'':' disabled'}>−</button><span>${n}</span><button type="button" data-a="cnt"${cbData({l:label, r:ref, d:1})}>+</button></div></div>`;
}

function cbCountImplantCard(role){
  const counts = cb.implantCounts[role];
  const grid = implantGrid(cb.sys);
  const rows = grid.rows.filter(r=>r.variant===cb.variant);
  const cols = gridColumns(rows);
  const variants = grid.variants.length>1
    ? `<div class="cb-chips cb-variants">${grid.variants.map(v=>cbChip(v, v===cb.variant, 'variant', cbData({v}))).join('')}</div>` : '';
  const head = `<tr><th></th>${cols.map(c=>`<th>${cbEsc(c)}</th>`).join('')}</tr>`;
  const body = rows.map(r=>`<tr><th>${cbEsc(r.label)}</th>${cols.map(c=>{
    const item = r.group.items.find(([nm])=>lengthKey(nm)===c);
    if(!item) return `<td class="na"></td>`;
    const n = counts[item[1]] || 0;
    return `<td><button type="button" class="cb-cell txt${n?' on':''}" data-a="icnt"${cbData({role, r:item[1]})} title="${cbEsc(r.group.label+', '+item[0])}">${n||''}</button></td>`;
  }).join('')}</tr>`).join('');
  const cat = grid.category;
  const picked = [];
  (SYSTEMS[cb.sys].catalog[cat] || []).forEach(g=>g.items.forEach(([nm,rf])=>{
    if(counts[rf]) picked.push(cbCountRow('implant:'+role, `${g.label}, ${nm}`, rf, counts[rf], 1, g.caution));
  }));
  // Crown, bridge or overdenture: backups are for the whole case, and the
  // usual pick is one more of each implant planned.
  const planned = cb.kind==='case' ? [...new Set(cbImplantTeeth().map(t=>cbConfig(t).implant).filter(Boolean).map(i=>i.ref))] : [];
  const same = planned.length
    ? `<button type="button" class="cb-link" data-a="bsame">+ One more of ${planned.length>1 ? 'each implant planned' : 'the planned implant'}</button>` : '';
  const note = cb.kind==='case' ? '<p class="cb-note cb-top">Extra implants to have on hand for the whole case, in case one doesn\'t fit as planned.</p>' : '';
  return `<div class="cb-card" id="cb-part-${role.replace(/\W+/g,'-')}"><h3>${role}<button type="button" class="cb-x" data-a="need"${cbData({l:role})} title="Not needed">✕</button></h3>${note}${cbDiagram(role,'implant')}${variants}
    <div class="cb-gridwrap"><table class="cb-grid"><thead>${head}</thead><tbody>${body}</tbody></table></div>
    <p class="cb-note cb-axis">Tap a cell once per implant · Rows: diameter · Columns: length (mm)</p>${same}${picked.join('')}</div>`;
}

/* ---------- What will be added ---------- */

/* Every line the builder would add: [{ref, name, group, category,
   pieces|packages, teeth}], plus what is still missing and how many
   picks the case needs in all (`slots`). */
function cbCollect(){
  const lines = new Map();
  const missing = [];
  let slots = 0;
  const add = (ref, name, group, category, n, unit, tooth) => {
    let l = lines.get(ref);
    if(!l){ l = { ref, name, group, category, pieces:0, packages:0, backup:0, teeth:new Set() }; lines.set(ref, l); }
    l[unit] += n;
    if(tooth!=null) l.teeth.add(tooth);
  };
  if(!cb || !cb.sys){ return { lines:[], missing:['system'], slots:0 }; }
  const sys = SYSTEMS[cb.sys];
  const implantCat = WIZARD_IMPLANTS_CATEGORY_NAME[cb.sys];
  if(cb.kind==='allonx'){
    Object.entries(cb.implantCounts).forEach(([role, counts])=>{
      if(!cb.needed.includes(role)) return;
      slots++;
      let any = false;
      (sys.catalog[implantCat] || []).forEach(g=>g.items.forEach(([nm,rf])=>{
        if(counts[rf]){
          any = true; add(rf, nm, g, implantCat, counts[rf], 'packages');
          if(role==='Backup Implants') lines.get(rf).backup += counts[rf];
        }
      }));
      if(!any) missing.push(role.toLowerCase());
    });
    const profile = cbAllOnXProfile();
    allOnXPartTypes(cb.sys).forEach(pt=>{
      if(!cb.needed.includes(pt.label)) return;
      slots++;
      const counts = cb.counts[pt.label] || {};
      let any = false;
      pt.options.forEach(opt=>optionGroups(cb.sys, opt, profile).forEach(g=>g.items.forEach(([nm,rf])=>{
        if(counts[rf]){ any = true; add(rf, nm, g.group, g.group.sourceCategory || opt.category, counts[rf], 'packages'); }
      })));
      if(!any) missing.push(pt.label.toLowerCase());
    });
    if(!cb.needed.length) missing.push('parts');
    return { lines:[...lines.values()], missing, slots };
  }
  const teeth = cb.fixedImplant ? [null] : cbImplantTeeth();
  if(!teeth.length) missing.push('teeth');
  const per = cb.fixedImplant ? (cb.fixedImplant.qty || 1) : 1;
  teeth.forEach(tooth=>{
    const config = cbConfig(tooth);
    const where = tooth==null ? '' : ` for #${tooth}`;
    slots += (cb.fixedImplant ? 0 : 1) + cbPartTypes().filter(pt=>cb.needed.includes(pt.label)).length;
    if(!config.implant){
      missing.push('implant'+where);
      cbPartTypes().forEach(pt=>{ if(cb.needed.includes(pt.label)) missing.push(pt.label.toLowerCase()+where); });
      return;
    }
    if(!cb.fixedImplant){
      const g = cbImplantGroup(config.implant);
      const item = g.items.find(([,r])=>r===config.implant.ref);
      add(item[1], item[0], g, implantCat, 1, 'pieces', tooth);
    }
    const profile = cbProfileFor(config.implant);
    cbPartTypes().forEach(pt=>{
      if(!cb.needed.includes(pt.label)) return;
      const pick = config.picks[pt.label];
      if(!pick || !pick.ref){ missing.push(pt.label.toLowerCase()+where); return; }
      const g = optionGroups(cb.sys, pt.options[pick.opt], profile).find(g=>g.group.label===pick.group);
      const item = g && g.items.find(([,r])=>r===pick.ref);
      if(!item){ missing.push(pt.label.toLowerCase()+where); return; }
      add(item[1], item[0], g.group, g.group.sourceCategory || pt.options[pick.opt].category, per, 'pieces', tooth);
    });
  });
  if(cb.needed.includes('Backup Implants') && !cb.fixedImplant){
    slots++;
    const counts = cb.implantCounts['Backup Implants'];
    let any = false;
    (sys.catalog[implantCat] || []).forEach(g=>g.items.forEach(([nm,rf])=>{
      if(counts[rf]){ any = true; add(rf, nm, g, implantCat, counts[rf], 'packages'); lines.get(rf).backup += counts[rf]; }
    }));
    if(!any) missing.push('backup implants');
  }
  if(cb.fixedImplant && !cb.needed.length) missing.push('parts');
  return { lines:[...lines.values()], missing, slots };
}

/* The bottom bar: "Add N items" once everything is picked; until then how
   far along the case is, and the next thing to pick (tapping jumps to it). */
function cbFooter(){
  const { lines, missing, slots } = cbCollect();
  const n = lines.length;
  const done = Math.max(0, slots - missing.length);
  const counted = slots>0 && missing.length<=slots && done>0;
  let label;
  if(!missing.length) label = cb.editCaseId!=null ? 'Update order' : `Add ${n} item${n===1?'':'s'} to order`;
  else if(!cb.sys) label = 'Pick a system';
  else if(counted) label = `${done} of ${slots} picked · Next: ${missing[0]} ›`;
  else label = `Still to pick: ${missing.slice(0,3).join(', ')}${missing.length>3?'…':''}`;
  const bar = missing.length && counted ? ` style="--p:${Math.round(100*done/slots)}%"` : '';
  return `<div class="cb-foot"><button type="button" class="cb-add${missing.length?' wait':''}${bar?' prog':''}" data-a="add"${bar}>${cbEsc(label)}</button>
    <button type="button" class="cb-cancel" data-a="cancel">Cancel</button></div>`;
}

/* ---------- Actions ---------- */

async function cbAddToOrder(){
  const { lines, missing } = cbCollect();
  if(missing.length){
    cb.showMissing = true;
    // Show the tooth the next missing pick belongs to.
    const t = (missing[0].match(/ for #(\d+)$/) || [])[1];
    if(t && cbImplantTeeth().length>1) cb.activeTooth = Number(t);
    renderCaseBuilder();
    const target = document.querySelector('.cb-missing, .cb-missing-card');
    if(target) target.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }
  const cautionGroups = [...new Set(lines.map(l=>l.group).filter(g=>g.caution))];
  for(const g of cautionGroups){
    const cat = lines.find(l=>l.group===g).category;
    if(!(await confirmGroupCaution(cb.sys, cat, g.label))) return;
  }
  // Editing a case already in the order: take out what it added before.
  const editing = cb.editCaseId!=null ? orderCases.find(c=>c.id===cb.editCaseId) : null;
  if(editing) editing.added.forEach(a=>{
    const it = selected[a.key];
    if(!it) return;
    it.qty -= a.qty;
    if(it.backup) it.backup = Math.max(0, it.backup - a.backup) || undefined;
    if(it.teeth) it.teeth = it.teeth.filter(t=>!a.teeth.includes(t));
    if(it.teeth && !it.teeth.length) delete it.teeth;
    if(it.qty<=0) delete selected[a.key];
  });
  const added = [];
  lines.forEach(l=>{
    const key = cb.sys+'::'+l.ref;
    const pack = parsePackSize(l.name, l.group.label);
    const qty = l.packages + (l.pieces ? Math.ceil(l.pieces/pack) : 0);
    const prev = selected[key];
    selected[key] = { name:l.name, group:l.group.label, category:l.category, qty:(prev?prev.qty:0)+qty, system:cb.sys, ref:l.ref };
    const teeth = [...new Set([...((prev && prev.teeth) || []), ...l.teeth])].sort((a,b)=>a-b);
    if(teeth.length) selected[key].teeth = teeth;
    const backup = ((prev && prev.backup) || 0) + l.backup;
    if(backup) selected[key].backup = backup;
    added.push({ key, qty, backup:l.backup, teeth:[...l.teeth] });
  });
  cbRemember();
  if(!editing) cbSaveRecent();
  const entry = { id: editing ? editing.id : Date.now(), kind:cb.kind, type:cb.type, sys:cb.sys, fixed:!!cb.fixedImplant,
    implants: cb.kind==='case' && !cb.fixedImplant ? cbImplantTeeth() : [], pontics: cb.kind==='case' ? cbPontics() : [],
    state: cbSnapshot(), added };
  if(editing) orderCases[orderCases.indexOf(editing)] = entry;
  else orderCases.push(entry);
  const sysId = cb.sys;
  const kind = cb.kind;
  cb = null;
  navigateWithFade(()=>{
    activeSystemId = sysId;
    activeCategory = kind==='allonx' ? 'All-on-X Components' : WIZARD_IMPLANTS_CATEGORY_NAME[sysId];
    viewMode = 'category';
    render();
    renderOrder();
    window.scrollTo(0,0);
  });
  showToast(editing ? 'Order updated' : `Added ${lines.length} item${lines.length===1?'':'s'} to your order`);
}

/* Saves each part pick (and the implant surface) as the starting point
   for the next case on the same system and platform. */
function cbRemember(){
  const mem = cbLoadMemory();
  mem[`${cb.sys}|variant`] = cb.variant;
  if(cb.kind==='case'){
    [cb.lead, ...Object.values(cb.own)].forEach(config=>{
      if(!config.implant) return;
      const profile = cbProfileFor(config.implant);
      Object.entries(config.picks).forEach(([label, pick])=>{
        if(cb.needed.includes(label) && pick && pick.ref) mem[memoryKey(cb.sys, label, profile)] = pick;
      });
    });
  } else {
    // All-on-X: the parts ticked, and the size used most for each.
    mem[`${cb.sys}|aox|needed`] = cb.needed.slice();
    Object.entries(cb.counts).forEach(([label, counts])=>{
      const top = Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0];
      if(top && cb.needed.includes(label)) mem[`${cb.sys}|aox|${label}`] = top;
    });
  }
  cbSaveMemory(mem);
}

/* ---------- Recent cases (this browser only) ----------
   The last few cases added to an order, so one can be opened again as the
   start of a new case. Only teeth numbers and parts are kept, nothing
   about the patient. Parts-only cases (an implant picked in the catalog)
   aren't kept: their implant was in that order, not the next one. */

const CB_RECENT_KEY = 'caseBuilderRecent';
const CB_RECENT_MAX = 5;
function cbLoadRecent(){
  try{ const r = JSON.parse(localStorage.getItem(CB_RECENT_KEY)); return Array.isArray(r) ? r : []; }catch(e){ return []; }
}
function cbSaveRecent(){
  if(!cb || cb.fixedImplant) return;
  const state = cbSnapshot();
  const { lines } = cbCollect();
  const entry = { at: Date.now(), state, items: lines.length };
  const list = cbLoadRecent();
  list.unshift(entry);
  try{ localStorage.setItem(CB_RECENT_KEY, JSON.stringify(list.slice(0, CB_RECENT_MAX))); }catch(e){}
}
/* The builder's state as plain data, to open again later. */
function cbSnapshot(){
  return JSON.parse(JSON.stringify({ ...cb, editing:[], confirmed:[...cb.confirmed], showMissing:false, dgOpen:null, lastDone:null, editCaseId:null }));
}
function cbRestore(state){
  return { ...newCase(state.kind), ...JSON.parse(JSON.stringify(state)), editing:new Set(), confirmed:new Set(state.confirmed || []) };
}
/* Opens a case already in the order to change it; "Update order" then
   replaces what it added. */
function openOrderCase(id){
  const c = orderCases.find(c=>c.id===id);
  if(!c) return;
  cb = cbRestore(c.state);
  cb.editCaseId = id;
  navigateWithFade(()=>{ viewMode = 'builder'; render(); window.scrollTo(0,0); });
}

function recentCaseTitle(r){
  const st = r.state;
  const sys = SYSTEMS[st.sys] ? SYSTEMS[st.sys].name : '';
  if(st.kind==='allonx') return `All-on-X · ${sys}`;
  return `${st.type==='bridge' ? 'Bridge' : st.type==='overdenture' ? 'Overdenture' : 'Crown'} · ${sys}`;
}
function recentCaseDetail(r){
  const st = r.state;
  const when = new Date(r.at).toLocaleDateString('en-US', {month:'short', day:'numeric'});
  const teeth = Object.keys(st.teeth || {}).map(Number).sort((a,b)=>a-b);
  const where = st.kind==='allonx' ? '' : teeth.length ? `#${teeth.join(', #')} · ` : '';
  return `${where}${r.items} item${r.items===1?'':'s'} · ${when}`;
}
function recentCasesHtml(){
  const list = cbLoadRecent().filter(r=>r && r.state && SYSTEMS[r.state.sys]);
  if(!list.length) return '';
  return `<div class="home-recent"><h4>Recent cases</h4>${list.map((r,i)=>
    `<button type="button" class="recent-row" data-recent="${i}"><span class="rr-txt"><b>${cbEsc(recentCaseTitle(r))}</b><small>${cbEsc(recentCaseDetail(r))}</small></span><span class="rr-go">Start from this ›</span></button>`).join('')}</div>`;
}
/* Opens a recent case in the builder with every pick as it was; nothing
   is added to the order until "Add to order" is tapped again. */
function reopenRecentCase(i){
  const r = cbLoadRecent().filter(r=>r && r.state && SYSTEMS[r.state.sys])[i];
  if(!r) return;
  cb = cbRestore(r.state);
  navigateWithFade(()=>{ viewMode = 'builder'; render(); window.scrollTo(0,0); });
  showToast('Opened a recent case. Review it, then add to order.');
}

async function cbCancel(){
  const touched = cb && (Object.keys(cb.teeth).length || cb.needed.length || cb.sys && cb.kind==='allonx' && Object.keys(cb.counts).length);
  const editing = cb && cb.editCaseId!=null;
  if(touched){
    const ok = await showModal({ type:'confirm', title: editing ? 'Stop editing?' : 'Leave this case?',
      message: editing ? 'Changes made here won\'t be saved. The order stays as it was.' : 'Nothing from this case has been added to your order yet.',
      okText:'Leave', cancelText:'Keep going' });
    if(!ok) return;
  }
  const back = cb && (cb.fixedImplant || editing) ? 'category' : 'home';
  cb = null;
  navigateWithFade(()=>{ viewMode = back; render(); window.scrollTo(0,0); });
}

/* An overdenture case starts with its attachment parts ticked; leaving
   it unticks them again. */
function cbTickOverdenture(){
  if(cb.kind!=='case' || !cb.sys) return;
  const od = overdentureLabels(cb.sys);
  if(cb.type==='overdenture') od.forEach(l=>{ if(!cb.needed.includes(l)) cb.needed.push(l); });
  else cb.needed = cb.needed.filter(l=>!od.includes(l));
  const order = cbNeedLabels();
  cb.needed.sort((a,b)=>order.indexOf(a)-order.indexOf(b));
}

function cbOnClick(e){
  const btn = e.target.closest('[data-a]');
  if(!btn || !cb) return;
  const d = btn.dataset;
  // Remember which card was tapped (by id, else by position) so it can be
  // scrolled into view if it grows past the bottom bar.
  const cards = () => [...document.querySelectorAll('#builderView .cb-card')];
  const tapped = btn.closest('.cb-card');
  const tappedKey = tapped ? (tapped.id || cards().indexOf(tapped)) : null;
  switch(d.a){
    case 'type':
      cb.type = d.v;
      if(cb.type!=='bridge') Object.keys(cb.teeth).forEach(t=>{ if(cb.teeth[t]==='pontic') delete cb.teeth[t]; });
      cbTickOverdenture();
      break;
    case 'tooth': {
      const n = d.n, cur = cb.teeth[n];
      if(!cur) cb.teeth[n] = 'implant';
      else if(cur==='implant' && cb.type==='bridge') cb.teeth[n] = 'pontic';
      else delete cb.teeth[n];
      if(cb.teeth[n]!=='implant') delete cb.own[n];
      const teeth = cbImplantTeeth();
      // A new first tooth takes over as lead with the old lead's picks.
      if(teeth.length && cb.own[teeth[0]]){ cb.lead = cb.own[teeth[0]]; delete cb.own[teeth[0]]; }
      if(!teeth.includes(cb.activeTooth)) cb.activeTooth = teeth[0] ?? null;
      break;
    }
    case 'sys': cbSetSystem(d.id); cb.editing.delete(cbEditKey('sys')); cbTickOverdenture(); break;
    case 'variant': cb.variant = d.v; break;
    case 'tab': cb.activeTooth = Number(d.n); break;
    case 'relink': delete cb.own[cb.activeTooth]; break;
    case 'implant': {
      const config = cbEditableConfig();
      config.implant = { group:d.g, ref:d.r };
      cb.editing.delete(cbEditKey('implant'));
      cb.lastDone = 'cb-implant';
      break;
    }
    case 'need': {
      const i = cb.needed.indexOf(d.l);
      if(i>=0) cb.needed.splice(i,1);
      else{
        const order = cbNeedLabels();
        cb.needed.push(d.l);
        cb.needed.sort((a,b)=>order.indexOf(a)-order.indexOf(b));
      }
      break;
    }
    case 'opt': case 'group': case 'gpre': case 'item': {
      const x = d.m==='x';
      const picks = x ? cb.pickers : cbEditableConfig().picks;
      const cur = picks[d.l] || {};
      // Tapping a chip that is already on turns it off again.
      if(d.a==='opt'){ picks[d.l] = { opt: cur.opt===Number(d.i) ? null : Number(d.i), group:null, ref:null }; delete cb.narrow[cbNarrowKey(d.l, d.m)]; }
      else if(d.a==='group') picks[d.l] = { ...cur, group: cur.group===d.g ? null : d.g, ref:null };
      else if(d.a==='gpre'){
        // First step of a two-step type pick; a step with one type picks it.
        const nk = cbNarrowKey(d.l, d.m);
        const pt = cbPartTypes().find(t=>t.label===d.l);
        const profile = x ? cbAllOnXProfile() : cbProfileFor(cbConfig(cb.activeTooth ?? cbImplantTeeth()[0]).implant);
        const labels = optionGroups(cb.sys, pt.options[cur.opt], profile).map(g=>g.group.label);
        const split = splitTypeLabels(labels);
        const shownHead = split && cur.group ? split.head(cur.group) : cb.narrow[nk];
        if(shownHead===d.p){ delete cb.narrow[nk]; picks[d.l] = { ...cur, group:null, ref:null }; }
        else {
          cb.narrow[nk] = d.p;
          const inHead = split ? labels.filter(l=>split.head(l)===d.p) : [];
          picks[d.l] = { ...cur, group: inHead.length===1 ? inHead[0] : null, ref:null };
        }
      }
      else if(x){
        // All-on-X: tapping a size adds it, one per implant not yet covered.
        const counts = cb.counts[d.l] = cb.counts[d.l] || {};
        if(!counts[d.r]){
          const pt = cbPartTypes().find(t=>t.label===d.l);
          const g = optionGroups(cb.sys, pt.options[cur.opt], cbAllOnXProfile()).find(g=>g.group.label===cur.group);
          const name = g ? (g.items.find(([,r])=>r===d.r) || [''])[0] : '';
          const pack = parsePackSize(name, cur.group || '');
          const covered = Object.keys(counts).reduce((n,r)=>n+counts[r]*cbPackFor(d.l, r), 0);
          const want = Math.max(1, cbAllOnXImplantTotal() - covered);
          counts[d.r] = Math.max(1, Math.ceil(want / pack));
          if(!covered && !cb.touched[d.l]) cb.follow[d.l] = d.r; else delete cb.follow[d.l];
        }
        cb.adding[d.l] = false;
        if(cb.fromLast) delete cb.fromLast[d.l];
        cb.lastDone = 'cb-part-' + d.l.replace(/\W+/g,'-');
      }
      else if(cur.ref===d.r) picks[d.l] = { ...cur, ref:null };
      else {
        picks[d.l] = { ...cur, ref:d.r };
        cb.confirmed.add(cbConfKey(d.l));
        cb.editing.delete(cbEditKey(d.l));
        cb.lastDone = 'cb-part-' + d.l.replace(/\W+/g,'-');
      }
      if(!x && d.a!=='item') cb.editing.add(cbEditKey(d.l));
      break;
    }
    case 'bsame': {
      const counts = cb.implantCounts['Backup Implants'];
      new Set(cbImplantTeeth().map(t=>cbConfig(t).implant).filter(Boolean).map(i=>i.ref)).forEach(r=>{ counts[r] = (counts[r] || 0) + 1; });
      break;
    }
    case 'icnt': {
      const counts = cb.implantCounts[d.role];
      counts[d.r] = (counts[d.r] || 0) + 1;
      break;
    }
    case 'cnt': {
      const delta = Number(d.d);
      const counts = d.l.startsWith('implant:') ? cb.implantCounts[d.l.slice(8)] : (cb.counts[d.l] = cb.counts[d.l] || {});
      counts[d.r] = Math.max(0, (counts[d.r] || 0) + delta);
      if(!counts[d.r]) delete counts[d.r];
      if(!d.l.startsWith('implant:')){ cb.touched[d.l] = true; delete cb.follow[d.l]; if(cb.fromLast) delete cb.fromLast[d.l]; }
      break;
    }
    case 'edit': cb.editing.add(cbEditKey(d.k)); break;
    case 'xadd': cb.adding[d.l] = !cb.adding[d.l]; break;
    case 'dg': cb.dgOpen = cb.dgOpen===d.k ? null : d.k; break;
    case 'add': cbAddToOrder(); return;
    case 'cancel': cbCancel(); return;
    default: return;
  }
  renderCaseBuilder();
  // A card that just folded up: keep it in view and bring the next card
  // up under it. A card that grew: scroll so its new rows aren't hidden
  // under the bottom bar.
  const findCard = k => k==null ? null : typeof k==='string' ? document.getElementById(k) : cards()[k] || null;
  if(cb && cb.lastDone){
    const el = document.getElementById(cb.lastDone);
    cb.lastDone = null;
    if(el && el.getBoundingClientRect().top < 70) window.scrollBy({top: el.getBoundingClientRect().top - 80});
    const all = cards(), next = el && all[all.indexOf(el)+1];
    if(next) cbReveal(next, el);
  } else if(d.a==='need' && cb.needed.includes(d.l)){
    // A part just ticked: show its new card, keeping the ticked chip in view.
    const el = document.getElementById('cb-part-' + d.l.replace(/\W+/g,'-'));
    const chip = [...document.querySelectorAll('.cb-chip[data-a="need"]')].find(c=>c.dataset.l===d.l);
    if(el) cbReveal(el, chip || el);
  } else if(['opt','group','gpre','edit','dg','tab','xadd','relink','bsame','icnt'].includes(d.a)){
    const el = findCard(tappedKey);
    if(el) cbReveal(el, el);
  }
}

/* Scroll down just enough that el's bottom clears the sticky bottom bar,
   but never so far that keepTop's top goes under the page header. */
function cbReveal(el, keepTop){
  const foot = document.querySelector('#builderView .cb-foot');
  const limit = (foot ? foot.getBoundingClientRect().top : window.innerHeight) - 12;
  const over = el.getBoundingClientRect().bottom - limit;
  if(over <= 0) return;
  const room = keepTop.getBoundingClientRect().top - 80;
  const by = Math.min(over, room);
  if(by <= 0) return;
  // Older iPhone Safari ignores scroll options; jump there instead.
  if('scrollBehavior' in document.documentElement.style) window.scrollBy({top: by, behavior:'smooth'});
  else window.scrollBy(0, by);
}

/* Pieces per package for a counted All-on-X part. */
function cbPackFor(label, ref){
  const pt = cbPartTypes().find(t=>t.label===label);
  for(const opt of (pt ? pt.options : [])){
    for(const g of SYSTEMS[cb.sys].catalog[opt.category] || []){
      const it = g.items.find(([,r])=>r===ref);
      if(it) return parsePackSize(it[0], g.label);
    }
  }
  return 1;
}
