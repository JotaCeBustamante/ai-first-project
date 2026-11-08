/* CondoHub · gastos ficticios compartidos por P-030 a P-034 (no es código de producción).
   - Se carga después de assets/shell.js: <script src="assets/expenses-data.js"></script>
   - Una sola fuente de los gastos (antes cada pantalla tenía su copia). Lo que se registra (P-032), anula (P-033)
     o vincula (P-034) se guarda en sessionStorage 'ch:exp-session-v1' (CH.store) con la forma
     { added: [gasto], patch: { id: { voided, void: { at, reason }, hire, linkedAt, hireSim } } }
     y se aplica al leer, así P-030 y P-031 lo ven. "Reiniciar datos" (shell.js) borra la clave.
   - Fecha simulada (CH.TODAY + CH.NOW, ?today=AAAA-MM-DD y ?now=HH:MM): un gasto existe desde su fecha-hora de
     registro; una anulación o un vínculo, desde su fecha-hora. Así ningún gasto se ve registrado "en el futuro"
     ni anulado antes de existir. Con el hoy por defecto (04/11/2026 10:30) solo se ven los registrados hasta entonces;
     noviembre completo (HU-011 C1: S/ 6,300.00 · 3,200.00 · 9,800.00 = 19,300.00) se ve desde el 03/12/2026. */
