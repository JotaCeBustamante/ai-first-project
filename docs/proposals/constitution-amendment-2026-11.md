# Propuesta de enmienda de la constitución (noviembre 2026)

> **Estado: adoptada por el autor el 2026-11-02 (constitución versión 1.1).** El texto se redactó con asistencia de IA; el autor lo revisó, lo aprobó y lo adopta como enmienda propia. Justificación: [ADR-0009](../adr/0009-constitution-amendment-2026-11.md).
>
> **Enmiendas posteriores:** la constitución vigente es la **versión 1.4**. Las versiones 1.2 (reauditoría RQ-A11), 1.3 (segunda reauditoría R2-C01, R2-A01, R2-A02 y R2-A03) y 1.4 (PRINCIPIO-009.10, cierre de R2-A02) se aplicaron directamente en `00-constitucion.md` y se justifican en el [ADR-0005](../adr/0005-agent-pull-requests-and-author-merge-policy.md) y el [ADR-0009](../adr/0009-constitution-amendment-2026-11.md). Este documento conserva solo el texto de la versión 1.1.
>
> **Fuente de las decisiones:** [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md) (hallazgos C-04, M-13, M-14, M-17, M-18, A-17, A-18, B-02 y B-05).
> **Fecha del borrador:** 2026-11-02

Cada cambio cita el texto actual y el texto propuesto. Lo que no aparece aquí no cambia.

---

## 1. PRINCIPIO-001: Idioma (M-17, M-18)

**Texto actual:**

> El código fuente (identificadores, tablas, columnas, endpoints), los comentarios, los mensajes de commit y la documentación técnica se escriben en **inglés**. Todo texto visible para el usuario final está en **español de Perú** y se gestiona con archivos de recursos (`.resx` en .NET, archivos i18n en React Native), nunca como texto fijo en el código. **Única excepción:** este archivo (`00-constitucion.md`) se redacta en español.

**Texto propuesto:**

> El código fuente (identificadores, tablas, columnas, endpoints y rutas de la interfaz), los comentarios, los mensajes de commit y la documentación técnica (ADR, `README.md`, `CHANGELOG.md`, OpenAPI y diagramas Mermaid) se escriben en **inglés**. Todo texto visible para el usuario final está en **español de Perú** y se gestiona con archivos de recursos (`.resx` en .NET, archivos i18n en React Native), nunca como texto fijo en el código. Los documentos de producto y negocio (esta constitución, el brief, el alcance, las reglas de negocio, el glosario, las preguntas abiertas y las auditorías QA) se redactan en **español**.

**Ejemplo de cumplimiento, actual:**

> la entidad `Resident` tiene la propiedad `UnitNumber`.

**Propuesto:**

> la entidad `UnitOccupancy` tiene la propiedad `OccupancyType`, y la página de gastos vive en la ruta `/expenses`.

---

## 2. PRINCIPIO-002: Stack y dependencias (C-04, M-13, M-14)

**Texto actual:**

> El stack oficial es **.NET 10** (backend y **Blazor en modo Auto**), **React Native** con TypeScript en modo `strict` para móvil, **SQL Server 2025** con **Entity Framework Core** como único ORM, desplegado en **Azure (región South Central US)**. El código vive en **GitHub** y el CI/CD corre en **GitHub Actions**. Están prohibidos **Dapper**, las dependencias con licencia **GPL o AGPL** (cualquier versión), las de pago y las **sin mantenimiento**, es decir, repositorios archivados o sin release en los últimos 12 meses. Las licencias permitidas son MIT, Apache-2.0, BSD-2/3-Clause y MS-PL.

**Texto propuesto:**

> El stack oficial es **.NET 10** (backend y **Blazor**, con renderizado estático en servidor y modo Auto donde se justifique), **React Native** con TypeScript en modo `strict` para móvil, **Entity Framework Core** como único ORM sobre **Azure SQL Database** en Azure y **SQL Server 2025** (edición Developer, en contenedor) en local y en el CI, desplegado en **Azure (región South Central US)**. El código vive en un repositorio **público** de **GitHub** y el CI/CD corre en **GitHub Actions**.
>
> Están prohibidos:
> - **Dapper**;
> - las dependencias con licencia **GPL o AGPL** (cualquier versión), sean de runtime o de desarrollo;
> - las **dependencias de pago**, es decir, paquetes o librerías que requieren una licencia paga. Los servicios en la nube no son dependencias: se rigen por el presupuesto del proyecto;
> - las dependencias directas **sin mantenimiento**, es decir, repositorios archivados o sin release en los últimos 12 meses.
>
> Las **dependencias de runtime**, directas y transitivas, solo pueden usar las licencias MIT, Apache-2.0, BSD-2/3-Clause, MS-PL e ISC. Las **herramientas de desarrollo y CI** exigidas por el PRINCIPIO-010 (y sus dependencias transitivas) pueden usar además MPL-2.0 o ser propietarias gratuitas, pero nunca GPL ni AGPL.

