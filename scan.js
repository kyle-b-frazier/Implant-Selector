/* =========================================================================
   SCAN A BOX — reads the barcode on a part's label with the camera and
   finds the part in the catalog.

   What a label's barcode holds varies by maker:
     - GS1 (DataMatrix or GS1-128): a GTIN, lot, expiry and sometimes the
       REF itself in AI (240). The GTIN alone isn't a REF, so it is looked
       up in the FDA's device database (AccessGUDID), which lists each
       GTIN's catalog number, or in the GTINs this device has learned:
       when a GTIN can't be matched, the person types the REF from the
       label once and it is remembered for that barcode.
     - HIBC: the product code is the REF.
     - A plain barcode of the REF.

   The decoding itself is the browser's BarcodeDetector where there is one
   (Chrome on Android), otherwise ZXing compiled to WebAssembly
   (vendor/zxing-wasm-3.1.5, loaded the first time the scanner opens; iPhone
   Safari has no BarcodeDetector).

   The parsing and matching functions are pure (no page access) so
   test/catalog.test.js can run them; the scanner UI below them only runs
   when the person taps Scan.
   ========================================================================= */

/* A REF reduced to what survives on a label or in a barcode: capitals and
   digits only, without a leading "REF". "024.4100S" → "0244100S". */
function normRef(s){
  return String(s || '').toUpperCase().replace(/^\s*REF\s*/, '').replace(/[^A-Z0-9]/g, '');
}

/* Every REF in the catalog under its normalized form:
   normRef → [{sid, ref, name, group, category}], every system that sells it. */
let scanRefIndexCache = null;
function scanRefIndex(){
  if(scanRefIndexCache) return scanRefIndexCache;
  const index = new Map();
  SYSTEM_IDS.forEach(sid=>{
    const sys = SYSTEMS[sid];
    sys.order.forEach(category=>{
      (sys.catalog[category] || []).forEach(group=>{
        // All-on-X Components repeats groups from their home tabs; list
        // each part under its home category.
        if(group.sourceCategory) return;
        group.items.forEach(([name, ref])=>{
          const k = normRef(ref);
          if(!index.has(k)) index.set(k, []);
          const list = index.get(k);
          if(!list.some(m=>m.sid===sid && m.ref===ref)) list.push({ sid, ref, name, group: group.label, category });
        });
      });
    });
  });
  return scanRefIndexCache = index;
}

/* GS1 application identifiers found on medical device labels: [AI, fixed
   length or null for variable]. Variable-length fields end at a group
   separator (or the next "(" in the printed form). */
const GS1_AIS = [
  ['00',18],['01',14],['02',14],['10',null],['11',6],['13',6],['15',6],['16',6],['17',6],
  ['20',2],['21',null],['22',null],['30',null],['37',null],['240',null],['241',null],
  ['250',null],['251',null],['422',3],['7003',10],['8020',null]
];
/* {gtin, lot, expiry, serial, ref} from a GS1 barcode's text, either the
   printed form "(01)07630031740526(17)280331(10)ABC" or the raw form
   (optionally "]d2"/"]C1"/"]Q3"-prefixed, fields split by GS, \x1d).
   null if the text isn't GS1. */
function parseGs1(text){
  let t = String(text || '');
  const fields = {};
  if(/^\(\d{2,4}\)/.test(t)){
    const re = /\((\d{2,4})\)([^(]*)/g;
    let m;
    while((m = re.exec(t))) fields[m[1]] = m[2];
  } else {
    t = t.replace(/^\][A-Za-z]\d/, '');
    if(!/^(01|02)\d{14}/.test(t)) return null;
    let i = 0;
    while(i < t.length){
      if(t[i]==='\x1d'){ i++; continue; }
      const ai = GS1_AIS.find(([a])=>t.startsWith(a, i));
      if(!ai) break;
      i += ai[0].length;
      let value;
      if(ai[1]){ value = t.slice(i, i+ai[1]); i += ai[1]; }
      else {
        const end = t.indexOf('\x1d', i);
        value = t.slice(i, end<0 ? t.length : end);
        i = end<0 ? t.length : end+1;
      }
      fields[ai[0]] = value;
    }
  }
  const gtin = fields['01'] || fields['02'];
  if(!gtin || !/^\d{14}$/.test(gtin)) return null;
  const exp = fields['17'];
  return {
    gtin,
    lot: fields['10'] || '',
    serial: fields['21'] || '',
    ref: fields['240'] || '',
    // YYMMDD; a DD of 00 means the end of that month.
    expiry: exp && /^\d{6}$/.test(exp) ? `20${exp.slice(0,2)}-${exp.slice(2,4)}${exp.slice(4)==='00' ? '' : '-'+exp.slice(4)}` : ''
  };
}

