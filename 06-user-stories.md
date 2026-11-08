# CondoHub — Historias de usuario

> **Fase:** Planificación (Agente PO, BMAD) · **Revisión QA:** Agente QA Funcional, 2026-11-02
> **Fecha:** 2026-11-02 · **Versión:** v0.5 (2026-11-08): criterios de RN-169 a RN-179 y correcciones de la auditoría del Spec Finalizer (Q25 resuelta)
> **Autor:** Jose Bustamante
> **Documentos relacionados:** [00-constitucion.md](00-constitucion.md) · [01-project-brief.md](01-project-brief.md) · [02-alcance.md](02-alcance.md) · [03-reglas-de-negocio.md](03-reglas-de-negocio.md) · [04-glosario.md](04-glosario.md) · [05-preguntas-abiertas.md](05-preguntas-abiertas.md) · [docs/security/permissions-matrix.md](docs/security/permissions-matrix.md) · [ADR-0010](docs/adr/0010-defer-arco-and-complaints-book.md)

## Convenciones

**Alcance del lote.** Este lote cubre el MVP completo (M1–M6 de [02-alcance.md](02-alcance.md)) en 19 HU. HU-001B (invitar a una persona) se reincorporó el 2026-11-04, a partir de la HU sugerida HU-S01, por el hallazgo BK-C01 de la auditoría del backlog. El rango previsto era de 8 a 12. El autor decidió dividir las dos HU más grandes (la reserva y la contratación) para cumplir el criterio *Small* de INVEST, aunque eso deje el lote por encima del rango. La revisión QA dividió cuatro más (HU-002, HU-003, HU-006 y HU-010) por el mismo motivo: cada HU dividida conserva su identificador, y la parte nueva lleva el sufijo **B**.

**Priorización.** Las 19 HU son **Must**, y eso es el resultado de la priorización, no una omisión:
- La priorización MoSCoW ya se hizo a nivel de funcionalidad en [02-alcance.md](02-alcance.md): M1–M6 son el MVP (Must), S1–S5 vienen después del MVP (Should), C1–C4 se hacen si sobra tiempo (Could) y W1–W13 quedan fuera (Won't).
- Cada HU de este lote se apoya en reglas que [03-reglas-de-negocio.md](03-reglas-de-negocio.md) clasifica como MUST. Bajar una de estas HU a Should dejaría reglas MUST sin implementar en el MVP.
- Por eso, dentro de Must, el campo **Orden** fija la secuencia de entrega. El criterio es: primero lo que habilita el acceso (E1), luego el beneficio 1 (E2–E3, reservar en minutos) y al final el beneficio 2 (E4–E5, ver en qué se gasta cada sol). Dentro de cada épica, cada HU va antes que las que consumen sus datos.
- Las funcionalidades Should, Could y Won't se listan al final, sin HU detallada.

**Formato de los criterios.** Cada criterio describe **un solo escenario** con un resultado observable: un estado, un dato visible, un código HTTP o un código de error. El cifrado, el aislamiento entre condominios y la accesibilidad no se escriben como criterios, porque forman parte de la definición de terminado (ver *Requisitos transversales*).

**Valores de los criterios.** Las personas, unidades y montos son **sintéticos** (PRINCIPIO-008) y coinciden con los ejemplos de [03-reglas-de-negocio.md](03-reglas-de-negocio.md). Las áreas comunes usan esta configuración:

| Área | Horario | Duración máxima | Aforo | Anticipación máxima | Reservas por unidad al mes |
|---|---|---|---|---|---|
| Salón de fiestas | 09:00 a 23:00 | 18,000 s (5 h) | 40 | 7,776,000 s (90 días) | 2 |
| Parrilla | 11:00 a 22:00 | 14,400 s (4 h) | 15 | 2,592,000 s (30 días) | 4 |

**Rechazos.** Un rechazo por validación, estado o tiempo responde `422` con Problem Details y el código de error de la regla (RN-102). Un rechazo por permiso responde `403` (RN-118). Un recurso de otro condominio responde `404` antes de evaluar el permiso (RN-017, RN-103). Cada mensaje visible sale de `es-PE.resx` (RN-054).

**Marcas en las reglas.**
- **⚠️ Qn:** la regla depende de una pregunta abierta de [05-preguntas-abiertas.md](05-preguntas-abiertas.md). Si la respuesta cambia la regla, los criterios que la usan se revisan.
- **⏸ ADR-0020:** la regla está diferida fuera del MVP por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md); el criterio que la usa no se prueba en el MVP.
- RN-158 a RN-162 las propuso el PO al escribir este lote; el autor las **aprobó el 2026-11-04**.

**Marcas de la revisión QA.**
- **[NUEVO]:** criterio agregado por el Agente QA. Lleva entre paréntesis su tipo: *(positivo)*, *(negativo)* o *(borde)*.
- **[CORREGIDO]:** criterio existente cuya redacción se corrigió para darle un valor concreto o alinearlo con una regla. El cambio está explicado en *Revisión QA*.
- En **Reglas de negocio relacionadas**, una regla agregada por QA se marca con **[NUEVO]**.
- Al dividir una HU, los criterios existentes se movieron a la parte nueva sin cambiar su texto.

**Requisitos transversales.** Cada HU incluye, sin repetirlos en sus criterios: el test cross-tenant por endpoint (PRINCIPIO-003), el cifrado de datos personales (PRINCIPIO-005), WCAG 2.1 AA (PRINCIPIO-011), la cobertura de pruebas (PRINCIPIO-010) y su documentación OpenAPI y Postman (PRINCIPIO-012). Forman parte de la definición de terminado, no de la priorización.

**Actores.** "Propietario" es un usuario con rol `NonResidentOwner`, o con rol `Resident` y un vínculo activo con `OccupancyType = Owner` (ADR-0001). Ese usuario cumple la política `CanViewCondominiumFinancials`. "Inquilino" es un `Resident` cuyos vínculos activos son todos `Tenant`.

---

## Resumen

| HU | Título | Épica | Prioridad | Orden | Reglas principales |
|---|---|---|---|---|---|
| HU-001 | Registrar unidades y vínculos en el padrón | E1 Padrón y acceso | Must | 1 | RN-001, RN-002, RN-003, RN-058 |
| HU-001B | Invitar a una persona del padrón | E1 Padrón y acceso | Must | 2 | RN-007, RN-110, RN-157, RN-165 |
| HU-002 | Activar la cuenta por invitación | E1 Padrón y acceso | Must | 3 | RN-007, RN-110, RN-116, RN-165 |
| HU-002B | Aceptar el consentimiento informado | E1 Padrón y acceso | Must | 4 | RN-010, RN-011, RN-012, RN-071 |
| HU-003 | Iniciar sesión con MFA como Administrator o BoardMember | E1 Padrón y acceso | Must | 5 | RN-008, RN-140, RN-112 |
| HU-003B | Bloquear la cuenta ante intentos fallidos y cerrar sesiones | E1 Padrón y acceso | Must | 6 | RN-111, RN-113, RN-114 |
| HU-004 | Configurar las reglas de un área común | E2 Reservas | Must | 7 | RN-082, RN-159, RN-160, RN-162 |
| HU-005 | Reservar una franja válida con confirmación automática | E2 Reservas | Must | 8 | RN-019, RN-021, RN-022, RN-079, RN-163 |
| HU-006 | Evitar cruces de reservas y respetar el cupo de la unidad | E2 Reservas | Must | 9 | RN-024, RN-080, RN-081 |
| HU-006B | Reservar solo a nombre de una unidad permitida | E2 Reservas | Must | 10 | RN-025, RN-075, RN-076, RN-077 |
| HU-007 | Registrar a los invitados de una reserva | E2 Reservas | Must | 11 | RN-023, RN-123, RN-086, RN-087 |
| HU-008 | Cancelar una reserva y avisar al residente | E2 Reservas | Must | 12 | RN-083, RN-084, RN-161, RN-088 |
| HU-009 | Ver las reservas del día y marcar el ingreso en portería | E3 Portería | Must | 13 | RN-029, RN-030, RN-026, RN-158, RN-164 |
| HU-010 | Registrar un gasto con su comprobante | E4 Gastos | Must | 14 | RN-032, RN-033, RN-034, RN-093, RN-094 |
| HU-010B | Anular un gasto o vincularlo a una contratación | E4 Gastos | Must | 15 | RN-091, RN-092, RN-095, RN-167 |
| HU-011 | Consultar los gastos por categoría y por mes | E4 Gastos | Must | 16 | RN-035, RN-090, RN-036, RN-015 |
| HU-012 | Registrar una contratación con cotizaciones y enviarla a la Junta | E5 Contrataciones | Must | 17 | RN-096, RN-037, RN-038, RN-097 |
| HU-013 | Aprobar o rechazar una contratación como Junta Directiva | E5 Contrataciones | Must | 18 | RN-039, RN-040, RN-098, RN-099 |
| HU-014 | Consultar el expediente de una contratación como propietario | E5 Contrataciones | Must | 19 | RN-041, RN-015, RN-016 |

---

## E1. Padrón y acceso (M1, M2)

### HU-001: Registrar unidades y vínculos en el padrón

**Prioridad:** Must · **Orden:** 1

**Como** Administrator, **quiero** registrar las unidades de cada torre y el vínculo de cada persona con su unidad como propietario o inquilino, **para** que el sistema sepa quién puede reservar y quién puede ver la información financiera.

**Criterios de aceptación:**
- DADO QUE la torre A no tiene la unidad 502, CUANDO el Administrator registra la unidad `502` en la torre A, ENTONCES la unidad queda registrada con el `CondominiumId` del Administrator.
- DADO QUE la torre A ya tiene la unidad 502, CUANDO el Administrator registra otra unidad `502` en la torre A, ENTONCES el sistema responde `422` con `UNIT_NUMBER_DUPLICATE`.
- DADO QUE el Administrator registra una unidad, CUANDO el número es `52` (2 dígitos), ENTONCES el sistema responde `422` con `UNIT_NUMBER_INVALID_FORMAT`.
- DADO QUE el Administrator registra una unidad, CUANDO el número es `12345` (5 dígitos), ENTONCES el sistema responde `422` con `UNIT_NUMBER_INVALID_FORMAT`.
- DADO QUE Ana no aceptó el consentimiento, CUANDO el Administrator la vincula a A-502 con `OccupancyType = Owner`, ENTONCES la ficha de Ana muestra solo su nombre, su correo y el vínculo, y no ofrece campos de DNI ni de teléfono.
- DADO QUE Luis Rojas tiene el rol `NonResidentOwner`, CUANDO el Administrator registra un vínculo `Tenant` para Luis, ENTONCES el sistema responde `422` con `OCCUPANCY_TENANT_NOT_ALLOWED`.
- **[CORREGIDO]** DADO QUE Ana ya está registrada con el correo `ana.quispe@example.pe`, CUANDO el Administrator registra a otra persona con `ana.quispe@example.pe`, ENTONCES el sistema responde `422` con `PERSON_REGISTRATION_REJECTED` y el mensaje "No se pudo registrar a la persona con estos datos.".
- **[CORREGIDO 2026-11-08, Spec Finalizer]** DADO QUE el Administrator crea el vínculo `Tenant` de Carla Díaz con A-301 el 2026-11-15T09:30:00-05:00, CUANDO se guarda, ENTONCES el log de auditoría registra una entrada con el valor anterior vacío, el valor nuevo `A-301 · Tenant`, el Administrator como autor y la fecha-hora `2026-11-15T09:30:00-05:00` (verificable con una prueba de integración; la vista del log está diferida por el ADR-0020).
- **[NUEVO]** *(borde)* DADO QUE la torre A no tiene la unidad 1203, CUANDO el Administrator registra la unidad `1203` (4 dígitos, el máximo) en la torre A, ENTONCES la unidad queda registrada.
- **[NUEVO]** *(borde)* DADO QUE la torre A ya tiene la unidad 502, CUANDO el Administrator registra la unidad `502` en la torre B, ENTONCES la unidad queda registrada en la torre B.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator registra una unidad, CUANDO el número es `5-02`, ENTONCES el sistema responde `422` con `UNIT_NUMBER_INVALID_FORMAT`.
- **[NUEVO]** *(negativo)* DADO QUE `ana.quispe@example.pe` ya está en el padrón, CUANDO el Administrator registra a otra persona con `Ana.Quispe@Example.pe` (mismo correo con otras mayúsculas), ENTONCES el sistema responde `422` con `PERSON_REGISTRATION_REJECTED`.
- **[NUEVO]** *(negativo)* DADO QUE Marco Salazar tiene el rol BoardMember, CUANDO intenta registrar la unidad `503` en la torre A, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(negativo)* ⏸ ADR-0020 DADO QUE Jorge Paredes registró su teléfono `987654321` desde su perfil, CUANDO el Administrator intenta cambiarlo por `912345678`, ENTONCES el sistema responde `403` con `PERSONAL_DATA_OWNER_ONLY` y el teléfono sigue siendo `987654321`.
- **[NUEVO]** *(borde)* DADO QUE el plazo de retención de Carla Díaz vence el 2027-05-01 y su ficha no está archivada, CUANDO el 2027-03-01 el Administrator registra a `carla.diaz@example.pe` con un vínculo `Tenant` con A-301, ENTONCES el vínculo se agrega a la ficha existente de Carla (mismo `PersonId`) y el sistema no responde `PERSON_REGISTRATION_REJECTED`.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el condominio ya tiene la torre `A`, CUANDO el Administrator agrega la torre `"a "`, ENTONCES el sistema responde `422` con `TOWER_CODE_DUPLICATE` (RN-170).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator registra el vínculo `Tenant` de Carla con A-301, CUANDO la fecha de inicio es 2027-01-31 y la de fin 2026-11-10, ENTONCES el sistema responde `422` con `OCCUPANCY_END_BEFORE_START` (RN-174).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE Carla tiene un vínculo `Tenant` con A-301 del 2026-11-10 al 2027-01-31, CUANDO el Administrator le registra otro vínculo con A-301 desde el 2027-01-31, ENTONCES el sistema responde `422` con `OCCUPANCY_OVERLAP` (RN-176); desde el 2027-02-01 lo acepta.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator registra una persona, CUANDO el nombre llega vacío o solo con espacios, ENTONCES el sistema responde `422` con `FIELD_REQUIRED` en el campo "Nombre" (RN-172).

