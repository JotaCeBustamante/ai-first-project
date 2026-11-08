# CondoHub — Auditoría del Spec Finalizer (Spec Pack v1.0)

> **Agente:** Spec Finalizer (BMAD), [prompts/12-spec-finalizer.xml](../../prompts/12-spec-finalizer.xml) · **Fecha:** 2026-11-08
> **Alcance:** `00-constitucion.md` a `10-validation-log.md`, más `docs/adr/`, `docs/security/permissions-matrix.md` y `prototypes/`.
> **Método:** lectura de los 11 archivos y verificación con scripts: extracción y cruce de IDs RN/HU/P/T/ADR, campos y DAG del backlog, ruta crítica y catálogo de códigos de error. Hubo dos pasadas: la **auditoría inicial** encontró 7 hallazgos críticos; el autor tomó las decisiones pendientes y autorizó a corregir los archivos, y la **verificación final** se hizo sobre los archivos ya corregidos.

---

## Resumen ejecutivo

**Veredicto: LISTO como Spec Pack v1.0.** Un agente de IA puede implementar el MVP con este pack como contexto. Las decisiones que siguen abiertas tienen un valor por defecto escrito en [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md) §9, y las puertas humanas están declaradas: aprobación de dependencias, ADR-0016 a ADR-0019 y tareas "Ejecuta: autor humano".

### Checklist de salida

| Criterio | Estado | Evidencia |
|---|---|---|
| 0 hallazgos críticos al final | ✅ | Los 7 críticos de la auditoría inicial están corregidos (§0). La verificación final no encontró críticos nuevos |
| Hallazgos mayores documentados en 05-preguntas-abiertas.md | ✅ | Q51 a Q95 (pendientes de la validación de prototipos) y Q96 a Q104 (mayores de esta auditoría), cada uno con su estado y su valor por defecto o resolución |
| Score de Operatividad ≥ 3/5 | ✅ | **4/5** (§9) |
| Trazabilidad end-to-end verificada | ✅ | RN → HU → P → T verificada con script: 0 reglas MUST del MVP sin traza, 0 HU sin pantalla, 0 pantallas sin tarea y 0 IDs huérfanos (§1 y §2) |

**Puntaje final (1–5):** Operatividad **4** · Utilidad **4** · Orden **4** (auditoría inicial: 3 · 4 · 3).

---

## 0. Hallazgos críticos de la auditoría inicial y su corrección

| # | Hallazgo crítico | Corrección aplicada | Dónde |
|---|---|---|---|
| C-01 | ~44 decisiones ⏳ PENDIENTE de la validación de prototipos "se resolvían antes de implementar" y afectaban a 15 de las 19 HU, sin estar en 05 | El autor decidió registrarlas con un valor por defecto. Q51 a Q95 en 05 §9.1; las 7 que pedían reglas nuevas se resolvieron con reglas (Q54, Q63, Q77, Q78, Q80, Q89) o en la arquitectura (Q56, Q68, Q83) | 05 §9.1; 03; 07; matriz |
| C-02 | 27 cambios "✅ APLICADA · inmediata" no estaban aplicados (p. ej. `hireSim` en P-031) | Aplicados los 27: textos, trazas de reglas y estados de las fichas, criterios de HU y ajustes de prototipos | 03, 06, 09, `prototypes/` (P-013, P-031, P-034, P-042, P-043, P-054, P-060, P-061) |
| C-03 | Contradicción sobre Q25: RN-041 mostraba todos los estados; la UI Spec, solo `Approved` | Decisión del autor: los propietarios ven solo `Approved`, la Junta `Submitted` y `Approved` y el Administrator todos; lo oculto responde `404`. Alineado en todo el pack | RN-041; HU-014; 09 P-040, P-041, §6; 07 RT6; matriz H3; T-071; Q25 ✅ |
| C-04 | RN-169 a RN-175 sin tareas, sin códigos en el catálogo de 07 y con 6 códigos sin criterio | Criterios en HU-001, HU-001B, HU-004, HU-010 y HU-012; catálogo en 07 §4.4; tareas T-075 a T-079 | 06, 07 §4.4, 08 |
| C-05 | 9 pantallas sin tarea y backlog sin IDs de pantalla | Campo **Pantallas** en las tareas de páginas; T-066 a T-074 para P-010, P-012 (modo Administrator), P-013, P-015, P-016, P-040, P-043, P-062, P-090 y P-091; P-033 y P-034 alineadas como páginas | 08 Fase 6b y §Resumen |
| C-06 | Choque `Vendor`/`Supplier`: el glosario exige `Vendor`, la arquitectura usaba `Supplier` para la entidad y para el rol | Decisión del autor: renombrar a `Vendor` (`/api/vendors`, `/vendors/new`, `VENDOR_RUC_*`, `VendorId`, `vendorId`). `Supplier` queda solo como rol. `SupplierHire` se conserva (M-24 cerrado en el glosario) | 03, 06, 07, 08, 09, 04, prototipos |
| C-07 | ADR-0011 a ADR-0015 aceptados pero ausentes de `docs/adr/` (PRINCIPIO-012) | Transcritos en inglés con la plantilla MADR; ADR-0013 incluye la enmienda del 2026-11-08 y la sesión parcial | `docs/adr/0011-…` a `0015-…` |

