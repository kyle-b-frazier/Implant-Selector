/* Explanatory cross-section drawings for the size terms the catalogs use
   (GH, AH, H, diameter and length) and for a few ideas that are easier to
   see than to read (open vs closed tray, cover screw vs healing abutment,
   engaging vs non-engaging, the multi-unit stack, overdenture
   attachments). Generic line drawings, not any manufacturer's product
   image. diagramKindsFor() picks the drawings that explain a group;
   diagramHtml() returns a drawing and its caption. Shown behind small
   "ⓘ" buttons in the catalog and in the case builder. */

/* Which drawing explains a group's sizes, or null when none applies.
   Every item in the group has to follow the same naming. */
function diagramKindFor(systemId, category, group){
  if(category === WIZARD_IMPLANTS_CATEGORY_NAME[systemId]) return 'implant';
  const names = group.items.map(([nm])=>nm);
  if(!names.length) return null;
  const all = re => names.every(n=>re.test(n));
  if(all(/GH\s*[\d.]+\s*\/\s*AH\s*[\d.]+/i)) return 'ghah';
  if(all(/GH\s*[\d.]+\s*,\s*H\s*[\d.]+/i)) return 'gh-h';
  const angled = () => /Angled|angulation\s*(?:1[5-9]|[2-9]\d)°|\b(?:1[57]|2[05]|30|45|60)°/i.test(group.label + ' ' + names.join(' '));
  if(all(/\bGH\s*[\d.]+/i)) return angled() ? 'gh-angled' : 'gh';
  const heightOnly = all(/(?:^|[\s,])H\s*[\d.]+\s*mm/i);
  if(/Healing/i.test(category) && heightOnly) return 'h';
  // Nobel Biocare writes an abutment's collar height as "H" (its S series
  // brochure labels the same column "Collar height").
  if(NOBEL_PLATFORM_SYSTEMS.has(systemId) && heightOnly && /Abutment/i.test(category) && !/Healing Cap|Impression/i.test(group.label)){
    return angled() ? 'collar-angled' : 'collar';
  }
  return null;
}

/* Drawings that explain what a group is for rather than its sizes. */
function diagramConceptsFor(systemId, category, group){
  if(category === WIZARD_IMPLANTS_CATEGORY_NAME[systemId]) return [];
  const text = group.label + ' ' + group.items.map(([nm])=>nm).join(' ');
  const out = [];
  if(/Open Tray|Closed Tray/i.test(text)) out.push('tray');
  if(/Cover Screw|Closure Cap/i.test(category) ||
     (/Healing Abutment/i.test(category) && !/Healing Cap|Multi-unit/i.test(group.label))) out.push('cover');
  if(/\b(?:non-)?engaging\b/i.test(text) || /\bfor (?:Crowns?|Bridge\/Bar)\b/i.test(category + ' ' + group.label)) out.push('engaging');
  if(/Multi-unit|Mini Conical/i.test(category + ' ' + group.label)) out.push('mu-stack');
  if(/Novaloc/i.test(category)) out.push('novaloc');
  if(/Locator(?:®| R-Tx)/i.test(category)) out.push('locator');
  return out;
}

/* Every drawing for a group: the size drawing first, then the others. */
function diagramKindsFor(systemId, category, group){
  return [diagramKindFor(systemId, category, group), ...diagramConceptsFor(systemId, category, group)].filter(Boolean);
}