---

## 3. PRINCIPIO-003: Ejemplo (M-18)

**Ejemplo de cumplimiento, actual:**

> `GET /api/visitors/{id}` con un `id` de otro condominio devuelve `404`, y el test `Visitors_CrossTenantAccess_Returns404` lo verifica en el CI.

**Propuesto:**

> `GET /api/reservations/{id}` con un `id` de otro condominio devuelve `404`, y el test `Reservations_CrossTenantAccess_Returns404` lo verifica en el CI.

---

## 4. PRINCIPIO-004.5: Ejemplo (M-18)

**Ejemplo de cumplimiento, actual:**

> un test de integración simula 91 días transcurridos, ejecuta `DataRetentionJob` y verifica que el visitante ya no existe en SQL Server y que su registro está en el contenedor Archive.

**Propuesto:**

> un test de integración simula 91 días transcurridos, ejecuta `DataRetentionJob` y verifica que el invitado de una reserva ya no existe en SQL Server y que su registro está en el contenedor Archive.

---

## 5. PRINCIPIO-007: Constancia de pago (B-02)

**Texto actual:**

> CondoHub **solo registra pagos ya realizados** (monto, fecha, concepto, unidad, comprobante adjunto).

**Texto propuesto:**

> CondoHub **solo registra pagos ya realizados** (monto, fecha, concepto, unidad, constancia adjunta).

---

## 6. PRINCIPIO-010: Flujo, rendimiento y ejemplo (A-17, A-18, B-05, M-18)

**Flujo, texto actual:**

> **Flujo:** trunk-based con ramas de vida corta (máximo 2 días), PR con **1 aprobación humana** como mínimo y mensajes en formato **Conventional Commits** validados con commitlint.

**Propuesto:**

> **Flujo:** trunk-based con ramas de vida corta (máximo 2 días), PR con **1 aprobación humana** como mínimo y mensajes en formato **Conventional Commits** validados con commitlint. **Excepción:** mientras el proyecto tenga un solo autor humano, este puede mergear sus propios PR sin aprobación, siempre que todos los status checks estén en verde. La excepción nunca aplica a los PR abiertos por agentes de IA (ADR-0005).

**Rendimiento, texto actual:**

> **Rendimiento:** p95 de la API **< 500 ms** y LCP **< 2,5 s** en 4G.

**Propuesto:**

> **Rendimiento:** p95 de la API **< 500 ms**, LCP **< 2.5 s** en 4G y LCP **< 4 s** con el perfil de red "Slow 3G", medidos en el CI.

**Ejemplo de cumplimiento, actual:**

> el commit `feat(visitors): add QR check-in` pasa la cobertura, axe, las colecciones Postman y CodeQL, y se mergea con 1 aprobación.

**Propuesto:**

> el commit `feat(reservations): add guest list` pasa la cobertura, axe, las colecciones Postman y CodeQL, y se mergea con 1 aprobación.

---

## 7. PRINCIPIO-012: Ejemplo (M-18)

**Ejemplo de cumplimiento, actual:**

> un PR que agrega `POST /api/visitors` incluye el endpoint en `openapi.json`, su request en la colección Postman, una entrada en el CHANGELOG y el diagrama de secuencia actualizado.

**Propuesto:**

> un PR que agrega `POST /api/reservations` incluye el endpoint en `openapi.json`, su request en la colección Postman, una entrada en el CHANGELOG y el diagrama de secuencia actualizado.

---

## 8. Encabezado

**Texto actual:**

> **Versión:** 1.0, 2026-11-01

**Propuesto:**

> **Versión:** 1.1, <fecha del merge> (enmienda justificada en `docs/adr/0009-constitution-amendment-2026-11.md`)

---

## Fuera de esta enmienda

- **PRINCIPIO-004.5 (PIM):** no cambia. La lectura del archivo frío sigue diferida (ADR-0006); antes de operar con datos reales hay que contratar Entra ID P2 o hacer otra enmienda.
- **PRINCIPIO-004.6 (ARCO):** no cambia. El crypto-shredding (ADR-0002) permite cumplirlo tal como está.
