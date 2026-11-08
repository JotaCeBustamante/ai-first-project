# CondoHub — Auditoría QA del Spec Pack

> **Fase:** Planificación (Agente QA, BMAD)
> **Fecha:** 2026-11-01 · **Decisiones:** 2026-11-01 y 2026-11-02
> **Autor:** Jose Bustamante
> **Documentos auditados:** [00-constitucion.md](00-constitucion.md) · [01-project-brief.md](01-project-brief.md) · [02-alcance.md](02-alcance.md) · [03-reglas-de-negocio.md](03-reglas-de-negocio.md) · [04-glosario.md](04-glosario.md)
> **Documentos relacionados:** [05-preguntas-abiertas.md](05-preguntas-abiertas.md) · [ADR-0001](docs/adr/0001-occupancy-type-instead-of-tenant-role.md)

**Puntaje de madurez inicial:** 2 / 5.

**Estado de la revisión.** Se decidieron los 58 hallazgos: 57 resueltos (7 de ellos con una parte en preguntas abiertas) y 1 enviado completo a preguntas abiertas (A-12 → Q31). Surgieron las preguntas Q30 a Q34, y se cerraron Q22, Q26 y Q29. Las decisiones **todavía no están aplicadas** en los documentos 00 a 04: el puntaje sigue en 2 / 5 hasta aplicarlas.

**Tipos.** AMB = ambigüedad · CON = contradicción · FAL = regla faltante · GLO = inconsistencia de glosario · FOR = debilidad de formato.

**Estados.** ⏳ Pendiente · ✅ Resuelta (ver la sección "Ambigüedades resueltas") · ❓ Pregunta abierta (registrada en `05-preguntas-abiertas.md`).

---

# Ambigüedades encontradas

## Críticas

| # | Tipo | Ubicación | Problema | Estado |
|---|---|---|---|---|
| C-01 | CON | 00 P-004.5 vs P-004.6 | El archivo frío es inmutable, pero la cancelación ARCO debe ejecutarse sobre él. | ✅ |
| C-02 | CON | 00 P-004.1 vs 02 M1, 03 RN-010, RN-027 | Se tratan datos del padrón antes del consentimiento; los invitados nunca consienten. | ✅ |
| C-03 | CON | 02 M5, 03 RN-041 vs 02 §5, 04 #19, 00 P-006 | M5/M6: ¿datos agregados o detalle completo? El ejemplo de RN-041 expone el nombre de otro residente. | ✅ |
| C-04 | CON | 00 P-002 vs P-010, 02 §0 y §6 | Herramientas obligatorias con licencias no permitidas (MPL-2.0, ISC, propietarias, de pago). | ✅ |
| C-05 | FAL | 03 RN-007, 04 #17 | No se define quién crea el condominio, el primer Administrator ni quién restablece su MFA. | ✅ |
| C-06 | FAL | 01 §1, 02 C4 | No se modela el cambio o la revocación de la administradora. | ✅ |
| C-07 | FAL | 00 P-003, 03 RN-015, RN-017 | Procesos que requieren `IgnoreQueryFilters()` sin ADR; "condominio actual" sin definir. | ✅ |
| C-08 | CON | 00 P-004.5, 03 RN-005/028 vs RN-040/041 | Archivar a una persona borra quién aprobó una contratación. | ✅ |

## Altas

| # | Tipo | Ubicación | Problema | Estado |
|---|---|---|---|---|
| A-01 | CON | 02 §0 y D3 vs 03 RN-005/028 vs 00 P-004.5 | ¿`DataRetentionJob` entra en el MVP? D3 y D2 sin ADR. | ✅ |
| A-02 | CON | 04 #6 vs ADR-0001 vs 03 RN-005 | Tres definiciones de `EndDate`; zona horaria de "hoy". | ✅ |
| A-03 | CON | 03 RN-016 vs ADR-0001 | Claim de vida corta frente a "siguiente solicitud"; duración del token sin definir. | ✅ |
| A-04 | AMB | 03 RN-017 vs RN-015/018/047, 00 P-003 | Precedencia entre `404` (otro condominio) y `403` (sin permiso). | ✅ |
| A-05 | CON | 04 #34, 03 RN-047 vs 02 S2, 01 §2 | ¿Quién ve el estado de cuenta? RN-047 no cubre a NonResidentOwner. | ✅ |
| A-06 | FAL | 02 M6, 03 RN-037 a RN-041 | M6 sin estados; 2 cotizaciones del mismo proveedor; sin relación gasto–contratación. | ✅ (umbral: ❓ Q30) |
| A-07 | FAL | 03 §5 (Q26), 02 M1 | Edición o anulación de gastos y auditoría del padrón sin definir. | ✅ |
| A-08 | FAL | 03 RN-024, §3 | Franjas contiguas, concurrencia, reservas en el pasado, anticipación y frecuencia. | ✅ |
| A-09 | AMB | 02 M3, SP3 vs 03 RN-023, 04 #21 | Aforo frente a máximo de invitados; ¿cuenta el anfitrión? | ✅ |
| A-10 | FAL | 00 P-006, 04 #10–13 | Multiplicidad de roles, quién asigna BoardMember, separación de funciones, residencia. | ✅ |
| A-11 | FAL | 02 §6, 03 RN-033, RN-046 | Aislamiento, autorización, formatos y escaneo de los adjuntos. | ✅ (formatos: ❓ Q28) |
| A-12 | AMB | 00 P-005, 03 RN-014 | Cómo detecta la app el TLS negociado detrás del front-end de Azure. | ❓ Q31 |
| A-13 | FAL | 00 P-005, 02 §0 | Búsqueda y unicidad sobre campos cifrados (correo de login, DNI). | ✅ |
| A-14 | FOR | 03 RN-002, 003, 021–024, 033, 034, 037, 038, 046, 051 | "Rechazar" sin código HTTP, mensaje ni persistencia. | ✅ |
| A-15 | FAL | 03 RN-010 a RN-012 | Rechazo, revocación y nueva versión del consentimiento. | ✅ (revocación: ❓ Q32) |
| A-16 | FAL | Todo el pack | El pack cita ADR-0001, Q1–Q20 y `permissions-matrix.md`, pero no los incluye. | ✅ |
| A-17 | CON | 00 P-011 vs P-002 | Blazor Auto frente a 3G y celulares antiguos; sin meta ni medición. | ✅ |
| A-18 | CON | 00 P-009 vs 02 D2 | Ningún check rechaza un PR de agente sobre la constitución; PR del autor sin aprobador. | ✅ |
| A-19 | GLO | 01 §2 vs 04 #13–14 vs 02 M5/M6 | "Junta de Propietarios" en el brief es la Junta Directiva del glosario; "la Junta" sin calificar. | ✅ |

## Medias

| # | Tipo | Ubicación | Problema | Estado |
|---|---|---|---|---|
| M-01 | FOR | 03 §9 | Reglas afectadas por preguntas abiertas sin la marca ⚠️. | ✅ |
| M-02 | FOR | 03 RN-046, 047, 049 | Repiten principios, pero están marcadas SHOULD. | ✅ |
| M-03 | FOR | 03 RN-020 | Ubiquitous con condición; redundante con RN-019. | ✅ |
| M-04 | FOR | 03 RN-025, 028, 051, 014, 029 | Reglas compuestas o con comportamiento oculto en el ejemplo. | ✅ (CSV: ❓ Q33) |
| M-05 | FOR | 03 RN-011, 028, 049, 048 | El sujeto no es "el sistema"; Optional usado para un estado de datos. | ✅ |
| M-06 | AMB | 03 RN-026, 036, 038, 041 | Valores vagos (plazo, "unidades específicas", "sin justificación", "completo"). | ✅ |
| M-07 | AMB | 03 RN-019, 026, 050 | Estados de la reserva; ¿se guardan las rechazadas? | ✅ |
| M-08 | CON | 03 RN-028 vs 00 P-004.5, 04 #24, #37 | Inicio del plazo de los invitados: reserva frente a visita; reservas canceladas. | ✅ |
| M-09 | FAL | 03 RN-005 | Retención del personal y de personas sin cuenta; acceso sin vínculos. | ✅ |
| M-10 | FAL | 03 §3 | Reserva por el Administrator, cancelación por el residente, edición de invitados, NonResidentOwner. | ✅ |
| M-11 | FAL | 02 M6, 03 RN-026 | Sin flujo para avisar contrataciones pendientes y reservas canceladas. | ✅ |
| M-12 | FAL | 03 RN-048 | Anuncios "Solo propietarios" ocultos para el Administrator y BoardMember sin vínculo. | ✅ |
| M-13 | AMB | 00 P-002, 02 D3 | Alcance de "dependencias de pago" y "sin mantenimiento". | ✅ |
| M-14 | AMB | 00 P-002 vs 02 §6 | SQL Server 2025 frente a Azure SQL. | ✅ |
| M-15 | AMB | 00 P-010 | Límites del "módulo de usuarios" para el 90 % de cobertura. | ✅ |
| M-16 | FAL | 02 §6, 03 §2 | Recuperación de contraseña, enrolamiento TOTP, códigos de recuperación, bloqueo, sesión. | ✅ |
| M-17 | CON | 00 P-001 vs 01–04, 03 RN-031 | Documentación técnica en español; ruta `/gastos`. | ✅ |
| M-18 | CON | Ejemplos de 00 P-001, 003, 010, 012 | Entidad `Resident` con `UnitNumber`; `/api/visitors` y QR fuera de alcance. | ✅ |
| M-19 | FAL | 03 §1, §5, §6 | Validaciones de gasto, cotización, número de unidad y CSV. | ✅ |
| M-20 | AMB | 03 RN-036 | El ejemplo depende de S2 (Should). | ✅ |
| M-21 | FAL | 03 RN-042, RN-052 | Proveedor persona natural (RUC 10): ¿dato personal? | ✅ (retención: ❓ Q34) |
| M-22 | FAL | 03 RN-021, RN-029 | Áreas que cierran después de medianoche. | ✅ |
| M-23 | FAL | 03 "Alcance del catálogo" vs 02 §0, SP9 | Sin reglas de ARCO ni Libro de Reclamaciones si hay piloto real. | ✅ (ligada a Q20) |
| M-24 | GLO | 04 #8, #10, #13, #16 | "Puede votar", "vive", `Supplier` como entidad y rol. | ✅ |