**Reglas de negocio relacionadas:** RN-001, RN-002, RN-003, RN-004, RN-057 ⚠️ Q18, RN-058, RN-059, RN-068, RN-153, RN-131 **[NUEVO]**, RN-132 **[NUEVO]**, RN-146 **[NUEVO]** ⏸ ADR-0020, RN-170, RN-172, RN-174 **[NUEVO 2026-11-08]**, RN-176 **[NUEVO 2026-11-08, Spec Finalizer]**

**Notas:**
- El correo se compara por índice ciego (ADR-0004). El mensaje es neutro también ante el Administrator (RN-153).
- El DNI y el teléfono no se capturan aquí: solo el titular los registra desde su perfil (RN-145, RN-146).
- La importación por CSV es S5 y queda fuera de este lote.
- Terminar o modificar un vínculo (RN-059, RN-016) no tiene HU en este lote (ver *HUs sugeridas (descartadas)*).
- El perfil del titular (RN-145, RN-146) está diferido por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md): el criterio de `PERSONAL_DATA_OWNER_ONLY` no se prueba en el MVP.

---

### HU-001B: Invitar a una persona del padrón

**Prioridad:** Must · **Orden:** 2

**Como** Administrator, **quiero** invitar por correo a una persona registrada en el padrón, **para** que cree su cuenta y entre al condominio con el rol que corresponde a su vínculo.

**Criterios de aceptación:**
- *(positivo)* DADO QUE Ana está en el padrón con un vínculo `Owner` activo con A-502 y no tiene cuenta, CUANDO el Administrator la invita como `Resident` el 2026-12-01T10:00:00-05:00, ENTONCES el sistema responde `201`, la invitación vence el 2026-12-08T10:00:00-05:00 y el buzón de prueba recibe un correo con un enlace de un solo uso.
- *(negativo)* DADO QUE el 2027-03-01 Sofía Torres tiene un único vínculo `Tenant` con A-305 con `StartDate = 2027-08-01` y ningún rol, CUANDO el Administrator la invita ese día, ENTONCES el sistema responde `422` con `OCCUPANCY_NOT_STARTED` y no envía ningún correo.
- *(borde)* DADO QUE el vínculo de Sofía con A-305 empieza el 2027-08-01, CUANDO el Administrator la invita el 2027-08-01T00:00:00-05:00, ENTONCES el sistema crea la invitación.
- *(negativo)* DADO QUE Carla Díaz solo tiene un vínculo `Tenant` con A-301, CUANDO el Administrator la invita como `NonResidentOwner`, ENTONCES el sistema responde `422` con `OCCUPANCY_TENANT_NOT_ALLOWED`.
- *(negativo)* DADO QUE Marco Salazar tiene el rol BoardMember, CUANDO intenta invitar a Ana, ENTONCES el sistema responde `403`.
- *(positivo)* DADO QUE el Administrator invitó a Ana, CUANDO abre su ficha, ENTONCES la ficha muestra "Invitación pendiente" con la fecha de vencimiento.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el único vínculo de Carla con A-301 terminó el 2027-01-31 y no tiene vínculos futuros, CUANDO el 2027-03-01 el Administrator la invita como `Resident`, ENTONCES el sistema responde `422` con `OCCUPANCY_NOT_ACTIVE` y no envía ningún correo (RN-175).

**Reglas de negocio relacionadas:** RN-007, RN-110, RN-157, RN-165, RN-175 **[NUEVO 2026-11-08]**

**Notas:**
- El token viaja solo en el correo y la base guarda solo su hash. Ningún entorno distinto de producción envía correos reales (PRINCIPIO-009): en desarrollo y pruebas el correo queda en un buzón de prueba.
- La aceptación de la invitación es HU-002. Backlog: T-049.

---

### HU-002: Activar la cuenta por invitación

**Prioridad:** Must · **Orden:** 3

**Como** persona invitada por el Administrator a ser Resident, NonResidentOwner o Concierge, **quiero** crear mi cuenta desde la invitación, **para** entrar a la plataforma con una contraseña que solo yo conozco.

**Criterios de aceptación:**
- DADO QUE Ana recibió una invitación emitida el 2026-12-01T10:00:00-05:00, CUANDO la usa el 2026-12-05 con una contraseña de 14 caracteres, ENTONCES el sistema crea su cuenta y le muestra la pantalla de consentimiento.
- DADO QUE la invitación de Ana se emitió el 2026-12-01T10:00:00-05:00, CUANDO intenta usarla el 2026-12-08T10:00:01-05:00 (más de 604,800 s después), ENTONCES el sistema responde `422` con `INVITATION_EXPIRED` y no crea la cuenta.
- DADO QUE Ana define su contraseña, CUANDO tiene 11 caracteres, ENTONCES el sistema responde `422` con `PASSWORD_LENGTH_INVALID`.
- DADO QUE Ana define su contraseña, CUANDO tiene 65 caracteres, ENTONCES el sistema responde `422` con `PASSWORD_LENGTH_INVALID`.
- DADO QUE `password1234` está en la lista local de contraseñas filtradas, CUANDO Ana la define como contraseña, ENTONCES el sistema responde `422` con `PASSWORD_BREACHED`.
- **[NUEVO]** *(borde)* DADO QUE la invitación de Ana se emitió el 2026-12-01T10:00:00-05:00, CUANDO la usa el 2026-12-08T10:00:00-05:00 (exactamente 604,800 s después), ENTONCES el sistema crea su cuenta.
- **[NUEVO]** *(borde)* DADO QUE Ana define su contraseña, CUANDO es `edificio2026` (exactamente 12 caracteres, fuera de la lista de filtradas), ENTONCES el sistema la acepta.
- **[NUEVO]** *(borde)* DADO QUE Ana define su contraseña, CUANDO tiene exactamente 64 caracteres y no está en la lista de filtradas, ENTONCES el sistema la acepta.
- **[NUEVO]** *(positivo)* DADO QUE Ana define su contraseña, CUANDO es `mi edificio tiene piscina` (25 caracteres, sin mayúsculas, números ni símbolos), ENTONCES el sistema la acepta sin pedir reglas de composición.
- **[NUEVO]** *(negativo)* DADO QUE Ana aceptó su invitación el 2026-12-05T10:00:00-05:00, CUANDO alguien abre el mismo enlace a las 10:30, ENTONCES el sistema responde `422` con `INVITATION_ALREADY_USED` y el mensaje "Esta invitación ya no es válida. Pide una nueva a la administración.", y no crea ni une ninguna cuenta.
- **[NUEVO]** *(negativo)* DADO QUE la invitación de Raúl Mendoza como Concierge se anuló el 2027-02-10 al revocarse el rol del Administrator que la emitió, CUANDO Raúl la usa el 2027-02-11, ENTONCES el sistema responde `422` con `INVITATION_REVOKED` y no crea la cuenta.
- **[NUEVO]** *(negativo)* DADO QUE Ana ya tiene cuenta por "Residencial Los Olivos" y el Administrator de "Torres del Parque" la invita con el mismo correo, CUANDO abre el enlace sin haber iniciado sesión, ENTONCES el sistema le pide iniciar sesión con su cuenta existente y no crea una segunda cuenta.

**Reglas de negocio relacionadas:** RN-007, RN-009, RN-110, RN-116, RN-117, RN-122, RN-138 **[NUEVO]**, RN-139 **[NUEVO]**, RN-165 **[NUEVO]**

**Notas:**
- La contraseña se guarda como hash Argon2id con memoria ≥ 64 MiB, iteraciones ≥ 3 y paralelismo ≥ 1 (RN-009). Se verifica con un test de integración.
- Si el correo ya tiene cuenta en otro condominio, la persona inicia sesión con esa cuenta para aceptar (RN-122).
- El consentimiento que se muestra al crear la cuenta se cubre en HU-002B.

---

### HU-002B: Aceptar el consentimiento informado

**Prioridad:** Must · **Orden:** 4

**Como** persona que activó su cuenta, **quiero** leer y aceptar el consentimiento informado de mi condominio, **para** usar la plataforma sabiendo cómo se tratan mis datos.

**Criterios de aceptación:**
- **[CORREGIDO]** DADO QUE Ana no aceptó el consentimiento vigente, CUANDO intenta abrir `/reservations`, ENTONCES el sistema la redirige a la pantalla de consentimiento y no le muestra la pantalla de reservas.
- DADO QUE Ana abre la pantalla de consentimiento, CUANDO lee el texto, ENTONCES encuentra la declaración de la transferencia internacional de sus datos a Azure South Central US (Estados Unidos).
- **[CORREGIDO]** DADO QUE Ana acepta la versión `2026-11-01.v1` del consentimiento el 2026-12-05T10:15:00-05:00, CUANDO se guarda, ENTONCES su ficha `Person` del condominio registra `{ consentVersion: "2026-11-01.v1", acceptedAt: "2026-12-05T10:15:00-05:00" }`.
- DADO QUE Ana rechazó el consentimiento, CUANDO vuelve a iniciar sesión con su contraseña correcta, ENTONCES el sistema le muestra otra vez solo la pantalla de consentimiento y no le permite abrir `/reservations`.
- **[NUEVO]** *(borde)* DADO QUE Ana aceptó la versión `2026-11-01.v1` y el 2027-01-10 se publica la versión `2027-01-10.v2`, CUANDO inicia sesión el 2027-01-11, ENTONCES solo ve la pantalla del consentimiento `2027-01-10.v2` hasta aceptarlo.
- **[NUEVO]** *(borde)* DADO QUE Ana aceptó el consentimiento en "Residencial Los Olivos", CUANDO entra por primera vez a "Torres del Parque", ENTONCES solo ve la pantalla de consentimiento de "Torres del Parque" hasta aceptarlo con su ficha de ese condominio.

**Reglas de negocio relacionadas:** RN-010 ⚠️ Q18 ⚠️ Q32, RN-011, RN-012 ⚠️ Q18 ⚠️ Q32, RN-070, RN-071 **[NUEVO]**

**Notas:**
- La base legal y el texto final del consentimiento dependen de Q18 y Q32.
- Se prueba con una cuenta del seeder, sin HU-002.

---

### HU-003: Iniciar sesión con MFA como Administrator o BoardMember

**Prioridad:** Must · **Orden:** 5

**Como** Administrator o miembro de la Junta Directiva, **quiero** proteger mi cuenta con un código TOTP, **para** que nadie pueda registrar gastos ni aprobar contrataciones con solo mi contraseña.

**Criterios de aceptación:**
- DADO QUE Marco Salazar tiene el rol BoardMember y no enroló su TOTP, CUANDO ingresa su contraseña correcta, ENTONCES el sistema le exige enrolar el TOTP antes de crear la sesión.
- DADO QUE Marco termina el enrolamiento del TOTP, CUANDO se confirma, ENTONCES el sistema le muestra 10 códigos de recuperación de un solo uso, una sola vez.
- DADO QUE Marco ya enroló su TOTP, CUANDO ingresa su contraseña correcta, ENTONCES el sistema le pide el código TOTP antes de crear la sesión.
- **[NUEVO]** *(positivo)* DADO QUE Marco perdió su celular y conserva sus 10 códigos de recuperación, CUANDO ingresa su contraseña correcta y uno de esos códigos en lugar del TOTP, ENTONCES el sistema crea la sesión.
- **[NUEVO]** *(borde)* DADO QUE Marco ya usó 9 de sus 10 códigos de recuperación, CUANDO inicia sesión con su contraseña y el último código sin usar, ENTONCES el sistema crea la sesión.
- **[NUEVO]** *(negativo)* DADO QUE Marco ya usó un código de recuperación para iniciar sesión, CUANDO intenta usar el mismo código otra vez, ENTONCES el sistema responde `422` con `SIGN_IN_FAILED`.
- **[NUEVO]** *(negativo)* DADO QUE Marco ingresó su contraseña correcta, CUANDO ingresa un código TOTP incorrecto, ENTONCES el sistema responde `422` con `SIGN_IN_FAILED` y el mismo mensaje que ante una contraseña incorrecta, y no crea la sesión.
- **[NUEVO]** *(negativo)* DADO QUE Ana Quispe es BoardMember en "Residencial Los Olivos" y solo Resident en "Torres del Parque", CUANDO inicia sesión y elige "Torres del Parque", ENTONCES el sistema también le pide el código TOTP antes de crear la sesión.

