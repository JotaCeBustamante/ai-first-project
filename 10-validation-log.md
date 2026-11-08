# CondoHub — 10 · Validation Log (consolidado)

> **Fase:** Diseño (BMAD) · **Fecha:** 2026-11-08 · **Autor:** Agente Consolidador de Validación ([prompts/11-validation-log.xml](prompts/11-validation-log.xml))
> **Alcance:** las observaciones de la validación de los 32 prototipos de [prototypes/](prototypes/) contra el Spec Pack (03, 06, 07, 08, 09).

## Fuentes

| Fuente | Documento | Qué aporta | Cómo se cita |
|---|---|---|---|
| **Agente Reviewer** | [docs/validation/reporte-prototype-reviewer.md](docs/validation/reporte-prototype-reviewer.md) | 34 revisiones (VL-P001 a VL-P062, con re-revisión de VL-P030 y VL-P031), su tabla de estado y el apéndice del verificador independiente (N1 a N10) | `VL-P0xx o.N` (observación N de esa revisión) · `VL-P030r` / `VL-P031r` = re-revisión · `Verif. Nx` |
| **Compañero** | — | **No se recibió.** El prompt no incluye una fuente de revisión humana, así que ninguna fila tiene esta fuente. Cuando llegue, se cruza con esta tabla y se fusionan los duplicados | — |
| **Propia** | Este documento | Comprobaciones del consolidador en el Spec Pack y en los prototipos (2026-11-08), sobre todo de las observaciones Alta que la fuente marca "sin verificación independiente" | `Propia (Pn)` |

**Reglas de consolidación aplicadas**

- **Duplicados:** se fusionaron en una fila las observaciones con la misma causa (p. ej. el reloj común de VL-P014, VL-P015, VL-P016 y VL-P062). Cada fila lista todas sus referencias de origen.
- **Re-revisión:** en VL-P030 y VL-P031 manda el estado de la re-revisión (`VL-P030r`, `VL-P031r`), que dice cuáles quedaron cerradas.
- **Severidad:** si dos observaciones fusionadas tenían distinta severidad, la fila toma la mayor.
- **Orden:** Alta → Media → Baja. Dentro de cada severidad, por épica: acceso, reservas, portería, gastos, contrataciones, padrón y transversal.
- **Decisiones del autor ya tomadas** (tabla de estado de la fuente): el polling no cuenta como actividad, RN-165 reajustada, RN-169 a RN-175, la persona de portería se registra primero con un vínculo y las fechas de anulación corregidas. Las filas que dependían de ellas lo indican.

---

## 1. Tabla de observaciones

### Severidad Alta (14)

> Todas las observaciones Alta de la fuente ya se aplicaron en las iteraciones 1 a 3. Cuatro no tenían verificación independiente (filas 11 a 14); el consolidador las comprobó (P1 a P4).

| # | Observación | Fuente | Tipo | Severidad | Acción sugerida | HU / RN afectada |
|---|---|---|---|---|---|---|
| 1 | Las pantallas del flujo de acceso P-003, P-004, P-005 y P-007 no tenían prototipo: después de P-001 todo terminaba en "Navegación simulada" | Agente Reviewer (VL-P001 o.1) | gap | Alta | Prototipar P-003 a P-007 y re-validar F2 y F13 | HU-003 C1, C2; HU-002B C1, C4; RN-140, RN-112, RN-064 |
| 2 | Las pantallas de gastos P-032, P-033 y P-034 no tenían prototipo: no se podían validar HU-010 ni HU-010B | Agente Reviewer (VL-P030 o.1, VL-P031 o.1 y o.2; cierre en VL-P030r o.1, VL-P031r o.1 y o.2) | gap | Alta | Prototipar P-032 a P-034 con sus estados de error | HU-010, HU-010B; RN-032 a RN-034, RN-092, RN-095 |
| 3 | Las pantallas de contrataciones P-042 y P-043 no tenían prototipo: no se podían validar la creación, la edición ni el registro de proveedores | Agente Reviewer (VL-P040 o.1, VL-P041 o.1) | gap | Alta | Prototipar P-042 (crear y editar) y P-043 | HU-012; RN-037, RN-038, RN-042, RN-097, RN-098 |
| 4 | `returnUrl=/invitations/{token}` y las rutas con id se perdían y caían a P-010 | Agente Reviewer (VL-P001 o.5) | gap | Alta | Reconocer patrones `{id}`/`{token}` y declarar en 09 que P-002…P-005 propagan `returnUrl` | HU-002 C12; HU-003B C3; RN-122 |
| 5 | La puerta de consentimiento no se simulaba: tras "No acepto", Carla entraba igual a P-010 (contraejemplo de RN-070) | Agente Reviewer (VL-P007 o.1; Verif. veredicto 1) | gap | Alta | Persistir el estado del consentimiento y redirigir a P-007 desde el `AppShell` | HU-002B C1, C4; RN-010, RN-070 |
| 6 | RN-079 se validaba por día y no por instante; el mensaje no daba la hora límite | Agente Reviewer (VL-P012 o.1; Verif. 2a) | gap | Alta | Comparar `inicio ≤ ahora + anticipación` y dar la hora en el mensaje | HU-005 C11, C12; RN-079 |
| 7 | RN-163 no decía que un `4xx` no consume la clave de idempotencia: tras un `422`, el usuario no podía reservar nunca desde esa página | Agente Reviewer (VL-P012 o.2; Verif. 2b, N8) | comprensión | Alta | Agregar a RN-163 que solo un `2xx` asocia la clave, el criterio de HU-005 y la nota en §3.0.6 | HU-005 C14, C15; RN-163 |
| 8 | No había una hora común: P-014, P-015, P-016 y P-062 decidían "antes del inicio" cada una con su reloj, y se podía cancelar una reserva en curso | Agente Reviewer (VL-P015 o.1 y o.7, VL-P016 dec. 1, VL-P062 dec. 1, VL-P014 o.6; Verif. 3) | gap | Alta | `CH.NOW` en shell.js y estados `[inicio, fin)` en todas las pantallas de reservas | HU-008 C4, C6; RN-083, RN-085, RN-086, RN-161 |
| 9 | En portería, tras un `401` del polling, los nombres de los invitados seguían visibles en la PC compartida | Agente Reviewer (VL-P020 o.1; Verif. 4a) | gap | Alta | Retirar la lista y el buscador del DOM ante el `401` y pedir `no-store` en la ficha | HU-003B; RN-137, RN-113, RN-114 |
| 10 | No estaba decidido si el polling de portería renueva la sesión. Además, 07-architecture.md la renovaba en cada request, y no se definía cómo distinguir el polling, el `meta refresh` y la búsqueda local | Agente Reviewer (VL-P020 o.2; Verif. 4b, N1, N2, N3) | gap | Alta | Decidir que una solicitud automática no renueva la sesión (RN-113, ADR-0013) con su cabecera de polling, y alinear 07 y P-020 | HU-003B C3, C8; HU-009; RN-113, RN-114 |
| 11 | El atajo de C6 en P-034 guardaba un vínculo a h-101 sin aprobar, y P-031 lo mostraba como "Aprobada" a todas las personas | Agente Reviewer (VL-P034 o.1) + Propia (P1) | gap | Alta | Que el atajo no persista un vínculo a una contratación no aprobada y que P-031 pinte siempre el estado real. **Propia:** P-034 ya no escribe `hireSim`, pero P-031 conserva el código que fuerza "Aprobada" (l. 81, 85); ver fila 165 | HU-010B C4, C6; RN-095; HU-014 |
| 12 | HU-012 C7 registraba Pinturas Lima SAC, que ya está en el seed: con RN-169 el criterio fallaba siempre, y también el criterio de completitud de la tarea | Agente Reviewer (VL-P043 o.1) + Propia (P2) | gap | Alta | Reescribir C7 con un proveedor nuevo, agregar el criterio negativo `SUPPLIER_RUC_DUPLICATE` y corregir 08-backlog. **Propia:** verificado en 06 (l. 552 y 560) y 08 (l. 925) | HU-012 C7; RN-169, RN-042; 08-backlog |
| 13 | P-054 dejaba invitar como Residente o NRO a una persona sin ningún vínculo activo (contraejemplo de RN-060 y RN-072) | Agente Reviewer (VL-P054 o.1) + Propia (P3) | gap | Alta | Exigir un vínculo activo o futuro para invitar. **Propia:** RN-175 existe en 03 (l. 489) con `OCCUPANCY_NOT_ACTIVE`, aplicada a cualquier rol según la decisión del autor; el prototipo P-054 no se volvió a probar | HU-001B; RN-060, RN-072, RN-157, RN-175 |
| 14 | El prototipo ligaba las reservas al área por su nombre: al renombrar la Parrilla, P-012 la mostraba libre y había doble reserva | Agente Reviewer (VL-P061 o.2) + Propia (P4) | gap | Alta | Ligar las reservas al área de forma estable y declarar en la ficha de P-061 que renombrar no cambia las reservas. **Propia:** `shell.js` (`AREA_ALIAS`, l. 193–208) traslada el nombre en `DATA.reservations`, y P-012 usa `CH.areaAlias` en ocupación y cupo; P-060 (`confirmedOf`) compara por nombre, pero lee los datos ya trasladados | RN-024, RN-080, RN-162; HU-004, HU-006 |

### Severidad Media (67)

