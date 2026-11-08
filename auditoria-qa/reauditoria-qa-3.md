# CondoHub — Reauditoría QA 3 del Spec Pack

> **Fase:** Validación (Agente QA, BMAD)
> **Fecha:** 2026-11-02
> **Rol:** QA Senior y Abogado del Diablo
> **Insumo revisado:** Spec Pack completo contenido en `agente-qa.xml`: constitución 1.4, project brief, alcance, reglas de negocio (RN-001 a RN-153), glosario, ADR-0001 a ADR-0009 y matriz de permisos. Como referencia: [05-preguntas-abiertas.md](05-preguntas-abiertas.md) y [reauditoria-qa-2.md](reauditoria-qa-2.md).
> **Método:** se leyó el pack completo. Primero se verificó, en el texto actual, cada uno de los 45 hallazgos de la segunda reauditoría (tabla de seguimiento). Después se hizo una pasada nueva centrada en los cambios recientes: RN-131 a RN-153, constitución 1.3 y 1.4, PRINCIPIO-009.10, matriz R8 a R10, ADR-0005 y ADR-0009. Cada hallazgo cita la regla o sección exacta. Antes de registrarlo se comprobó que ninguna otra parte del pack lo resuelve. No se reporta lo que [05-preguntas-abiertas.md](05-preguntas-abiertas.md) registra como pregunta abierta, lo que el pack marca con ⚠️ ni lo que figura en la sección "Gaps" de la matriz, salvo cuando el pack lo contradice o la marca no basta.
> **Identificadores:** los hallazgos nuevos usan R3-Ann (ALTA), R3-Mnn (MEDIA) y R3-Bnn (BAJA). Los hallazgos arrastrados conservan su identificador de la segunda reauditoría (R2-…).

## Resumen

| Severidad | Nuevos | Arrastrados (abiertos de la reauditoría 2) | Total abiertos |
|---|---|---|---|
| CRÍTICA | 0 | 0 | **0** |
| ALTA | 4 | 1 | **5** |
| MEDIA | 9 | 22 | **31** |
| BAJA | 7 | 9 | **16** |
| **Total** | **20** | **32** | **52** |

De los 45 hallazgos de la segunda reauditoría:

- **12 quedaron resueltos:** R2-C01, R2-C02, R2-A01, R2-A02, R2-A03, R2-A05, R2-A06, R2-A07, R2-A08, R2-A09, R2-A10 y R2-A11.
- **1 está resuelto en parte y sigue abierto:** R2-A04.
- **30 siguen abiertos sin cambios.**
- **2 empeoraron:** R2-M02, que se eleva a ALTA dentro de R3-A04, y R2-M07, que ahora además contradice RN-153 (ver R3-A02).

Varias correcciones abrieron defectos nuevos. Los más graves están en el cambio de correo (R3-A03), en la nueva regla de mensajes neutros (R3-A02), en los vínculos futuros combinados con la anulación del plazo (R3-A04) y en los permisos reales de la GitHub App (R3-A01).

Cada hallazgo indica su tipo: contradicción, regla faltante, ambigüedad, inconsistencia de glosario o debilidad de formato. Algunos combinan dos tipos.

---

## Seguimiento de la reauditoría 2

Estados: **Resuelto** (el texto actual lo corrige), **Parcial** (corregido en parte, sigue abierto), **Abierto** (sin cambios), **Empeoró** (el defecto sigue y los cambios recientes lo agravan).

