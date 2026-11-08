# CondoHub — Glosario (lenguaje ubicuo)

> **Fase:** Planificación (Agente Analyst, BMAD)
> **Fecha:** 2026-11-01
> **Última actualización:** 2026-11-08 (auditoría del Spec Finalizer: identificadores sincronizados con el modelo de datos de [07-architecture.md](07-architecture.md) §3.3 y sección "Términos técnicos"; Q99). Antes: 2026-11-02 (auditoría QA y segunda reauditoría)
> **Autor:** Jose Bustamante
> **Documentos relacionados:** [00-constitucion.md](00-constitucion.md) · [02-alcance.md](02-alcance.md) · [03-reglas-de-negocio.md](03-reglas-de-negocio.md) · [05-preguntas-abiertas.md](05-preguntas-abiertas.md) · [auditoria-qa.md](auditoria-qa/auditoria-qa.md) · [ADR-0001](docs/adr/0001-occupancy-type-instead-of-tenant-role.md)

**Cómo usar este glosario.** Cada término tiene un nombre en español, que es el que ve el usuario y el que usan los documentos de negocio, y un identificador en inglés, que es el que usa el código (PRINCIPIO-001). Si un término no está aquí, no se inventa un sinónimo: se agrega primero al glosario.

**Estado del identificador.**
- **Fijado:** viene de la constitución, de un ADR aceptado o del modelo de datos aprobado de [07-architecture.md](07-architecture.md) §3.3. Solo se cambia mediante un ADR.
- **Propuesto:** lo propone este glosario y puede ajustarse en el diseño técnico.

**Referencias a la auditoría.** Los códigos como "A-02" o "C-03" remiten al hallazgo y a la decisión correspondiente en [auditoria-qa.md](auditoria-qa/auditoria-qa.md).

---

## ⚠️ Ambigüedad crítica: "tenant"

En inglés, *tenant* tiene dos significados en CondoHub, y no deben mezclarse:

| Significado | Término en español | Identificador | Ejemplo |
|---|---|---|---|
| Cliente aislado de la plataforma multi-tenant | Condominio | `Condominium`, `CondominiumId` | "Aislamiento entre condominios" (PRINCIPIO-003) |
| Persona que alquila una unidad | Inquilino | `OccupancyType.Tenant` | "Carla es `Tenant` de A-301" |

En el código, el aislamiento multi-tenant se nombra siempre con `Condominium`, nunca con `Tenant`. Así, `Tenant` en el código significa únicamente inquilino.

## ⚠️ Ambigüedad: "supplier"

*Supplier* también tiene dos significados posibles, y no deben mezclarse (M-24):

| Significado | Término en español | Identificador | Ejemplo |
|---|---|---|---|
| Rol de usuario definido en la constitución (PRINCIPIO-006), sin uso en esta versión (W6) | Proveedor con acceso | `Supplier` (rol) | Ninguno en esta versión |
| Empresa o persona registrada como dato dentro de una contratación | Proveedor | `Vendor` | "Pinturas Lima SAC cotizó la pintura de fachada" |

En el código, la entidad proveedor se nombra siempre `Vendor`. Así, `Supplier` en el código significa únicamente el rol.

---

## Términos

