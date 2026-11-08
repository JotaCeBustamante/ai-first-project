# CondoHub — Reglas de negocio

> **Fase:** Planificación (Agente Analyst, BMAD)
> **Fecha:** 2026-11-01 · **Última actualización:** 2026-11-08 (validación de prototipos RN-169 a RN-175; auditoría del Spec Finalizer RN-176 a RN-179). Antes: 2026-11-02 (auditoría QA, [auditoria-qa.md](auditoria-qa/auditoria-qa.md); segunda reauditoría, [reauditoria-qa-2.md](auditoria-qa/reauditoria-qa-2.md); revisión QA de las historias de usuario, hallazgos QA-01 a QA-12 de [06-user-stories.md](06-user-stories.md))
> **Autor:** Jose Bustamante
> **Documentos relacionados:** [00-constitucion.md](00-constitucion.md) · [01-project-brief.md](01-project-brief.md) · [02-alcance.md](02-alcance.md) · [04-glosario.md](04-glosario.md) · [05-preguntas-abiertas.md](05-preguntas-abiertas.md) · [auditoria-qa.md](auditoria-qa/auditoria-qa.md) · [ADR-0001](docs/adr/0001-occupancy-type-instead-of-tenant-role.md)

## Convenciones

**Notación EARS en español.** Cada regla usa una sola plantilla:

| Patrón | Plantilla |
|---|---|
| Ubiquitous | El sistema DEBE / NO DEBE … |
| Event-driven | **Cuando** <evento>, el sistema DEBE … |
| State-driven | **Mientras** <estado>, el sistema DEBE / NO DEBE … |
| Unwanted | **Si** <situación no deseada>, **entonces** el sistema DEBE … |
| Optional | **Donde** <característica presente>, el sistema DEBE / NO DEBE … |
| Complex | **Mientras** <estado>, **cuando** <evento>, el sistema DEBE … |

**Sujeto de la regla.** El sujeto es "el sistema" o un componente nombrado del sistema, como `DataRetentionJob` o el panel de indicadores.

**Palabras normativas.** DEBE = obligatorio. NO DEBE = prohibido. PUEDE = opcional.

**Prioridad.** Cada regla toma la prioridad MoSCoW de la funcionalidad que gobierna (M = MUST, S = SHOULD). Una regla que repite un principio de la constitución es **MUST** en cualquier funcionalidad, porque la constitución no es negociable.

**Categorías.** Se usan Registro, Padrón, Reservas, Portería, Transparencia, Contrataciones, Pagos, Averías, Notificaciones, Seguridad, Datos y UX. No se usa "Crédito" porque CondoHub no otorga crédito ni procesa cobros (PRINCIPIO-007).

**Valores.** Los montos van en S/ con 2 decimales, los tiempos en segundos y las fechas en ISO 8601 con la zona horaria de Lima (`-05:00`). En los documentos, los números usan coma de miles y punto decimal (por ejemplo, 7,776,000 s).

**Datos de los ejemplos.** Todas las personas, unidades y montos de los ejemplos son **sintéticos** (PRINCIPIO-008).

**Reglas marcadas con ⚠️.** La regla se apoya en una pregunta abierta o en un detalle que la auditoría dejó pendiente. Se escribió con lo decidido hasta ahora, pero puede cambiar cuando se responda la pregunta indicada. El detalle está en la sección 9 o en [auditoria-qa.md](auditoria-qa/auditoria-qa.md).

**Códigos de error.** Cada regla que rechaza una solicitud indica su código de error estable. El formato de la respuesta está en RN-102.

**Reglas retiradas.** Una regla retirada conserva su identificador y no se reutiliza.

**Reglas diferidas.** Una regla marcada **⏸ Diferida (ADR-0020)** sigue vigente, pero no se implementa en el MVP: el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md) (2026-11-04) la difiere hasta que haya un piloto con usuarios reales o el autor la reincorpore. Los agentes no deben implementarla mientras tenga la marca. Son RN-014, RN-063, RN-069, RN-115, RN-124, RN-134, RN-141, RN-145, RN-146, RN-148, RN-149, RN-150, RN-151, RN-152, RN-154, RN-155, RN-156.

**Reglas ⏭ fuera del MVP.** Una regla marcada **⏭ Fuera del MVP (S2/S4)** gobierna una funcionalidad Should y tiene prioridad MUST solo porque repite un principio de la constitución: es obligatoria **cuando se construya esa funcionalidad**, pero un agente no la implementa en el MVP. Son RN-046, RN-047, RN-049 y RN-125 (Spec Finalizer, 2026-11-08). RN-045 no lleva la marca porque la lista de denegación de pasarelas sí se aplica en el MVP (T-002.5).

**Alcance del catálogo.** Solo hay reglas para las funcionalidades Must (M1–M6) y Should (S1–S5), las reglas transversales de la sección 8 y las de retención, porque gobiernan datos que crean las funcionalidades Must. `DataRetentionJob` entra en el MVP **sin lectura del archivo frío** (auditoría A-01; ADR-0006). No hay reglas para las Could (C1–C4), el Won't have (W1–W13), las solicitudes ARCO ni el Libro de Reclamaciones. Las reglas de ARCO y del Libro de Reclamaciones se escribirán solo si Q20 confirma un piloto con usuarios reales (auditoría M-23). **Un agente no debe implementar ARCO ni el Libro de Reclamaciones mientras no existan sus reglas.**

---

## 1. Padrón del condominio (M1)

---

**RN-001** | Categoría: Registro | Prioridad: MUST | Fuente: Alcance M1 · ADR-0001

Patrón EARS: Ubiquitous

El sistema DEBE asignar a cada vínculo persona–unidad (`UnitOccupancy`) un `OccupancyType` con valor `Owner` o `Tenant`.

✅ **Ejemplo:** El Administrator registra a Ana Quispe en la unidad A-502 con `OccupancyType = Owner` y `StartDate = 2026-11-15`.

❌ **Contraejemplo:** El vínculo de Ana Quispe con A-502 se guarda con `OccupancyType = null`, o con el valor `"Familiar"`.

---

**RN-002** | Categoría: Registro | Prioridad: MUST | Fuente: ADR-0001 · Auditoría A-14

Patrón EARS: Unwanted

Si el Administrator registra un vínculo con `OccupancyType = Tenant` para una persona con rol `NonResidentOwner`, entonces el sistema DEBE rechazar el registro.

Código de error: `OCCUPANCY_TENANT_NOT_ALLOWED`

✅ **Ejemplo:** Luis Rojas (NonResidentOwner, propietario de B-1203) es registrado el 2026-11-20 como `Tenant` de A-301. El sistema rechaza el registro y no crea el vínculo.

❌ **Contraejemplo:** El sistema guarda el vínculo `Tenant` de Luis Rojas con A-301.

---

**RN-003** | Categoría: Registro | Prioridad: MUST | Fuente: Alcance M1 · Brief §2 (1 a 4 torres) · Auditoría A-14

Patrón EARS: Unwanted

Si el Administrator registra una unidad con un número que ya existe en la misma torre, entonces el sistema DEBE rechazar el registro.

Código de error: `UNIT_NUMBER_DUPLICATE`

✅ **Ejemplo:** Ya existe la unidad 502 en la torre A. El Administrator registra la unidad 502 en la torre B y el sistema la acepta. Luego intenta registrar otra 502 en la torre A y el sistema la rechaza.

❌ **Contraejemplo:** La torre A queda con dos unidades 502, cada una con un propietario distinto.

---

**RN-004** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003

Patrón EARS: Ubiquitous

El sistema DEBE guardar en cada registro del padrón el `CondominiumId` del condominio del usuario autenticado que lo crea.

✅ **Ejemplo:** El Administrator del condominio sintético "Residencial Los Olivos" (`CondominiumId = 7f3c9a10-…`) crea la torre C. La fila de la torre C tiene `CondominiumId = 7f3c9a10-…`.

❌ **Contraejemplo:** La torre C se guarda con `CondominiumId = null`, o con el identificador de otro condominio enviado en el cuerpo de la solicitud.

---

**RN-005** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · ADR-0001 · Auditoría A-02, M-09 · Reauditoría RQ-C03 · Tercera reauditoría R3-A04

Patrón EARS: Event-driven

Cuando una persona queda sin vínculos activos, sin vínculos futuros (con `StartDate` posterior a hoy) y sin roles en un condominio, tenga o no cuenta de usuario, el sistema DEBE fijar el inicio del plazo de retención de 90 días (7,776,000 s) en la más tardía de estas dos fechas: la `EndDate` de su último vínculo o la fecha en que se revocó su último rol.

✅ **Ejemplo:** El contrato de alquiler de Carla Díaz (`Tenant` de A-301) termina con `EndDate = 2027-01-31`, su último día de vínculo. Su rol Resident se revoca automáticamente (RN-060) y no tiene otro rol. Su plazo de retención vence el 2027-05-01. Raúl Mendoza (Concierge, sin vínculos) pierde su rol el 2027-02-10 en un traspaso de administradora: su plazo vence el 2027-05-11. Si Carla ya tuviera registrado un vínculo con A-305 con `StartDate = 2027-08-01`, el plazo no empezaría.

❌ **Contraejemplo:** Marco Salazar vende su unidad (`EndDate = 2027-01-15`) pero sigue siendo BoardMember. El plazo empieza el 2027-01-15 y `DataRetentionJob` archiva su nombre y su correo el 2027-04-15, aunque Marco todavía inicia sesión. También es incorrecto calcular el plazo desde la creación de la cuenta.

---

**RN-131** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Segunda reauditoría R2-A05 · Tercera reauditoría R3-A04

Patrón EARS: Event-driven

Cuando a una persona con un plazo de retención en curso en un condominio (RN-005) se le registra un vínculo, activo o futuro, o se le asigna un rol en ese condominio antes de que venza el plazo, el sistema DEBE anular ese plazo de retención. Un plazo nuevo solo empieza según RN-005.

✅ **Ejemplo:** El plazo de Carla Díaz en "Residencial Los Olivos" vence el 2027-05-01. El 2027-03-01 el Administrator le registra un nuevo vínculo `Tenant` con A-301. El plazo se anula y `DataRetentionJob` no la archiva el 2027-05-01. Lo mismo pasa si el vínculo registrado el 2027-03-01 tiene `StartDate = 2027-08-01`.

❌ **Contraejemplo:** El 2027-05-01 `DataRetentionJob` archiva a Carla y borra sus datos aunque vuelve a ser inquilina activa desde el 2027-03-01, o la archiva porque su único vínculo empieza el 2027-08-01.

---

**RN-006** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.3

Patrón EARS: Ubiquitous

El sistema NO DEBE guardar información de discapacidad distinta del indicador booleano `RequiresAccessibleElevator`.

✅ **Ejemplo:** La ficha de Rosa Huamán tiene `RequiresAccessibleElevator = true` y ningún otro dato de salud.

❌ **Contraejemplo:** La ficha tiene un campo `DisabilityDescription = "Usa silla de ruedas por artrosis"`.

---

**RN-057** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Auditoría C-02 ⚠️ Q18

Patrón EARS: State-driven

Mientras una persona del padrón no haya aceptado el consentimiento informado, el sistema NO DEBE guardar de ella más datos que su nombre, su correo y su vínculo con la unidad.

✅ **Ejemplo:** El Administrator registra a Jorge Paredes (A-704, `Owner`) con nombre y correo. Jorge acepta el consentimiento el 2026-11-21 y recién entonces registra su DNI y su teléfono.

❌ **Contraejemplo:** El Administrator carga el DNI y el teléfono de Jorge el 2026-11-18, antes de que Jorge reciba la invitación.

---

**RN-145** | Categoría: Datos | Prioridad: MUST | Fuente: Alcance M1 · Constitución PRINCIPIO-004.1 · Segunda reauditoría R2-A11 ⏸ Diferida (ADR-0020)

Patrón EARS: Ubiquitous

El sistema DEBE permitir que solo el titular registre y edite su DNI o carné de extranjería y su teléfono, desde su perfil y después de aceptar el consentimiento informado.

✅ **Ejemplo:** Jorge Paredes acepta el consentimiento el 2026-11-21T10:00:00-05:00 y desde "Mi perfil" registra su DNI `70123456` y su teléfono `987654321`. El 2027-01-10 cambia su teléfono desde la misma pantalla.

❌ **Contraejemplo:** La pantalla para registrar el DNI está en el padrón del Administrator, o Jorge puede completarla antes de aceptar el consentimiento.

---

**RN-146** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M1 · Constitución PRINCIPIO-006 · Segunda reauditoría R2-A11 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si un usuario distinto del titular, incluido el Administrator, intenta registrar o editar el DNI, el carné de extranjería o el teléfono de una persona, entonces el sistema DEBE rechazar la operación.

Código de error: `PERSONAL_DATA_OWNER_ONLY` (`403`, RN-118)

✅ **Ejemplo:** El 2026-11-25 el Administrator intenta corregir el teléfono de Jorge Paredes y recibe `403`. Sí puede ver el teléfono que Jorge registró.

❌ **Contraejemplo:** El Administrator corrige el DNI de Jorge "porque lo digitó mal".

---

**RN-147** | Categoría: Datos | Prioridad: MUST | Fuente: Alcance M1 · Segunda reauditoría R2-A11

Patrón EARS: Ubiquitous

El sistema NO DEBE exigir el DNI, el carné de extranjería ni el teléfono para que el titular use la plataforma.

✅ **Ejemplo:** Carla Díaz acepta el consentimiento el 2026-11-20 y reserva el salón de fiestas sin haber registrado su DNI ni su teléfono.

❌ **Contraejemplo:** El sistema no deja reservar a Carla hasta que complete su DNI.

---

**RN-148** | Categoría: Registro | Prioridad: MUST | Fuente: Alcance M1 · Segunda reauditoría R2-A11 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si el titular registra como DNI un número que no tiene exactamente 8 dígitos, entonces el sistema DEBE rechazar el registro.

Código de error: `DNI_INVALID_FORMAT` (`422`, RN-102)

✅ **Ejemplo:** El sistema acepta el DNI `45678912` y rechaza `4567891`, `456789123` y `4567891A`.

❌ **Contraejemplo:** El sistema guarda el DNI `4567891` con 7 dígitos.

---

**RN-149** | Categoría: Registro | Prioridad: MUST | Fuente: Alcance M1 · Segunda reauditoría R2-A11 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si el titular registra como carné de extranjería un número que no tiene de 9 a 12 caracteres alfanuméricos, entonces el sistema DEBE rechazar el registro.

Código de error: `FOREIGNER_CARD_INVALID_FORMAT` (`422`, RN-102)

✅ **Ejemplo:** El sistema acepta `001234567` (9 caracteres) y `A12345678901` (12 caracteres), y rechaza `12345678` (8 caracteres), `A123456789012` (13 caracteres) y `0012345#7`.

❌ **Contraejemplo:** El sistema acepta un carné de extranjería de 8 caracteres, o lo valida con la regla del DNI.

---

**RN-150** | Categoría: Registro | Prioridad: MUST | Fuente: Alcance M1 · Segunda reauditoría R2-A11 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si el titular registra un teléfono que, después de quitar espacios, guiones y el prefijo `+51`, no tiene exactamente 9 dígitos o no empieza con 9, entonces el sistema DEBE rechazar el registro.

Código de error: `PHONE_NUMBER_INVALID_FORMAT` (`422`, RN-102)

✅ **Ejemplo:** El sistema acepta `987654321`, `987 654 321` y `+51 987-654-321`, y guarda los tres como `987654321`. Rechaza `98765432` (8 dígitos) y `012345678` (no empieza con 9).

❌ **Contraejemplo:** El sistema guarda `12345` como teléfono de Jorge.

---

**RN-151** | Categoría: Seguridad | Prioridad: MUST | Fuente: Segunda reauditoría R2-A11 · Tercera reauditoría R3-A03 · ADR-0008 (OWASP ASVS V2.5) ⏸ Diferida (ADR-0020)

Patrón EARS: Event-driven

Cuando el titular solicita cambiar su correo de login desde su perfil, el sistema DEBE enviar un enlace de confirmación de un solo uso, válido por 1 h (3,600 s), al correo nuevo, y DEBE mantener el correo anterior hasta que se confirme ese enlace. Al confirmarse, el sistema DEBE cambiar solo el correo de la cuenta global `User` y su índice ciego global (RN-121). El correo de cada ficha `Person` es un dato de contacto de ese condominio y no cambia. Ningún actor, incluido el Administrator, puede cambiar el correo de login de otra persona.

✅ **Ejemplo:** Ana pide cambiar `ana.quispe@example.pe` por `ana.q@example.pe` a las 10:00. Confirma el enlace a las 10:20 y desde ese momento inicia sesión con el correo nuevo. Su ficha de "Residencial Los Olivos" sigue con `ana.quispe@example.pe` como correo de contacto.

❌ **Contraejemplo:** El correo cambia apenas Ana lo escribe, sin confirmar que el correo nuevo es suyo; el cambio recorre las fichas de Ana en otros condominios con `IgnoreQueryFilters()`; o el Administrator cambia el correo de login de Ana desde el padrón.

---

**RN-152** | Categoría: Seguridad | Prioridad: MUST | Fuente: Segunda reauditoría R2-A11 · Tercera reauditoría R3-A03 · ADR-0008 (OWASP ASVS V2.5) ⏸ Diferida (ADR-0020)

Patrón EARS: Event-driven

Cuando se confirma el cambio de correo de login de una cuenta, el sistema DEBE enviar un aviso al correo anterior con el enlace de reversión de RN-156.

✅ **Ejemplo:** Al confirmarse el cambio, `ana.quispe@example.pe` recibe "Tu correo de acceso a CondoHub cambió el 2026-11-20 a las 10:20. Si no fuiste tú, usa este enlace para revertirlo".

❌ **Contraejemplo:** Un atacante que tomó la sesión de Ana cambia el correo y Ana no se entera, o se entera pero no tiene cómo revertirlo.

---

**RN-153** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Segunda reauditoría R2-A11 · Tercera reauditoría R3-A02

Patrón EARS: Ubiquitous

El sistema NO DEBE revelar, ni en el mensaje visible ni en el código de error de la API, que un correo o un DNI pertenece a otra persona, que existe una cuenta con un correo o que una cuenta está bloqueada. Aplica a todos los actores y flujos, incluido el Administrator al registrar personas en el padrón.

✅ **Ejemplo:** Ana intenta registrar un DNI que ya existe en su condominio y ve "No se pudo registrar el documento. Contacta a la administración.".