| # | Observación | Fuente | Tipo | Severidad | Acción sugerida | HU / RN afectada |
|---|---|---|---|---|---|---|
| 15 | El contador de fallos de RN-111 no se comparte entre P-001, P-002 y P-003, y se reinicia al recargar: 3 fallos de contraseña + 2 de TOTP no bloquean, y se pueden probar códigos sin límite | Agente Reviewer (VL-P001 o.4, VL-P002 o.3) | gap | Media | Contador por cuenta en `sessionStorage`, compartido por P-001, P-002 y P-003, visible en la banda | HU-003B C1, C6; RN-111 |
| 16 | No está decidido si un código incorrecto durante el enrolamiento (P-003) suma al contador de RN-111 | Agente Reviewer (VL-P003 o.1) | gap | Media | Decidirlo en RN-111 (o en la ficha) con su código de error, y reflejarlo con el contador compartido de la fila 15 | HU-003 C1; RN-111, RN-140 |
| 17 | La redirección abierta por `returnUrl` está en la ficha de P-001, pero falta el test de integración y su criterio en HU-003B | Agente Reviewer (VL-P001 o.7, PARCIAL) | gap | Media | Agregar el criterio a HU-003B y el test de integración (`returnUrl` externo → se ignora) | HU-003B; RN-074 |
| 18 | P-001 promete "Comunícate con la administración", y P-002 y P-004 no dicen qué hacer sin celular o sin códigos, pero el MVP no le da a la administración cómo restablecer una contraseña ni reiniciar el MFA | Agente Reviewer (VL-P001 o.8, VL-P002 o.4, VL-P004 o.1) | fricción | Media | Ajustar los textos a lo que ofrece el MVP y documentar en ADR-0020 el procedimiento manual (RN-062, seeder en la demo) mientras RN-115 y RN-141 sigan diferidas | HU-003, HU-003B; RN-062, RN-112, RN-115 ⏸, RN-141 ⏸; ADR-0020 |
| 19 | El rate limit de autenticación (10/min por IP y por índice ciego del correo, `429` + `Retry-After`) solo está en la arquitectura, sin RN ni criterio | Agente Reviewer (VL-P001 o.9) | gap | Media | Crear la RN del rate limit de `/api/auth/*` y su criterio en HU-003B | HU-003B; RN-074 |
| 20 | El modo automático de `nextStep` nunca produce `MfaEnrollmentRequired` ni `CondominiumSelectionRequired`, y ninguna persona reproduce a "Ana BoardMember en un condominio y Resident en otro" | Agente Reviewer (VL-P001 o.2 y o.3) | comprensión | Media | Derivar `nextStep` de atributos de la persona y agregar personas sin TOTP, con dos condominios y `anaBoard` | HU-003 C1, C8; RN-008, RN-064, RN-140 |
| 21 | Los códigos de recuperación que acepta P-002 no coinciden con los que entrega P-004: en una demo, un código recién guardado se rechaza | Agente Reviewer (VL-P002 o.1) | comprensión | Media | Una constante compartida en shell.js para los 10 códigos, con "ya usados" vacío tras P-003 | HU-003 C4, C5; RN-112 |
| 22 | Sin JS, los enlaces de cambio de método de P-002 pierden el `returnUrl` | Agente Reviewer (VL-P002 o.2) | gap | Media | Declarar en la ficha de P-002 que ambos enlaces conservan `returnUrl` y armarlos así en el prototipo | RN-122, RN-074; §3.1 P-001 |
| 23 | No está definida la duración de la sesión parcial ni el tipo de sesión de P-007, y P-003, P-004 y P-005 no tienen los estados `429` ni "sesión parcial vencida" | Agente Reviewer (VL-P003 o.2, VL-P007 o.3) | gap | Media | Fijar el TTL de la sesión parcial (ADR-0008 o 07 §4.1), el tipo de sesión de P-007, y declarar en §3.0.4 los estados comunes de P-002 a P-005 | HU-003B, HU-002B; RN-074, RN-113 |
| 24 | `CH.init` cambia de persona en silencio cuando el `role` no está en el selector: Carla, Rosa y Raúl salen de P-005 como Luis, `rosaRes` ve "Mis reservas" de Ana, y `?role=raul` en P-030 muestra los totales como Ana | Agente Reviewer (VL-P005 o.1, VL-P014 o.1, VL-P010 o.5, VL-P030r o.10) | comprensión | Media | Que `CH.init` respete una persona válida de `PERSONAS` o muestre P-090, y mostrar en la banda la persona que llegó; agregar `rosaRes` a P-011 y P-014 con datos de C-201 | F13; HU-002B C6; HU-008; RN-031, RN-064, RN-076 |
| 25 | Después de elegir un condominio, el `AppShell` sigue mostrando "Residencial Los Olivos", y `condo-v1` no se borra nunca | Agente Reviewer (VL-P005 o.2) | comprensión | Media | `appShell()` lee `condo-v1` y P-001 lo borra al iniciar sesión | HU-002B C6; RN-064 |
| 26 | RN-070 dice "cuenta sin activar", pero el consentimiento es por persona y condominio: no se define el rechazo de una cuenta ya activa (C5, C6) | Agente Reviewer (VL-P007 o.2) | comprensión | Media | Reescribir RN-070 por condominio y alinear la nota del prototipo | HU-002B C4, C5, C6; RN-070, RN-012 |
| 27 | P-006 no define qué ve la persona al volver con la sesión iniciada (¿`GET` o `POST`? ¿pasa por P-007?) ni qué pasa si la sesión es de otra cuenta, y el prototipo une la invitación a la cuenta equivocada | Agente Reviewer (VL-P006 o.1 y o.2) | gap | Media | Estado "Aceptar con sesión iniciada" (`POST`, destino P-007/P-005/P-010) y paso 2c en F1. En RN-122, aceptar solo si coincide el correo, con mensaje neutro, y un criterio negativo en HU-002 | HU-002 C12; RN-010, RN-064, RN-122, RN-153 |
| 28 | `maxlength=64` recorta en silencio una contraseña pegada más larga, y la unidad de medida (UTF-16 o puntos de código) no está definida | Agente Reviewer (VL-P006 o.3) | gap | Media | Quitar `maxlength` y dejar `PASSWORD_LENGTH_INVALID` al servidor; fijar en RN-116 que se cuentan puntos de código tras NFC | HU-002 C4; RN-116, RN-074 |
| 29 | El "Entendido" del aviso de P-010 se guarda en memoria y el aviso reaparece aunque la pantalla dice "No volverás a ver este aviso" | Agente Reviewer (VL-P010 o.1) | gap | Media | Guardar los avisos vistos en `sessionStorage` y borrarlos con "Reiniciar avisos" | HU-008 C12; RN-088; F4 A3 |
| 30 | RN-088 dice "desde su último inicio de sesión", y la ficha y §6.4 dicen "hasta que pulse Entendido" | Agente Reviewer (VL-P010 o.2) | comprensión | Media | Cerrar §6 punto 4: reescribir RN-088 como "mientras el aviso no esté marcado como visto" y ajustar HU-008 C5 y C12 | HU-008 C5, C12; RN-088; 09 §6.4 |
| 31 | `cancelledBy` se guarda por rol y no por persona: un Administrator que también es residente recibe el aviso de su propia cancelación, y "Cancelaste esta reserva" aparece aunque haya cancelado otra persona de la unidad | Agente Reviewer (VL-P016 o.2, VL-P010 o.3, VL-P014 o.2) | gap | Media | En RN-084 y RN-088: `cancelledBy` es el id de la persona; el aviso sale si canceló **otra** persona con rol Administrator; el texto distingue "por ti" de "por {nombre}" | HU-008 C1, C11; RN-084, RN-088 |
| 32 | No existe el estado `IDEMPOTENCY_KEY_REUSED` en P-012, y "Recarga la página" no dice qué valores conserva | Agente Reviewer (VL-P012 o.3) | gap | Media | Agregar el estado al selector y definir: error con valores conservados y clave nueva | HU-005 C15; RN-163 |
| 33 | HU-005 C3 (cruce de medianoche) y C8 (segundos) no se pueden producir desde la UI | Agente Reviewer (VL-P012 o.4 y o.12) | comprensión | Media | Marcar C3 y C8 como criterios de API y agregar el equivalente de UI ("Hasta 00:30 → `RESERVATION_INVALID_TIME_SLOT`") | HU-005 C3, C8; RN-021, RN-119, RN-120 |
| 34 | P-012 tiene dos formularios: si se cambia la fecha y se confirma sin "Ver disponibilidad", la reserva se crea en la fecha anterior | Agente Reviewer (VL-P012 o.5) | gap | Media | Mostrar "Reservando para el {fecha}" junto al botón y que el servidor rechace si la fecha visible y la del POST no coinciden; criterio en HU-005 | HU-005; RN-024, RN-080 |
| 35 | Los datos de reservas no permiten recorrer los flujos con sus valores literales (r-8841 choca con F3; la Parrilla no llega al 19/12; P-013 trae una r-9011 que P-012 no puede crear) | Agente Reviewer (VL-P012 o.6, VL-P013 o.3) | comprensión | Media | Fijar un "hoy" de reservas coherente con los criterios (ya existe `?today=`), mover r-8841 o documentar en `index.html` las fechas equivalentes; revisar F3 y F11 | HU-005 C1, C2, C10, C13; HU-006 C5; F3; F11 |
| 36 | `RESERVATION_UNIT_NOT_LINKED` y `RESERVATION_UNIT_RENTED` nunca se muestran, aunque pueden ocurrir entre el GET y el POST | Agente Reviewer (VL-P012 o.7) | gap | Media | Estado "Unidad no permitida (403)" con el error en "Unidad" y la lista recalculada | HU-006B C1, C2; RN-075, RN-077 |
| 37 | En modo Administrator, el anfitrión faltante o sin vínculo no tiene código propio, y en una unidad alquilada se acepta al propietario como anfitrión (el contraejemplo de RN-077 ocurre por esta vía) | Agente Reviewer (VL-P012 o.8 y o.9) | gap | Media | Crear `RESERVATION_HOST_NOT_SELECTED` y `RESERVATION_HOST_NOT_LINKED` en RN-076 y §3.0.6; decidir si en una unidad alquilada el anfitrión debe ser el inquilino; criterio en HU-006B | HU-006B C4; RN-076, RN-077, RN-123 |
| 38 | `NEW_ID = 'r-9010'` es fijo: cada reserva nueva borra la anterior, y F11 pasos 5–6 no se pueden validar juntos | Agente Reviewer (VL-P012 o.10, VL-P013 o.1) | gap | Media | Ids incrementales guardados en `res-session-v1` | HU-006 C4, C5, C12; HU-006B C4; F11 |
| 39 | Los invitados agregados en P-015 no se guardan en la sesión: P-014, P-016 y P-020 no los ven, y F12 → F5 no se puede mostrar | Agente Reviewer (VL-P015 o.2) | gap | Media | `CH.patchReservation(id, { guests })` y que P-020 lea los nombres de la sesión | HU-007; HU-009 C1; F12 → F5 |
| 40 | No está definido si la aceptación del aviso de privacidad es por reserva o por usuario: en F11, el anfitrión agrega invitados sin haber visto nunca el aviso | Agente Reviewer (VL-P015 o.3) | gap | Media | Decidirlo (depende de Q18/Q21) y guardar `privacyNoticeAcceptedAt` y `acceptedBy` | HU-007 C4; RN-087; F11 |
| 41 | Para `TOO_LATE` y `ALREADY_CANCELLED`, la ficha dice "vuelve a P-015 con el error" y el prototipo muestra una página propia en P-016 | Agente Reviewer (VL-P016 o.1) | comprensión | Media | Elegir una de las dos y alinear la ficha o el prototipo (si queda en P-016, documentar su `h1` y sus acciones) | HU-008 C2, C4, C10; RN-102 |
| 42 | El cambio de día en portería (C9, 23:59:59 → 00:00:00) no se puede probar, la ficha no dice qué pasa a medianoche y P-020 no usa la fecha ni la hora comunes | Agente Reviewer (VL-P020 o.3; Verif. N9) | gap | Media | En la ficha, "con un `200`, el `<h1>` se toma de `date`". En el prototipo, que P-020 use `CH.TODAY`/`CH.NOW` y un control "Avanzar a 23:59:59" | HU-009 C9; RN-029, RN-164 |
| 43 | Los `403` de HU-009, HU-011 y HU-014 no se pueden reproducir: falta Raúl en P-030, P-031, P-040 y P-041, y Ana y Rosa en P-020 | Agente Reviewer (VL-P020 o.4, VL-P040 o.3, VL-P041 o.6, VL-P030 o.10, VL-P031r o.6) | gap | Media | Agregar esas personas a `roles` (→ P-090 o `deniedView()`) y una ruta simulada `/persons/{id}` con `PERSONAL_DATA_FORBIDDEN` | HU-009 C6, C7, C12, C13; HU-011 C13; HU-014 C10; RN-031, RN-118, RN-158 |
| 44 | Sin conexión, la lista de portería se queda congelada sin límite de tiempo, con "Marcar ingreso" activo y la reserva cancelada visible | Agente Reviewer (VL-P020 o.5) | gap | Media | Umbral en la ficha (> 60 s sin respuesta): "Desactualizada desde hh:mm" y confirmar con la administración antes de dejar pasar | HU-009 C4; RN-026 |
| 45 | Tras cerrar sesión en la PC de portería, "Atrás" puede mostrar la lista desde la caché. La ficha de P-020 ya pide `no-store` para el `401`, pero falta en 07 para `/concierge` y `/api/concierge/today`, y falta el test | Agente Reviewer (VL-P020 o.6; Verif. 4a) + Propia (P5) | gap | Media | Exigir `Cache-Control: no-store` en 07 para la página y el endpoint de portería, y agregar el E2E "cerrar sesión → Atrás → no se ve la lista". **Propia:** `no-store` solo aparece en 09 (l. 1207); no está en 07 | HU-003B; RN-074, RN-158 |
| 46 | No está claro si se pueden marcar ingresos en reservas que ya terminaron hoy, ni si se siguen mostrando (minimización de datos) | Agente Reviewer (VL-P020 o.7) | comprensión | Media | Aclarar en RN-164 si se puede marcar después de `endAt` y si se muestran las terminadas | HU-009; RN-029, RN-158, RN-164 |
| 47 | F5 no tiene camino para "el invitado no está en la lista" o "su nombre está mal escrito" | Agente Reviewer (VL-P020 o.8) | gap | Media | Agregar a F5 el paso alternativo fuera del sistema, o registrarlo como fuera del MVP en HU-009 | HU-009; RN-158; F5 |
| 48 | HU-011 C10 y C12 no tienen datos: faltan los gastos de S/ 400.00 (30/11) y S/ 300.00 (01/12) y los montos S/ 0.50 y S/ 18,500.00 | Agente Reviewer (VL-P030r o.3 y o.9, VL-P031r o.10) | gap | Media | Agregar esos gastos a `ROWS` con `regAt` ≤ 2026-12-04 | HU-011 C10, C12; RN-055, RN-143 |
| 49 | Un mes futuro (`?month=2027-01`) se trata como formato inválido, y RN-035 y HU-011 C11 esperan el EmptyState | Agente Reviewer (VL-P030r o.4) | gap | Media | Decidir en la ficha de P-030 qué pasa con un mes futuro y alinear RN-035 y HU-011 C11 | HU-011 C11; RN-035 |
| 50 | En P-030, la fila del gasto anulado no muestra el motivo ni la fecha-hora, y HU-011 C3 dice "abre el detalle" | Agente Reviewer (VL-P030r o.5) | comprensión | Media | Aclarar en HU-011 C3 y RN-142 que "detalle" es P-031, o agregar el motivo a la fila | HU-011 C3; RN-092, RN-142 |
| 51 | El orden de los escenarios cambia los totales: registrar HU-010 C1 crea e-1201, que reemplaza a e-1104 y pierde su anulación | Agente Reviewer (VL-P030r o.13) | comprensión | Media | Que el gasto que reemplaza a la semilla herede `void` y `hire`, o indicar en la banda el orden HU-010 → HU-010B C3 → HU-011 | HU-011 C1, C2; HU-010B C8; RN-142 |
| 52 | Q30 sigue abierta: RN-095 no exige que el proveedor del gasto sea el de la cotización elegida ni un tope de monto (h-092 tiene S/ 7,000.00 vinculados frente a S/ 6,250.00 adjudicados) | Agente Reviewer (VL-P031r o.4, VL-P034 o.3) | comprensión | Media | Decidir Q30 (exigir el proveedor elegido y el tope, o avisar sin bloquear); mientras tanto, desvincular e-1107 | HU-010B C6; HU-014; RN-095 ⚠️ Q30 |
| 53 | El estado "Vacío (sin comprobante ni vínculo)" de P-031 muestra un gasto que RN-033 no permite | Agente Reviewer (VL-P031r o.5) | comprensión | Media | Retirarlo, o declararlo en la ficha si Q28 crea el caso de datos migrados | HU-011 C6; RN-033 ⚠️ Q28, RN-090 |
| 54 | No está definido si el vínculo gasto–contratación se puede cambiar o quitar, qué pasa al vincular un gasto anulado o ya vinculado, ni qué pasa con el vínculo de un gasto anulado | Agente Reviewer (VL-P031r o.7, VL-P034 o.2, VL-P033 o.4) | gap | Media | Decidir en HU-010B (y en un ADR si aplica) si el vínculo es único e inmutable, cómo se corrige, y los códigos `EXPENSE_ALREADY_LINKED` y `EXPENSE_VOIDED` | HU-010B; RN-091, RN-092, RN-095 |
| 55 | El adelanto e-1115 (28/10) ya suma en los totales antes de que la Junta aprobara h-101, y la aprobación se fecha con `CH.TODAY` y no con el 25/11 del ejemplo | Agente Reviewer (VL-P034 o.4) | comprensión | Media | Fechar el adelanto después de la aprobación (≥ 2026-11-25) y decidir si un gasto vinculado puede ser anterior a la aprobación | HU-010B C4, C6; HU-013; RN-095 |
| 56 | F6 2a no se recorre: P-032 simula P-043 aunque existe, y lee una lista fija de proveedores, no `suppliers-v1` | Agente Reviewer (VL-P032 o.1, VL-P043 o.6) | gap | Media | Enlazar P-032 → P-043 con `returnUrl=/expenses/new`, pasar los proveedores a `CH.DATA.suppliers` + `suppliers-v1` y preseleccionar `?supplierId=` | HU-010; RN-042; F6 2a |
| 57 | RN-173 no dice que el signo pasa el formato; el `pattern` de `MoneyInput` bloquearía en el navegador "-350.00" y "1200.505", que HU-010 C10 y C4 esperan del servidor | Agente Reviewer (VL-P032 o.2) | comprensión | Media | Precisar en RN-173 que el signo y los decimales extra se evalúan en RN-034 y RN-093, y en §3.0.3 que el `pattern` es solo una ayuda (`novalidate`) | HU-010 C4, C10; RN-034, RN-093, RN-173 |
| 58 | La idempotencia de `POST /api/expenses` está decidida (Q48) pero no tiene RN: RN-163 solo habla de reservas | Agente Reviewer (VL-P032 o.3) | gap | Media | Extender RN-163 (o crear una RN) a gastos, con su huella, `IDEMPOTENCY_KEY_REUSED` y la regla del `4xx` | HU-010 C15; RN-163, RN-166; Q48 |
| 59 | La visibilidad de los `Draft` para la Junta es distinta en P-040 y P-041, y lo que Q25 oculta responde `404` cuando RN-103 manda `403` | Agente Reviewer (VL-P040 o.4, VL-P041 o.3) | comprensión | Media | Resolver Q25, decidir `403` o `404` y fijar el mismo comportamiento en RN-041, RN-103, la matriz H3, P-040 y P-041; criterio negativo en HU-014 | HU-013, HU-014; RN-041 ⚠️ Q25, RN-098, RN-103 |
| 60 | Falta una persona con vínculo `Owner` vencido y una fecha-hora simulada: no se ven el `403` del 16/12 00:00 ni el acceso del 15/12 23:59 | Agente Reviewer (VL-P040 o.2, VL-P041 o.7, VL-P030r o.11, VL-P031r o.6) | gap | Media | Persona "Luis con `EndDate = 2026-12-15`" probada con `?today=` y `?now=`, y estado `denied` en P-031 | HU-011 C8, C9; HU-014 C5, C6; RN-016, RN-105 |
| 61 | Los datos de contrataciones no ejercitan los bordes de HU-012 (justificación de 19 y 20 caracteres, 2 cotizaciones del mismo RUC, 3 con 2 repetidas) | Agente Reviewer (VL-P041 o.2) | gap | Media | Agregar borradores de borde o cambiar la justificación de h-104 | HU-012 C3, C4, C8, C9, C10; RN-037, RN-038 |
| 62 | Las decisiones de la Junta pierden los segundos, se registran con el reloj real y no con `CH.NOW`, y las fechas del seed no coinciden con HU-013 y HU-014 | Agente Reviewer (VL-P041 o.4, VL-P042 o.7) | gap | Media | Guardar el ISO completo con segundos usando `CH.nowStamp()`, alinear el seed con las HU y unificar el formato en HU-014 C2 | HU-013 C4; HU-014 C2; RN-040 |
| 63 | Proveedor persona natural: no se define si la razón social de un RUC 10 se cifra, ni qué ve un propietario en un expediente aprobado mientras Q34 siga abierta | Agente Reviewer (VL-P041 o.5, VL-P043 o.2) | gap | Media | Con Q34: un solo campo de nombre cifrado con RUC 10 (RN-052), un comportamiento por defecto en la ficha y un expediente `Approved` de ejemplo | HU-014; RN-041, RN-052 ⚠️ Q34 |
| 64 | El `409` de dos miembros de la Junta que deciden a la vez no tiene RN ni criterio | Agente Reviewer (VL-P041 o.9) | gap | Media | Crear la RN de concurrencia de decisiones (control optimista, `409`, recarga), su criterio en HU-013 y el estado "409 · el otro rechazó" | HU-013; RN-039 ⚠️ Q24 |
| 65 | "Adjunta la garantía por escrito" (HU-012 C14, F8 5b) no tiene un lugar en P-042: la garantía reemplaza el PDF de la cotización | Agente Reviewer (VL-P042 o.1) | gap | Media | Decidir entre "Documentos adicionales" (ficha, endpoint, RN-106/RN-166) o reescribir C14 y F8 5b como reemplazo de la cotización | HU-012 C14; HU-014 C1; RN-041, RN-098 |
| 66 | El documento de la cotización es opcional, así que se envía a la Junta sin ningún PDF, aunque F8 y RN-041 dicen "con su PDF" | Agente Reviewer (VL-P042 o.2) | gap | Media | Decidir con Q28 si el PDF es obligatorio para enviar (código `HIRE_QUOTE_DOCUMENT_REQUIRED`) o quitar "con su PDF" de F8 | HU-012; RN-037, RN-041; Q28; F8 paso 2 |
| 67 | La justificación dice "(obligatorio)", pero el borrador se guarda vacío | Agente Reviewer (VL-P042 o.3) | comprensión | Media | Cambiar la etiqueta a "Justificación (necesaria para enviar)" o exigir `FIELD_REQUIRED` al guardar | RN-038, RN-172; §3.6 P-042 |
| 68 | Faltan trazas de RN-169, RN-172 y RN-173: no están en HU-012 ni en las fichas de P-042 y P-043; la ficha de P-043 todavía dice "código pendiente de definir"; HU-012 no tiene criterios de `FIELD_REQUIRED`, `AMOUNT_INVALID_FORMAT` ni del formato del RUC | Agente Reviewer (VL-P042 o.4, VL-P043 o.4) + Propia (P6) | gap | Media | Actualizar las fichas de P-042 y P-043 y agregar a HU-012 los criterios negativos. **Propia:** HU-012 ya tiene el criterio de `SUPPLIER_RUC_DUPLICATE` (06 l. 560); faltan los demás | HU-012; RN-169, RN-172, RN-173 |
| 69 | La matriz de permisos no tiene una fila "Registrar proveedor" (`POST /api/suppliers`) | Agente Reviewer (VL-P043 o.3) | gap | Media | Agregar "S1 · Registrar proveedor" (solo Adm) con el test `Authz_Suppliers_Create` | RN-042, RN-118; PRINCIPIO-006 |
| 70 | Al registrar un proveedor desde P-040, se vuelve sin aviso y no hay una pantalla que liste proveedores | Agente Reviewer (VL-P043 o.5) | fricción | Media | `Alert success` "Registraste al proveedor {razón social}." al volver con `supplierId`, o definir en la ficha qué ve el usuario | HU-012 C7; §3.6 P-043 |
| 71 | La búsqueda por correo de P-050 confirma que un correo existe y anula el mensaje neutro de P-053; con una ficha reutilizada, P-053 muestra el nombre guardado (tensión con RN-153) | Agente Reviewer (VL-P050 o.1, VL-P053 o.2) | comprensión | Media | Fijar en RN-153 el alcance ante el Administrator (no aplica dentro de su padrón, o se quita la búsqueda por correo) y en RN-132 qué nombre prevalece y el texto de éxito | HU-001 C7, C12, C15; RN-068, RN-132, RN-153; F9 paso 6 |
| 72 | `^\d{3,4}$` acepta ceros a la izquierda: `0502` y `502` quedan como dos unidades | Agente Reviewer (VL-P051 o.1) | gap | Media | Cambiar RN-058 a `^[1-9]\d{2,3}$` (o normalizar) y agregar `0502` como contraejemplo y criterio negativo de HU-001 | HU-001 C2, C3; RN-003, RN-058 |
| 73 | No hay forma de terminar o modificar un vínculo, ni de corregir una unidad, aunque las matrices R1 y R2 le dan ese permiso al Administrator | Agente Reviewer (VL-P052 o.1, VL-P051 o.2) | gap | Media | Agregar "Terminar vínculo" en P-052 (con auditoría RN-059), o registrar en un ADR que el MVP solo lo hace con el seeder, y alinear R1 y R2 | HU-001; RN-003, RN-016, RN-059, RN-060 |
| 74 | RN-002 no considera una invitación pendiente como NRO: se acepta un vínculo `Tenant` y, al aceptar, la persona queda NRO con un `Tenant` | Agente Reviewer (VL-P053 o.1) | gap | Media | Extender RN-002 a las invitaciones pendientes, volver a verificar en P-006 y agregar un criterio negativo a HU-001 | HU-001 C6; HU-001B C4; RN-002 |
| 75 | Ninguna regla impide registrar dos veces el mismo vínculo o vínculos superpuestos (Carla quedó con dos `Tenant` activos) | Agente Reviewer (VL-P053 o.3, VL-P052 o.3) + Propia (P7) | gap | Media | Crear una RN (p. ej. `OCCUPANCY_OVERLAP`) y cambiar el dato de HU-001 C8 a una persona sin vínculo previo. **Propia:** RN-174 solo cubre fin < inicio; no resuelve este caso | HU-001 C8; RN-001, RN-059 |
| 76 | HU-001 C8 dice que el log "muestra" una entrada, pero la vista del log está diferida (ADR-0020) y no se puede validar en el MVP | Agente Reviewer (VL-P053 o.4) | comprensión | Media | Reescribir C8 como "registra en el log…" y verificarlo con una prueba de integración; en el prototipo, recalcular "Desde" con la fecha simulada | HU-001 C8; RN-059; ADR-0020 |
| 77 | La decisión del autor (registrar a la persona de portería con un vínculo antes de invitarla) no se ve en pantalla, y puede llevar a inventar un `Tenant` ficticio que bloquea al propietario | Agente Reviewer (VL-P053 o.5) | comprensión | Media | Registrar la limitación en un ADR (o en ADR-0020) con el camino real de alta del conserje y agregar un hint junto a "Portería" en P-054 | HU-009; RN-001, RN-077; ficha P-053 |
| 78 | El rol revocado vuelve solo, al agregar un vínculo, sin invitación, lo que contradice RN-007 y RN-122 | Agente Reviewer (VL-P054 o.2) | comprensión | Media | Fijar en la spec que un vínculo nuevo no restituye el rol revocado por RN-060, y corregir la nota de P-054 y `REG.roles()` | HU-001B; HU-002 C12; RN-007, RN-060, RN-122 |
| 79 | F9 → F1 no está conectado: el enlace del buzón no abre la invitación correcta y aceptar en P-006 no actualiza el padrón | Agente Reviewer (VL-P054 o.3) | comprensión | Media | Token por invitación generado en P-054 que P-006 entienda y que marque la invitación como usada en `registry-v1` | HU-001B C1, C6; RN-165; F1 paso 1 |
| 80 | HU-004 C7 dice "40 personas", pero r-8841 tiene 30: no se demuestra que una reserva por encima del aforo nuevo sigue `Confirmed` | Agente Reviewer (VL-P060 o.1) | gap | Media | Subir r-8841 a 2 + 38 invitados o agregar una reserva de 40, y verificar "40 de 30" en P-015 | HU-004 C7; RN-162 |
| 81 | HU-004 C1 (crear la Parrilla → `201`) no se reproduce: el escenario ya la tiene y no hay escenario sin áreas. La cifra de la iteración 2 (13 de 13) debía ser 11 de 13 | Agente Reviewer (VL-P061 o.1, VL-P060 o.2) | gap | Media | Escenario "condominio sin áreas" (o que "Sin áreas" vacíe `areas-v1`) y corregir la cifra de HU-004 a ⚠️ | HU-004 C1; RN-171; F10 |