| # | Término | Identificador | Estado | Definición | No confundir con |
|---|---|---|---|---|---|
| 1 | **Condominio** | `Condominium` | Fijado | Conjunto de 1 a 4 torres gestionado por una empresa administradora. Es la unidad de aislamiento de datos: todo dato de un condominio lleva su `CondominiumId` (PRINCIPIO-003). | "Edificio": un condominio puede tener varias torres |
| 2 | **Torre** | `Tower` | Propuesto | Edificio dentro de un condominio, de hasta 20 pisos. | Condominio |
| 3 | **Unidad** | `Unit` | Fijado | Departamento identificado por su torre y su número, por ejemplo A-502. El número tiene 3 o 4 dígitos (piso + número, M-19) y solo es único dentro de la torre (RN-003). | Persona: una unidad puede tener varias personas vinculadas |
| 4 | **Padrón del condominio** | `CondominiumRegistry` | Propuesto | Registro de torres, unidades, personas y vínculos de ocupación que mantiene el Administrator (M1). Antes del consentimiento solo contiene los datos mínimos para invitar: nombre, correo y vínculo (C-02). | Directorio de vecinos, que está prohibido (W8) |
| 5 | **Persona** | `Person` | Fijado | Ficha de un ser humano en el padrón de **un** condominio, tenga o no cuenta de usuario. La misma persona tiene una ficha por cada condominio. Al aceptar una invitación, la ficha se une a la cuenta de usuario de su correo (RN-122). Si la persona vuelve antes de que venza su plazo de retención, se reutiliza su ficha (RN-132); si vuelve después de archivada, se le crea una ficha nueva sin restaurar los datos archivados (RN-135, R2-A05). Solo el titular registra y edita su DNI o carné de extranjería y su teléfono, que son opcionales (RN-145 a RN-150, R2-A11). | Usuario: no toda persona tiene cuenta |
| 6 | **Vínculo de ocupación** | `UnitOccupancy` | Fijado | Relación con fechas entre una persona y una unidad. `EndDate` es **inclusiva**: es el último día del vínculo. Está **activo** mientras su `StartDate` es menor o igual que la fecha actual y su `EndDate` es nula o mayor o igual que la fecha actual, ambas en la zona `America/Lima`. Se pueden registrar una `StartDate` y una `EndDate` futuras: un vínculo con `StartDate` futura todavía no está activo (A-02, RQ-A03). | Rol: el vínculo depende de la unidad; el rol se asigna por condominio |
| 7 | **Tipo de ocupación** | `OccupancyType` | Fijado | Atributo del vínculo con valor `Owner` (propietario) o `Tenant` (inquilino). Decide el acceso financiero (ADR-0001). | Rol |
| 8 | **Propietario** | `OccupancyType.Owner` | Fijado | Persona con un vínculo `Owner` activo con una unidad. Ve la información financiera. Votará cuando existan las consultas (C2) o las votaciones formales (W3), que no están en el MVP (M-24). | Propietario no residente, que es un rol |
| 9 | **Inquilino** | `OccupancyType.Tenant` | Fijado | Persona con un vínculo `Tenant` activo. Reserva áreas comunes y reporta averías, pero no ve información financiera ni el estado de cuenta, y no vota. Si una unidad tiene un inquilino activo, solo él reserva a nombre de esa unidad (M-10). | Tenant en el sentido de multi-tenancy (ver arriba) |
| 10 | **Residente** | `Resident` (rol) | Fijado | Rol de quien declara vivir en el condominio, sea propietario o inquilino. El sistema no verifica la residencia (A-10). Su acceso financiero depende de su tipo de ocupación. | Propietario: no todo residente es propietario |
| 11 | **Propietario no residente** | `NonResidentOwner` (rol) | Fijado | Rol de quien es dueño de una unidad sin vivir en el condominio. Solo puede tener vínculos `Owner`. | Inquilino |
| 12 | **Administrador** | `Administrator` (rol) | Fijado | Rol de la empresa administradora contratada por los propietarios. Mantiene el padrón, configura áreas, registra gastos y contrataciones. Requiere MFA. Su primera invitación y su revocación las hace el proceso de plataforma (C-05, C-06). | Junta Directiva |
| 13 | **Junta Directiva** | `BoardMember` (rol) | Fijado | Rol de los propietarios elegidos para supervisar la gestión. Aprueba o rechaza contrataciones (M6). Requiere MFA. Lo asigna el proceso de plataforma a pedido de la Junta Directiva, no el Administrator, y no puede coincidir con el rol Administrator en el mismo usuario y condominio (A-10). | Junta de Propietarios |
| 14 | **Junta de Propietarios** | — | — | Asamblea de todos los propietarios, regulada por la Ley N.° 27157. Sus acuerdos formales no se toman en CondoHub en esta versión (W3). | Junta Directiva |
| 15 | **Conserje** | `Concierge` (rol) | Fijado | Rol del personal de portería. Ve las reservas confirmadas del día y marca el ingreso de invitados (M4). | Administrador |
| 16 | **Proveedor** | `Vendor` (rutas `/api/vendors` y `/vendors/new`; códigos `VENDOR_*`) | Fijado | Empresa o persona que presta un servicio al condominio. En esta versión es un dato dentro de una contratación y no tiene cuenta de usuario (W6, RN-042). Si es persona natural (RUC 10), su nombre y su RUC son datos personales y se cifran (M-21); su retención está abierta (Q34). | El rol `Supplier` (ver "Ambigüedad: supplier") |
| 17 | **Invitación** | `Invitation` | Fijado | Enlace para que una persona cree su cuenta. La emite el Administrator o, para el primer Administrator, el proceso de plataforma (RN-007, C-05). Su vencimiento sigue OWASP ASVS 4.0 nivel 2 (M-16). | Invitado |
| 18 | **Consentimiento informado** | `ConsentVersion` (texto versionado) y `ConsentAcceptance` (decisión por persona y condominio) | Fijado | Aceptación del titular, con versión y fecha, del tratamiento de sus datos y de su transferencia internacional a EE. UU. (PRINCIPIO-004.1). La versión **vigente** es la última publicada; cada versión nueva debe aceptarse en el siguiente inicio de sesión. Se registra por ficha `Person`, es decir, por condominio, no por cuenta `User` (R2-A04, ⚠️ Q18). Si se rechaza, la cuenta no se activa (A-15). La revocación está abierta (Q32). | Consentimiento biométrico, que es separado y está fuera de alcance (W4) |
| 19 | **Información financiera** | `CanViewCondominiumFinancials` (política) | Fijado | Gastos y contrataciones del condominio: cada gasto con su comprobante y el expediente completo de cada contratación, sin datos de residentes ni de unidades específicas (C-03). Acceden Administrator, BoardMember, y Resident o NonResidentOwner con un vínculo `Owner` activo en el condominio actual (RQ-A02). La política se evalúa contra la base de datos en cada solicitud (A-03). En las reglas, "usuario con acceso financiero" significa "usuario que cumple esta política" (B-01). | Estado de cuenta, que es individual |
| 20 | **Área común** | `CommonArea` | Fijado | Espacio compartido que se puede reservar, como el salón de fiestas o la parrilla. | Unidad |
| 21 | **Reglas del área** | Columnas de `CommonArea`: `OpensAt`, `ClosesAt`, `MaxDurationSeconds`, `Capacity`, `MaxAdvanceSeconds`, `MaxReservationsPerUnitPerMonth` | Fijado | Valores que configura el Administrator para un área común: **horario** (apertura y cierre en el mismo día, sin cruzar la medianoche, M-22), **duración máxima** (en segundos), **aforo** total, **anticipación máxima** y **reservas por unidad al mes** (A-08, A-09). | Reglamento interno del edificio, que es la fuente de esos valores (Q11) |
| 22 | **Reserva** | `Reservation` | Fijado | Uso de un área común en una franja, a nombre de una unidad, con su lista de invitados. Se confirma automáticamente si cumple las reglas del área (RN-019). Estados: `Confirmed` (al guardarse), `Cancelled` (con fecha-hora y quién canceló) y `Completed` (al terminar su franja; se calcula al consultar, sin job, RN-085, R2-A06). Una reserva rechazada no se guarda (A-14, M-07). | Solicitud por correo, que es el proceso actual |
| 23 | **Franja** | `TimeSlot` | Propuesto | Intervalo semiabierto `[inicio, fin)` con fecha-hora de inicio y de fin, en ISO 8601 con zona `-05:00`. Dos franjas contiguas no se superponen (A-08). | Turno de portería |
| 24 | **Invitado** | `ReservationGuest` | Fijado | Persona externa registrada en una reserva. Sus datos se cifran y se archivan 90 días después del fin de la franja (reserva `Completed`) o de la cancelación (reserva `Cancelled`) (RN-027, RN-028, M-08). Al registrarlo se muestra un aviso de privacidad (C-02). | Visitante general, que está fuera de alcance (W12) |
| 25 | **Vista de portería** | `ConciergeView` | Propuesto | Pantalla de la PC de portería con las reservas confirmadas del día y sus invitados. | — |
| 26 | **Marca de ingreso** | `ReservationGuest.CheckedInAt` (no es una entidad aparte) | Fijado | Registro con fecha-hora (`CheckedInAt`) de que un invitado entró al condominio. | — |
| 27 | **Gasto** | `Expense` | Fijado | Egreso ya realizado con monto en S/, fecha, categoría, proveedor y comprobante (M5). No se edita ni se borra: se corrige con una anulación (A-07). Puede vincularse a una contratación `Approved` (A-06). | Pago, que es un ingreso de una unidad |
| 28 | **Comprobante** | `Attachment` con `OwnerKind = ExpenseReceipt` (`Expense.ReceiptAttachmentId`) | Fijado | Archivo adjunto que respalda un gasto, como una factura o una boleta. | Constancia |
| 29 | **Contratación** | `SupplierHire` | Fijado | Decisión de contratar a un proveedor, con sus cotizaciones, su justificación y la decisión de la Junta Directiva (M6). Estados: `Draft` (único editable), `Submitted` y `Approved` (inmutable). Un rechazo no es un estado: es una decisión con motivo que la devuelve a `Draft`. Cada decisión queda en su historial (A-06, RQ-A09). Se conserva `SupplierHire` (no `VendorHire`): el prefijo nombra el acto de contratar, no la entidad proveedor (M-24, cerrado el 2026-11-08). | Gasto: una contratación puede generar varios gastos |
| 30 | **Cotización** | `Quote` | Fijado | Oferta de un proveedor con monto en S/ mayor que S/ 0.00 que se compara dentro de una contratación. Se exigen al menos 2, de proveedores distintos (RN-037, A-06). | — |
| 31 | **Expediente de contratación** | `SupplierHireFile` | Propuesto | Conjunto visible para quien tiene acceso financiero: cotizaciones, justificación e historial completo de decisiones (aprobación o rechazo con motivo), cada una con el cargo de quien decidió ("Junta Directiva", no su nombre) y la fecha-hora (C-03, RQ-A09). Es una vista de lectura, no una tabla (M-24, cerrado el 2026-11-08). | — |
| 32 | **Pago registrado** | `PaymentRecord` | Propuesto | Pago ya realizado por una unidad que registra el Administrator con su constancia (S2). CondoHub nunca procesa pagos (PRINCIPIO-007). | Pago en línea, que está prohibido (W2) |
| 33 | **Constancia** | `PaymentProof` | Propuesto | Archivo que prueba un pago registrado, como la captura de una transferencia. | Comprobante |
| 34 | **Estado de cuenta** | `AccountStatement` | Propuesto | Deudas y pagos de una sola unidad. Solo lo ven las personas con un vínculo `Owner` activo en esa unidad (rol Resident o NonResidentOwner) y el Administrator. El inquilino no lo ve (A-05). La Junta Directiva solo ve la morosidad agregada del condominio (RN-125, RQ-A06). | Información financiera, que no muestra datos por unidad |
| 35 | **Avería** | `FaultReport` | Propuesto | Reporte de un daño con estado `Reported`, `InProgress` o `Resolved` y la fecha-hora de cada cambio (S1). | — |
| 36 | **Anuncio** | `Announcement` | Propuesto | Mensaje dentro de la plataforma, segmentado a todos o solo a propietarios (S3). No se envía por correo en esta versión. El Administrator y la Junta Directiva ven todos los anuncios (M-12). | Notificación por correo (C1) |
| 37 | **Retención** | `DataRetentionJob` | Fijado | Proceso diario que mueve al archivo frío los datos personales 90 días después del fin de la relación (fin del último vínculo o revocación del último rol, M-09) o de la visita (fin de la franja o cancelación de la reserva, M-08). Al archivar, los registros operativos se seudonimizan (C-08). Entra en el MVP, sin lectura del archivo (A-01). | Eliminación definitiva, que ocurre al año |
| 38 | **Archivo frío** | — | Fijado | Azure Blob Storage en nivel Archive, inmutable y cifrado con una clave por titular. Los datos se eliminan definitivamente al año de archivados. Una cancelación ARCO aceptada destruye la clave del titular (crypto-shredding, C-01). | Almacenamiento de comprobantes, que es un contenedor normal |
| 39 | **Solicitud ARCO** | `ArcoRequest` | Propuesto | Pedido del titular para acceder, rectificar, cancelar u oponerse al tratamiento de sus datos, con fecha de vencimiento legal (PRINCIPIO-004.6). Sus reglas se escriben solo si Q20 confirma un piloto real (M-23). | Reclamo, que va al Libro de Reclamaciones |
| 40 | **Libro de Reclamaciones** | `ComplaintBook` | Propuesto | Registro virtual de reclamos de consumo según la Ley N.° 29571. Es obligatorio antes de operar con datos reales. Sus reglas se escriben solo si Q20 confirma un piloto real (M-23). | Solicitud ARCO |
| 41 | **Datos sintéticos** | — | — | Datos ficticios generados por seeders. Son los únicos permitidos fuera de producción (PRINCIPIO-008). | Datos anonimizados, que siguen prohibidos fuera de producción |
| 42 | **Usuario** | `User` | Propuesto | Cuenta de acceso de una persona. Es **global**: un correo y una contraseña por persona, aunque tenga vínculos o roles en varios condominios (C-07). El correo es único en toda la plataforma (RN-121), y la cuenta se une a una ficha `Person` por cada condominio (RN-122). Se desactiva cuando la persona no tiene vínculos activos ni roles en ningún condominio (M-09), y se reactiva si la persona vuelve (RN-133, RN-134, R2-A05). El TOTP y los códigos de recuperación son de la cuenta: se exigen en todo inicio de sesión si la persona tiene el rol Administrator o BoardMember en cualquier condominio (RN-008, RN-140, R2-A09). | Persona: no toda persona tiene cuenta |
| 43 | **Condominio actual** | — | Propuesto | Condominio que el usuario eligió al iniciar sesión, cuyo `CondominiumId` queda en la sesión y define el global query filter (C-07). | Condominio, que es la entidad |
| 44 | **Proceso de plataforma** | — | Propuesto | Comando de operación de CondoHub, que no es un rol de usuario. Lo ejecuta solo un humano operador y queda en el log de auditoría. Crea condominios, emite la invitación del primer Administrator, restablece el MFA de un Administrator o de un BoardMember (R2-A09), hace el traspaso de administradora y asigna BoardMember (C-05, C-06, A-10). Junto con el login, la aceptación de invitaciones, `DataRetentionJob`, `OccupancyLifecycleJob` y los seeders, es uno de los únicos procesos que pueden usar `IgnoreQueryFilters()` (C-07). | Rol Administrator |
| 45 | **Clave por titular** | — | Propuesto | Clave de cifrado propia de cada titular, guardada en Azure Key Vault, con la que se cifran sus datos en el archivo frío (C-01). | Clave de cifrado de campo de la base operativa |
| 46 | **Crypto-shredding** | — | Propuesto | Destrucción de la clave por titular para dejar ilegibles, de forma irreversible, sus datos inmutables del archivo frío. Así se ejecuta una cancelación ARCO sobre ese archivo (C-01). | Eliminación definitiva al año, que hace la política de ciclo de vida |
| 47 | **Seudonimización** | — | Propuesto | Al archivar a una persona, los registros operativos que la referencian conservan su `PersonId` y el cargo que tenía en el momento del hecho, y sus datos personales pasan al archivo frío (C-08). | Anonimización |
| 48 | **Índice ciego** | — | Propuesto | HMAC-SHA256 del valor normalizado de un campo cifrado (correo y DNI), calculado con una clave distinta de la de cifrado. Permite el login y las validaciones de unicidad sin descifrar (A-13). | Cifrado de campo AES-256-GCM |
| 49 | **Anulación** | — | Propuesto | Corrección de un gasto registrado: el gasto no se edita ni se borra, queda anulado con motivo y fecha-hora, visible para quien tiene acceso financiero (A-07). | Rechazo de una contratación |
| 50 | **Log de auditoría** | `AuditLogEntry` (servicio `IAuditLog`) | Fijado | Registro de los cambios en el padrón (vínculos, `OccupancyType` y roles) y de cada ejecución del proceso de plataforma. La Junta Directiva lo ve sin nombres ni datos de contacto (RN-124). Sus datos personales se cifran y se seudonimizan al archivar a la persona; las entradas no se borran mientras exista el condominio (RN-129, RN-130, RQ-A12). | Log técnico de la aplicación, que no contiene datos personales (PRINCIPIO-008) |
| 51 | **Aforo** | `CommonArea.Capacity`; las personas de la unidad, `Reservation.HouseholdCount` | Fijado | Número máximo de personas en una reserva de un área: invitados registrados + personas de la unidad declaradas en la reserva, con un mínimo de 1, el anfitrión (RN-023, RN-123, RQ-A08). | "Máximo de invitados", que ya no se usa |
| 52 | **Exresidente** | — | Propuesto | Persona que ya no tiene vínculos activos **ni** roles en un condominio. Los 90 días de retención corren desde la más tardía de dos fechas: la `EndDate` de su último vínculo o la revocación de su último rol (RN-005). Al terminar su último vínculo pierde los roles Resident y NonResidentOwner, pero no los demás (RN-060). Si vuelve antes de que venza el plazo, el plazo se anula (RN-131). | Inquilino con vínculo vencido en una unidad pero activo en otra |
| 53 | **Categoría de gasto** | `Expense.Category` (enum) | Fijado | Clasificación de un gasto para mostrar totales por categoría (RN-035). Mientras Q27 siga abierta, el enum provisional es `Maintenance` "Mantenimiento", `Cleaning` "Limpieza" y `Security` "Seguridad" (Q102). | Concepto de un pago |
| 54 | **Unidad activa** | — | Propuesto | Unidad con al menos un inicio de sesión de una persona vinculada a ella en el mes. Se usa para calcular K1 (B-07). | Vínculo activo |
| 55 | **Anfitrión** | `Reservation.HostPersonId` | Fijado | Persona con vínculo activo en la unidad a cuyo nombre está la reserva y que responde por ella. Cuando reserva el Administrator, él elige al anfitrión (RN-076). | Administrator que crea la reserva |
| 56 | **Acompañante de la unidad** | — | Propuesto | Persona de la unidad, distinta del anfitrión, que asiste a la reserva. Se declara como número, sin registrar sus datos (RN-023). | Invitado, que es externo y se registra con sus datos |
| 57 | **Ciclo de vida de la ocupación** | `OccupancyLifecycleJob` | Propuesto | Proceso diario que aplica los eventos que ocurren por fecha: el fin de los vínculos, la revocación automática de los roles Resident y NonResidentOwner (RN-060) y la desactivación de cuentas (RN-073). Es uno de los procesos que pueden usar `IgnoreQueryFilters()` (RN-104, RN-136, ADR-0003, R2-A06). | Retención (`DataRetentionJob`), que archiva datos personales |