**Reglas nuevas que surgieron de las correcciones** (aprobadas como parte de las decisiones del autor del 2026-11-08):

- RN-176 `OCCUPANCY_OVERLAP`
- RN-177 `AUTH_RATE_LIMITED`
- RN-178 `RESERVATION_HOST_NOT_SELECTED` y `RESERVATION_HOST_NOT_LINKED`, con el anfitrión de una unidad alquilada como valor por defecto en Q63
- RN-179 `HIRE_DECISION_CONFLICT`
- RN-163 ampliada a invitados y gastos

---

## 1. Trazabilidad completa

| Verificación | Resultado final |
|---|---|
| Reglas definidas | 179 (RN-001 a RN-179): 1 retirada, 17 diferidas por ADR-0020, 4 ⏭ fuera del MVP (RN-046, 047, 049 y 125, de S2 y S4) y 6 SHOULD |
| Reglas MUST del MVP | 151 |
| MUST del MVP con HU | 117 |
| MUST del MVP sin HU, trazadas a una tarea o a la tabla "Trazabilidad de las tareas sin HU" de 08 | 34 (jobs, plataforma, transversales y modelo de datos) |
| **MUST del MVP sin ninguna traza** | **0** |
| HU con al menos una regla | 19/19 |
| **HU con al menos una pantalla** | **19/19** (09 §1.2) |
| **Pantallas con al menos una tarea** | **34/34** (campo "Pantallas" de 08 y columna "Pantallas" de la tabla "Cobertura de HU") |
| HU con al menos una tarea | 19/19 |

---

## 2. Consistencia de IDs

| Verificación | Resultado final |
|---|---|
| RN citadas y no definidas | 0 |
| HU citadas y no definidas | 0 |
| P-XXX citadas y no inventariadas | 0 |
| T-XXX citadas en cualquier archivo y no definidas | 0 (T-056 a T-065 ya existen en 08) |
| Dependencias del backlog rotas o fuera de orden | 0 |
| ADR citados sin archivo | Solo ADR-0016 a ADR-0019, que son pendientes con tarea (T-053, T-054, T-048.4 y T-055) |
| Códigos de error usados en 06, 07, 08 o 09 fuera del catálogo (03 + 07 §4.1, §4.3 y §4.4) | 0 |
| Los 13 códigos nuevos o renombrados están en 03, 06, 07, 08 y 09 | ✅ |
| Restos de la entidad `Supplier` | 0 en 03 a 09. 10 conserva las citas históricas, con una nota |
| Identificadores del glosario frente al modelo de 07 §3.3 | Sincronizados y marcados como "Fijado" en 04 |

---

## 3. Cobertura de la constitución

| Principio | Estado | Nota |
|---|---|---|
| 001 Idioma | ✅ | Identificadores sincronizados (04 ↔ 07); textos desde `es-PE.resx`; T-051 |
| 002 Stack | ✅ | 07 §6.1 y §6.4; licencias en el CI (T-002.3) |
| 003 Multi-tenancy | ✅ | RN-017, 103 y 104; ADR-0003; T-005 y T-044; test cross-tenant en la definición de terminado |
| 004 Ley 29733 | ⚠️ Riesgo aceptado | PIM (ADR-0006) y ARCO (ADR-0010) diferidos; Q18 y Q32 abiertas. Válido **solo con datos sintéticos** (02 §0) |
| 005 Cifrado y autenticación | ⚠️ Riesgo aceptado | ADR-0015, ADR-0004, Argon2id y MFA. El aviso de TLS 1.2 está diferido por ADR-0020; el autor lo confirma en 02 §7 (**Q103**, mayor) |
| 006 Roles | ✅ | Matriz con test por fila; H5 "Registrar proveedor" agregada y H3 con la visibilidad por estado |
| 007 Pagos | ⚠️ Riesgo aceptado | Sin pasarelas (T-002.5); Libro de Reclamaciones diferido (ADR-0010) |
| 008 Secretos | ✅ | Seeder, gitleaks, redactor de logs |
| 009 Agentes | ✅ | ADR-0005; T-002.6; tareas "Ejecuta: autor humano" |
| 010 Calidad | ✅ | Umbrales en T-002.1, Postman en T-045, E2E y axe en T-046, pruebas derivadas en T-063 |
| 011 Accesibilidad | ✅ | 09 §3.0.1; T-046.3 |
| 012 Documentación como código | ✅ | ADR-0011 a 0015 en `docs/adr/` (MADR, inglés); OpenAPI y CHANGELOG en la definición de terminado |

