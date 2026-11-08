# CondoHub — Auditoría QA de trazabilidad del backlog

> **Fase:** Validación (Agente QA de Backlog, BMAD)
> **Fecha:** 2026-11-02
> **Rol:** QA Architect Senior
> **Insumo revisado:** [02-alcance.md](../02-alcance.md), [03-reglas-de-negocio.md](../03-reglas-de-negocio.md) (RN-001 a RN-168), [06-user-stories.md](../06-user-stories.md) (18 HU), [07-architecture.md](../07-architecture.md) (C1–C13, API-01 a API-08, ADR-0011 a ADR-0015) y [08-backlog.md](../08-backlog.md) (140 entradas). Como referencia: [00-constitucion.md](../00-constitucion.md) v1.4, [docs/security/permissions-matrix.md](../docs/security/permissions-matrix.md) y los ADR 0001 a 0010.
> **Método:** se leyeron completos los cinco documentos. Las tareas, sus campos, sus dependencias y la ruta crítica del backlog se extrajeron con un script; la trazabilidad regla → HU → tarea se cruzó primero por identificador de regla y código de error y después se revisó a mano regla por regla. Antes de registrar un hallazgo se comprobó que ningún otro documento del pack lo resuelve. No se reporta lo que el pack ya difiere de forma explícita y formal (ARCO y Libro de Reclamaciones por el ADR-0010; lectura del archivo frío por el ADR-0006; funcionalidades S, C y W).
> **Identificadores:** BK-Cnn (🔴 crítico), BK-Mnn (🟡 mayor), BK-Snn (🟢 sugerencia).
> **Seguimiento (2026-11-04, Spec Pack v0.4):** los 5 críticos y los 16 mayores están resueltos. La matriz del §4 refleja el estado de v0.4: 137 reglas MUST cubiertas y 19 diferidas formalmente, sin reglas parciales ni sin cobertura.
> - BK-C01: resuelto. HU-001B "Invitar a una persona del padrón", T-049 y `POST /api/persons/{id}/invitations` en §4.2.
> - BK-C02: resuelto. T-047, ampliación de T-041 y `RetentionStartsAt` en §3.3.
> - BK-C03: resuelto (T-011).
> - BK-C04: resuelto. T-048, de la que ahora dependen T-046.4 y T-046.5.
> - BK-C05: resuelto. El autor aprobó la arquitectura, el backlog, los ADR-0011 a ADR-0015 y RN-158 a RN-162 el 2026-11-04.
> - BK-M01: resuelto con el [ADR-0020](../docs/adr/0020-defer-account-self-service-and-handover.md), que difiere 17 reglas (Q35 ✅).
> - BK-M02 a BK-M16: resueltos en v0.4. Cada uno tiene su respuesta y la ubicación del cambio en Q36 a Q50 de [05-preguntas-abiertas.md](../05-preguntas-abiertas.md).
> - BK-S01 a BK-S09 (sugerencias): sin cambios; no bloquean la entrega.
>
> | Checklist | Estado |
> |---|---|
> | Todos los hallazgos críticos resueltos (cero abiertos) | ✅ 5 de 5 |
> | Hallazgos mayores documentados en preguntas-abiertas.md | ✅ 16 de 16 documentados (Q35 a Q50) y resueltos en v0.4 |
> | Matriz de trazabilidad completa | ✅ Las 156 reglas MUST del MVP, las 19 HU y los 13 componentes están en el §4, sin ninguna regla ❌ |
> | Stack del documento de arquitectura respeta la constitución | ✅ Ver §3 |
> | Todas las reglas Must tienen HU, componente y tareas | ✅ 137 con HU (o job, o definición de terminado), componente y tarea completas; 19 diferidas formalmente (17 por el ADR-0020, RN-018 y RN-066 por diseño) |

---

## 1. Resumen ejecutivo

El pack está bien encadenado en el núcleo del MVP: las 18 HU tienen componente, los 13 componentes tienen tareas, las 140 entradas del backlog tienen HU o la etiqueta "Infraestructura", y los números internos del backlog cuadran (116 tareas ejecutables, 96 S y 20 M, 68 h, ruta crítica de 28 tareas y 16.5 h: verificado con un script). Las reservas (M3), la portería (M4) y los gastos y contrataciones (M5, M6) tienen trazabilidad casi completa, con criterios de completitud concretos y alineados con las HU.

Los problemas están en los bordes del MVP, donde las decisiones de "sin HU" no llegaron al backlog:

- **No se pueden emitir invitaciones** (BK-C01). Sin eso, el flujo del MVP descrito en el alcance §3 ("el Administrator invita a los residentes") no existe fuera del seeder.
- **La retención de 90 días de las personas no tiene tareas** (BK-C02), aunque las HU la delegaron de forma explícita al backlog y el alcance §0 la pone en el MVP.
- **La tarea que define el acceso financiero (T-011) contradice el ADR-0001 y la matriz de permisos** (BK-C03): deja fuera al Administrator.
- **No hay ninguna tarea de aprovisionamiento ni de despliegue** (BK-C04), y tres tareas de testing miden contra un entorno que nadie crea.
- **La arquitectura, el backlog, cinco ADR y cinco reglas siguen en estado propuesto** (BK-C05), y la ruta crítica depende de ellos.

### Cifras

| Métrica | Valor |
|---|---|
| Reglas MUST en el catálogo | 161 (5 de ellas gobiernan funcionalidades Should: RN-045, RN-046, RN-047, RN-049, RN-125) |
| Reglas MUST del MVP con HU y tarea completas | **105 de 156 (67 %)**; tras las correcciones del 2026-11-04: 126 (81 %); en v0.4: **137 (88 %), y las 19 restantes diferidas formalmente** |
| Reglas MUST del MVP cubiertas en parte | 21; tras las correcciones: 11; en v0.4: **0** |
| Reglas MUST del MVP sin HU ni tarea | **28** (19 de M1, 9 de M2); tras las correcciones: **0** (17 diferidas por el ADR-0020) |
| Reglas MUST del MVP sin tarea por diseño (no hay endpoint que las active) | 2 (RN-018, RN-066) |
| HU Must con componente en la arquitectura | 18 de 18 |
| Componentes del catálogo con al menos una tarea | 13 de 13 (4 con responsabilidades sin tarea: C3, C10, C11, C12) |
| Piezas de la arquitectura fuera del catálogo y sin tarea | 4 (correo, telemetría, infraestructura de Azure, despliegue) |
| Tareas huérfanas (sin HU ni "Infraestructura") | 0 |
| Tareas con trazabilidad forzada (la HU citada no contiene lo que la tarea hace) | 4 (T-038, T-039, T-040, T-041) |
| Tareas que citan al menos una regla RN | 21 de 140 |

### Hallazgos

| Severidad | Cantidad |
|---|---|
| 🔴 Crítico | 5 |
| 🟡 Mayor | 16 |
| 🟢 Sugerencia | 9 |
| **Total** | **30** |