| ID | Hallazgo | Estado | Verificación en el texto actual |
|---|---|---|---|
| R2-C01 | Nadie puede aprobar cambios en workflows ni en la constitución | **Resuelto** | El encabezado de la constitución ("mediante un PR propio que incluya un ADR aceptado [...] y tenga todos los status checks en verde") y el PRINCIPIO-010 ("La excepción incluye los cambios en `00-constitucion.md` o `.github/workflows/`") permiten el merge del autor. Lo recoge el ADR-0005, "Author exception". Defecto derivado: R3-M05 |
| R2-C02 | La seudonimización borra la ficha `Person` referenciada | **Resuelto** | RN-127 conserva la fila `Person` "solo con su `PersonId` y su `CondominiumId`" y prohíbe el borrado en cascada. El ADR-0002 ("More Information") fija `DeleteBehavior.Restrict` |
| R2-A01 | El commit de una enmienda lleva el trailer que el CI rechaza | **Resuelto** | El PRINCIPIO-009 dice: "El trailer indica asistencia y no bloquea el merge". También lo recogen el PRINCIPIO-010 y el ADR-0005 ("CI check"). Residuo sobre el PRINCIPIO-009.7: R3-M06 |
| R2-A02 | El control que protege la constitución y los workflows se puede evadir | **Resuelto** (verificación pendiente y registrada) | El pack incorpora los cuatro puntos sugeridos: dos rulesets separados, el check que se ejecuta desde `main`, la GitHub App sin el permiso `workflows` y el PRINCIPIO-009.10. La verificación en GitHub figura como tarea de la semana 1 (alcance §0, D2 y ADR-0005, "Confirmation"). Defectos derivados: R3-A01, R3-M05, R3-M06 y R3-M07 |
| R2-A03 | `testssl.sh` tiene licencia GPL | **Resuelto** | El PRINCIPIO-005 y RN-013 usan `tlsx` (MIT). El cambio queda registrado en la fila R2-A03 de la tabla del ADR-0009 |
| R2-A04 | RN-127 puede borrar datos de la cuenta global | **Parcial** | Ya están separados el borrado de la ficha (RN-127) y el de la cuenta (RN-128). Pero el ámbito del consentimiento sigue sin definirse: RN-126 archiva "sus registros de consentimiento" y RN-127 borra "los datos archivados", mientras que RN-012 registra el consentimiento "para el usuario". Sigue como ALTA (ver la sección ALTAS) |
| R2-A05 | Falta la reactivación y la anulación del plazo cuando la persona vuelve | **Resuelto** | RN-131 a RN-135 y glosario #5, #42 y #52. Defectos derivados: R3-A04 y R3-M04 |
| R2-A06 | Ningún componente ejecuta los eventos por fecha | **Resuelto** | RN-136 (`OccupancyLifecycleJob`), RN-060, RN-073 y RN-104. El ADR-0003 incluye el job en la lista cerrada. RN-085 calcula `Completed` al consultar. La hora de ejecución sigue abierta en R2-M01 |
| R2-A07 | Sesiones abiertas e invitaciones al revocar un rol | **Resuelto** | RN-137, RN-138 y RN-139 |
| R2-A08 | `Rejected` figura como estado en el glosario | **Resuelto** | La tabla de campos tiene una fila aparte, `SupplierHireDecision`, con `Approved` y `Rejected` |
| R2-A09 | Ciclo de vida del MFA | **Resuelto** | RN-008 (TOTP por cuenta), RN-064 (orden contraseña → TOTP → selector), RN-140 (enrolamiento obligatorio), RN-062 (reset del BoardMember) y RN-141 (regeneración de códigos). Sigue sin definirse si los códigos de recuperación cuentan para el bloqueo, punto que pasa a R2-M07. Residuo en la matriz: R3-B05 |
| R2-A10 | Gastos anulados en los totales y mes de cada gasto | **Resuelto** | RN-142, RN-143 y RN-144. RN-035 las referencia |
| R2-A11 | No hay regla ni fila de la matriz para el DNI y el teléfono del titular | **Resuelto** | RN-145 a RN-153 y matriz R8, R9 y R10. Defectos derivados: R3-A02, R3-A03, R3-M01, R3-M02 y R3-M03 |
| R2-M01 | Las fechas de inicio de la retención se cuentan de formas distintas | **Abierto** | RN-005 sigue fijando el vencimiento de Carla el 2027-05-01, aunque su rol se revoca el 2027-02-01 (RN-060, RN-136). Con "la más tardía" de las dos fechas, el plazo vencería el 2027-05-02. RN-131 repite el 2027-05-01. RN-136 tampoco fija la hora de ejecución de los jobs |
| R2-M02 | Vínculos con `StartDate` futura | **Empeoró** | No hay regla nueva. RN-131 y RN-133 se disparan con cualquier vínculo registrado, sea futuro o no, y chocan con RN-005 y RN-073. Se eleva a ALTA en R3-A04 |
| R2-M03 | RN-015 prohíbe lo que la unión de roles concede | **Abierto** | RN-015 no cambió |
| R2-M04 | BoardMember sin vínculo `Owner`; Q19 no está marcada | **Abierto** | RN-060 y RN-039 siguen sin ⚠️ Q19, Q19 no aparece en la tabla de la sección 9 y el glosario #13 no cambió |
| R2-M05 | Clave por titular para los invitados | **Abierto** | RN-108 no cambió |
| R2-M06 | El log de la Junta Directiva permite reidentificar a las personas | **Abierto** | RN-124 y RN-130 no cambiaron |
| R2-M07 | Enumeración de cuentas y bloqueo a propósito | **Abierto** (agravado) | RN-111 y RN-115 no cambiaron. Ahora `ACCOUNT_LOCKED` además contradice RN-153 (ver R3-A02). Tampoco se dice si los códigos de recuperación cuentan para el bloqueo |
| R2-M08 | Rechazo del consentimiento y versiones nuevas | **Abierto** | RN-070, RN-010 y RN-071 no cambiaron. Ninguna fila de la matriz dice quién publica una versión del consentimiento |
| R2-M09 | Faltan estados de la cuenta, términos y campos en el glosario | **Abierto** (mejora parcial) | El glosario #42 ya menciona la desactivación y la reactivación, y la tabla de campos agrega `DocumentNumber`, `DocumentType` y `PhoneNumber`. Siguen faltando el término "Estado de la cuenta" (con "sin activar" de RN-070), "titular", "cargo" y "operador", los campos `decision`, `decidedByRole`, `status`, `cancelledBy`, `cancelledAt`, `PersonId`, `Email` y `RequiresAccessibleElevator`, y la convención PascalCase/camelCase |
| R2-M10 | "Supplier" en `SupplierHire` | **Abierto** | El glosario #29 y #31 siguen con "Posible renombre [...] pendiente" |
| R2-M11 | Elección, retiro y concurrencia de la contratación | **Abierto** | RN-097 sigue hablando de "la cotización ganadora" y no existe ese campo |
| R2-M12 | "Proveedores distintos" no es verificable | **Abierto** | Sin reglas sobre el RUC. El ADR-0004 sigue cubriendo solo el correo y el DNI |
| R2-M13 | El vínculo gasto–contratación contradice la inmutabilidad del gasto | **Abierto** | RN-091, RN-095 y la fila H4 de la matriz no cambiaron |
| R2-M14 | Qué cuenta para el límite mensual y la concurrencia | **Abierto** | RN-080 y RN-081 no cambiaron |
| R2-M15 | Propagación a portería y flujos alternos del ingreso | **Abierto** | RN-026, RN-029, RN-030 y RN-086 no cambiaron |
| R2-M16 | Qué muestra la disponibilidad de reservas ajenas | **Abierto** | No hay regla para la fila B2 de la matriz |
| R2-M17 | Asignación de Resident y NonResidentOwner; gestión de Concierge | **Abierto** | RN-002 sigue sin decir "en el mismo condominio", y ninguna regla permite al Administrator revocar a un Concierge |
| R2-M18 | RN-076 frente al glosario #9 en unidades alquiladas | **Abierto** | Sin cambios |
| R2-M19 | RN-074 exige "ASVS nivel 2" sin decir qué requisitos | **Abierto** | Sin cambios. RN-151 y RN-152 citan ASVS sin que el ADR-0008 lo recoja (ver R3-B03) |
| R2-M20 | Condiciones para medir p95 y LCP | **Abierto** | El ADR-0007 no cambió |
| R2-M21 | "Exactamente 2 decimales" depende de la serialización | **Abierto** | RN-093 no cambió |
| R2-M22 | TLS 1.3 con Key Vault y Storage no se verifica | **Abierto** | El alcance §6 solo menciona Azure SQL Database |
| R2-M23 | El pack cita documentos que no incluye | **Abierto** | `agente-qa.xml` sigue sin incluir 05, 06 ni `docs/proposals/…`, y la sección 9 de las reglas sigue sin Q19 ni Q20 |
| R2-B01 | La versión de la constitución no coincide entre documentos | **Abierto** (persiste con 1.4) | La constitución está en la 1.4. Dicen 1.3 el alcance §5 (cuarto punto de "Técnicas"), D2, D3, el párrafo final de §7, el encabezado de la matriz y el ADR-0006. El ADR-0007 dice 1.1. La tabla "Decision Outcome" del ADR-0009 no tiene filas para la 1.2 (RQ-A11) ni para la 1.4 (PRINCIPIO-009.10), que solo aparecen en "Confirmation" |
| R2-B02 | Restos editoriales | **Abierto** | Siguen: "Blazor en modo Auto" (alcance §5), "falta aclararlo en el PRINCIPIO-002" (alcance §5), la coma que falta antes de "Libro de Reclamaciones" (alcance §0), "must move" (ADR-0006) y "must be updated" (ADR-0002) |
| R2-B03 | Reglas compuestas o con un patrón EARS que no les corresponde | **Abierto** (agravado) | Las reglas citadas no cambiaron, y se suman nuevas reglas compuestas (ver R3-B01) |
| R2-B04 | Límites de fecha y de formato sin precisar | **Abierto** | RN-094, RN-058 y RN-003 no cambiaron |
| R2-B05 | K2 se define distinto en el brief y en RN-050 | **Abierto** | Sin cambios |
| R2-B06 | Límites técnicos del crypto-shredding y de la rehidratación | **Abierto** | Los ADR-0002 y ADR-0006 no cambiaron |
| R2-B07 | El grep de confirmación del ADR-0009 no se puede verificar | **Abierto** | La constitución sigue teniendo "Residentes" (PRINCIPIO-001) y `Resident` (PRINCIPIO-006) |
| R2-B08 | La clasificación de los códigos HTTP es irregular | **Abierto** | RN-077 sigue con `403`. RN-002, RN-003, RN-021, RN-022, RN-024, RN-033, RN-034, RN-058, RN-067, RN-068, RN-079 y RN-080 siguen sin estado HTTP. El cuerpo del `404` sigue sin definirse |
| R2-B09 | "Residente" en sentido amplio | **Abierto** | RN-083 y RN-088 no cambiaron |

