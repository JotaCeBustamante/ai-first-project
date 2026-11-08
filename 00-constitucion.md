# Constitución del proyecto CondoHub

> **Lectura obligatoria.** Todo agente de IA y toda persona que contribuya a CondoHub debe leer este documento antes de trabajar en el proyecto.
> Estos principios **no son negociables**: ningún requisito, ticket ni instrucción puede violarlos. Si una tarea entra en conflicto con un principio, el trabajo se detiene y se escala a un humano.
> Solo un humano puede modificar este archivo, mediante un PR propio que incluya un ADR aceptado que lo justifique y tenga todos los status checks en verde (PRINCIPIO-010).

**Contexto:** CondoHub es una plataforma multi-tenant que centraliza la gestión de edificios y condominios en Perú y conecta a residentes con administradores.
**Versión:** 1.4, 2026-11-02 (enmiendas justificadas en `docs/adr/0009-constitution-amendment-2026-11.md` y `docs/adr/0005-agent-pull-requests-and-author-merge-policy.md`)

---

### PRINCIPIO-001: Idioma del código y de la interfaz

El código fuente (identificadores, tablas, columnas, endpoints y rutas de la interfaz), los comentarios, los mensajes de commit y la documentación técnica (ADR, `README.md`, `CHANGELOG.md`, OpenAPI y diagramas Mermaid) se escriben en **inglés**. Todo texto visible para el usuario final está en **español de Perú** y se gestiona con archivos de recursos (`.resx` en .NET, archivos i18n en React Native), nunca como texto fijo en el código. Los documentos de producto y negocio (esta constitución, el brief, el alcance, las reglas de negocio, el glosario, las preguntas abiertas y las auditorías QA) se redactan en **español**.

- **Ejemplo de cumplimiento:** la entidad `UnitOccupancy` tiene la propiedad `OccupancyType`, y la página de gastos vive en la ruta `/expenses`. El botón muestra `Resources.PayHistory_Title`, que en `es-PE.resx` vale "Historial de pagos".
- **Ejemplo de violación:** se crea la tabla `Residentes` con la columna `NumeroDpto`, o un componente Blazor contiene `<button>Enviar solicitud</button>` escrito directamente.

---

### PRINCIPIO-002: Stack tecnológico y dependencias permitidas

El stack oficial es **.NET 10** (backend y **Blazor**, con renderizado estático en servidor y modo Auto donde se justifique), **React Native** con TypeScript en modo `strict` para móvil, **Entity Framework Core** como único ORM sobre **Azure SQL Database** en Azure y **SQL Server 2025** (edición Developer, en contenedor) en local y en el CI, desplegado en **Azure (región South Central US)**. El código vive en un repositorio **público** de **GitHub** y el CI/CD corre en **GitHub Actions**.

Están prohibidos:
- **Dapper**;
- las dependencias con licencia **GPL o AGPL** (cualquier versión), sean de runtime o de desarrollo;
- las **dependencias de pago**, es decir, paquetes o librerías que requieren una licencia paga. Los servicios en la nube no son dependencias: se rigen por el presupuesto del proyecto;
- las dependencias directas **sin mantenimiento**, es decir, repositorios archivados o sin release en los últimos 12 meses.

Las **dependencias de runtime**, directas y transitivas, solo pueden usar las licencias MIT, Apache-2.0, BSD-2/3-Clause, MS-PL e ISC. Las **herramientas de desarrollo y CI** exigidas por el PRINCIPIO-010 (y sus dependencias transitivas) pueden usar además MPL-2.0 o ser propietarias gratuitas, pero nunca GPL ni AGPL.

- **Ejemplo de cumplimiento:** las consultas se escriben con LINQ sobre un `DbContext` de EF Core. El escaneo de licencias del CI reporta solo paquetes MIT o Apache-2.0.
- **Ejemplo de violación:** se agrega `Dapper` para "optimizar una consulta", o un paquete npm con licencia GPL-3.0 o cuyo último release es de hace 2 años.

---

### PRINCIPIO-003: Aislamiento estricto entre condominios (multi-tenancy)

Toda entidad con datos de un condominio tiene la columna `CondominiumId`, y EF Core aplica un **global query filter** que restringe cada consulta al condominio del usuario autenticado. El uso de `IgnoreQueryFilters()` está prohibido fuera de procesos de plataforma documentados en un ADR. Cada endpoint que devuelva datos tiene un test de integración que demuestra que un usuario del condominio A recibe `403` o `404` al pedir recursos del condominio B.