## Bajas

| # | Tipo | Ubicación | Problema | Estado |
|---|---|---|---|---|
| B-01 | GLO | 03 vs 04 | Términos usados sin definir (presupuesto, aforo, exresidente, etc.). | ✅ |
| B-02 | GLO | 00 P-007 vs 04 #28, #33 | Comprobante frente a constancia en pagos. | ✅ |
| B-03 | GLO | 04 vs 03 | Términos definidos no usados e identificadores usados no definidos. | ✅ |
| B-04 | FOR | 03 RN-043, RN-044 | Categoría "Registro" usada para averías. | ✅ |
| B-05 | FOR | 00 P-010, 03 | Formato numérico inconsistente. | ✅ |
| B-06 | FOR | 03 RN-005, 015, 025, 014 | Personas sintéticas y ejemplos inconsistentes. | ✅ |
| B-07 | AMB | 01 §5 | K1 "uso" sin definir; K2 trivial; K6 no medible en 16 semanas. | ✅ |

---

# Ambigüedades resueltas

### C-01 · Inmutabilidad del archivo frío frente a la cancelación ARCO

- **Decisión (2026-11-01, Jose Bustamante):** *crypto-shredding*. Cada titular tiene su propia clave de cifrado en Azure Key Vault. Una cancelación ARCO aceptada destruye esa clave: el blob inmutable permanece en el archivo frío, pero queda ilegible de forma irreversible. Así se cumplen a la vez la inmutabilidad (PRINCIPIO-004.5) y la cancelación (PRINCIPIO-004.6), sin enmendar la constitución.
- **Pendiente:**
  - Escribir el ADR `docs/adr/0002-crypto-shredding-for-arco-cancellation.md` (MADR).
  - Agregar en `03-reglas-de-negocio.md` la regla de cancelación sobre el archivo frío.
  - Agregar al glosario el término de clave por titular.

### C-02 · Tratamiento de datos antes del consentimiento

- **Decisión (2026-11-01, Jose Bustamante):** padrón mínimo con aviso.
  - **Antes del consentimiento**, el Administrator solo registra lo mínimo para emitir la invitación: nombre, correo y vínculo con la unidad.
  - **El DNI y el teléfono** se piden al titular después de que acepte el consentimiento.
  - **Invitados de una reserva:** al registrarlos se muestra un aviso de privacidad sobre el tratamiento de sus datos.
- **Condición:** la decisión requiere validación legal frente a la Ley N.° 29733 (relacionada con Q18 y Q21). Hasta entonces se trabaja solo con datos sintéticos (PRINCIPIO-008).
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de datos mínimos antes del consentimiento y del aviso de privacidad al invitado.
  - Ajustar la descripción de M1 en `02-alcance.md`.

### C-03 · Visibilidad de M5 y M6 para los propietarios

- **Decisión (2026-11-01, Jose Bustamante):** detalle sin datos de personas.
  - Quien tiene acceso financiero ve **cada gasto** y el **expediente completo** de cada contratación, incluidos los PDF de comprobantes y cotizaciones.
  - Las vistas no muestran datos de residentes ni de unidades específicas (PRINCIPIO-006).
  - La decisión sobre una contratación se muestra con el **cargo** ("Junta Directiva") y la fecha-hora, no con el nombre del BoardMember. El sistema guarda internamente `decidedBy` (RN-040) para auditoría.
- **Pendiente:**
  - Corregir `02-alcance.md` §5 ("agregados por categoría y proveedor") y la definición #19 de `04-glosario.md` ("siempre agregados").
  - Corregir el ejemplo de RN-041 (hoy muestra "la aprobación de Marco").
  - Queda por definir cómo se evita que un PDF adjunto contenga datos de residentes o de unidades (relacionado con A-11 y M-21).

### C-04 · Licencias de las herramientas obligatorias

- **Decisión (2026-11-01, Jose Bustamante):** separar runtime y tooling.
  - La lista de licencias permitidas del PRINCIPIO-002 aplica a las **dependencias de runtime**, directas y transitivas.
  - Las **herramientas de desarrollo y CI** que exige el PRINCIPIO-010 (axe, Postman CLI, CodeQL, Playwright, ESLint, Prettier, commitlint, gitleaks y sus transitivas) quedan permitidas aunque usen MPL-2.0, ISC o sean propietarias gratuitas.
  - Se agrega **ISC** a la lista de licencias permitidas.
  - El repositorio en GitHub es **público**, para usar CodeQL sin costo.
- **Pendiente:**
  - Enmendar el PRINCIPIO-002 mediante un PR y un ADR aprobados por el autor. Un agente no puede modificar la constitución (PRINCIPIO-009).
  - Configurar el escaneo de licencias del CI para que distinga runtime de tooling.
  - Con el repositorio público, gitleaks y la prohibición de datos reales (PRINCIPIO-008) pasan a ser todavía más críticos.

### C-05 · Arranque del condominio y del primer Administrator

- **Decisión (2026-11-01, Jose Bustamante):** proceso de plataforma con CLI.
  - Un **comando de plataforma**, que no es un rol de usuario, crea el condominio, emite la invitación del primer Administrator y restablece el MFA de un Administrator.
  - Solo lo ejecuta un **humano operador** de CondoHub. Un agente de IA no puede ejecutarlo en producción (PRINCIPIO-009).
  - Cada ejecución queda en el log de auditoría.
  - Los 6 roles del PRINCIPIO-006 no cambian.
- **Pendiente:**
  - Documentarlo en un ADR como proceso de plataforma (PRINCIPIO-003); puede ir en el mismo ADR de C-07.
  - Ajustar RN-007: las cuentas se crean por invitación del Administrator **o** del proceso de plataforma.
  - Agregar al glosario el término "proceso de plataforma".

### C-06 · Cambio de empresa administradora

- **Decisión (2026-11-01, Jose Bustamante):** proceso de plataforma a pedido de la Junta.
  - Reutiliza el proceso de plataforma de C-05.
  - La **Junta Directiva** lo solicita con un respaldo documentado (acta).
  - El operador **revoca** las cuentas de la administradora saliente (su Administrator y sus Concierge) e **invita** al nuevo Administrator.
  - Los datos del condominio (padrón, reservas, gastos y contrataciones) permanecen en el condominio y no se los lleva la administradora saliente.
  - Los 6 roles no cambian.
- **Pendiente:**
  - Definir qué respaldo documentado basta para iniciar el traspaso (relacionado con Q19 y Q24).
  - La titularidad de los datos sigue sujeta a la revisión legal de Q9 y Q18.
  - Agregar en `03-reglas-de-negocio.md` las reglas de revocación y traspaso.

### C-07 · Acceso entre condominios y "condominio actual"

- **Decisión (2026-11-01, Jose Bustamante):** identidad global con selector de condominio.
  - La **cuenta de usuario es global**: un correo y una contraseña por persona.
  - Si la persona tiene vínculos en más de un condominio, **elige uno al iniciar sesión**. El `CondominiumId` elegido queda en la sesión y define el "condominio actual" que usan el global query filter, RN-015 y RN-017.
  - Un ADR enumera los **únicos procesos de plataforma** que pueden usar `IgnoreQueryFilters()`: login, aceptación de invitaciones, `DataRetentionJob`, seeders y el CLI de plataforma (C-05, C-06).
- **Pendiente:**
  - Escribir el ADR de resolución de tenant y procesos de plataforma.
  - Definir si el rol también es por condominio: una persona podría ser Administrator en un condominio y Resident en otro (relacionado con A-10).
  - Definir cómo se cambia de condominio durante la sesión.
  - Agregar "condominio actual" al glosario.

### C-08 · Retención frente a la trazabilidad de decisiones

- **Decisión (2026-11-01, Jose Bustamante):** seudonimizar.
  - Cuando `DataRetentionJob` archiva a una persona, los registros operativos que la referencian (decisiones de contratación, reservas y marcas de ingreso) **conservan el `PersonId` y el cargo** que tenía en el momento del hecho.
  - Los **datos personales** (nombre, DNI, teléfono, correo) pasan al archivo frío y se eliminan de SQL Server (PRINCIPIO-004.5).
  - Como la decisión de una contratación se muestra por cargo (C-03), el expediente sigue completo para los propietarios.