---

## CRÍTICAS

No hay hallazgos críticos abiertos. Los dos de la reauditoría anterior (R2-C01 y R2-C02) están resueltos, y la pasada nueva no encontró ningún defecto que bloquee la semana 1 ni que provoque una pérdida de datos irreversible sin ambigüedad.

---

## ALTAS

### R3-A01 · Los permisos "mínimos" de la GitHub App sí le permiten aprobar y mergear PR

- **Tipo:** Contradicción / Regla faltante (control sin verificar)
- **Severidad:** ALTA
- **Ubicación:** ADR-0005, "Decision Outcome" ("minimal permissions (branches and PRs only). The App cannot approve or merge PRs") y "Confirmation" (la tarea de la semana 1 no lo incluye). Alcance §5, "Identidad de los agentes" ("La GitHub App no tiene permisos para aprobar ni mergear PR"). Alcance §7 D2, columna "Pendiente" ("permisos mínimos (ramas y PR, sin aprobar ni mergear)"). Constitución, PRINCIPIO-009.1 y 009.10.
- **Problema:** GitHub no ofrece permisos separados para "aprobar" o "mergear". Para crear ramas y hacer push, la App necesita `contents: write`, y con ese permiso la API permite mergear un PR. Para abrir PR necesita `pull_requests: write`, y ese permiso también permite enviar una revisión `APPROVE` sobre un PR que la App no abrió. Con la configuración que describe el pack:
  - La App puede aprobar un PR abierto por el autor y luego mergearlo. El ruleset 2 exige 1 aprobación y la App la aportaría, mientras que el ruleset 1 solo exige que los checks estén en verde. Un agente mergearía un PR sin decisión humana (PRINCIPIO-009.1).
  - La "1 aprobación humana" del PRINCIPIO-010 se cumpliría con una aprobación que no es humana.

  El pack presenta como un hecho ("The App cannot approve or merge PRs") algo que los permisos elegidos no garantizan. Además, la verificación de la semana 1 (puntos a, b y c, y el push sobre workflows) no lo comprueba.
- **Sugerencia:** que el autor decida el control técnico y lo registre en el ADR-0005. Se recomienda agregarlo a la verificación de la semana 1 con un caso negativo explícito: "la App intenta aprobar y mergear un PR del autor, y GitHub lo rechaza". Opciones posibles: restringir en el ruleset quién puede mergear, exigir que la aprobación venga de un code owner humano, o separar la identidad que hace push de la que abre PR. Si GitHub no lo permite, escalarlo como conflicto con el PRINCIPIO-009.

### R3-A02 · RN-153 (no revelar que un correo o un DNI existe) contradice RN-068, RN-069 y RN-111

- **Tipo:** Contradicción
- **Severidad:** ALTA
- **Ubicación:** RN-153 ("El sistema NO DEBE revelar en un mensaje de error que un correo o un DNI pertenece a otra persona o cuenta", patrón Ubiquitous, sin excepciones). RN-068 (código `EMAIL_ALREADY_REGISTERED`). RN-069 (código `DOCUMENT_NUMBER_ALREADY_REGISTERED`, con mensaje neutro solo en pantalla). RN-111 (`ACCOUNT_LOCKED`). RN-102 (el cuerpo Problem Details "incluya el código de error estable de la regla").
- **Problema:**
  1. **RN-068:** el código y el mensaje le dicen al Administrator que el correo ya pertenece a otra persona del condominio. Es justo lo que prohíbe RN-153 al pie de la letra. Un agente no puede cumplir ambas reglas.
  2. **RN-069:** el mensaje en pantalla es neutro, pero RN-102 obliga a devolver en el cuerpo de la API el código `DOCUMENT_NUMBER_ALREADY_REGISTERED`, que revela lo mismo a quien llame a la API o mire la respuesta en el navegador. El contraejemplo de RN-153 ("Ese DNI ya está registrado") se cumple igual a través del código.
  3. **RN-111:** solo una cuenta que existe puede devolver `ACCOUNT_LOCKED`, así que esa respuesta confirma que el correo tiene cuenta. Antes era un riesgo (R2-M07); ahora es una contradicción con una regla MUST.