### Severidad Baja (88)

| # | Observación | Fuente | Tipo | Severidad | Acción sugerida | HU / RN afectada |
|---|---|---|---|---|---|---|
| 82 | El aviso de sesión vencida dice "por inactividad" también al cumplir las 12 h | Agente Reviewer (VL-P001 o.6) | comprensión | Baja | Texto neutro o distinguir `reason=expired` de `reason=max-lifetime` | HU-003B C4; RN-114 |
| 83 | Un usuario bloqueado no tiene ninguna pista para esperar | Agente Reviewer (VL-P001 o.10) | fricción | Baja | Texto fijo, siempre visible, no condicionado al estado de la cuenta; confirmar que no contradice RN-153 | HU-003B C1; RN-111, RN-153 |
| 84 | No se define qué pasa al abrir `/sign-in` con una sesión activa | Agente Reviewer (VL-P001 o.11) | gap | Baja | Redirigir a `returnUrl` o a P-010 (P-020 para Concierge) | HU-003B |
| 85 | En la PC compartida de portería, el navegador ofrece guardar las credenciales del Concierge | Agente Reviewer (VL-P001 o.12) | mejora | Baja | Documentar en F5 la configuración del navegador de portería; no cambiar el `autocomplete` (WCAG 1.3.5) | HU-003B |
| 86 | La página de error `500` de las pantallas de acceso ofrece "Volver a intentar", y §3.0.4 pide "enlace a Inicio", que no existe sin sesión | Agente Reviewer (VL-P001 o.13, VL-P006 o.11) | comprensión | Baja | Aclarar en §3.0.4 que en las páginas de acceso el enlace es a P-001 | §3.0.4 |
| 87 | Los textos de error de formato de P-002 no están en §3.0.6, y no se dice si un código mal formado suma al contador | Agente Reviewer (VL-P002 o.5) | gap | Baja | Agregar los textos a §3.0.6 y decidir `SIGN_IN_FAILED` (suma) o `422` (no suma) | HU-003 C7; RN-111, RN-153 |
| 88 | P-003 no tiene salida para quien no tiene el celular a mano | Agente Reviewer (VL-P003 o.3) | fricción | Baja | Enlace "← Volver a iniciar sesión" que cierra la sesión parcial | RN-140 |
| 89 | No se define el acceso directo a P-004, el botón Atrás ni una segunda pestaña | Agente Reviewer (VL-P004 o.2) | gap | Baja | Definirlo en la ficha (estado "ya mostrados" o P-001) | RN-112, RN-074 |
| 90 | La arquitectura no dice qué `nextStep` devuelve el enrolamiento | Agente Reviewer (VL-P004 o.3) | comprensión | Baja | Declarar que `/api/auth/mfa/enroll` responde con `nextStep` y que P-004 lo conserva | HU-003 C2 |
| 91 | No se define un `returnUrl` hacia un recurso de otro condominio ni la respuesta a un `condominiumId` ajeno | Agente Reviewer (VL-P005 o.3 y o.4) | gap | Baja | Agregar ambos casos a la regla de `returnUrl` y a la ficha de P-005 (P-091 o `404`, RN-103) con un test | RN-064, RN-103 |
| 92 | El MVP no permite cambiar de condominio dentro de la sesión, y RN-064 lo deja pendiente | Agente Reviewer (VL-P005 o.5) | comprensión | Baja | Confirmarlo en RN-064 y decirlo en P-010 o §3.0.2 | RN-064 ⚠️ |
| 93 | La vista "Ya tienes una cuenta" de P-006 revela que el correo existe; la spec lo acepta de forma implícita | Agente Reviewer (VL-P006 o.4) | comprensión | Baja | Declarar la excepción en RN-153 o RN-122 | RN-122, RN-153, RN-165 |
| 94 | La ficha no dice que el `POST /accept` vuelve a validar el vencimiento, el uso y la anulación | Agente Reviewer (VL-P006 o.5) | gap | Baja | Agregarlo a la ficha de P-006 | HU-002 C11; RN-110, RN-138, RN-139, RN-165 |
| 95 | Con una invitación no válida, el único enlace es "Ir a iniciar sesión", que no sirve a quien no tiene cuenta | Agente Reviewer (VL-P006 o.6) | fricción | Baja | Dejar el enlace como secundario o explicar "Si ya tienes una cuenta, inicia sesión" | HU-002 C2, C10, C11; RN-110 |
| 96 | La ficha no define el `h1` de los estados "invitación no válida" y "cuenta existente" | Agente Reviewer (VL-P006 o.7) | gap | Baja | Fijar los títulos en la ficha (WCAG 2.4.2 y 2.4.6) | HU-002; RN-054 |
| 97 | La nota del estado "vence mientras escribe" calcula los segundos con el instante de apertura y no con el del envío | Agente Reviewer (VL-P006 o.8) | comprensión | Baja | Usar `secs(inv.issued, inv.submitAt)` | RN-110 |
| 98 | HU-002 no menciona al Concierge en "Como…", aunque C11 lo usa | Agente Reviewer (VL-P006 o.10) | comprensión | Baja | Agregar Concierge al "Como…" de HU-002 | HU-002 C11; RN-139 |
| 99 | La puerta de consentimiento del prototipo redirige después de `render()`: el contenido llega a pintarse | Agente Reviewer (Verif. N10) | gap | Baja | Declarar en la ficha que en la app es una redirección del servidor antes de generar la página | HU-002B C1; RN-010 |
| 100 | El aviso de P-010 y "Tus próximas reservas" se filtran por unidad: no se sabe si es del anfitrión o de la unidad | Agente Reviewer (VL-P010 o.4) | comprensión | Baja | Decidirlo y escribirlo en la ficha de P-010 | HU-008 C5; RN-088 |
| 101 | "Tus próximas reservas" filtra por fecha y no por hora de fin | Agente Reviewer (VL-P010 o.6) | gap | Baja | Filtrar por `fin > ahora` (America/Lima) | RN-085 |
| 102 | Trazas de reglas equivocadas en las fichas: P-011 cita RN-082, P-014 cita RN-088, P-041 usa RN-031 para "sin nombres", P-061 cita RN-021 sin RN-159/171/172, y P-006 atribuye a RN-110 lo de RN-116/117 | Agente Reviewer (VL-P011 o.1, VL-P014 o.4, VL-P041 o.8, VL-P061 o.5, VL-P006 o.9) | comprensión | Baja | Corregir la fila "Reglas" de cada ficha y las notas de los prototipos | 09 §3.3, §3.6, §3.4, §3.1; RN-021, RN-031, RN-041, RN-082, RN-084, RN-110, RN-116, RN-117 |
| 103 | La duración y la anticipación no tienen un formato único, y P-012 calcula el máximo con `parseInt` ("4 h 30 min" → 4 h) | Agente Reviewer (VL-P011 o.2, VL-P061 o.4) | gap | Baja | Formato único en §3.0.5 (días, horas y minutos) y trabajar en segundos | HU-004 C9; RN-022, RN-079, RN-160 |
| 104 | Falta el estado `403` en la ficha de P-011 y en los selectores de P-015 y P-041 | Agente Reviewer (VL-P011 o.3, VL-P015 o.8, VL-P041 o.12) | gap | Baja | Agregar el estado "Sin permiso → P-090" a la ficha y a los selectores | HU-006B C6; HU-007 C12; HU-008 C9; HU-013 C6, C11 |
| 105 | P-011 no anticipa el cupo usado de la unidad | Agente Reviewer (VL-P011 o.4) | mejora | Baja | Opcional: "Tu unidad usó 1 de 2 este mes" en la tarjeta | RN-080 |
| 106 | Un Administrator que también es residente (`rosaRes`) siempre entra en modo Administrator en P-012 | Agente Reviewer (VL-P012 o.11) | comprensión | Baja | Desde P-011, modo residente; desde P-062, modo Administrator | RN-076 |
| 107 | Faltan personas para HU-006B: Pedro como inquilino de B-1203 y un vínculo con `StartDate` futura | Agente Reviewer (VL-P012 o.13) | gap | Baja | Agregar `pedro` a `PERSONAS` y `LINKS`, y un vínculo futuro a Carla | HU-006B C3, C5 |
| 108 | "Ocupado ese día" no distingue la reserva propia | Agente Reviewer (VL-P012 o.14) | mejora | Baja | Rotular "(tu reserva)" las franjas de la unidad del usuario | RN-024 |
| 109 | El aviso de reenvío de P-013 llega por la URL (`replayed=1`) y se conserva al recargar o compartir | Agente Reviewer (VL-P013 o.2) | comprensión | Baja | Definir en la ficha un `TempData` de un solo uso | HU-005 C14; RN-163 |
| 110 | "Cancelada después" muestra una página intermedia que no existirá en la app | Agente Reviewer (VL-P013 o.4) | comprensión | Baja | Navegar directo a P-015 `?state=cancelled` | HU-008 |
| 111 | Las reservas locales de P-062 (`EXTRA`) no están en `CH.DATA`: P-014 y P-020 no las ven, y no hay datos del cupo de A-1104 en diciembre | Agente Reviewer (VL-P014 o.3, VL-P062 o.1 y o.4) | comprensión | Baja | Mover `EXTRA` a `CH.DATA.reservations` y agregar 3 reservas de la parrilla de A-1104 en diciembre | HU-006 C5; HU-008 C1; RN-026, RN-080, RN-084 |
| 112 | La paginación solo existe como nota en P-014 y P-040 | Agente Reviewer (VL-P014 o.5, VL-P040 o.6) | mejora | Baja | Control "Paginación de demostración" | §3.3 P-014, §3.6 P-040 |
| 113 | La regla "nombre y apellido del invitado" no está en ninguna HU, RN ni en §3.0.6 | Agente Reviewer (VL-P015 o.4) | comprensión | Baja | Quitarla o crear la regla y su texto | HU-007 |
| 114 | En P-015, el mensaje de aforo lleno dice "Quita 1", pensado para la lista completa de P-012 | Agente Reviewer (VL-P015 o.5) | fricción | Baja | Texto propio para P-015 | HU-007 C8; RN-023 |
| 115 | Los bordes exactos (18:59 y 19:00:00) de HU-007 y HU-008 no se pueden reproducir | Agente Reviewer (VL-P015 o.6, VL-P016 o.5) | gap | Baja | Estados "18:59" y "19:00:00" con `CH.NOW` (`?now=` ya existe) | HU-007 C11; HU-008 C7, C8; RN-083, RN-086 |
| 116 | El estado "No es tuya (403)" de P-016 se muestra también a Rosa, que como Administrator sí puede cancelar | Agente Reviewer (VL-P016 o.3) | comprensión | Baja | Ocultar ese estado para el Administrator | HU-008 C3, C9 |
| 117 | El `409` al cancelar es un supuesto: ni la ficha ni la arquitectura definen control de concurrencia | Agente Reviewer (VL-P016 o.4) | gap | Baja | Decidirlo; si no hay control, quitar la opción 409 | §3.0.4; ficha P-016 |
| 118 | En P-062 no se puede buscar por unidad (F4 A1) | Agente Reviewer (VL-P062 o.2) | fricción | Baja | Evaluar un filtro opcional `unitId=` | HU-008 C3; F4 A1 |
| 119 | Al volver de P-013, P-062 abre hoy y no el día de la reserva nueva | Agente Reviewer (VL-P062 o.3) | gap | Baja | Enviar `?date={fecha}` y resaltar la fila nueva | HU-006, HU-006B; F11 paso 6 |
| 120 | Con `304`, la ficha dice "no cambia nada", y el prototipo actualiza "Última actualización" | Agente Reviewer (VL-P020 o.9) | comprensión | Baja | Con `200` o `304`, la hora se actualiza; con un fallo, se congela | HU-009; RN-026 |
| 121 | Tras `GUEST_CHECK_IN_NOT_ALLOWED`, la reserva cancelada sigue con sus botones hasta el siguiente refresco | Agente Reviewer (VL-P020 o.10) | mejora | Baja | Quitarla o pedir el refresco enseguida | HU-009 C11; RN-026, RN-164 |
| 122 | La ficha de P-020 dice "filtrar por nombre", pero la búsqueda también filtra por unidad | Agente Reviewer (VL-P020 o.11) | comprensión | Baja | Alinear la ficha: nombre o unidad | §3.4 P-020; F5 |
| 123 | "Marcar ingreso" solo funciona con JS; el camino sin JS no se modela | Agente Reviewer (VL-P020 o.12) | comprensión | Baja | Aceptarlo como límite del prototipo y cubrirlo en los E2E de HU-009 | HU-009; RN-026 |
| 124 | En el estado vacío de portería, "Actualizar ahora" no hace nada, y no hay una reserva `Cancelled` de hoy en los datos | Agente Reviewer (VL-P020 o.13 y o.14) | mejora | Baja | Refresco también en el estado vacío y una reserva `Cancelled` del 2026-11-04 | HU-009 C3, C8; RN-029 |
| 125 | La ficha no dice si los totales y el contador de P-030 son del mes completo cuando hay paginación | Agente Reviewer (VL-P030r o.6) | comprensión | Baja | Declararlo en la ficha | RN-035 |
| 126 | Los errores de formato y de mes futuro del formulario "Mes" no están en §3.0.6 | Agente Reviewer (VL-P030r o.7) | comprensión | Baja | Agregarlos a §3.0.6 o quitar la validación de campo | RN-172; §3.0.6 |
| 127 | Hay dos filas "Limpieza de cisterna · 08/11/2026", y F7 paso 3 y HU-011 C6 no dicen cuál abrir | Agente Reviewer (VL-P030r o.8) | comprensión | Baja | Precisar que es la de S/ 1,200.00 (`factura-F001-0458.pdf`) | HU-011 C6; F7 paso 3 |
| 128 | Las categorías con total S/ 0.00 se muestran, y la spec no lo define | Agente Reviewer (VL-P030r o.12) | comprensión | Baja | Fijarlo en la ficha al cerrar Q27 | RN-035 ⚠️ Q27 |
| 129 | `?today` afecta a todos los prototipos de la pestaña, y P-010 sigue diciendo "cuota de noviembre" | Agente Reviewer (VL-P030r o.14) | comprensión | Baja | Mostrar la fecha simulada en la banda de todas las pantallas y calcular el texto de P-010 con `CH.TODAY` | F7 paso 1 |
| 130 | El monto anulado aparece tachado en P-031, y la ficha de P-030 dice "tachado NO" | Agente Reviewer (VL-P031r o.8) | comprensión | Baja | Unificar el criterio en §3.5 (sin tachado, color muted) | RN-142 |
| 131 | P-041 no muestra los gastos vinculados a la contratación | Agente Reviewer (VL-P031r o.9) | mejora | Baja | Evaluar la sección "Gastos vinculados" en P-041 | HU-010B, HU-014 |
| 132 | El selector "Llegada" (`?arrive=`) muestra avisos que no corresponden al gasto | Agente Reviewer (VL-P031r o.11) | comprensión | Baja | Mostrarlo solo si coincide el estado, o retirar el selector | F6 |
| 133 | "12 meses atrás" no está definido a fin de mes (29/02) | Agente Reviewer (VL-P032 o.4) | gap | Baja | Definir la fecha mínima en RN-094 con un ejemplo | RN-094 |
| 134 | El estado "sin proveedores" de P-032 no está en la ficha | Agente Reviewer (VL-P032 o.5) | comprensión | Baja | Declararlo con el enlace a P-043 destacado | §3.5 P-032 |
| 135 | RN-036 solo tiene el hint: la descripción acepta "Reparación en B-1203" (M-20) | Agente Reviewer (VL-P032 o.6) | gap | Baja | Cerrar M-20 y reflejarlo en la ficha | HU-010; RN-036 |
| 136 | No se define qué pasa al abrir `/expenses/{id}/void` de un gasto ya anulado | Agente Reviewer (VL-P033 o.1) | comprensión | Baja | GET de un anulado → P-031 con "Este gasto ya estaba anulado." | RN-167 |
| 137 | El motivo de anulación tiene `maxlength=500` sin regla ni código | Agente Reviewer (VL-P033 o.2) | gap | Baja | Fijar el máximo en RN-092 con su código | RN-092 |
| 138 | `EXPENSE_IMMUTABLE` (HU-010B C1, C5) se simula dentro de la página de anular, donde nunca aparecería | Agente Reviewer (VL-P033 o.3) | comprensión | Baja | Llevarlo a una prueba de API (colección Postman) o a la banda de P-031 | HU-010B C1, C5; RN-091 |
| 139 | La ficha de P-034 no define el detalle de cada opción ni `FIELD_REQUIRED`, y C4 y C6 usan el mismo gasto sin que la banda indique el orden | Agente Reviewer (VL-P034 o.5 y o.6) | comprensión | Baja | Llevar ambos a la ficha y ordenar C4 → C6 en la banda (o usar un gasto por criterio) | HU-010B C4, C6; RN-172 |
| 140 | F8 paso 4 dice que Marco abre el expediente desde P-010, y el prototipo pasa por P-040 | Agente Reviewer (VL-P040 o.5) | fricción | Baja | Con 1 pendiente, enlazar directo al expediente; o ajustar F8 | HU-013 C1; RN-099 |
| 141 | El error "Elige si la Junta Directiva aprueba o rechaza." no tiene código | Agente Reviewer (VL-P041 o.10) | comprensión | Baja | `HIRE_DECISION_REQUIRED` en §3.0.6, o `422` genérico | HU-013 |
| 142 | El texto de "Motivo" se descarta en silencio al aprobar | Agente Reviewer (VL-P041 o.11) | comprensión | Baja | Definir si la aprobación admite comentario o aclararlo en el hint | HU-013; RN-040 |
| 143 | "← Contrataciones" vuelve a P-040 sin la pestaña de origen | Agente Reviewer (VL-P041 o.13) | fricción | Baja | Propagar `status` en el enlace de vuelta | §3.6 P-040 |
| 144 | `SCREENS` no tiene la ruta de edición `/supplier-hires/{id}/edit` | Agente Reviewer (VL-P041 o.14) | comprensión | Baja | Agregarla al inventario del prototipo | HU-012 |
| 145 | Con `HIRE_NOT_EDITABLE`, el badge sigue en "Borrador" y el mensaje sale dos veces | Agente Reviewer (VL-P042 o.5) | comprensión | Baja | Recargar los datos (badge "Enviada a la Junta") y un solo mensaje | HU-012 C6; RN-097 |
| 146 | "Cargar caso" reemplaza h-101 y borra el historial del seed | Agente Reviewer (VL-P042 o.6) | comprensión | Baja | Cargar los casos sobre un id propio (`h-201`) | HU-013 C5; HU-014 C2; RN-040 |
| 147 | F8 paso 2 pide agregar cotizaciones antes de guardar, pero la ficha exige guardar primero | Agente Reviewer (VL-P042 o.8) | comprensión | Baja | Reordenar F8 paso 2 | F8 |
| 148 | No se puede quitar una cotización, y una carga fallida (RN-166) no tiene estado | Agente Reviewer (VL-P042 o.9) | gap | Baja | Decidir "Quitar cotización" en `Draft` y agregar el estado "La carga falló" | HU-012; RN-097, RN-166 ⚠️ Q28 |
| 149 | Al volver de P-043 en modo nuevo, el aviso habla de un formulario que no existe y la preselección se pierde al guardar | Agente Reviewer (VL-P042 o.10) | fricción | Baja | Conservar `supplierId` en la redirección o cambiar el texto | HU-012 C7 |
| 150 | El campo "Nombre de la persona" llega con `hidden` desde el HTML, y la ficha dice que sin JS está siempre visible | Agente Reviewer (VL-P043 o.7) | comprensión | Baja | Aclarar en la ficha que solo el script lo oculta | §3.6 P-043; §3.0.4 |
| 151 | El nombre de la persona natural es obligatorio, pero la etiqueta no lo dice | Agente Reviewer (VL-P043 o.8) | comprensión | Baja | "Nombre de la persona (obligatorio si es persona natural)" | RN-172 |
| 152 | RN-169 no valida el dígito verificador del RUC | Agente Reviewer (VL-P043 o.9) | mejora | Baja | Decidir si incluye el módulo 11 de SUNAT, con ejemplo y contraejemplo | RN-169 |
| 153 | El formato del código de torre no tiene regla ni código | Agente Reviewer (VL-P050 o.2) | gap | Baja | Agregar el formato y `TOWER_CODE_INVALID_FORMAT` a RN-170 | RN-170, RN-172 |
| 154 | La semilla del padrón no permite recorrer F9, HU-001 C1 y C4 ni HU-001B C1 y C4 tal como están escritos (A-502 ya existe; Ana y Carla ya tienen cuenta) | Agente Reviewer (VL-P050 o.3, VL-P051 o.3, VL-P054 o.7) | comprensión | Baja | Botón "F9 desde cero" o quitar A-502 de la semilla; una Ana sin cuenta (o Gloria) para HU-001B C1 | HU-001 C1, C4; HU-001B C1, C4; F9 |
| 155 | Los `422` de los formularios en línea de P-050 y P-054 no tienen el resumen de errores con foco | Agente Reviewer (VL-P050 o.4, VL-P054 o.4) | gap | Baja | Agregar el resumen o declarar la excepción en §3.0.4 | §3.0.4 |
| 156 | El id de unidad del prototipo no tiene separador (A1-203 = A-1203) | Agente Reviewer (VL-P050 o.5) | gap | Baja | `u-a1-203` en `REG.unitId` | RN-003 (solo prototipo) |
| 157 | "Persona archivada" no está en §3.0.5 ni en la ficha | Agente Reviewer (VL-P052 o.2) | comprensión | Baja | Agregar el texto o no listar esos vínculos | RN-005 |
| 158 | "Ya puedes invitarla." aparece aunque el vínculo empiece en el futuro | Agente Reviewer (VL-P053 o.6) | fricción | Baja | "Podrás invitarla desde el {fecha}." | HU-001B C2; RN-157 |
| 159 | El correo y la fecha con formato inválido no tienen código | Agente Reviewer (VL-P053 o.7) | gap | Baja | `EMAIL_INVALID_FORMAT` y `DATE_INVALID_FORMAT` (o una regla genérica) | RN-172 |
| 160 | El texto de éxito "Registraste el vínculo." no está en la ficha | Agente Reviewer (VL-P053 o.8) | gap | Baja | Agregarlo a la ficha de P-054 | §3.7 P-054 |
| 161 | La lista "Número" de P-053 depende de JS, y la spec es SSR primero | Agente Reviewer (VL-P053 o.9) | gap | Baja | Un `<select>` con `optgroup` por torre, o recargar la página al cambiar de torre | §3.0.2–3.0.4 |
| 162 | Una invitación pendiente no se puede anular ni reenviar con otro rol | Agente Reviewer (VL-P054 o.5) | gap | Baja | Decidir "Anular invitación" (`INVITATION_REVOKED`) o registrar la limitación | RN-110, RN-139 |
| 163 | En el segundo exacto del vencimiento, la ficha dice "vencida" y P-006 la acepta | Agente Reviewer (VL-P054 o.6) | comprensión | Baja | Fijar en RN-110 si el límite es cerrado o abierto y usar la misma comparación en ambas pantallas | RN-110 |
| 164 | Textos desactualizados en las bandas: P-060 y P-061 dicen que P-011 y P-012 no leen `areas-v1`, y la banda de P-060 da `RESERVATION_TOO_FAR_AHEAD` sin la hora | Agente Reviewer (VL-P060 o.3 y o.4, VL-P061 o.7) | comprensión | Baja | Corregir las notas y usar el texto de §3.0.6 con la hora | HU-004; RN-079 |
| 165 | **Propia (P1).** P-031 conserva el código `hireSim` que fuerza "Aprobada" (l. 81) y el texto "aprobada solo en la vista simulada" (l. 85), aunque P-034 ya no lo escribe. Un `exp-session-v1` viejo de la pestaña lo reactivaría | Propia (P1), derivada de VL-P034 o.1 | gap | Baja | Quitar `hireSim` de P-031 para que siempre pinte `h.status` | HU-010B C4, C6; RN-095 |
| 166 | El texto único de `COMMON_AREA_INVALID_LIMITS` no describe la duración que no es múltiplo de 60 s ni el total 0, y las partes negativas ("5 h −30 min") se aceptan si el total sale válido | Agente Reviewer (VL-P061 o.6 y o.8) | comprensión | Baja | Un texto por caso en §3.0.6 y validar cada parte (0–59 min, 0–23 h, ≥ 0 días), o declarar que solo cuenta el total | HU-004 C5; RN-160 |
| 167 | Tras un cambio de configuración, el Administrator no sabe qué reservas `Confirmed` quedaron fuera de la regla nueva | Agente Reviewer (VL-P060 o.5) | mejora | Baja | Aviso "N reservas confirmadas no cumplen la configuración nueva" con enlace a P-062 filtrado (no es Must) | HU-004; HU-008; RN-162 |
| 168 | La cabecera de 03 sigue con "Última actualización: 2026-11-02", y la lista de "Categorías" no incluye Padrón ni Contrataciones | Agente Reviewer (Verif. N6) + Propia (P8) | comprensión | Baja | Actualizar la cabecera y la lista de categorías de 03. **Propia:** el contraejemplo de RN-169 ya existe (03 l. 1977); lo demás sigue abierto (03 l. 4 y 27) | RN-169 a RN-175 |
| 169 | El antiguo 10-validation-log.md no reflejaba las decisiones del 2026-11-08 | Agente Reviewer (Verif. N7) + Propia (P9) | comprensión | Baja | **Propia:** queda superada. Ese contenido se movió a [docs/validation/registro-revision-prototipos.md](docs/validation/registro-revision-prototipos.md), y este documento lo reemplaza con el estado actual | HU-003B, HU-002, HU-010B |