**Recomendación:** no empezar la Fase 1 del backlog hasta cerrar BK-C03 y BK-C05 (son cambios de texto y aprobaciones). BK-C01, BK-C02 y BK-C04 agregan entre 12 y 18 tareas; conviene incorporarlas antes de congelar la ruta crítica, porque BK-C04 la alarga.

---

## 2. Hallazgos

### 🔴 Críticos

#### BK-C01 · No existe forma de emitir una invitación ni de enviar el correo

- **Tipo:** trazabilidad forward rota (regla → HU → componente → tarea).
- **Evidencia:** RN-007 (cuentas solo desde una invitación) y RN-157 (no invitar a quien solo tiene vínculos futuros) son MUST. El alcance M2 dice que "los usuarios entran por invitación", y el alcance §3 describe el MVP con "el Administrator [...] invita a los residentes". El componente C3 declara "Invitaciones" como responsabilidad y el diagrama de §1.2 incluye `Azure Communication Services Email (invitations)`. Sin embargo:
  - La HU que cubría la emisión (HU-S01) fue descartada ([06-user-stories.md](../06-user-stories.md), *HUs sugeridas*).
  - El mapa de endpoints (§4.2) solo tiene `POST /api/invitations/{token}/accept`.
  - T-015 lo reconoce: "Las invitaciones de prueba las crea el seeder; emitirlas no tiene HU en este lote".
  - Ninguna tarea implementa el adaptador de correo.
- **Impacto:** HU-002 solo se puede demostrar con invitaciones sembradas. El Administrator no puede incorporar a una persona real ni sintética desde la aplicación, y tampoco hay forma de asignar los roles `Resident` o `NonResidentOwner` (T-015.3 los asigna desde la invitación). RN-138 y RN-139 (anular invitaciones al revocar un rol) no tienen nada que anular. El MVP del alcance §3 no es demostrable de punta a punta.
- **Acción:**
  1. Reincorporar HU-S01 como **HU-001B "Invitar a una persona del padrón"** (Must, orden 2), con criterios para RN-007, RN-157, la anulación de RN-138 y el correo con enlace de un solo uso.
  2. Agregar `POST /api/persons/{id}/invitations` (Administrator) a §4.2.
  3. Agregar al backlog tres tareas: el caso de uso de emisión con el `Role` y el `TokenHash` (C3), el adaptador `IEmailSender` con Azure Communication Services y un buzón de prueba en dev (PRINCIPIO-009: sin correos reales), y el botón "Invitar" en la ficha de T-020.2 (C1).

#### BK-C02 · La retención de 90 días de las personas no tiene tareas

- **Tipo:** trazabilidad forward rota (regla MUST → tarea).
- **Evidencia:** [06-user-stories.md](../06-user-stories.md), *Trazabilidad*, dice: "Las de retención y ciclo de vida (RN-005, RN-028, RN-060, RN-061, RN-073, RN-089, RN-126 a RN-136) [...] van al backlog técnico". El backlog solo cubre:
  - los invitados (T-039: RN-028, RN-089);
  - el fin de vínculos con la revocación de roles y la desactivación de cuentas (T-041: RN-060, RN-073).

  Quedan **sin ninguna tarea** RN-005 (inicio del plazo), RN-061 y RN-130 (conservar `PersonId` y cargo), RN-126 y RN-127 (archivar y borrar la ficha `Person`), RN-128 (borrar la cuenta global), RN-131 (anular el plazo al volver), RN-133 (reactivar la cuenta en la `StartDate`) y RN-135 (ficha nueva tras el archivado). Además, la entidad `Person` (§3.3) no tiene ningún campo para la fecha de inicio del plazo; solo tiene `ArchivedAt`. El criterio de HU-001 sobre Carla ("su plazo de retención vence el 2027-05-01") no se puede sembrar ni calcular.
- **Impacto:** el alcance §0 dice que `DataRetentionJob` "entra en el MVP" (PRINCIPIO-004.5). El backlog entrega la mitad del job, y la regla de la constitución no se cumple para los datos del padrón.
- **Acción:**
  1. Agregar `RetentionStartsAt?` (`date`) a `Person` en §3.3, junto con su regla de cálculo (RN-005).
  2. Agregar al backlog una contenedora **T-047 "DataRetentionJob para personas"** con estas subtareas: fijar y anular el plazo (RN-005, RN-131); archivar con la clave del titular reutilizando T-039.1 y T-039.2 (RN-126, RN-108); borrar los datos y los índices ciegos conservando `PersonId` y cargo (RN-127, RN-061, RN-130); borrar la cuenta global sin fichas (RN-128); y un test de 91 días con `FakeTimeProvider`.
  3. Ampliar T-041 con el inicio de los vínculos y la reactivación (RN-133, RN-136).
  4. Corregir la cita de T-041, que nombra RN-061 (una regla del archivado), y agregar RN-073, RN-136 y RN-137.

#### BK-C03 · T-011 define `CanViewCondominiumFinancials` en contra del ADR-0001 y de la matriz de permisos

- **Tipo:** inconsistencia que produce un defecto de seguridad y bloquea otras tareas.
- **Evidencia:** T-011 dice que la política se cumple con "`NonResidentOwner`, `BoardMember`, o `Resident` con un vínculo `Owner` activo". Pero el [ADR-0001](../docs/adr/0001-occupancy-type-instead-of-tenant-role.md) ("Rules") y la regla 4 de la [matriz](../docs/security/permissions-matrix.md) se la conceden a **Administrator**, BoardMember, `Resident (Owner)` y `NonResidentOwner`, y a estos dos últimos **solo con un vínculo `Owner` activo** (RN-015, RN-016). Las filas E3 y H3 de la matriz marcan ✅ para el Administrator.
- **Impacto:**
  - Implementada al pie de la letra, T-011 niega al Administrator el detalle de gastos y expedientes. T-037.2 (anular desde el detalle del gasto) no se puede construir, y T-044.3 (un test por celda de la matriz) falla en E3 · Adm y H3 · Adm.
  - La redacción concede acceso a cualquier `NonResidentOwner` sin exigir el vínculo. Como T-041 revoca el rol una vez al día (00:05 en su criterio), entre las 00:00 y la ejecución del job un ex propietario sigue viendo los gastos, contra RN-016 ("desde su siguiente solicitud"). El criterio de completitud de T-011 sí prueba el caso de Luis, así que la descripción y el criterio se contradicen.
- **Acción:** reescribir la descripción de T-011 con el texto del ADR-0001: "Administrator y BoardMember; `NonResidentOwner` o `Resident` con al menos un vínculo `Owner` activo en `America/Lima` en el condominio actual". Agregar al criterio de completitud: "y verdadero para el Administrator sin vínculos".

#### BK-C04 · No hay tareas de aprovisionamiento, despliegue ni verificación del entorno de Azure