- **Sugerencia:** que el autor decida el alcance de RN-153: a quién aplica (¿al titular, al Administrator, a cualquier usuario no autenticado?) y si cubre el código de la API además del mensaje. Después, ajustar RN-068, RN-069 y RN-111. Por ejemplo, un código genérico en la API para el titular, una excepción explícita para el Administrator, que ya ve el padrón (matriz R3), y una respuesta idéntica para cuenta inexistente y cuenta bloqueada.

### R3-A03 · El cambio de correo (RN-151, matriz R10) no define qué correo cambia ni cómo se valida

- **Tipo:** Ambigüedad / Regla faltante
- **Severidad:** ALTA
- **Ubicación:** RN-151 y RN-152. Matriz R10 ("Change own sign-in email") y R2 (el Administrator registra a las personas con "Name, email and occupancy"). RN-068 (correo único por condominio en `Person`), RN-121 (correo único en la plataforma en `User`), RN-122 (la invitación se une a la cuenta "de ese correo"), RN-104 y ADR-0003 (lista cerrada de procesos con `IgnoreQueryFilters()`). Glosario #5 y #42. ADR-0004.
- **Problema:** el correo existe en dos lugares: en la cuenta global `User` (login, RN-121) y en cada ficha `Person` por condominio (padrón, RN-068, RN-126). RN-151 dice "su correo" sin decir cuál cambia. Eso deja abiertos estos puntos:
  1. **Qué se actualiza.** Puede ser solo `User`, o también las fichas `Person` de todos sus condominios. Si se actualizan todas, el cambio necesita `IgnoreQueryFilters()`, y el cambio de correo no está en la lista cerrada de RN-104 y del ADR-0003 (violación del PRINCIPIO-003). Si se actualiza solo `User`, el padrón queda con el correo anterior, y una invitación nueva a ese correo ya no se une a la cuenta (RN-122) o choca con RN-121.
  2. **Unicidad del correo nuevo.** Ninguna regla dice qué pasa si el correo nuevo ya pertenece a otra cuenta (RN-121) o a otra ficha del condominio (RN-068). Por RN-153 el sistema no puede decirlo, pero tampoco hay un comportamiento definido, como enviar igual el enlace o descartarlo sin avisar. Tampoco se dice si los índices ciegos se recalculan al confirmar o al pedir el cambio.
  3. **Quién puede cambiarlo.** La fila R2 de la matriz permite al Administrator registrar y, por omisión, editar el correo de la persona. Ninguna regla dice si esa edición cambia el correo de login, lo que permitiría tomar una cuenta sin el flujo de RN-151.
  4. **Reautenticación y recuperación.** No se exige la contraseña ni el TOTP antes de pedir el cambio. El contraejemplo de RN-152 es justamente una sesión robada. Una vez avisado, el dueño legítimo no tiene una forma definida de revertir el cambio, más allá del proceso de plataforma, que solo restablece el MFA.

  Es un flujo MUST de identidad, dentro del módulo con umbral de cobertura del 90 %, y un agente tendría que inventar las respuestas.
- **Sugerencia:** que el autor decida y escriba en reglas separadas:
  - qué entidad cambia (`User`, todas las `Person` o ambas), y si se agrega a la lista cerrada del ADR-0003;
  - el comportamiento cuando el correo nuevo ya está en uso, compatible con RN-153;
  - si el Administrator puede editar el correo de una persona que ya tiene cuenta;
  - si se exige reautenticación;
  - qué puede hacer el dueño que recibe el aviso de RN-152.

  Actualizar también el ADR-0004 (recálculo del índice ciego) y la matriz R2 y R10.

### R3-A04 · Los vínculos futuros, la anulación del plazo y la reactivación de la cuenta se contradicen (absorbe R2-M02)

- **Tipo:** Contradicción / Regla faltante
- **Severidad:** ALTA
- **Ubicación:** Glosario #6 ("Se pueden registrar una `StartDate` y una `EndDate` futuras: un vínculo con `StartDate` futura todavía no está activo"). RN-131 ("se le registra un vínculo [...] DEBE anular ese plazo"), RN-133 ("le registra un nuevo vínculo [...] DEBE reactivar esa cuenta"), RN-005 ("queda sin vínculos activos y sin roles"), RN-072, RN-073, RN-136, RN-126 y RN-127.
- **Problema:** RN-131 y RN-133 se disparan con el **registro** de un vínculo, mientras que RN-005, RN-072 y RN-073 dependen de que el vínculo esté **activo**. Caso concreto: el plazo de Carla vence el 2027-05-01. El 2027-03-01 el Administrator le registra un vínculo `Tenant` con `StartDate = 2027-08-01`.
  - RN-131 anula el plazo y RN-133 reactiva su cuenta el 2027-03-01.
  - El 2027-03-02, `OccupancyLifecycleJob` comprueba que Carla no tiene vínculos activos ni roles, y RN-073 vuelve a desactivar la cuenta. Así cada vez que se registre un vínculo futuro.
  - RN-005 no dice si, después de la anulación, empieza un plazo nuevo mientras el vínculo siga siendo futuro. Si el agente modela RN-005 como un estado ("sin vínculos activos"), el plazo nuevo vence antes del 2027-08-01. Entonces `DataRetentionJob` archiva la ficha (RN-126, RN-127) y, si es su único condominio, borra la cuenta (RN-128), aunque existe un vínculo registrado que apunta a esa ficha seudonimizada. El borrado es irreversible.

  También sigue abierto el caso original de R2-M02: si se puede invitar y si se asigna el rol antes de la `StartDate`.
