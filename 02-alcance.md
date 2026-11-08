# CondoHub — Alcance

> **Fase:** Planificación (Agente PM, BMAD)
> **Fecha:** 2026-11-01
> **Última actualización:** 2026-11-02 (auditoría QA, [auditoria-qa.md](auditoria-qa/auditoria-qa.md))
> **Autor:** Jose Bustamante
> **Documentos relacionados:** [00-constitucion.md](00-constitucion.md) · [01-project-brief.md](01-project-brief.md) · [03-reglas-de-negocio.md](03-reglas-de-negocio.md) · [04-glosario.md](04-glosario.md) · [05-preguntas-abiertas.md](05-preguntas-abiertas.md) · [auditoria-qa.md](auditoria-qa/auditoria-qa.md)

**Criterio rector.** El riesgo R7 (alcance excesivo) tiene probabilidad alta: una sola persona tiene 16 semanas, hasta el 20 de febrero de 2027, para entregar documentación y un prototipo funcional. Además, la constitución impone un piso de calidad, seguridad y cumplimiento que consume buena parte de ese tiempo. Por eso el MVP se limita a los **dos beneficios que un propietario no soltaría**: reservar en minutos y ver en qué se gasta cada sol. Todo lo demás espera.

---

## 0. Requisitos transversales (no entran en la priorización MoSCoW)

Estos requisitos no son funcionalidades que se puedan priorizar. La constitución los vuelve obligatorios para **cada** funcionalidad que se construya, y son la razón principal de que el MVP sea tan pequeño.

| Requisito | Principio | Impacto en el alcance |
|---|---|---|
| Aislamiento por `CondominiumId` con global query filter y test cross-tenant por endpoint | 003 | Se agrega un test de integración por cada endpoint |
| Cifrado de campo AES-256-GCM con claves en Key Vault, TDE, TLS 1.3, Argon2id y MFA para Administrator y BoardMember | 005 | Las búsquedas no pueden usar `LIKE` sobre texto plano. El correo y el DNI llevan un **índice ciego** (HMAC-SHA256 del valor normalizado, con una clave distinta en Key Vault) para el login y la unicidad; no se permiten búsquedas por nombre parcial (A-13 de la auditoría) |
| Textos en `es-PE` con archivos de recursos, sin texto fijo | 001 | Todo texto de UI pasa por `.resx` |
| WCAG 2.1 AA, texto al 200 %, objetivos táctiles de 44×44 px y buen funcionamiento en 3G | 011 | axe en el CI; la UI tiene que ser liviana |
| Cobertura del 70 % (90 % en usuarios), xUnit, Playwright, axe, CodeQL, Postman CLI, gitleaks y commitlint | 008, 010 | El pipeline completo se construye en la semana 1, no al final. En la semana 1 también se verifica en GitHub que los dos rulesets de `main` y el check de rutas protegidas funcionan como exige el ADR-0005 (R2-A02 de la segunda reauditoría) |
| OpenAPI 3.1, colecciones Postman, CHANGELOG, Mermaid y ADR | 012 | Cada funcionalidad incluye su documentación |
| Solo datos sintéticos fuera de producción | 008 | Hace falta un seeder de condominio sintético desde el inicio |

**Retención en el MVP (A-01 de la auditoría).** `DataRetentionJob` y el archivo frío inmutable en Blob Archive **entran en el MVP** (PRINCIPIO-004.5). No se implementa la lectura del archivo: como nadie tiene el rol `RetentionArchiveReader` (D3), toda lectura devuelve `403`.

**Bloqueantes para operar con datos reales.** El MVP puede **demostrarse** con datos sintéticos sin las piezas siguientes, pero **no puede usarse con residentes reales** hasta tenerlas: lectura del archivo frío con elevación por PIM (PRINCIPIO-004.5, diferida en D3), registro de solicitudes ARCO con vencimiento legal (PRINCIPIO-004.6) Libro de Reclamaciones virtual (PRINCIPIO-007, Ley N.° 29571), base legal del tratamiento de datos del padrón antes del consentimiento (RN-057) y de los datos de los invitados (RN-087), e inscripción del banco de datos ante la Autoridad Nacional de Protección de Datos Personales (Q18) (reauditoría RQ-A07; PRINCIPIO-004.1), y el perfil del titular, la recuperación de contraseña, la regeneración de códigos de recuperación y el traspaso de administradora (diferidos por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md)). Si el piloto en el edificio de referencia entra en las 16 semanas, estas piezas pasan a ser obligatorias antes de ese piloto, y sus reglas se escriben solo cuando Q20 lo confirme (M-23).