---

## 2. Decisiones tomadas

> **Estado posterior (2026-11-08, auditoría del Spec Finalizer).** Las filas "✅ APLICADA · inmediata" ya están aplicadas en 03, 06, 09 y los prototipos. Las filas "⏳ PENDIENTE" están registradas como Q51 a Q95 en [05-preguntas-abiertas.md](05-preguntas-abiertas.md) §9, con su valor por defecto; las que pedían una regla nueva se resolvieron con RN-163 ampliada y RN-176 a RN-179, y Q25 quedó resuelta (RN-041). Las tareas sugeridas T-056 a T-065 están en [08-backlog.md](08-backlog.md). Las citas a `/api/suppliers` y `SUPPLIER_*` de la tabla son históricas: el proveedor se llama `Vendor` (`/api/vendors`, `VENDOR_*`). Detalle: [docs/validation/auditoria-spec-finalizer.md](docs/validation/auditoria-spec-finalizer.md).

**Estados (propuestos por el consolidador; los confirma el autor):**

- **✅ APLICADA · hecha:** el cambio ya está en el Spec Pack o en los prototipos, según la fuente o la comprobación propia.
- **✅ APLICADA · inmediata:** un cambio pequeño y sin decisiones abiertas (texto, traza, ficha) que se aplica en la próxima edición del archivo. **El consolidador no edita** 03, 06, 07, 08 ni 09: cada uno es de su propio agente.
- **⏳ PENDIENTE:** cambio importante de la spec que necesita una decisión del autor o más trabajo. **Se resuelve antes de implementar la HU afectada.**
- **⏳ BACKLOG:** mejora futura, o ajuste del prototipo de demostración que no cambia la spec. Lleva un ID de tarea sugerido, a partir de T-056 (08-backlog.md termina en T-055).