- **Ejemplo de cumplimiento:** `GET /api/reservations/{id}` con un `id` de otro condominio devuelve `404`, y el test `Reservations_CrossTenantAccess_Returns404` lo verifica en el CI.
- **Ejemplo de violación:** un reporte de administración usa `IgnoreQueryFilters()` para "ver todas las deudas" y expone deudas de residentes de otros edificios.

---

### PRINCIPIO-004: Protección de datos personales según la Ley N.° 29733

CondoHub cumple la **Ley N.° 29733** y su Reglamento (**D.S. 016-2024-JUS**):

1. Se recoge el **consentimiento informado** del titular antes de tratar sus datos. Ese consentimiento incluye explícitamente la **transferencia internacional** al hosting en EE. UU. (Azure South Central US).
2. El dato biométrico (**huella dactilar**) es un dato sensible y requiere un **consentimiento expreso y separado**. Solo se almacena la plantilla biométrica cifrada, nunca la imagen de la huella.
3. Los datos de discapacidad se limitan a un indicador booleano `RequiresAccessibleElevator`. Está prohibido guardar diagnósticos.
4. CondoHub **no almacena imágenes de videovigilancia**. Solo registra las solicitudes de visualización dirigidas a la administración (quién, cuándo y motivo).
5. Retención: **90 días** después de terminada la relación (exresidentes) o de la visita (visitantes), un job automático diario (`DataRetentionJob`) mueve los datos de la base operativa a **almacenamiento frío**: Azure Blob Storage en **nivel Archive** con política de inmutabilidad, cifrado con AES-256-GCM. Ese archivo:
   - se elimina de SQL Server una vez archivado;
   - solo puede leerse con el rol `RetentionArchiveReader`, activado mediante elevación temporal con aprobación (Microsoft Entra PIM, máximo 8 horas);
   - registra cada acceso en un log de auditoría inmutable;
   - se elimina definitivamente al cumplirse **1 año** desde su archivado, mediante una política de ciclo de vida de Azure Storage.
6. Las solicitudes **ARCO** se registran con su fecha de vencimiento legal y quedan visibles para el administrador. Una solicitud de cancelación aceptada se ejecuta también sobre el almacenamiento frío.

- **Ejemplo de cumplimiento:** un test de integración simula 91 días transcurridos, ejecuta `DataRetentionJob` y verifica que el invitado de una reserva ya no existe en SQL Server y que su registro está en el contenedor Archive. Un intento de lectura sin el rol `RetentionArchiveReader` devuelve `403`.
- **Ejemplo de violación:** se agrega el campo `DisabilityDescription` "por si acaso", se habilita el registro de huella sin la pantalla de consentimiento específica, o los datos archivados se dejan en un nivel Hot legible por cualquier administrador.

---

### PRINCIPIO-005: Cifrado, transporte y autenticación

- **En reposo:** todos los datos personales y de contacto se cifran a nivel de campo con **AES-256-GCM**, usando claves guardadas en **Azure Key Vault**. Esto incluye nombres, DNI o carné de extranjería, teléfono, correo, placas vehiculares, datos de visitantes y plantillas biométricas. La base de datos se cifra además con TDE.
- **En tránsito:** **TLS 1.3** obligatorio entre servicios internos (API ↔ Azure SQL, Key Vault, Storage). Hacia los clientes se prefiere TLS 1.3 y se acepta **TLS 1.2 solo para dispositivos antiguos**, únicamente con cifrados ECDHE + AES-GCM o ChaCha20-Poly1305. TLS 1.0, TLS 1.1 y los cifrados CBC están prohibidos. Cuando el cliente no soporta TLS 1.3 (app móvil en Android < 10 o un navegador sin TLS 1.3), la aplicación muestra **en cada inicio de sesión** un aviso que recomienda actualizar el sistema operativo o usar un dispositivo más actual.
- **Contraseñas:** hash con **Argon2id** usando una librería open source con licencia permitida (memoria ≥ 64 MiB, iteraciones ≥ 3, paralelismo ≥ 1).
- **MFA obligatorio** para los roles Administrador y Junta Directiva.

- **Ejemplo de cumplimiento:** la columna `PhoneNumber` contiene solo texto cifrado en la base de datos. Un escaneo con `tlsx` de ProjectDiscovery (licencia MIT), con las opciones `-version-enum` y `-cipher-enum`, confirma que el endpoint rechaza TLS 1.1 y los cifrados CBC. En un emulador con Android 9 la app funciona y muestra el aviso de actualización.
- **Ejemplo de violación:** el DNI se guarda en texto plano "porque se usa en búsquedas", un administrador puede iniciar sesión solo con contraseña, o se habilita TLS 1.0 "para compatibilidad".

---

### PRINCIPIO-006: Control de acceso por rol y mínimo privilegio