- **Sugerencia:** que el autor decida si un vínculo futuro cuenta para la retención, para la cuenta y para el acceso, y lo escriba en RN-005, RN-131, RN-133 y RN-073 con la misma condición (por ejemplo, "vínculo activo o futuro"). Agregar un ejemplo con `StartDate` futura en cada una y un test de integración que ejecute los dos jobs varios días seguidos.

### R2-A04 (arrastrado, parcial) · El consentimiento se archiva y se borra con una sola ficha, aunque se registra por cuenta

- **Tipo:** Ambigüedad / Contradicción
- **Severidad:** ALTA
- **Ubicación:** RN-012 ("para el usuario de Carla"), RN-071 ("exigir a cada usuario"), RN-126 ("sus registros de consentimiento"), RN-127 ("eliminar de SQL Server los datos archivados"), RN-128, RN-135 (Ana acepta la invitación de "Torres del Parque" con su cuenta existente) y glosario #18.
- **Problema:** las credenciales ya quedaron separadas, pero el consentimiento no. Si es por cuenta, archivar a Ana en un condominio borra el consentimiento que respalda su uso del otro, y se pierde la prueba legal de su aceptación. Si es por ficha, RN-012 y RN-071 están mal escritas, y en RN-135 Ana entra a "Torres del Parque" sin aceptar el consentimiento de ese condominio. La pregunta abierta Q18 (quién es el titular del banco de datos) influye en la respuesta. Aun así, el pack tiene que fijar ya el modelo de datos, porque RN-127 borra de forma irreversible.
- **Sugerencia:** decidir si el consentimiento es por `User` o por `Person` (por condominio) y reflejarlo en el glosario #18, RN-010, RN-012, RN-071, RN-126 y RN-127. Si es por `User`, RN-126 debe copiar el consentimiento sin borrarlo mientras la cuenta exista (RN-128). Marcar la decisión con ⚠️ Q18.

---

## MEDIAS

### R3-M01 · El mensaje neutro de RN-069 y RN-153 manda al titular a un callejón sin salida

- **Tipo:** Regla faltante (flujo alterno)
- **Severidad:** MEDIA
- **Ubicación:** RN-069 y RN-153 ("No se pudo registrar el documento. Contacta a la administración."), RN-146 (el Administrator no puede registrar ni editar el DNI de otra persona, matriz R9) y RN-145.
- **Problema:** el mensaje le pide al titular que contacte a la administración, pero el Administrator no puede corregir el DNI de nadie (RN-146), ni el de quien lo registró por error ni el de quien lo registró a propósito. Ninguna regla define cómo se resuelve un DNI duplicado. Las solicitudes ARCO, que permitirían rectificar, están fuera del MVP. El DNI es opcional (RN-147), así que el impacto es limitado, pero el sistema le indica al usuario un camino que no existe.
- **Sugerencia:** que el autor decida quién resuelve el conflicto (por ejemplo, el proceso de plataforma con registro en el log, o el titular que lo registró, que puede borrarlo) y ajustar el mensaje de RN-069 y RN-153 a esa decisión.

### R3-M02 · La unicidad y el índice ciego del carné de extranjería no están definidos, y `DocumentType` no tiene reglas

- **Tipo:** Regla faltante / Inconsistencia de glosario
- **Severidad:** MEDIA
- **Ubicación:** RN-069 (solo el "DNI"), RN-127 ("los índices ciegos de su correo y su DNI"), RN-148 y RN-149. ADR-0004 (Decision Outcome: "email and DNI"; More Information: normalización de "DNI o carné de extranjería"). Glosario #48 ("correo y DNI") y tabla de campos (`DocumentNumber` "con índice ciego"; `DocumentType` "Decide qué formato se valida").
- **Problema:**
  - El campo `DocumentNumber` guarda el DNI y el carné de extranjería con un único índice ciego, pero la unicidad (RN-069) y el borrado del índice (RN-127) solo nombran al DNI. Queda abierto si dos personas del mismo condominio pueden tener el mismo carné de extranjería y si su índice ciego se borra al archivar.
  - Ninguna regla dice si `DocumentType` es obligatorio cuando hay número, qué pasa con otro valor, si el titular puede cambiar de tipo, ni si el índice ciego incluye el tipo.
  - RN-149 rechaza `0012345#7`, pero el ADR-0004 normaliza quitando "separadores". No se dice si la validación se hace antes o después de normalizar.
- **Sugerencia:** extender RN-069 y RN-127 al carné de extranjería, o decidir explícitamente que no es único. Agregar una regla para `DocumentType` y fijar el orden validación → normalización. Alinear el glosario #48 y el ADR-0004.

### R3-M03 · "Su perfil" no dice si el DNI y el teléfono son por cuenta o por condominio

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** RN-145 ("desde su perfil"), RN-147, RN-069 (unicidad "del mismo condominio"). Glosario #5 (`Person` es una ficha por condominio) y tabla de campos (`DocumentNumber` y `PhoneNumber` en `Person`). Matriz R4 y R8.
- **Problema:** el DNI y el teléfono viven en la ficha `Person`, una por condominio, pero RN-145 habla de un único "perfil". Ana, con fichas en dos condominios, no sabe si debe registrar su DNI dos veces. Un agente podría copiarlo a todas las fichas, lo que exige consultas entre condominios fuera de la lista cerrada de RN-104, o solo a la del condominio actual. Lo mismo pasa al editar el teléfono.
- **Sugerencia:** decidir si "Mi perfil" edita solo la ficha del condominio actual o todas, y escribirlo en RN-145. Si edita todas, agregar el proceso a la lista cerrada del ADR-0003.

