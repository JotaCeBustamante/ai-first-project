# CondoHub — Preguntas abiertas

> Fase de descubrimiento (Agente Analyst, BMAD). Última actualización: 2026-11-08 (Q25 resuelta; §9 con los pendientes de la validación de prototipos y los hallazgos mayores de la auditoría del Spec Finalizer, Q51 a Q104).
> Preguntas que quedaron sin responder o con respuesta parcial durante la investigación. Cada una debe validarse antes de tomar decisiones de producto o de negocio.

## Leyenda

| Estado | Significado |
|---|---|
| 🔴 Sin respuesta | No se tiene información |
| 🟡 Parcial | Hay una respuesta, pero es ambigua o se basa en un solo caso |
| 🔵 Supuesto | Se asume como cierto, pero falta validarlo con más personas |
| ✅ Resuelta | Se decidió; la respuesta está en la misma fila |

---

## 1. Mercado y competencia

| # | Pregunta | Estado | Cómo validarla |
|---|---|---|---|
| Q1 | ¿Qué soluciones existen hoy en Perú (Komunidad, EdifiSoft, Condominios Perú, ComunidadFeliz, otras), cuánto cuestan y qué cubren? | 🔴 | Investigación de escritorio y demos de cada producto |
| Q2 | Si existen, ¿por qué no se adoptaron en edificios como el del caso de referencia? ¿Por desconocimiento, precio, resistencia de la administradora o porque no cubren la transparencia? | 🔴 | Entrevistas con 3–5 Juntas de Propietarios |
| Q3 | ¿Cuántos edificios multifamiliares de 1 a 4 torres (120–480 unidades) hay en Lima Metropolitana? | 🔴 | Datos de INEI, CAPECO o directorios municipales |

## 2. Modelo de negocio

| # | Pregunta | Estado | Cómo validarla |
|---|---|---|---|
| Q4 | ¿Cuánto cobra una empresa administradora por condominio? ¿El costo de CondoHub sería relevante frente a ese monto? | 🔴 | Consultar a la Junta del edificio y cotizar con 2–3 administradoras |
| Q5 | ¿S/ 5 por unidad al mes es aceptable para otros propietarios, no solo para el caso de referencia? | 🔵 | Encuesta a propietarios de 2 o más edificios |
| Q6 | En el modelo mixto, ¿qué canal se activa primero: alianzas con administradoras (B2B) o venta directa a la Junta (B2B2C)? | 🔴 | Entrevistas con administradoras y Juntas |
| Q7 | ¿Por qué ganaría una administradora al asociarse si la transparencia la expone a más escrutinio? | 🔴 | Entrevistas con 2–3 administradoras |
| Q8 | ¿Es aceptable cobrar cuotas en línea (Yape, Plin) con comisión, o también dañaría la confianza? Ya se descartaron las comisiones de proveedores. | 🟡 | Encuesta a propietarios |
| Q9 | Si la Junta paga y luego cambia de administradora, ¿de quién son los datos e historial del condominio? | 🔴 | Revisión legal y conversación con la Junta |

## 3. Métricas de éxito

| # | Pregunta | Estado | Cómo validarla |
|---|---|---|---|
| Q10 | Meta de tiempo para **completar una reserva**, desde la solicitud hasta la confirmación con acceso habilitado. Hoy toma ~1 día y 4 pasos manuales. **Respuesta: 10 minutos como máximo.** Falta confirmar si la administración acepta aprobar en ese plazo o si la confirmación debe ser automática. | 🟡 | Validar con la administradora |
| Q11 | Reglas de **duración y uso** de las áreas comunes: tiempo máximo por reserva, frecuencia, aforo y número de invitados. ¿Están en el reglamento interno? | 🔴 | Revisar el reglamento interno del edificio |
| Q12 | Tiempo de atención de averías: la meta es 12 h como máximo y hoy toma hasta 3 días. ¿Las 12 h se miden hasta la primera respuesta o hasta la solución? ¿Hay distinción por urgencia (fuga de agua frente a foco quemado)? | 🟡 | Definir con la administradora |
| Q13 | Línea base actual: ¿cuántas incidencias, reservas y mensajes de WhatsApp recibe la administración al mes? | 🔴 | Revisar el correo y Excel de la administración, si los comparte |

## 4. Usuarios

| # | Pregunta | Estado | Cómo validarla |
|---|---|---|---|
| Q14 | ¿El propietario que no vive en el edificio (el que alquila) participa activamente o delega en su inquilino? | 🔴 | Encuesta a propietarios |
| Q15 | ¿El personal de portería de una empresa de seguridad tercerizada (no de la administradora) usaría la herramienta igual? | 🔵 | Validar en 2 o más edificios |
| Q16 | ¿Las experiencias de tu edificio (2 cambios de administración, reservas por correo) se repiten en otros edificios? | 🔵 | Entrevistas en 3–5 edificios |

## 5. Riesgos y restricciones

