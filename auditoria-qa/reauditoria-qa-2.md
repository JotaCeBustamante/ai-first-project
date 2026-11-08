# CondoHub — Reauditoría QA 2 del Spec Pack

> **Fase:** Validación (Agente QA, BMAD)
> **Fecha:** 2026-11-02
> **Rol:** QA Senior y Abogado del Diablo
> **Insumo revisado:** Spec Pack completo contenido en `agente-qa.xml`: constitución 1.2, project brief, alcance, reglas de negocio (RN-001 a RN-130), glosario, ADR-0001 a ADR-0009 y matriz de permisos.
> **Método:** se leyó el pack completo. Cada hallazgo cita la regla o sección exacta donde está el defecto. Antes de registrarlo se comprobó que ninguna otra parte del pack lo resuelve. No se reportan los temas que el pack ya marca como pendientes con ⚠️ o en la sección "Gaps" de la matriz, salvo cuando la marca no basta (por ejemplo, porque falta en la regla afectada).
> **Identificadores:** R2-Cnn (CRÍTICA), R2-Ann (ALTA), R2-Mnn (MEDIA), R2-Bnn (BAJA).

## Resumen

| Severidad | Cantidad |
|---|---|
| CRÍTICA | 2 |
| ALTA | 11 |
| MEDIA | 23 |
| BAJA | 9 |
| **Total** | **45** |

Cada hallazgo indica su tipo: contradicción, regla faltante, ambigüedad, inconsistencia de glosario o debilidad de formato. Algunos combinan dos tipos.

---

## CRÍTICAS

### R2-C01 · Nadie puede aprobar los cambios en `.github/workflows/` ni en la constitución

- **Tipo:** Contradicción
- **Severidad:** CRÍTICA
- **Ubicación:** Constitución, encabezado ("Solo un humano puede modificar este archivo, mediante un PR aprobado"), PRINCIPIO-009 ("Control técnico": "1 aprobación salvo la excepción del autor del PRINCIPIO-010") y PRINCIPIO-010 ("Flujo"). ADR-0005, "Author exception". Alcance §0 (fila de cobertura y CI: "El pipeline completo se construye en la semana 1") y §7 D3. ADR-0006, "Decision Outcome".
- **Problema:** el PRINCIPIO-010 dice: "La excepción nunca aplica [...] a los cambios en `00-constitucion.md` o `.github/workflows/`, que además exigen un ADR aceptado en el mismo PR". Por lo tanto, esos PR necesitan 1 aprobación humana. El pack reconoce en tres lugares que esa aprobación no existe:
  - ADR-0005, contexto: "Nobody can approve the author's own PRs", y GitHub no permite autoaprobarse.
  - Hay un solo autor humano (brief §7, "Individual").
  - La GitHub App de los agentes "cannot approve or merge PRs" (ADR-0005; alcance §5).

  Consecuencias:
  1. **El CI de la semana 1 no se puede construir ni cambiar.** Todo el pipeline obligatorio (xUnit, Playwright, axe, CodeQL, Postman CLI, gitleaks, commitlint, Lighthouse CI y Locust) vive en `.github/workflows/`. Cada PR que lo toque necesita una aprobación que nadie puede dar, y además un ADR aceptado por cada cambio de workflow.
  2. **La constitución no se puede enmendar.** El alcance D3 y el ADR-0006 exigen, antes de operar con datos reales, "enmendar el PRINCIPIO-004.5 mediante un PR y un ADR aprobados por el autor", que es justo lo que la regla impide.
  3. **El historial del pack es incoherente.** Las versiones 1.1 y 1.2 de la constitución se adoptaron (ADR-0009, "Adopted on 2026-11-02") con una regla que hace imposible ese merge, así que o se violó el proceso o la regla no se cumple en GitHub.

  Un agente que deba tocar un workflow choca con un principio no negociable, y la constitución le ordena detenerse y escalar. Esto pasaría en la primera semana.
- **Sugerencia:** el autor debe decidir un mecanismo que se pueda ejecutar. Hay tres opciones:
  - (a) un segundo revisor humano solo para esas rutas, que es la opción 2 que el ADR-0005 descartó;
  - (b) permitir que el autor haga merge sin aprobación también en esas rutas, con el ADR aceptado y los checks en verde como única condición;
  - (c) separar ambas rutas: los workflows con la excepción del autor y la constitución con un revisor externo.

  La decisión debe registrarse en un ADR y en una versión nueva de la constitución. También hay que aclarar si "un ADR aceptado en el mismo PR" aplica a cualquier cambio de workflow o solo a los que debilitan controles.

### R2-C02 · La seudonimización borra la ficha `Person` que siguen referenciando reservas, decisiones e ingresos

- **Tipo:** Contradicción / Ambigüedad
- **Severidad:** CRÍTICA
- **Ubicación:** RN-127 (ejemplo: "su ficha ya no está en SQL Server. Sus reservas conservan `PersonId`"), RN-061, RN-130. ADR-0002, "Decision Drivers" ("Keep referential integrity of reservations, check-ins and hire decisions") y "Pseudonymization". Glosario #47.
- **Problema:** las reglas piden dos cosas a la vez: eliminar la ficha `Person` de SQL Server (RN-127) y que las reservas, las decisiones de contratación (`decidedBy`) y las entradas del log de auditoría sigan apuntando a ese `PersonId` (RN-061, RN-130). El ADR-0002 además pone la integridad referencial como requisito. Sin una entidad que sobreviva (un registro "tombstone" sin datos personales), el agente tiene tres caminos y todos son malos:
  - (1) quitar las claves foráneas, con lo que se pierde la integridad que exige el ADR-0002;
  - (2) usar el comportamiento por defecto de EF Core para relaciones requeridas, que es el **borrado en cascada**, con lo que `DataRetentionJob` borraría las decisiones sobre contrataciones y las reservas. Ese es justo el contraejemplo de RN-061, y es irreversible;
  - (3) no borrar la ficha, lo que contradice RN-127.

  Es una operación destructiva e irreversible que se ejecuta sola todos los días y cuya implementación queda abierta a interpretación.
- **Sugerencia:** decidir y escribir en RN-127 y en el ADR-0002 qué queda en la base operativa. Por ejemplo: la fila `Person` se conserva solo con `Id`, `CondominiumId` y una marca `ArchivedAt`, y se eliminan todos los demás campos. Fijar también en una regla que las relaciones hacia `Person` usan `DeleteBehavior.Restrict` (sin cascada). Agregar un test que archive a un BoardMember y verifique que su decisión sigue existiendo.

---

## ALTAS

### R2-A01 · El commit de una enmienda lleva el trailer que el CI rechaza