- **Tipo:** componentes y restricciones sin tarea; tareas de testing con una dependencia inexistente.
- **Evidencia:** el backlog no contiene ninguna tarea que cree o configure Azure Container Apps (web y jobs con cron), Azure SQL Database, Key Vault (la KEK, la clave HMAC del índice ciego y la clave del titular), los dos contenedores de Blob (adjuntos privados y archivo inmutable con ciclo de vida de 1 año), las Managed Identity, Azure Communication Services o Application Insights. Tampoco hay un workflow de CD hacia dev. La búsqueda de "deploy", "despleg", "IaC", "Bicep" u "OpenTelemetry" en [08-backlog.md](../08-backlog.md) no devuelve resultados. Sin embargo:
  - T-046.5 ejecuta Locust "contra dev en el pipeline", y T-046.4 necesita un entorno servido para Lighthouse CI.
  - [07-architecture.md](../07-architecture.md) §6.5 pide resolver RT1 (versión TLS visible en el ingress) y RT2 (TLS 1.2 solo con AEAD y TLS 1.3 en Azure SQL) "en la semana 1" con un escaneo `tlsx`. Ninguna tarea lo hace, y RN-013 (rechazar TLS 1.0 y 1.1) queda sin implementación ni prueba.
  - T-006.2 desenvuelve la DEK "con la KEK de Key Vault mediante Managed Identity", pero solo se prueba con el proveedor local de T-006.1.
- **Impacto:** la ruta crítica declarada (16.5 h) no incluye el camino real hasta un prototipo desplegado. El p95 y el LCP (PRINCIPIO-010) y el TLS (PRINCIPIO-005) no se pueden verificar.
- **Acción:** agregar a la Fase 0 una contenedora **T-048 "Infraestructura de Azure como código"** con estas subtareas:
  - plantilla Bicep de los recursos de §1.2 en South Central US, con Managed Identity y sin secretos en `appsettings.json`;
  - workflow de CD a dev, que abre el autor humano (ADR-0005);
  - spike de RT1 con su ADR;
  - escaneo `tlsx` como check, con el caso negativo de TLS 1.1 (RN-013);
  - redactor de OpenTelemetry hacia Application Insights (RN-053).

  Hacer que T-046.4 y T-046.5 dependan de T-048 y recalcular la ruta crítica.

#### BK-C05 · La ruta crítica descansa sobre artefactos sin aprobar

- **Tipo:** bloqueo de proceso (PRINCIPIO-009: decisiones humanas).
- **Evidencia:**
  - [07-architecture.md](../07-architecture.md) y [08-backlog.md](../08-backlog.md) están en estado "Propuesta, pendiente de aprobación del autor".
  - ADR-0011 a ADR-0015 están "Propuesto", y de ellos dependen T-005, T-006, T-010, T-022 y T-023, cuyas subtareas son 15 de las 28 tareas de la ruta crítica.
  - RN-158 a RN-162 siguen marcadas "⚠️ Propuesta del PO, pendiente de aprobación del autor" en [03-reglas-de-negocio.md](../03-reglas-de-negocio.md), y las implementan T-019, T-026 y T-028. Las reglas RN-163 a RN-168 de la misma revisión sí están aprobadas.
  - El propio backlog lo lista en *Pendientes que pueden cambiar tareas*.
- **Impacto:** un agente que empiece la Fase 0 implementaría decisiones de arquitectura que el autor todavía puede rechazar. Si se rechaza el ADR-0012 o el ADR-0013, se rehacen entre 8 y 12 tareas.
- **Acción:** sesión de aprobación del autor antes de T-005:
  1. aceptar o modificar los ADR-0011 a ADR-0015 y transcribirlos a `docs/adr/` en inglés con MADR (BK-S07);
  2. aprobar o reescribir RN-158 a RN-162 y quitar la marca ⚠️ en las reglas y en las HU;
  3. cambiar el estado de la arquitectura y del backlog a "Aprobado".

### 🟡 Mayores

#### BK-M01 · 28 reglas MUST con actor humano no tienen HU ni tarea, y la decisión no está formalizada

- **Evidencia:** el autor descartó HU-S01 a HU-S10 ([06-user-stories.md](../06-user-stories.md), *HUs sugeridas (descartadas)*), pero las reglas siguen siendo MUST en [03-reglas-de-negocio.md](../03-reglas-de-negocio.md). Además de BK-C01 y BK-C02, quedan sin implementar:
  - el perfil del titular (RN-006, RN-069, RN-145, RN-146, RN-148, RN-149, RN-150);
  - el cambio de correo (RN-151, RN-152, RN-154, RN-155, RN-156);
  - la recuperación de contraseña (RN-115);
  - la regeneración de códigos de recuperación (RN-141);
  - el aviso de TLS 1.2 (RN-014);
  - la puerta de acceso sin vínculos ni roles (RN-072);
  - la reactivación al aceptar una invitación (RN-134);
  - el traspaso de administradora (RN-063);
  - la vista del log de auditoría para la Junta (RN-124).

  Hay dos consecuencias visibles. El criterio de HU-001 con `PERSONAL_DATA_OWNER_ONLY` no se puede probar (el backlog lo reconoce). El componente C10 tiene una sola tarea de escritura (T-012) y ninguna de lectura.
- **Impacto:** el catálogo dice "obligatorio" y el plan dice "no se hace", sin un documento que reconcilie ambos. Un agente que lea la regla puede implementarla fuera del plan, o un revisor puede declarar el MVP incompleto. RN-115 es la más sensible: un usuario que olvida su contraseña no tiene salida.
- **Acción:** elegir una de dos vías por grupo y dejarla escrita:
  - **(a)** bajar el grupo a una funcionalidad Should con su HU (al menos RN-115 y RN-124, que el alcance M2 y C10 dan por incluidas);
  - **(b)** diferirlo con un ADR como el ADR-0010, marcar las reglas con "⏸ diferida (ADR-00xx)" y marcar el criterio de HU-001 como diferido.

#### BK-M02 · El mapa de endpoints (§4.2) no cubre lo que piden las HU y las tareas

- **Evidencia:** los criterios de las HU, las páginas del backlog o los contratos de la propia arquitectura usan estos endpoints, que no figuran en §4.2:

  | Falta en §4.2 | Lo necesita |
  |---|---|
  | Registro de torres | Alcance M1 ("registra torres"), T-020.1 |
  | `GET /api/persons/{id}` | Criterio de HU-009 (`403 PERSONAL_DATA_FORBIDDEN`, RN-158), ficha de T-020.2 |
  | Listas de unidades y personas | T-020.1, T-020.2 |
  | `GET /api/reservations` (mis reservas) y `GET /api/reservations/{id}` | T-027.4; el encabezado `Location` de API-03 |
  | `POST`/`GET /api/suppliers` | T-031.1 (registro sin ruta), selector de proveedor de T-037.1 |
  | `PUT /api/supplier-hires/{id}` y la edición de una cotización | T-031.2, T-031.3, criterios `HIRE_NOT_EDITABLE` de HU-012 |
  | `PUT` y `DELETE /api/expenses/{id}` | Criterios `EXPENSE_IMMUTABLE` de HU-010B; sin ellos la respuesta es `405`, no `422` |
  | Lista de contrataciones | Página de la Junta (T-037.4), propietarios (T-036.3) |
  | `POST /api/auth/sign-out` | Está en §4.2, pero **no tiene tarea** |