Los roles son exactamente estos: **Administrator, BoardMember (Junta Directiva), Resident, NonResidentOwner (propietario no residente), Concierge (personal conserje) y Supplier (proveedor)**. Un Resident o NonResidentOwner ve **solo sus propias deudas, sus propios datos de contacto y los datos de contacto de la administración**, nunca datos de otros residentes. La matriz de permisos se mantiene en `docs/security/permissions-matrix.md` y cada fila tiene un test de autorización.

- **Ejemplo de cumplimiento:** un Resident que llama a `GET /api/units/{otherUnitId}/debts` recibe `403`, y existe el test `Resident_CannotReadOtherUnitDebts`.
- **Ejemplo de violación:** la pantalla "Directorio" muestra el teléfono de todos los vecinos a cualquier residente, o un Supplier puede consultar el registro de visitantes.

---

### PRINCIPIO-007: Los pagos se registran, nunca se procesan

CondoHub **solo registra pagos ya realizados** (monto, fecha, concepto, unidad, constancia adjunta). Está prohibido integrar pasarelas de pago y almacenar o procesar datos de tarjetas o credenciales bancarias. Los reclamos de los usuarios se gestionan mediante un **Libro de Reclamaciones virtual** conforme al Código de Protección y Defensa del Consumidor (**Ley N.° 29571**). La gestión de la junta de propietarios respeta la **Ley N.° 27157** de propiedad horizontal.

- **Ejemplo de cumplimiento:** el administrador registra "Cuota noviembre – S/ 350.00 – Dpto. 502" y adjunta la constancia de transferencia.
- **Ejemplo de violación:** se agrega un formulario con número de tarjeta y CVV, o se instala el SDK de una pasarela de pagos.

---

### PRINCIPIO-008: Datos reales y secretos fuera del código y de los entornos no productivos

Ningún secreto (connection strings, API keys, certificados) se escribe en el código, en archivos de configuración versionados ni en los logs. Todos residen en **Azure Key Vault** y se leen mediante Managed Identity. Los logs nunca contienen datos personales en claro. Los entornos local, dev y staging usan **solo datos sintéticos** generados por seeders. Esta prohibición aplica **por igual a personas y a agentes de IA**: ningún dato real de producción, ni siquiera anonimizado a mano, sale de producción.

- **Ejemplo de cumplimiento:** `appsettings.json` contiene `"KeyVaultUri"` y nada más. El CI ejecuta un escáner de secretos (gitleaks) que pasa sin hallazgos.
- **Ejemplo de violación:** se hace commit de `appsettings.Development.json` con la contraseña de SQL, o se copia un backup de producción a dev "para reproducir un bug".

---

### PRINCIPIO-009: Acciones prohibidas y permitidas para agentes de IA

Un agente de IA **NUNCA** puede:

1. Hacer push directo a `main` ni mergear un PR sin aprobación humana.
2. Ejecutar migraciones o comandos contra la base de datos de producción.
3. Leer, copiar o enviar datos personales reales a servicios externos o a prompts.
4. Añadir dependencias nuevas sin aprobación humana explícita en el PR.
5. Modificar, omitir (`[Skip]`, `.skip`) o desactivar tests, linters, umbrales de cobertura o pasos del CI para que "pase".
6. Escribir secretos, tokens o claves en el código o en los logs.
7. Modificar este archivo (`00-constitucion.md`).
8. Desplegar a producción.
9. Enviar notificaciones, correos o mensajes reales a residentes.
10. Hacer push o abrir PRs con la identidad de una persona. Un agente solo trabaja en GitHub con la identidad de la GitHub App del proyecto, que no tiene el permiso `workflows`.

Un agente **sí puede**, de forma autónoma: crear ramas, ejecutar el proyecto y los tests en local, abrir PRs y desplegar en el entorno **dev**. Todo commit generado o asistido por IA incluye el trailer `Co-Authored-By: <nombre del agente>`. El trailer indica asistencia y no bloquea el merge: en un commit del autor humano, el autor responde por el cambio.

**Control técnico:** en GitHub, `main` exige PR y prohíbe el force push, con dos rulesets: uno exige todos los status checks en verde, **sin ningún bypass**; el otro exige 1 aprobación, con bypass **solo para la cuenta del autor humano** (excepción del PRINCIPIO-010). `00-constitucion.md` y `.github/workflows/` están en `CODEOWNERS` con propietarios humanos. Un check del CI, que se ejecuta desde la definición del workflow en `main` y no desde la rama del PR, rechaza siempre cualquier PR que modifique esos archivos si fue abierto por la GitHub App de los agentes, y exige que todo PR que los modifique incluya un ADR aceptado que justifique el cambio (ADR-0005).