---

## 1. IN-SCOPE

### Must have: el MVP (6)

| # | Funcionalidad | Descripción | Usuarios | Origen |
|---|---|---|---|---|
| M1 | **Padrón del condominio** | El Administrator registra torres, unidades y personas, y define en cada unidad quién es propietario y quién es inquilino. Antes del consentimiento solo registra lo mínimo para invitar: nombre, correo y vínculo con la unidad. El DNI y el teléfono los ingresa el titular después de aceptar el consentimiento (C-02 de la auditoría). | Administrator | Base de todo permiso |
| M2 | **Acceso seguro, roles y consentimiento** | Los usuarios entran por invitación con contraseña Argon2id y MFA (TOTP) para Administrator y BoardMember, y aceptan un consentimiento informado que incluye la transferencia internacional antes de usar la plataforma. | Todos | PRINCIPIO-004, 005 y 006 |
| M3 | **Reserva de áreas comunes en línea** | Propietarios e inquilinos ven la disponibilidad, reservan un área y registran a sus invitados en un solo flujo. La reserva se confirma automáticamente si cumple las reglas configuradas del área: horario, duración máxima, aforo total (invitados, anfitrión y acompañantes), anticipación máxima y reservas por unidad al mes (A-08 y A-09 de la auditoría). Al iniciar sesión, el residente ve un aviso de sus reservas canceladas por el Administrator (M-11). | Resident, NonResidentOwner y Administrator (configura, reserva a nombre de una unidad y cancela) | Beneficio 1, K2 y K4 |
| M4 | **Vista de portería** | El Concierge ve en la PC de portería las reservas del día con la unidad, el área y la lista de invitados autorizados, y marca el ingreso. | Concierge | K4 (elimina el registro manual y la solicitud de acceso) |
| M5 | **Registro de gastos de la cuota** | El Administrator registra cada gasto (monto, fecha, categoría, proveedor y comprobante adjunto), y propietarios y Junta Directiva ven cada gasto con su comprobante y el total por categoría y por mes, sin datos de residentes ni de unidades específicas (C-03 de la auditoría). | Administrator, BoardMember y NonResidentOwner o Resident propietario | Beneficio 2 |
| M6 | **Contrataciones con sustento visible** | El Administrator registra cada contratación con sus cotizaciones comparadas y la justificación de la elección, la Junta Directiva la aprueba o la rechaza en la plataforma, y los propietarios ven todo el expediente. La decisión se muestra con el cargo ("Junta Directiva") y la fecha-hora, no con el nombre de quien decidió (C-03). Al iniciar sesión, la Junta Directiva ve un contador de contrataciones pendientes de decisión (M-11). | Administrator, BoardMember y propietarios | Beneficio 2 y K5 |

**Por qué estas seis y no otras.** M3–M4 resuelven el beneficio 1 completo: sin la vista de portería, la reserva en línea sigue necesitando los pasos manuales 3 y 4, y K4 no baja de 4 a 1. M5–M6 resuelven el beneficio 2. M1–M2 existen porque sin ellas no se puede saber quién es propietario y quién no, que es la frontera de acceso más importante del producto. Las averías, los pagos y los anuncios son valiosos, pero el edificio puede seguir funcionando con ellos fuera de la plataforma durante el MVP.

### Should have: después del MVP (5)