- **Impacto:** OpenAPI (T-045), Postman y la cobertura cross-tenant de T-044.4 ("por cada endpoint de §4.2") quedan incompletos, y varios criterios de HU no tienen dónde ejecutarse. El cierre de sesión es relevante en la PC compartida de portería (HU-003B).
- **Acción:** completar §4.2 con esas rutas y sus políticas de la matriz, asignar cada una a la tarea de su módulo (T-018, T-031.1, T-032, T-026, T-013) y agregar a T-013 una subtarea para `sign-out`, que revoca la `UserSession`.

#### BK-M03 · T-038 es Should pero implementa reglas MUST, y omite parte de C12

- **Evidencia:** T-038 (Platform CLI) es la única tarea Should. Implementa RN-062 (auditoría de plataforma), RN-066 y RN-067 (asignación de BoardMember) y la primera invitación del Administrator (RN-007), que son MUST. Además, la arquitectura asigna a C12 el **traspaso de administradora** (RN-063, con RN-137 y RN-139), y T-038 no tiene ese comando. Su trazabilidad a HU-003 y HU-013 es forzada (ver BK-M04).
- **Impacto:** las prioridades no se alinean entre reglas (MUST), componente (C12 en el MVP) y tarea (Should). El traspaso no figura en ningún plan.
- **Acción:**
  - **(a)** dividir T-038 en una parte Must, con `condominium create`, `administrator assign` y la auditoría, y una parte Should, con `board-member assign`, `mfa reset` y `handover`; o
  - **(b)** dejar T-038 en Should y registrar en el alcance que esas reglas MUST se difieren mientras no haya datos reales (SP9).

  En ambos casos, agregar el comando `handover` o diferirlo de forma explícita.

#### BK-M04 · Cuatro tareas citan una HU que no contiene lo que la tarea hace

- **Evidencia:**

  | Tarea | HU citada | Lo que dice la HU | Traza real |
  |---|---|---|---|
  | T-039 | HU-007 | La retención queda "fuera de esta HU" (nota de HU-007) | RN-028, RN-089, RN-108, RN-109 |
  | T-041 | HU-011, HU-014 | La negación desde el día siguiente la cumple la política de T-011, no el job | RN-060, RN-073, RN-136, RN-137 |
  | T-038 | HU-003, HU-013 | Ningún criterio usa la CLI; el reset de MFA no tiene HU | RN-007, RN-062, RN-066, RN-067 |
  | T-040 | HU-005, HU-010 | Ningún criterio usa la purga | RN-166, ADR-0014 |

  Hay además 20 entradas trazadas solo a "Infraestructura" sin decir qué requisito transversal del alcance §0 o qué principio cubren. T-014.4 cita RN-074 (ASVS) donde corresponde RN-008.
- **Impacto:** formalmente no hay huérfanas, pero la trazabilidad backward no permite saber qué regla se rompe si se elimina una de estas tareas.
- **Acción:** agregar a cada tarea el campo **"Trazabilidad"**, con una HU, una lista de RN o la fila del alcance §0 con su PRINCIPIO. Usarlo en las cuatro tareas de la tabla y en las 20 de infraestructura, y corregir la cita de T-014.4.

#### BK-M05 · La definición de terminado del backlog no incluye OpenAPI, Postman ni CHANGELOG por tarea

- **Evidencia:**
  - Las convenciones de [06-user-stories.md](../06-user-stories.md) incluyen "su documentación OpenAPI y Postman (PRINCIPIO-012)" en la definición de terminado de cada HU.
  - El ejemplo de cumplimiento del PRINCIPIO-012 es un PR que agrega el endpoint, su request de Postman, la entrada del CHANGELOG y el diagrama.
  - El backlog omite las tres cosas en su definición de terminado y concentra OpenAPI y Postman en T-045, al final de la ruta crítica.
  - El criterio de T-045 ejecuta Postman "contra el entorno local", mientras el PRINCIPIO-010 exige ejecutarlo en el CI.
- **Acción:**
  1. Agregar a la definición de terminado del backlog: "endpoint en `openapi.json`, request positivo y de rechazo en la colección Postman de su módulo, y entrada en el CHANGELOG".
  2. Convertir T-045 en la tarea que crea la infraestructura del check (diferencia de OpenAPI y job de Postman CLI en el CI) y moverla a la Fase 0, después de T-002.
  3. Cambiar su criterio a "en el CI".

#### BK-M06 · Puertas del CI que exige la constitución no tienen tarea

- **Evidencia:** contra el PRINCIPIO-010 y [07-architecture.md](../07-architecture.md) §6.1 y §6.2:
  - **Cobertura del 90 % en el módulo de usuarios.** La constitución dice "El CI falla por debajo de esos umbrales". T-002.1 solo configura el 70 % global, y T-043 solo reporta el 90 %.
  - **Dependencias vulnerables** (Dependabot o `dotnet list package --vulnerable`): sin tarea.
  - **Analizador Roslyn que prohíbe literales en `.razor`** (PRINCIPIO-001, RN-054): sin tarea.
  - **Lista de denegación de SDK de pasarelas** (PRINCIPIO-007, RN-045): sin tarea.
  - **Test de ArchUnitNET de límites entre módulos** (§6.2.5): sin tarea; T-005.4 solo cubre `IgnoreQueryFilters`.

  Además, T-045, T-046.3, T-046.4 y T-046.5 agregan pasos al CI, es decir, modifican `.github/workflows/`. Los agentes no pueden hacerlo (ADR-0005), pero solo T-002 está marcada para el autor humano.
- **Acción:**
  1. Ampliar T-002.1 con el umbral del 90 % por ensamblado de Identity & Access.
  2. Agregar T-002.5 para el escaneo de vulnerabilidades y la lista de denegación.
  3. Agregar una tarea para el analizador de literales y otra para el test de módulos.
  4. Marcar con "Ejecuta: autor humano (ADR-0005)" toda tarea que toque `.github/workflows/`.

#### BK-M07 · Las verificaciones de la semana 1 del ADR-0005 no tienen tarea

- **Evidencia:** el alcance §0 y §5 y la decisión D2 exigen verificar en la semana 1 tres cosas: los **dos rulesets** de `main` (checks sin bypass, y 1 aprobación con bypass solo para el autor), el **check de rutas protegidas** que corre desde la definición de `main`, y el **caso negativo de la GitHub App** (no puede aprobar ni mergear; R3-A01, "todavía no está verificado"). T-002.4 solo marca los status checks como obligatorios.
- **Impacto:** el control que protege la constitución y los workflows sigue sin verificar, y el alcance §5 lo marca como "todavía no está verificado".
- **Acción:** agregar **T-002.6 "Crear la GitHub App y verificar los rulesets"**, con este criterio: un PR de la App que toca `.github/workflows/` queda rechazado por el check; la App no puede aprobar un PR del autor; y un PR del autor con checks en verde se mergea sin aprobación.

#### BK-M08 · `UserSession` figura con y sin `CondominiumId` en la arquitectura