/* {lic, pcn} from an HIBC primary barcode: "+" then a 4-character
   labeler code, the product code, a unit-of-measure digit and a check
   character ("+H123ABC1231C" → pcn "ABC123"). null if not HIBC. */
function parseHibc(text){
  const t = String(text || '').trim().replace(/^\*|\*$/g, '');
  if(!/^\+[A-Z]/.test(t) || t.startsWith('+$')) return null;
  const combined = t.includes('/');
  const primary = t.slice(1).split('/')[0];
  if(primary.length < (combined ? 6 : 7)) return null;
  // Alone, the primary ends in a unit-of-measure digit and a check
  // character; in a combined code the check character comes at the very
  // end, after the secondary data.
  return { lic: primary.slice(0,4), pcn: primary.slice(4, combined ? -1 : -2) };
}

/* What one barcode tells us: the GS1 data if any, and the strings worth
   trying as a REF, most specific first. */
function readLabelCode(text){
  const raw = String(text || '').trim();
  const gs1 = parseGs1(raw);
  const hibc = gs1 ? null : parseHibc(raw);
  const tries = [];
  if(gs1 && gs1.ref) tries.push(gs1.ref);
  if(hibc) tries.push(hibc.pcn);
  if(!gs1){
    tries.push(raw);
    raw.split(/[\s,;]+/).forEach(w=>{ if(w && w!==raw) tries.push(w); });
  }
  return { raw, gs1, hibc, tries: tries.filter(s=>normRef(s).length >= 4) };
}

/* The catalog parts a REF-like string names, or []. */
function partsForRef(s){
  return scanRefIndex().get(normRef(s)) || [];
}

/* GTINs this device has learned, GTIN → REF. */
const SCAN_GTIN_KEY = 'scanGtinRefs';
function scanLoadGtins(){
  try{ const m = JSON.parse(localStorage.getItem(SCAN_GTIN_KEY)); return m && typeof m==='object' ? m : {}; }catch(e){ return {}; }
}
function scanLearnGtin(gtin, ref){
  const m = scanLoadGtins();
  m[gtin] = ref;
  try{ localStorage.setItem(SCAN_GTIN_KEY, JSON.stringify(m)); }catch(e){}
}

/* Asks AccessGUDID (the FDA's UDI database) for a GTIN's catalog and
   model numbers. Needs a connection; resolves to [] on any failure. */
async function gudidRefsFor(gtin){
  try{
    const ctl = typeof AbortController!=='undefined' ? new AbortController() : null;
    const timer = ctl && setTimeout(()=>ctl.abort(), 7000);
    const res = await fetch(`https://accessgudid.nlm.nih.gov/api/v3/devices/lookup.json?di=${encodeURIComponent(gtin)}`, ctl ? {signal:ctl.signal} : {});
    if(timer) clearTimeout(timer);
    if(!res.ok) return [];
    const d = ((await res.json()).gudid || {}).device || {};
    return [d.catalogNumber, d.versionModelNumber].filter(Boolean);
  }catch(e){ return []; }
}

/* Finds the part one decoded barcode names: {parts, code, via} where via
   says how ('label', 'learned', 'gudid'), or {parts:[], code} if nothing
   matched. */
async function lookUpLabelCode(text){
  const code = readLabelCode(text);
  for(const s of code.tries){
    const parts = partsForRef(s);
    if(parts.length) return { parts, code, via:'label' };
  }
  if(code.gs1){
    const learned = scanLoadGtins()[code.gs1.gtin];
    if(learned && partsForRef(learned).length) return { parts: partsForRef(learned), code, via:'learned' };
    for(const s of await gudidRefsFor(code.gs1.gtin)){
      const parts = partsForRef(s);
      if(parts.length){ scanLearnGtin(code.gs1.gtin, parts[0].ref); return { parts, code, via:'gudid' }; }
    }
  }
  return { parts: [], code };
}

/* ---------- Scanner screen ---------- */