**Reglas de negocio relacionadas:** RN-008, RN-074, RN-112, RN-140, RN-153, RN-064 **[NUEVO]**

**Notas:**
- El MFA aplica solo a quien tiene Administrator o BoardMember en algún condominio. El bloqueo y el cierre de sesión aplican a todos los usuarios y se cubren en HU-003B.
- Si el usuario tiene vínculos o roles en más de un condominio, elige el condominio después del TOTP y antes de crear la sesión (RN-064).
- La regeneración de los códigos de recuperación (RN-141) no tiene HU en este lote (ver *HUs sugeridas (descartadas)*).

---

### HU-003B: Bloquear la cuenta ante intentos fallidos y cerrar sesiones

**Prioridad:** Must · **Orden:** 6

**Como** usuario de CondoHub, **quiero** que mi cuenta se bloquee ante intentos fallidos repetidos y que mi sesión se cierre si la dejo abierta, **para** que nadie adivine mi contraseña ni use mi sesión en un equipo compartido, como la PC de portería.

**Criterios de aceptación:**
- DADO QUE la cuenta de Marco acumuló 5 intentos fallidos consecutivos a las 10:00:00, CUANDO ingresa su contraseña y su TOTP correctos a las 10:10:00, ENTONCES el sistema responde `422` con `SIGN_IN_FAILED` y el mismo mensaje que ante una contraseña incorrecta.
- DADO QUE la cuenta de Marco acumuló 5 intentos fallidos consecutivos a las 10:00:00, CUANDO ingresa su contraseña y su TOTP correctos a las 10:15:01 (más de 900 s después), ENTONCES el sistema crea la sesión.
- DADO QUE Marco tiene una sesión abierta con su última actividad a las 10:00:00, CUANDO hace una solicitud a las 10:30:01 (más de 1,800 s sin actividad), ENTONCES el sistema le pide iniciar sesión de nuevo.
- DADO QUE la sesión de Marco se creó a las 08:00:00 y tuvo actividad continua, CUANDO hace una solicitud a las 20:00:01 (más de 43,200 s), ENTONCES el sistema le pide iniciar sesión de nuevo.
- **[NUEVO]** *(borde)* DADO QUE la cuenta de Marco tiene 4 intentos fallidos consecutivos, CUANDO en el quinto intento ingresa su contraseña y su TOTP correctos, ENTONCES el sistema crea la sesión.
- **[NUEVO]** *(borde)* DADO QUE a las 20:10 Marco falló 3 veces la contraseña y luego 2 veces el código TOTP, CUANDO a las 20:11 ingresa su contraseña y su TOTP correctos, ENTONCES el sistema responde `422` con `SIGN_IN_FAILED`, porque el contador suma los dos tipos de fallo.
- **[NUEVO]** *(borde)* DADO QUE el quinto intento fallido de Marco fue a las 10:00:00, CUANDO ingresa su contraseña y su TOTP correctos a las 10:14:59, ENTONCES el sistema responde `422` con `SIGN_IN_FAILED`, y CUANDO los ingresa a las 10:15:00, ENTONCES el sistema crea la sesión.
- **[NUEVO]** *(borde)* DADO QUE Marco tiene una sesión abierta con su última actividad a las 10:00:00, CUANDO hace una solicitud a las 10:29:59, ENTONCES la sesión sigue activa y la solicitud se atiende.
- **[NUEVO]** *(negativo)* DADO QUE la cuenta de Carla Díaz (Resident, sin MFA) acumuló 5 intentos fallidos consecutivos a las 21:00:00, CUANDO ingresa su contraseña correcta a las 21:05:00, ENTONCES el sistema responde `422` con `SIGN_IN_FAILED`.
- **[NUEVO]** *(borde)* DADO QUE Carla dejó la app sin uso desde las 21:00:00, CUANDO hace una solicitud a las 21:30:01, ENTONCES el sistema le pide iniciar sesión de nuevo.
- **[NUEVO 2026-11-08, VL-P020]** *(borde)* DADO QUE Raúl Mendoza (Concierge) hizo su última acción en la vista de portería a las 19:07:00 y la vista se actualiza sola cada 30 s, CUANDO el polling consulta a las 19:37:00, ENTONCES el sistema responde `401` y la pantalla deja de mostrar la lista de invitados, porque el polling no cuenta como actividad (RN-113).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE entre las 10:00:00 y las 10:00:40 llegaron 10 solicitudes de inicio de sesión para `ana.quispe@example.pe`, CUANDO a las 10:00:45 llega la undécima con la contraseña correcta, ENTONCES el sistema responde `429` con `AUTH_RATE_LIMITED` y el encabezado `Retry-After`, sin evaluar la contraseña (RN-177).

**Reglas de negocio relacionadas:** RN-074, RN-111, RN-113, RN-114, RN-153, RN-177 **[NUEVO 2026-11-08, Spec Finalizer]**

**Notas:**
- Mientras dura el bloqueo, la respuesta es la misma que ante una contraseña incorrecta o un correo sin cuenta (RN-111, RN-153).
- Se prueba con cuentas del seeder, sin HU-002 ni HU-003.

---

## E2. Reservas de áreas comunes (M3)

### HU-004: Configurar las reglas de un área común

**Prioridad:** Must · **Orden:** 7

**Como** Administrator, **quiero** configurar el horario, la duración máxima, el aforo, la anticipación máxima y el máximo de reservas por unidad al mes de cada área común, **para** que las reservas que cumplen esas reglas se confirmen sin mi intervención.

**Criterios de aceptación:**
- **[CORREGIDO]** DADO QUE el condominio todavía no tiene un área "Parrilla" (precondición agregada el 2026-11-08 por RN-171, VL-P061) y el Administrator crea la parrilla, CUANDO la configura de 11:00 a 22:00, con 14,400 s de duración máxima, aforo 15, 2,592,000 s de anticipación y 4 reservas por unidad al mes, ENTONCES el sistema responde `201` y al consultar la parrilla devuelve esos cinco valores.
- DADO QUE el Administrator edita el horario de la parrilla, CUANDO lo configura de 20:00 a 02:00, ENTONCES el sistema responde `422` con `COMMON_AREA_INVALID_OPENING_HOURS`.
- DADO QUE el Administrator edita el horario de la parrilla, CUANDO lo configura de 11:00 a 11:00, ENTONCES el sistema responde `422` con `COMMON_AREA_INVALID_OPENING_HOURS`.
- DADO QUE el Administrator edita la parrilla, CUANDO configura el aforo en 0, ENTONCES el sistema responde `422` con `COMMON_AREA_INVALID_LIMITS`.
- DADO QUE el Administrator edita la parrilla, CUANDO configura la duración máxima en 14,430 s (no es múltiplo de 60), ENTONCES el sistema responde `422` con `COMMON_AREA_INVALID_LIMITS`.
- DADO QUE Ana tiene el rol Resident, CUANDO intenta cambiar el aforo de la parrilla, ENTONCES el sistema responde `403` con `COMMON_AREA_CONFIG_FORBIDDEN`.
- DADO QUE Ana tiene el salón `Confirmed` el 2026-12-12 de 19:00 a 23:00 con 40 personas, CUANDO el Administrator baja el aforo del salón a 30 el 2026-12-05, ENTONCES la reserva de Ana sigue `Confirmed` con sus 40 personas.
- DADO QUE el Administrator bajó el aforo del salón a 30, CUANDO Jorge Paredes reserva el salón para el 2026-12-19 con 31 personas, ENTONCES el sistema responde `422` con `RESERVATION_EXCEEDS_CAPACITY`.
- **[NUEVO]** *(borde)* DADO QUE el Administrator edita la parrilla, CUANDO configura aforo 1, duración máxima de 60 s, 60 s de anticipación y 1 reserva por unidad al mes (los mínimos válidos), ENTONCES el sistema guarda la configuración.
- **[NUEVO]** *(borde)* DADO QUE el Administrator edita el horario de la parrilla, CUANDO lo configura de 11:00 a 11:01, ENTONCES el sistema guarda el horario.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator edita la parrilla, CUANDO configura el máximo de reservas por unidad al mes en −1, ENTONCES el sistema responde `422` con `COMMON_AREA_INVALID_LIMITS`.
- **[NUEVO]** *(negativo)* DADO QUE Marco Salazar tiene el rol BoardMember, CUANDO intenta ampliar el horario del salón hasta las 23:59, ENTONCES el sistema responde `403` con `COMMON_AREA_CONFIG_FORBIDDEN`.
- **[NUEVO]** *(borde)* DADO QUE Ana tiene el salón `Confirmed` el 2026-12-12 de 19:00 a 23:00, CUANDO el 2026-12-05 el Administrator cambia el cierre del salón a las 22:00, ENTONCES la reserva de Ana sigue `Confirmed` hasta las 23:00 y una reserva nueva del salón para el 2026-12-19 de 21:00 a 23:00 recibe `422` con `RESERVATION_OUTSIDE_OPENING_HOURS`.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el condominio ya tiene el área "Parrilla", CUANDO el Administrator crea otra área llamada `"parrilla"`, ENTONCES el sistema responde `422` con `COMMON_AREA_NAME_DUPLICATE` (RN-171).

**Reglas de negocio relacionadas:** RN-023 ⚠️ Q11, RN-082 ⚠️ Q11, RN-159, RN-160 ⚠️ Q11, RN-162 ⚠️ Q11, RN-171, RN-172 **[NUEVO 2026-11-08]**

**Notas:**
- Los cinco valores son la configuración simple que supone SP3. Si el reglamento interno exige más reglas (Q11), esta HU se renegocia.
- Para anular una reserva existente tras un cambio de configuración, la administración la cancela de forma explícita (HU-008).

---

### HU-005: Reservar una franja válida con confirmación automática

**Prioridad:** Must · **Orden:** 8

**Como** propietario o inquilino, **quiero** reservar un área común desde mi celular y recibir la confirmación en el mismo envío, **para** no esperar un día la respuesta por correo.

**Criterios de aceptación:**
- DADO QUE el salón está libre el 2026-12-12 y A-502 no tiene reservas del salón en diciembre, CUANDO Ana (`Owner` de A-502) reserva de 19:00 a 23:00 con 1 persona de la unidad, ENTONCES la reserva queda `Confirmed` en el mismo envío, sin aprobación manual.
- DADO QUE Carla Díaz es `Tenant` activa de A-301, CUANDO reserva la parrilla el 2026-12-20 de 12:00 a 15:00 a nombre de A-301, ENTONCES la reserva queda `Confirmed`.
- **[CORREGIDO 2026-11-08, Spec Finalizer]** *(criterio de API)* DADO QUE el salón cierra a las 23:00, CUANDO Ana pide el salón de 20:00 a 00:30 del día siguiente, ENTONCES el sistema responde `422` con `RESERVATION_OUTSIDE_OPENING_HOURS`.
- DADO QUE la duración máxima del salón es 18,000 s, CUANDO Ana pide el salón de 12:00 a 18:30 (23,400 s), ENTONCES el sistema responde `422` con `RESERVATION_EXCEEDS_MAX_DURATION`.
- DADO QUE son las 2026-12-10T10:00:00-05:00, CUANDO Ana pide la parrilla desde las 09:00 de ese día, ENTONCES el sistema responde `422` con `RESERVATION_IN_THE_PAST`.
- DADO QUE hoy es 2026-12-01 y la anticipación máxima del salón es 90 días, CUANDO Ana pide el salón para el 2027-03-15, ENTONCES el sistema responde `422` con `RESERVATION_TOO_FAR_AHEAD`.
- DADO QUE Ana arma una reserva del salón, CUANDO pide de 20:00 a 19:00, ENTONCES el sistema responde `422` con `RESERVATION_INVALID_TIME_SLOT`.
- **[CORREGIDO 2026-11-08, Spec Finalizer]** *(criterio de API)* DADO QUE Ana arma una reserva de la parrilla, CUANDO pide de 12:15:30 a 14:45:00, ENTONCES el sistema responde `422` con `RESERVATION_SLOT_NOT_WHOLE_MINUTES`.
- **[NUEVO]** *(borde)* DADO QUE el salón está libre el 2026-12-12, CUANDO Ana pide el salón de 18:00 a 23:00 (exactamente 18,000 s y termina a la hora de cierre), ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(borde)* DADO QUE la parrilla abre a las 11:00, CUANDO Carla pide la parrilla el 2026-12-20 de 10:59 a 12:00, ENTONCES el sistema responde `422` con `RESERVATION_OUTSIDE_OPENING_HOURS`.
- **[NUEVO]** *(borde)* DADO QUE son las 2026-12-01T10:00:00-05:00, CUANDO Ana pide el salón desde 2027-03-01T10:00:00-05:00 (exactamente 7,776,000 s después) hasta las 12:00, ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(borde)* DADO QUE son las 2026-12-01T10:00:00-05:00, CUANDO Ana pide el salón desde 2027-03-01T10:01:00-05:00 (60 s más que la anticipación máxima), ENTONCES el sistema responde `422` con `RESERVATION_TOO_FAR_AHEAD`.
- **[NUEVO]** *(borde)* DADO QUE la parrilla está libre el 2026-12-20, CUANDO Carla la pide de 12:00 a 12:01 (60 s, sin duración mínima), ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(negativo)* DADO QUE Ana envió el salón de 19:00 a 23:00 del 2026-12-12 con la clave de idempotencia `5f1c…` y la red 3G se cortó antes de recibir la respuesta, CUANDO la app reenvía la misma solicitud con la misma clave a los 20 s, ENTONCES el sistema responde con la misma reserva `Confirmed`, A-502 tiene una sola reserva del salón ese día y su cupo mensual se consume una sola vez.
- **[NUEVO]** *(negativo)* DADO QUE la clave `5f1c…` ya se usó para el salón de 19:00 a 23:00 del 2026-12-12, CUANDO la app la reenvía con la franja de 18:00 a 22:00, ENTONCES el sistema responde `422` con `IDEMPOTENCY_KEY_REUSED` y no crea otra reserva.
- **[NUEVO 2026-11-08, VL-P012]** *(borde)* DADO QUE Ana envió el salón de 20:00 a 19:00 del 2026-12-12 con la clave `7a2e…` y recibió `422` con `RESERVATION_INVALID_TIME_SLOT`, CUANDO corrige la franja a 19:00–23:00 y reenvía con la misma clave, ENTONCES la reserva queda `Confirmed` (un `4xx` no consume la clave, RN-163).
- **[NUEVO 2026-11-08, VL-P012]** *(borde)* DADO QUE son las 2026-11-04T10:30:00-05:00 y la anticipación máxima del salón es 90 días, CUANDO Ana pide el salón el 2027-02-02 de 19:00 a 23:00, ENTONCES el sistema responde `422` con `RESERVATION_TOO_FAR_AHEAD` y el mensaje "Solo puedes reservar hasta el 02/02/2027 a las 10:30." (RN-079 compara instantes, no fechas).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo, UI)* DADO QUE Ana está en P-012 con el salón y la fecha 2026-12-12, CUANDO elige inicio 20:00 y fin 00:30 (la página solo ofrece horas del mismo día), ENTONCES P-012 se vuelve a mostrar con `RESERVATION_INVALID_TIME_SLOT` en el campo "Fin" y los datos escritos.