- **Evidencia:** [07-architecture.md](../07-architecture.md) §3.1 dice que "las excepciones, sin `CondominiumId`, son `User`, `UserSession` y `ConsentVersion`", pero la tabla de §3.3 le da a `UserSession` la columna "`CondominiumId` elegido". T-005.3 falla si una entidad con `CondominiumId` no tiene query filter, y T-010.3 necesita leer la sesión **antes** de conocer el condominio.
- **Impacto:** el agente de T-007.2 y T-010.1 tiene que elegir entre romper el test de T-005.3 o filtrar una tabla que se lee antes de resolver el tenant.
- **Acción:** renombrar la columna a `SelectedCondominiumId`, sin `ITenantOwned`; documentar en §3.1 que la sesión es global y solo la leen el middleware de sesión y el inicio de sesión (procesos del ADR-0003); y agregar ese caso a T-005.3 como excepción explícita.

#### BK-M09 · Valores numéricos que no coinciden entre regla, arquitectura y tarea

| # | Regla o HU | Arquitectura o tarea | Acción |
|---|---|---|---|
| a | RN-160 exige múltiplo de 60 s **solo para la duración máxima** | API-02, la entidad `CommonArea` y T-019 también lo exigen para la **anticipación máxima** | Decidir y alinear: agregar "o una anticipación máxima que no es múltiplo de 60 s" a RN-160, o quitarlo de API-02, §3.3 y T-019 |
| b | RN-110 y el criterio borde de HU-002: a los 604,800 s exactos la invitación **es válida** | La descripción de T-015.2 dice rechazar "después de 604,800 s (inclusive)" (su propio criterio sí acepta los 604,800 s) | Reescribir: "rechazar cuando han pasado más de 604,800 s" |
| c | RN-113 no fija qué pasa exactamente a los 1,800 s | T-010 prueba 1,799 s y 1,801 s; nada prueba 1,800 s | Fijar el borde en RN-113 (por coherencia con RN-111, la sesión expira a los 1,800 s) y agregarlo a T-010.2 |

#### BK-M10 · La caché de sesión de 30 s contradice la revocación "en ese momento"

- **Evidencia:** RN-137 exige invalidar las sesiones "en ese momento" al revocar un rol. El ADR-0013 y T-010.2 usan "una caché de 30 s para la fila" de la sesión, y §6.2.3 permite 2 réplicas sin afinidad, así que la caché no se comparte. Una sesión revocada sigue sirviendo hasta 30 s en cada réplica. El ejemplo de RN-137 (Raúl en portería tras el traspaso) es justo el caso de riesgo.
- **Acción:** invalidar la entrada de la caché en la réplica que revoca y bajar el TTL a ≤ 5 s, o no cachear `RevokedAt`; o bien aceptar el desfase y escribirlo en RN-137 ("en 30 s o menos"). Agregar a T-041 un criterio con el borde.

#### BK-M11 · RN-166 prohíbe archivos sin registro, pero la arquitectura los tolera 1 h

- **Evidencia:** RN-166 dice "NO DEBE [...] dejar en Blob Storage un archivo sin registro asociado". La arquitectura (§6.2.2, API-06) y T-029.3 dejan el blob `Pending` hasta que `OrphanBlobCleanupJob` lo borra pasada 1 h (T-040). El criterio de HU-010 ("el contenedor no guarda una copia parcial del PDF") se puede cumplir para la carga cortada, pero no para un fallo de la transacción después de una carga completa.
- **Acción:** escribir en RN-166 el plazo ("un archivo `Pending` sin registro se elimina en 1 h o menos y nunca se puede descargar"), o borrar el blob de forma síncrona en el `catch` de T-029.3 y dejar el job como red de seguridad. Agregar el caso al criterio de T-029.3.

#### BK-M12 · El job de invitados no cubre las reservas canceladas como dice RN-028

- **Evidencia:** RN-028 fija dos relojes: 90 días desde el fin de la franja de una reserva `Completed`, **o desde la cancelación** de una `Cancelled`. T-039.3 selecciona "los `ReservationGuest` con visita de hace más de 90 días". Una reserva cancelada con meses de anticipación conserva los datos de sus invitados hasta 90 días después de una visita que nunca ocurrió.
- **Acción:** reescribir T-039.3 con los dos relojes (`EndAt` para las `Confirmed` terminadas y `CancelledAt` para las `Cancelled`) y agregar al criterio una reserva cancelada el 2026-12-01 para el 2027-02-14, archivada el 2027-03-02.

#### BK-M13 · El seeder no siembra todos los datos que los criterios necesitan

- **Evidencia:** la independencia INVEST de 15 HU depende del seeder ([06-user-stories.md](../06-user-stories.md), *Lectura de la tabla*), y T-044 prueba la matriz con sus cuentas. T-009.2 a T-009.4 no nombran estos datos, que usan los criterios:
  - Ana como BoardMember en "Residencial Los Olivos" y con ficha en "Torres del Parque" (HU-003, T-014.4, T-015.4);
  - Raúl Mendoza como persona (T-009.4 le da un rol, pero T-009.2 no lo crea);
  - el vínculo futuro de Carla con A-305, que no está en la lista de unidades (HU-006B);
  - la `EndDate = 2026-12-15` de Luis (HU-011, HU-014, T-011, T-041);
  - las 3 reservas de la parrilla de A-1104 en diciembre (HU-006);
  - las reservas del 2026-12-12 con Pedro Ramos como invitado (HU-009, T-046.1);
  - la contratación "Cambio de luminarias" aprobada en una sola decisión (HU-014).
- **Acción:** agregar a T-009.3 y T-009.4 una tabla "Dato → HU que lo usa" y este criterio: "cada criterio de HU que dice 'con el seeder' encuentra su dato".

#### BK-M14 · La idempotencia no cubre todas las creaciones que un residente reintenta en 3G

- **Evidencia:** el principio P5 y §6.3 dicen "Toda creación por residente es idempotente (ADR-0014)". `POST /api/reservations/{id}/guests` (T-025) es una creación del residente y no lleva `Idempotency-Key`: un reenvío tras un corte duplica al invitado y consume aforo. El ADR-0014 dice que el mecanismo "sirve para gastos", pero `POST /api/expenses` no lo usa, y un gasto duplicado solo se corrige anulándolo, porque es inmutable (RN-091).
- **Acción:** extender la idempotencia de T-022.3 a `POST .../guests` (obligatoria) y a `POST /api/expenses` (recomendada), con un test de reenvío en T-042.

#### BK-M15 · Faltan las tareas para escribir los ADR que bloquean dependencias

- **Evidencia:** el alcance §6 exige elegir la librería Argon2id "mediante un ADR". [07-architecture.md](../07-architecture.md) §5 lista cuatro ADR pendientes: Argon2id, TOTP, hosting con TLS y adjuntos (Q28). T-013.1 y T-014.1 están "bloqueadas hasta aprobar la librería", pero ninguna tarea produce el ADR que permite aprobarla.
- **Acción:** agregar a la Fase 0 cuatro tareas S, "Redactar el ADR-0016 a ADR-0019", que verifiquen la licencia y la última release (PRINCIPIO-002). Hacer que T-013.1, T-014.1, T-029.2 y T-048 dependan de ellas.