const SCAN_FORMATS_NATIVE = ['data_matrix','code_128','qr_code','code_39','pdf417'];
const SCAN_FORMATS_ZXING = ['DataMatrix','Code128','QRCode','Code39','PDF417','DataBar','DataBarExp'];
let scanZxingReady = null;
/* Loads the ZXing reader once; resolves to its readBarcodes. */
function scanLoadZxing(){
  if(!scanZxingReady) scanZxingReady = new Promise((resolve, reject)=>{
    const s = document.createElement('script');
    s.src = 'vendor/zxing-wasm-3.1.5/zxing-reader.js';
    s.onload = ()=>{
      ZXingWASM.prepareZXingModule({
        overrides: { locateFile: (path, prefix)=> path.endsWith('.wasm') ? 'vendor/zxing-wasm-3.1.5/' + path : prefix + path },
        fireImmediately: true
      });
      resolve(ZXingWASM.readBarcodes);
    };
    s.onerror = ()=>{ scanZxingReady = null; reject(new Error('Could not load the barcode reader')); };
    document.head.appendChild(s);
  });
  return scanZxingReady;
}

/* Returns a function that reads the barcodes in the video's current frame
   (resolving to their texts), using whichever decoder this browser has. */
async function scanMakeReader(video){
  if('BarcodeDetector' in window){
    try{
      const supported = await BarcodeDetector.getSupportedFormats();
      const formats = SCAN_FORMATS_NATIVE.filter(f=>supported.includes(f));
      if(formats.includes('data_matrix')){
        const det = new BarcodeDetector({ formats });
        return async ()=> (await det.detect(video)).map(b=>b.rawValue);
      }
    }catch(e){ /* fall through to ZXing */ }
  }
  const readBarcodes = await scanLoadZxing();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  return async ()=>{
    const w = video.videoWidth, h = video.videoHeight;
    if(!w || !h) return [];
    canvas.width = w; canvas.height = h;
    ctx.drawImage(video, 0, 0, w, h);
    const found = await readBarcodes(ctx.getImageData(0, 0, w, h), { formats: SCAN_FORMATS_ZXING, tryHarder: true, maxNumberOfSymbols: 4 });
    return found.filter(r=>r.isValid).map(r=>r.text);
  };
}

let scanSession = null;
function closeScanner(){
  if(!scanSession) return;
  const s = scanSession;
  scanSession = null;
  s.stopped = true;
  if(s.stream) s.stream.getTracks().forEach(t=>t.stop());
  document.removeEventListener('keydown', s.onKey, true);
  s.overlay.remove();
  if(s.opener && s.opener.focus && document.contains(s.opener)) s.opener.focus();
}

/* Opens the camera and keeps reading until a barcode names a part, or the
   person types a code, or closes the scanner. */
async function openScanner(){
  if(scanSession) return;
  const overlay = document.createElement('div');
  overlay.className = 'scan-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'scanTitle');
  overlay.innerHTML = `
    <div class="scan-box">
      <div class="scan-head"><h3 id="scanTitle">Scan a box</h3><button type="button" class="scan-close" aria-label="Close scanner">✕</button></div>
      <div class="scan-view"><video playsinline muted autoplay aria-hidden="true"></video><div class="scan-frame" aria-hidden="true"></div></div>
      <p class="scan-status" role="status" aria-live="polite">Starting the camera…</p>
      <form class="scan-manual">
        <label for="scanManual">Or type the REF or barcode text</label>
        <div class="scan-manual-row"><input id="scanManual" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="search" placeholder="e.g. 021.4308 or 36117"><button type="submit">Find</button></div>
      </form>
    </div>`;
  document.body.appendChild(overlay);
  const s = scanSession = { overlay, opener: document.activeElement, stream: null, stopped: false, busy: false, seen: new Set() };
  const video = overlay.querySelector('video');
  const status = overlay.querySelector('.scan-status');
  const setStatus = msg => { status.textContent = msg; };
  overlay.querySelector('.scan-close').onclick = closeScanner;
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeScanner(); });
  s.onKey = e=>{ if(e.key==='Escape'){ e.preventDefault(); closeScanner(); } };
  document.addEventListener('keydown', s.onKey, true);
  overlay.querySelector('.scan-manual').onsubmit = e=>{
    e.preventDefault();
    const v = overlay.querySelector('#scanManual').value.trim();
    if(v) scanHandle(v, setStatus, true);
  };

  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    overlay.querySelector('.scan-view').hidden = true;
    setStatus('This browser can\'t use the camera here. Type the code from the label instead.');
    overlay.querySelector('#scanManual').focus();
    return;
  }
  try{
    s.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
  }catch(e){
    if(s.stopped) return;
    overlay.querySelector('.scan-view').hidden = true;
    setStatus('No camera access. Allow the camera for this site in your browser settings, or type the code from the label.');
    overlay.querySelector('#scanManual').focus();
    return;
  }
  if(s.stopped){ s.stream.getTracks().forEach(t=>t.stop()); return; }
  video.srcObject = s.stream;
  try{ await video.play(); }catch(e){}
  let read;
  try{ read = await scanMakeReader(video); }
  catch(e){ setStatus('The barcode reader didn\'t load (it needs a connection the first time). Type the code from the label instead.'); return; }
  setStatus('Hold the label\'s barcode inside the frame.');
  const tick = async ()=>{
    if(s.stopped) return;
    if(!s.busy){
      s.busy = true;
      try{
        for(const text of await read()){
          if(s.stopped || s.seen.has(text)) continue;
          s.seen.add(text);
          if(await scanHandle(text, setStatus, false)) break;
        }
      }catch(e){ /* a frame that fails to decode; try the next one */ }
      s.busy = false;
    }
    setTimeout(tick, 250);
  };
  tick();
}