### Qué aplicar ahora y qué dejar para después

1. **No quedan observaciones Alta abiertas.** Las 14 están aplicadas. Las cuatro "sin verificación independiente" (filas 11 a 14) se comprobaron en esta consolidación. Solo deja un residuo (fila 165, Baja), y el prototipo P-054 (fila 13) no se volvió a probar.
2. **Aplicar ahora:** las ✅ inmediatas de abajo. Son trazas, textos y precisiones de fichas que no necesitan una decisión.
3. **Resolver antes de implementar:** las ⏳ PENDIENTE Media de la spec, sobre todo las que crean o cambian RN MUST: filas 19, 37, 58, 64, 72, 74 y 75 (RN nuevas o ampliadas) y filas 26, 30, 31, 52, 59 y 71 (reglas ambiguas).
4. **Backlog:** los ajustes del prototipo de demostración y las mejoras Baja, agrupados en las tareas T-056 a T-065.

### ✅ APLICADA · hecha

| # | Estado | Dónde |
|---|---|---|
| 1 | ✅ APLICADA · hecha (iteración 1) | prototypes/P-003…P-007 |
| 2 | ✅ APLICADA · hecha (iteración 2), confirmada en la re-revisión | prototypes/P-032…P-034 |
| 3 | ✅ APLICADA · hecha (iteración 2), confirmada en VL-P042 | prototypes/P-042, P-043 |
| 4 | ✅ APLICADA · hecha (iteración 1) | shell.js; 09 §3.1 |
| 5 | ✅ APLICADA · hecha (iteración 2), verificada | shell.js; P-007 |
| 6 | ✅ APLICADA · hecha (iteración 2), verificada | RN-079; HU-005; §3.0.6; P-012 |
| 7 | ✅ APLICADA · hecha (iteración 2), verificada; N8 en la iteración 3 | RN-163; HU-005; §3.0.6 |
| 8 | ✅ APLICADA · hecha (iteración 2), verificada | shell.js (`CH.NOW`); P-012, P-014, P-015, P-016, P-062 |
| 9 | ✅ APLICADA · hecha (iteración 2), verificada | P-020; ficha de P-020 |
| 10 | ✅ APLICADA · hecha (iteración 3); N1, N2 y N3 aplicados. **Propia:** 07 l. 743 ya excluye el polling (`X-CondoHub-Background: poll`) y el `meta refresh` (`?auto=1`) | RN-113; HU-003B; 07 ADR-0013; P-020 |
| 11 | ✅ APLICADA · hecha (iteración 3) en P-034, verificada por el consolidador. Queda un residuo en P-031 → fila 165 | P-034 |
| 12 | ✅ APLICADA · hecha (iteración 3), verificada por el consolidador | HU-012 C7 y criterio negativo; 08-backlog l. 925; P-043 |
| 13 | ✅ APLICADA · hecha (iteración 3), verificada en 03 por el consolidador (el prototipo P-054 no se volvió a probar) | RN-175; §3.0.6; P-054 |
| 14 | ✅ APLICADA · hecha (iteración 3), verificada en shell.js y P-012 por el consolidador | shell.js (`AREA_ALIAS`); P-012; HU-004 C1 |
| 169 | ✅ APLICADA · hecha (superada por este documento) | 10-validation-log.md |