---

## Identificadores de campos usados en las reglas

Campos que aparecen en [03-reglas-de-negocio.md](03-reglas-de-negocio.md) y que el código debe usar con este nombre (B-03).

| Identificador | Entidad | Estado | Significado |
|---|---|---|---|
| `StartDate`, `EndDate` | `UnitOccupancy` | Fijado | Inicio y último día (inclusivo) del vínculo (ADR-0001, A-02) |
| `PasswordHash` | `User` | Propuesto | Hash Argon2id de la contraseña (RN-009) |
| `DocumentNumber` | `Person` | Propuesto | DNI o carné de extranjería, cifrado y con índice ciego (RN-052, A-13). Opcional; lo registra solo el titular. DNI: 8 dígitos (RN-148); carné de extranjería: de 9 a 12 caracteres alfanuméricos (RN-149) |
| `DocumentType` | `Person` | Propuesto | Tipo del documento: `Dni` o `ForeignerCard`. Decide qué formato se valida (RN-148, RN-149, R2-A11) |
| `PhoneNumber` | `Person` | Propuesto | Teléfono móvil peruano, cifrado (RN-052). Opcional; lo registra solo el titular. 9 dígitos que empiezan con 9 (RN-150) |
| `FullName` | `ReservationGuest` | Fijado | Nombre del invitado, cifrado (RN-027) |
| `CheckedInAt` | `ReservationGuest` | Fijado | Fecha-hora del ingreso del invitado (RN-030) |
| `DecidedByUserId`, `DecidedByRole`, `DecidedAt` | `HireDecision` | Fijado | BoardMember que decidió, su cargo y fecha-hora de la decisión. Se guardan para auditoría; la vista muestra solo el cargo (RN-040, C-03) |
| `ConsentVersionId`, `Decision`, `DecidedAt` | `ConsentAcceptance` | Fijado | Versión aceptada o rechazada del texto y fecha-hora de la decisión (RN-012) |
| `Confirmed`, `Cancelled`, `Completed` | `Reservation` | Propuesto | Estados de la reserva (M-07) |
| `Draft`, `Submitted`, `Approved` | `SupplierHire` | Propuesto | Estados de la contratación (A-06, RQ-A09) |
| `Approved`, `Rejected` | `HireDecision.Outcome` | Fijado | Decisiones del historial de una contratación; `Rejected` no es un estado (RN-040, RN-096) |
| `Reported`, `InProgress`, `Resolved` | `FaultReport` | Propuesto | Estados de la avería (RN-043) |