### R3-M04 · RN-068 y RN-132 dependen del mismo dato (el correo) y no queda claro cómo se agrega un vínculo a una persona activa

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** RN-068 ("un correo que ya pertenece a otra persona del mismo condominio [...] la persona que vuelve con su ficha sin archivar la cubre RN-132"), RN-132 ("Cuando una persona vuelve a un condominio antes de que venza su plazo"). Matriz R2.
- **Problema:** el sistema solo distingue a las personas por el índice ciego del correo, así que "otra persona" de RN-068 y "la persona que vuelve" de RN-132 se detectan con el mismo dato. La única diferencia implícita es si la ficha existente tiene un plazo de retención en curso. Quedan sin regla estos casos:
  - Ana, propietaria activa de A-502, compra A-503. Registrarla "de nuevo" con su correo cae en RN-068 y se rechaza. Ninguna regla ni fila de la matriz describe la acción "agregar un vínculo a una persona existente".
  - Raúl, Concierge activo (con rol y sin vínculos, así que sin plazo en curso), alquila A-101. Ni RN-132 ni RN-068 permiten agregarle el vínculo.
  - RN-132 usa "vuelve" como evento, pero ningún término del glosario lo define.
- **Sugerencia:** separar en reglas y en la matriz las acciones "registrar una persona nueva" y "agregar un vínculo a una ficha existente". Reescribir el disparador de RN-132 en términos observables, por ejemplo: "Cuando el Administrator registra un vínculo con un correo cuyo índice ciego coincide con una ficha sin archivar del condominio...".

### R3-M05 · El requisito "ADR aceptado en el mismo PR" no se puede verificar en el CI y bloquea los PR de Dependabot sobre workflows

- **Tipo:** Ambigüedad / Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** Encabezado de la constitución; PRINCIPIO-009 ("exige que todo PR que los modifique incluya un ADR aceptado"); PRINCIPIO-010 ("Flujo"); PRINCIPIO-010 ("Tests obligatorios": Dependabot); ADR-0005 ("CI check" y "Confirmation"). PRINCIPIO-009 ("uno exige todos los status checks en verde").
- **Problema:**
  1. El check tiene que decidir de forma automática que el PR "incluye un ADR aceptado que justifica el cambio". El pack no dice si basta con que el PR agregue o modifique un archivo en `docs/adr/` con `status: accepted`, si sirve un ADR que ya existe, ni cómo se comprueba que "justifica" ese cambio. Un agente que implemente el check tendría que inventar el criterio.
  2. En la semana 1 se construye todo el pipeline en `.github/workflows/` (alcance §0). Al pie de la letra, cada PR de esa semana necesita su propio ADR aceptado.
  3. Dependabot, que exige el PRINCIPIO-010, abre PR que actualizan versiones de acciones dentro de `.github/workflows/` y no puede agregar un ADR. Esos PR fallarían siempre, incluidas las actualizaciones de seguridad.
  4. En GitHub, "todos los status checks" no es una opción de configuración: el ruleset exige una lista de checks con nombre. Un workflow nuevo que no esté en esa lista no bloquea el merge.
- **Sugerencia:** que el autor fije el criterio verificable del check (ruta, frontmatter y si se admite un ADR existente), decida cómo se tratan los PR de Dependabot que tocan workflows y defina en el ADR-0005 la lista de checks requeridos y quién la mantiene.

### R3-M06 · El PRINCIPIO-009.10 no tiene un control técnico para los agentes locales, y el 009.7 choca con los commits asistidos

- **Tipo:** Regla faltante (control) / Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-009.7 ("Modificar este archivo") y 009.10 ("Un agente solo trabaja en GitHub con la identidad de la GitHub App"); PRINCIPIO-009, "sí puede" ("desplegar en el entorno dev"); PRINCIPIO-010 (un commit del autor con el trailer de un agente "sigue cubierto por la excepción"); ADR-0009, "More Information" (las enmiendas 1.1, 1.3 y 1.4 fueron "drafted with AI assistance").
- **Problema:**
  1. El PRINCIPIO-009.10 es una norma de conducta. Un agente que trabaja en la máquina del autor tiene a mano las credenciales de Git y de GitHub del autor, y nada técnico le impide hacer push con ellas. Un PR así es "del autor": se mergea sin aprobación (PRINCIPIO-010) e incluso puede tocar la constitución. El check y los rulesets no lo detectan. R2-A02 pedía la regla, y la regla ya existe, pero falta un control o, al menos, un riesgo aceptado por escrito.
  2. El 009.10 solo cubre GitHub. No se dice con qué identidad de Azure despliega el agente en dev, ni qué impide que use las credenciales del autor contra producción (PRINCIPIO-009.2 y 009.8).
  3. El 009.7 prohíbe que un agente "modifique" la constitución, pero las enmiendas se redactaron con IA y entran como commits del autor con trailer, lo que el PRINCIPIO-010 permite. No está definida la frontera entre "asistir" (redactar en `docs/proposals/`) y "modificar" (editar `00-constitucion.md` en el disco del autor).
- **Sugerencia:** que el autor decida si acepta el riesgo y lo documente en el ADR-0005, o si agrega un control técnico. Por ejemplo, firmar los commits con una clave que el agente no tenga a su alcance, ejecutar el agente sin las credenciales del autor, o usar una identidad de Azure propia para dev sin permisos en producción. Aclarar en el 009.7 que el agente solo redacta propuestas en `docs/proposals/`, y que el autor es quien edita el archivo.

### R3-M07 · Las rutas protegidas no incluyen `CODEOWNERS` ni la configuración de los umbrales de calidad

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-009 ("Control técnico": solo `00-constitucion.md` y `.github/workflows/`), PRINCIPIO-009.5 (no modificar tests, linters, umbrales de cobertura ni pasos del CI), PRINCIPIO-010 ("Estilo": `TreatWarningsAsErrors=true`, ESLint, commitlint). ADR-0005, "CI check".
- **Problema:** el check rechaza los PR de la App solo en dos rutas. El archivo `CODEOWNERS` (en `.github/`, fuera de `workflows/`), los umbrales de cobertura y `TreatWarningsAsErrors` (en `.csproj` o `Directory.Build.props`), `.editorconfig`, la configuración de commitlint y ESLint, y los scripts que invocan los workflows viven fuera de esas rutas. Un PR de la App puede debilitarlos, y la única barrera es la revisión humana, que es justo lo que el control técnico debía reforzar. Si el check de rutas protegidas ejecuta scripts del checkout del PR, el PR también puede alterar el comportamiento del propio check.
- **Sugerencia:** que el autor decida si amplía la lista de rutas protegidas (por ejemplo, `.github/**`, los archivos de configuración de calidad y los scripts del CI) o si acepta el riesgo por escrito. Exigir en el ADR-0005 que el check no ejecute código del PR.