#### BK-M16 · Criterios de HU que ninguna tarea verifica

| HU | Criterio | Regla | Falta |
|---|---|---|---|
| HU-004 | Bajar el aforo o el cierre no cambia una reserva `Confirmed` | RN-162 | Un criterio en T-019 |
| HU-007 | Se muestra el aviso de privacidad al guardar el primer invitado | RN-087 | Un criterio en T-027.3; además, API-03 no define el código de error si `guestPrivacyNoticeAccepted` falta |
| HU-009 | El Concierge pide `/persons/{id}` y recibe `403 PERSONAL_DATA_FORBIDDEN` | RN-158 | Endpoint y tarea (ver BK-M02) |
| HU-001 | El Administrator edita el teléfono y recibe `403 PERSONAL_DATA_OWNER_ONLY` | RN-146 | Endpoint de perfil (ver BK-M01) |
| Todas | Objetivos táctiles de 44×44 px | RN-056 | axe en el nivel AA no lo comprueba (2.5.5 es AAA); T-017.1 mide un solo botón. Agregar la medición a T-046.3 |

**Acción:** agregar los criterios a las tareas indicadas y definir `GUEST_PRIVACY_NOTICE_REQUIRED` (`422`) en RN-087 y API-03.

### 🟢 Sugerencias

#### BK-S01 · Agregar un campo "Reglas" a cada tarea

Solo 21 de las 140 entradas citan una RN. La trazabilidad regla → tarea de esta auditoría se reconstruyó por los códigos de error, que no todas las reglas tienen. **Acción:** agregar "Reglas: RN-…" a cada tarea (complementa BK-M04) y un check del script de verificación del backlog que falle si una RN MUST no aparece en ninguna tarea ni en una lista de diferidas.

#### BK-S02 · La tabla *Cobertura de HU* del backlog está incompleta

Faltan tareas que se declaran relacionadas con la HU: T-029 en HU-012; T-029.4 y T-041 en HU-014; T-012 en HU-001 y HU-013; T-009.4 y T-013.1 en HU-002; T-010.4 en HU-002B. **Acción:** generar la tabla con el mismo script que verifica el checklist.

#### BK-S03 · La estimación de 68 h no es comparable con las 16 semanas

S = 0.5 h y M = 1 h parecen tiempos de ejecución de un agente. La ruta crítica no incluye la revisión humana de cada PR, las aprobaciones de dependencias ni BK-C04. **Acción:** aclarar en *Totales* que es tiempo del agente, agregar una columna de "tiempo humano" (revisión y aprobación) y recalcular la ruta crítica con las esperas de aprobación, que el propio backlog estima en 6.5 h para la ruta de identidad.

#### BK-S04 · Fijar en las reglas los códigos que hoy solo están en la arquitectura

`401` para la sesión vencida (pendiente de redacción de HU-003B), `409` para una decisión concurrente (API-08), `412` para `If-Match` (API-02), `IDEMPOTENCY_KEY_MISSING` (`400`) y `429` del rate limiting no tienen una regla. **Acción:** agregarlos a RN-102 y RN-118 o a una regla nueva de contrato HTTP, para que las HU puedan citarlos.

#### BK-S05 · Etiquetar las reglas MUST de funcionalidades Should

RN-046, RN-047, RN-049 y RN-125 son MUST porque repiten la constitución, pero gobiernan S2 y S4, que están fuera del MVP. RN-045 es transversal. **Acción:** marcarlas "MUST (constitución) · aplica cuando exista S2/S4" para que no aparezcan como huecos del MVP, y cubrir RN-045 con la lista de denegación de BK-M06.

#### BK-S06 · El rate limiting por IP puede bloquear a residentes detrás de CGNAT

10 solicitudes por minuto por IP en `POST /api/auth/*` (§4.1, T-013.4) pueden bloquear a varios residentes que comparten IP, como pasa con el CGNAT de los operadores móviles y con la red del edificio, en la hora pico de reservas. **Acción:** limitar sobre todo por índice ciego del correo, subir el umbral por IP (por ejemplo, 60/min) y documentarlo en el ADR del hosting.

#### BK-S07 · Agregar la transcripción de los ADR-0011 a ADR-0015

[07-architecture.md](../07-architecture.md) dice que, al aprobarse, se transcriben en inglés con MADR a `docs/adr/` (PRINCIPIO-001 y 012). **Acción:** una tarea S en la Fase 0, después de BK-C05.

#### BK-S08 · Aclarar el actor de la política financiera en las HU

*Actores* de [06-user-stories.md](../06-user-stories.md) dice que el "propietario" cumple `CanViewCondominiumFinancials`, pero no menciona que también la cumplen el Administrator y la Junta, y HU-011 y HU-013 dependen de eso. **Acción:** citar la regla 4 de la matriz en *Actores*.

#### BK-S09 · Probar el CHANGELOG y los diagramas en el CI

El PRINCIPIO-012 pide CHANGELOG y diagramas Mermaid actualizados por PR. **Acción:** un check que falle si un PR con `feat:` o `fix:` no modifica `CHANGELOG.md`.

---

## 3. Verificaciones que pasaron

| Verificación | Resultado |
|---|---|
| Toda funcionalidad Must del alcance (M1–M6) tiene HU | ✅ 6 de 6 ([06-user-stories.md](../06-user-stories.md), *Trazabilidad*) |
| Toda HU Must tiene componente | ✅ 18 de 18 (catálogo §2.2) |
| Todo componente del catálogo tiene tareas | ✅ 13 de 13 (ver los huecos parciales en BK-C01, BK-C02, BK-M01 y BK-M03) |
| Toda tarea traza a una HU o a infraestructura | ✅ 140 de 140; 0 huérfanas (ver BK-M04) |
| Totales del backlog | ✅ 140 entradas, 24 contenedoras, 116 ejecutables (96 S, 20 M), 68 h |
| DAG y orden topológico | ✅ Sin ciclos; cada tarea aparece después de sus dependencias |
| Ruta crítica | ✅ 28 tareas y 16.5 h; tres rutas empatan (T-044.4, T-045, T-046.3) |
| Stack contra el PRINCIPIO-002 | ✅ .NET 10, Blazor SSR estático con modo Auto donde se justifique (ADR-0007), EF Core sin Dapper, Azure SQL Database con SQL Server 2025 en contenedor, South Central US, GitHub Actions. Dependencias MIT o Apache-2.0; MediatR, AutoMapper y k6 descartados con motivo |
| Prioridades | ✅ HU Must = tareas Must, salvo T-038 (BK-M03) |
| Valores entre alcance, HU, arquitectura y backlog | ✅ 30 min / 12 h de sesión, 5 intentos / 900 s, 7 días de invitación, 24 h de idempotencia, 90 días de retención, ≤ 60 s de portería (polling de 30 s), 10 MB provisionales, 70 % / 90 % de cobertura, p95 < 500 ms, LCP < 2.5 s (4G) y < 4 s (Slow 3G), ≤ 150 KB por página. Excepciones en BK-M09, BK-M10 y BK-M11 |
| Diferimientos formales respetados | ✅ No hay tareas de ARCO, Libro de Reclamaciones, lectura del archivo frío, S1–S5, C1–C4 ni W1–W13 |