---

## Términos técnicos

Términos de la arquitectura, el backlog y la UI Spec que un agente necesita para implementar (Q99, 2026-11-08). La fuente de cada uno está en la última columna.

| Término | Identificador | Definición | Fuente |
|---|---|---|---|
| **Sesión de usuario** | `UserSession` | Fila de servidor cuyo identificador opaco viaja en la cookie `__Host-condohub`. Vence a los 1,800 s sin actividad del usuario o a los 43,200 s de creada. | ADR-0013, RN-113, RN-114 |
| **Condominio seleccionado** | `UserSession.SelectedCondominiumId` | Condominio actual guardado en la sesión. No es una columna de tenant: `UserSession` es global. | 07 §3.3, Q42 |
| **Sesión parcial** | — | Sesión que pasó la contraseña pero no el MFA, el selector de condominio o el consentimiento. Solo abre esos pasos y vence a los 300 s. | 07 §4.1, Q56 |
| **Paso siguiente** | `nextStep` | Respuesta del inicio de sesión que indica a qué pantalla ir: enrolamiento TOTP, verificación MFA, selección de condominio, consentimiento o inicio. | API-01 |
| **Solicitud automática** | Cabecera `X-CondoHub-Background: poll` o `?auto=1` | Solicitud que no hace el usuario (polling de portería, `meta refresh`). Valida la sesión, pero no la renueva. | ADR-0013, RN-113 |
| **Código de recuperación** | `RecoveryCode` | Uno de los 10 códigos de un solo uso que reemplazan al TOTP. Se guarda solo su hash. | RN-112, ADR-0008 |
| **Enrolamiento TOTP** | — | Alta de la app autenticadora (P-003) obligatoria para Administrator y BoardMember en su primer inicio de sesión. | RN-140 |
| **Clave de idempotencia** | `Idempotency-Key`, `IdempotencyRecord` | UUIDv7 que el servidor pone en el formulario. Con la misma clave y la misma huella, un reenvío devuelve el recurso ya creado; con otra huella, `IDEMPOTENCY_KEY_REUSED`. Solo un `2xx` la consume. | ADR-0014, RN-163 |
| **Huella** | `Fingerprint` | SHA-256 de los datos que identifican una creación (área + unidad + franja en reservas). | ADR-0014 |
| **Filas testigo** | `CommonAreaDayLock`, `UnitAreaMonthLock` | Tablas sin datos de negocio con `rowversion` que serializan la creación de reservas por área-día y unidad-mes. | ADR-0012, RN-080, RN-081 |
| **Control optimista** | `RowVersion` | Columna de versión que hace fallar una actualización si otro la cambió antes (`409` o reintento). | ADR-0012, RN-179 |
| **DEK y KEK** | `Condominium.DataKeyWrapped` | La DEK es la clave de datos de un condominio; se guarda envuelta por la KEK de Key Vault (*envelope encryption*) y se mantiene en memoria hasta 1 h. | ADR-0015 |
| **Problem Details** | `application/problem+json` | Formato de error RFC 9457 con `code` estable; el `title` es el texto `es-PE` del código. | RN-102, 07 §4.1 |
| **Código de error estable** | p. ej. `RESERVATION_OVERLAP` | Identificador en inglés de un rechazo. El catálogo único es 03 más 07 §4.1 y §4.4. | RN-102, Q97 |
| **Adjunto** | `Attachment` (`Pending`, `Committed`) | Archivo de un comprobante o una cotización en Blob Storage, sin URL pública. Nace `Pending` y pasa a `Committed` después del commit; si la transacción falla, se borra. | 07 §6.2, RN-166 |
| **Limpieza de adjuntos huérfanos** | `OrphanBlobCleanupJob` | Job que borra los adjuntos `Pending` de más de 1 h y purga las claves de idempotencia vencidas. | T-040 |
| **Platform CLI** | `CondoHub.PlatformCli` | Herramienta de línea de comandos del proceso de plataforma (término #44): alta de condominio, primer Administrator, BoardMember y reinicio de MFA. | T-038, T-050, ADR-0003 |
| **Aviso de cancelación** | `ReservationCancellationNotice` | Registro que muestra una vez al anfitrión, al iniciar sesión, que la administración canceló su reserva. | RN-088 |
| **Invitación pendiente** | `Invitation` sin `AcceptedAt` ni `RevokedAt` y no vencida | Estado visible en la ficha de la persona (P-054). | RN-110, RN-157 |
| **Código de torre** | `Tower.Code` | Identificador corto de una torre (`A`, `B`), único por condominio sin distinguir mayúsculas. | RN-170 |
| **RUC** | `Vendor.Ruc` | Registro Único de Contribuyentes de 11 dígitos; empieza con 10 (persona natural) o 20 (empresa). | RN-169 |
| **SSR estático** | — | Renderizado en servidor sin circuito SignalR ni WebAssembly; los formularios funcionan sin JavaScript. Las islas interactivas son la excepción. | ADR-0007, ADR-0011 |
| **URL de regreso** | `returnUrl` | Ruta local a la que vuelve el usuario después de iniciar sesión o de un formulario auxiliar. Una URL externa se ignora. | 09 §3.1, Q52 |
| **EARS** | — | Notación de las reglas de negocio (Ubiquitous, Event-driven, State-driven, Unwanted, Optional, Complex). | 03 §Convenciones |