### R3-M08 · No se define quién registra `RequiresAccessibleElevator` ni con qué consentimiento

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-004.3, RN-006 (ejemplo de Rosa Huamán), RN-057 (antes del consentimiento solo nombre, correo y vínculo), RN-126 (archiva el indicador), RN-145 y RN-146 (solo el DNI, el carné y el teléfono son del titular). Matriz §2 (ninguna fila).
- **Problema:** el indicador se relaciona con la salud. Ninguna regla ni fila de la matriz dice si lo registra el titular o el Administrator, ni si requiere un consentimiento específico. Por omisión, el Administrator podría marcarlo desde el padrón (fila R2 de la matriz), incluso antes del consentimiento, lo que contradice RN-057. Tampoco se dice quién puede verlo, por ejemplo el Concierge.
- **Sugerencia:** que el autor decida quién lo registra, quién lo ve y bajo qué consentimiento (validarlo dentro de Q18), y agregar la regla y la fila de la matriz correspondientes.

### R3-M09 · RN-036 y la matriz E3 limitan a Resident y NonResidentOwner una restricción que el alcance aplica a todo el acceso financiero

- **Tipo:** Contradicción
- **Severidad:** MEDIA
- **Ubicación:** Alcance §5, "De acceso y permisos" ("En M5 y M6 quien tiene acceso financiero [...] **nunca** morosidad, datos de residentes ni datos de unidades específicas"). Glosario #19 ("sin datos de residentes ni de unidades específicas"). Contra RN-036 ("en las vistas financieras de los roles Resident y NonResidentOwner") y la matriz E3 ("Without unit-specific data for R-Own and NRO").
- **Problema:** según RN-036 y la matriz, un BoardMember puede ver un gasto como "Reparación de tubería en Dpto. B-1203", mientras que el alcance y el glosario lo prohíben para cualquiera con acceso financiero. Un agente que implemente la vista del BoardMember no sabe qué texto usar.
- **Sugerencia:** decidir si el BoardMember y el Administrator pueden ver datos de unidades específicas en M5 y M6, y alinear RN-036, la matriz E3, el alcance §5 y el glosario #19.

---

## BAJAS

### R3-B01 · Debilidades EARS en las reglas nuevas