| # | Pregunta | Estado | Cómo validarla |
|---|---|---|---|
| Q17 | **Riesgo principal: adopción.** ¿Qué haría que un vecino deje el grupo de WhatsApp y use la nueva herramienta? ¿Hay algún incentivo u obligación, como un acuerdo de asamblea? | 🔴 | Entrevistas con residentes |
| Q18 | Cumplimiento de la **Ley N.° 29733** (Protección de Datos Personales) y su reglamento: ¿quién es el titular del banco de datos de residentes (Junta o administradora)? ¿Hay que inscribirlo ante la Autoridad Nacional de Protección de Datos Personales? El consentimiento ya se registra por ficha `Person`, es decir, por condominio (R2-A04: RN-010, RN-012, RN-071); si la respuesta define un titular distinto por condominio o uno único de plataforma, hay que revisar esas reglas. | 🔴 | Revisión normativa |
| Q19 | ¿Hay restricciones legales para las votaciones digitales de la Junta (Ley N.° 27157 y su reglamento) o deben ratificarse en asamblea presencial? | 🔴 | Revisión normativa |
| Q20 | Restricciones del proyecto académico. **Respuesta: entrega final el 20 de febrero de 2027 (~16 semanas desde el 1 de noviembre de 2026), proyecto individual.** El entregable probablemente incluye **documentación y un prototipo funcional** (falta confirmarlo). Falta definir el presupuesto, por ejemplo para hosting. | 🟡 | Revisar las bases del Diploma |

## 6. Reglas de negocio

Preguntas que surgieron al escribir [03-reglas-de-negocio.md](03-reglas-de-negocio.md). Cada una bloquea o puede cambiar las reglas indicadas.

| # | Pregunta | Estado | Reglas afectadas | Cómo validarla |
|---|---|---|---|---|
| Q21 | ¿Qué datos se piden de cada invitado a una reserva: solo el nombre, o también el DNI? Pedir menos datos reduce el tratamiento de datos de terceros (Ley N.° 29733). | 🔴 | RN-027, RN-028 | Definir con la administradora qué necesita portería para dejar pasar a un invitado |
| Q22 | ¿Cuánto tiempo es válida una invitación para crear la cuenta? ¿Cuántos intentos fallidos de TOTP se permiten antes de bloquear la cuenta? **Respuesta (2026-11-02, M-16 de la auditoría): se siguen los requisitos de OWASP ASVS 4.0 nivel 2, y un ADR fija los valores concretos.** | ✅ | RN-007, RN-008 | Decisión de diseño del autor, con referencia a OWASP ASVS |
| Q23 | ¿Hay excepciones al mínimo de 2 cotizaciones por contratación, por ejemplo un proveedor único o una emergencia? | 🔴 | RN-037 | Entrevista con la Junta y la administradora del edificio de referencia |
| Q24 | ¿Basta la decisión de 1 miembro de la Junta Directiva para aprobar una contratación, o se necesita mayoría? ¿Puede decidir un miembro con conflicto de interés? | 🔴 | RN-039 | Revisar el reglamento interno y la Ley N.° 27157 (relacionada con Q19) |
| Q25 | ¿Los propietarios ven una contratación desde que se envía a la Junta Directiva o solo cuando ya tiene una decisión? **Respuesta (2026-11-08, decisión del autor en la auditoría del Spec Finalizer): solo cuando está `Approved`. El Administrator ve todos los estados y la Junta Directiva `Submitted` y `Approved`; lo que un usuario no puede ver responde `404` (RN-041, Q78).** | ✅ | RN-041 | Entrevista con la Junta |
| Q26 | ¿Un gasto registrado puede editarse o anularse? En ese caso, ¿queda un historial visible para los propietarios? **Respuesta (2026-11-01, A-07 de la auditoría): no se edita ni se borra; se corrige con una anulación con motivo, visible para los propietarios.** | ✅ | RN-032 a RN-035 | Entrevista con la Junta y la administradora |
| Q27 | ¿Cuál es la lista cerrada de categorías de gasto? Mientras no se responda, rige el enum provisional `Maintenance`, `Cleaning`, `Security` (RN-035, Q102). | 🔴 | RN-035 | Revisar los informes de gastos actuales de la administradora |
| Q28 | ¿Qué formatos y tamaño máximo se aceptan para comprobantes, cotizaciones y constancias? ¿Se escanean en busca de malware antes de aceptarlos, y con qué servicio (ver el costo en M-13 de la auditoría)? | 🔴 | RN-033, RN-046 | Revisar los comprobantes reales que se reciben (sin copiarlos fuera de producción, PRINCIPIO-008) |
| Q29 | ¿Un residente puede cancelar su propia reserva? ¿Con cuánta anticipación? **Respuesta (2026-11-02, M-10 de la auditoría): sí, hasta el inicio de la franja.** | ✅ | RN-026 | Revisar el reglamento interno (relacionada con Q11) |

## 7. Auditoría QA

Preguntas que surgieron en la auditoría del Spec Pack ([auditoria-qa.md](auditoria-qa/auditoria-qa.md)). La columna "Hallazgo" remite al hallazgo de la auditoría.