**Reglas de negocio relacionadas:** RN-019 ⚠️ Q10, RN-021, RN-022, RN-025, RN-078, RN-079 ⚠️ Q11, RN-119, RN-120, RN-163 **[NUEVO]**

**Notas:**
- Las franjas son semiabiertas `[inicio, fin)`.
- HU-005 se puede demostrar sola, pero **no se libera a residentes sin HU-006 ni HU-006B**: sin HU-006, dos unidades podrían confirmar la misma franja; sin HU-006B, alguien podría reservar a nombre de una unidad ajena o alquilada.
- La meta de K2 es una mediana ≤ 600 s entre la solicitud y la confirmación. Depende de SP2 y Q10.

---

### HU-006: Evitar cruces de reservas y respetar el cupo de la unidad

**Prioridad:** Must · **Orden:** 9

**Como** propietario o inquilino que reserva, **quiero** que una franja confirmada a mi unidad no la pueda tomar otra y que cada unidad respete su cupo mensual, **para** no llegar con mis invitados a un área ocupada y para que todas las unidades tengan acceso a las áreas.

**Criterios de aceptación:**
- DADO QUE existe una reserva `Confirmed` del salón de 18:00 a 22:00 el 2026-12-12, CUANDO Jorge Paredes (`Owner` de A-704) pide el salón de 21:00 a 23:00 ese día, ENTONCES el sistema responde `422` con `RESERVATION_OVERLAP`.
- DADO QUE existe una reserva `Confirmed` del salón de 18:00 a 22:00 el 2026-12-12, CUANDO Jorge pide el salón de 22:00 a 23:00 ese día, ENTONCES la reserva queda `Confirmed`.
- DADO QUE Ana y Jorge envían el salón de 19:00 a 23:00 del 2026-12-12 con 200 ms de diferencia, CUANDO ambas solicitudes se procesan, ENTONCES solo la primera que se guarda queda `Confirmed` y la otra recibe `422` con `RESERVATION_OVERLAP`.
- DADO QUE A-502 ya tiene 2 reservas `Confirmed` del salón en diciembre de 2026, CUANDO Ana pide una tercera para el 2026-12-26, ENTONCES el sistema responde `422` con `RESERVATION_MONTHLY_LIMIT_REACHED`.
- DADO QUE Rosa Huamán tiene vínculo activo con A-1104 y A-1104 tiene 3 reservas de la parrilla en diciembre, CUANDO el Administrator reserva la parrilla el 2026-12-19 a nombre de A-1104 con Rosa como anfitriona, ENTONCES la reserva queda `Confirmed` y A-1104 llega a 4 reservas de la parrilla en diciembre.
- **[NUEVO]** *(borde)* DADO QUE existe una reserva `Confirmed` del salón de 18:00 a 22:00 el 2026-12-12, CUANDO Jorge pide el salón de 14:00 a 18:00 ese día, ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(borde)* DADO QUE la única reserva del salón de 18:00 a 22:00 del 2026-12-12 está `Cancelled`, CUANDO Jorge pide el salón de 18:00 a 22:00 ese día, ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(positivo)* DADO QUE el salón está `Confirmed` de 18:00 a 22:00 el 2026-12-12, CUANDO Jorge pide la parrilla de 18:00 a 22:00 ese día, ENTONCES la reserva de la parrilla queda `Confirmed`.
- **[NUEVO]** *(borde)* DADO QUE A-502 tiene 1 reserva `Confirmed` del salón en diciembre de 2026, CUANDO Ana pide otra para el 2026-12-19, ENTONCES la reserva queda `Confirmed` y A-502 llega a 2.
- **[NUEVO]** *(borde)* DADO QUE hoy es 2026-12-01 y A-502 tiene 2 reservas `Confirmed` del salón en diciembre de 2026, CUANDO Ana pide el salón para el 2027-01-02, ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(borde)* DADO QUE A-502 tuvo 2 reservas del salón en diciembre de 2026 y Ana canceló una, CUANDO Ana pide otra para el 2026-12-26, ENTONCES la reserva queda `Confirmed`, porque las reservas `Cancelled` no cuentan para el cupo.
- **[NUEVO]** *(negativo)* DADO QUE A-1104 ya tiene 4 reservas `Confirmed` de la parrilla en diciembre de 2026, CUANDO el Administrator reserva una quinta a nombre de A-1104 con Rosa como anfitriona, ENTONCES el sistema responde `422` con `RESERVATION_MONTHLY_LIMIT_REACHED`.

**Reglas de negocio relacionadas:** RN-024 ⚠️ Q11, RN-076, RN-080 ⚠️ Q11, RN-081, RN-085 **[NUEVO]**

**Notas:**
- RN-081 exige una restricción de unicidad o un control de concurrencia en la base de datos, no solo una validación en la aplicación.
- El Administrator reserva con las mismas reglas que un residente, excepto RN-077 (RN-076).

---

### HU-006B: Reservar solo a nombre de una unidad permitida

**Prioridad:** Must · **Orden:** 10

**Como** propietario o inquilino, **quiero** que solo se pueda reservar a nombre de una unidad con un vínculo activo y que una unidad alquilada la reserve su inquilino, **para** que nadie consuma el cupo de mi unidad ni reserve por mí.

**Criterios de aceptación:**
- DADO QUE Carla Díaz solo tiene vínculo con A-301, CUANDO intenta reservar la parrilla a nombre de A-302, ENTONCES el sistema responde `403` con `RESERVATION_UNIT_NOT_LINKED`.
- DADO QUE B-1203 tiene un vínculo `Tenant` activo de Pedro Salas, CUANDO su propietario Luis Rojas intenta reservar el salón a nombre de B-1203, ENTONCES el sistema responde `403` con `RESERVATION_UNIT_RENTED`.
- **[NUEVO]** *(positivo)* DADO QUE B-1203 tiene un vínculo `Tenant` activo de Pedro Salas, CUANDO Pedro reserva el salón a nombre de B-1203 para el 2026-12-13, ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(positivo)* DADO QUE B-1203 está alquilada a Pedro Salas, CUANDO el Administrator reserva el salón a nombre de B-1203 con Pedro como anfitrión para el 2026-12-20, ENTONCES la reserva queda `Confirmed`.
- **[NUEVO]** *(borde)* DADO QUE Carla tiene un vínculo con A-305 con `StartDate = 2027-08-01`, CUANDO el 2027-03-01 intenta reservar la parrilla a nombre de A-305, ENTONCES el sistema responde `403` con `RESERVATION_UNIT_NOT_LINKED`.
- **[NUEVO]** *(negativo)* DADO QUE Raúl Mendoza tiene solo el rol Concierge, CUANDO intenta reservar el salón para el 2026-12-12, ENTONCES el sistema responde `403`.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator reserva la parrilla a nombre de A-1104, CUANDO no elige anfitrión, ENTONCES el sistema responde `422` con `RESERVATION_HOST_NOT_SELECTED` (RN-178).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator reserva la parrilla a nombre de A-1104, CUANDO elige a Ana Quispe (sin vínculo con A-1104) como anfitriona, ENTONCES el sistema responde `422` con `RESERVATION_HOST_NOT_LINKED` (RN-178).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* ⚠️ Q63 DADO QUE B-1203 está alquilada a Pedro Salas, CUANDO el Administrator reserva el salón a nombre de B-1203 con Luis Rojas como anfitrión, ENTONCES el sistema responde `403` con `RESERVATION_UNIT_RENTED` (RN-178).

**Reglas de negocio relacionadas:** RN-025, RN-075, RN-076, RN-077, RN-178 **[NUEVO 2026-11-08, Spec Finalizer]** ⚠️ Q63

**Notas:**
- Extiende la creación de reservas de HU-005. Se libera junto con HU-005 y HU-006.
- El rechazo del Concierge sale de la celda B3 · Con (⛔) de la matriz de permisos.

---

### HU-007: Registrar a los invitados de una reserva

**Prioridad:** Must · **Orden:** 11

**Como** propietario o inquilino que reserva, **quiero** registrar a mis invitados en el mismo flujo de la reserva, **para** que portería los deje pasar sin que yo tenga que llamar ni anotarlos en papel.

**Criterios de aceptación:**
- DADO QUE Ana reserva el salón (aforo 40) y declara 2 personas de A-502, CUANDO registra 38 invitados, ENTONCES la reserva queda `Confirmed` con 40 personas.
- DADO QUE Ana reserva el salón (aforo 40) y declara 2 personas de A-502, CUANDO registra 39 invitados, ENTONCES el sistema responde `422` con `RESERVATION_EXCEEDS_CAPACITY`.
- DADO QUE Ana arma una reserva con 5 invitados, CUANDO declara 0 personas de la unidad, ENTONCES el sistema responde `422` con `RESERVATION_HOST_REQUIRED`.
- DADO QUE Ana abre la lista de invitados, CUANDO va a guardar al primer invitado, ENTONCES el sistema le muestra el aviso de privacidad sobre el tratamiento de los datos de sus invitados.
- DADO QUE la reserva de Ana empieza a las 19:00 y tiene 30 personas, CUANDO agrega a Pedro Ramos a las 18:50, ENTONCES Pedro Ramos aparece en la lista de invitados de la reserva.
- DADO QUE la reserva de Ana empezó a las 19:00, CUANDO intenta agregar otro invitado a las 19:10, ENTONCES el sistema responde `422` con `RESERVATION_GUEST_EDIT_TOO_LATE`.
- **[NUEVO]** *(borde)* DADO QUE Ana reserva el salón, CUANDO declara 1 persona de A-502 y no registra invitados, ENTONCES la reserva queda `Confirmed` con 1 persona y la lista de invitados vacía.
- **[NUEVO]** *(borde)* DADO QUE la reserva de Ana empieza a las 19:00 y ya tiene 40 personas, CUANDO agrega un invitado a las 18:50, ENTONCES el sistema responde `422` con `RESERVATION_EXCEEDS_CAPACITY` y la reserva sigue con 40 personas.
- **[NUEVO]** *(positivo)* DADO QUE la reserva de Ana empieza a las 19:00 y tiene 40 personas, CUANDO quita a Pedro Ramos a las 18:30, ENTONCES Pedro Ramos ya no aparece en la lista y la reserva queda con 39 personas.
- **[NUEVO]** *(negativo)* DADO QUE la reserva de Ana empezó a las 19:00, CUANDO intenta quitar a Pedro Ramos a las 19:10, ENTONCES el sistema responde `422` con `RESERVATION_GUEST_EDIT_TOO_LATE`.
- **[NUEVO]** *(borde)* DADO QUE la reserva de Ana empieza a las 19:00:00, CUANDO intenta agregar un invitado a las 19:00:00 exactas, ENTONCES el sistema responde `422` con `RESERVATION_GUEST_EDIT_TOO_LATE`.
- **[NUEVO]** *(negativo)* DADO QUE la reserva del salón es de A-502, CUANDO Jorge Paredes (`Owner` de A-704) intenta agregarle un invitado, ENTONCES el sistema responde `403`.