| # | Funcionalidad | Descripción | Origen |
|---|---|---|---|
| S1 | **Reporte y seguimiento de averías** | El residente reporta una avería con foto y categoría, y ve su estado (reportada, en atención, resuelta) con fecha y hora de cada cambio. | K3; depende de Q12 |
| S2 | **Registro de pagos y estado de cuenta** | El Administrator registra los pagos ya realizados con su constancia adjunta, y cada propietario ve solo su propia deuda y sus propios pagos. | PRINCIPIO-006 y 007 |
| S3 | **Anuncios y convocatorias** | El Administrator y la Junta Directiva publican anuncios y convocatorias a junta dentro de la plataforma, y pueden segmentarlos a todos los residentes o solo a propietarios. | Necesidad del propietario y del inquilino |
| S4 | **Panel de indicadores del piloto** | El sistema calcula K1, K2, K4 y K5 (y K3 cuando exista S1) a partir de los datos de uso, sin mostrar datos de residentes individuales. | Medición de los KPIs del brief |
| S5 | **Importación del padrón desde Excel (CSV)** | El Administrator carga torres, unidades y personas desde una plantilla CSV en lugar de registrarlas una por una. | Reduce la fricción de M1; el administrador hoy trabaja en Excel |

### Could have: si sobra tiempo (4)

| # | Funcionalidad | Descripción | Origen |
|---|---|---|---|
| C1 | **Notificaciones por correo** | El sistema envía un correo cuando se confirma una reserva, cambia el estado de una avería o hay una contratación por aprobar. | Adopción (R1) |
| C2 | **Consultas no vinculantes a propietarios** | La Junta Directiva abre una consulta de opinión a los propietarios, con un aviso explícito de que el resultado no es un acuerdo formal de junta. | Q19; prepara una futura votación formal |
| C3 | **Registro de solicitudes de videovigilancia** | El residente solicita a la administración ver una grabación, y queda registrado quién, cuándo y el motivo, sin almacenar imágenes. | PRINCIPIO-004.4 |
| C4 | **Historial exportable del condominio** | La Junta Directiva exporta en un archivo el expediente de contrataciones y gastos para conservarlo si cambia la administradora. | Q9 y R6 |

---

## 2. OUT-OF-SCOPE (Won't have en esta versión)

| # | Funcionalidad | Por qué queda fuera |
|---|---|---|
| W1 | **App móvil nativa (React Native)** | Construir y probar dos clientes en 16 semanas, en solitario, hace inviable el resto del alcance. La web en Blazor, diseñada para celular primero, cubre a una comunidad que ya usa smartphone. La constitución define el stack móvil para cuando se construya, pero no obliga a construirlo en esta versión. |
| W2 | **Cobro en línea (pasarela, tarjetas, Yape o Plin)** | **Prohibido** por el PRINCIPIO-007: CondoHub registra pagos, nunca los procesa. Además, Q8 sigue abierta y las comisiones dañarían la confianza. |
| W3 | **Votaciones formales y vinculantes de la Junta de Propietarios** | No se sabe si una votación digital es válida bajo la Ley N.° 27157 (Q19, R4). Un acuerdo inválido dañaría justamente la confianza que el producto quiere construir. La aprobación de contrataciones por la Junta Directiva (M6) sí entra, porque es un acto de gestión y no un acuerdo de asamblea. |
| W4 | **Control de acceso biométrico o integración con hardware** (huella, torniquetes, cerraduras, QR en puerta) | La huella es un dato sensible que exige un consentimiento separado y almacenar plantillas cifradas (PRINCIPIO-004.2). El hardware no tiene presupuesto (Q20). La vista de portería (M4) basta para habilitar el acceso. |
| W5 | **Almacenamiento o visualización de videovigilancia** | **Prohibido** por el PRINCIPIO-004.4. Como máximo se registra la solicitud (C3). |
| W6 | **Portal de proveedores (rol Supplier con acceso)** | Los proveedores se registran como datos dentro de M6, sin necesidad de que inicien sesión. Abrirles la plataforma agrega superficie de ataque y una matriz de permisos más compleja. |
| W7 | **Marketplace o directorio de proveedores recomendados, publicidad y comisiones** | Rompe la **neutralidad**, que es un diferenciador central del brief. |
| W8 | **Directorio de vecinos o chat entre residentes** | **Prohibido** por el PRINCIPIO-006: un residente no ve datos de otros residentes. Además, competir con WhatsApp como chat no es la propuesta de valor. |
| W9 | **Contabilidad completa, facturación electrónica SUNAT o emisión de recibos** | CondoHub registra gastos y pagos para dar transparencia, pero no reemplaza el sistema contable de la administradora. Sería otro producto. |
| W10 | **Consola para administradoras con varios condominios** | El brief indica que una administradora gestiona un solo condominio. Una vista transversal requeriría `IgnoreQueryFilters()`, que el PRINCIPIO-003 prohíbe fuera de procesos documentados en un ADR. |
| W11 | **Migración del historial real desde el Excel de la administradora** | Exige consentimiento de los titulares, limpieza de datos y definir de quién son los datos (Q9, Q18). Durante el proyecto solo se usan datos sintéticos (PRINCIPIO-008). |
| W12 | **Registro general de visitantes** (sin una reserva asociada) | Amplía el tratamiento de datos de terceros y la retención a 90 días sin aportar a los dos beneficios centrales. En esta versión solo se registran los invitados de una reserva. |
| W13 | **Idiomas distintos del español de Perú** | El segmento es Lima. Los archivos de recursos (PRINCIPIO-001) dejan la puerta abierta para el futuro sin costo adicional ahora. |