---

## 4. Matriz de trazabilidad (reglas → HU → componentes → tareas)

**Leyenda:** ✅ cubierta (HU o tarea de job, más tarea con criterio) · ⚠️ parcial (se indica el hallazgo) · ❌ sin HU ni tarea · ➖ sin tarea por diseño o fuera del MVP · **P** = regla propuesta por el PO, aprobada por el autor el 2026-11-04 (BK-C05) · **⏸** = diferida formalmente por el [ADR-0020](../docs/adr/0020-defer-account-self-service-and-handover.md). La matriz refleja el estado del 2026-11-04, después de las correcciones · **DoD** = cubierta por la definición de terminado del backlog.

### M1 · Padrón del condominio

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-001, RN-002 | HU-001 | C4 | T-007.1, T-018.3 | ✅ |
| RN-003, RN-058 | HU-001 | C4, C1 | T-018.1, T-020.1 | ✅ |
| RN-004 | HU-001 | C4, DbContext | T-005.2, T-018 | ✅ |
| RN-057 | HU-001 | C4, C1 | T-018.2, T-020.2 | ✅ |
| RN-147 | — | C4 | Se cumple sin código: no se exige el DNI | ✅ |
| RN-153 | HU-001, HU-003, HU-003B | C3, C4 | T-013.2, T-018.2 | ✅ |
| RN-129 | — | C10 | T-012 (el log no guarda datos personales) | ✅ |
| RN-060 | — (job) | C11 | T-041 | ✅ |
| RN-059 | HU-001 | C10, C4, C11 | T-018.3, T-018.5 (crear, modificar y terminar), T-041 (fin y revocación por fecha) | ✅ |
| RN-131 | HU-001 | C4, C11 | T-018.2, T-047.1 | ✅ |
| RN-006 | HU-001 | C4 | T-007.1 (test de modelo: solo el booleano) | ✅ |
| RN-136 | — (job) | C11 | T-041 | ✅ |
| RN-005, RN-061, RN-126, RN-127, RN-128, RN-130, RN-135 | HU-001; — (job) | C11, C4 | T-047.1 a T-047.5 | ✅ |
| RN-145, RN-146, RN-148, RN-149, RN-150 | HU-001 (criterio marcado ⏸) | C4 | — | ➖ ⏸ ADR-0020 |
| RN-151, RN-152, RN-154, RN-155, RN-156 | — | C3 | — | ➖ ⏸ ADR-0020 |
| RN-157 | HU-001B | C3, C1 | T-049.2, T-049.3 | ✅ |
| RN-124 | — | C10 | — | ➖ ⏸ ADR-0020 |

### M2 · Acceso seguro, roles y consentimiento

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-009 | HU-002 | C3 | T-013.1, T-043 | ✅ |
| RN-110, RN-165 | HU-002 | C3 | T-015.2, T-015.3 | ✅ (redacción en BK-M09 b) |
| RN-116, RN-117 | HU-002 | C3 | T-015.1 | ✅ |
| RN-121, RN-122 | HU-002 | C3 | T-007.2, T-015.4 | ✅ |
| RN-010, RN-011, RN-012, RN-070, RN-071 | HU-002B | C3, C1 | T-010.4, T-016, T-017.4 | ✅ |
| RN-008, RN-140, RN-112 | HU-003 | C3, C1 | T-014.1 a T-014.4, T-017.3 | ✅ |
| RN-064, RN-065 | HU-003 | C3 | T-007.2, T-014.4 | ✅ |
| RN-067 | — | C3, C12 | T-007.2, T-007.4, T-038 | ✅ |
| RN-111, RN-113, RN-114 | HU-003B | C3 | T-010.2, T-013.3, T-014.2, T-043 | ✅ (borde en BK-M09 c) |
| RN-016, RN-017 | HU-011, HU-014; DoD | C3, C2 | T-011, T-044.4 | ✅ |
| RN-068, RN-132 | HU-001 | C4 | T-018.2 | ✅ |
| RN-015 | HU-011, HU-014 | C3 | T-011 | ✅ |
| RN-007 | HU-001B, HU-002 | C3 | T-049 (emitir), T-015 (aceptar) | ✅ |
| RN-138, RN-139 | HU-002 | C3, C11 | T-041 (anula), T-015.2 (rechaza `RevokedAt`) | ✅ |
| RN-137 | — | C3, C11 | T-010.2 (caché de 5 s invalidada), T-013.5, T-041 | ✅ |
| RN-073 | — (job) | C11 | T-041 | ✅ |
| RN-062 | — | C12, C10 | T-038 (Must) | ✅ |
| RN-074 | HU-003, HU-003B | C3 | T-043 (la recuperación de contraseña está diferida, ADR-0020) | ✅ |
| RN-013 | — | Infraestructura Azure | T-048.4, T-048.5 | ✅ |
| RN-014 | — | C1 | — | ➖ ⏸ ADR-0020 |
| RN-063 | — | C12 | — | ➖ ⏸ ADR-0020 |
| RN-072 | HU-003 | C3 | T-014.4 | ✅ |
| RN-133 | — (job) | C11 | T-041 | ✅ |
| RN-069, RN-115, RN-134, RN-141 | — | C3, C4 | — | ➖ ⏸ ADR-0020 |
| RN-018, RN-066 | — | — | No hay endpoint de contactos ni de asignación de roles para el Administrator | ➖ |

### M3 · Reserva de áreas comunes

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-082, RN-159 **P** | HU-004 | C5, C1 | T-019, T-020.3 | ✅ |
| RN-160 **P** | HU-004 | C5 | T-019 | ✅ (valor en BK-M09 a) |
| RN-162 **P** | HU-004 | C5 | T-019 | ✅ |
| RN-019, RN-021, RN-022, RN-078, RN-079, RN-119, RN-120 | HU-005 | C5 | T-021, T-022.1 | ✅ |
| RN-163 | HU-005 | C5, C2 | T-022.3, T-042 | ✅ |
| RN-024, RN-080, RN-081 | HU-006 | C5 | T-023.1 a T-023.4, T-042 | ✅ |
| RN-085 | HU-006, HU-008 | C5 | T-026 | ✅ |
| RN-025, RN-075, RN-076, RN-077 | HU-006B | C5 | T-024 | ✅ |
| RN-023, RN-123 | HU-004, HU-007 | C5 | T-021, T-025 | ✅ |
| RN-086 | HU-007 | C5 | T-025 | ✅ (idempotencia en BK-M14) |
| RN-027 | HU-007 | C8 | T-006.1, T-008.1 | ✅ |
| RN-087 | HU-007 | C1, C5 | T-025, T-027.3 sin criterio del aviso | ✅ (prueba en BK-M16) |
| RN-083, RN-084, RN-161 **P**, RN-168, RN-088 | HU-008 | C5, C1 | T-026, T-027.4 | ✅ |
| RN-089 | — (job) | C11 | T-039 | ✅ |
| RN-028 | — (job) | C11 | T-039.3 (dos relojes) | ✅ |