❌ **Contraejemplo:** Ana ve "Ese DNI ya está registrado a nombre de Jorge Paredes" o "Ese correo ya tiene una cuenta"; la API devuelve `EMAIL_ALREADY_REGISTERED` aunque la pantalla muestre un mensaje neutro; o un correo bloqueado recibe `ACCOUNT_LOCKED` y un correo sin cuenta recibe otra respuesta.

---

**RN-154** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Tercera reauditoría R3-A03 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si el correo nuevo que pide el titular ya pertenece a otra cuenta, entonces el sistema NO DEBE enviar el enlace de confirmación ni cambiar el correo, y DEBE mostrar la misma respuesta que cuando el correo está disponible: "Si el correo está disponible, te enviamos un enlace para confirmarlo." (RN-153).

✅ **Ejemplo:** Ana pide cambiar su correo a `jorge.paredes@example.pe`, que ya tiene cuenta. Ve el mismo mensaje de siempre, no se envía ningún enlace y su correo no cambia.

❌ **Contraejemplo:** Ana ve "Ese correo ya está en uso", o la API devuelve un código distinto según el correo exista o no.

---

**RN-155** | Categoría: Seguridad | Prioridad: MUST | Fuente: Tercera reauditoría R3-A03 · ADR-0008 (OWASP ASVS V2.5) ⏸ Diferida (ADR-0020)

Patrón EARS: Event-driven

Cuando el titular solicita cambiar su correo de login, el sistema DEBE pedirle su contraseña actual y, si su cuenta tiene TOTP (RN-008), un código TOTP válido, antes de enviar el enlace de RN-151.

✅ **Ejemplo:** Marco, que tiene TOTP, pide cambiar su correo. El sistema le pide su contraseña y su código TOTP, y solo después envía el enlace.

❌ **Contraejemplo:** Alguien con la sesión de Ana abierta en una computadora compartida cambia su correo sin conocer su contraseña.

---

**RN-156** | Categoría: Seguridad | Prioridad: MUST | Fuente: Tercera reauditoría R3-A03 · ADR-0008 (OWASP ASVS V2.5) ⏸ Diferida (ADR-0020)

Patrón EARS: Event-driven

Cuando el titular usa el enlace de reversión del aviso de RN-152, de un solo uso y válido por 7 días (604,800 s), el sistema DEBE restaurar el correo de login anterior, cerrar todas las sesiones abiertas de la cuenta y obligar a cambiar la contraseña en el siguiente inicio de sesión.

✅ **Ejemplo:** El 2026-11-20 un atacante cambia el correo de Ana. El 2026-11-22 Ana usa el enlace del aviso: su cuenta vuelve a `ana.quispe@example.pe`, la sesión del atacante se cierra y Ana define una contraseña nueva.

❌ **Contraejemplo:** El enlace de reversión sirve más de una vez o después de 7 días, o restaura el correo pero deja abierta la sesión del atacante.

---

**RN-157** | Categoría: Registro | Prioridad: MUST | Fuente: Segunda reauditoría R2-M02 · Tercera reauditoría R3-A04

Patrón EARS: Unwanted

Si el Administrator intenta invitar a una persona cuyos únicos vínculos en el condominio son futuros y que no tiene un rol allí, entonces el sistema DEBE rechazar la invitación hasta la `StartDate` del primero de esos vínculos.

Código de error: `OCCUPANCY_NOT_STARTED` (`422`, RN-102)

✅ **Ejemplo:** El 2027-03-01 el Administrator registra a Jorge como `Tenant` de A-305 con `StartDate = 2027-08-01`. El sistema no le deja invitarlo hasta el 2027-08-01; ese día lo invita y Jorge entra.

❌ **Contraejemplo:** Jorge recibe la invitación el 2027-03-01, la acepta y entra al condominio cinco meses antes de su vínculo; o la invitación vence a los 7 días (RN-110) y hay que reenviarla.

---

**RN-058** | Categoría: Registro | Prioridad: MUST | Fuente: Auditoría M-19 · A-14

Patrón EARS: Unwanted

Si el Administrator registra una unidad con un número que no tiene 3 o 4 dígitos (piso + número), entonces el sistema DEBE rechazar el registro.

Código de error: `UNIT_NUMBER_INVALID_FORMAT`

✅ **Ejemplo:** El sistema acepta `502` y `1203`.

❌ **Contraejemplo:** El sistema acepta `50`, `5-02` o `Dpto502`.

---

**RN-059** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría A-07 · Reauditoría RQ-A06

Patrón EARS: Event-driven

Cuando se crea, modifica o termina un vínculo, o se asigna o revoca un rol, el sistema DEBE registrar el cambio en el log de auditoría con el valor anterior, el valor nuevo, quién hizo el cambio y la fecha-hora en ISO 8601. La vista del log para la Junta Directiva sigue RN-124.

✅ **Ejemplo:** El 2026-12-02T10:30:00-05:00 el Administrator cambia el vínculo de Jorge Paredes con A-704 de `Owner` a `Tenant`. Marco Salazar (BoardMember) ve en el log: unidad A-704, `Owner → Tenant`, hecho por el Administrator, `2026-12-02T10:30:00-05:00`, sin el nombre de Jorge.

❌ **Contraejemplo:** Jorge pierde el acceso a los gastos y no queda rastro de quién cambió su vínculo ni cuándo.

---

**RN-129** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Reauditoría RQ-A12

Patrón EARS: Ubiquitous

El sistema DEBE cifrar con AES-256-GCM los datos personales que guarda el log de auditoría.

✅ **Ejemplo:** La entrada del cambio de Jorge guarda su nombre y su correo como texto cifrado.

❌ **Contraejemplo:** El log guarda "Jorge Paredes" en texto plano.

---

**RN-130** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Auditoría C-08 · Reauditoría RQ-A12

Patrón EARS: Event-driven

Cuando `DataRetentionJob` archiva a una persona (RN-126), el sistema DEBE conservar sus entradas en el log de auditoría con el `PersonId`, el cargo, el tipo de cambio y la fecha-hora, y mover sus datos personales al archivo frío. El sistema NO DEBE borrar entradas del log mientras exista el condominio.

✅ **Ejemplo:** Al archivar a Jorge, la entrada "A-704 · `Owner → Tenant` · 2026-12-02" sigue en el log, sin su nombre.

❌ **Contraejemplo:** El job borra todas las entradas del log que mencionan a Jorge, o deja su nombre en el log.

---

**RN-124** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Reauditoría RQ-A06 ⏸ Diferida (ADR-0020)

Patrón EARS: Ubiquitous

El sistema DEBE mostrar a la Junta Directiva el log de auditoría con el tipo de cambio, la unidad, el valor anterior y el nuevo, el cargo de quien hizo el cambio y la fecha-hora, sin nombres ni datos de contacto de personas.

✅ **Ejemplo:** Marco ve "A-704 · vínculo `Owner → Tenant` · Administrator · 2026-12-02T10:30:00-05:00".

❌ **Contraejemplo:** Marco ve "Jorge Paredes (jorge.paredes@example.pe) pasó de Owner a Tenant en A-704".

---

**RN-060** | Categoría: Seguridad | Prioridad: MUST | Fuente: ADR-0003 · Auditoría A-10, M-09 · Reauditoría RQ-C03 · Segunda reauditoría R2-A06

Patrón EARS: Event-driven

Cuando termina el último vínculo activo de una persona en un condominio, `OccupancyLifecycleJob` (RN-136) DEBE revocarle los roles Resident y NonResidentOwner en ese condominio, sin cambiar sus otros roles.

✅ **Ejemplo:** El vínculo de Carla con A-301 termina el 2027-01-31. Desde el 2027-02-01 Carla ya no tiene el rol Resident en "Residencial Los Olivos". Marco Salazar vende su unidad el 2027-01-15: pierde el rol Resident, pero conserva BoardMember y su plazo de retención no empieza (RN-005).

❌ **Contraejemplo:** Carla conserva el rol Resident sin ningún vínculo, o Marco pierde también el rol BoardMember al vender su unidad.

---

**RN-136** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003 · ADR-0003 · Segunda reauditoría R2-A06 · Tercera reauditoría R3-A04

Patrón EARS: Ubiquitous

El sistema DEBE ejecutar una vez al día `OccupancyLifecycleJob`, que aplica los eventos que ocurren por fecha: el inicio de los vínculos con la reactivación de cuentas (RN-133), el fin de los vínculos, la revocación automática de roles (RN-060) y la desactivación de cuentas (RN-073).

✅ **Ejemplo:** El vínculo de Carla con A-301 tiene `EndDate = 2027-01-31`. La ejecución del 2027-02-01 detecta que terminó, le revoca el rol Resident en "Residencial Los Olivos" y, como no tiene vínculos ni roles en otro condominio, desactiva su cuenta.

❌ **Contraejemplo:** La revocación ocurre recién cuando Carla intenta iniciar sesión, o la hace `DataRetentionJob` sin estar documentada.

---

**RN-061** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Auditoría C-08 · ADR-0002

Patrón EARS: Event-driven

Cuando `DataRetentionJob` archiva los datos personales de una persona, el sistema DEBE conservar en la base operativa el `PersonId` y el cargo que esa persona tenía en cada registro que la referencia.

✅ **Ejemplo:** Marco Salazar aprobó "Pintura de fachada" como BoardMember. Al archivar sus datos, la decisión conserva `decidedBy = b41e…` y el cargo "Junta Directiva". Su nombre y su correo pasan al archivo frío.

❌ **Contraejemplo:** La decisión sobre "Pintura de fachada" queda sin `decidedBy` o se borra junto con los datos de Marco.

---

**RN-126** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Auditoría C-01, C-08 · Reauditoría RQ-A01 · ADR-0002

Patrón EARS: Event-driven

Cuando vence el plazo de retención de una persona en un condominio (RN-005), `DataRetentionJob` DEBE copiar al archivo frío, cifrados con la clave del titular, su nombre, DNI o carné de extranjería, teléfono, correo, `RequiresAccessibleElevator`, sus vínculos con sus fechas y los registros de consentimiento de esa ficha (RN-012). Los consentimientos de sus fichas en otros condominios no se tocan.

✅ **Ejemplo:** El plazo de Carla vence el 2027-05-01. Ese día el job copia al archivo frío su ficha de "Residencial Los Olivos", su vínculo con A-301 (2026-11-10 a 2027-01-31) y su aceptación del consentimiento `2026-11-01.v1`.

❌ **Contraejemplo:** El job archiva solo el nombre y deja en SQL Server el DNI y los vínculos, o archiva los datos sin cifrar con la clave del titular.

---

**RN-127** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Reauditoría RQ-A01 · Segunda reauditoría R2-C02, R2-A04 · ADR-0002

Patrón EARS: Event-driven

Cuando `DataRetentionJob` termina de archivar a una persona en un condominio (RN-126), `DataRetentionJob` DEBE eliminar de SQL Server los datos archivados y los índices ciegos de su correo y su DNI en ese condominio, y conservar la fila de su ficha `Person` solo con su `PersonId` y su `CondominiumId`, sin datos personales. `DataRetentionJob` NO DEBE borrar en cascada las reservas, las marcas de ingreso, las decisiones de contratación ni las entradas del log de auditoría que la referencian (RN-061, RN-130).

✅ **Ejemplo:** Después de archivar a Carla, su ficha de "Residencial Los Olivos" queda solo con `PersonId = c7d2…` y el `CondominiumId`. Sus reservas siguen existiendo y apuntan a esa ficha, con el cargo Resident (RN-061).

❌ **Contraejemplo:** El job borra la fila de Carla y, por el borrado en cascada, desaparecen sus reservas y sus marcas de ingreso; o el índice ciego de su correo sigue en la base y bloquea que otra persona de ese condominio use ese correo.

---

**RN-128** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría C-07 · Reauditoría RQ-A01, RQ-C04 · Segunda reauditoría R2-A04

Patrón EARS: Event-driven

Cuando una cuenta de usuario se queda sin fichas `Person` sin archivar en todos los condominios, el sistema DEBE eliminar esa cuenta con su `PasswordHash`, su secreto TOTP, sus códigos de recuperación y el índice ciego global de su correo, sin archivarlos.

✅ **Ejemplo:** Carla solo estaba en "Residencial Los Olivos". Al archivarse su ficha, su cuenta se elimina. Ana tiene fichas en dos condominios: si se archiva la de "Torres del Parque", su cuenta y su contraseña siguen sirviendo para "Residencial Los Olivos".

❌ **Contraejemplo:** Al archivar la ficha de Ana en un solo condominio se borra su contraseña y ya no puede entrar al otro, o la cuenta de Carla sigue existiendo, sin fichas, con su correo y su `PasswordHash`.

---

**RN-135** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Segunda reauditoría R2-A05

Patrón EARS: Event-driven

Cuando una persona cuya ficha `Person` de un condominio ya fue archivada (RN-127) vuelve a ese condominio, el sistema DEBE crearle una ficha `Person` nueva a partir de una invitación y NO DEBE restaurar los datos archivados.

✅ **Ejemplo:** La ficha de Ana Quispe en "Torres del Parque" se archivó el 2027-06-10. El 2027-09-01 el Administrator de "Torres del Parque" la registra de nuevo y la invita. Ana recibe una ficha nueva con otro `PersonId`, sin el DNI ni el teléfono archivados, y acepta la invitación con su cuenta, que sigue existiendo por "Residencial Los Olivos" (RN-122). Antes de usar "Torres del Parque", acepta el consentimiento con su ficha nueva (RN-010). Si Carla vuelve a "Residencial Los Olivos" después de archivada, como su cuenta ya se eliminó (RN-128), la invitación le crea una cuenta nueva.

❌ **Contraejemplo:** El sistema recupera del archivo frío el DNI y el teléfono de Ana, o reutiliza la fila seudonimizada de su ficha anterior.

---

**RN-170** | Categoría: Padrón | Prioridad: MUST | Fuente: Validación de prototipos 2026-11-08 (códigos pedidos por el autor)

Patrón EARS: Unwanted

Si el Administrator agrega una torre con un código que ya existe en el condominio, sin distinguir mayúsculas ni espacios al inicio y al final, entonces el sistema DEBE rechazar el registro.

Código de error: `TOWER_CODE_DUPLICATE` (`422`, RN-102)

✅ **Ejemplo:** "Residencial Los Olivos" tiene las torres A, B y C. El Administrator agrega la torre "D" y el sistema la acepta; si escribe " b ", la rechaza.

❌ **Contraejemplo:** El padrón queda con dos torres "B" y las unidades B-104 se reparten entre ellas.

---

**RN-174** | Categoría: Padrón | Prioridad: MUST | Fuente: Validación de prototipos 2026-11-08 (códigos pedidos por el autor)

Patrón EARS: Unwanted

Si el Administrator registra un vínculo persona–unidad cuya fecha de fin es anterior a su fecha de inicio, entonces el sistema DEBE rechazar el registro. Un vínculo sin fecha de fin es indefinido.

Código de error: `OCCUPANCY_END_BEFORE_START` (`422`, RN-102)

✅ **Ejemplo:** El Administrator registra a Carla como inquilina de A-301 desde el 2026-11-10 hasta el 2027-01-31 y el sistema lo acepta.

❌ **Contraejemplo:** Se guarda un vínculo del 2027-01-31 al 2026-11-10 y Carla queda activa y vencida a la vez.

---

**RN-175** | Categoría: Padrón | Prioridad: MUST | Fuente: Validación de prototipos VL-P054 obs. 1 (2026-11-08) · complementa RN-157, RN-060 y RN-072

Patrón EARS: Unwanted

Si el Administrator invita a una persona que no tiene ningún vínculo activo ni futuro en el condominio (solo vínculos terminados, o ninguno), entonces el sistema DEBE rechazar la invitación, con cualquier rol. Primero se registra un vínculo vigente en P-053 (decisión del autor del 2026-11-08: toda persona, incluida la de portería, se asigna primero).

Código de error: `OCCUPANCY_NOT_ACTIVE` (`422`, RN-102)

✅ **Ejemplo:** El vínculo de Diego con B-210 terminó el 2026-10-31. El 2026-11-04 el Administrator intenta invitarlo como Residente y el sistema lo rechaza. Le registra un vínculo nuevo desde el 2026-11-04 y entonces sí puede invitarlo.

❌ **Contraejemplo:** Carla, sin vínculos desde el 2027-03-01 (RN-060), recibe una invitación como Residente y vuelve a entrar al condominio sin vínculo (RN-072).

---

**RN-176** | Categoría: Padrón | Prioridad: MUST | Fuente: Auditoría Spec Finalizer 2026-11-08 · 10-validation-log fila 75 · Q89

Patrón EARS: Unwanted

Si el Administrator registra un vínculo persona–unidad cuyo rango de fechas se superpone con otro vínculo de la misma persona con la misma unidad, de cualquier `OccupancyType`, entonces el sistema DEBE rechazar el registro. Para comparar, `EndDate` es inclusiva y una `EndDate` nula es indefinida.

Código de error: `OCCUPANCY_OVERLAP` (`422`, RN-102)

✅ **Ejemplo:** Carla Díaz tiene un vínculo `Tenant` con A-301 del 2026-11-10 al 2027-01-31. El Administrator le registra otro `Tenant` con A-301 desde el 2027-02-01 y el sistema lo acepta. Si lo registra desde el 2027-01-31 (el último día del vínculo vigente), lo rechaza.

❌ **Contraejemplo:** Carla queda con dos vínculos `Tenant` activos con A-301, y la unidad aparece dos veces en su selector de reserva.

---

## 2. Acceso seguro, roles y consentimiento (M2)

---

**RN-007** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría C-05 · ADR-0003

Patrón EARS: Ubiquitous

El sistema DEBE crear cuentas de usuario solo a partir de una invitación emitida por el Administrator del condominio o por el proceso de plataforma.

✅ **Ejemplo:** El 2026-11-18 el Administrator invita a `ana.quispe@example.pe`. Ana abre el enlace y define su contraseña. La cuenta queda ligada a la invitación. El primer Administrator de "Residencial Los Olivos" recibió su invitación del proceso de plataforma.

❌ **Contraejemplo:** La pantalla de inicio tiene un botón público "Crear cuenta" con el que cualquier persona se registra con su correo.

---

**RN-008** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Alcance M2 · Segunda reauditoría R2-A09 · ADR-0008

Patrón EARS: Event-driven

Cuando un usuario que tiene el rol Administrator o BoardMember en cualquier condominio ingresa una contraseña correcta, el sistema DEBE solicitar el código TOTP de su cuenta antes de crear la sesión, en todo inicio de sesión y cualquiera que sea el condominio que elija.