**Reglas de negocio relacionadas:** RN-023 ⚠️ Q11, RN-027 ⚠️ Q21, RN-086, RN-087 ⚠️ Q18 ⚠️ Q21, RN-123

**Notas:**
- Desde el punto de vista del usuario, HU-005 a HU-007 son un solo flujo (K4 = 1 paso manual). Se separan para entregarlas y probarlas por partes: HU-005 ya funciona con la lista de invitados vacía y 1 anfitrión.
- El cifrado AES-256-GCM de los datos de invitados (RN-027) se verifica con un test de integración sobre la columna `GuestFullName`, no como criterio de usuario.
- Los datos de los invitados se archivan a los 90 días y se eliminan de SQL Server (RN-028, RN-089). Lo cubre `DataRetentionJob`, fuera de esta HU.
- El rechazo de Jorge sale de la celda B5 de la matriz de permisos (solo la reserva propia). La matriz también niega al Administrator editar la lista de invitados (B5 · Adm ⛔); está en su lista de vacíos.
- El texto del aviso de privacidad depende de Q18 y Q21. Cuando se fije, el cuarto criterio debe nombrar su clave de `es-PE.resx`.

---

### HU-008: Cancelar una reserva y avisar al residente

**Prioridad:** Must · **Orden:** 12

**Como** residente, **quiero** cancelar mi reserva desde la plataforma y enterarme si la administración cancela una mía, **para** no depender de WhatsApp ni llegar al salón con invitados a una reserva que ya no existe.

**Criterios de aceptación:**
- DADO QUE la reserva de Ana empieza el 2026-12-12T19:00:00-05:00, CUANDO Ana la cancela a las 18:00:00, ENTONCES la reserva queda `Cancelled` con `cancelledBy` = Ana y `cancelledAt = 2026-12-12T18:00:00-05:00`, y sigue visible en su historial.
- DADO QUE la reserva de Ana empezó a las 19:00, CUANDO Ana intenta cancelarla a las 19:30, ENTONCES el sistema responde `422` con `RESERVATION_CANCELLATION_TOO_LATE`.
- DADO QUE la reserva de Ana empieza a las 19:00, CUANDO el Administrator la cancela a las 15:00:00, ENTONCES la reserva queda `Cancelled` con `cancelledBy` = Administrator y `cancelledAt = 2026-12-12T15:00:00-05:00`.
- DADO QUE la reserva de Ana empezó a las 19:00, CUANDO el Administrator intenta cancelarla a las 19:10, ENTONCES el sistema responde `422` con `RESERVATION_CANCELLATION_TOO_LATE`.
- **[CORREGIDO]** DADO QUE el Administrator canceló la reserva de Ana a las 15:00 y Ana inició sesión por última vez a las 12:00, CUANDO Ana inicia sesión a las 16:00, ENTONCES ve un aviso de esa cancelación con el área, la fecha y la franja de la reserva (Salón de fiestas, 2026-12-12, 19:00 a 23:00).
- DADO QUE la reserva de 19:00 a 23:00 del 2026-12-12 no se canceló, CUANDO se consulta a las 2026-12-12T23:00:00-05:00, ENTONCES se muestra como `Completed`.
- **[NUEVO]** *(borde)* DADO QUE la reserva de Ana empieza el 2026-12-12T19:00:00-05:00, CUANDO Ana la cancela a las 18:59:00, ENTONCES la reserva queda `Cancelled`.
- **[NUEVO]** *(borde)* DADO QUE la reserva de Ana empieza el 2026-12-12T19:00:00-05:00, CUANDO Ana intenta cancelarla a las 19:00:00 exactas, ENTONCES el sistema responde `422` con `RESERVATION_CANCELLATION_TOO_LATE`.
- **[NUEVO]** *(negativo)* DADO QUE la reserva del salón es de A-502, CUANDO Jorge Paredes (`Owner` de A-704) intenta cancelarla, ENTONCES el sistema responde `403` y la reserva sigue `Confirmed`.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator canceló la reserva de Ana a las 15:00, CUANDO Ana intenta cancelarla a las 15:05, ENTONCES el sistema responde `422` con `RESERVATION_ALREADY_CANCELLED` y la reserva conserva `cancelledBy` = Administrator.
- **[NUEVO]** *(borde)* DADO QUE Ana canceló su propia reserva a las 15:00, CUANDO inicia sesión a las 16:00, ENTONCES no ve ningún aviso de cancelación.
- **[NUEVO]** *(borde)* DADO QUE Ana ya vio a las 16:00 el aviso de la cancelación hecha por el Administrator, CUANDO vuelve a iniciar sesión a las 17:00, ENTONCES no ve otra vez ese aviso.
- **[NUEVO]** *(borde)* DADO QUE la reserva de 19:00 a 23:00 del 2026-12-12 no se canceló, CUANDO se consulta a las 2026-12-12T22:59:00-05:00, ENTONCES se muestra como `Confirmed`.
- **[NUEVO]** *(positivo)* DADO QUE el Administrator canceló a las 15:00 la reserva del salón de 19:00 a 23:00 del 2026-12-12, CUANDO Jorge pide el salón de 19:00 a 23:00 ese día a las 15:05, ENTONCES la reserva de Jorge queda `Confirmed`.

**Reglas de negocio relacionadas:** RN-083, RN-084, RN-085, RN-088, RN-161, RN-024 **[NUEVO]**, RN-168 **[NUEVO]**

**Notas:**
- `Completed` se calcula al consultar la reserva, sin un job que lo guarde (RN-085).
- En el MVP el aviso es solo dentro de la aplicación; el correo es C1 y queda fuera del lote.
- La retirada de la reserva cancelada de la vista de portería se verifica en HU-009 (RN-026).
- RN-161 propone que el Administrator tampoco cancele después del inicio. Si el autor prefiere permitir cortar un evento en curso con motivo, cambia el cuarto criterio.
- El rechazo de Jorge sale de la celda B6 de la matriz de permisos.

---

## E3. Portería (M4)

### HU-009: Ver las reservas del día y marcar el ingreso en portería

**Prioridad:** Must · **Orden:** 13

**Como** Concierge, **quiero** ver en la PC de portería las reservas confirmadas del día con su unidad, área e invitados, y marcar el ingreso de cada invitado, **para** dejar pasar a los invitados autorizados sin cuaderno ni llamadas al residente.

**Criterios de aceptación:**
- DADO QUE hoy es 2026-12-12 en `America/Lima` y existe una reserva `Confirmed` del salón a las 19:00 de A-502, CUANDO el Concierge abre la vista de portería a las 08:00, ENTONCES ve esa reserva con la unidad A-502, el área, la franja y la lista de invitados.
- DADO QUE existe una reserva `Confirmed` de la parrilla para el 2026-12-13, CUANDO el Concierge abre la vista de portería el 2026-12-12, ENTONCES esa reserva no aparece.
- DADO QUE existe una reserva `Cancelled` del 2026-12-12, CUANDO el Concierge abre la vista de portería el 2026-12-12, ENTONCES esa reserva no aparece.
- DADO QUE el Administrator cancela la reserva del salón de las 19:00 a las 15:00:00, CUANDO el Concierge consulta la vista de portería a las 15:01:00, ENTONCES la reserva ya no aparece.
- DADO QUE Pedro Ramos está en la lista de la reserva del salón, CUANDO el Concierge marca su ingreso a las 19:07:42, ENTONCES el invitado muestra `CheckedInAt = 2026-12-12T19:07:42-05:00`.
- DADO QUE el Concierge está en la PC de portería, CUANDO abre `/expenses`, ENTONCES el sistema responde `403`.
- DADO QUE el Concierge está en la PC de portería, CUANDO solicita `/persons/{id}` de Ana, ENTONCES el sistema responde `403` con `PERSONAL_DATA_FORBIDDEN`.
- **[NUEVO]** *(borde)* DADO QUE no hay reservas `Confirmed` para el 2026-12-14, CUANDO el Concierge abre la vista de portería ese día, ENTONCES ve la lista vacía con el mensaje de lista vacía de `es-PE.resx`, sin reservas de otros días.
- **[NUEVO]** *(borde)* DADO QUE existe una reserva `Confirmed` de la parrilla el 2026-12-13 a las 11:00, CUANDO el Concierge consulta la vista a las 2026-12-12T23:59:59-05:00, ENTONCES la reserva no aparece, y CUANDO consulta a las 2026-12-13T00:00:00-05:00, ENTONCES sí aparece.
- **[NUEVO]** *(borde)* DADO QUE el Concierge marcó el ingreso de Pedro Ramos a las 19:07:42, CUANDO vuelve a marcarlo a las 19:20:00, ENTONCES el sistema responde `422` con `GUEST_ALREADY_CHECKED_IN` y el invitado conserva `CheckedInAt = 2026-12-12T19:07:42-05:00`.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator canceló a las 15:00 la reserva del salón de las 19:00, CUANDO el Concierge intenta marcar el ingreso de uno de sus invitados a las 19:05, ENTONCES el sistema responde `422` con `GUEST_CHECK_IN_NOT_ALLOWED`.
- **[NUEVO]** *(negativo)* DADO QUE Ana tiene el rol Resident, CUANDO abre la vista de portería, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(negativo)* DADO QUE el Concierge está en la PC de portería, CUANDO abre el expediente de "Pintura de fachada", ENTONCES el sistema responde `403`.

**Reglas de negocio relacionadas:** RN-026, RN-029, RN-030, RN-031, RN-118, RN-158, RN-164 **[NUEVO]**

**Notas:**
- La vista se renderiza en servidor y se actualiza cada 60 s o menos para cumplir RN-026.
- Sin integración con torniquetes, QR ni biometría (W4).
- Depende de que el personal de portería use la PC (SP5, Q15).
- Los rechazos de Ana y del expediente salen de las celdas G1 · R-Own y H3 · Con de la matriz de permisos. La matriz también niega la vista de portería al Administrator (G1 · Adm ⛔); está en su lista de vacíos.

---

## E4. Gastos de la cuota (M5)

### HU-010: Registrar un gasto con su comprobante

**Prioridad:** Must · **Orden:** 14

**Como** Administrator, **quiero** registrar cada gasto con su monto, fecha, categoría, proveedor y comprobante, **para** que los propietarios vean en qué se gasta la cuota.

**Criterios de aceptación:**
- **[CORREGIDO]** DADO QUE hoy es 2026-11-20, CUANDO el Administrator registra "Limpieza de cisterna – S/ 1,200.00 – 2026-11-08 – Limpieza – Hidroclean SAC" con `factura-F001-0458.pdf`, ENTONCES el sistema responde `201` y el gasto aparece en el detalle de 2026-11 con "registrado el 2026-11-20".
- DADO QUE el Administrator arma el mismo gasto sin adjunto, CUANDO lo guarda, ENTONCES el sistema responde `422` con `EXPENSE_RECEIPT_REQUIRED`.
- DADO QUE el Administrator registra un gasto, CUANDO el monto es S/ 0.00, ENTONCES el sistema responde `422` con `EXPENSE_AMOUNT_NOT_POSITIVE`.
- DADO QUE el Administrator registra un gasto, CUANDO el monto es S/ 1,200.505, ENTONCES el sistema responde `422` con `AMOUNT_INVALID_PRECISION`.
- DADO QUE hoy es 2026-11-20, CUANDO la fecha del gasto es 2026-11-25 (futura), ENTONCES el sistema responde `422` con `EXPENSE_DATE_OUT_OF_RANGE`.
- DADO QUE hoy es 2026-11-20, CUANDO la fecha del gasto es 2025-11-10 (más de 12 meses atrás), ENTONCES el sistema responde `422` con `EXPENSE_DATE_OUT_OF_RANGE`.
- DADO QUE Marco Salazar tiene el rol BoardMember, CUANDO intenta registrar un gasto de S/ 500.00, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(borde)* DADO QUE hoy es 2026-11-20, CUANDO el Administrator registra un gasto de S/ 0.01 con comprobante, ENTONCES el gasto queda registrado.
- **[NUEVO]** *(borde)* DADO QUE el Administrator registra un gasto, CUANDO el monto llega como `1200.5`, ENTONCES el gasto queda registrado por S/ 1,200.50.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator registra un gasto, CUANDO el monto es S/ -350.00, ENTONCES el sistema responde `422` con `EXPENSE_AMOUNT_NOT_POSITIVE`.
- **[NUEVO]** *(borde)* DADO QUE hoy es 2026-11-20, CUANDO la fecha del gasto es 2026-11-20 (el mismo día del registro), ENTONCES el gasto queda registrado.
- **[NUEVO]** *(borde)* DADO QUE hoy es 2026-11-20, CUANDO la fecha del gasto es 2025-11-20 (exactamente 12 meses atrás), ENTONCES el gasto queda registrado.
- **[NUEVO]** *(borde)* DADO QUE hoy es 2026-11-20, CUANDO la fecha del gasto es 2025-11-19 (12 meses y 1 día atrás), ENTONCES el sistema responde `422` con `EXPENSE_DATE_OUT_OF_RANGE`.
- **[NUEVO]** *(negativo)* DADO QUE Ana es `Owner` de A-502, CUANDO intenta registrar un gasto de S/ 500.00, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator registra "Limpieza de cisterna" con `factura-F001-0458.pdf`, CUANDO la carga del adjunto falla por un corte de red, ENTONCES el gasto no queda registrado, no aparece en el detalle de 2026-11 y el contenedor no guarda una copia parcial del PDF.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator registra un gasto, CUANDO el monto llega como `1,200.00` (con separador de miles), ENTONCES el sistema responde `422` con `AMOUNT_INVALID_FORMAT` (RN-173).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator registró "Limpieza de cisterna – S/ 1,200.00" con la clave de idempotencia `9b3d…` y la respuesta se perdió, CUANDO el navegador reenvía la misma solicitud con la misma clave, ENTONCES el sistema responde con el mismo gasto y 2026-11 tiene un solo registro de S/ 1,200.00 (RN-163).

