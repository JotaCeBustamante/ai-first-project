/* CondoHub · padrón ficticio compartido por P-050 a P-054 (no es código de producción).
   - Se carga después de assets/shell.js: <script src="assets/registry-data.js"></script>
   - Datos sintéticos (PRINCIPIO-008): nombres y correos @example.pe; sin DNI ni teléfono (RN-057, RN-146, ADR-0020).
   - Lo que se registra en la sesión (torres, unidades, personas, vínculos, invitaciones y la fecha simulada)
     se guarda en sessionStorage 'ch:registry-v1' (CH.store) y se suma a la semilla al cargar cada pantalla.
   - Coherente con CH.PERSONAS / CH.DATA y con el padrón de P-012 (F11): Ana A-502, Carla A-301 (Tenant),
     Luis B-104 y B-1203 (NonResidentOwner), Rosa A-1104 y C-201, Pedro Salas B-1203 (Tenant), etc. */
window.REG = (function () {
  const KEY = 'registry-v1';
  const DEFAULT_AS_OF = CH.TODAY + 'T' + CH.NOW;           // 2026-11-04T10:30 (America/Lima)
  const ADMIN_NAME = 'Rosa Huamán';

  // Fechas simuladas útiles para reproducir criterios (HU-001, HU-001B)
  const AS_OF_OPTIONS = [
    [DEFAULT_AS_OF, 'Hoy · 04/11/2026 ' + CH.NOW],
    ['2026-11-15T09:30', '15/11/2026 09:30 · auditoría del vínculo (HU-001)'],
    ['2026-12-01T10:00', '01/12/2026 10:00 · invitar a Ana (HU-001B)'],
    ['2027-03-01T10:00', '01/03/2027 10:00 · Sofía y Carla (HU-001B, RN-131)'],
    ['2027-08-01T00:00', '01/08/2027 00:00 · empieza el vínculo de Sofía (HU-001B)']
  ];

  // ---------- Semilla ----------
  const TOWERS = ['A', 'B', 'C'];
  const UNIT_NUMBERS = {
    A: ['101', '102', '201', '202', '301', '302', '305', '401', '402', '501', '502', '704', '708', '901', '1104'],
    B: ['104', '105', '205', '302', '303', '601', '1203'],
    C: ['110', '201', '202', '305']
  };
  // account: roles con cuenta activa en este condominio; invitation: la última emitida
  const PERSONS = [
    { id: 'p-ana', name: 'Ana Quispe', email: 'ana.quispe@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-martin', name: 'Martín Quispe', email: 'martin.quispe@example.pe', account: null,
      invitation: { role: 'Resident', issuedAt: '2026-11-02T09:15', expiresAt: '2026-11-09T09:15' } },
    { id: 'p-carla', name: 'Carla Díaz', email: 'carla.diaz@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-hector', name: 'Héctor Vargas', email: 'hector.vargas@example.pe', account: null,
      invitation: { role: 'Resident', issuedAt: '2026-10-20T16:00', expiresAt: '2026-10-27T16:00' } },
    { id: 'p-diego', name: 'Diego Lozano', email: 'diego.lozano@example.pe', account: null },
    { id: 'p-gloria', name: 'Gloria Ramírez', email: 'gloria.ramirez@example.pe', account: null },
    { id: 'p-sofiat', name: 'Sofía Torres', email: 'sofia.torres@example.pe', account: null },
    { id: 'p-jorge', name: 'Jorge Paredes', email: 'jorge.paredes@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-miguel', name: 'Miguel Ángel Torres', email: 'miguel.torres@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-rosa', name: 'Rosa Huamán', email: 'rosa.huaman@example.pe', account: { roles: ['Administrator', 'Resident'] } },
    { id: 'p-luis', name: 'Luis Rojas', email: 'luis.rojas@example.pe', account: { roles: ['NonResidentOwner'] } },
    { id: 'p-pedro', name: 'Pedro Salas', email: 'pedro.salas@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-teresa', name: 'Teresa Gamarra', email: 'teresa.gamarra@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-sofiap', name: 'Sofía Paredes', email: 'sofia.paredes@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-javier', name: 'Javier Cárdenas', email: 'javier.cardenas@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-gmedina', name: 'Gloria Medina', email: 'gloria.medina@example.pe', account: { roles: ['Resident'] } },
    { id: 'p-marco', name: 'Marco Salazar', email: 'marco.salazar@example.pe', account: { roles: ['BoardMember'] } },
    { id: 'p-raul', name: 'Raúl Mendoza', email: 'raul.mendoza@example.pe', account: { roles: ['Concierge'] } }
  ];
  // [persona, unidad, tipo, desde, hasta]. Hasta = último día del vínculo (inclusive, ADR-0001)
  const OCC = [
    ['p-ana', 'A-502', 'Owner', '2026-11-01'],
    ['p-martin', 'A-502', 'Owner', '2026-11-01'],
    ['p-hector', 'A-301', 'Owner', '2019-05-10'],
    ['p-carla', 'A-301', 'Tenant', '2026-03-01', '2027-01-31'],      // RN-005: su plazo de retención vencería el 01/05/2027
    ['p-diego', 'A-301', 'Tenant', '2025-02-01', '2026-10-31'],
    ['p-gloria', 'A-305', 'Owner', '2021-01-10'],
    ['p-sofiat', 'A-305', 'Tenant', '2027-08-01'],                   // HU-001B: vínculo futuro (RN-157)
    ['p-jorge', 'A-704', 'Owner', '2026-11-01'],
    ['p-miguel', 'A-708', 'Owner', '2015-04-20'],
    ['p-rosa', 'A-1104', 'Owner', '2018-03-01'],
    ['p-rosa', 'C-201', 'Owner', '2020-06-15'],
    ['p-luis', 'B-104', 'Owner', '2020-01-15'],
    ['p-luis', 'B-1203', 'Owner', '2022-07-01'],
    ['p-pedro', 'B-1203', 'Tenant', '2026-06-01', '2027-05-31'],
    ['p-teresa', 'B-205', 'Owner', '2016-08-01'],
    ['p-sofiap', 'B-302', 'Owner', '2017-09-01'],
    ['p-javier', 'C-110', 'Owner', '2019-11-20'],
    ['p-gmedina', 'C-305', 'Owner', '2021-02-14']
  ];

  // ---------- Sesión ----------
  const emptySession = () => ({ base: 'seed', towers: [], units: [], persons: [], occ: [], patch: {}, audit: [], asOf: '' });
  function load() {
    try { const s = JSON.parse(CH.store.get(KEY)); if (s && s.base) return Object.assign(emptySession(), s); } catch (e) { }
    return emptySession();
  }
  let S = load();
  const save = () => CH.store.set(KEY, JSON.stringify(S));

  // "Reiniciar datos" de la banda (shell.js) no conoce esta clave: se limpia antes de que el shell recargue
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-ch-reset]')) CH.store.set(KEY, ''); }, true);

  // ---------- Fecha simulada ----------
  const asOf = () => S.asOf || DEFAULT_AS_OF;
  const today = () => asOf().slice(0, 10);
  function setAsOf(v) { S.asOf = v === DEFAULT_AS_OF ? '' : v; save(); }
  const addDays = (iso, n) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
  const addDaysDT = (dt, n) => addDays(dt.slice(0, 10), n) + dt.slice(10);
  const fmtDT = dt => `${CH.fmtDate(dt.slice(0, 10))} ${dt.slice(11, 16)}`;
  const timeDT = dt => `<time datetime="${dt.slice(0, 16)}:00-05:00" class="tnum">${fmtDT(dt)}</time>`;
  const timeD = d => `<time datetime="${d}" class="tnum">${CH.fmtDate(d)}</time>`;
  const isoStamp = dt => dt.slice(0, 16) + ':00-05:00';

  // ---------- Modelo armado (semilla o vacío + sesión) ----------
  const unitId = code => 'u-' + code.toLowerCase().replace('-', '');
  function build() {
    const seed = S.base === 'seed';
    const towers = (seed ? TOWERS.slice() : []).concat(S.towers);
    const units = [];
    if (seed) TOWERS.forEach(t => UNIT_NUMBERS[t].forEach(n => units.push({ id: unitId(t + '-' + n), tower: t, number: n, code: t + '-' + n })));
    S.units.forEach(u => units.push(u));
    const persons = (seed ? PERSONS.map(p => Object.assign({}, p)) : []).concat(S.persons.map(p => Object.assign({}, p)))
      .map(p => S.patch[p.id] ? Object.assign(p, S.patch[p.id]) : p);
    const occ = (seed ? OCC.map(([pid, code, type, start, end], i) => ({ id: 'o-' + (101 + i), personId: pid, unitId: unitId(code), type, start, end: end || '' })) : [])
      .concat(S.occ);
    return { towers, units, persons, occ };
  }
  let M = build();
  const refresh = () => { M = build(); };

  // ---------- Consultas ----------
  const normEmail = e => String(e || '').trim().toLowerCase();       // índice ciego sobre el correo normalizado (ADR-0004)
  const towers = () => M.towers.slice();
  const unitsOf = t => M.units.filter(u => u.tower === t).sort((a, b) => Number(a.number) - Number(b.number));
  const unit = id => M.units.find(u => u.id === id) || null;
  const unitByCode = code => M.units.find(u => u.code === code) || null;
  const person = id => M.persons.find(p => p.id === id) || null;
  const occStatus = o => o.start > today() ? 'future' : (o.end && o.end < today() ? 'ended' : 'active');
  const occOfUnit = id => M.occ.filter(o => o.unitId === id).map(o => Object.assign({ status: occStatus(o), person: person(o.personId), unit: unit(o.unitId) }, o));
  const occOfPerson = id => M.occ.filter(o => o.personId === id).map(o => Object.assign({ status: occStatus(o), unit: unit(o.unitId) }, o));
  const activeCount = uid => occOfUnit(uid).filter(o => o.status === 'active').length;

  // Roles vigentes: Resident y NonResidentOwner se revocan al terminar el último vínculo activo (RN-060)
  function roles(p) {
    if (!p.account) return [];
    const active = occOfPerson(p.id).some(o => o.status === 'active');
    return p.account.roles.filter(r => (r !== 'Resident' && r !== 'NonResidentOwner') || active);
  }
  // Plazo de retención (RN-005): sin vínculos activos ni futuros y sin roles → EndDate del último vínculo + 90 días
  function retention(p) {
    const os = occOfPerson(p.id);
    if (!os.length || os.some(o => o.status !== 'ended') || roles(p).length) return null;
    const last = os.map(o => o.end).sort().pop();
    const until = addDays(last, 90);
    return { from: last, until, archived: today() >= until };
  }
  const archived = p => { const r = retention(p); return !!(r && r.archived); };
  const findByEmail = email => M.persons.find(p => normEmail(p.email) === normEmail(email) && !archived(p)) || null;

  // Estado de la cuenta (§3.0.5): none | pending | expired | active
  function account(p) {
    if (p.account) return { status: 'active', roles: roles(p) };
    const inv = p.invitation && p.invitation.issuedAt <= asOf() ? p.invitation : null;
    if (!inv) return { status: 'none' };
    return { status: inv.expiresAt > asOf() ? 'pending' : 'expired', invitation: inv };
  }

  // ---------- Escrituras (simulan la API) ----------
  function addTower(code) { S.towers.push(code); save(); refresh(); }
  function startEmpty() { S = Object.assign(emptySession(), { base: 'empty', asOf: S.asOf }); save(); refresh(); }
  function addUnit(tower, number) {
    const u = { id: unitId(tower + '-' + number), tower, number, code: tower + '-' + number };
    S.units.push(u); save(); refresh(); return u;
  }
  function addPerson(name, email) {
    const p = { id: 'p-n' + Date.now().toString(36), name, email: email.trim(), account: null };
    S.persons.push(p); save(); refresh(); return p;
  }
  function addOcc(personId, uId, type, start, end) {
    const o = { id: 'o-n' + Date.now().toString(36), personId, unitId: uId, type, start, end: end || '' };
    S.occ.push(o);
    // RN-059: entrada de auditoría (valor anterior vacío, valor nuevo, autor, fecha-hora ISO 8601)
    S.audit.push({ personId, at: isoStamp(asOf()), before: '', after: `${unit(uId).code} · ${type}`, by: ADMIN_NAME + ' (Administrator)' });
    save(); refresh(); return o;
  }
  function patchPerson(id, patch) { S.patch[id] = Object.assign({}, S.patch[id], patch); save(); refresh(); }
  function invite(id, role) {
    const inv = { role, issuedAt: asOf(), expiresAt: addDaysDT(asOf(), 7) };     // RN-110: vence a los 7 días (604,800 s)
    patchPerson(id, { account: null, invitation: inv });
    return inv;
  }
  const auditOf = id => S.audit.filter(a => a.personId === id);

  // ---------- Presentación (§3.0.5) ----------
  const TYPE = { Owner: ['info', 'Propietario'], Tenant: ['neutral', 'Inquilino'] };
  const typeBadge = t => CH.badge(TYPE[t][0], TYPE[t][1]);
  const ROLE = { Administrator: 'Administración', BoardMember: 'Junta Directiva', Resident: 'Residente', NonResidentOwner: 'Propietario no residente', Concierge: 'Portería' };
  const ACCOUNT = { none: ['neutral', 'Sin cuenta'], pending: ['warning', 'Invitación pendiente'], expired: ['danger', 'Invitación vencida'], active: ['success', 'Cuenta activa'] };
  const accountBadge = s => CH.badge(ACCOUNT[s][0], ACCOUNT[s][1]);
  function statusBadge(o) {
    if (o.status === 'future') return CH.badge('warning', 'Empieza el ' + CH.fmtDate(o.start));
    if (o.status === 'ended') return CH.badge('neutral', 'Terminó el ' + CH.fmtDate(o.end));
    return CH.badge('success', 'Activo');
  }
  // Orden de P-052: activos (propietarios antes que inquilinos), futuros, terminados
  const ORDER = { active: 0, future: 1, ended: 2 };
  const sortOcc = list => list.slice().sort((a, b) => ORDER[a.status] - ORDER[b.status] || (a.type === b.type ? 0 : a.type === 'Owner' ? -1 : 1) ||
    (a.status === 'ended' ? b.end.localeCompare(a.end) : a.start.localeCompare(b.start)));

  // Enlace de la invitación en el buzón de prueba (PRINCIPIO-009). Tokens que entiende P-006.
  function token(p, st) {
    if (st === 'expired') return 'inv-vencida';
    if (st === 'active') return 'inv-usada';
    if (p.id === 'p-ana') return 'k9F2xQ7mTb';   // Ana ya tiene cuenta en otro condominio (F1 2b, RN-121)
    return 'inv-carla-ok';
  }

  // Control de la banda: fecha y hora simulada del padrón
  function asOfControl() {
    const cur = asOf();
    const opts = AS_OF_OPTIONS.map(([v, t]) => `<option value="${v}"${v === cur ? ' selected' : ''}>${t}</option>`).join('');
    return `<div style="margin-top:var(--space-2)"><label for="reg-asof">Fecha y hora simulada del padrón</label><select id="reg-asof">${opts}</select></div>`;
  }
  function asOfNote() {
    return asOf() === DEFAULT_AS_OF ? '' : `<p class="rn always">Fecha simulada del padrón: ${fmtDT(asOf())} (America/Lima). Cámbiala en la banda.</p>`;
  }
  function bindAsOf(ctx) {
    document.addEventListener('change', e => { if (e.target.id === 'reg-asof') { setAsOf(e.target.value); refresh(); ctx.data = {}; ctx.rerender(); } });
  }
  function syncAsOfControl() { const el = document.getElementById('reg-asof'); if (el) el.value = asOf(); }

  // Vista P-091 compartida
  function notFoundView(c, back) {
    c.title = 'No encontrado';
    return `<div class="content read"><div class="page-state"><span style="color:var(--color-text-muted)">${CH.ICON.big}</span>
      <h1 class="page" tabindex="-1" id="nf-h1">No encontramos lo que buscas</h1>
      <p class="muted">Puede que el enlace esté mal escrito o que ya no exista.</p>
      <div class="actions"><a href="#" class="btn btn-primary btn-block" data-go="home">Ir al inicio</a>
      <a href="#" class="btn btn-secondary btn-block" data-go="${back || 'P-050'}">Volver</a></div>
      ${CH.rn('P-091 · 404 · RN-103: igual si no existe o es de otro condominio')}</div></div>`;
  }

  return {
    KEY, DEFAULT_AS_OF, ADMIN_NAME, asOf, today, setAsOf, addDays, addDaysDT, fmtDT, timeDT, timeD, isoStamp,
    base: () => S.base, towers, unitsOf, unit, unitByCode, unitId, person, occOfUnit, occOfPerson, occStatus, activeCount,
    roles, retention, archived, findByEmail, normEmail, account, auditOf,
    addTower, startEmpty, addUnit, addPerson, addOcc, patchPerson, invite, refresh,
    TYPE, typeBadge, ROLE, ACCOUNT, accountBadge, statusBadge, sortOcc, token,
    asOfControl, asOfNote, bindAsOf, syncAsOfControl, notFoundView
  };
})();