---

## 3. MVP

Con solo el MVP, el **Administrator** carga el condominio (torres, unidades, propietarios e inquilinos), invita a los residentes y configura las áreas comunes con sus reglas. Un **propietario o inquilino** entra desde su celular, acepta el consentimiento y **reserva el salón de fiestas con su lista de invitados en un solo flujo, y recibe la confirmación en minutos** en lugar de esperar un día por correo. El día del evento, el **Concierge** ve la reserva y los invitados en la PC de portería y los deja pasar sin registros en papel ni llamadas. Al mismo tiempo, el Administrator registra cada gasto con su comprobante y cada contratación con sus cotizaciones y su justificación. La **Junta Directiva** aprueba esas contrataciones en la plataforma, y cualquier **propietario**, viva o no en el edificio, puede ver **en qué se gastó cada sol de la cuota y por qué se eligió a cada proveedor**, mientras que el inquilino no accede a esa información. Averías, pagos, anuncios y notificaciones por correo siguen por los canales actuales hasta la siguiente iteración; en el MVP solo hay avisos dentro de la aplicación (M-11 de la auditoría).

---

## 4. Supuestos

| # | Supuesto | Si resulta falso… | Validación |
|---|---|---|---|
| SP1 | La administradora **registrará gastos y contrataciones** en la plataforma aunque eso la exponga a más escrutinio | M5 y M6 quedan vacíos y el beneficio 2 desaparece | Entrevista con la administradora del edificio de referencia (Q7, R2) |
| SP2 | La administración acepta que una reserva que cumple las reglas se **confirme automáticamente**, sin aprobación manual | K2 ≤ 10 min es inalcanzable | Q10 |
| SP3 | Las reglas de las áreas comunes (horario, duración máxima, aforo total, anticipación máxima y reservas por unidad al mes) caben en una configuración simple por área | M3 necesita un motor de reglas y crece mucho | Revisar el reglamento interno (Q11) |
| SP4 | Una **web optimizada para celular** basta para la adopción, sin necesidad de una app de tienda | La adopción cae (R1) y W1 tendría que adelantarse | Prueba de uso con 5 residentes del edificio de referencia |
| SP5 | El personal de portería pertenece a la administradora y usará la PC de portería | M4 no se usa y vuelve el registro en papel | Q15 |
| SP6 | La aprobación de una contratación por la **Junta Directiva** en la plataforma es un registro válido de gestión, sin requerir un acuerdo de asamblea | M6 se reduce a un registro informativo | Revisión normativa (Q19) |
| SP7 | Los dolores del edificio de referencia se repiten en otros edificios del segmento | El producto resuelve un caso aislado | Entrevistas en 3–5 edificios (Q16) |
| SP8 | Los propietarios pagarían S/ 5 por unidad al mes | El modelo de negocio no cierra | Encuesta (Q5) |
| SP9 | El entregable académico es documentación más un prototipo funcional **demostrado con datos sintéticos** | Si se exige un piloto con usuarios reales, los bloqueantes de la sección 0 se vuelven Must | Bases del Diploma (Q20) |
| SP10 | Los costos de Azure del proyecto caben en créditos gratuitos o de estudiante | Habría que recortar servicios o asumir costos | Q20 |
| SP11 | El historial del condominio pertenece a los propietarios y no a la administradora | C4 pierde sentido y R6 se agrava | Revisión legal (Q9) |