**Reglas de negocio relacionadas:** RN-032, RN-033 ⚠️ Q28, RN-034, RN-093, RN-094, RN-106 ⚠️ Q28, RN-166 **[NUEVO]** ⚠️ Q28, RN-172, RN-173 **[NUEVO 2026-11-08]**, RN-163 **[NUEVO 2026-11-08, Spec Finalizer]**

**Notas:**
- El comprobante va a Blob Storage bajo un prefijo por `CondominiumId` y solo se descarga por un endpoint de la API, nunca por URL pública (RN-106, A-11). Formatos, tamaño y escaneo de malware dependen de Q28.
- La descripción es texto libre y no debe nombrar unidades ni personas (RN-036). El mecanismo de control está pendiente (M-20).
- Los montos se aceptan con hasta 2 decimales y se guardan con exactamente 2 (RN-093).
- La anulación y el vínculo con una contratación se cubren en HU-010B.

---

### HU-010B: Anular un gasto o vincularlo a una contratación

**Prioridad:** Must · **Orden:** 15

**Como** Administrator, **quiero** anular con un motivo un gasto mal registrado y vincular un gasto a la contratación aprobada que lo origina, **para** corregir errores sin borrar el historial y mostrar el sustento de cada gasto.

**Criterios de aceptación:**
- DADO QUE "Limpieza de cisterna" está registrado, CUANDO el Administrator intenta cambiar su monto a S/ 1,000.00, ENTONCES el sistema responde `422` con `EXPENSE_IMMUTABLE`.
- DADO QUE el Administrator anula "Limpieza de cisterna", CUANDO no escribe un motivo, ENTONCES el sistema responde `422` con `EXPENSE_VOID_REASON_REQUIRED`.
- DADO QUE el Administrator anula "Limpieza de cisterna" el 2026-11-21T09:00:00-05:00, CUANDO escribe el motivo "Monto mal digitado; se registra de nuevo por S/ 1,000.00", ENTONCES el gasto muestra el estado anulado, ese motivo y la fecha-hora `2026-11-21T09:00:00-05:00`.
- DADO QUE la contratación "Pintura de fachada" está en `Submitted`, CUANDO el Administrator vincula a ella el gasto "Pintura de fachada – adelanto S/ 9,250.00", ENTONCES el sistema responde `422` con `EXPENSE_HIRE_NOT_APPROVED`.
- **[NUEVO]** *(negativo)* DADO QUE "Limpieza de cisterna" está registrado, CUANDO el Administrator intenta borrarlo, ENTONCES el sistema responde `422` con `EXPENSE_IMMUTABLE` y el gasto sigue en el detalle.
- **[NUEVO]** *(positivo)* DADO QUE la contratación "Pintura de fachada" está `Approved`, CUANDO el Administrator vincula a ella el gasto "Pintura de fachada – adelanto S/ 9,250.00", ENTONCES el gasto queda vinculado a esa contratación.
- **[NUEVO]** *(borde)* DADO QUE el Administrator anula "Limpieza de cisterna", CUANDO el motivo es solo espacios (`"   "`), ENTONCES el sistema responde `422` con `EXPENSE_VOID_REASON_REQUIRED`.
- **[NUEVO]** *(negativo)* DADO QUE "Limpieza de cisterna" se anuló el 2026-11-21T09:00:00-05:00, CUANDO el 2026-11-23 el Administrator intenta anularlo otra vez con otro motivo, ENTONCES el sistema responde `422` con `EXPENSE_ALREADY_VOIDED` y el gasto conserva el motivo y la fecha-hora originales.
- **[NUEVO]** *(negativo)* DADO QUE Marco Salazar tiene el rol BoardMember, CUANDO intenta anular "Limpieza de cisterna" con un motivo, ENTONCES el sistema responde `403` y el gasto sigue vigente.

**Reglas de negocio relacionadas:** RN-091, RN-092, RN-095 ⚠️ Q30, RN-167 **[NUEVO]**

**Notas:**
- Necesita un gasto registrado (HU-010 o el seeder).
- El criterio de RN-095 usa una contratación del seeder; no requiere tener HU-012 terminada.

---

### HU-011: Consultar los gastos por categoría y por mes

**Prioridad:** Must · **Orden:** 16

**Como** propietario, viva o no en el edificio, **quiero** ver cada gasto con su comprobante y el total del mes por categoría, **para** saber en qué se gastó cada sol de mi cuota.

**Criterios de aceptación:**
- DADO QUE en 2026-11 hay gastos de Mantenimiento por S/ 6,300.00, Limpieza por S/ 3,200.00 y Seguridad por S/ 9,800.00, CUANDO Ana (`Owner` de A-502) consulta 2026-11, ENTONCES ve esos tres totales por categoría.
- DADO QUE "Limpieza de cisterna – S/ 1,200.00" se anuló y se registró de nuevo por S/ 1,000.00, CUANDO Ana consulta el total de Limpieza de 2026-11, ENTONCES ese gasto suma S/ 1,000.00 y no S/ 2,200.00.
- **[CORREGIDO 2026-11-08, Spec Finalizer]** DADO QUE "Limpieza de cisterna – S/ 1,200.00" se anuló con motivo, CUANDO Ana abre el detalle del gasto (P-031) desde la lista de 2026-11, ENTONCES ve el gasto anulado con su motivo y la fecha-hora de anulación.
- DADO QUE el 2026-12-03 se registró "Reparación de bomba de agua – S/ 850.00" con fecha 2026-11-28, CUANDO Ana consulta los totales, ENTONCES el gasto suma en 2026-11 y no en 2026-12.
- DADO QUE el mismo gasto está registrado, CUANDO Ana abre el detalle, ENTONCES ve "fecha del gasto 2026-11-28 – registrado el 2026-12-03".
- **[CORREGIDO 2026-11-08, Spec Finalizer]** DADO QUE Luis Rojas es `NonResidentOwner`, CUANDO abre la fila "Limpieza de cisterna – S/ 1,200.00 – 08/11/2026" (la que tiene `factura-F001-0458.pdf`), ENTONCES ve monto, fecha, categoría y proveedor, y descarga `factura-F001-0458.pdf`.
- DADO QUE Carla Díaz solo tiene un vínculo `Tenant` con A-301, CUANDO abre `/expenses`, ENTONCES el sistema responde `403`.
- **[CORREGIDO]** DADO QUE el último vínculo `Owner` de Luis tiene `EndDate = 2026-12-15`, CUANDO hace una solicitud a `/expenses` el 2026-12-16T00:00:00-05:00, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(borde)* DADO QUE el último vínculo `Owner` de Luis tiene `EndDate = 2026-12-15`, CUANDO consulta `/expenses` a las 2026-12-15T23:59:00-05:00, ENTONCES ve los gastos.
- **[NUEVO]** *(borde)* DADO QUE hay un gasto de Limpieza de S/ 400.00 con fecha 2026-11-30 y otro de S/ 300.00 con fecha 2026-12-01, CUANDO Ana consulta 2026-11 y 2026-12, ENTONCES el de S/ 400.00 suma solo en 2026-11 y el de S/ 300.00 solo en 2026-12.
- **[NUEVO]** *(borde)* DADO QUE no hay gastos con fecha en 2027-01, CUANDO Ana consulta 2027-01, ENTONCES ve "No hay gastos registrados para este mes." y ningún total por categoría.
- **[NUEVO]** *(borde)* DADO QUE hay un gasto de S/ 0.50 y otro de S/ 18,500.00, CUANDO Ana abre el detalle, ENTONCES ve los montos como `S/ 0.50` y `S/ 18,500.00`.
- **[NUEVO]** *(negativo)* DADO QUE Carla Díaz solo tiene un vínculo `Tenant` con A-301, CUANDO pide `GET /api/expenses/{id}/receipt` de "Limpieza de cisterna", ENTONCES el sistema responde `403` y no entrega el archivo.
- **[NUEVO]** *(positivo)* DADO QUE Marco Salazar tiene el rol BoardMember y ningún vínculo `Owner`, CUANDO consulta 2026-11, ENTONCES ve los tres totales por categoría.

**Reglas de negocio relacionadas:** RN-015, RN-016, RN-035 ⚠️ Q27, RN-036, RN-090, RN-092, RN-142, RN-143, RN-144, RN-055 **[NUEVO]**, RN-105 **[NUEVO]**, RN-107 **[NUEVO]**

**Notas:**
- La autorización usa la política `CanViewCondominiumFinancials` y tiene una fila de test por columna de la matriz de permisos (ADR-0001).
- Las vistas financieras no muestran número de unidad, nombre de persona, deuda ni pagos de una unidad (RN-036).
- La Junta Directiva también ve esta vista.
- La `EndDate` de un vínculo es el último día como propietario (RN-016): el acceso termina a las 00:00:00 del día siguiente.

---

## E5. Contrataciones con sustento visible (M6)

### HU-012: Registrar una contratación con cotizaciones y enviarla a la Junta

**Prioridad:** Must · **Orden:** 17

**Como** Administrator, **quiero** registrar una contratación con al menos dos cotizaciones comparadas y la justificación de la elección, y enviarla a la Junta Directiva, **para** que la decisión se tome con sustento.

**Criterios de aceptación:**
- DADO QUE "Pintura de fachada" está en `Draft` con cotizaciones de Pinturas Lima SAC (S/ 18,500.00) y Color Perú EIRL (S/ 21,000.00) y la justificación "Se elige Pinturas Lima SAC por menor precio (S/ 2,500.00 menos) y 3 años de garantía frente a 1", CUANDO el Administrator la envía, ENTONCES pasa a `Submitted`.
- DADO QUE la contratación tiene solo la cotización de Pinturas Lima SAC, CUANDO el Administrator la envía, ENTONCES el sistema responde `422` con `HIRE_INSUFFICIENT_QUOTES`.
- DADO QUE la contratación tiene dos cotizaciones, ambas de Pinturas Lima SAC, CUANDO el Administrator la envía, ENTONCES el sistema responde `422` con `HIRE_INSUFFICIENT_QUOTES`.
- DADO QUE la justificación es "Mejor precio" (12 caracteres), CUANDO el Administrator envía la contratación, ENTONCES el sistema responde `422` con `HIRE_JUSTIFICATION_TOO_SHORT`.
- DADO QUE el Administrator agrega una cotización, CUANDO su monto es S/ 0.00, ENTONCES el sistema responde `422` con `QUOTE_AMOUNT_NOT_POSITIVE`.
- DADO QUE "Pintura de fachada" está en `Submitted`, CUANDO el Administrator intenta cambiar una cotización, ENTONCES el sistema responde `422` con `HIRE_NOT_EDITABLE`.
- **[CORREGIDO 2026-11-08, VL-P043]** DADO QUE Pinturas del Norte SAC (RUC 20604455667) no está registrado, CUANDO el Administrator lo registra como proveedor, ENTONCES el proveedor existe como registro sin cuenta de usuario asociada y no se envía ninguna invitación.
- **[NUEVO]** *(borde)* DADO QUE "Pintura de fachada" tiene 2 cotizaciones de proveedores distintos y la justificación "Menor precio y plazo" (exactamente 20 caracteres), CUANDO el Administrator la envía, ENTONCES pasa a `Submitted`.
- **[NUEVO]** *(borde)* DADO QUE la justificación es `"  Menor precio y plaz  "` (19 caracteres sin los espacios del inicio y del final), CUANDO el Administrator envía la contratación, ENTONCES el sistema responde `422` con `HIRE_JUSTIFICATION_TOO_SHORT`.
- **[NUEVO]** *(borde)* DADO QUE la contratación tiene 3 cotizaciones, 2 de Pinturas Lima SAC y 1 de Color Perú EIRL, y una justificación válida, CUANDO el Administrator la envía, ENTONCES pasa a `Submitted`.
- **[NUEVO]** *(negativo)* DADO QUE "Pintura de fachada" está `Approved`, CUANDO el Administrator intenta cambiar la justificación, ENTONCES el sistema responde `422` con `HIRE_NOT_EDITABLE`.
- **[NUEVO]** *(negativo)* DADO QUE el Administrator agrega una cotización, CUANDO su monto es S/ 18,500.555, ENTONCES el sistema responde `422` con `AMOUNT_INVALID_PRECISION`.
- **[NUEVO]** *(negativo)* DADO QUE Ana es `Owner` de A-502, CUANDO intenta crear la contratación "Mantenimiento de bombas", ENTONCES el sistema responde `403`.
- **[NUEVO]** *(positivo)* DADO QUE la Junta Directiva rechazó "Pintura de fachada" y la contratación volvió a `Draft`, CUANDO el Administrator adjunta la garantía por escrito de Pinturas Lima SAC y la reenvía, ENTONCES pasa a `Submitted`.
- **[NUEVO 2026-11-08, VL-P043]** *(negativo)* DADO QUE Pinturas Lima SAC (RUC 20512345678) ya está registrado, CUANDO el Administrator intenta registrarlo otra vez, ENTONCES el sistema responde `422` con `VENDOR_RUC_DUPLICATE` y no crea otro proveedor (RN-169).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator crea una contratación, CUANDO el título llega vacío, ENTONCES el sistema responde `422` con `FIELD_REQUIRED` en el campo "Título" (RN-172).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator agrega una cotización, CUANDO el monto llega como `1,200.00`, ENTONCES el sistema responde `422` con `AMOUNT_INVALID_FORMAT` (RN-173).
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el Administrator registra un proveedor, CUANDO el RUC es `2051234567` (10 dígitos), ENTONCES el sistema responde `422` con `VENDOR_RUC_INVALID_FORMAT` (RN-169).