| # | Pregunta | Estado | Hallazgo | Reglas afectadas | Cómo validarla |
|---|---|---|---|---|---|
| Q30 | ¿A partir de qué monto un gasto debe estar vinculado a una contratación aprobada por la Junta Directiva? Sin ese umbral, K5 solo mide las contrataciones que el Administrator decide registrar. | 🔴 | A-06 | RN-032 a RN-037 | Entrevista con la Junta y revisión del reglamento interno |
| Q31 | ¿Cómo sabe la aplicación que un cliente negoció TLS 1.2, si en Azure App Service o Container Apps el TLS termina en el front-end de Azure? ¿El hosting elegido expone la versión negociada a la aplicación? | 🔴 | A-12 | RN-014 | Spike técnico en la semana 1 sobre el hosting elegido |
| Q32 | ¿Cómo revoca una persona su consentimiento y qué efectos tiene la revocación (desactivar la cuenta, eliminar o archivar sus datos)? Se cruza con las solicitudes ARCO, que están fuera del MVP. | 🔴 | A-15 | RN-010 a RN-012 | Revisión normativa de la Ley N.° 29733 (relacionada con Q18) |
| Q33 | Si una fila del CSV de importación del padrón (S5) tiene un error, ¿se importan las demás filas o no se importa ninguna? | 🔴 | M-04 | RN-051 | Prueba de uso con la administradora del edificio de referencia |
| Q34 | Los datos de un proveedor persona natural (nombre y RUC 10) son datos personales. ¿Siguen visibles en el expediente de contratación mientras exista, o se archivan 90 días después de terminada la relación como cualquier otro dato personal? | 🔴 | M-21 | RN-041, RN-042, RN-052 | Revisión normativa de la Ley N.° 29733 (relacionada con Q18) |

## 8. Auditoría QA del backlog

Preguntas que surgieron en la auditoría del backlog técnico ([auditoria-backlog-qa.md](auditoria-qa/auditoria-backlog-qa.md)). Cada una corresponde a un hallazgo mayor (BK-M); la acción propuesta está en el hallazgo. Los hallazgos críticos BK-C01 a BK-C04 se corrigieron en [08-backlog.md](08-backlog.md) (T-011, T-047, T-048 y T-049, con HU-001B). BK-C05 se cerró el 2026-11-04: el autor aprobó la arquitectura, el backlog, los ADR-0011 a ADR-0015 y RN-158 a RN-162. En la versión v0.4 del Spec Pack (2026-11-04) se resolvieron también los 16 hallazgos mayores; cada respuesta indica dónde quedó el cambio.