---

## 5. Restricciones

### De recursos

- **Una sola persona** cubre producto, arquitectura, desarrollo, pruebas y documentación.
- **Fecha de entrega:** 20 de febrero de 2027, ~16 semanas desde el 1 de noviembre de 2026, con feriados de fin de año de por medio.
- **Presupuesto sin definir** (Q20). No se usan dependencias de pago, es decir, paquetes o librerías con licencia paga (PRINCIPIO-002). Los servicios en la nube no son dependencias y se rigen por el presupuesto (M-13 de la auditoría).
- **Validación con usuarios** limitada a un edificio de referencia.

### Técnicas (constitución)

- Stack fijo: .NET 10, Blazor en modo Auto, SQL Server 2025 con EF Core como único ORM (Dapper prohibido) y Azure South Central US (PRINCIPIO-002). En Azure se usa **Azure SQL Database**, y en local y en el CI **SQL Server 2025 en contenedor** (M-14 de la auditoría; falta aclararlo en el PRINCIPIO-002).
- Solo licencias MIT, Apache-2.0, BSD-2/3-Clause, MS-PL e ISC para las dependencias de runtime, con dependencias directas mantenidas. Cada dependencia nueva requiere aprobación humana en el PR (PRINCIPIO-009). Por C-04 de la auditoría, la lista aplica a las dependencias de runtime, se agrega ISC y las herramientas de desarrollo y CI quedan exceptuadas (excepto GPL y AGPL) (PRINCIPIO-002, versión 1.1 de la constitución).
- Rendimiento: p95 de la API < 500 ms y LCP < 2.5 s en 4G; en 3G, LCP < 4 s con el perfil "Slow 3G". Las páginas de residentes usan render estático en servidor con interactividad solo donde haga falta (PRINCIPIO-010 y 011; A-17 de la auditoría).
- Flujo trunk-based con ramas de máximo 2 días, PR con 1 aprobación humana y Conventional Commits. Los PR del autor humano se mergean sin aprobación si todos los status checks están en verde, también los que cambian `00-constitucion.md` o `.github/workflows/`, que además incluyen un ADR aceptado en el mismo PR. El trailer `Co-Authored-By` de un agente indica asistencia y no bloquea el merge (A-18 de la auditoría; R2-C01 y R2-A01 de la segunda reauditoría; PRINCIPIO-010, versión 1.3 de la constitución).
- **Identidad de los agentes (decidido el 2026-11-01):** GitHub no permite que una persona apruebe su propio PR. Por eso los agentes de IA abren sus PR desde una **GitHub App** propia del proyecto, y el autor humano los revisa y aprueba. La GitHub App no debe poder aprobar ni mergear PR; **todavía no está verificado** y se comprueba en la semana 1 con un caso negativo (R3-A01, ADR-0005).

### Legales y regulatorias

- **Ley N.° 29733** y D.S. 016-2024-JUS: consentimiento previo con transferencia internacional, ARCO, retención de 90 días con archivo en frío y eliminación al año (PRINCIPIO-004). Falta definir quién es el titular del banco de datos (Q18).
- **Ley N.° 27157:** limita lo que puede decidirse en la plataforma frente a la asamblea (Q19). Por eso W3 queda fuera.
- **Ley N.° 29571:** Libro de Reclamaciones virtual antes de operar con usuarios reales (PRINCIPIO-007).
- **No se procesan pagos** (PRINCIPIO-007).

### De acceso y permisos