const DIAGRAM_CAPTIONS = {
  ghah: '<b>GH (gingival height)</b> is the part that passes through the gum, from the implant platform up to the gum line. <b>AH (abutment height)</b> is the part above that. The number in brackets is the total height, GH + AH.',
  'gh-h': '<b>GH (gingival height)</b> is the part that passes through the gum, from the implant platform up to the gum line. <b>H</b> is the total height, also measured from the implant platform.',
  h: '<b>H</b> is the height of the healing abutment, measured from the implant platform.',
  gh: '<b>GH (gingival height)</b> is the height of the collar that passes through the gum, measured from the implant platform.',
  'gh-angled': '<b>GH (gingival height)</b> is the height of the collar that passes through the gum, measured from the implant platform. Angled versions tilt the top to make up for an implant placed at an angle.',
  collar: '<b>H</b> is the collar height: the part that passes through the gum, measured from the implant platform. Nobel Biocare lists it as H.',
  'collar-angled': '<b>H</b> is the collar height: the part that passes through the gum, measured from the implant platform. Nobel Biocare lists it as H. Angled versions tilt the top to make up for an implant placed at an angle.',
  tray: '<b>Open tray:</b> the coping has a long guide screw that sticks out through a hole in the tray. You undo the screw before lifting the tray, so the coping comes out locked inside the impression. <b>Closed tray:</b> the coping is short and stays on the implant when the tray comes off; you then unscrew it and press it back into its spot in the impression. Open tray is often chosen for several or angled implants; closed tray is simpler when there is little room to open.',
  cover: 'A <b>cover screw</b> (Straumann calls it a closure cap) sits flush on the implant and the gum is closed over it. A second visit uncovers it and swaps in a healing abutment (two-stage). A <b>healing abutment</b> goes on at surgery instead and stays through the gum, so the gum heals around it (one-stage). Which one goes on at surgery depends on whether the implant is buried or left exposed.',
  engaging: '<b>Engaging</b> parts have an anti-rotation shape at the bottom that keys into the implant, so a single crown can\'t spin. <b>Non-engaging</b> parts have a smooth bottom, so a bridge or bar joining several implants can still seat when the implants aren\'t parallel. Straumann labels these "for Crown" and "for Bridge/Bar".',
  'mu-stack': 'The <b>multi-unit abutment</b> is screwed into the implant and normally stays in. Everything after that attaches to the abutment, not the implant: a <b>healing or protective cap</b> while there is no bridge, then a <b>temporary coping</b> built into the bridge and held by a <b>prosthetic screw</b>. Angled abutments (e.g. 17° or 30°) correct for tilted implants so all the screws come out in a usable direction.',
  novaloc: 'The <b>abutment</b> screws into the implant. A <b>matrix housing</b> is set into the denture, and a <b>retention insert</b> clicks into the housing and snaps over the abutment head. Swapping the insert changes how firmly the denture holds; Novaloc color-codes the inserts by retention force, shown in the strip.',
  locator: 'The <b>Locator abutment</b> screws into the implant. A metal cap (housing) is processed into the denture, and a nylon <b>retention insert</b> sits in the cap and snaps onto the abutment. Inserts come in Zero, Low, Medium and High retention; swapping them changes how firmly the denture holds.',
  implant: '<b>Ø</b> is the implant\'s diameter and <b>length</b> is how far it goes into the bone. The <b>platform</b> (e.g. RB/WB, NC/RC, NP/RP) is the connection on top; every part has to match it, which is why the app only offers parts for the implant\'s platform.'
};

/* Shared pieces, in a 360 × 236 drawing. The implant platform sits at the
   top of the bone (y = 156) and the gum line 46 units above it. */
const DG = {
  bone:'#F1E6D2', boneLine:'#C9B48E', gum:'#F7D9D9', gumLine:'#D9A0A0',
  metal:'#DCE1E8', metalLine:'#5B6572', part:'#E4ECF8', partLine:'#00205B',
  dim:'#3E7A0E', ink:'#1B2430', soft:'#5B6572',
  platformY:156, gumY:110
};