| # | Pregunta | Estado | Hallazgo | Reglas afectadas | Cómo validarla |
|---|---|---|---|---|---|
| Q35 | 28 reglas MUST no tienen HU ni tarea porque se descartaron HU-S01 a HU-S10. Por cada grupo (perfil del titular, cambio de correo, recuperación de contraseña, regeneración de códigos de recuperación, aviso de TLS 1.2, puerta sin vínculos ni roles, reactivación al aceptar una invitación, traspaso de administradora y vista del log para la Junta), ¿se implementa como funcionalidad Should con su HU o se difiere con un ADR como el ADR-0010? RN-115 (recuperar la contraseña) es la más sensible: sin ella, quien la olvida no tiene salida. **Respuesta (2026-11-04): se difieren con el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md) las 17 reglas que siguen sin tarea. De las otras 11, 10 quedaron cubiertas por T-041, T-047, T-048 y T-049, y RN-072 no se difiere porque es una prohibición que ya cumple el selector de T-014.4. RN-006, que estaba parcial, la cumple el modelo de T-007.1.** | ✅ | BK-M01 | RN-006, RN-014, RN-063, RN-069, RN-072, RN-115, RN-124, RN-134, RN-141, RN-145, RN-146, RN-148 a RN-152, RN-154 a RN-156 | Decisión del autor por grupo, escrita en el alcance o en un ADR |
| Q36 | ¿Se completa el mapa de endpoints de [07-architecture.md](07-architecture.md) §4.2 con torres, `GET /api/persons/{id}`, listas de unidades y personas, mis reservas, proveedores, edición de contrataciones y cotizaciones, `PUT`/`DELETE /api/expenses/{id}` (para responder `422 EXPENSE_IMMUTABLE` y no `405`) y la lista de contrataciones? ¿Qué tarea implementa `POST /api/auth/sign-out`? **Respuesta (2026-11-04, v0.4): §4.2 se completó con torres, consultas del padrón, `PUT /api/occupancies/{id}`, mis reservas, proveedores, edición de contrataciones y cotizaciones, `PUT`/`DELETE /api/expenses/{id}` y la lista de contrataciones. Tareas: T-018.4, T-018.5, T-022.4, T-031.1 a T-031.3, T-032 y T-034. El cierre de sesión es T-013.5.** | ✅ | BK-M02 | RN-158, RN-091 | Revisión del autor de §4.2 contra los criterios de las HU |
| Q37 | T-038 (Platform CLI) es Should, pero implementa reglas MUST (auditoría de plataforma, asignación de BoardMember, primera invitación del Administrator) y no tiene el comando de traspaso de administradora (diferido por el ADR-0020, 2026-11-04). ¿Se divide en una parte Must y otra Should, o se deja Should y se difieren esas reglas mientras no haya datos reales? **Respuesta (2026-11-04, v0.4): T-038 pasa a Must (alta de condominio, Administrator y BoardMember, con auditoría) y el reinicio de MFA queda como T-050 (Should). El traspaso está diferido por el ADR-0020.** | ✅ | BK-M03 | RN-007, RN-062, RN-063, RN-066, RN-067, RN-137, RN-139 | Decisión del autor |
| Q38 | ¿Se agrega a cada tarea un campo "Trazabilidad" (HU, lista de RN o fila del alcance §0 con su PRINCIPIO)? Hoy T-038, T-039, T-040 y T-041 citan HU que no contienen lo que hacen, y 20 tareas dicen solo "Infraestructura". **Respuesta (2026-11-04, v0.4): T-038 a T-041 citan sus reglas en lugar de una HU forzada, T-014.4 cita RN-008, y el resumen del backlog tiene la tabla "Trazabilidad de las tareas sin HU".** | ✅ | BK-M04 | RN-028, RN-060, RN-073, RN-089, RN-136, RN-166 | Decisión del autor; verificable con el script del backlog |
| Q39 | ¿La definición de terminado de cada tarea con endpoint incluye `openapi.json`, los requests de Postman y la entrada del CHANGELOG (PRINCIPIO-012)? En ese caso, ¿T-045 pasa a la Fase 0 como infraestructura del check y Postman se ejecuta en el CI y no contra el entorno local? **Respuesta (2026-11-04, v0.4): Sí. La definición de terminado incluye `openapi.json`, los requests de Postman y la entrada del CHANGELOG. T-045 pasó a la Fase 0 y ejecuta Postman CLI en el CI.** | ✅ | BK-M05 | — (PRINCIPIO-010, PRINCIPIO-012) | Decisión del autor |
| Q40 | ¿Qué tareas agregan las puertas del CI que exige la constitución y faltan: cobertura ≥ 90 % en Identity & Access como umbral que falla, escaneo de dependencias vulnerables, analizador de literales en `.razor`, lista de denegación de SDK de pasarelas y test de límites entre módulos? **Respuesta (2026-11-04, v0.4): T-002.1 agrega el umbral del 90 % en Identity & Access, T-002.5 el escaneo de vulnerabilidades y la lista de denegación, T-051 el analizador de literales y T-052 el test de límites entre módulos. Las tareas que tocan `.github/workflows/` llevan "Ejecuta: autor humano".** | ✅ | BK-M06 | RN-045, RN-054 | Revisión del PRINCIPIO-010 contra T-002 |
| Q41 | ¿Qué tarea verifica en la semana 1 los dos rulesets de `main`, el check de rutas protegidas y que la GitHub App no puede aprobar ni mergear (ADR-0005, D2)? El alcance §5 lo marca "todavía no está verificado". **Respuesta (2026-11-04, v0.4): T-002.6 crea la GitHub App y verifica los dos rulesets y el check de rutas protegidas, con el caso negativo de la App.** | ✅ | BK-M07 | — (ADR-0005) | Prueba con un PR de la GitHub App y uno del autor |
| Q42 | ¿`UserSession` tiene `CondominiumId`? §3.1 dice que no y §3.3 le da la columna. Si se renombra a `SelectedCondominiumId` sin `ITenantOwned`, el test de T-005.3 necesita la excepción explícita. **Respuesta (2026-11-04, v0.4): No. La columna se llama `SelectedCondominiumId`, no es tenant, y T-005.3 la trata como excepción explícita.** | ✅ | BK-M08 | RN-113, RN-137 | Decisión del autor en [07-architecture.md](07-architecture.md) |
| Q43 | Tres valores no coinciden entre regla y tarea: (a) ¿la anticipación máxima de un área también debe ser múltiplo de 60 s, como dicen API-02 y T-019, o solo la duración, como dice RN-160? (b) T-015.2 dice "(inclusive)" a los 604,800 s, pero RN-110 y su criterio aceptan ese instante. (c) ¿La sesión inactiva expira exactamente a los 1,800 s? **Respuesta (2026-11-04, v0.4): (a) RN-160 también exige múltiplo de 60 s para la anticipación máxima. (b) T-015.2 dice "cuando han pasado más de 604,800 s". (c) RN-113: la sesión expira a los 1,800 s exactos, probado en T-010.2.** | ✅ | BK-M09 | RN-110, RN-113, RN-160 | Decisión del autor; (b) es una corrección de redacción |
| Q44 | La caché de sesión de 30 s por réplica deja servir una sesión revocada hasta 30 s. ¿Se invalida la caché o se baja el TTL, o se acepta el desfase y se escribe en RN-137 ("en 30 s o menos")? **Respuesta (2026-11-04, v0.4): Caché de 5 s que la réplica que revoca invalida al instante. RN-137 fija "de inmediato en la instancia que revoca y en 5 s o menos en las demás" (ADR-0013, T-010.2, T-041).** | ✅ | BK-M10 | RN-137 | Decisión del autor (ADR-0013) |
| Q45 | RN-166 prohíbe archivos sin registro, pero la arquitectura los deja `Pending` hasta 1 h. ¿Se reescribe RN-166 con ese plazo o se borra el blob de forma síncrona cuando falla la transacción? **Respuesta (2026-11-04, v0.4): Las dos cosas: el blob se borra en el momento si la transacción falla, y el job queda como red de seguridad de 1 h. RN-166 se reescribió con ese plazo (T-029.3).** | ✅ | BK-M11 | RN-166 | Decisión del autor |
| Q46 | T-039.3 cuenta los 90 días desde la visita, pero RN-028 los cuenta desde la cancelación en una reserva `Cancelled`. ¿Se reescribe T-039.3 con los dos relojes? **Respuesta (2026-11-04, v0.4): Sí. T-039.3 usa los dos relojes, con el caso de la reserva cancelada en su criterio.** | ✅ | BK-M12 | RN-028, RN-089 | Corrección de T-039.3; el ejemplo está en el hallazgo |
| Q47 | ¿Se agrega al seeder (T-009) una tabla "dato → HU que lo usa" con los datos que faltan: Ana en los dos condominios, Raúl como persona, el vínculo futuro de Carla, la `EndDate` de Luis, las reservas de A-1104 y del 2026-12-12 y la contratación "Cambio de luminarias"? **Respuesta (2026-11-04, v0.4): Sí. T-009.2 a T-009.4 siembran esos datos (más Sofía Torres para HU-001B), y T-009.4 tiene la tabla "Dato → HU".** | ✅ | BK-M13 | — (independencia INVEST de 15 HU) | Recorrer los criterios "con el seeder" de [06-user-stories.md](06-user-stories.md) |
| Q48 | ¿La idempotencia del ADR-0014 se extiende a `POST /api/reservations/{id}/guests` (un reenvío duplica al invitado) y a `POST /api/expenses` (un gasto duplicado solo se corrige anulándolo)? **Respuesta (2026-11-04, v0.4): Sí, en las dos: T-025 (invitados) y T-030 (gastos), con su prueba de reenvío en T-042 (ADR-0014).** | ✅ | BK-M14 | RN-091, RN-163 | Decisión del autor (ADR-0014) |
| Q49 | ¿Quién escribe y cuándo los ADR pendientes de §5 (Argon2id, TOTP, hosting con TLS y adjuntos)? T-013.1 y T-014.1 están bloqueadas hasta aprobar sus librerías, y ninguna tarea produce el ADR que permite aprobarlas. **Respuesta (2026-11-04, v0.4): T-053 (ADR-0016, Argon2id), T-054 (ADR-0017, TOTP), T-048.4 (ADR-0018, hosting y TLS) y T-055 (ADR-0019, adjuntos). T-013.1, T-014.1 y T-029.2 dependen de ellas.** | ✅ | BK-M15 | RN-009, RN-033, RN-046 | Agregar cuatro tareas S a la Fase 0 |
| Q50 | Cinco criterios de HU no los verifica ninguna tarea: aforo o cierre sin efecto en reservas `Confirmed` (HU-004), aviso de privacidad del primer invitado (HU-007), `403 PERSONAL_DATA_FORBIDDEN` del Concierge (HU-009), `403 PERSONAL_DATA_OWNER_ONLY` (HU-001, diferido por el ADR-0020) y objetivos táctiles de 44×44 px en todas las páginas. ¿Se agregan esos criterios y se define `GUEST_PRIVACY_NOTICE_REQUIRED` (`422`) en RN-087 y API-03? **Respuesta (2026-11-04, v0.4): T-019 prueba RN-162, T-025 y T-027.3 prueban el aviso con `GUEST_PRIVACY_NOTICE_REQUIRED` (definido en RN-087 y API-03), T-018.4 prueba el `403` del Concierge, T-046.3 mide los 44×44 px, y `PERSONAL_DATA_OWNER_ONLY` está diferido por el ADR-0020.** | ✅ | BK-M16 | RN-056, RN-087, RN-146, RN-158, RN-162 | Revisión de los criterios de [06-user-stories.md](06-user-stories.md) contra el backlog |