- **Tipo:** Debilidad de formato
- **Severidad:** BAJA
- **Ubicación y problema:**
  - **RN-132, RN-133 y RN-135:** el evento "vuelve" no es observable ni está en el glosario (ver R3-M04).
  - **RN-134:** es circular: "cuando esa persona acepta una invitación, el sistema DEBE permitirle iniciar sesión [...] para aceptarla".
  - **RN-140:** combina un estado ("no ha enrolado su TOTP") con un evento ("inicia sesión"). Le corresponde el patrón Complex, no Event-driven.
  - **RN-145:** mezcla un permiso ("DEBE permitir que solo el titular") con una precondición que ya cubren RN-010 y RN-057, y se superpone con la prohibición de RN-146.
  - **RN-151:** tiene dos obligaciones (enviar el enlace y mantener el correo anterior).
  - **RN-142:** agrega una segunda obligación en otra oración ("siguen visibles en el detalle").
  - **RN-069:** incluye texto normativo dentro de la línea del código de error.
  - **RN-073:** la excepción "salvo para aceptar una invitación (RN-134)" solo aparece en el ejemplo, no en el texto de la regla.
  - **RN-136:** "aplica [...] el fin de los vínculos" es vago, porque un vínculo termina por fecha (glosario #6) y no se dice qué hace el job con él.
- **Sugerencia:** dividir las reglas compuestas, reescribir los disparadores como eventos observables y llevar las excepciones al texto de la regla.

### R3-B02 · La normalización del teléfono y del documento solo aparece en los ejemplos

- **Tipo:** Ambigüedad
- **Severidad:** BAJA
- **Ubicación:** RN-150 ("guarda los tres como `987654321`" solo en el ejemplo), RN-149, ADR-0004 ("More Information").
- **Problema:** el texto de RN-150 valida, pero no obliga a guardar el valor normalizado. No se dice qué pasa con `51987654321` (sin `+`), `0051…` ni los paréntesis. En el documento, el orden entre validar y normalizar no está fijado (ver R3-M02).
- **Sugerencia:** agregar una regla de normalización y almacenamiento para el teléfono y el documento, con ejemplos de esos casos.

### R3-B03 · RN-151 y RN-152 no tienen respaldo en el ADR-0008

- **Tipo:** Inconsistencia (trazabilidad)
- **Severidad:** BAJA
- **Ubicación:** RN-151 y RN-152 ("Fuente: [...] ADR-0008 (OWASP ASVS V2.5)"); ADR-0008, tabla "Values" (no tiene fila para el cambio de correo); RN-074 (la lista de temas no incluye el cambio de correo).
- **Problema:** el valor de 1 h y el aviso al correo anterior se atribuyen a un ADR que no los contiene. Además, en ASVS 4.0 la sección V2.5 trata la recuperación de credenciales, y el aviso por cambio de correo parece corresponder a otro requisito (V2.2.3). Conviene verificar el identificador.
- **Sugerencia:** agregar al ADR-0008 y a RN-074 la fila del cambio de correo, aceptada por el autor, con el identificador ASVS verificado.

### R3-B04 · Términos nuevos sin definir en el glosario

- **Tipo:** Inconsistencia de glosario
- **Severidad:** BAJA
- **Ubicación:** Glosario #17, #44 y #48. RN-131, RN-132, RN-138, RN-139, RN-145 y RN-152.
- **Problema:**
  - Se usan sin definir: "plazo de retención", que RN-131 "anula" y que parece una entidad guardada; "volver", "titular", "perfil" o "Mi perfil", "correo de acceso" e "invitación anulada".
  - El glosario #17 no menciona la invitación del nuevo Administrator en un traspaso (RN-063) ni el estado anulado (RN-138, RN-139).
  - El glosario #44 dice que el proceso de plataforma "asigna BoardMember", pero RN-066 y la fila P4 de la matriz dicen "asigna o revoca".
  - El glosario #48 dice "correo y DNI" (ver R3-M02).
  - RN-138 exige saber "con qué rol" se emitió cada invitación, y ese dato no figura en el término Invitación.
- **Sugerencia:** agregar los términos y completar las definiciones #17, #44 y #48.

### R3-B05 · Las filas P9 y R10 de la matriz son por condominio, pero el TOTP y el correo son de la cuenta

- **Tipo:** Inconsistencia
- **Severidad:** BAJA
- **Ubicación:** Matriz P9 (Adm y Brd 🔸; R-Own y el resto ⛔), R10. RN-008 y RN-141 (TOTP de la cuenta global). Regla 3 de la matriz (permisos del condominio actual).
- **Problema:** Ana es BoardMember en "Residencial Los Olivos" y solo Resident en "Torres del Parque". Si entra a "Torres del Parque", su columna es R-Own y la fila P9 le niega regenerar los códigos de recuperación de su cuenta, aunque RN-141 se lo permite.
- **Sugerencia:** declarar en la matriz que P9 y R10 se evalúan sobre la cuenta y no sobre el condominio actual, o condicionar P9 a "la cuenta tiene un rol con MFA en algún condominio".

### R3-B06 · El log de auditoría no registra los cambios de identidad

- **Tipo:** Regla faltante
- **Severidad:** BAJA
- **Ubicación:** RN-059 (solo vínculos y roles), RN-062, glosario #50, RN-140, RN-141, RN-145, RN-151 y RN-152.
- **Problema:** el cambio de correo de login, el registro o el cambio del DNI y del teléfono, el enrolamiento del TOTP y la regeneración de códigos no dejan rastro. Por eso un cambio de correo hecho por un atacante (el contraejemplo de RN-152) no se puede investigar.
- **Sugerencia:** que el autor decida qué eventos de identidad entran al log (sin datos en claro, RN-129) y lo agregue a RN-059 o a una regla nueva.

### R3-B07 · `05-preguntas-abiertas.md` está desalineado con la sección 9 de las reglas

- **Tipo:** Inconsistencia (editorial)
- **Severidad:** BAJA
- **Ubicación:** Encabezado de [05-preguntas-abiertas.md](05-preguntas-abiertas.md) ("Última actualización: 2026-11-01", aunque contiene respuestas del 2026-11-02). Columna "Reglas afectadas" de Q21 (sin RN-087), Q28 (sin RN-106) y Q30 ("RN-032 a RN-037"), frente a la sección 9 de las reglas (Q30: RN-037 y RN-095).
- **Problema:** las dos fuentes no coinciden en qué reglas cambian si se responde una pregunta.
- **Sugerencia:** actualizar la fecha y unificar la columna "Reglas afectadas" con la sección 9.

---

## Puntaje de madurez

**3.5 / 5: sin defectos críticos y con el núcleo de identidad mucho más completo, pero todavía no listo para que lo ejecuten agentes sin supervisión.**

**Avances desde la reauditoría 2:**
- Se resolvieron los dos CRÍTICOS y 10 de los 11 ALTOS, con reglas EARS nuevas, ejemplos con fechas correctas y filas de la matriz con su test (RN-131 a RN-153, R8 a R10).
- El flujo de trabajo en GitHub ya se puede ejecutar: el autor puede mergear, el check se ejecuta desde `main`, hay dos rulesets y la App no tiene el permiso `workflows`. Lo que falta comprobar está registrado como tarea de la semana 1.
- La retención ya no destruye referencias (RN-127 y `DeleteBehavior.Restrict`), y los eventos por fecha tienen un componente autorizado (`OccupancyLifecycleJob`).
- Las herramientas exigidas (`tlsx` y Locust) son compatibles con el PRINCIPIO-002.

**Por qué no llega a 4:**
1. **Cinco ALTAS abiertas**, cuatro de ellas introducidas por las correcciones. Afectan al módulo de usuarios (umbral del 90 %) y a un job irreversible: el cambio de correo (R3-A03), las contradicciones de RN-153 (R3-A02), los vínculos futuros frente a la retención (R3-A04) y el ámbito del consentimiento (R2-A04). La quinta afecta al control técnico del PRINCIPIO-009.1 (R3-A01).
2. **22 MEDIAS arrastradas sin cambios**, la mayoría sobre funcionalidades Must: retención (M01), autorización (M03, M04), portería (M15), reservas (M14, M16, M18), contrataciones (M11 a M13) y consentimiento (M08). Un agente las resolvería por su cuenta, lo que contradice la restricción de no inventar reglas de negocio.
3. La trazabilidad sigue incompleta: el pack cita documentos que no incluye (R2-M23), y la versión de la constitución no está propagada (R2-B01).

**Qué falta para llegar a 4:**
- Resolver las cinco ALTAS: R3-A01, R3-A02, R3-A03, R3-A04 y R2-A04.
- Ejecutar y documentar la verificación de la semana 1 en GitHub (ADR-0005), incluido el caso negativo de R3-A01.
- Resolver las MEDIAS que bloquean Must de identidad y retención: R2-M01, R2-M03, R2-M08, R3-M01, R3-M02, R3-M03 y R3-M04.

**Qué falta para llegar a 5:**
- Cerrar las demás MEDIAS de funcionalidades Must: R2-M04 a R2-M06, R2-M09 a R2-M18, R2-M21 y R3-M05 a R3-M09.
- Incluir en el pack Q19 y Q20, o el documento de preguntas abiertas completo (R2-M23).
- Propagar la versión 1.4 de la constitución y limpiar los restos editoriales (R2-B01 y R2-B02).
- Dividir las reglas compuestas (R2-B03 y R3-B01), para que cada regla tenga un solo test.