### M4 · Vista de portería

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-026, RN-029, RN-030, RN-164 | HU-009 | C6, C1 | T-028.1 a T-028.3 | ✅ |
| RN-031 | HU-009, HU-014 | C3, C7 | T-035, T-044.3 | ✅ |
| RN-158 **P** | HU-009 | C6, C4 | T-018.4 | ✅ |

### M5 · Registro de gastos

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-032, RN-033, RN-034, RN-093, RN-094 | HU-010 | C7, C9, C1 | T-030, T-037.1 | ✅ |
| RN-092, RN-095, RN-167 | HU-010B | C7, C1 | T-032, T-037.2 | ✅ (depende de BK-C03) |
| RN-035, RN-036, RN-090, RN-142, RN-143, RN-144 | HU-011 | C7, C1 | T-033, T-036.1, T-036.2 | ✅ |
| RN-091 | HU-010B | C7 | T-032 (`PUT`/`DELETE` → `EXPENSE_IMMUTABLE`) | ✅ |

### M6 · Contrataciones con sustento visible

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-096, RN-037, RN-038, RN-100, RN-042 | HU-012 | C7, C1 | T-031.1 a T-031.4, T-037.3 | ✅ |
| RN-039, RN-040, RN-098, RN-099 | HU-013 | C7, C10, C1 | T-034, T-037.4 | ✅ |
| RN-041 | HU-014 | C7, C1 | T-035, T-036.3 | ✅ |
| RN-097 | HU-012 | C7 | T-031.2, T-031.3 | ✅ |

### Reglas transversales (sección 8)

| Reglas | HU | Componente | Tareas | Estado |
|---|---|---|---|---|
| RN-052 | DoD | C8 | T-006, T-031.1 | ✅ |
| RN-055 | HU-011 | C1 | T-036.1 | ✅ |
| RN-102, RN-118 | DoD | C2 | T-004 | ✅ |
| RN-103, RN-104 | DoD | DbContext, C2 | T-005.4, T-044.4 | ✅ |
| RN-105 | HU-011 | C3 | T-011 | ✅ |
| RN-106, RN-107 | HU-010, HU-011, HU-014 | C9 | T-029.1, T-029.4 | ✅ |
| RN-108, RN-109 | — (job) | C11 | T-039.1, T-039.4 (solo invitados) | ✅ |
| RN-166 | HU-010 | C9, C11 | T-029.3 (borrado inmediato), T-030, T-040 | ✅ |
| RN-053 | DoD | C2, Infraestructura Azure | T-044.5, T-048.6 | ✅ |
| RN-054 | DoD | C1, Solución | T-017.1, T-051 | ✅ |
| RN-056 | DoD | C1 | T-017.1, T-046.3 (todas las páginas) | ✅ |

### Reglas MUST de funcionalidades Should (fuera del MVP)

| Reglas | Funcionalidad | Estado |
|---|---|---|
| RN-046, RN-047, RN-125 | S2 Pagos | ➖ BK-S05 |
| RN-049 | S4 Panel | ➖ BK-S05 |
| RN-045 | Transversal (PRINCIPIO-007) | ➖ Sin código que lo viole; falta la lista de denegación (BK-M06) |

### Componentes → tareas

| Componente | HU | Tareas | Responsabilidades sin tarea |
|---|---|---|---|
| C1 Web UI | Todas | 20 (T-017, T-020, T-027, T-028.3, T-036, T-037, T-049.3) | Aviso de TLS 1.2 (⏸ ADR-0020) |
| C2 REST API | Todas | T-004, T-045 y los endpoints de cada módulo | — |
| C3 Identity & Access | HU-001B a HU-003B | 21 (T-010, T-011, T-013 a T-016, T-049.1, T-049.2) | Recuperación de contraseña y cambio de correo (⏸ ADR-0020) |
| C4 Registry | HU-001, HU-009 | 6 (T-018, T-047.5) | Perfil del titular (⏸ ADR-0020) |
| C5 Reservations | HU-004 a HU-008 | 14 (T-019, T-021 a T-026, T-027.1) | — |
| C6 Concierge | HU-009 | 2 (T-028.1, T-028.2) | — |
| C7 Finance Transparency | HU-010 a HU-014 | 9 (T-030 a T-035) | — |
| C8 Field Encryption & Blind Index | HU-001, HU-002, HU-007 | 5 (T-006, T-048.3) | — |
| C9 Attachment Store | HU-010, HU-011, HU-012, HU-014 | 4 (T-029) | — |
| C10 Audit | HU-001, HU-013 | 1 (T-012) | Vista para la Junta (⏸ ADR-0020) |
| C11 Scheduled Jobs | — (jobs) | 10 (T-039, T-040, T-041, T-047.1 a T-047.4) | — |
| C12 Platform CLI | — | 2 (T-038 Must, T-050 Should) | Traspaso de administradora (⏸ ADR-0020) |
| C13 Synthetic Seeder | Todas | 4 (T-009, con la tabla "Dato → HU") | — |
| Fuera del catálogo: correo, telemetría, infraestructura de Azure, CD | — | 6 (T-048.1, T-048.2, T-048.4 a T-048.6, T-049.1) | — |

---

## 5. Acciones priorizadas

| # | Acción | Hallazgos | Esfuerzo estimado |
|---|---|---|---|
| 1 | Sesión de aprobación: arquitectura, backlog, ADR-0011 a ADR-0015 y RN-158 a RN-162 | BK-C05, BK-S07 | Decisión del autor |
| 2 | Corregir la descripción y el criterio de T-011 | BK-C03 | 1 edición |
| 3 | Agregar la HU-001B de invitación, su endpoint y tres tareas | BK-C01 | 3 tareas S y M |
| 4 | Agregar T-047 (retención de personas), ampliar T-041 y agregar el campo `RetentionStartsAt` | BK-C02 | 5 o 6 tareas S |
| 5 | Agregar T-048 (infraestructura y CD), T-002.5 y T-002.6, las tareas de ADR-0016 a ADR-0019 y recalcular la ruta crítica | BK-C04, BK-M06, BK-M07, BK-M15 | 10 a 12 tareas S |
| 6 | Completar §4.2 y asignar los endpoints faltantes a tareas | BK-M02, BK-M16 | 1 edición de la arquitectura y 4 a 6 tareas S |
| 7 | Decidir el destino de las 28 reglas MUST sin HU (Should con HU o diferimiento por ADR) | BK-M01, BK-M03 | Decisión del autor y 1 ADR |
| 8 | Alinear los valores y la redacción de RN-113, RN-137, RN-160, RN-166, RN-028, T-015.2 y `UserSession` | BK-M08 a BK-M12 | Ediciones |
| 9 | Agregar el campo de trazabilidad por tarea y generar las tablas del resumen con el script | BK-M04, BK-S01, BK-S02 | 1 script |
| 10 | Completar el seeder, la definición de terminado y la idempotencia | BK-M05, BK-M13, BK-M14 | Ediciones y 2 tareas S |