- **Tipo:** Contradicción
- **Severidad:** ALTA
- **Ubicación:** ADR-0009, "More Information" ("the commit that records it includes the `Co-Authored-By` trailer"). PRINCIPIO-009 ("Todo commit generado o asistido por IA incluye el trailer" y el "Control técnico"). ADR-0005, "CI check" (b).
- **Problema:** el ADR-0009 dice que la enmienda se redactó con asistencia de IA y que su commit lleva el trailer `Co-Authored-By` de un agente, como exige el PRINCIPIO-009. Pero el check del ADR-0005 falla si "any commit in the PR carries an agent's `Co-Authored-By` trailer" y el diff toca `00-constitucion.md`. Las dos reglas juntas hacen que cualquier enmienda asistida por IA quede rechazada por el propio control. Así habría pasado con la versión 1.1 de la constitución, y pasará con cualquier enmienda futura, como la del PRINCIPIO-004.5 (D3).
- **Sugerencia:** decidir si una enmienda de la constitución puede ser asistida por IA. Si puede, el check debe distinguir "abierto por la GitHub App" de "commit del autor humano con trailer". Si no puede, hay que corregir el ADR-0009 y prohibir la asistencia de IA en esos commits.

### R2-A02 · El control técnico que protege la constitución y los workflows se puede evadir

- **Tipo:** Regla faltante
- **Severidad:** ALTA
- **Ubicación:** PRINCIPIO-009 ("Control técnico"). ADR-0005, "CI check" y "Confirmation" ("A branch protection rule or ruleset on `main` lets only the author's account bypass the approval requirement").
- **Problema:** el control depende de supuestos que el pack no fija:
  1. El check es un workflow dentro de `.github/workflows/`. Con el evento `pull_request`, GitHub ejecuta la versión del workflow que trae el propio PR, así que un PR puede desactivar el check que debería rechazarlo. No se exige `pull_request_target`, un workflow requerido por ruleset ni que la GitHub App no tenga el permiso `workflows`.
  2. La detección (b) depende de un trailer que pone quien escribe el commit. Un agente que trabaja en local con la identidad del autor, sin la GitHub App, produce PR "del autor" que se pueden mergear sin aprobación. El PRINCIPIO-010 prohíbe eso, pero nada lo detecta.
  3. En un ruleset, el permiso de bypass evita **todas** las reglas del ruleset, incluidos los status checks obligatorios. Si se configura como describe el ADR-0005, el autor podría mergear con checks en rojo, lo que viola el PRINCIPIO-010.
- **Sugerencia:** detallar en el ADR-0005 la configuración exigida:
  - el check como workflow requerido desde `main`, o con `pull_request_target`, sin ejecutar código del PR;
  - la GitHub App sin el permiso `workflows`;
  - el bypass de aprobación en una regla separada de la regla de status checks, que no tenga bypass;
  - una regla explícita de que los agentes solo empujan código con la identidad de la GitHub App.

### R2-A03 · `testssl.sh`, que se exige como evidencia, tiene licencia GPL

- **Tipo:** Contradicción
- **Severidad:** ALTA
- **Ubicación:** PRINCIPIO-005, ejemplo de cumplimiento ("Un escaneo con `testssl.sh` confirma..."). RN-013, ejemplo. Contra el PRINCIPIO-002 ("las dependencias con licencia GPL o AGPL [...] sean de runtime o de desarrollo"; herramientas de CI "nunca GPL ni AGPL").
- **Problema:** `testssl.sh` se distribuye con licencia GPL-2.0. El pack ya corrigió el mismo caso con k6 (ADR-0007: "k6 [...] cannot be used: its license is AGPL-3.0"), pero dejó `testssl.sh` como ejemplo de cumplimiento en la constitución y en RN-013. Un agente que implemente el test de RN-013 en el CI viola el PRINCIPIO-002 o tiene que detenerse y escalar. Es el mismo bloqueo del "día 1" que el ADR-0009 quería eliminar.
- **Sugerencia:** reemplazar la herramienta del ejemplo por una con licencia permitida o por una verificación propia (por ejemplo, un test de integración que intente un handshake con TLS 1.1 o con cifrados CBC usando las APIs de .NET). Registrar el cambio en la próxima enmienda (los ejemplos los cubre M-18). Pedir que el escaneo de licencias del CI incluya las herramientas que se invocan fuera de los gestores de paquetes.

### R2-A04 · RN-127 puede borrar datos de la cuenta global al archivar a una persona en un solo condominio

- **Tipo:** Ambigüedad
- **Severidad:** ALTA
- **Ubicación:** RN-127 ("su `PasswordHash`, su secreto TOTP, sus códigos de recuperación y los índices ciegos de su correo y su DNI en ese condominio"), RN-126 ("sus registros de consentimiento"). Glosario, tabla de campos (`PasswordHash` en la entidad `User`) y #42. RN-012 ("para el usuario de Carla"). RN-121, RN-128.
- **Problema:** `PasswordHash`, TOTP y códigos de recuperación son datos de la **cuenta global** `User` (glosario), y el consentimiento se registra por usuario (RN-012). Pero RN-127 los borra cuando se archiva **una** ficha `Person`, y el alcance de "en ese condominio" no queda claro. Si Ana sale de "Residencial Los Olivos" y sigue activa en "Torres del Parque", leer RN-127 al pie de la letra le borra la contraseña y el TOTP, y RN-126 le archiva su consentimiento. Ana no podría entrar al condominio donde sigue activa. Lo mismo pasa con el índice ciego del correo, que en `User` es global (RN-121) y en `Person` es por condominio (RN-068). Además, no se define si el consentimiento es por usuario o por condominio, y eso depende de quién es el titular del banco de datos (Q18).
- **Sugerencia:** separar RN-127 en dos reglas: (1) al archivar una `Person`, se borran solo los datos de esa ficha, incluido su índice ciego por condominio; (2) los datos de `User` (hash, TOTP, códigos, índice global, consentimientos) se borran solo cuando aplica RN-128. Decidir además el ámbito del consentimiento (por usuario o por condominio) y reflejarlo en RN-010, RN-012 y RN-126.

### R2-A05 · Falta definir la reactivación y qué pasa con el plazo de retención si la persona vuelve

- **Tipo:** Regla faltante
- **Severidad:** ALTA
- **Ubicación:** RN-005, RN-072, RN-073, RN-122, RN-126, RN-068. Glosario #42 y #52.
- **Problema:** caso concreto. El vínculo de Carla termina el 2027-01-31 y su cuenta se desactiva el 2027-02-01 (RN-073). El 2027-03-01 Carla vuelve a alquilar en el mismo condominio o en otro.
  - **Otro condominio:** RN-122 exige que inicie sesión con su cuenta existente para aceptar la invitación, pero la cuenta está desactivada y "no puede iniciar sesión" (RN-073). Por RN-121 tampoco se le puede crear otra cuenta, así que queda bloqueada sin salida.
  - **Mismo condominio:** su ficha todavía existe porque no se ha archivado, así que RN-068 rechaza registrarla de nuevo con `EMAIL_ALREADY_REGISTERED`. Ninguna regla dice que se reutiliza la ficha existente.
  - **Plazo de retención:** RN-005 fija el inicio del plazo, pero ninguna regla dice que un vínculo o rol nuevo lo anula. Si el agente guarda la fecha de vencimiento, RN-126 y RN-127 archivan y borran el 2027-05-01 a una inquilina activa. El borrado es irreversible.