> También están hechas, y no tienen fila propia porque la fuente las da por cerradas: VL-P030 o.2 / VL-P031 o.3 (fechas del escenario y de la anulación, iteración 3; **Propia:** 07 l. 668 ya dice `voidedAt 2026-11-21`, Verif. N4), VL-P061 o.3 (la anticipación se truncaba a días, iteración 3), Verif. N5 (trazas de RN-169 a RN-175) y la corrección cruzada de VL-P001 por VL-P007.

### ✅ APLICADA · inmediata (aplicar en la próxima edición)

| # | Cambio | Archivo |
|---|---|---|
| 33 | Marcar HU-005 C3 y C8 como criterios de API y agregar el equivalente de UI | 06 |
| 50 | Aclarar en HU-011 C3 y RN-142 que "detalle" es P-031 | 06, 03 |
| 67 | Etiqueta "Justificación (necesaria para enviar)" | 09 §3.6 P-042; P-042 |
| 68 | Trazas de RN-169, RN-172 y RN-173 en las fichas de P-042 y P-043, y criterios negativos en HU-012 | 09, 06 |
| 76 | Reescribir HU-001 C8 como "registra en el log" con prueba de integración | 06 |
| 86 | §3.0.4: en las páginas de acceso, el enlace del `500` es a P-001 | 09 |
| 94 | El `POST /accept` vuelve a validar RN-110, RN-139 y RN-165 | 09 §3.1 P-006 |
| 96 | `h1` de los estados de P-006 | 09 §3.1 P-006 |
| 98 | Concierge en el "Como…" de HU-002 | 06 |
| 99 | La puerta de consentimiento es una redirección del servidor | 09 §3.0.4 |
| 102 | Corregir las trazas de RN en las fichas de P-006, P-011, P-014, P-041 y P-061 | 09 |
| 110 | "Cancelada después" → P-015 directo | P-013 |
| 122 | Ficha de P-020: búsqueda por nombre o unidad | 09 §3.4 |
| 125 | Los totales de P-030 son del mes completo | 09 §3.5 |
| 127 | Precisar la fila de "Limpieza de cisterna" en F7 y HU-011 C6 | 09, 06 |
| 130 | Monto anulado sin tachado (criterio único) | 09 §3.5; P-031 |
| 134 | Estado "sin proveedores" en la ficha de P-032 | 09 §3.5 |
| 136 | GET de un gasto anulado → P-031 con aviso | 09 §3.5 P-033 |
| 139 | Opciones y `FIELD_REQUIRED` en la ficha de P-034; orden C4 → C6 en la banda | 09; P-034 |
| 147 | Reordenar F8 paso 2 | 09 |
| 150, 151 | Ficha de P-043: `hidden` solo por script, etiqueta "(obligatorio si es persona natural)" | 09 §3.6; P-043 |
| 158 | Texto de éxito condicional "Podrás invitarla desde el {fecha}." | 09 §3.7; P-053 |
| 160 | Texto de éxito "Registraste el vínculo." en la ficha | 09 §3.7 |
| 164 | Corregir las notas de las bandas de P-060 y P-061 | P-060, P-061 |
| 165 | Quitar `hireSim` de P-031 | P-031 |
| 168 | Cabecera y categorías de 03 | 03 |