- **Pendiente:**
  - Documentarlo en un ADR (puede ir junto con el ADR de crypto-shredding de C-01).
  - Ajustar RN-005, RN-028 y RN-040 para que indiquen qué se conserva.
  - Agregar "seudonimización" al glosario.

### A-01 · `DataRetentionJob` en el MVP

- **Decisión (2026-11-01, Jose Bustamante):** el job entra en el MVP, sin lectura del archivo.
  - Se construyen `DataRetentionJob` y el archivo frío inmutable en Blob Archive.
  - **No se implementa la lectura** del archivo ni la elevación con PIM (D3). Ningún usuario tiene el rol `RetentionArchiveReader`, así que toda lectura devuelve `403` y el test del ejemplo del PRINCIPIO-004.5 se cumple.
  - RN-005 y RN-028 siguen siendo **MUST**.
  - D2 (GitHub App) y D3 (PIM diferido) se formalizan como ADR (PRINCIPIO-012).
- **Pendiente:**
  - Ajustar `02-alcance.md` §0: `DataRetentionJob` deja de ser un bloqueante y pasa al MVP; siguen como bloqueantes la lectura con PIM, ARCO y el Libro de Reclamaciones.
  - Escribir los ADR de D2 y D3.

### A-02 · Significado de `EndDate`

- **Decisión (2026-11-01, Jose Bustamante):** `EndDate` es **inclusiva** y se evalúa en hora de Lima.
  - `EndDate` es el **último día** del vínculo.
  - Un vínculo está **activo** mientras su `EndDate` es nula o **mayor o igual** que la fecha actual en la zona `America/Lima`.
  - Se puede registrar una `EndDate` futura (por ejemplo, el fin pactado de un contrato de alquiler).
  - El plazo de retención de RN-005 empieza en la `EndDate`; el ejemplo actual (2027-01-31 → 2027-05-01) sigue siendo válido.
- **Pendiente:**
  - Corregir la definición #6 de `04-glosario.md` ("posterior a la fecha actual" → "mayor o igual que la fecha actual en `America/Lima`").
  - Corregir el ADR-0001 ("`null` while the occupancy is active").

### A-03 · Momento en que se pierde el acceso financiero

- **Decisión (2026-11-01, Jose Bustamante):** la política `CanViewCondominiumFinancials` se evalúa **contra la base de datos en cada solicitud**.
  - RN-016 se mantiene: el acceso se niega desde la primera solicitud posterior al fin del último vínculo `Owner` activo.
  - Con `EndDate` inclusiva (A-02), eso ocurre a partir de las 00:00 del día siguiente a la `EndDate`, en hora de Lima.
- **Pendiente:**
  - Quitar del ADR-0001 la alternativa del claim de vida corta ("or against a short-lived claim refreshed on token renewal").
  - La duración de la sesión sigue pendiente en M-16.

### A-04 · Precedencia entre `404` y `403`