/* Looks up one decoded or typed code. Returns true once it's dealt with
   (the scanner closes); false means keep scanning. A typed code that
   matches nothing gets searched for as text. */
async function scanHandle(text, setStatus, typed){
  setStatus('Looking it up…');
  const found = await lookUpLabelCode(text);
  if(!scanSession) return true;
  if(found.parts.length){
    closeScanner();
    scanShowPart(found);
    return true;
  }
  const gs1 = found.code.gs1;
  if(gs1){
    // A GS1 code we can't place yet: ask for the REF once and remember it.
    closeScanner();
    const ref = await showModal({
      type:'prompt', inputType:'text', title:'Which part is this?',
      message:`This barcode (GTIN ${gs1.gtin}) isn't one the app knows yet. Type the REF printed on the label and it will be recognized next time.`,
      okText:'Find', placeholder:'REF from the label'
    });
    if(!ref || !ref.trim()) return true;
    const parts = partsForRef(ref);
    if(parts.length){
      scanLearnGtin(gs1.gtin, parts[0].ref);
      scanShowPart({ parts, code: found.code, via:'learned' });
    } else scanSearchText(ref.trim());
    return true;
  }
  if(typed){ closeScanner(); scanSearchText(text); return true; }
  setStatus(`Read "${text.slice(0,40)}", but it isn't a REF in the catalog. Try the other barcode on the label, or type the REF.`);
  return false;
}

/* Shows what was scanned, with Add to order and Show in catalog. Parts
   sold for several systems open under the one in view, if it's one. */
async function scanShowPart({ parts, code }){
  const p = parts.find(x=>x.sid===activeSystemId) || parts[0];
  const systems = parts.map(x=>SYSTEMS[x.sid].name).join(', ');
  const gs1 = code.gs1;
  const extra = gs1 ? [gs1.lot && `Lot ${gs1.lot}`, gs1.expiry && `Expires ${gs1.expiry}`].filter(Boolean).join(' · ') : '';
  const inOrder = !!selected[p.sid+'::'+p.ref];
  const choice = await showModal({
    type:'select', title:'Found it',
    message:`${p.name}\n${p.group}\nREF ${p.ref}\n${systems}${extra ? '\n\n'+extra : ''}${inOrder ? '\n\nAlready in your order.' : ''}`,
    options: [
      ...(inOrder ? [] : [{ value:'add', label:'Add to order' }]),
      { value:'show', label:'Show in catalog' }
    ],
    cancelText:'Close'
  });
  if(choice==='show' || (choice==='add' && viewMode==='home')) scanSearchText(p.ref);
  if(choice==='add') toggleItem(p.sid, p.ref, p.name, p.group, p.category);
}

/* The catalog's search results for a REF or text. */
function scanSearchText(q){
  navigateWithFade(()=>{
    viewMode = 'category';
    document.getElementById('searchBox').value = q;
    render();
    window.scrollTo(0,0);
  });
}