**Reglas de negocio relacionadas:** RN-037 ⚠️ Q23 ⚠️ Q30, RN-038, RN-042, RN-093, RN-096, RN-097, RN-100, RN-098 **[NUEVO]**, RN-169, RN-172, RN-173 **[NUEVO 2026-11-08]**

**Notas:**
- Los únicos estados son `Draft`, `Submitted` y `Approved`. Un rechazo devuelve la contratación a `Draft` (RN-096, RN-098).
- Las cotizaciones en PDF siguen las mismas reglas de almacenamiento que los comprobantes (RN-106, RN-166).
- El rechazo de Ana sale de la celda H1 · R-Own (⛔) de la matriz de permisos.

---

### HU-013: Aprobar o rechazar una contratación como Junta Directiva

**Prioridad:** Must · **Orden:** 18

**Como** miembro de la Junta Directiva, **quiero** aprobar o rechazar en la plataforma las contrataciones enviadas, **para** que cada decisión quede registrada con su fecha y su motivo, sin depender de la próxima asamblea.

**Criterios de aceptación:**
- DADO QUE hay 1 contratación en `Submitted`, CUANDO Marco Salazar (BoardMember) inicia sesión el 2026-11-22, ENTONCES ve "1 contratación por decidir".
- DADO QUE "Pintura de fachada" está en `Submitted`, CUANDO Marco la rechaza sin motivo, ENTONCES el sistema responde `422` con `HIRE_REJECTION_REASON_REQUIRED`.
- DADO QUE "Pintura de fachada" está en `Submitted`, CUANDO Marco la rechaza con el motivo "Falta la garantía por escrito de Pinturas Lima SAC", ENTONCES la contratación vuelve a `Draft` y su historial muestra la decisión `Rejected` con ese motivo.
- DADO QUE el Administrator corrigió y reenvió la contratación, CUANDO Marco la aprueba el 2026-11-25T21:03:10-05:00, ENTONCES pasa a `Approved` y su historial muestra la decisión `Approved` con `decidedByRole = BoardMember` y `decidedAt = 2026-11-25T21:03:10-05:00`.
- DADO QUE "Pintura de fachada" fue rechazada y luego aprobada, CUANDO se consulta su historial, ENTONCES muestra las 2 decisiones, en orden.
- DADO QUE la contratación está en `Submitted`, CUANDO el Administrator intenta aprobarla, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(borde)* DADO QUE no hay contrataciones en `Submitted`, CUANDO Marco inicia sesión el 2026-11-26, ENTONCES ve "0 contrataciones por decidir".
- **[NUEVO]** *(negativo)* DADO QUE "Mantenimiento de bombas" está en `Draft`, CUANDO Marco intenta aprobarla, ENTONCES el sistema responde `422` con `HIRE_NOT_SUBMITTED` y la contratación sigue en `Draft` sin decisión en su historial.
- **[NUEVO]** *(negativo)* DADO QUE "Pintura de fachada" está `Approved`, CUANDO Marco intenta rechazarla con un motivo, ENTONCES el sistema responde `422` con `HIRE_NOT_SUBMITTED` y la contratación sigue `Approved`.
- **[NUEVO]** *(borde)* DADO QUE "Pintura de fachada" está en `Submitted`, CUANDO Marco la rechaza con el motivo `"   "` (solo espacios), ENTONCES el sistema responde `422` con `HIRE_REJECTION_REASON_REQUIRED`.
- **[NUEVO]** *(negativo)* DADO QUE Ana es `Owner` de A-502 y no es BoardMember, CUANDO intenta aprobar "Pintura de fachada", ENTONCES el sistema responde `403`.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE Marco Salazar y otro miembro de la Junta tienen abierta "Pintura de fachada" en `Submitted`, CUANDO Marco la aprueba y 200 ms después el otro miembro la rechaza con motivo, ENTONCES la aprobación queda registrada, el rechazo recibe `409` con `HIRE_DECISION_CONFLICT` y el historial tiene una sola decisión nueva (RN-179).

**Reglas de negocio relacionadas:** RN-039 ⚠️ Q24, RN-040, RN-098, RN-099, RN-179 **[NUEVO 2026-11-08, Spec Finalizer]**

**Notas:**
- La aprobación de la Junta Directiva es un acto de gestión, no un acuerdo de asamblea (W3; SP6, Q19).
- El historial guarda el identificador del BoardMember para auditoría; la vista de propietarios muestra solo el cargo (HU-014).
- Si basta la decisión de 1 BoardMember o se necesita mayoría depende de Q24.

---

### HU-014: Consultar el expediente de una contratación como propietario

**Prioridad:** Must · **Orden:** 19

**Como** propietario, viva o no en el edificio, **quiero** ver el expediente completo de cada contratación con sus cotizaciones, su justificación y las decisiones de la Junta, **para** saber por qué se eligió a cada proveedor.

**Criterios de aceptación:**
- DADO QUE "Pintura de fachada" está `Approved`, CUANDO Luis Rojas (NonResidentOwner) abre el expediente, ENTONCES ve las 2 cotizaciones con sus montos, descarga sus PDF y ve la justificación.
- DADO QUE "Pintura de fachada" fue rechazada el 2026-11-22 y aprobada el 2026-11-25, CUANDO Luis abre el historial del expediente, ENTONCES ve "Rechazada por la Junta Directiva – 2026-11-22" con su motivo y "Aprobada por la Junta Directiva – 2026-11-25T21:03:10-05:00".
- DADO QUE Marco Salazar registró las dos decisiones, CUANDO Luis abre el historial, ENTONCES no aparece el nombre "Marco Salazar" en ninguna parte del expediente.
- DADO QUE Carla Díaz solo tiene un vínculo `Tenant`, CUANDO intenta abrir el expediente, ENTONCES el sistema responde `403`.
- **[CORREGIDO]** DADO QUE el último vínculo `Owner` de Luis con B-1203 tiene `EndDate = 2026-12-15`, CUANDO abre el expediente el 2026-12-16T00:00:00-05:00, ENTONCES el sistema responde `403`.
- **[NUEVO]** *(borde)* DADO QUE el último vínculo `Owner` de Luis con B-1203 tiene `EndDate = 2026-12-15`, CUANDO abre el expediente a las 2026-12-15T23:59:00-05:00, ENTONCES lo ve.
- **[NUEVO]** *(positivo)* DADO QUE Ana es `Resident` con un vínculo `Owner` activo con A-502, CUANDO abre el expediente de "Pintura de fachada", ENTONCES ve las 2 cotizaciones, la justificación y el historial.
- **[NUEVO]** *(borde)* DADO QUE "Cambio de luminarias" se aprobó en la primera decisión el 2026-11-28, CUANDO Luis abre su historial, ENTONCES ve una sola entrada: "Aprobada por la Junta Directiva" con su fecha-hora.
- **[NUEVO]** *(negativo)* DADO QUE Carla Díaz solo tiene un vínculo `Tenant`, CUANDO intenta descargar el PDF de la cotización de Pinturas Lima SAC, ENTONCES el sistema responde `403` y no entrega el archivo.
- **[NUEVO]** *(negativo)* DADO QUE Raúl Mendoza tiene el rol Concierge, CUANDO intenta abrir el expediente de "Pintura de fachada", ENTONCES el sistema responde `403`.
- **[NUEVO 2026-11-08, Spec Finalizer]** *(negativo)* DADO QUE el 2026-11-22 "Pintura de fachada" está en `Submitted`, CUANDO Luis Rojas (NonResidentOwner) abre su expediente, ENTONCES el sistema responde `404` y la contratación no aparece en su lista (RN-041, Q25 resuelta).

**Reglas de negocio relacionadas:** RN-015, RN-016, RN-041 ⚠️ Q34, RN-031 **[NUEVO]**, RN-107 **[NUEVO]**

**Notas:**
- Q25 se resolvió el 2026-11-08: los propietarios ven solo las contrataciones `Approved`; una en `Draft` o `Submitted` responde `404` para ellos (RN-041). La Junta Directiva ve `Submitted` y `Approved`, y el Administrator todas.
- Si los datos de un proveedor persona natural siguen visibles después de 90 días depende de Q34.

---

## Verificación INVEST

| HU | I | N | V | E | S | T | Observación |
|---|---|---|---|---|---|---|---|
| HU-001 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Base del resto; no depende de ninguna otra HU |
| HU-001B | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una persona con vínculo en el padrón (HU-001 o el seeder) |
| HU-002 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una invitación (HU-001B o el seeder) |
| HU-002B | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una cuenta creada (HU-002 o el seeder) |
| HU-003 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una cuenta creada (HU-002 o el seeder) |
| HU-003B | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita cuentas creadas (HU-002 o el seeder) |
| HU-004 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Se prueba con un Administrator del seeder |
| HU-005 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita un área configurada (HU-004 o el seeder). Se demuestra sola, pero se libera junto con HU-006 y HU-006B |
| HU-006 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Extiende la creación de reservas de HU-005 |
| HU-006B | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Extiende la creación de reservas de HU-005 |
| HU-007 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Extiende la reserva de HU-005 |
| HU-008 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una reserva `Confirmed` (HU-005 o el seeder) |
| HU-009 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Lee reservas e invitados; con el seeder se prueba sin HU-005 a HU-008 |
| HU-010 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Independiente de E1–E3 |
| HU-010B | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita un gasto (HU-010 o el seeder). El criterio de RN-095 usa una contratación del seeder |
| HU-011 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita gastos (HU-010 o el seeder) |
| HU-012 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Independiente de E2–E4 |
| HU-013 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una contratación `Submitted` (HU-012 o el seeder) |
| HU-014 | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | Necesita una contratación con decisiones (HU-013 o el seeder) |

**Lectura de la tabla.**
- **Independent:** ⚠️ significa que la HU necesita **datos** de otra HU, pero no su código. El seeder de condominio sintético exigido desde la semana 1 (PRINCIPIO-008, [02-alcance.md](02-alcance.md) §0) permite desarrollarla y probarla por separado. La única restricción de liberación es HU-005 con HU-006 y HU-006B.
- **Negotiable:** los criterios fijan el comportamiento observable, no la implementación.
- **Valuable:** cada HU se traza a un beneficio o KPI del brief (K2, K4 o K5) o a la frontera de acceso propietario–inquilino.
- **Small:** ninguna HU supera 15 criterios ni mezcla actores con objetivos distintos, después de dividir la reserva (HU-005, HU-006 y HU-006B), la contratación (HU-013 y HU-014), la activación de la cuenta (HU-002 y HU-002B), el inicio de sesión (HU-003 y HU-003B) y el gasto (HU-010 y HU-010B).
- **Testable:** cada criterio describe un escenario con un valor concreto y, cuando hay rechazo, un código HTTP o de error estable.

---

## Trazabilidad

| Funcionalidad del alcance | HU | Beneficio o KPI |
|---|---|---|
| M1 Padrón del condominio | HU-001, HU-001B | Frontera de acceso propietario–inquilino |
| M2 Acceso seguro, roles y consentimiento | HU-002, HU-002B, HU-003, HU-003B | PRINCIPIO-004, 005 y 006 |
| M3 Reserva de áreas comunes | HU-004, HU-005, HU-006, HU-006B, HU-007, HU-008 | Beneficio 1 · K2 ≤ 600 s · K4 = 1 |
| M4 Vista de portería | HU-009 | K4 = 1 |
| M5 Registro de gastos | HU-010, HU-010B, HU-011 | Beneficio 2 |
| M6 Contrataciones con sustento visible | HU-012, HU-013, HU-014 | Beneficio 2 · K5 = 100 % |