### ⏳ PENDIENTE (decisión del autor o cambio de spec antes de implementar)

| # | Qué hay que decidir o escribir | Archivo | Bloquea |
|---|---|---|---|
| 16 | Si los fallos de enrolamiento suman a RN-111 | 03, 09 | HU-003 |
| 17 | Criterio de `returnUrl` local en HU-003B y su test | 06 | HU-003B |
| 18 | Textos de ayuda y procedimiento manual mientras RN-115 y RN-141 sigan diferidas | 09, ADR-0020 | HU-003, HU-003B |
| 19 | RN nueva del rate limit de `/api/auth/*` | 03, 06 | HU-003B |
| 22 | Los enlaces de P-002 conservan `returnUrl` | 09 | HU-003 |
| 23 | TTL de la sesión parcial, tipo de sesión de P-007 y estados comunes de P-002 a P-005 | 07, 09 | HU-003, HU-002B |
| 26 | RN-070 por condominio | 03, 06 | HU-002B |
| 27 | Aceptar con sesión iniciada y con otra cuenta (RN-122, F1 2c) | 03, 06, 09 | HU-002 |
| 28 | Quitar `maxlength` y fijar la unidad de medida en RN-116 | 03, 09 | HU-002 |
| 30 | Cerrar §6.4 y reescribir RN-088 | 03, 06, 09 | HU-008 |
| 31 | `cancelledBy` por persona y la condición del aviso | 03, 06 | HU-008 |
| 34 | La fecha visible y la del POST en P-012 | 09, 06 | HU-005 |
| 37 | Códigos del anfitrión y anfitrión en una unidad alquilada | 03, 06, 09 | HU-006B |
| 40 | Alcance de la aceptación del aviso de privacidad (Q18/Q21) | 03, 06 | HU-007 |
| 41 | Destino del error de cancelación tardía o repetida | 09 | HU-008 |
| 42 | `<h1>` y datos de portería a medianoche | 09 | HU-009 |
| 44 | Estado "desactualizada" de portería | 09 | HU-009 |
| 45 | `no-store` en 07 y su test E2E | 07 | HU-003B, HU-009 |
| 46 | RN-164 para reservas terminadas | 03 | HU-009 |
| 47 | Camino del invitado que no está en la lista (F5) | 09, 06 | HU-009 |
| 49 | Mes futuro en P-030, RN-035 y HU-011 C11 | 03, 06, 09 | HU-011 |
| 52 | Q30: proveedor elegido y tope de monto | 03, 05 | HU-010B |
| 53 | Estado "sin comprobante" (Q28) | 09 | HU-011 |
| 54 | Vínculo gasto–contratación: único e inmutable, corrección y códigos | 03, 06, 09 | HU-010B |
| 55 | ¿Un gasto vinculado puede ser anterior a la aprobación? | 03 | HU-010B |
| 57 | Signo y precisión en RN-173 y §3.0.3 | 03, 09 | HU-010 |
| 58 | RN de idempotencia de gastos (Q48) | 03, 06 | HU-010 |
| 59 | Q25: `Draft` para la Junta, `403` o `404` | 03, 05, 09 | HU-013, HU-014 |
| 63 | Q34: proveedor persona natural | 03, 05, 09 | HU-014 |
| 64 | RN de concurrencia de decisiones (`409`) | 03, 06 | HU-013 |
| 65 | Documentos adicionales de la contratación o reescribir C14 | 06, 07, 09 | HU-012 |
| 66 | PDF obligatorio por cotización (Q28) | 03, 09 | HU-012 |
| 69 | Fila "Registrar proveedor" en la matriz y su test | 09 §6 / 07 | HU-012 |
| 70 | Aviso de éxito al volver de P-043 | 09 | HU-012 |
| 71 | Alcance de RN-153 ante el Administrator y nombre en RN-132 | 03, 06, 09 | HU-001 |
| 72 | RN-058 sin ceros a la izquierda | 03, 06 | HU-001 |
| 73 | Terminar o modificar vínculos y corregir unidades, o ADR + matrices R1 y R2 | 06, 09, ADR | HU-001 |
| 74 | RN-002 con invitaciones pendientes | 03, 06 | HU-001, HU-001B |
| 75 | RN de vínculos duplicados o superpuestos | 03, 06 | HU-001 |
| 77 | ADR del alta del personal de portería y hint en P-054 | ADR, 09 | HU-009 |
| 78 | El rol revocado vuelve solo por invitación | 03, 09 | HU-001B |
| 91 | `returnUrl` entre condominios y `condominiumId` ajeno | 09 | HU-003 |
| 92 | Sin cambio de condominio en sesión (confirmar en RN-064) | 03, 09 | — |
| 117 | Control de concurrencia de la cancelación | 07, 09 | HU-008 |
| 87, 89, 90, 93, 100, 101, 103, 113, 126, 128, 133, 137, 141, 142, 148, 153, 157, 159, 161, 162, 163, 166 | Decisiones Baja de reglas, textos o fichas (ver la tabla) | 03, 06, 07, 09 | Se resuelven al implementar la HU afectada |