- **Sugerencia:** agregar reglas para: (1) la reactivación de una cuenta desactivada cuando la persona recibe una invitación o un vínculo nuevo; (2) la reutilización de la ficha `Person` existente en el mismo condominio; (3) que un vínculo o rol activo nuevo anula el plazo de retención en curso, y que el plazo se recalcula, no se guarda.

### R2-A06 · Ningún componente autorizado ejecuta los eventos por fecha ni las evaluaciones entre condominios

- **Tipo:** Regla faltante / Contradicción
- **Severidad:** ALTA
- **Ubicación:** RN-060 ("Cuando termina el último vínculo activo"), RN-073 ("en todos sus condominios"), RN-085 ("Cuando termina la franja"), RN-104 y ADR-0003 (lista cerrada de 5 procesos y test de arquitectura que "fails the build").
- **Problema:** varios eventos ocurren porque pasa el tiempo, sin ninguna solicitud de usuario. Por ejemplo, la `EndDate` de un vínculo es inclusiva y se registra con anticipación (glosario #6), y la franja de una reserva termina a una hora fija. Además, RN-073 obliga a revisar los vínculos y roles de la persona **en todos los condominios**, lo que necesita `IgnoreQueryFilters()`. Ningún componente de la lista cerrada (login, invitaciones, `DataRetentionJob`, seeders, CLI de plataforma) tiene estas tareas. El agente tiene tres opciones:
  - (a) crear otro job, que el test de arquitectura rechaza y que viola el PRINCIPIO-003;
  - (b) meter la lógica en `DataRetentionJob`, que es un uso no documentado del job;
  - (c) evaluar de forma diferida al iniciar sesión, lo que contradice "desde el 2027-02-01" en RN-060 y RN-073.
- **Sugerencia:** decidir qué componente ejecuta las transiciones por fecha (revocación de roles, desactivación de cuentas, paso a `Completed`) y con qué frecuencia. Agregarlo al ADR-0003 y a RN-104 si necesita consultas entre condominios, o escribir que esos estados se calculan al leerlos y no se guardan.

### R2-A07 · No se define qué pasa con las sesiones abiertas cuando se revoca un rol

- **Tipo:** Regla faltante
- **Severidad:** ALTA
- **Ubicación:** RN-063 (contraejemplo: "El Administrator saliente sigue entrando después del traspaso"), RN-060, RN-066, RN-105, RN-114.
- **Problema:** solo la política financiera se evalúa contra la base de datos en cada solicitud (RN-105). Para los demás roles, ninguna regla dice si una sesión ya abierta pierde los permisos al revocarse el rol. Una sesión puede durar hasta 12 h (RN-114). Durante un traspaso de administradora, que el brief §1 presenta como el dolor central de confianza, el Administrator saliente con sesión abierta podría seguir registrando o anulando gastos, cambiando vínculos o invitando personas durante horas. El contraejemplo de RN-063 solo habla de "entrar", no de las sesiones activas. Tampoco se dice qué pasa con las invitaciones que emitió la administradora saliente y que siguen vigentes 7 días (RN-110).
- **Sugerencia:** agregar una regla según la cual los roles se evalúan contra la base de datos en cada solicitud, o la revocación de un rol invalida las sesiones del usuario en ese condominio. Agregar otra regla que anule las invitaciones pendientes de la administradora saliente al ejecutarse el traspaso.

### R2-A08 · El glosario lista `Rejected` como estado de la contratación y RN-096 lo prohíbe

- **Tipo:** Inconsistencia de glosario / Contradicción
- **Severidad:** ALTA
- **Ubicación:** Glosario, "Identificadores de campos usados en las reglas", fila `Draft`, `Submitted`, `Approved`, `Rejected` | `SupplierHire` | "Estados de la contratación (A-06)". Contra RN-096 ("Un rechazo no es un estado"), RN-098 y glosario #29.
- **Problema:** la tabla dice que "el código debe usar con este nombre" e incluye `Rejected` entre los estados, mientras que RN-096 y el término #29 dicen que el rechazo es una decisión y no un estado. Un agente que genere el enum desde esa tabla crearía el estado `Rejected`, que es justo el contraejemplo de RN-096.
- **Sugerencia:** dejar en la fila solo `Draft`, `Submitted` y `Approved`. Agregar una fila aparte para los valores de la decisión (`Approved`, `Rejected`) del historial de decisiones (RN-040).

### R2-A09 · El ciclo de vida del MFA está incompleto y es ambiguo con roles por condominio

- **Tipo:** Ambigüedad / Regla faltante
- **Severidad:** ALTA
- **Ubicación:** RN-008, RN-064, RN-112, RN-062. ADR-0003, "Platform process" ("reset an Administrator's MFA"). Matriz P3. Glosario #44.
- **Problema:**
  1. Los roles son por condominio (RN-065), pero la cuenta es global y el TOTP se pide "antes de crear la sesión" (RN-008), igual que la elección del condominio (RN-064). No se define el orden de los pasos ni si Ana, que es BoardMember en "Residencial Los Olivos", tiene que dar el TOTP al entrar a "Torres del Parque", donde solo es Resident.
  2. No se dice **cuándo** se obliga a enrolar el TOTP. RN-112 solo habla de lo que pasa al terminar el enrolamiento. Queda abierto qué pasa cuando a un Resident ya activo le asignan BoardMember por el proceso de plataforma.
  3. El restablecimiento del MFA solo existe para el Administrator (RN-062, P3). Un BoardMember que pierde su celular y sus 10 códigos queda bloqueado para siempre, y no puede decidir contrataciones (M6).
  4. No se define si los códigos de recuperación se pueden regenerar, ni si cuentan para el bloqueo de RN-111.
- **Sugerencia:** agregar reglas que fijen: el orden login → TOTP → selector (o selector → TOTP); si el MFA se exige por cuenta (cuando tiene un rol con MFA en cualquier condominio) o por condominio; el enrolamiento obligatorio en el primer inicio de sesión después de asignarse un rol con MFA; el restablecimiento del MFA de un BoardMember por el proceso de plataforma; y la regeneración de los códigos de recuperación.

### R2-A10 · No se define si los gastos anulados cuentan en los totales ni a qué mes va cada gasto

- **Tipo:** Ambigüedad
- **Severidad:** ALTA
- **Ubicación:** RN-035 ("el total de ese mes por categoría"), RN-092, RN-094 (gastos de hasta 12 meses atrás).
- **Problema:** RN-092 obliga a mostrar los gastos anulados, pero RN-035 no dice si se suman al total. Tampoco dice si "los gastos de un mes" se agrupan por la fecha del gasto o por la fecha de registro. Como RN-094 acepta gastos de hasta 12 meses atrás, los totales de meses que los propietarios ya vieron pueden cambiar sin aviso. El caso de RN-092 ("se registra de nuevo por S/ 1,000.00") contaría S/ 2,200.00 si el agente suma también el gasto anulado. Ese total es el número central del beneficio 2 ("ver en qué se gasta cada sol").
- **Sugerencia:** escribir una regla que excluya explícitamente los gastos anulados de los totales (o que los muestre aparte) y que agrupe por la fecha del gasto. Decidir también si un gasto registrado con fecha de un mes ya mostrado debe marcarse como "registrado después".

### R2-A11 · No hay regla ni fila de la matriz para que el titular registre su DNI y su teléfono

- **Tipo:** Regla faltante
- **Severidad:** ALTA
- **Ubicación:** Alcance M1 ("El DNI y el teléfono los ingresa el titular después de aceptar el consentimiento"), RN-057 (ejemplo: "recién entonces registra su DNI y su teléfono"). Matriz §2 (R2 solo para Adm; R4 solo "Read own contact data"), regla ⛔ de la matriz ("Denied by default").
- **Problema:** el flujo principal de M1 dice que el titular completa su DNI y su teléfono, pero la matriz no tiene ninguna fila para editar el propio perfil. Por la regla de mínimo privilegio, esa acción queda ⛔ para todos. Tampoco hay reglas para:
  - validar el formato del DNI (8 dígitos) y del carné de extranjería;
  - validar el teléfono;
  - definir si el Administrator puede ingresar esos datos después del consentimiento;
  - definir si el titular puede cambiar su correo, que es su identificador de login y tiene índice ciego.

  Además, RN-069 rechaza un DNI repetido, pero no aclara quién lo ve: ese error le confirmaría al titular que el DNI pertenece a otra persona del condominio.
- **Sugerencia:** agregar una fila en la matriz ("Edit own contact data") y reglas con códigos de error para el formato del DNI, del carné de extranjería y del teléfono, y para el cambio de correo. Decidir cómo se comunica `DOCUMENT_NUMBER_ALREADY_REGISTERED` sin revelar a la otra persona.

---

## MEDIAS

### R2-M01 · Las fechas de inicio de la retención se cuentan de formas distintas

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** RN-005 (ejemplo de Carla: vence el 2027-05-01), RN-060 ("Desde el 2027-02-01 Carla ya no tiene el rol Resident"), RN-028 (cuenta desde un instante: "2027-03-12T23:00:00-05:00"), RN-126.
- **Problema:** RN-005 toma "la más tardía" entre la `EndDate` y la fecha de revocación del último rol. Según RN-060, el rol de Carla se revoca el 2027-02-01, así que la fecha más tardía sería esa y el plazo vencería el 2027-05-02, no el 2027-05-01 que dice el ejemplo. Además, RN-005 cuenta con fechas (`DateOnly`) y RN-028 con fecha-hora, y no se fija a qué hora corre el job diario. Por eso no se puede escribir un test con valor exacto.
- **Sugerencia:** definir el instante de revocación (por ejemplo, el fin del día de la `EndDate` en `America/Lima`), si el plazo se cuenta en días calendario o en segundos exactos, y la hora de ejecución de `DataRetentionJob`. Corregir los ejemplos de RN-005 y RN-060 para que coincidan.

### R2-M02 · Vínculos con `StartDate` futura: invitación, consentimiento y estado de la cuenta

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** Glosario #6 ("Se pueden registrar una `StartDate` y una `EndDate` futuras"), RN-072, RN-073, RN-005, RN-122. Matriz, columna NRO.
- **Problema:** un inquilino cuyo contrato empieza el 2026-12-01 es registrado e invitado el 2026-11-20. Acepta la invitación, pero no tiene vínculos activos. RN-072 le impide entrar y RN-073 desactivaría la cuenta que se acaba de crear. No queda claro si RN-005 inicia el plazo de retención, porque la persona nunca "quedó" sin vínculos. Tampoco se dice si el Administrator puede invitar antes de la `StartDate`, ni cuándo se asigna el rol.
- **Sugerencia:** agregar una regla para las personas con solo vínculos futuros: si se les puede invitar, si se les asigna el rol, si pueden aceptar el consentimiento antes de la fecha y si eso inicia o no el plazo de retención.

### R2-M03 · RN-015 prohíbe lo que la unión de roles concede

- **Tipo:** Contradicción
- **Severidad:** MEDIA
- **Ubicación:** RN-015 ("Mientras un usuario con rol Resident o NonResidentOwner no tenga ningún vínculo activo con `OccupancyType = Owner` [...] NO DEBE mostrarle información financiera"). Matriz, regla 3 ("gets the union of their permissions"). Glosario #19. ADR-0001 (la política se concede a "Administrator and BoardMember").
- **Problema:** un usuario que es BoardMember o Administrator y también Resident con solo vínculo `Tenant` en el mismo condominio cumple la condición de RN-015, que **prohíbe** mostrarle información financiera. Al mismo tiempo, la política y la matriz se la **conceden**. Ninguna regla impide esa combinación: Marco sigue como BoardMember después de vender su unidad (RN-060) y podría alquilar otra. Tampoco se impide que un Administrator viva como inquilino.
- **Sugerencia:** reescribir RN-015 en términos de la política: "Mientras un usuario no cumpla `CanViewCondominiumFinancials`...". Otra opción es agregar "salvo que tenga rol Administrator o BoardMember".

### R2-M04 · Un BoardMember sin vínculo `Owner` mantiene sus permisos, y la pregunta no está marcada en las reglas

- **Tipo:** Inconsistencia de glosario / Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** Glosario #13 ("Rol de los propietarios elegidos"), RN-060 y RN-005 (Marco "conserva BoardMember" después de vender), ADR-0001 "Follow-up" y ADR-0003 "Open" (Q19), reglas §9 (Q19 no aparece en la tabla).
- **Problema:** el glosario define al BoardMember como propietario, y el ADR-0001 reconoce que la Ley N.° 27157 lo exige. Aun así, RN-060 establece como comportamiento correcto que un exdueño conserve el rol, con acceso financiero completo y poder de aprobar contrataciones. La duda está abierta en dos ADR, pero RN-060 no tiene ⚠️ y Q19 no figura en la tabla de la sección 9. Un agente implementaría la regla como definitiva.
- **Sugerencia:** marcar RN-060 y RN-039 con ⚠️ Q19, agregar Q19 a la tabla de la sección 9 y ajustar el glosario #13 ("propietarios elegidos; hoy el sistema no verifica que tengan un vínculo `Owner`").

### R2-M05 · No está claro qué es la "clave por titular" para los invitados

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** RN-108 ("una clave propia de ese titular"), RN-028, glosario #38 y #45, ADR-0002 ("Each data subject (person) has their own data encryption key").
- **Problema:** los invitados son titulares de datos, pero no son `Person` y no tienen ningún identificador estable entre reservas: no hay DNI (Q21) ni índice ciego. No se define si al archivar se crea una clave por invitado, por reserva o ninguna. Una clave por invitado implica miles de claves en Key Vault al año. Además, una cancelación ARCO de un invitado no podría ubicar sus registros, porque su nombre está cifrado de forma no determinista.
- **Sugerencia:** definir la granularidad de la clave para los invitados (por ejemplo, una por reserva) y cómo se ubican sus registros. Puede dejarse con ⚠️ hasta que se escriban las reglas de ARCO, pero debe constar en RN-108.

### R2-M06 · El log de auditoría que ve la Junta Directiva permite reidentificar a las personas

- **Tipo:** Contradicción (con el PRINCIPIO-006 y la intención de C-03)
- **Severidad:** MEDIA
- **Ubicación:** RN-124 (muestra "la unidad, el valor anterior y el nuevo"), RN-059, RN-130 (ejemplo: "A-704 · `Owner → Tenant`", "sin su nombre"), Matriz P7.
- **Problema:** la vista sin nombres muestra la unidad y el tipo de ocupación con su fecha. Un vecino que integra la Junta Directiva sabe quién vive en A-704, así que se entera de que Jorge vendió o de que la unidad se alquila, y de cuándo. Eso es un dato de un residente específico. RN-130 presenta como "sin su nombre" un registro que sigue identificando a la persona. M5 y RN-036 evitan este tipo de dato en las vistas financieras, pero el log no tiene una restricción equivalente.
- **Sugerencia:** decidir si la Junta Directiva necesita la unidad en el log. Si la necesita, documentar la base legal y la finalidad. Si no, mostrar solo el tipo de cambio, el cargo y la fecha, o datos agregados.

### R2-M07 · La autenticación permite enumerar cuentas y bloquearlas a propósito

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** RN-111 (`ACCOUNT_LOCKED`), RN-115, RN-074 (ASVS V2).
- **Problema:**
  - Solo una cuenta que existe puede bloquearse. Un atacante prueba 5 contraseñas y, si la respuesta es `ACCOUNT_LOCKED`, sabe que el correo está registrado.
  - Cualquiera puede bloquear 15 minutos, una y otra vez, la cuenta de un Administrator cuyo correo conozca.
  - No se define la respuesta de RN-115 para un correo que no existe.
  - No se dice si recuperar la contraseña exige igual el TOTP en el siguiente inicio de sesión.
  - No se dice si el bloqueo cuenta los intentos con códigos de recuperación.
- **Sugerencia:** agregar reglas para: una respuesta idéntica cuando el correo no existe y cuando la cuenta está bloqueada; un límite por IP o con retraso progresivo, además del bloqueo por cuenta; que recuperar la contraseña no omite el MFA; y que los códigos de recuperación cuentan para el bloqueo.

### R2-M08 · No se define qué pasa con quien rechaza el consentimiento ni con las versiones nuevas

- **Tipo:** Regla faltante / Contradicción
- **Severidad:** MEDIA
- **Ubicación:** RN-070 ("siguen las reglas normales de retención"), RN-010, RN-071, RN-057.
- **Problema:**
  1. La retención solo empieza cuando la persona queda sin vínculos ni roles (RN-005). Si Carla rechaza el consentimiento pero su vínculo sigue activo, su nombre y su correo se guardan sin plazo y sin consentimiento.
  2. No se dice si quien rechazó puede aceptar más tarde, ni qué pasa si una cuenta **ya activa** rechaza una versión nueva. RN-070 habla de "mantener sin activar".
  3. RN-010 bloquea el acceso "mientras" no se acepte la versión vigente, lo que implica un efecto inmediato. RN-071 lo pospone "a su siguiente inicio de sesión", así que no está claro qué pasa con las sesiones abiertas cuando se publica una versión nueva.
  4. Ninguna regla ni fila de la matriz dice quién publica una versión del consentimiento.
- **Sugerencia:** agregar reglas para el reintento de aceptación, el rechazo de una versión nueva, el efecto sobre las sesiones abiertas y quién publica las versiones (por ejemplo, el proceso de plataforma). Marcar RN-070 con ⚠️ Q18 por el tratamiento de datos sin consentimiento.

### R2-M09 · Faltan en el glosario los estados de la cuenta y varios términos y campos

- **Tipo:** Inconsistencia de glosario
- **Severidad:** MEDIA
- **Ubicación:** Glosario #42 y la tabla de campos. RN-070 ("sin activar"), RN-073 ("desactivar"), RN-128 ("eliminar"), RN-040, RN-084, RN-006, ADR-0004 (columna `Email`).
- **Problema:**
  - La cuenta tiene al menos cuatro estados que se usan pero no se definen: sin activar, activa, desactivada y eliminada. Tampoco se dice qué hace cada uno ni cómo se pasa de uno a otro.
  - Términos usados sin definir: "titular" (RN-108, glosario #45), "cargo" (RN-061, RN-130; no se dice si es el rol o su etiqueta "Junta Directiva"), "operador" (RN-062), `RetentionArchiveReader` y "vista financiera" (RN-036).
  - Campos usados en las reglas que no están en la tabla: `decision`, `decidedByRole`, `status`, `cancelledBy`, `cancelledAt`, `PersonId`, `Email` y `RequiresAccessibleElevator`.
  - La tabla mezcla PascalCase (`PasswordHash`) y camelCase (`consentVersion`, `decidedBy`) sin decir cuál vale para el código y cuál para el JSON.
- **Sugerencia:** agregar el término "Estado de la cuenta" con sus valores y transiciones, los términos que faltan y los campos que faltan. Fijar la convención de nombres (PascalCase en C# y camelCase en JSON, por ejemplo).

### R2-M10 · El glosario dice que "Supplier" solo nombra el rol, pero la entidad se llama `SupplierHire`

- **Tipo:** Inconsistencia de glosario
- **Severidad:** MEDIA
- **Ubicación:** Glosario, "Ambigüedad: supplier" ("`Supplier` en el código significa únicamente el rol"). Glosario #29 y #31 (`SupplierHire`, `SupplierHireFile`, "posible renombre [...] pendiente"). Matriz §6 (`Authz_SupplierHires_*`). ADR-0001 (`NonResidentOwner_CanReadSupplierHires_Returns200`).
- **Problema:** la regla del glosario se contradice con sus propios identificadores, con los tests y con los nombres de la matriz. El renombre "pendiente" afecta a entidades, endpoints, tests y al contrato OpenAPI: si se decide tarde, obliga a migrar todo.
- **Sugerencia:** decidir ahora entre `SupplierHire` y `VendorHire`. Si se mantiene `SupplierHire`, corregir la frase del glosario.

### R2-M11 · Al ciclo de vida de la contratación le faltan la elección, el retiro y la concurrencia

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** RN-096, RN-097 ("la cotización ganadora"), RN-038, RN-039, RN-040. Alcance M6 ("la justificación de la elección").
- **Problema:**
  1. "Cotización ganadora" aparece en RN-097, pero ningún campo ni regla dice cuál cotización o proveedor se eligió. La elección solo aparece en el texto libre de la justificación, así que el expediente no puede mostrar de forma estructurada "por qué se eligió a cada proveedor".
  2. No hay forma de retirar un `Draft` o un `Submitted`, ni de dejar sin efecto una contratación `Approved` si el proveedor no cumple. Esos registros quedan para siempre en el denominador de K5.
  3. No se dice qué pasa si dos BoardMember deciden al mismo tiempo (uno aprueba y otro rechaza). Q24 cubre el quórum, pero no la concurrencia.
- **Sugerencia:** agregar el campo de la cotización elegida con su regla (que pertenezca a la contratación), las reglas de retiro o cierre, y una regla de concurrencia del tipo "solo la primera decisión que se guarda". Si el autor lo prefiere, puede dejar estos puntos marcados como pendientes.

### R2-M12 · "Proveedores distintos" (RN-037) no se puede verificar

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** RN-037 ("cotizaciones de menos de 2 proveedores distintos"), RN-052 (el RUC 10 se cifra), ADR-0004 (índice ciego solo para el correo y el DNI). Glosario #16.
- **Problema:** no hay reglas sobre la identidad de un `Vendor`: unicidad del RUC en el condominio, formato de 11 dígitos, prefijo 10 o 20. Con dos registros de la misma empresa se cumple el mínimo de RN-037. Además, el RUC 10 se cifra sin índice ciego, así que no se puede comprobar su unicidad.
- **Sugerencia:** agregar reglas sobre la identidad del proveedor (formato y unicidad del RUC por condominio) y extender el ADR-0004 al RUC 10, o decidir otra forma de verificar la unicidad.

### R2-M13 · Vincular un gasto a una contratación contradice que el gasto sea inmutable

- **Tipo:** Contradicción
- **Severidad:** MEDIA
- **Ubicación:** RN-091 ("Si alguien intenta editar [...] un gasto registrado"), RN-095, Matriz H4 ("Link an expense to a hire" como acción separada).
- **Problema:** H4 presenta el vínculo como una acción posterior al registro, y eso modifica un gasto que RN-091 declara inmutable. No se dice si el vínculo solo puede hacerse al registrar el gasto, si se puede quitar ni qué pasa al anular un gasto vinculado.
- **Sugerencia:** decidir si el vínculo se define solo al registrar el gasto (y ajustar H4) o si es una entidad aparte que se puede agregar después, y escribir la regla correspondiente.

### R2-M14 · El límite mensual no dice qué reservas cuenta ni cubre la concurrencia

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** RN-080 ("ya tiene [...] el máximo de reservas"; el ejemplo dice "confirmadas"), RN-081 ("al mismo tiempo").
- **Problema:** no se dice si las reservas `Cancelled` y `Completed` cuentan para el límite. Si Ana cancela una, no está claro si recupera el cupo. RN-081 solo resuelve la concurrencia por superposición: dos personas de la misma unidad (dos `Tenant` de A-301, por ejemplo) pueden enviar a la vez reservas en franjas distintas y pasar ambas el límite mensual. "Al mismo tiempo" no es un valor que se pueda probar.
- **Sugerencia:** definir qué estados cuentan (por ejemplo, `Confirmed` y `Completed`), extender la garantía de RN-081 al límite mensual y reescribir RN-081 sin "al mismo tiempo" (por ejemplo, "si al guardar ya existe una reserva que se superpone...").

### R2-M15 · La portería no recibe a tiempo los invitados nuevos y faltan flujos alternos del ingreso

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** RN-026 (solo las cancelaciones, en 60 s), RN-086 (se pueden cambiar invitados hasta el inicio de la franja), RN-029, RN-030, RN-085.
- **Problema:** solo las cancelaciones tienen plazo de propagación. Si Ana agrega un invitado a las 18:50 o crea una reserva para el mismo día, no hay plazo para que aparezca en la portería. Si quita un invitado, tampoco hay plazo, así que alguien retirado podría seguir entrando. Tampoco se cubren estos casos:
  - un ingreso marcado dos veces;
  - un invitado que llega y no está en la lista;
  - un ingreso después de que la reserva pasa a `Completed`, cuando desaparece de la vista según RN-029 y RN-085;
  - cómo se deshace un ingreso marcado por error;
  - el ingreso del anfitrión y de los acompañantes.
- **Sugerencia:** extender el plazo de 60 s a las altas y bajas de invitados y de reservas. Agregar reglas, con códigos de error, para el ingreso duplicado y el ingreso fuera de la franja. Para el invitado que no está en la lista, señalar que falta la decisión (no inventarla).

### R2-M16 · No se define qué datos de reservas ajenas muestra la disponibilidad

- **Tipo:** Regla faltante
- **Severidad:** MEDIA
- **Ubicación:** Alcance M3 ("ven la disponibilidad"), Matriz B2, PRINCIPIO-006, RN-018.
- **Problema:** ninguna regla dice qué ve un residente de una franja ocupada: solo "ocupado", o también la unidad o el anfitrión. Si se muestra la unidad, se expone un dato de otro residente (PRINCIPIO-006).
- **Sugerencia:** agregar una regla para la vista de disponibilidad que muestre solo las franjas libres u ocupadas, sin la unidad ni las personas de reservas ajenas.

### R2-M17 · La asignación de Resident y NonResidentOwner y la gestión de los Concierge no tienen reglas

- **Tipo:** Regla faltante / Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** ADR-0003 ("`Resident` or `NonResidentOwner` is assigned by the Administrator when registering the occupancy"), RN-002 ("una persona con rol `NonResidentOwner`"), Matriz P6 y R2, RN-063.
- **Problema:**
  1. La asignación de Resident y NonResidentOwner solo aparece en un ADR. No hay ninguna regla con su condición, su código de error ni su fila en la matriz.
  2. RN-002 no limita el rol al mismo condominio. Luis es NonResidentOwner en "Residencial Los Olivos", así que una lectura literal rechaza también que sea `Tenant` en "Torres del Parque".
  3. El Administrator invita a los Concierge (P6), pero ninguna regla le permite revocarlos cuando un conserje deja el puesto. Hoy solo el traspaso de administradora los revoca (RN-063), y el sistema no registra a qué empresa pertenece cada Concierge.
- **Sugerencia:** agregar reglas para asignar y revocar los roles Resident, NonResidentOwner y Concierge, con su fila en la matriz. Escribir "en el mismo condominio" en RN-002.

### R2-M18 · RN-076 contradice el glosario #9 y la intención de RN-077 en unidades alquiladas

- **Tipo:** Contradicción
- **Severidad:** MEDIA
- **Ubicación:** Glosario #9 ("Si una unidad tiene un inquilino activo, solo él reserva a nombre de esa unidad"), RN-077, RN-076 ("También puede reservar a nombre de B-1203 aunque esté alquilada", con "una persona con vínculo activo en esa unidad como anfitriona").
- **Problema:** con RN-076, el Administrator puede reservar a nombre de una unidad alquilada con el **propietario** (Luis, que tiene vínculo `Owner` activo) como anfitrión. Así se evita la restricción de RN-077, y eso contradice el "solo él" del glosario.
- **Sugerencia:** decidir si, en una unidad alquilada, el anfitrión de una reserva hecha por el Administrator solo puede ser un `Tenant`, y ajustar RN-076 o el glosario.

### R2-M19 · RN-074 obliga a cumplir "ASVS 4.0 nivel 2" sin decir qué requisitos

- **Tipo:** Debilidad de formato (valor vago)
- **Severidad:** MEDIA
- **Ubicación:** RN-074, ADR-0008 ("chapters V2 Authentication and V3 Session Management").
- **Problema:** los capítulos V2 y V3 del nivel 2 tienen decenas de requisitos (rotación del token de sesión al autenticarse, cierre de sesión en todos los dispositivos, notificación del cambio de contraseña, etc.). Las reglas solo fijan 7 valores. Un agente no puede saber si los demás requisitos son obligatorios, y el ejemplo de RN-074 ("Cada valor [...] tiene su propia regla") no es verificable como regla independiente. Tampoco se fija la revisión exacta (4.0.3), y ya existe la versión 5.0 de ASVS.
- **Sugerencia:** convertir RN-074 en una lista cerrada de requisitos ASVS por identificador (por ejemplo, V2.1.1, V3.2.1, V3.3.1), o declarar explícitamente que solo son obligatorios los valores de RN-110 a RN-117. Fijar la revisión de ASVS.

### R2-M20 · Las condiciones para medir p95 y LCP en el CI no están definidas

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-010 ("Rendimiento [...] medidos en el CI"), ADR-0007, "Confirmation" ("The load test runs in the CI against the dev environment").
- **Problema:** no se define la carga (usuarios concurrentes o solicitudes por segundo), los endpoints, el volumen de datos sintéticos ni la duración de la prueba. Sin eso, "p95 < 500 ms" no se puede reproducir. Además, el entorno dev no contiene el código del PR mientras no se despliega, así que medir dev en cada PR no mide el cambio que se revisa.
- **Sugerencia:** fijar en el ADR-0007 el perfil de carga, el volumen de datos (por ejemplo, un condominio de 480 unidades), los endpoints y el entorno, que debe ser un despliegue efímero del PR o un paso posterior al despliegue en dev.

### R2-M21 · "Exactamente 2 decimales" (RN-093) depende de cómo se envía el monto

- **Tipo:** Ambigüedad
- **Severidad:** MEDIA
- **Ubicación:** RN-093.
- **Problema:** en JSON, `1200` y `1200.00` son el mismo número, y muchos clientes (JavaScript, por ejemplo) envían `1200`. Al pie de la letra, RN-093 rechazaría un monto válido según cómo lo serialice el cliente. No se fija si el monto viaja como cadena o como número.
- **Sugerencia:** fijar la representación del monto en la API (por ejemplo, un número con escala de 2 como máximo, o una cadena `"1200.00"`) y reescribir RN-093 como "más de 2 decimales".

### R2-M22 · TLS 1.3 obligatorio con Key Vault y Storage: no se verifica

- **Tipo:** Regla faltante (dependencia sin verificar)
- **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-005 ("TLS 1.3 obligatorio entre servicios internos (API ↔ Azure SQL, Key Vault, Storage)"), Alcance §6 (solo pide confirmar Azure SQL Database).
- **Problema:** el alcance solo registra la duda para Azure SQL Database. No hay ninguna tarea ni pregunta para confirmar que Key Vault y Blob Storage permiten **forzar** TLS 1.3 como versión mínima desde el cliente o el servicio, ni cómo se prueba en el CI. Si alguno no lo permite, el principio no se puede cumplir y el agente tiene que detenerse.
- **Sugerencia:** agregar en el alcance §6 la verificación para Key Vault y Storage, y un test o check de configuración. Si no se puede forzar en alguno, escalarlo como conflicto con la constitución.

### R2-M23 · El pack cita documentos que no incluye

- **Tipo:** Regla faltante (trazabilidad)
- **Severidad:** MEDIA
- **Ubicación:** Referencias a `05-preguntas-abiertas.md`, `auditoria-qa.md` (por ejemplo, RN-036 "06 M-20", RN-063 "06 C-06", RN-064 "06 C-07") y `docs/proposals/constitution-amendment-2026-11.md`. Q19 y Q20 no aparecen en la tabla de las reglas §9.
- **Problema:** el agente no puede leer las decisiones ni las preguntas que se citan. Las más graves son Q20, que decide si los bloqueantes de la sección 0 pasan a ser Must, y Q19, que decide si el BoardMember debe ser propietario.
- **Sugerencia:** incluir en el Spec Pack el documento de preguntas abiertas, o al menos el texto de Q19 y Q20 en la sección 9 de las reglas, y un resumen de los hallazgos 06 que se citan.

---

## BAJAS

### R2-B01 · La versión de la constitución no coincide entre documentos

- **Tipo:** Contradicción (editorial)
- **Severidad:** BAJA
- **Ubicación:** Constitución ("Versión: 1.2"). Alcance §5 y §7 ("versión 1.1"). Matriz ("constitution 1.1"). ADR-0007 ("constitution version 1.1"). ADR-0009, "Confirmation" ("bumps the constitution version to 1.1"), cuya tabla no incluye el cambio de la 1.2 (RQ-A11).
- **Problema:** no queda registrado qué cambió en la 1.2 ni con qué ADR. El ADR-0005 la menciona, pero el ADR-0009 no.
- **Sugerencia:** agregar al ADR-0009, o a un ADR nuevo, el cambio de la 1.2, y actualizar las referencias de versión.

### R2-B02 · Restos editoriales en el alcance y en los ADR

- **Tipo:** Contradicción (editorial)
- **Severidad:** BAJA
- **Ubicación:**
  - Alcance §5: "Blazor en modo Auto", cuando el ADR-0007 fija SSR para las páginas de residentes.
  - Alcance §5: "falta aclararlo en el PRINCIPIO-002", aunque el PRINCIPIO-002 ya lo aclara.
  - Alcance §0: falta una coma antes de "Libro de Reclamaciones".
  - ADR-0006, "More Information" ("must move") y ADR-0002 ("RN-005, RN-028 and RN-040 must be updated"): tareas que ya se hicieron.
- **Problema:** un agente puede tomar como pendiente algo que ya está resuelto, o aplicar el modo Auto en todas las páginas.
- **Sugerencia:** actualizar esos textos.

### R2-B03 · Reglas compuestas o con un patrón EARS que no les corresponde

- **Tipo:** Debilidad de formato
- **Severidad:** BAJA
- **Ubicación:** RN-047, RN-065, RN-076, RN-092, RN-098, RN-102, RN-116, RN-122, RN-127 y RN-130 (cada una con dos o más obligaciones). RN-113 usa el patrón State-driven para un evento. RN-068 y RN-047 tienen frases fuera de la plantilla.
- **Problema:** las reglas compuestas complican la trazabilidad 1 regla ↔ 1 test y la convención "una sola plantilla" del catálogo.
- **Sugerencia:** dividirlas (por ejemplo, RN-047a para el 403 y RN-047b para el Administrator) o aceptar formalmente el patrón compuesto en las convenciones.

### R2-B04 · Límites de fecha y de formato sin precisar

- **Tipo:** Ambigüedad
- **Severidad:** BAJA
- **Ubicación:** RN-094 ("anterior a 12 meses"), RN-058, RN-003.
- **Problema:** no se dice si un gasto con fecha exactamente 12 meses atrás se acepta, ni en qué zona horaria se compara la fecha "futura". Tampoco se dice si `0502` es un número de unidad válido ni si `502` y `0502` cuentan como el mismo número para RN-003.
- **Sugerencia:** precisar los límites en los ejemplos (por ejemplo, "2025-11-20 se acepta") y la normalización del número de unidad.

### R2-B05 · K2 se define distinto en el brief y en RN-050

- **Tipo:** Contradicción
- **Severidad:** BAJA
- **Ubicación:** Brief §5 K2 ("hasta la confirmación con acceso habilitado"), RN-050 ("entre el envío y la confirmación").
- **Problema:** con la confirmación automática, RN-050 siempre da segundos, y la parte del "acceso habilitado" (que la reserva aparezca en la portería) no se mide.
- **Sugerencia:** alinear las dos definiciones, o justificar en RN-050 por qué el acceso habilitado coincide con la confirmación.

### R2-B06 · El crypto-shredding y la lectura del archivo frío tienen límites técnicos que no se registran

- **Tipo:** Regla faltante (diferida)
- **Severidad:** BAJA
- **Ubicación:** ADR-0002 ("destroys the person's key"), PRINCIPIO-004.5 (PIM, "máximo 8 horas").
- **Problema:** en Key Vault, una clave borrada sigue recuperable durante el período de soft-delete (y no se puede purgar si está activa la protección contra purga), así que la destrucción no es inmediata. Los blobs del nivel Archive necesitan rehidratarse, lo que con prioridad estándar puede pasar de 8 h. Ambos puntos afectan funciones diferidas (ARCO, D3).
- **Sugerencia:** registrarlos en el ADR-0002 y el ADR-0006 como restricciones que se resuelven cuando se escriban las reglas de ARCO y de lectura del archivo.

### R2-B07 · El criterio de confirmación del ADR-0009 no se puede verificar

- **Tipo:** Ambigüedad
- **Severidad:** BAJA
- **Ubicación:** ADR-0009, "Confirmation" ("A grep over `00-constitucion.md` finds no `visitors`, `QR` or `Resident` entity examples").
- **Problema:** la constitución contiene `Resident` como rol (PRINCIPIO-006) y "Residentes" en el ejemplo de violación del PRINCIPIO-001, así que un grep literal falla.
- **Sugerencia:** reformular el criterio (por ejemplo, "no hay ejemplos de entidades fuera del MVP").

### R2-B08 · La clasificación de los códigos HTTP es irregular

- **Tipo:** Ambigüedad
- **Severidad:** BAJA
- **Ubicación:** RN-102, RN-118, RN-077 (`403`), RN-111 (`422` para el bloqueo), RN-017 y RN-103 (`404` sin código de error), RN-067 (un código de error en el CLI de plataforma). Reglas sin estado HTTP explícito: RN-002, RN-003, RN-021, RN-022, RN-024, RN-033, RN-034, RN-079 y RN-080, entre otras.
- **Problema:**
  - RN-077 se rechaza con `403`, aunque el propietario sí tiene vínculo con la unidad; por la definición de RN-102 sería `422`.
  - `ACCOUNT_LOCKED` usa `422`, aunque RN-102 presupone un "recurso" sobre el que se tiene permiso.
  - No se dice qué cuerpo lleva la respuesta `404`.
  - No se dice cómo devuelve sus errores el CLI de plataforma.
- **Sugerencia:** agregar en la convención de códigos una tabla de código ↔ estado HTTP y definir el cuerpo del `404` (Problem Details sin código, para no revelar nada).

### R2-B09 · "Residente" se usa en sentido amplio en reglas que también cubren a NonResidentOwner

- **Tipo:** Inconsistencia de glosario
- **Severidad:** BAJA
- **Ubicación:** RN-083 ("Si un residente intenta cancelar su propia reserva"), RN-088 ("Cuando un residente inicia sesión"), frente al glosario #10 (Resident es un rol) y la matriz B6 (NRO 🔸).
- **Problema:** un agente puede aplicar RN-083 y RN-088 solo al rol Resident y dejar fuera al NonResidentOwner.
- **Sugerencia:** decir "usuario con rol Resident o NonResidentOwner", o definir "residente" en sentido amplio en el glosario.

---

## Puntaje de madurez

**3 / 5: maduro en contenido, todavía no listo para que lo ejecuten agentes sin supervisión.**

**Fortalezas.** El pack está muy por encima del promedio:
- Notación EARS casi uniforme, con ejemplos y contraejemplos verificables.
- Códigos de error estables y un formato de error común (RFC 9457).
- Glosario con estado de cada identificador.
- ADR en formato MADR para cada decisión estructural.
- Matriz de permisos con un test por fila y una sección honesta de vacíos.
- Las preguntas abiertas se marcan en las reglas que afectan.
- Los valores de seguridad (ASVS) y los de retención tienen ejemplos con fechas correctas.

**Por qué no llega a 4.**
1. **Dos defectos CRÍTICOS** afectan al flujo de trabajo de la semana 1 y a la integridad de los datos. Nadie puede aprobar los cambios de `.github/workflows/` ni de la constitución (R2-C01), y el borrado de la ficha `Person` contradice la integridad referencial con riesgo de borrado en cascada irreversible (R2-C02). Un agente se detendría (C01) o destruiría datos (C02).
2. **Los hallazgos ALTOS** se concentran en el modelo de identidad (cuenta global frente a ficha por condominio): borrado de credenciales globales (R2-A04), reactivación (R2-A05), eventos por fecha entre condominios (R2-A06), sesiones con roles revocados (R2-A07) y MFA (R2-A09). Este es el módulo con el umbral de cobertura del 90 %. A eso se suman los controles del repositorio (R2-A01, R2-A02), una herramienta de licencia prohibida (R2-A03) y el cálculo del total del beneficio 2 (R2-A10).
3. Los hallazgos MEDIOS son sobre todo flujos alternos y casos borde (portería, contrataciones, límite mensual, consentimiento) que un agente resolvería por su cuenta, lo que contradice la restricción de no inventar reglas de negocio.

**Para llegar a 4:** resolver R2-C01, R2-C02 y los 11 hallazgos ALTOS. **Para llegar a 5:** además, cerrar los MEDIOS que afectan a funcionalidades Must (M01 a M03, M05, M08, M11 a M18) e incluir en el pack las preguntas abiertas Q19 y Q20.