- Seis roles exactos: Administrator, BoardMember, Resident, NonResidentOwner, Concierge y Supplier (PRINCIPIO-006). Los roles se asignan por condominio y un usuario puede tener varios. BoardMember lo asigna el proceso de plataforma a pedido de la Junta Directiva, y Administrator y BoardMember no pueden coincidir en el mismo usuario del mismo condominio (A-10 de la auditoría).
- Resident y NonResidentOwner ven **solo sus propios datos**. En M5 y M6 quien tiene acceso financiero ve cada gasto y el expediente completo de cada contratación, con sus comprobantes y cotizaciones, pero **nunca** morosidad, datos de residentes ni datos de unidades específicas (C-03 de la auditoría).
- El inquilino no ve presupuestos ni gastos, y no aprueba ni vota.

### De negocio

- **Neutralidad:** sin ingresos de proveedores ni publicidad.
- **Segmento:** edificios multifamiliares de Lima de 1 a 4 torres (~120 a ~480 unidades).

---

## 6. Dependencias

### Servicios externos

| Dependencia | Para qué | Riesgo o nota |
|---|---|---|
| **Azure App Service o Container Apps** | Hospedar la API y Blazor | Costo (Q20) |
| **Azure SQL Database** con TDE (SQL Server 2025 en contenedor en local y en el CI) | Base de datos operativa | Decidido en M-14 de la auditoría. Confirmar que Azure SQL Database en South Central US admite TLS 1.3 como versión mínima (PRINCIPIO-005) |
| **Azure Key Vault** y **Managed Identity** | Claves de cifrado de campo y secretos | Sin Key Vault no se puede guardar ningún dato personal |
| **Azure Blob Storage** (nivel Archive, inmutabilidad, ciclo de vida) | Archivo en frío de retención y comprobantes adjuntos | Los comprobantes de M5 y M6 van en un contenedor normal, separado del archivo de retención, bajo un prefijo por `CondominiumId`. Nunca se exponen con URL pública: se descargan solo por un endpoint de la API (A-11 de la auditoría). Formatos, tamaño y escaneo de malware: Q28 |
| **Microsoft Entra ID con PIM** | Elevación temporal del rol `RetentionArchiveReader` | **Diferida (decidido el 2026-11-01).** PIM requiere la licencia Entra ID P2, que es de pago, así que no se implementa en esta versión. Es una decisión de presupuesto, no de cumplimiento del PRINCIPIO-002 (M-13 de la auditoría). Ver la sección 7 |
| **Servicio de correo** (por ejemplo, Azure Communication Services Email) | Invitaciones y recuperación de contraseña (M2); notificaciones (C1) | Los agentes no pueden enviar correos reales (PRINCIPIO-009); en dev se usa un buzón de prueba |
| **Aplicación autenticadora TOTP** (Microsoft o Google Authenticator) | MFA para Administrator y BoardMember | Se elige TOTP en lugar de SMS para evitar costo por mensaje y otro proveedor |
| **GitHub y GitHub Actions** | Repositorio, branch protection, CODEOWNERS y CI/CD | Incluye una GitHub App del proyecto para los PR de agentes (sección 5) |
| **Herramientas del CI:** CodeQL, Dependabot, gitleaks, Playwright, axe, Postman CLI, commitlint, Lighthouse CI y una herramienta de prueba de carga sin licencia GPL ni AGPL | Puertas de calidad obligatorias (PRINCIPIO-010) y medición de LCP y p95 (A-17 de la auditoría) | Deben estar listas en la semana 1. El repositorio es público para usar CodeQL sin costo (C-04) |
| **Librería Argon2id** open source con licencia permitida | Hash de contraseñas | Elegirla mediante un ADR y verificar que esté mantenida (PRINCIPIO-002) |

### Personas y decisiones

| Dependencia | Para qué | Pregunta |
|---|---|---|
| Administradora del edificio de referencia | Aceptar la confirmación automática y registrar gastos y contrataciones | Q7, Q10 |
| Junta Directiva del edificio de referencia | Patrocinar el uso y aprobar contrataciones en la plataforma | Q6, Q9, Q30 |
| Reglamento interno del edificio | Reglas de las áreas comunes | Q11 |
| Revisión legal | Titularidad del banco de datos y validez de aprobaciones digitales | Q18, Q19 |
| Bases del Diploma | Confirmar el entregable y el presupuesto | Q20 |

---

## 7. Decisiones del autor sobre conflictos con la constitución