function dgArrow(x, y1, y2, color){
  const a = 5;
  return `<line x1="${x}" y1="${y1+a}" x2="${x}" y2="${y2-a}" stroke="${color}" stroke-width="1.6"/>` +
    `<path d="M${x-a} ${y1+a+1} L${x} ${y1} L${x+a} ${y1+a+1}" fill="none" stroke="${color}" stroke-width="1.6"/>` +
    `<path d="M${x-a} ${y2-a-1} L${x} ${y2} L${x+a} ${y2-a-1}" fill="none" stroke="${color}" stroke-width="1.6"/>` +
    `<line x1="${x-7}" y1="${y1}" x2="${x+7}" y2="${y1}" stroke="${color}" stroke-width="1.2"/>` +
    `<line x1="${x-7}" y1="${y2}" x2="${x+7}" y2="${y2}" stroke="${color}" stroke-width="1.2"/>`;
}
function dgLabel(x, y, title, sub, color, anchor){
  const a = anchor || 'start';
  return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="13" font-weight="700" fill="${color}">${title}</text>` +
    (sub ? `<text x="${x}" y="${y+14}" text-anchor="${a}" font-size="10.5" fill="${DG.soft}">${sub}</text>` : '');
}
/* Bone, gum and the top of a bone-level implant, with guide lines. */
function dgTissue(withGum){
  const {platformY:p, gumY:g} = DG;
  let s = `<rect x="0" y="${p}" width="360" height="${236-p}" fill="${DG.bone}"/>` +
    `<line x1="0" y1="${p}" x2="360" y2="${p}" stroke="${DG.boneLine}" stroke-width="1.2"/>` +
    `<text x="8" y="228" font-size="10.5" fill="#9A845C">Bone</text>`;
  if(withGum){
    s += `<path d="M0 ${p} L0 ${g+6} Q90 ${g-4} 180 ${g} T360 ${g+6} L360 ${p} Z" fill="${DG.gum}"/>` +
      `<path d="M0 ${g+6} Q90 ${g-4} 180 ${g} T360 ${g+6}" fill="none" stroke="${DG.gumLine}" stroke-width="1.2"/>` +
      `<text x="8" y="${g+26}" font-size="10.5" fill="#B06B6B">Gum</text>`;
  }
  // Implant body (cut off below), with threads.
  s += `<path d="M150 ${p} L210 ${p} L206 236 L154 236 Z" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.4"/>`;
  for(let y=p+14; y<236; y+=14) s += `<line x1="151" y1="${y}" x2="209" y2="${y-6}" stroke="${DG.metalLine}" stroke-width="1"/>`;
  s += `<line x1="64" y1="${p}" x2="146" y2="${p}" stroke="${DG.soft}" stroke-width="1" stroke-dasharray="3 3"/>` +
    `<text x="64" y="${p+14}" font-size="10" fill="${DG.soft}">platform</text>`;
  return s;
}
function dgSvg(body, label, h){
  return `<svg class="dg-svg" viewBox="0 0 360 ${h||236}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">${body}</svg>`;
}

