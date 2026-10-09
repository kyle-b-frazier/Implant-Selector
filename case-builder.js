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

/* The part types the case builder offers for a system: the wizard steps
   from compatibility.js, plus the multi-unit healing cap right after the
   multi-unit abutment for systems that have one. The cap fits any
   multi-unit abutment of its line, so it isn't narrowed by implant
   platform. */
function builderPartTypes(systemId){
  const steps = (WIZARD_CONFIG[systemId] || []).map(s=>({ label:s.label, options:s.options }));
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
    narrow:{},            // two-step type chips: the first step picked
    pickers:{},           // allonx: each card's size picker
    adding:{},            // allonx: cards with "add another size" open
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
  if(!cb.own[tooth]) cb.own[tooth] = JSON.parse(JSON.stringify(cb.lead));
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
  const labels = (cb.kind==='allonx' ? ['Primary Implants','Backup Implants'] : []).concat(cbPartTypes().map(p=>p.label));
  cb.needed = cb.needed.filter(l=>labels.includes(l));
  cb.lead = { implant:null, picks:{} };
  cb.own = {};
  cb.counts = {};
  cb.implantCounts = { 'Primary Implants':{}, 'Backup Implants':{} };
  cb.narrow = {}; cb.pickers = {}; cb.adding = {}; cb.editing = new Set();
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
function cbChip(label, on, action, extra){
  return `<button type="button" class="cb-chip${on?' on':''}" data-a="${action}"${extra||''}>${cbEsc(label)}</button>`;
}
function cbData(obj){
  return Object.entries(obj).map(([k,v])=>` data-${k}="${cbEsc(v)}"`).join('');
}

/* The "ⓘ" button for a card's explanatory drawing, and the drawing
   itself when it is open. */
function cbDiagram(key, kinds){
  kinds = diagramKindsToOffer([].concat(kinds || []));
  if(!kinds.length) return '';
  let open = null;
  const btns = kinds.map(kind=>{
    const on = cb.dgOpen===key+'|'+kind;
    if(on) open = kind;
    return `<button type="button" class="dg-btn${on?' on':''}" data-a="dg"${cbData({k:key+'|'+kind})}>ⓘ ${cbEsc(DIAGRAM_BUTTON_LABELS[kind])}</button>`;
  }).join('');
  return `<div class="dg-row">${btns}</div>${open?diagramHtml(open):''}`;
}

function renderCaseBuilder(){
  const el = document.getElementById('builderView');
  if(!cb){ el.innerHTML = ''; return; }
  cbRefreshAll();
  const parts = [];
  if(cb.kind==='allonx'){
    parts.push(`<div class="cb-head"><p class="cb-eyebrow">New case</p><h2>All-on-X</h2></div>`);
    parts.push(cbSystemCard());
    if(cb.sys) parts.push(cbNeededCard(), cbAllOnXCards());
  } else if(cb.fixedImplant){
    const it = cb.fixedImplant;
    parts.push(`<div class="cb-head"><p class="cb-eyebrow">${cbEsc(SYSTEMS[cb.sys].name)}</p><h2>Parts for this implant</h2></div>`);
    parts.push(`<div class="cb-card"><div class="cb-summary"><b>${cbEsc(it.group)}, ${cbEsc(it.name)}</b><span class="cb-ref">REF ${cbEsc(it.ref)} · already in your order${it.qty>1?` · qty ${it.qty}`:''}</span></div></div>`);
    parts.push(cbNeededCard(), cbPartCards());
  } else {
    parts.push(`<div class="cb-head"><p class="cb-eyebrow">New case</p><h2>Single Implant / Bridge</h2></div>`);
    parts.push(cbTeethCard(), cbSystemCard());
    if(cb.sys && cbImplantTeeth().length){
      parts.push(cbToothTabs(), cbImplantCard(), cbNeededCard(), cbPartCards());
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
    <div class="cb-seg">${cbChip('Single crown(s)', cb.type==='single', 'type', cbData({v:'single'}))}${cbChip('Bridge', cb.type==='bridge', 'type', cbData({v:'bridge'}))}</div>
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
  return `<div class="cb-card"><div class="cb-lbl">System</div><div class="cb-chips">${
    ids.map(id=>cbChip(SYSTEMS[id].name, cb.sys===id, 'sys', cbData({id}))).join('')}</div></div>`;
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
  const types = cbPartTypes();
  const prefix = cb.kind==='allonx' ? [{label:'Primary Implants'},{label:'Backup Implants'}] : [];
  const all = prefix.concat(types);
  return `<div class="cb-card"><h3>Parts needed</h3><p class="cb-note cb-top">Tick only what this case needs.</p><div class="cb-chips">${
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
  if(shown) res.kinds = diagramKindsFor(cb.sys, shown.group.sourceCategory || opt.category, shown.group);
  if(!groups.length){
    res.html += `<p class="cb-warn">None of these fit ${m?'the implants picked':'this implant'}. Order directly from the manufacturer's catalog or your rep if you need one.</p>`;
    return res;
  }
  if(groups.length>1){
    const labels = groups.map(g=>g.group.label);
    const split = splitTypeLabels(labels);
    if(split){
      const cur = pick.group ? split.head(pick.group) : cb.narrow[cbNarrowKey(L, m)];
      res.html += `<div class="cb-lbl">Type</div><div class="cb-chips">${split.heads.map(h=>cbChip(h, cur===h, 'gpre', cbData({l:L, p:h, m}))).join('')}</div>`;
      const inHead = labels.filter(l=>split.head(l)===cur);
      if(inHead.length>1){
        res.html += `<div class="cb-lbl">Size</div><div class="cb-chips">${inHead.map(l=>cbChip(split.tail(l), pick.group===l, 'group', cbData({l:L, g:l, m}))).join('')}</div>`;
      }
    } else {
      const lead = commonLead(labels);
      res.html += `<div class="cb-lbl">Type</div><div class="cb-chips">${labels.map(l=>cbChip(l.slice(lead.length), pick.group===l, 'group', cbData({l:L, g:l, m}))).join('')}</div>`;
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
    res.html += `<table class="cb-grid cb-ghah"><thead><tr><th></th>${axis.cols.map(c=>`<th>${cbEsc(c)}</th>`).join('')}</tr></thead><tbody>${
      axis.rows.map(r=>`<tr><th>${cbEsc(r)}</th>${axis.cols.map(c=>{
        const it = axis.cells[r][c];
        if(!it) return `<td class="na"></td>`;
        return `<td><button type="button" class="cb-cell${on(it[1])?' on':''}" data-a="item"${cbData({l:L, r:it[1], m})} title="${cbEsc(it[0])}"></button></td>`;
      }).join('')}</tr>`).join('')}</tbody></table>`;
  } else if(g.items.length>1 || m){
    res.html += `<div class="cb-lbl">${groups.length>1 ? 'Size / option' : 'Pick one'}</div><div class="cb-chips">${g.items.map(([nm,rf])=>cbChip(nm, on(rf), 'item', cbData({l:L, r:rf, m}))).join('')}</div>`;
  }
  if(!m) res.item = g.items.find(([,r])=>r===pick.ref) || null;
  return res;
}
function cbNarrowKey(label, mode){ return `${mode||''}|${mode ? '' : cb.activeTooth}|${label}`; }
function cbEditKey(key){ return `${cb.activeTooth}|${key}`; }

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
    const sub = c.item ? `REF ${cbEsc(c.item[1])}${pack>1?` · ships ${pack}/pkg`:''}${c.group.caution?` · <span class="cb-warn-i">⚠ confirm before ordering</span>`:''}` : '';
    if(c.item && !cb.editing.has(cbEditKey(pt.label))){
      return cbDoneCard(id, pt.label, `${c.group.label}, ${c.item[0]}`, sub, pt.label, true);
    }
    const missing = !c.item && cb.showMissing;
    const done = c.item
      ? `<div class="cb-summary"><b>${cbEsc(c.group.label)}, ${cbEsc(c.item[0])}</b><span class="cb-ref">REF ${cbEsc(c.item[1])}${pack>1?` · ships ${pack}/pkg`:''}</span>${c.group.caution?`<span class="cb-warn">⚠ ${cbEsc(c.group.caution)}</span>`:''}</div>`
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
    const lines = [];
    let groupCount = 0;
    pt.options.forEach(opt=>optionGroups(cb.sys, opt, profile).forEach(g=>{ groupCount++; g.items.forEach(([nm,rf])=>{
      if(counts[rf]) lines.push({ g, nm, rf, cat: opt.category });
    }); }));
    let html = lines.map(l=>cbCountRow(L, groupCount>1 ? `${l.g.group.label} · ${l.nm}` : l.nm, l.rf, counts[l.rf], parsePackSize(l.nm, l.g.group.label), l.g.group.caution)).join('');
    let kinds = lines.flatMap(l=>diagramKindsFor(cb.sys, l.g.group.sourceCategory || l.cat, l.g.group));
    if(!lines.length || cb.adding[L]){
      const r = resolvePartPick(cb.sys, pt, profile, cb.pickers[L], null);
      const picker = cb.pickers[L] = { opt:r.opt, group:r.group, ref:null };
      const c = cbChooser(pt, picker, profile, 'x');
      kinds = c.kinds.concat(kinds);
      html += `<div class="cb-picker">${lines.length?`<div class="cb-lbl">Add another</div>`:''}${c.html}${
        c.group ? `<p class="cb-note">Tap a size to add it${cbAllOnXImplantTotal()?', one per implant':''}.</p>` : ''}${
        lines.length ? `<button type="button" class="cb-link" data-a="xadd"${cbData({l:L})}>Done adding</button>` : ''}</div>`;
    } else {
      html += `<button type="button" class="cb-link" data-a="xadd"${cbData({l:L})}>+ Add another size</button>`;
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
  return `<div class="cb-card" id="cb-part-${role.replace(/\W+/g,'-')}"><h3>${role}<button type="button" class="cb-x" data-a="need"${cbData({l:role})} title="Not needed">✕</button></h3>${cbDiagram(role,'implant')}${variants}
    <div class="cb-gridwrap"><table class="cb-grid"><thead>${head}</thead><tbody>${body}</tbody></table></div>
    <p class="cb-note cb-axis">Tap a cell once per implant · Rows: diameter · Columns: length (mm)</p>${picked.join('')}</div>`;
}

/* ---------- What will be added ---------- */

/* Every line the builder would add: [{ref, name, group, category,
   pieces|packages, teeth}], plus what is still missing. */
function cbCollect(){
  const lines = new Map();
  const missing = [];
  const add = (ref, name, group, category, n, unit, tooth) => {
    let l = lines.get(ref);
    if(!l){ l = { ref, name, group, category, pieces:0, packages:0, teeth:new Set() }; lines.set(ref, l); }
    l[unit] += n;
    if(tooth!=null) l.teeth.add(tooth);
  };
  if(!cb || !cb.sys){ return { lines:[], missing:['system'] }; }
  const sys = SYSTEMS[cb.sys];
  const implantCat = WIZARD_IMPLANTS_CATEGORY_NAME[cb.sys];
  if(cb.kind==='allonx'){
    Object.entries(cb.implantCounts).forEach(([role, counts])=>{
      if(!cb.needed.includes(role)) return;
      let any = false;
      (sys.catalog[implantCat] || []).forEach(g=>g.items.forEach(([nm,rf])=>{
        if(counts[rf]){ any = true; add(rf, nm, g, implantCat, counts[rf], 'packages'); }
      }));
      if(!any) missing.push(role.toLowerCase());
    });
    const profile = cbAllOnXProfile();
    allOnXPartTypes(cb.sys).forEach(pt=>{
      if(!cb.needed.includes(pt.label)) return;
      const counts = cb.counts[pt.label] || {};
      let any = false;
      pt.options.forEach(opt=>optionGroups(cb.sys, opt, profile).forEach(g=>g.items.forEach(([nm,rf])=>{
        if(counts[rf]){ any = true; add(rf, nm, g.group, g.group.sourceCategory || opt.category, counts[rf], 'packages'); }
      })));
      if(!any) missing.push(pt.label.toLowerCase());
    });
    if(!cb.needed.length) missing.push('parts');
    return { lines:[...lines.values()], missing };
  }
  const teeth = cb.fixedImplant ? [null] : cbImplantTeeth();
  if(!teeth.length) missing.push('teeth');
  const per = cb.fixedImplant ? (cb.fixedImplant.qty || 1) : 1;
  teeth.forEach(tooth=>{
    const config = cbConfig(tooth);
    const where = tooth==null ? '' : ` for #${tooth}`;
    if(!config.implant){ missing.push('implant'+where); return; }
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
  if(cb.fixedImplant && !cb.needed.length) missing.push('parts');
  return { lines:[...lines.values()], missing };
}

function cbFooter(){
  const { lines, missing } = cbCollect();
  const n = lines.length;
  const label = missing.length
    ? (cb.sys ? `Still to pick: ${missing.slice(0,3).join(', ')}${missing.length>3?'…':''}` : 'Pick a system')
    : `Add ${n} item${n===1?'':'s'} to order`;
  return `<div class="cb-foot"><button type="button" class="cb-add${missing.length?' wait':''}" data-a="add">${cbEsc(label)}</button>
    <button type="button" class="cb-cancel" data-a="cancel">Cancel</button></div>`;
}

/* ---------- Actions ---------- */

async function cbAddToOrder(){
  const { lines, missing } = cbCollect();
  if(missing.length){
    cb.showMissing = true;
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
  lines.forEach(l=>{
    const key = cb.sys+'::'+l.ref;
    const pack = parsePackSize(l.name, l.group.label);
    const qty = l.packages + (l.pieces ? Math.ceil(l.pieces/pack) : 0);
    const prev = selected[key];
    selected[key] = { name:l.name, group:l.group.label, category:l.category, qty:(prev?prev.qty:0)+qty, system:cb.sys, ref:l.ref };
    const teeth = [...new Set([...((prev && prev.teeth) || []), ...l.teeth])].sort((a,b)=>a-b);
    if(teeth.length) selected[key].teeth = teeth;
  });
  cbRemember();
  if(cb.kind==='case' && !cb.fixedImplant){
    currentTreatmentPlan = { type:cb.type, implants:cbImplantTeeth(), pontics:cbPontics() };
  }
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
  showToast(`Added ${lines.length} item${lines.length===1?'':'s'} to your order`);
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
  }
  cbSaveMemory(mem);
}

async function cbCancel(){
  const touched = cb && (Object.keys(cb.teeth).length || cb.needed.length || cb.sys && cb.kind==='allonx' && Object.keys(cb.counts).length);
  if(touched){
    const ok = await showModal({ type:'confirm', title:'Leave this case?', message:'Nothing from this case has been added to your order yet.', okText:'Leave', cancelText:'Keep going' });
    if(!ok) return;
  }
  const back = cb && cb.fixedImplant ? 'category' : 'home';
  cb = null;
  navigateWithFade(()=>{ viewMode = back; render(); window.scrollTo(0,0); });
}

function cbOnClick(e){
  const btn = e.target.closest('[data-a]');
  if(!btn || !cb) return;
  const d = btn.dataset;
  switch(d.a){
    case 'type':
      cb.type = d.v;
      if(cb.type==='single') Object.keys(cb.teeth).forEach(t=>{ if(cb.teeth[t]==='pontic') delete cb.teeth[t]; });
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
    case 'sys': cbSetSystem(d.id); cb.editing.delete(cbEditKey('sys')); break;
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
        const order = (cb.kind==='allonx' ? ['Primary Implants','Backup Implants'] : []).concat(cbPartTypes().map(p=>p.label));
        cb.needed.push(d.l);
        cb.needed.sort((a,b)=>order.indexOf(a)-order.indexOf(b));
      }
      break;
    }
    case 'opt': case 'group': case 'gpre': case 'item': {
      const x = d.m==='x';
      const picks = x ? cb.pickers : cbEditableConfig().picks;
      const cur = picks[d.l] || {};
      if(d.a==='opt'){ picks[d.l] = { opt:Number(d.i), group:null, ref:null }; delete cb.narrow[cbNarrowKey(d.l, d.m)]; }
      else if(d.a==='group') picks[d.l] = { ...cur, group:d.g, ref:null };
      else if(d.a==='gpre'){
        // First step of a two-step type pick; a step with one type picks it.
        cb.narrow[cbNarrowKey(d.l, d.m)] = d.p;
        const pt = cbPartTypes().find(t=>t.label===d.l);
        const profile = x ? cbAllOnXProfile() : cbProfileFor(cbConfig(cb.activeTooth ?? cbImplantTeeth()[0]).implant);
        const labels = optionGroups(cb.sys, pt.options[cur.opt], profile).map(g=>g.group.label);
        const split = splitTypeLabels(labels);
        const inHead = split ? labels.filter(l=>split.head(l)===d.p) : [];
        picks[d.l] = { ...cur, group: inHead.length===1 ? inHead[0] : null, ref:null };
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
        }
        cb.adding[d.l] = false;
        cb.lastDone = 'cb-part-' + d.l.replace(/\W+/g,'-');
      }
      else {
        picks[d.l] = { ...cur, ref:d.r };
        cb.editing.delete(cbEditKey(d.l));
        cb.lastDone = 'cb-part-' + d.l.replace(/\W+/g,'-');
      }
      if(!x && d.a!=='item') cb.editing.add(cbEditKey(d.l));
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
  // A card that just folded up: keep it in view so the next one follows.
  if(cb && cb.lastDone){
    const el = document.getElementById(cb.lastDone);
    cb.lastDone = null;
    if(el && el.getBoundingClientRect().top < 70) window.scrollBy({top: el.getBoundingClientRect().top - 80});
  }
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
