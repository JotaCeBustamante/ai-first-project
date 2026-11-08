# CondoHub — Reporte del Agente Prototype Reviewer

> **Fase:** Diseño (BMAD) · **Fecha:** 2026-11-08
> **Qué es:** el reporte de revisión de los 32 prototipos de [prototypes/](../../prototypes/), extraído de [registro-revision-prototipos.md](registro-revision-prototipos.md) (antes `10-validation-log.md`) para usarlo como **fuente "Agente Reviewer"** del Agente Consolidador de Validación ([prompts/11-validation-log.xml](../../prompts/11-validation-log.xml)).
> **Qué no es:** no incluye decisiones ni consolidación. Esas están en las secciones "Resumen consolidado", "Iteración 2" e "Iteración 3" de [registro-revision-prototipos.md](registro-revision-prototipos.md).

## Cómo leer este reporte

- **34 revisiones (VL-P0xx), una por pantalla.** Todas tienen la misma estructura: 1. Cobertura de HUs, 2. Reglas de negocio, 3. Flujo de usuario, 4. Observaciones (`#`, Observación, Tipo, Severidad, Acción sugerida, HU/regla), 5. Decisiones recomendadas, 6. Score.
- **Para citar una observación:** `VL-P0xx obs. N`, por ejemplo `VL-P012 obs. 1`.
- **Revisores.** VL-P001 lo escribió el revisor principal. VL-P002 a VL-P062 los escribieron revisores independientes, uno por épica, que no escribieron los prototipos que revisaron.
- **Rondas.**
  - **Primera ronda:** las 19 pantallas originales.
  - **Segunda ronda:** las 13 pantallas nuevas (VL-P006, VL-P032 a VL-P034, VL-P042, VL-P043, VL-P050 a VL-P054, VL-P060, VL-P061) y una nueva revisión de VL-P030 y VL-P031. **VL-P030 y VL-P031 aparecen dos veces:** la primera ronda y la nueva revisión, marcada "(re-revisión 2026-11-08)". La nueva revisión dice qué observaciones de la primera quedaron cerradas.
- **Apéndice.** Al final va el informe del verificador independiente de la iteración 2. Sus hallazgos se citan como `Verificación N1` a `N10`.
- **Estado.** Las observaciones se reportan tal como se encontraron. La tabla de abajo marca las que ya se aplicaron en el Spec Pack o en los prototipos; **todas las demás están abiertas**.

## Estado de las observaciones ya aplicadas (al 2026-11-08)

| Observación | Severidad | Estado | Dónde se aplicó |
|---|---|---|---|
| VL-P001 obs. 1 (faltaban P-003, P-004, P-005 y P-007) | Alta | ✅ Aplicada (iteración 1) | prototypes/P-003…P-007 |
| VL-P001 obs. 5 (se perdía el `returnUrl`) | Alta | ✅ Aplicada (iteración 1) | shell.js; 09-ui-spec.md §3.1 |
| VL-P001 obs. 7 (redirección abierta) | Media | ⚠️ Parcial: la regla está en la ficha de P-001; falta el test | 09-ui-spec.md §3.1 |
| VL-P007 obs. 1 (puerta de consentimiento) | Alta | ✅ Aplicada (iteración 2), verificada | shell.js; P-007 |
| VL-P012 obs. 1 (RN-079 por día y no por instante) | Alta | ✅ Aplicada (iteración 2), verificada | RN-079; HU-005; §3.0.6; P-012 |
| VL-P012 obs. 2 (RN-163: un `4xx` no consume la clave) | Alta | ✅ Aplicada (iteración 2), verificada | RN-163; HU-005; §3.0.6 |
| VL-P015 obs. 1 (sin hora común; también en VL-P016 y VL-P062) | Alta | ✅ Aplicada (iteración 2), verificada | shell.js (`CH.NOW`); P-012, P-014, P-015, P-016, P-062 |
| VL-P020 obs. 1 (nombres visibles tras el `401`) | Alta | ✅ Aplicada (iteración 2), verificada | P-020; ficha de P-020 |
| VL-P020 obs. 2 (¿el polling cuenta como actividad?) | Alta | ✅ Aplicada (iteración 3): el autor decidió que no cuenta | RN-113; HU-003B; §6 #9; 07-architecture.md ADR-0013; P-020 |
| VL-P030 obs. 1 y VL-P031 obs. 1 y 2 (faltaban P-032, P-033 y P-034) | Alta | ✅ Aplicada (iteración 2), confirmada en la re-revisión | prototypes/P-032…P-034 |
| VL-P030 obs. 2 y VL-P031 obs. 3 (fechas del escenario; anulación antes del registro) | Media | ✅ Aplicada (iteración 3), confirmada en la re-revisión | 03, 06, 07, 09; expenses-data.js; `?today=` |
| VL-P040 obs. 1 y VL-P041 obs. 1 (faltaban P-042 y P-043) | Alta | ✅ Aplicada (iteración 2), confirmada en VL-P042 | prototypes/P-042, P-043 |
| VL-P034 obs. 1 (el atajo de C6 guardaba un vínculo con h-101) | Alta | ✅ Aplicada (iteración 3), **sin verificación independiente** | P-034 |
| VL-P043 obs. 1 (HU-012 C7 contra RN-169) | Alta | ✅ Aplicada (iteración 3), **sin verificación independiente** | HU-012 C7 y C15; 08-backlog.md; P-043 |
| VL-P054 obs. 1 (invitaba a personas sin vínculo vigente) | Alta | ✅ Aplicada (iteración 3), **sin verificación independiente** | RN-175 nueva; §3.0.6; P-054 |
| VL-P061 obs. 2 (al renombrar un área se perdían sus reservas) | Alta | ✅ Aplicada (iteración 3), **sin verificación independiente** | shell.js (`CH.areaAlias`); P-012; HU-004 C1 |
| VL-P061 obs. 3 (la anticipación se truncaba a días) | Media | ✅ Aplicada (iteración 3) | shell.js; P-012 |
| Verificación N1 (07-architecture renovaba la sesión con el polling) | Alta | ✅ Aplicada (iteración 3) | 07-architecture.md ADR-0013 |
| Verificación N2, N3, N4, N8 | Media/Baja | ✅ Aplicadas (iteración 3) | 07-architecture.md; 09-ui-spec.md; P-020 |
| Verificación N5 (trazas de RN-169 a RN-175) | Baja | ✅ Aplicada (iteración 3) | 06-user-stories.md; fichas de P-053, P-054 y P-061 |
| VL-P007 (corrección cruzada: VL-P001 daba HU-002B como cubierta) | — | ✅ Aplicada | VL-P001 corregido |

**Decisiones del autor que ya resolvieron temas que las revisiones marcan como pendientes:** el polling no cuenta como actividad; RN-165 reajustada (cada código con su texto); los códigos RN-169 a RN-175; la persona de portería primero se asigna a un vínculo (ficha de P-053); y la corrección de fechas. Si una VL todavía cita alguno como pendiente, ya está resuelto.

---

## VL-P001 · P-001 Iniciar sesión

**Prototipo:** [prototypes/P-001-iniciar-sesion.html](prototypes/P-001-iniciar-sesion.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-001](09-ui-spec.md) · **Flujos:** F2, F5, F13 · **HU declaradas:** HU-003, HU-003B
**Veredicto:** **Pasa con observaciones.** La pantalla P-001 cumple su ficha: mensaje neutro, bloqueo, `429` y sesión vencida. Los gaps están en la **salida** de P-001: el ruteo automático por `nextStep`, el `returnUrl` y las pantallas siguientes sin prototipo.
**Re-validación 2026-11-08:** los dos gaps de severidad Alta (obs. 1 y 5) están **cerrados**; ver "Cierre de gaps de severidad Alta" en registro-revision-prototipos.md. Las observaciones Media y Baja siguen abiertas. Las tablas de abajo muestran el estado después del cierre; el estado anterior figura entre paréntesis cuando cambió.

### 1. Cobertura de HUs

P-001 es la entrada de todas las HU, pero solo HU-003 y HU-003B se validan en ella. Las demás HU Must (HU-001 a HU-014) no aplican a esta pantalla.

| HU | Criterios observables desde P-001 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-003B | 8 de 9 aplicables (el criterio de las 10:29:59 se verifica en otra pantalla) | ✅ Cubierta | 5 fallos → bloqueo de 900 s con el mismo mensaje (C1, C9); fin del bloqueo en el segundo exacto (C2, C7: `t >= until`); 4 fallos y luego éxito (C5); sesión vencida por inactividad y por 12 h (C3, C4, C10). **Falta C6:** el contador de P-001 y el de P-002 son independientes, así que 3 fallos de contraseña + 2 de TOTP no bloquean (obs. 4) |
| HU-003 | 2 de 8 (los otros 6 viven en P-002, P-003 y P-004) | ⚠️ Parcial | C3 (TOTP pedido tras la contraseña) ✅ en modo automático para Marco y Rosa. C1 (enrolamiento obligatorio) ✅ P-003 sin opción "más tarde", pero solo se llega con el selector manual `MfaEnrollmentRequired` (obs. 2). C2 (10 códigos una sola vez) ✅ en P-004. C8 (Ana BoardMember en un condominio y Resident en otro) no se puede reproducir: la persona Ana del prototipo no es BoardMember (obs. 3) |
| HU-002B | Puerta de consentimiento (C1, C2, C4, C5, C6) | ⚠️ Parcial (corregido por VL-P007) | P-007 muestra la transferencia a Azure South Central US (C2), la versión `2027-01-10.v2` (C5) y, desde P-005, el primer ingreso a "Torres del Parque" (C6). **C1 y C4 no se cumplen en modo automático:** tras "No acepto", Carla vuelve a P-001 y entra directo a P-010, y abrir `/reservations` no redirige a P-007 (ver VL-P007 obs. 1) |
| HU-002 | C12 (correo con cuenta existente → iniciar sesión para aceptar) | ✅ Reflejada (antes ❌) | Tras el éxito, `returnUrl=/invitations/k9F2xQ7mTb` lleva a P-006 con su token. P-006 aún no tiene prototipo: el destino se muestra como navegación simulada |

**HU Must faltantes en esta pantalla:** ninguna de las que P-001 declara. ~~HU-002 (C12) y HU-002B dependen de P-001 para su flujo y no se pueden validar de punta a punta.~~ Cerrado el 2026-11-08: HU-002 C12 llega hasta P-006, que aún no tiene prototipo. HU-002B tiene ahora sus pantallas, pero la puerta de consentimiento no se simula (VL-P007 obs. 1).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-153 | No revelar si la cuenta existe o está bloqueada | ✅ | Mismo `MSG_FAILED` para correo sin cuenta, contraseña incorrecta y cuenta bloqueada; sin error por campo; el bloqueo solo aparece en la banda del prototipo |
| RN-111 | 5 fallos → 900 s de bloqueo desde el quinto | ✅ / ⚠️ | ✅ en P-001; ⚠️ el contador no se comparte con P-002 (obs. 4) |
| RN-102 | `422` + código estable + mensaje de recursos | ✅ | `SIGN_IN_FAILED` en la nota del alert; alert con `role="alert"` y foco |
| RN-113 | Cierre a los 1,800 s sin actividad | ✅ | Estado "Sesión vencida" con `?reason=expired&returnUrl=` |
| RN-114 | Cierre a las 12 h aunque haya actividad | ⚠️ | Llega a P-001, pero el texto dice "por inactividad", que es falso en este caso (obs. 6) |
| RN-008 | TOTP en todo inicio de sesión de Administrator/BoardMember, en cualquier condominio | ⚠️ | Solo con los flags `admin`/`board` de la persona; el caso multicondominio no tiene persona (obs. 3) |
| RN-140 | Enrolamiento obligatorio si no hay TOTP | ⚠️ | P-003 no ofrece "más tarde"; pero solo se llega con el selector manual, ninguna persona llega sola (obs. 2) |
| RN-064 | Elegir el condominio tras contraseña y TOTP, antes de crear la sesión | ⚠️ | P-005 no trae un condominio por defecto; pero solo se llega con el selector manual: Luis entra directo a P-010 (obs. 2) |
| RN-122 | Cuenta existente → iniciar sesión para aceptar la invitación | ✅ (antes ❌) | `returnUrl=/invitations/{token}` sobrevive a P-002…P-007 y lleva a P-006 |
| RN-074 | ASVS 4.0 L2 en sesión y autenticación | ⚠️ (antes ❌) | La ficha de P-001 ya exige que `returnUrl` sea una ruta local, y el prototipo ignora una URL externa; falta el test (obs. 7) |
| RN-115 ⏸ | Recuperación de contraseña (diferida, ADR-0020) | ✅ | Sin enlace de recuperación, como manda la spec; ver el callejón sin salida en la obs. 8 |
| Rate limit 10/min → `429` | [07-architecture.md](07-architecture.md) (rate limiting) | ✅ | Alert con los segundos de `Retry-After`. **No tiene RN:** el límite no se traza al catálogo (obs. 9) |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F13 · Carla, residente sin MFA | P-001 → P-010 | ✅ Sin fricción. E1–E5 reproducibles con "Avanzar 15 min" y el estado "Sesión vencida" |
| F5 · Raúl, Concierge | P-001 → P-020 (ignora `returnUrl`) | ✅ Conforme a la spec |
| F2 · Marco con TOTP | P-001 → P-002 | ✅ Hasta P-002 |
| F2 · Marco sin TOTP | P-001 → P-003 → P-004 → P-005 → P-007 → `returnUrl` (selector manual en P-001) | ✅ (antes ❌ callejón sin salida). Recorrido probado de punta a punta |
| F13 paso 2 · usuario con más de un condominio | P-001 → P-005 → P-007 con el selector manual | ⚠️ (antes ❌) Se valida, pero el modo automático aún no pasa por P-005 (obs. 2) |
| F1 2b · invitación con cuenta existente | P-006 → P-001 → P-006 con su token | ✅ (antes ❌) |
| Sesión vencida en una pantalla con id (p. ej. `/reservations/r-8841`) | P-001 → P-002 → P-007 → P-015 `?id=r-8841` | ✅ (antes ⚠️) |
| `returnUrl` externo (`https://otro-sitio.example/`) | P-001 → P-010 | ✅ Se ignora |
| Olvidé mi contraseña | "Comunícate con la administración" | ❌ **Callejón sin salida:** ninguna HU ni tarea le da a la administración una forma de restablecer la contraseña ni de desbloquear (RN-115 diferida, ADR-0020) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | **[CERRADA 2026-11-08]** P-003, P-004, P-005 y P-007 no tienen prototipo: después de P-001 todo camino que no sea P-002, P-010 o P-020 termina en "Navegación simulada" | gap | Alta | Prototipar P-003, P-004, P-005 y P-007 antes de cerrar la validación del flujo de acceso | HU-003 (C1, C2), HU-002B (C1, C4), RN-140, RN-112, RN-064 |
| 2 | El modo automático de `nextStep` solo produce `MfaRequired` o `SignedIn`: nunca `MfaEnrollmentRequired`, `CondominiumSelectionRequired` ni `ConsentRequired` | comprensión | Media | Derivar `nextStep` de atributos de la persona (`totpEnrolled`, `condos[]`, `consentAccepted`) y agregar una persona sin TOTP (p. ej. Marco antes del enrolamiento) y una con dos condominios (Luis) | HU-003 C1, RN-140, RN-064 |
| 3 | Ninguna persona reproduce "Ana BoardMember en Los Olivos, Resident en Torres del Parque", el ejemplo de RN-008 y HU-003 C8; la Ana del prototipo es solo residente | gap | Media | Agregar la persona `anaBoard` (o un condominio extra a Marco) y verificar que pase por P-002 y luego por P-005 | HU-003 C8, RN-008, RN-064 |
| 4 | El contador de fallos de P-001 (por correo) y el de P-002 (por persona) son independientes y viven en memoria de cada página: 3 fallos de contraseña + 2 de TOTP no bloquean | gap | Media | Compartir el contador entre P-001 y P-002 (p. ej. `sessionStorage` por cuenta) y mostrarlo en la banda del prototipo | HU-003B C6, RN-111 |
| 5 | **[CERRADA 2026-11-08]** `returnUrl=/invitations/{token}` (P-006, RN-122) y cualquier ruta con id se comparan contra el patrón literal de `SCREENS` y caen a P-010 | gap | Alta | En el prototipo, reconocer patrones con `{id}`/`{token}`; en la spec, declarar que P-002, P-003, P-004 y P-005 propagan `returnUrl` (hoy solo P-001 y P-007 lo nombran) | HU-002 C12, RN-122, HU-003B C3 |
| 6 | El aviso de sesión vencida dice "por inactividad" también cuando se cumplen las 12 h con actividad; F13 E5 pide "el mismo aviso" | comprensión | Baja | Usar un texto neutro ("Tu sesión se cerró. Ingresa de nuevo.") o distinguir `reason=expired` de `reason=max-lifetime` | HU-003B C4, RN-114 |
| 7 | **[PARCIAL 2026-11-08]** La spec no exige validar `returnUrl` como ruta local; un enlace `/sign-in?returnUrl=https://otro.sitio` sería una redirección abierta. La regla ya está en la ficha de P-001, como parte del cierre de la obs. 5 | gap | Media | ~~Agregar a la ficha de P-001~~ Hecho. Pendiente: el test de integración y su criterio en HU-003B | RN-074 (ASVS L2) |
| 8 | "¿No puedes ingresar? Comunícate con la administración." promete una ayuda que no existe: el MVP no le da a la administración cómo restablecer una contraseña ni desbloquear una cuenta | fricción | Media | Ajustar el texto a lo que el MVP ofrece, o registrar en ADR-0020 el procedimiento manual (seeder en la demo) y bloquear su uso con usuarios reales | HU-003B, RN-115 ⏸, ADR-0020 |
| 9 | El rate limit de 10 solicitudes/min por IP y por índice ciego del correo solo está en la arquitectura; no hay RN ni criterio de HU que lo pruebe | gap | Media | Crear la RN del rate limit de `/api/auth/*` (con `429` y `Retry-After`) y un criterio en HU-003B | HU-003B, RN-074 |
| 10 | Un usuario bloqueado no tiene ninguna pista para esperar: tras 5 fallos sigue intentando y cada intento falla sin explicación | fricción | Baja | Evaluar un texto fijo, siempre visible y no condicionado al estado de la cuenta ("Después de varios intentos fallidos, espera 15 minutos"); confirmar antes que no contradice RN-153 | HU-003B C1, RN-111, RN-153 |
| 11 | No se define qué pasa si alguien abre `/sign-in` con una sesión activa | gap | Baja | Definir en la ficha: redirige a `returnUrl` o a P-010 (P-020 para Concierge) | HU-003B |
| 12 | En la PC compartida de portería, `autocomplete="username"` deja que el navegador ofrezca guardar las credenciales del Concierge | mejora | Baja | Documentar en F5 la configuración del navegador de portería (no guardar contraseñas); no cambiar el `autocomplete`, que exige WCAG 1.3.5 | HU-003B (motivo: PC compartida) |
| 13 | La página de error `500` ofrece "Volver a intentar"; §3.0.4 pide "enlace a Inicio" | comprensión | Baja | Aclarar en §3.0.4 que en las páginas de acceso el enlace es a P-001 | — (§3.0.4) |

### 5. Decisiones recomendadas antes de implementar

1. ~~**Prototipar P-003, P-004, P-005 y P-007** y re-validar F2 y F13 de punta a punta (obs. 1).~~ ✅ Hecho el 2026-11-08.
2. ~~**Fijar en 09-ui-spec.md la propagación de `returnUrl`** por P-002 → P-003 → P-004 → P-005 → P-007, y su validación como ruta local (obs. 5, 7).~~ ✅ Hecho el 2026-11-08; falta el test de la obs. 7.
3. **Crear la RN del rate limit de autenticación** y su criterio en HU-003B (obs. 9).
4. **Agregar a HU-003B un criterio de integración** que cruce P-001 y P-002: el contador de RN-111 suma los fallos de contraseña y de TOTP (ya existe como C6; falta reflejarlo en el prototipo) (obs. 4).
5. **Ajustar las personas del prototipo**: una sin TOTP, una con dos condominios y Ana como BoardMember en un solo condominio (obs. 2, 3).
6. **Decidir el texto de ayuda** de P-001 y el procedimiento de la administración ante una contraseña olvidada mientras RN-115 siga diferida (obs. 8, 10).
7. **Corregir el texto de sesión vencida** para RN-114 (obs. 6). Los puntos 11 a 13 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-001 cubiertas por completo | HU-003B ✅, HU-003 ⚠️ → 1 de 2 | **50 %** (100 % con cobertura parcial) |
| Criterios de HU-003B observables desde P-001 | 8 de 9 | **89 %** |
| HU Must del lote que dependen de P-001 y se validan de punta a punta | HU-003B → 1 de 4 (HU-002, HU-002B, HU-003, HU-003B) | **25 %** (HU-002B corregida a parcial por VL-P007 obs. 1) |
| HU Must del lote (19) con presencia en P-001 | 4 de 19 | 21 % (referencial: una sola pantalla) |
| Reglas de la ficha de P-001 reflejadas (RN-111, RN-113, RN-114, RN-153) | 3 completas + 1 parcial | **75 %** (100 % con parcial) |
| Reglas aplicables reflejadas (11: RN-008, RN-054, RN-064, RN-074, RN-102, RN-111, RN-113, RN-114, RN-122, RN-140, RN-153) | 5 completas, 5 parciales, 1 no verificable (RN-054) | **45 %** completas · **91 %** con parciales (antes 36 % · 73 %) |

---

## VL-P002 · P-002 Verificar código MFA

**Prototipo:** [prototypes/P-002-verificar-codigo-mfa.html](prototypes/P-002-verificar-codigo-mfa.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-002](09-ui-spec.md) · **Flujos:** F2 (paso 2c, E) · **HU declaradas:** HU-003, HU-003B
**Veredicto:** **Pasa con observaciones.** La pantalla cumple su ficha: mensaje neutro `SIGN_IN_FAILED` para un TOTP incorrecto, un código de recuperación ya usado y una cuenta bloqueada; el campo se vacía; hay variante `?method=recovery`, `429` y vuelta a P-001 con `reason=expired` cuando vence la sesión parcial. Los gaps son tres: los códigos de recuperación no coinciden con los que entrega P-004, el contador de bloqueo vive en la memoria de la página, y los enlaces de cambio de método pierden el `returnUrl` sin JS.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-002 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-003 | 6 de 8 (C1 y C2 se ven en P-003 y P-004) | ⚠️ Parcial | C3 (se pide el TOTP) ✅. C7 (TOTP incorrecto → mismo texto que P-001) ✅: `MSG_FAILED` es idéntico al de §3.0.6 y `status = { kind:'failed' }` no distingue la causa. C6 (código ya usado → `SIGN_IN_FAILED`) ✅: `7KQ2-M9XD` está en `USED_SEED` y `ok = RECOVERY.includes(v) && !used.includes(v)`. C5 (el último código sin usar sirve) ✅ como aproximación: hay 3 códigos libres en vez de 1 de 10. C4 (perdió el celular y usa uno de sus 10 códigos) ⚠️: solo 3 de los 10 códigos que muestra P-004 sirven en P-002 (obs. 1). C8 (Ana BoardMember en un condominio y Resident en otro) ❌: `roles: ['marco','rosa']`, ver VL-P001 obs. 3 |
| HU-003B | 5 de 10 (los de expiración de sesión se ven en P-001) | ⚠️ Parcial | C1 (bloqueada + TOTP correcto → `SIGN_IN_FAILED`) ✅ con `locked = acc.until > t`. C2 y C7 (fin del bloqueo en el segundo exacto) ✅ con `t >= acc.until` y "Avanzar 15 min". C5 (4 fallos y luego éxito) ✅: `acc.n = 0` al acertar. **C6 ❌:** el contador `fails` es una variable local de la página, no se comparte con P-001 y se pierde al recargar (ver VL-P001 obs. 4 y obs. 3 de esta revisión) |

**HU Must faltantes en esta pantalla:** ninguna. HU-003 C8 y HU-003B C6 no se pueden reproducir.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-153 | No revelar que la cuenta está bloqueada | ✅ | El estado "Cuenta bloqueada" muestra el mismo `MSG_FAILED`; el bloqueo solo aparece en la banda (`#sim-info`: "la pantalla no lo revela") |
| RN-102 | `422` + código estable + mensaje de recursos | ✅ | Alert `role="alert"` con foco; nota `SIGN_IN_FAILED (422)` |
| RN-111 | 5 fallos de contraseña **o** TOTP → 900 s; el contador no se reinicia al cambiar de paso | ⚠️ | ✅ dentro de la página (`MAX_FAILS = 5`, `LOCK_MS = 900 s`); ❌ el contador no se comparte con P-001 y se reinicia al recargar o al volver por "← Volver a iniciar sesión" (obs. 3) |
| RN-112 | Códigos de recuperación de un solo uso | ⚠️ | El código usado se guarda en `sessionStorage` (`mfa-used-v1`) y deja de servir ✅; pero 7 de los 10 códigos que entrega P-004 se rechazan (obs. 1) |
| RN-008 | TOTP en todo inicio de sesión de Adm./Junta, en cualquier condominio | ⚠️ | Marco y Rosa llegan a P-002 desde P-001 en modo automático ✅; el caso de otro condominio no tiene persona (VL-P001 obs. 3) |
| RN-140 | TOTP también si en este condominio solo es Resident | ⚠️ | Solo como nota (`rn('RN-008 · … elija el condominio que elija')`); sin persona que lo demuestre (VL-P001 obs. 3) |
| RN-074 | ASVS L2: sesión parcial, `returnUrl` local | ⚠️ | Sesión parcial vencida → `CH.go('P-001','reason=expired')` y `go()` propaga `returnUrl` ✅. Sin JS, los enlaces `href="?method=recovery"` y `href="?"` descartan el `returnUrl` (obs. 2) |
| Rate limit 10/min → `429` | [07-architecture.md](07-architecture.md) | ✅ | `hits` por minuto, alert con segundos; sin RN (VL-P001 obs. 9) |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en HTML. El texto de formato (`FORMAT_MSG`) no está en §3.0.6 (obs. 5) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F2 paso 2c · Marco con TOTP | P-001 → P-002 → (`SignedIn`) `CH.finishSignIn()` → `returnUrl` o P-010 | ✅ |
| F2 paso 2c → 3 → 4 | P-002 → P-005 / P-007 con el selector `#next` | ✅ El `returnUrl` viaja (`AUTH_CHAIN`) |
| F2 · código de recuperación | P-002 → "Usar un código de recuperación" → `?method=recovery` → P-010 | ✅ con JS (`setMethod` conserva la query); ⚠️ sin JS el enlace pierde `returnUrl` (obs. 2) |
| F2 de punta a punta: enrolar y luego usar un código | P-003 → P-004 (anota `W2CM-5TQA`) → … → P-001 → P-002 `?method=recovery` | ❌ `SIGN_IN_FAILED`: el código no está en `RECOVERY` (obs. 1) |
| F2 E · 5 TOTP incorrectos | P-002 ×5 → bloqueo → TOTP correcto → `SIGN_IN_FAILED` | ✅ |
| Saltarse el bloqueo | P-002 bloqueada → "← Volver a iniciar sesión" → P-001 → P-002 → TOTP correcto | ❌ Entra: el contador está en memoria (obs. 3) |
| Sesión parcial vencida | "Vencer la sesión parcial" → Verificar → P-001 `?reason=expired&returnUrl=…` | ✅ |
| Perdió el celular y los códigos | P-002 recovery sin códigos libres | ❌ **Callejón sin salida en la UI:** ningún texto dice qué hacer; el reinicio del MFA existe solo por el proceso de plataforma (RN-062, ADR-0003) (obs. 4) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | Los códigos de recuperación de P-002 no coinciden con los que entrega P-004: P-002 acepta solo `K7QF-9M2D`, `P3XN-8RWC` y `H4TZ-6LJB` (`RECOVERY`) y da por usado `7KQ2-M9XD` (`USED_SEED`), que P-004 muestra como el código n.º 1 de un enrolamiento recién hecho. Los códigos 5 a 10 de P-004 (`W2CM-5TQA`…`T3LQ-8BHN`) fallan con `SIGN_IN_FAILED`. En una sesión con stakeholders, un código válido recién guardado se rechaza | comprensión | Media | Que P-002 lea los 10 códigos de P-004 (`CODES`) desde una constante compartida en `shell.js`, y que el estado de "ya usados" empiece vacío después de P-003 (o separar con una persona "Marco que ya usó 1 código") | HU-003 C4, C5; RN-112 |
| 2 | Sin JS (SSR es el modo principal), los enlaces "Usar un código de recuperación →" (`href="?method=recovery"`) y "Usar el código de la app autenticadora" (`href="?"`) reemplazan la query completa y pierden el `returnUrl`. La ficha de P-002 solo dice "enlace a `?method=recovery`" | gap | Media | En la ficha de P-002: los dos enlaces conservan `returnUrl` (y en el prototipo, armarlos con la query actual en el `href`, no solo en `setMethod`) | §3.1 P-001 `returnUrl`; RN-122; RN-074 |
| 3 | El bloqueo de RN-111 se salta con "← Volver a iniciar sesión" o recargando: `fails` es una variable local, así que el contraejemplo de RN-111 ("un atacante prueba códigos TOTP sin límite") se reproduce en la demo. Amplía VL-P001 obs. 4 (que solo cubría la suma con P-001) | gap | Media | Mismo arreglo que VL-P001 obs. 4: un contador por cuenta en `sessionStorage`, compartido por P-001, P-002 y P-003 | HU-003B C1, C6; RN-111 |
| 4 | Quien perdió el celular y ya no tiene códigos no recibe ninguna indicación: el único texto es "¿No tienes tu celular?". El reinicio del MFA existe solo por el proceso de plataforma (RN-062, ADR-0003/0008), y la regeneración RN-141 está diferida | fricción | Baja | Agregar un texto fijo "Si no tienes tu celular ni tus códigos, pide a la administración que solicite el reinicio a CondoHub", y registrar el procedimiento junto a VL-P001 obs. 8 | HU-003 C4; RN-062; RN-141 ⏸ |
| 5 | El error de formato ("Escribe los 6 dígitos del código…", "Escribe el código con el formato de 4 caracteres…") no está en §3.0.6, y la ficha no dice si un código mal formado que llega al servidor (el formulario tiene `novalidate`) suma al contador de RN-111 o responde otro código | gap | Baja | Agregar a §3.0.6 los dos textos de formato y decidir en la ficha si un código mal formado es `SIGN_IN_FAILED` (y suma) o un `422` de validación sin sumar | HU-003 C7; RN-111; RN-153 |

### 5. Decisiones recomendadas antes de implementar

1. **Unificar los códigos de recuperación de P-002 y P-004** en el prototipo para que F2 se pueda recorrer sin contradicciones (obs. 1).
2. **Fijar en la ficha de P-002 que los enlaces de cambio de método conservan `returnUrl`** (obs. 2).
3. **Persistir el contador de RN-111** entre P-001, P-002 y P-003 (obs. 3; junto con VL-P001 obs. 4).
4. **Decidir el texto y el procedimiento para "sin celular y sin códigos"** mientras RN-141 siga diferida (obs. 4).
5. Agregar los textos de formato a §3.0.6 y decidir si un código mal formado suma al bloqueo (obs. 5).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-002 cubiertas por completo | HU-003 ⚠️, HU-003B ⚠️ → 0 de 2 | **0 %** (100 % con cobertura parcial) |
| Criterios observables desde P-002 | HU-003: C3, C5, C6, C7 ✅, C4 ⚠️, C8 ❌; HU-003B: C1, C2, C5, C7 ✅, C6 ❌ → 8 de 11 | **73 %** (82 % con parcial) |
| Reglas de la ficha de P-002 reflejadas (RN-008, RN-140, RN-112, RN-111) | 0 completas + 4 parciales | **0 %** completas · **100 %** con parciales |
| Reglas aplicables reflejadas (7: RN-008, RN-074, RN-102, RN-111, RN-112, RN-140, RN-153; RN-054 no verificable) | 2 completas, 5 parciales | **29 %** completas · **100 %** con parciales |

---

## VL-P003 · P-003 Configurar la app autenticadora

**Prototipo:** [prototypes/P-003-configurar-app-autenticadora.html](prototypes/P-003-configurar-app-autenticadora.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-003](09-ui-spec.md) · **Flujos:** F2 (paso 2a) · **HU declaradas:** HU-003
**Veredicto:** **Pasa con observaciones.** La pantalla cumple su ficha: tres pasos, QR ficticio con `aria-label`, clave en texto agrupada de 4 en 4 y seleccionable, código incorrecto con el error en el campo sin perder el QR, sin "más tarde", y éxito → P-004 con el mismo `returnUrl`. Los gaps son de spec: los intentos de enrolamiento no tienen límite, ni `429`, ni vencimiento de la sesión parcial.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-003 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-003 | 1 de 8 (C1) | ✅ Cubierta en la pantalla (⚠️ en el flujo) | C1 (enrolar antes de crear la sesión): la pantalla no tiene "más tarde", ni enlace a P-001, ni salida a otro condominio; el único envío es `#enroll` → `CH.go('P-004')`. Solo se llega con el selector manual `MfaEnrollmentRequired` de P-001 (VL-P001 obs. 2); `proto-info` lo dice |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-140 | Enrolamiento obligatorio, sin "más tarde" ni salida por otro condominio | ✅ | Sin acciones secundarias; P-005 va después de P-004 en el flujo, así que no se elude eligiendo otro condominio |
| RN-008 | MFA obligatorio para Adm./Junta | ✅ | `roles: ['marco','rosa']`; nota `RN-008 · aplica si tiene Administrator o BoardMember en cualquier condominio` |
| RN-112 | Al terminar el enrolamiento, 10 códigos una sola vez | ✅ | Éxito → `store.set('p004-shown','')` y `CH.go('P-004')`: P-004 los muestra como primera visita |
| RN-111 | 5 fallos de TOTP → bloqueo | ❌ | `attempt()` no cuenta los códigos incorrectos: se puede fallar sin límite. La spec no define si el código de enrolamiento suma (pendiente anotado en VL-P001, cierre) (obs. 1) |
| Rate limit 10/min → `429` | `POST /api/auth/mfa/enroll` está bajo `/api/auth/*` | ❌ | No existe el estado `429` en el selector (obs. 2) |
| RN-074 | ASVS L2: sesión parcial con vencimiento | ❌ | No hay estado "Sesión parcial vencida"; la spec no define cuánto dura la sesión parcial (obs. 2) |
| PRINCIPIO-009.4 | Librería de QR no aprobada | ✅ | Nota: sin la librería, la pantalla funciona solo con la clave en texto |
| RN-054 | Textos desde `es-PE.resx` | — | "Ese código no coincide…" es provisional y no tiene código en §3.0.6 (ya anotado en VL-P001, cierre) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F2 paso 2a · Marco sin TOTP | P-001 (selector `MfaEnrollmentRequired`) → P-003 → P-004 | ✅ con selector; el modo automático nunca llega aquí (VL-P001 obs. 2) |
| Código incorrecto | P-003 → `482914` → error en el campo, QR y clave visibles | ✅ |
| Código incorrecto 6 veces o más | P-003 ×N | ⚠️ Sin bloqueo ni `429` (obs. 1, 2) |
| Instala la app con calma (más de 30 min) | P-003 abierta → envía el código | ❓ No definido: la sesión parcial no tiene duración en la spec (obs. 2) |
| No tiene el celular a mano | P-003 | ❌ **Callejón sin salida:** no hay "Volver a iniciar sesión" ni "Cerrar sesión"; solo cerrar la pestaña (obs. 3) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | El código incorrecto durante el enrolamiento no suma a ningún contador: con una contraseña robada, un atacante prueba códigos sin límite. RN-111 habla de "código TOTP" sin distinguir el enrolamiento, y VL-P001 dejó la decisión como pendiente "no bloquea" | gap | Media | Decidir en RN-111 (o en la ficha) si el fallo de enrolamiento suma al contador y con qué código de error; reflejarlo en el prototipo con el contador compartido de VL-P002 obs. 3 | HU-003 C1; RN-111; RN-140 |
| 2 | P-003 (y también P-004 y P-005) no tienen los estados `429` ni "sesión parcial vencida". La spec solo define el vencimiento para P-002 y en ninguna parte dice cuánto dura la sesión parcial ([07-architecture.md](07-architecture.md) solo dice "cookie de sesión parcial"). P-003 es donde el usuario tarda más (instalar una app) | gap | Media | Definir el TTL de la sesión parcial (ADR-0008 o arquitectura §4.1), declarar en §3.0.4 que las pantallas P-002…P-005 comparten los estados `429` y "sesión parcial vencida → P-001 `reason=expired` con `returnUrl`", y agregarlos a los selectores | HU-003B; RN-074; §3.0.4 |
| 3 | Sin salida: quien no tiene el celular a mano no puede cancelar ni volver a P-001. RN-140 prohíbe "más tarde", no prohíbe cerrar la sesión parcial | fricción | Baja | Agregar un enlace "← Volver a iniciar sesión" (cierra la sesión parcial sin crear sesión), como en P-002 | RN-140; §3.1 P-003 |

### 5. Decisiones recomendadas antes de implementar

1. **Decidir si los fallos de enrolamiento suman a RN-111** y con qué mensaje (obs. 1).
2. **Definir la duración de la sesión parcial** y los estados comunes `429` y "sesión parcial vencida" para P-002…P-005 (obs. 2).
3. Agregar la salida "Volver a iniciar sesión" (obs. 3).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-003 cubiertas por completo | HU-003 C1 ✅ en la pantalla → 1 de 1 | **100 %** (en el flujo, ⚠️ solo con selector) |
| Criterios observables desde P-003 | C1 → 1 de 1 | **100 %** |
| Reglas de la ficha de P-003 reflejadas (RN-008, PRINCIPIO-005/RN-140) | 2 de 2 | **100 %** |
| Reglas aplicables reflejadas (6: RN-008, RN-140, RN-112, RN-111, RN-074, rate limit; RN-054 no verificable) | 3 completas, 3 no reflejadas | **50 %** |

---

## VL-P004 · P-004 Códigos de recuperación

**Prototipo:** [prototypes/P-004-codigos-de-recuperacion.html](prototypes/P-004-codigos-de-recuperacion.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-004](09-ui-spec.md) · **Flujos:** F2 (paso 2b) · **HU declaradas:** HU-003
**Veredicto:** **Pasa con observaciones.** La pantalla cumple su ficha: 10 códigos en una `<ol>` de 2 columnas, alert de advertencia, "Imprimir", casilla obligatoria con el error "Confirma que guardaste tus códigos." en el resumen y en el campo, y el estado "Los códigos ya se mostraron." al recargar. Los gaps son: quien recarga sin haberlos guardado se queda sin códigos para siempre, el acceso directo no está definido y no se sabe de dónde sale el `nextStep`.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-004 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-003 | 1 de 8 (C2) | ✅ Cubierta | C2 (10 códigos de un solo uso, una sola vez): `CODES` tiene 10; `afterRender` guarda `p004-shown = '1'` y el script previo a `shell.js` fuerza `state=shown` al recargar. "Un solo uso" se prueba en P-002, con la salvedad de VL-P002 obs. 1 |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-112 | 10 códigos, mostrados una sola vez | ✅ | Recarga → "Los códigos ya se mostraron." + "Continuar", sin la lista |
| RN-141 ⏸ | Regeneración (diferida, ADR-0020) | ✅ | Sin opción de regenerar; nota `regenerarlos (RN-141) está diferido por ADR-0020` |
| RN-062 | Reinicio del MFA solo por el proceso de plataforma | — | No aplica a la pantalla; ver obs. 1 |
| `Cache-Control: no-store` | Ficha de P-004 | — | Solo nota; no se verifica en un prototipo |
| RN-074 | ASVS L2 (ruta solo accesible tras P-003; sesión parcial) | ⚠️ | El prototipo muestra los códigos a cualquiera que abra la página por primera vez en la pestaña; la spec no dice qué pasa si se entra sin venir de P-003 (obs. 2); sin estado de sesión parcial vencida (VL-P003 obs. 2) |
| RN-054 | Textos desde `es-PE.resx` | — | "Confirma que guardaste tus códigos." no tiene código en §3.0.6 (validación local) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F2 paso 2b · Marco | P-003 → P-004 → marca la casilla → Continuar → P-005 / P-007 / `returnUrl` o P-010 (selector `#next`) | ✅ `returnUrl` se propaga |
| Sin marcar la casilla | P-004 → Continuar | ✅ Error en resumen y campo, con foco |
| Recarga antes de guardar | P-004 → F5 → "Los códigos ya se mostraron." → Continuar | ⚠️ Entra, pero sin códigos guardados y sin forma de regenerarlos (obs. 1) |
| Abre `/sign-in/mfa/recovery-codes` directamente | Índice → P-004 | ⚠️ Muestra los 10 códigos; la spec no define este caso (obs. 2) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | Si el usuario recarga, se le cae la conexión o cierra la pestaña antes de guardar los códigos, P-004 solo muestra "Los códigos ya se mostraron." y "Continuar". Con RN-141 diferida, se queda sin códigos de recuperación y su único respaldo es el reinicio del MFA por el proceso de plataforma (RN-062), que la pantalla no menciona | fricción | Media | En el estado "ya mostrados", agregar el texto "Si no los guardaste, pide a la administración que solicite el reinicio de tu verificación" y documentar en ADR-0020 que RN-062 cubre este caso mientras RN-141 esté diferida | HU-003 C2; RN-112; RN-141 ⏸; RN-062 |
| 2 | "Solo accesible justo después de P-003" no tiene comportamiento definido para el acceso directo, el botón Atrás o una segunda pestaña: ¿redirige a P-001, a P-002 o muestra "ya mostrados"? | gap | Baja | Definirlo en la ficha (p. ej. sin la marca de enrolamiento reciente en la sesión parcial → estado "ya mostrados"; sin sesión parcial → P-001) | RN-112; RN-074 |
| 3 | La ficha dice "Éxito según `nextStep`", pero el formulario hace `POST /sign-in/mfa/recovery-codes` (no es un endpoint de la API) y [07-architecture.md](07-architecture.md) no dice qué respuesta trae el `nextStep` después del enrolamiento (¿`POST /api/auth/mfa/enroll`?) | comprensión | Baja | Declarar en la arquitectura que `/api/auth/mfa/enroll` responde con `nextStep` y que la página de P-004 lo conserva hasta "Continuar" | HU-003 C2; §3.1 P-004 |

### 5. Decisiones recomendadas antes de implementar

1. **Dar una salida a quien no guardó los códigos** mientras RN-141 esté diferida (obs. 1).
2. **Definir el acceso directo a P-004** (obs. 2) y **el origen del `nextStep`** tras el enrolamiento (obs. 3).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-004 cubiertas por completo | HU-003 C2 ✅ → 1 de 1 | **100 %** |
| Criterios observables desde P-004 | C2 → 1 de 1 | **100 %** |
| Reglas de la ficha de P-004 reflejadas (RN-112, RN-141 ⏸) | 2 de 2 | **100 %** |
| Reglas aplicables reflejadas (3: RN-112, RN-141 ⏸, RN-074; RN-054 no verificable) | 2 completas, 1 parcial | **67 %** completas · **100 %** con parciales |

---

## VL-P005 · P-005 Elegir condominio

**Prototipo:** [prototypes/P-005-elegir-condominio.html](prototypes/P-005-elegir-condominio.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-005](09-ui-spec.md) · **Flujos:** F2 (paso 3), F13 (paso 2) · **HU declaradas:** HU-003 (nota RN-064), HU-002B
**Veredicto:** **Pasa con observaciones.** La pantalla cumple su ficha: ningún condominio viene elegido, el error "Elige un condominio." aparece en el resumen y en el `fieldset`, y Torres del Parque (primera vez) lleva a P-007 con su nombre. Los gaps están en el prototipo y en la salida: la persona cambia sin aviso a Luis si no está en `roles`, la sesión siempre muestra "Residencial Los Olivos" aunque se haya elegido Torres del Parque, y no se define qué pasa con un `returnUrl` de otro condominio.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-005 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-002B | C6 (primera vez en Torres del Parque → solo consentimiento) | ✅ Cubierta | `CONSENTED = { 'c-olivos': true, 'c-parque': false }` → `CH.go('P-007')`; `store.set('condo-v1', …)` hace que P-007 muestre "Torres del Parque" |
| HU-003 | C8 (Ana BoardMember en Los Olivos y Resident en Torres del Parque) | ❌ | Ana está en `roles`, pero P-005 no sabe si pasó por el TOTP: la Ana de `PERSONAS` no tiene `board` (VL-P001 obs. 3). La nota de RN-064 (elegir después del TOTP) solo se ve en el orden del flujo con selectores |

**HU Must faltantes en esta pantalla:** ninguna; HU-003 C8 sigue sin persona.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-064 | Elegir tras contraseña y TOTP, antes de crear la sesión; sin condominio por defecto; la sesión queda restringida a ese condominio | ⚠️ | Sin valor por defecto ✅ (`required`, ningún `checked` salvo en "Cargando"); orden correcto solo con selectores (VL-P001 obs. 2); ❌ después de elegir Torres del Parque, el `AppShell` muestra `DATA.condo` = "Residencial Los Olivos" (obs. 2) |
| RN-010 / RN-071 | Consentimiento por ficha `Person` de cada condominio | ✅ | Torres del Parque → P-007; Los Olivos → `finishSignIn()` |
| RN-008 / RN-140 | TOTP aunque en el condominio elegido solo sea Resident | ⚠️ | No se puede comprobar: P-005 no recibe si la persona tiene Adm./Junta en otro condominio (VL-P001 obs. 3) |
| RN-103 | No distinguir "no existe" de "otro condominio" | ⚠️ | `returnUrl=/reservations/r-8841` (de Los Olivos) + elegir Torres del Parque → P-015 muestra la reserva igual (obs. 3) |
| RN-122 | El condominio de la invitación se agrega al selector | — | Depende de P-006, sin prototipo |
| Rate limit / sesión parcial | `POST /api/auth/condominium` | ❌ | Sin estados `429` ni "sesión parcial vencida" (ver VL-P003 obs. 2) |
| RN-054 | Textos desde `es-PE.resx` | — | No verificable |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F2 paso 3 · Marco | P-002 / P-004 (selector `CondominiumSelectionRequired`) → P-005 → Los Olivos → `returnUrl` o P-010 | ✅ |
| HU-002B C6 · Ana | P-005 → Torres del Parque → P-007 "Torres del Parque" → Acepto → P-010 | ⚠️ P-010 muestra "Residencial Los Olivos" (obs. 2) |
| F13 paso 2 · **Carla** con dos condominios | P-001 como Carla (selector `CondominiumSelectionRequired`) → P-005 | ❌ P-005 abre como **Luis Rojas**: `carla` no está en `roles: ['luis','ana','marco']` y `CH.init` toma `cfg.roles[0]` (obs. 1) |
| F2 · Rosa (Administración) con dos condominios | P-002 como Rosa → P-005 → P-010 | ❌ Termina como Luis, sin el menú de Administración (obs. 1) |
| Raúl (Portería) con dos condominios | P-001 como Raúl → P-005 → `finishSignIn()` | ❌ Termina en P-010 como Luis, no en P-020 (obs. 1) |
| Sin elegir | P-005 → Continuar | ✅ "Elige un condominio." con enlace al primer radio |
| Sesión vencida en Los Olivos y se elige Torres del Parque | P-001 `returnUrl=/reservations/r-8841` → … → P-005 Torres → P-007 → P-015 r-8841 | ⚠️ Se muestra la reserva de otro condominio (obs. 3) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La persona cambia sin aviso: `CH.init` reemplaza el `role` que llega por `cfg.roles[0]` (Luis) si no está en `roles`. Así, Carla (actora de F13 paso 2, la ruta que propone `index.html`), Rosa y Raúl entran a P-005 y salen como Luis; Raúl termina en P-010 en vez de P-020. El problema está en `shell.js`, así que también afecta a P-002, P-003 y P-004 (`roles: ['marco','rosa']`) | comprensión | Media | Incluir en `roles` de P-005 a todas las personas (como P-007), o que `CH.init` respete un `role` válido de `PERSONAS` aunque no esté en el selector; mostrar en la banda la persona que llegó | F13; HU-002B C6; RN-064 |
| 2 | Después de elegir Torres del Parque, el `AppShell` de P-010 (y de todas las pantallas) muestra "Residencial Los Olivos" (`appShell()` usa `DATA.condo`, que es fijo). En la demo, la elección no cambia nada visible, justo lo que RN-064 debe dejar claro ("todas sus consultas quedan restringidas a ese condominio"). Además `condo-v1` no se borra nunca: un P-007 posterior muestra Torres del Parque aunque la persona no haya pasado por P-005 | comprensión | Media | Que `appShell()` use `store.get('condo-v1') \|\| DATA.condo` y que P-001 borre `condo-v1` al iniciar sesión; para Torres del Parque basta con mostrar el nombre y un estado vacío | RN-064; HU-002B C6 |
| 3 | No se define qué pasa con un `returnUrl` que apunta a un recurso de otro condominio (p. ej. la sesión venció en `/reservations/r-8841` de Los Olivos y el usuario elige Torres del Parque). Por RN-103 debería ser P-091, o descartarse el `returnUrl` si cambia el condominio | gap | Baja | Agregarlo a la regla de `returnUrl` de la ficha de P-001: "si el condominio elegido no es el del recurso, el destino responde 404 (P-091)" o "se ignora y va a P-010" | RN-064; RN-103; §3.1 P-001 `returnUrl` |
| 4 | La ficha no dice qué responde `POST /api/auth/condominium` si el `condominiumId` enviado no está en la lista del usuario (formulario manipulado) | gap | Baja | Definir la respuesta (mismo `SIGN_IN_FAILED` o `404` sin distinguir, RN-103) y agregar un test de integración | RN-064; RN-103 |
| 5 | Una vez creada la sesión, la única forma de pasar al otro condominio es cerrar sesión y volver a pasar por P-001…P-005 (con TOTP para la Junta). RN-064 ya marca este punto como pendiente (06 C-07) | comprensión | Baja | Confirmar en RN-064 que el MVP no tiene cambio de condominio en sesión y decirlo en P-010 / §3.0.2 si se mantiene | RN-064 ⚠️ |

### 5. Decisiones recomendadas antes de implementar

1. **Corregir el cambio de persona en `CH.init`** para poder recorrer F13 paso 2 con Carla y F2 con Rosa (obs. 1).
2. **Mostrar el condominio elegido en el `AppShell`** del prototipo y borrar `condo-v1` al iniciar sesión (obs. 2).
3. **Definir `returnUrl` entre condominios** y la respuesta a un `condominiumId` ajeno (obs. 3, 4).
4. Confirmar el alcance del cambio de condominio en sesión (obs. 5).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-005 cubiertas por completo | HU-002B (C6) ✅, HU-003 (C8) ❌ → 1 de 2 | **50 %** |
| Criterios observables desde P-005 | HU-002B C6 ✅, HU-003 C8 ❌ → 1 de 2 | **50 %** |
| Reglas de la ficha de P-005 reflejadas (RN-064) | 1 parcial | **0 %** completas · **100 %** con parcial |
| Reglas aplicables reflejadas (5: RN-064, RN-010/RN-071, RN-008/RN-140, RN-103, rate limit y sesión parcial; RN-122 y RN-054 no aplican aquí) | 1 completa, 3 parciales, 1 no reflejada | **20 %** completas · **80 %** con parciales |

---

## VL-P007 · P-007 Consentimiento informado

**Prototipo:** [prototypes/P-007-consentimiento.html](prototypes/P-007-consentimiento.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-007](09-ui-spec.md) · **Flujos:** F1 (paso 3, 3a), F2 (paso 4), F13 (paso 2) · **HU declaradas:** HU-002B
**Veredicto:** **Pasa con observaciones, condicionado a la obs. 1.** La pantalla cumple su ficha: versión y condominio bajo el `h1`, transferencia a Azure South Central US en un alert que no se puede omitir, alert de versión nueva encima del `h1`, "Acepto"/"No acepto" en el mismo `form`, estado de rechazo con el texto de la ficha y "Volver a iniciar sesión" con el `returnUrl`. Pero la **puerta** de consentimiento (RN-010, RN-070) no se simula: HU-002B C1 y C4 no se pueden validar, y en el modo automático la demo muestra el contraejemplo de RN-070. Esto corrige lo que dice VL-P001 sobre C4 (✅).

### 1. Cobertura de HUs

| HU | Criterios observables desde P-007 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-002B | 5 de 6 (C3 es del servidor) | ⚠️ Parcial | C2 (transferencia a Azure South Central US) ✅: alert con `h2` "Tus datos se guardan en Estados Unidos" y el texto exacto del ejemplo de RN-011. C5 (versión `2027-01-10.v2`) ✅: estado "Versión nueva" con el alert encima del `h1`. C6 (Torres del Parque) ✅ desde P-005. **C4 ⚠️:** el rechazo muestra el estado correcto, pero `rejected` es una variable local; al volver a iniciar sesión, Carla entra a P-010 en modo automático (obs. 1). **C1 ❌:** ninguna pantalla redirige a P-007; abrir `/reservations` (P-014) con el consentimiento pendiente muestra la lista (obs. 1). C3 (`consentVersion` y `acceptedAt` en la ficha `Person`) solo como nota RN-012 |

**HU Must faltantes en esta pantalla:** ninguna está ausente, pero HU-002B no se puede validar de punta a punta (C1, C4).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-011 | Declarar la transferencia a Azure South Central US | ✅ | Texto literal del ejemplo de RN-011, en un alert que no se puede omitir |
| RN-071 | Versión nueva → aceptarla en el siguiente inicio de sesión, por ficha | ✅ | Estado "Versión nueva (RN-071)", versión `2027-01-10.v2` |
| RN-012 | Versión y fecha en la ficha `Person` del condominio, no en la cuenta | ⚠️ | Solo nota (`{ consentVersion, acceptedAt } en la ficha Person de …`); no es observable en la UI |
| RN-010 | Sin aceptación, ninguna otra pantalla de ese condominio | ❌ | La puerta no se simula: ni P-010 ni P-014 redirigen a P-007 con el consentimiento pendiente (obs. 1) |
| RN-070 | Rechazo → cuenta sin activar | ⚠️ / ❌ | ✅ el estado de rechazo; ❌ al volver a iniciar sesión (modo automático) Carla entra a P-010 y puede reservar: es el contraejemplo de la regla (obs. 1). Además, la regla no dice qué pasa con una cuenta ya activa que rechaza en otro condominio o una versión nueva (obs. 2) |
| RN-122 | Invitación con cuenta existente → `returnUrl` a P-006 | ✅ | `finishSignIn()` acepta `/invitations/{token}` |
| RN-074 | `returnUrl` local | ✅ | Éxito y rechazo usan `finishSignIn()` / `go('P-001')`, que validan y propagan el `returnUrl` |
| Q18 / Q32 | Texto legal | ⚠️ | Provisional, como la ficha (ya anotado en VL-P001, cierre) |
| RN-054 | Textos desde `es-PE.resx` | — | No verificable |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F1 paso 3 · Ana acepta | P-007 → Acepto → P-010 | ✅ (P-006 sin prototipo) |
| F2 paso 4 · Marco | P-005 → P-007 → Acepto → `returnUrl` o P-010 | ✅ |
| F5 · Raúl con consentimiento pendiente | P-007 como Raúl → Acepto → P-020 | ✅ `finishSignIn()` respeta Concierge |
| F1 paso 3a · Carla rechaza y vuelve a entrar | P-007 → No acepto → "Volver a iniciar sesión" → P-001 (modo automático) → **P-010** | ❌ Entra al condominio sin consentimiento (obs. 1). Con el selector `ConsentRequired` de P-001 se puede simular a mano |
| HU-002B C1 · Ana abre `/reservations` con el consentimiento pendiente | P-014 | ❌ Muestra "Mis reservas" (obs. 1) |
| Ana (activa en Los Olivos) rechaza en Torres del Parque | P-005 → P-007 → No acepto | ⚠️ El texto dice "no puedes usar CondoHub en Torres del Parque", pero la nota dice "la cuenta queda sin activar": no se sabe si pierde también Los Olivos (obs. 2) |
| Lee el texto más de 30 min | P-007 abierta → Acepto | ❓ No se sabe si aplica RN-113 (sesión creada) o el TTL de la sesión parcial (obs. 3) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La puerta de consentimiento no se simula. (a) El rechazo vive en `let rejected` y nadie lo lee: tras "No acepto" → "Volver a iniciar sesión", P-001 en modo automático manda a Carla a P-010 (`step = … : 'SignedIn'`). Es el contraejemplo de RN-070 ("rechaza y aun así entra a Reservas") y deja sin validar HU-002B C4. (b) Ninguna pantalla de la app redirige a P-007 con el consentimiento pendiente, así que HU-002B C1 no se puede ver. VL-P001 marcó C4 como ✅ porque solo miró la vuelta a P-001 | gap | **Alta** | Guardar en `sessionStorage` el estado del consentimiento por persona y condominio (`pending`/`rejected`/`accepted`); que P-001 lo use para derivar `ConsentRequired` en modo automático (junto con VL-P001 obs. 2), y que `CH.init` del `AppShell` redirija a P-007 mientras no esté `accepted`, mostrando en la ruta la URL pedida (`/reservations`) | HU-002B C1, C4; RN-010; RN-070 |
| 2 | RN-070 dice "mantener su cuenta sin activar", pero el consentimiento es por ficha `Person` y condominio (RN-010, RN-012, RN-071). No se define qué pasa cuando una cuenta ya activa rechaza: Ana en Torres del Parque (HU-002B C6) o la versión `2027-01-10.v2` (C5). La nota del prototipo ("la cuenta queda sin activar") y el texto de la pantalla ("no puedes usar CondoHub en {condominio}") dicen cosas distintas | comprensión | Media | Reescribir RN-070 por condominio: "la ficha `Person` de ese condominio queda sin consentimiento y no se crea la sesión en ese condominio; los demás condominios no cambian", y alinear la nota del prototipo | HU-002B C4, C5, C6; RN-070; RN-012 |
| 3 | No queda claro si P-007 corre con sesión parcial o con sesión creada: `ConsentRequired` es un `nextStep` previo a `SignedIn`, pero [07-architecture.md](07-architecture.md) pide para `POST /api/consents/current/decision` una "sesión sin puerta de consentimiento" y §3.0.4 lo trata como una puerta de una sesión ya creada. Eso decide qué vencimiento aplica mientras se lee un texto largo (RN-113 o el TTL de la sesión parcial, que no está definido) | comprensión | Baja | Declarar en la arquitectura §4.1 en qué tipo de sesión vive P-007 y qué vencimiento aplica; agregar el estado "sesión vencida" a P-007 si corresponde | HU-002B; RN-113; RN-074 |

### 5. Decisiones recomendadas antes de implementar

1. **Simular la puerta de consentimiento** (estado persistido por persona y condominio, redirección desde el `AppShell`, `ConsentRequired` automático en P-001) y re-validar HU-002B C1 y C4 (obs. 1). Corregir en VL-P001 el estado de HU-002B C4.
2. **Reescribir RN-070 por condominio** para el caso de una cuenta ya activa (obs. 2).
3. Aclarar el tipo de sesión de P-007 y su vencimiento (obs. 3).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-007 cubiertas por completo | HU-002B ⚠️ → 0 de 1 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-002B observables desde P-007 | C2, C5, C6 ✅, C4 ⚠️, C1 ❌ → 3 de 5 | **60 %** (80 % con parcial) |
| Reglas de la ficha de P-007 reflejadas (RN-010, RN-011, RN-012, RN-070, RN-071) | 2 completas (RN-011, RN-071), 2 parciales (RN-012, RN-070), 1 no reflejada (RN-010) | **40 %** completas · **80 %** con parciales |
| Reglas aplicables reflejadas (7: las 5 anteriores + RN-122, RN-074; RN-054 no verificable) | 4 completas, 2 parciales, 1 no reflejada | **57 %** completas · **86 %** con parciales |

---

## VL-P010 · P-010 Inicio

**Prototipo:** [prototypes/P-010-inicio.html](prototypes/P-010-inicio.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.2 P-010](09-ui-spec.md) · **Flujos:** F3 (paso 1), F4 (A2, A3), F2 (paso 5), F13 (paso 3) · **HU declaradas:** HU-008 (aviso de cancelación), HU-013 (contador de la Junta)
**Veredicto:** **Pasa con observaciones.** Los bloques por rol, el contador de la Junta (también en 0) y el contenido del aviso cumplen la ficha. El gap está en la **persistencia del "Entendido"**: el aviso vuelve a aparecer en cuanto se recarga P-010, así que F4 A3 y HU-008 C12 no se validan de punta a punta. Además, la regla del aviso (RN-088) y la ficha (§6, punto 4) no dicen lo mismo.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-010 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-008 | 3 de 14 aplican a P-010 (C5, C11, C12); los demás viven en P-014, P-015, P-016 y P-062 | ⚠️ Parcial | **C5 ✅:** `noticesFor()` filtra las reservas de la unidad con `status === 'Cancelled'` y `cancelledBy === 'admin'`. Ana ve "La administración canceló tu reserva · Salón de fiestas · 28/11/2026 · 18:00 – 22:00" (r-8815) y Carla ve la Parrilla del 15/11/2026 (r-8760): área, fecha y franja. Una cancelación hecha en P-062 durante la sesión (`patchReservation`, `cancelledBy:'admin'`) también aparece. **C11 ✅:** P-016 guarda `cancelledBy:'host'` cuando cancela la residente, y esa reserva no genera aviso. **C12 ❌ entre sesiones:** `seen` es un `Set` en memoria. "Entendido" oculta el aviso en la página, pero vuelve a aparecer al regresar a P-010 desde el menú o al pasar por P-001 (obs. 1). "Desde su último inicio de sesión" no se modela (obs. 2) |
| HU-013 | 2 de 11 (C1, C7); el resto vive en P-040 y P-041 | ✅ Cubierta | **C1:** `PENDING_HIRES` = 1 ("Pintura de fachada" en `Submitted`). Se ve "**1** contratación por decidir" y el botón primario lleva a P-040 `?status=Submitted`. El contador también aparece en el ítem "Contrataciones" del menú (`menuCounts`). **C7:** con el estado "Vacío", o después de decidir en P-041 (`hires-v1` en `sessionStorage`), se ve "0 contrataciones por decidir" sin botón primario, con el enlace "Ver contrataciones" |

**HU Must faltantes en esta pantalla:** ninguna de las que declara P-010. HU-008 C12 no se puede validar de punta a punta (obs. 1).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-088 | Al iniciar sesión, aviso de cada reserva propia que el Administrator canceló desde el último inicio de sesión | ⚠️ | Contenido ✅ (área, fecha y franja). ⚠️ El "visto" no persiste (obs. 1). ⚠️ No se modela "desde su último inicio de sesión": el prototipo sigue la ficha ("hasta pulsar Entendido"), que contradice la regla (obs. 2). ⚠️ El filtro es `cancelledBy === 'admin'`, no "otra persona" como dice la ficha (obs. 3) |
| RN-099 | Contador de `Submitted` para el BoardMember, también con 0 | ✅ | `n > 0` → número en negrita y botón; `n = 0` → "0 contrataciones por decidir", sin botón primario |
| RN-015 | Sin vínculo `Owner`, sin información financiera | ✅ | Carla (`fin: false`): no ve "Gastos" ni "Contrataciones" en el menú (`menuItems` usa `p.fin`) ni en "Accesos", ni siquiera deshabilitados (F13, paso 3) |
| RN-168 | Un segundo intento de cancelar conserva `cancelledBy` | ✅ | P-016 (resultado "ya cancelada") guarda `cancelledBy:'admin'` y P-010 sigue mostrando el aviso |
| RN-085 | `Completed` se calcula cuando la franja ya terminó | ⚠️ | `upcomingFor()` filtra con `r.date >= TODAY` y no mira la hora de fin: una reserva de hoy que ya terminó seguiría en "Tus próximas reservas" como "Confirmada". Con los datos actuales no ocurre, porque r-8972 empieza a las 19:00 (obs. 6) |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F3 paso 1 · Ana | P-010 → "Reservar un área" → P-011 | ✅ |
| F3 paso 1 · Rosa (Administración + propietaria C-201, `rosaRes`) | P-010 (ve los bloques de residente y de administración) → "Reservar un área" → P-011 | ⚠️ P-011 no tiene `rosaRes` en `roles` y `CH.init` cambia la sesión a **Ana** sin avisar (obs. 5) |
| F4 A1 → A2 · cancelación de la administración | P-062 como Rosa: cancela r-8841 → P-010 como Ana | ✅ El aviso aparece (`res-session-v1` en `sessionStorage`) |
| F4 A3 · "Entendido" | P-010 → "Entendido" → "Listo. No volverás a ver este aviso." → menú "Inicio" | ❌ **El aviso reaparece:** contradice el mensaje y F4 A3 (obs. 1) |
| F4 A3 · fallo al guardar el visto | Casilla "Simular fallo en Entendido" | ✅ Alert `danger` con foco; el aviso sigue en pantalla |
| F2 paso 5 · Marco | P-010 → "Revisar contrataciones →" → P-040 `?status=Submitted` | ✅ |
| F13 paso 3 · Carla | P-010 | ✅ Próximas reservas y "Reservar un área", sin accesos financieros |
| Administrator · Rosa | P-010 → "Ver reservas del condominio" → P-062 `?date=2026-11-04` | ✅ "3 reservas confirmadas" (r-8971, r-8972, r-8973), sin "Reservar un área" |
| Próximas reservas | Enlace del área → P-015 `?id=` | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | El "Entendido" se guarda en un `Set` en memoria (`const seen = new Set()`): al volver a P-010, o tras P-001, el aviso reaparece aunque la pantalla acaba de decir "No volverás a ver este aviso." | gap | Media | Guardar los avisos vistos en `sessionStorage`, igual que `res-session-v1`, y que "Reiniciar avisos" lo borre | HU-008 C12, RN-088, F4 A3 |
| 2 | RN-088 dice "desde su último inicio de sesión"; la ficha y §6 (punto 4) dicen "hasta que pulse Entendido". Si Ana no pulsa "Entendido", con RN-088 literal no vuelve a ver el aviso en el siguiente inicio de sesión; con la ficha, sí. HU-008 C12 ("ya vio el aviso") no aclara cuál de las dos manda | comprensión | Media | Cerrar §6 punto 4: reescribir RN-088 como "mientras el aviso no esté marcado como visto" (es lo que prototipa la ficha) y ajustar C5 y C12 de HU-008 | RN-088, HU-008 C5 y C12, 09-ui-spec §6.4 |
| 3 | El aviso se filtra por `cancelledBy === 'admin'`, pero la ficha dice "solo si cancela otra persona". Si una persona es Administrator y residente (`rosaRes`) cancela su propia reserva, P-016 guarda `cancelledBy: p.admin ? 'admin' : 'host'` = `'admin'`, y vería el aviso de su propia cancelación | comprensión | Baja | Definir el aviso como "lo canceló alguien distinto del usuario actual" y comparar con la persona en el prototipo | RN-088, HU-008 C11 |
| 4 | Los avisos y "Tus próximas reservas" se filtran por unidad (`p.units.includes(r.unit)`), no por anfitrión. RN-088 habla de "reserva suya" y la ficha de "🔒 quien reserva". Con dos personas en A-502 (Ana y Martín Quispe en el padrón de P-012), no está definido si Martín ve el aviso de la reserva de Ana | comprensión | Baja | Decidir si el aviso y las próximas reservas son del anfitrión o de la unidad, y escribirlo en la ficha | RN-088, HU-008 C5 |
| 5 | Desde P-010, `rosaRes` → "Reservar un área" abre P-011 como Ana, porque P-011 solo acepta `ana`, `carla` y `luis` | gap | Baja | Agregar `rosaRes` a P-011 y decidir con qué modo abre P-012 (VL-P012, obs. 11) | 09-ui-spec §3.2 P-010 Estados (unión de roles), RN-076 |
| 6 | "Tus próximas reservas" usa solo la fecha (`r.date >= TODAY`) y no la hora de fin | gap | Baja | Filtrar por `fin > ahora` (America/Lima) | RN-085 |

### 5. Decisiones recomendadas antes de implementar

1. **Cerrar §6 punto 4:** el aviso persiste hasta "Entendido" o solo hasta el siguiente inicio de sesión. Alinear RN-088 y HU-008 C5/C12 con lo que se decida (obs. 2).
2. **Persistir el "visto" en el prototipo** y re-validar F4 A3 (obs. 1).
3. **Definir el destinatario del aviso**: anfitrión o unidad, y "otra persona" en lugar de "Administrator" (obs. 3, 4). Las obs. 5 y 6 se pueden resolver durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-010 cubiertas por completo | HU-013 ✅, HU-008 ⚠️ → 1 de 2 | **50 %** (100 % con cobertura parcial) |
| Criterios observables desde P-010 | HU-008 C5, C11 ✅, C12 ❌; HU-013 C1, C7 ✅ → 4 de 5 | **80 %** |
| Reglas de la ficha reflejadas (RN-088, RN-099, RN-015) | 2 completas + 1 parcial | **67 %** (100 % con parcial) |
| Reglas aplicables reflejadas (6: RN-015, RN-054, RN-085, RN-088, RN-099, RN-168) | 3 completas, 2 parciales, 1 no verificable (RN-054) | **50 %** completas · **83 %** con parciales |

---

## VL-P011 · P-011 Áreas comunes

**Prototipo:** [prototypes/P-011-areas-comunes.html](prototypes/P-011-areas-comunes.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.3 P-011](09-ui-spec.md) · **Flujos:** F3 (pasos 1–2) · **HU declaradas:** HU-005
**Veredicto:** **Pasa con observaciones.** Cada tarjeta muestra los cinco valores configurados del área y un enlace único a P-012 con `areaId`. Las observaciones son de trazabilidad: la ficha cita una RN que no corresponde. También falta definir cómo se formatea la anticipación y qué ve quien no puede reservar.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-011 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-005 | Ningún criterio de HU-005 se decide en P-011: es la entrada del flujo y muestra las reglas que usan los criterios | ✅ Cubierta (su parte) | `card()` pinta `DATA.areas`. **Salón:** 09:00 – 23:00, 5 horas, 40 personas, 90 días, 2 reservas al mes. **Parrilla:** 11:00 – 22:00, 4 horas, 15 personas, 30 días, 4 reservas al mes. Estos valores coinciden con HU-004 C1 (14,400 s, aforo 15, 2,592,000 s, 4) y con HU-005 (18,000 s del salón). El botón "Reservar el Salón de fiestas" lleva a P-012 `?areaId=a-salon` (F3, paso 2) |
| HU-004 (indirecta) | C1: "al consultar la parrilla devuelve esos cinco valores" | ✅ | Se ven los cinco valores (la configuración vive en P-060 y P-061, sin prototipo) |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-082 | Rechazar un horario cuyo cierre no es posterior a la apertura | — | La ficha la cita como "reglas configuradas del área", pero es una regla de configuración de P-061 (obs. 1) |
| RN-021, RN-022, RN-023, RN-079, RN-080 | Horario, duración máxima, aforo, anticipación y cupo mensual configurados | ✅ | Filas "Horario", "Máximo", "Aforo", "Reserva con" y "Por unidad" de cada tarjeta |
| RN-160 | Duración y anticipación en segundos (múltiplos de 60) | ⚠️ | La ficha pide formatear la duración ("5 horas", "4 h 30 min"), pero el prototipo usa textos ya escritos (`maxHours: '5 horas'`, `advanceDays: 90`). La anticipación no tiene regla de formato (obs. 2) |
| Acceso por rol (§5) | "Reservar" solo para Resident y NRO; los demás ven P-090 | ⚠️ | El selector solo ofrece residentes; no hay estado 403 para Concierge, BoardMember sin vínculo ni Administrator (obs. 3) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F3 pasos 1–2 · Ana, Carla, Luis | P-010 → P-011 → "Reservar el Salón de fiestas" / "Reservar la Parrilla" → P-012 con el área fija y la fecha de hoy | ✅ |
| Sin áreas | Estado "Vacío" | ✅ "La administración aún no configuró áreas comunes." y "Volver al inicio" |
| Error | Estado "Error" | ✅ Página `500` con `traceId` e "Ir al inicio" |
| `rosaRes` desde P-010 | P-011 | ⚠️ Cae a Ana (VL-P010, obs. 5) |
| Concierge o BoardMember por URL directa | — | ❌ No se puede reproducir (obs. 3) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La ficha de P-011 (y la nota RN del prototipo) cita "RN-082 (reglas configuradas del área)", pero RN-082 es el rechazo de un horario con cierre ≤ apertura (`COMMON_AREA_INVALID_OPENING_HOURS`) | comprensión | Baja | Cambiar la trazabilidad de P-011 a RN-021, RN-022, RN-023, RN-079 y RN-080 (y HU-004 C1) | 09-ui-spec §3.3 P-011, RN-082 |
| 2 | La duración y la anticipación se guardan en segundos (HU-004 C1 y C9: hasta 60 s de anticipación), pero solo la duración tiene regla de formato. "Hasta 90 días" no define qué mostrar con 129,600 s o con 60 s. Además, P-012 calcula el máximo con `parseInt(a.maxHours, 10) * 60`, que convierte "4 h 30 min" en 240 min en lugar de 270 | gap | Baja | Definir en §3.0.5 un único formato de duración (días, horas y minutos) para "Máximo" y "Reserva con", y que el prototipo trabaje en segundos | HU-004 C9, RN-160, RN-022, RN-079 |
| 3 | La ficha de P-011 no tiene estado "Sin permiso", aunque §5 dice que una ruta fuera del menú responde P-090 | gap | Baja | Agregar "Concierge, BoardMember sin vínculo o Administrator sin vínculo → P-090" a los estados de P-011 y al selector | HU-006B C6, 09-ui-spec §5 |
| 4 | P-011 no anticipa el cupo usado: Ana descubre que agotó sus 2 reservas del salón recién en P-012, después de elegir la fecha | mejora | Baja | Opcional: mostrar "Tu unidad usó 1 de 2 este mes" en la tarjeta | RN-080 |

### 5. Decisiones recomendadas antes de implementar

1. **Corregir la trazabilidad de reglas** de P-011 (obs. 1).
2. **Fijar el formato de duración y anticipación** en §3.0.5 (obs. 2).
3. **Agregar el estado 403** a la ficha (obs. 3). La obs. 4 es opcional.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-011 cubiertas (su parte) | HU-005 → 1 de 1 | **100 %** |
| Elementos de la ficha (cinco datos por área, acción con `areaId`, estado vacío) | 3 de 3 | **100 %** |
| Reglas cuyos valores muestra P-011 (RN-021, RN-022, RN-023, RN-079, RN-080) | 5 de 5 | **100 %** |
| Reglas aplicables reflejadas (RN-160, acceso por rol) | 0 completas, 2 parciales | **0 %** completas · **100 %** con parciales |
| Criterios de HU-005 decididos en P-011 | 0 de 15 | referencial: P-011 solo habilita el flujo |

---

## VL-P012 · P-012 Nueva reserva

**Prototipo:** [prototypes/P-012-nueva-reserva.html](prototypes/P-012-nueva-reserva.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.3 P-012](09-ui-spec.md) · **Flujos:** F3 (pasos 2–6b), F11 (pasos 1–5) · **HU declaradas:** HU-005, HU-006, HU-006B, HU-007
**Veredicto:** **Pasa con observaciones (2 de severidad Alta).** `validate()` reproduce casi todos los códigos de reservas de §3.0.6 con sus valores: aforo 40/15, 5 h/4 h, 90/30 días, cupo 2/4, `[inicio, fin)`, mínimo 1 persona y aviso de privacidad. También conserva los valores y la clave de idempotencia ante un `422`. Los dos gaps Altos son de regla:
- la anticipación máxima se valida por **día** y no por instante;
- no está definido si un envío rechazado consume la clave de idempotencia.

Además, F3 y F11 no se pueden recorrer con sus fechas literales.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-012 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-005 | 11 de 15 | ⚠️ Parcial | ✅ **C1** (con otra fecha: el 12/12 19:00–23:00 choca con r-8841, la propia reserva de Ana; obs. 6). ✅ **C2, C10 y C13** (con una fecha ≤ 04/12/2026: Carla pide la Parrilla el 20/12, fuera de los 30 días del prototipo; obs. 6). ✅ **C4:** 12:00–18:30 = 390 min > `maxMin` 300 → `RESERVATION_EXCEEDS_MAX_DURATION`. ✅ **C5:** hoy antes de `NOW = '10:30'` → `RESERVATION_IN_THE_PAST`. ✅ **C6:** después de `addDays(TODAY, 90)` = 02/02/2027 → `RESERVATION_TOO_FAR_AHEAD`. ✅ **C7:** `e <= s` → `RESERVATION_INVALID_TIME_SLOT`. ✅ **C9:** 18:00–23:00 = 300 min, no `>` 300 → se acepta. ✅ **C11.** ✅ **C14:** "Simular corte de red y reenvío" → P-013 con `replayed=1`; la misma `idempotencyKey` y el mismo id, un solo registro. ❌ **C3:** 20:00–00:30 da `RESERVATION_INVALID_TIME_SLOT`, no `OUTSIDE_OPENING_HOURS` (obs. 4). ❌ **C8:** `type="time" step="60"` nunca envía segundos; `hasSecs()` es código muerto (obs. 12). ❌ **C12:** el 02/02/2027 se acepta a cualquier hora, aunque el límite es 10:30 (obs. 1). ❌ **C15:** no hay estado `IDEMPOTENCY_KEY_REUSED` (obs. 3) |
| HU-006 | 12 de 12 | ✅ Cubierta | ✅ **C1, C2 y C6** con datos equivalentes. El 12/12 ya están ocupadas 13:00–17:00 (`EXTRA_BUSY`) y 19:00–23:00 (r-8841). 22:00–23:00 → `RESERVATION_OVERLAP`. 17:00–19:00 se acepta, porque `s < b.end && b.start < e` es semiabierto. ✅ **C3:** la casilla RN-081 agrega la franja a `data.added`, devuelve `RESERVATION_OVERLAP` y actualiza "Ocupado ese día". ✅ **C4:** estado "Cupo agotado", o crear una segunda reserva del salón en diciembre → "Tu unidad ya usó sus 2 reservas de esta área en diciembre." ✅ **C5:** modo Administrator, A-1104 + Rosa, hint "La unidad usó 3 de 4…" (`QUOTA_EXTRA`); **con fecha 03/12, no 19/12** (obs. 6). ✅ **C7:** r-8815 está `Cancelled` y el 28/11 de 18:00 a 22:00 sale libre. ✅ **C8:** `busy()` filtra por área. ✅ **C9 y C10.** ✅ **C11:** al cancelar en P-016 (`patchReservation`), `used()` deja de contarla, porque solo cuenta `Confirmed` o `Completed`. ✅ **C12:** con A-1104 en 4 de 4 → `RESERVATION_MONTHLY_LIMIT_REACHED` en el campo "Unidad" |
| HU-006B | 2 de 6 (+2 por prevención) | ⚠️ Parcial | ✅ **C4:** el Administrator reserva B-1203 con Pedro Salas; el hint dice "Está alquilada: elige como anfitrión a su inquilino." ✅ **C6:** solo con el estado "Sin permiso (403)", que muestra P-090; Marco y Raúl no están en `roles`. ⚠️ **C1 y C2:** se previenen, porque `allowedUnits()` solo ofrece unidades con vínculo y sin `rented`, y Luis ve "Unidad B-104" fija. Pero `RESERVATION_UNIT_NOT_LINKED` y `RESERVATION_UNIT_RENTED` nunca se muestran (obs. 7). ❌ **C3:** no hay persona Pedro (inquilino). ❌ **C5:** no hay datos de un vínculo con `StartDate` futura (obs. 13) |
| HU-007 | 5 de 5 aplicables (C1, C2, C3, C4, C7); C5, C6 y C8–C12 son de P-015 | ✅ Cubierta (su parte) | ✅ **C1:** "Rellenar ejemplo válido" → Salón 19/12, 2 personas + 38 invitados = 40 → P-013. ✅ **C2:** estado "Error de validación" → "Son 41 personas y el aforo es 40. Quita 1." ✅ **C3:** 0 personas + 5 invitados → `RESERVATION_HOST_REQUIRED`, "Indica al menos 1 persona de la unidad." ✅ **C4:** el aviso de privacidad siempre está visible antes de enviar; sin la casilla y con invitados → `GUEST_PRIVACY_NOTICE_REQUIRED`. ✅ **C7:** 1 persona sin invitados se confirma |

**HU Must faltantes en esta pantalla:** ninguna sin presencia. HU-005 y HU-006B se validan a medias por las obs. 1, 3, 4, 7 y 13.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-019 | Confirmación automática | ✅ | Sin estado intermedio: el envío válido va directo a P-013 `Confirmed`; texto "La reserva se confirma al instante…" |
| RN-021 | Franja dentro del horario | ⚠️ | `s < a.open` / `e > a.close` → mensaje "(09:00 a 23:00)" ✅. Una franja que cruza la medianoche no se puede expresar y da otro código (obs. 4) |
| RN-022 | Duración ≤ máxima | ✅ | `mins(e) - mins(s) > maxMin(a)`: 300 min en el salón, 240 en la parrilla. Ver la limitación de `parseInt` en VL-P011, obs. 2 |
| RN-078 | No empezar en el pasado | ✅ | `d < TODAY` o (`d === TODAY` y `s < NOW`); justo a las 10:30 se acepta |
| RN-079 | Anticipación máxima | ⚠️ | Se valida por fecha (`d > limit`), no por instante; el mensaje no da la hora (obs. 1) |
| RN-119 | Fin > inicio | ✅ | 20:00–19:00 y 20:00–20:00 se rechazan |
| RN-120 | Minutos exactos | ✅ | Por prevención: `step="60"`. El error solo se produce por API (obs. 12) |
| RN-023 | Personas de la unidad + invitados ≤ aforo | ✅ | Contador en vivo "Total: 40 de 40 personas" (`aria-live`) y error con el exceso |
| RN-123 | Al menos 1 persona de la unidad | ✅ | `Number.isInteger(p) && p >= 1` |
| RN-024 | Sin cruce con `Confirmed`, `[inicio, fin)` | ✅ | Lista "Ocupado ese día" sin unidad ni nombre; comparación semiabierta |
| RN-081 | Concurrencia: solo la primera | ✅ | Casilla "Otra unidad envía la misma franja a la vez" |
| RN-080 | Cupo del mes de la franja; las canceladas no cuentan | ✅ | `used()` cuenta `Confirmed` y `Completed` del mes `d.slice(0,7)`; el hint pasa a `warning` y el formulario sigue disponible para otro mes |
| RN-025 | Reservar con vínculo activo | ✅ | Unidad fija o `select` con las unidades permitidas (estado "Con 2 unidades") |
| RN-075 | Sin vínculo → `403` | ⚠️ | Se previene, pero no hay estado que muestre el error (obs. 7) |
| RN-077 | Unidad alquilada → el propietario no reserva | ⚠️ | B-1203 no se le ofrece a Luis ✅; falta el estado `403` (obs. 7) y no está claro quién es el anfitrión cuando reserva el Administrator (obs. 9) |
| RN-076 | El Administrator reserva para cualquier unidad, con un anfitrión con vínculo activo y las mismas reglas | ⚠️ | Torre, número y anfitrión ✅; se aplican aforo y cupo ✅. El anfitrión faltante reutiliza `RESERVATION_HOST_REQUIRED` (obs. 8) |
| RN-087 | Aviso de privacidad obligatorio con invitados | ✅ | Alert info con la casilla "Informé a mis invitados de este aviso"; texto marcado como provisional (⚠️ Q18, Q21) |
| RN-163 | Idempotencia: misma clave → misma reserva; otra franja con la misma clave → `IDEMPOTENCY_KEY_REUSED` | ⚠️ | El reenvío funciona ✅ y la clave se conserva tras un `422` ✅. Falta el estado `IDEMPOTENCY_KEY_REUSED` (obs. 3), y la regla no aclara qué pasa con la clave después de un `422` (obs. 2) |
| RN-086 | Edición de invitados hasta el inicio | — | Se aplica en P-015 |
| RN-027 | Cifrado de los invitados | — | No se verifica en un prototipo |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F3 literal · Ana, Salón 12/12/2026 19:00–23:00, 2 + 38 | P-011 → P-012 → "Ver disponibilidad" muestra 13:00–17:00 y 19:00–23:00 → "Confirmar reserva" | ⚠️ `RESERVATION_OVERLAP` contra r-8841, que es **la propia reserva de Ana**. No es un callejón sin salida (puede cambiar la fecha), pero F3 no se reproduce tal cual (obs. 6, 14) |
| F3 con "Rellenar ejemplo válido" (Salón 19/12/2026) | P-012 → P-013 `?id=r-9010` | ✅ |
| F3 paso 4 · dos unidades | Estado "Con 2 unidades" | ✅ `select` A-502 / B-708 con hint por unidad |
| F3 6a · regla rechazada | Estado "Error de validación" | ✅ Tres errores (cruce, aforo 41/40, privacidad): resumen con foco y enlaces a los campos, valores e invitados conservados, misma `Idempotency-Key` |
| F3 6b · corte de red | Casilla RN-163 | ✅ "Reconectando… (misma clave)" → P-013 con el texto de reenvío |
| Fecha cambiada sin pulsar "Ver disponibilidad" | Cambiar la fecha → completar la franja → "Confirmar reserva" | ⚠️ La reserva se crea con la fecha **anterior**: el POST lleva el `date` oculto (obs. 5) |
| F11 literal · Parrilla 19/12/2026 | P-062 → P-012 (modo Administrator) → "Ver disponibilidad" | ⚠️ "Solo puedes reservar hasta el 04/12/2026." (obs. 6) |
| F11 con 03/12/2026 · A-1104 + Rosa | → hint "La unidad usó 3 de 4 reservas de esta área en diciembre." → P-013 "Reserva confirmada para A-1104" | ✅ |
| F11 4a · cupo | Estado "Cupo agotado", o una quinta reserva para A-1104 | ✅ `RESERVATION_MONTHLY_LIMIT_REACHED` en el campo "Unidad" |
| F11 paso 5 · B-1203 + Pedro | P-013 → "Reservar otra" → P-012 → P-013 | ⚠️ Se confirma, pero **reemplaza** la reserva de A-1104, porque el id es siempre `r-9010` (obs. 10) |
| Sin unidades permitidas | Estado del selector | ✅ Alert info y "Volver a Áreas comunes", sin formulario |
| Concierge o BoardMember | Estado "Sin permiso (403)" | ✅ P-090 con "Ir al inicio" (solo con el selector) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La anticipación se valida por día: `if (d > limit)` con `limit = addDays(TODAY, a.advanceDays)`, y el `max` del `DateInput` usa la misma fecha. Con "ahora" = 04/11/2026 10:30, el salón del 02/02/2027 a las 19:00 se acepta, aunque supera los 7,776,000 s en 8 h 30 min. HU-005 C12 exige rechazar a los +60 s. El mensaje de §3.0.6 ("Solo puedes reservar hasta el {fecha límite}") no da la hora, así que el día límite el usuario no entiende el rechazo | gap | **Alta** | En la ficha, validar `inicio ≤ ahora + anticipación` y cambiar el mensaje a "Solo puedes reservar hasta el 02/02/2027 a las 10:30."; mantener el `max` del `DateInput` como ayuda. En el prototipo, comparar `date + start` con `TODAY + NOW + advance` | HU-005 C11, C12; RN-079 (MUST) |
| 2 | §3.3 P-012 (estado "Error 422/403") pide reenviar el formulario corregido con **la misma** clave. RN-163 rechaza "la misma clave con un área, una unidad o una franja distintas" y no dice que eso solo aplica si el primer envío creó la reserva. Leída tal cual: Ana envía 20:00–19:00 (`422`), corrige a 19:00–23:00 con la misma clave y recibe `IDEMPOTENCY_KEY_REUSED`, sin poder reservar nunca desde esa página. El prototipo asume que un `422` no consume la clave, pero la regla no lo dice | comprensión | **Alta** | Agregar a RN-163: "solo una respuesta `2xx` asocia la clave a la reserva; un `4xx` no la consume". Agregar a HU-005 el criterio "corregir tras un `422` con la misma clave → `Confirmed`". Alternativa: regenerar la clave en cada re-render con error y cambiar la ficha | RN-163 (MUST), HU-005 C14 y C15, F3 6a |
| 3 | No hay estado ni simulación de `IDEMPOTENCY_KEY_REUSED`. Además, el texto de §3.0.6 ("Recarga la página e inténtalo de nuevo") no dice qué conserva la recarga: un GET nuevo pierde los invitados escritos | gap | Media | Agregar el estado al selector (misma clave, otra franja) y definir que el error se muestra con los valores conservados y una clave nueva | HU-005 C15, RN-163 |
| 4 | HU-005 C3 (20:00 a 00:30 → `OUTSIDE_OPENING_HOURS`) no se puede producir desde la UI: "Desde" y "Hasta" son horas del mismo día, y `if (e <= s)` responde antes con `RESERVATION_INVALID_TIME_SLOT`. La regla se cumple (se rechaza), pero con otro código | comprensión | Media | Declarar C3 como criterio de API (ISO con fecha de fin distinta) y agregar un criterio de UI: "Hasta 00:30 → `RESERVATION_INVALID_TIME_SLOT`". O fijar en la ficha qué código tiene prioridad | HU-005 C3, RN-021, RN-119 |
| 5 | La fecha está en el formulario GET y el POST lleva `<input hidden name="date" value="${c.data.date}">`; `sync()` no lee `f-date`. Si el usuario cambia la fecha y pulsa "Confirmar reserva" sin "Ver disponibilidad", la reserva se crea para la fecha anterior (hoy, por defecto) y consume el cupo de otro mes | gap | Media | En la ficha: mostrar "Reservando para el {fecha}" junto a "Confirmar reserva", y que el servidor rechace si la fecha visible ≠ la del POST, o enviar la fecha visible y revalidar. Agregar un criterio en HU-005 | HU-005, RN-024, RN-080 |
| 6 | Los datos del prototipo no permiten recorrer los flujos con sus valores literales. **(a)** r-8841 (Ana, Salón, 12/12 19:00–23:00, `Confirmed`) choca con F3 y HU-005 C1. **(b)** Con hoy = 04/11/2026 y 30 días de anticipación, la Parrilla llega solo hasta el 04/12/2026, así que fallan F11 (19/12), HU-006 C5 (19/12) y HU-005 C2, C10 y C13 (20/12). **(c)** P-013 trae una r-9011 del 19/12 que P-012 no puede crear | comprensión | Media | Elegir una opción: un "hoy" del prototipo coherente con los criterios (p. ej. 2026-12-01, como HU-005 C6), mover r-8841, o documentar en `index.html` la tabla de fechas equivalentes. Revisar también F3 y F11 | HU-005 C1, C2, C10, C13; HU-006 C5; F3; F11 |
| 7 | `RESERVATION_UNIT_NOT_LINKED` y `RESERVATION_UNIT_RENTED` nunca se muestran: la UI los previene ofreciendo solo unidades permitidas. Pueden ocurrir de verdad entre el GET y el POST (vence el vínculo, o empieza un `Tenant` en la unidad) y §3.0.6 los ubica en el campo "Unidad" | gap | Media | Agregar el estado "Unidad no permitida (403)" con el error en "Unidad", los valores conservados y la lista de unidades recalculada | HU-006B C1, C2; RN-075, RN-077 |
| 8 | En modo Administrator, el anfitrión faltante devuelve `RESERVATION_HOST_REQUIRED`, que en §3.0.6 y RN-123 significa "menos de 1 persona de la unidad". No hay código para "sin anfitrión" ni para "anfitrión sin vínculo activo con la unidad", que es el contraejemplo de RN-076 | gap | Media | Crear los códigos (p. ej. `RESERVATION_HOST_NOT_SELECTED`, `RESERVATION_HOST_NOT_LINKED`) en RN-076, §3.0.6 y un criterio de HU-006B | RN-076, RN-123, HU-006B C4 |
| 9 | Para B-1203 (alquilada), el `select` "Anfitrión" ofrece a Pedro Salas y a Luis Rojas (propietario), y el prototipo acepta a Luis. RN-076 exime al Administrator de RN-077, pero el contraejemplo de RN-077 ("Luis y Pedro consumen juntos el límite") ocurre igual por esta vía. El hint dice "elige a su inquilino" sin que nada lo obligue | comprensión | Media | Decidir si, en una unidad alquilada, el anfitrión debe ser el inquilino; si es así, filtrar el `select` y agregar un criterio | RN-076, RN-077, HU-006B C4 |
| 10 | `NEW_ID = 'r-9010'` es fijo y `saveReservation` reemplaza por id: cada reserva nueva de la sesión borra la anterior. F11 paso 5 hace desaparecer la reserva de A-1104 en P-062 y P-013, y no se puede agotar el cupo de 4 de la Parrilla creando reservas | gap | Media | Generar ids incrementales (`r-9010`, `r-9011`…) guardados en `res-session-v1` | HU-006 C4, C5, C12; F11 pasos 5–6 |
| 11 | Una persona Administrator y residente (`rosaRes`) siempre entra en modo Administrator (`allowedUnits` devuelve `[]` si `persona.admin`), también cuando llega desde P-011 para reservar a nombre de C-201. La ficha no lo define | comprensión | Baja | Definir: desde P-011, modo residente con sus unidades; desde P-062, modo Administrator | RN-076, 09-ui-spec §3.2 P-010 (unión de roles) |
| 12 | HU-005 C8 (12:15:30) no se puede reproducir: `step="60"` impide los segundos y `hasSecs()` nunca se cumple | comprensión | Baja | Marcar C8 como criterio de API o de integración | HU-005 C8, RN-120 |
| 13 | Faltan personas para HU-006B: Pedro Salas como inquilino de B-1203 (C3) y una persona con un vínculo de `StartDate` futura (C5) | gap | Baja | Agregar `pedro` a `PERSONAS` y a `LINKS`, y un vínculo futuro a Carla (A-305) | HU-006B C3, C5 |
| 14 | "Ocupado ese día" no distingue la reserva propia: en F3, Ana ve 19:00–23:00 ocupado sin saber que es suya | mejora | Baja | Rotular "(tu reserva)" las franjas de las unidades del usuario; no revela datos de otra unidad | RN-024, 09-ui-spec §3.3 P-012 |

### 5. Decisiones recomendadas antes de implementar

1. **Validar la anticipación por instante** y dar la hora en el mensaje de `RESERVATION_TOO_FAR_AHEAD` (obs. 1).
2. **Aclarar en RN-163** que solo un `2xx` asocia la clave a la reserva, y agregar el criterio de "corregir tras un `422`" a HU-005 (obs. 2, 3).
3. **Alinear las fechas** de F3, F11 y los criterios de HU-005 y HU-006 con el "hoy" del prototipo, o al revés (obs. 6).
4. **Definir los códigos del anfitrión** en el modo Administrator y si una unidad alquilada exige al inquilino como anfitrión (obs. 8, 9).
5. **Cerrar el hueco de los dos formularios**: la fecha visible y la fecha del POST (obs. 5).
6. **Marcar HU-005 C3 y C8 como criterios de API** y agregar sus equivalentes de UI (obs. 4, 12).
7. **Prototipo:** ids incrementales, estado `403` de unidad, estado `IDEMPOTENCY_KEY_REUSED` y la persona Pedro (obs. 3, 7, 10, 13). Las obs. 11 y 14 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-012 cubiertas por completo | HU-006 ✅, HU-007 ✅ (su parte), HU-005 ⚠️, HU-006B ⚠️ → 2 de 4 | **50 %** (100 % con cobertura parcial) |
| Criterios observables desde P-012 | HU-005 11/15 + HU-006 12/12 + HU-006B 2/6 + HU-007 5/5 = 30 de 38 | **79 %** (84 % contando HU-006B C1 y C2 por prevención: 32/38) |
| Reglas de la ficha reflejadas (18 aplicables: RN-019, 021, 022, 023, 024, 025, 075, 076, 077, 078, 079, 080, 081, 087, 119, 120, 123, 163; RN-086 es de P-015) | 12 completas + 6 parciales (RN-021, 075, 076, 077, 079, 163) | **67 %** completas · **100 %** con parciales |
| Reglas MUST contradichas por la lógica | RN-079 (por día y no por instante) | 1 de 18 |

---

## VL-P013 · P-013 Reserva confirmada

**Prototipo:** [prototypes/P-013-reserva-confirmada.html](prototypes/P-013-reserva-confirmada.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.3 P-013](09-ui-spec.md) · **Flujos:** F3 (pasos 6, 6b, 7), F11 (pasos 4, 6) · **HU declaradas:** HU-005, HU-007
**Veredicto:** **Pasa con observaciones.** Los siete estados de la ficha se pueden reproducir: sin invitados, reenvío idempotente, hecha por el Administrator, cancelada después, otra unidad, inexistente y recarga. P-013 lee la reserva creada en P-012 desde `sessionStorage`, así que F3 llega de punta a punta a P-015. Las observaciones son menores: el id fijo de P-012, cómo llega el aviso de reenvío y datos de demostración incoherentes.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-013 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-005 | 2 (C1, C14) | ✅ Cubierta | **C1:** P-012 → `CH.go('P-013', 'id=r-9010')`. `find()` lee `reservation:r-9010` y muestra "¡Reserva confirmada!" con la insignia "Confirmada" en el mismo envío. **C14:** con `replayed=1` o el estado "Reenvío idempotente", la pantalla es idéntica y solo suma "Si enviaste el formulario más de una vez, se guardó una sola reserva."; no dice "ya existía". Al recargar se relee el mismo registro y no se crea otro |
| HU-007 | 2 (C1, C7) | ✅ Cubierta | **C1:** `personasText()` → "40 (2 de tu unidad y 38 invitados)". **C7:** estado "Vacío" o 1 persona sin invitados → "1 (de tu unidad)" y "No registraste invitados. Puedes agregarlos hasta antes de las 19:00." con el enlace "Agregar invitados" → P-015 |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-019 | Confirmada en el mismo envío | ✅ | `h1` "¡Reserva confirmada!" e insignia `success` |
| RN-163 | El reenvío devuelve la misma reserva | ✅ / ⚠️ | ✅ Texto de reenvío sin "ya existía". ⚠️ El aviso de reenvío viaja en la URL (`?replayed=1`); la ficha no dice cómo lo sabe un GET después del PRG (obs. 2) |
| RN-103 | No distinguir "no existe" de "otro condominio" | ✅ | Estado "No existe (404)" → P-091 con el mismo texto |
| RN-086 | Invitados editables solo antes del inicio | ✅ | "Puedes cambiar la lista hasta antes de las {inicio}" |
| RN-076 | Variante del Administrator | ✅ | `h1` "Reserva confirmada para A-1104", fila "Anfitrión", "La unidad verá esta reserva en Mis reservas.", botones a P-062 y P-012 |
| RN-084 / RN-085 | Reserva cancelada después | ⚠️ | No muestra "¡Reserva confirmada!" ✅, pero en lugar de redirigir muestra una página intermedia simulada (obs. 4) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F3 6 → 7 · Ana | P-012 → P-013 → "Ver mi reserva" → P-015 `?id=r-9010` | ✅ P-013 guarda `res:r-9010` para P-015 |
| F3 · volver | "Volver al inicio" → P-010 | ✅ |
| F3 6b · reenvío | P-012 (casilla RN-163) → P-013 `?replayed=1` | ✅ |
| Sin invitados | "Agregar invitados" → P-015 | ✅ |
| F11 paso 6 · Administrator | "Ver reservas del condominio" → P-062 `?date=` de la reserva | ✅ |
| F11 · "Reservar otra" | → P-012 en modo Administrator, sin área → nueva reserva | ⚠️ La anterior desaparece (obs. 1) |
| Cancelada después | Estado "Cancelada después" → "Seguir la redirección a P-015" | ⚠️ Página intermedia (obs. 4) |
| Otra unidad | Estado o reserva de otra unidad (`own` falso) | ✅ P-090 con "Ir al inicio" |
| Inexistente | Estado "No existe (404)" | ✅ P-091 con "Ir al inicio" y "Volver" (P-014, o P-062 para el Administrator) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | "Reservar otra" (Administrator) crea una nueva reserva con el mismo id `r-9010` (VL-P012, obs. 10): la primera reserva desaparece de P-013 y P-062, y F11 pasos 5–6 no se pueden validar juntos | gap | Media | Ids incrementales en P-012 | HU-006 C5, HU-006B C4, F11 |
| 2 | La ficha pide el texto de reenvío cuando hubo `Idempotency-Replayed: true`, pero P-013 es un GET después de un Post/Redirect/Get, y la ficha no dice cómo le llega ese dato. El prototipo lo pasa en la URL (`replayed=1`), que se conservaría al recargar o al compartir el enlace | comprensión | Baja | Definir en la ficha un `TempData` de un solo uso, no un parámetro de la URL | RN-163, HU-005 C14 |
| 3 | Datos de demostración incoherentes. El Administrator abre por defecto r-9011 (Parrilla, 19/12/2026, en `LOCAL`), que P-012 no puede crear (límite: 04/12/2026). La residente abre por defecto r-8841 (28 invitados) en vez de la reserva de F3 | comprensión | Baja | Alinear con VL-P012, obs. 6 | F11, RN-079 |
| 4 | "Cancelada después": la ficha pide una redirección del servidor a P-015, pero el prototipo muestra una página intermedia ("Redirección del servidor") que no existirá en la aplicación | comprensión | Baja | Navegar directo a P-015 `?state=cancelled` y dejar la explicación como nota RN | 09-ui-spec §3.3 P-013 Estados, HU-008 |

### 5. Decisiones recomendadas antes de implementar

1. **Definir el mecanismo del aviso de reenvío** (`TempData` o equivalente) en la ficha de P-013 (obs. 2).
2. **Corregir el id fijo de P-012** y los datos de demostración, junto con VL-P012 (obs. 1, 3). La obs. 4 puede resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-013 cubiertas | HU-005 ✅, HU-007 ✅ → 2 de 2 | **100 %** |
| Criterios observables desde P-013 | HU-005 C1, C14 + HU-007 C1, C7 → 4 de 4 | **100 %** |
| Estados de la ficha reproducibles | 6 completos + 1 simulado ("Cancelada después") de 7 | **86 %** (100 % con parcial) |
| Reglas aplicables reflejadas (RN-019, RN-076, RN-084/085, RN-086, RN-103, RN-163) | 4 completas + 2 parciales | **67 %** completas · **100 %** con parciales |

---

## VL-P014 · P-014 Mis reservas

**Prototipo:** [prototypes/P-014-mis-reservas.html](prototypes/P-014-mis-reservas.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.3 P-014](09-ui-spec.md) · **Flujos:** F4 (pasos 1 y 3), F12 (paso 1) · **HU declaradas:** HU-008
**Veredicto:** **Pasa con observaciones.** Las pestañas Próximas e Historial, el estado `Realizada` calculado, las canceladas con quién y cuándo, y el regreso desde P-016 con el aviso de éxito (PRG) cumplen la ficha. Las observaciones son de consistencia de datos y de personas del prototipo; ninguna es de severidad Alta.

### 1. Cobertura de HUs

P-014 solo muestra la parte de HU-008 que se ve en la lista. La cancelación vive en P-016 y el aviso en P-010.

| HU | Criterios observables desde P-014 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-008 | 3 (C1 "sigue visible en su historial", C6 `Completed` a las 23:00, C13 `Confirmed` a las 22:59) | ✅ Cubierta (en lo que le toca) | C1: tras P-016 la reserva llega con `status: 'Cancelled'` (`CH.patchReservation`) y aparece en Historial con "Cancelaste esta reserva el 04/11/2026 10:45". C6 y C13: `statusOf()` usa `(r.date + 'T' + r.end) <= NOW`, que es el límite correcto de RN-085; se ve con r-8644 (`Realizada`), pero el instante exacto (23:00 / 22:59) no se puede reproducir porque `NOW` está fijo en `2026-11-04T10:50` |

**HU Must faltantes en esta pantalla:** ninguna. C5, C11 y C12 de HU-008 (aviso al iniciar sesión) se validan en P-010.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-085 | `Completed` calculado al consultar, desde el fin de la franja | ✅ | `statusOf()` convierte `Confirmed` con fin ≤ `NOW` en `Realizada`; nada lo guarda. Próximas incluye la reserva "en curso" (r-8972 de hoy a las 19:00) |
| RN-084 | La cancelada no se borra; guarda quién y cuándo | ✅ | La tarjeta muestra "Cancelada por la administración" / "Cancelaste esta reserva" y `cancelledAt` con `<time datetime>` |
| RN-088 | Aviso al residente si cancela el Administrator | ⚠️ | La tarjeta distingue `cancelledBy = admin` (r-8815, r-8760). El aviso de inicio de sesión no es de esta pantalla. La ficha cita RN-088 como "las canceladas siguen visibles", que en realidad sale de RN-084 y de HU-008 C1 (obs. 4) |
| RN-026 | Sale de portería en ≤ 60 s | — | Solo en el texto del aviso ("Tus invitados ya no figurarán en portería"); se verifica en P-020 |
| RN-103 | 404 si es de otro condominio | — | La lista solo trae las unidades de la persona (`p.units.includes(r.unit)`) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F4 paso 1 · Ana abre una reserva `Confirmada` | P-014 → "Ver detalle" → P-015 `?id=r-8841` | ✅ |
| F4 paso 3 · regreso tras cancelar | P-016 → P-014 `?cancelled=r-8841` con Alert success (`role="status"`) y enlace a Historial | ✅ El aviso se oculta al cambiar de pestaña, y `?cancelled` se borra de la URL |
| F12 paso 1 | P-014 → "Salón de fiestas · 12/12/2026" → P-015 | ✅ |
| Vacío | "No tienes reservas próximas." → "Reservar un área" → P-011 | ✅ |
| Historial → detalle de una cancelada | P-014 → P-015 `?id=r-8815` (estado Cancelada, sin acciones) | ✅ |
| Rosa (Administración + propietaria C-201) pulsa "Mis reservas" en el menú | P-0xx → P-014 `?role=rosaRes` → el prototipo cae a **Ana** y muestra las reservas de A-502 | ⚠️ El menú de `rosaRes` incluye "Mis reservas" (`menuItems`), pero `roles` de P-014 no la incluye y `CH.init` usa `cfg.roles[0]` (obs. 1) |
| Error 500 | "Ir al inicio" → P-010 | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | `rosaRes` (Administrator con vínculo en C-201) ve "Mis reservas" en el menú, pero P-014 no la acepta como persona: `CH.init` la cambia en silencio a Ana y le muestra las reservas de A-502. Un stakeholder puede concluir que la administración ve reservas ajenas en "Mis reservas" | comprensión | Media | Agregar `rosaRes` a `roles` de P-014 (con al menos una reserva de C-201 en `DATA`) y hacer que `CH.init` muestre P-090 en lugar de cambiar de persona | HU-008, ficha P-014 (Actor), P-010 (unión de roles), §5 |
| 2 | La tarjeta dice "Cancelaste esta reserva" para todo `cancelledBy = host`, aunque la haya cancelado otra persona de la misma unidad (co-propietario o inquilino). La ficha pide "cancelledBy por rol" | comprensión | Baja | Mostrar "Cancelada por ti" solo si `cancelledBy` es la persona actual; si no, "Cancelada por {nombre}" o "por tu unidad" | HU-008 C1, RN-084 |
| 3 | Las reservas locales de P-062 (r-8601 de Luis B-104, r-8609 de Carla A-301) no aparecen en P-014 de Luis ni de Carla: los datos no son los mismos en las dos vistas | comprensión | Baja | Mover esas reservas a `CH.DATA.reservations` en shell.js | HU-008 C1, RN-084 |
| 4 | La ficha de P-014 traza "las canceladas siguen visibles" a RN-088, que es el aviso al iniciar sesión. La regla que impide borrar es RN-084 | comprensión | Baja | Corregir la fila **Reglas** de la ficha: RN-084 y RN-085 (RN-088 solo si se muestra la marca de "cancelada por la administración") | — (§3.3 ficha P-014) |
| 5 | La paginación (20 por página) solo existe como nota; ninguna persona tiene más de 20 reservas | gap | Baja | Agregar un control "Paginación de demostración" como el de P-062 | — (§3.3 ficha P-014, Pagination) |
| 6 | La hora simulada de P-014 (10:50) no coincide con la de P-062 (10:30) ni con la de P-016 (cancela a las 10:45): una cancelación aparece "en el futuro" de la hora de P-062 | comprensión | Baja | Definir un único `CH.NOW` en shell.js (ver VL-P015 obs. 1) | RN-085, HU-008 C6 |

### 5. Decisiones recomendadas antes de implementar

1. **Decidir qué ve en "Mis reservas" un Administrator con vínculo de residente** y reflejarlo con la persona `rosaRes` (obs. 1).
2. **Fijar el texto de `cancelledBy` por rol** cuando la unidad tiene más de una persona (obs. 2).
3. **Corregir la trazabilidad de reglas de la ficha** (obs. 4). Los puntos 3, 5 y 6 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-014 cubiertas (en lo que le toca) | HU-008 ✅ → 1 de 1 | **100 %** |
| Criterios de HU-008 observables desde P-014 | C1 demostrable; C6 y C13 solo en la lógica (`<= NOW`) → 1 de 3 demostrables, 3 de 3 en lógica | **33 %** demostrables · **100 %** en lógica |
| Reglas de la ficha reflejadas (RN-085, RN-088) | RN-085 ✅, RN-088 ⚠️ | **50 %** completas · **100 %** con parciales |
| Reglas aplicables reflejadas (RN-084, RN-085, RN-088) | 2 completas, 1 parcial | **67 %** completas · **100 %** con parciales |

---

## VL-P015 · P-015 Detalle de reserva

**Prototipo:** [prototypes/P-015-detalle-reserva.html](prototypes/P-015-detalle-reserva.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.3 P-015](09-ui-spec.md) · **Flujos:** F3 (paso 7), F4 (paso 2, A1), F12 · **HU declaradas:** HU-007, HU-008
**Veredicto:** **Pasa con observaciones, condicionado a cerrar la obs. 1 (Alta).** La edición de invitados cumple HU-007: aforo, aviso de privacidad del primer invitado, `RESERVATION_GUEST_EDIT_TOO_LATE` y la vista del Administrator sin edición. Pero el prototipo decide "antes / después del inicio" solo con el selector y con la fecha, no con la hora: una reserva de hoy que ya empezó (r-8970, 10:00, abierta desde P-062) muestra "Cancelar reserva", contra RN-161 y HU-008 C4.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-015 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-007 | 8 de 12 (C1, C2, C3 y C7 se validan en P-012) | ✅ Cubierta | C4: aviso de privacidad y casilla solo si `d.guests.length === 0`; sin marcarla, `GUEST_PRIVACY_NOTICE_REQUIRED` en el resumen y junto a la casilla. C5: r-8841 tiene 30 personas; "Pedro Ramos" → "Personas: 31 de 40". C6 y C10: casilla "Al enviar, ya pasó la hora de inicio" → `RESERVATION_GUEST_EDIT_TOO_LATE` al agregar y al quitar, y el nombre escrito se conserva. C8: estado "Aforo lleno" → `RESERVATION_EXCEEDS_CAPACITY` ("Son 41 personas y el aforo es 40. Quita 1.") y la lista no cambia. C9: "Aforo lleno" + Quitar → 39 personas. **Parciales:** C11 (19:00:00 exactas) no se puede simular; el estado "Ya empezó" es inicio + 10 min (obs. 6). C12 (otro propietario → `403`) solo por URL (`?id=r-8933&role=ana` → P-090); el selector no tiene un estado 403 (obs. 8) |
| HU-008 | C2 y C4 (sin "Cancelar" desde el inicio), visualización de C1, C3 y C10 (Cancelada por / Fecha) | ⚠️ Parcial | El estado "Ya empezó" oculta formulario, Quitar y Cancelar ✅. El estado "Cancelada" muestra "Cancelada por ti / la administración / el anfitrión" y la fecha, sin acciones ✅. **Falla con los datos:** `phase()` solo compara `r.date < CH.TODAY`; r-8970 (hoy 10:00–13:00, hora simulada 10:30–10:50) cae en `'before'` y muestra "Cancelar reserva" al Administrator (obs. 1) |

**HU Must faltantes en esta pantalla:** ninguna falta por completo; HU-008 C4 queda contradicha por los datos hasta cerrar la obs. 1.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-086 | Agregar o quitar invitados solo antes de `startAt` | ⚠️ | ✅ con el estado "Ya empezó" (sin formulario, texto de la ficha) y con la casilla "ya pasó la hora" (`TOO_LATE` en el resumen). ⚠️ `phase()` ignora la hora: una reserva de hoy ya empezada sigue editable si el usuario es anfitrión (obs. 1) |
| RN-023 | Personas de la unidad + invitados ≤ aforo | ✅ | `submitAdd` compara `unitPeople + guests + 1 > cap` con `cap` de `DATA.areas`; contador "Personas: N de 40" con `aria-live` |
| RN-087 | Aviso de privacidad y rechazo sin aceptación | ⚠️ | ✅ con el primer invitado. ⚠️ Con invitados ya registrados no hay aviso ni casilla, y no se sabe quién aceptó antes: en una reserva creada por el Administrator (F11) el anfitrión nunca vio el aviso (obs. 3) |
| RN-083 | El anfitrión cancela solo antes del inicio | ⚠️ | "Cancelar reserva" solo en `'before'` con "Solo se puede cancelar antes de las 19:00 del 12/12/2026". Misma limitación de `phase()` (obs. 1) |
| RN-161 | El Administrator cancela solo antes del inicio | ⚠️ | ✅ con el estado "Ya empezó". ❌ con los datos: r-8970 abierta desde P-062 ("Ver") muestra "Cancelar reserva" aunque P-062 diga "Ya empezó: no se puede cancelar" (obs. 1) |
| RN-085 | `Completed` calculado | ⚠️ | ✅ para fechas pasadas (r-8644) y con el estado "Realizada". ⚠️ Una reserva de hoy ya terminada seguiría `Confirmada`: `phase()` no mira la hora de fin |
| Matriz B5 | El Administrator consulta y cancela, no edita invitados | ✅ | `editable = ph === 'before' && !admin`; texto "Solo el anfitrión puede cambiar la lista de invitados."; `←` vuelve a P-062; muestra "Anfitrión" |
| RN-084 / RN-168 | Se conservan quién y cuándo | ✅ | Sección "Cancelación" con `cancelledBy` y `cancelledAt` |
| RN-103 | 404 igual si no existe o es de otro condominio | ✅ | Estado "No existe (404)" → P-091 |
| RN-027 | Cifrado de invitados | — | Servidor; no se verifica en un prototipo |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F3 paso 7 · "Ver mi reserva" | P-013 → P-015 `?id=…` (reserva de la sesión vía `CH.saveReservation` / `res:{id}`) | ✅ |
| F12 pasos 2, 2a, 2b, 3 | Agregar "Pedro Ramos" (31 de 40) · primer invitado con casilla · "Aforo lleno" · Quitar | ✅ |
| F12 paso 4 · 19:10 | Estado "Ya empezó" → sin formulario, sin Quitar, texto de la ficha | ✅ |
| F12 paso 4a · formulario abierto antes de las 19:00 | Casilla "Al enviar, ya pasó la hora de inicio" → `RESERVATION_GUEST_EDIT_TOO_LATE` | ✅ |
| F12 → F5 · portería ve al invitado agregado | P-015 agrega a Pedro Ramos → P-020 | ❌ **Se pierde:** los invitados viven en `ctx.data` de la página; al recargar, cambiar de estado o ir a P-014/P-016/P-020 vuelven los de `DATA` (obs. 2) |
| F4 paso 2 · Ana pulsa "Cancelar reserva" | P-015 → P-016 `?id=r-8841` | ✅ |
| F4 A1 · Administrator abre una reserva futura | P-062 → "Ver" → P-015 (vista del Administrator) → "Cancelar reserva" → P-016 | ✅ |
| Administrator abre una reserva **en curso** | P-062 (B-205 "Ya empezó") → "Ver" → P-015 `?id=r-8970` → "Cancelar reserva" → P-016 → "Sí, cancelar" → P-062 "Cancelaste la reserva de B-205" | ❌ **Contradice RN-161** (obs. 1) |
| No existe | P-091 → "Volver" (P-014 o P-062 según rol) / "Ir al inicio" | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | `phase()` de P-015 y de P-016 decide "antes del inicio" con `r.date < CH.TODAY` y el estado del selector, sin hora. r-8970 (hoy 10:00–13:00) aparece en P-062 como "Ya empezó: no se puede cancelar", pero "Ver" lleva a P-015 con "Cancelar reserva", y P-016 la cancela con éxito. Causa raíz: shell.js tiene `TODAY` pero no una hora común; cada pantalla fija la suya (P-014 10:50, P-062 10:30, P-015 y P-016 ninguna) | gap | **Alta** | Agregar `CH.NOW` (p. ej. `2026-11-04T10:50`) en shell.js y calcular `before` / `started` / `completed` con `[inicio, fin)` contra `CH.NOW` en P-014, P-015, P-016 y P-062. Los estados del selector quedan solo para forzar el escenario | HU-008 C4, RN-161, RN-083, RN-086, RN-085 |
| 2 | Agregar y quitar invitados no se guarda en la sesión (`d.guests` en `ctx.data`, sin `CH.patchReservation`). El total de P-014, el resumen de P-016 y la lista de P-020 no ven los cambios: el propósito de HU-007 ("que portería los deje pasar") no se puede mostrar de punta a punta | gap | Media | Guardar la lista con `CH.patchReservation(id, { guests })` y hacer que P-020 lea los nombres de la sesión | HU-007 (propósito), HU-009 C1, F12 → F5 |
| 3 | La spec no define dónde queda la aceptación del aviso de privacidad: P-015 lo pide solo con el primer invitado, así que en una reserva creada por el Administrator con invitados (F11) el anfitrión agrega más sin haber visto el aviso nunca. RN-087 exige el aviso "cuando un usuario registra a los invitados" | gap | Media | Decidir si la aceptación es por reserva o por usuario y guardarla (`privacyNoticeAcceptedAt`, `acceptedBy`); si es por usuario, mostrar el aviso al primer invitado que agrega cada persona | RN-087, HU-007 C4, F11 |
| 4 | La validación "Escribe nombre y apellido del invitado" (al menos dos palabras) no está en ninguna HU, RN ni en §3.0.6 | comprensión | Baja | Quitarla o crear la regla y su texto en §3.0.6 | HU-007 (sin regla) |
| 5 | Al agregar un invitado con el aforo lleno, el mensaje dice "Quita 1": el texto de §3.0.6 está pensado para P-012 (lista completa) y en P-015 el invitado nuevo nunca se agregó | fricción | Baja | En P-015 usar "El área ya está en su aforo máximo (40). Quita a un invitado para agregar otro." | HU-007 C8, RN-023, §3.0.6 |
| 6 | El límite exacto (19:00:00) no se puede reproducir: "Ya empezó" es inicio + 10 min y la casilla "ya pasó la hora" no dice la hora | gap | Baja | Agregar los estados "18:59" y "19:00:00 exactas" cuando exista `CH.NOW` (obs. 1) | HU-007 C11, RN-086 |
| 7 | La reserva de hoy ya terminada no se mostraría `Realizada` en P-015: `phase()` solo marca `completed` por fecha | gap | Baja | Se resuelve con la obs. 1 | RN-085, HU-008 C6 |
| 8 | El selector no tiene el estado "No eres el anfitrión (403)"; se llega solo editando la URL. P-016 sí lo tiene | comprensión | Baja | Agregar el estado 403 al selector (Ana abriendo r-8933) | HU-007 C12, HU-008 C9, matriz B5 |

### 5. Decisiones recomendadas antes de implementar

1. **Corregir el cálculo de "antes del inicio" con un reloj común** (`CH.NOW`) y re-validar F4 A1 con r-8970 (obs. 1).
2. **Persistir la lista de invitados en la sesión** para mostrar F12 → F5 de punta a punta (obs. 2).
3. **Decidir el alcance de la aceptación del aviso de privacidad** (por reserva o por usuario) y dónde se guarda; depende de Q18/Q21 (obs. 3).
4. **Quitar o formalizar la regla de "nombre y apellido"** (obs. 4). Los puntos 5 a 8 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-015 cubiertas | HU-007 ✅, HU-008 ⚠️ → 1 de 2 | **50 %** (100 % con cobertura parcial) |
| Criterios de HU-007 observables desde P-015 | 6 completos + 2 parciales de 8 | **75 %** completos · **100 %** con parciales |
| Criterios de HU-008 observables desde P-015 | C1, C2, C3, C10 (visualización) ✅; C4 ⚠️ → 4 de 5 | **80 %** completos · **100 %** con parciales |
| Reglas de la ficha reflejadas (6: RN-086, RN-023, RN-083, RN-161, RN-085, B5) | 2 completas (RN-023, B5), 4 parciales | **33 %** completas · **100 %** con parciales |
| Reglas aplicables reflejadas (9: las 6 de la ficha + RN-087, RN-084/RN-168, RN-103) | 4 completas, 5 parciales | **44 %** completas · **100 %** con parciales |

---

## VL-P016 · P-016 Cancelar reserva

**Prototipo:** [prototypes/P-016-cancelar-reserva.html](prototypes/P-016-cancelar-reserva.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.3 P-016](09-ui-spec.md) · **Flujos:** F4 (paso 3, A1, A2) · **HU declaradas:** HU-008
**Veredicto:** **Pasa con observaciones, condicionado a cerrar VL-P015 obs. 1 (Alta).** La ConfirmPage cumple la ficha: sin `confirm()` ni modal, consecuencia para portería, aviso al anfitrión cuando cancela el Administrator, `RESERVATION_CANCELLATION_TOO_LATE`, `RESERVATION_ALREADY_CANCELLED` que conserva `cancelledBy`, y PRG a P-014 o P-062. La cancelación se guarda en la sesión y llega a P-010 (aviso de RN-088) y a P-020 (RN-026). Pero con datos reales acepta cancelar una reserva ya empezada (r-8970), y los errores se muestran en P-016 y no en P-015, como pide la ficha.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-016 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-008 | 8 de 14 (C5, C11, C12 en P-010; C6, C13 en P-014; C14 en P-012) | ⚠️ Parcial | C1: Ana → "Sí, cancelar" → `patchReservation({ status:'Cancelled', cancelledBy:'host', cancelledAt:'2026-11-04 10:45' })` → P-014 con aviso e historial ✅. C2: estado "Ya empezó" o respuesta "422 · ya empezó" → `RESERVATION_CANCELLATION_TOO_LATE` ✅. C3: Rosa → `cancelledBy:'admin'` → P-062 con aviso ✅. C9: estado "No es tuya (403)" → P-090 ✅. C10: estado "Ya cancelada" o respuesta "422 · otra persona la canceló antes" → `RESERVATION_ALREADY_CANCELLED` y "Cancelada por la administración" se conserva ✅. **C4 ⚠️:** ✅ con el estado "Ya empezó", ❌ con r-8970 (VL-P015 obs. 1). **C7 y C8 ⚠️:** 18:59 y 19:00:00 no se pueden simular (obs. 5) |

**HU Must faltantes en esta pantalla:** ninguna falta por completo; C4 queda contradicha con los datos hasta cerrar VL-P015 obs. 1.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-083 | El anfitrión no cancela desde el inicio | ⚠️ | ✅ con "Ya empezó" (página "No se puede cancelar esta reserva" con "Son las 19:10 … empezó a las 19:00"). ⚠️ `phase()` no usa la hora (VL-P015 obs. 1) |
| RN-161 | El Administrator no cancela desde el inicio | ⚠️ | ✅ con el estado; ❌ con r-8970: "Sí, cancelar" responde con éxito y P-062 muestra "Cancelaste la reserva de B-205" |
| RN-084 | `Cancelled` + quién + cuándo (ISO 8601) | ✅ | `CH.patchReservation` guarda `status`, `cancelledBy` y `cancelledAt`; P-014, P-015 y P-062 los muestran con `<time datetime>` |
| RN-168 | Ya cancelada → rechazo y se conservan quién y cuándo | ✅ | `alreadyView` con "Esta reserva ya estaba cancelada." y los datos de la primera cancelación; la carrera guarda la cancelación de la otra persona (10:44) |
| RN-088 | Aviso al anfitrión si cancela el Administrator | ✅ / ⚠️ | ✅ "Avisaremos a la unidad A-502 cuando inicie sesión." y P-010 de Ana muestra el aviso (`noticesFor` filtra `cancelledBy === 'admin'`; Ana cancelando la suya no genera aviso, HU-008 C11). ⚠️ `cancelledBy` se decide con `p.admin` y no con la vista: un Administrator que cancela la reserva de su propia unidad quedaría como `admin` y se avisaría a sí mismo (obs. 2) |
| RN-026 | Sale de portería en ≤ 60 s | ✅ | Cancelar r-8972 (Ana, hoy 19:00) la saca de P-020, que filtra `status === 'Confirmed'` sobre `DATA` con los cambios de la sesión. La espera de 60 s es de P-020 |
| §3.0.3 ConfirmPage | Sin `confirm()` ni modal | ✅ | `<form method="post">` con "Sí, cancelar" (danger) y "No, volver" → P-015; contenido de 32 rem |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F4 paso 3 · Ana confirma | P-016 → "Sí, cancelar" ("Enviando…") → P-014 `?cancelled=r-8841` con Alert success | ✅ |
| F4 A1 · Administrator confirma | P-062 → P-016 → P-062 `?cancelled=r-8841&date=2026-12-12` con "Cancelaste la reserva de A-502" | ✅ |
| F4 A2 · Ana inicia sesión después | P-016 (Rosa) → P-001 → P-010 de Ana con el aviso de r-8841 | ✅ |
| F4 A3 · "Entendido" | P-010 guarda el aviso visto en memoria (`seen = new Set()`); al recargar vuelve | ⚠️ Fuera del alcance de esta revisión; ver la revisión de P-010 (HU-008 C12) |
| "No, volver" | P-016 → P-015 | ✅ |
| `RESERVATION_CANCELLATION_TOO_LATE` / `RESERVATION_ALREADY_CANCELLED` | P-016 se queda en una página "No se puede cancelar esta reserva" con "Ver el detalle" y "Ir a Mis reservas" | ⚠️ La ficha pide "→ P-015 con el error en el resumen" (obs. 1) |
| 409 · otra persona cambió la reserva | Alert warning, datos recargados (+2 invitados), el reintento sale bien | ✅ (supuesto fuera de la spec, obs. 4) |
| 500 | "Algo salió mal" → "Ir al inicio" | ✅ |
| Administrator cancela una reserva en curso | P-062 → P-015 → P-016 `?id=r-8970` → éxito | ❌ Contradice RN-161 (VL-P015 obs. 1) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| — | P-016 acepta cancelar r-8970, que ya empezó: `phase()` no mira la hora. Misma causa que VL-P015 obs. 1 | gap | **Alta** | Ver VL-P015 obs. 1 (`CH.NOW` común) | HU-008 C4, RN-161, RN-083 |
| 1 | La ficha dice que `TOO_LATE` y `ALREADY_CANCELLED` vuelven a P-015 con el error en el resumen; el prototipo muestra una página propia en P-016 con dos botones. Las dos son válidas, pero el revisor y el desarrollador verán cosas distintas | comprensión | Media | Elegir una y alinear la ficha o el prototipo. Si se queda en P-016, documentar su `h1` "No se puede cancelar esta reserva" y sus acciones | HU-008 C2, C4, C10, RN-102, ficha P-016 (Estados) |
| 2 | `submitCancel` usa `p.admin` para `cancelledBy` y para elegir el destino (P-062). Con `rosaRes` cancelando una reserva de su propia unidad C-201, se guardaría `cancelledBy:'admin'` y P-010 le avisaría de su propia cancelación. La spec tampoco define si `cancelledBy` es la persona o el rol | gap | Media | Usar `isAdminView(p, r)` en el prototipo y decidir en RN-084/RN-088 que el aviso depende de que la cancele **otra persona** con rol Administrator (`cancelledBy` es el id de la persona, como en el ejemplo `a71f…`) | RN-084, RN-088, HU-008 C11 |
| 3 | El estado "No es tuya (403)" con Rosa (Administrator) muestra P-090, aunque el Administrator sí puede cancelar cualquier reserva del condominio | comprensión | Baja | Ocultar ese estado para Administrator o mostrar la ConfirmPage | HU-008 C3, C9, matriz B6 |
| 4 | El conflicto 409 al cancelar es un supuesto del prototipo (ya marcado en su nota); ni la ficha ni la arquitectura definen `If-Match` o versión para `POST …/cancellation` | gap | Baja | Decidir si la cancelación usa control de concurrencia; si no, quitar la opción 409 del selector | — (§3.0.4 Conflicto, ficha P-016) |
| 5 | No se pueden reproducir los bordes de HU-008 (cancelar a las 18:59 → `Cancelled`; a las 19:00:00 → `TOO_LATE`) | gap | Baja | Estados "18:59" y "19:00:00" con `CH.NOW` | HU-008 C7, C8, RN-083 |

### 5. Decisiones recomendadas antes de implementar

1. **Cerrar VL-P015 obs. 1** y re-validar F4 A1 con una reserva en curso.
2. **Decidir a dónde va el error de la cancelación tardía o repetida** (P-015 con resumen o página propia en P-016) y alinear la ficha (obs. 1).
3. **Definir `cancelledBy` como persona y la condición del aviso de RN-088** para un Administrator que también es residente (obs. 2).
4. **Decidir si la cancelación tiene control de concurrencia** (obs. 4). Los puntos 3 y 5 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-016 cubiertas | HU-008 ⚠️ → 0 de 1 completas | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-008 observables desde P-016 | C1, C2, C3, C9, C10 ✅; C4, C7, C8 ⚠️ → 5 de 8 | **63 %** completos · **100 %** con parciales |
| Criterios de HU-008 de punta a punta (P-014 + P-015 + P-016 + P-062 + P-010) | 14 criterios: 9 ✅ (C1, C2, C3, C5, C9, C10, C11, C6 y C13 en lógica), 4 ⚠️ (C4, C7, C8, C12), 1 en P-012 (C14) | **64 %** completos · **93 %** con parciales |
| Reglas de la ficha reflejadas (6: RN-083, RN-161, RN-168, RN-084, RN-088, RN-026) | 3 completas (RN-168, RN-084, RN-026), 3 parciales | **50 %** completas · **100 %** con parciales |

---

## VL-P062 · P-062 Reservas del condominio

**Prototipo:** [prototypes/P-062-reservas-del-condominio.html](prototypes/P-062-reservas-del-condominio.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.8 P-062](09-ui-spec.md) · **Flujos:** F4 (A1), F11 (pasos 1 y 6) · **HU declaradas:** HU-006, HU-006B, HU-008
**Veredicto:** **Pasa con observaciones.** La lista por día cumple la ficha: filtro GET por fecha y área con validación, navegación por día, paginación, "Cancelar" solo en reservas confirmadas que aún no empiezan, canceladas con quién y cuándo, PRG con el aviso de éxito y P-090 para quien no es Administrator. El gap de severidad Alta está en la salida: "Ver" lleva a P-015, que sí permite cancelar la reserva en curso (VL-P015 obs. 1). HU-006 y HU-006B se validan en P-012; aquí solo se ven la entrada y el regreso.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-062 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-008 | C3 (el Administrator cancela antes del inicio) y C4 (no cancela desde el inicio) | ⚠️ Parcial | C3 ✅: "Cancelar" → P-016 → P-062 con "Cancelaste la reserva de A-502", fila con "Por la administración · 04/11/2026 10:45". C4 ✅ en la lista: `canCancel = st === 'Confirmed' && inicio > NOW`; B-205 (hoy 10:00) muestra "En curso" y "Ya empezó: no se puede cancelar". ❌ por "Ver" → P-015 → "Cancelar reserva" (VL-P015 obs. 1) |
| HU-006 | Ninguno directo (C5 y el negativo de A-1104 se validan en P-012) | ⚠️ Solo entrada | "Reservar a nombre de una unidad" → P-012 en modo Administrator; la reserva creada vuelve a la lista (`byAdmin`, panel "Creadas en esta sesión desde P-012"). Los datos de P-062 no tienen reservas de A-1104 en diciembre para comprobar el cupo |
| HU-006B | Ninguno directo (el positivo de B-1203 alquilada se valida en P-012) | ⚠️ Solo entrada | Igual que HU-006. r-8606 de B-1203 (Pedro Salas) existe en la lista del 21/11 |

**HU Must faltantes en esta pantalla:** ninguna; HU-006 y HU-006B dependen de P-012 (fuera del alcance de esta revisión).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-076 | El Administrator reserva a nombre de cualquier unidad con las reglas del área, salvo RN-077 | ⚠️ | Solo la entrada (botón primary → P-012) y el regreso; las reglas se aplican en P-012 |
| RN-161 | El Administrator no cancela desde el inicio | ⚠️ | ✅ en la lista ("Ya empezó: no se puede cancelar"); ❌ por "Ver" → P-015 (VL-P015 obs. 1) |
| RN-084 | Canceladas con quién y cuándo | ✅ | "Por la administración / Por el anfitrión · 01/11/2026 09:12" bajo el badge; la reserva cancelada sigue en la lista |
| RN-085 | `Realizada` calculada | ✅ | r-8601 y r-8602 (01/11) se muestran `Realizada` sin guardar el estado |
| RN-088 | Aviso al anfitrión | ✅ | El aviso de éxito dice "Avisaremos a la unidad A-502 cuando inicie sesión."; P-010 lo muestra (ver VL-P016) |
| Matriz (P-062 solo Administrator) | Otros roles → P-090 | ✅ | Ana y Marco (BoardMember) ven "No tienes acceso a esta página" |
| §3.0.4 Validación | Fecha inválida | ✅ | Estado "Fecha inválida" (`2026-02-30`) → resumen `role="alert"` con enlace al campo y error junto al campo; la lista se oculta |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F4 A1 · cancelar la reserva de Ana | P-062 (12/12) → "Cancelar" → P-016 → P-062 `?cancelled=r-8841&date=2026-12-12` con aviso y fila resaltada | ✅ |
| F4 A1 · encontrar la reserva de Ana | El Administrator tiene que saber la fecha: la lista solo filtra por fecha y área | ⚠️ Fricción (obs. 2) |
| Reserva en curso (B-205, hoy 10:00) | Lista: sin "Cancelar" ✅ → "Ver" → P-015 → "Cancelar reserva" → P-016 → éxito | ❌ Contradice RN-161 (VL-P015 obs. 1) |
| F11 paso 1 | P-062 → "Reservar a nombre de una unidad" → P-012 | ✅ |
| F11 paso 6 | P-013 → "Ver reservas del condominio" → P-062; la reserva nueva se ve en su día (panel "Ir al día") | ✅ La lista se abre en la fecha de hoy, no en la de la reserva creada (obs. 3) |
| Filtrar, día anterior / siguiente, paginación | Formulario GET, enlaces `?date=`, paginación de demostración (3 por página el 21/11) | ✅ |
| Día sin reservas | "No hay reservas para este día." | ✅ |
| Ana o Marco abren `/admin/reservations` | P-090 | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| — | "Ver" de una reserva en curso lleva a P-015, que ofrece "Cancelar reserva", y P-016 la cancela; la lista de P-062 dice lo contrario | gap | **Alta** | Ver VL-P015 obs. 1 (`CH.NOW` común; P-062 ya calcula bien con `NOW`) | HU-008 C4, RN-161 |
| 1 | Las reservas locales de P-062 (`EXTRA`: r-8970, r-8601, r-8609, las del 21/11) no están en `CH.DATA`: no aparecen en P-014 de Luis ni de Carla, y P-020 tiene su propia copia de r-8970 que no recibe cancelaciones | comprensión | Baja | Mover `EXTRA` a `CH.DATA.reservations` en shell.js | HU-008 C1, RN-026, RN-084 |
| 2 | Para F4 A1 ("abre la reserva de Ana") el Administrator debe conocer la fecha; no puede buscar por unidad | fricción | Baja | Evaluar un filtro opcional "Unidad" en el formulario GET (`unitId=`) | HU-008 C3, F4 A1 |
| 3 | Al volver desde P-013 (F11 paso 6), la ficha pide "P-062 con la reserva nueva en la lista del día"; el prototipo abre hoy y hay que usar el panel "Ir al día" | gap | Baja | Que "Ver reservas del condominio" de P-013 envíe `?date={fecha de la reserva}` y resaltar la fila nueva | HU-006, HU-006B, F11 paso 6 |
| 4 | P-062 no tiene datos para mostrar el cupo de A-1104 en diciembre (HU-006 C5 y su negativo): el revisor no puede ver desde la lista que A-1104 llegó a 4 reservas de la parrilla | gap | Baja | Agregar a `DATA` 3 reservas de la parrilla de A-1104 en diciembre de 2026 | HU-006 C5, RN-076, RN-080 |

### 5. Decisiones recomendadas antes de implementar

1. **Cerrar VL-P015 obs. 1** con el reloj común y re-validar "Ver" sobre una reserva en curso.
2. **Unificar los datos de reservas en shell.js** para que P-014, P-015, P-020 y P-062 vean lo mismo (obs. 1, 4).
3. **Decidir si P-062 filtra por unidad** para F4 A1 (obs. 2) y **fijar el regreso de F11 al día de la reserva** (obs. 3).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-062 cubiertas por completo | HU-008 ⚠️, HU-006 ⚠️ (entrada), HU-006B ⚠️ (entrada) → 0 de 3 | **0 %** (100 % con cobertura parcial; HU-006 y HU-006B se validan en P-012) |
| Criterios de HU-008 observables desde P-062 | C3 ✅, C4 ⚠️ → 1 de 2 | **50 %** completos · **100 %** con parciales |
| Reglas de la ficha reflejadas (RN-076, RN-161, RN-084) | 1 completa (RN-084), 2 parciales | **33 %** completas · **100 %** con parciales |
| Reglas aplicables reflejadas (5: RN-076, RN-084, RN-085, RN-088, RN-161) | 3 completas, 2 parciales | **60 %** completas · **100 %** con parciales |

---

## VL-P020 · P-020 Portería: reservas del día

**Prototipo:** [prototypes/P-020-porteria.html](prototypes/P-020-porteria.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.4 P-020](09-ui-spec.md) · **Flujos:** F5 · **HU declaradas:** HU-009, HU-003B (parte de la PC compartida de portería)
**Veredicto:** **Pasa con observaciones.** El núcleo de F5 funciona y se puede verificar en el código: lista del día filtrada a `Confirmed` de hoy y ordenada por hora de inicio, marca de ingreso con hora ISO, rechazo de la doble marca y de la reserva cancelada, polling de 30 s, búsqueda que se conserva al refrescar y nada de datos del anfitrión. Los gaps están en el **cierre de sesión en la PC compartida**: al vencer la sesión, la lista de invitados sigue en pantalla, y nadie decidió si el polling cuenta como actividad. Tampoco se pueden reproducir los criterios de cambio de día ni los rechazos `403` de HU-009.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-020 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-009 | 8 de 13 completos, 2 parciales, 3 no observables | ⚠️ Parcial | **C1** ✅: `reset()` filtra `r.date === TODAY && r.status === 'Confirmed'` y ordena por `start`; cada tarjeta muestra la franja, el área, la unidad y los invitados. **C2** ✅: r-8790 (22/11), r-8841 (12/12) y las demás de otros días no aparecen. **C3** ✅: no hay ninguna `Cancelled` de hoy en `DATA`; se ve con "Administración cancela C-110" + refresco, o cancelando desde P-016/P-062 (`res-session-v1` se aplica al cargar). **C4** ✅: después de `sim-cancel`, `poll()` quita la reserva (`list.filter(r => !server.cancelled.has(r.id))`) en ≤ 30 s (`setInterval(poll, 30000)`). **C5** ✅: `g.at = hms(nowSec())` y `<time datetime="2026-11-04T19:0x:xx-05:00">`; la nota muestra `CheckedInAt` en ISO. **C8** ✅: estado "Vacío" con "No hay reservas confirmadas para hoy.". **C10** ✅: "Otra PC marca un invitado de A-502" y luego "Marcar ingreso" → aviso `warning` `GUEST_ALREADY_CHECKED_IN`, que conserva la hora de la otra PC (`g.at = server.checks[g.id]`). **C11** ✅: marcar a un invitado de C-110 después de la cancelación → aviso `danger` `GUEST_CHECK_IN_NOT_ALLOWED`. **C12** ⚠️: el estado "Otro rol (403)" existe, pero solo hay una persona, Raúl, y el menú sigue siendo el suyo (obs. 4). **C7** ⚠️: la vista no expone `/persons/{id}` ni datos del anfitrión, pero el `403` con `PERSONAL_DATA_FORBIDDEN` no se puede reproducir (obs. 4). **C6, C13** ❌: P-030 y P-041 no aceptan a `raul` (`roles` de cada página) y P-020 solo trae la nota RN-031 (obs. 4). **C9** ❌: el reloj simulado arranca a las 19:06:50 y `TODAY` es constante, así que el cambio de día no se puede probar (obs. 3) |
| HU-003B (parte de la PC compartida) | 4 aplicables (C3, C4, C8, C10: cierre por inactividad y por 12 h); los de bloqueo viven en P-001/P-002 | ⚠️ Parcial | Solo se ve el **efecto** del `401`: el botón "Vence la sesión (401)" muestra el alert `warning` "Tu sesión se cerró. Inicia sesión de nuevo." con un botón a P-001 (`reason=expired&returnUrl=%2Fconcierge`). No se ven los tiempos de C3/C4/C8/C10: no hay control de reloj. Además, (a) la lista de invitados sigue visible debajo del alert (obs. 1) y (b) no se sabe si el polling renueva `LastActivityAt` (obs. 2, §6 punto 9) |

**HU Must faltantes en esta pantalla:** ninguna de las declaradas falta del todo. Las dos quedan parciales: HU-009 por C6, C7, C9, C12 y C13, y HU-003B por la decisión del punto 9 de §6 y la lista que queda visible tras el `401`.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-026 | Una reserva cancelada sale de portería en ≤ 60 s | ✅ / ⚠️ | ✅ Polling cada 30 s; "Forzar refresco" la quita y la banda lo confirma. ⚠️ Sin conexión (`sim-offline`), la reserva cancelada sigue en la lista con sus botones activos por tiempo indefinido; solo aparece el alert "Sin conexión. Reintentando…" (obs. 5) |
| RN-029 | Solo `Confirmed` de la fecha actual en `America/Lima` | ✅ / ⚠️ | ✅ El filtro del código lo cumple. ⚠️ El cambio de día con la página abierta no se puede probar, y la ficha no dice si se actualiza el `<h1>` "Portería · miércoles 04/11/2026" (obs. 3) |
| RN-030 | Fecha-hora del ingreso en ISO 8601 | ✅ | `iso(g.at)` → `2026-11-04T19:07:42-05:00` en `datetime`; se ve "Ingresó 19:07" |
| RN-164 | Ingreso único; solo reservas `Confirmed` de hoy; se conserva la marca anterior | ✅ / ⚠️ | ✅ Ambos códigos, con los textos de §3.0.6 y la hora original conservada. ⚠️ Una reserva que ya terminó sigue aceptando marcas: Camila Ñique (r-8971, 12:00–16:00) tiene "Marcar ingreso" activo a las 19:06, y §3.0.5 define `Completed (calculado)` (obs. 7) |
| RN-158 | Sin DNI, teléfono, correo ni nombre del anfitrión | ✅ / ⚠️ | ✅ `reset()` copia solo `id, area, unit, start, end, guests` y descarta `host` y `unitPeople`; no hay enlaces a personas. ⚠️ El `403` `PERSONAL_DATA_FORBIDDEN` no se puede reproducir (obs. 4) |
| RN-031 | Concierge + información financiera → `403` | ⚠️ | El menú solo tiene "Portería" y "Cerrar sesión" (`menuItems` → `[['Portería','P-020']]`). El `403` de `/expenses` y del expediente no se puede reproducir: P-030 y P-041 no aceptan a Raúl (obs. 4) |
| RN-118 | `403` con Problem Details y el mensaje del código | ⚠️ | El estado "Otro rol (403)" usa el `deniedView()` genérico, sin código; lo muestra con la persona Raúl (obs. 4) |
| RN-102 | `422` + código estable + mensaje | ✅ | `GUEST_ALREADY_CHECKED_IN` y `GUEST_CHECK_IN_NOT_ALLOWED` como alert con `role="alert"` y foco; el código va en la nota |
| RN-113 | Cierre a los 1,800 s sin actividad | ⚠️ | Solo se ve el efecto, con el botón de `401`. Sin decidir si el polling cuenta como actividad, la regla no se puede validar en portería (obs. 2) |
| RN-114 | Cierre a las 12 h aunque haya actividad | ⚠️ | Igual que RN-113: es el mismo alert, sin distinguir la causa (la banda dice "RN-113 o RN-114") |
| RN-137 | Al revocar el rol, la siguiente solicitud ya no tiene sesión y "la vista de portería se cierra" | ⚠️ | El `401` del polling cubre el efecto, pero `paint()` vuelve a dibujar `listHtml()` debajo del alert: los nombres de los invitados siguen visibles hasta el siguiente `poll()` (≤ 30 s) y, sin JS o según la ficha ("alert fijo"), para siempre. Es justo el contraejemplo de la regla (obs. 1) |
| RN-074 | ASVS L2 en la gestión de sesión | ❌ | Ni la ficha ni la arquitectura piden `Cache-Control: no-store` para `/concierge`; con `private, max-age=0, must-revalidate` ([07-architecture.md](07-architecture.md) §rendimiento), el botón "Atrás" después de "Cerrar sesión" puede mostrar la lista desde la caché o el bfcache (obs. 6) |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F5 paso 1 · Raúl inicia sesión | P-001 → P-020 (ignora `returnUrl`, `finishSignIn()`) | ✅ (validado en VL-P001) |
| F5 paso 2 · buscar A-502 y "Pedro Ramos" | "Buscar invitado" filtra por nombre o por unidad, sin distinguir tildes (`norm()`), y anuncia "n resultados" | ✅ El filtro también busca por unidad, algo que la ficha no dice (obs. 11) |
| F5 paso 3 · "Marcar ingreso" | "Enviando…" (500 ms) → "✓ Ingresó 19:0x", el botón desaparece, aviso `role="status"` y el foco pasa al siguiente botón visible | ✅ |
| F5 paso 4 · cancelación | "Administración cancela C-110" → refresco (≤ 30 s o forzado) → la reserva desaparece | ✅ |
| F5 E · sesión vencida | "Vence la sesión (401)" → alert con "Iniciar sesión" → P-001 `?reason=expired&returnUrl=/concierge`; el siguiente `poll()` o "Actualizar ahora" redirige solo | ⚠️ La lista sigue visible mientras tanto, y la redirección automática no figura en la ficha (obs. 1) |
| Alt · otra PC marcó al invitado | "Otra PC marca…" → "Marcar ingreso" → `GUEST_ALREADY_CHECKED_IN` con la hora original | ✅ |
| Alt · marcar en una reserva recién cancelada | `GUEST_CHECK_IN_NOT_ALLOWED`; la reserva sale en el siguiente refresco | ✅ (mientras tanto quedan botones activos, obs. 10) |
| Alt · polling sin conexión | Alert `danger`, punto rojo, la hora de "Última actualización" queda congelada; se recupera solo | ⚠️ La lista desactualizada sigue aceptando acciones sin ningún límite de tiempo (obs. 5) |
| Alt · "Cerrar sesión" en la PC compartida | P-001 | ⚠️ El botón "Atrás" puede mostrar la lista (obs. 6) |
| Alt · cambio de día con la página abierta (23:59:59 → 00:00:00) | No se puede simular | ❌ (obs. 3) |
| Alt · el invitado no está en la lista o su nombre está mal escrito | No existe | ❌ **Callejón sin salida:** el Concierge no puede ver el teléfono del anfitrión (RN-158) y la HU promete "sin llamadas al residente"; nada dice qué hacer (obs. 8) |
| Alt · otro rol abre `/concierge` | Selector "Otro rol (403)" → P-090 con el menú de Raúl; "Ir al inicio" vuelve a P-020 | ⚠️ No se puede reproducir con Ana ni con Rosa (obs. 4) |
| Alt · error `500` | "Ir al inicio" → P-020 | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | Cuando el polling recibe `401`, `paint()` sigue dibujando la lista completa con los nombres de los invitados debajo del alert "Tu sesión se cerró"; solo se va cuando el siguiente `poll()` (≤ 30 s) hace `CH.go('P-001')`. La ficha pide un "Alert warning fijo" sin quitar la lista, así que en la app real los nombres quedarían en la pantalla de la PC compartida sin límite de tiempo, igual que sin JS hasta el `meta refresh`. Contradice RN-137 ("la vista de portería se cierra"; contraejemplo: "Raúl sigue viendo la lista de invitados") y el motivo de HU-003B | gap | Alta | En la ficha: ante un `401`, vaciar `#pt-list` y la búsqueda, y dejar solo el alert y el botón a P-001 (o redirigir de inmediato a P-001 `?reason=expired`). En el prototipo: que `listHtml()` no pinte nada cuando `expired` | HU-003B, RN-137, RN-113, RN-114 |
| 2 | §6 punto 9 sigue abierto: ¿el polling de 30 s renueva `LastActivityAt`? Si lo renueva (es lo normal con una cookie de expiración deslizante y la tabla `UserSession`), la PC de portería nunca se cierra por inactividad, solo a las 12 h, y RN-113 no aplica a portería (su contraejemplo es justo "la sesión de la PC de portería sigue abierta"). Si no lo renueva, el Concierge que solo mira la pantalla (F5 paso 4, "Espera") pierde la sesión cada 30 min en mitad del turno. El prototipo no toma partido: el `401` sale de un botón | gap | Alta | Decidirlo en un ADR (propuesta: el `GET /api/concierge/today` con encabezado de polling **no** renueva la actividad; solo "Marcar ingreso", "Actualizar ahora" y la navegación la renuevan) y agregar a HU-003B un criterio para la PC de portería. Simular en el prototipo un reloj de inactividad | HU-003B (C3, C8), HU-009, RN-113, RN-114 |
| 3 | El criterio C9 de HU-009 (23:59:59 → 00:00:00) no se puede probar: `TODAY` es constante y el reloj arranca a las 19:06:50. La ficha tampoco dice qué pasa con la página abierta a medianoche: si el `200` del polling cambia el `<h1>` con la nueva `date` o si las marcas de ayer desaparecen | gap | Media | En la ficha: "con un `200`, el `<h1>` se toma de `date` de la respuesta". En el prototipo: control "Avanzar a 23:59:59 / 00:00:00" con una reserva de mañana en `DATA` | HU-009 C9, RN-029, RN-164 |
| 4 | Los rechazos `403` de HU-009 no se pueden reproducir: P-020 solo admite `roles: ['raul']` (el estado "Otro rol (403)" sigue con el menú y la persona de Raúl); P-030 y P-041 no aceptan a `raul`; no hay forma de pedir `/persons/{id}`. Los criterios C6, C7, C12 y C13 quedan como notas RN | gap | Media | Agregar `ana` y `rosa` a P-020 (→ `deniedView()`, con "Ir al inicio" a P-010) y `raul` a P-030 y P-041 (→ P-090). Mostrar `PERSONAL_DATA_FORBIDDEN` en una ruta simulada `/persons/{id}` | HU-009 C6, C7, C12, C13, RN-031, RN-118, RN-158 |
| 5 | Sin conexión, la lista se queda como estaba, sin límite de tiempo, con "Marcar ingreso" activo y la reserva cancelada todavía visible; solo cambia el alert y el punto rojo. Es el contraejemplo de RN-026: "el Concierge deja pasar a los invitados de la reserva cancelada porque sigue en su lista" | gap | Media | Definir en la ficha un umbral (p. ej. > 60 s sin una respuesta del servidor): marcar la lista como "Desactualizada desde hh:mm" y decirle al Concierge que confirme con la administración antes de dejar pasar a alguien | HU-009 C4, RN-026 |
| 6 | En la PC compartida, después de "Cerrar sesión", el botón "Atrás" del navegador puede mostrar `/concierge` con los nombres desde la caché o el bfcache. La arquitectura fija `Cache-Control: private, max-age=0, must-revalidate` para las lecturas, no `no-store` | gap | Media | Exigir `Cache-Control: no-store` en `/concierge` y en `/api/concierge/today`, y agregar un test E2E (cerrar sesión → Atrás → no se ve la lista) | HU-003B, RN-074, RN-158 |
| 7 | Las reservas que ya terminaron siguen en la lista todo el día y aceptan marcas (Camila Ñique, r-8971 de 12:00 a 16:00, se puede marcar a las 19:06). RN-164 y API-05 solo rechazan reservas `Cancelled` o de otro día, pero §3.0.5 define `Completed (calculado)`, y RN-164 pide "`Confirmed` en la fecha actual". No queda claro si una reserva terminada sigue `Confirmed` para portería | comprensión | Media | Aclarar en RN-164 si se puede marcar después de `endAt` (llegadas tarde) o no, y si las reservas terminadas se muestran (minimización de datos de los invitados) | HU-009, RN-164, RN-029, RN-158 |
| 8 | No hay salida para "el invitado no está en la lista" o "su nombre está mal escrito": el Concierge no puede ver el teléfono del anfitrión (RN-158) y la HU promete "sin llamadas al residente". F5 no tiene un paso alternativo | gap | Media | Agregar a F5 el paso alternativo del procedimiento fuera del sistema (p. ej. el Concierge no deja pasar y el residente baja a recibirlo) o registrarlo como fuera del alcance del MVP en la HU | HU-009, RN-158, F5 |
| 9 | La ficha dice "con `304` no cambia nada", pero el prototipo actualiza "Última actualización" en cada consulta exitosa. Si en la app real un `304` no mueve la hora, el Concierge verá una hora vieja sin un problema real | comprensión | Baja | Aclarar en la ficha: con `200` o `304`, "Última actualización" toma la hora de la respuesta; con un fallo, se congela | HU-009, RN-026 |
| 10 | Después de `GUEST_CHECK_IN_NOT_ALLOWED`, la reserva cancelada sigue con todos sus botones "Marcar ingreso" hasta el siguiente refresco | mejora | Baja | Ante ese `422`, quitar la reserva o pedir el refresco enseguida | HU-009 C11, RN-026, RN-164 |
| 11 | La búsqueda también filtra por unidad (`data-unit`) y el hint lo dice ("o la unidad (por ejemplo, A-502)"); la ficha solo habla de "filtrar por nombre", aunque F5 paso 2 busca A-502 | comprensión | Baja | Alinear la ficha con el prototipo: nombre o unidad | — (§3.4 P-020, F5) |
| 12 | "Marcar ingreso" es un `<button type="button">` que solo funciona con JS. No se modela el Post/Redirect/Get a `/concierge#reservation-{id}` (los `id` existen) ni el `meta refresh` de 60 s, que solo aparece como nota | comprensión | Baja | Aceptarlo como límite del prototipo; cubrir el camino sin JS en los tests E2E de HU-009 | HU-009, RN-026 |
| 13 | En el estado "Vacío", `poll()` sale de inmediato (`ctx.state !== 'data'`): "Actualizar ahora" no hace nada y no se puede ver la llegada de una reserva nueva para hoy | mejora | Baja | Que el refresco también funcione en el estado vacío, para mostrar el paso de vacío a con datos | HU-009 C8, RN-029 |
| 14 | `DATA` no tiene ninguna reserva `Cancelled` de hoy: C3 solo se ve con la simulación de cancelación o cancelando antes en P-016/P-062 | mejora | Baja | Agregar a `DATA` una reserva `Cancelled` del 2026-11-04 | HU-009 C3 |

### 5. Decisiones recomendadas antes de implementar

1. **Fijar qué se ve tras un `401` en portería**: nada de la lista, solo el alert y el botón a P-001, o una redirección directa. Actualizar la ficha y el prototipo (obs. 1).
2. **Cerrar el punto 9 de §6 con un ADR**: si el polling cuenta o no como actividad, y agregar a HU-003B el criterio de la PC de portería (obs. 2).
3. **Exigir `Cache-Control: no-store`** en la página y el endpoint de portería, con su test (obs. 6).
4. **Definir el estado "desactualizada"** cuando el polling falla más de 60 s (obs. 5).
5. **Aclarar RN-164** para reservas que ya terminaron hoy, y si se siguen mostrando (obs. 7).
6. **Decidir el camino del invitado que no está en la lista** en F5 (obs. 8).
7. **Completar las personas y el reloj del prototipo** para reproducir C6, C7, C9, C12 y C13 (obs. 3, 4). Las obs. 9 a 14 se pueden resolver durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-020 cubiertas por completo | HU-009 ⚠️, HU-003B (portería) ⚠️ → 0 de 2 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-009 observables desde P-020 | 8 completos (C1, C2, C3, C4, C5, C8, C10, C11) + 2 parciales (C7, C12) de 13 | **62 %** (77 % con parciales) |
| Criterios de HU-003B de la PC compartida (C3, C4, C8, C10) | 0 completos; 3 parciales (C3, C4, C10: solo el efecto del `401`); C8 no observable | **0 %** (75 % con parciales) |
| Reglas de la ficha de P-020 reflejadas (RN-026, RN-029, RN-030, RN-031, RN-158, RN-164) | 4 completas (RN-026, RN-030, RN-158 en la vista, RN-164) + 2 parciales (RN-029, RN-031) | **67 %** (100 % con parciales) |
| Reglas aplicables reflejadas (12: RN-026, RN-029, RN-030, RN-031, RN-074, RN-102, RN-113, RN-114, RN-118, RN-137, RN-158, RN-164) | 5 completas (RN-026, RN-030, RN-102, RN-158, RN-164), 6 parciales (RN-029, RN-031, RN-113, RN-114, RN-118, RN-137), 1 no reflejada (RN-074); RN-054 no se verifica | **42 %** completas · **92 %** con parciales |
| HU Must del lote (19) con presencia en P-020 | 2 de 19 | 11 % (referencial: una sola pantalla) |

---

## VL-P030 · P-030 Gastos del mes

**Prototipo:** [prototypes/P-030-gastos-del-mes.html](prototypes/P-030-gastos-del-mes.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.5 P-030](09-ui-spec.md) · **Flujos:** F7 (pasos 1–3 y E), F6 (paso 1) · **HU declaradas:** HU-011 (ficha); HU-010 entra por F6 paso 1
**Veredicto:** **Pasa con observaciones.** P-030 cumple su ficha: los totales por categoría son correctos (recalculados abajo), los anulados no suman (RN-142), el mes sale de la fecha del gasto (RN-143), Carla ve P-090 y "Registrar gasto" solo aparece para el Administrator. Los gaps están en la **salida** hacia P-032 (sin prototipo: HU-010 no se puede validar), en la **fecha del escenario** (hoy = 04/11/2026 con gastos registrados hasta el 03/12/2026) y en dos criterios de HU-011 que la ficha no resuelve (mes futuro y motivo del anulado en el detalle).

**Recálculo de totales con `EXP` (P-030, líneas de datos):**

| Mes | Mantenimiento | Limpieza | Seguridad | Total del mes | Coincide con HU-011 C1 / ficha |
|---|---|---|---|---|---|
| 2026-11 (14 gastos, 1 anulado) | 2,400 + 980 + 970 + 520 + 280 + 300 + 850 = **S/ 6,300.00** | 1,850 + 1,000 + 350 = **S/ 3,200.00** (e-1104 de S/ 1,200.00 anulado, excluido) | 8,600 + 750 + 450 = **S/ 9,800.00** | **S/ 19,300.00** | ✅ |
| 2026-10 (8 gastos) | 2,400 + 980 + 640 + 3,200 = **S/ 7,220.00** | 1,850 + 410 = **S/ 2,260.00** | 8,600 + 720 = **S/ 9,320.00** | **S/ 18,800.00** | — (sin criterio). e-1008 (fecha 30/10, registrado 02/11) suma en octubre ✅ RN-143 |
| 2026-09 y anteriores | — | — | — | EmptyState, sin tablas | ✅ RN-035 |

El código filtra `!e.voided` antes de sumar y suma en céntimos (`Math.round(e.amount * 100)`); el filtro de mes usa `e.date.slice(0, 7)` (fecha del gasto), no `e.reg`.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-030 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-011 | 12 de 14 (C6 y C13 viven en P-031) | ⚠️ Parcial | ✅ C1 (Ana ve 6,300 / 3,200 / 9,800), C2 (Limpieza suma 1,000 y no 2,200: e-1104 `voided`), C4 (e-1114 del 28/11 registrado el 03/12 suma en noviembre), C5 ("registrado el 03/12/2026" bajo la descripción), C7 (Carla `fin:false` → `CH.deniedView()`; el menú no muestra "Gastos"), C14 (Marco `fin:true` ve los totales y no ve "Registrar gasto"). ⚠️ C3: la fila muestra "Anulado · No suma al total", pero el motivo y la fecha-hora solo están en P-031 (obs. 5). ⚠️ C8/C9: solo con el estado "Sin acceso (vínculo vencido)", sin persona ni reloj (obs. 11). ⚠️ C11: `?month=2027-01` muestra "Mostramos el mes actual." con los totales de noviembre; el mensaje de mes vacío solo sale con el estado "Vacío" o yendo a septiembre (obs. 4). ⚠️ C12: `CH.money` formatea bien `0.5` → `S/ 0.50` y `18500` → `S/ 18,500.00`, pero ningún gasto tiene esos montos (obs. 9). ❌ C10: no hay gasto de S/ 400.00 del 30/11 ni de S/ 300.00 del 01/12, y diciembre no se puede consultar (obs. 3) |
| HU-010 | 0 de 15 (todos viven en P-032) | ❌ No validable | El botón "Registrar gasto" (`data-go="P-032"`, solo `p.admin`) abre "Navegación simulada": P-032 no está en `CH.PAGES` (obs. 1). Solo se puede comprobar que BoardMember y propietarios no ven el botón (antesala de C7 y C14 de HU-010, pero no el `403`) |

**HU Must faltantes en esta pantalla:** HU-010 no se puede validar en ningún criterio mientras P-032 no tenga prototipo.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-035 ⚠️ Q27 | Total por categoría del mes; mes sin gastos → "No hay gastos registrados para este mes." sin totales | ✅ / ⚠️ | ✅ tabla de totales con `tfoot` y EmptyState sin tablas (`if (!list.length)`). ⚠️ el ejemplo de 2027-01 no se reproduce: un mes futuro se trata como inválido (obs. 4). Categorías con total 0 se muestran siempre como S/ 0.00 (obs. 12) |
| RN-142 | Anulados no suman y siguen visibles en el detalle con su motivo | ✅ / ⚠️ | ✅ `active = list.filter(e => !e.voided)`; la fila sigue en "Detalle" con badge y monto en gris. ⚠️ el motivo no está en la fila (obs. 5) |
| RN-143 | Cuenta en el mes de la fecha del gasto | ✅ | `e.date.slice(0, 7) === m`; e-1114 en noviembre y e-1008 en octubre |
| RN-144 | Fecha de registro además de la del gasto | ✅ | "registrado el dd/mm/aaaa" en cada fila |
| RN-090 | Cada gasto con monto, fecha, categoría, proveedor y comprobante | ⚠️ | Las 4 primeras están en la fila; el comprobante solo en P-031 (a un clic). Aceptable si la ficha lo declara así (lo hace la nota RN del prototipo, no la ficha) |
| RN-036 | Sin unidades, personas ni deudas en vistas financieras | ✅ | Ninguna descripción ni proveedor nombra una unidad o persona; no hay columna "registrado por" |
| RN-055 | `S/`, coma de miles, 2 decimales | ✅ | `CH.money` usa `toLocaleString('en-US', {min/max 2})` |
| RN-015 | Sin vínculo `Owner` no hay información financiera | ✅ | Carla → P-090; sin enlace "Gastos" en el menú (`menuItems`: `if (p.fin)`) |
| RN-016 / RN-105 | Acceso negado desde la solicitud siguiente al fin del vínculo; política evaluada en cada request | ⚠️ | Solo el estado manual "Sin acceso (vínculo vencido)"; no hay persona con `EndDate` (obs. 11) |
| RN-031 | Concierge → `403` en información financiera | ⚠️ | La ficha lo lista en "Sin acceso", pero Raúl no está en `roles` de P-030 (obs. 10). El menú de Raúl no muestra "Gastos" (`menuItems`) |
| RN-032 | Solo el Administrator registra gastos | ✅ | El botón depende de `p.admin`; Marco, Ana y Luis no lo ven |
| RN-092 | Mostrar el anulado con motivo y fecha-hora | ⚠️ | No en P-030; sí en P-031 (obs. 5) |
| RN-094 | Fecha del gasto ≤ fecha de registro y ≥ registro − 12 meses | ⚠️ | Los datos cumplen `date ≤ reg`, pero 12 de 14 registros de noviembre son posteriores a "hoy" (04/11/2026, `CH.TODAY`) (obs. 2) |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F7 pasos 1–2 · Ana o Luis | P-010 "Gastos del condominio" → P-030 (noviembre 2026, mes actual) | ✅ Llega con los totales. ⚠️ F7 paso 2 pide elegir 2026-11 "con el selector o Mes anterior": en el prototipo noviembre ya es el mes actual porque hoy es 04/11/2026 (obs. 2) |
| F7 paso 2 · "← Octubre 2026" | P-030 `?month=2026-10` | ✅ 18,800 en total; aparece "Noviembre 2026 →" y no hay enlace más allá del mes actual |
| F7 paso 3 · "Limpieza de cisterna" | P-030 → P-031 `?id=e-1104` (o `e-1105`) | ✅ La descripción es el enlace (`data-go="P-031"`). ⚠️ Hay dos filas con el mismo texto (obs. 8) |
| F7 E · Carla escribe `/expenses` | P-030 → P-090 "No tienes acceso a esta página" → "Ir al inicio" → P-010 | ✅ |
| F6 paso 1 · Rosa (Administrator) | P-030 "Registrar gasto" → P-032 | ❌ **Callejón sin salida:** "Navegación simulada. Esta pantalla aún no tiene prototipo." (obs. 1) |
| Mes sin gastos | "← Octubre" → "← Septiembre 2026" | ✅ EmptyState sin tablas ni totales |
| Mes con formato inválido | `?month=2026-13` | ✅ Mes actual + `Alert info` "Mostramos el mes actual." |
| Mes futuro (HU-011 C11) | `?month=2027-01` o `2026-12` | ⚠️ Se trata como inválido: "El mes indicado en la dirección no es válido." + totales de noviembre (obs. 4) |
| Formulario "Mes" vacío o futuro | [Ver] | ⚠️ Errores de campo que la spec no define (obs. 7) |
| Raúl (Concierge) en `/expenses` | — | ❌ No reproducible: Raúl no está en el selector (obs. 10) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | P-032 Registrar gasto no tiene prototipo: "Registrar gasto" termina en "Navegación simulada". Ninguno de los 15 criterios de HU-010 (comprobante obligatorio, monto > 0, 2 decimales, rango de fechas, `403` de BoardMember y Owner, corte de red) se puede validar, ni el enlace F6 2a a P-043 | gap | **Alta** | Prototipar P-032 con sus estados `422`/`413`/`415`, el hint "Vuelve a elegir el archivo." y el éxito → P-031 con "Registraste el gasto." | HU-010 (todos), RN-032, RN-033, RN-034, RN-093, RN-094, RN-166 |
| 2 | El escenario es incoherente en el tiempo: `CH.TODAY = '2026-11-04'` (la banda dice "miércoles 04/11/2026") pero hay gastos con fecha hasta el 28/11, registrados hasta el 03/12, y una anulación el 20/11 16:45. El stakeholder ve gastos "del futuro", y F7 paso 2 (llegar a noviembre con "Mes anterior") no se reproduce | comprensión | Media | Dar a P-030/P-031 una fecha de escenario propia ≥ 2026-12-04 (o hacer `TODAY` configurable por pantalla), de modo que el mes actual sea diciembre 2026 y noviembre se alcance con "← Noviembre 2026" | HU-011 C4, C10; RN-094, RN-143; F7 paso 2 |
| 3 | HU-011 C10 no tiene datos: falta el gasto de Limpieza de S/ 400.00 del 30/11 y el de S/ 300.00 del 01/12, y diciembre 2026 no se puede consultar (`max="${CUR}"`, `q <= CUR`) | gap | Media | Agregar ambos gastos y, con la obs. 2, permitir consultar diciembre | HU-011 C10, RN-143 |
| 4 | Un mes futuro (`?month=2027-01`) se trata como "no válido" y muestra el mes actual; RN-035 y HU-011 C11 esperan "No hay gastos registrados para este mes." para 2027-01. La ficha solo define el **formato** inválido | gap | Media | Decidir en la ficha qué pasa con un mes futuro (EmptyState de RN-035 o mes actual con aviso propio) y alinear el ejemplo de RN-035 / HU-011 C11 con la fecha de escenario | HU-011 C11, RN-035 · §3.5 P-030 Estados |
| 5 | La fila del anulado en "Detalle" muestra "Anulado · No suma al total" sin motivo ni fecha-hora; HU-011 C3 dice "abre el **detalle** de 2026-11 … ve el motivo y la fecha-hora" y RN-142 "siguen visibles **en el detalle** con su motivo". La ficha P-030 tampoco pide el motivo | comprensión | Media | Aclarar en HU-011 C3 que "detalle" es P-031, o agregar el motivo y la fecha-hora a la fila del anulado en P-030 | HU-011 C3, RN-142, RN-092 |
| 6 | La ficha pide `Pagination` (20 por página) pero no dice si los totales cubren todo el mes o solo la página; con 14 gastos el prototipo nunca pagina | comprensión | Baja | Declarar en la ficha que los totales y el contador "Detalle (n gastos)" son del mes completo, y agregar un mes de prueba con > 20 gastos | RN-035 · §3.5 P-030 |
| 7 | El formulario "Mes" muestra errores ("Elige un mes.", "Escribe el mes con el formato AAAA-MM…", "Elige un mes hasta noviembre 2026.") que no están en §3.0.6 ni en la ficha; con SSR y `form method=get` el servidor solo aplicaría la regla de URL inválida | comprensión | Baja | Definir esos textos en §3.0.6 / `es-PE.resx` o quitar la validación de campo y dejar la regla de URL | — (§3.5 P-030, §3.0.6) |
| 8 | Hay dos filas "Limpieza de cisterna · 08/11/2026 · Hidroclean SAC" (e-1104 anulado y e-1105); F7 paso 3 dice "Abre 'Limpieza de cisterna'" y HU-011 C6 se refiere a la de `factura-F001-0458.pdf`, que es la **anulada** | comprensión | Baja | Precisar en F7 paso 3 y HU-011 C6 cuál de las dos (S/ 1,200.00 anulada) se abre | HU-011 C6 · F7 paso 3 |
| 9 | HU-011 C12 (`S/ 0.50` y `S/ 18,500.00`) solo se verifica leyendo `CH.money`; ningún gasto tiene esos montos | gap | Baja | Agregar un gasto de S/ 0.50 y uno de S/ 18,500.00 a algún mes | HU-011 C12, RN-055 |
| 10 | Raúl (Concierge) no está en `roles` de P-030, aunque la ficha lo lista en "Sin acceso" | gap | Baja | Agregar `raul` al selector y verificar P-090 | RN-031, HU-009 (P-090) |
| 11 | El vínculo vencido (C8) y el borde de las 23:59 (C9) solo se simulan con un estado manual que aplica a cualquier persona, incluso a Rosa | comprensión | Baja | Agregar una persona "Luis con `EndDate = 2026-12-15`" y un control de reloj (15/12 23:59 vs 16/12 00:00) | HU-011 C8, C9; RN-016, RN-105 |
| 12 | Las tres categorías se muestran siempre, aunque una sume S/ 0.00 en el mes; la spec no dice si se muestran o se omiten | comprensión | Baja | Fijarlo en la ficha cuando se cierre Q27 | RN-035 ⚠️ Q27 |

### 5. Decisiones recomendadas antes de implementar

1. **Prototipar P-032** y re-validar F6 pasos 1–2a y los 15 criterios de HU-010 (obs. 1).
2. **Fijar la fecha del escenario de gastos** (≥ 2026-12-04) y completar los datos de HU-011 C10 y C12 (obs. 2, 3, 9).
3. **Decidir el comportamiento de un mes futuro** en la ficha de P-030 y alinear RN-035 / HU-011 C11 (obs. 4).
4. **Aclarar dónde se ve el motivo del anulado** ("detalle" = P-031 o la fila de P-030) en HU-011 C3 y RN-142 (obs. 5).
5. Declarar en la ficha que los totales son del mes completo con paginación (obs. 6). Las obs. 7, 8, 10, 11 y 12 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-030 cubiertas por completo | HU-011 ⚠️, HU-010 ❌ → 0 de 2 | **0 %** (50 % con cobertura parcial) |
| Criterios de HU-011 observables desde P-030 | 6 ✅ (C1, C2, C4, C5, C7, C14) + 5 ⚠️ (C3, C8, C9, C11, C12) + 1 ❌ (C10) de 12 | **50 %** completos · **92 %** con parciales |
| Criterios de HU-010 observables (vía F6 paso 1) | 0 de 15 | **0 %** |
| Reglas de la ficha de P-030 reflejadas (RN-015, RN-016, RN-035, RN-036, RN-090, RN-105, RN-142, RN-143) | 4 ✅ (015, 036, 142, 143) + 4 ⚠️ (016, 035, 090, 105) | **50 %** completas · **100 %** con parciales |
| Reglas aplicables reflejadas (14: RN-015, 016, 031, 032, 035, 036, 055, 090, 092, 094, 105, 142, 143, 144) | 7 ✅ + 7 ⚠️; RN-054 no verificable | **50 %** completas · **100 %** con parciales |
| Totales mostrados correctos (recalculados) | 2026-11 y 2026-10, 4 cifras cada uno | **100 %** |

---

## VL-P031 · P-031 Detalle de gasto

**Prototipo:** [prototypes/P-031-detalle-de-gasto.html](prototypes/P-031-detalle-de-gasto.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.5 P-031](09-ui-spec.md) · **Flujos:** F7 (pasos 3–4), F6 (pasos 2–6) · **HU declaradas:** HU-011, HU-010B
**Veredicto:** **Pasa con observaciones** como pantalla: cumple su ficha (inmutable sin Editar ni Borrar, anulado con motivo y fecha-hora ISO en `datetime`, comprobante con descarga simulada por la API, acciones solo para el Administrator y solo en gastos vigentes, 404 antes que 403). **HU-010B no se puede validar:** P-033 Anular y P-034 Vincular no tienen prototipo, y los regresos de F6 solo se ven con el selector "Llegada a la pantalla". Además, la spec tiene una contradicción de fechas en la anulación de "Limpieza de cisterna" y los datos vinculan gastos a contrataciones adjudicadas a **otro** proveedor.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-031 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-011 | 6 de 14 (C3, C5, C6, C7, C12, C13; el resto vive en P-030) | ⚠️ Parcial | ✅ C3: e-1104 muestra badge "Anulado", `Alert danger` "Anulado el 20/11/2026 16:45" con `datetime="2026-11-20T16:45:00-05:00"` y "Motivo: Monto mal digitado; se registra de nuevo por S/ 1,000.00". ✅ C5: e-1114 → "Fecha del gasto 28/11/2026 · Registrado el 03/12/2026 por la Administración". ✅ C6: Luis ve monto, fecha, categoría, proveedor (con RUC) y "Descargar comprobante" de `factura-F001-0458.pdf · 180 KB` (descarga simulada, `href="#"`, sin URL de blob). ✅ C7: Carla → `CH.deniedView()`. ⚠️ C12: formato correcto por `CH.money`, sin datos de 0.50 ni 18,500. ⚠️ C13: el `403` del receipt solo se ve a nivel de página (Carla no llega al botón); el `GET /api/expenses/{id}/receipt` directo no se simula |
| HU-010B | 9 de 9 (dependen de P-031, P-033 y P-034) | ❌ No validable | ⚠️ C1/C5 (`EXPENSE_IMMUTABLE`): no hay Editar ni Borrar y el texto "Un gasto registrado no se edita…" está; el `422` no es observable. ❌ C2/C7 (motivo vacío o solo espacios): viven en P-033, sin prototipo (obs. 1). ⚠️ C3: el resultado se ve con "Llegada: Desde P-033", pero con fecha-hora 20/11/2026 16:45 y no la de la HU (10/11/2026 09:00) (obs. 3). ❌ C4 (`EXPENSE_HIRE_NOT_APPROVED` con "Pintura de fachada" `Submitted`, que sí existe como h-101): vive en P-034 (obs. 2). ⚠️ C6: solo el resultado ("Vinculaste el gasto…", e-1103 → h-098), no el ejemplo de "Pintura de fachada – adelanto S/ 9,250.00". ⚠️ C8: "Llegada: el gasto ya estaba anulado" muestra "Este gasto ya estaba anulado." y conserva motivo y fecha-hora, pero el disparo es manual. ⚠️ C9: Marco no ve "Anular gasto" (`p.admin && !e.void`); el `403` por URL directa no se puede probar sin P-033 |

**HU Must faltantes en esta pantalla:** HU-010B completa (ningún criterio validable de punta a punta). HU-010 solo aporta el destino de su paso 2 (aviso "Registraste el gasto." en e-1105, con selector).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-091 | Inmutable: sin Editar ni Borrar | ✅ | No hay botones de edición; texto muted "Un gasto registrado no se edita: si tiene un error, anúlalo y regístralo de nuevo." |
| RN-092 | Motivo obligatorio (trim) y anulado visible con motivo y fecha-hora ISO 8601 | ⚠️ | ✅ visible con motivo y `<time datetime="…-05:00">`. ❌ la exigencia del motivo vive en P-033 (obs. 1). ⚠️ fecha distinta del ejemplo por la contradicción de la spec (obs. 3) |
| RN-167 | No anular dos veces; conservar la primera anulación | ⚠️ | Anulado → "Este gasto está anulado: no tiene acciones."; error `EXPENSE_ALREADY_VOIDED` solo con el selector de llegada |
| RN-095 ⚠️ Q30 | Solo vincular a contrataciones `Approved` | ⚠️ | e-1103 → h-098 y e-1107 → h-092, ambas `Approved`, con badge "Aprobada" y enlace a P-041. La validación vive en P-034 (obs. 2). Los proveedores no coinciden con los adjudicados (obs. 4) |
| RN-107 | Descarga por endpoint de la API con filtro de condominio y la misma política | ⚠️ | Descarga simulada sin URL pública; `403` solo a nivel de página (Carla) y `404` por P-091 |
| RN-103 | 404 antes que 403 | ✅ | `render`: `if (!pk.e) return notFoundView(c)` antes de `if (!c.persona.fin)`; Carla + "No encontrado" → 404 |
| RN-036 | Sin unidades ni personas | ✅ | "registrado … por la Administración" (cargo, no nombre); descripciones sin unidades |
| RN-090 | Monto, fecha, categoría, proveedor y comprobante | ✅ | Todos en el `<dl>` y en la sección "Comprobante" (salvo el estado "Vacío", obs. 5) |
| RN-033 ⚠️ Q28 | Gasto sin comprobante no se registra | ⚠️ | El estado "Vacío (sin comprobante ni vínculo)" muestra un gasto que la regla no permite (obs. 5) |
| RN-142 | Anulado visible pero no suma | ✅ | Monto en gris y "No suma al total del mes" |
| RN-143 | Mes de la fecha del gasto | ✅ | "← Gastos de octubre 2026" para e-1008 (fecha 30/10, registrado 02/11) |
| RN-144 | Fecha de registro además de la del gasto | ✅ | "Fecha del gasto" y "Registrado el" en el `<dl>` |
| RN-055 | Formato de montos | ✅ | `CH.money` |
| RN-015 | Inquilino sin información financiera | ✅ | Carla → P-090 |
| RN-016 / RN-105 | Vínculo vencido → 403 en la solicitud siguiente | ❌ | P-031 no tiene estado "Sin acceso (vínculo vencido)" (P-030 sí) (obs. 6) |
| RN-031 | Concierge → 403 | ⚠️ | Raúl no está en `roles` (obs. 6) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F7 paso 4 · Luis | P-031 `?id=e-1104` → "Descargar comprobante" | ✅ "Descargando…" → "Se descargó factura-F001-0458.pdf (180 KB). Simulado…"; botón con `aria-disabled` mientras descarga |
| Volver al mes | "← Gastos de noviembre 2026" / migas | ✅ P-030 `?month=` del mes de la fecha del gasto; "Inicio" → P-010 |
| F6 paso 2 · regreso desde P-032 | Selector "Desde P-032: registró el gasto" → P-031 e-1105 con "Registraste el gasto." | ⚠️ Solo con selector; P-032 no existe |
| F6 paso 3 · "Anular gasto" | P-031 → P-033 `?id=e-1105` | ❌ **Callejón sin salida:** "Navegación simulada" (obs. 1) |
| F6 paso 4 · regreso desde P-033 | Selector "Desde P-033: anuló el gasto" → e-1104 Anulado con motivo y fecha-hora | ⚠️ Solo con selector |
| F6 paso 5 · "Vincular a una contratación" | P-031 (e-1105, sin vínculo) → P-034 | ❌ **Callejón sin salida:** "Navegación simulada" (obs. 2) |
| F6 paso 6 · regreso desde P-034 | Selector → e-1103 con "Mantenimiento de ascensores →" (badge Aprobada) → P-041 `?id=h-098` | ⚠️ Solo con selector; el enlace a P-041 funciona |
| Gasto ya vinculado | e-1103 | ✅ Sin "Vincular"; solo "Anular". ⚠️ No hay forma ni regla para corregir un vínculo erróneo (obs. 7) |
| Administrator ante gasto anulado | e-1104 | ✅ "Este gasto está anulado: no tiene acciones." |
| Carla | P-031 → P-090 → "Ir al inicio" → P-010 | ✅ |
| Gasto inexistente u otro condominio | Estado "No encontrado (404)" → "Ir al inicio" / "Volver" (P-030 del mes actual) | ✅ Foco en el `h1` |
| Luis con vínculo vencido / Raúl | — | ❌ No reproducible (obs. 6) |
| Expediente → gasto | P-041 h-098 | ⚠️ El vínculo es de ida: P-041 no lista los gastos vinculados (obs. 9) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | P-033 Anular gasto no tiene prototipo: "Anular gasto" termina en "Navegación simulada". No se pueden validar el motivo obligatorio (vacío y solo espacios), la `ConfirmPage`, el texto "No se puede deshacer." ni el `403` de Marco por URL directa | gap | **Alta** | Prototipar P-033 con `EXPENSE_VOID_REASON_REQUIRED` en el campo, el caso solo espacios, el regreso a P-031 con "Anulaste el gasto." y P-090 para BoardMember | HU-010B C2, C3, C7, C8, C9; RN-092, RN-167 |
| 2 | P-034 Vincular no tiene prototipo: "Vincular a una contratación" termina en "Navegación simulada". No se pueden validar el rechazo de h-101 "Pintura de fachada" (`Submitted`) ni el vínculo positivo, ni el EmptyState "No hay contrataciones aprobadas para vincular." | gap | **Alta** | Prototipar P-034 con radios solo `Approved`, el error `EXPENSE_HIRE_NOT_APPROVED` en el `fieldset` y el EmptyState; agregar al seeder el gasto "Pintura de fachada – adelanto S/ 9,250.00" y una h-101 aprobada para C6 | HU-010B C4, C6; RN-095 |
| 3 | La spec se contradice: HU-010 C1 registra "Limpieza de cisterna" el **2026-11-20**, pero HU-010B C3/C8, RN-092 y RN-167 la anulan el **2026-11-10T09:00:00-05:00**, antes de existir. La ficha de P-031 repite ambas ("Anulado el 10/11/2026 09:00" y "Registrado el 20/11/2026"). El prototipo eligió 20/11/2026 16:45, que no coincide con el criterio | gap | Media | Corregir HU-010B C3 y C8, RN-092, RN-167 y el wireframe de P-031 a una fecha-hora ≥ 2026-11-20 (p. ej. `2026-11-20T16:45:00-05:00`, reintento el 2026-11-22) | HU-010B C3, C8; HU-010 C1; RN-092, RN-167 |
| 4 | Los datos vinculan gastos a contrataciones adjudicadas a otro proveedor: e-1103 "Mantenimiento preventivo de ascensores" (Elevadores del Pacífico SAC, S/ 2,400.00) → h-098, cuya elegida es Ascensores Andinos SAC (Elevadores es la cotización perdedora de S/ 5,350.00); e-1107 (TecnoVisión EIRL) → h-092, elegida Vigilancia Total SAC. Un propietario leería que se pagó al perdedor. Además, RN-015 y RN-036 citan "Mantenimiento de ascensores – S/ 4,800.00 – Ascensores Andinos SAC" | comprensión | Media | Alinear los datos con las contrataciones (proveedor y monto) y decidir, con Q30, si RN-095 debe exigir que el proveedor del gasto sea el de la cotización elegida | HU-010B C6, HU-014; RN-095 ⚠️ Q30, RN-036 |
| 5 | El estado "Vacío (sin comprobante ni vínculo)" muestra un gasto sin comprobante, que RN-033 rechaza y RN-090 no admite; la ficha de P-031 no define ese estado | comprensión | Media | Retirar el estado o mostrarlo solo si Q28 crea el caso de datos migrados; documentarlo en la ficha si se mantiene | RN-033 ⚠️ Q28, RN-090, HU-011 C6 |
| 6 | P-031 no tiene estado "Sin acceso (vínculo vencido)" ni a Raúl en el selector: RN-016/RN-105 y RN-031 no se ven en el detalle, aunque la descarga del comprobante depende de la misma política (RN-107) | gap | Baja | Copiar el estado `denied` de P-030 y agregar `raul` a `roles` | HU-011 C8, C13; RN-016, RN-031, RN-105, RN-107 |
| 7 | Una vez vinculado, el gasto pierde "Vincular" y no hay forma de cambiar ni quitar el vínculo; la spec no dice si el vínculo cuenta como edición (RN-091) ni cómo se corrige un vínculo erróneo (¿anular y registrar de nuevo?) | gap | Media | Decidir en HU-010B (y, si aplica, en un ADR) si el vínculo es único e inmutable y cómo se corrige | HU-010B, RN-091, RN-095 ⚠️ Q30 |
| 8 | El monto del anulado aparece tachado en P-031, mientras la ficha de P-030 dice "tachado NO" para el mismo caso; la ficha de P-031 no lo define | comprensión | Baja | Unificar el criterio en §3.5 (texto "No suma al total del mes" + color muted, sin tachado) | RN-142 · §3.5 P-030/P-031 |
| 9 | El vínculo es de una sola dirección: P-041 no muestra los gastos vinculados a la contratación, así que el propietario no ve desde el expediente cuánto se ha gastado de lo aprobado | mejora | Baja | Evaluar una sección "Gastos vinculados" en P-041 (fuera de la ficha actual) | HU-010B ("mostrar el sustento"), HU-014 |
| 10 | HU-011 C12 (montos `S/ 0.50` y `S/ 18,500.00`) no tiene datos en el detalle | gap | Baja | Ver obs. 9 de VL-P030 | HU-011 C12, RN-055 |

### 5. Decisiones recomendadas antes de implementar

1. **Prototipar P-033 y P-034** y re-validar F6 pasos 3–6 y los 9 criterios de HU-010B (obs. 1, 2).
2. **Corregir la fecha-hora de anulación** de "Limpieza de cisterna" en HU-010B, RN-092, RN-167 y la ficha de P-031 (obs. 3).
3. **Alinear los datos de vínculos** con el proveedor y monto adjudicados, y decidir con Q30 si RN-095 valida el proveedor (obs. 4).
4. **Decidir si el vínculo gasto–contratación se puede corregir** y cómo (obs. 7).
5. **Quitar o justificar el estado "sin comprobante"** (obs. 5). Las obs. 6, 8, 9 y 10 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-031 cubiertas por completo | HU-011 ⚠️, HU-010B ❌ → 0 de 2 | **0 %** (100 % con cobertura parcial: HU-010B tiene 6 de 9 criterios parciales) |
| Criterios de HU-011 observables desde P-031 | 4 ✅ (C3, C5, C6, C7) + 2 ⚠️ (C12, C13) de 6 | **67 %** completos · **100 %** con parciales |
| Criterios de HU-010B | 0 ✅ + 6 ⚠️ (C1, C3, C5, C6, C8, C9) + 3 ❌ (C2, C4, C7) de 9 | **0 %** completos · **67 %** con parciales |
| Reglas de la ficha de P-031 reflejadas (RN-036, RN-091, RN-092, RN-095, RN-107) | 2 ✅ (036, 091) + 3 ⚠️ (092, 095, 107) | **40 %** completas · **100 %** con parciales |
| Reglas aplicables reflejadas (17: RN-015, 016, 031, 033, 036, 055, 090, 091, 092, 095, 103, 105, 107, 142, 143, 144, 167) | 9 ✅ + 6 ⚠️ + 2 ❌ (016, 105) | **53 %** completas · **88 %** con parciales |
| HU Must de E4 (HU-010, HU-010B, HU-011) validadas de punta a punta con P-030 + P-031 | Ninguna: HU-010 y HU-010B dependen de P-032/P-033/P-034; HU-011 tiene C10 ❌ | **0 de 3** (HU-011 sumando ambas pantallas: 8 de 14 criterios completos —C1, C2, C3 en P-031, C4, C5, C6, C7, C14—, 57 %; 13 de 14 con parciales, 93 %; falta C10) |

---

## VL-P040 · P-040 Contrataciones

**Prototipo:** [prototypes/P-040-contrataciones.html](prototypes/P-040-contrataciones.html) (con [assets/shell.js](prototypes/assets/shell.js), datos `DATA.hires` y estado de sesión `hires-v1`)
**Ficha:** [09-ui-spec.md §3.6 P-040](09-ui-spec.md) · **Flujos:** F8 (pasos 1, 4 y 7) · **HU declaradas:** HU-012, HU-013, HU-014
**Veredicto:** **Pasa con observaciones.** La pantalla cumple su ficha: tiene las pestañas por rol, la pestaña inicial correcta para cada actor, el contador de "Por decidir" (también con 0), los vacíos con su texto y el `403` para la inquilina. Los gaps están en las **salidas** del Administrator: "Nueva contratación" y "Registrar proveedor" llevan a P-042 y P-043, que no tienen prototipo. Por eso HU-012 no se puede validar (obs. 1, Alta). También faltan personas para probar los `403` de Concierge y de un vínculo `Owner` vencido.

### 1. Cobertura de HUs

P-040 es la entrada de las tres HU de E5, pero los criterios se verifican sobre todo en P-041 (VL-P041), P-042 y P-043. Esta tabla solo cuenta los criterios que se observan **en** P-040.

| HU | Criterios observables desde P-040 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-012 | 1 de 14 (C13); C1–C12 y C14 viven en P-041, P-042 y P-043 | ❌ No validable | C13 (Ana `Owner` no crea) ⚠️: los botones solo se pintan con `p.admin` (`renderData`, l. 77–78) y el `403` del servidor no se simula. **Entrada bloqueada:** "Nueva contratación" (`data-go="P-042"`), "Registrar proveedor" (`data-go="P-043"`, `returnUrl=/supplier-hires`) y "Crear una contratación" (vacío de Borradores) llevan a "Navegación simulada": `CH.PAGES` no tiene P-042 ni P-043 (obs. 1) |
| HU-013 | 2 de 11 (C1, C7); el resto vive en P-041 | ✅ Cubierta | C1: la pestaña "Por decidir (1)" con el seed (`h-101` es la única `Submitted`) coincide con el `menuCounts` del menú y con P-010, que lee el mismo `hires-v1`. C7: tras decidir en P-041, o en el estado "Vacío", se ve "Por decidir (0)" y "No hay contrataciones por decidir." La nota RN-099 se muestra solo a la Junta (`if (p.board)`) |
| HU-014 | 4 de 10 (C4, C5, C6, C10); el resto vive en P-041 | ⚠️ Parcial | C4 ✅: Carla (`fin: false`) → `CH.deniedView()` (P-090) con la nota RN-015. **No se reproducen** C5 y C6 (vínculo `Owner` de Luis con `EndDate = 2026-12-15`): ninguna persona de `PERSONAS` tiene un vínculo vencido ni hay control de fecha-hora (obs. 2). **No se reproduce** C10 (Raúl, Concierge): `roles: ['marco','rosa','luis','ana','carla']` no incluye a `raul` (obs. 3) |

**HU Must faltantes en esta pantalla:** HU-012 no se puede validar desde su entrada: sin P-042 ni P-043, F8 no arranca (pasos 1–3).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-041 ⚠️ Q25 | Expediente visible para quien cumple `CanViewCondominiumFinancials`; Q25 decide si el propietario ve las no decididas | ✅ | `tabsFor()`: el propietario ve por defecto solo `['Approved']`, y con el control "Q25" ve también `['Submitted','Approved']`. Comportamiento por defecto según §6 punto 1 de la UI spec |
| RN-099 | Contador de `Submitted` para la Junta, también con 0 | ✅ | "Por decidir (n)" con `listFor(c,'Submitted').length`; el estado "Vacío" muestra "(0)"; `menuCounts` solo para `p.board` |
| RN-015 | Sin vínculo `Owner` no hay información financiera | ✅ | `if (!c.persona.fin)` → P-090 antes de pintar datos; el menú tampoco ofrece "Contrataciones" (`menuItems`, `if (p.fin)`) |
| RN-016 | Fin del último vínculo `Owner` → `403` desde la siguiente solicitud | ❌ | No hay persona ni control para un vínculo que termina (obs. 2) |
| RN-031 | Concierge → `403` en información financiera | ❌ | Raúl no se puede elegir en P-040; la ficha dice "Inquilino o Concierge → P-090" (obs. 3) |
| RN-096 | Solo `Draft`, `Submitted` y `Approved` | ✅ | `STATUS` tiene solo esos tres valores, con las etiquetas de §3.0.5 ("Borrador", "Enviada a la Junta", "Aprobada"); no existe un estado "Rechazada" |
| RN-098 | El rechazo devuelve a `Draft` | ✅ | En "Borradores", `dateLine()` muestra "Rechazada por la Junta Directiva el … · vuelve a Borrador" cuando `h.rejected` existe |
| RN-039 | Solo BoardMember decide | — | Se decide en P-041 (VL-P041) |
| RN-037, RN-038, RN-093, RN-097, RN-100 | Requisitos de la contratación y de sus cotizaciones | — | Se validan en P-041 o en P-042 (sin prototipo, obs. 1) |
| RN-042 | Proveedor sin cuenta ni invitación | ❌ | "Registrar proveedor" → P-043 simulada (obs. 1) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F8 1–3 · Administrator crea y envía | P-040 → "Nueva contratación" → P-042 | ❌ **Callejón sin salida:** "Navegación simulada · P-042 Crear o editar contratación" (obs. 1) |
| Registrar proveedor (HU-012 C7) | P-040 → "Registrar proveedor" → P-043 `?returnUrl=/supplier-hires` | ❌ **Callejón sin salida:** "Navegación simulada" (obs. 1) |
| Vacío de Borradores | "No hay borradores." → "Crear una contratación" → P-042 | ❌ Mismo callejón |
| F8 4 · Marco ve lo pendiente | P-010 "1 contratación por decidir" → "Revisar contrataciones →" → P-040 `?status=Submitted` → P-041 | ⚠️ Llega, pero con un paso más que F8 ("la abre" → P-041) (obs. 5) |
| F8 7 · Luis consulta | P-040 (pestaña inicial "Aprobadas") → P-041 `?id=h-098` | ✅ |
| Rosa (Administrator) | P-040 abre en "Borradores" (`defaultTab`) → `h-104`/`h-105` → P-041 con el panel "Preparar y enviar" | ✅ |
| Carla (inquilina) | P-040 → P-090 → "Ir al inicio" | ✅ |
| Cambio de rol en la banda | `tab = '-'` → vuelve a la pestaña inicial del nuevo rol | ✅ |
| Raúl (Concierge) | No se puede elegir | ❌ No reproducible (obs. 3) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | P-042 (Crear o editar contratación) y P-043 (Registrar proveedor) no tienen prototipo: "Nueva contratación", "Registrar proveedor" y "Crear una contratación" terminan en "Navegación simulada". Desde P-040 no se pueden validar la creación, la carga de cotizaciones, los montos (`QUOTE_AMOUNT_NOT_POSITIVE`, `AMOUNT_INVALID_PRECISION`), `HIRE_NOT_EDITABLE` ni el proveedor sin cuenta | gap | **Alta** | Prototipar P-042 (secciones 1–3, alerta de rechazo con el motivo, checklist, errores de monto, `Alert info` de `HIRE_NOT_EDITABLE`, éxito → P-041) y P-043 (RUC 11 dígitos, casilla de persona natural, "El proveedor no recibe una cuenta ni una invitación", vuelta a `returnUrl` con el proveedor preseleccionado) | HU-012 (C1–C12, C14), RN-037, RN-038, RN-042, RN-093, RN-097, RN-100, RN-052 |
| 2 | Ninguna persona tiene un vínculo `Owner` vencido: no se ven el `403` del 2026-12-16T00:00:00 ni el acceso del 2026-12-15T23:59 | gap | Media | Agregar una persona (p. ej. "Luis, vínculo con `EndDate = 2026-12-15`") y un control de fecha-hora simulada en la banda | HU-014 C5, C6, RN-016 |
| 3 | Raúl (Concierge) no está en `roles` de P-040, así que no se ve el P-090 que pide la ficha para el Concierge | gap | Media | Agregar `'raul'` a `roles`. El `render` ya lo enviaría a P-090 porque tiene `fin: false` | HU-014 C10, RN-031 |
| 4 | Visibilidad de los borradores para la Junta: P-040 no le muestra "Borradores", como dice la ficha, pero P-041 `canSee()` sí le deja leer un `Draft` (supuesto sin respaldo en la spec). Cuando Marco rechaza, la contratación desaparece de todas sus pestañas y solo la encuentra con el enlace directo. La matriz H3 da ✅ a Brd sin condición de estado | comprensión | Media | Decidir en la spec, junto con Q25, si la Junta ve los `Draft` (al menos los rechazados) y reflejarlo igual en P-040, P-041 y la matriz H3 | HU-013, RN-041 ⚠️ Q25, RN-098 |
| 5 | F8 paso 4 dice que Marco "la abre" desde P-010 y llega a P-041; el prototipo pasa por P-040 `?status=Submitted` | fricción | Baja | Con 1 contratación pendiente, enlazar directo al expediente; con más de 1, a la pestaña. O ajustar F8 | HU-013 C1, RN-099 |
| 6 | La paginación es fija ("Página 1 de 1"; anterior y siguiente deshabilitados) y no muestra cómo se ve con más de 20 contrataciones | mejora | Baja | Opcional: un estado "Muchas" en la banda | — (§3.6 P-040 "Pagination") |

### 5. Decisiones recomendadas antes de implementar

1. **Prototipar P-042 y P-043** y re-validar F8 de punta a punta, pasos 1–3 y 5b (obs. 1).
2. **Resolver Q25 y la visibilidad de los `Draft` para la Junta**, y fijar el mismo comportamiento en la matriz H3, P-040 y P-041 (obs. 4).
3. **Completar las personas del prototipo:** Raúl en `roles` y una persona con vínculo `Owner` vencido, con control de fecha-hora (obs. 2, 3).
4. **Ajustar F8 paso 4** o el enlace de P-010 (obs. 5). El punto 6 puede resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-040 cubiertas por completo | HU-013 ✅, HU-014 ⚠️, HU-012 ❌ → 1 de 3 | **33 %** (67 % con cobertura parcial) |
| Criterios observables desde P-040 | 7 (HU-012 C13; HU-013 C1, C7; HU-014 C4, C5, C6, C10): 3 ✅, 1 ⚠️, 3 ❌ | **43 %** (57 % con parcial) |
| Reglas de la ficha de P-040 reflejadas (RN-041, RN-099, RN-015) | 3 de 3 | **100 %** |
| Reglas aplicables reflejadas (8: RN-015, RN-016, RN-031, RN-041, RN-042, RN-096, RN-098, RN-099) | 5 ✅, 0 ⚠️, 3 ❌ | **63 %** |
| HU Must del lote (19) con presencia en P-040 | 3 de 19 | 16 % (referencial: una sola pantalla) |

---

## VL-P041 · P-041 Expediente de contratación

**Prototipo:** [prototypes/P-041-expediente-contratacion.html](prototypes/P-041-expediente-contratacion.html) (con [assets/shell.js](prototypes/assets/shell.js), datos `DATA.hires` y estado de sesión `hires-v1`)
**Ficha:** [09-ui-spec.md §3.6 P-041](09-ui-spec.md) · **Flujos:** F8 (pasos 3–7), F6/F7 (entrada desde P-031) · **HU declaradas:** HU-013, HU-014 (también tiene el panel del Administrator de HU-012)
**Veredicto:** **Pasa con observaciones.** HU-013 se valida casi completa: motivo obligatorio con `trim()`, vuelta a `Borrador`, historial que se agrega y no se borra, el `409` y el `422` simulados, y el Administrator sin panel de decisión. HU-014 se valida para Luis, Ana y Carla, y la Junta aparece siempre por cargo, nunca por nombre. Faltan: la corrección de 5b (P-042 sin prototipo, Alta), los bordes de HU-012 (no hay datos de ejemplo para ellos), el `403` del Concierge y del vínculo vencido, la precisión ISO de la fecha-hora y la decisión `404` frente a `403` para lo que Q25 oculta.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-041 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-013 | 9 de 11 (C1 y C7 se ven en P-010/P-040): 4 ✅, 5 ⚠️ | ⚠️ Parcial | ✅ C2 y C10: `form.decision === 'Rejected' && !form.reason.trim()` → `HIRE_REJECTION_REASON_REQUIRED` en el campo y en el resumen; "   " también falla. ✅ C3: `h.status = 'Draft'`, `entry.reason = form.reason.trim()`, `h.history.push(entry)`. ✅ C5: tras rechazar, reenviar como Rosa y aprobar, el historial muestra 2 entradas en orden. ⚠️ C4: el badge dice "Aprobada por la Junta Directiva" (cargo), pero `nowIso()` y `dtTag()` fijan los segundos en `:00` y la fecha es `TODAY` (04/11/2026), no 2026-11-25T21:03:10 (obs. 4). ⚠️ C6 y C11: el `403` del Administrator y de Ana se ve solo como ausencia del panel (`if (p.board && h.status === 'Submitted')`); el Administrator ve "Esperando la decisión de la Junta Directiva". ⚠️ C8 y C9: el panel no aparece en `Draft` ni en `Approved` (correcto); el `422 HIRE_NOT_SUBMITTED` solo se ve con el selector "Respuesta del servidor" en un expediente `Submitted` |
| HU-014 | 10 de 10: 5 ✅, 2 ⚠️, 3 ❌ | ⚠️ Parcial | ✅ C1: Luis ve `h-101` (después de F8), `h-098` o `h-092` con cotizaciones, montos, "Descargar PDF" (simulado, con `GET /api/supplier-hires/{id}/quotes/{quoteId}/document`) y justificación. ✅ C3: ni el seed ni `timeline()` tienen nombres; solo `DECISION[...]` por cargo. ✅ C4: Carla → P-090. ✅ C7: Ana ve el expediente aprobado. ✅ C8: `h-098` tiene una sola entrada "Aprobada por la Junta Directiva". ⚠️ C2: se muestra "Rechazada…" y "Aprobada…" con fecha-hora, pero sin segundos y con fechas del seed (29/10/2026) distintas a las de la HU (22/11 y 25/11); la HU muestra el rechazo solo con fecha (obs. 4). ⚠️ C9: la descarga de Carla solo existe como nota RN-107 en P-090; no se simula pedir el PDF directo. ❌ C5 y C6: no hay persona con vínculo vencido (VL-P040 obs. 2). ❌ C10: Raúl no está en `roles` (obs. 6) |
| HU-012 | 10 de 14 (C5, C7, C12 están en P-042/P-043; C13 en P-040): 2 ✅, 3 ⚠️, 5 ❌ | ❌ No validable | ✅ C1: tras el rechazo, Rosa envía "Pintura de fachada" → `Submitted` y aparece "Enviaste la contratación a la Junta Directiva.". ✅ C2: `h-104` (1 proveedor) → `HIRE_INSUFFICIENT_QUOTES` en el resumen, con "Corregir en Editar contratación". ⚠️ C6 y C11: fuera de `Draft` no hay "Editar" (correcto), pero el mensaje `HIRE_NOT_EDITABLE` vive en P-042. ⚠️ C14: se reenvía sin corregir, porque "Editar" → P-042 simulada; no se puede "adjuntar la garantía" (obs. 1). ❌ C3, C4, C8, C9, C10: la lógica es correcta (`new Set(h.quotes.map(q => q.ruc)).size >= 2`, `justification.trim().length >= 20`), pero no hay datos de ejemplo que la ejerciten: la justificación de `h-104` tiene 21 caracteres y cumple (obs. 2) |

**HU Must faltantes en esta pantalla:** ninguna de las que P-041 declara queda sin cobertura, pero ninguna se valida por completo. HU-012 depende de P-042 para C3–C5, C8–C10, C12 y C14.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-039 ⚠️ Q24 | Solo BoardMember decide, y solo en `Submitted`; los demás reciben `403` | ✅ | `decisionPanel()` solo si `p.board && h.status === 'Submitted'`. El Administrator en `Submitted` ve un `Alert info` "La administración no registra decisiones". El `422` `HIRE_NOT_SUBMITTED` se simula con el selector. Q24: "basta 1 miembro" está en la nota |
| RN-040 | Se agrega una entrada con decisión, motivo, cargo y fecha-hora ISO, sin borrar las anteriores | ⚠️ | `history.push(entry)` y nunca reemplaza; `<ol class="timeline">` ascendente. Pero `entry` no guarda `decidedByRole`, que va implícito en la etiqueta, y la fecha-hora pierde los segundos (`at: 'YYYY-MM-DDTHH:MM'`, `datetime="…:00-05:00"`) (obs. 4) |
| RN-098 | Motivo no vacío después de `trim`; `Rejected` → `Draft` | ✅ | Validación `!form.reason.trim()`; se guarda el motivo recortado; `h.status = 'Draft'`; alerta "La contratación volvió a Borrador para que la administración la corrija." |
| RN-099 | Contador de la Junta | ✅ | `menuCounts` recalcula con `hires.filter(h => h.status === 'Submitted').length` después de decidir; el estado "Vacío" muestra 0 |
| RN-041 ⚠️ Q25 ⚠️ Q34 | Expediente completo para `CanViewCondominiumFinancials`; decisiones por cargo | ⚠️ | ✅ Por cargo, con cotizaciones, PDF y justificación. ⚠️ Q25 simulado en `canSee()`. ⚠️ Q34: el proveedor persona natural (`h-105`, "Juan Pérez Gálvez", RUC 10456789012) se muestra en claro, con la nota "⚠️ Q34 · persona natural", solo en un `Draft` que los propietarios no ven (obs. 5) |
| RN-107 | Archivos solo por la API, con la misma política de acceso | ✅ | Botón con `aria-label="Descargar cotización de …"`, endpoint en el aviso simulado; sin URL directa al blob. "Sin documento" cuando `doc: null` |
| RN-015 | Sin `Owner` no hay financieros | ✅ | `!c.persona.fin` → P-090, también para descargar (nota RN-107) |
| RN-016 | Vínculo vencido → `403` | ❌ | Sin persona ni fecha simulada (VL-P040 obs. 2) |
| RN-031 | Concierge → `403` | ❌ | Raúl no está en `roles` (obs. 6). Además, la ficha y el código citan RN-031 como "sin nombres" (obs. 8) |
| RN-103 | `404` si es de otro condominio; `403` si es del mismo pero sin permiso | ⚠️ | El estado "No encontrado" muestra P-091 sin distinguir. Pero `canSee()` = `false` (propietario con `Submitted` sin Q25, o con `Draft`) también muestra P-091, aunque es un recurso del mismo condominio (obs. 3) |
| RN-037 ⚠️ Q23 ⚠️ Q30 | ≥ 2 proveedores distintos | ⚠️ | La lógica cuenta RUC distintos (`Set`). Solo se ejercita el caso de 1 proveedor (`h-104`); faltan "2 de Pinturas Lima SAC" y "3 con 2 repetidas" (obs. 2) |
| RN-038 | Justificación ≥ 20 caracteres sin espacios de los extremos | ⚠️ | La lógica `trim().length >= 20` es correcta, pero ningún dato de ejemplo la incumple (`h-104` tiene 21) (obs. 2) |
| RN-096 | Tres estados | ✅ | `STATUS` y `DECISION` separados: el rechazo es una decisión, no un estado |
| RN-097 | Fuera de `Draft` no se modifica | ⚠️ | El panel del Administrator solo aparece en `Draft`; en `Submitted` se ve "No puedes editarla mientras está enviada". `HIRE_NOT_EDITABLE` está en P-042 (obs. 1) |
| RN-052 | Nombre y RUC 10 de persona natural cifrados | — | Cifrado en reposo; no se verifica en un prototipo |
| RN-042, RN-093, RN-100 | Proveedor sin cuenta; montos | — | P-042/P-043 (obs. 1) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F8 4–5a · Marco rechaza | P-041 `?id=h-101` → "Rechazar" sin motivo → error; con motivo → "Registraste tu decisión", badge "Borrador", historial con 2 rechazos | ✅ Marco sigue viendo el expediente en `Draft` (`canSee` para `p.board`) |
| F8 5b · Rosa corrige y reenvía | P-041 (Rosa) → "Editar" → P-042 | ❌ **Callejón sin salida:** "Navegación simulada" (obs. 1). Rosa solo puede "Enviar a la Junta Directiva" sin corregir: `h-101` ya cumple el checklist |
| F8 5b · alternativa | P-041 (Rosa) → "Enviar a la Junta Directiva" → `Submitted` | ✅ Funciona, pero no reproduce "adjunta la garantía" |
| F8 6 · Marco aprueba | P-041 → "Aprobar" → `Approved`, sin paneles, historial con 3 entradas en orden | ✅ |
| F8 7 · Luis consulta | P-040 → P-041 → "Descargar PDF" | ✅ Descarga simulada |
| Envío inválido (`h-104`) | "Enviar a la Junta Directiva" → resumen `HIRE_INSUFFICIENT_QUOTES` → "Corregir en Editar contratación" → P-042 | ❌ **Callejón sin salida** (obs. 1) |
| Conflicto `409` | Selector "409" → `Alert warning` "Otro miembro de la Junta registró una decisión…", el panel desaparece | ✅ Conforme a la ficha. Solo simula "el otro aprobó" (obs. 9) |
| `422 HIRE_NOT_SUBMITTED` | Selector "422" → resumen con "Recarga la página para ver su estado actual." | ✅ |
| Propietario abre un `Submitted` sin Q25 | P-041 `?id=h-101` como Luis → P-091 "No encontrado" | ⚠️ `404` en lugar de `403` (obs. 3) |
| Desde un gasto | P-031 (gasto vinculado) → P-041 de una contratación `Approved` | ✅ |
| Volver | "← Contrataciones" o migas → P-040 sin `status` | ⚠️ Vuelve a la pestaña inicial, no a la de origen (obs. 13) |
| No encontrado / Error | P-091 → "Ir al inicio" o "Volver" (P-040); 500 → "Ir al inicio" | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | "Editar" y "Corregir en Editar contratación" llevan a P-042, que no tiene prototipo. F8 5b no se puede validar: la corrección tras el rechazo ("adjunta la garantía") no existe, ni la alerta de P-042 con el motivo del rechazo, ni `HIRE_NOT_EDITABLE`. Mismo origen que VL-P040 obs. 1 | gap | **Alta** | Prototipar P-042 en modo edición (`/supplier-hires/{id}/edit`), con la alerta del rechazo y la vuelta a P-041 | HU-012 (C3–C5, C8–C10, C12, C14), RN-097, RN-098 |
| 2 | Los datos de ejemplo no ejercitan los bordes de envío: la justificación de `h-104`, "Filtraciones en A-901", tiene **21** caracteres y cumple RN-038. Así, el ✗ de "Justificación de al menos 20 caracteres" de la ficha y `HIRE_JUSTIFICATION_TOO_SHORT` nunca se ven. Tampoco hay un borrador con 2 cotizaciones del mismo RUC ni con 3 cotizaciones de las que 2 son repetidas | gap | Media | Cambiar la justificación de `h-104` a "Mejor precio" (12) o agregar borradores: 2× Pinturas Lima SAC (C3), "Menor precio y plazo" (20, C8), "  Menor precio y plaz  " (19, C9) y 3 cotizaciones con 2 repetidas (C10) | HU-012 C3, C4, C8, C9, C10, RN-037, RN-038 |
| 3 | Si `canSee()` es falso (propietario con un `Submitted` sin Q25, o con un `Draft`), se muestra P-091 (`404`) y la nota cita RN-103. Pero RN-103 manda `403` cuando el recurso es del mismo condominio y el usuario no tiene permiso | gap | Media | Al resolver Q25, decidir: `403` (P-090), conforme a RN-103, o declarar en RN-041 que el filtro por estado responde `404` como "no visible"; corregir la nota del prototipo y agregar el criterio negativo a HU-014 | RN-103, RN-041 ⚠️ Q25, HU-014 |
| 4 | La fecha-hora de las decisiones pierde los segundos: el seed guarda `'2026-10-29T20:15'`, `nowIso()` arma `HH:MM` y `dtTag()` agrega `:00`. HU-013 C4 y HU-014 C2 citan `2026-11-25T21:03:10-05:00`, y §3.0.5 dice que los E2E leen el atributo `datetime`. Además, las fechas del seed (29/10/2026, hoy 04/11/2026) no coinciden con las de las HU (22/11 y 25/11), y HU-014 C2 muestra el rechazo solo con fecha | gap | Media | Guardar y mostrar en `datetime` el ISO completo con segundos; alinear el seed con las fechas de las HU (o anotarlo en la banda); unificar en HU-014 C2 el formato de las dos entradas | HU-013 C4, HU-014 C2, RN-040 |
| 5 | Proveedor persona natural: el único (`h-105`, "Juan Pérez Gálvez", RUC 10456789012) está en `Draft`, que solo ven el Administrator y la Junta. No hay un expediente `Approved` con persona natural para ver qué ve un propietario; el nombre y el RUC 10 se muestran en claro, sin regla por defecto mientras Q34 siga abierta | gap | Media | Agregar un expediente `Approved` con un proveedor persona natural y fijar en la ficha un comportamiento por defecto (visible mientras exista el expediente, o archivado o enmascarado a los 90 días) hasta resolver Q34 | HU-014, RN-041 ⚠️ Q34, RN-052 |
| 6 | Raúl (Concierge) no está en `roles` de P-041: no se puede ver el `403` de HU-014 C10 | gap | Media | Agregar `'raul'` a `roles` (`fin: false` → P-090) | HU-014 C10, RN-031 |
| 7 | No hay persona con vínculo `Owner` vencido ni fecha-hora simulada: el `403` del 2026-12-16T00:00 y el acceso del 2026-12-15T23:59 no se ven | gap | Media | Igual que VL-P040 obs. 2 | HU-014 C5, C6, RN-016 |
| 8 | Traza equivocada: la ficha de P-041 (`RN-031 (sin nombres)`) y el código (`RN-041 / RN-031: por cargo, nunca el nombre`) usan RN-031 para "sin nombres", pero RN-031 es "Concierge → `403`". La regla de "por cargo" es RN-041 | comprensión | Baja | Corregir la ficha de §3.6 P-041 y las notas del prototipo: "RN-041 (por cargo)" y "RN-031 (Concierge → P-090)" | RN-031, RN-041 (§3.6 P-041) |
| 9 | El `409` (dos miembros deciden a la vez) está en la ficha, pero no tiene RN ni criterio en HU-013, y el prototipo solo simula "el otro aprobó". No se define qué pasa si uno aprueba y otro rechaza al mismo tiempo (también lo señala la reauditoría-2) | gap | Media | Crear la RN de concurrencia de decisiones (control optimista, `409`, recarga) y su criterio en HU-013; en el selector, agregar "409 · el otro rechazó" | HU-013, RN-039 ⚠️ Q24 (§3.6 P-041 Estados, sin RN propia) |
| 10 | El error "Elige si la Junta Directiva aprueba o rechaza." no tiene código ni está en §3.0.6 | comprensión | Baja | Agregar el código y su texto a §3.0.6 (p. ej. `HIRE_DECISION_REQUIRED`), o declarar que el radio es `required` y lo valida el servidor como `422` genérico | HU-013 (§3.0.6) |
| 11 | Si se elige "Aprobar" con texto en "Motivo", el texto se descarta en silencio (`entry.reason` solo se guarda en `Rejected`) | comprensión | Baja | Definir si la aprobación admite comentario; si no, aclararlo en el hint ("solo se guarda si rechazas") | RN-040, HU-013 |
| 12 | Los `403` de decidir (Administrator, Ana) solo se ven como ausencia del panel; el selector "Respuesta del servidor" no ofrece `403` | mejora | Baja | Agregar "403" al selector `srv` para mostrar P-090 al enviar la decisión | HU-013 C6, C11, RN-039 |
| 13 | "← Contrataciones" y las migas vuelven a P-040 sin `status`: se pierde la pestaña de origen (p. ej. Rosa en "Aprobadas" vuelve a "Borradores") | fricción | Baja | Propagar `status` en el enlace de vuelta | — (§3.6 P-040 Ruta) |
| 14 | "Editar" simula `/supplier-hires/new (id=…)`: `SCREENS` de `shell.js` solo tiene la ruta de creación de P-042, no `/supplier-hires/{id}/edit` | comprensión | Baja | Agregar la ruta de edición al inventario del prototipo | HU-012 (§3.6 P-042) |

### 5. Decisiones recomendadas antes de implementar

1. **Prototipar P-042 en modo edición** y re-validar F8 5b con la corrección real (obs. 1; junto con VL-P040 obs. 1).
2. **Agregar datos de ejemplo de borde para HU-012** (justificación de 12, 19 y 20 caracteres; 2 cotizaciones del mismo RUC; 3 con 2 repetidas) (obs. 2).
3. **Decidir `403` o `404` para lo que Q25 oculta** y escribirlo en RN-041/RN-103 y en la matriz H3 (obs. 3).
4. **Fijar el ISO con segundos** en el historial y alinear las fechas del seed con HU-013/HU-014 (obs. 4).
5. **Fijar un comportamiento por defecto para Q34** y agregar un expediente aprobado con proveedor persona natural (obs. 5).
6. **Crear la RN de concurrencia de decisiones** (`409`) y su criterio en HU-013 (obs. 9).
7. **Completar las personas** (Raúl y un vínculo vencido) y **corregir la traza de RN-031** en la ficha (obs. 6, 7, 8). Los puntos 10 a 14 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-041 cubiertas por completo | HU-013 ⚠️, HU-014 ⚠️ → 0 de 2 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-013 y HU-014 observables desde P-041 | 19 (9 + 10): 9 ✅, 7 ⚠️, 3 ❌ | **47 %** (84 % con parcial) |
| Criterios de HU-012 observables desde P-041 | 10: 2 ✅, 3 ⚠️, 5 ❌ | **20 %** (50 % con parcial) |
| Reglas de la ficha de P-041 reflejadas (7: RN-039, RN-040, RN-098, RN-099, RN-041, RN-031, RN-107) | 4 ✅ (RN-039, RN-098, RN-099, RN-107), 2 ⚠️ (RN-040, RN-041), 1 ❌ (RN-031) | **57 %** (86 % con parcial) |
| Reglas aplicables reflejadas (15: RN-015, RN-016, RN-031, RN-037, RN-038, RN-039, RN-040, RN-041, RN-052, RN-096, RN-097, RN-098, RN-099, RN-103, RN-107) | 6 ✅, 6 ⚠️, 2 ❌, 1 no verificable (RN-052) | **40 %** completas · **80 %** con parciales |
| HU Must del lote (19) con presencia en P-041 | 3 de 19 (HU-012, HU-013, HU-014) | 16 % (referencial: una sola pantalla) |

---

## VL-P006 · P-006 Activar cuenta por invitación

**Prototipo:** [prototypes/P-006-activar-cuenta.html](prototypes/P-006-activar-cuenta.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.1 P-006](09-ui-spec.md) · **Flujos:** F1 (pasos 1, 2, 2a, 2b) · **HU declaradas:** HU-002
**Veredicto:** **Pasa con observaciones.** Los 12 criterios de HU-002 se pueden reproducir. Con el selector "Momento de uso" se fijan la emisión en 01/12/2026 10:00:00 y los instantes de los criterios C1, C2 y C6, y se prueba el caso de una invitación que vence mientras la persona escribe. Los tres códigos de invitación tienen su propio texto, como pide RN-165 reajustada. Las observaciones están en lo que la ficha no define: qué ve la persona al volver con la sesión iniciada (RN-122), qué pasa si vuelve con otra cuenta, y el `maxlength=64`, que recorta en silencio una contraseña pegada.

**Verificación:** el código se leyó completo. En Edge sin interfaz se recorrieron los 6 tokens de la demo, las 7 contraseñas de muestra, los momentos C2, C6 y "vence mientras escribe", el rechazo al reabrir un enlace ya usado (C10) y la ida y vuelta de C12 por P-001. Ver el anexo de evidencia.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-006 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-002 | 12 de 12 | ✅ Cubierta | C1: `LosOlivos-2026` (14 caracteres) → P-007 `?role=carla` ("Antes de empezar: tus datos"). C2: con el momento 08/12/2026 10:00:01 (604,801 s) → "Esta invitación venció…", sin formulario. C6: a las 10:00:00 (604,800 s) se muestra el formulario. C3: 11 caracteres → `PASSWORD_LENGTH_INVALID`. C4: 65 caracteres → `PASSWORD_LENGTH_INVALID`, pero solo con el botón de la banda, porque el campo tiene `maxlength=64` (obs. 3). C5: `password1234` → `PASSWORD_BREACHED`. C7: `edificio2026` (12), C8: 64 caracteres y C9: `mi edificio tiene piscina` → P-007. C10: al reabrir `inv-carla-ok` después de aceptarla → `INVITATION_ALREADY_USED` con el texto de HU-002. C11: `inv-anulada` (Raúl) → "Esta invitación fue anulada…". C12: `k9F2xQ7mTb` → `Alert info` sin formulario y "Iniciar sesión" → P-001 `?returnUrl=%2Finvitations%2Fk9F2xQ7mTb` |
| HU-002B | Entrada a P-007 (C1 de HU-002) | — | Se revisa en VL-P007. P-006 solo lleva hasta allí |

La cifra de su constructor (12 de 12) **se confirma**. Hay dos matices: C4 solo se reproduce con la banda, y lo que sigue a C12 después de iniciar sesión es provisional (obs. 1).

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-007 | Cuenta solo por invitación | ✅ | El formulario solo existe con una invitación vigente. Con un enlace no válido no hay formulario |
| RN-009 | Hash Argon2id | — | Se hace en el servidor; no se verifica en un prototipo |
| RN-110 | Vence a los 604,800 s | ✅ | Se compara con `>`: 604,800 s es vigente y 604,801 s está vencida. Se vuelve a validar al enviar (estado "vence mientras escribe") |
| RN-116 | 12–64 caracteres, sin reglas de composición | ⚠️ | Rechaza 11 y 65, acepta 12, 25 y 64 y no pide composición. Pero `maxlength=64` recorta en silencio lo que se pega, y P-001 no tiene ese límite (obs. 3) |
| RN-117 | Lista local de filtradas | ✅ | Lista local de 6 entradas; ninguna llamada externa |
| RN-122 | Si la cuenta ya existe, iniciar sesión para aceptar | ⚠️ | La ida a P-001 con `returnUrl` funciona. La vuelta con la sesión iniciada es una vista provisional que la ficha no define, y no se define qué pasa si vuelve con otra cuenta (obs. 1 y 2) |
| RN-138 / RN-139 | Invitación anulada → `INVITATION_REVOKED` | ✅ | Funciona al abrir el enlace. Al enviar solo se vuelven a validar el vencimiento y el uso, no la anulación (obs. 5) |
| RN-165 (reajustada) | Un solo uso; cada código con su propio texto | ✅ | Tres textos distintos de §3.0.6, sin formulario. Ningún texto revela si existe una cuenta |
| RN-153 | No revelar si la cuenta existe | ⚠️ | Los tres estados de invitación no válida cumplen. La vista de cuenta existente (F1 2b) sí lo revela a quien tenga el enlace. La spec lo acepta, pero no lo declara como excepción (obs. 4) |
| RN-102 | `422` + código + texto de recursos | ✅ | Resumen con `role="alert"` y el foco en él (verificado: `activeElement` = `alert alert-danger`); error en el campo; el campo vuelve vacío |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F1 pasos 1 → 2 · Carla, invitación vigente | P-006 `?token=inv-carla-ok` → P-007 | ✅ El token queda marcado como usado en `invitations-used-v1` |
| F1 paso 2 con contraseña rechazada | P-006 → mismo P-006 con el error | ✅ Campo vacío, resumen con foco |
| F1 2a · vencida / usada / anulada | P-006 sin formulario, con el enlace "Ir a iniciar sesión" | ✅ Pero el enlace no le sirve a quien aún no tiene cuenta (obs. 6) |
| F1 2a · vence mientras escribe | Se abre a las 09:59:30 y se envía a las 10:00:01 → `INVITATION_EXPIRED` | ✅ La nota RN de ese estado muestra "604,770 s > 604,800 s", que es falso (obs. 8) |
| F1 2b · Ana con cuenta en otro condominio | P-006 → P-001 `returnUrl=/invitations/k9F2xQ7mTb` → P-006 "Invitación aceptada" → P-005 | ⚠️ La vuelta con la sesión iniciada es provisional (obs. 1) |
| F1 2b · vuelve con otra cuenta (`role=carla`) | P-006 cambia la sesión a Ana y muestra otra vez "Ya tienes una cuenta…" | ⚠️ La spec no define el caso, y el prototipo cambia de persona en silencio (obs. 2) |
| F1 paso 3 | P-007 → P-010 | Se revisa en VL-P007 |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La ficha no define qué ve la persona al volver de P-001 con la sesión iniciada. El prototipo inventa "Invitación aceptada · Agregamos Torres del Parque a tu cuenta" y "Continuar" → P-005, y lo marca como provisional. Tampoco se define si la invitación se acepta al volver (`GET`) o con un botón (`POST`), ni el paso por P-007 del condominio nuevo (RN-010) | gap | Media | Agregar a la ficha de P-006 el estado "Aceptar con sesión iniciada": botón "Aceptar invitación" (`POST`), mensaje de éxito y destino (P-007 del condominio nuevo si falta el consentimiento; si no, P-005 o P-010). Agregar el paso 2c a F1 | HU-002 C12, RN-122, RN-064, RN-010 |
| 2 | No se define qué pasa si la persona vuelve a `/invitations/{token}` con la sesión de **otra** cuenta: con `role=carla`, el prototipo cambia la sesión a Ana y muestra "Ya tienes una cuenta…". En el producto, unir la invitación a la cuenta equivocada contradice RN-122 | gap | Media | Definir en RN-122 y en la ficha que solo se acepta si el correo de la sesión coincide con el de la invitación; si no, se muestra un mensaje neutro ("Esta invitación es para otra cuenta. Cierra sesión e inicia con la cuenta correcta.") y no se une nada. Agregar un criterio negativo a HU-002 | HU-002 C12, RN-122, RN-153 |
| 3 | La ficha pide `maxlength=64`. El navegador recorta en silencio una contraseña pegada de más de 64 caracteres y la cuenta queda con los primeros 64, mientras que P-001 no tiene `maxlength` y envía la contraseña completa. Además, `maxlength` cuenta unidades UTF-16 y la validación del prototipo cuenta puntos de código, así que una contraseña con emoji puede medir distinto. C4 (65 caracteres → `422`) solo se reproduce con la banda | gap | Media | Quitar `maxlength` del campo de P-006 y dejar que el servidor responda `PASSWORD_LENGTH_INVALID` (ASVS V2.1: no truncar). Fijar en RN-116 la unidad de medida (puntos de código Unicode, tras normalizar a NFC) | HU-002 C4, RN-116, RN-074 |
| 4 | RN-165 dice que ninguno de los mensajes revela si existe una cuenta con ese correo, pero la vista de F1 2b ("Ya tienes una cuenta en CondoHub con este correo") sí lo revela a quien tenga el enlace. La spec lo acepta de forma implícita (RN-122), pero no lo declara | comprensión | Baja | Agregar a RN-153 o a RN-122 que la vista de cuenta existente es una excepción aceptada, porque quien tiene el enlace es la persona invitada, y que no se muestra si la invitación ya no es válida (el prototipo ya lo hace: vencida antes que existente) | RN-153, RN-165, RN-122 |
| 5 | Al enviar, el prototipo vuelve a validar el vencimiento y el uso, pero no la anulación. La ficha no dice que el `POST` vuelve a validar los tres estados | gap | Baja | Agregar a la ficha: el `POST /accept` vuelve a evaluar RN-110, RN-139 y RN-165 y, si falla, muestra el estado de invitación no válida | RN-138, RN-139, HU-002 C11 |
| 6 | En el estado de invitación no válida, el único enlace es "Ir a iniciar sesión", que no le sirve a una persona que aún no tiene cuenta, el caso más común en una invitación vencida | fricción | Baja | Mantener el texto ("Pide una nueva a la administración") y cambiar el enlace por uno que solo se muestre como secundario, o explicar "Si ya tienes una cuenta, inicia sesión" | HU-002 C2, C10, C11, RN-110 |
| 7 | La ficha no define el `h1` de los estados de invitación no válida y de cuenta existente. El prototipo usa "Invitación no válida" y "Acepta la invitación" como provisionales | gap | Baja | Fijar los títulos en la ficha (WCAG 2.4.2 y 2.4.6) | HU-002, RN-054 |
| 8 | La nota RN del estado "vence mientras escribe" muestra "604,770 s > 604,800 s": usa el instante en que se abrió el enlace y no el del envío, que es de 604,801 s | comprensión | Baja | En `invalidView`, cuando el error viene del envío, usar `secs(inv.issued, inv.submitAt)` | RN-110 |
| 9 | La ficha atribuye a RN-110 "12–64 caracteres, sin reglas de composición, lista local de filtradas", pero eso es de RN-116 y RN-117. RN-110 es el vencimiento | comprensión | Baja | Corregir la fila "Reglas" de la ficha de P-006 | RN-110, RN-116, RN-117 |
| 10 | HU-002 dice "persona invitada a ser Resident o NonResidentOwner", pero la ficha incluye a Concierge y C11 usa a Raúl como Concierge | comprensión | Baja | Agregar Concierge al "Como…" de HU-002 | HU-002 C11, RN-139 |
| 11 | La página de error `500` ofrece "Volver a intentar". §3.0.4 pide "enlace a Inicio", que no existe sin sesión (mismo caso que VL-P001 obs. 13) | comprensión | Baja | Aclarar en §3.0.4 que en las páginas de acceso el enlace es a P-001 | — (§3.0.4) |

### 5. Decisiones recomendadas antes de implementar

1. **Definir la aceptación con sesión iniciada y el caso de otra cuenta** (paso 2c de F1, ficha de P-006 y un criterio negativo en HU-002) (obs. 1 y 2).
2. **Quitar `maxlength=64` del campo de contraseña** y fijar en RN-116 cómo se cuentan los caracteres (obs. 3).
3. **Declarar en RN-153 la excepción de la vista de cuenta existente** (obs. 4).
4. Las obs. 5 a 11 se pueden resolver al editar la ficha.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-006 cubiertas por completo | HU-002 ✅ → 1 de 1 | **100 %** |
| Criterios de HU-002 reproducibles | 12 de 12 (C4 solo con la banda) | **100 %** (cifra del constructor confirmada) |
| Reglas de la ficha de P-006 reflejadas (RN-007, RN-110, RN-116, RN-117, RN-122, RN-165) | 4 completas + 2 parciales (RN-116, RN-122) | **67 %** (100 % con parciales) |
| Reglas aplicables reflejadas (12: RN-007, RN-009, RN-054, RN-102, RN-110, RN-116, RN-117, RN-122, RN-138, RN-139, RN-153, RN-165) | 7 completas, 3 parciales, 2 no verificables (RN-009, RN-054) | **58 %** completas · **83 %** con parciales |

---

## VL-P060 · P-060 Áreas comunes (administración)

**Prototipo:** [prototypes/P-060-areas-comunes-admin.html](prototypes/P-060-areas-comunes-admin.html) (con [assets/shell.js](prototypes/assets/shell.js))
**Ficha:** [09-ui-spec.md §3.8 P-060](09-ui-spec.md) · **Flujos:** F10 (paso 1 y regreso del paso 2) · **HU declaradas:** HU-004
**Veredicto:** **Pasa con observaciones.** La lista cumple su ficha. Los valores salen de `areas-v1`, en segundos, con los formatos "4 h 30 min", "30 días 12 h" y "1 min". Tiene el aviso de éxito con `role="status"`, la fila con `#area-{id}` y el foco en ella, el estado vacío y la respuesta P-090 con `COMMON_AREA_CONFIG_FORBIDDEN` para Marco, Ana y Raúl, sin el ítem en su menú. La banda prueba RN-162 y una reserva nueva (C8, C13). Las observaciones son de datos y de textos de la banda: los datos del escenario no permiten demostrar C7, y la banda todavía dice que P-011 y P-012 no leen la configuración.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-060 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-004 | 6 (C1 consulta, C6, C7, C8, C12, C13) | ⚠️ Parcial | C6 y C12: Ana y Marco → "No tienes acceso a esta página" con `P-090 · 403 · COMMON_AREA_CONFIG_FORBIDDEN · RN-159`; el menú de Marco no tiene "Áreas comunes" ✅. C8: después de bajar el aforo del salón a 30, la banda da `422 RESERVATION_EXCEEDS_CAPACITY` con 31 personas el 19/12 ✅. C13: después de cerrar el salón a las 22:00, la banda marca r-8841 (19:00–23:00) como "fuera del horario nuevo → sigue Confirmada", y la reserva de 21:00 a 23:00 da `RESERVATION_OUTSIDE_OPENING_HOURS` ✅. **C7 ⚠️:** r-8841 tiene 30 personas y no 40, así que con aforo 30 ninguna reserva lo supera y la banda no muestra el caso (obs. 1). **C1 ⚠️:** la lista muestra los cinco valores, pero la creación de la Parrilla falla en P-061 (VL-P061 obs. 1) |

**HU Must faltantes en esta pantalla:** ninguna; HU-004 se completa con P-061.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-159 | Solo el Administrator configura | ✅ | P-090 con el código para BoardMember, residentes y Concierge; el ítem no aparece en su menú (`menuItems`) |
| RN-162 | Los cambios no tocan las reservas `Confirmed` | ⚠️ | El aviso de éxito lo dice, y la banda lo demuestra para el horario (C13), pero no para el aforo (C7, obs. 1). Si se renombra el área, las reservas existentes desaparecen de la banda (VL-P061 obs. 2) |
| RN-023 | Aforo en una reserva nueva | ✅ | Banda: 31 > 30 → `422` (C8) |
| RN-021 | Horario en una reserva nueva | ✅ | Banda: 21:00–23:00 con cierre a las 22:00 → `422` (C13) |
| RN-079 | Anticipación por instante | ⚠️ | El mensaje de la banda no lleva la hora límite que exige §3.0.6 desde la iteración 2 (obs. 3) |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F10 paso 1 · Rosa | P-060 → "Editar Parrilla" → P-061 `?id=a-parrilla`; "Nueva área" → P-061 sin id | ✅ |
| F10 paso 2 (regreso) | P-061 Guardar → P-060 `?saved=a-parrilla#area-a-parrilla`, "Guardaste la Parrilla. Los cambios aplican a las reservas nuevas." | ✅ Foco en la fila resaltada |
| Sin áreas | Estado "Sin áreas" → EmptyState + "Nueva área" | ⚠️ El estado solo cambia la vista: P-061 sigue teniendo el Salón y la Parrilla, así que "crear la primera área" no se puede recorrer (obs. 2) |
| Marco, Ana o Raúl abren `/admin/common-areas` | P-090 | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | HU-004 C7 dice "Ana tiene el salón `Confirmed` el 2026-12-12 de 19:00 a 23:00 **con 40 personas**", pero r-8841 tiene 2 + 28 = 30 personas (P-015: "30 de 30"). Al bajar el aforo a 30 ninguna reserva lo supera, y la banda no puede demostrar que una reserva por encima del aforo nuevo sigue `Confirmed` | gap | Media | Alinear los datos: subir r-8841 a 2 + 38 invitados (40 personas, como RN-023 y RN-162), o agregar una reserva del salón con 40 personas, y verificar que P-015 la muestre "40 de 30" sin cambiar el estado | HU-004 C7, RN-162 |
| 2 | El estado "Sin áreas" es solo visual: "Nueva área" lleva a P-061 con el Salón y la Parrilla todavía en `areas-v1`, así que no se puede recorrer el alta de la primera área ni C1 tal como está escrito (VL-P061 obs. 1) | gap | Baja | Que el estado "Sin áreas" vacíe `areas-v1` (con aviso en la banda) o que P-061 tenga un escenario "condominio sin áreas" | HU-004 C1, F10 |
| 3 | La banda "Comprobar" responde `RESERVATION_TOO_FAR_AHEAD` con "Solo puedes reservar hasta el {fecha}.", sin la hora límite que §3.0.6 exige desde la iteración 2 | comprensión | Baja | Usar el mismo texto que P-012: "…hasta el {fecha} a las {hora}." | RN-079, §3.0.6 |
| 4 | La banda y el comentario del código siguen diciendo "Sesión: sessionStorage ch:areas-v1 (P-011/P-012 aún no lo leen)", pero `shell.js` (`applyAreasSession`) ya aplica `areas-v1` sobre `CH.DATA.areas` (verificado: P-011 y P-012 muestran el aforo y el horario nuevos) | comprensión | Baja | Corregir la nota de P-060 y la de P-061 | HU-004 |
| 5 | Después de un cambio que deja reservas `Confirmed` fuera de la regla nueva (C13: r-8841 termina a las 23:00 y el área cierra a las 22:00), el Administrator no tiene en la UI ninguna forma de saber cuáles son. HU-004 dice que, si quiere anularlas, las cancela de forma explícita (HU-008), pero no le dice cuáles | mejora | Baja | Evaluar que el aviso de éxito diga "N reservas confirmadas no cumplen la configuración nueva" con un enlace a P-062 filtrado. No es Must | HU-004 (Notas), RN-162, HU-008 |

### 5. Decisiones recomendadas antes de implementar

1. **Alinear los datos del escenario con HU-004 C7:** que la reserva del salón del 12/12 tenga 40 personas (obs. 1).
2. **Permitir un escenario sin áreas** para recorrer el alta de la primera área (obs. 2, junto con VL-P061 obs. 1).
3. Corregir los textos de la banda (obs. 3 y 4). La obs. 5 es opcional.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-060 cubiertas por completo | HU-004 ⚠️ → 0 de 1 | **0 %** (100 % con parcial) |
| Criterios de HU-004 observables desde P-060 | 4 completos (C6, C8, C12, C13) + 2 parciales (C1, C7) de 6 | **67 %** (100 % con parciales) |
| Reglas de la ficha de P-060 reflejadas (RN-159) | 1 de 1 | **100 %** |
| Reglas aplicables reflejadas (6: RN-021, RN-023, RN-054, RN-079, RN-159, RN-162) | 3 completas, 2 parciales, 1 no verificable (RN-054) | **50 %** completas · **83 %** con parciales |

---

## VL-P061 · P-061 Configurar área común

**Prototipo:** [prototypes/P-061-configurar-area.html](prototypes/P-061-configurar-area.html) (con [assets/shell.js](prototypes/assets/shell.js); efecto en [P-011](prototypes/P-011-areas-comunes.html) y [P-012](prototypes/P-012-nueva-reserva.html) por `areas-v1`)
**Ficha:** [09-ui-spec.md §3.8 P-061](09-ui-spec.md) · **Flujos:** F10 (pasos 1, 2 y 2a) · **HU declaradas:** HU-004
**Veredicto:** **Pasa con observaciones (condicionado a la obs. 2).** El formulario cumple su ficha:
- `COMMON_AREA_INVALID_OPENING_HOURS` en el `fieldset` del horario.
- `COMMON_AREA_INVALID_LIMITS` en el campo afectado, con conversión a segundos y múltiplo de 60.
- `FIELD_REQUIRED` por campo (RN-172) y `COMMON_AREA_NAME_DUPLICATE` sin distinguir mayúsculas, tildes ni espacios (RN-171).
- `412` con los valores recargados y un ETag nuevo.
- `403` para quien no es Administrator.

Pero la cifra de su constructor (13 de 13) **no se confirma: son 11 de 13**. C1 tal como está escrito da `COMMON_AREA_NAME_DUPLICATE`, porque la Parrilla ya existe, y C7 no tiene datos que lo demuestren (VL-P060 obs. 1). Además, el efecto de la configuración en P-011 y P-012 tiene dos defectos:
- Al renombrar un área, las reservas confirmadas se desligan y P-012 deja reservar encima de ellas (**Alta**).
- La anticipación se trunca a días enteros.

### 1. Cobertura de HUs

| HU | Criterios observables (P-061 + efecto en P-060, P-011 y P-012) | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-004 | 11 de 13 completos, 2 parciales | ⚠️ Parcial (la iteración 2 la daba como ✅) | ✅ C2 (20:00 a 02:00) y C3 (11:00 a 11:00) → `OPENING_HOURS`, `fieldset` marcado. ✅ C4 (aforo 0), C5 (4 h 0.5 min = 14,430 s) y C11 (−1) → `LIMITS`. ✅ C6 y C12 → P-090 con el código. ✅ C8 → P-012 con 31 personas: "Son 31 personas y el aforo es 30. Quita 1.". ✅ C9 → se guardan aforo 1, 60 s, 60 s y 1 por mes (la fila muestra "1 min"). ✅ C10 → 11:00 a 11:01 se guarda. ✅ C13 → P-012 de 21:00 a 23:00 da "fuera del horario del área (09:00 a 22:00)", y P-015 sigue mostrando r-8841 "Confirmada" de 19:00 a 23:00. **⚠️ C1:** el preset "C1 · crear la parrilla" en `/new` da "Ya hay un área común con ese nombre." (`422 COMMON_AREA_NAME_DUPLICATE`), no `201` (obs. 1). **⚠️ C7:** sin una reserva de 40 personas (VL-P060 obs. 1) |

**HU Must faltantes en esta pantalla:** ninguna, pero HU-004 queda ⚠️ y no ✅ como dice el resumen de la iteración 2.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-082 | Cierre posterior a la apertura, el mismo día | ✅ | Comparación `HH:MM`; error en el `fieldset` del horario con el texto de §3.0.6 |
| RN-160 | Enteros > 0; duración y anticipación múltiplos de 60 s | ✅ | `posInt` y `okSecs` sobre los segundos que se envían; la banda muestra "se envía maxDurationSeconds = 14,430 s" |
| RN-159 | Solo el Administrator | ✅ | P-090 para Ana, Marco y Raúl (verificado) |
| RN-171 (nueva) | Nombre único sin distinguir mayúsculas, tildes ni espacios | ✅ | `normName` (trim + NFD + minúsculas). Estado "parrilla" → `COMMON_AREA_NAME_DUPLICATE` |
| RN-172 (nueva) | `FIELD_REQUIRED` por campo, también si solo tiene espacios | ✅ | Estado "Campos vacíos": nombre "  " → "Completa el nombre del área." más un error por cada hora y cada número vacíos |
| RN-162 | La configuración nueva solo aplica a las reservas nuevas | ⚠️ | `Alert info` en el formulario. P-015 conserva r-8841. **Pero** al renombrar el área, las reservas existentes quedan desligadas (obs. 2) |
| RN-024 | No hay cruces entre franjas `Confirmed` | ❌ (efecto) | Después de renombrar la Parrilla, P-012 muestra el 06/12 "Libre todo el día" y no da `RESERVATION_OVERLAP` sobre r-8902 (obs. 2) |
| RN-079 | Anticipación por instante | ⚠️ (efecto) | `shell.js` convierte `maxAdvanceSeconds` en `advanceDays` enteros: con 1 h, P-012 limita a "hasta el 04/11/2026 a las 10:30" y no a las 11:30; con 30 días y 12 h, rechaza el 04/12 a las 20:00 (obs. 3) |
| RN-023 | Aforo en una reserva nueva | ✅ (efecto) | P-012 usa el aforo guardado (C8) |
| RN-021 | Franja dentro del horario | ✅ (efecto) | P-012 usa el cierre guardado (C13) |
| RN-102 | `422` + código + mensaje | ✅ | Resumen con `role="alert"` y foco, error junto al campo, valores conservados |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F10 paso 2 · editar | P-061 `?id=a-parrilla` → Guardar → P-060 `?saved=a-parrilla#area-a-parrilla` | ✅ |
| F10 paso 2 · crear (C1) | P-061 `/new` + preset C1 → `422 COMMON_AREA_NAME_DUPLICATE` | ⚠️ Solo se llega a `201` con otro nombre (obs. 1) |
| F10 2a · `412` | Casilla "Otra persona guarda…" → "Otra persona cambió estos datos. Revisa la versión actual.", aforo recargado (12), ETag `W/"2"`; al guardar de nuevo → P-060 | ✅ |
| Área inexistente | `?id=` desconocido → P-091 con foco en el `h1` | ✅ |
| Efecto en P-011 (C9: anticipación 60 s) | Tarjeta de la Parrilla: "Máximo 0 h 1 min · Reserva con hasta **0 días** de anticipación" | ⚠️ Texto falso (obs. 3) |
| Efecto en P-012 (duración 4 h 30 min) | Encabezado "máx. **4 h**"; la ayuda dice "Máximo 4 h 30 min" | ⚠️ Contradicción en la misma página (obs. 4) |
| Efecto en P-012 tras renombrar | "Parrilla techada" el 06/12: "Libre todo el día", sin `RESERVATION_OVERLAP` (el control sin renombrar sí lo da) | ❌ (obs. 2) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | HU-004 C1 ("el Administrator crea la parrilla… → `201`") no se reproduce. El escenario ya tiene la Parrilla, y RN-171 (nueva) rechaza el nombre, así que el preset "C1 · crear la parrilla" da `422 COMMON_AREA_NAME_DUPLICATE`. No hay forma de borrar un área ni de partir de un condominio sin áreas (VL-P060 obs. 2). El constructor reportó 13 de 13 | gap | Media | Dar un escenario "condominio sin áreas" para C1 (o que el preset de C1 cree el área en un condominio vacío), y corregir la cifra de la iteración 2 a 11 de 13 | HU-004 C1, RN-171 |
| 2 | **El prototipo liga las reservas al área por su nombre** (`r.area === a.name`) y no por su id. Si el Administrator renombra la Parrilla, cosa que RN-171 permite, P-012 la muestra libre el 06/12 aunque r-8902 (13:00–17:00) y r-8955 (17:00–21:00) están `Confirmed`, y no da `RESERVATION_OVERLAP`. El cupo mensual (RN-080) deja de contar sus reservas, y la banda de P-060 dice "Parrilla techada: ninguna". Un validador que pruebe un cambio de nombre ve una doble reserva | gap | **Alta** | En el prototipo, ligar las reservas por `areaId` (P-012 `busy` y `used`, P-060 `confirmedOf`) y mostrar el nombre actual. En la spec, que la ficha de P-061 diga que renombrar no cambia las reservas existentes (RN-162) y que estas muestran el nombre nuevo | RN-024, RN-080, RN-162, HU-006, HU-004 |
| 3 | `shell.js` (`applyAreasSession`) convierte `maxAdvanceSeconds` en `advanceDays = floor(s / 86400)`, y P-011 y P-012 trabajan con días enteros. Con C9 (60 s), P-011 dice "hasta 0 días de anticipación". Con 1 h, P-012 pone el límite en hoy a las 10:30 en lugar de las 11:30. Con 30 días y 12 h, rechaza el 04/12 a las 20:00, que está dentro de la anticipación (verificado). Contradice RN-079 por instante, pero solo con configuraciones que no son días enteros. Ningún criterio las usa salvo C9, cuyo efecto es de 1 minuto. Por eso es Media | gap | Media | Pasar `maxAdvanceSeconds` a `DATA.areas` y calcular el límite como `CH.NOW + maxAdvanceSeconds`. En P-011, formatear como en P-060 ("1 h", "30 días 12 h") | HU-004 C9, RN-079, HU-005 |
| 4 | El encabezado de P-012 calcula la duración con `parseInt(a.maxHours)`: con 4 h 30 min dice "máx. 4 h" y con C9 dice "máx. 0 h", mientras la ayuda de la misma página dice "Máximo 4 h 30 min" | comprensión | Baja | Usar el mismo formato que la ayuda (`a.maxHours`) | HU-004, RN-022 |
| 5 | La ficha de P-061 sigue citando "RN-021 (apertura < cierre, mismo día)". RN-021 es la franja de una reserva dentro del horario; la regla de configuración es RN-082, que ya está en la misma fila. Tampoco lista RN-159, RN-171 ni RN-172, que el formulario aplica. Era un gap pendiente de la iteración 2 y sigue abierto | comprensión | Baja | Corregir la fila "Reglas" de la ficha de P-061: RN-082, RN-159, RN-160, RN-162, RN-171, RN-172 | RN-021, RN-082, RN-159, RN-171, RN-172 |
| 6 | El texto de `COMMON_AREA_INVALID_LIMITS` ("Ingresa un número entero mayor que 0.") no describe dos casos: la duración que no es múltiplo de 60 s (C5: "4 h 0.5 min") y la anticipación con "0 días", que es un valor válido en su campo. La UI divide cada valor en horas y minutos, o en días, horas y minutos, pero el error es uno solo para el `fieldset` | comprensión | Baja | Un texto por caso en §3.0.6: "Usa minutos enteros." (múltiplo de 60) y "La duración (o la anticipación) debe ser de al menos 1 minuto." (total 0) | HU-004 C5, RN-160 |
| 7 | La banda de P-061 dice "P-011 y P-012 todavía muestran los valores fijos de CH.DATA.areas", lo que ya no es cierto (ver VL-P060 obs. 4) | comprensión | Baja | Corregir el texto | HU-004 |
| 8 | Los minutos y las horas aceptan valores negativos o fuera de rango si el total sale válido: duración "5 h −30 min" = 16,200 s se guarda | gap | Baja | Validar cada parte (0–59 minutos, 0–23 horas, ≥ 0 días) o declarar en la ficha que solo cuenta el total | RN-160 |

### 5. Decisiones recomendadas antes de implementar

1. **Ligar las reservas al área por id** en P-012 y P-060, y declarar en la ficha de P-061 que renombrar no afecta las reservas existentes (obs. 2, Alta).
2. **Pasar la anticipación en segundos a P-011 y P-012** y calcular el límite de RN-079 con `CH.NOW` (obs. 3).
3. **Dar un escenario sin áreas** para C1 y **corregir la cifra de HU-004** en el resumen de la iteración 2 (11 de 13; HU-004 pasa de ✅ a ⚠️) (obs. 1).
4. Corregir la fila "Reglas" de la ficha y los textos de `COMMON_AREA_INVALID_LIMITS` (obs. 5 y 6). Las obs. 4, 7 y 8 se resuelven durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-061 cubiertas por completo | HU-004 ⚠️ → 0 de 1 | **0 %** (100 % con parcial) |
| Criterios de HU-004 reproducibles (P-060 + P-061 + P-012) | 11 completos (C2–C6, C8–C13) + 2 parciales (C1, C7) de 13 | **85 %** (100 % con parciales). El constructor reportó 13 de 13 |
| Reglas de la ficha de P-061 reflejadas (RN-082, RN-160, RN-162; RN-021 mal citada) | 2 completas + 1 parcial de 3 | **67 %** (100 % con parcial) |
| Reglas aplicables reflejadas (12: RN-021, RN-023, RN-024, RN-054, RN-079, RN-082, RN-102, RN-159, RN-160, RN-162, RN-171, RN-172) | 8 completas, 2 parciales, 1 no reflejada (RN-024 tras renombrar), 1 no verificable (RN-054) | **67 %** completas · **83 %** con parciales |

---

### Anexo · Evidencia (Edge sin interfaz, 2026-11-08)

Las pruebas se hicieron con páginas de prueba en el scratchpad que cargan los prototipos en un `iframe` (`--allow-file-access-from-files`) y comparten `sessionStorage`, sin modificar ningún archivo del proyecto. Salidas principales:

- `GET inv-vencida` → "Esta invitación venció…" `RN-110 · emitida 28/10/2026 10:29:59, 604,801 s > 604,800 s`; `inv-usada` → "…ya no es válida…"; `inv-anulada` → "…fue anulada…"; `k9F2xQ7mTb` → `Alert info` sin formulario.
- Contraseñas: 11 → `PASSWORD_LENGTH_INVALID`, campo vacío, foco en el resumen; 64, 12 y 25 → `P-007-consentimiento.html?role=carla`; 65 → `PASSWORD_LENGTH_INVALID`; `password1234` → `PASSWORD_BREACHED`.
- `C12 return w/ role=carla` → la URL pasa a `?token=k9F2xQ7mTb&role=ana&state=existing` (cambio de persona en silencio).
- P-061 `/new` con el preset C1 → `422 · COMMON_AREA_NAME_DUPLICATE`.
- Anticipación de 60 s → P-011 "hasta 0 días de anticipación"; P-012 "máx. 0 h".
- Renombrar a "Parrilla techada" → P-012 del 06/12 de 14:00 a 16:00 da solo `RESERVATION_TOO_FAR_AHEAD`. El control sin renombrar da además "El área ya está reservada en ese horario.".
- Anticipación de 30 días y 12 h → P-012 rechaza el 04/12 a las 20:00 con "Solo puedes reservar hasta el 04/12/2026 a las 10:30."
- `412` → "Otra persona cambió estos datos…", aforo recargado 12, ETag `W/"2"`; al guardar de nuevo → P-060.

---

## VL-P050 · P-050 Padrón: torres y unidades

**Prototipo:** [prototypes/P-050-padron.html](prototypes/P-050-padron.html) (con [assets/shell.js](prototypes/assets/shell.js) y [assets/registry-data.js](prototypes/assets/registry-data.js))
**Ficha:** [09-ui-spec.md §3.7 P-050](09-ui-spec.md) · **Flujos:** F9 (pasos 1 y 6) · **HU declaradas:** HU-001
**Veredicto:** **Pasa con observaciones.** La pantalla cumple su ficha: pestañas por torre, tarjetas con la cantidad de vínculos activos, "Agregar torre" con `FIELD_REQUIRED` y `TOWER_CODE_DUPLICATE` (RN-170), búsqueda solo por correo exacto (ADR-0004) y `403` para quien no es Administrator. El punto a decidir es cómo convive la búsqueda por correo con RN-153.

**Método:** lectura del código y renderizado en Edge sin interfaz sobre una copia de los prototipos (`?state=` y scripts de prueba que rellenan y envían los formularios). No se modificó ningún archivo del proyecto.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-050 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-001 | C13 (Marco no registra unidades) y la entrada a C1–C4, C9–C11 (P-051) y C5–C8, C12, C15 (P-053) | ⚠️ Parcial (por diseño: P-050 es la entrada) | `?role=marco` → P-090 "No tienes acceso a esta página". Búsqueda `"  ANA.QUISPE@example.pe "` → "Ana Quispe · Ver ficha" (normalización de RN-068). La validación de los criterios ocurre en P-051 y P-053 |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-170 | Código de torre único sin distinguir mayúsculas ni espacios | ✅ | Estado "Torre repetida ' b '" → "Este condominio ya tiene una torre con ese código." en el campo, `422 · TOWER_CODE_DUPLICATE` |
| RN-172 | Un `FIELD_REQUIRED` por campo vacío | ✅ | "Completa el código de la torre." |
| RN-004 | `CondominiumId` del Administrator en cada registro | ⚠️ | Solo como nota del prototipo (no observable en la UI; se prueba en integración) |
| RN-153 | No revelar que un correo pertenece a otra persona, "incluido el Administrator al registrar personas" | ⚠️ | La búsqueda devuelve "Ana Quispe" o "No hay ninguna persona con ese correo.": confirma la existencia del correo que P-053 oculta con un mensaje neutro (obs. 1) |
| RN-003, RN-058 | Unicidad y formato del número | — | Se aplican en P-051. P-050 solo muestra las unidades ya registradas |
| ADR-0004 | Sin búsqueda parcial por nombre | ✅ | Hint "Escribe el correo completo. No se busca por nombre."; coincidencia exacta tras normalizar (`trim` + minúsculas); las fichas archivadas no aparecen |
| Matriz R1/R3 | Solo el Administrator lee y escribe el padrón | ✅ | Marco, Ana y Raúl ven P-090 |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F9 paso 1 | P-050 → "Registrar unidad" → P-051 `?tower=A` | ✅ |
| F9 paso 6 | P-050 busca `ana.quispe@example.pe` → "Ver ficha" → P-054 | ✅ Con mayúsculas y espacios también encuentra a Ana |
| F9 paso 6 (sin resultado) | `nadie@example.pe` → "No hay ninguna persona con ese correo." | ✅ Texto exacto de la ficha |
| F9 completo desde la semilla | P-050 → P-051 torre A, `502` | ⚠️ La semilla ya tiene A-502: el paso 2 da `UNIT_NUMBER_DUPLICATE`. F9 literal solo se recorre desde "Vacío (sin torres)" + "Agregar torre", que borra la semilla de la sesión (probado: A → P-051 A-502 → P-052 "Registraste la unidad A-502.") (obs. 3) |
| Padrón vacío | Estado "Vacío" → "Agrega la primera torre del condominio." con el formulario abierto | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La búsqueda por correo exacto, que pide la ficha, le confirma al Administrator que un correo ya está en el padrón. Eso anula el mensaje neutro de `PERSON_REGISTRATION_REJECTED` en P-053, que RN-068 y RN-153 exigen "también ante el Administrator". La spec se contradice: el Administrator puede leer todo el padrón (matriz R3), pero RN-153 le oculta la existencia del correo al registrar | comprensión | Media | Decidir y escribir en RN-153 el alcance real: (a) RN-153 no aplica al Administrator dentro de su propio padrón, que ya puede leer, y el mensaje neutro de P-053 protege solo la API; o (b) se quita la búsqueda por correo de F9 paso 6 | HU-001 C7, C12; RN-068, RN-153; F9 paso 6 |
| 2 | El formato del código de torre ("Usa hasta 3 letras o números, sin espacios.") no tiene código en §3.0.6 ni regla: RN-170 solo define la unicidad. El prototipo lo marca "sin código en §3.0.6" | gap | Baja | Agregar a RN-170 el formato (`^[A-Z0-9]{1,3}$` u otro) y su código (`TOWER_CODE_INVALID_FORMAT`) | RN-170, RN-172 |
| 3 | La semilla tiene A-502, así que F9 y HU-001 C1 ("la torre A no tiene la unidad 502") no se recorren tal cual con los datos de ejemplo. Solo funcionan desde el padrón vacío, que borra la semilla de la sesión | comprensión | Baja | Agregar un botón en la banda "F9 desde cero" o quitar A-502 de la semilla y registrarla como paso de la demo | HU-001 C1; F9 pasos 1–2 |
| 4 | Los errores `422` de "Agregar torre" y de la búsqueda solo se muestran junto al campo. §3.0.4 pide además un resumen con foco | gap | Baja | Agregar el resumen de errores, o declarar en §3.0.4 la excepción para formularios en línea de un campo | §3.0.4 |
| 5 | El identificador de la unidad del prototipo (`'u-' + torre + número` sin separador) hace que A1-203 y A-1203 tengan el mismo `id` (`u-a1203`) si se agrega una torre "A1". Solo afecta al prototipo | gap | Baja | Usar un separador en `REG.unitId` (`u-a1-203`) | RN-003 (solo prototipo) |

### 5. Decisiones recomendadas antes de implementar

1. **Fijar el alcance de RN-153 ante el Administrator** y alinear con la decisión P-050 (búsqueda) y P-053 (mensaje neutro) (obs. 1).
2. **Definir el formato del código de torre** y su código de error (obs. 2).
3. Ajustar la semilla o la banda para recorrer F9 literal (obs. 3). Los puntos 4 y 5 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-050 cubiertas por completo | HU-001 ⚠️ (P-050 es la entrada; la HU se valida en P-051 a P-054) → 0 de 1 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-001 observables desde P-050 | C13 → 1 de 1 | **100 %** |
| Reglas aplicables reflejadas (4: RN-004, RN-153, RN-170, RN-172) | 2 completas + 2 parciales | **50 %** completas · **100 %** con parciales |
| Pasos de F9 que dependen de P-050 (1 y 6) | 2 de 2 | **100 %** |

---

## VL-P051 · P-051 Registrar unidad

**Prototipo:** [prototypes/P-051-registrar-unidad.html](prototypes/P-051-registrar-unidad.html)
**Ficha:** [09-ui-spec.md §3.7 P-051](09-ui-spec.md) · **Flujos:** F9 (paso 2) · **HU declaradas:** HU-001
**Veredicto:** **Pasa con observaciones.** Los 8 criterios de HU-001 que dependen de P-051 se reproducen, con los textos de §3.0.6 y los valores conservados tras el `422`. El gap está en la regla: `^\d{3,4}$` acepta `0502` como una unidad distinta de `502`.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-051 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-001 | C1, C2, C3, C4, C9, C10, C11, C13 → 8 de 8 | ✅ Cubierta | C1: desde el padrón vacío, torre A + `502` → P-052 "Registraste la unidad A-502." (probado). C2: estado "Unidad repetida" → `UNIT_NUMBER_DUPLICATE`. C3 (`52`), C4 (`12345`), C11 (`5-02`) → `UNIT_NUMBER_INVALID_FORMAT`. C4 solo con el estado del prototipo, porque `maxlength=4` impide escribirlo (equivale a enviarlo por la API). C9: "Rellenar A-1203" → registrada (probado). C10: "Rellenar B-502" → registrada. C13: `?role=marco` → P-090 |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-003 | Número único dentro de la torre; la misma 502 en otra torre se acepta | ✅ | A-502 rechazada; B-502 aceptada. Ver la obs. 1 para los ceros a la izquierda |
| RN-058 | 3 o 4 dígitos (piso + número) | ⚠️ | Rechaza `52`, `12345` y `5-02`. Acepta `0502` y `000`. Probado: `0502` en la torre A → "Registraste la unidad A-0502." con A-502 ya existente (obs. 1) |
| RN-172 | `FIELD_REQUIRED` por campo | ✅ | "Elige la torre." y "Completa el número de la unidad." (solo espacios cuenta como vacío) |
| RN-102 | `422` con código estable y valores conservados | ✅ | Resumen con foco y enlaces a cada campo; nota `422 · UNIT_NUMBER_…` |
| RN-004 | `CondominiumId` del Administrator | ⚠️ | Solo como nota (no observable en la UI) |
| Matriz R1 | Solo el Administrator crea o edita unidades | ✅ / ⚠️ | Crear: ✅. Editar: la matriz lo permite, pero ninguna pantalla lo ofrece (obs. 2) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F9 paso 2 | P-051 torre A, `502` → P-052 de A-502 con `Alert success` | ✅ Desde el padrón vacío (con la semilla, A-502 ya existe: ver VL-P050 obs. 3) |
| Error y corrección | `52` → resumen + error en el campo → corregir → registrar | ✅ Valores conservados |
| Cancelar | → P-050 en la misma torre | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | `^\d{3,4}$` acepta ceros a la izquierda: `0502` queda como unidad distinta de `502` en la misma torre (probado), y `000` también se acepta. Es el contraejemplo de RN-003 ("la torre A queda con dos unidades 502") por otra vía | gap | Media | Cambiar RN-058 a `^[1-9]\d{2,3}$` (o normalizar y comparar sin ceros a la izquierda) y agregar `0502` como contraejemplo de RN-058 y criterio negativo de HU-001 | HU-001 C2, C3; RN-003, RN-058 |
| 2 | La matriz R1 da al Administrator "Create or edit towers and units", pero ninguna HU ni pantalla permite corregir o eliminar una unidad mal registrada. Un error de digitación queda en el padrón para siempre | gap | Baja | Declarar en HU-001 que la edición queda fuera del MVP (y ajustar R1), o agregar la acción a P-052 | Matriz R1; RN-003 |
| 3 | C1 y C4 solo se reproducen con ayuda: C1 necesita el padrón vacío (la semilla tiene A-502) y C4 necesita el estado del prototipo (el navegador no deja escribir 5 dígitos) | comprensión | Baja | Documentarlo en la banda o en el índice de prototipos | HU-001 C1, C4 |

### 5. Decisiones recomendadas antes de implementar

1. **Cerrar RN-058 para los ceros a la izquierda** y agregar el criterio a HU-001 (obs. 1).
2. **Decidir si el MVP corrige unidades** y alinear la matriz R1 (obs. 2).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-051 cubiertas por completo | HU-001 (parte de P-051) ✅ → 1 de 1 | **100 %** |
| Criterios de HU-001 observables desde P-051 | 8 de 8 | **100 %** |
| Reglas aplicables reflejadas (5: RN-003, RN-004, RN-058, RN-102, RN-172) | 3 completas + 2 parciales | **60 %** completas · **100 %** con parciales |

---

## VL-P052 · P-052 Detalle de unidad

**Prototipo:** [prototypes/P-052-detalle-unidad.html](prototypes/P-052-detalle-unidad.html)
**Ficha:** [09-ui-spec.md §3.7 P-052](09-ui-spec.md) · **Flujos:** F9 (pasos 2–3) · **HU declaradas:** HU-001
**Veredicto:** **Pasa con observaciones.** Los cinco estados de la ficha están: activo, futuro, terminado en `<details>`, unidad alquilada y recién registrada. También están el orden pedido y el 404 antes del 403 (RN-103). El gap es de alcance: el vínculo no se puede terminar ni modificar desde ninguna pantalla.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-052 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-001 | Ninguno directo. P-052 muestra el resultado de C1, C9 y C10 (unidad registrada) y lleva a C5–C8 (P-053) | ✅ Reflejada | "Registraste la unidad A-502." tras P-051; "Vincular una persona" → P-053 `?unitId=u-a502` con la unidad preseleccionada |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-001 | Vínculo `Owner` o `Tenant` | ✅ | Badges "Propietario" (info) e "Inquilino" (neutral) según §3.0.5 |
| RN-077 | Si hay inquilino activo, el propietario no reserva | ✅ | A-301: "Unidad alquilada: solo su inquilino puede reservar." solo con un `Tenant` activo |
| RN-157 | Un vínculo futuro no permite reservar ni invitar | ✅ | A-305: "Empieza el 01/08/2027" y la nota textual de la ficha |
| RN-103 | 404 antes que 403 | ✅ | `?role=marco&id=u-z999` → P-091; con una unidad existente → P-090 |
| ADR-0001 | Activo: `StartDate ≤ hoy` y `EndDate` vacío o `≥ hoy` (America/Lima) | ✅ | `occStatus` con la fecha simulada; Diego (fin 31/10/2026) en "Vínculos anteriores (1)" |
| RN-002 | NRO sin `Tenant` | — | Se aplica en P-053 y P-054 |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F9 paso 2 → 3 | P-051 → P-052 A-502 → "Vincular una persona" → P-053 con A-502 | ✅ |
| Unidad sin vínculos | A-101 → `EmptyState` + "Vincular una persona" | ✅ |
| Navegación | Migas "Padrón › Torre A › Unidad A-502"; nombre → P-054 | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | No hay forma de terminar ni de modificar un vínculo: "Hasta" solo se fija al crearlo. Si Jorge vende A-704 o se prorroga el alquiler de Carla, el MVP no puede registrarlo, y RN-016, RN-060 y RN-005 dependen de esa `EndDate`. HU-001 lo reconoce en sus notas, pero la matriz R2 sí da "end an occupancy" al Administrator | gap | Media | Decidir: agregar "Terminar vínculo" en P-052 (con la entrada de auditoría de RN-059) o registrar en un ADR que el MVP solo termina vínculos con el seeder, y alinear la matriz R2 | HU-001 (notas); RN-016, RN-059, RN-060; matriz R2 |
| 2 | "Persona archivada" (vínculo de una persona con el plazo de retención vencido) no está en §3.0.5 ni en la ficha | comprensión | Baja | Agregar el texto a §3.0.5 o decidir que los vínculos de fichas archivadas no se listan | RN-005, §3.0.5 |
| 3 | Si a una persona se le registra dos veces el mismo vínculo, la tabla muestra dos filas "Activo" y P-050 cuenta "2 vínculos" (ver VL-P053 obs. 3) | comprensión | Baja | Se resuelve con la regla de VL-P053 obs. 3 | RN-001 |

### 5. Decisiones recomendadas antes de implementar

1. **Decidir cómo se termina o modifica un vínculo en el MVP** (obs. 1). Sin esa decisión, RN-016 y RN-060 solo se prueban con el seeder.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-052 cubiertas | HU-001 (parte de P-052) ✅ → 1 de 1 | **100 %** |
| Estados de la ficha reflejados (sin vínculos, activo, futuro, terminado, orden, alquilada, recién registrada, 404/403) | 8 de 8 | **100 %** |
| Reglas aplicables reflejadas (4: RN-001, RN-077, RN-103, RN-157) | 4 completas | **100 %** completas · **100 %** con parciales |

---

## VL-P053 · P-053 Registrar persona y vínculo

**Prototipo:** [prototypes/P-053-registrar-persona.html](prototypes/P-053-registrar-persona.html)
**Ficha:** [09-ui-spec.md §3.7 P-053](09-ui-spec.md), incluida la "Decisión del autor (2026-11-08)" · **Flujos:** F9 (pasos 3–4) · **HU declaradas:** HU-001
**Veredicto:** **Pasa con observaciones.** El mensaje neutro de `PERSON_REGISTRATION_REJECTED` cumple RN-153: no indica el campo ni el motivo, y no cambia con las mayúsculas. También se cumplen el rechazo `Tenant` para Luis (RN-002), la reutilización de la ficha de Carla en retención (RN-132), `FIELD_REQUIRED` y `OCCUPANCY_END_BEFORE_START`. Los gaps son caminos que la spec no cierra: un NRO por invitación pendiente, vínculos duplicados, el nombre descartado al reutilizar una ficha y la auditoría de C8, que no tiene dónde verse.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-053 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-001 | C5, C6, C7, C8, C12, C15 (C14 ⏸) → 5 ✅ + 1 ⚠️ de 6 | ⚠️ Parcial | C5: sin campos de DNI ni teléfono, con el aviso de la ficha. C6: estado "Luis (NRO) como inquilino" → "Un propietario no residente no puede tener un vínculo de inquilino." en el tipo de vínculo. C7 y C12: `Ana.Quispe@Example.pe` → "No se pudo registrar a la persona con estos datos." solo en el resumen. C15: "Carla vuelve…" al 01/03/2027 → misma ficha `p-carla`, sin rechazo (probado). **C8 ⚠️:** la entrada de auditoría solo existe como nota del prototipo; no hay pantalla del log (ADR-0020), y para reproducirla hay que duplicar el vínculo que Carla ya tiene en la semilla (obs. 3 y 4) |

**Verificación de la cifra de los constructores (HU-001 "14 de 15, C14 ⏸"):** sumando P-051 (C1–C4, C9–C11, C13), P-053 y P-054 (C5), quedan **13 criterios ✅, C8 ⚠️ y C14 ⏸**. La cifra correcta es **13 de 14 aplicables, con 1 parcial**, no 14 de 15.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-057 ⚠️ Q18 | Solo nombre, correo y vínculo antes del consentimiento | ✅ | Formulario sin otros campos |
| RN-146 ⏸ | Sin DNI ni teléfono | ✅ | No hay campos (C14 no se prueba en el MVP) |
| RN-001 | `Owner` o `Tenant` | ✅ | Radios "Propietario" / "Inquilino" obligatorios |
| RN-002 | NRO no puede ser `Tenant` | ⚠️ | ✅ con Luis (rol activo). ❌ si el rol NRO todavía es una invitación pendiente: probado con Gloria (invitada como NRO, luego `Tenant` de A-301 → "Registraste el vínculo.") (obs. 1) |
| RN-068 + RN-153 | Correo repetido → mensaje neutro, sin campo | ✅ | Resumen sin enlace a un campo y sin decir a quién pertenece el correo |
| RN-131 / RN-132 | Persona en retención: el vínculo va a su ficha | ⚠️ | ✅ misma ficha. ⚠️ El nombre escrito se descarta en silencio (obs. 2) |
| RN-059 | Auditoría del vínculo | ⚠️ | Entrada con valor anterior vacío, `A-301 · Tenant`, autor y `2026-11-15T09:30:00-05:00` (probado), pero solo como nota del prototipo (obs. 4) |
| RN-172 | `FIELD_REQUIRED` por campo | ✅ | 5 mensajes: nombre, correo, unidad, tipo, desde |
| RN-174 | Fin anterior al inicio | ✅ | "La fecha de fin debe ser igual o posterior a la de inicio."; fin = inicio se acepta |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F9 paso 3 → 4 | P-052 A-502 → P-053 con A-502 preseleccionada → nombre, correo, Propietario → P-054 "Registraste a … Ya puedes invitarla." | ✅ |
| Agregar vínculo a una persona existente | P-054 → "Agregar vínculo" → P-053 `personId=` → P-054 "Registraste el vínculo." | ✅ (el texto no está en la spec: obs. 8) |
| Persona en retención (C15) | Fecha 01/03/2027 → Carla, A-301, Inquilino → P-054 de `p-carla` | ✅ |
| Vínculo futuro | Lucía, A-402, desde 01/08/2027 → "Ya puedes invitarla." | ⚠️ El mensaje es falso: RN-157 no deja invitarla hasta el 01/08/2027 (obs. 6) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | RN-002 solo mira los roles con cuenta. Si la persona tiene una invitación **pendiente** como NonResidentOwner, P-053 acepta un vínculo `Tenant`. Al aceptar la invitación queda NRO con un `Tenant`, que es el contraejemplo de RN-002. Probado con Gloria Ramírez: invitación NRO → `Tenant` de A-301 aceptado | gap | Media | Extender RN-002: el rechazo también aplica si hay una invitación pendiente con rol NRO, y P-006 vuelve a verificar al aceptar. Agregar un criterio negativo a HU-001 | HU-001 C6, HU-001B C4; RN-002 |
| 2 | Cuando el correo es de una persona en retención (RN-132), el nombre escrito se descarta sin aviso y la confirmación muestra el nombre guardado. Probado: se escribió "Carla Otra Persona" y se obtuvo "Registraste a Carla Díaz.". La spec no dice qué pasa con el nombre, y mostrar el nombre guardado le confirma al Administrator a quién pertenece el correo (tensión con RN-153) | gap | Media | Definir en RN-132 qué nombre prevalece y el texto de éxito (p. ej. "Agregaste el vínculo a una ficha existente con este correo."), en coherencia con la decisión de VL-P050 obs. 1 | HU-001 C15; RN-132, RN-153 |
| 3 | Ninguna regla impide registrar dos veces el mismo vínculo (misma persona, unidad y tipo, con fechas superpuestas), ni que una persona sea `Owner` y `Tenant` de la misma unidad a la vez. Probado: Carla quedó con dos `Tenant` activos de A-301. HU-001 C8 obliga a hacerlo con la semilla, porque Carla ya tiene ese vínculo | gap | Media | Agregar una RN (p. ej. `OCCUPANCY_OVERLAP`) y ajustar el dato de C8 a una persona sin vínculo previo | HU-001 C8; RN-001, RN-059 |
| 4 | HU-001 C8 dice que "el log de auditoría **muestra** una entrada", pero la vista del log está diferida (ADR-0020) y el Administrator no puede leerlo (matriz P7). El criterio no se puede validar en ninguna pantalla del MVP. Además, en el prototipo el "Desde" se queda en 04/11/2026 aunque la fecha simulada sea el 15/11/2026 | comprensión | Media | Reescribir C8 como "registra en el log…" y verificarlo con una prueba de integración sobre la tabla. En el prototipo, recalcular el "Desde" al cambiar la fecha | HU-001 C8; RN-059; ADR-0020 |
| 5 | La "Decisión del autor (2026-11-08)" obliga a registrar a toda persona con un vínculo `Owner` o `Tenant` antes de invitarla, y deja al personal de portería sin unidad fuera del MVP. Ni P-053 ni P-054 lo dicen en pantalla, y P-054 ofrece "Portería" a cualquiera. Riesgo: que la administración invente un vínculo para poder invitar al conserje. Un `Tenant` ficticio marca la unidad como alquilada y le impide reservar al propietario (RN-077), y además altera el conteo del padrón. La semilla contradice la decisión: Raúl es Concierge sin vínculo | comprensión | Media | Registrar la limitación en un ADR (o en ADR-0020) con el camino real de alta del conserje (seeder o proceso de plataforma) y agregar un hint en P-054 junto a "Portería" | Decisión del autor (ficha de P-053); RN-001, RN-077; HU-009 (depende de un Concierge) |
| 6 | El éxito dice "Ya puedes invitarla." también cuando el vínculo empieza en el futuro (probado con Lucía, 01/08/2027), pero RN-157 no deja invitarla hasta esa fecha | fricción | Baja | Texto condicional: "Podrás invitarla desde el 01/08/2027." | RN-157; HU-001B C2 |
| 7 | El correo con formato inválido y la fecha inválida no tienen código en §3.0.6 (el prototipo los marca "sin código en §3.0.6"); RN-172 solo cubre el campo vacío | gap | Baja | Agregar `EMAIL_INVALID_FORMAT` y `DATE_INVALID_FORMAT` (o una regla genérica) | RN-172, §3.0.6 |
| 8 | El texto de éxito de "Agregar vínculo" ("Registraste el vínculo.") no está en la ficha | gap | Baja | Agregarlo a la ficha de P-054 | §3.7 P-053/P-054 |
| 9 | La lista "Número" depende de la torre elegida y se recarga con JS. La spec es SSR primero (§3.0.4) y no dice cómo funciona sin JS | gap | Baja | Definir en la ficha: un solo `<select>` con `optgroup` por torre, o recargar la página al cambiar de torre | §3.0.2–3.0.4 |

### 5. Decisiones recomendadas antes de implementar

1. **Extender RN-002 a las invitaciones pendientes** y verificarlo también al aceptar (obs. 1).
2. **Prohibir vínculos duplicados o superpuestos** con una RN y corregir el dato de HU-001 C8 (obs. 3, 4).
3. **Reescribir HU-001 C8** como verificación de integración mientras la vista del log siga diferida (obs. 4).
4. **Definir en RN-132 el nombre y el mensaje** cuando se reutiliza una ficha (obs. 2).
5. **Documentar en un ADR el alta del personal de portería** que deja la decisión del 2026-11-08 (obs. 5). Los puntos 6 a 9 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-053 cubiertas por completo | HU-001 ⚠️ (C8) → 0 de 1 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-001 observables desde P-053 (sin C14 ⏸) | 5 de 6 completos + 1 parcial | **83 %** · 100 % con parcial |
| HU-001 con todas sus pantallas (P-051, P-053, P-054; sin C14 ⏸) | 13 de 14 completos + C8 parcial | **93 %** · 100 % con parcial |
| Reglas aplicables reflejadas (9 sin RN-146 ⏸: RN-001, RN-002, RN-057, RN-059, RN-068/RN-153, RN-131/RN-132, RN-172, RN-174; RN-068 y RN-153 cuentan juntas, igual que RN-131 y RN-132) | 5 completas + 3 parciales de 8 grupos | **63 %** completas · **100 %** con parciales |

---

## VL-P054 · P-054 Ficha de persona e invitación

**Prototipo:** [prototypes/P-054-ficha-persona.html](prototypes/P-054-ficha-persona.html)
**Ficha:** [09-ui-spec.md §3.7 P-054](09-ui-spec.md) · **Flujos:** F9 (pasos 4–5), F1 (paso 1, el correo que inicia la activación) · **HU declaradas:** HU-001, HU-001B
**Veredicto:** **Pasa con observaciones (condicionado).** Los 6 criterios de HU-001B se reproducen, con los textos y badges de §3.0.5 y §3.0.6. Queda condicionado a una regla: P-054 deja invitar como Residente o Propietario no residente a una persona **sin vínculos activos**. Eso da el contraejemplo de RN-060: "Carla conserva el rol Resident sin ningún vínculo".

### 1. Cobertura de HUs

| HU | Criterios observables desde P-054 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-001B | 6 de 6 | ✅ Cubierta | C1: Ana "Sin cuenta" a las 01/12/2026 10:00 → "Enviamos la invitación a ana.quispe@example.pe.", "Invitación pendiente · Vence el 08/12/2026 10:00" y el buzón de prueba con el enlace (probado). C2: Sofía al 01/03/2027 → "El vínculo de esta persona aún no empieza…", sin buzón. C3: Sofía al 01/08/2027 00:00 → `201`, vence el 08/08/2027 00:00 (probado). C4: Carla como NRO → `OCCUPANCY_TENANT_NOT_ALLOWED` en "Rol". C5: Marco → P-090. C6: la ficha muestra "Invitación pendiente" con el vencimiento. **C1 y C4 solo con el selector**: la semilla le da cuenta activa a Ana y a Carla, y con cuenta activa P-054 no ofrece el formulario (obs. 7) |
| HU-001 | C5 | ✅ | La ficha muestra solo nombre, correo y vínculos; sin DNI ni teléfono |

**Verificación de la cifra de los constructores (HU-001B "6 de 6"):** confirmada. C1 y C4 necesitan el selector de estado.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-007 | Cuentas solo por invitación | ✅ | La única acción de alta es "Enviar invitación" |
| RN-110 | Vence a los 604,800 s | ⚠️ | Emitida + 7 días exactos. En el segundo exacto del vencimiento la ficha ya dice "Invitación vencida" (`expiresAt > asOf`), aunque RN-110 rechaza solo "más de 7 días" (obs. 6) |
| RN-157 | No invitar si los únicos vínculos son futuros | ⚠️ | ✅ con Sofía. ❌ No cubre a quien solo tiene vínculos terminados (obs. 1) |
| RN-060 / RN-072 | Sin vínculo activo no hay Resident/NRO ni entrada al condominio | ❌ | Diego (vínculo terminado el 31/10/2026, sin cuenta) → invitado como Residente, `201` (probado). Carla al 01/03/2027, "Cuenta activa · Sin rol" → el formulario le ofrece volver a ser Residente (obs. 1) |
| RN-002 | NRO sin `Tenant` | ✅ | C4 (ver VL-P053 obs. 1 para el camino inverso) |
| RN-165 | Invitación de un solo uso | ⚠️ | Solo como nota. El uso en P-006 no vuelve a la ficha: no pasa a "Cuenta activa" (obs. 3) |
| RN-057 / RN-146 ⏸ | Sin DNI ni teléfono | ✅ | — |
| RN-153 | No revelar si existe una cuenta con el correo | ✅ | La ficha dice "Sin cuenta" aunque Ana tenga cuenta en otro condominio; el `201` es igual |
| RN-103 | 404 antes que 403 | ✅ | `id` inexistente → P-091 para cualquier rol |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F9 paso 4 → 5 | P-053 → P-054 "Registraste a Ana Quispe. Ya puedes invitarla." → Rol "Residente" → "Invitación pendiente · Vence el 08/12/2026 10:00" | ✅ (con la fecha simulada al 01/12/2026 10:00) |
| Invitación vencida | Héctor → "Invitación vencida · Venció el 27/10/2026 16:00" + mismo formulario | ✅ |
| F9 → F1 (el correo abre P-006) | Buzón de prueba → `/invitations/{token}` | ⚠️ El token no corresponde a la persona invitada: Ana → `k9F2xQ7mTb` (invitación de "Torres del Parque"); Diego, Gloria o Lucía → la invitación de ejemplo de Carla. Aceptar en P-006 no cambia la ficha (obs. 3) |
| Error `422` | Sofía → error en "Rol" con foco en el campo | ⚠️ Sin el resumen de errores de §3.0.4 (obs. 4) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | P-054 deja invitar como Residente o Propietario no residente a una persona **sin ningún vínculo activo**. Pasa en dos casos: (a) Diego, sin cuenta y con su único vínculo terminado el 31/10/2026, recibe `201` e "Invitación pendiente" (probado); (b) Carla al 01/03/2027 ve "Cuenta activa · Sin rol · Su último vínculo terminó y se le retiró el rol" y el mismo formulario. Al aceptar, la persona tiene el rol Resident sin vínculo, que es el contraejemplo literal de RN-060, y entra al condominio contra el ejemplo de RN-072. RN-157 solo cubre los vínculos futuros | gap | **Alta** | Extender RN-157 (o una RN nueva): una invitación con rol Resident o NonResidentOwner exige al menos un vínculo activo, o futuro con la regla actual; un NRO exige un `Owner` activo. Agregar a HU-001B un criterio negativo con Diego. El rol Portería no depende del vínculo | HU-001B; RN-060, RN-072, RN-157 |
| 2 | Hay dos supuestos contradictorios sobre cómo vuelve el rol a una cuenta existente. La nota de P-054 dice que "la spec no define cómo devolver el rol", pero RN-122 y F1 2b sí lo definen: invitación + inicio de sesión. A la vez, el prototipo **devuelve el rol Resident automáticamente** al agregar un vínculo (Carla al 01/03/2027 → "Cuenta activa · Residente" sin invitación, probado), lo que contradice que el rol se asigna solo por invitación (RN-007) | comprensión | Media | Fijar en la spec que un vínculo nuevo no restituye el rol revocado por RN-060: hace falta una invitación (RN-122). Corregir la nota y el cálculo de `REG.roles()` | HU-001B, HU-002 C12; RN-007, RN-060, RN-122 |
| 3 | El paso de F9 a F1 no está conectado: el enlace del buzón no lleva a la invitación de la persona invitada (Ana abre la de "Torres del Parque"; los demás abren la de Carla), y aceptar en P-006 (`invitations-used-v1`) no actualiza `registry-v1`, así que la ficha nunca pasa a "Cuenta activa". No se puede demostrar de punta a punta que el enlace es de un solo uso para esa invitación | comprensión | Media | Generar en P-054 un token por invitación que P-006 entienda (persona, condominio, emisión) y hacer que P-006 marque la invitación como usada en `registry-v1` | HU-001B C1, C6; RN-165; F1 paso 1 |
| 4 | El `422` de "Enviar invitación" se muestra solo en el campo "Rol", sin el resumen de errores con foco que pide §3.0.4 | gap | Baja | Agregar el resumen o declarar la excepción en §3.0.4 | §3.0.4 |
| 5 | Una invitación pendiente no se puede anular ni reenviar con otro rol: si el Administrator se equivoca de rol, debe esperar 7 días. RN-139 solo anula invitaciones cuando se revoca un rol | gap | Baja | Decidir si el MVP ofrece "Anular invitación" (con `INVITATION_REVOKED`) o registrar la limitación | RN-110, RN-139 |
| 6 | En el segundo exacto del vencimiento (`asOf == expiresAt`) la ficha dice "Invitación vencida", pero RN-110 rechaza solo "más de 7 días" y P-006 acepta en ese instante (VL-P001 usa 604,801 s como primer segundo vencido) | comprensión | Baja | Usar `expiresAt >= asOf` para "pendiente", o fijar en RN-110 el límite cerrado o abierto | RN-110 |
| 7 | La semilla contradice las precondiciones de HU-001B: Ana y Carla tienen cuenta activa (C1 dice que Ana no tiene cuenta), así que C1 y C4 solo se ven forzando el estado "Sin cuenta" o "Inquilina invitada como NRO" | comprensión | Baja | Agregar a la semilla una Ana sin cuenta en este condominio (o usar a Gloria en C1) | HU-001B C1, C4 |

### 5. Decisiones recomendadas antes de implementar

1. **Exigir un vínculo activo para invitar como Resident o NonResidentOwner** (RN-157 ampliada) y agregar el criterio negativo a HU-001B (obs. 1). Es la condición de este veredicto.
2. **Fijar que el rol revocado vuelve solo por invitación** (RN-122) y corregir el modelo del prototipo (obs. 2).
3. **Conectar P-054 con P-006** con tokens por invitación, para validar F9 → F1 de punta a punta (obs. 3).
4. **Decidir la anulación de invitaciones pendientes** y el límite exacto de RN-110 (obs. 5, 6). Los puntos 4 y 7 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-054 cubiertas por completo | HU-001B ✅, HU-001 (C5, parte de P-054) ✅ → 2 de 2 | **100 %** (condicionado a la obs. 1, que agrega un criterio) |
| Criterios de HU-001B reproducibles | 6 de 6 (C1 y C4 con el selector) | **100 %** |
| Reglas aplicables reflejadas (9: RN-002, RN-007, RN-057, RN-060/RN-072, RN-103, RN-110, RN-153, RN-157, RN-165) | 5 completas, 3 parciales, 1 no reflejada | **56 %** completas · **89 %** con parciales |
| Pasos de F9 y F1 que dependen de P-054 (F9 4–5, F1 1) | 2 completos + 1 parcial | **67 %** · 100 % con parcial |

---

## VL-P030 · P-030 Gastos del mes (re-revisión 2026-11-08)

**Prototipo:** [prototypes/P-030-gastos-del-mes.html](prototypes/P-030-gastos-del-mes.html) (con [assets/shell.js](prototypes/assets/shell.js) y [assets/expenses-data.js](prototypes/assets/expenses-data.js))
**Ficha:** [09-ui-spec.md §3.5 P-030](09-ui-spec.md) · **Flujos:** F7 (pasos 1–3 y E), F6 (paso 1) · **HU declaradas:** HU-011 (ficha); HU-010 entra por F6 paso 1
**Veredicto:** **Pasa con observaciones.** P-030 ahora lee la fuente única `EXP` y la sesión `exp-session-v1`: lo que se registra en P-032 suma y lo que se anula en P-033 deja de sumar (probado en Edge). Con `?today=2026-12-04` el escenario es coherente: el mes actual es diciembre y noviembre se alcanza con "← Noviembre 2026", como pide F7 paso 2. Siguen abiertos los datos de HU-011 C10 y C12, el mes futuro de C11 y el motivo del anulado en la fila. Hay un gap nuevo: si se registra HU-010 C1 y se salta HU-010B C3, los totales de noviembre ya no coinciden con HU-011 C1 (obs. 13).
**Re-validación 2026-11-08:** el gap Alta (obs. 1) y la obs. 2 están **cerrados**. Las demás observaciones de la revisión anterior siguen abiertas. Hay 2 observaciones nuevas (13 y 14).

**Método.** Copia de [prototypes/](prototypes/) en una carpeta temporal, con un script inyectado que rellena y envía los formularios. Los recorridos se hicieron en Edge sin interfaz (`--headless=new --dump-dom`) y se leyó el DOM final. Las cifras de esta sección salen de esos recorridos y se recalcularon a mano con las filas de `expenses-data.js`.

**Recálculo de totales con `EXP` (fecha simulada indicada):**

| Mes · fecha simulada | Mantenimiento | Limpieza | Seguridad | Total del mes | Coincide |
|---|---|---|---|---|---|
| 2026-11 · `?today=2026-12-04` (14 gastos, 1 anulado) | 2,400 + 980 + 970 + 520 + 280 + 300 + 850 = **S/ 6,300.00** | 1,850 + 1,000 + 350 = **S/ 3,200.00** (e-1104 de S/ 1,200.00 anulado el 21/11 09:00, excluido) | 8,600 + 750 + 450 = **S/ 9,800.00** | **S/ 19,300.00** | ✅ HU-011 C1, C2 |
| 2026-10 · `?today=2026-12-04` (12 gastos, 1 anulado) | 2,400 + 980 + 640 + 2,400 + 9,250 + 3,200 = **S/ 18,870.00** | 1,850 + 410 = **S/ 2,260.00** (e-1009 de S/ 410.00 anulado, excluido) | 8,600 + 6,250 + 720 = **S/ 15,570.00** | **S/ 36,700.00** | ✅ (sin criterio). e-1008 (fecha 30/10, registrado 02/11) suma en octubre, RN-143 |
| 2026-11 · `?today=2026-11-20&now=10:30`, antes de registrar | 2,400 + 980 + 970 = **S/ 4,350.00** | 1,850 + 350 = **S/ 2,200.00** | 8,600 + 750 + 450 = **S/ 9,800.00** | **S/ 16,350.00** (8 gastos) | ✅ |
| Ídem, después de HU-010 C1 (S/ 1,200.00) | S/ 4,350.00 | 2,200 + 1,200 = **S/ 3,400.00** | S/ 9,800.00 | **S/ 17,550.00** (9 gastos) | ✅ registro → suma |
| Ídem, después de HU-010B C3 (`?today=2026-11-21&now=09:00`) | S/ 4,350.00 | **S/ 2,200.00** | S/ 9,800.00 | **S/ 16,350.00** | ✅ anulación → deja de sumar |
| 2026-11 · fecha por defecto (04/11/2026 10:30) | **S/ 0.00** | **S/ 1,850.00** | **S/ 8,600.00** | **S/ 10,450.00** (2 gastos) | ✅ (solo existe lo registrado hasta esa hora) |
| 2026-12 · `?today=2026-12-04` | — | — | — | EmptyState sin tablas | ✅ RN-035 |

El código suma en céntimos y solo los gastos con `!e.voided` (`P-030`, líneas 98–100). El mes sale de `e.date.slice(0, 7)` y no de `e.reg`. `EXP.all()` solo muestra un gasto desde su `regAt`, y una anulación desde su `void.at` ([expenses-data.js](prototypes/assets/expenses-data.js), líneas 101–121).

### 1. Cobertura de HUs

| HU | Criterios observables desde P-030 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-011 | 12 de 14 (C6 y C13 viven en P-031) | ⚠️ Parcial | Con `?today=2026-12-04`: ✅ C1 (Ana ve 6,300 / 3,200 / 9,800), ✅ C2 (Limpieza S/ 3,200.00 y no S/ 4,400.00), ✅ C4 (e-1114 del 28/11 suma en noviembre), ✅ C5 ("registrado el 03/12/2026" en la fila), ✅ C7 (Carla → "No tienes acceso a esta página" y su menú es "Inicio, Reservar, Mis reservas"), ✅ C14 (Marco ve los tres totales y no ve "Registrar gasto"). ⚠️ C3: la fila dice "Anulado · No suma al total", pero el motivo solo está en P-031 (obs. 5). ⚠️ C8/C9: solo con el estado manual "Sin acceso (vínculo vencido)" (obs. 11). ⚠️ C11: `?month=2027-01` muestra "Mostramos el mes actual. El mes indicado en la dirección no es válido." con diciembre vacío, no el EmptyState de 2027-01 (obs. 4). ⚠️ C12: sin gastos de S/ 0.50 ni S/ 18,500.00 (obs. 9). ❌ C10: diciembre ya se puede consultar, pero no existen el gasto de S/ 400.00 del 30/11 ni el de S/ 300.00 del 01/12 (obs. 3) |
| HU-010 | La parte de P-030: F6 paso 1 y C1 ("aparece en el detalle de 2026-11 con 'registrado el 2026-11-20'") | ✅ Cubierta (antes ❌) | "Registrar gasto" (solo Rosa) abre [P-032](prototypes/P-032-registrar-gasto.html). Tras registrar C1 con `?today=2026-11-20`, "← Gastos de noviembre 2026" muestra la fila "08/11/2026 · Limpieza de cisterna · registrado el 20/11/2026 · S/ 1,200.00" y el detalle pasa de 8 a 9 gastos. Los otros 14 criterios viven en P-032 (ver VL-P032) |

**HU Must faltantes en esta pantalla:** ninguna sin representar. HU-011 sigue parcial: C10 sin datos.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-035 ⚠️ Q27 | Total por categoría; mes sin gastos → "No hay gastos registrados para este mes." sin totales | ⚠️ | ✅ tabla con `tfoot` y EmptyState sin tablas (diciembre, septiembre). ⚠️ el ejemplo de 2027-01 no se reproduce: un mes futuro se trata como formato inválido (obs. 4) |
| RN-142 | Anulados no suman y siguen visibles en el detalle con su motivo | ✅ | e-1104 sigue en la lista con badge "Anulado" y no suma; probado también con una anulación hecha en la sesión (Limpieza 3,400 → 2,200) |
| RN-143 | Mes de la fecha del gasto | ✅ | e-1114 (registrado el 03/12) suma en noviembre; e-1008 (registrado el 02/11) en octubre |
| RN-144 | Fecha de registro además de la del gasto | ✅ | "registrado el dd/mm/aaaa" en cada fila, también en los gastos de la sesión |
| RN-090 | Monto, fecha, categoría, proveedor y comprobante | ⚠️ | El comprobante está a un clic, en P-031. Aceptable si la ficha lo declara (la nota del prototipo lo dice; la ficha no) |
| RN-036 | Sin unidades, personas ni deudas | ✅ | Ninguna fila nombra una unidad ni a una persona |
| RN-055 | `S/`, coma de miles, 2 decimales | ✅ | `CH.money`; "S/ 7,000.51" con los montos de borde de HU-010 (C8 + C9 + …) |
| RN-015 | Sin vínculo `Owner` no hay información financiera | ✅ | Carla → P-090 y sin "Gastos" en el menú |
| RN-016 / RN-105 | Acceso negado desde la solicitud siguiente al fin del vínculo | ⚠️ | Solo el estado manual; no hay persona con `EndDate` aunque ya existen `?today` y `?now` (obs. 11) |
| RN-031 | Concierge → `403` | ⚠️ | Raúl no está en `roles`. Además, `?role=raul` cae en Ana y **muestra los totales** (obs. 10) |
| RN-032 | Solo el Administrator registra | ✅ | El botón solo aparece para Rosa; Ana y Marco no lo ven (probado) |
| RN-092 | Anulado visible con motivo y fecha-hora | ⚠️ | En P-031, no en la fila de P-030 (obs. 5) |
| RN-094 | Fecha del gasto ≤ registro y ≥ registro − 12 meses | ✅ (antes ⚠️) | Ningún gasto aparece registrado "en el futuro": `EXP.all()` filtra por `regAt ≤ CH.nowStamp()` |
| RN-054 | Textos desde `es-PE.resx` | — | No se verifica en un prototipo HTML |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F7 paso 1 · Luis, `?today=2026-12-04` | P-010 "Gastos del condominio" → P-030 | ✅ Diciembre 2026, EmptyState. ⚠️ La tarjeta de P-010 sigue diciendo "En qué se gastó la cuota de noviembre 2026" (obs. 14) |
| F7 paso 2 | "← Noviembre 2026" | ✅ (antes ⚠️) S/ 19,300.00; ahora sí se llega con "Mes anterior" |
| F7 paso 3 | P-030 → P-031 `?id=e-1104` | ✅ Se abre el anulado con su motivo. ⚠️ Sigue habiendo dos filas "Limpieza de cisterna" (obs. 8) |
| F7 E · Carla | `/expenses` → P-090 | ✅ |
| F6 paso 1 · Rosa | P-030 "Registrar gasto" → P-032 | ✅ (antes ❌ callejón sin salida) |
| Registro → P-031 → P-030 (HU-010 C1) | P-032 C1 → P-031 `?id=e-1201&arrive=registered` → "← Gastos de noviembre 2026" | ✅ Limpieza 2,200 → 3,400; total 16,350 → 17,550 |
| Anulación → P-030 (HU-010B C3) | P-031 → P-033 → P-031 → P-030 | ✅ Limpieza 3,400 → 2,200 |
| HU-010 C1 y luego HU-011 sin pasar por HU-010B C3 | P-032 (`?today=2026-11-20`) → P-030 `?today=2026-12-04` | ❌ Limpieza S/ 4,400.00, total S/ 20,500.00, dos "Limpieza de cisterna" vigentes (obs. 13) |
| Mes futuro | `?month=2027-01` | ⚠️ Mes actual con aviso de formato inválido (obs. 4) |
| Concierge | `?role=raul` | ❌ Se ve como Ana, con totales (obs. 10) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | **[CERRADA 2026-11-08]** P-032 no tenía prototipo y "Registrar gasto" terminaba en "Navegación simulada". Ahora abre [P-032](prototypes/P-032-registrar-gasto.html), y lo registrado aparece en P-030 | gap | Alta | — | HU-010, RN-032 |
| 2 | **[CERRADA 2026-11-08]** El escenario era incoherente en el tiempo (hoy 04/11 con gastos hasta el 03/12). Ahora un gasto solo existe desde su `regAt`, y `?today=2026-12-04` deja diciembre como mes actual. Queda un efecto lateral (obs. 14) | comprensión | Media | — | HU-011 C4, RN-094, F7 paso 2 |
| 3 | **[ABIERTA]** HU-011 C10 sigue sin datos: no existen Limpieza S/ 400.00 del 30/11 ni S/ 300.00 del 01/12. Diciembre ya se puede consultar, pero aparece vacío | gap | Media | Agregar ambos gastos a `ROWS` con `regAt` ≤ 2026-12-04 | HU-011 C10, RN-143 |
| 4 | **[ABIERTA]** `?month=2027-01` se trata como formato inválido ("El mes indicado en la dirección no es válido."). RN-035 y HU-011 C11 esperan el EmptyState para 2027-01 | gap | Media | Decidir en la ficha qué pasa con un mes futuro y alinear RN-035 y C11 | HU-011 C11, RN-035 · §3.5 P-030 |
| 5 | **[ABIERTA]** La fila del anulado no muestra el motivo ni la fecha-hora; HU-011 C3 dice "abre el detalle de 2026-11" | comprensión | Media | Aclarar en HU-011 C3 que "detalle" es P-031, o agregar el motivo a la fila | HU-011 C3, RN-142, RN-092 |
| 6 | **[ABIERTA]** La ficha no dice si los totales y el contador son del mes completo cuando hay paginación | comprensión | Baja | Declararlo en la ficha | RN-035 · §3.5 P-030 |
| 7 | **[ABIERTA]** Los errores del formulario "Mes" no están en §3.0.6. "Elige un mes." ya sigue el patrón de RN-172; el error de formato y el de mes futuro no | comprensión | Baja | Agregarlos a §3.0.6 o quitar la validación de campo | §3.0.6, RN-172 |
| 8 | **[ABIERTA]** Siguen dos filas "Limpieza de cisterna · 08/11/2026 · Hidroclean SAC" (e-1104 anulada y e-1105). F7 paso 3 y HU-011 C6 no dicen cuál abrir | comprensión | Baja | Precisar en F7 paso 3 y HU-011 C6 que es la de S/ 1,200.00 (`factura-F001-0458.pdf`) | HU-011 C6 · F7 |
| 9 | **[ABIERTA]** HU-011 C12 (`S/ 0.50`, `S/ 18,500.00`) sin datos | gap | Baja | Agregar ambos montos a un mes | HU-011 C12, RN-055 |
| 10 | **[ABIERTA, agravada]** Raúl no está en `roles`, y `?role=raul` cae en la primera persona de la lista (Ana) y muestra los totales. Quien pruebe RN-031 por URL ve información financiera | gap | Baja | Agregar `raul` a `roles` de P-030 y P-031 | RN-031 |
| 11 | **[ABIERTA]** C8/C9 solo con el estado manual. Con `?today` y `?now` ya se puede simular el borde | comprensión | Baja | Persona "Luis con `EndDate = 2026-12-15`": acceso hasta `?today=2026-12-15&now=23:59`, P-090 desde `?today=2026-12-16&now=00:00` | HU-011 C8, C9; RN-016, RN-105 |
| 12 | **[ABIERTA]** Las categorías con total 0 se muestran como S/ 0.00 (Mantenimiento con la fecha por defecto) y la spec no lo define | comprensión | Baja | Fijarlo en la ficha cuando se cierre Q27 | RN-035 ⚠️ Q27 |
| 13 | **Nueva.** El orden de los escenarios cambia los totales. Registrar HU-010 C1 en P-032 crea e-1201, que **reemplaza** a e-1104 (`seedMatch`, `replaces`) y pierde su anulación de la semilla. Si luego se abre HU-011 (`?today=2026-12-04`) sin hacer HU-010B C3: Limpieza S/ 4,400.00, total S/ 20,500.00 y dos "Limpieza de cisterna" vigentes. El enlace de HU-010B C8 (`P-033 ?today=2026-11-23`) abre entonces la ConfirmPage en lugar del error. Probado en Edge | comprensión | Media | Que el gasto que reemplaza a la semilla herede su `void` (y su `hire`), o que la banda diga "haz HU-010 → HU-010B C3 → HU-011, o pulsa Reiniciar datos" | HU-011 C1, C2; HU-010B C8; RN-142 |
| 14 | **Nueva.** `?today` se guarda en `sessionStorage` (`ch:today`) y afecta a **todos** los prototipos de la pestaña. Con `?today=2026-12-04`, la tarjeta de P-010 sigue diciendo "cuota de noviembre 2026" y las pantallas de reservas pasan a hoy = 04/12 | comprensión | Baja | Mostrar la fecha simulada en la banda de todas las pantallas y calcular el texto de P-010 con `CH.TODAY` | F7 paso 1 · `shell.js` |

### 5. Decisiones recomendadas antes de implementar

1. ~~**Prototipar P-032**~~ ✅ Hecho (obs. 1).
2. **Completar los datos de HU-011 C10 y C12** y agregar la persona con `EndDate` (obs. 3, 9, 11).
3. **Decidir el comportamiento de un mes futuro** en la ficha y alinear RN-035 / HU-011 C11 (obs. 4).
4. **Hacer que el reemplazo de e-1104 herede su anulación**, o documentar el orden de los escenarios (obs. 13).
5. **Aclarar dónde se ve el motivo del anulado** (obs. 5). Las obs. 6, 7, 8, 10, 12 y 14 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-030 cubiertas por completo | HU-010 ✅ (su parte en P-030), HU-011 ⚠️ → 1 de 2 | **50 %** (100 % con parcial) · antes 0 % |
| Criterios de HU-011 observables desde P-030 | 6 ✅ (C1, C2, C4, C5, C7, C14) + 5 ⚠️ (C3, C8, C9, C11, C12) + 1 ❌ (C10) de 12 | **50 %** completos · **92 %** con parciales (sin cambio) |
| Reglas de la ficha de P-030 (RN-015, 016, 035, 036, 090, 105, 142, 143) | 4 ✅ (015, 036, 142, 143) + 4 ⚠️ (016, 035, 090, 105) | **50 %** · **100 %** con parciales |
| Reglas aplicables (14: RN-015, 016, 031, 032, 035, 036, 055, 090, 092, 094, 105, 142, 143, 144) | 8 ✅ (015, 032, 036, 055, 094, 142, 143, 144) + 6 ⚠️ (016, 031, 035, 090, 092, 105); RN-054 no verificable | **57 %** completas · **100 %** con parciales · antes 50 % |
| Totales mostrados correctos (recalculados) | 7 escenarios de la tabla, 4 cifras cada uno | **100 %** |
| Observaciones previas cerradas | 2 de 12 (1 Alta, 1 Media) | 17 % |

---

## VL-P031 · P-031 Detalle de gasto (re-revisión 2026-11-08)

**Prototipo:** [prototypes/P-031-detalle-de-gasto.html](prototypes/P-031-detalle-de-gasto.html) (con [assets/shell.js](prototypes/assets/shell.js) y [assets/expenses-data.js](prototypes/assets/expenses-data.js))
**Ficha:** [09-ui-spec.md §3.5 P-031](09-ui-spec.md) · **Flujos:** F7 (pasos 3–4), F6 (pasos 2–6) · **HU declaradas:** HU-011, HU-010B
**Veredicto:** **Pasa con observaciones.** P-031 lee `exp-session-v1`, y F6 se recorre de punta a punta sin el selector "Llegada": P-032 → P-031 "Registraste el gasto.", P-031 → P-033 → P-031 "Anulaste el gasto." con `datetime="2026-11-21T09:00:00-05:00"`, y P-031 → P-034 → P-031 con el enlace a P-041 (probado). La contradicción de fechas de la spec está corregida. Siguen abiertos el vínculo vencido, Raúl, el estado "sin comprobante" y cómo se corrige un vínculo. Además, el badge "Aprobada" que P-031 muestra tras el atajo de HU-010B C6 contradice RN-095 (ver VL-P034 obs. 1).
**Re-validación 2026-11-08:** los dos gaps Alta (obs. 1 y 2) y la obs. 3 están **cerrados**; la obs. 4 está **parcialmente cerrada**. Las demás siguen abiertas, y hay 1 observación nueva (11).

### 1. Cobertura de HUs

| HU | Criterios observables desde P-031 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-011 | 6 de 14 (C3, C5, C6, C7, C12, C13) | ⚠️ Parcial | Con `?today=2026-12-04`: ✅ C3 (e-1104: "Anulado el 21/11/2026 09:00 · Motivo: Monto mal digitado; se registra de nuevo por S/ 1,000.00", `datetime="2026-11-21T09:00:00-05:00"`). ✅ C5 (e-1114: "Fecha del gasto 28/11/2026 · Registrado el 03/12/2026"). ✅ C6 (Luis: monto, fecha, categoría, "Hidroclean SAC · RUC 20601987654", "Se descargó factura-F001-0458.pdf (180 KB)", `href="#"`, sin URL de blob). ✅ C7 (Carla → P-090; con un id inexistente → P-091, RN-103). ⚠️ C12 sin datos. ⚠️ C13: el `403` del comprobante solo se ve a nivel de página |
| HU-010B | Destino de C3, C6 y C8; ausencia de Editar/Borrar (C1, C5); acciones ocultas a Marco (C9) | ✅ Cubierta (antes ❌) | ✅ C3 por el flujo real (P-033 con `?today=2026-11-21&now=09:00`). ✅ C8: `P-033 ?today=2026-11-23` → P-031 `arrive=already` "Este gasto ya estaba anulado." con el motivo y la fecha-hora originales. ✅ C6 por el flujo real (P-041 como Marco aprueba h-101 → P-034 → P-031 "Pintura de fachada → Aprobada"). ⚠️ Con el atajo "Pintura de fachada aprobada (C6)" de P-034, P-031 muestra "Aprobada" aunque P-041 dice "Enviada a la Junta" (VL-P034 obs. 1). Los criterios del formulario se revisan en VL-P033 y VL-P034 |
| HU-010 | Destino de F6 paso 2 | ✅ | P-031 `?id=e-1201&arrive=registered`: "Registraste el gasto.", "Registrado el 20/11/2026 por la Administración" |

**HU Must faltantes en esta pantalla:** ninguna sin representar; HU-011 sigue parcial (C12, C13).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-091 | Sin Editar ni Borrar | ✅ | Solo "Vincular" y "Anular"; texto muted de inmutabilidad |
| RN-092 | Motivo y fecha-hora ISO 8601 del anulado | ✅ (antes ⚠️) | `<time datetime="2026-11-21T09:00:00-05:00">`; la fecha coincide con HU-010B C3 y con la ficha |
| RN-167 | No anular dos veces; conservar la primera | ✅ | `arrive=already` conserva el motivo original (probado tras la anulación en la sesión) |
| RN-095 ⚠️ Q30 | Solo contrataciones `Approved` | ⚠️ | Con el flujo real, ✅. Con el atajo de P-034, `hireSim` hace que P-031 pinte "Aprobada" para h-101, que está `Submitted` (VL-P034 obs. 1). Q30 sigue abierta (obs. 4) |
| RN-107 | Descarga por la API con la política del registro | ⚠️ | Descarga simulada sin URL pública; `403` solo a nivel de página |
| RN-103 | 404 antes que 403 | ✅ | Carla + `id=e-9999` → "No encontramos lo que buscas" |
| RN-036 | Sin unidades ni personas | ✅ | "por la Administración" |
| RN-090 | Monto, fecha, categoría, proveedor, comprobante | ✅ | `<dl>` + "Comprobante" |
| RN-033 ⚠️ Q28 | Sin comprobante no se registra | ⚠️ | El estado "Vacío (sin comprobante ni vínculo)" sigue (obs. 5) |
| RN-142 / RN-143 / RN-144 / RN-055 | No suma · mes de la fecha · fecha de registro · formato | ✅ | "No suma al total del mes"; "← Gastos de noviembre 2026"; "Registrado el"; `CH.money` |
| RN-015 | Inquilino sin finanzas | ✅ | Carla → P-090 |
| RN-016 / RN-105 | Vínculo vencido → 403 | ❌ | Sin estado `denied` ni persona con `EndDate` (obs. 6) |
| RN-031 | Concierge → 403 | ⚠️ | Raúl no está; `?role=raul` cae en Ana (ver VL-P030 obs. 10) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F7 pasos 3–4 · Luis, `?today=2026-12-04` | P-030 → P-031 e-1104 → "Descargar comprobante" | ✅ |
| F6 paso 2 | P-032 → P-031 "Registraste el gasto." | ✅ (antes ⚠️ solo selector) |
| F6 pasos 3–4 | P-031 "Anular gasto" → P-033 `?id=e-1201` → P-031 "Anulaste el gasto." sin acciones | ✅ (antes ❌) |
| F6 pasos 5–6 | P-031 → P-034 e-1116 → h-098 → P-031 "Mantenimiento de ascensores → Aprobada" → P-041 `?id=h-098` | ✅ (antes ❌). ⚠️ P-041 no lista los gastos vinculados (obs. 9) |
| HU-010B C6 con el atajo de P-034 | P-034 "Pintura de fachada aprobada (C6)" → P-031 "Aprobada" → P-041 h-101 "Enviada a la Junta" | ❌ Estados contradictorios (VL-P034 obs. 1) |
| `arrive=` manual sobre un gasto vigente | `?id=e-1105&arrive=voided` | ⚠️ "Anulaste el gasto." en un gasto vigente (obs. 11) |
| Vínculo vencido / Raúl | — | ❌ No reproducible (obs. 6) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | **[CERRADA 2026-11-08]** P-033 no tenía prototipo. Ahora existe y se recorre P-031 → P-033 → P-031 | gap | Alta | — | HU-010B C2, C3, C7, C8, C9 |
| 2 | **[CERRADA 2026-11-08]** P-034 no tenía prototipo. Ahora existe y se recorre P-031 → P-034 → P-031 → P-041 | gap | Alta | — | HU-010B C4, C6 |
| 3 | **[CERRADA 2026-11-08]** La spec anulaba "Limpieza de cisterna" antes de registrarla. HU-010B C3/C8, RN-092, RN-167 y el wireframe de P-031 usan ahora 2026-11-21T09:00:00-05:00, y el prototipo también | gap | Media | — | HU-010B C3, C8; RN-092, RN-167 |
| 4 | **[PARCIAL 2026-11-08]** Proveedores alineados: e-1103 y e-1116 son de Ascensores Andinos SAC (h-098), y e-1107 y e-1010 de Vigilancia Total SAC (h-092). Sigue abierto: (a) Q30, si RN-095 debe exigir el proveedor elegido; (b) h-092 adjudicada por S/ 6,250.00 tiene vinculados S/ 7,000.00 (e-1010 S/ 6,250.00 + e-1107 "Mantenimiento de cámaras" S/ 750.00), y la spec no dice si el vínculo respeta el monto aprobado | comprensión | Media | Decidir Q30 (proveedor y tope de monto); mientras tanto, desvincular e-1107 o darle su propia contratación | HU-010B C6, HU-014; RN-095 ⚠️ Q30 |
| 5 | **[ABIERTA]** El estado "Vacío (sin comprobante ni vínculo)" muestra un gasto que RN-033 no permite; ahora con una nota ⚠️ Q28, pero la ficha no lo define | comprensión | Media | Retirarlo o declararlo en la ficha si Q28 crea el caso | RN-033 ⚠️ Q28, RN-090 |
| 6 | **[ABIERTA]** Sin estado "Sin acceso (vínculo vencido)" ni Raúl | gap | Baja | Copiar el estado `denied` de P-030 y agregar `raul` | HU-011 C8, C13; RN-016, RN-031, RN-105, RN-107 |
| 7 | **[ABIERTA]** No está definido si el vínculo se puede cambiar o quitar. P-034 lo marca como gap ("⚠️ VL-P031 obs. 7") | gap | Media | Decidir en HU-010B si el vínculo es único e inmutable y cómo se corrige | HU-010B, RN-091, RN-095 |
| 8 | **[ABIERTA]** El monto anulado sigue tachado (`.amount.is-void { text-decoration: line-through }`), y la ficha de P-030 dice "tachado NO" | comprensión | Baja | Unificar el criterio en §3.5 | RN-142 |
| 9 | **[ABIERTA]** P-041 no muestra los gastos vinculados (verificado en h-098 tras vincular e-1116) | mejora | Baja | Evaluar "Gastos vinculados" en P-041 | HU-010B, HU-014 |
| 10 | **[ABIERTA]** HU-011 C12 sin datos | gap | Baja | Ver VL-P030 obs. 9 | HU-011 C12, RN-055 |
| 11 | **Nueva.** El selector "Llegada" (`?arrive=`) muestra el aviso aunque no corresponda al gasto: `?id=e-1105&arrive=voided` dice "Anulaste el gasto." en un gasto vigente. Ahora que F6 se recorre de verdad, el selector ya no hace falta para validar | comprensión | Baja | Mostrar el aviso solo si el estado del gasto coincide, o retirar el selector | F6 pasos 2, 4, 6 |

### 5. Decisiones recomendadas antes de implementar

1. ~~**Prototipar P-033 y P-034**~~ ✅ Hecho (obs. 1, 2).
2. ~~**Corregir la fecha-hora de la anulación**~~ ✅ Hecho (obs. 3).
3. **Decidir Q30** (proveedor elegido y tope de monto del vínculo) y si el vínculo se puede corregir (obs. 4, 7).
4. **Corregir el atajo de HU-010B C6** para que P-031 no muestre "Aprobada" sobre una contratación `Submitted` (VL-P034 obs. 1).
5. **Quitar o justificar el estado "sin comprobante"** (obs. 5). Las obs. 6, 8, 9, 10 y 11 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-031 cubiertas por completo | HU-010B ✅, HU-011 ⚠️ → 1 de 2 | **50 %** (100 % con parcial) · antes 0 % |
| Criterios de HU-011 observables desde P-031 | 4 ✅ (C3, C5, C6, C7) + 2 ⚠️ (C12, C13) de 6 | **67 %** · **100 %** con parciales |
| Criterios de HU-010B (P-031 + P-033 + P-034) | 9 ✅ de 9, probados por separado (C1 y C5 simulados con botones de la banda de P-033) | **100 %** · antes 0 % |
| Reglas de la ficha de P-031 (RN-036, 091, 092, 095, 107) | 3 ✅ + 2 ⚠️ (095, 107) | **60 %** · **100 %** con parciales |
| Reglas aplicables (17: RN-015, 016, 031, 033, 036, 055, 090, 091, 092, 095, 103, 105, 107, 142, 143, 144, 167) | 11 ✅ + 4 ⚠️ (031, 033, 095, 107) + 2 ❌ (016, 105) | **65 %** · **88 %** con parciales · antes 53 % |
| HU Must de E4 validadas de punta a punta con P-030 a P-034 | HU-010 ✅, HU-010B ✅, HU-011 ⚠️ (C10 ❌) | **2 de 3** · antes 0 de 3. HU-011 sumando pantallas: 8 de 14 completos (57 %), 13 de 14 con parciales (93 %) |
| Observaciones previas cerradas | 3 de 10 cerradas + 1 parcial | 30 % (35 % contando la parcial como media) |

---

## VL-P032 · P-032 Registrar gasto

**Prototipo:** [prototypes/P-032-registrar-gasto.html](prototypes/P-032-registrar-gasto.html) (con [assets/shell.js](prototypes/assets/shell.js) y [assets/expenses-data.js](prototypes/assets/expenses-data.js))
**Ficha:** [09-ui-spec.md §3.5 P-032](09-ui-spec.md) · **Flujos:** F6 (pasos 1, 2 y 2a) · **HU declaradas:** HU-010
**Veredicto:** **Pasa con observaciones.** Los 15 criterios de HU-010 se reproducen con `?today=2026-11-20` y dan el código y el texto de §3.0.6 en su campo. Tras un `422`, `413` o `415` se conservan los valores salvo el archivo, y aparece el hint "Vuelve a elegir el archivo.". El corte de red no guarda nada, y el reenvío tras un corte "después de guardar" no duplica. El registro llega a P-031 y suma en P-030. Los gaps: F6 2a ("Registrar proveedor") sigue simulado aunque P-043 existe; la regla de formato del monto (RN-173) no dice cómo trata el signo; y la idempotencia de gastos (Q48) no tiene una RN.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-032 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-010 | 15 de 15 | ✅ Cubierta | Recorridos en Edge con `?today=2026-11-20&now=10:30` (min de la fecha 2025-11-20, max 2026-11-20). **C1:** "Limpieza de cisterna / 1200.00 / 2026-11-08 / Limpieza / Hidroclean SAC + factura-F001-0458.pdf" → P-031 `id=e-1201`, "Registrado el 20/11/2026"; aparece en P-030 noviembre. **C2** `EXPENSE_RECEIPT_REQUIRED` "Adjunta el comprobante del gasto.". **C3** 0.00 y **C10** -350.00 → `EXPENSE_AMOUNT_NOT_POSITIVE`. **C4** 1200.505 → `AMOUNT_INVALID_PRECISION`. **C5** 25/11/2026, **C6** 10/11/2025 y **C13** 19/11/2025 → `EXPENSE_DATE_OUT_OF_RANGE` "La fecha debe estar entre el 20/11/2025 y hoy.". **C8** S/ 0.01, **C9** `1200.5` → "S/ 1,200.50", **C11** 20/11/2026 y **C12** 20/11/2025 → registrados. **C7** Marco y **C14** Ana → P-090 (`403` al abrir la página, como manda la ficha). **C15** corte durante la carga → página de error del navegador, "Gastos registrados en esta sesión: 0", sin gasto en la sesión |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-032 | Solo el Administrator | ✅ | Marco y Ana → P-090 |
| RN-033 ⚠️ Q28 | Comprobante obligatorio | ✅ | C2 |
| RN-034 | Monto > 0 | ✅ | 0.00 y -350.00 rechazados; 0.01 aceptado |
| RN-093 | Hasta 2 decimales, se guarda con 2 | ✅ | 1200.505 rechazado; `1200.5` → S/ 1,200.50 |
| RN-094 | Fecha entre hoy − 12 meses y hoy | ✅ / ⚠️ | Bordes de C11, C12 y C13 correctos. ⚠️ "12 meses" no está definido a fin de mes (obs. 4) |
| RN-173 | Formato del monto antes de RN-034 | ✅ / ⚠️ | "1,200.50", "1200,50", "mil soles", "1200." y "+5" → `AMOUNT_INVALID_FORMAT`. ⚠️ El signo "-" se acepta como formato para que -350.00 llegue a RN-034; RN-173 no lo dice (obs. 2) |
| RN-172 | Un error por campo vacío o solo espacios | ✅ | "Completa la descripción." + "Elige la categoría."; descripción "   " → "Completa la descripción."; monto "  " → "Completa el monto." |
| RN-166 | Si falla la carga, no se guarda | ✅ | C15; el reenvío tras el corte registra una sola vez |
| Idempotencia (Q48 → ADR-0014) | El reenvío no duplica | ⚠️ | "Corte después de guardar" → reenvío → mismo gasto (1 registro en la sesión). La clave se conserva tras un `422`. **No hay una RN para gastos**: RN-163 solo habla de reservas (obs. 3) |
| RN-036 | Sin unidades ni personas | ⚠️ | Solo el hint "No incluyas números de unidad ni nombres de residentes."; el control sigue pendiente (M-20, obs. 6) |
| RN-106 | Blob con prefijo por condominio | — | No se verifica en un prototipo HTML |
| §3.0.4 · `422` | Valores conservados salvo el archivo; resumen con foco | ✅ | "Limpieza de cisterna/1200.00/2026-11-08/Cleaning/Hidroclean SAC" se conservan tras el `413` y el `415`; el archivo se borra |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F6 paso 1 | P-030 (Rosa) "Registrar gasto" → P-032 | ✅ |
| F6 paso 2 | P-032 → P-031 "Registraste el gasto." → P-030 suma | ✅ |
| F6 paso 2a | "¿No está en la lista? Registrar proveedor" | ❌ "Navegación simulada … Esta pantalla aún no tiene prototipo." aunque [P-043](prototypes/P-043-registrar-proveedor.html) existe y acepta `returnUrl=/expenses/new` (obs. 1) |
| Corte antes de guardar → "Volver a cargar" | `outcome=cut` | ✅ 0 gastos tras el corte; 1 tras el reenvío |
| Corte después de guardar → "Volver a cargar" | `outcome=cut-after` | ✅ P-031 "El reenvío usó la misma Idempotency-Key: el gasto quedó registrado una sola vez." |
| "Cancelar" / "← Gastos" | → P-030 | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | F6 paso 2a no se puede recorrer. "Registrar proveedor" llama a `CH.simulate('P-043')` (`data-sim`), que dice que la pantalla no tiene prototipo, aunque P-043 existe y vuelve a P-032 con `returnUrl=/expenses/new`. Además, la lista de proveedores de P-032 es fija (`EXP.RUC`) y no lee `suppliers-v1`, así que el proveedor nuevo no aparecería al volver | gap | Media | Cambiar el enlace a `data-go="P-043" data-params="returnUrl=/expenses/new"`, leer `suppliers-v1` en P-032 y preseleccionar `?supplierId=` | F6 2a; HU-010 (proveedor obligatorio); §3.5 P-032 Acciones |
| 2 | La regla del formato del monto no fija el signo. RN-173 define el formato como "número decimal con punto y hasta 2 decimales", y el `pattern` de `MoneyInput` (§3.0.3, `^\d+([.]\d{1,2})?$`) rechaza "-350.00" y "1200.505". Pero HU-010 C10 espera `EXPENSE_AMOUNT_NOT_POSITIVE` para -350.00, y C4 espera `AMOUNT_INVALID_PRECISION`. El prototipo acepta el "-" (regex `^-?\d+(\.\d+)?$`) y usa `novalidate`; otra implementación con el `pattern` nativo bloquearía C4 y C10 en el navegador | comprensión | Media | Precisar en RN-173 que el signo y los decimales extra pasan el formato y se evalúan en RN-034 y RN-093, y en §3.0.3 que el `pattern` es solo una ayuda (formulario `novalidate`) | HU-010 C4, C10; RN-173, RN-034, RN-093 · §3.0.3 |
| 3 | La idempotencia de `POST /api/expenses` está decidida (Q48: "Sí… T-030") pero no tiene una RN. RN-163 habla solo de reservas, y su huella es "área + unidad + franja". La ficha de P-032 y HU-010 C15 dependen de ella ("al reenviar, la idempotencia evita duplicados"), y el prototipo cita RN-163 | gap | Media | Extender RN-163 (o crear una RN) a gastos, con huella (monto, fecha, categoría, proveedor, hash del archivo), `IDEMPOTENCY_KEY_REUSED` y la regla de que un `4xx` no consume la clave | HU-010 C15; RN-163, RN-166; Q48 |
| 4 | "12 meses atrás" no está definido a fin de mes: `addMonths` usa `Date.UTC`, y con hoy = 29/02/2028 el mínimo queda en 01/03/2027 y se rechaza el 28/02/2027 | gap | Baja | Definir en RN-094 la fecha mínima (p. ej. "el mismo día del mes, o el último día si no existe") y agregar un ejemplo | RN-094 |
| 5 | El estado "Vacío (sin proveedores)" (select con "No hay proveedores registrados") no está en la ficha | comprensión | Baja | Declararlo en la ficha: mensaje y enlace a P-043 destacado | §3.5 P-032 |
| 6 | RN-036 solo tiene el hint: la descripción acepta "Reparación en B-1203" sin aviso (pendiente M-20) | gap | Baja | Cerrar M-20 (validación, guía o revisión) y reflejarlo en la ficha | RN-036, HU-010 (notas) |

### 5. Decisiones recomendadas antes de implementar

1. **Conectar F6 2a con P-043** y leer los proveedores de la sesión (obs. 1).
2. **Precisar RN-173 y el `pattern` de `MoneyInput`** para el signo y la precisión (obs. 2).
3. **Escribir la RN de idempotencia de gastos** a partir de Q48 (obs. 3).
4. Fijar la fecha mínima de RN-094 a fin de mes y el estado sin proveedores (obs. 4, 5). La obs. 6 depende de M-20.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-032 cubiertas por completo | HU-010 ✅ → 1 de 1 | **100 %** |
| Criterios de HU-010 reproducibles | 15 ✅ de 15 (C7 y C14 como `403` al abrir la página) | **100 %** (confirma lo que reportó el integrador) |
| Reglas de la ficha de P-032 (RN-032, 033, 034, 036, 093, 094, 106, 166) | 6 ✅ + 1 ⚠️ (036); RN-106 no verificable | **86 %** de las verificables · **100 %** con parciales |
| Reglas aplicables (10: RN-032, 033, 034, 036, 093, 094, 166, 172, 173 e idempotencia Q48) | 8 ✅ + 2 ⚠️ (036, idempotencia) | **80 %** · **100 %** con parciales |
| Pasos de F6 que tocan P-032 (1, 2, 2a) | 2 ✅ + 1 ❌ | **67 %** |

---

## VL-P033 · P-033 Anular gasto

**Prototipo:** [prototypes/P-033-anular-gasto.html](prototypes/P-033-anular-gasto.html) (con [assets/shell.js](prototypes/assets/shell.js) y [assets/expenses-data.js](prototypes/assets/expenses-data.js))
**Ficha:** [09-ui-spec.md §3.5 P-033](09-ui-spec.md) · **Flujos:** F6 (pasos 3–4) · **HU declaradas:** HU-010B
**Veredicto:** **Pasa con observaciones.** Es una `ConfirmPage` sin `confirm()` ni modal, con el texto de consecuencia de la ficha ("… No se puede deshacer."), un textarea de 500 caracteres y "Volver". El motivo vacío y el de solo espacios dan `EXPENSE_VOID_REASON_REQUIRED` en el campo y en el resumen. La anulación queda con `datetime="2026-11-21T09:00:00-05:00"` y deja de sumar en P-030. Un segundo intento lleva a P-031 con "Este gasto ya estaba anulado." y conserva el motivo original, y Marco ve P-090. Solo quedan gaps menores de spec.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-033 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-010B | 7 de 9 (C1, C2, C3, C5, C7, C8, C9; C4 y C6 viven en P-034) | ✅ Cubierta | **C2:** motivo "" → "No pudimos anular el gasto · Escribe el motivo de la anulación." con el foco en el resumen. **C7:** "   " → mismo error y el gasto sigue vigente (`EXP.get('e-1104').voided = false`). **C3:** `?today=2026-11-21&now=09:00`, motivo "Monto mal digitado; se registra de nuevo por S/ 1,000.00" → P-031 "Anulaste el gasto." (`role="status"`), "Anulado el 21/11/2026 09:00", `datetime="2026-11-21T09:00:00-05:00"`, sin acciones. **C8:** `?today=2026-11-23` → redirección a P-031 `arrive=already` con el motivo y la fecha-hora originales; el estado "Ya anulado en otra pestaña (C8)" permite escribir otro motivo y da el mismo resultado. **C9:** Marco → P-090. **C1/C5:** botones de la banda "PATCH monto a S/ 1,000.00" y "DELETE del gasto" → `EXPENSE_IMMUTABLE` "El gasto sigue registrado por S/ 1,200.00 (y sigue en el detalle del mes)" |

**HU Must faltantes en esta pantalla:** ninguna.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-092 | Motivo no vacío tras `trim`; fecha-hora ISO 8601 | ✅ | `!reason.trim()`; `void.at = CH.nowStamp()` → `datetime` con `-05:00` |
| RN-167 | No anular dos veces; conservar la primera | ✅ | Probado con una anulación de la semilla y con una de la sesión; también la carrera "otra sesión lo anuló un momento antes" |
| RN-142 | Deja de sumar | ✅ | P-030 noviembre: Limpieza S/ 3,400.00 → S/ 2,200.00 |
| RN-091 | `EXPENSE_IMMUTABLE` ante edición o borrado | ✅ | Simulado con la banda (no hay UI de edición, como corresponde) |
| RN-103 | 404 antes que 403 | ✅ | Estado "No encontrado (404)" antes del chequeo de rol |
| Matriz E2 | Solo Administrator; los demás `403` | ✅ | Marco y Ana → P-090 |
| §3.0.3 `ConfirmPage` | Página de confirmación, no un modal | ✅ | Formulario `POST /api/expenses/{id}/void` con "Anular gasto" (`danger`) y "Volver" |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F6 paso 3 | P-031 "Anular gasto" → P-033 `?id=e-1201` | ✅ |
| F6 paso 4 | Motivo + "Anular gasto" → P-031 "Anulaste el gasto." → P-030 deja de sumar | ✅ |
| Volver | "Volver" / "← Limpieza de cisterna" → P-031 | ✅ |
| Abrir P-033 de un gasto ya anulado | `?id=e-1104&today=2026-11-23` | ✅ Redirige a P-031 con el error. ⚠️ La ficha solo define el `POST` (obs. 1) |
| HU-010B C8 después de HU-010 C1 sin C3 | Banda: `P-033 ?today=2026-11-23` | ⚠️ Abre la ConfirmPage, porque e-1201 reemplazó a e-1104 sin su anulación (ver VL-P030 obs. 13; no se cuenta de nuevo aquí) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | La ficha define `EXPENSE_ALREADY_VOIDED` solo para el envío. No dice qué pasa al **abrir** `/expenses/{id}/void` de un gasto anulado; el prototipo redirige a P-031 con el error | comprensión | Baja | Declarar en la ficha: GET de un anulado → P-031 con "Este gasto ya estaba anulado." | RN-167 · §3.5 P-033 |
| 2 | El motivo tiene `maxlength="500"`, pero ninguna regla fija el límite ni su código si el servidor recibe más | gap | Baja | Fijar el máximo en RN-092 (o en la ficha) con su código | RN-092 |
| 3 | HU-010B C1 y C5 (`EXPENSE_IMMUTABLE`) se simulan dentro de la página de anular, donde en la aplicación real nunca aparecería ese error (es una respuesta de la API a `PATCH`/`DELETE`) | comprensión | Baja | Mover la simulación a la banda de P-031 o dejar claro que es una prueba de API (colección Postman) | HU-010B C1, C5; RN-091 |
| 4 | No está definido qué pasa con el vínculo de un gasto anulado. P-031 sigue mostrando "Contratación …" en un anulado, y la spec no dice si se conserva, se oculta o deja de contar como sustento | gap | Baja | Definirlo en HU-010B / RN-095 (junto con VL-P031 obs. 7) | HU-010B, RN-092, RN-095 |

### 5. Decisiones recomendadas antes de implementar

1. Declarar en la ficha el GET de un gasto ya anulado (obs. 1).
2. Fijar el largo máximo del motivo y qué pasa con el vínculo de un gasto anulado (obs. 2, 4).
3. Llevar C1 y C5 a una prueba de API (obs. 3).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-033 cubiertas por completo | HU-010B ✅ (su parte) → 1 de 1 | **100 %** |
| Criterios de HU-010B que viven en P-033 | 7 ✅ de 7 (C1, C2, C3, C5, C7, C8, C9; C1 y C5 simulados) | **100 %** (confirma lo que reportó el integrador) |
| Reglas de la ficha de P-033 (RN-092, 142, 167) | 3 ✅ | **100 %** |
| Reglas aplicables (RN-091, 092, 103, 142, 167 y la fila E2 de la matriz) | 6 ✅ | **100 %** |
| Pasos de F6 que tocan P-033 (3, 4) | 2 ✅ | **100 %** |

---

## VL-P034 · P-034 Vincular gasto a una contratación

**Prototipo:** [prototypes/P-034-vincular-gasto.html](prototypes/P-034-vincular-gasto.html) (con [assets/shell.js](prototypes/assets/shell.js) y [assets/expenses-data.js](prototypes/assets/expenses-data.js))
**Ficha:** [09-ui-spec.md §3.5 P-034](09-ui-spec.md) · **Flujos:** F6 (pasos 5–6) · **HU declaradas:** HU-010B
**Veredicto:** **Pasa con observaciones (condicionado a la obs. 1).** La pantalla cumple su ficha: radios solo con contrataciones `Approved` (h-098 y h-092), EmptyState "No hay contrataciones aprobadas para vincular." con solo "Volver", y `EXPENSE_HIRE_NOT_APPROVED` en el `fieldset` ante un `PUT` directo con h-101. Al guardar vuelve a P-031 con el enlace al expediente, y P-041 abre h-098. HU-010B C6 se valida bien por el camino real (Marco aprueba h-101 en P-041 → P-034). Pero el atajo "Pintura de fachada aprobada (C6)" guarda en la sesión un vínculo a h-101, que sigue `Submitted`. Desde ahí, P-031 le muestra "Aprobada" a cualquier persona, incluida Ana, mientras P-041 dice "Enviada a la Junta". Eso contradice RN-095 y deja HU-010B C4 sin poder reproducirse.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-034 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-010B | C4 y C6 (el integrador cita también C9, pero C9 es sobre anular; aquí aplica la fila H4 de la matriz) | ⚠️ Parcial | ✅ **C4:** estado "Pintura de fachada en la Junta (C4)" y botón "PUT directo con h-101" → "Solo puedes vincular el gasto a una contratación aprobada." (`EXPENSE_HIRE_NOT_APPROVED · 422`). ✅ **C6 por el camino real:** P-041 `?role=marco&id=h-101` → "Aprobar" → "Aprobada el 04/11/2026" → P-034 e-1115 → h-101 → P-031 "Pintura de fachada → Aprobada". ❌ **C6 por el atajo:** el vínculo persiste con `hireSim: true` y P-031 pinta "Aprobada" sobre h-101 `Submitted` (obs. 1). ⚠️ Después de C6, por cualquiera de los dos caminos, C4 ya no se puede reproducir sin "Reiniciar datos": e-1115 queda "ya vinculado" (obs. 6). Matriz H4: Marco → P-090 ✅ |

**HU Must faltantes en esta pantalla:** ninguna sin representar; C6 depende de no usar el atajo.

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-095 ⚠️ Q30 | Solo contrataciones `Approved` | ⚠️ | ✅ La lista filtra `status === 'Approved'` y el envío lo vuelve a validar. ❌ El atajo C6 deja persistido un vínculo a una contratación `Submitted` (obs. 1). ⚠️ No se valida ni el proveedor ni el monto (obs. 3) |
| RN-172 | Campo obligatorio | ✅ | Sin elegir → "Elige la contratación aprobada." (`FIELD_REQUIRED · 422`) en el `fieldset` y en el resumen |
| RN-103 | 404 antes que 403 | ✅ | Estado "No encontrado (404)" antes del rol |
| Matriz H4 | Solo Administrator | ✅ | Marco → P-090 |
| §3.0.5 | Badge "Aprobada" (success) | ✅ | En cada opción, con "Aprobada el dd/mm/aaaa" y "Proveedor elegido: … · S/ …" |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F6 paso 5 | P-031 e-1116 "Vincular a una contratación" → P-034 | ✅ |
| F6 paso 6 | Elegir "Mantenimiento de ascensores" → "Vincular" → P-031 "Vinculaste el gasto a la contratación." → enlace → P-041 `?id=h-098` | ✅ |
| Volver a abrir P-034 del gasto vinculado | `?id=e-1116` | ⚠️ "Este gasto ya está vinculado a 'Mantenimiento de ascensores'. Ver el expediente →" (la spec no lo define, obs. 2) |
| Gasto anulado | Estado "Gasto anulado" | ⚠️ "Este gasto está anulado: no se puede vincular." (la spec no lo define, obs. 2) |
| Sin contrataciones aprobadas | Estado "Sin contrataciones aprobadas" | ✅ EmptyState y solo "Volver" |
| HU-010B C6 por el atajo | Estado C6 → P-031 → P-041 h-101 | ❌ "Aprobada" en P-031 / "Enviada a la Junta" en P-041 (obs. 1) |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | El atajo "Pintura de fachada aprobada (C6)" aprueba h-101 "solo en esta vista" (`d.hires`, copia local), pero el vínculo se guarda en `exp-session-v1` con `hireSim: true`. Desde ahí, P-031 de e-1115 muestra "Contratación: Pintura de fachada → **Aprobada**" a **todas** las personas (probado como Ana), mientras P-041 h-101 dice "Enviada a la Junta". El prototipo queda mostrando un gasto vinculado a una contratación que no está aprobada: justo el caso que RN-095 y HU-010B C4 mandan rechazar | gap | **Alta** | Que el atajo apruebe h-101 en `hires-v1` (lo mismo que hace P-041) o que no persista el vínculo. Quitar `hireSim` de P-031, que siempre debe pintar el estado real de la contratación | HU-010B C4, C6; RN-095 (MUST); HU-014 |
| 2 | La spec no define qué pasa al vincular un gasto **anulado** o **ya vinculado**. El prototipo inventa dos mensajes, sin código de error ni regla. La API (`PUT /api/expenses/{id}/supplier-hire`) tampoco tiene respuesta definida para esos casos | gap | Media | Definir en HU-010B / RN-095 (con VL-P031 obs. 7) si el vínculo es único e inmutable, y los códigos (p. ej. `EXPENSE_ALREADY_LINKED`, `EXPENSE_VOIDED`) | HU-010B; RN-091, RN-095 |
| 3 | La lista acepta cualquier contratación aprobada, sin mirar el proveedor ni el monto. Se puede vincular e-1116 (Ascensores Andinos SAC) a "Cámaras de seguridad Torre B" (Vigilancia Total SAC), y h-092 ya tiene S/ 7,000.00 vinculados frente a S/ 6,250.00 adjudicados. El prototipo muestra "Proveedor elegido: …", pero no avisa | gap | Media | Decidir Q30: exigir el proveedor elegido y el tope del monto aprobado, o avisar sin bloquear | HU-010B C6, HU-014; RN-095 ⚠️ Q30 |
| 4 | Los datos de C4 y C6 no cuadran en el tiempo. e-1115 "Pintura de fachada – adelanto S/ 9,250.00" tiene fecha 28/10/2026 y ya suma en los totales de octubre de los propietarios (S/ 36,700.00), aunque h-101 sigue en la Junta (rechazada el 29/10, reenviada el 02/11). Al aprobarla, la fecha es `CH.TODAY` (04/11/2026), no la del 2026-11-25 del ejemplo de RN-095. Un propietario lee "se pagó un adelanto antes de que la Junta aprobara" | comprensión | Media | Fechar el adelanto después de la aprobación (≥ 2026-11-25) y aprobar h-101 con esa fecha; decidir si un gasto vinculado puede ser anterior a la aprobación | HU-010B C4, C6; RN-095; HU-013 |
| 5 | El prototipo agrega a cada opción "Proveedor elegido · monto" y el error `FIELD_REQUIRED`, pero la ficha de P-034 no los define | comprensión | Baja | Llevar ambos a la ficha (wireframe y Estados) | §3.5 P-034; RN-172 |
| 6 | HU-010B C4 y C6 usan el mismo gasto (e-1115) y la misma contratación (h-101). Después de validar C6 por cualquier camino, C4 ya no se reproduce (e-1115 queda "ya vinculado" y h-101 aprobada) y la banda no avisa que hay que pulsar "Reiniciar datos" | comprensión | Baja | Indicar en la banda el orden C4 → C6, o usar un gasto distinto para cada criterio | HU-010B C4, C6 |

### 5. Decisiones recomendadas antes de implementar

1. **Corregir el atajo de C6** para que el prototipo nunca muestre un vínculo a una contratación no aprobada (obs. 1).
2. **Decidir Q30** (proveedor y tope de monto) y los casos "anulado" y "ya vinculado", con sus códigos (obs. 2, 3).
3. **Alinear las fechas del adelanto y de la aprobación de h-101** con RN-095 (obs. 4).
4. Pasar a la ficha el detalle de las opciones y `FIELD_REQUIRED`, y ordenar C4 → C6 en la banda (obs. 5, 6).

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-034 cubiertas por completo | HU-010B ⚠️ (C6 se rompe por el atajo) → 0 de 1 | **0 %** (100 % con parcial; ✅ si se corrige la obs. 1) |
| Criterios de HU-010B que viven en P-034 | C4 ✅ + C6 ✅ por el camino real / ❌ por el atajo | **2 de 2** por el camino real · **1 de 2** con el atajo de la banda |
| Reglas de la ficha de P-034 (RN-095) | 1 ⚠️ | **0 %** · **100 %** con parcial |
| Reglas aplicables (RN-095, RN-103, RN-172 y la fila H4 de la matriz) | 3 ✅ + 1 ⚠️ (095) | **75 %** · **100 %** con parciales |
| Pasos de F6 que tocan P-034 (5, 6) y el vínculo a P-041 | 3 ✅ | **100 %** |

---

## VL-P042 · P-042 Crear o editar contratación

**Prototipo:** [prototypes/P-042-crear-contratacion.html](prototypes/P-042-crear-contratacion.html) (con [assets/shell.js](prototypes/assets/shell.js), datos `CH.DATA.hires` y estado de sesión `hires-v1` y `suppliers-v1`)
**Ficha:** [09-ui-spec.md §3.6 P-042](09-ui-spec.md) · **Flujos:** F8 (pasos 1–3 y 5b) · **HU declaradas:** HU-012
**Veredicto:** **Pasa con observaciones.** P-042 cierra lo que pedían VL-P040 obs. 1 y VL-P041 obs. 1: F8 se recorre en Edge sin interfaz de punta a punta (crear → cotizaciones → P-043 → enviar → P-041 → rechazo de Marco → editar en P-042 → reenviar). Cumple su ficha: solo la sección 1 hasta guardar, el checklist con los datos guardados, los cuatro códigos de monto en el orden correcto, `HIRE_NOT_EDITABLE` sin formularios y el `403` para Ana y Marco. El constructor dice que se reproducen **14 de 14** criterios de HU-012. Esta revisión cuenta **12 ✅ y 2 ⚠️**. C14 ("adjunta la garantía") solo se puede hacer **reemplazando el PDF de la cotización** (obs. 1), y C7 choca con RN-169 (VL-P043 obs. 1). No hay gaps Alta en esta pantalla. Los gaps Media están en la spec: el documento de la cotización es opcional, la justificación dice "(obligatorio)" pero el borrador se guarda sin ella, y faltan las trazas a RN-172 y RN-173.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-042 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-012 | 13 de 14 (C7 vive en P-043): 12 ✅, 1 ⚠️ | ⚠️ Parcial (casi completa) | ✅ **C1, C8, C10:** con "Cargar caso" + "Enviar" → P-041 `?id=h-101&sent=1`, "Enviada a la Junta". En el recorrido F8 también pasa con un expediente nuevo (`h-106`). ✅ **C2, C3:** resumen "Agrega cotizaciones de al menos 2 proveedores distintos." con el enlace "Agregar cotización". `sendChecks()` (l. 186–193) cuenta los RUC distintos con `new Set(h.quotes.map(q => q.ruc))`. ✅ **C4, C9:** "La justificación debe tener al menos 20 caracteres." (`trimLen`, l. 100). ✅ **C5, C12:** "El monto debe ser mayor que S/ 0.00." y "Usa como máximo 2 decimales." (`amountError`, l. 92–98). ✅ **C6:** `?id=h-101` (`Submitted`) muestra el `Alert info` "Esta contratación ya no se puede editar porque está enviada a la Junta.", sin formularios. El `422` del servidor se simula con el selector `notEditable`. ✅ **C11:** `?id=h-098` muestra "…porque está aprobada." ✅ **C13:** Ana → P-090 con la nota "H1 · R-Own ⛔" (l. 366–369). ⚠️ **C14:** el reenvío tras el rechazo funciona (ver §3), pero la única forma de "adjuntar la garantía" es editar la cotización de Pinturas Lima SAC y cambiar su documento: `if (file) q.doc = file.name` (l. 470). P-041 muestra entonces la garantía como "Descargar cotización de Pinturas Lima SAC" (obs. 1) |

**HU Must faltantes en esta pantalla:** ninguna. HU-012 queda ⚠️ por C14 (obs. 1) y por C7 en P-043 (VL-P043 obs. 1).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-037 ⚠️ Q23 ⚠️ Q30 | ≥ 2 proveedores distintos al enviar | ✅ | Se cuentan RUC, no cotizaciones: "(2 cotizaciones, 1 proveedor)" con el caso C3 y "(3 cotizaciones, 2 proveedores)" con C10 |
| RN-038 | Justificación ≥ 20 caracteres sin los espacios de los extremos | ✅ | El checklist muestra el conteo (`(64)`, `(0)`). El contador `aria-live` dice "faltan N para poder enviarla". C9 con `"  Menor precio y plaz  "` → 19 → error |
| RN-093 | Hasta 2 decimales, se guarda con 2 | ✅ | `18500.555` → `AMOUNT_INVALID_PRECISION`. Se guarda con `Math.round(Number(raw) * 100) / 100` y se muestra con `money()` (`S/ 18,500.00`) |
| RN-173 | Formato del monto antes que las reglas de monto | ✅ | `1,200.50`, `1200,50`, `mil soles` y `.5` → "Escribe el monto con números y punto decimal. Ejemplo: 1200.50". El orden es formato → precisión → monto > 0 (l. 91–98) |
| RN-100 | Monto > S/ 0.00 | ✅ | `0.00` y `-5` → `QUOTE_AMOUNT_NOT_POSITIVE` |
| RN-172 | Un `FIELD_REQUIRED` por cada campo vacío o con solo espacios | ⚠️ | ✅ Título `"   "` → "Completa el título."; cotización vacía → "Elige el proveedor." y "Completa el monto.". ⚠️ La justificación lleva "(obligatorio)", pero el borrador se guarda vacío (l. 433): obs. 3 |
| RN-096 | Solo `Draft`, `Submitted` y `Approved` | ✅ | Los badges vienen de §3.0.5. La contratación nueva nace en `Draft` |
| RN-097 | Fuera de `Draft` no se modifica | ✅ | `lockedView()` sin formularios para `Submitted` y `Approved`. El `422` del servidor muestra el resumen y bloquea la página (con la fricción de la obs. 5) |
| RN-098 | El rechazo vuelve a `Draft` y la administración corrige y reenvía | ✅ | `Alert warning` "La Junta Directiva rechazó esta contratación: Falta la garantía por escrito de Pinturas Lima SAC". Al reenviar se borra `rejected` y no se toca el historial |
| RN-042 | Proveedor sin cuenta | ✅ | Al volver de P-043: "Registraste al proveedor … No se creó una cuenta de usuario ni se envió una invitación." |
| RN-102 | `422` con código y mensaje de recursos | ✅ | El resumen tiene foco (`role="alert"`) y repite el error junto al campo, y se conservan los valores escritos salvo el archivo (`simFile = null`) |
| RN-118 · matriz H1 | Solo el Administrator crea, edita y envía | ✅ | Ana (R-Own ⛔) y Marco (Brd ⛔) → P-090 |
| RN-041 (expediente con sus PDF) | El expediente muestra las cotizaciones con su documento | ⚠️ | El documento es opcional y se puede enviar sin ningún PDF (obs. 2). La garantía reemplaza el PDF de la cotización (obs. 1) |
| RN-166 ⚠️ Q28 | Si falla la carga, la cotización no se guarda | ❌ | Solo se simulan `413` y `415`. Una carga cortada no tiene estado (obs. 9) |
| RN-106 | Blob privado por condominio | — | No se verifica en un prototipo |

### 3. Flujo de usuario

Recorrido automatizado en Edge sin interfaz sobre una copia de los prototipos, con un script inyectado que llena y envía los formularios (`requestSubmit()`).

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F8 1 · Rosa crea | P-040 → "Nueva contratación" → P-042, "Nueva contratación", ruta `/supplier-hires/new`; sección 2: "Podrás agregar las cotizaciones después de guardar el borrador." | ✅ |
| F8 2 · Datos y cotizaciones | Título vacío → "Completa el título." Guarda → `?id=h-106`, "Guardaste el borrador.". Montos inválidos → sus 4 códigos. Pinturas Lima SAC S/ 18,500 → "Agregaste la cotización…". Enviar con 1 proveedor y la justificación vacía → 2 errores en el resumen. Enviar con la justificación sin guardar → "Tienes cambios sin guardar en '1. Datos'…" | ✅ El orden de la ficha (guardar primero) no es el de F8 paso 2 (obs. 8) |
| F8 2 · Falta el proveedor | "Registrar proveedor" → P-043 `?returnUrl=/supplier-hires/h-106/edit` → Pinturas del Norte SAC → P-042 con `s-20604455667` elegido | ✅ |
| F8 3 · Enviar | Checklist "Cumple / Cumple" → P-041 `?id=h-106&sent=1`, "Enviaste la contratación a la Junta Directiva.", badge "Enviada a la Junta" | ✅ Las dos cotizaciones llegan **sin documento** (obs. 2) |
| F8 4–5a · Marco rechaza | P-041 como Marco → "Rechazar" con motivo → "Borrador"; historial "Rechazada por la Junta Directiva 04/11/2026 15:29" | ✅ / ⚠️ La hora es la del reloj real, no `CH.NOW` = 10:30 (obs. 7) |
| F8 5b · Rosa corrige y reenvía | P-041 (Rosa) "Editar" → P-042 "Editar contratación" con el `Alert warning` del motivo → "Editar" en la cotización de Pinturas Lima SAC → "Simular archivo: garantía" → "Guardaste los cambios … con el documento garantia-pinturas-lima-sac.pdf" → Enviar → P-041 `sent=1`, "Enviada a la Junta" | ⚠️ Llega, pero la garantía ocupa el lugar del PDF de la cotización (obs. 1) |
| Editar lo enviado | P-042 `?id=h-106` (`Submitted`) → "Esta contratación ya no se puede editar porque está enviada a la Junta." + enlace al expediente | ✅ |
| Editar lo aprobado | P-042 `?id=h-098` → "…porque está aprobada." | ✅ |
| Sin permiso | Ana y Marco → P-090 | ✅ |
| Casos de la banda | C2, C3 → `HIRE_INSUFFICIENT_QUOTES`; C4, C9 → `HIRE_JUSTIFICATION_TOO_SHORT`; C5 → `QUOTE_AMOUNT_NOT_POSITIVE`; C12 → `AMOUNT_INVALID_PRECISION`; C1, C8, C10 → P-041 "Enviada a la Junta" | ✅ "Cargar caso" borra el historial de `h-101` (obs. 6) |
| `422 HIRE_NOT_EDITABLE` del servidor | Selector `notEditable` + "Agregar cotización" en `h-104` | ⚠️ Badge "Borrador" junto a "…está enviada a la Junta", y el mensaje aparece dos veces (obs. 5) |
| Vuelta desde P-043 con `returnUrl=/supplier-hires/new` | P-042 nueva: "Ya está elegido en 'Agregar cotización'", pero ese formulario no existe en modo nuevo | ⚠️ (obs. 10) |
| Marco después del reenvío | P-040: el menú muestra "Contrataciones 2" (`h-101` y `h-106` en `Submitted`) | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | "Adjunta la garantía por escrito" (HU-012 C14, F8 5b, ejemplo de RN-098) no tiene un lugar en P-042. Cada cotización tiene un solo documento y no hay documentos de la contratación. En el prototipo, la garantía **reemplaza** el PDF de la cotización (l. 470, botón `simfile` l. 522–528). Así se pierde la cotización original, y P-041 ofrece la garantía como "Descargar cotización de Pinturas Lima SAC" | gap | Media | Decidir en la spec: (a) un campo "Documentos adicionales" por cotización o por contratación (ficha P-042, endpoint y RN-106/RN-166), o (b) reescribir C14 y F8 5b como "reemplaza la cotización de Pinturas Lima SAC por una versión que incluye la garantía". Ajustar el botón de la banda | HU-012 C14, RN-098, RN-041, HU-014 C1 |
| 2 | El documento de la cotización es opcional (ficha "Documento (opcional) ⚠️ Q28"), así que se puede enviar sin ningún PDF. En el recorrido, `h-106` llega a la Junta con "Sin documento" en las dos cotizaciones. F8 paso 2 dice "con su PDF", y RN-041 y HU-014 C1 muestran "las 2 cotizaciones con sus PDF" | gap | Media | Decidir si cada cotización enviada debe tener documento. Si debe, agregar un requisito al checklist y un código (p. ej. `HIRE_QUOTE_DOCUMENT_REQUIRED`) con su RN. Si no, quitar "con su PDF" de F8 | HU-012, RN-037, RN-041, Q28, F8 paso 2 |
| 3 | La justificación tiene la etiqueta "(obligatorio)" (ficha y prototipo), pero el borrador se guarda vacío: `f-data` solo valida el título (l. 433). En el recorrido se guardó `h-106` con 0 caracteres. RN-172 manda rechazar un dato obligatorio vacío, y RN-038 solo se aplica al enviar | comprensión | Media | Elegir una opción: cambiar la etiqueta a "Justificación (necesaria para enviar)" con el hint de RN-038, o exigir `FIELD_REQUIRED` al guardar y anotarlo en la ficha | RN-172, RN-038, §3.6 P-042 |
| 4 | Trazas que faltan en la spec: la ficha de P-042 no cita RN-172 ni RN-173 en "Reglas", y sus "Estados" no nombran `FIELD_REQUIRED` ni `AMOUNT_INVALID_FORMAT` (el prototipo los toma de §3.0.6). HU-012 no tiene criterios para esos códigos, y su línea "Reglas de negocio relacionadas" tampoco cita RN-169, RN-172 ni RN-173 | gap | Media | Agregar RN-172 y RN-173 a la ficha de P-042, y RN-169 a la de P-043. En HU-012, agregar criterios negativos ("monto `1,200.50` → `AMOUNT_INVALID_FORMAT`", "título vacío → `FIELD_REQUIRED`", RUC duplicado) y completar las reglas relacionadas | HU-012, RN-172, RN-173, RN-169, §3.6 P-042 |
| 5 | Con `422 HIRE_NOT_EDITABLE` del servidor (selector `notEditable`), la página queda bloqueada, pero el badge sigue en "Borrador" junto a "…porque está enviada a la Junta". Además, el mismo texto sale dos veces: en el resumen y en el `Alert info` (l. 411–414, 228–234) | comprensión | Baja | Recargar los datos, como en el conflicto de §3.0.4: badge "Enviada a la Junta" y un solo mensaje | RN-097, HU-012 C6, §3.0.4 |
| 6 | "Cargar caso" reemplaza `h-101` con `history: []` (l. 120–122) y borra el rechazo del seed. Si después se valida HU-013 C5 o HU-014 C2 en P-041, el historial ya no tiene la primera decisión | comprensión | Baja | Cargar los casos sobre un id propio (p. ej. `h-201`) o conservar `history` | RN-040, HU-013 C5, HU-014 C2 |
| 7 | P-041 registra la decisión con el reloj real (`nowIso()`, P-041 l. 58), no con `CH.NOW`. En el recorrido, el rechazo quedó a las 15:29 cuando la hora simulada era 10:30, así que la decisión aparece "después de ahora". Esto suma a VL-P041 obs. 4 (los segundos) | gap | Baja | Usar `CH.nowStamp()` con segundos en P-041 | HU-013 C4, RN-040 (relación P-041) |
| 8 | F8 paso 2 dice "escribe título y justificación; agrega 2 cotizaciones…; pulsa 'Guardar borrador'", pero la ficha y el prototipo exigen guardar antes de agregar cotizaciones | comprensión | Baja | Reordenar F8 paso 2: "Guarda el borrador → agrega 2 cotizaciones" | F8, §3.6 P-042 |
| 9 | No se puede quitar una cotización (la ficha solo tiene agregar y editar), y una carga fallida (RN-166) no tiene estado: solo se simulan `413` y `415` | gap | Baja | Definir si existe "Quitar cotización" en `Draft` (`DELETE …/quotes/{quoteId}`) y agregar a la banda un estado "La carga falló", con el texto que pide RN-166 | RN-097, RN-166 ⚠️ Q28, HU-012 |
| 10 | Al volver de P-043 con `returnUrl=/supplier-hires/new`, P-042 dice "Ya está elegido en 'Agregar cotización'", pero en modo nuevo ese formulario no existe. Además, la preselección se pierde al guardar, porque el redirect a `?id=…&saved=1` reinicia `qform` | fricción | Baja | En modo nuevo, conservar el `supplierId` en la redirección de "Guardar borrador" o cambiar el texto del aviso | HU-012 C7, §3.6 P-043 ("vuelve con el proveedor preseleccionado") |

### 5. Decisiones recomendadas antes de implementar

1. **Definir cómo se adjunta un documento que no es la cotización** (garantía, carta) o reescribir HU-012 C14 y F8 5b (obs. 1).
2. **Decidir si el PDF de cada cotización es obligatorio para enviar**, junto con Q28 (obs. 2).
3. **Alinear "(obligatorio)" de la justificación con RN-172 y RN-038** (obs. 3).
4. **Completar las trazas** de RN-169, RN-172 y RN-173 en HU-012 y en las fichas de P-042 y P-043 (obs. 4).
5. **Usar `CH.NOW` en P-041** y cargar los casos de la banda sobre un id propio (obs. 6, 7). Los puntos 5, 8, 9 y 10 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-042 cubiertas por completo | HU-012 ⚠️ → 0 de 1 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-012 observables desde P-042 | 13 (C1–C6, C8–C14): 12 ✅, 1 ⚠️ (C14) | **92 %** (100 % con parcial) |
| Criterios de HU-012 con P-040 a P-043 | 14: 12 ✅, 2 ⚠️ (C7, C14). El constructor declaró 14 de 14 | **86 %** (100 % con parcial) |
| Reglas de la ficha de P-042 reflejadas (RN-037, RN-038, RN-093, RN-096, RN-097, RN-100) | 6 de 6 | **100 %** |
| Reglas aplicables reflejadas (15: RN-037, RN-038, RN-041, RN-042, RN-093, RN-096, RN-097, RN-098, RN-100, RN-102, RN-106, RN-118, RN-166, RN-172, RN-173) | 11 ✅, 2 ⚠️ (RN-041, RN-172), 1 ❌ (RN-166), 1 no verificable (RN-106) | **73 %** completas · **87 %** con parciales |
| HU Must del lote (19) con presencia en P-042 | 1 de 19 | 5 % (referencial: una sola pantalla) |

---

## VL-P043 · P-043 Registrar proveedor

**Prototipo:** [prototypes/P-043-registrar-proveedor.html](prototypes/P-043-registrar-proveedor.html) (con [assets/shell.js](prototypes/assets/shell.js), estado de sesión `suppliers-v1`; los RUC existentes salen de `CH.DATA.hires`)
**Ficha:** [09-ui-spec.md §3.6 P-043](09-ui-spec.md) · **Flujos:** F8 (paso 2, proveedor que falta), F6 2a · **HU declaradas:** HU-012
**Veredicto:** **Pasa con observaciones (condicionado).** La pantalla aplica RN-169 completa: 11 dígitos, prefijo 10 o 20 coherente con la casilla, y duplicado. También aplica RN-172 por campo, muestra el aviso "El proveedor no recibe una cuenta ni una invitación." (RN-042), ignora un `returnUrl` externo y vuelve a P-042 con el proveedor elegido. **El choque conocido se confirma (obs. 1, Alta):** HU-012 C7 registra Pinturas Lima SAC (RUC 20512345678), que ya es proveedor en el seed y en los demás criterios de la misma HU, y RN-169 lo rechaza con `SUPPLIER_RUC_DUPLICATE`. C7, tal como está escrito, no se puede validar. Su comportamiento (sin cuenta ni invitación) solo se ve con otro proveedor. Además, la spec no cubre el RUC 10 en "Razón social", la fila de permisos ni el texto de error de la ficha.

### 1. Cobertura de HUs

| HU | Criterios observables desde P-043 | Estado | Evidencia y faltantes |
|---|---|---|---|
| HU-012 | 1 de 14 (C7): 0 ✅, 1 ⚠️ | ⚠️ Parcial | ⚠️ **C7:** el botón de la banda "Rellenar: Pinturas Lima SAC (C7; ya está en el seed → duplicado)" + "Registrar proveedor" → "Ya hay un proveedor registrado con este RUC." (recorrido F8). `existingRucs()` (l. 29–35) incluye los RUC de las cotizaciones del seed, entre ellos `20512345678` de `q-1011` (`h-101`). Con Pinturas del Norte SAC (`20604455667`) sí se guarda: vuelve a P-042 con "No se creó una cuenta de usuario ni se envió una invitación.", y el registro en `suppliers-v1` no tiene usuario (l. 205–208). Ver obs. 1 |

**HU Must faltantes en esta pantalla:** ninguna sin cobertura, pero HU-012 C7 no se valida con sus datos (obs. 1).

### 2. Reglas de negocio

| Regla | Qué exige | En la UI | Cómo se ve o por qué no |
|---|---|---|---|
| RN-042 | Sin cuenta ni invitación para el proveedor | ✅ | `Alert info` "El proveedor no recibe una cuenta ni una invitación." Solo se guarda `{ id, ruc, name, natural, personName }`. El aviso de éxito lo repite en P-042 |
| RN-169 | 11 dígitos; prefijo 10 o 20 coherente con el tipo; RUC duplicado con su propio código | ✅ | `2051234567` → `SUPPLIER_RUC_INVALID_FORMAT`; `10456789012` sin marcar "persona natural" → `SUPPLIER_RUC_INVALID_FORMAT`; `20512345678` → `SUPPLIER_RUC_DUPLICATE` (l. 64–73). Textos de §3.0.6. No se valida el dígito verificador (obs. 9) |
| RN-037 (contraejemplo de RN-169) | Un proveedor registrado dos veces no cuenta como dos | ✅ | El duplicado se rechaza, y P-042 cuenta los proveedores por RUC |
| RN-172 | `FIELD_REQUIRED` por campo | ✅ | Estado "Campos vacíos": "Completa el RUC.", "Completa la razón social." (solo espacios) y "Completa el nombre de la persona." |
| RN-102 | `422` con código y mensaje de recursos | ✅ | Resumen con foco, error junto al campo y valores conservados |
| RN-074 · `returnUrl` local | Ignorar un `returnUrl` que no sea una ruta local | ✅ | `returnUrl=https://otro.example/` → ruta `/suppliers/new?returnUrl=%2Fsupplier-hires`, "← Contrataciones" |
| RN-052 ⚠️ Q34 | Nombre y RUC 10 de persona natural cifrados | ⚠️ | La nota está en la casilla, pero "Razón social" (obligatoria) recibe el mismo nombre de la persona y la spec no dice si ese campo también se cifra (obs. 2) |
| RN-118 · matriz | `403` a quien no tiene permiso | ⚠️ | Ana, Luis, Marco, Carla y Raúl → P-090, pero la matriz no tiene una fila para registrar proveedores (obs. 3) |

### 3. Flujo de usuario

| Flujo | Recorrido en el prototipo | Resultado |
|---|---|---|
| F8 2 · desde P-042 | P-042 "Registrar proveedor" → P-043 `returnUrl=/supplier-hires/h-106/edit` → errores de RN-169 → Pinturas del Norte SAC → P-042 `?id=h-106` con `s-20604455667` elegido | ✅ |
| HU-012 C7 con sus datos | Pinturas Lima SAC, `20512345678` → `SUPPLIER_RUC_DUPLICATE` | ❌ El criterio espera que se guarde (obs. 1) |
| Desde P-040 (`returnUrl=/supplier-hires`) | Persona natural Julio Vargas Ríos (`10457812369`) → P-040 `?supplierId=s-10457812369` | ⚠️ Vuelve sin ningún aviso (obs. 5) |
| Desde `/supplier-hires/new` | Andamios Lima SAC → P-042 nueva con un aviso que no aplica | ⚠️ (VL-P042 obs. 10) |
| F6 2a · desde P-032 | P-032 "Registrar proveedor" → `CH.simulate('P-043')` (P-032 l. 293), con su propia lista de RUC (P-032 l. 53) | ❌ No llega a este prototipo y no comparte `suppliers-v1` (obs. 6) |
| `returnUrl` externo | Se reemplaza por `/supplier-hires` | ✅ |
| Sin permiso | Raúl (y Ana, Luis, Marco, Carla) → P-090 | ✅ Sin fila en la matriz (obs. 3) |
| Cancelar | `data-ret` → `returnUrl` | ✅ |

### 4. Observaciones

| # | Observación | Tipo | Severidad | Acción sugerida | HU / regla afectada |
|---|---|---|---|---|---|
| 1 | **Choque C7 ↔ RN-169.** HU-012 C7 registra Pinturas Lima SAC (RUC 20512345678) y espera que se guarde. Pero C1, C2, C3, C10 y C14 de la misma HU, el seed (`h-101`, `q-1011`) y la tarea del backlog (08-backlog l. 919) ya tienen a Pinturas Lima SAC como proveedor. Con RN-169 (MUST), el registro responde `SUPPLIER_RUC_DUPLICATE`, que es lo que hace el prototipo, y el constructor lo anota en la banda ("ya está en el seed → duplicado"). Escrito así, C7 falla en cualquier entorno con los datos de F8, y el criterio de completitud de la tarea (08-backlog l. 925) también. La conducta de RN-042 solo se valida con otro proveedor | gap | **Alta** | Reescribir C7 con un proveedor nuevo (p. ej. "Pinturas del Norte SAC, RUC 20604455667") o con la precondición "Pinturas Lima SAC aún no está registrado". Agregar a HU-012 un criterio negativo: "registrar otra vez 20512345678 → `422 SUPPLIER_RUC_DUPLICATE`". Corregir 08-backlog l. 925 | HU-012 C7, RN-169, RN-042, 08-backlog |
| 2 | Proveedor persona natural: "Razón social (obligatorio)" y "Nombre de la persona" guardan el mismo dato. La banda llena los dos con "Julio Vargas Ríos". RN-052 cifra "el nombre", pero no dice si la razón social de un RUC 10 también se cifra, y P-042 y P-041 muestran la razón social en claro | gap | Media | Definir en RN-052 y en la ficha: con RUC 10, un solo campo de nombre, cifrado y usado como razón social (o la razón social también se cifra). Resolverlo junto con Q34 | RN-052 ⚠️ Q34, RN-041, §3.6 P-043 |
| 3 | La matriz de permisos no tiene una fila para "registrar un proveedor" (`POST /api/suppliers`). El prototipo da `403` a todos menos al Administrator y lo anota ("la matriz de permisos no tiene una fila propia para proveedores", l. 139). La usan P-042 y P-032 (F6 2a) | gap | Media | Agregar una fila "S1 · Registrar proveedor" (Adm ✅, los demás ⛔) con su test `Authz_Suppliers_Create`, y una fila de lectura del catálogo si hace falta | RN-118, RN-042, PRINCIPIO-006 (matriz §6) |
| 4 | La ficha de P-043 está desactualizada. "Estados" todavía dice "El RUC tiene 11 dígitos. (código pendiente de definir en las reglas)", aunque §6 punto 10 está resuelto y §3.0.6 tiene `SUPPLIER_RUC_INVALID_FORMAT` y `SUPPLIER_RUC_DUPLICATE` con otro texto. "Reglas" no cita RN-169 ni RN-172, y HU-012 no tiene un criterio para el formato del RUC | comprensión | Media | Actualizar la ficha: errores de RN-169 y RN-172, reglas RN-169 y RN-172. Agregar a HU-012 los criterios de formato y duplicado (con los ejemplos de RN-169) | RN-169, RN-172, HU-012, §3.6 P-043 |
| 5 | Si se registra desde P-040 (`returnUrl=/supplier-hires`), vuelve a P-040 con `?supplierId=…` sin ningún aviso, y no hay una pantalla que liste los proveedores. El Administrator solo puede comprobar que "el proveedor existe" (C7) abriendo el desplegable de P-042 | fricción | Media | Mostrar en P-040 un `Alert success` "Registraste al proveedor {razón social}." cuando llega `supplierId`, o definir en la ficha qué ve el usuario al volver a una pantalla sin selector | HU-012 C7, §3.6 P-043 ("Éxito → returnUrl") |
| 6 | El catálogo de proveedores no es el mismo en los prototipos: P-032 tiene su propia lista de RUC (P-032 l. 53) y simula P-043 (l. 293). Un proveedor registrado en P-043 no aparece en "Registrar gasto", aunque P-043 dice "para usarlo en cotizaciones y gastos" | gap | Baja | Pasar los proveedores a `CH.DATA.suppliers` + `suppliers-v1` y enlazar P-032 → P-043 real con `returnUrl=/expenses/new` | HU-010 (F6 2a), RN-042 |
| 7 | El campo "Nombre de la persona" se pinta con `hidden` cuando la casilla no está marcada (l. 110). La ficha dice "sin JS: campo siempre visible con hint", así que el atributo debería ponerlo solo el JS | comprensión | Baja | Aclarar en la ficha que el HTML del servidor no lleva `hidden` y que solo el script lo oculta | §3.6 P-043, §3.0.4 (mejora progresiva) |
| 8 | El nombre de la persona es obligatorio si se marca la casilla ("Completa el nombre de la persona."), pero ni la etiqueta ni la ficha dicen "(obligatorio)" | comprensión | Baja | Etiqueta "Nombre de la persona (obligatorio si es persona natural)" en la ficha y en el prototipo | RN-172 |
| 9 | RN-169 solo valida el formato: un RUC con el dígito verificador equivocado se acepta. El prototipo lo anota ("no valida el dígito verificador") | mejora | Baja | Decidir si RN-169 incluye el dígito verificador de SUNAT (módulo 11). Si lo incluye, agregar un ejemplo y un contraejemplo | RN-169 |

### 5. Decisiones recomendadas antes de implementar

1. **Corregir HU-012 C7 y 08-backlog l. 925** para que no choquen con RN-169, y agregar el criterio `SUPPLIER_RUC_DUPLICATE` (obs. 1).
2. **Definir el tratamiento del proveedor persona natural** (un solo campo de nombre cifrado), junto con Q34 (obs. 2).
3. **Agregar la fila de permisos "Registrar proveedor"** y su test (obs. 3).
4. **Actualizar la ficha de P-043** con RN-169 y RN-172, y el aviso de éxito al volver a una pantalla sin selector (obs. 4, 5).
5. **Compartir el catálogo de proveedores con P-032** (obs. 6). Los puntos 7 a 9 pueden resolverse durante la implementación.

### 6. Score de completitud

| Métrica | Cálculo | Resultado |
|---|---|---|
| HU Must declaradas por P-043 cubiertas por completo | HU-012 ⚠️ → 0 de 1 | **0 %** (100 % con cobertura parcial) |
| Criterios de HU-012 observables desde P-043 | 1 (C7): 0 ✅, 1 ⚠️ | **0 %** (100 % con parcial) |
| Reglas de la ficha de P-043 reflejadas (RN-042, RN-052) | 1 ✅, 1 ⚠️ | **50 %** (100 % con parcial) |
| Reglas aplicables reflejadas (8: RN-037, RN-042, RN-052, RN-074, RN-102, RN-118, RN-169, RN-172) | 6 ✅, 2 ⚠️ (RN-052, RN-118) | **75 %** completas · **100 %** con parciales |
| HU Must del lote (19) con presencia en P-043 | 1 de 19 | 5 % (referencial: una sola pantalla) |

---

# Apéndice · Verificación independiente de la iteración 2 (2026-11-08)


**Alcance:** observaciones Alta que la "Iteración 2" de 10-validation-log.md da por cerradas (VL-P007 obs. 1, VL-P012 obs. 1 y 2, VL-P015/P016/P062 obs. 1, VL-P020 obs. 1 y 2), las decisiones del autor de hoy y las regresiones de los 32 prototipos.
**Método:** lectura de 03, 06, 07 y 09 y de `prototypes/`; recorridos en Edge headless (`--headless=new --virtual-time-budget --dump-dom`) sobre una copia de los prototipos con un script inyectado (`verify-it2/site/drive.js`, `pre.js` para adelantar `Date.now` en P-020). Cada prueba usa un perfil nuevo. No se modificó ningún archivo del proyecto.
**Aviso:** 03-reglas-de-negocio.md, 06-user-stories.md y 09-ui-spec.md cambiaron en disco mientras se hacía esta verificación (≈15:36). Revisé de nuevo los datos que uso aquí después de esa hora. Los números de línea de 03 se corrieron unas 14 líneas.

### Veredictos

| # | Observación / decisión | Veredicto | Evidencia |
|---|---|---|---|
| 1 | VL-P007 obs. 1 · puerta de consentimiento | ✅ Cerrada | `shell.js` tiene `CONSENT_KEY='consent-pending-v1'`, `consentPending` y `setConsentPending` (l. 221–229). `finishSignIn()` manda a P-007 si el consentimiento está pendiente (l. 333–334). `init()` redirige a P-007 con `returnUrl` cualquier pantalla `shell:'app'` (l. 392–396). P-007 llama a `CH.setConsentPending(ctx.roleKey, rej)` (l. 109). **Prueba:** Carla rechaza → h1 "No aceptaste el consentimiento" → `CH.go('P-014')` → `P-007?returnUrl=/reservations?view=upcoming&role=carla` → rechaza → P-001 (`returnUrl` conservado) → inicia sesión con carla.diaz@example.pe → `P-007?returnUrl=/reservations?view=upcoming` → Acepto → `P-014?view=upcoming`, h1 "Mis reservas", `consentPending('carla')=false` |
| 2a | VL-P012 obs. 1 · RN-079 por instante | ✅ Cerrada | **RN-079** dice "La comparación es por instante… el último inicio permitido es exactamente `ahora + anticipación`" y da como ejemplo 2027-02-02 10:30 ✅ / 19:00 ❌. **HU-005** tiene el criterio nuevo `[NUEVO 2026-11-08, VL-P012]` (06 l. 287). **§3.0.6** dice `RESERVATION_TOO_FAR_AHEAD` → "Solo puedes reservar hasta el {fecha límite} a las {hora límite}." (09 l. 438). P-012 compara por instante en las l. 153–156. **Prueba:** el hint muestra "Desde hoy hasta el 02/02/2027 a las 10:30 (90 días de anticipación)." 19:00 se rechaza con "Solo puedes reservar hasta el 02/02/2027 a las 10:30." en el campo Inicio. 10:30–12:00 → P-013 "¡Reserva confirmada!". Borde: 10:31 se rechaza |
| 2b | VL-P012 obs. 2 · RN-163 y un `4xx` | ✅ Cerrada | **RN-163** dice "Solo una respuesta exitosa (`2xx`) asocia la clave… Una respuesta `4xx`… no consume la clave", con un ejemplo de corrección y un contraejemplo. **HU-005** tiene el criterio nuevo (06 l. 286). La ficha de P-012 dice "**la misma** clave de idempotencia" (09, estado Error 422/403). **Prueba:** 20:00→19:00 da el error INVALID_TIME_SLOT y la clave antes y después del `422` es la misma (`01a1bcdb-…`). Al corregir a 19:00–23:00 queda `Confirmed` en P-013, y `reservation:r-9010.idempotencyKey` es igual a la clave original. Detalle: la fila `IDEMPOTENCY_KEY_REUSED` de §3.0.6 no menciona que un `4xx` no consume la clave (ver problema N8) |
| 3 | VL-P015 obs. 1 (y VL-P016, VL-P062) · hora común | ✅ Cerrada | `shell.js` l. 17–29 define `NOW` (10:30, `?now=HH:MM`, guardado en la sesión), `nowStamp`, `hasStarted` y `hasEnded` con `[inicio, fin)`. Las usan P-012 (l. 41), P-014 (l. 25, 35), P-015 (l. 79–94), P-016 (l. 81–82, 157) y P-062 (l. 53, 102–104). **Prueba con 10:30:** P-062 muestra B-205 como "En curso · Ya empezó: no se puede cancelar". P-015 de r-8970 no tiene enlace "Cancelar reserva" y dice "La reserva ya…". P-016 abierto directo muestra el h1 "No se puede cancelar esta reserva" con "La reserva ya empezó y no se puede cancelar." y ningún botón de cancelar. **Prueba con `?now=09:00`:** P-062 ofrece "Cancelar", P-015 tiene el enlace y P-016 muestra "¿Cancelar esta reserva?" con "Sí, cancelar". P-014 (Ana, 10:30) muestra el salón de hoy 19:00–23:00 como "Confirmada" |
| 4a | VL-P020 obs. 1 · nombres visibles tras un `401` | ✅ Cerrada | P-020 l. 116–118 deja, con `expired`, solo el h1 y el aviso. La ficha (09, P-020, estado "Sesión vencida durante el polling") pide retirar la lista y el buscador del DOM y `Cache-Control: no-store`. **Prueba:** antes había 8 botones "Marcar ingreso" y "Pedro Ramos" estaba en el DOM. Tras "Vence la sesión (401)" no quedan `#pt-list`, `#q` ni botones, "Pedro Ramos" no aparece en ninguna parte de `document.body.innerHTML`, y el h1 sigue siendo "Portería · miércoles 04/11/2026" |
| 4b | VL-P020 obs. 2 · el polling no cuenta como actividad | ⚠️ Parcial | **Hecho:** RN-113 se reescribió ("Una solicitud automática en segundo plano NO cuenta como actividad… el polling de la vista de portería", con el ejemplo 19:07 → 19:37:00 `401`). §6 #9 está tachado como "Resuelto el 2026-11-08: no cuenta" (09 l. 2231). HU-003B tiene el criterio `[NUEVO 2026-11-08, VL-P020]` (06 l. 223). P-020 implementa `IDLE=1800` y `touch()`. **Pruebas:** con polling a 600, 1,200 y 1,799 s la sesión sigue abierta; a 1,800 s vence (aviso fijo, sin lista ni "Pedro Ramos"). "Pasan 30 min" también la vence. "Actualizar ahora", "Marcar ingreso" o buscar a los 1,000 s → el polling a 2,000 s no vence (sin renovar, habría vencido) y vence 1,800 s después de la acción. **Falta:** 07-architecture.md (ADR de sesión, l. 743) sigue diciendo que cada request "actualiza `LastActivityAt`", y la spec no define cómo distingue el servidor el polling de "Actualizar ahora", que usan el mismo endpoint, ni del `meta refresh` sin JS (N1, N2). Buscar renueva en el prototipo, pero en la ficha es un filtro en la página que no envía ninguna solicitud (N3) |
| 5a | RN-165 reajustada | ✅ | 03 RN-165: "mostrar el mensaje propio de ese código… Una invitación vencida (RN-110) y una anulada (RN-139) muestran cada una su propio mensaje (§3.0.6)". §3.0.6 l. 422–424 tiene tres textos (venció / ya no es válida / fue anulada). P-006 l. 28–30 usa los mismos tres textos. HU-002 usa "ya no es válida" para `INVITATION_ALREADY_USED`. No queda ningún "mismo mensaje" para las invitaciones |
| 5b | RN-169 a RN-174 creadas y en §3.0.6 | ✅ (con trazabilidad incompleta) | Las seis reglas existen en 03 (RN-169 Contrataciones, RN-170 y RN-174 Padrón, RN-171 Reservas, RN-172 y RN-173 UX), con su código. Las siete filas nuevas de §3.0.6 (l. 471–477) citan su RN. Los textos de P-043, P-050, P-053, P-061, P-032 y P-042 coinciden con §3.0.6. Faltan algunas trazas (N5) |
| 5c | Fechas de anulación de "Limpieza de cisterna" | ✅ en 03, 06 y 09 · ⚠️ queda un resto en 07 | 03 RN-092 y RN-167 dicen 2026-11-21T09:00 y 2026-11-23. 06 HU-010B C3 y C8 dicen lo mismo, y HU-010 C1 se registra el 2026-11-20. 09 P-031 dice "Anulado el 21/11/2026 09:00". `grep "2026-11-10T09:00\|El 2026-11-12"` en 03, 06 y 09 da **0**. En prototipos, e-1104 se registra el 20/11 16:00 y se anula el 21/11 09:00. **Resto:** 07-architecture.md l. 664–668 todavía tiene `registeredAt 2026-11-20T09:12` con `voidedAt 2026-11-10T09:00` (N4) |
| 5d | Nota de decisión en la ficha de P-053 | ✅ | 09 l. 1798: "**Decisión del autor (2026-11-08, validación de prototipos):** toda persona del padrón, incluida la de portería, primero se registra aquí con un vínculo… Una persona de portería sin unidad no se registra en el MVP; es una limitación aceptada, no un gap." |
| 5e | `?today=` en shell.js | ✅ | `shell.js` l. 7–15 acepta `?today=AAAA-MM-DD`, lo guarda en `ch:today` y "Reiniciar datos" lo borra (l. 219). **Prueba:** `P-032?today=2026-11-20&now=09:00` → P-030 sin parámetros muestra "viernes 20/11/2026 09:00", con `CH.TODAY=2026-11-20` y `CH.NOW=09:00` |
| 6 | Regresiones · 32 prototipos | ✅ Sin pantallas rotas | Los 32 `P-0*.html` cargan en Edge headless con su `<h1>` y sin errores JS capturados (`window.onerror`). Ejemplos: P-015 "Salón de fiestas", P-020 "Portería · miércoles 04/11/2026" (con `<time>`), P-031 "Limpieza de áreas comunes · noviembre", P-052 "Unidad A-502", P-054 "Ana Quispe", P-061 "Nueva área común" |

### Problemas nuevos encontrados

| # | Problema | Severidad | HU / RN |
|---|---|---|---|
| N1 | **07-architecture.md contradice la decisión de RN-113.** El ADR de sesión (l. 743) dice "Cada request valida la sesión… y actualiza `LastActivityAt` como máximo una vez por minuto", sin excluir el polling. La entidad `UserSession` (l. 238) y `GET /api/concierge/today` (l. 553) tampoco lo excluyen. Quien implemente siguiendo la arquitectura renovará la sesión con cada polling, y la PC de portería no se cerrará nunca por inactividad: es el contraejemplo de RN-113, una regla MUST de seguridad. | **Alta** | HU-003B, HU-009; RN-113 |
| N2 | **No está definido cómo distingue el servidor una solicitud automática de una acción.** "Actualizar ahora" y el polling usan el mismo `GET /api/concierge/today`, y sin JS el respaldo es un `<meta http-equiv="refresh" content="60">`, que es "abrir una página" automática. La spec no define un encabezado ni un parámetro de polling ni dice qué hace el `meta refresh`. Sin JS, la sesión de portería se renovaría cada 60 s. | Media | HU-003B; RN-113, RN-026 |
| N3 | **Buscar renueva la sesión en P-020** (`input` en `#q` → `touch()`, l. 249), pero la ficha dice que el buscador "filtra en la página" (JS opcional) y no envía ninguna solicitud, así que el servidor no puede renovar nada. El prototipo muestra algo que la implementación no puede hacer. Además, una acción hecha después de 1,800 s pero antes del siguiente polling renueva la sesión localmente, cuando el servidor ya respondería `401`. | Media | HU-003B; RN-113 |
| N4 | Queda una fecha de anulación anterior al registro en 07-architecture.md l. 664–668 (`registeredAt 2026-11-20T09:12`, `voidedAt 2026-11-10T09:00`), en el ejemplo JSON de `GET /api/expenses`. Es la misma contradicción que se corrigió en 03, 06 y 09. | Media | HU-010, HU-010B; RN-092, RN-167 |
| N5 | Trazabilidad incompleta de las reglas nuevas. HU-001 no lista RN-170, RN-172 ni RN-174. HU-004 no lista RN-171 en "Reglas relacionadas", aunque su criterio lo cita. HU-010 no lista RN-172 ni RN-173. La ficha de P-053 no lista RN-174 ni RN-172, y sus "Estados" no mencionan `OCCUPANCY_END_BEFORE_START` ni `FIELD_REQUIRED`, aunque el prototipo sí los tiene. Las fichas de P-050, P-061 y P-032 deben revisarse igual. | Baja | HU-001, HU-004, HU-010; RN-170 a RN-174 |
| N6 | RN-169 no tiene ❌ contraejemplo (las demás sí). Las categorías nuevas "Padrón" y "Contrataciones" no están en la lista de "Categorías" de las Convenciones de 03 (l. 27), y la cabecera de 03 sigue con "Última actualización: 2026-11-02". | Baja | RN-169 a RN-171, RN-174 |
| N7 | 10-validation-log.md no refleja las decisiones de hoy. "Iteración 2" todavía marca la obs. 6 como "⏳ Abierta: decisión del autor", "Pendiente" todavía pide resolver RN-165, los códigos que faltan, la persona de portería y las fechas, y la tabla de cobertura sigue diciendo "HU-003B (obs. 6 abierta)". | Baja | HU-003B, HU-002, HU-010B |
| N8 | La fila `IDEMPOTENCY_KEY_REUSED` de §3.0.6 no dice que un `4xx` no consume la clave. La regla está en RN-163 y en la ficha de P-012, pero no en la tabla de mensajes. | Baja | HU-005; RN-163 |
| N9 | P-020 no usa la hora ni la fecha comunes: tiene su propio reloj desde 19:06:50, `DAY = 'miércoles 04/11/2026'` fijo y `EXTRA` con `TODAY`. Con `?today=` o `?now=`, el h1 de P-020 sigue diciendo 04/11 y su reloj no cambia. La recomendación global 2 incluía a P-020. | Baja | HU-009 C9; RN-029 |
| N10 | La puerta de consentimiento redirige **después** de `render()`: el contenido de P-014 llega a pintarse en el DOM antes de ir a P-007. En la app real, la puerta debe ser una redirección del servidor antes de generar la página. | Baja | HU-002B C1; RN-010 |

**Problemas nuevos de severidad Alta: 1 (N1).**