function diagramSvg(kind){
  const {platformY:p, gumY:g} = DG;
  const top = 64;
  if(kind==='ghah' || kind==='gh-h' || kind==='h'){
    const anatomic = kind==='gh-h';
    // Healing abutment: narrow at the platform, flaring to the gum line,
    // then straight (or wider and rounded, for anatomic shapes) above it.
    const w = anatomic ? 40 : 34;
    const body = `<path d="M152 ${p} L${180-w} ${g} L${180-w} ${top+8} Q${180-w} ${top} ${180-w+8} ${top} L${180+w-8} ${top} Q${180+w} ${top} ${180+w} ${top+8} L${180+w} ${g} L208 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<line x1="${180-w}" y1="${g}" x2="${180+w}" y2="${g}" stroke="${DG.partLine}" stroke-width=".8" stroke-dasharray="2 3"/>`;
    let dims = '';
    if(kind==='ghah'){
      dims = dgArrow(252, g, p, DG.dim) + dgLabel(264, (g+p)/2, 'GH', 'gingival height', DG.dim) +
        dgArrow(252, top, g, DG.partLine) + dgLabel(264, (top+g)/2, 'AH', 'abutment height', DG.partLine) +
        dgArrow(116, top, p, DG.soft) + dgLabel(104, (top+p)/2, 'Total', 'GH + AH', DG.ink, 'end');
    } else if(kind==='gh-h'){
      dims = dgArrow(252, g, p, DG.dim) + dgLabel(264, (g+p)/2, 'GH', 'gingival height', DG.dim) +
        dgArrow(116, top, p, DG.partLine) + dgLabel(104, (top+p)/2, 'H', 'total height', DG.partLine, 'end');
    } else {
      dims = dgArrow(252, top, p, DG.partLine) + dgLabel(264, (top+p)/2, 'H', 'height', DG.partLine);
    }
    return dgSvg(dgTissue(true) + body + dims, 'Healing abutment cross-section');
  }
  if(kind==='gh' || kind==='gh-angled' || kind==='collar' || kind==='collar-angled'){
    const dimLabel = kind.startsWith('collar') ? 'H' : 'GH';
    // Abutment: a collar through the gum, then a post above it; the angled
    // version tips the post over.
    const collar = `<path d="M152 ${p} L146 ${g} L214 ${g} L208 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    const post = `<path d="M158 ${g} L164 ${top} L196 ${top} L202 ${g} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    let body = collar;
    let extra = '';
    if(kind.endsWith('-angled')){
      // The post leans over while its base stays on the collar.
      const lean = Math.round((g-top)*Math.tan(20*Math.PI/180));
      body += `<path d="M158 ${g} L${164+lean} ${top} L${196+lean} ${top} L202 ${g} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
        `<line x1="180" y1="${g}" x2="180" y2="18" stroke="${DG.soft}" stroke-width="1" stroke-dasharray="3 3"/>` +
        `<line x1="180" y1="${g}" x2="${(180+(g-18)*Math.tan(20*Math.PI/180)).toFixed(1)}" y2="18" stroke="${DG.partLine}" stroke-width="1" stroke-dasharray="3 3"/>`;
      const r = g-30, a = 20*Math.PI/180;
      extra = `<path d="M180 ${g-r} A ${r} ${r} 0 0 1 ${(180+r*Math.sin(a)).toFixed(1)} ${(g-r*Math.cos(a)).toFixed(1)}" fill="none" stroke="${DG.partLine}" stroke-width="1.6"/>` +
        dgLabel(170, 34, 'Angle', 'e.g. 17° or 30°', DG.partLine, 'end');
    } else {
      body += post;
    }
    const dims = dgArrow(252, g, p, DG.dim) + dgLabel(264, (g+p)/2, dimLabel, 'collar height', DG.dim);
    return dgSvg(dgTissue(true) + body + extra + dims, 'Abutment cross-section');
  }
  if(kind==='implant'){
    // Whole implant in bone, with diameter across the top and length down
    // the side.
    const t = 54, b = 214;
    let s = `<rect x="0" y="${t}" width="360" height="${236-t}" fill="${DG.bone}"/>` +
      `<line x1="0" y1="${t}" x2="360" y2="${t}" stroke="${DG.boneLine}" stroke-width="1.2"/>` +
      `<text x="8" y="228" font-size="10.5" fill="#9A845C">Bone</text>` +
      `<path d="M150 ${t} L210 ${t} L208 ${b-22} Q206 ${b} 180 ${b} Q154 ${b} 152 ${b-22} Z" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.4"/>`;
    for(let y=t+16; y<b-16; y+=14) s += `<line x1="151" y1="${y}" x2="209" y2="${y-6}" stroke="${DG.metalLine}" stroke-width="1"/>`;
    s += `<rect x="150" y="${t-6}" width="60" height="6" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.4"/>`;
    // Diameter, drawn horizontally above.
    const y = 26, a = 5;
    s += `<line x1="${150+a}" y1="${y}" x2="${210-a}" y2="${y}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<path d="M${150+a+1} ${y-a} L150 ${y} L${150+a+1} ${y+a}" fill="none" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<path d="M${210-a-1} ${y-a} L210 ${y} L${210-a-1} ${y+a}" fill="none" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<line x1="150" y1="${y-7}" x2="150" y2="${t-8}" stroke="${DG.partLine}" stroke-width="1"/>` +
      `<line x1="210" y1="${y-7}" x2="210" y2="${t-8}" stroke="${DG.partLine}" stroke-width="1"/>` +
      dgLabel(222, y+4, 'Ø diameter', '', DG.partLine);
    s += dgArrow(252, t, b, DG.dim) + dgLabel(264, (t+b)/2, 'Length', 'into the bone', DG.dim);
    s += `<line x1="104" y1="${t-3}" x2="146" y2="${t-3}" stroke="${DG.soft}" stroke-width="1" stroke-dasharray="3 3"/>` +
      dgLabel(8, t-18, 'Platform', 'connection on top', DG.ink);
    return dgSvg(s, 'Implant diameter and length');
  }
  return diagramConceptSvg(kind);
}

/* Small helpers for the side-by-side drawings: a panel's bone and gum, an
   implant top, and a labelled leader line. */
function dgPanel(x0, p, g, closed){
  let s = `<rect x="${x0}" y="${p}" width="180" height="${236-p}" fill="${DG.bone}"/>` +
    `<line x1="${x0}" y1="${p}" x2="${x0+180}" y2="${p}" stroke="${DG.boneLine}" stroke-width="1.2"/>`;
  if(g!=null){
    const top = closed ? `M${x0} ${g} Q${x0+90} ${g-10} ${x0+180} ${g}` : `M${x0} ${g} L${x0+180} ${g}`;
    s += `<path d="${top} L${x0+180} ${p} L${x0} ${p} Z" fill="${DG.gum}"/>` +
      `<path d="${top}" fill="none" stroke="${DG.gumLine}" stroke-width="1.2"/>`;
  }
  return s;
}
function dgImplantTop(cx, p, bottom){
  let s = `<path d="M${cx-22} ${p} L${cx+22} ${p} L${cx+19} ${bottom} L${cx-19} ${bottom} Z" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.4"/>`;
  for(let y=p+12; y<bottom; y+=12) s += `<line x1="${cx-21}" y1="${y}" x2="${cx+21}" y2="${y-5}" stroke="${DG.metalLine}" stroke-width="1"/>`;
  return s;
}
function dgLeader(x1, y1, x2, y2, title, sub, color, anchor){
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${DG.soft}" stroke-width="1"/>` +
    `<circle cx="${x1}" cy="${y1}" r="2" fill="${DG.soft}"/>` +
    dgLabel(x2 + (anchor==='end' ? -4 : 4), y2+4, title, sub, color || DG.ink, anchor);
}
function dgDivider(){
  return `<line x1="180" y1="6" x2="180" y2="230" stroke="#D5DBE4" stroke-width="1" stroke-dasharray="4 4"/>`;
}
const DG_TRAY = {fill:'#EEF4E4', line:'#8DAA62', tray:'#C9D3E0'};
const NOVALOC_INSERT_COLORS = {Red:'#D23B3B', White:'#FFFFFF', Yellow:'#F2C230', Green:'#3E9B4F', Blue:'#2F6FD0', Black:'#222'};

function diagramConceptSvg(kind){
  if(kind==='cover'){
    const p = 160, g = 116;
    let s = dgPanel(0, p, g, true) + dgPanel(180, p, g, false) + dgDivider();
    // Left: cover screw flush with the implant, gum closed over it.
    s += dgImplantTop(90, p, 236) +
      `<rect x="66" y="${p-5}" width="48" height="6" rx="2" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      dgLeader(112, p-3, 128, 136, 'Cover screw', 'under the gum', DG.partLine);
    // Right: healing abutment standing through the gum.
    s += dgImplantTop(270, p, 236) +
      `<path d="M250 ${p} L246 ${g} L246 92 Q246 86 252 86 L288 86 Q294 86 294 92 L294 ${g} L290 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      dgLeader(294, 100, 304, 76, 'Healing', 'abutment', DG.partLine);
    s += dgLabel(8, 20, 'Two-stage', 'buried, uncovered later', DG.ink) +
      dgLabel(188, 20, 'One-stage', 'through the gum', DG.ink) +
      `<text x="8" y="228" font-size="10.5" fill="#9A845C">Bone</text>` +
      `<text x="8" y="${g+24}" font-size="10.5" fill="#B06B6B">Gum</text>`;
    return dgSvg(s, 'Cover screw compared with a healing abutment');
  }
  if(kind==='tray'){
    const p = 184, g = 150;
    let s = dgPanel(0, p, g, false) + dgPanel(180, p, g, false) + dgDivider();
    // Tray and impression material, drawn over each panel.
    const tray = (cx, hole) => {
      const L = cx-62, R = cx+62, T = 62;
      let t = `<path d="M${L+8} ${T+6} L${R-8} ${T+6} L${R-8} ${g} L${L+8} ${g} Z" fill="${DG_TRAY.fill}" stroke="${DG_TRAY.line}" stroke-width="1"/>`;
      const top = hole
        ? `M${L} ${g} L${L} ${T} L${cx-9} ${T} L${cx-9} ${T+6} L${L+8} ${T+6} L${L+8} ${g} Z M${R} ${g} L${R} ${T} L${cx+9} ${T} L${cx+9} ${T+6} L${R-8} ${T+6} L${R-8} ${g} Z`
        : `M${L} ${g} L${L} ${T} L${R} ${T} L${R} ${g} L${R-8} ${g} L${R-8} ${T+6} L${L+8} ${T+6} L${L+8} ${g} Z`;
      return t + `<path d="${top}" fill="${DG_TRAY.tray}" stroke="${DG.metalLine}" stroke-width="1.2"/>`;
    };
    // Open tray: tall coping with a guide screw out through the tray.
    s += dgImplantTop(90, p, 236) + tray(90, true) +
      `<path d="M78 ${p} L78 112 L102 112 L102 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<rect x="87" y="48" width="6" height="64" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.2"/>` +
      `<rect x="81" y="40" width="18" height="9" rx="2" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.2"/>` +
      dgLeader(99, 44, 110, 48, 'Guide screw', '', DG.partLine);
    // Closed tray: short coping, solid tray.
    s += dgImplantTop(270, p, 236) + tray(270, false) +
      `<path d="M258 ${p} L258 128 Q258 120 266 120 L274 120 Q282 120 282 128 L282 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    s += dgLabel(8, 18, 'Open tray', 'coping comes out in the tray', DG.ink) + dgLabel(188, 18, 'Closed tray', 'coping stays on the implant', DG.ink) +
      `<text x="300" y="56" text-anchor="middle" font-size="10" fill="${DG.soft}">tray</text>` +
      `<text x="270" y="90" text-anchor="middle" font-size="10" fill="#6E8A44">impression</text>` +
      `<text x="270" y="102" text-anchor="middle" font-size="10" fill="#6E8A44">material</text>`;
    return dgSvg(s, 'Open tray compared with closed tray impression copings');
  }
  if(kind==='engaging'){
    const p = 170;
    let s = dgPanel(0, p, null) + dgPanel(180, p, null) + dgDivider();
    // Implant tops, cut open to show the connection socket.
    const implant = cx => dgImplantTop(cx, p, 236) +
      `<path d="M${cx-12} ${p} L${cx-12} ${p+30} L${cx+12} ${p+30} L${cx+12} ${p} Z" fill="#FFFFFF" stroke="${DG.metalLine}" stroke-width="1.2"/>`;
    s += implant(90) + implant(270);
    // Engaging: collar with a keyed bottom; non-engaging: smooth taper.
    const collar = cx => `<path d="M${cx-20} 140 L${cx-30} 84 L${cx+30} 84 L${cx+20} 140 Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    s += collar(90) +
      `<path d="M78 140 L78 160 L102 160 L102 140 Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<line x1="84" y1="140" x2="84" y2="160" stroke="${DG.partLine}" stroke-width=".8"/><line x1="96" y1="140" x2="96" y2="160" stroke="${DG.partLine}" stroke-width=".8"/>`;
    s += collar(270) +
      `<path d="M260 140 L264 152 L276 152 L280 140 Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    // Seen-from-below icons: a hex vs a circle.
    const hex = (cx, cy, r) => `<path d="${[0,1,2,3,4,5].map(i=>{const a=Math.PI/3*i; return (i?'L':'M')+(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1);}).join(' ')} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.4"/>`;
    s += hex(150, 112, 12) + `<circle cx="330" cy="112" r="11" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.4"/>` +
      `<text x="150" y="138" text-anchor="middle" font-size="9.5" fill="${DG.soft}">from below</text>` +
      `<text x="330" y="138" text-anchor="middle" font-size="9.5" fill="${DG.soft}">from below</text>`;
    s += dgLabel(8, 20, 'Engaging', 'keyed, can\'t turn · single crown', DG.ink) +
      dgLabel(188, 20, 'Non-engaging', 'smooth · bridge or bar', DG.ink) +
      `<text x="8" y="228" font-size="10.5" fill="#9A845C">Implant</text>`;
    return dgSvg(s, 'Engaging compared with non-engaging abutment bases');
  }
  if(kind==='mu-stack'){
    const H = 262, p = 206, g = 176;
    let s = `<rect x="0" y="${p}" width="360" height="${H-p}" fill="${DG.bone}"/>` +
      `<line x1="0" y1="${p}" x2="360" y2="${p}" stroke="${DG.boneLine}" stroke-width="1.2"/>` +
      `<path d="M0 ${p} L0 ${g+4} Q90 ${g-6} 180 ${g} T360 ${g+4} L360 ${p} Z" fill="${DG.gum}"/>` +
      `<path d="M0 ${g+4} Q90 ${g-6} 180 ${g} T360 ${g+4}" fill="none" stroke="${DG.gumLine}" stroke-width="1.2"/>` +
      `<text x="8" y="${H-8}" font-size="10.5" fill="#9A845C">Bone</text>` +
      `<text x="8" y="${g+22}" font-size="10.5" fill="#B06B6B">Gum</text>`;
    // The stack, shifted left so the labels fit on the right.
    s += `<g transform="translate(-56 0)">`;
    s += `<path d="M156 ${p} L204 ${p} L201 ${H} L159 ${H} Z" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.4"/>`;
    for(let y=p+12; y<H; y+=12) s += `<line x1="157" y1="${y}" x2="203" y2="${y-5}" stroke="${DG.metalLine}" stroke-width="1"/>`;
    // Multi-unit abutment: collar through the gum, then a short cone.
    s += `<path d="M158 ${p} L152 ${g} L208 ${g} L202 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>` +
      `<path d="M152 ${g} L162 ${g-20} L198 ${g-20} L208 ${g} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    // Bridge, with a screw channel.
    s += `<path d="M96 100 Q96 52 130 50 L230 50 Q264 52 264 100 L264 112 Q180 124 96 112 Z" fill="#FBF6EA" stroke="#B9A77F" stroke-width="1.4"/>` +
      `<rect x="170" y="50" width="20" height="70" fill="#FFFFFF" stroke="#B9A77F" stroke-width="1" stroke-dasharray="2 2"/>`;
    // Temporary coping over the cone, then the prosthetic screw.
    s += `<path d="M160 ${g-18} L160 104 L200 104 L200 ${g-18} Z" fill="#E9EEF5" stroke="${DG.metalLine}" stroke-width="1.4"/>` +
      `<rect x="177" y="74" width="6" height="${g-20-74}" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.2"/>` +
      `<rect x="171" y="66" width="18" height="9" rx="2" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.2"/>`;
    s += `</g>` +
      dgLeader(133, 70, 222, 30, 'Prosthetic screw', '', DG.ink) +
      dgLeader(190, 80, 222, 72, 'Bridge', '', DG.ink) +
      dgLeader(144, 130, 222, 118, 'Temporary coping', 'or a healing cap first', DG.ink) +
      dgLeader(150, 172, 222, 160, 'Multi-unit abutment', 'stays in the implant', DG.partLine) +
      dgLeader(147, 230, 222, 226, 'Implant', '', DG.ink);
    return dgSvg(s, 'How multi-unit parts stack', H);
  }
  if(kind==='novaloc' || kind==='locator'){
    const nova = kind==='novaloc';
    const H = 290, p = 196, g = 164, base = 236;
    let s = `<rect x="0" y="${p}" width="360" height="${base-p}" fill="${DG.bone}"/>` +
      `<line x1="0" y1="${p}" x2="360" y2="${p}" stroke="${DG.boneLine}" stroke-width="1.2"/>` +
      `<path d="M0 ${p} L0 ${g+4} Q90 ${g-6} 180 ${g} T360 ${g+4} L360 ${p} Z" fill="${DG.gum}"/>` +
      `<path d="M0 ${g+4} Q90 ${g-6} 180 ${g} T360 ${g+4}" fill="none" stroke="${DG.gumLine}" stroke-width="1.2"/>` +
      `<text x="8" y="${base-6}" font-size="10.5" fill="#9A845C">Bone</text>`;
    s += `<g transform="translate(-56 0)">`;
    s += `<path d="M158 ${p} L202 ${p} L200 ${base} L160 ${base} Z" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.4"/>`;
    for(let y=p+12; y<base; y+=12) s += `<line x1="159" y1="${y}" x2="201" y2="${y-5}" stroke="${DG.metalLine}" stroke-width="1"/>`;
    // Abutment: collar through the gum and the attachment head.
    s += `<path d="M162 ${p} L160 ${g} L200 ${g} L198 ${p} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    s += nova
      ? `<path d="M168 ${g} L168 ${g-8} Q168 ${g-24} 180 ${g-24} Q192 ${g-24} 192 ${g-8} L192 ${g} Z" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`
      : `<path d="M166 ${g} L166 ${g-16} L194 ${g-16} L194 ${g} Z M174 ${g-16} L174 ${g-8} L186 ${g-8} L186 ${g-16}" fill="${DG.part}" stroke="${DG.partLine}" stroke-width="1.6"/>`;
    // Denture, lifted a little to show the snap, with housing and insert.
    const dy = g-34;
    s += `<path d="M88 ${dy} Q88 44 180 40 Q272 44 272 ${dy} L212 ${dy} L212 ${dy-4} Q212 ${dy-40} 180 ${dy-40} Q148 ${dy-40} 148 ${dy-4} L148 ${dy} Z" fill="#F2C4CC" stroke="#C0808E" stroke-width="1.4"/>` +
      `<path d="M152 ${dy} L152 ${dy-30} Q152 ${dy-36} 158 ${dy-36} L202 ${dy-36} Q208 ${dy-36} 208 ${dy-30} L208 ${dy} Z" fill="${DG.metal}" stroke="${DG.metalLine}" stroke-width="1.4"/>` +
      `<path d="M162 ${dy} L162 ${dy-22} Q162 ${dy-28} 168 ${dy-28} L192 ${dy-28} Q198 ${dy-28} 198 ${dy-22} L198 ${dy} Z" fill="${nova ? NOVALOC_INSERT_COLORS.Yellow : '#9AA6B6'}" stroke="${DG.ink}" stroke-width="1"/>` +
      `<path d="M180 ${dy+6} L180 ${g-28}" stroke="${DG.soft}" stroke-width="1.2" stroke-dasharray="3 3"/>` +
      `<path d="M176 ${g-32} L180 ${g-26} L184 ${g-32}" fill="none" stroke="${DG.soft}" stroke-width="1.2"/>`;
    s += `</g>` +
      dgLeader(176, 74, 222, 30, 'Denture', '', DG.ink) +
      dgLeader(150, dy-32, 222, 64, nova ? 'Matrix housing' : 'Metal cap', 'set into the denture', DG.ink) +
      dgLeader(140, dy-12, 222, 104, 'Retention insert', 'swappable', DG.ink) +
      dgLeader(136, g-12, 222, 146, nova ? 'Novaloc abutment' : 'Locator abutment', 'GH/H = collar height', DG.partLine) +
      dgLeader(145, p+16, 222, 206, 'Implant', '', DG.ink) +
      `<text x="8" y="${g+22}" font-size="10.5" fill="#B06B6B">Gum</text>`;
    // Strength strip under the drawing.
    s += `<rect x="0" y="${base}" width="360" height="${H-base}" fill="#FFFFFF"/>`;
    const chips = nova
      ? Object.entries(NOVALOC_INSERT_COLORS).map(([name, fill])=>({name, fill}))
      : ['Zero','Low','Medium','High'].map((name, i)=>({name, fill:['#E8ECF1','#C3CBD6','#8F9BAB','#5B6572'][i]}));
    const w = nova ? 52 : 80, gap = nova ? 6 : 8, x0 = (360 - chips.length*w - (chips.length-1)*gap)/2;
    s += `<text x="180" y="${base+14}" text-anchor="middle" font-size="10.5" font-weight="700" fill="${DG.ink}">Retention inserts, light → strong</text>`;
    chips.forEach((c, i)=>{
      const x = x0 + i*(w+gap);
      s += `<rect x="${x}" y="${base+21}" width="${w}" height="14" rx="3" fill="${c.fill}" stroke="${DG.metalLine}" stroke-width="1"/>` +
        `<text x="${x+w/2}" y="${base+48}" text-anchor="middle" font-size="10" fill="${DG.ink}">${c.name}</text>`;
    });
    return dgSvg(s, nova ? 'How Novaloc overdenture parts fit together' : 'How Locator overdenture parts fit together', H);
  }
  return '';
}

function diagramHtml(kind){
  if(!DIAGRAM_CAPTIONS[kind]) return '';
  return `<div class="dg">${diagramSvg(kind)}<p class="dg-cap">${DIAGRAM_CAPTIONS[kind]}</p><p class="dg-note">Simplified drawing — not to scale.</p></div>`;
}

/* Text for the ⓘ button. */
const DIAGRAM_BUTTON_LABELS = {
  ghah:'What do GH and AH mean?', 'gh-h':'What do GH and H mean?', h:'Healing abutment height (H)',
  gh:'What does GH mean?', 'gh-angled':'What do GH and the angle mean?',
  collar:'Collar height (H)', 'collar-angled':'Collar height (H) and angle', implant:'Diameter, length and platform',
  tray:'Open vs closed tray', cover:'Cover screw vs healing abutment', engaging:'Engaging vs non-engaging',
  'mu-stack':'How the multi-unit parts stack', novaloc:'How Novaloc parts fit together', locator:'How Locator parts fit together'
};

/* The drawings to offer for a set of groups, without repeats: the angled
   drawing also explains the straight one. */
function diagramKindsToOffer(kinds){
  const set = new Set(kinds.filter(Boolean));
  if(set.has('gh-angled')) set.delete('gh');
  if(set.has('collar-angled')) set.delete('collar');
  return [...set];
}