window.EXP = (function () {
  const KEY = 'exp-session-v1';
  const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const CATS = [['Maintenance', 'Mantenimiento'], ['Cleaning', 'Limpieza'], ['Security', 'Seguridad']];   // ⚠️ Q27 seeder
  const CAT = Object.fromEntries(CATS);

  // Proveedores registrados (GET /api/vendors): razón social → RUC
  const RUC = {
    'Vigilancia Andina SAC': '20512398741', 'Brillo Total SAC': '20548812365', 'Elevadores del Pacífico SAC': '20545678901',
    'Hidroclean SAC': '20601987654', 'Jardines Verdes EIRL': '20563321478', 'TecnoVisión EIRL': '20609876123',
    'Electro Instalaciones Rímac SAC': '20538877412', 'Distribuidora Sanitaria del Sur SAC': '20511224563',
    'Cerrajería Lima Norte SAC': '20605544321', 'Control de Plagas Lima SAC': '20547896325',
    'Pinturas y Acabados Surco SAC': '20602233115', 'Bombas y Motores Perú SAC': '20519988776',
    'Carpintería San Martín EIRL': '20608812347', 'Extintores Lima SAC': '20536655441',
    'Pinturas Lima SAC': '20512345678', 'Ascensores Andinos SAC': '20498765432', 'Vigilancia Total SAC': '20533445566'
  };

  // [id, fecha del gasto, registrado el (AAAA-MM-DD o AAAA-MM-DDTHH:MM; sin hora = 09:00), descripción, categoría, proveedor, monto]
  // Nov 2026 (14 gastos, 1 anulado): Mantenimiento 6,300 · Limpieza 3,200 · Seguridad 9,800 = 19,300 (HU-011 C1).
  // Oct 2026: incluye e-1008 (fecha 30/10, registrado 02/11) que cuenta en octubre (RN-143).
  const ROWS = [
    ['e-1101', '2026-11-01', '2026-11-02', 'Servicio de vigilancia 24 horas · noviembre', 'Security', 'Vigilancia Andina SAC', 8600],
    ['e-1102', '2026-11-01', '2026-11-03', 'Limpieza de áreas comunes · noviembre', 'Cleaning', 'Brillo Total SAC', 1850],
    // Vinculado a h-098: el proveedor es el de la cotización elegida (antes Elevadores del Pacífico SAC, VL-P031 obs. 4)
    ['e-1103', '2026-11-05', '2026-11-06', 'Mantenimiento preventivo de ascensores · 2.ª cuota', 'Maintenance', 'Ascensores Andinos SAC', 2400],
    // HU-010 C1: registrado el 20/11/2026; HU-010B C3: anulado el 21/11/2026 09:00
    ['e-1104', '2026-11-08', '2026-11-20T16:00', 'Limpieza de cisterna', 'Cleaning', 'Hidroclean SAC', 1200],
    // HU-011 C2: "se registró de nuevo por S/ 1,000.00", después de la anulación
    ['e-1105', '2026-11-08', '2026-11-21T09:15', 'Limpieza de cisterna', 'Cleaning', 'Hidroclean SAC', 1000],
    ['e-1106', '2026-11-10', '2026-11-11', 'Mantenimiento de jardines', 'Maintenance', 'Jardines Verdes EIRL', 980],
    // Vinculado a h-092: el proveedor es el de la cotización elegida (antes TecnoVisión EIRL, VL-P031 obs. 4)
    ['e-1107', '2026-11-12', '2026-11-13', 'Mantenimiento de cámaras de seguridad', 'Security', 'Vigilancia Total SAC', 750],
    ['e-1108', '2026-11-14', '2026-11-17', 'Cambio de luminarias LED en pasadizos', 'Maintenance', 'Electro Instalaciones Rímac SAC', 970],
    ['e-1109', '2026-11-15', '2026-11-16', 'Útiles de limpieza', 'Cleaning', 'Distribuidora Sanitaria del Sur SAC', 350],
    ['e-1110', '2026-11-19', '2026-11-19', 'Cambio de chapa eléctrica del portón', 'Security', 'Cerrajería Lima Norte SAC', 450],
    ['e-1111', '2026-11-21', '2026-11-22', 'Fumigación y desratización', 'Maintenance', 'Control de Plagas Lima SAC', 520],
    ['e-1112', '2026-11-24', '2026-11-25', 'Pintura de barandas de escaleras', 'Maintenance', 'Pinturas y Acabados Surco SAC', 280],
    ['e-1113', '2026-11-26', '2026-11-27', 'Revisión del tablero eléctrico', 'Maintenance', 'Electro Instalaciones Rímac SAC', 300],
    // HU-011 C4/C5: fecha 28/11, registrado el 03/12 → suma en noviembre
    ['e-1114', '2026-11-28', '2026-12-03', 'Reparación de bomba de agua', 'Maintenance', 'Bombas y Motores Perú SAC', 850],
    ['e-1001', '2026-10-01', '2026-10-02', 'Servicio de vigilancia 24 horas · octubre', 'Security', 'Vigilancia Andina SAC', 8600],
    ['e-1002', '2026-10-01', '2026-10-02', 'Limpieza de áreas comunes · octubre', 'Cleaning', 'Brillo Total SAC', 1850],
    ['e-1003', '2026-10-05', '2026-10-06', 'Mantenimiento preventivo de ascensores', 'Maintenance', 'Elevadores del Pacífico SAC', 2400],
    ['e-1004', '2026-10-10', '2026-10-12', 'Mantenimiento de jardines', 'Maintenance', 'Jardines Verdes EIRL', 980],
    // Vinculado a h-092 (aprobada el 06/10): proveedor y monto de la cotización elegida
    ['e-1010', '2026-10-14', '2026-10-15', 'Instalación de cámaras de seguridad Torre B', 'Security', 'Vigilancia Total SAC', 6250],
    ['e-1005', '2026-10-16', '2026-10-17', 'Reparación de la puerta del salón de fiestas', 'Maintenance', 'Carpintería San Martín EIRL', 640],
    ['e-1006', '2026-10-18', '2026-10-19', 'Útiles de limpieza', 'Cleaning', 'Distribuidora Sanitaria del Sur SAC', 410],
    // Anulado el 19/10/2026 (registro duplicado de e-1006): ejemplo de anulado que existe con el hoy por defecto
    ['e-1009', '2026-10-18', '2026-10-19T11:00', 'Útiles de limpieza', 'Cleaning', 'Distribuidora Sanitaria del Sur SAC', 410],
    ['e-1007', '2026-10-22', '2026-10-23', 'Recarga de extintores', 'Security', 'Extintores Lima SAC', 720],
    // h-098 adjudicada a Ascensores Andinos SAC (S/ 4,800.00 en 2 cuotas): 1.ª cuota sin vincular → P-034 por defecto
    ['e-1116', '2026-10-26', '2026-10-27', 'Mantenimiento preventivo de ascensores · 1.ª cuota', 'Maintenance', 'Ascensores Andinos SAC', 2400],
    // HU-010B C4/C6 y RN-095: "Pintura de fachada – adelanto S/ 9,250.00" (h-101 sigue Enviada a la Junta)
    ['e-1115', '2026-10-28', '2026-10-29', 'Pintura de fachada – adelanto', 'Maintenance', 'Pinturas Lima SAC', 9250],
    ['e-1008', '2026-10-30', '2026-11-02', 'Cambio de bomba de presión', 'Maintenance', 'Bombas y Motores Perú SAC', 3200]
  ];
  // Comprobantes: [tipo y número, archivo, KB]. El resto se arma con la serie F001.
  const RECEIPTS = {
    'e-1104': ['Factura F001-0458', 'factura-F001-0458.pdf', 180], 'e-1105': ['Factura F001-0461', 'factura-F001-0461.pdf', 176],
    'e-1109': ['Boleta B002-1187', 'boleta-B002-1187.jpg', 412], 'e-1006': ['Boleta B002-1093', 'boleta-B002-1093.jpg', 398],
    'e-1009': ['Boleta B002-1093', 'boleta-B002-1093.jpg', 398],
    'e-1115': ['Factura F001-0472', 'factura-F001-0472.pdf', 164], 'e-1116': ['Factura E001-0215', 'factura-E001-0215.pdf', 142],
    'e-1103': ['Factura E001-0231', 'factura-E001-0231.pdf', 139], 'e-1010': ['Factura F002-0087', 'factura-F002-0087.pdf', 221]
  };
  // Anulaciones (RN-092): fecha-hora en America/Lima, siempre posterior al registro
  const VOIDS = {
    'e-1104': { at: '2026-11-21T09:00', reason: 'Monto mal digitado; se registra de nuevo por S/ 1,000.00' },
    'e-1009': { at: '2026-10-19T17:20', reason: 'Registro duplicado: el comprobante B002-1093 ya está en otro gasto del 18/10/2026' }
  };
  // Contrataciones vinculadas (RN-095, deben estar Aprobadas): el proveedor del gasto es el de la cotización elegida
  const LINKS = { 'e-1103': 'h-098', 'e-1107': 'h-092', 'e-1010': 'h-092' };

  const SEED = ROWS.map(([id, date, regAt, desc, cat, sup, amount], i) => {
    const at = regAt.length === 10 ? regAt + 'T09:00' : regAt;
    const r = RECEIPTS[id] || ['Factura F001-0' + (300 + i * 7), 'factura-F001-0' + (300 + i * 7) + '.pdf', 120 + (i * 37) % 200];
    return { id, date, reg: at.slice(0, 10), regAt: at, desc, cat, sup, amount, seed: true,
      void: VOIDS[id] || null, hire: LINKS[id] || null, linkedAt: LINKS[id] ? at : null,
      receipt: { label: r[0], file: r[1], kb: r[2] }, by: 'Administración' };
  });

  // ---------- Sesión ----------
  function session() {
    try { const s = JSON.parse(CH.store.get(KEY)); if (s && Array.isArray(s.added) && s.patch) return s; } catch (e) { }
    return { added: [], patch: {} };
  }
  const save = s => CH.store.set(KEY, JSON.stringify(s));
  const now = () => CH.nowStamp();

  // Aplica el parche de la sesión y la fecha simulada a un gasto
  function view(e, s, n) {
    const p = s.patch[e.id];
    const x = JSON.parse(JSON.stringify(Object.assign({}, e, p || {})));
    // Anulación de la semilla: se ve DESPUÉS de su minuto (así, con ?now=09:00 el 21/11, aún se puede anular en P-033);
    // la de la sesión, desde su minuto.
    const fromSession = !!(p && p.void);
    x.voided = !!(x.void && (fromSession ? x.void.at <= n : x.void.at < n));
    if (!x.voided) x.void = null;
    if (x.hire && x.linkedAt && x.linkedAt > n) { x.hire = null; x.linkedAt = null; }
    return x;
  }
  const replacedIds = s => new Set(s.added.map(a => a.replaces).filter(Boolean));

  // Gastos que existen a la fecha-hora simulada, con los cambios de la sesión
  function all() {
    const s = session(), n = now(), rep = replacedIds(s);
    return SEED.filter(e => !rep.has(e.id))
      .concat(s.added.map(a => Object.assign({}, a, { regAt: a.regAt || a.createdAt || a.reg + 'T00:00' })))
      .filter(e => e.regAt <= n)
      .map(e => view(e, s, n));
  }
  // Un id de la semilla que se volvió a registrar en P-032 (ver seedMatch) apunta al gasto de la sesión
  function resolve(id) {
    const a = session().added.find(x => x.replaces === id);
    return a ? a.id : id;
  }
  const get = id => all().find(e => e.id === resolve(id)) || null;
  // Primer gasto existente de una lista de ids que cumple la condición (estados del prototipo)
  const firstOf = (ids, pred) => ids.map(get).find(e => e && (!pred || pred(e))) || null;

  // P-032: si lo que se registra es un gasto de la semilla que todavía no existe (p. ej. HU-010 C1 con ?today=2026-11-20),
  // el registro de la sesión ocupa su lugar y no se duplica.
  function seedMatch(f) {
    const s = session(), n = now(), rep = replacedIds(s), t = v => String(v).trim().toLowerCase();
    const m = SEED.find(e => !rep.has(e.id) && e.regAt > n && t(e.desc) === t(f.desc) && e.date === f.date &&
      Math.round(e.amount * 100) === Math.round(f.amount * 100) && e.cat === f.cat && e.sup === f.sup);
    return m ? m.id : null;
  }
  function add(e) { const s = session(); s.added = s.added.filter(x => x.id !== e.id).concat([e]); save(s); return e; }
  function patch(id, p) { const s = session(); id = resolve(id); s.patch[id] = Object.assign({}, s.patch[id], p); save(s); }
  const nextId = () => 'e-' + (1201 + session().added.length);
  const byKey = key => session().added.find(x => x.idempotencyKey === key) || null;

  // Contrataciones: lo decidido en P-041/P-042 en la sesión ('ch:hires-v1') o la semilla de CH.DATA.hires
  function hires() {
    try { const h = JSON.parse(CH.store.get('hires-v1')); if (Array.isArray(h)) return h; } catch (e) { }
    return JSON.parse(JSON.stringify(CH.DATA.hires));
  }
  const hire = id => hires().find(h => h.id === id) || null;
  const HIRE_BADGE = { Approved: ['success', 'Aprobada'], Submitted: ['warning', 'Enviada a la Junta'], Draft: ['neutral', 'Borrador'] };
  const winner = h => h.quotes.find(q => (h.justification || '').includes(q.supplier)) || h.quotes[0];

  // ---------- Formato ----------
  const monthLabel = d => { const [y, m] = d.split('-'); return MONTHS[Number(m) - 1] + ' ' + y; };
  const dt = iso => { const [d, t] = iso.split('T'); return `<time datetime="${d}T${t}:00-05:00" class="tnum">${CH.fmtDate(d)} ${t}</time>`; };
  const day = d => `<time datetime="${d}" class="tnum">${CH.fmtDate(d)}</time>`;
  const kbText = kb => kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';
  const DOC = '<svg width="32" height="32" viewBox="0 0 48 48" aria-hidden="true"><path d="M12 6h17l9 9v27H12z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M29 6v9h9M18 26h12M18 33h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';

  function notFoundView(c) {
    c.title = 'No encontrado';
    return `<div class="content read"><div class="page-state notfound"><span style="color:var(--color-text-muted)">${CH.ICON.big}</span>
      <h1 class="page" tabindex="-1" id="nf-h1">No encontramos lo que buscas</h1>
      <p class="muted">Puede que el enlace esté mal escrito o que ya no exista.</p>
      <div class="actions"><a href="#" class="btn btn-primary btn-block" data-go="home">Ir al inicio</a>
      <a href="#" class="btn btn-secondary btn-block" data-go="P-030">Volver</a></div>
      ${CH.rn('P-091 · 404 · RN-103: igual si no existe, si es de otro condominio o si aún no se registró a la fecha simulada; se evalúa antes que el permiso')}</div></div>`;
  }

  // ---------- Banda del prototipo: cómo reproducir las HU con la fecha simulada ----------
  function scenarioControls() {
    const a = (file, q, t) => `<a href="${file}?${q}">${t}</a>`;
    const isDefault = CH.TODAY === '2026-11-04' && CH.NOW === '10:30';
    return `<div class="exp-scn" style="margin-top:8px;max-width:60rem;font-size:.875rem;line-height:1.45">
      <p style="margin:0"><strong>Fecha simulada:</strong> hoy es ${CH.fmtDate(CH.TODAY)} ${CH.NOW} (America/Lima)${isDefault ? ', la del escenario' : ''}.
      Un gasto aparece desde su fecha-hora de registro; una anulación o un vínculo, desde su fecha-hora. La fecha se recuerda en la pestaña hasta "Reiniciar datos" o ${a('P-030-gastos-del-mes.html', 'today=2026-11-04&now=10:30', 'volver al 04/11/2026 10:30')}.</p>
      <ul style="margin:4px 0 0;padding-left:1.25rem">
        <li>HU-010 (registrar "Limpieza de cisterna" el 20/11, C1–C15): ${a('P-032-registrar-gasto.html', 'role=rosa&today=2026-11-20&now=10:30', 'P-032 con ?today=2026-11-20')}, criterio C1 → "Rellenar" → "Registrar gasto" → P-031 → "← Gastos de noviembre 2026".</li>
        <li>HU-010B C3 (anular el 21/11 a las 09:00): ${a('P-031-detalle-de-gasto.html', 'role=rosa&id=e-1104&today=2026-11-21&now=09:00', 'P-031 de "Limpieza de cisterna" con ?today=2026-11-21&amp;now=09:00')} → "Anular gasto". C8 (otra vez el 23/11): ${a('P-033-anular-gasto.html', 'role=rosa&id=e-1104&today=2026-11-23&now=10:30', 'P-033 con ?today=2026-11-23')}.</li>
        <li>HU-011 (noviembre completo: S/ 19,300.00; e-1114 registrado el 03/12): ${a('P-030-gastos-del-mes.html', 'role=ana&month=2026-11&today=2026-12-04&now=10:30', 'P-030 con ?today=2026-12-04')}.</li>
      </ul></div>`;
  }

  return { KEY, MONTHS, CATS, CAT, RUC, SEED, session, save, all, get, resolve, firstOf, seedMatch, add, patch, nextId, byKey,
    hires, hire, HIRE_BADGE, winner, monthLabel, dt, day, kbText, DOC, notFoundView, scenarioControls };
})();