✅ **Ejemplo:** Marco Salazar (BoardMember) ingresa su contraseña el 2026-11-22T20:10:00-05:00. El sistema le pide el código de 6 dígitos de su app autenticadora y crea la sesión solo después de validarlo. Ana Quispe es BoardMember en "Residencial Los Olivos" y solo Resident en "Torres del Parque": el sistema le pide el TOTP también cuando entra a "Torres del Parque".

❌ **Contraejemplo:** Marco entra al panel de contrataciones solo con su contraseña, o Ana entra a "Torres del Parque" sin TOTP porque allí no es BoardMember.

---

**RN-140** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Segunda reauditoría R2-A09 · ADR-0008

Patrón EARS: Event-driven

Cuando un usuario que tiene el rol Administrator o BoardMember en cualquier condominio y no ha enrolado su TOTP inicia sesión, el sistema DEBE exigirle enrolar el TOTP antes de crear la sesión.

✅ **Ejemplo:** Ana Quispe es Resident en "Residencial Los Olivos". El 2026-11-25T09:00:00-05:00 el proceso de plataforma le asigna el rol BoardMember. Esa noche, al iniciar sesión, el sistema le pide registrar su app autenticadora y validar un código antes de crear la sesión, y le muestra sus 10 códigos de recuperación (RN-112).

❌ **Contraejemplo:** Ana entra como BoardMember y el sistema le ofrece enrolar el TOTP "más tarde", o evita el enrolamiento eligiendo "Torres del Parque", donde solo es Resident.

---

**RN-009** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005

Patrón EARS: Ubiquitous

El sistema DEBE almacenar cada contraseña solo como hash Argon2id con parámetros de memoria ≥ 64 MiB, iteraciones ≥ 3 y paralelismo ≥ 1.

✅ **Ejemplo:** La columna `PasswordHash` contiene `$argon2id$v=19$m=65536,t=3,p=1$…`.

❌ **Contraejemplo:** La columna contiene `$argon2id$v=19$m=19456,t=2,p=1$…` (memoria e iteraciones por debajo del mínimo), o un hash bcrypt.

---

**RN-010** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Alcance M2 · Auditoría A-15 · Tercera reauditoría R2-A04 ⚠️ Q18 ⚠️ Q32

Patrón EARS: State-driven

Mientras una persona no haya aceptado, con su ficha `Person` del condominio de su sesión actual, el consentimiento informado vigente, es decir, la última versión publicada, el sistema NO DEBE darle acceso en ese condominio a ninguna pantalla distinta de la de consentimiento.

✅ **Ejemplo:** Carla Díaz inicia sesión por primera vez el 2026-11-20. Solo ve el consentimiento. Al aceptarlo, accede a "Reservas". Si después Carla entra a "Torres del Parque", acepta ahí el consentimiento con su ficha de ese condominio.

❌ **Contraejemplo:** Carla cierra el consentimiento sin aceptarlo y reserva el salón de fiestas.

---

**RN-011** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Auditoría M-05

Patrón EARS: Ubiquitous

El sistema DEBE mostrar un consentimiento informado cuyo texto declare la transferencia internacional de los datos al hosting en Azure South Central US (Estados Unidos).

✅ **Ejemplo:** El consentimiento versión `2026-11-01.v1` dice: "Tus datos se almacenan en servidores de Microsoft Azure ubicados en Estados Unidos (región South Central US)".

❌ **Contraejemplo:** El consentimiento solo dice "Tus datos se guardan en la nube".

---

**RN-012** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Ley N.° 29733 · Tercera reauditoría R2-A04 ⚠️ Q18 ⚠️ Q32

Patrón EARS: Event-driven

Cuando una persona acepta el consentimiento informado en un condominio, el sistema DEBE registrar en su ficha `Person` de ese condominio, no en la cuenta global `User`, la versión del texto aceptado con la fecha-hora de aceptación en ISO 8601.

✅ **Ejemplo:** Se guarda `{ consentVersion: "2026-11-01.v1", acceptedAt: "2026-11-20T09:14:05-05:00" }` en la ficha `Person` de Carla en "Residencial Los Olivos".

❌ **Contraejemplo:** Solo se guarda `HasConsented = true`, sin versión ni fecha; o la aceptación se guarda en la cuenta de Carla y se borra cuando se archiva su ficha de un solo condominio.

---

**RN-013** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Segunda reauditoría R2-A03

Patrón EARS: Unwanted

Si un cliente intenta negociar TLS 1.0 o TLS 1.1, entonces el sistema DEBE rechazar la conexión.

✅ **Ejemplo:** Un escaneo del 2026-12-01 con `tlsx` de ProjectDiscovery (licencia MIT), con las opciones `-version-enum` y `-cipher-enum`, no lista TLS 1.0 ni TLS 1.1 entre las versiones aceptadas por el endpoint.

❌ **Contraejemplo:** El endpoint acepta TLS 1.1 "para compatibilidad con celulares antiguos".

---

**RN-014** | Categoría: UX | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Auditoría M-04 ⚠️ Q31 ⏸ Diferida (ADR-0020)

Patrón EARS: Complex

Mientras la conexión del cliente use TLS 1.2, cuando el usuario inicia sesión, el sistema DEBE mostrar el aviso que recomienda actualizar el sistema operativo o usar un dispositivo más actual.

✅ **Ejemplo:** Jorge Paredes inicia sesión el 2026-11-20 y el 2026-11-21 desde un navegador antiguo configurado con TLS 1.2 como versión máxima. Ve el aviso en ambos inicios de sesión.

❌ **Contraejemplo:** El aviso aparece solo en el primer inicio de sesión y nunca más.

---

**RN-015** | Categoría: Seguridad | Prioridad: MUST | Fuente: ADR-0001 · Alcance D1 · Auditoría A-04 · Reauditoría RQ-A02

Patrón EARS: State-driven

Mientras un usuario con rol Resident o NonResidentOwner no tenga ningún vínculo activo con `OccupancyType = Owner` en el condominio actual, el sistema NO DEBE mostrarle información financiera de ese condominio.

✅ **Ejemplo:** Carla Díaz (Resident, `Tenant` de A-301) abre la pantalla de gastos de su condominio. El sistema responde `403` y no muestra montos.

❌ **Contraejemplo:** Carla ve el gasto "Mantenimiento de ascensores – S/ 4,800.00 – 2026-11-05".

---

**RN-016** | Categoría: Seguridad | Prioridad: MUST | Fuente: ADR-0001 · Auditoría A-02, A-03 · Reauditoría RQ-A02

Patrón EARS: Event-driven

Cuando termina el último vínculo `Owner` activo de un Resident o de un NonResidentOwner, el sistema DEBE negarle la información financiera desde su siguiente solicitud.

✅ **Ejemplo:** Jorge Paredes vende A-704 y su vínculo termina con `EndDate = 2026-12-15`, su último día como propietario. El 2026-12-16T08:00:00-05:00 llama a `GET /api/expenses` y recibe `403`.

❌ **Contraejemplo:** Jorge sigue viendo los gastos hasta que vence su token, 30 días después de la venta.

---

**RN-017** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003 · Auditoría A-04

Patrón EARS: Unwanted

Si un usuario solicita un recurso cuyo `CondominiumId` es distinto al de su condominio actual, entonces el sistema DEBE responder `404`.

✅ **Ejemplo:** Ana (condominio "Residencial Los Olivos") pide `GET /api/reservations/{id}` con el `id` de una reserva de "Torres del Parque" y recibe `404`. El test `Reservations_CrossTenantAccess_Returns404` lo verifica en el CI.

❌ **Contraejemplo:** Ana recibe `200` con los datos de la reserva del otro condominio.

---

**RN-018** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Auditoría A-04

Patrón EARS: Unwanted

Si un usuario con rol Resident o NonResidentOwner solicita los datos de contacto de otro residente del mismo condominio, entonces el sistema DEBE responder `403`.

✅ **Ejemplo:** Ana pide el teléfono del propietario de A-503 y recibe `403`.

❌ **Contraejemplo:** Una pantalla "Vecinos" muestra a Ana el nombre y el teléfono `987 654 321` del propietario de A-503.

---

**RN-062** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría C-05 · ADR-0003 · Segunda reauditoría R2-A09

Patrón EARS: Event-driven

Cuando el proceso de plataforma crea un condominio, emite la invitación del primer Administrator o restablece el MFA de un Administrator o de un BoardMember, el sistema DEBE registrar la acción en el log de auditoría con el operador que la ejecutó y la fecha-hora en ISO 8601.

✅ **Ejemplo:** El 2026-11-15T09:00:00-05:00 un operador humano de CondoHub crea "Residencial Los Olivos" e invita a su primer Administrator. El log de auditoría registra ambas acciones. El 2026-12-20T11:00:00-05:00 el operador restablece el MFA de Marco Salazar (BoardMember), que perdió su celular y sus códigos de recuperación, y el log lo registra.

❌ **Contraejemplo:** Un agente de IA crea un condominio en producción, o el restablecimiento de MFA no deja rastro.

---

**RN-063** | Categoría: Seguridad | Prioridad: MUST | Fuente: Brief §1 · Auditoría C-06 · ADR-0003 ⚠️ Q9, Q24 ⏸ Diferida (ADR-0020)

Patrón EARS: Event-driven

Cuando el proceso de plataforma ejecuta un traspaso de administradora solicitado por la Junta Directiva, el sistema DEBE revocar los roles Administrator y Concierge de la administradora saliente sin eliminar los datos del condominio.

✅ **Ejemplo:** El 2027-02-10 la Junta Directiva presenta su solicitud. El operador revoca al Administrator y a los 2 Concierge de la administradora saliente e invita al nuevo Administrator. El padrón, las reservas, los gastos y las contrataciones siguen en "Residencial Los Olivos".

❌ **Contraejemplo:** El Administrator saliente sigue entrando después del traspaso, o el traspaso borra los gastos que registró.

⚠️ Falta definir qué respaldo documentado basta para iniciar el traspaso (06 C-06).

---

**RN-137** | Categoría: Seguridad | Prioridad: MUST | Fuente: Brief §1 · ADR-0003 · Segunda reauditoría R2-A07

Patrón EARS: Event-driven

Cuando se revoca un rol de una persona en un condominio, el sistema DEBE invalidar en ese momento todas las sesiones de esa persona en ese condominio. "En ese momento" significa de inmediato en la instancia que ejecuta la revocación y en 5 s o menos en las demás instancias (caché de sesión del ADR-0013).

✅ **Ejemplo:** Raúl Mendoza (Concierge) abrió sesión en la PC de portería el 2027-02-10T07:00:00-05:00. A las 10:00 el proceso de plataforma ejecuta el traspaso de administradora y le revoca el rol. Su siguiente solicitud ya no tiene sesión y la vista de portería se cierra.

❌ **Contraejemplo:** Raúl sigue viendo la lista de invitados hasta las 19:00, cuando vence su sesión de 12 h (RN-114), o el Administrator saliente sigue anulando gastos con la sesión que abrió antes del traspaso.

---

**RN-138** | Categoría: Seguridad | Prioridad: MUST | Fuente: Brief §1 · ADR-0003 · Segunda reauditoría R2-A07

Patrón EARS: Event-driven

Cuando se revoca un rol de una persona en un condominio, el sistema DEBE anular las invitaciones pendientes que esa persona emitió con ese rol en ese condominio.

Código de error (uso de una invitación anulada): `INVITATION_REVOKED` (`422`, RN-102)

✅ **Ejemplo:** El 2027-02-08 el Administrator saliente invita a un Concierge nuevo. El 2027-02-10 se ejecuta el traspaso y se le revoca el rol Administrator. La invitación queda anulada, y si alguien abre el enlace el 2027-02-11, el sistema lo rechaza.

❌ **Contraejemplo:** La invitación del Administrator saliente sigue sirviendo hasta el 2027-02-15 (RN-110).

---

**RN-139** | Categoría: Seguridad | Prioridad: MUST | Fuente: Brief §1 · ADR-0003 · Segunda reauditoría R2-A07

Patrón EARS: Event-driven

Cuando se revoca un rol de una persona en un condominio, el sistema DEBE anular las invitaciones pendientes que esa persona recibió con ese rol en ese condominio.

Código de error (uso de una invitación anulada): `INVITATION_REVOKED` (`422`, RN-102)

✅ **Ejemplo:** El 2027-02-07 un Concierge de la administradora saliente recibe su invitación y todavía no la acepta. El 2027-02-10 el traspaso le revoca el rol Concierge. La invitación queda anulada y el enlace ya no crea la cuenta.

❌ **Contraejemplo:** El Concierge acepta la invitación el 2027-02-11 y entra a la vista de portería del condominio.

---

**RN-064** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003 · Auditoría C-07 · Segunda reauditoría R2-A09 · ADR-0003

Patrón EARS: Event-driven

Cuando una persona con vínculos o roles en más de un condominio inicia sesión, el sistema DEBE pedirle que elija el condominio actual después de validar su contraseña y, si corresponde, su TOTP (RN-008), y antes de crear la sesión.

✅ **Ejemplo:** Luis Rojas es NonResidentOwner en "Residencial Los Olivos" y Resident en "Torres del Parque". Al iniciar sesión elige "Torres del Parque", y todas sus consultas quedan restringidas a ese condominio. Marco Salazar (BoardMember en un condominio) ingresa su contraseña, luego su TOTP y recién entonces ve el selector.

❌ **Contraejemplo:** El sistema abre por defecto el primer condominio de la lista, o muestra datos de ambos condominios en la misma sesión.

⚠️ Falta definir cómo se cambia de condominio durante la sesión (06 C-07).

---

**RN-065** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Auditoría A-10 · ADR-0003

Patrón EARS: Ubiquitous

El sistema DEBE asignar cada rol de un usuario a un condominio específico, y un usuario PUEDE tener más de un rol.

✅ **Ejemplo:** Ana Quispe es Resident y BoardMember en "Residencial Los Olivos". Luis Rojas es NonResidentOwner en "Residencial Los Olivos" y Resident en "Torres del Parque".

❌ **Contraejemplo:** El rol de Luis es global, así que figura como NonResidentOwner también en "Torres del Parque".

---

**RN-066** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría A-10 · ADR-0003

Patrón EARS: Unwanted

Si el Administrator intenta asignar o revocar el rol BoardMember, entonces el sistema DEBE rechazar la operación.

Código de error: `ROLE_ASSIGNMENT_NOT_ALLOWED` (`403`, RN-118)

✅ **Ejemplo:** El Administrator intenta quitarle el rol BoardMember a Marco Salazar. El sistema lo rechaza. Solo el proceso de plataforma, a pedido de la Junta Directiva, asigna o revoca ese rol.

❌ **Contraejemplo:** El Administrator se asigna a sí mismo el rol BoardMember.

---

**RN-067** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría A-10 · ADR-0003

Patrón EARS: Unwanted

Si se asigna el rol Administrator a un usuario que ya es BoardMember del mismo condominio, o el rol BoardMember a un usuario que ya es Administrator del mismo condominio, entonces el sistema DEBE rechazar la asignación.

Código de error: `ROLE_INCOMPATIBLE`

✅ **Ejemplo:** Marco Salazar es BoardMember de "Residencial Los Olivos". El proceso de plataforma intenta asignarle el rol Administrator en ese condominio y el sistema lo rechaza.

❌ **Contraejemplo:** Marco es Administrator y BoardMember del mismo condominio y aprueba la contratación que él mismo registró.

---

**RN-068** | Categoría: Registro | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Auditoría A-13 · Reauditoría RQ-C04 · Segunda reauditoría R2-A05 · Tercera reauditoría R3-A02 · ADR-0004

Patrón EARS: Unwanted

Si el Administrator registra en el padrón a una persona con un correo que ya pertenece a otra persona del mismo condominio, según el índice ciego del correo, entonces el sistema DEBE rechazar el registro. La unicidad de la cuenta en toda la plataforma la cubre RN-121, y la persona que vuelve con su ficha sin archivar la cubre RN-132.

Código de error: `PERSON_REGISTRATION_REJECTED` (`422`, RN-102). El mensaje visible es neutro: "No se pudo registrar a la persona con estos datos.", sin confirmar que el correo pertenece a otra persona, tampoco ante el Administrator (RN-153).

✅ **Ejemplo:** `ana.quispe@example.pe` ya está en "Residencial Los Olivos". El Administrator intenta registrar a otra persona con `Ana.Quispe@Example.pe` y el sistema lo rechaza, porque el HMAC del correo normalizado coincide.

❌ **Contraejemplo:** El padrón queda con dos personas con el mismo correo, o la validación compara el texto cifrado y no detecta el duplicado.

---

**RN-132** | Categoría: Registro | Prioridad: MUST | Fuente: Segunda reauditoría R2-A05 · ADR-0004

Patrón EARS: Event-driven

Cuando una persona vuelve a un condominio antes de que venza su plazo de retención allí (RN-131), el sistema DEBE reutilizar su ficha `Person` existente en ese condominio y NO DEBE crear otra.

✅ **Ejemplo:** El 2027-03-01 el Administrator registra de nuevo a Carla Díaz con `carla.diaz@example.pe`. El índice ciego del correo coincide con su ficha sin archivar, y el nuevo vínculo con A-301 se agrega a esa misma ficha (`PersonId = c7d2…`).

❌ **Contraejemplo:** El sistema rechaza a Carla con `PERSON_REGISTRATION_REJECTED`, o crea una segunda ficha de Carla en el mismo condominio.

---

**RN-069** | Categoría: Registro | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Auditoría A-13 · Segunda reauditoría R2-A11 · Tercera reauditoría R3-A02 · ADR-0004 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si se registra en el padrón un DNI que ya pertenece a otra persona del mismo condominio, según el índice ciego del DNI, entonces el sistema DEBE rechazar el registro.

Código de error: `PERSON_REGISTRATION_REJECTED` (`422`, RN-102), el mismo de RN-068. El mensaje visible es neutro: "No se pudo registrar el documento. Contacta a la administración.", sin confirmar que el DNI pertenece a otra persona (RN-153).

✅ **Ejemplo:** El DNI `45678912` ya pertenece a Ana Quispe. Otra persona intenta registrar el mismo DNI y el sistema lo rechaza.

❌ **Contraejemplo:** El sistema guarda el DNI en texto plano "para poder validar que no se repita".

---

**RN-121** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría C-07, A-13 · Reauditoría RQ-C04 · ADR-0003 · ADR-0004

Patrón EARS: Ubiquitous

El sistema DEBE mantener como máximo una cuenta de usuario (`User`) por correo en toda la plataforma, según el índice ciego del correo normalizado.

✅ **Ejemplo:** Ana Quispe es propietaria en "Residencial Los Olivos" y en "Torres del Parque". Tiene una sola cuenta con `ana.quispe@example.pe`, y al iniciar sesión elige el condominio (RN-064).