La constitución indica que, ante un conflicto con un principio, el trabajo se detiene y se escala a un humano. Estos conflictos se escalaron y el autor los resolvió el 2026-11-01.

| # | Conflicto | Decisión | Pendiente |
|---|---|---|---|
| D1 | **Propietario residente frente a inquilino.** El brief distingue al propietario del inquilino (el inquilino no ve presupuestos ni vota), pero la constitución define un solo rol `Resident` y prohíbe crear roles nuevos. | **Aprobada:** no se crea un rol nuevo. El vínculo persona–unidad (M1) lleva el atributo `OccupancyType` (`Owner` o `Tenant`). La autorización de M5 y M6 exige `NonResidentOwner`, o bien `Resident` con `OccupancyType = Owner`. ADR escrito: [0001-occupancy-type-instead-of-tenant-role.md](docs/adr/0001-occupancy-type-instead-of-tenant-role.md). Matriz creada el 2026-11-02 en [docs/security/permissions-matrix.md](docs/security/permissions-matrix.md), con `Resident (Owner)` y `Resident (Tenant)` como columnas separadas y un test por fila |
| D2 | **Aprobación de PR en un proyecto individual.** La constitución exige 1 aprobación humana por PR, y GitHub no permite autoaprobarse. | **Aprobada:** los agentes abren sus PR desde una GitHub App del proyecto, y el autor los aprueba. Por A-18 de la auditoría, un check del CI rechaza siempre los PR de la GitHub App que modifiquen `00-constitucion.md` o `.github/workflows/`, y los PR del autor se mergean sin aprobación con todos los checks en verde; si tocan esas rutas, además con un ADR aceptado en el mismo PR (R2-C01). `main` tiene dos rulesets: los status checks sin ningún bypass y 1 aprobación con bypass solo para la cuenta del autor. El check de rutas protegidas se ejecuta desde la definición del workflow en `main` (R2-A02). | Crear la GitHub App con permisos mínimos (ramas y PR). Verificar en la semana 1 que GitHub aplica los rulesets y el check como se describe, y que la App no puede aprobar ni mergear un PR del autor (caso negativo, R3-A01): **todavía no está verificado**. Formalizada en el [ADR-0005](docs/adr/0005-agent-pull-requests-and-author-merge-policy.md); el PRINCIPIO-010 incluye la excepción (constitución 1.3) |
| D3 | **Elevación con Entra PIM para `RetentionArchiveReader`** (PRINCIPIO-004.5). PIM requiere la licencia Entra ID P2, que es de pago. | **Diferida:** esta versión no implementa la lectura del archivo en frío ni la elevación con PIM. Esto no viola el principio mientras el producto opere solo con datos sintéticos, porque no hay datos reales archivados que leer. | Formalizada en el [ADR-0006](docs/adr/0006-defer-retention-archive-read-access.md). Antes de operar con datos reales: contratar P2 o **enmendar el PRINCIPIO-004.5** mediante un PR del autor con un ADR aceptado y todos los status checks en verde (PRINCIPIO-010, constitución 1.3). Un agente no puede modificar la constitución (PRINCIPIO-009) |

**Decisiones de la auditoría QA (2026-11-01 y 2026-11-02).** La auditoría del Spec Pack registró 58 hallazgos y las decisiones del autor sobre cada uno en [auditoria-qa.md](auditoria-qa/auditoria-qa.md). Las que cambian este alcance ya están aplicadas arriba y citan su hallazgo (por ejemplo, "C-03 de la auditoría"). Las decisiones de arquitectura están en los ADR 0002 a 0009 de `docs/adr/`, aceptados el 2026-11-02. Las que modifican la constitución (C-04, M-13, M-14, M-17, M-18, A-17, A-18, B-02 y B-05) ya están aplicadas en la versión 1.1 de `00-constitucion.md`, justificada en el [ADR-0009](docs/adr/0009-constitution-amendment-2026-11.md). La segunda reauditoría ([reauditoria-qa-2.md](auditoria-qa/reauditoria-qa-2.md)) llevó la constitución a la versión 1.3 (R2-C01, R2-A01, R2-A02 y R2-A03; ADR-0005 y ADR-0009).