---

## 4. Glosario

[04-glosario.md](../../04-glosario.md), actualizado el 2026-11-08:

- Las entidades usan el identificador del modelo de 07 §3.3 (`ReservationGuest`, `Attachment`, `ConsentVersion`/`ConsentAcceptance`, `HireDecision`, `AuditLogEntry`, `Vendor`, columnas de `CommonArea`) con estado "Fijado".
- La nueva sección **Términos técnicos** define 24 términos que usan 07, 08 y 09: sesión de usuario, sesión parcial, `nextStep`, solicitud automática, clave de idempotencia y huella, filas testigo, DEK y KEK, Problem Details, adjunto `Pending`/`Committed`, `OrphanBlobCleanupJob`, Platform CLI, `returnUrl`, RUC, código de torre, EARS y otros.
- M-24 quedó cerrado: se conserva `SupplierHire`.

---

## 5. Preguntas abiertas

| Estado en 05 | Cantidad |
|---|---|
| ✅ Resuelta | 35: las 19 anteriores, Q25, 9 de §9.1 y 6 de §9.2, ya aplicadas en la spec |
| 🔵 Supuesto con valor por defecto | 42 (Q51–Q95 sin resolver, Q96, Q103, Q104 y los supuestos de negocio Q5, Q15 y Q16) |
| 🟡 Parcial | 4 (Q8, Q10, Q12, Q20) |
| 🔴 Sin respuesta | 23 |

**¿Alguna bloquea la implementación?** **No.**

- Las 23 🔴 son de mercado, modelo de negocio o normativa (Q1–Q4, Q6, Q7, Q9, Q11, Q13, Q14, Q17–Q19, Q21, Q23, Q24, Q27, Q28, Q30–Q34).
- Las que tocan reglas del MVP tienen un valor provisional escrito en la regla o en una tarea:
  - Q11: valores del seeder.
  - Q21: solo el nombre del invitado.
  - Q24: basta 1 BoardMember (RT4).
  - Q27: enum provisional en RN-035.
  - Q28: T-055 (ADR-0019) con el provisional de 10 MB.
  - Q30: sin umbral.
  - Q34: Q79.
- Q18, Q19, Q32 y Q34 **bloquean operar con datos reales**, no el MVP con datos sintéticos (02 §0).

---

## 6. Calidad del Documento de Arquitectura

| Sección | Estado |
|---|---|
| 1 Overview | ✅ |
| 2 Componentes | ✅ |
| 3 Modelo de datos | ✅ Entidad `Vendor`; nombres alineados con el glosario |
| 4 API Contracts | ✅ con un mayor abierto. §4.1 suma la sesión parcial (300 s), `no-store` en portería, el catálogo único de códigos y `AUTH_RATE_LIMITED`; §4.4 trae los 13 códigos nuevos. **Mayor (Q96):** solo 8 contratos detallados; el resto se deriva con la regla de Q96 y se publica en OpenAPI |
| 5 ADRs | ✅ ADR-0011 a 0015 coherentes con la constitución y transcritos. Se corrigió la contradicción de la caché de sesión (§6.2.3: 5 s, igual que ADR-0013) |
| 6 Restricciones técnicas | ✅ RT6 resuelta (Q25) |

Versión v0.5 (2026-11-08).

---

## 7. Calidad del backlog