❌ **Contraejemplo:** Existen dos cuentas con `ana.quispe@example.pe`, una por condominio, y el inicio de sesión no sabe cuál usar.

---

**RN-122** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría C-07 · Reauditoría RQ-C04 · ADR-0003 · Constitución PRINCIPIO-003

Patrón EARS: Event-driven

Cuando una persona acepta una invitación, el sistema DEBE unir su ficha (`Person`) del condominio que la invitó con la cuenta de usuario de ese correo: si la cuenta ya existe, la persona DEBE iniciar sesión con ella para aceptar, y el condominio se agrega a su selector (RN-064); si no existe, el sistema la crea.

✅ **Ejemplo:** Ana ya tiene cuenta por "Residencial Los Olivos". El Administrator de "Torres del Parque" la invita con el mismo correo. Ana abre el enlace, inicia sesión con su contraseña y su TOTP si corresponde, y desde entonces ve los dos condominios en el selector. Cada condominio conserva su propia ficha de Ana.

❌ **Contraejemplo:** Quien abre el enlace queda unido a la cuenta de Ana sin iniciar sesión, o las dos fichas de Ana se fusionan en una sola visible desde ambos condominios.

---

**RN-070** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Auditoría A-15

Patrón EARS: Unwanted

Si un usuario rechaza el consentimiento informado, entonces el sistema DEBE mantener su cuenta sin activar.

✅ **Ejemplo:** Carla Díaz rechaza el consentimiento el 2026-11-20. No puede usar la plataforma, y sus datos mínimos del padrón (RN-057) siguen las reglas normales de retención.

❌ **Contraejemplo:** Carla rechaza el consentimiento y aun así entra a "Reservas".

---

**RN-071** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Auditoría A-15 · Tercera reauditoría R2-A04

Patrón EARS: Event-driven

Cuando se publica una nueva versión del consentimiento informado, el sistema DEBE exigir a cada persona que la acepte, con cada una de sus fichas `Person`, en su siguiente inicio de sesión en ese condominio.

✅ **Ejemplo:** El 2027-01-10 se publica la versión `2027-01-10.v2`. Ana inicia sesión el 2027-01-11 y solo ve el consentimiento nuevo hasta aceptarlo (RN-010).

❌ **Contraejemplo:** Ana sigue usando la plataforma con la aceptación de `2026-11-01.v1`.

---

**RN-072** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría M-09

Patrón EARS: State-driven

Mientras una persona no tenga vínculos activos ni roles en un condominio, el sistema NO DEBE permitirle entrar a ese condominio.

✅ **Ejemplo:** El vínculo de Carla con A-301 terminó el 2027-01-31 y no tiene roles en "Residencial Los Olivos". El 2027-02-01 ese condominio ya no aparece en su selector (RN-064).

❌ **Contraejemplo:** Carla sigue entrando a "Residencial Los Olivos" y ve la disponibilidad de las áreas comunes.

---

**RN-073** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría M-09 · C-07 · Segunda reauditoría R2-A05, R2-A06 · Tercera reauditoría R3-A04

Patrón EARS: Event-driven

Cuando una persona queda sin vínculos activos ni roles en todos sus condominios, `OccupancyLifecycleJob` (RN-136) DEBE desactivar su cuenta. Un vínculo futuro no evita la desactivación: la cuenta se reactiva en su `StartDate` (RN-133).

✅ **Ejemplo:** Carla solo tenía el vínculo con A-301. El 2027-02-01 su cuenta queda desactivada y no puede iniciar sesión, salvo para aceptar una invitación (RN-134).

❌ **Contraejemplo:** Carla puede iniciar sesión aunque no tenga acceso a ningún condominio.

---

**RN-133** | Categoría: Seguridad | Prioridad: MUST | Fuente: Segunda reauditoría R2-A05 · Tercera reauditoría R3-A04

Patrón EARS: Event-driven

Cuando empieza (llega su `StartDate`) un vínculo de una persona cuya cuenta está desactivada, o se le asigna un rol, en un condominio donde su ficha no fue archivada (RN-131), el sistema DEBE reactivar esa cuenta. Registrar un vínculo futuro NO DEBE reactivar la cuenta antes de su `StartDate`; `OccupancyLifecycleJob` la reactiva ese día (RN-136).

✅ **Ejemplo:** La cuenta de Carla se desactivó el 2027-02-01. El 2027-03-01 el Administrator de "Residencial Los Olivos" le registra un nuevo vínculo con A-301 que empieza ese día. Su cuenta se reactiva y Carla inicia sesión con su contraseña de siempre. Si el vínculo empezara el 2027-08-01, la cuenta seguiría desactivada hasta ese día.

❌ **Contraejemplo:** La cuenta de Carla sigue desactivada y no hay forma de que vuelva a entrar, o el sistema le crea una segunda cuenta con el mismo correo (RN-121); o la cuenta se reactiva el 2027-03-01 con un vínculo que empieza el 2027-08-01 y `OccupancyLifecycleJob` la vuelve a desactivar al día siguiente.

---

**RN-134** | Categoría: Seguridad | Prioridad: MUST | Fuente: Segunda reauditoría R2-A05 · ADR-0003 ⏸ Diferida (ADR-0020)

Patrón EARS: Complex

Mientras la cuenta de una persona esté desactivada, cuando esa persona acepta una invitación, el sistema DEBE permitirle iniciar sesión con esa cuenta para aceptarla y DEBE reactivar la cuenta.

✅ **Ejemplo:** La cuenta de Carla está desactivada desde el 2027-02-01. El 2027-03-01 el Administrator de "Torres del Parque" la invita. Carla abre el enlace, inicia sesión con su contraseña, acepta la invitación y su cuenta se reactiva; "Torres del Parque" aparece en su selector (RN-064).

❌ **Contraejemplo:** Carla no puede aceptar la invitación porque su cuenta está desactivada, o el sistema le crea otra cuenta con el mismo correo.

---

**RN-074** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · ADR-0008

Patrón EARS: Ubiquitous

El sistema DEBE cumplir los requisitos de OWASP ASVS 4.0 nivel 2 para la recuperación de contraseña, el enrolamiento del TOTP, los códigos de recuperación, el bloqueo por intentos fallidos, el vencimiento de la invitación y la duración de la sesión, con los valores que fija el ADR-0008.

✅ **Ejemplo:** Cada valor del ADR-0008 tiene su propia regla (RN-110 a RN-117) y su test de integración.

❌ **Contraejemplo:** Una invitación del 2026-11-18 sigue sirviendo en 2027, o un atacante puede probar códigos TOTP sin límite.

---

**RN-110** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · Reauditoría RQ-C02 · ADR-0008

Patrón EARS: Unwanted

Si alguien usa una invitación emitida hace más de 7 días (604,800 s), entonces el sistema DEBE rechazar la creación de la cuenta.

Código de error: `INVITATION_EXPIRED` (`422`, RN-102)

✅ **Ejemplo:** Ana recibe su invitación el 2026-11-18T10:00:00-05:00 y crea su cuenta el 2026-11-24. El sistema lo acepta. Si lo intenta el 2026-11-26, el sistema lo rechaza y el Administrator debe emitir una invitación nueva.

❌ **Contraejemplo:** La invitación del 2026-11-18 sigue sirviendo en enero de 2027.

---

**RN-165** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · ADR-0008 · Revisión QA de HU QA-10 · Reajustada por el autor el 2026-11-08 (validación de prototipos, P-006)

Patrón EARS: Unwanted

Si alguien usa una invitación que ya se aceptó, entonces el sistema DEBE rechazarla sin crear ni unir ninguna cuenta, y mostrar el mensaje propio de ese código: "Esta invitación ya no es válida. Pide una nueva a la administración.". Una invitación vencida (RN-110) y una anulada (RN-139) muestran cada una su propio mensaje (§3.0.6 de 09-ui-spec.md). Los tres mensajes describen solo el estado del enlace, que ya conoce quien lo tiene; ninguno revela si existe una cuenta con ese correo (RN-153).

Código de error: `INVITATION_ALREADY_USED` (`422`, RN-102)

✅ **Ejemplo:** Ana acepta su invitación el 2026-11-20T09:00:00-05:00. A las 09:30 alguien abre el mismo enlace desde otro equipo y el sistema lo rechaza.

❌ **Contraejemplo:** El segundo uso del enlace crea otra cuenta, o deja entrar a la cuenta de Ana sin su contraseña.

---

**RN-111** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · Reauditoría RQ-C02 · Tercera reauditoría R3-A02 · ADR-0008 · Revisión QA de HU QA-08

Patrón EARS: Event-driven

Cuando una cuenta acumula 5 intentos fallidos consecutivos de contraseña o de código TOTP, el sistema DEBE bloquear el inicio de sesión de esa cuenta durante 15 min (900 s). El bloqueo termina en el instante en que se cumplen 900 s desde el quinto intento fallido.

Código de error: `SIGN_IN_FAILED` (`422`, RN-102). Mientras dura el bloqueo, el sistema DEBE responder con el mismo código y el mismo mensaje que ante una contraseña o un código TOTP incorrectos o un correo sin cuenta, sin revelar que la cuenta existe ni que está bloqueada (RN-153).

✅ **Ejemplo:** Marco ingresa su quinto código TOTP incorrecto a las 20:10:00. Hasta las 20:24:59 el sistema rechaza cualquier intento, incluso con el código correcto. A las 20:25:00 acepta sus credenciales correctas.

❌ **Contraejemplo:** Un atacante prueba códigos TOTP sin límite, o el contador se reinicia al cambiar entre contraseña y TOTP.

---

**RN-112** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · Reauditoría RQ-C02 · Segunda reauditoría R2-A09 · ADR-0008

Patrón EARS: Event-driven

Cuando un usuario termina el enrolamiento de su TOTP, el sistema DEBE generarle 10 códigos de recuperación de un solo uso y mostrárselos una sola vez. La regeneración de los códigos sigue RN-141.

✅ **Ejemplo:** Marco activa su app autenticadora y recibe 10 códigos. Usa uno al perder su celular, y ese código deja de servir.

❌ **Contraejemplo:** Los códigos se pueden volver a ver en cualquier momento, o un mismo código sirve dos veces.

---

**RN-141** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Segunda reauditoría R2-A09 · ADR-0008 ⏸ Diferida (ADR-0020)

Patrón EARS: Event-driven

Cuando un usuario valida un código TOTP y pide regenerar sus códigos de recuperación, el sistema DEBE generarle 10 códigos nuevos de un solo uso, mostrárselos una sola vez e invalidar todos los anteriores.

✅ **Ejemplo:** Marco Salazar usó 3 de sus 10 códigos. El 2026-12-05 valida su TOTP y regenera los códigos: recibe 10 nuevos, y los 7 que no había usado dejan de servir.

❌ **Contraejemplo:** Marco regenera los códigos sin validar un TOTP, o los 7 códigos anteriores siguen sirviendo.

---

**RN-113** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · Reauditoría RQ-C02 · ADR-0008

Patrón EARS: State-driven

Mientras una sesión pase 30 min (1,800 s) sin actividad, el sistema DEBE cerrarla. La sesión se cierra al cumplirse exactamente 1,800 s sin actividad: una solicitud a los 1,800 s ya no se atiende.