## 9. Validación de prototipos y auditoría del Spec Finalizer

Preguntas que surgieron en la validación de los prototipos ([10-validation-log.md](10-validation-log.md), filas ⏳ PENDIENTE) y en la auditoría del Spec Finalizer ([docs/validation/auditoria-spec-finalizer.md](docs/validation/auditoria-spec-finalizer.md)), ambas del 2026-11-08. Son **hallazgos mayores**: ninguno bloquea la implementación, porque cada uno tiene un **valor por defecto** que un agente aplica mientras el autor no decida otra cosa (decisión del autor del 2026-11-08). Si el autor cambia un valor, se revisan las reglas, las HU y las tareas de esa fila.

| Estado | Significado en esta sección |
|---|---|
| 🔵 Supuesto | Rige el valor por defecto de la columna "Valor por defecto vigente" |
| ✅ Resuelta | El cambio ya está en el Spec Pack; la columna dice dónde |

### 9.1 Pendientes de la validación de prototipos (Q51 a Q95)

| # | Pregunta | Estado | Fila de 10 | HU / RN afectadas | Valor por defecto vigente |
|---|---|---|---|---|---|
| Q51 | ¿Un código incorrecto durante el enrolamiento TOTP (P-003) suma al contador de bloqueo de RN-111? | 🔵 | 16 | HU-003; RN-111, RN-140 | Sí: suma al mismo contador por cuenta que la contraseña y el TOTP, con `SIGN_IN_FAILED` |
| Q52 | ¿Qué hace el sistema con un `returnUrl` externo, y qué criterio lo prueba? | 🔵 | 17 | HU-003B; RN-074 | Solo se acepta una ruta local que empiece con `/` y no con `//`; cualquier otra se ignora y se navega a P-010. Lo prueba T-063 |
| Q53 | ¿Qué hace quien olvidó su contraseña o perdió su autenticador, si RN-115 y RN-141 están diferidas? | 🔵 | 18 | HU-003, HU-003B; RN-062, RN-115 ⏸, RN-141 ⏸ | Los textos dicen "Comunícate con la administración". El Administrator escala al operador de plataforma: reinicio de MFA con T-050 (Should); en la demo, el seeder. No hay restablecimiento de contraseña en el MVP (ADR-0020) |
| Q54 | ¿El rate limit de `/api/auth/*` tiene regla y criterio? | ✅ | 19 | HU-003B; RN-177 | RN-177 (`429 AUTH_RATE_LIMITED`), criterio en HU-003B, T-013.4 |
| Q55 | ¿Los enlaces de cambio de método de P-002 conservan `returnUrl` sin JavaScript? | 🔵 | 22 | HU-003; RN-074, RN-122 | Sí: ambos enlaces llevan el `returnUrl` en la consulta |
| Q56 | ¿Cuánto dura la sesión parcial y qué estados comunes tienen P-002 a P-005? | ✅ | 23 | HU-003B, HU-002B; RN-113 | 300 s, solo para los pasos de acceso y el consentimiento ([07-architecture.md](07-architecture.md) §4.1, ADR-0013). Vencida → P-001; `429` con `AUTH_RATE_LIMITED` en P-001 y P-002 (09 §3.0.4) |
| Q57 | ¿RN-070 (rechazo del consentimiento) se aplica por condominio? | 🔵 | 26 | HU-002B; RN-070, RN-012 | Sí: rechazar en un condominio impide entrar a ese condominio, pero no desactiva la cuenta si tiene consentimiento vigente en otro |
| Q58 | ¿Qué pasa al abrir una invitación con la sesión iniciada, propia o de otra cuenta? | 🔵 | 27 | HU-002; RN-122, RN-153 | Se acepta con `POST` solo si el correo de la sesión coincide con el de la invitación (destino P-007, P-005 o P-010). Si no coincide, se cierra la sesión y se pide entrar con el correo invitado, con mensaje neutro |
| Q59 | ¿Cómo se mide el largo de la contraseña (RN-116) y se limita en el navegador? | 🔵 | 28 | HU-002; RN-116 | Se cuentan puntos de código Unicode después de normalizar a NFC; sin `maxlength` en el campo; el servidor responde `PASSWORD_LENGTH_INVALID` |
| Q60 | ¿Hasta cuándo se muestra el aviso de cancelación (RN-088)? | 🔵 | 30 | HU-008; RN-088 | Mientras el aviso no esté marcado como visto con "Entendido"; si no se pulsa, vuelve a verse en el siguiente inicio de sesión |
| Q61 | ¿`cancelledBy` guarda el rol o la persona, y quién recibe el aviso? | 🔵 | 31 | HU-008; RN-084, RN-088 | Se usa la persona que canceló (`CancelledByUserId`, ya en el modelo de [07-architecture.md](07-architecture.md) §3.3), no solo el rol. El aviso sale si canceló **otra** persona con rol Administrator; el texto distingue "Cancelaste" de "Canceló la administración" |
| Q62 | ¿Qué fecha usa la reserva si se cambia la fecha en P-012 sin "Ver disponibilidad"? | 🔵 | 34 | HU-005; RN-024, RN-080 | La fecha del formulario de confirmación, que se muestra como "Reservando para el {fecha}" junto al botón; el servidor solo usa la fecha enviada en ese `POST` |
| Q63 | ¿Qué códigos tiene el anfitrión elegido por el Administrator, y quién puede ser anfitrión en una unidad alquilada? | ✅ | 37 | HU-006B; RN-178, RN-077 | RN-178: `RESERVATION_HOST_NOT_SELECTED`, `RESERVATION_HOST_NOT_LINKED`; con un inquilino activo, el anfitrión debe ser inquilino o `RESERVATION_UNIT_RENTED` (valor por defecto; el autor puede cambiarlo). T-067 |
| Q64 | ¿La aceptación del aviso de privacidad de invitados es por reserva o por usuario? | 🔵 | 40 | HU-007; RN-087 ⚠️ Q18, Q21 | Por reserva: se guardan `privacyNoticeAcceptedAt` y `acceptedBy`; en el modo Administrator lo acepta el Administrator |
| Q65 | ¿Dónde se muestra el rechazo de una cancelación tardía o repetida? | 🔵 | 41 | HU-008; RN-083, RN-168 | En P-015, con el error en el resumen (T-070) |
| Q66 | ¿Qué fecha muestra portería al cambiar de día? | 🔵 | 42 | HU-009; RN-029, RN-164 | El `<h1>` se toma del campo `date` de cada respuesta `200`; a las 00:00:00 la lista pasa al día nuevo |
| Q67 | ¿Qué ve portería si pierde la conexión? | 🔵 | 44 | HU-009; RN-026 | Después de 60 s sin respuesta: aviso "Desactualizada desde hh:mm" y "Marcar ingreso" deshabilitado; el Concierge confirma con la administración antes de dejar pasar |
| Q68 | ¿Portería exige `no-store` y con qué prueba? | ✅ | 45 | HU-003B, HU-009; RN-074, RN-158 | `Cache-Control: no-store` en `/concierge` y `GET /api/concierge/today` ([07-architecture.md](07-architecture.md) §4.1); prueba E2E en T-063 |
| Q69 | ¿Se marcan ingresos en reservas que ya terminaron hoy, y se siguen mostrando? | 🔵 | 46 | HU-009; RN-164 | Se mantiene RN-164: se muestran las reservas `Confirmed` del día hasta las 23:59:59 y se puede marcar ingreso en cualquiera de ellas |
| Q70 | ¿Qué hace el Concierge si el invitado no está en la lista? | 🔵 | 47 | HU-009; RN-158 | Fuera del sistema: llama al anfitrión o a la administración. No hay alta de invitados desde portería en el MVP |
| Q71 | ¿Qué muestra P-030 con un mes futuro? | 🔵 | 49 | HU-011; RN-035 | El mismo mensaje que un mes sin gastos ("No hay gastos registrados para este mes."), no un error de formato (RN-035) |
| Q72 | ¿El gasto vinculado debe ser del proveedor elegido y respetar el monto adjudicado (Q30)? | 🔵 | 52 | HU-010B; RN-095 ⚠️ Q30 | No se exige proveedor ni tope mientras Q30 siga abierta (RN-095 vigente) |
| Q73 | ¿Existe el estado "gasto sin comprobante"? | 🔵 | 53 | HU-011; RN-033 | No: se retira de la ficha, porque RN-033 no permite ese gasto |
| Q74 | ¿El vínculo gasto–contratación se puede cambiar, quitar o crear sobre un gasto anulado? | 🔵 | 54 | HU-010B; RN-091, RN-095 | Es único e inmutable. Un gasto anulado o ya vinculado no se vincula (`422`, con los códigos `EXPENSE_VOIDED` y `EXPENSE_ALREADY_LINKED` cuando el autor los apruebe; mientras tanto, `EXPENSE_IMMUTABLE`). Se corrige anulando el gasto y registrándolo de nuevo |
| Q75 | ¿Un gasto vinculado puede ser anterior a la aprobación de la contratación? | 🔵 | 55 | HU-010B; RN-095 | Sí (adelantos): solo se exige que la contratación esté `Approved` al vincular |
| Q76 | ¿El signo de un monto pasa el formato de RN-173? | 🔵 | 57 | HU-010; RN-034, RN-093, RN-173 | Sí: `"-350.00"` pasa el formato y lo rechaza RN-034; el `pattern` del navegador es solo una ayuda (`novalidate`) |
| Q77 | ¿La idempotencia de `POST /api/expenses` tiene regla? | ✅ | 58 | HU-010; RN-163 | RN-163 ampliada a gastos e invitados (ADR-0014); criterio en HU-010; T-030 |
| Q78 | ¿Qué contrataciones ve cada rol y qué responde lo oculto (Q25)? | ✅ | 59 | HU-013, HU-014; RN-041 | Administrator todas; BoardMember `Submitted` y `Approved`; propietarios solo `Approved`; lo oculto responde `404` (RN-041, matriz H3, P-040, P-041, T-071) |
| Q79 | ¿Cómo se cifra y qué ve un propietario de un proveedor persona natural mientras Q34 siga abierta? | 🔵 | 63 | HU-014; RN-041, RN-052 ⚠️ Q34 | Un solo campo de nombre cifrado con el RUC 10 (RN-052); el expediente `Approved` muestra el nombre mientras Q34 no diga otra cosa |
| Q80 | ¿Qué pasa si dos miembros de la Junta deciden a la vez? | ✅ | 64 | HU-013; RN-179 | RN-179 (`409 HIRE_DECISION_CONFLICT`), criterio en HU-013, T-034 |
| Q81 | ¿Dónde se adjunta "la garantía por escrito" de HU-012 C14? | 🔵 | 65 | HU-012; RN-041 | No hay "documentos adicionales" en el MVP: la garantía reemplaza el documento de la cotización correspondiente |
| Q82 | ¿El PDF de cada cotización es obligatorio para enviar a la Junta? | 🔵 | 66 | HU-012; RN-037, RN-041; Q28 | No es obligatorio en el MVP; F8 no exige "con su PDF" |
| Q83 | ¿La matriz de permisos tiene la fila "Registrar proveedor"? | ✅ | 69 | HU-012; RN-042 | Fila H5 de [docs/security/permissions-matrix.md](docs/security/permissions-matrix.md) con el test `Authz_Vendors_Write` |
| Q84 | ¿Qué ve el Administrator al volver de P-043? | 🔵 | 70 | HU-012 | El aviso "Registraste al proveedor {razón social}." y el proveedor preseleccionado (T-072) |
| Q85 | ¿RN-153 (mensaje neutro) aplica a la búsqueda por correo del Administrator, y qué nombre prevalece al reutilizar una ficha (RN-132)? | 🔵 | 71 | HU-001; RN-132, RN-153 | RN-153 no aplica dentro del padrón del propio Administrator (puede buscar por correo exacto). Al reutilizar una ficha prevalece el nombre guardado y se muestra "La persona ya estaba en el padrón; se agregó el vínculo." |
| Q86 | ¿Se aceptan números de unidad con ceros a la izquierda? | 🔵 | 72 | HU-001; RN-003, RN-058 | No: el formato es `^[1-9]\d{2,3}$`; `0502` responde `UNIT_NUMBER_INVALID_FORMAT` |
| Q87 | ¿Dónde se termina o modifica un vínculo y se corrige una unidad? | 🔵 | 73 | HU-001; RN-016, RN-059, RN-060 | Por API (T-018.5) y en el seeder; la acción en P-052 queda para después del MVP. Las matrices R1 y R2 rigen para la API |
| Q88 | ¿RN-002 considera una invitación pendiente como `NonResidentOwner`? | 🔵 | 74 | HU-001, HU-001B; RN-002 | Sí: con una invitación pendiente como NRO no se registra un vínculo `Tenant` (`OCCUPANCY_TENANT_NOT_ALLOWED`), y P-006 lo vuelve a verificar al aceptar |
| Q89 | ¿Qué regla impide vínculos duplicados o superpuestos? | ✅ | 75 | HU-001; RN-176 | RN-176 (`OCCUPANCY_OVERLAP`), criterio en HU-001, T-075 |
| Q90 | ¿Cómo se da de alta al personal de portería si toda invitación exige un vínculo (RN-175)? | 🔵 | 77 | HU-009; RN-175 | En el MVP, el Concierge viene del seeder (Raúl Mendoza) o del Platform CLI; no se inventa un vínculo `Tenant`. El autor decide el camino definitivo con un ADR |
| Q91 | ¿Un vínculo nuevo restituye un rol revocado por RN-060? | 🔵 | 78 | HU-001B; RN-007, RN-060, RN-122 | No: el rol vuelve solo con una invitación nueva |
| Q92 | ¿Qué pasa con un `returnUrl` a otro condominio o un `condominiumId` ajeno en P-005? | 🔵 | 91 | HU-003; RN-064, RN-103 | `returnUrl` a un recurso de otro condominio → P-091 (`404`); `condominiumId` ajeno → `404`. Prueba en T-063 |
| Q93 | ¿Se puede cambiar de condominio dentro de la sesión? | 🔵 | 92 | RN-064 | No en el MVP: se cierra sesión y se vuelve a entrar |
| Q94 | ¿La cancelación tiene control de concurrencia (`409`)? | 🔵 | 117 | HU-008; RN-168 | No: la segunda cancelación recibe `RESERVATION_ALREADY_CANCELLED` (RN-168); se quita la opción `409` de P-016 |
| Q95 | ¿Cómo se resuelven las decisiones Baja de reglas, textos o fichas (filas 87, 89, 90, 93, 100, 101, 103, 113, 126, 128, 133, 137, 141, 142, 148, 153, 157, 159, 161, 162, 163 y 166)? | 🔵 | Varias | Las de cada fila | Se aplica la "Acción sugerida" de cada fila de 10 al implementar la HU afectada; si la fila propone dos alternativas, rige la primera |