| Criterio | Resultado (v0.5) |
|---|---|
| Entradas | 193: 166 ejecutables (133 S, 33 M, 0 L) y 27 contenedoras |
| Campos obligatorios | 193/193 con HU, componente, prioridad, tamaño, dependencias, descripción y criterio; las tareas de páginas llevan además "Pantallas" |
| Prioridad | 156 Must → 1 Should → 9 Could, en ese orden |
| Estimación | S = 0.5 h y M = 1 h en **horas de agente** (unidad declarada en §Convenciones): 99.5 h, o 90 h sin las Could, sin la revisión humana |
| DAG y orden topológico | ✅ 0 dependencias rotas y 0 violaciones |
| Ruta crítica | Recalculada: 28 tareas y 17.0 h, termina en T-063 |
| Atomicidad | ✅ Ninguna tarea ejecutable supera 1 h |

---

## 8. Calidad de la UI Spec

| Criterio | Resultado (v0.3) |
|---|---|
| Flujos | ✅ F1–F13 cubren las 19 HU; F7 y F8 corregidos |
| Wireframes textuales | ✅ 34 fichas con propósito, datos, acciones, reglas, wireframe y estados; trazas de reglas corregidas (P-006, P-011, P-014 y P-041) |
| Códigos de error | ✅ §3.0.6 con los códigos nuevos y su texto `es-PE` |
| Pendientes de §6 | ✅ Q25 y Q36 cerradas; el resto remite a los valores por defecto de 05 §9 |

---

## 9. Score general

| Criterio | Inicial | Final | Justificación del puntaje final |
|---|---|---|---|
| **Operatividad** | 3 | **4** | Sin contradicciones ni pantallas, reglas o códigos huérfanos, y cada decisión abierta tiene un valor por defecto. No llega a 5 porque 42 decisiones siguen siendo supuestos (🔵) que el autor puede cambiar, y porque la mayoría de los contratos de API se derivan (Q96) |
| **Utilidad** | 4 | **4** | Cubre el MVP completo con rigor legal y de seguridad; las diferencias con la constitución están acotadas a datos sintéticos. Le resta Q96 |
| **Orden** | 3 | **4** | Cabeceras de 03 a 09 en la misma fecha, glosario al día, catálogo único de códigos y precedencia entre fuentes (Q104). Falta un índice del pack (menor) |
| **Promedio** | 3.3 | **4.0** | |

---

## 10. Hallazgos menores que quedan (no bloquean)

- No hay un archivo índice del Spec Pack con el orden de lectura y el dueño de cada archivo. La precedencia ya está en Q104.
- No hay un índice en `docs/adr/` que declare reservados los números 0016 a 0019.
- El diagrama de la ruta crítica de 08 es el de v0.4; el texto ya da la ruta de v0.5.
- `prompts/12-spec-finalizer.xml` cita `10-validation-logs.md`; el archivo es `10-validation-log.md`.
- Las cabeceras de 01 y 02 no cambiaron (no tenían correcciones). El autor confirma Q103 en 02 §7.

---

## Archivos modificados en esta auditoría (2026-11-08)

| Archivo | Cambio |
|---|---|
| 03-reglas-de-negocio.md | RN-176 a RN-179; RN-041 (Q25), RN-163, RN-035 y RN-142; marcas ⏭; categorías y cabecera; `VENDOR_RUC_*` |
| 04-glosario.md | Identificadores "Fijado" alineados con 07; sección "Términos técnicos"; cabecera |
| 05-preguntas-abiertas.md | Q25 ✅; nota en Q27; §9 con Q51 a Q104; cabecera |
| 06-user-stories.md | v0.5: criterios de RN-169 a RN-179 y de Q25; correcciones inmediatas; conteo de 19 HU |
| 07-architecture.md | v0.5: `Vendor`; §4.1 (sesión parcial, `no-store`, catálogo único, `AUTH_RATE_LIMITED`); §4.4; `HIRE_DECISION_CONFLICT`; §6.2.3; RT6; nota de ADR transcritos |
| 08-backlog.md | v0.5: "Pantallas", unidad de estimación, Fase 6b (T-063, T-066 a T-079), Fase 8 (T-056 a T-062, T-064 y T-065), T-037.2 como páginas, citas de RN, resumen y ruta crítica |
| 09-ui-spec.md | v0.3: correcciones inmediatas, Q25, códigos nuevos y §6 |
| 10-validation-log.md | Nota de estado posterior |
| docs/adr/0011 a 0015 | Nuevos (MADR, inglés) |
| docs/security/permissions-matrix.md | H3 (visibilidad por estado) y H5 (proveedores) |
| prototypes/ | P-013, P-031, P-032, P-034, P-042, P-043, P-054, P-060, P-061, `expenses-data.js` y `shell.js` |