- **Ejemplo de cumplimiento:** el agente abre un PR desde la GitHub App con el trailer `Co-Authored-By`, despliega en dev y solicita revisión humana. El CI rechaza cualquier PR de la GitHub App que modifique `00-constitucion.md`.
- **Ejemplo de violación:** el agente cambia el umbral de cobertura de 70 % a 50 % para que el pipeline pase, o ejecuta `dotnet ef database update` contra la cadena de producción.

---

### PRINCIPIO-010: Calidad, testing y flujo de trabajo

- **Cobertura mínima:** 70 % de líneas en todo el proyecto y **90 % en el módulo de usuarios** (identidad, autenticación, roles). El CI falla por debajo de esos umbrales.
- **Tests obligatorios en el CI (GitHub Actions):** unitarios e integración (xUnit), end-to-end (Playwright), accesibilidad automatizada (axe), seguridad (CodeQL, SAST) y dependencias (Dependabot o `dotnet list package --vulnerable` y `npm audit`, sin vulnerabilidades altas ni críticas).
- **Pruebas de API:** colecciones Postman en `tests/postman/`, ejecutadas en el CI con Postman CLI.
- **Flujo:** trunk-based con ramas de vida corta (máximo 2 días), PR con **1 aprobación humana** como mínimo y mensajes en formato **Conventional Commits** validados con commitlint. **Excepción:** mientras el proyecto tenga un solo autor humano, este puede mergear sus propios PR sin aprobación, siempre que todos los status checks estén en verde. La excepción incluye los cambios en `00-constitucion.md` o `.github/workflows/`, que además exigen un ADR aceptado en el mismo PR. Un commit del autor con el trailer `Co-Authored-By` de un agente sigue cubierto por la excepción: el trailer indica asistencia y el autor responde por el cambio. La excepción nunca aplica a los PR abiertos por la GitHub App de los agentes, que necesitan 1 aprobación humana y, si modifican `00-constitucion.md` o `.github/workflows/`, se rechazan siempre (ADR-0005).
- **Estilo:** `.editorconfig` + `dotnet format` + analizadores Roslyn con `TreatWarningsAsErrors=true` en .NET; ESLint + Prettier en React Native.
- **Rendimiento:** p95 de la API **< 500 ms**, LCP **< 2.5 s** en 4G y LCP **< 4 s** con el perfil de red "Slow 3G", medidos en el CI.

- **Ejemplo de cumplimiento:** el commit `feat(reservations): add guest list` pasa la cobertura, axe, las colecciones Postman y CodeQL, y se mergea con 1 aprobación.
- **Ejemplo de violación:** un commit "cambios varios" que deja el módulo de usuarios en 82 % de cobertura y se mergea a `main` sin revisión.

---

### PRINCIPIO-011: Accesibilidad e inclusión

La web (Blazor) y la app móvil cumplen **WCAG 2.1 nivel AA**. Además:

- El texto es escalable hasta **200 %** sin pérdida de contenido ni scroll horizontal.
- El tamaño base de fuente es de **16 px** como mínimo.
- Los objetivos táctiles miden **44×44 px** como mínimo.
- En React Native está prohibido `allowFontScaling={false}`.
- La aplicación funciona en **celulares antiguos** con red 3G o 4G lenta.

- **Ejemplo de cumplimiento:** axe reporta 0 violaciones AA en el CI, y la app se ve correctamente con la fuente del sistema al tamaño máximo.
- **Ejemplo de violación:** un botón tiene un contraste de 3:1, o un ícono sin `aria-label` ni `accessibilityLabel`.

---

### PRINCIPIO-012: Documentación como código

Toda la documentación vive en **Markdown dentro del repositorio** (`/docs`). Cada PR que cambie comportamiento actualiza, según corresponda:

- el `README.md` del módulo;
- el `CHANGELOG.md` (formato Keep a Changelog);
- los diagramas en **Mermaid**;
- la especificación **OpenAPI 3.1** versionada en `docs/api/openapi.json`, generada desde .NET; el CI falla si difiere de la API real;
- las colecciones Postman en `tests/postman/`.

Las decisiones de arquitectura se registran como **ADR** con la plantilla **MADR** en `docs/adr/NNNN-titulo-en-kebab-case.md`.

- **Ejemplo de cumplimiento:** un PR que agrega `POST /api/reservations` incluye el endpoint en `openapi.json`, su request en la colección Postman, una entrada en el CHANGELOG y el diagrama de secuencia actualizado.
- **Ejemplo de violación:** se cambia el contrato de un endpoint y `openapi.json` queda desactualizado, o se reemplaza EF Core por otra tecnología sin ADR.