### 9.2 Hallazgos mayores de la auditoría del Spec Finalizer (Q96 a Q104)

| # | Pregunta | Estado | Hallazgo | Reglas afectadas | Respuesta o valor por defecto vigente |
|---|---|---|---|---|---|
| Q96 | Solo 8 endpoints tienen contrato detallado en [07-architecture.md](07-architecture.md) §4.3. ¿Cómo implementa un agente los demás? | 🔵 | Arquitectura §4 | Todas las de endpoints sin contrato | El agente deriva el contrato de §4.1 (convenciones), §4.2 (mapa), los códigos de 03, el bloque "Datos" de la ficha de 09 y los criterios de la HU, y lo publica en `docs/api/openapi.json` (PRINCIPIO-012); el PR lo revisa el autor |
| Q97 | Varios códigos de error se usaban sin estar en 03 (`ATTACHMENT_TOO_LARGE`, `ATTACHMENT_TYPE_NOT_ALLOWED`, `CONSENT_REQUIRED`, `IDEMPOTENCY_KEY_MISSING`, `MFA_REQUIRED`), y 07 no tenía los de RN-169 a RN-179. ¿Cuál es el catálogo? | ✅ | IDs y códigos | RN-102 | Catálogo único: 03 más los transversales de 07 §4.1 y los de adjuntos de API-06; 07 §4.4 lista los nuevos; T-004 construye el catálogo completo |
| Q98 | RN-046, RN-047, RN-049 y RN-125 son MUST pero gobiernan S2 y S4. ¿Se implementan en el MVP? | ✅ | Trazabilidad RN → HU | RN-046, RN-047, RN-049, RN-125 | No: llevan la marca ⏭ en 03 (MUST cuando se construya la funcionalidad) |
| Q99 | El glosario no tenía los términos técnicos de 07 a 09 y sus identificadores no coincidían con el modelo. | ✅ | Glosario | — | [04-glosario.md](04-glosario.md) v2026-11-08: identificadores sincronizados con 07 §3.3 y sección "Términos técnicos" |
| Q100 | ¿En qué unidad está la estimación del backlog? | ✅ | Backlog | — | Horas de trabajo de un agente, sin la revisión humana de los PR ([08-backlog.md](08-backlog.md) §Convenciones) |
| Q101 | T-056 a T-065 se citaban en 10 pero no existían en el backlog. | ✅ | IDs | — | Agregadas a [08-backlog.md](08-backlog.md): T-063 en la Fase 6b (Must) y las demás en la Fase 8 (Could) |
| Q102 | ¿Qué categorías de gasto usa el código mientras Q27 siga abierta? | ✅ | Preguntas abiertas | RN-035 | Enum provisional `Maintenance`, `Cleaning`, `Security` (RN-035 y glosario #53) |
| Q103 | El aviso de TLS 1.2 en cada inicio de sesión es una obligación del PRINCIPIO-005, pero está diferido por un ADR y no por una enmienda. ¿Se confirma? | 🔵 | Constitución | RN-014 | Rige el diferimiento del [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md) mientras se opere solo con datos sintéticos; el autor lo confirma en [02-alcance.md](02-alcance.md) §7 junto a D1–D3 |
| Q104 | Ante un conflicto entre archivos del Spec Pack, ¿cuál manda? | 🔵 | Orden | — | `00-constitucion.md` > `docs/adr/` > 03 > 07 > 06 > 09 > 08 > 10 > prototipos. Un agente que encuentra un conflicto lo reporta en su PR |