**Reglas propuestas en este lote.** Al escribir las HU aparecieron 5 comportamientos sin regla. Se propusieron como RN-158 a RN-162 en [03-reglas-de-negocio.md](03-reglas-de-negocio.md), aprobadas por el autor el 2026-11-04:

| Regla | Comportamiento | HU |
|---|---|---|
| RN-158 | El Concierge no accede al DNI, carné, teléfono ni correo de las personas | HU-009 |
| RN-159 | Solo el Administrator configura las áreas comunes | HU-004 |
| RN-160 | Los límites de un área son enteros mayores que 0, y la duración es múltiplo de 60 s | HU-004 |
| RN-161 | El Administrator no cancela una reserva después del inicio de su franja | HU-008 |
| RN-162 | Un cambio de configuración no altera las reservas `Confirmed` existentes | HU-004 |

**Reglas de la revisión QA.** La revisión QA encontró 12 comportamientos sin regla (QA-01 a QA-12). El autor las aprobó el 2026-11-02 y quedaron en [03-reglas-de-negocio.md](03-reglas-de-negocio.md):

| Regla | Comportamiento | Hallazgo | HU |
|---|---|---|---|
| RN-163 (nueva) | Un reenvío con la misma clave de idempotencia devuelve la reserva ya creada | QA-01 | HU-005 |
| RN-083, RN-086, RN-161 (aclaradas) | La franja ya empezó en su instante de inicio (`[inicio, fin)`) | QA-02 | HU-007, HU-008 |
| RN-080 (aclarada) | Las reservas `Cancelled` no cuentan para el cupo mensual | QA-03 | HU-006 |
| RN-164 (nueva) | La marca de ingreso es única y solo en reservas `Confirmed` del día | QA-04 | HU-009 |
| RN-039 (aclarada) | Código `HIRE_NOT_SUBMITTED` para decidir fuera de `Submitted` | QA-05 | HU-013 |
| RN-092, RN-098 (aclaradas) | Un motivo de solo espacios cuenta como vacío | QA-06 | HU-010B, HU-013 |
| RN-093 (aclarada) | Los montos se aceptan con hasta 2 decimales | QA-07 | HU-010, HU-012 |
| RN-111 (aclarada) | El bloqueo termina al cumplirse los 900 s | QA-08 | HU-003B |
| RN-035, RN-099 (aclaradas) | Mensaje de mes sin gastos; el contador de la Junta muestra también 0 | QA-09 | HU-011, HU-013 |
| RN-165 (nueva) | Una invitación aceptada no se puede volver a usar | QA-10 | HU-002 |
| RN-166 (nueva) | Si falla la carga del adjunto, el registro no se guarda | QA-11 | HU-010 |
| RN-167, RN-168 (nuevas) | No se anula un gasto ya anulado ni se cancela una reserva ya cancelada | QA-12 | HU-010B, HU-008 |

**Reglas MUST sin HU propia en este lote.** Las de retención y ciclo de vida (RN-005, RN-028, RN-060, RN-061, RN-073, RN-089, RN-126 a RN-136, RN-138, RN-139) las ejecutan `DataRetentionJob` y `OccupancyLifecycleJob`, sin un actor humano; están en el backlog técnico ([08-backlog.md](08-backlog.md), T-039, T-041 y T-047). Las reglas MUST con un actor humano que no tienen HU (perfil del titular, cambio de correo, recuperación de contraseña, regeneración de códigos de recuperación, aviso de TLS 1.2, log de auditoría para la Junta y traspaso de administradora) están **diferidas fuera del MVP** por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md), aceptado el 2026-11-04.

---

## Fuera de este lote

| Prioridad | Funcionalidad | Motivo |
|---|---|---|
| Should | S1 Averías · S2 Pagos y estado de cuenta · S3 Anuncios · S4 Panel de indicadores · S5 Importación CSV | Después del MVP ([02-alcance.md](02-alcance.md) §1). Ya tienen reglas (RN-043 a RN-051, RN-101, RN-125) y se detallan en el siguiente lote |
| Could | C1 Notificaciones por correo · C2 Consultas no vinculantes · C3 Solicitudes de videovigilancia · C4 Historial exportable | Solo si sobra tiempo; no tienen reglas de negocio |
| Won't | W1 a W13 (app nativa, cobro en línea, votaciones vinculantes, biometría, videovigilancia, portal de proveedores, marketplace, directorio o chat de vecinos, contabilidad SUNAT, consola multicondominio, migración real, registro general de visitantes, otros idiomas) | Fuera de alcance o prohibidos por la constitución. No se generan HU |
| Bloqueante para datos reales | Solicitudes ARCO (PRINCIPIO-004.6) · Libro de Reclamaciones virtual (PRINCIPIO-007) | Diferidos hasta que Q20 confirme un piloto con usuarios reales ([02-alcance.md](02-alcance.md) §0; [ADR-0010](docs/adr/0010-defer-arco-and-complaints-book.md)). No se generan HU |

---

## Revisión QA

> **Agente:** QA Funcional (BMAD) · **Fecha:** 2026-11-02 · **Estado:** hallazgos resueltos, salvo los pendientes indicados
> **Fuentes:** [00-constitucion.md](00-constitucion.md) v1.4 · [03-reglas-de-negocio.md](03-reglas-de-negocio.md) · [docs/security/permissions-matrix.md](docs/security/permissions-matrix.md)

### Resumen

| Concepto | Resultado |
|---|---|
| HU revisadas | 14 originales, divididas en 18; HU-001B se agregó el 2026-11-04 (19 en total). No se eliminó ningún criterio |
| Criterios agregados **[NUEVO]** a las 18 HU de la revisión | 106 (más los marcados con fecha, agregados después) |
| Criterios corregidos **[CORREGIDO]** | 9 |
| HU con positivo + negativo + borde | 19 de 19 (HU-001B incluida) |
| Contradicciones con la constitución | 0 en los criterios |
| Inconsistencias entre HU y reglas (QA-13 a QA-15) | Resueltas en los criterios |
| Comportamientos sin regla (QA-01 a QA-12) | Resueltos: 6 reglas nuevas (RN-163 a RN-168) y 11 reglas aclaradas, aprobadas por el autor |
| Reglas MUST sin HU con actor humano | Se propusieron 10 HU (HU-S01 a HU-S10); el autor las descartó. Las reglas quedan sin HU |

### INVEST: correcciones aplicadas

| HU original | Problema | Corrección |
|---|---|---|
| HU-002 | 16 criterios con dos objetivos | Dividida en HU-002 (activar la cuenta) y HU-002B (aceptar el consentimiento) |
| HU-003 | El bloqueo y la sesión aplican a todos, pero el actor era solo Administrator o BoardMember | Dividida en HU-003 (MFA) y HU-003B (bloqueo y sesión, con un residente como actor). Se agregaron dos criterios con Carla (Resident) como actor |
| HU-006 | 15 criterios sobre tres reglas distintas | Dividida en HU-006 (cruces y cupo) y HU-006B (unidad permitida). El criterio del Concierge pasó de HU-005 a HU-006B |
| HU-010 | 22 criterios; mezclaba registrar, anular y vincular | Dividida en HU-010 (registrar) y HU-010B (anular o vincular) |

### Criterios corregidos

| HU | Criterio | Corrección |
|---|---|---|
| HU-001 | Correo duplicado | `ana@example.pe` → `ana.quispe@example.pe`, el correo de las reglas (QA-15) |
| HU-001 | Log de auditoría del vínculo de Carla | Valor nuevo `A-301 · Tenant` y fecha-hora `2026-11-15T09:30:00-05:00` |
| HU-002B | Abrir `/reservations` sin consentimiento | Resultado observable: la redirige a la pantalla de consentimiento |
| HU-002B | Aceptar el consentimiento | Versión `1.0` → `2026-11-01.v1`, con la fecha-hora de aceptación (QA-14) |
| HU-004 | Crear la parrilla | Responde `201` y devuelve los cinco valores |
| HU-008 | Aviso de cancelación | El aviso muestra el área, la fecha y la franja |
| HU-010 | Registro de "Limpieza de cisterna" | Responde `201` y el gasto aparece con su fecha de registro |
| HU-011, HU-014 | Fin del vínculo `Owner` de Luis | "terminó hoy" → `EndDate = 2026-12-15` y `403` desde el 2026-12-16T00:00:00 (QA-13) |

**Pendientes de redacción:**
- HU-007: el aviso de privacidad necesita su clave de `es-PE.resx`. Depende de Q18 y Q21.
- HU-003B: "le pide iniciar sesión de nuevo" no fija qué código HTTP devuelve la API. Ninguna regla lo define.

### Constitución

**Contradicciones en los criterios: ninguna.** Se revisaron las 18 HU contra los 12 principios; HU-001B (2026-11-04) y los criterios del 2026-11-08 se revisaron con el mismo método en la auditoría del Spec Finalizer.

| Principio | Verificación |
|---|---|
| PRINCIPIO-001 | Rutas y códigos en inglés (`/expenses`, `RESERVATION_OVERLAP`). Los textos citados en los criterios son valores de `es-PE.resx`, no texto fijo en el código |
| PRINCIPIO-003 | Ningún criterio pide datos de otro condominio. El `404` cross-tenant queda en la definición de terminado |
| PRINCIPIO-004.1 | HU-001 limita la ficha sin consentimiento a nombre, correo y vínculo. HU-002B exige la declaración de transferencia internacional |
| PRINCIPIO-004.5 | Los invitados se archivan a los 90 días (HU-007, nota) |
| PRINCIPIO-005 | HU-003 exige MFA a Administrator y BoardMember. HU-002 aplica Argon2id y la lista local de contraseñas filtradas |
| PRINCIPIO-006 | El Concierge no ve datos personales ni financieros (HU-009). La Junta aparece por cargo, no por nombre (HU-014). Los criterios de `403` siguen la matriz de permisos |
| PRINCIPIO-007 | Los gastos se registran; ninguna HU procesa pagos |
| PRINCIPIO-008 | Todas las personas, unidades y montos son sintéticos |
| PRINCIPIO-011 | RN-163 protege a quien reserva con 3G inestable (HU-005) |

**Cobertura de principios:**

| Principio | Estado |
|---|---|
| PRINCIPIO-005, aviso de TLS 1.2 en cada inicio de sesión (RN-014) | Diferido por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md), aceptado el 2026-11-04 |
| PRINCIPIO-006, el residente ve sus propios datos y los contactos de la administración | Sin HU: el autor descartó la HU propuesta |
| PRINCIPIO-004.6 (ARCO) y PRINCIPIO-007 (Libro de Reclamaciones) | Diferidos hasta un piloto con usuarios reales ([02-alcance.md](02-alcance.md) §0). Formalizado en [ADR-0010](docs/adr/0010-defer-arco-and-complaints-book.md), aceptado el 2026-11-02 |

---

## HUs sugeridas (descartadas)

La revisión QA propuso 10 HU (HU-S01 a HU-S10) para reglas MUST con un actor humano que no tienen HU en este lote. **El autor las descartó el 2026-11-02.** El 2026-11-04, tras la auditoría del backlog, HU-S01 se reincorporó como **HU-001B**, y las reglas de la tabla que siguen sin HU ni tarea quedaron **diferidas por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md)**. La columna "Estado actual" indica dónde está cubierta cada una:

| Comportamiento | Reglas sin HU | Estado actual |
|---|---|---|
| Invitar a una persona del padrón | RN-007, RN-157, RN-138 | HU-001B y T-049; RN-138 en T-041 |
| Terminar o cambiar un vínculo | RN-059, RN-016, RN-060 | Fin por fecha en T-041 y T-011; la edición manual sigue sin HU (Q36) |
| Perfil del titular y contactos permitidos | RN-006, RN-018, RN-069, RN-145 a RN-150 | ⏸ ADR-0020 (RN-006 se cumple en el modelo, T-007.1; RN-018 sin endpoint por diseño) |
| Cambio del correo de acceso | RN-151 a RN-156 | ⏸ ADR-0020 (RN-153 sí está cubierta en T-013.2 y T-018.2) |
| Recuperación de contraseña | RN-115 | ⏸ ADR-0020 |
| Selector de condominio y aviso de TLS 1.2 | RN-014, RN-064, RN-072, RN-073, RN-133, RN-134 | RN-064 y RN-072 en T-014.4; RN-073 y RN-133 en T-041; RN-014 y RN-134 ⏸ ADR-0020 |
| Regeneración de códigos de recuperación | RN-141 | ⏸ ADR-0020 |
| Log de auditoría para la Junta Directiva | RN-124, RN-062 | RN-124 ⏸ ADR-0020; RN-062 en T-038 |
| Traspaso de administradora | RN-063, RN-137, RN-139 | RN-063 ⏸ ADR-0020; RN-137 y RN-139 en T-041 |
| Asignación y revocación de roles | RN-065, RN-066, RN-067 | T-007.2, T-014.4 y T-038 (Platform CLI) |
