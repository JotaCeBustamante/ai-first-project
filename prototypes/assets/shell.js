/* CondoHub · base compartida de los prototipos (no es código de producción).
   - CH.init(): arma la banda de controles, el escenario y el AppShell / AuthShell, y llama a render(ctx).
   - Navegación: cualquier elemento con data-go="P-0xx" (y data-params="id=r-8841") abre el
     prototipo de esa pantalla si existe (CH.PAGES); si no, muestra un destino simulado.
   - El rol elegido viaja entre prototipos con ?role=. Hoy es 04/11/2026 (America/Lima). */
window.CH = (function () {
  // Fecha simulada: 04/11/2026 por defecto. ?today=2026-11-20 la cambia y se recuerda en la sesión, para
  // reproducir los criterios que dicen "DADO QUE hoy es…" (HU-010, HU-010B, HU-002) sin cambiar los datos del caso.
  const TODAY = (function () {
    try {
      const q = new URLSearchParams(location.search).get('today');
      if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) sessionStorage.setItem('ch:today', q);
      return sessionStorage.getItem('ch:today') || '2026-11-04';
    } catch (e) { return '2026-11-04'; }
  })();
  // Hora simulada común (America/Lima). ?now=19:10 la cambia y se recuerda en la sesión (p. ej. F12 paso 4).
  const NOW = (function () {
    try {
      const q = new URLSearchParams(location.search).get('now');
      if (q && /^([01]\d|2[0-3]):[0-5]\d$/.test(q)) sessionStorage.setItem('ch:now', q);
      return sessionStorage.getItem('ch:now') || '10:30';
    } catch (e) { return '10:30'; }
  })();
  const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dayLabel = () => { const [y, m, d] = TODAY.split('-'); return DAY_NAMES[new Date(Date.UTC(+y, m - 1, +d)).getUTCDay()] + ' ' + d + '/' + m + '/' + y; };
  const nowStamp = () => TODAY + 'T' + NOW;
  // Franja semiabierta [inicio, fin): empezó desde el inicio (RN-083, RN-161); terminó desde el fin (RN-085)
  const hasStarted = r => (r.date + 'T' + r.start) <= nowStamp();
  const hasEnded = r => (r.date + 'T' + r.end) <= nowStamp();

  // Prototipos existentes: código → archivo
  const PAGES = {
    'P-001': 'P-001-iniciar-sesion.html',
    'P-002': 'P-002-verificar-codigo-mfa.html',
    'P-003': 'P-003-configurar-app-autenticadora.html',
    'P-004': 'P-004-codigos-de-recuperacion.html',
    'P-005': 'P-005-elegir-condominio.html',
    'P-006': 'P-006-activar-cuenta.html',
    'P-007': 'P-007-consentimiento.html',
    'P-010': 'P-010-inicio.html',
    'P-011': 'P-011-areas-comunes.html',
    'P-012': 'P-012-nueva-reserva.html',
    'P-013': 'P-013-reserva-confirmada.html',
    'P-014': 'P-014-mis-reservas.html',
    'P-015': 'P-015-detalle-reserva.html',
    'P-016': 'P-016-cancelar-reserva.html',
    'P-020': 'P-020-porteria.html',
    'P-030': 'P-030-gastos-del-mes.html',
    'P-031': 'P-031-detalle-de-gasto.html',
    'P-032': 'P-032-registrar-gasto.html',
    'P-033': 'P-033-anular-gasto.html',
    'P-034': 'P-034-vincular-gasto.html',
    'P-040': 'P-040-contrataciones.html',
    'P-041': 'P-041-expediente-contratacion.html',
    'P-042': 'P-042-crear-contratacion.html',
    'P-043': 'P-043-registrar-proveedor.html',
    'P-050': 'P-050-padron.html',
    'P-051': 'P-051-registrar-unidad.html',
    'P-052': 'P-052-detalle-unidad.html',
    'P-053': 'P-053-registrar-persona.html',
    'P-054': 'P-054-ficha-persona.html',
    'P-060': 'P-060-areas-comunes-admin.html',
    'P-061': 'P-061-configurar-area.html',
    'P-062': 'P-062-reservas-del-condominio.html'
  };

  // Inventario completo (09-ui-spec.md §1.1)
  const SCREENS = {
    'P-001': ['Iniciar sesión', '/sign-in'], 'P-002': ['Verificar código MFA', '/sign-in/mfa'],
    'P-003': ['Configurar la app autenticadora', '/sign-in/mfa/enroll'], 'P-004': ['Códigos de recuperación', '/sign-in/mfa/recovery-codes'],
    'P-005': ['Elegir condominio', '/sign-in/condominium'], 'P-006': ['Activar cuenta por invitación', '/invitations/{token}'],
    'P-007': ['Consentimiento informado', '/consent'], 'P-010': ['Inicio', '/'],
    'P-011': ['Áreas comunes', '/common-areas'], 'P-012': ['Nueva reserva', '/reservations/new'],
    'P-013': ['Reserva confirmada', '/reservations/{id}/confirmed'], 'P-014': ['Mis reservas', '/reservations'],
    'P-015': ['Detalle de reserva', '/reservations/{id}'], 'P-016': ['Cancelar reserva', '/reservations/{id}/cancel'],
    'P-020': ['Portería: reservas del día', '/concierge'], 'P-030': ['Gastos del mes', '/expenses?month=2026-11'],
    'P-031': ['Detalle de gasto', '/expenses/{id}'], 'P-032': ['Registrar gasto', '/expenses/new'],
    'P-033': ['Anular gasto', '/expenses/{id}/void'], 'P-034': ['Vincular gasto a una contratación', '/expenses/{id}/supplier-hire'],
    'P-040': ['Contrataciones', '/supplier-hires'], 'P-041': ['Expediente de contratación', '/supplier-hires/{id}'],
    'P-042': ['Crear o editar contratación', '/supplier-hires/new'], 'P-043': ['Registrar proveedor', '/vendors/new'],
    'P-050': ['Padrón: torres y unidades', '/registry'], 'P-051': ['Registrar unidad', '/registry/units/new'],
    'P-052': ['Detalle de unidad', '/registry/units/{id}'], 'P-053': ['Registrar persona y vínculo', '/registry/persons/new'],
    'P-054': ['Ficha de persona e invitación', '/registry/persons/{id}'], 'P-060': ['Áreas comunes (administración)', '/admin/common-areas'],
    'P-061': ['Configurar área común', '/admin/common-areas/{id}'], 'P-062': ['Reservas del condominio', '/admin/reservations'],
    'P-090': ['Acceso denegado', '(403)'], 'P-091': ['No encontrado', '(404)']
  };

  // Personas del caso. fin = canViewCondominiumFinancials (RN-015)
  const PERSONAS = {
    ana:     { name: 'Ana Quispe', first: 'Ana', label: 'Ana Quispe · Residente, propietaria A-502', resident: true, fin: true, units: ['A-502'] },
    carla:   { name: 'Carla Díaz', first: 'Carla', label: 'Carla Díaz · Residente, inquilina A-301', resident: true, fin: false, units: ['A-301'] },
    luis:    { name: 'Luis Rojas', first: 'Luis', label: 'Luis Rojas · Propietario no residente B-104', resident: true, fin: true, units: ['B-104'] },
    marco:   { name: 'Marco Salazar', first: 'Marco', label: 'Marco Salazar · Junta Directiva (sin vínculo)', board: true, fin: true, units: [] },
    rosa:    { name: 'Rosa Huamán', first: 'Rosa', label: 'Rosa Huamán · Administración', admin: true, fin: true, units: [] },
    rosaRes: { name: 'Rosa Huamán', first: 'Rosa', label: 'Rosa Huamán · Administración + propietaria C-201', admin: true, resident: true, fin: true, units: ['C-201'] },
    raul:    { name: 'Raúl Mendoza', first: 'Raúl', label: 'Raúl Mendoza · Portería', concierge: true, fin: false, units: [] }
  };

  // Datos ficticios compartidos (Residencial Los Olivos)
  const DATA = {
    condo: 'Residencial Los Olivos',
    areas: [
      { id: 'a-salon', name: 'Salón de fiestas', open: '09:00', close: '23:00', maxHours: '5 horas', capacity: 40, advanceDays: 90, perUnitMonth: 2 },
      { id: 'a-parrilla', name: 'Parrilla', open: '11:00', close: '22:00', maxHours: '4 horas', capacity: 15, advanceDays: 30, perUnitMonth: 4 }
    ],
    // status: Confirmed | Cancelled | Completed. cancelledBy: 'admin' | 'host'
    reservations: [
      { id: 'r-8790', area: 'Parrilla', unit: 'A-502', host: 'Ana Quispe', date: '2026-11-22', start: '12:00', end: '16:00', status: 'Confirmed', unitPeople: 3, guests: ['Lucía Ramos', 'Jorge Quispe', 'Milagros Torres', 'Diego Huerta', 'Valeria Soto', 'Andrés Paz'] },
      { id: 'r-8841', area: 'Salón de fiestas', unit: 'A-502', host: 'Ana Quispe', date: '2026-12-12', start: '19:00', end: '23:00', status: 'Confirmed', unitPeople: 2, guestsCount: 28 },
      { id: 'r-8902', area: 'Parrilla', unit: 'A-502', host: 'Ana Quispe', date: '2026-12-06', start: '13:00', end: '17:00', status: 'Confirmed', unitPeople: 4, guests: [] },
      { id: 'r-8815', area: 'Salón de fiestas', unit: 'A-502', host: 'Ana Quispe', date: '2026-11-28', start: '18:00', end: '22:00', status: 'Cancelled', cancelledBy: 'admin', cancelledAt: '2026-11-03 16:40' },
      { id: 'r-8644', area: 'Parrilla', unit: 'A-502', host: 'Ana Quispe', date: '2026-10-18', start: '12:00', end: '16:00', status: 'Completed', unitPeople: 3, guestsCount: 9 },
      { id: 'r-8933', area: 'Salón de fiestas', unit: 'A-301', host: 'Carla Díaz', date: '2026-12-20', start: '15:00', end: '20:00', status: 'Confirmed', unitPeople: 2, guestsCount: 18 },
      { id: 'r-8760', area: 'Parrilla', unit: 'A-301', host: 'Carla Díaz', date: '2026-11-15', start: '12:00', end: '16:00', status: 'Cancelled', cancelledBy: 'admin', cancelledAt: '2026-11-02 10:15' },
      { id: 'r-8955', area: 'Parrilla', unit: 'B-104', host: 'Luis Rojas', date: '2026-12-06', start: '17:00', end: '21:00', status: 'Confirmed', unitPeople: 2, guestsCount: 7 },
      // Reservas de hoy (portería, Reservas de hoy del Administrator)
      { id: 'r-8971', area: 'Parrilla', unit: 'B-302', host: 'Sofía Paredes', date: '2026-11-04', start: '12:00', end: '16:00', status: 'Confirmed', unitPeople: 2, guests: ['Martín Chávez', 'Elena Vílchez', 'Rodrigo Salas', 'Camila Ñique'] },
      { id: 'r-8972', area: 'Salón de fiestas', unit: 'A-502', host: 'Ana Quispe', date: '2026-11-04', start: '19:00', end: '23:00', status: 'Confirmed', unitPeople: 2, guests: ['Pedro Ramos', 'Carmen Ruiz', 'José Ccahuana', 'Rosa Llanos', 'Fernando Alva', 'Gabriela Inga', 'Hugo Tapia', 'Inés Rivas'] },
      { id: 'r-8973', area: 'Parrilla', unit: 'C-110', host: 'Javier Cárdenas', date: '2026-11-04', start: '17:00', end: '21:00', status: 'Confirmed', unitPeople: 3, guests: ['Paola Mendoza', 'Ricardo Lazo'] }
    ],
    // Contrataciones (P-010 contador, P-040, P-041). Exactamente 1 Submitted. Estado de sesión en 'hires-v1'
    hires: [
    { id: 'h-101', title: 'Pintura de fachada', status: 'Submitted', created: '2026-10-20', submitted: '2026-11-02',
      justification: 'Se elige Pinturas Lima SAC por menor precio (S/ 2,500.00 menos) y 3 años de garantía frente a 1',
      quotes: [{ id: 'q-1011', supplier: 'Pinturas Lima SAC', ruc: '20512345678', amount: 18500, doc: 'cotizacion-pinturas-lima-sac.pdf' },
               { id: 'q-1012', supplier: 'Color Perú EIRL', ruc: '20587654321', amount: 21000, doc: 'cotizacion-color-peru-eirl.pdf' }],
      history: [{ decision: 'Rejected', at: '2026-10-29T20:15', reason: 'Falta la garantía por escrito de Pinturas Lima SAC' }] },
    { id: 'h-098', title: 'Mantenimiento de ascensores', status: 'Approved', created: '2026-10-08', submitted: '2026-10-14', decided: '2026-10-20',
      justification: 'Se elige Ascensores Andinos SAC porque tiene el menor precio, es representante autorizado del fabricante y atiende emergencias en 2 horas.',
      quotes: [{ id: 'q-0981', supplier: 'Ascensores Andinos SAC', ruc: '20498765432', amount: 4800, doc: 'cotizacion-ascensores-andinos.pdf' },
               { id: 'q-0982', supplier: 'Elevadores del Pacífico SAC', ruc: '20545678901', amount: 5350, doc: 'cotizacion-elevadores-pacifico.pdf' },
               { id: 'q-0983', supplier: 'TecnoLift EIRL', ruc: '20601234567', amount: 5900, doc: null }],
      history: [{ decision: 'Approved', at: '2026-10-20T19:40' }] },
    { id: 'h-092', title: 'Cámaras de seguridad Torre B', status: 'Approved', created: '2026-09-22', submitted: '2026-10-01', decided: '2026-10-06',
      justification: 'Se elige Vigilancia Total SAC: incluye 8 cámaras con visión nocturna, instalación y cableado, y cuesta S/ 1,150.00 menos.',
      quotes: [{ id: 'q-0921', supplier: 'Vigilancia Total SAC', ruc: '20533445566', amount: 6250, doc: 'cotizacion-vigilancia-total.pdf' },
               { id: 'q-0922', supplier: 'Seguridad Integral del Sur SAC', ruc: '20577889900', amount: 7400, doc: 'cotizacion-seguridad-integral.pdf' }],
      history: [{ decision: 'Rejected', at: '2026-09-30T19:05', reason: 'La cotización de Vigilancia Total SAC no incluye el cableado' },
                { decision: 'Approved', at: '2026-10-06T20:30' }] },
    { id: 'h-104', title: 'Impermeabilización de azotea Torre A', status: 'Draft', created: '2026-11-03',
      justification: 'Filtraciones en A-901',
      quotes: [{ id: 'q-1041', supplier: 'Techos Seguros SAC', ruc: '20556677889', amount: 9800, doc: 'cotizacion-techos-seguros.pdf' }],
      history: [] },
    { id: 'h-105', title: 'Mantenimiento de jardines 2027', status: 'Draft', created: '2026-10-30',
      justification: 'Se elige a Juan Pérez Gálvez por menor precio mensual y porque incluye la reposición de plantas sin costo adicional.',
      quotes: [{ id: 'q-1051', supplier: 'Juan Pérez Gálvez', ruc: '10456789012', amount: 1200, doc: 'cotizacion-juan-perez.pdf', natural: true },
               { id: 'q-1052', supplier: 'Jardines Verdes SAC', ruc: '20522334455', amount: 1450, doc: 'cotizacion-jardines-verdes.pdf' }],
      history: [] }
    ]
  };

  const ICON = {
    warn: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 1 18h18L10 2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    ok: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="m6 10 3 3 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    err: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 5.5v5.5M10 13.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9v5M10 6v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    cal: '<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="10" width="36" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M6 19h36M16 6v8M32 6v8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    doc: '<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><path d="M12 6h17l9 9v27H12z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M29 6v9h9M18 26h12M18 33h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    big: '<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="3"/><path d="M24 13v14M24 33v1" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };

  // ---------- Helpers de formato (§3.0.5) ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = d => { const [y, m, dd] = d.split('-'); return `${dd}/${m}/${y}`; };
  const timeTag = r => `<time datetime="${r.date}T${r.start}:00-05:00" class="tnum">${fmtDate(r.date)} · ${r.start} – ${r.end}</time>`;
  const money = n => 'S/ ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const badge = (kind, text) => `<span class="badge badge-${kind}">${text}</span>`;
  const RES_BADGE = { Confirmed: ['success', 'Confirmada'], Cancelled: ['danger', 'Cancelada'], Completed: ['neutral', 'Realizada'] };
  const resBadge = s => badge(RES_BADGE[s][0], RES_BADGE[s][1]);
  const rn = t => t ? `<span class="rn">${t}</span>` : '';
  const alert = (kind, title, body, role) => `<div class="alert alert-${kind}"${role ? ` role="${role}"` : ''}${role === 'alert' ? ' tabindex="-1"' : ''}>${ICON[{ warning: 'warn', success: 'ok', danger: 'err', info: 'info' }[kind]]}<div class="alert-body"><p class="alert-title">${title}</p>${body || ''}</div></div>`;
  const fieldError = t => `<p class="field-error">${ICON.err}<span>${t}</span></p>`;
  const reservation = id => DATA.reservations.find(r => r.id === id);
  const params = () => new URLSearchParams(location.search);
  const store = {
    get(k) { try { return sessionStorage.getItem('ch:' + k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem('ch:' + k, v); } catch (e) { } }
  };

  // ---------- Reservas de la sesión ----------
  // Lo que se crea (P-012) o cambia (P-016 cancela) se guarda en 'res-session-v1' y se aplica a
  // DATA.reservations al cargar cada prototipo, así P-010, P-014, P-015, P-020 y P-062 lo ven.
  const RES_KEY = 'res-session-v1';
  const resSession = () => { try { const s = JSON.parse(store.get(RES_KEY)); if (s && s.added && s.patch) return s; } catch (e) { } return { added: [], patch: {} }; };
  (function applyResSession() {
    const s = resSession();
    DATA.reservations = DATA.reservations.filter(r => !s.added.some(a => a.id === r.id))
      .map(r => s.patch[r.id] ? Object.assign({}, r, s.patch[r.id]) : r)
      .concat(s.added.map(r => s.patch[r.id] ? Object.assign({}, r, s.patch[r.id]) : r));
  })();
  // Configuración de áreas guardada en P-061 ('areas-v1', en segundos) → DATA.areas, para P-011 y P-012 (HU-004)
  // Las reservas del caso guardan el nombre del área; si el área se renombra, AREA_ALIAS lleva el nombre viejo al nuevo
  // (en el sistema real la reserva apunta al id del área, RN-024 / RN-162).
  const AREA_ALIAS = {};
  (function applyAreasSession() {
    try {
      const s = JSON.parse(store.get('areas-v1')); if (!s || !Array.isArray(s.areas)) return;
      DATA.areas = s.areas.map(a => {
        const m = Math.round(a.maxDurationSeconds / 60), prev = DATA.areas.find(x => x.id === a.id);
        if (prev && prev.name !== a.name) AREA_ALIAS[prev.name] = a.name;
        return Object.assign({}, prev || {}, {
          id: a.id, name: a.name, open: a.open, close: a.close, capacity: a.capacity, perUnitMonth: a.perUnitMonth,
          maxMinutes: m, maxHours: m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} horas`,
          advanceSeconds: a.maxAdvanceSeconds, advanceDays: Math.floor(a.maxAdvanceSeconds / 86400)
        });
      });
      DATA.reservations.forEach(r => { if (AREA_ALIAS[r.area]) r.area = AREA_ALIAS[r.area]; });
    } catch (e) { }
  })();
  const areaAlias = n => AREA_ALIAS[n] || n;

  // Agrega o reemplaza una reserva creada en la sesión
  function saveReservation(r) {
    const s = resSession(); s.added = s.added.filter(a => a.id !== r.id).concat([r]);
    store.set(RES_KEY, JSON.stringify(s));
    DATA.reservations = DATA.reservations.filter(x => x.id !== r.id).concat([r]);
  }
  // Cambia campos de una reserva (p. ej. { status:'Cancelled', cancelledBy:'admin', cancelledAt:'2026-11-04 10:45' })
  function patchReservation(id, patch) {
    const s = resSession(); s.patch[id] = Object.assign({}, s.patch[id], patch);
    store.set(RES_KEY, JSON.stringify(s));
    DATA.reservations = DATA.reservations.map(r => r.id === id ? Object.assign({}, r, patch) : r);
  }
  function resetSession() { store.set(RES_KEY, ''); store.set('hires-v1', ''); store.set(CONSENT_KEY, ''); store.set('now', ''); store.set('today', ''); store.set('suppliers-v1', ''); store.set('exp-session-v1', ''); store.set('areas-v1', ''); store.set('invitations-used-v1', ''); store.set('registry-v1', ''); }

  // ---------- Puerta de consentimiento (RN-010, RN-070; §3.0.4) ----------
  // "No acepto" en P-007 deja a la persona con el consentimiento pendiente: toda pantalla de la app redirige a P-007.
  const CONSENT_KEY = 'consent-pending-v1';
  const pendingList = () => { try { return JSON.parse(store.get(CONSENT_KEY)) || []; } catch (e) { return []; } };
  const consentPending = k => pendingList().includes(k);
  function setConsentPending(k, on) {
    const l = pendingList().filter(x => x !== k); if (on) l.push(k);
    store.set(CONSENT_KEY, JSON.stringify(l));
  }

  // ---------- Menú por rol (§5) ----------
  function menuItems(p) {
    if (p.concierge) return [['Portería', 'P-020']];
    const items = [['Inicio', 'P-010']];
    if (p.resident) items.push(['Reservar', 'P-011'], ['Mis reservas', 'P-014']);
    if (p.fin) items.push(['Gastos', 'P-030'], ['Contrataciones', 'P-040']);
    if (p.admin) items.push(['Padrón', 'P-050'], ['Áreas comunes', 'P-060'], ['Reservas del condominio', 'P-062']);
    return items;
  }

  let cfg = null, ctx = null, savedMain = null;
  const $ = s => document.querySelector(s);

  function protoBand() {
    const roles = cfg.roles.map(k => `<option value="${k}">${PERSONAS[k].label}</option>`).join('');
    const states = cfg.states.map(([v, t], i) => `<input type="radio" name="ch-st" id="ch-st-${v}" value="${v}"${i === 0 ? ' checked' : ''}><label for="ch-st-${v}">${t}</label>`).join('');
    return `<section class="proto" aria-label="Controles del prototipo"><div class="proto-inner">
      <div class="proto-title"><strong>${cfg.code} · ${cfg.title}</strong><span>Prototipo para validar con stakeholders · esta banda no es parte de la pantalla</span><a href="index.html">Índice de prototipos</a><button class="proto-btn" type="button" data-ch-reset title="Borra reservas, cancelaciones y decisiones hechas en esta sesión">Reiniciar datos</button></div>
      ${cfg.roles.length > 1 ? `<div><label for="ch-role">${cfg.roleLabel || 'Sesión como'}</label><select id="ch-role">${roles}</select></div>` : ''}
      <fieldset><legend>Estado de la pantalla</legend><div class="seg">${states}</div></fieldset>
      <fieldset><legend>Vista</legend><div class="seg">
        <input type="radio" name="ch-vw" id="ch-vw-auto" value="auto" checked><label for="ch-vw-auto">Ancho real</label>
        <input type="radio" name="ch-vw" id="ch-vw-mob" value="mobile"><label for="ch-vw-mob">Móvil 390 px</label></div></fieldset>
      <div><label class="chk" for="ch-notes"><input type="checkbox" id="ch-notes"> Mostrar reglas (RN)</label>${cfg.extraControls || ''}</div>
    </div></section>`;
  }

  function appShell() {
    return `<div class="shell" id="ch-shell">
      <a class="skip" href="#main">Saltar al contenido</a>
      <header class="topbar"><div class="topbar-row"><a class="logo" href="#" data-go="home">CondoHub</a>
        <details class="nav-menu" id="ch-mnav"><summary>${ICON.menu}Menú</summary></details></div>
        <div class="condo">${DATA.condo}</div>
        <nav aria-label="Principal" class="nav-mobile" id="ch-navm-wrap" hidden><ul class="navlist" id="ch-navm"></ul></nav></header>
      <aside class="sidebar"><a class="logo" href="#" data-go="home">CondoHub</a><nav aria-label="Principal"><ul class="navlist" id="ch-navd"></ul></nav></aside>
      <div class="deskhead"><span class="condo">${DATA.condo}</span><button class="btn btn-secondary btn-sm" type="button" data-go="signout">Cerrar sesión</button></div>
      <main id="main" tabindex="-1"></main>
      <footer>CondoHub · v0.2 prototipo</footer></div>`;
  }

  function authShell() {
    return `<div class="auth" id="ch-shell"><a class="skip" href="#main">Saltar al contenido</a><span class="logo">CondoHub</span><main id="main" tabindex="-1" class="auth-card"></main></div>`;
  }

  function renderMenu() {
    if (cfg.shell === 'auth') return;
    const p = ctx.persona;
    const counts = cfg.menuCounts ? cfg.menuCounts(ctx) : {};
    const active = typeof cfg.active === 'function' ? cfg.active(ctx) : (cfg.active || cfg.code);
    const li = menuItems(p).map(([t, c]) => {
      const cur = c === active ? ' aria-current="page"' : '';
      const n = counts[c];
      return `<li><a href="#" data-go="${c}"${cur}><span>${t}</span>${n != null ? `<span class="navcount tnum">${n}</span>` : ''}</a></li>`;
    }).join('') + `<li class="signout-sep"><button type="button" data-go="signout">Cerrar sesión</button></li>`;
    $('#ch-navd').innerHTML = li; $('#ch-navm').innerHTML = li;
  }

  function render(focusMain) {
    savedMain = null;
    const route = typeof cfg.route === 'function' ? cfg.route(ctx) : (cfg.route || SCREENS[cfg.code][1]);
    $('#ch-cap').innerHTML = `<span>${ctx.persona ? ctx.persona.label : ''}</span><span class="tnum">Ruta: <code>${esc(route)}</code> · ${dayLabel()} ${NOW}, America/Lima</span>`;
    $('#ch-shell').classList.toggle('show-notes', $('#ch-notes').checked);
    renderMenu();
    const main = $('#main');
    main.innerHTML = cfg.render(ctx) || '';
    document.title = (ctx.title || cfg.title) + ' · CondoHub';
    const err = main.querySelector('[role="alert"][tabindex="-1"]');
    if (err) err.focus(); else if (focusMain) main.focus();
    if (cfg.afterRender) cfg.afterRender(ctx);
  }

  function simulate(code, extra) {
    const [t, route] = SCREENS[code] || [code, ''];
    const main = $('#main');
    if (savedMain == null) savedMain = main.innerHTML;
    main.innerHTML = `<div class="content"><div class="dest"><p class="sec-label">Navegación simulada</p>
      <h1 class="page">${code} · ${t}</h1>
      <p style="margin:0">En la aplicación real se abriría <code>${esc(route)}</code>${extra ? ' ' + extra : ''}. Esta pantalla aún no tiene prototipo.</p>
      <button class="btn btn-primary" type="button" data-ch-back>← Volver</button></div></div>`;
    main.focus();
  }

  // ---------- returnUrl (09-ui-spec.md §3.1) ----------
  // Las pantallas de acceso (P-001 a P-007) propagan returnUrl hasta crear la sesión.
  const AUTH_CHAIN = ['P-001', 'P-002', 'P-003', 'P-004', 'P-005', 'P-007'];
  // Ruta local → { code, params } según el inventario; acepta {id}/{token}. Rechaza URLs absolutas o "//host".
  function resolveRoute(url) {
    if (!url || !/^\/(?![\/\\])/.test(url)) return null;
    const [path, query] = url.split('?');
    const routes = Object.keys(SCREENS).map(c => [c, SCREENS[c][1].split('?')[0]]).filter(([, r]) => r.startsWith('/'));
    for (const literal of [true, false]) for (const [code, r] of routes) {
      if (r.includes('{') === literal) continue;
      const names = [];
      const m = path.match(new RegExp('^' + r.replace(/\{(\w+)\}/g, (_, n) => { names.push(n); return '([^/]+)'; }) + '$'));
      if (!m) continue;
      const q = new URLSearchParams(query || '');
      names.forEach((n, i) => q.set(n, decodeURIComponent(m[i + 1])));
      return { code, params: q.toString() };
    }
    return null;
  }
  // Sesión creada (nextStep = SignedIn): consentimiento pendiente → P-007; Concierge → P-020; si no, returnUrl válido o P-010
  function finishSignIn() {
    if (cfg.code !== 'P-007' && consentPending(ctx.roleKey)) return go('P-007');
    if (ctx.persona && ctx.persona.concierge) return go('P-020');
    const r = resolveRoute(params().get('returnUrl'));
    if (r && !AUTH_CHAIN.includes(r.code)) return go(r.code, r.params);
    go('P-010');
  }

  function go(code, extraParams) {
    if (code === 'home') code = ctx.persona && ctx.persona.concierge ? 'P-020' : 'P-010';
    if (code === 'signout') code = 'P-001';
    const ret = params().get('returnUrl');
    if (ret && AUTH_CHAIN.includes(code) && AUTH_CHAIN.includes(cfg.code)) {
      const q = new URLSearchParams(extraParams || '');
      if (!q.has('returnUrl')) { q.set('returnUrl', ret); extraParams = q.toString(); }
    }
    if (PAGES[code]) {
      const q = new URLSearchParams(extraParams || '');
      if (ctx.roleKey && code !== 'P-001') q.set('role', ctx.roleKey);
      location.href = PAGES[code] + (q.toString() ? '?' + q : '');
    } else simulate(code, extraParams ? `(<code>${esc(extraParams)}</code>)` : '');
  }

  /* opts: { code, title, shell:'app'|'auth', active, roles:[keys], states:[[value,label]],
             extraControls, route, render(ctx) → html, afterRender(ctx), menuCounts(ctx) → {code:n} }
     ctx: { roleKey, persona, state, params, title, rerender(), go(), data:{} (estado propio de la página) } */
  function init(opts) {
    cfg = Object.assign({ shell: 'app', states: [['data', 'Con datos'], ['empty', 'Vacío'], ['loading', 'Cargando'], ['error', 'Error']] }, opts);
    const p = params();
    let roleKey = p.get('role');
    if (!cfg.roles.includes(roleKey)) roleKey = cfg.roles[0];
    ctx = { roleKey, persona: PERSONAS[roleKey], state: cfg.states[0][0], params: p, data: {}, rerender: f => render(f), go };

    document.body.insertAdjacentHTML('afterbegin', protoBand() +
      `<div class="stage"><p class="frame-cap" id="ch-cap"></p><div class="frame" id="ch-frame">${cfg.shell === 'auth' ? authShell() : appShell()}</div></div>`);
    if ($('#ch-role')) $('#ch-role').value = roleKey;
    if (store.get('view') === 'mobile') { $('#ch-vw-mob').checked = true; $('#ch-frame').classList.add('mobile'); }
    if (store.get('notes') === '1') $('#ch-notes').checked = true;
    const st = p.get('state'); if (st && $('#ch-st-' + st)) { $('#ch-st-' + st).checked = true; ctx.state = st; }

    document.addEventListener('change', e => {
      const t = e.target;
      if (t.id === 'ch-role') { ctx.roleKey = t.value; ctx.persona = PERSONAS[t.value]; ctx.data = {}; render(); }
      else if (t.name === 'ch-st') { ctx.state = t.value; ctx.data = {}; render(); }
      else if (t.name === 'ch-vw') { $('#ch-frame').classList.toggle('mobile', t.value === 'mobile'); store.set('view', t.value); }
      else if (t.id === 'ch-notes') { $('#ch-shell').classList.toggle('show-notes', t.checked); store.set('notes', t.checked ? '1' : '0'); }
    });
    document.addEventListener('click', e => {
      if (e.target.closest('[data-ch-reset]')) { resetSession(); location.reload(); return; }
      const back = e.target.closest('[data-ch-back]');
      if (back) { e.preventDefault(); if (savedMain != null) { $('#main').innerHTML = savedMain; savedMain = null; } else render(); return; }
      const a = e.target.closest('[data-go]');
      if (!a) return;
      e.preventDefault();
      if ($('#ch-mnav')) { $('#ch-mnav').open = false; $('#ch-navm-wrap').hidden = true; }
      go(a.dataset.go, a.dataset.params);
    });
    if ($('#ch-mnav')) $('#ch-mnav').addEventListener('toggle', () => { $('#ch-navm-wrap').hidden = !$('#ch-mnav').open; });
    render();
    // RN-010: con el consentimiento pendiente, toda pantalla de la app redirige a P-007 con returnUrl
    if (cfg.shell === 'app' && consentPending(roleKey)) {
      const route = typeof cfg.route === 'function' ? cfg.route(ctx) : (cfg.route || SCREENS[cfg.code][1]);
      go('P-007', route.startsWith('/') && !route.includes('{') ? 'returnUrl=' + encodeURIComponent(route) : '');
    }
    return ctx;
  }

  // Estados comunes reutilizables (§3.0.4)
  function loadingView(note) {
    const b = (w, h) => `<div class="sk" style="width:${w};height:${h}px"></div>`;
    return `<div class="content" aria-busy="true">
      <p class="rn always">${note || 'SSR: el servidor entrega la página completa. Este estado solo se ve con la mejora JS opcional o con red lenta.'}</p>
      <p class="sr-only" role="status">Cargando…</p>${b('14rem', 36)}${b('100%', 96)}
      <div style="display:flex;flex-direction:column;gap:12px">${b('16rem', 30)}${b('100%', 56)}${b('100%', 56)}${b('11rem', 48)}</div></div>`;
  }
  function errorView() {
    return `<div class="content"><div class="page-state">${ICON.big}<h1 class="page">Algo salió mal</h1>
      <p style="margin:0">Algo salió mal. Inténtalo de nuevo en unos minutos.</p>
      <p class="muted">Si el problema continúa, comparte este código con la administración: <span class="trace">00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01</span></p>
      <a href="#" class="btn btn-primary btn-block" data-go="home">Ir al inicio</a>${rn('§3.0.4 · error inesperado 500 con traceId')}</div></div>`;
  }
  function deniedView() {
    return `<div class="content read"><div class="page-state">${ICON.big}<h1 class="page">No tienes acceso a esta página</h1>
      <p style="margin:0">Tu cuenta no tiene permiso para ver esta información en ${DATA.condo}.</p>
      <a href="#" class="btn btn-primary btn-block" data-go="home">Ir al inicio</a>${rn('P-090 · 403')}</div></div>`;
  }
  // 🧩 JS opcional: botón principal a "Enviando…" (§3.0.4)
  function sending(btn, ms, done) {
    if (btn.getAttribute('aria-disabled') === 'true') return;
    btn.setAttribute('aria-disabled', 'true'); btn.dataset.label = btn.textContent; btn.textContent = 'Enviando…';
    setTimeout(done, ms || 700);
  }

  return { TODAY, NOW, nowStamp, areaAlias, hasStarted, hasEnded, consentPending, setConsentPending, PAGES, SCREENS, PERSONAS, DATA, ICON, esc, fmtDate, timeTag, money, badge, resBadge, rn, alert, fieldError,
    reservation, saveReservation, patchReservation, resetSession, params, store, init, go, simulate, resolveRoute, finishSignIn, loadingView, errorView, deniedView, sending, menuItems };
})();
