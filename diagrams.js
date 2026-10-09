/* Explanatory cross-section drawings for the size terms the catalogs use
   (GH, AH, H, diameter and length). Generic line drawings, not any
   manufacturer's product image. diagramKindFor() picks the drawing that
   explains a group's sizes from how its item names are written;
   diagramHtml() returns the drawing and its caption. Shown behind a small
   "ⓘ" button in the catalog and in the case builder. */

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

const DIAGRAM_CAPTIONS = {
  ghah: '<b>GH (gingival height)</b> is the part that passes through the gum, from the implant platform up to the gum line. <b>AH (abutment height)</b> is the part above that. The number in brackets is the total height, GH + AH.',
  'gh-h': '<b>GH (gingival height)</b> is the part that passes through the gum, from the implant platform up to the gum line. <b>H</b> is the total height, also measured from the implant platform.',
  h: '<b>H</b> is the height of the healing abutment, measured from the implant platform.',
  gh: '<b>GH (gingival height)</b> is the height of the collar that passes through the gum, measured from the implant platform.',
  'gh-angled': '<b>GH (gingival height)</b> is the height of the collar that passes through the gum, measured from the implant platform. Angled versions tilt the top to make up for an implant placed at an angle.',
  collar: '<b>H</b> is the collar height: the part that passes through the gum, measured from the implant platform. Nobel Biocare lists it as H.',
  'collar-angled': '<b>H</b> is the collar height: the part that passes through the gum, measured from the implant platform. Nobel Biocare lists it as H. Angled versions tilt the top to make up for an implant placed at an angle.',
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
function dgSvg(body, label){
  return `<svg class="dg-svg" viewBox="0 0 360 236" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">${body}</svg>`;
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
  collar:'Collar height (H)', 'collar-angled':'Collar height (H) and angle', implant:'Diameter, length and platform'
};

/* The drawings to offer for a set of groups, without repeats: the angled
   drawing also explains the straight one. */
function diagramKindsToOffer(kinds){
  const set = new Set(kinds.filter(Boolean));
  if(set.has('gh-angled')) set.delete('gh');
  if(set.has('collar-angled')) set.delete('collar');
  return [...set];
}
