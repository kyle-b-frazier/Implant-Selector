// Checks the catalog data and the implant-to-part compatibility rules.
// Run with `npm test` (or `node --test`) — Node 18+, no dependencies.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Load the two browser scripts into one shared global scope, exactly as
// index.html's <script> tags do.
const ctx = vm.createContext({});
for (const file of ['catalog.js', 'compatibility.js']) {
  const src = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
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

test('the Favorites preset only reuses parts that are in the catalog', () => {
  for (const [sid, tabs] of Object.entries($('FAVORITES_PRESET'))) {
    for (const groups of Object.values(tabs)) {
      for (const group of groups) {
        for (const [, ref] of group.items) find(sid, group.sourceCategory || 'All-on-X Components', ref);
      }
    }
  }
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
  assert.ok(!fits('blc', 'Anatomic Healing Abutments XC', '064.8482S', rb)); // WB-only XL
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

test('Neodent GM: implant analogs match the implant diameter', () => {
  const analogs = 'Impression Components & Analogs';
  assert.ok(fits('gm', analogs, '101.103', implant('gm', '140.943'))); // Ø3.5 -> Ø3.5/3.75 analog
  assert.ok(!fits('gm', analogs, '101.090', implant('gm', '140.943')));
  assert.ok(fits('gm', analogs, '101.090', implant('gm', '140.1059'))); // Ø7.0 -> Ø5.0/6.0/7.0 analog
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