- **Decisión (2026-11-01, Jose Bustamante):** primero se evalúa el condominio y después el permiso.
  1. Si el recurso pertenece a **otro condominio**, el sistema responde `404` (el global query filter no lo encuentra).
  2. Si el recurso es del **mismo condominio** pero el usuario no tiene permiso, el sistema responde `403`.
  - Coincide con los ejemplos de los PRINCIPIOS 003 y 006.
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` una regla transversal de precedencia, y ajustar RN-015, RN-018 y RN-047 para que digan "del mismo condominio".

### A-05 · Quién ve el estado de cuenta de una unidad

- **Decisión (2026-11-01, Jose Bustamante):** solo los propietarios de la unidad y la administración.
  - Ven el estado de cuenta de una unidad: las personas con un vínculo **`Owner` activo en esa unidad** (rol Resident o NonResidentOwner), el **Administrator** y la **Junta Directiva**.
  - El **inquilino no** ve el estado de cuenta, aunque tenga un vínculo activo con la unidad.
- **Pendiente:**
  - Corregir la definición #34 de `04-glosario.md` ("las personas vinculadas a esa unidad").
  - Reescribir RN-047 para que cubra a NonResidentOwner y excluya al vínculo `Tenant`.
  - Confirmar que la Junta Directiva puede ver el estado de cuenta de cada unidad (morosidad individual), porque el PRINCIPIO-006 y RN-036 restringen los datos por unidad.

### A-06 · Ciclo de vida de una contratación (M6)

- **Decisión (2026-11-01, Jose Bustamante):**
  - **Estados:** `Draft` → `Submitted` → `Approved` o `Rejected`.
  - **Edición:** solo en `Draft`. Una contratación en `Submitted` no se modifica.
  - **Rechazo:** exige un motivo y devuelve la contratación a `Draft` para corregirla y reenviarla.
  - **Aprobación:** una contratación `Approved` es inmutable.
  - **Cotizaciones:** las 2 cotizaciones mínimas de RN-037 deben ser de **proveedores distintos**.
  - **Gasto–contratación:** un gasto puede vincularse a una contratación `Approved`.
- **Pregunta abierta:** a partir de qué monto un gasto **debe** estar vinculado a una contratación aprobada (Q30). Mientras no se responda, K5 no mide el universo real de contrataciones.
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de estados, transiciones, motivo de rechazo e inmutabilidad, y ajustar RN-037.
  - Agregar los estados al glosario (#29 Contratación).

### A-07 · Corrección de gastos y auditoría del padrón

- **Decisión (2026-11-01, Jose Bustamante):** solo agregar, con auditoría. Cierra Q26.
  - Un gasto registrado **no se edita ni se borra**. Se corrige con una **anulación** que exige un motivo.
  - Quien tiene acceso financiero ve el gasto anulado junto con el motivo y la fecha-hora de la anulación.
  - Todo cambio en el padrón (vínculos, `OccupancyType` y roles) queda en un **log de auditoría** visible para la Junta Directiva.
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de anulación y de auditoría del padrón, y quitar la ⚠️ Q26 de §9.
  - Agregar "anulación" y "log de auditoría" al glosario.

### A-08 · Límites y concurrencia de las reservas

- **Decisión (2026-11-01, Jose Bustamante):**
  - **Franjas semiabiertas** `[inicio, fin)`: una reserva de 22:00 a 23:00 no se superpone con otra de 18:00 a 22:00.
  - **Envíos simultáneos:** se confirma solo la primera reserva que se guarda; la otra se rechaza por superposición (RN-024).
  - **Pasado:** no se puede reservar una franja cuyo inicio es anterior al momento actual.
  - **Anticipación máxima** y **número máximo de reservas por unidad al mes:** son reglas configurables por área común, cuyos valores define el Administrator.
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de franja semiabierta, concurrencia, reservas en el pasado, anticipación y frecuencia; ajustar el ejemplo de RN-024.
  - Ampliar la definición #21 de `04-glosario.md` (Reglas del área) con los dos valores nuevos.
  - Los valores concretos para el edificio de referencia siguen saliendo del reglamento interno (Q11).

### A-09 · Aforo frente a máximo de invitados

- **Decisión (2026-11-01, Jose Bustamante):** un solo límite, el **aforo total** del área.
  - Aforo = invitados registrados + anfitrión + acompañantes de la unidad.
  - Se elimina "máximo de invitados" como concepto separado.
- **Pendiente:**
  - Definir cómo se cuentan el anfitrión y los acompañantes de la unidad (¿se declaran en la reserva o se asume un número fijo?).
  - Reescribir RN-023 y su ejemplo (hoy: 40 invitados permitidos, 41 rechazados), la configuración de ejemplo de §3 de `03-reglas-de-negocio.md`, y la definición #21 de `04-glosario.md`.
  - Ajustar SP3 de `02-alcance.md`, que lista aforo y número de invitados como valores distintos.

### A-10 · Asignación de roles y separación de funciones

- **Decisión (2026-11-01, Jose Bustamante):**
  - **Varios roles:** un usuario puede tener más de un rol, y los roles se asignan **por condominio** (cierra el pendiente de C-07).
  - **BoardMember:** lo asigna el **proceso de plataforma** a pedido de la Junta (como en C-06), no el Administrator.
  - **Incompatibilidad:** Administrator y BoardMember no pueden coincidir en el mismo usuario dentro del mismo condominio.
  - **Resident o NonResidentOwner:** lo asigna el Administrator al registrar el vínculo. La residencia es una **declaración** y el sistema no la verifica.
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de asignación por condominio, asignación de BoardMember e incompatibilidad.
  - Actualizar `docs/security/permissions-matrix.md` cuando exista (A-16).
  - Sigue pendiente de Q19 si BoardMember exige un vínculo `Owner` activo (ADR-0001, "Follow-up").

### A-11 · Aislamiento y acceso a los archivos adjuntos

- **Decisión (2026-11-01, Jose Bustamante):**
  - Cada archivo se guarda en Blob Storage bajo un **prefijo por `CondominiumId`**.
  - Ningún archivo se expone con una URL pública ni con un enlace directo al blob.
  - Los archivos se descargan **solo por un endpoint de la API**, que aplica el filtro de condominio y la misma política de acceso que el registro al que pertenece el archivo (gasto, contratación o pago). Responde `404` o `403` según A-04.
- **Pregunta abierta:** formatos, tamaño máximo y escaneo de malware (Q28, ampliada).
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de almacenamiento y descarga de adjuntos.
  - Exigir el test cross-tenant del PRINCIPIO-003 también para el endpoint de descarga.

### A-13 · Búsqueda y unicidad sobre campos cifrados

- **Decisión (2026-11-02, Jose Bustamante):** índice ciego con HMAC.
  - Para los campos que se buscan o deben ser únicos (**correo** y **DNI**), se guarda además un **HMAC-SHA256** del valor normalizado, con una clave distinta de la de cifrado, también en Azure Key Vault.
  - El login y las validaciones de unicidad usan ese índice. El valor sigue cifrado con AES-256-GCM (PRINCIPIO-005).
  - **No** se permiten búsquedas por nombre parcial.
- **Pendiente:**
  - Documentarlo en un ADR, incluida la regla de normalización (por ejemplo, minúsculas y sin espacios en el correo).
  - Agregar en `03-reglas-de-negocio.md` las reglas de unicidad de correo y DNI, y ajustar `02-alcance.md` §0 ("índices ciegos o búsquedas acotadas").
  - Agregar "índice ciego" al glosario.

### A-14 · Contrato de error de los rechazos

- **Decisión (2026-11-02, Jose Bustamante):** contrato de error común.
  - Todo rechazo por validación de negocio responde **`422 Unprocessable Content`** con un cuerpo **RFC 9457 (Problem Details)**.
  - El cuerpo incluye un **código de error estable** en inglés (por ejemplo, `RESERVATION_OVERLAP`).
  - El mensaje visible para el usuario sale de `es-PE.resx` (PRINCIPIO-001).
  - El intento rechazado **no se guarda** como registro de negocio; solo queda en el log, sin datos personales (PRINCIPIO-008).
- **Pendiente:**
  - Agregar la regla transversal en `03-reglas-de-negocio.md` §8 y el código de error en cada una de las 11 reglas (RN-002, 003, 021–024, 033, 034, 037, 038, 046 y 051).
  - Como el rechazo no se guarda, corregir el contraejemplo de RN-050 ("incluye las reservas rechazadas"); esto resuelve en parte M-07.

### A-15 · Ciclo de vida del consentimiento

- **Decisión (2026-11-02, Jose Bustamante):**
  - **Rechazo:** si la persona rechaza el consentimiento, su cuenta no se activa y no accede a la plataforma. Sus datos mínimos del padrón (C-02) siguen las reglas normales de retención.
  - **Versión vigente:** es la última versión publicada del texto. Cada versión nueva exige aceptarla de nuevo en el siguiente inicio de sesión, con el bloqueo de RN-010.
- **Pregunta abierta:** cómo se revoca el consentimiento y con qué efectos (Q32).
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de rechazo y de nueva versión, y definir "vigente" en RN-010.

### A-16 · Documentos citados que no están en el Spec Pack

- **Decisión (2026-11-02, Jose Bustamante):** se agrega el **ADR-0001** al Spec Pack (`agente-qa.xml` y cualquier contexto que reciba un agente).
- **Queda para después (sin decidir):**
  - Incluir `05-preguntas-abiertas.md` en el pack. Hoy un agente solo ve Q10–Q12 y Q21–Q29 en la tabla §9 de las reglas; Q1–Q20 y Q30 en adelante no le llegan.
  - Crear `docs/security/permissions-matrix.md`, que la constitución exige con un test por fila (PRINCIPIO-006) y que sigue pendiente desde D1.

### A-17 · Rendimiento en 3G y medición

- **Decisión (2026-11-02, Jose Bustamante):**
  - Las páginas de residentes usan **render estático en servidor (SSR)**, con interactividad solo en los componentes que la necesitan. El modo Auto se usa donde se justifique.
  - **Meta en 3G:** LCP < 4 s con el perfil de red "Slow 3G". La meta en 4G del PRINCIPIO-010 (LCP < 2.5 s) se mantiene.
  - **Medición en el CI:** LCP con **Lighthouse CI** y p95 de la API con una **prueba de carga**.
- **Corrección:** al proponer esta opción se sugirió k6 para la prueba de carga, pero **k6 usa licencia AGPL-3.0**, que el PRINCIPIO-002 prohíbe en cualquier versión, y la excepción de tooling de C-04 no cubre GPL ni AGPL. Hay que elegir otra herramienta (por ejemplo, Locust, con licencia MIT) mediante el ADR.
- **Pendiente:**
  - Escribir el ADR de modos de render y herramientas de medición.
  - Confirmar que usar SSR en parte de la app no contradice "Blazor en modo Auto" del PRINCIPIO-002, o aclarar el principio.
  - Agregar las metas de 3G al PRINCIPIO-010 o al PRINCIPIO-011, mediante un PR y un ADR aprobados por el autor.

### A-18 · Control de los PR en un proyecto individual

- **Decisión (2026-11-02, Jose Bustamante):**
  - **Check del CI:** un workflow falla si el autor del PR es la GitHub App de los agentes (D2) y el diff modifica `00-constitucion.md` o `.github/workflows/`. Cumple el ejemplo del PRINCIPIO-009 ("el CI rechaza cualquier PR de un agente que modifique `00-constitucion.md`").
  - **PR del autor humano:** se documenta una excepción. El autor puede mergear sus propios PR sin aprobación, siempre que todos los status checks estén en verde.
- **Pendiente:**
  - Enmendar el PRINCIPIO-010 ("PR con 1 aprobación humana como mínimo") mediante un PR y un ADR aprobados por el autor; puede ir en el mismo ADR de D2.
  - Configurar la branch protection o un ruleset de GitHub para que solo la cuenta del autor pueda saltarse la aprobación, y que la GitHub App nunca pueda.

### A-19 · "Junta de Propietarios" frente a "Junta Directiva"

- **Decisión (2026-11-02, Jose Bustamante):** manda el glosario.
  - **Junta Directiva** (`BoardMember`, #13): propietarios elegidos para supervisar la gestión. Aprueba o rechaza contrataciones.
  - **Junta de Propietarios** (#14): asamblea de todos los propietarios (Ley N.° 27157). Sus acuerdos formales no se toman en CondoHub (W3).
- **Pendiente:**
  - Corregir `01-project-brief.md`: la fila "Junta de Propietarios" de la tabla de usuarios (§2) describe a la Junta Directiva, igual que §1 y §5 (K5).
  - Reemplazar "la Junta" por "la Junta Directiva" en `02-alcance.md` (M5, M6, §3, D2, dependencias) y en `03-reglas-de-negocio.md` donde corresponda.

### M-01 · Marcas ⚠️ incompletas

- **Decisión (2026-11-02, Jose Bustamante):** se marca con ⚠️ cada regla afectada por una pregunta abierta **vigente**: Q10, Q11, Q12, Q21, Q22, Q23, Q24, Q25, Q27, Q28, Q29, Q30, Q31 y Q32.
- **Pendiente:**
  - Agregar ⚠️ a RN-007, RN-008, RN-014, RN-019, RN-026, RN-027, RN-028, RN-033, RN-035, RN-037 (también Q30), RN-046 y RN-010 a RN-012.
  - Quitar Q26 de la tabla §9 de `03-reglas-de-negocio.md`, porque se resolvió en A-07, y agregar Q30 a Q32.

### M-02 · Prioridad de las reglas que repiten principios

- **Decisión (2026-11-02, Jose Bustamante):** RN-046, RN-047 y RN-049 pasan a **MUST**, como dice la convención del catálogo. Aplican cuando se construyan S2 y S4, que siguen siendo Should.
- **Pendiente:** cambiar la prioridad de las tres reglas en `03-reglas-de-negocio.md`.

### M-03 · RN-020 redundante con RN-019

- **Decisión (2026-11-02, Jose Bustamante):** se **elimina RN-020**. RN-019 ya exige confirmar la reserva en el mismo envío. Los 600 s quedan como meta de K2 en el brief y en RN-050. Si Q10 termina exigiendo aprobación manual, se escribe una regla nueva con su plazo.
- **Pendiente:**
  - Retirar RN-020 de `03-reglas-de-negocio.md` sin renumerar las demás (el identificador queda como "retirado") y actualizar la fila de Q10 en §9.

### M-04 · Reglas compuestas o con comportamiento oculto

- **Decisión (2026-11-02, Jose Bustamante):** cada regla describe un solo comportamiento.
  - **RN-025** se divide en dos: "permite reservar a nombre de una unidad con la que se tiene un vínculo activo" y "rechaza reservar a nombre de una unidad sin vínculo activo".
  - **RN-028** se divide en dos: archivar los datos de los invitados y eliminarlos de SQL Server una vez archivados.
  - **RN-014** se reescribe con el patrón EARS complejo: "Mientras la conexión use TLS 1.2, cuando el usuario inicia sesión, el sistema DEBE…".
  - **RN-029** queda igual: "confirmadas del día" es un solo filtro.
- **Pregunta abierta:** si el CSV de S5 se importa en parte o todo o nada (Q33).
- **Pendiente:**
  - Aplicar las divisiones en `03-reglas-de-negocio.md`.
  - Agregar el patrón complejo (Mientras…, cuando…) a la tabla de convenciones EARS, que hoy solo tiene 5 patrones.

### M-05 · Sujeto de las reglas y uso del patrón Optional

- **Decisión (2026-11-02, Jose Bustamante):** se amplía la convención.
  - Además de "el sistema", el sujeto de una regla puede ser un **componente nombrado del sistema** (por ejemplo, `DataRetentionJob` o el panel de indicadores). RN-028 y RN-049 quedan como están.
  - **RN-011** se reescribe con "el sistema" como sujeto, porque "el texto del consentimiento" no es un componente.
  - **RN-048** pasa del patrón Optional a **State-driven**: "Mientras un anuncio esté segmentado como Solo propietarios, el sistema NO DEBE…".
- **Pendiente:** actualizar las convenciones de `03-reglas-de-negocio.md` y reescribir RN-011 y RN-048.

### M-06 · Valores vagos

- **Decisión (2026-11-02, Jose Bustamante):**
  - **RN-026:** la vista de portería refleja una cancelación en **60 s o menos**.
  - **RN-036:** "datos de unidades específicas" = número de unidad, nombre de una persona, y la deuda o los pagos de una unidad.
  - **RN-038:** la justificación tiene **al menos 20 caracteres**, sin contar los espacios al inicio y al final.
  - **RN-041:** "expediente completo" remite a la definición #31 del glosario, con el ajuste de C-03 (la decisión se muestra por cargo).
- **Pendiente:** reescribir las cuatro reglas en `03-reglas-de-negocio.md`.

### M-07 · Estados de una reserva

- **Decisión (2026-11-02, Jose Bustamante):**
  - Una reserva guardada nace en **`Confirmed`** (RN-019). Las reservas rechazadas no se guardan (A-14).
  - Una reserva `Confirmed` puede pasar a **`Cancelled`** (RN-026), con la fecha-hora y quién la canceló. Una reserva cancelada no se borra.
  - Una reserva `Confirmed` pasa a **`Completed`** cuando termina su franja.
  - No hay estado `Pending` mientras rija la confirmación automática (Q10).
- **Pendiente:**
  - Agregar en `03-reglas-de-negocio.md` las reglas de transición a `Cancelled` y a `Completed`.
  - Agregar los estados a la definición #22 (Reserva) de `04-glosario.md`.

### M-08 · Inicio del plazo de retención de los invitados

- **Decisión (2026-11-02, Jose Bustamante):**
  - Reserva **`Completed`:** los 90 días empiezan cuando termina su franja, que es la "visita" del PRINCIPIO-004.5.
  - Reserva **`Cancelled`:** los 90 días empiezan en la fecha-hora de la cancelación.
- **Pendiente:**
  - Reescribir RN-028 y su ejemplo. Con la franja 2026-12-12 de 19:00 a 23:00, el plazo vence el 2027-03-12 a las 23:00.
  - Unificar las definiciones #24 (Invitado) y #37 (Retención) de `04-glosario.md`.

### M-09 · Retención del personal y acceso sin vínculos

- **Decisión (2026-11-02, Jose Bustamante):** el fin de la relación es la revocación del último rol o el fin del último vínculo.
  - **Personal** (Administrator, Concierge, BoardMember sin unidad): los 90 días empiezan cuando se revoca su último rol en el condominio, por ejemplo en el traspaso de C-06.
  - **Persona que nunca activó su cuenta:** sigue la misma regla según su vínculo o su rol.
  - **Acceso:** sin vínculos activos ni roles en un condominio, la persona no puede entrar a ese condominio. Como la identidad es global (C-07), la cuenta se desactiva cuando eso pasa en todos sus condominios.
- **Pendiente:** ampliar RN-005 y agregar la regla de desactivación de cuenta en `03-reglas-de-negocio.md`.

### M-10 · Casos de reserva sin definir

- **Decisión (2026-11-02, Jose Bustamante):** cierra Q29.
  - El **Administrator** puede crear una reserva a nombre de cualquier unidad del condominio.
  - El **residente** puede cancelar su propia reserva hasta el inicio de la franja.
  - Los **invitados** se pueden agregar o quitar hasta el inicio de la franja, respetando el aforo (A-09).
  - Si una unidad tiene un vínculo **`Tenant` activo**, solo ese inquilino puede reservar a nombre de la unidad; el propietario (Resident o NonResidentOwner) no.
- **Pendiente:**
  - Agregar las cuatro reglas en `03-reglas-de-negocio.md`, ajustar RN-025 y RN-026, y quitar la ⚠️ Q29.
  - Revisar el ejemplo de RN-024, donde reserva Luis (NonResidentOwner de B-1203): solo es válido si B-1203 no está alquilada.

### M-11 · Avisos sin notificaciones por correo

- **Decisión (2026-11-02, Jose Bustamante):** avisos dentro de la aplicación, sin correo.
  - Al iniciar sesión, la **Junta Directiva** ve un contador de contrataciones en estado `Submitted`.
  - Al iniciar sesión, el **residente** ve un aviso de sus reservas canceladas por el Administrator.
  - Las notificaciones por correo (C1) siguen siendo Could.
- **Pendiente:** agregar las dos reglas en `03-reglas-de-negocio.md` y mencionarlas en M3 y M6 de `02-alcance.md`.

### M-12 · Anuncios "Solo propietarios"

- **Decisión (2026-11-02, Jose Bustamante):** el Administrator y la Junta Directiva ven todos los anuncios, incluidos los "Solo propietarios". RN-048 se aplica solo a los roles Resident, NonResidentOwner y Concierge.
- **Pendiente:** reescribir RN-048 en `03-reglas-de-negocio.md` (ya cambia de patrón por M-05).

### M-13 · Alcance de "dependencias de pago" y "sin mantenimiento"

- **Decisión (2026-11-02, Jose Bustamante):**
  - **"Dependencia de pago"** = paquete o librería que requiere una licencia paga.
  - Los **servicios en la nube** (App Service, Azure SQL, correo, Entra ID P2, Defender for Storage) no son dependencias. Se rigen por el presupuesto del proyecto (Q20, SP10), no por el PRINCIPIO-002.
  - **"Sin mantenimiento"** aplica solo a las **dependencias directas**.
- **Consecuencia:** la justificación de D3 ("PIM es de pago") pasa a ser una decisión de presupuesto, no de cumplimiento del PRINCIPIO-002.
- **Pendiente:** aclarar el PRINCIPIO-002 mediante un PR y un ADR aprobados por el autor (puede ir en la misma enmienda de C-04).

### M-14 · SQL Server 2025 frente a Azure SQL Database

- **Decisión (2026-11-02, Jose Bustamante):**
  - En Azure se usa **Azure SQL Database** (servicio administrado, con TDE incluido).
  - En local y en el CI se usa **SQL Server 2025 en contenedor** (edición Developer, solo para entornos no productivos).
- **Pendiente:**
  - Aclarar el PRINCIPIO-002 mediante un PR y un ADR aprobados por el autor (puede ir en la misma enmienda de C-04 y M-13).
  - Verificar en el ADR que Azure SQL Database en South Central US admite TLS 1.3 como versión mínima (PRINCIPIO-005).
  - Ajustar `02-alcance.md` §6 ("Azure SQL o SQL Server 2025").

### M-15 · Límites del módulo de usuarios

- **Decisión (2026-11-02, Jose Bustamante):** el módulo de usuarios es un **proyecto .NET propio** (por ejemplo, `CondoHub.Identity`).
  - Incluye: cuentas, invitaciones, contraseñas, MFA, sesiones, roles, consentimiento y las políticas de autorización, entre ellas `CanViewCondominiumFinancials`.
  - El CI mide el **90 %** sobre ese proyecto completo, **sin exclusiones** (PRINCIPIO-009.5 ya prohíbe excluir código para que el CI pase).
- **Pendiente:** registrarlo en el ADR de arquitectura y en el `README.md` del módulo.

### M-16 · Sesión, recuperación y bloqueo

- **Decisión (2026-11-02, Jose Bustamante):** se siguen los requisitos de **OWASP ASVS 4.0 nivel 2** para recuperación de contraseña, enrolamiento del TOTP, códigos de recuperación, bloqueo por intentos fallidos, vencimiento de la invitación y duración de la sesión. Cierra Q22.
  - Los códigos de recuperación complementan, y no reemplazan, el restablecimiento de MFA por el proceso de plataforma (C-05).
- **Pendiente:**
  - Escribir el ADR con los valores concretos (vencimiento de la invitación, intentos antes del bloqueo, duración de la sesión, etc.).
  - Agregar las reglas en `03-reglas-de-negocio.md` §2 y quitar la ⚠️ Q22 de RN-007 y RN-008.

### M-17 · Idioma de la documentación y de las rutas

- **Decisión (2026-11-02, Jose Bustamante):**
  - **En español:** los documentos de producto y negocio (constitución, brief, alcance, reglas de negocio, glosario, preguntas abiertas y auditoría QA).
  - **En inglés:** los documentos técnicos (ADR, `README.md`, `CHANGELOG.md`, OpenAPI y diagramas Mermaid).
  - **Rutas:** tanto las rutas de la UI como los endpoints van en inglés (por ejemplo, `/expenses`). El texto visible sigue en español por `.resx`.
- **Pendiente:**
  - Aclarar el PRINCIPIO-001 mediante un PR y un ADR aprobados por el autor (puede ir en la misma enmienda de C-04).
  - Corregir RN-031 (`/gastos` → `/expenses`).

### M-18 · Ejemplos de la constitución fuera del modelo y del alcance

- **Decisión (2026-11-02, Jose Bustamante):** se reemplazan por ejemplos del MVP.
  - **PRINCIPIO-001:** la entidad `Resident` con `UnitNumber` → la entidad `UnitOccupancy` con `OccupancyType`.
  - **PRINCIPIO-003:** `GET /api/visitors/{id}` y `Visitors_CrossTenantAccess_Returns404` → `GET /api/reservations/{id}` y `Reservations_CrossTenantAccess_Returns404`.
  - **PRINCIPIO-004.5:** "el visitante" → "el invitado de una reserva".
  - **PRINCIPIO-010:** `feat(visitors): add QR check-in` → `feat(reservations): add guest list`.
  - **PRINCIPIO-012:** `POST /api/visitors` → `POST /api/reservations`.
- **Pendiente:** aplicarlo mediante un PR y un ADR aprobados por el autor (puede ir en la misma enmienda de C-04). Un agente no puede modificar la constitución (PRINCIPIO-009).

### M-19 · Validaciones de datos

- **Decisión (2026-11-02, Jose Bustamante):**
  - **Montos** (gastos y cotizaciones): exactamente 2 decimales y sin monto máximo.
  - **Cotización:** monto mayor que S/ 0.00, igual que RN-034 para los gastos.
  - **Fecha del gasto:** no puede ser futura ni anterior a 12 meses desde la fecha de registro.
  - **Número de unidad:** 3 o 4 dígitos (piso + número), por ejemplo `502` o `1203`.
  - **CSV:** `OccupancyType` no distingue mayúsculas (`owner` = `Owner`). Se rechaza toda celda que empiece con `=`, `+`, `-` o `@` (inyección de fórmulas).
- **Advertencia:** la regla de inyección rechazaría un teléfono como `+51 987…`. Por C-02 el CSV no trae teléfonos (solo nombre, correo y vínculo), pero si algún día se agregan, la regla tiene que revisarse.
- **Pendiente:** agregar las reglas en `03-reglas-de-negocio.md` (§1, §5, §6 y §7).

### M-20 · Ejemplo de RN-036 dependiente de S2

- **Decisión (2026-11-02, Jose Bustamante):** se reemplazan el ejemplo y el contraejemplo por casos de M5.
  - ✅ Ana ve "Mantenimiento de ascensores – S/ 4,800.00 – 2026-11-05 – Ascensores Andinos SAC".
  - ❌ El gasto dice "Reparación de tubería en Dpto. B-1203" o muestra el nombre de un residente.
- **Advertencia:** el contraejemplo implica que la descripción de un gasto, que es texto libre, no puede mencionar unidades ni residentes. El sistema no puede verificarlo por sí solo, así que falta decidir si es una validación, una guía para el Administrator o una revisión antes de publicar.
- **Pendiente:** reescribir el ejemplo y el contraejemplo de RN-036.

### M-21 · Proveedor persona natural

- **Decisión (2026-11-02, Jose Bustamante):** el nombre y el RUC 10 de un proveedor persona natural son datos personales y se **cifran con AES-256-GCM** (PRINCIPIO-005).
- **Pregunta abierta:** si siguen visibles en el expediente o se archivan a los 90 días (Q34).
- **Pendiente:** ampliar RN-052 para que cubra a los proveedores persona natural, y ajustar RN-042.

### M-22 · Áreas que cierran después de medianoche

- **Decisión (2026-11-02, Jose Bustamante):** no se permite cruzar la medianoche.
  - La hora de cierre de un área siempre es posterior a la de apertura, dentro del mismo día.
  - Ninguna franja cruza la medianoche, así que RN-029 no cambia.
  - Si el reglamento interno (Q11) muestra un área que cierra después de medianoche, se revisa la decisión.
- **Pendiente:** agregar la regla de configuración del horario en `03-reglas-de-negocio.md` §3.

### M-23 · ARCO y Libro de Reclamaciones sin reglas

- **Decisión (2026-11-02, Jose Bustamante):** las reglas de ARCO y del Libro de Reclamaciones se escriben **solo si Q20 confirma un piloto con usuarios reales**.
- **Pendiente:** agregar una nota en "Alcance del catálogo" de `03-reglas-de-negocio.md`: un agente no debe implementar ARCO ni el Libro de Reclamaciones mientras no existan sus reglas.

### M-24 · Definiciones del glosario que no coinciden con el pack

- **Decisión (2026-11-02, Jose Bustamante):**
  - **#8 Propietario:** "Ve la información financiera". Se quita "puede votar" y se aclara que votará cuando existan C2 o las votaciones formales (W3).
  - **#10 Residente:** "Rol de quien declara vivir en el condominio" (A-10).
  - **#16 Proveedor:** la entidad pasa a llamarse **`Vendor`**. `Supplier` queda solo como el rol de la constitución, que no se usa en esta versión (W6). Se agrega una nota de ambigüedad como la de "tenant".
- **Pendiente:**
  - Corregir las tres definiciones en `04-glosario.md`.
  - Decidir si los identificadores derivados también cambian: `SupplierHire` → `VendorHire` y `SupplierHireFile` → `VendorHireFile` (#29 y #31).

### B-01 a B-07 · Hallazgos bajos (resueltos en bloque)

- **Decisión (2026-11-02, Jose Bustamante):** se aplica la corrección obvia en cada uno. El autor revisa el resultado.
  - **B-01 · Términos usados sin definir.** Se agregan al glosario: "presupuesto" (o se quita de #19 si no hay funcionalidad que lo use), "exresidente", "usuario", "categoría de gasto" y "unidad activa" (K1). "Aforo" ya se definió en A-09 y "visitante" se reemplaza por "invitado" (M-18). "Acceso financiero" se reemplaza en RN-035 y RN-041 por la política `CanViewCondominiumFinancials` (#19).
  - **B-02 · Comprobante frente a constancia.** Manda el glosario: "comprobante" para gastos (#28) y "constancia" para pagos (#33). El ejemplo del PRINCIPIO-007 ("adjunta la constancia") ya es correcto; se corrige su texto ("comprobante adjunto" → "constancia adjunta") en la misma enmienda de C-04.
  - **B-03 · Glosario y reglas desincronizados.** Se agregan al glosario los identificadores que usan las reglas (`CheckedInAt`, `GuestFullName`, `PasswordHash`, `DocumentNumber`, `PhoneNumber`, `decidedBy` y los estados de A-06 y M-07). Los términos definidos sin reglas (`CondominiumRegistry`, `ConciergeView`, `SupplierHireFile`, `TimeSlot`, `ArcoRequest`, `ComplaintBook`) se mantienen, porque nombran pantallas o funcionalidades futuras.
  - **B-04 · Categoría "Registro" en averías.** RN-043 y RN-044 pasan a una categoría nueva, "Averías", que se agrega a la lista de categorías del catálogo.
  - **B-05 · Formato numérico.** Los documentos usan punto decimal y coma de miles, como RN-055: "2,5 s" → "2.5 s" (PRINCIPIO-010, en la enmienda de C-04) y "7 776 000 s" → "7,776,000 s".
  - **B-06 · Ejemplos inconsistentes.** Carla Díaz es solo `Tenant` de A-301 en todo el catálogo (se corrige el contraejemplo de RN-005). Se agrega la configuración sintética de la parrilla junto a la del salón de fiestas (§3). En RN-014 se cambia Safari 13 por un navegador que con certeza no soporta TLS 1.3, después de verificarlo.
  - **B-07 · KPIs.** "Uso" en K1 = al menos un inicio de sesión de una persona vinculada a la unidad en el mes. K2 se mantiene como está, aunque con confirmación automática será casi inmediato. K6 se registra como no medible dentro de las 16 semanas.
- **Pendiente:** aplicar las correcciones en `01-project-brief.md`, `03-reglas-de-negocio.md` y `04-glosario.md`, y las de la constitución en la misma enmienda de C-04.

---

# Aplicación de las decisiones (2026-11-02)

**Aplicado.**
- `01-project-brief.md`, `02-alcance.md` y `04-glosario.md`: todas las decisiones que los tocan. El glosario agrega los términos #42 a #54 y la ambigüedad `Vendor` / `Supplier`.
- `03-reglas-de-negocio.md`: 37 reglas modificadas, RN-020 retirada y 53 reglas nuevas (RN-057 a RN-109). Los IDs existentes no se renumeraron.
- ADR-0001 corregido (A-02, A-03) y ADR **0002 a 0009** redactados con estado `proposed`, en `docs/adr/`.
- `agente-qa.xml`: el contexto se regeneró con los documentos actualizados y se agregó el ADR-0001 (A-16).

**Constitución y ADR (2026-11-02).**
- Por instrucción explícita del autor ("súbelo de frente"), la enmienda se aplicó directamente en `00-constitucion.md`, que pasa a la **versión 1.1**. Es una excepción puntual al PRINCIPIO-009.7, autorizada por el autor y registrada en el ADR-0009. La copia de la versión 1.0 está fuera del repositorio.
- Los ADR 0002 a 0009 pasan a `accepted`, incluidos los valores del ADR-0008 y Locust (MIT) como herramienta de carga en el ADR-0007.
- El Spec Pack de `agente-qa.xml` incluye los ADR 0001 a 0009, porque las reglas de negocio citan los ADR 0002 a 0008 como fuente (amplía A-16).
- Se creó [docs/security/permissions-matrix.md](docs/security/permissions-matrix.md) (A-16) y se incluyó en el Spec Pack. Las celdas sin regla que las conceda quedan en "denegado por defecto" (PRINCIPIO-006), y la matriz lista al final las que probablemente necesitan una regla.

**Interpretaciones de los agentes, aceptadas por el autor el 2026-11-02** junto con la publicación del Spec Pack. Se pueden revisar en una próxima iteración.

| # | Origen | Qué se interpretó | Dónde |
|---|---|---|---|
| P-01 | A-13 | La unicidad del correo y del DNI se validó **por condominio**. Con la identidad global (C-07), un mismo correo en otro condominio se vincula a la misma cuenta. El ADR-0004 deja abierto el alcance de la unicidad del DNI. | RN-068, RN-069, ADR-0004 |
| P-02 | A-06 | No está claro si `Rejected` es un estado en el que la contratación permanece o solo una decisión registrada antes de volver a `Draft`. | RN-096, RN-098 (⚠️) |
| P-03 | C-01 vs M-23 | La regla de cancelación ARCO por destrucción de clave se difirió hasta que exista el resto de reglas ARCO (Q20). Solo existe RN-108 (clave por titular). | RN-108 |
| P-04 | A-10 | El proceso de plataforma no solo asigna BoardMember: también lo **revoca**. | ADR-0003 |
| P-05 | A-10 vs ADR-0001 | ADR-0001 descarta la opción "New Tenant role" en parte porque "a role is global to the user". Con roles por condominio ese argumento ya no vale tal cual, aunque la decisión se mantiene. | ADR-0001 |
| P-06 | A-05 | Sigue sin confirmar que la Junta Directiva pueda ver la morosidad de cada unidad, frente al PRINCIPIO-006 y RN-036. | Glosario #34, RN-047 |
| P-07 | C-04 | La excepción de tooling excluye de forma explícita GPL y AGPL. | ADR-0009, propuesta de enmienda |
| P-08 | A-17 | Se propuso un texto que aclara que usar SSR en parte de la app es compatible con "Blazor en modo Auto". | Propuesta de enmienda |
| P-09 | A-09 | Falta definir cómo se cuentan el anfitrión y los acompañantes en el aforo. | RN-023 (⚠️) |
| P-10 | M-16 | Los valores del ADR-0008 son una propuesta y no están decididos. | ADR-0008 |
| P-11 | RN-050 | No se decidió si K2 incluye las reservas canceladas. | RN-050 |
| P-12 | Ejemplos | Son sintéticos e inventados para los ejemplos: la configuración de la parrilla y del salón (anticipación, límite mensual), los códigos de error y las personas Raúl Mendoza, Pedro Salas y Julio Vargas. | 03 §3 y reglas nuevas |
| P-13 | Glosario | Se propusieron los identificadores `User`, `AuditLog`, `Capacity` y `ExpenseCategory`, con estado Propuesto. | 04 |

---

# Reauditoría (2026-11-02)

Un agente nuevo, que solo leyó `agente-qa.xml`, reauditó el Spec Pack: **3 / 5**, con 50 hallazgos (4 críticos, 12 altos, 23 medios y 11 bajos). El informe está en [reauditoria-qa.md](reauditoria-qa.md).

### Hallazgos resueltos

| # | Decisión (2026-11-02, Jose Bustamante) | Aplicado en |
|---|---|---|
| RQ-C02 | Se aceptan los 5 valores del ADR-0008 y se agrega la política de contraseñas de OWASP ASVS V2.1: de 12 a 64 caracteres, sin reglas de composición, y rechazo de contraseñas filtradas con una lista local. Cada valor es una regla propia. | ADR-0008 · RN-074, RN-110 a RN-117 |
| RQ-A03 | Un vínculo está activo solo si su `StartDate` es menor o igual que la fecha actual en `America/Lima` (corrección de texto, sin decisión nueva). | Glosario #6 · ADR-0001 |
| RQ-A05 | `403` cuando el usuario no tiene permiso sobre el recurso; `422` cuando tiene permiso pero una regla de validación, de estado o de tiempo lo impide. Ambos llevan Problem Details con el código de la regla. | RN-102, RN-118 nueva · RN-066, 075, 077 (`403`) · RN-083, 086, 097 (`422`) · leyenda y filas B5, B6 y H1 de la matriz |
| RQ-C01 | La versión 1.1 de la constitución queda como enmienda del autor: el texto se redactó con asistencia de IA y el autor lo revisó, lo aprobó y lo adopta como propio. La constitución no cambia. | ADR-0009 (Confirmation y More Information) · propuesta de enmienda |
| RQ-C03 | Al terminar el último vínculo de una persona en un condominio, se le revocan automáticamente los roles Resident y NonResidentOwner allí; los demás roles no cambian. Los 90 días empiezan solo cuando ya no tiene ni vínculos activos ni roles, desde la más tardía de las dos fechas. | RN-005 y RN-060 reescritas · glosario #52 · ADR-0001 · ADR-0003 |
| RQ-C04 | El correo es único en toda la plataforma en `User` y dentro de cada condominio en `Person`; el DNI es único por condominio. Cada condominio tiene su propia ficha `Person`, que se une al `User` del mismo correo al aceptar la invitación, iniciando sesión si la cuenta ya existe. Se fija la normalización: correo sin espacios y en minúsculas; DNI o CE en mayúsculas, sin espacios ni separadores. | RN-068 · RN-121 y RN-122 nuevas · glosario #5 y #42 · ADR-0003 · ADR-0004 |
| RQ-A02 | Es consecuencia de RQ-C03 (no hay decisión nueva): el NonResidentOwner también necesita un vínculo `Owner` activo para el acceso financiero. | RN-015, RN-016 · glosario #19 · ADR-0001 · matriz |
| RQ-A04 | Corrección de texto según C-03: el ADR-0001 ya no dice "aggregated data only". | ADR-0001 |
| RQ-A01 | Al vencer el plazo de una persona: se archivan cifrados con la clave del titular su nombre, DNI, teléfono, correo, `RequiresAccessibleElevator`, vínculos y consentimientos; se borran sin archivar `PasswordHash`, secreto TOTP, códigos de recuperación e índices ciegos; se seudonimizan `PersonId` y cargo; la cuenta se elimina si no le quedan fichas. | RN-126 a RN-128 · ADR-0002 |
| RQ-A06 | La Junta Directiva ve el log de auditoría sin nombres ni datos de contacto, y la morosidad solo agregada; el estado de cuenta por unidad lo ve solo el Administrator. Cierra P-06. | RN-047, RN-059 · RN-124 y RN-125 nuevas · glosario #34 y #50 · matriz P7, S2b y S2c nueva |
| RQ-A07 | La base legal del tratamiento previo al consentimiento (padrón e invitados) y la inscripción del banco de datos pasan a los bloqueantes para operar con datos reales. El MVP con datos sintéticos no cambia. | Alcance §0 |
| RQ-A08 | Al reservar se declara cuántas personas de la unidad asisten (mínimo 1, el anfitrión); aforo = ese número + invitados. Si reserva el Administrator, elige un anfitrión con vínculo activo y aplican todas las reglas del área excepto RN-077. | RN-023 y RN-076 · RN-123 nueva · glosario #51, #55 y #56 nuevos |
| RQ-A09 | Los estados son `Draft`, `Submitted` y `Approved`; un rechazo es una decisión que devuelve a `Draft`. Cada decisión queda en un historial visible en el expediente, por cargo y fecha. Cierra P-02. | RN-040, RN-041, RN-096, RN-098 · glosario #29 y #31 |
| RQ-A11 | La excepción de merge del autor no cubre `00-constitucion.md` ni `.github/workflows/`, que exigen un ADR aceptado en el mismo PR. El check del CI también rechaza commits con el trailer `Co-Authored-By` de un agente sobre esos archivos. **Sustituida en la constitución 1.3** por R2-C01 y R2-A01 (segunda reauditoría): el autor sí mergea esos cambios con un ADR aceptado y los checks en verde, y el trailer ya no bloquea. | Constitución 1.2 (PRINCIPIO-009 y 010) · ADR-0005 |
| RQ-A12 | Los datos personales del log de auditoría se cifran y se seudonimizan al archivar a la persona; las entradas no se borran mientras exista el condominio. | RN-129 y RN-130 nuevas · glosario #50 · ADR-0002 |
| RQ-A10 | Se rechaza una franja cuyo fin no es posterior a su inicio. Las franjas se definen en minutos exactos, sin duración mínima. | RN-119 y RN-120 nuevas |

### Pendientes

- Quedan los 23 hallazgos medios y los 11 bajos de [reauditoria-qa.md](reauditoria-qa.md).
- La versión 1.2 de la constitución (RQ-A11) se redactó con asistencia de IA y el autor la adopta como enmienda propia, igual que la 1.1 (RQ-C01).

---

# Segunda reauditoría (2026-11-02)

Un agente nuevo, que solo leyó `agente-qa.xml`, reauditó el Spec Pack: **3 / 5**, con 45 hallazgos (2 críticos, 11 altos, 23 medios y 9 bajos). El informe está en [reauditoria-qa-2.md](reauditoria-qa-2.md).

### Hallazgos resueltos

| # | Decisión (2026-11-02, Jose Bustamante) | Aplicado en |
|---|---|---|
| R2-C01 | Los PR del autor humano que cambian `00-constitucion.md` o `.github/workflows/` se mergean sin aprobación, solo con un ADR aceptado en el mismo PR y todos los status checks en verde. Los PR de la GitHub App de los agentes que tocan esas rutas se rechazan siempre. | Constitución 1.3 (encabezado, PRINCIPIO-009 y PRINCIPIO-010) · ADR-0005 · ADR-0009 · Alcance §5 y §7 (D2, D3) |
| R2-C02 | Al archivar, la fila `Person` se conserva solo con `PersonId` y `CondominiumId`; las relaciones hacia `Person` no se borran en cascada. (Ya aplicado antes de esta sección.) | RN-127, RN-128 · ADR-0002 |
| R2-A01 | El trailer `Co-Authored-By` de un agente ya no bloquea: indica asistencia y el autor responde por el cambio. | Constitución 1.3 (PRINCIPIO-009 "Control técnico" y PRINCIPIO-010) · ADR-0005 · ADR-0009 |
| R2-A02 | Dos rulesets en `main`: uno exige los status checks sin ningún bypass y otro exige 1 aprobación con bypass solo para la cuenta del autor. El check de rutas protegidas se ejecuta desde la definición del workflow en `main`, no desde la rama del PR. Verificarlo en GitHub es tarea de la semana 1. | Constitución 1.3 (PRINCIPIO-009) · ADR-0005 (Decision Outcome y Confirmation) · Alcance §0 y D2 |
| R2-A03 | `testssl.sh` (GPL-2.0) se reemplaza por `tlsx` de ProjectDiscovery (MIT; `-version-enum` y `-cipher-enum`). | Constitución 1.3 (PRINCIPIO-005, ejemplo) · RN-013 · ADR-0009 |
| R2-A04 | Al archivar una ficha `Person` se borran solo los datos de esa ficha; los de la cuenta `User` se borran solo con RN-128. (Ya aplicado antes de esta sección.) | RN-127, RN-128 · ADR-0002 |
| R2-A05 | Si la persona vuelve antes de que venza su plazo, el plazo se anula y se reutilizan su ficha `Person` y su cuenta, que se reactiva. Si vuelve después de archivada, se crea una ficha nueva desde una invitación, sin restaurar los datos archivados; la cuenta `User` se reutiliza si todavía existe. | RN-131 a RN-135 nuevas · RN-068, RN-073 · glosario #5, #42 y #52 |
| R2-A06 | Nuevo job diario `OccupancyLifecycleJob` para los eventos por fecha (fin de vínculos, revocación de RN-060, desactivación de RN-073), agregado a la lista cerrada de procesos de plataforma. `Completed` se calcula al consultar, sin job. | RN-136 nueva · RN-060, RN-073, RN-085, RN-104 · ADR-0003 · glosario #22, #44 y #57 nuevo |
| R2-A07 | Al revocar un rol se invalidan en ese momento todas las sesiones de esa persona en ese condominio, y se anulan las invitaciones pendientes que emitió o recibió con ese rol. | RN-137 a RN-139 nuevas |
| R2-A08 | `Rejected` sale de los estados de `SupplierHire` y pasa a una fila de decisiones. (Ya aplicado antes de esta sección.) | Glosario, tabla de campos |
| R2-A09 | El TOTP es de la cuenta global: si la persona tiene Administrator o BoardMember en cualquier condominio, lo enrola antes de su primera sesión con ese rol y se le pide en todo inicio de sesión. El proceso de plataforma también restablece el MFA de un BoardMember. Los 10 códigos de recuperación se pueden regenerar tras validar un TOTP; los anteriores dejan de servir. | RN-008, RN-062, RN-112 · RN-140 y RN-141 nuevas · ADR-0003 · ADR-0008 · matriz (regla 2, P3 y P9 nueva) · glosario #42 y #44 |
| R2-A10 | Los totales mensuales no incluyen los gastos anulados, que siguen visibles en el detalle con su motivo. Cada gasto cuenta en el mes de su fecha; el detalle muestra también la fecha de registro. | RN-035 · RN-142 a RN-144 nuevas |
| R2-A11 | Solo el titular, desde su perfil y después del consentimiento, registra y edita su DNI o carné de extranjería y su teléfono; el Administrator solo los ve. DNI de 8 dígitos, carné de extranjería de 9 a 12 caracteres alfanuméricos, teléfono móvil de 9 dígitos que empieza con 9. Son opcionales. | RN-145 a RN-150 nuevas · matriz R2, R8 y R9 nuevas · glosario #5 y tabla de campos (`DocumentType` nuevo) |

**Notas.**
- Herramienta de TLS: `sslyze` se descartó por su licencia AGPL-3.0 y `testssl.sh` por GPL-2.0 (PRINCIPIO-002). Se usa `tlsx` (MIT).
- El comportamiento de los rulesets y de los workflows de GitHub (bypass separado de los status checks, y ejecución del check desde `main`) **no está verificado**. Queda como tarea de la semana 1 en el ADR-0005.
- La versión 1.3 de la constitución se redactó con asistencia de IA y el autor la adopta como enmienda propia, con el mismo criterio que la 1.1 y la 1.2 (RQ-C01; ADR-0009, "More Information").

### Pendientes

- Quedan los 23 hallazgos medios y los 9 bajos de [reauditoria-qa-2.md](reauditoria-qa-2.md).

### Huecos cerrados después de la segunda reauditoría (2026-11-02)

| # | Decisión (Jose Bustamante) | Aplicado en |
|---|---|---|
| R2-A02 (cierre) | Un agente solo trabaja en GitHub con la identidad de la GitHub App, nunca con la de una persona, y la App no tiene el permiso `workflows`. | Constitución **1.4** (PRINCIPIO-009.10) · ADR-0005 · ADR-0009 |
| R2-A09 (orden) | Contraseña → TOTP → selector de condominio. | RN-064 |
| R2-A11 (resto) | El titular cambia su correo con un enlace de confirmación al correo nuevo (1 h, un solo uso), y el correo anterior recibe un aviso. Los mensajes de error no revelan que un correo o un DNI pertenece a otra persona. El teléfono se valida después de quitar espacios, guiones y el prefijo `+51`. | RN-069, RN-150 · RN-151 a RN-153 nuevas · matriz R10 |

La versión 1.4 de la constitución se registró con el mismo criterio que la 1.1 y la 1.3. Hay copia de la 1.3 fuera del repositorio.

# Tercera reauditoría (2026-11-02)

Informe: [reauditoria-qa-3.md](reauditoria-qa-3.md). Puntaje 3.5/5; 0 CRÍTICAS, 5 ALTAS, 31 MEDIAS, 16 BAJAS.

| # | Decisión (Jose Bustamante) | Aplicado en |
|---|---|---|
| R3-A01 | Agregar a la verificación de la semana 1 un caso negativo: la GitHub App intenta aprobar y mergear un PR del autor, y GitHub debe rechazar ambas acciones. Hasta entonces, "la App no puede aprobar ni mergear" queda como no verificado. | ADR-0005 (Decision Outcome, Confirmation d) · Alcance §5 y §7 D2 |
| R3-A02 | RN-153 se aplica en todo, también al Administrator: un solo código `PERSON_REGISTRATION_REJECTED` para correo o DNI repetido, y la cuenta bloqueada responde igual que una credencial incorrecta (`SIGN_IN_FAILED`). El Administrator no sabrá por qué falló un registro. | RN-068, RN-069, RN-111, RN-132, RN-153 |
| R3-A03 | El cambio afecta solo el correo de login de la cuenta `User`; el correo de cada ficha `Person` es de contacto y no cambia; nadie cambia el correo de login de otra persona. Si el correo nuevo está en uso, la respuesta es idéntica y no se envía enlace. Se reautentica con contraseña y TOTP. El aviso al correo anterior trae un enlace de reversión (un solo uso, 7 días) que restaura el correo, cierra las sesiones y obliga a cambiar la contraseña. | RN-151, RN-152 · RN-154 a RN-156 nuevas · matriz R10 |
| R3-A04 (absorbe R2-M02) | Un vínculo activo o futuro anula el plazo de retención, y el plazo nuevo solo empieza sin vínculos activos ni futuros y sin roles. La cuenta se reactiva y el acceso empieza en la `StartDate`, no al registrar el vínculo; la invitación de una persona con solo vínculos futuros se rechaza hasta esa fecha. | RN-005, RN-073, RN-131, RN-133, RN-136 · RN-157 nueva |
| R2-A04 (cierre) | El consentimiento se registra por ficha `Person` (por condominio). La persona lo acepta en cada condominio, también al entrar con una cuenta existente, y archivar una ficha archiva solo su consentimiento. Queda marcado con ⚠️ Q18. | RN-010, RN-012, RN-071, RN-126, RN-135 · glosario #18 |
