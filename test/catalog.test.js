// Checks the catalog data and the implant-to-part compatibility rules.
// Run with `npm test` (or `node --test`) — Node 18+, no dependencies.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Load the browser scripts into one shared global scope, exactly as
// index.html's <script src> tags do, in the same order.
const root = path.join(__dirname, '..');
const scripts = [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const ctx = vm.createContext({});
for (const file of scripts) {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(src, ctx, { filename: file });
}
const $ = (name) => vm.runInContext(name, ctx);
const SYSTEMS = $('SYSTEMS');
const SYSTEM_IDS = $('SYSTEM_IDS');
const IMPLANTS_CATEGORY = $('WIZARD_IMPLANTS_CATEGORY_NAME');

function find(sid, category, ref) {
  for (const group of SYSTEMS[sid].catalog[category] || []) {
    const item = group.items.find(([, r]) => r === ref);
    if (item) return { group, name: item[0] };
  }
  throw new Error(`${sid}: REF ${ref} is not in "${category}"`);
}
function implant(sid, ref) {
  const category = IMPLANTS_CATEGORY[sid];
  const { group, name } = find(sid, category, ref);
  return $('implantProfileFor')(sid, category, group.label, name);
}
function fits(sid, category, ref, profile) {
  const { group, name } = find(sid, category, ref);
  return $('partFits')(sid, category, group, name, profile);
}
function has(sid, category, ref) {
  return (SYSTEMS[sid].catalog[category] || []).some((g) => g.items.some(([, r]) => r === ref));
}
function orderLine(sid, category, ref) {
  const { group, name } = find(sid, category, ref);
  return { name, group: group.label, category, qty: 1, system: sid, ref };
}

/* ---------- Catalog data ---------- */

test('each system lists exactly its catalog categories', () => {
  for (const sid of SYSTEM_IDS) {
    const sys = SYSTEMS[sid];
    assert.deepEqual([...sys.order].sort(), Object.keys(sys.catalog).sort(), sid);
    for (const cat of sys.surgical) assert.ok(sys.order.includes(cat), `${sid}: ${cat}`);
  }
});

test('every item has a name and a REF, and no group lists a REF twice', () => {
  for (const sid of SYSTEM_IDS) {
    for (const [cat, groups] of Object.entries(SYSTEMS[sid].catalog)) {
      for (const group of groups) {
        assert.ok(group.label && group.items.length, `${sid} > ${cat}: empty group`);
        const refs = group.items.map(([name, ref]) => {
          assert.ok(typeof name === 'string' && name.trim(), `${sid} > ${group.label}: blank name`);
          assert.ok(typeof ref === 'string' && ref.trim() === ref && ref, `${sid} > ${group.label}: bad REF "${ref}"`);
          return ref;
        });
        assert.equal(new Set(refs).size, refs.length, `${sid} > ${group.label}: duplicate REF`);
      }
    }
  }
});

test('a REF names the same part everywhere within a system', () => {
  for (const sid of SYSTEM_IDS) {
    const nameByRef = new Map();
    for (const groups of Object.values(SYSTEMS[sid].catalog)) {
      for (const group of groups) {
        for (const [name, ref] of group.items) {
          if (nameByRef.has(ref)) assert.equal(name, nameByRef.get(ref), `${sid}: REF ${ref}`);
          else nameByRef.set(ref, name);
        }
      }
    }
  }
});

test('every implant resolves to one platform, and zygoma implants to one surface', () => {
  for (const sid of SYSTEM_IDS) {
    for (const group of SYSTEMS[sid].catalog[IMPLANTS_CATEGORY[sid]]) {
      for (const [name, ref] of group.items) {
        const p = implant(sid, ref);
        if (sid !== 'gm') assert.equal(p.platforms.size, 1, `${sid}: ${group.label} ${name}`);
        if (sid === 'nzcc' || sid === 'nzeh') assert.equal(p.generations.size, 1, `${sid}: ${group.label}`);
        if (sid === 'gm') assert.equal(p.diameters.size, 1, `gm: ${group.label}`);
      }
    }
  }
});

test('wizard steps and multi-unit cap/coping links point at real catalog groups', () => {
  const applyFilters = $('applyOptionLabelFilters');
  for (const [sid, steps] of Object.entries($('WIZARD_CONFIG'))) {
    for (const step of steps) {
      for (const option of step.options) {
        const groups = SYSTEMS[sid].catalog[option.category];
        assert.ok(groups, `${sid} > ${step.label}: no category "${option.category}"`);
        assert.ok(applyFilters(groups, option).length, `${sid} > ${step.label} > ${option.label}: filters match nothing`);
      }
    }
  }
  const links = [
    ...Object.entries($('MULTI_UNIT_CAP_TRIGGER')).map(([sid, c]) => [sid, c.category, c.capGroupLabel, c.capNameFilter]),
    ...Object.entries($('MULTI_UNIT_TEMP_COPING_CONFIG')).map(([sid, c]) => [sid, c.category, c.groupLabel, c.nameFilter]),
  ];
  for (const [sid, category, groupLabel, nameFilter] of links) {
    const group = (SYSTEMS[sid].catalog[category] || []).find((g) => g.label === groupLabel);
    assert.ok(group, `${sid}: no group "${groupLabel}" in "${category}"`);
    assert.ok(group.items.some(([name]) => !nameFilter || name.includes(nameFilter)), `${sid}: "${nameFilter}" matches nothing`);
  }
});

test('every group cites its catalog page, or says what is unverified', () => {
  const names = Object.keys($('CATALOG_SOURCES'));
  const cite = new RegExp(`^(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')).join('|')}) (p\\.\\d+|pp\\.\\d+(–\\d+)?(, \\d+(–\\d+)?)*)$`);
  const unverified = new Set();
  const check = (where, group) => {
    assert.ok(group.source || group.unverified, `${where}: "${group.label}" has no source`);
    if (group.source) {
      for (const part of group.source.split('; ')) assert.match(part, cite, `${where}: "${group.label}"`);
    }
    if (group.unverified) unverified.add(group.label);
  };
  for (const sid of SYSTEM_IDS) {
    for (const [cat, groups] of Object.entries(SYSTEMS[sid].catalog)) {
      for (const group of groups) check(`${sid} > ${cat}`, group);
    }
  }
  // Every one of these is on FOLLOW-UP.md. Settle it there before removing it here.
  assert.deepEqual([...unverified].sort(), [
    'DirectFit™ Screw',
    'For Multi-unit Abutment restorations',
    'Guided Implant Mount — CC S (NobelParallel S / NobelReplace S)',
    'Guided Implant Mount — NobelActive S',
    'Guided Template Abutment w/Screw — CC S',
    'Healing Abutment — for TiUnite® 45°/60° multi-unit abutments',
    'NP (6mm)',
    'Replacement Coping Screw, Neotorque® — GM Abutment',
    'TiUltra® Twist & Pilot Drills',
  ]);
});

/* ---------- Implant-to-part pairing ---------- */

test('Straumann BLC/BLX: RB and WB parts only fit their own base', () => {
  const rb = implant('blc', '035.9010S'); // Ø3.3 RB
  const wb = implant('blc', '035.9510S'); // Ø5.0 WB
  assert.ok(fits('blc', 'Closure Caps', '064.4100S', rb));
  assert.ok(!fits('blc', 'Closure Caps', '064.8102S', rb));
  assert.ok(fits('blc', 'Closure Caps', '064.8102S', wb));
  assert.ok(fits('blc', 'Healing Abutments — Crown', '064.4202S', rb)); // RB/WB fits both
  assert.ok(fits('blc', 'Healing Abutments — Crown', '064.4202S', wb));
  assert.ok(!fits('blc', 'Healing Abutments — Crown', '064.8511S', rb)); // WB-only ∅7
  // XL Ø5.5/Ø6.5 are WB only (Straumann AHA XC technical information; FDA recall Z-1671-2025).
  assert.ok(!fits('blc', 'Anatomic Healing Abutments XC', '064.4522S', rb));
  assert.ok(fits('blc', 'Anatomic Healing Abutments XC', '064.4522S', wb));
  assert.ok(!fits('blc', 'Anatomic Healing Abutments XC', '064.8482S', rb));
  assert.ok(fits('blc', 'Anatomic Healing Abutments XC', '064.4482S', rb)); // XL Ø4.5 stays RB/WB
  assert.ok(fits('blx', 'Closure Caps', '064.4100S', implant('blx', '061.3310'))); // BLX Ø3.5 RB
});

test('Straumann BLT: SC, NC and RC parts stay on their own connection', () => {
  const sc = implant('blt', '021.0010');
  const nc = implant('blt', '021.3310');
  const rc = implant('blt', '021.5310');
  assert.ok(!fits('blt', 'Replacement Screws', '025.2900', sc)); // NC basal screw
  assert.ok(fits('blt', 'Replacement Screws', '025.2900', nc));
  assert.ok(fits('blt', 'Replacement Screws', '025.2926', rc)); // NC/RC shared
  assert.ok(!fits('blt', 'Replacement Screws', '025.2926', sc));
  assert.ok(fits('blt', 'Replacement Screws', '025.0031', sc)); // SC basal screw
});

test('Nobel conical connection: implants map to the right platform', () => {
  const platform = (sid, ref) => [...implant(sid, ref).platforms][0];
  assert.equal(platform('nact', '36769'), '3.0'); // NobelActive Ø3.0
  assert.equal(platform('nact', '34125'), 'NP'); // Ø3.5
  assert.equal(platform('nact', '34131'), 'RP'); // Ø4.3
  assert.equal(platform('nact', '34137'), 'RP'); // Ø5.0 is RP, not WP
  assert.equal(platform('nact', '37808'), 'WP'); // Ø5.5
  assert.equal(platform('npcc', '37965'), 'NP'); // NobelParallel CC Ø3.75
  assert.equal(platform('nrcc', '36705'), 'RP'); // NobelReplace CC RP Ø4.3
});

test('Nobel conical connection: parts are offered only for the implant platform', () => {
  const np = implant('nact', '34125');
  assert.ok(fits('nact', 'Cover Screws', '36649', np));
  assert.ok(!fits('nact', 'Cover Screws', '36650', np));
  assert.ok(!fits('nact', 'Healing Abutments — Crown', '36643', np)); // RP healing abutment
  // Nothing in the multi-unit line fits a 3.0 implant: the wizard must say so, not offer other platforms.
  const muStep = $('WIZARD_CONFIG').nact.find((s) => s.label === 'Multi-unit Abutment');
  assert.equal($('wizardCandidateGroups')('nact', muStep.options[0].category, implant('nact', '36769'), muStep.options[0]).length, 0);
});

test('NobelZygoma: TiUltra and TiUnite implants each get their own abutment line', () => {
  const tiUltra = implant('nzcc', '301541');
  const tiUnite = implant('nzcc', '38275');
  assert.ok(fits('nzcc', 'Multi-unit Abutments', '301575', tiUltra)); // Xeal 45°
  assert.ok(!fits('nzcc', 'Multi-unit Abutments', '37624', tiUltra)); // ext hex 45°
  assert.ok(fits('nzcc', 'Multi-unit Abutments', '37624', tiUnite));
  assert.ok(!fits('nzcc', 'Multi-unit Abutments', '301575', tiUnite));
});

test('NobelZygoma: standard multi-unit healing caps and temporary coping fit both surfaces', () => {
  for (const sid of ['nzcc', 'nzeh']) {
    const profiles = sid === 'nzcc' ? [implant(sid, '301541'), implant(sid, '38275')] : [implant(sid, '301554'), implant(sid, '38283')];
    for (const p of profiles) {
      for (const ref of ['300162', '300163', '300164', '300165', '300166', '300167', '29046']) assert.ok(fits(sid, 'Multi-unit Abutments', ref, p), `${sid} ${ref}`);
    }
    assert.ok(!has(sid, 'Multi-unit Abutments', '38915'), `${sid}: snap coping is Xeal CC/TCC only`);
    const cfg = $('MULTI_UNIT_TEMP_COPING_CONFIG')[sid];
    const group = SYSTEMS[sid].catalog[cfg.category].find((g) => g.label === cfg.groupLabel);
    assert.deepEqual(Array.from(group.items.filter(([name]) => name.includes(cfg.nameFilter)), ([, ref]) => ref), ['29046']);
    assert.ok($('MULTI_UNIT_CAP_TRIGGER')[sid], sid);
    assert.ok(has(sid, 'All-on-X Components', '300162'), sid);
  }
});

test('Neodent GM: implant analogs match the implant diameter', () => {
  // Numbering per the Neodent 2026 catalog (the 2018 edition swaps 101.089/101.103 — see FOLLOW-UP.md).
  const analogs = 'Impression Components & Analogs';
  assert.ok(fits('gm', analogs, '101.103', implant('gm', '140.943'))); // Ø3.5 -> Ø3.5/3.75 analog
  assert.ok(!fits('gm', analogs, '101.089', implant('gm', '140.943'))); // Ø4.0/4.3 analog
  assert.ok(fits('gm', analogs, '101.089', implant('gm', '140.948'))); // Ø4.3
  assert.ok(fits('gm', analogs, '101.090', implant('gm', '140.1009'))); // Ø6.0 -> Ø5.0/6.0
  assert.ok(!fits('gm', analogs, '101.090', implant('gm', '140.943')));
  assert.ok(!fits('gm', analogs, '101.090', implant('gm', '140.1059'))); // no listed analog for Ø7.0
});

test('the Multi-unit Abutment step offers only abutments', () => {
  const notAnAbutment = /\bcaps?\b|coping|analog|\bscrews?\b(?!-)|impression|healing|polish|guide|\bplan\b|\bpins?\b|\baids?\b|accessor/i;
  for (const [sid, steps] of Object.entries($('WIZARD_CONFIG'))) {
    const step = steps.find((s) => s.label === 'Multi-unit Abutment');
    if (!step) continue;
    const opt = step.options[0];
    const groups = $('applyOptionLabelFilters')(SYSTEMS[sid].catalog[opt.category], opt);
    assert.ok(groups.length, sid);
    for (const g of groups) assert.doesNotMatch(g.label, notAnAbutment, `${sid}: ${g.label}`);
  }
});

test('multi-unit temporary copings: Nobel MUA Plus never gets the Xeal-only snap coping', () => {
  const cfg = $('MULTI_UNIT_TEMP_COPING_CONFIG').nact;
  const group = SYSTEMS.nact.catalog[cfg.category].find((g) => g.label === cfg.groupLabel);
  const offered = Array.from(group.items.filter(([name]) => name.includes(cfg.nameFilter)), ([, ref]) => ref);
  assert.deepEqual(offered, ['29046']);
});

// Article numbers corrected against the uploaded manufacturer catalogs
// (Nobel Biocare 2024/2025, Straumann iEXCEL 2026, Neodent GM 2018).
test('catalog-verified article numbers', () => {
  const expected = [
    ['nact', 'Surgical Instruments', '87294', 'NobelActive® PureSet'],
    ['npcc', 'Surgical Instruments', '87295', 'NobelParallel® CC PureSet'],
    ['nrcc', 'Surgical Instruments', '87296', 'NobelReplace® CC PureSet'],
    ['nact', 'Surgical Instruments', '31278', 'Ø1.5mm, 7–15mm'],
    ['nact', 'Surgical Instruments', '37875', 'Ø4.2/5.0mm, 7–10mm'],
    ['nact', 'Surgical Instruments', '37876', 'Ø4.2/5.0mm, 7–15mm'],
    ['npcc', 'Surgical Instruments', '37991', 'Ø3.75mm, 7–18mm'],
    ['npcc', 'Surgical Instruments', '37996', 'Ø5.5mm, 7–10mm'],
    ['nact', 'Clinical & Laboratory Screws', '37894', 'Laboratory Screw, NP'],
    ['nact', 'Clinical & Laboratory Screws', '37895', 'Laboratory Screw, RP/WP (5/pkg)'],
    ['nact', 'Clinical & Laboratory Screws', '37367', 'Omnigrip Clinical Screw, NP'],
    ['nact', 'Locator R-Tx® Abutments', 'REF30015-01', 'Ø4.0mm (4/pkg)'],
    ['nact', 'Locator R-Tx® Abutments', 'REF08530-20', 'Ø4.0mm (20/pkg)'],
    ['blc', 'Novaloc® Abutments', '2010.703-NOV', 'Matrix Housing, Extended (4 pcs)'],
    ['gm', 'Impression Components & Analogs', '101.103', 'Ø3.5/3.75mm'], // Neodent 2026 p.23
    ['gm', 'Impression Components & Analogs', '101.089', 'Ø4.0/4.3mm'],
    ['gm', 'Impression Components & Analogs', '101.090', 'Ø5.0/6.0mm'],
    ['gm', 'Impression Components & Analogs', '108.161', 'Closed Tray, Long'],
    ['gm', 'Impression Components & Analogs', '108.162', 'Open Tray, Regular'],
    ['gm', 'Surgical Instruments', '105.168', 'GM Implant Driver — Contra-angle'], // Neodent 2026 p.46
    ['gm', 'Surgical Instruments', '105.129', 'GM Implant Driver — Torque Wrench, Short (22mm)'],
    ['gm', 'Surgical Instruments', '105.130', 'GM Implant Driver — Torque Wrench, Long (30mm)'],
    ['gm', 'Surgical Instruments', '103.561', 'Tapered Drill Ø3.5mm'], // 103.513 is the pilot drill (p.44)
    ['gm', 'GM Healing Abutments', '106.228', 'Profile 2.5mm'], // Ø7.0 customizable starts at 2.5
    ['gm', 'GM Healing Abutments', '106.232', 'Profile 6.5mm'],
    ['gm', 'GM Mini Conical Abutments (Multi-unit)', '118.410', 'One Step Hybrid Coping, Long'],
    ['nact', 'Esthetic Abutments & Universal Base', '301101', 'NP, H1.5mm'], // US numbers
    ['nact', 'Esthetic Abutments & Universal Base', '301106', 'WP, H3.0mm'],
    ['blc', 'Healing Abutments — Crown', '064.8511S', 'GH 1.5 / AH 2mm (3.5mm)'],
    ['blc', 'Healing Abutments — Crown', '064.8514S', 'GH 2.5 / AH 4mm (6.5mm)'],
    ['blc', 'Healing Abutments — Crown', '064.8217S', 'GH 2.5 / AH 2mm (4.5mm)'], // iEXCEL 2026 p.27, WB ∅6.0
    ['blc', 'Healing Abutments — Crown', '064.8218S', 'GH 2.5 / AH 4mm (6.5mm)'],
    ['blt', 'Replacement Screws', '025.4900', 'For Anatomic/Variobase Crown'], // RC basal screw, Straumann 2022/2023 p.222
  ];
  for (const [sid, category, ref, name] of expected) {
    assert.ok(find(sid, category, ref).name.startsWith(name), `${sid} ${ref}: "${find(sid, category, ref).name}"`);
  }
  // Instruments for platforms a system doesn't have are not listed under it.
  for (const ref of ['36773', '36774', '37861', '37862', '31278']) assert.ok(!has('npcc', 'Surgical Instruments', ref), `npcc ${ref}`);
  for (const ref of ['36773', '36774', '37859', '37860', '37861', '37862', '37869', '37870']) assert.ok(!has('nrcc', 'Surgical Instruments', ref), `nrcc ${ref}`);
  // Lab screw 37894 is NP only.
  assert.ok(!fits('nact', 'Clinical & Laboratory Screws', '37894', implant('nact', '34131')));
});

test('torque and driver: catalog-format strings, only on sourced groups', () => {
  const value = '(?:Max )?\\d+(?:–\\d+)? Ncm|Hand-tight';
  const torqueFormat = new RegExp(`^(?:${value})(?: \\([^():]+: (?:${value})\\))?$`);
  let n = 0;
  for (const sid of SYSTEM_IDS) {
    for (const [cat, groups] of Object.entries(SYSTEMS[sid].catalog)) {
      for (const g of groups) {
        const where = `${sid} > ${cat} > ${g.label}`;
        if (g.torque !== undefined) assert.match(g.torque, torqueFormat, where);
        if (g.driver !== undefined) {
          assert.equal(typeof g.driver, 'string', where);
          assert.ok(g.driver.trim() === g.driver && g.driver.length > 0 && g.driver.length <= 50, `${where}: driver "${g.driver}"`);
        }
        if (g.torque || g.driver) { assert.ok(g.source, `${where}: torque/driver needs a catalog source`); n++; }
      }
    }
  }
  assert.ok(n > 0);
  const tq = (sid, category, ref) => { const { group } = find(sid, category, ref); return [group.torque, group.driver]; };
  assert.deepEqual(tq('nact', 'Multi-unit Abutments Plus', '38879'), ['35 Ncm', 'Multi-unit screwdriver']); // Nobel p.76
  assert.deepEqual(tq('nact', 'Multi-unit Abutments Plus', '38889'), ['15 Ncm', 'Unigrip screwdriver']); // 17°
  assert.deepEqual(tq('nact', 'Esthetic Abutments & Universal Base', '36665'), ['35 Ncm (3.0: 15 Ncm)', 'Unigrip screwdriver']);
  assert.deepEqual(tq('nzeh', 'Multi-unit Abutments', '301567'), ['35 Ncm', 'Multi-unit screwdriver']); // zygoma p.122
  assert.deepEqual(tq('gm', 'GM Mini Conical Abutments (Multi-unit)', '115.243'), ['32 Ncm', 'Hexagonal Prosthetic Driver + torque wrench']); // Neodent p.19
  assert.deepEqual(tq('gm', 'GM Healing Abutments', '106.207'), ['Max 10 Ncm', 'Neo Manual Screwdriver']);
  assert.deepEqual(tq('blc', 'Replacement Screws', '065.0037'), [undefined, 'AS screwdriver']);
  // Neither Straumann catalog states a tightening torque.
  for (const sid of ['blc', 'blt']) {
    for (const groups of Object.values(SYSTEMS[sid].catalog)) for (const g of groups) assert.equal(g.torque, undefined, `${sid}: ${g.label}`);
  }
});

test('order output catalog pages: each line gets its group\'s page, or the unverified note', () => {
  const src = (sid, category, ref) => JSON.parse(JSON.stringify($('catalogSourceFor')(orderLine(sid, category, ref))));
  assert.deepEqual(src('blc', 'Implants', '035.9010S'), { source: 'Straumann iEXCEL 2026 p.5' });
  assert.deepEqual(src('nact', 'Clinical & Laboratory Screws', '29285'), { source: 'Nobel 2024/2025 pp.79, 128' });
  assert.deepEqual(src('nact', 'Clinical & Laboratory Screws', '38420'), { unverified: '38420 is not in Nobel 2024/2025' });
  assert.ok(src('nzcc', 'Surgical Instruments & Sets', '301606').unverified);
  assert.deepEqual(src('nzcc', 'Surgical Instruments & Sets', '301602'), { source: 'Nobel 2024/2025 p.46' });
  assert.ok(src('gm', 'Replacement Screws', '116.303').unverified);
  // A line added from the All-on-X tab finds its group's page too.
  const allOnX = SYSTEMS.blc.catalog['All-on-X Components'][0];
  const line = { system: 'blc', category: 'All-on-X Components', group: allOnX.label, name: allOnX.items[0][0], ref: allOnX.items[0][1] };
  assert.equal($('catalogSourceFor')(line).source, allOnX.source);
});

test('the order check flags parts that fit none of the implants, and nothing else', () => {
  const order = {};
  for (const line of [
    orderLine('blc', 'Implants', '035.9010S'), // RB implant
    orderLine('blc', 'Healing Abutments — Crown', '064.4202S'), // RB/WB — fine
    orderLine('blc', 'Closure Caps', '064.8102S'), // WB — mismatch
    orderLine('nact', 'Implants', '34131'), // RP implant
    orderLine('nact', 'Cover Screws', '36650'), // RP — fine
  ]) order[`${line.system}::${line.ref}`] = line;
  const warnings = $('detectPlatformMismatches')(order);
  // Array.from: the sandbox's arrays have their own prototype, which deepEqual rejects.
  assert.deepEqual(Array.from(warnings, (w) => `${w.system} ${w.item.ref}`), ['blc 064.8102S']);
});

// Open questions (see FOLLOW-UP.md): the catalogs contradict these, so the
// app asks for confirmation before adding them until the reps confirm.
test('parts awaiting manufacturer confirmation carry a caution', () => {
  const awaiting = [
    ['blc', 'Implants', '035.9410S'], // BLC Ø4.5 platform
    ['blc', 'Implants', '035.8410S'],
    ['nact', 'Locator R-Tx® Abutments', 'REF30506-06'], // NP 6mm
    ['nzcc', 'Surgical Instruments & Sets', '301602'], // zygoma TiUltra drills
    ['nzeh', 'Surgical Instruments & Sets', '301606'],
    ['gm', 'Impression Components & Analogs', '101.103'], // analog numbering differs 2018 vs 2026
    ['gm', 'Replacement Screws', '116.267'], // Neotorque GM Abutment coping screw misprinted
  ];
  for (const [sid, category, ref] of awaiting) {
    const { group } = find(sid, category, ref);
    assert.ok(group.caution && group.caution.length > 40, `${sid} ${ref}: no caution`);
  }
  assert.ok(!find('nact', 'Locator R-Tx® Abutments', 'REF30506-05').group.caution); // only the 6mm one
  assert.ok(!find('gm', 'Surgical Instruments', '105.133').group.caution); // confirmed by the 2026 catalog
});

// ---------- Case builder (case-builder.js) ----------
const plain = (x) => JSON.parse(JSON.stringify(x));

test('case builder: every implant appears exactly once in its system\'s grid', () => {
  for (const sid of SYSTEM_IDS) {
    const grid = $('implantGrid')(sid);
    const groups = SYSTEMS[sid].catalog[grid.category];
    assert.equal(grid.rows.length, groups.length, sid);
    const cols = $('gridColumns')(grid.rows);
    const seen = new Set();
    for (const row of grid.rows) {
      assert.ok(grid.variants.includes(row.variant), `${sid}: ${row.group.label}`);
      for (const [name, ref] of row.group.items) {
        const key = $('lengthKey')(name);
        assert.ok(cols.includes(key), `${sid}: no column for "${name}"`);
        assert.equal(row.group.items.filter(([n]) => $('lengthKey')(n) === key).length, 1, `${sid}: two lengths share a cell in ${row.group.label}`);
        seen.add(ref);
      }
    }
    assert.equal(seen.size, groups.reduce((n, g) => n + g.items.length, 0), sid);
  }
  // Rows read as diameters, with the surface as the switch above the grid.
  const blc = plain($('implantGrid')('blc'));
  assert.deepEqual(blc.variants, ['SLActive®, Roxolid®', 'SLA®, Roxolid®']);
  assert.equal(blc.rows[3].label, 'Ø 4.5mm WB');
  assert.deepEqual(plain($('implantGrid')('nact')).rows.map((r) => r.label), ['Ø3.0mm', 'Ø3.5mm', 'Ø4.3mm', 'Ø5.0mm', 'Ø5.5mm']);
});

test('case builder: the multi-unit healing cap is offered right after the abutment', () => {
  for (const sid of SYSTEM_IDS) {
    const labels = plain($('builderPartTypes')(sid)).map((p) => p.label);
    const cap = $('MULTI_UNIT_CAP_TRIGGER')[sid];
    const mu = labels.indexOf('Multi-unit Abutment');
    if (cap && mu >= 0) assert.equal(labels[mu + 1], `Multi-unit ${cap.capLabel}`, sid);
    else assert.ok(!labels.some((l) => l.startsWith('Multi-unit ') && l !== 'Multi-unit Abutment' && l !== 'Multi-unit Abutment Screw'), sid);
  }
  const capType = $('builderPartTypes')('blc').find((p) => p.label === 'Multi-unit Protective Cap');
  const groups = $('optionGroups')('blc', capType.options[0], implant('blc', '035.9310S'));
  assert.deepEqual(plain(groups.map((g) => g.group.label)), ['Protective Caps (4 pack, PEEK/TAN)']);
});

test('case builder: picks fill in single choices and remembered ones, and drop what no longer fits', () => {
  const healing = $('builderPartTypes')('blc').find((p) => p.label === 'Healing Abutment');
  const wb = implant('blc', '035.9410S');
  const rb = implant('blc', '035.9310S');
  // Three subtypes and several groups: nothing is chosen for you.
  assert.deepEqual(plain($('resolvePartPick')('blc', healing, wb, null, null)), { opt: null, group: null, ref: null });
  const remembered = { opt: 0, group: 'RB/WB, ∅4mm (for final abutments ∅3.8mm)', ref: '064.4204S' };
  assert.deepEqual(plain($('resolvePartPick')('blc', healing, wb, null, remembered)), remembered);
  // A WB-only healing abutment remembered for a WB implant is not carried over to an RB one.
  const wbOnly = { opt: 0, group: 'WB, ∅6.0mm (for final abutments ∅5.5mm)', ref: '064.8201S' };
  assert.deepEqual(plain($('resolvePartPick')('blc', healing, rb, wbOnly, null)), { opt: 0, group: null, ref: null });
  // One group and one item: picked straight away.
  const cover = $('builderPartTypes')('nact').find((p) => p.label === 'Cover Screw');
  const pick = plain($('resolvePartPick')('nact', cover, implant('nact', '34131'), null, null));
  assert.equal(pick.ref, '36650');
});

test('case builder: GH × AH table and pack sizes', () => {
  const group = SYSTEMS.blc.catalog['Healing Abutments — Crown'].find((g) => g.label === 'RB/WB, ∅4mm (for final abutments ∅3.8mm)');
  const table = plain($('ghahTable')(group.items));
  assert.deepEqual(table.ghs, ['1.5', '2.5', '3.5']);
  assert.deepEqual(table.ahs, ['2', '4', '6']);
  assert.equal(table.cells['2.5']['2'].item[1], '064.4204S');
  assert.equal(table.cells['2.5']['2'].total, '4.5');
  assert.equal($('ghahTable')([['0.5mm, Titanium', 'x'], ['0.5mm, H 2mm, TAN', 'y']]), null);
  assert.equal($('parsePackSize')('H 5.1mm, ∅5.0mm', 'Protective Caps (4 pack, PEEK/TAN)'), 4);
  assert.equal($('parsePackSize')('Healing Cap (2/pkg)', ''), 2);
  assert.equal($('parsePackSize')('10mm', 'Ø 4.0mm RB'), 1);
});

test('explanatory drawings: each size naming gets the drawing that explains it', () => {
  const kind = (sid, category, label) => $('diagramKindFor')(sid, category, SYSTEMS[sid].catalog[category].find((g) => g.label === label));
  assert.equal(kind('blc', 'Implants', 'Ø 4.5mm WB — SLActive®, Roxolid®'), 'implant');
  assert.equal(kind('blc', 'Healing Abutments — Crown', 'RB/WB, ∅4mm (for final abutments ∅3.8mm)'), 'ghah');
  assert.equal(kind('blc', 'Anatomic Healing Abutments XC', 'RB/WB XL shape, Ø4.5mm'), 'gh-h');
  assert.equal(kind('blc', 'Screw-retained / Multi-unit Abutments', 'Straight, angulation 0° (sterile)'), 'gh');
  assert.equal(kind('blc', 'Screw-retained / Multi-unit Abutments', 'Angled 17° (sterile)'), 'gh-angled');
  assert.equal(kind('nact', 'Healing Abutments — Crown', 'NP, Ø3.6mm'), 'h');
  assert.equal(kind('nact', 'Multi-unit Abutments Plus', '30°'), 'collar-angled');
  // Nobel's H on impression copings and healing caps is not a collar height.
  assert.equal(kind('nrcc', 'Impression Copings', 'NP — Open Tray'), null);
  assert.equal(kind('nas', 'Multi-unit Abutments', 'Multi-unit Healing Cap (2/pkg) — compatible with all Multi-unit Abutments'), null);
  for (const k of ['ghah', 'gh-h', 'h', 'gh', 'gh-angled', 'collar', 'collar-angled', 'implant']) {
    assert.match($('diagramHtml')(k), /<svg[\s\S]*<\/svg>/, k);
    assert.ok($('DIAGRAM_BUTTON_LABELS')[k], k);
  }
  assert.deepEqual(plain($('diagramKindsToOffer')(['gh', 'gh-angled', null, 'ghah'])), ['gh-angled', 'ghah']);
});

test('explanatory drawings: concept drawings attach to the groups they explain', () => {
  const kinds = (sid, category, label) => plain($('diagramKindsFor')(sid, category, SYSTEMS[sid].catalog[category].find((g) => g.label === label)));
  assert.deepEqual(kinds('nrcc', 'Impression Copings', 'NP — Open Tray'), ['tray']);
  assert.deepEqual(kinds('blc', 'Impression Components', 'RB/WB — for Crown'), ['tray', 'engaging']);
  assert.deepEqual(kinds('nrcc', 'Cover Screws', 'Cover screw'), ['cover']);
  assert.deepEqual(kinds('nact', 'Healing Abutments — Crown', 'NP, Ø3.6mm'), ['h', 'cover']);
  assert.deepEqual(kinds('nas', 'Temporary Abutments', 'Temporary Abutment, Non-Engaging (bridge), Ø4.1mm'), ['collar', 'engaging']);
  assert.deepEqual(kinds('blc', 'Screw-retained / Multi-unit Abutments', 'Angled 17° (sterile)'), ['gh-angled', 'mu-stack']);
  assert.deepEqual(kinds('blc', 'Novaloc® Abutments', 'Retention Inserts (4 pcs)'), ['novaloc']);
  assert.deepEqual(kinds('nrcc', 'Locator R-Tx® Abutments', 'Retention Inserts (4/pkg)'), ['locator']);
  // Nobel's zygoma "Position Locator" is not a Locator attachment.
  assert.ok(!kinds('nzcc', 'Impression & Position Locators', 'Position Locator, Desktop (fits all multi-unit abutments except the Brånemark System wide-platform external hex)').includes('locator'));
  assert.deepEqual(kinds('blc', 'Implants', 'Ø 4.5mm WB — SLActive®, Roxolid®'), ['implant']);
  assert.deepEqual(kinds('blc', 'Healing Abutments — Crown', 'RB/WB, ∅5mm (for final abutments ∅4.5mm)'), ['ghah', 'pair-dia', 'cover']);
  assert.deepEqual(kinds('blc', 'Anatomic Healing Abutments XC', 'RB/WB S1 shape, Ø3.8mm'), ['gh-h', 'cover', 'xc-shapes']);
  assert.deepEqual(kinds('nrcc', 'Anatomic Healing Abutments (PEEK)', 'WP'), ['cover', 'anatomic']);
  assert.deepEqual(kinds('blt', 'Healing Abutments', 'NC — bottle-shaped'), ['h', 'cover', 'heal-shape']);
  assert.ok(kinds('blc', 'Variobase® for Crown AS', 'Burn-out Copings — 25°').includes('asc'));
  assert.ok(kinds('nas', 'Universal Base ASC', 'Universal Base ASC, Engaging (single-unit), Ø4.1mm').includes('asc'));
  assert.ok(!kinds('blc', 'Variobase® for Crown', 'RB/WB ∅3.8mm — incl. screw, AH 5.5mm').includes('asc'));
  for (const k of ['pair-dia', 'tray', 'cover', 'engaging', 'mu-stack', 'novaloc', 'locator', 'xc-shapes', 'anatomic', 'heal-shape', 'asc']) {
    assert.match($('diagramHtml')(k), /<svg[\s\S]*<\/svg>/, k);
    assert.ok($('DIAGRAM_BUTTON_LABELS')[k], k);
  }
});

test('case builder: Straumann XC shape for each tooth', () => {
  const f = $('xcShapeForTooth');
  const got = n => f(n);
  for (const n of [8, 9, 6, 11]) assert.equal(got(n), 'S', n);        // upper centrals, canines
  for (const n of [7, 10, 22, 23, 24, 25, 26, 27]) assert.equal(got(n), 'S1', n); // upper laterals, lower anteriors
  for (const n of [4, 5, 12, 13, 20, 21, 28, 29]) assert.equal(got(n), 'M', n);   // premolars
  for (const n of [1, 2, 3, 14, 15, 16, 17, 18, 19, 30, 31, 32]) assert.equal(got(n), 'XL', n); // molars
});

test('case builder: long chip lists are shortened', () => {
  const split = $('splitTypeLabels')(['VITA CAD-Temp®', 'For Crowns — RB/WB ∅3.8mm', 'For Crowns — RB/WB ∅4.5mm', 'For Crowns — RB/WB ∅6.0mm', 'For Bridge/Bar — RB/WB ∅4.5mm', 'Accessories']);
  assert.deepEqual(plain(split.heads), ['VITA CAD-Temp®', 'For Crowns', 'For Bridge/Bar', 'Accessories']);
  assert.equal(split.tail('For Crowns — RB/WB ∅4.5mm'), 'RB/WB ∅4.5mm');
  assert.equal($('splitTypeLabels')(['A', 'B', 'C', 'D', 'E']), null);
  assert.equal($('commonLead')(['RB/WB, ∅4mm (x)', 'RB/WB, ∅5mm (y)']), 'RB/WB, ');
  assert.equal($('commonLead')(['RB/WB, ∅4mm', 'WB, ∅6mm']), '');
  const rc = SYSTEMS.blt.catalog['Healing Abutments'].find((g) => g.label === 'RC — Ø4.5/5/6/6.5mm, conical');
  const t = $('axisTable')(rc.items);
  assert.deepEqual(plain(t.rows), ['Ø4.5mm', 'Ø5mm', 'Ø6mm', 'Ø6.5mm']);
  assert.deepEqual(plain(t.cols), ['H2mm', 'H4mm', 'H6mm']);
  assert.equal($('axisTable')([['Open Tray, short', 'a'], ['Closed Tray', 'b']]), null);
});

test('case builder: overdenture parts exist and the abutment fits the implant platform', () => {
  const OD = $('OVERDENTURE_PARTS');
  for (const sid of Object.keys(OD)) {
    // Every part type is offered for at least one of the system's implants
    // (Nobel's 3.0 platform has no overdenture abutment).
    const profiles = SYSTEMS[sid].catalog[IMPLANTS_CATEGORY[sid]].map((g) => implant(sid, g.items[0][1]));
    for (const pt of OD[sid]) {
      for (const opt of pt.options) {
        assert.ok(profiles.some((pr) => $('optionGroups')(sid, opt, pr).length > 0), `${sid}: "${pt.label}" offers nothing`);
      }
    }
    // Overdenture abutments get their own card, not a Final Abutment option.
    const final = $('builderPartTypes')(sid).find((p) => p.label === 'Final Abutment');
    assert.ok(!final || final.options.every((o) => !$('OVERDENTURE_CATEGORIES').has(o.category)));
    assert.ok($('builderPartTypes')(sid).some((p) => p.label === 'Overdenture Abutment'));
  }
  // A Nobel NP implant is offered only NP Locator abutments.
  const np = implant('nact', SYSTEMS.nact.catalog.Implants.find((g) => /3\.5mm/.test(g.label)).items[0][1]);
  const labels = $('optionGroups')('nact', OD.nact[0].options[0], np).map((g) => g.group.label);
  assert.ok(labels.length && labels.every((l) => l.startsWith('NP')), labels.join(', '));
});