Solo una acción del usuario cuenta como actividad: abrir una página, enviar un formulario o pulsar un botón, como "Actualizar ahora" en portería. Una solicitud automática en segundo plano NO cuenta como actividad y NO renueva la sesión; por ejemplo, el polling de la vista de portería (RN-026). Decisión del autor del 2026-11-08 (09-ui-spec.md §6 #9; ASVS 4.0 L2 V3.3).

✅ **Ejemplo:** Carla deja la app abierta a las 21:00 sin usarla. A las 21:31 el sistema le pide iniciar sesión de nuevo.

✅ **Ejemplo:** Raúl marca el último ingreso en la PC de portería a las 19:07 y deja la pantalla abierta. La vista se actualiza sola cada 30 s, pero a las 19:37:00 el polling recibe `401` y la pantalla muestra solo "Tu sesión se cerró. Inicia sesión de nuevo.".

❌ **Contraejemplo:** La sesión de la PC de portería sigue abierta al día siguiente.

---

**RN-114** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · Reauditoría RQ-C02 · ADR-0008

Patrón EARS: State-driven

Mientras una sesión tenga más de 12 h (43,200 s) desde su creación, el sistema DEBE cerrarla, aunque haya actividad.

✅ **Ejemplo:** El Concierge inicia sesión a las 07:00 y la usa todo el día. A las 19:00 el sistema le pide iniciar sesión de nuevo.

❌ **Contraejemplo:** Una sesión con actividad constante dura varios días.

---

**RN-115** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance M2 · Auditoría M-16 · Reauditoría RQ-C02 · ADR-0008 ⏸ Diferida (ADR-0020)

Patrón EARS: Unwanted

Si alguien usa un enlace de recuperación de contraseña emitido hace más de 1 h (3,600 s), o que ya se usó, entonces el sistema DEBE rechazar el cambio de contraseña.

Código de error: `PASSWORD_RESET_LINK_INVALID` (`422`, RN-102)

✅ **Ejemplo:** Ana pide recuperar su contraseña a las 09:00 y usa el enlace a las 09:40: el sistema lo acepta. Si vuelve a usar el mismo enlace a las 09:45, el sistema lo rechaza.

❌ **Contraejemplo:** El enlace de recuperación sirve durante una semana o varias veces.

---

**RN-116** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría M-16 · Reauditoría RQ-C02 · ADR-0008 (OWASP ASVS V2.1)

Patrón EARS: Unwanted

Si un usuario define una contraseña de menos de 12 o de más de 64 caracteres, entonces el sistema DEBE rechazarla. El sistema NO DEBE exigir reglas de composición (mayúsculas, números o símbolos).

Código de error: `PASSWORD_LENGTH_INVALID` (`422`, RN-102)

✅ **Ejemplo:** Ana define `mi edificio tiene piscina` (25 caracteres, sin números ni símbolos) y el sistema la acepta. `Ana12345` (8 caracteres) se rechaza.

❌ **Contraejemplo:** El sistema rechaza `mi edificio tiene piscina` porque "no tiene un número", o acepta `Ana12345`.

---

**RN-117** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría M-16 · Reauditoría RQ-C02 · ADR-0008 (OWASP ASVS V2.1.7) · Constitución PRINCIPIO-009

Patrón EARS: Unwanted

Si un usuario define una contraseña que está en la lista local de contraseñas filtradas, entonces el sistema DEBE rechazarla sin enviar la contraseña ni su hash a un servicio externo.

Código de error: `PASSWORD_BREACHED` (`422`, RN-102)

✅ **Ejemplo:** Ana intenta usar `contraseña123456`, que está en la lista local. El sistema la rechaza.

❌ **Contraejemplo:** El sistema envía la contraseña a una API externa para verificarla, o acepta una contraseña filtrada.

---

**RN-177** | Categoría: Seguridad | Prioridad: MUST | Fuente: Auditoría Spec Finalizer 2026-11-08 · 10-validation-log fila 19 · Q54 · Arquitectura §4.1 (rate limiting) · ADR-0008

Patrón EARS: Unwanted

Si llegan más de 10 solicitudes en un minuto (60 s) a `POST /api/auth/*` desde la misma dirección IP, o para el mismo correo según su índice ciego, entonces el sistema DEBE responder `429` con el encabezado `Retry-After` y NO DEBE evaluar las credenciales de esa solicitud. Este límite es independiente del bloqueo por intentos fallidos (RN-111).

Código de error: `AUTH_RATE_LIMITED` (`429`)

✅ **Ejemplo:** Entre las 10:00:00 y las 10:00:40 llegan 10 solicitudes de inicio de sesión para `ana.quispe@example.pe`. La undécima, a las 10:00:45, recibe `429` con `Retry-After: 15`, aunque la contraseña sea correcta. A las 10:01:01 Ana puede volver a intentarlo.

❌ **Contraejemplo:** Un script prueba 500 contraseñas por minuto contra la cuenta de Ana desde varias IP, y el sistema evalúa cada una.

---

## 3. Reserva de áreas comunes (M3)

Las reglas de un área común son cinco valores que configura el Administrator: **horario** (hora de apertura y hora de cierre, dentro del mismo día), **duración máxima** (en segundos), **aforo** (invitados registrados + anfitrión + acompañantes de la unidad), **anticipación máxima** (en segundos) y **máximo de reservas por unidad al mes**.

Las franjas son **semiabiertas** `[inicio, fin)`: una franja que termina a las 22:00 no se superpone con otra que empieza a las 22:00.

Los ejemplos usan esta configuración sintética:

| Área | Horario | Duración máxima | Aforo | Anticipación máxima | Reservas por unidad al mes |
|---|---|---|---|---|---|
| Salón de fiestas | 09:00 a 23:00 | 18,000 s (5 h) | 40 | 7,776,000 s (90 días) | 2 |
| Parrilla | 11:00 a 22:00 | 14,400 s (4 h) | 15 | 2,592,000 s (30 días) | 4 |

---

**RN-019** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · SP2 ⚠️ Q10

Patrón EARS: Event-driven

Cuando un usuario envía una reserva que cumple todas las reglas configuradas del área, el sistema DEBE confirmarla sin aprobación manual.

✅ **Ejemplo:** Ana reserva el salón de fiestas desde 2026-12-12T19:00:00-05:00 hasta 2026-12-12T23:00:00-05:00 con 25 invitados. La reserva queda en estado `Confirmed` en el mismo envío.

❌ **Contraejemplo:** La reserva queda en estado "Pendiente de aprobación del administrador".

---

**RN-020** | Retirada (auditoría M-03)

Se retiró porque repetía RN-019: una reserva que se confirma en el mismo envío cumple siempre el plazo de 600 s. Los 600 s quedan como meta de K2 (RN-050). Si Q10 exige aprobación manual, se escribirá una regla nueva con su plazo.

---

**RN-021** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · SP3 · Auditoría A-14

Patrón EARS: Unwanted

Si la franja solicitada queda fuera del horario configurado del área, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_OUTSIDE_OPENING_HOURS`

✅ **Ejemplo:** Ana pide el salón desde 2026-12-12T20:00:00-05:00 hasta 2026-12-13T00:30:00-05:00. El sistema rechaza la reserva porque termina después de las 23:00.

❌ **Contraejemplo:** El sistema confirma la reserva hasta las 00:30.

---

**RN-022** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · SP3 · Auditoría A-14

Patrón EARS: Unwanted

Si la duración de la franja solicitada supera la duración máxima configurada del área, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_EXCEEDS_MAX_DURATION`

✅ **Ejemplo:** Ana pide el salón de 12:00 a 18:30 (23,400 s). El sistema la rechaza porque supera 18,000 s.

❌ **Contraejemplo:** El sistema confirma la reserva de 23,400 s.

---

**RN-119** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Reauditoría RQ-A10

Patrón EARS: Unwanted

Si el fin de la franja solicitada no es posterior a su inicio, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_INVALID_TIME_SLOT` (`422`, RN-102)

✅ **Ejemplo:** Ana pide el salón de 19:00 a 23:00 y el sistema lo acepta. Una franja de 20:00 a 19:00, o de 20:00 a 20:00, se rechaza.

❌ **Contraejemplo:** El sistema confirma una franja de 20:00 a 19:00 porque ambas horas están dentro del horario.

---

**RN-120** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Reauditoría RQ-A10

Patrón EARS: Unwanted

Si el inicio o el fin de la franja solicitada no están en un minuto exacto (con los segundos en 0), entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_SLOT_NOT_WHOLE_MINUTES` (`422`, RN-102)

✅ **Ejemplo:** Ana pide la parrilla de 12:15 a 14:45 y el sistema lo acepta. Una franja que empieza a las 12:15:30 se rechaza. No hay duración mínima: basta con que se cumpla RN-119.

❌ **Contraejemplo:** El sistema guarda una franja de 12:15:30 a 14:45:10.

---

**RN-023** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · SP3 · Auditoría A-09, A-14 · Reauditoría RQ-A08 ⚠️ Q11

Patrón EARS: Unwanted

Si la suma de los invitados registrados y de las personas de la unidad declaradas en la reserva supera el aforo configurado del área, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_EXCEEDS_CAPACITY` (`422`, RN-102)

✅ **Ejemplo:** Ana reserva el salón (aforo 40) con 38 invitados y declara 2 personas de A-502 (ella como anfitriona y un acompañante): 40 personas. El sistema la confirma. Con 39 invitados (41 personas), la rechaza.

❌ **Contraejemplo:** El sistema solo cuenta a los invitados y confirma 40 invitados más las 2 personas de la unidad.

---

**RN-123** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría A-09 · Reauditoría RQ-A08

Patrón EARS: Unwanted

Si una reserva declara menos de 1 persona de la unidad, entonces el sistema DEBE rechazarla.

Código de error: `RESERVATION_HOST_REQUIRED` (`422`, RN-102)

✅ **Ejemplo:** Ana declara 1 persona (ella misma, la anfitriona) y la reserva sigue su curso.

❌ **Contraejemplo:** Una reserva se guarda con 0 personas de la unidad y solo invitados.

---

**RN-024** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Auditoría A-08, A-14 ⚠️ Q11

Patrón EARS: Unwanted

Si la franja semiabierta solicitada se superpone con la de una reserva `Confirmed` de la misma área, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_OVERLAP`

✅ **Ejemplo:** Existe una reserva confirmada del salón de 18:00 a 22:00 el 2026-12-12. Jorge Paredes (`Owner` de A-704) pide el salón de 21:00 a 23:00 ese mismo día y el sistema la rechaza. Luego pide de 22:00 a 23:00 y el sistema la confirma.

❌ **Contraejemplo:** El sistema confirma ambas reservas y el Concierge ve dos grupos con acceso al salón de 21:00 a 22:00.

---

**RN-025** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · ADR-0001 · Auditoría M-04

Patrón EARS: State-driven

Mientras un usuario tenga un vínculo activo con una unidad, el sistema DEBE permitirle crear reservas a nombre de esa unidad, salvo lo que establece RN-077.

✅ **Ejemplo:** Carla Díaz, `Tenant` activa de A-301, reserva la parrilla para el 2026-12-20 a nombre de A-301.

❌ **Contraejemplo:** Carla no puede reservar porque su vínculo es `Tenant`.

---

**RN-075** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Auditoría M-04, A-14

Patrón EARS: Unwanted

Si un usuario con rol Resident o NonResidentOwner solicita una reserva a nombre de una unidad con la que no tiene un vínculo activo, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_UNIT_NOT_LINKED` (`403`, RN-118)

✅ **Ejemplo:** Carla (`Tenant` de A-301) intenta reservar la parrilla a nombre de A-302. El sistema la rechaza.

❌ **Contraejemplo:** Carla reserva a nombre de A-302, con la que no tiene vínculo.

---

**RN-076** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Auditoría M-10 · Reauditoría RQ-A08

Patrón EARS: Ubiquitous

El sistema DEBE permitir al Administrator crear una reserva a nombre de cualquier unidad del condominio, con una persona con vínculo activo en esa unidad como anfitriona, aplicando todas las reglas del área (RN-021 a RN-024, RN-078 a RN-082, RN-119, RN-120) excepto RN-077.

✅ **Ejemplo:** Rosa Huamán (A-1104) llama a la administración. El Administrator reserva la parrilla a nombre de A-1104 con Rosa como anfitriona para el 2026-12-19. La reserva cuenta para el límite mensual de A-1104 (RN-080). También puede reservar a nombre de B-1203 aunque esté alquilada.

❌ **Contraejemplo:** El Administrator reserva sin anfitrión, o se salta el aforo o el límite mensual porque "reserva la administración".

---

**RN-077** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-10, A-14

Patrón EARS: Unwanted

Si un propietario solicita una reserva a nombre de una unidad que tiene un vínculo `Tenant` activo, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_UNIT_RENTED` (`403`, RN-118)

✅ **Ejemplo:** Luis Rojas (NonResidentOwner) es propietario de B-1203, que está alquilada a Pedro Salas. Luis intenta reservar el salón a nombre de B-1203 y el sistema lo rechaza. Pedro sí puede reservar.

❌ **Contraejemplo:** Luis y Pedro tienen reservas a nombre de B-1203 el mismo mes y consumen juntos el límite mensual de la unidad.

---

**RN-078** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría A-08, A-14

Patrón EARS: Unwanted

Si la franja solicitada empieza antes del momento actual, entonces el sistema DEBE rechazar la reserva.

Código de error: `RESERVATION_IN_THE_PAST`

✅ **Ejemplo:** El 2026-12-10T10:00:00-05:00 Ana pide la parrilla desde 2026-12-10T09:00:00-05:00. El sistema la rechaza.

❌ **Contraejemplo:** El sistema confirma una reserva para una franja que ya empezó o ya pasó.

---

**RN-079** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría A-08, A-14 · Validación de prototipos VL-P012 obs. 1 (2026-11-08) ⚠️ Q11

Patrón EARS: Unwanted

Si el instante de inicio de la franja solicitada es posterior al instante de la solicitud más la anticipación máxima configurada del área, en segundos, entonces el sistema DEBE rechazar la reserva. La comparación es por instante (fecha y hora), no por fecha: el último inicio permitido es exactamente `ahora + anticipación`.

Código de error: `RESERVATION_TOO_FAR_AHEAD`. El mensaje indica la fecha y la hora del último inicio permitido.

✅ **Ejemplo:** El 2026-12-01 Ana pide el salón (anticipación máxima de 90 días) para el 2027-03-15 y el sistema la rechaza. Para el 2027-02-20, la confirma. El 2026-11-04 a las 10:30 pide el salón para el 2027-02-02 desde las 10:30 y lo confirma; desde las 19:00 de ese día, lo rechaza con "Solo puedes reservar hasta el 02/02/2027 a las 10:30.".

❌ **Contraejemplo:** Una unidad reserva el salón para todos los sábados de 2027.

---

**RN-080** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría A-08, A-14 · Revisión QA de HU QA-03 ⚠️ Q11

Patrón EARS: Unwanted

Si una unidad ya tiene en el mes calendario de la franja solicitada el máximo de reservas configurado del área, entonces el sistema DEBE rechazar la reserva. Solo cuentan las reservas `Confirmed`, incluidas las que ya se tratan como `Completed` (RN-085); las reservas `Cancelled` no cuentan.

Código de error: `RESERVATION_MONTHLY_LIMIT_REACHED`

✅ **Ejemplo:** A-502 ya tiene 2 reservas confirmadas del salón en diciembre de 2026. Ana pide una tercera para el 2026-12-26 y el sistema la rechaza. Si Ana cancela una de las dos, la reserva del 2026-12-26 se confirma.

❌ **Contraejemplo:** A-502 reserva el salón todos los fines de semana de diciembre.

---

**RN-081** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría A-08, A-14

Patrón EARS: Unwanted

Si dos reservas cuyas franjas se superponen se envían al mismo tiempo, entonces el sistema DEBE confirmar solo la primera que se guarda y rechazar la otra.

Código de error: `RESERVATION_OVERLAP`

✅ **Ejemplo:** Ana y Jorge envían el salón de 19:00 a 23:00 del 2026-12-12 con 200 ms de diferencia. La reserva de Ana se guarda primero y queda `Confirmed`. La de Jorge se rechaza.

❌ **Contraejemplo:** Las dos solicitudes pasan la validación de superposición y ambas quedan `Confirmed`.

---

**RN-163** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Constitución PRINCIPIO-011 (3G o 4G lenta) · Revisión QA de HU QA-01 · Validación de prototipos VL-P012 obs. 2 (2026-11-08) · Auditoría Spec Finalizer 2026-11-08 · 10-validation-log fila 58 · Q48 · ADR-0014

Patrón EARS: Event-driven

Cuando un cliente reenvía una solicitud de reserva con la misma clave de idempotencia (`Idempotency-Key`) dentro de las 24 h (86,400 s) siguientes al primer envío que creó una reserva, el sistema DEBE responder con esa reserva, y NO DEBE crear otra reserva ni volver a evaluar las reglas del área. Si la misma clave llega con un área, una unidad o una franja distintas, el sistema DEBE rechazar la solicitud.

Solo una respuesta exitosa (`2xx`) asocia la clave a una reserva. Una respuesta `4xx` (p. ej. `422` por una regla del área, `403`) no consume la clave: el usuario corrige el formulario y lo reenvía con la misma clave, y el sistema evalúa la solicitud corregida como nueva.

**Alcance (ampliado el 2026-11-08, Q48 y ADR-0014).** La misma regla aplica, con las mismas 24 h y la misma condición del `2xx`, a `POST /api/reservations/{id}/guests` (la huella es la reserva + el nombre del invitado) y a `POST /api/expenses` (la huella es la descripción + el monto + la fecha del gasto + el SHA-256 del comprobante). Un reenvío con la misma clave y la misma huella devuelve el invitado o el gasto ya creado; la misma clave con otra huella se rechaza.

Código de error (misma clave con otros datos): `IDEMPOTENCY_KEY_REUSED` (`422`, RN-102)

✅ **Ejemplo (gasto):** El Administrator registra "Limpieza de cisterna – S/ 1,200.00" con la clave `9b3d…`; la respuesta se pierde y el navegador reenvía. El sistema devuelve el mismo gasto y el mes tiene un solo registro de S/ 1,200.00.

✅ **Ejemplo:** A las 10:00:00 Ana envía el salón de 19:00 a 23:00 del 2026-12-12 con la clave `5f1c…`. La red 3G se corta antes de que llegue la respuesta. A las 10:00:20 la app reenvía la misma solicitud con la misma clave y recibe la misma reserva `Confirmed`. A-502 tiene una sola reserva ese día y consumió 1 de su cupo mensual.

✅ **Ejemplo (corrección tras un error):** Ana envía el salón de 20:00 a 19:00 con la clave `7a2e…` y recibe `422` `RESERVATION_INVALID_TIME_SLOT`. Corrige a 19:00–23:00, reenvía con la misma clave y la reserva queda `Confirmed`.

❌ **Contraejemplo:** El reenvío recibe `RESERVATION_OVERLAP` contra la propia reserva de Ana y ella cree que no reservó, o se crean dos reservas y A-502 consume 2 de su cupo. O Ana corrige el formulario tras un `422` y recibe `IDEMPOTENCY_KEY_REUSED`, sin poder reservar desde esa página.

---

**RN-082** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-22, A-14 ⚠️ Q11

Patrón EARS: Unwanted

Si el Administrator configura un horario cuya hora de cierre no es posterior a la hora de apertura dentro del mismo día, entonces el sistema DEBE rechazar la configuración.

Código de error: `COMMON_AREA_INVALID_OPENING_HOURS`

✅ **Ejemplo:** El Administrator configura la parrilla de 11:00 a 22:00 y el sistema la acepta. Luego intenta configurar un horario de 20:00 a 02:00 y el sistema lo rechaza.

❌ **Contraejemplo:** El área queda con horario de 20:00 a 02:00 y una reserva de 23:00 a 01:00 no aparece en ningún día de portería.

---

**RN-159** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Constitución PRINCIPIO-006 · Historias de usuario HU-004 · Aprobada por el autor (2026-11-04)

Patrón EARS: Unwanted

Si un usuario sin rol Administrator intenta crear o modificar la configuración de un área común, entonces el sistema DEBE rechazar la operación.

Código de error: `COMMON_AREA_CONFIG_FORBIDDEN` (`403`, RN-118)

✅ **Ejemplo:** El Administrator cambia el aforo de la parrilla de 15 a 12 y el sistema lo acepta. Ana (Resident) intenta lo mismo y recibe `403`.

❌ **Contraejemplo:** Marco Salazar (BoardMember) amplía el horario del salón hasta las 23:59 desde su cuenta.

---

**RN-160** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · SP3 · Historias de usuario HU-004 ⚠️ Q11 · Aprobada por el autor (2026-11-04)

Patrón EARS: Unwanted

Si el Administrator configura un área común con una duración máxima, un aforo, una anticipación máxima o un máximo de reservas por unidad al mes que no es un entero mayor que 0, o con una duración máxima o una anticipación máxima que no es múltiplo de 60 s, entonces el sistema DEBE rechazar la configuración.

Código de error: `COMMON_AREA_INVALID_LIMITS` (`422`, RN-102)

✅ **Ejemplo:** El Administrator configura la parrilla con aforo 15 y duración máxima de 14,400 s, y el sistema la acepta. Rechaza aforo 0, una duración máxima de 14,430 s y un máximo de −1 reservas al mes.

❌ **Contraejemplo:** El área queda con aforo 0 y toda reserva se rechaza con `RESERVATION_EXCEEDS_CAPACITY` sin que nadie sepa por qué.

---

**RN-162** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Historias de usuario HU-004 ⚠️ Q11 · Aprobada por el autor (2026-11-04)

Patrón EARS: Event-driven

Cuando el Administrator modifica la configuración de un área común, el sistema DEBE aplicar la configuración nueva solo a las reservas que se creen desde ese momento, y NO DEBE cambiar ni cancelar las reservas `Confirmed` existentes.

✅ **Ejemplo:** Ana tiene el salón confirmado el 2026-12-12 de 19:00 a 23:00 con 38 invitados. El 2026-12-05 el Administrator baja el aforo a 30 y el cierre a las 22:00. La reserva de Ana sigue `Confirmed` con sus 38 invitados hasta las 23:00. Una reserva nueva para el 2026-12-19 con 31 personas se rechaza.

❌ **Contraejemplo:** La reserva de Ana pasa a `Cancelled` o pierde 8 invitados sin aviso porque cambió la configuración. Si la administración necesita anular una reserva existente, la cancela de forma explícita (RN-084, RN-088).

---

**RN-026** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Auditoría M-06, M-10

Patrón EARS: Event-driven

Cuando se cancela una reserva confirmada, el sistema DEBE retirarla de la vista de portería en 60 s o menos.

✅ **Ejemplo:** El 2026-12-12T15:00:00-05:00 el Administrator cancela la reserva del salón de las 19:00. A las 15:01 el Concierge ya no la ve.

❌ **Contraejemplo:** A las 19:00 el Concierge deja pasar a los invitados de la reserva cancelada porque sigue en su lista.

---

**RN-083** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-10, A-14 · Revisión QA de HU QA-02

Patrón EARS: Unwanted

Si un residente intenta cancelar su propia reserva desde el instante de inicio de la franja en adelante, entonces el sistema DEBE rechazar la cancelación. Como las franjas son semiabiertas `[inicio, fin)`, la franja ya empezó en su instante de inicio.

Código de error: `RESERVATION_CANCELLATION_TOO_LATE` (`422`, RN-102)

✅ **Ejemplo:** La reserva de Ana empieza el 2026-12-12T19:00:00-05:00. Ana la cancela a las 18:59:00 y el sistema lo acepta. Si lo intenta a las 19:00:00 o a las 19:30, el sistema lo rechaza.

❌ **Contraejemplo:** Ana tiene que escribir por WhatsApp a la administración para cancelar su reserva.

---

**RN-161** | Categoría: Reservas | Prioridad: MUST | Fuente: Alcance M3 · Historias de usuario HU-008 · Aprobada por el autor (2026-11-04)

Patrón EARS: Unwanted

Si el Administrator intenta cancelar una reserva desde el instante de inicio de su franja en adelante, entonces el sistema DEBE rechazar la cancelación (mismo criterio de inicio que RN-083).

Código de error: `RESERVATION_CANCELLATION_TOO_LATE` (`422`, RN-102), el mismo de RN-083.

✅ **Ejemplo:** La reserva de Ana empieza el 2026-12-12T19:00:00-05:00. El Administrator la cancela a las 18:59 y el sistema lo acepta. A las 19:00:00 o a las 19:10 el sistema lo rechaza: el evento ya empezó y el Concierge puede estar marcando ingresos.

❌ **Contraejemplo:** El Administrator cancela la reserva a las 20:00, los invitados que ya entraron quedan con marcas de ingreso de una reserva `Cancelled` y el aviso de RN-088 le llega a Ana después del evento.

⚠️ Si se prefiere que la administración pueda cortar un evento en curso (por ejemplo, por ruidos molestos), esta regla se reemplaza por una que lo permita hasta el fin de la franja con un motivo obligatorio.

---

**RN-084** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-07

Patrón EARS: Event-driven

Cuando se cancela una reserva `Confirmed`, el sistema DEBE cambiarla al estado `Cancelled` y registrar quién la canceló y la fecha-hora de la cancelación en ISO 8601.

✅ **Ejemplo:** Se guarda `{ status: "Cancelled", cancelledBy: "a71f…", cancelledAt: "2026-12-12T15:00:00-05:00" }`.

❌ **Contraejemplo:** La reserva cancelada se borra de la base de datos.

---

**RN-168** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-07 · Revisión QA de HU QA-12

Patrón EARS: Unwanted

Si alguien intenta cancelar una reserva que ya está `Cancelled`, entonces el sistema DEBE rechazar la cancelación y conservar el `cancelledBy` y el `cancelledAt` de la primera cancelación.

Código de error: `RESERVATION_ALREADY_CANCELLED` (`422`, RN-102)

✅ **Ejemplo:** El Administrator canceló la reserva de Ana a las 15:00. A las 15:05 Ana intenta cancelarla y el sistema lo rechaza. La reserva sigue con `cancelledBy` = Administrator y `cancelledAt = 2026-12-12T15:00:00-05:00`.

❌ **Contraejemplo:** El segundo intento responde `200` y cambia `cancelledBy` a Ana, de modo que RN-088 ya no le avisa que la canceló la administración.

---

**RN-085** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-07 · Segunda reauditoría R2-A06

Patrón EARS: State-driven

Mientras la franja de una reserva `Confirmed` ya haya terminado, el sistema DEBE tratarla como `Completed`, calculando ese estado al consultar la reserva, sin un job que lo guarde.

✅ **Ejemplo:** La reserva del salón de 19:00 a 23:00 del 2026-12-12 se muestra como `Completed` en cualquier consulta desde las 2026-12-12T23:00:00-05:00, sin que ningún proceso la haya actualizado.

❌ **Contraejemplo:** La reserva sigue en `Confirmed` en 2027 y no se sabe si se usó, o se crea un job nuevo fuera de la lista cerrada de RN-104 para guardar el estado `Completed`.

---

**RN-086** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría M-10, A-14 · Revisión QA de HU QA-02

Patrón EARS: Unwanted

Si un usuario intenta agregar o quitar invitados de una reserva desde el instante de inicio de la franja en adelante, entonces el sistema DEBE rechazar el cambio (mismo criterio de inicio que RN-083).

Código de error: `RESERVATION_GUEST_EDIT_TOO_LATE` (`422`, RN-102)

✅ **Ejemplo:** Ana agrega a Pedro Ramos a su reserva de las 19:00 a las 18:50 y el sistema lo acepta, respetando el aforo (RN-023). A las 19:00:00 o a las 19:10 intenta agregar a otro invitado y el sistema lo rechaza.

❌ **Contraejemplo:** El Concierge recibe invitados nuevos en su lista cuando el evento ya empezó.

---

**RN-087** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.1 · Auditoría C-02 ⚠️ Q18, Q21

Patrón EARS: Event-driven

Cuando un usuario registra a los invitados de una reserva, el sistema DEBE mostrarle el aviso de privacidad sobre el tratamiento de los datos de esos invitados, y DEBE rechazar el registro de invitados si el usuario no aceptó ese aviso.

Código de error: `GUEST_PRIVACY_NOTICE_REQUIRED` (`422`, RN-102)

✅ **Ejemplo:** Ana abre la lista de invitados de su reserva y ve el aviso de privacidad antes de guardar a Pedro Ramos.

❌ **Contraejemplo:** Los datos de los invitados se guardan sin ningún aviso sobre su tratamiento.

---

**RN-088** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Auditoría M-11

Patrón EARS: Event-driven

Cuando un residente inicia sesión, el sistema DEBE mostrarle un aviso de cada reserva suya que el Administrator canceló desde su último inicio de sesión.

✅ **Ejemplo:** El Administrator cancela la reserva de Ana del 2026-12-12 a las 15:00. Ana inicia sesión a las 16:00 y ve el aviso de la cancelación.

❌ **Contraejemplo:** Ana se entera de la cancelación cuando llega al salón con sus invitados.

---

**RN-027** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 ⚠️ Q21

Patrón EARS: Ubiquitous

El sistema DEBE cifrar con AES-256-GCM cada dato personal de un invitado antes de guardarlo.

✅ **Ejemplo:** El invitado "Pedro Ramos" se guarda en la columna `GuestFullName` como texto cifrado (`AQIDBAUGBwg…`) con una clave de Azure Key Vault.

❌ **Contraejemplo:** La columna `GuestFullName` contiene `Pedro Ramos` en texto plano.

---

**RN-028** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Auditoría M-04, M-08 ⚠️ Q21

Patrón EARS: Event-driven

Cuando se cumplen 90 días (7,776,000 s) desde el fin de la franja de una reserva `Completed`, o desde la cancelación de una reserva `Cancelled`, `DataRetentionJob` DEBE copiar los datos de sus invitados al archivo frío.

✅ **Ejemplo:** La reserva del salón de 19:00 a 23:00 del 2026-12-12 tiene 25 invitados. Su plazo vence el 2027-03-12T23:00:00-05:00, y la ejecución diaria siguiente copia los 25 invitados al contenedor Archive.

❌ **Contraejemplo:** El plazo se cuenta desde el día en que se creó la reserva, o los invitados de una reserva cancelada nunca se archivan.

---

**RN-089** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Auditoría M-04

Patrón EARS: Event-driven

Cuando `DataRetentionJob` termina de copiar los datos de los invitados de una reserva al archivo frío, `DataRetentionJob` DEBE eliminar esos datos de SQL Server.

✅ **Ejemplo:** Después de copiar los 25 invitados de la reserva del 2026-12-12, el job los elimina de la base operativa. El 2027-06-01 ya no están en SQL Server.

❌ **Contraejemplo:** Los 25 invitados quedan a la vez en el archivo frío y en la base operativa.

---

**RN-171** | Categoría: Reservas | Prioridad: MUST | Fuente: Validación de prototipos 2026-11-08 (códigos pedidos por el autor)

Patrón EARS: Unwanted

Si el Administrator crea o renombra un área común con un nombre que ya usa otra área del condominio, sin distinguir mayúsculas, tildes ni espacios al inicio y al final, entonces el sistema DEBE rechazar el cambio.

Código de error: `COMMON_AREA_NAME_DUPLICATE` (`422`, RN-102)

✅ **Ejemplo:** El condominio tiene "Salón de fiestas" y "Parrilla". El Administrator crea "Piscina" y el sistema la acepta; si crea "parrilla", la rechaza.

❌ **Contraejemplo:** Hay dos áreas "Parrilla" y los residentes no saben cuál reservar ni a cuál se aplica el cupo mensual.

---

**RN-178** | Categoría: Reservas | Prioridad: MUST | Fuente: Auditoría Spec Finalizer 2026-11-08 · 10-validation-log fila 37 · complementa RN-076 y RN-077 ⚠️ Q63

Patrón EARS: Unwanted

Si el Administrator crea una reserva a nombre de una unidad (RN-076) sin elegir un anfitrión, o con un anfitrión que no tiene un vínculo activo con esa unidad, entonces el sistema DEBE rechazar la reserva. Mientras la unidad tenga un vínculo `Tenant` activo, el anfitrión DEBE ser una persona con un vínculo `Tenant` activo en esa unidad; si no lo es, el sistema DEBE rechazar la reserva con el mismo código que RN-077. (Valor por defecto elegido en la auditoría del Spec Finalizer; el autor puede cambiarlo en Q63.)

Código de error: `RESERVATION_HOST_NOT_SELECTED` y `RESERVATION_HOST_NOT_LINKED` (`422`, RN-102); `RESERVATION_UNIT_RENTED` (`403`, RN-118) si la unidad está alquilada y el anfitrión no es inquilino

✅ **Ejemplo:** El Administrator reserva la parrilla a nombre de A-1104 con Rosa Huamán como anfitriona y el sistema la confirma. Si no elige anfitrión, recibe `RESERVATION_HOST_NOT_SELECTED`; si elige a Ana Quispe (sin vínculo con A-1104), `RESERVATION_HOST_NOT_LINKED`. A nombre de B-1203, alquilada, la confirma con Pedro Salas como anfitrión y la rechaza con Luis Rojas.

❌ **Contraejemplo:** El Administrator reserva a nombre de B-1203 con Luis Rojas como anfitrión, y Luis consigue por la administración la reserva que RN-077 le impide hacer.

---

## 4. Vista de portería (M4)

---

**RN-029** | Categoría: Portería | Prioridad: MUST | Fuente: Alcance M4

Patrón EARS: State-driven

Mientras un usuario tenga rol Concierge, el sistema DEBE mostrarle solo las reservas confirmadas de la fecha actual en la zona horaria `America/Lima` (UTC−05:00).

✅ **Ejemplo:** El 2026-12-12T08:00:00-05:00 el Concierge ve la reserva del salón de las 19:00 del 2026-12-12.

❌ **Contraejemplo:** El Concierge también ve la reserva de la parrilla del 2026-12-13, o la reserva cancelada del 2026-12-12.

---

**RN-030** | Categoría: Portería | Prioridad: MUST | Fuente: Alcance M4 · Brief K4

Patrón EARS: Event-driven

Cuando el Concierge marca el ingreso de un invitado, el sistema DEBE registrar la fecha-hora del ingreso en ISO 8601.

✅ **Ejemplo:** El Concierge marca a Pedro Ramos y se guarda `CheckedInAt = 2026-12-12T19:07:42-05:00`.

❌ **Contraejemplo:** Se guarda solo `CheckedIn = true`, o el Concierge anota la hora en un cuaderno.

---

**RN-164** | Categoría: Portería | Prioridad: MUST | Fuente: Alcance M4 · Brief K4 · Revisión QA de HU QA-04

Patrón EARS: Unwanted

Si el Concierge marca el ingreso de un invitado que ya tiene una marca de ingreso, o de un invitado de una reserva que no está `Confirmed` en la fecha actual de `America/Lima`, entonces el sistema DEBE rechazar la marca y conservar la marca anterior, si existe.

Códigos de error: `GUEST_ALREADY_CHECKED_IN` (invitado ya marcado) y `GUEST_CHECK_IN_NOT_ALLOWED` (reserva cancelada o de otro día), ambos `422` (RN-102)

✅ **Ejemplo:** El Concierge marca a Pedro Ramos a las 19:07:42. A las 19:20 lo vuelve a marcar y el sistema lo rechaza; Pedro conserva `CheckedInAt = 2026-12-12T19:07:42-05:00`. Un invitado de una reserva cancelada a las 15:00 no se puede marcar.

❌ **Contraejemplo:** La segunda marca sobrescribe la hora de ingreso real, o un invitado de una reserva `Cancelled` queda con marca de ingreso.

---

**RN-031** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Alcance M4 · Auditoría M-17

Patrón EARS: Unwanted

Si un usuario con rol Concierge solicita información financiera, entonces el sistema DEBE responder `403`.

✅ **Ejemplo:** El Concierge abre `/expenses` desde la PC de portería y recibe `403`.

❌ **Contraejemplo:** El Concierge ve el total de gastos de noviembre: S/ 19,300.00.

---

**RN-158** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Alcance M4 · Historias de usuario HU-009 · Aprobada por el autor (2026-11-04)

Patrón EARS: Unwanted

Si un usuario con rol Concierge solicita el DNI, el carné de extranjería, el teléfono o el correo de una persona del padrón, entonces el sistema DEBE responder `403`.

Código de error: `PERSONAL_DATA_FORBIDDEN` (`403`, RN-118)

✅ **Ejemplo:** El Concierge ve en la vista de portería "A-502 – Salón de fiestas – 19:00 a 23:00" con la lista de invitados. Si pide `/persons/{id}` de Ana, recibe `403`.

❌ **Contraejemplo:** El Concierge abre la ficha de Ana desde la PC de portería y ve su teléfono para llamarla.

---

## 5. Registro de gastos de la cuota (M5)

---

**RN-032** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5

Patrón EARS: Ubiquitous

El sistema DEBE permitir registrar gastos solo a usuarios con rol Administrator.

✅ **Ejemplo:** El Administrator registra "Limpieza de cisterna – S/ 1,200.00 – 2026-11-08 – Proveedor: Hidroclean SAC".

❌ **Contraejemplo:** Marco Salazar (BoardMember) registra un gasto de S/ 500.00 desde su cuenta.

---

**RN-033** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Auditoría A-14 ⚠️ Q28

Patrón EARS: Unwanted

Si un gasto se envía sin comprobante adjunto, entonces el sistema DEBE rechazar el registro.

Código de error: `EXPENSE_RECEIPT_REQUIRED`

✅ **Ejemplo:** El gasto "Limpieza de cisterna – S/ 1,200.00" se envía con `factura-F001-0458.pdf` y se registra.

❌ **Contraejemplo:** El gasto se registra sin adjunto, con la nota "comprobante pendiente".

---

**RN-034** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Auditoría A-14

Patrón EARS: Unwanted

Si el monto de un gasto es menor o igual a S/ 0.00, entonces el sistema DEBE rechazar el registro.

Código de error: `EXPENSE_AMOUNT_NOT_POSITIVE`

✅ **Ejemplo:** El sistema acepta S/ 0.50 y rechaza S/ 0.00.

❌ **Contraejemplo:** Se registra un gasto de S/ -350.00 "para corregir un error".

---

**RN-035** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Beneficio 2 · Segunda reauditoría R2-A10 · Revisión QA de HU QA-09 ⚠️ Q27

Patrón EARS: Event-driven

Cuando un usuario que cumple la política `CanViewCondominiumFinancials` consulta los gastos de un mes, el sistema DEBE mostrar el total de ese mes por categoría, calculado según RN-142 (sin gastos anulados) y RN-143 (mes de la fecha del gasto). Si el mes no tiene gastos, el sistema DEBE mostrar el mensaje "No hay gastos registrados para este mes." y ningún total.

**Categorías provisionales (2026-11-08, Spec Finalizer).** Mientras Q27 siga abierta, la lista cerrada de categorías es un enum con tres valores, tomados del seeder: `Maintenance` "Mantenimiento", `Cleaning` "Limpieza" y `Security` "Seguridad". Si Q27 cambia la lista, se cambia el enum y esta regla. Un mes futuro se trata como un mes sin gastos: muestra el mismo mensaje y ningún total (10-validation-log fila 49).

✅ **Ejemplo:** Para 2026-11, Ana ve: Mantenimiento S/ 6,300.00; Limpieza S/ 3,200.00; Seguridad S/ 9,800.00. Para 2027-01, sin gastos (o porque todavía no llegó), ve "No hay gastos registrados para este mes.".

❌ **Contraejemplo:** Ana ve solo una lista de 47 comprobantes sin totales, y tiene que sumarlos ella misma.

---

**RN-142** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Beneficio 2 · Segunda reauditoría R2-A10

Patrón EARS: Ubiquitous

El sistema NO DEBE sumar los gastos anulados en los totales mensuales. Los gastos anulados siguen visibles en la lista del mes y en el detalle del gasto (P-031) con su motivo y su fecha-hora (RN-092).

✅ **Ejemplo:** En 2026-11, "Limpieza de cisterna – S/ 1,200.00" se anula y se registra de nuevo por S/ 1,000.00 (RN-092). El total de Limpieza de 2026-11 suma S/ 1,000.00 por ese gasto, y el detalle muestra también el gasto anulado con su motivo.

❌ **Contraejemplo:** El total de Limpieza suma S/ 2,200.00 por la cisterna, o el gasto anulado desaparece del detalle.

---

**RN-143** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Segunda reauditoría R2-A10

Patrón EARS: Ubiquitous

El sistema DEBE contar cada gasto en el total del mes de su fecha de gasto, no en el del mes de su fecha de registro.

✅ **Ejemplo:** El 2026-12-03 el Administrator registra "Reparación de bomba de agua – S/ 850.00" con fecha 2026-11-28. El gasto suma en el total de 2026-11, no en el de 2026-12.

❌ **Contraejemplo:** El gasto del 2026-11-28 aparece en el total de 2026-12 porque se registró en diciembre.

---

**RN-144** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Segunda reauditoría R2-A10

Patrón EARS: Event-driven

Cuando un usuario que cumple la política `CanViewCondominiumFinancials` consulta el detalle de los gastos, el sistema DEBE mostrar en cada gasto su fecha de registro además de la fecha del gasto.

✅ **Ejemplo:** Ana ve "Reparación de bomba de agua – S/ 850.00 – fecha del gasto 2026-11-28 – registrado el 2026-12-03".

❌ **Contraejemplo:** Ana solo ve la fecha 2026-11-28 y no puede saber que el gasto se agregó después de que ella revisó el total de noviembre.

---

**RN-090** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M5 · Auditoría C-03

Patrón EARS: Event-driven

Cuando un usuario que cumple la política `CanViewCondominiumFinancials` consulta los gastos, el sistema DEBE mostrar cada gasto con su monto, fecha, categoría, proveedor y comprobante.

✅ **Ejemplo:** Luis Rojas ve "Limpieza de cisterna – S/ 1,200.00 – 2026-11-08 – Limpieza – Hidroclean SAC" y abre `factura-F001-0458.pdf`.

❌ **Contraejemplo:** Luis solo ve el total del mes, sin los gastos individuales ni sus comprobantes.

---

**RN-036** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance §5 · Constitución PRINCIPIO-006 · Auditoría M-06, M-20

Patrón EARS: Ubiquitous

El sistema NO DEBE mostrar datos de unidades específicas (número de unidad, nombre de una persona, y la deuda o los pagos de una unidad) en las vistas financieras de los roles Resident y NonResidentOwner.

✅ **Ejemplo:** Ana ve "Mantenimiento de ascensores – S/ 4,800.00 – 2026-11-05 – Ascensores Andinos SAC".

❌ **Contraejemplo:** El gasto dice "Reparación de tubería en Dpto. B-1203" o muestra el nombre de un residente.

⚠️ La descripción de un gasto es texto libre. Falta decidir si esta regla se cumple con una validación, una guía para el Administrator o una revisión antes de publicar (06 M-20).

---

**RN-091** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría A-07, A-14

Patrón EARS: Unwanted

Si alguien intenta editar o borrar un gasto registrado, entonces el sistema DEBE rechazar la operación.

Código de error: `EXPENSE_IMMUTABLE`

✅ **Ejemplo:** El Administrator intenta cambiar el monto de "Limpieza de cisterna" de S/ 1,200.00 a S/ 1,000.00. El sistema lo rechaza; para corregirlo, anula el gasto (RN-092) y registra uno nuevo.

❌ **Contraejemplo:** El Administrator borra un gasto incómodo y desaparece del historial.

---

**RN-092** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría A-07, A-14 · Revisión QA de HU QA-06

Patrón EARS: Event-driven

Cuando el Administrator anula un gasto, el sistema DEBE exigir un motivo que no quede vacío después de quitar los espacios al inicio y al final, y mostrar a quien cumple la política `CanViewCondominiumFinancials` el gasto anulado con su motivo y la fecha-hora de la anulación en ISO 8601.

Código de error (anulación sin motivo): `EXPENSE_VOID_REASON_REQUIRED`

✅ **Ejemplo:** El Administrator anula "Limpieza de cisterna – S/ 1,200.00" el 2026-11-21T09:00:00-05:00 con el motivo "Monto mal digitado; se registra de nuevo por S/ 1,000.00". Ana ve el gasto anulado, el motivo y la fecha-hora.

❌ **Contraejemplo:** El gasto anulado desaparece de la vista de los propietarios, o se anula sin motivo o con un motivo de solo espacios.

---

**RN-167** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría A-07 · Revisión QA de HU QA-12

Patrón EARS: Unwanted

Si el Administrator intenta anular un gasto que ya está anulado, entonces el sistema DEBE rechazar la anulación y conservar el motivo y la fecha-hora de la primera anulación.

Código de error: `EXPENSE_ALREADY_VOIDED` (`422`, RN-102)

✅ **Ejemplo:** "Limpieza de cisterna" se anuló el 2026-11-21T09:00:00-05:00. El 2026-11-23 el Administrator intenta anularlo otra vez con otro motivo y el sistema lo rechaza; el gasto conserva el motivo y la fecha-hora originales.

❌ **Contraejemplo:** La segunda anulación reemplaza el motivo original y los propietarios ya no ven por qué se anuló el gasto.

---

**RN-093** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría M-19, A-14 · Revisión QA de HU QA-07

Patrón EARS: Unwanted

Si el monto de un gasto o de una cotización tiene más de 2 decimales, entonces el sistema DEBE rechazar el registro. El sistema DEBE guardar los montos aceptados con exactamente 2 decimales.

Código de error: `AMOUNT_INVALID_PRECISION`

✅ **Ejemplo:** El sistema acepta `1200`, `1200.5` y `1200.50`, y los guarda como S/ 1,200.00, S/ 1,200.50 y S/ 1,200.50. Rechaza `1200.505`.

❌ **Contraejemplo:** El sistema redondea S/ 1,200.505 a S/ 1,200.51 sin avisar, o rechaza `1200.5` porque llegó como número JSON sin el cero final.

---

**RN-094** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría M-19, A-14

Patrón EARS: Unwanted

Si la fecha de un gasto es posterior a la fecha de registro o anterior a 12 meses desde la fecha de registro, entonces el sistema DEBE rechazar el registro.

Código de error: `EXPENSE_DATE_OUT_OF_RANGE`

✅ **Ejemplo:** El 2026-11-20 el Administrator registra un gasto del 2026-11-08 y el sistema lo acepta. Rechaza uno del 2026-11-25 (futuro) y uno del 2025-11-10 (más de 12 meses).

❌ **Contraejemplo:** Se registra un gasto con fecha 2027-01-15 "para reservar el presupuesto".

---

**RN-095** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría A-06, A-14 ⚠️ Q30

Patrón EARS: Unwanted

Si el Administrator vincula un gasto a una contratación que no está en estado `Approved`, entonces el sistema DEBE rechazar el vínculo.

Código de error: `EXPENSE_HIRE_NOT_APPROVED`

✅ **Ejemplo:** El gasto "Pintura de fachada – adelanto S/ 9,250.00" se vincula a la contratación "Pintura de fachada", aprobada el 2026-11-25.

❌ **Contraejemplo:** Un gasto se vincula a una contratación en `Submitted` que la Junta Directiva todavía no decidió.

---

## 6. Contrataciones con sustento visible (M6)

---

**RN-096** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M6 · Auditoría A-06 · Reauditoría RQ-A09

Patrón EARS: Ubiquitous

El sistema DEBE asignar a cada contratación uno de estos estados: `Draft`, `Submitted` o `Approved`.

✅ **Ejemplo:** "Pintura de fachada" pasa de `Draft` a `Submitted` el 2026-11-20 y a `Approved` el 2026-11-25. Un rechazo no es un estado: es una decisión que devuelve la contratación a `Draft` (RN-098).

❌ **Contraejemplo:** La contratación queda en un estado libre, "en conversación con la Junta", o en un estado `Rejected` del que no puede salir.

---

**RN-097** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría A-06, A-14

Patrón EARS: Unwanted

Si alguien intenta modificar una contratación que no está en estado `Draft`, entonces el sistema DEBE rechazar la modificación.

Código de error: `HIRE_NOT_EDITABLE` (`422`, RN-102)

✅ **Ejemplo:** "Pintura de fachada" está en `Submitted`. El Administrator intenta cambiar una cotización y el sistema lo rechaza. Una contratación `Approved` tampoco se puede modificar.

❌ **Contraejemplo:** El Administrator cambia la cotización ganadora después de que la Junta Directiva aprobó la contratación.

---

**RN-037** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M6 · Brief K5 · Auditoría A-06, A-14 ⚠️ Q23, Q30

Patrón EARS: Unwanted

Si el Administrator envía a aprobación una contratación con cotizaciones de menos de 2 proveedores distintos, entonces el sistema DEBE rechazar el envío.

Código de error: `HIRE_INSUFFICIENT_QUOTES`

✅ **Ejemplo:** La contratación "Pintura de fachada" tiene cotizaciones de Pinturas Lima SAC (S/ 18,500.00) y Color Perú EIRL (S/ 21,000.00). El sistema la envía a la Junta Directiva.

❌ **Contraejemplo:** La contratación llega a la Junta Directiva con una sola cotización, o con dos cotizaciones de Pinturas Lima SAC.

---

**RN-038** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M6 · Auditoría M-06, A-14

Patrón EARS: Unwanted

Si el Administrator envía a aprobación una contratación cuya justificación tiene menos de 20 caracteres, sin contar los espacios al inicio y al final, entonces el sistema DEBE rechazar el envío.

Código de error: `HIRE_JUSTIFICATION_TOO_SHORT`

✅ **Ejemplo:** La justificación dice: "Se elige Pinturas Lima SAC por menor precio (S/ 2,500.00 menos) y 3 años de garantía frente a 1".

❌ **Contraejemplo:** La contratación llega a la Junta Directiva con la justificación vacía o con "Mejor precio" (12 caracteres).

---

**RN-100** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría M-19, A-14

Patrón EARS: Unwanted

Si el monto de una cotización es menor o igual a S/ 0.00, entonces el sistema DEBE rechazar la cotización.

Código de error: `QUOTE_AMOUNT_NOT_POSITIVE`

✅ **Ejemplo:** El sistema acepta la cotización de Color Perú EIRL por S/ 21,000.00 y rechaza una de S/ 0.00.

❌ **Contraejemplo:** Se registra una cotización de S/ 0.00 para cumplir el mínimo de 2 cotizaciones.

---

**RN-039** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M6 · Revisión QA de HU QA-05 ⚠️ Q24

Patrón EARS: Ubiquitous

El sistema DEBE permitir registrar la decisión sobre una contratación en estado `Submitted` solo a usuarios con rol BoardMember (Junta Directiva).

Código de error (decisión sobre una contratación que no está en `Submitted`): `HIRE_NOT_SUBMITTED` (`422`, RN-102). Un usuario sin rol BoardMember recibe `403` (RN-118).

✅ **Ejemplo:** Marco Salazar (BoardMember) aprueba "Pintura de fachada" el 2026-11-25.

❌ **Contraejemplo:** El Administrator que registró la contratación la aprueba él mismo.

---

**RN-040** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M6 · Brief §1 ("quién aprobó") · Auditoría C-03, C-08 · Reauditoría RQ-A09

Patrón EARS: Event-driven

Cuando un BoardMember registra su decisión sobre una contratación, el sistema DEBE agregar al historial de decisiones de esa contratación una entrada con la decisión (`Approved` o `Rejected`), el motivo si es un rechazo, el identificador de ese BoardMember, su cargo y la fecha-hora en ISO 8601, sin borrar las entradas anteriores.

✅ **Ejemplo:** Se guarda `{ decision: "Approved", decidedBy: "b41e…", decidedByRole: "BoardMember", decidedAt: "2026-11-25T21:03:10-05:00" }`.

❌ **Contraejemplo:** La contratación solo cambia a `Approved`, sin registro de quién ni cuándo, o la aprobación reemplaza al rechazo anterior en lugar de agregarse al historial.

---

**RN-098** | Categoría: Transparencia | Prioridad: MUST | Fuente: Auditoría A-06, A-14 · Reauditoría RQ-A09 · Revisión QA de HU QA-06

Patrón EARS: Event-driven

Cuando un BoardMember rechaza una contratación, el sistema DEBE exigir un motivo que no quede vacío después de quitar los espacios al inicio y al final, registrar la decisión `Rejected` con ese motivo (RN-040) y devolver la contratación a `Draft`.

Código de error (rechazo sin motivo): `HIRE_REJECTION_REASON_REQUIRED`

✅ **Ejemplo:** Marco rechaza "Pintura de fachada" con el motivo "Falta la garantía por escrito de Pinturas Lima SAC". La contratación vuelve a `Draft`; el Administrator la corrige y la reenvía.

❌ **Contraejemplo:** La contratación queda rechazada sin motivo y el Administrator tiene que crear una nueva desde cero.


---

**RN-099** | Categoría: Notificaciones | Prioridad: MUST | Fuente: Auditoría M-11

Patrón EARS: Event-driven

Cuando un usuario con rol BoardMember inicia sesión, el sistema DEBE mostrarle el número de contrataciones en estado `Submitted`, también cuando ese número es 0.

✅ **Ejemplo:** Marco inicia sesión el 2026-11-22 y ve "1 contratación por decidir". El 2026-11-26, sin contrataciones pendientes, ve "0 contrataciones por decidir".

❌ **Contraejemplo:** Marco se entera de que hay una contratación pendiente en la asamblea del mes siguiente.

---

**RN-041** | Categoría: Transparencia | Prioridad: MUST | Fuente: Alcance M6 · Beneficio 2 · Auditoría C-03, M-06 · Q25 (resuelta por el autor el 2026-11-08, Auditoría Spec Finalizer 2026-11-08) ⚠️ Q34

Patrón EARS: Ubiquitous

El sistema DEBE mostrar el expediente de contratación (definición #31 del glosario), incluido el historial completo de decisiones (RN-040), a los usuarios que cumplen la política `CanViewCondominiumFinancials`, según el estado de la contratación: el Administrator la ve en cualquier estado; el BoardMember, en `Submitted` y `Approved` (no en `Draft`); y el propietario (NonResidentOwner, o Resident con un vínculo `Owner` activo), **solo en `Approved`**. Cada decisión se identifica por el cargo y no por el nombre de quien decidió.

Una contratación en un estado que el usuario no puede ver DEBE responder `404`, como si no existiera, y no aparecer en las listas. Es una excepción explícita a RN-103: la consulta filtra por estado, así que no es un recurso del condominio sobre el que se evalúe un permiso.

✅ **Ejemplo:** Luis Rojas (NonResidentOwner) abre "Pintura de fachada" y ve las 2 cotizaciones con sus PDF, la justificación, "Rechazada por la Junta Directiva – 2026-11-22 – Falta la garantía por escrito" y "Aprobada por la Junta Directiva – 2026-11-25T21:03:10-05:00".

✅ **Ejemplo (estado no visible):** El 2026-11-22 "Pintura de fachada" está `Submitted`. Marco Salazar (BoardMember) la ve y la decide; Luis Rojas no la ve en la lista y, si abre su enlace, recibe `404`. Desde el 2026-11-25, ya `Approved`, Luis ve el expediente completo.

❌ **Contraejemplo:** Luis ve solo "Pintura de fachada – S/ 18,500.00 – Aprobada", sin las cotizaciones, o ve "Aprobada por Marco Salazar". También es incorrecto que Luis vea una contratación `Submitted` o `Draft`, o que reciba `403` y sepa así que existe.

---

**RN-042** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance W6 · Auditoría M-24

Patrón EARS: Ubiquitous

El sistema NO DEBE crear cuentas de usuario para los proveedores (`Vendor`) registrados en una contratación.

✅ **Ejemplo:** Pinturas Lima SAC existe como registro de proveedor (razón social, RUC 20512345678) sin usuario asociado.

❌ **Contraejemplo:** El sistema envía una invitación con rol Supplier a `ventas@pinturaslima.example.pe`.

---

**RN-169** | Categoría: Contrataciones | Prioridad: MUST | Fuente: Validación de prototipos 2026-11-08 (códigos pedidos por el autor)

Patrón EARS: Unwanted

Si el Administrator registra un proveedor con un RUC que no tiene exactamente 11 dígitos, que no empieza con 10 (persona natural) o con 20 (persona jurídica), o cuyo prefijo no coincide con el tipo de proveedor elegido, entonces el sistema DEBE rechazar el registro. Si el RUC ya pertenece a otro proveedor del condominio, el sistema DEBE rechazarlo con un código propio.

Código de error: `VENDOR_RUC_INVALID_FORMAT` y `VENDOR_RUC_DUPLICATE` (`422`, RN-102)

✅ **Ejemplo:** El Administrator registra Pinturas Lima SAC con RUC 20512345678 y el sistema lo acepta. Rechaza "2051234567" (10 dígitos), "30512345678" (prefijo 30) y "10456789012" marcado como persona jurídica. Si vuelve a registrar 20512345678, recibe `VENDOR_RUC_DUPLICATE`.

❌ **Contraejemplo:** Se registra dos veces Pinturas Lima SAC y sus cotizaciones cuentan como dos proveedores distintos para RN-037.

---

**RN-179** | Categoría: Contrataciones | Prioridad: MUST | Fuente: Auditoría Spec Finalizer 2026-11-08 · 10-validation-log fila 64 · Q80 · Arquitectura API-08 ⚠️ Q24

Patrón EARS: Unwanted

Si dos usuarios con rol BoardMember registran a la vez una decisión sobre la misma contratación `Submitted`, entonces el sistema DEBE registrar solo la primera decisión que se guarda y responder a la segunda `409` sin registrarla. El control es optimista, con el `RowVersion` de la contratación; el cliente recarga la contratación y muestra la decisión ya registrada.

Código de error: `HIRE_DECISION_CONFLICT` (`409`)

✅ **Ejemplo:** Marco Salazar aprueba "Pintura de fachada" a las 21:03:10 y otro miembro de la Junta la rechaza a las 21:03:10.200 con la página abierta desde antes. La aprobación de Marco queda registrada; el rechazo recibe `409` y la página recargada muestra "Aprobada por la Junta Directiva".

❌ **Contraejemplo:** El historial queda con una aprobación y un rechazo del mismo instante, y la contratación termina en `Draft` aunque se aprobó.

---

## 7. Funcionalidades Should (S1–S5)

---

**RN-043** | Categoría: Averías | Prioridad: SHOULD | Fuente: Alcance S1

Patrón EARS: Ubiquitous

El sistema DEBE asignar a cada avería uno de estos estados: `Reported`, `InProgress` o `Resolved`.

✅ **Ejemplo:** La avería "Fuga en el baño de visitas del piso 1" pasa de `Reported` a `InProgress`.

❌ **Contraejemplo:** La avería queda en un estado libre, "visto por el técnico".

---

**RN-044** | Categoría: Averías | Prioridad: SHOULD | Fuente: Alcance S1 · Brief K3 ⚠️ Q12

Patrón EARS: Event-driven

Cuando cambia el estado de una avería, el sistema DEBE registrar la fecha-hora del cambio en ISO 8601.

✅ **Ejemplo:** `Reported` 2026-12-03T07:40:00-05:00 → `InProgress` 2026-12-03T10:15:00-05:00 → `Resolved` 2026-12-03T16:05:00-05:00 (30,300 s en total).

❌ **Contraejemplo:** Solo se guarda el estado actual, sin la fecha-hora de cada cambio, y no se puede calcular K3.

---

**RN-045** | Categoría: Pagos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-007

Patrón EARS: Ubiquitous

El sistema NO DEBE solicitar datos de tarjetas ni credenciales bancarias.

✅ **Ejemplo:** El formulario de pago tiene solo monto, fecha, concepto, unidad y constancia adjunta.

❌ **Contraejemplo:** El formulario tiene campos para el número de tarjeta y el CVV.

---

**RN-046** | Categoría: Pagos | Prioridad: MUST | Fuente: Alcance S2 · Constitución PRINCIPIO-007 · Auditoría M-02, A-14 ⚠️ Q28 · ⏭ Fuera del MVP (S2/S4): MUST cuando se construya la funcionalidad; un agente no la implementa en el MVP

Patrón EARS: Unwanted

Si un pago se registra sin constancia adjunta, entonces el sistema DEBE rechazar el registro.

Código de error: `PAYMENT_PROOF_REQUIRED`

✅ **Ejemplo:** "Cuota noviembre – S/ 350.00 – A-502 – 2026-11-05" se registra con `transferencia-0034.png`.

❌ **Contraejemplo:** El mismo pago se registra sin constancia.

---

**RN-047** | Categoría: Seguridad | Prioridad: MUST | Fuente: Alcance S2 · Constitución PRINCIPIO-006 · Auditoría A-04, A-05, M-02 · Reauditoría RQ-A06 · ⏭ Fuera del MVP (S2/S4): MUST cuando se construya la funcionalidad; un agente no la implementa en el MVP

Patrón EARS: Unwanted

Si un usuario con rol Resident, NonResidentOwner o BoardMember solicita el estado de cuenta de una unidad del mismo condominio con la que no tiene un vínculo `Owner` activo, entonces el sistema DEBE responder `403`. Solo el Administrator ve el estado de cuenta de cualquier unidad.

✅ **Ejemplo:** Ana (`Owner` de A-502) llama a `GET /api/units/{A-503}/debts` y recibe `403`. Carla (`Tenant` de A-301) pide el estado de cuenta de A-301 y también recibe `403`. Lo verifica el test `Resident_CannotReadOtherUnitDebts`.

❌ **Contraejemplo:** Ana ve que A-503 debe S/ 1,050.00, o Carla ve la deuda de la unidad que alquila.


---

**RN-125** | Categoría: Pagos | Prioridad: MUST | Fuente: Alcance S2 · Constitución PRINCIPIO-006 · Reauditoría RQ-A06 · ⏭ Fuera del MVP (S2/S4): MUST cuando se construya la funcionalidad; un agente no la implementa en el MVP

Patrón EARS: Ubiquitous

El sistema DEBE mostrar a la Junta Directiva la morosidad del condominio solo en forma agregada: monto total adeudado y número de unidades con deuda, sin identificar unidades ni personas.

✅ **Ejemplo:** Marco ve "Morosidad de noviembre: S/ 7,350.00 en 12 unidades".

❌ **Contraejemplo:** Marco ve "A-503 debe S/ 1,050.00".

---

**RN-048** | Categoría: Notificaciones | Prioridad: SHOULD | Fuente: Alcance S3 · ADR-0001 · Auditoría M-05, M-12

Patrón EARS: State-driven

Mientras un anuncio esté segmentado como "Solo propietarios", el sistema NO DEBE mostrarlo a usuarios con rol Resident, NonResidentOwner o Concierge que no tengan un vínculo `Owner` activo.

✅ **Ejemplo:** La convocatoria a la junta del 2027-01-15 es solo para propietarios. Ana (`Owner`) la ve, Carla (`Tenant`) no, y el Administrator que la publicó sí la ve.

❌ **Contraejemplo:** Carla ve la convocatoria en su lista de anuncios, o el Administrator no puede ver el anuncio que publicó.

---

**RN-049** | Categoría: Datos | Prioridad: MUST | Fuente: Alcance S4 · Constitución PRINCIPIO-006 · Auditoría M-02 · ⏭ Fuera del MVP (S2/S4): MUST cuando se construya la funcionalidad; un agente no la implementa en el MVP

Patrón EARS: Ubiquitous

El panel de indicadores NO DEBE mostrar datos de residentes individuales.

✅ **Ejemplo:** El panel muestra "K1 noviembre 2026: 64 de 120 unidades activas (53.3 %)".

❌ **Contraejemplo:** El panel lista "Unidades sin uso en noviembre: A-301, A-502, B-1203…".

---

**RN-050** | Categoría: Datos | Prioridad: SHOULD | Fuente: Brief K2 · Alcance S4 · Auditoría A-14

Patrón EARS: Ubiquitous

El sistema DEBE calcular K2 como la mediana, en segundos, del tiempo entre el envío y la confirmación de las reservas confirmadas del mes.

✅ **Ejemplo:** Las reservas de 2026-12 tardaron 1 s, 2 s, 2 s, 3 s y 540 s. K2 = 2 s.

❌ **Contraejemplo:** K2 se calcula como promedio (109.6 s).

---

**RN-051** | Categoría: Registro | Prioridad: SHOULD | Fuente: Alcance S5 · ADR-0001 · Auditoría M-19, A-14 ⚠️ Q33

Patrón EARS: Unwanted

Si una fila del CSV de importación trae un `OccupancyType` distinto de `Owner` o `Tenant`, sin distinguir mayúsculas de minúsculas, entonces el sistema NO DEBE crear el vínculo de esa fila.

Código de error: `CSV_INVALID_OCCUPANCY_TYPE`

✅ **Ejemplo:** La fila 12 trae `owner` y el sistema crea el vínculo como `Owner`. La fila 17 trae `OccupancyType = "Familiar"` y el sistema no crea ese vínculo.

❌ **Contraejemplo:** El sistema crea el vínculo de la fila 17 con `OccupancyType = Tenant` por defecto.

---

**RN-101** | Categoría: Seguridad | Prioridad: SHOULD | Fuente: Alcance S5 · Auditoría M-19, A-14 ⚠️ Q33

Patrón EARS: Unwanted

Si una celda del CSV de importación empieza con `=`, `+`, `-` o `@`, entonces el sistema DEBE rechazar esa fila.

Código de error: `CSV_FORMULA_INJECTION`

✅ **Ejemplo:** La fila 20 trae como nombre `=HYPERLINK("http://example.test")` y el sistema la rechaza.

❌ **Contraejemplo:** El sistema guarda la fórmula, y se ejecuta cuando el Administrator exporta el padrón a Excel.

⚠️ Esta regla rechazaría un teléfono como `+51 987…`. Hoy el CSV no trae teléfonos (RN-057); si se agregan, la regla se revisa (06 M-19).

---

## 8. Reglas transversales

---

**RN-052** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-005 · Auditoría M-21 ⚠️ Q34

Patrón EARS: Ubiquitous

El sistema DEBE cifrar con AES-256-GCM cada dato personal o de contacto de una persona del padrón, y el nombre y el RUC 10 de un proveedor persona natural, antes de guardarlos.

✅ **Ejemplo:** La columna `PhoneNumber` de Ana contiene texto cifrado. Su DNI no aparece en claro en ninguna tabla. El RUC 10 del técnico independiente Julio Vargas se guarda cifrado.

❌ **Contraejemplo:** La columna `DocumentNumber` contiene `45678912` "porque se usa en búsquedas".

---

**RN-053** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-008

Patrón EARS: Ubiquitous

El sistema NO DEBE escribir datos personales en claro en los logs.

✅ **Ejemplo:** El log dice `Reservation 9c2e… confirmed for unit a71f…`.

❌ **Contraejemplo:** El log dice `Reserva confirmada para Ana Quispe, DNI 45678912, cel. 987654321`.

---

**RN-054** | Categoría: UX | Prioridad: MUST | Fuente: Constitución PRINCIPIO-001

Patrón EARS: Ubiquitous

El sistema DEBE obtener todo texto visible para el usuario desde los archivos de recursos `es-PE`.

✅ **Ejemplo:** El botón muestra `Resources.Reservation_Confirm`, que en `es-PE.resx` vale "Confirmar reserva".

❌ **Contraejemplo:** El componente Blazor contiene `<button>Confirmar reserva</button>`.

---

**RN-055** | Categoría: UX | Prioridad: MUST | Fuente: Brief §4 · Constitución PRINCIPIO-001

Patrón EARS: Ubiquitous

El sistema DEBE mostrar cada monto con el prefijo `S/`, separador de miles con coma y 2 decimales con punto.

✅ **Ejemplo:** `S/ 18,500.00` y `S/ 0.50`.

❌ **Contraejemplo:** `18500`, `PEN 18.500,0` o `$18,500.00`.

---

**RN-056** | Categoría: UX | Prioridad: MUST | Fuente: Constitución PRINCIPIO-011

Patrón EARS: Ubiquitous

El sistema DEBE presentar cada objetivo táctil con un tamaño mínimo de 44×44 px.

✅ **Ejemplo:** El botón "Reservar" mide 48×48 px en un celular de 360 px de ancho.

❌ **Contraejemplo:** El ícono "Eliminar invitado" mide 24×24 px.

---

**RN-102** | Categoría: UX | Prioridad: MUST | Fuente: Auditoría A-14 · Reauditoría RQ-A05 · Constitución PRINCIPIO-001, PRINCIPIO-008

Patrón EARS: Unwanted

Si el sistema rechaza una solicitud porque una regla de validación, de estado o de tiempo lo impide, y el usuario sí tiene permiso sobre el recurso, entonces el sistema DEBE responder `422 Unprocessable Content` con un cuerpo RFC 9457 (Problem Details) que incluya el código de error estable de la regla, mostrar al usuario el mensaje de ese código desde `es-PE.resx` y no guardar el intento como registro de negocio.

✅ **Ejemplo:** Una reserva superpuesta recibe `422` con `{ "type": "…/errors/reservation-overlap", "code": "RESERVATION_OVERLAP", … }`. La pantalla muestra `Resources.Error_ReservationOverlap`. El log dice `Reservation rejected: RESERVATION_OVERLAP for unit a71f…`.

❌ **Contraejemplo:** El sistema responde `500` o `200` con `{ "ok": false }`, el mensaje viene escrito en el código, o la reserva rechazada queda guardada en la tabla de reservas.

---

**RN-118** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-006 · Reauditoría RQ-A05

Patrón EARS: Unwanted

Si el sistema rechaza una solicitud porque el usuario no tiene permiso sobre el recurso del condominio actual, entonces el sistema DEBE responder `403 Forbidden` con un cuerpo RFC 9457 (Problem Details), que incluya el código de error de la regla cuando la regla lo define, y mostrar el mensaje de ese código desde `es-PE.resx`.

✅ **Ejemplo:** Carla pide reservar a nombre de A-302, con la que no tiene vínculo, y recibe `403` con `{ "code": "RESERVATION_UNIT_NOT_LINKED", … }` (RN-075). Si cancela su propia reserva después del inicio, recibe `422` con `RESERVATION_CANCELLATION_TOO_LATE` (RN-083, RN-102), porque sí tiene permiso sobre esa reserva.

❌ **Contraejemplo:** Un rechazo por falta de permiso responde `422`, o un rechazo por tiempo responde `403`.

---

**RN-103** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003, PRINCIPIO-006 · Auditoría A-04

Patrón EARS: Ubiquitous

El sistema DEBE evaluar primero si el recurso pertenece al condominio actual, y responder `404` si no pertenece, antes de evaluar el permiso del usuario, y responder `403` si el recurso es del mismo condominio pero el usuario no tiene permiso.

✅ **Ejemplo:** Ana pide la deuda de una unidad de "Torres del Parque" y recibe `404`. Pide la deuda de A-503, de su mismo condominio, y recibe `403`.

❌ **Contraejemplo:** Ana recibe `403` por la unidad del otro condominio, lo que le confirma que ese recurso existe.

---

**RN-104** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003 · Auditoría C-07 · ADR-0003 · Segunda reauditoría R2-A06

Patrón EARS: Ubiquitous

El sistema NO DEBE omitir el global query filter de `CondominiumId` fuera de estos procesos de plataforma: inicio de sesión, aceptación de invitaciones, `DataRetentionJob`, `OccupancyLifecycleJob`, seeders y el proceso de plataforma.

✅ **Ejemplo:** El inicio de sesión busca la cuenta de Luis sin filtro de condominio para mostrarle su selector (RN-064). `OccupancyLifecycleJob` revisa los vínculos y roles de Carla en todos sus condominios antes de desactivar su cuenta (RN-073). Ningún endpoint de gastos usa `IgnoreQueryFilters()`.

❌ **Contraejemplo:** Un reporte de administración usa `IgnoreQueryFilters()` para "ver todas las deudas".

---

**RN-105** | Categoría: Seguridad | Prioridad: MUST | Fuente: ADR-0001 · Auditoría A-03

Patrón EARS: Ubiquitous

El sistema DEBE evaluar la política `CanViewCondominiumFinancials` contra la base de datos en cada solicitud.

✅ **Ejemplo:** El vínculo `Owner` de Jorge termina el 2026-12-15. Su primera solicitud del 2026-12-16 consulta la base de datos y recibe `403` (RN-016).

❌ **Contraejemplo:** La política se evalúa con un claim del token emitido el 2026-12-01 y Jorge sigue viendo los gastos.

---

**RN-106** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003 · Auditoría A-11 ⚠️ Q28

Patrón EARS: Ubiquitous

El sistema DEBE guardar cada archivo adjunto en Blob Storage bajo un prefijo con el `CondominiumId` de su condominio, sin URL pública ni enlace directo al blob.

✅ **Ejemplo:** `factura-F001-0458.pdf` se guarda como `7f3c9a10-…/expenses/3b9d…/factura-F001-0458.pdf` en un contenedor privado.

❌ **Contraejemplo:** El comprobante se comparte con un enlace público del blob que cualquiera puede abrir.

---

**RN-107** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-003 · Auditoría A-04, A-11

Patrón EARS: Ubiquitous

El sistema DEBE entregar los archivos adjuntos solo por un endpoint de la API que aplique el filtro de condominio y la misma política de acceso que el registro al que pertenece el archivo.

✅ **Ejemplo:** Luis descarga `factura-F001-0458.pdf` por `GET /api/expenses/{id}/receipt`. Carla (`Tenant`) recibe `403`, y un usuario de "Torres del Parque" recibe `404`. Lo verifica el test `ExpenseReceipt_CrossTenantAccess_Returns404`.

❌ **Contraejemplo:** El endpoint de descarga entrega el archivo a cualquier usuario autenticado que conozca su identificador.

---

**RN-166** | Categoría: Datos | Prioridad: MUST | Fuente: Alcance M5, M6 · Revisión QA de HU QA-11 ⚠️ Q28

Patrón EARS: Unwanted

Si falla la carga del adjunto de un gasto, de una cotización o de un pago, o falla la transacción del registro, entonces el sistema NO DEBE guardar el registro, DEBE borrar en ese momento el archivo cargado y NO DEBE permitir descargarlo. Si ese borrado falla, el sistema DEBE eliminar el archivo de Blob Storage en 1 h (3,600 s) o menos.

✅ **Ejemplo:** El Administrator registra "Limpieza de cisterna" con `factura-F001-0458.pdf` y la conexión se corta durante la carga. El gasto no aparece en el detalle de 2026-11 y el contenedor no guarda una copia parcial del PDF. El Administrator lo registra de nuevo.

❌ **Contraejemplo:** El gasto queda registrado sin comprobante (contra RN-033), o el PDF queda en el contenedor sin un gasto que lo referencie.

⚠️ Los formatos, el tamaño máximo y el escaneo de malware siguen pendientes de Q28.

---

**RN-108** | Categoría: Datos | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5, PRINCIPIO-004.6 · Auditoría C-01 · ADR-0002

Patrón EARS: Event-driven

Cuando `DataRetentionJob` archiva los datos de un titular, `DataRetentionJob` DEBE cifrarlos con una clave propia de ese titular guardada en Azure Key Vault.

✅ **Ejemplo:** Los datos archivados de Carla Díaz se cifran con la clave `retention-person-5e21…`, distinta de la de cualquier otro titular.

❌ **Contraejemplo:** Todos los datos archivados del condominio se cifran con una sola clave, y no se puede dejar ilegible el archivo de una sola persona.

⚠️ La regla que ejecuta una cancelación ARCO destruyendo esta clave se escribirá junto con las demás reglas de ARCO (ver "Alcance del catálogo").

---

**RN-109** | Categoría: Seguridad | Prioridad: MUST | Fuente: Constitución PRINCIPIO-004.5 · Alcance D3 · Auditoría A-01 · ADR-0006

Patrón EARS: Unwanted

Si cualquier usuario solicita leer el archivo frío, entonces el sistema DEBE responder `403`.

✅ **Ejemplo:** Un test de integración intenta leer el registro archivado de un invitado sin el rol `RetentionArchiveReader` y recibe `403`. En esta versión ningún usuario tiene ese rol.

❌ **Contraejemplo:** El Administrator abre los datos archivados de un exresidente desde la aplicación.

---

**RN-172** | Categoría: UX | Prioridad: MUST | Fuente: Validación de prototipos 2026-11-08 (códigos pedidos por el autor)

Patrón EARS: Unwanted

Si un formulario llega sin un dato obligatorio, o con un dato que solo tiene espacios, entonces el sistema DEBE rechazarlo y señalar cada campo que falta, con el nombre del campo en el mensaje.

Código de error: `FIELD_REQUIRED` (`422`, RN-102), un error por campo

✅ **Ejemplo:** El Administrator registra un gasto sin descripción ni categoría y ve "Completa la descripción." y "Elige la categoría." junto a cada campo y en el resumen.

❌ **Contraejemplo:** El formulario responde "Datos inválidos" sin decir qué falta, o guarda un gasto con descripción vacía.

---

**RN-173** | Categoría: UX | Prioridad: MUST | Fuente: Validación de prototipos 2026-11-08 (códigos pedidos por el autor)

Patrón EARS: Unwanted

Si un monto en soles llega con un formato que no es un número decimal con punto y hasta 2 decimales (p. ej. con letras, con coma decimal o con separador de miles), entonces el sistema DEBE rechazarlo antes de evaluar las reglas de monto (RN-034, RN-100). La precisión de más de 2 decimales sigue siendo `AMOUNT_INVALID_PRECISION` (RN-093).

Código de error: `AMOUNT_INVALID_FORMAT` (`422`, RN-102)

✅ **Ejemplo:** El sistema acepta "1200.50" y rechaza "1,200.50", "1200,50" y "mil soles".

❌ **Contraejemplo:** El servidor interpreta "1,200.50" como S/ 1.20 y registra el gasto con ese monto.

---

## 9. Preguntas pendientes que afectan a las reglas

Las reglas marcadas con ⚠️ se escribieron con la información disponible, pero estas preguntas pueden cambiarlas. Todas están registradas en [05-preguntas-abiertas.md](05-preguntas-abiertas.md). Q21 a Q29 surgieron al escribir este catálogo, y Q30 a Q34 en la auditoría QA ([auditoria-qa.md](auditoria-qa/auditoria-qa.md)). Q22, Q26, Q29 y Q25 (2026-11-08, RN-041) ya se resolvieron y salieron de esta tabla.

| # | Pregunta | Reglas afectadas | Qué falta para escribir más reglas |
|---|---|---|---|
| Q9 | ¿De quién son los datos e historial del condominio si cambia la administradora? | RN-063 | Titularidad de los datos en el traspaso |
| Q10 | ¿La administración acepta la confirmación automática? | RN-019 | Si la respuesta es no, RN-019 se reescribe y se agrega una regla con el plazo de aprobación (RN-020 está retirada) |
| Q11 | ¿Qué dice el reglamento interno sobre horarios, aforo, anticipación y frecuencia de las áreas comunes? ¿Hay áreas de uso compartido, como la piscina o el gimnasio? | RN-023, RN-024, RN-079, RN-080, RN-082, RN-160, RN-162 | Valores reales de configuración y reglas de áreas de uso compartido |
| Q12 | ¿La meta de 12 h (43,200 s) se mide hasta la primera respuesta o hasta la solución? ¿Hay niveles de urgencia? | RN-044 | Regla del plazo de atención de averías |
| Q18 | ¿Quién es el titular del banco de datos y qué exige la Ley N.° 29733? | RN-057, RN-087 | Validación legal del padrón mínimo y del aviso a invitados |
| Q21 | ¿Qué datos se piden de cada invitado: solo el nombre, o también el DNI? | RN-027, RN-028, RN-087 | Regla de minimización de datos del invitado |
| Q23 | ¿Hay excepciones a las 2 cotizaciones, por ejemplo un proveedor único o una emergencia? | RN-037 | Regla de excepción con justificación reforzada |
| Q24 | ¿Basta la decisión de 1 BoardMember, o se necesita mayoría de la Junta Directiva? ¿Puede votar un BoardMember con conflicto de interés? | RN-039, RN-063 | Reglas de quórum y de conflicto de interés |
| Q27 | ¿Cuál es la lista cerrada de categorías de gasto? | RN-035 | Regla de categorías válidas |
| Q28 | ¿Qué formatos y tamaño máximo se aceptan para los adjuntos, y se escanean en busca de malware? | RN-033, RN-046, RN-106 | Regla de validación y escaneo de adjuntos |
| Q30 | ¿A partir de qué monto un gasto debe estar vinculado a una contratación aprobada? | RN-037, RN-095 | Regla de umbral gasto–contratación |
| Q31 | ¿Cómo sabe la aplicación que un cliente negoció TLS 1.2 detrás del front-end de Azure? | RN-014 | Mecanismo de detección del aviso |
| Q32 | ¿Cómo se revoca el consentimiento y con qué efectos? | RN-010, RN-012 | Regla de revocación del consentimiento |
| Q33 | Si una fila del CSV tiene un error, ¿se importan las demás filas o ninguna? | RN-051, RN-101 | Regla de importación parcial o todo o nada |
| Q34 | ¿Los datos de un proveedor persona natural siguen visibles en el expediente o se archivan a los 90 días? | RN-041, RN-052 | Regla de retención de proveedores persona natural |