### ⏳ BACKLOG (tareas sugeridas)

| ID sugerido | Tarea | Filas |
|---|---|---|
| **T-056** | Prototipo · personas y selector: `CH.init` sin cambio silencioso de persona; personas sin TOTP, con dos condominios, `anaBoard`, `pedro`, vínculo futuro, Owner vencido; Raúl, Ana y Rosa en los selectores de `403` | 20, 24, 43, 60, 106, 107, 116 |
| **T-057** | Prototipo · acceso: contador de RN-111 compartido, códigos de recuperación únicos, condominio elegido en el `AppShell`, salida de P-003 | 15, 21, 25, 88 |
| **T-058** | Prototipo · reservas: ids incrementales, estados `IDEMPOTENCY_KEY_REUSED` y `403` de unidad, invitados en la sesión, "visto" persistido, reservas `EXTRA` en `CH.DATA`, regreso al día en P-062 | 29, 32, 36, 38, 39, 111, 119 |
| **T-059** | Prototipo · datos de demostración coherentes: fechas de reservas (F3, F11), r-8841 con 40 personas, escenario sin áreas, gastos de HU-011 C10 y C12, reemplazo de e-1104, adelanto de h-101, bordes de HU-012, ISO con segundos en P-041, casos sobre `h-201`, semilla del padrón para F9 | 35, 48, 51, 55, 61, 62, 80, 81, 146, 154 |
| **T-060** | Prototipo · relojes y bordes: P-020 con `CH.TODAY`/`CH.NOW` y control de medianoche, estados 18:59 y 19:00:00, `?today` visible en todas las bandas | 42, 115, 129 |
| **T-061** | Prototipo · conexiones entre flujos: F6 2a → P-043 con catálogo compartido de proveedores, F9 → F1 con tokens por invitación, ruta de edición de P-042, `status` de vuelta en P-041, `supplierId` tras guardar | 56, 79, 143, 144, 149 |
| **T-062** | Prototipo · estados y textos menores: `403` en selectores, paginación de demostración, refresco en el estado vacío y reserva `Cancelled`, selector "Llegada", `HIRE_NOT_EDITABLE`, aforo en P-015, id de unidad con separador, resumen de errores en formularios en línea | 104, 112, 114, 121, 124, 132, 145, 155, 156 |
| **T-063** | Pruebas derivadas de la validación: integración de `returnUrl` externo, E2E de `no-store` en portería, E2E sin JS de "Marcar ingreso", prueba de API de `EXPENSE_IMMUTABLE` (Postman), test de `condominiumId` ajeno | 17, 45, 91, 123, 138 |
| **T-064** | UX post-MVP: cupo usado en P-011, "(tu reserva)", filtro por unidad en P-062, "Gastos vinculados" en P-041, aviso de reservas fuera de la regla nueva, dígito verificador del RUC | 105, 108, 118, 131, 152, 167 |
| **T-065** | Textos de acceso y portería: sesión vencida neutra, pista de bloqueo, `/sign-in` con sesión activa, configuración del navegador de portería, enlace de invitación no válida, nota de segundos de P-006, `TempData` de reenvío, `304` en portería, enlace de F8 paso 4, RN-036 (M-20) | 82, 83, 84, 85, 95, 97, 109, 120, 135, 140 |

---

## 3. Archivos actualizados

**Escrito en esta consolidación:**

| Archivo | Cambio |
|---|---|
| [10-validation-log.md](10-validation-log.md) | Creado: tabla consolidada (169 filas), decisiones y archivos |

**Archivos del Spec Pack que se modificarían** (al aplicar las ✅ inmediatas y resolver las ⏳ PENDIENTE; los edita su agente dueño):

| Archivo | Qué cambia | Filas |
|---|---|---|
| [03-reglas-de-negocio.md](03-reglas-de-negocio.md) | RN nuevas: rate limit de auth, idempotencia de gastos, concurrencia de decisiones, vínculos superpuestos, códigos del anfitrión. RN reescritas o ampliadas: RN-002, RN-035, RN-058, RN-064, RN-070, RN-084, RN-088, RN-092, RN-094, RN-095, RN-110, RN-111, RN-116, RN-122, RN-132, RN-142, RN-153, RN-164, RN-169, RN-170, RN-173. Cabecera y categorías | 16, 19, 26–28, 30, 31, 37, 46, 49, 52, 54, 55, 57, 58, 64, 71, 72, 74, 75, 78, 92, 93, 133, 137, 152, 153, 163, 168 |
| [05-preguntas-abiertas.md](05-preguntas-abiertas.md) | Cerrar o actualizar Q18/Q21, Q25, Q27, Q28, Q30 y Q34 con lo que se decida | 40, 52, 53, 59, 63, 66, 128 |
| [06-user-stories.md](06-user-stories.md) | Criterios nuevos o corregidos en HU-001, HU-001B, HU-002, HU-002B, HU-003B, HU-005, HU-006B, HU-008, HU-010, HU-010B, HU-011, HU-012, HU-013 y HU-014; marcar HU-005 C3/C8 y HU-001 C8 como criterios de API o integración | 17, 19, 26, 27, 30, 31, 33, 34, 37, 49, 50, 54, 58, 59, 64, 68, 71, 72, 74–76, 98, 127 |
| [07-architecture.md](07-architecture.md) | TTL de la sesión parcial y tipo de sesión de P-007, `no-store` en portería, `nextStep` del enrolamiento, concurrencia de la cancelación, endpoint de documentos adicionales, permiso de registrar proveedor | 23, 45, 65, 69, 90, 117 |
| [08-backlog.md](08-backlog.md) | Agregar T-056 a T-065 | Backlog |
| [09-ui-spec.md](09-ui-spec.md) | Fichas de P-001 a P-007, P-010, P-011, P-012, P-013, P-016, P-020, P-030 a P-034, P-041 a P-043, P-050 a P-054, P-061; §3.0.3, §3.0.4, §3.0.5, §3.0.6; §6.4; matrices H3, R1, R2 y la fila de proveedores; F1, F5, F7, F8 | 18, 22, 23, 27, 30, 34, 41, 42, 44, 47, 49, 53, 65–67, 69, 70, 73, 77, 86, 94, 96, 99, 102, 122, 125–127, 130, 134, 136, 139, 147, 150, 151, 158, 160 |
| ADR nuevos o ADR-0020 ([docs/adr/](docs/adr/)) | Procedimiento manual de contraseña y MFA, alta del personal de portería, alcance de la edición de vínculos y unidades, vínculo gasto–contratación | 18, 54, 73, 77 |
| [prototypes/](prototypes/) | Ajustes de demostración (T-056 a T-062) y las ✅ inmediatas de P-013, P-031, P-034, P-043, P-053, P-060 y P-061 | Backlog y ✅ inmediatas |

**Trazabilidad:** cada fila cita su origen como `VL-P0xx o.N` (sección "4. Observaciones" de esa revisión en el reporte del Agente Reviewer), `VL-P0xxr` (re-revisión), `Verif. Nx` (apéndice del verificador) o `Propia (Pn)`, con la evidencia de archivo y línea en la misma fila.
