# CondoHub — UI Specification

> **Fase:** Solución (Agente UI Designer, BMAD)
> **Fecha:** 2026-11-04 · **Versión:** v0.3 (2026-11-08): aplicadas las correcciones inmediatas de la validación de prototipos y la auditoría del Spec Finalizer (Q25, códigos RN-176 a RN-179, proveedor como `Vendor`) · v0.2 (2026-11-04): flujos F11–F13; estados de P-013, P-052 y P-060; wireframe completo de P-091; bloque del Administrator en P-010
> **Autor:** Jose Bustamante
> **Documentos relacionados:** [00-constitucion.md](00-constitucion.md) v1.4 · [02-alcance.md](02-alcance.md) · [03-reglas-de-negocio.md](03-reglas-de-negocio.md) · [06-user-stories.md](06-user-stories.md) v0.4 · [07-architecture.md](07-architecture.md) v0.4 · [docs/security/permissions-matrix.md](docs/security/permissions-matrix.md)

## Convenciones

**Alcance.** Esta especificación cubre solo las pantallas que implementan las 19 HU del MVP (HU-001 a HU-014, todas **Must**). Las funcionalidades Should (S1–S5) y Could (C1–C4) no tienen HU todavía, así que no reciben ID de pantalla ni Screen Spec: se listan en [§1.3](#13-pantallas-futuras-sin-hu) a la espera de sus HU (decisión del autor, 2026-11-04). Tampoco hay pantallas para lo diferido por el [ADR-0020](docs/adr/0020-defer-account-self-service-and-handover.md) (perfil del titular, recuperación de contraseña, regeneración de códigos, aviso de TLS 1.2, log de auditoría para la Junta, traspaso de administradora) ni por el [ADR-0010](docs/adr/0010-defer-arco-and-complaints-book.md) (ARCO, Libro de Reclamaciones).

**Idioma (PRINCIPIO-001).** Las rutas, los nombres de componentes, las clases CSS y los tokens están en **inglés**. Todo texto visible está en **español de Perú** y sale de `es-PE.resx`, nunca escrito en el `.razor`. En los wireframes:
- `"Texto"` entre comillas es el valor propuesto en `es-PE.resx`.
- `` `Clave_Recurso` `` es la clave del recurso cuando conviene fijarla. Las demás claves siguen la convención `{Pantalla}_{Elemento}` (por ejemplo, `SignIn_Submit`).
- Los mensajes de error se resuelven por el código de Problem Details (`RESERVATION_OVERLAP` → `Error_RESERVATION_OVERLAP`). La tabla de [§3.0.6](#306-mensajes-de-error-por-código) propone sus textos.

**Accesibilidad (PRINCIPIO-011).** Toda pantalla cumple WCAG 2.1 AA, se lee al 200 % sin scroll horizontal (reflujo a 320 px CSS), usa 16 px como tamaño mínimo de texto y objetivos táctiles de 44×44 px como mínimo. Los criterios concretos están en [§3.0.1](#301-reglas-de-accesibilidad-comunes) y se verifican con axe en el CI.

**Rendimiento (ADR-0007, arquitectura §6.3).** Las páginas de residentes son **SSR estático sin WebAssembly ni SignalR**, con formularios que funcionan sin JavaScript, ≤ 150 KB en la primera carga y fuentes del sistema. Todo JavaScript descrito aquí es **mejora progresiva opcional**: la pantalla funciona igual sin él.

**Marcas.**
- **⚠️ Qn:** el elemento depende de una pregunta abierta de [05-preguntas-abiertas.md](05-preguntas-abiertas.md).
- **🧩 JS opcional:** mejora progresiva; la pantalla no depende de ella.
- **🔒 Rol:** el bloque solo se renderiza para ese rol o política.

**Rutas.** Las rutas son una propuesta de la UI; los endpoints que usan están en el mapa de la arquitectura §4.2 (completado en v0.4, Q36). Las páginas Blazor llaman a los casos de uso en proceso (arquitectura §1.2), no a la API por HTTP.

---

## 1. Inventario de pantallas

### 1.1 Pantallas del MVP

| ID | Pantalla | Ruta propuesta | Actor principal | HU | Prioridad |
|---|---|---|---|---|---|
| **Acceso** | | | | | |
| P-001 | Iniciar sesión | `/sign-in` | Todos | HU-003, HU-003B | Must |
| P-002 | Verificar código MFA | `/sign-in/mfa` | Administrator, BoardMember | HU-003, HU-003B | Must |
| P-003 | Configurar la app autenticadora | `/sign-in/mfa/enroll` | Administrator, BoardMember | HU-003 | Must |
| P-004 | Códigos de recuperación | `/sign-in/mfa/recovery-codes` | Administrator, BoardMember | HU-003 | Must |
| P-005 | Elegir condominio | `/sign-in/condominium` | Usuario con más de un condominio | HU-003, HU-002B | Must |
| P-006 | Activar cuenta por invitación | `/invitations/{token}` | Persona invitada | HU-002 | Must |
| P-007 | Consentimiento informado | `/consent` | Todos (primera vez y por versión nueva) | HU-002B | Must |
| **Inicio** | | | | | |
| P-010 | Inicio | `/` | Todos excepto Concierge | HU-008, HU-013 | Must |
| **Reservas** | | | | | |
| P-011 | Áreas comunes | `/common-areas` | Propietario, inquilino | HU-005 | Must |
| P-012 | Nueva reserva (disponibilidad, franja e invitados) | `/reservations/new` | Propietario, inquilino, Administrator | HU-005, HU-006, HU-006B, HU-007 | Must |
| P-013 | Reserva confirmada | `/reservations/{id}/confirmed` | Propietario, inquilino, Administrator | HU-005, HU-007 | Must |
| P-014 | Mis reservas | `/reservations` | Propietario, inquilino | HU-008 | Must |
| P-015 | Detalle de reserva | `/reservations/{id}` | Anfitrión, Administrator | HU-007, HU-008 | Must |
| P-016 | Cancelar reserva | `/reservations/{id}/cancel` | Anfitrión, Administrator | HU-008 | Must |
| **Portería** | | | | | |
| P-020 | Portería: reservas del día | `/concierge` | Concierge | HU-009 | Must |
| **Gastos** | | | | | |
| P-030 | Gastos del mes | `/expenses?month=AAAA-MM` | Propietario, Junta Directiva, Administrator | HU-011 | Must |
| P-031 | Detalle de gasto | `/expenses/{id}` | Propietario, Junta Directiva, Administrator | HU-011, HU-010B | Must |
| P-032 | Registrar gasto | `/expenses/new` | Administrator | HU-010 | Must |
| P-033 | Anular gasto | `/expenses/{id}/void` | Administrator | HU-010B | Must |
| P-034 | Vincular gasto a una contratación | `/expenses/{id}/supplier-hire` | Administrator | HU-010B | Must |
| **Contrataciones** | | | | | |
| P-040 | Contrataciones | `/supplier-hires` | Propietario, Junta Directiva, Administrator | HU-012, HU-013, HU-014 | Must |
| P-041 | Expediente de contratación | `/supplier-hires/{id}` | Propietario, Junta Directiva, Administrator | HU-013, HU-014 | Must |
| P-042 | Crear o editar contratación | `/supplier-hires/new` · `/supplier-hires/{id}/edit` | Administrator | HU-012 | Must |
| P-043 | Registrar proveedor | `/vendors/new` | Administrator | HU-012 | Must |
| **Padrón** | | | | | |
| P-050 | Padrón: torres y unidades | `/registry` | Administrator | HU-001 | Must |
| P-051 | Registrar unidad | `/registry/units/new` | Administrator | HU-001 | Must |
| P-052 | Detalle de unidad | `/registry/units/{id}` | Administrator | HU-001 | Must |
| P-053 | Registrar persona y vínculo | `/registry/persons/new` | Administrator | HU-001 | Must |
| P-054 | Ficha de persona e invitación | `/registry/persons/{id}` | Administrator | HU-001, HU-001B | Must |
| **Configuración** | | | | | |
| P-060 | Áreas comunes (administración) | `/admin/common-areas` | Administrator | HU-004 | Must |
| P-061 | Configurar área común | `/admin/common-areas/new` · `/admin/common-areas/{id}` | Administrator | HU-004 | Must |
| P-062 | Reservas del condominio | `/admin/reservations` | Administrator | HU-006, HU-006B, HU-008 | Must |
| **Sistema** | | | | | |
| P-090 | Acceso denegado (403) | — (respuesta) | Todos | HU-009, HU-011, HU-014 | Must |
| P-091 | No encontrado (404) | — (respuesta) | Todos | HU-001 a HU-014 (aislamiento, RN-103) | Must |

**Total:** 34 pantallas, todas Must. Las 19 HU tienen al menos una pantalla.

### 1.2 Cobertura HU → pantallas

| HU | Pantallas |
|---|---|
| HU-001 | P-050, P-051, P-052, P-053, P-054 |
| HU-001B | P-054 |
| HU-002 | P-006 |
| HU-002B | P-007, P-005 |
| HU-003 | P-001, P-002, P-003, P-004, P-005 |
| HU-003B | P-001, P-002 |
| HU-004 | P-060, P-061 |
| HU-005 | P-011, P-012, P-013 |
| HU-006 | P-012, P-062 |
| HU-006B | P-012, P-062 |
| HU-007 | P-012, P-013, P-015 |
| HU-008 | P-010, P-014, P-015, P-016, P-062 |
| HU-009 | P-020, P-090 |
| HU-010 | P-032 |
| HU-010B | P-031, P-033, P-034 |
| HU-011 | P-030, P-031, P-090 |
| HU-012 | P-040, P-042, P-043 |
| HU-013 | P-010, P-040, P-041 |
| HU-014 | P-040, P-041, P-090 |

### 1.3 Pantallas futuras (sin HU)

No tienen ID ni spec. Se especifican cuando exista su HU.

| Funcionalidad | Prioridad | Pantallas previstas |
|---|---|---|
| S1 Averías | Should | Reportar avería, Mis averías, Gestión de averías (Administrator) |
| S2 Pagos y estado de cuenta | Should | Mi estado de cuenta, Registrar pago (Administrator) |
| S3 Anuncios y convocatorias | Should | Anuncios, Publicar anuncio |
| S4 Panel de indicadores | Should | Indicadores del piloto (K1–K5) |
| S5 Importación CSV | Should | Importar padrón, Resultado de la importación |
| C1 Notificaciones por correo | Could | Sin pantalla nueva (plantillas de correo) |
| C2 Consultas no vinculantes | Could | Consultas, Responder consulta |
| C3 Solicitudes de videovigilancia | Could | Solicitar revisión de grabación, Solicitudes (Administrator) |
| C4 Historial exportable | Could | Exportar expediente |

---

## 2. User flows

Cada flujo indica el actor, las HU y la secuencia de pantallas. La columna **Resultado** describe lo que ve el usuario, no el estado interno.

### F1 · Activar la cuenta y aceptar el consentimiento

**Actor:** Ana Quispe (Resident, `Owner` de A-502) · **HU:** HU-001B, HU-002, HU-002B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | Correo de invitación (buzón de prueba en dev) | Abre el enlace de un solo uso | Navega a P-006 |
| 2 | P-006 Activar cuenta | Escribe una contraseña de 12 a 64 caracteres y pulsa "Crear mi cuenta" | Cuenta creada; redirige a P-007 |
| 2a | P-006 | La invitación venció, ya se usó o fue anulada | Estado de invitación no válida, sin formulario |
| 2b | P-006 | El correo ya tiene cuenta en otro condominio | Mensaje "Ya tienes una cuenta…" y botón a P-001 con regreso a la invitación |
| 3 | P-007 Consentimiento | Lee el texto (incluye la transferencia a EE. UU.) y pulsa "Acepto" | Redirige a P-010 |
| 3a | P-007 | Pulsa "No acepto" | Estado de rechazo; la sesión se cierra. Al volver a entrar ve solo P-007 |

### F2 · Iniciar sesión con MFA (Administrator o BoardMember)

**Actor:** Marco Salazar (BoardMember) · **HU:** HU-003, HU-003B, HU-002B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-001 Iniciar sesión | Escribe correo y contraseña, pulsa "Ingresar" | Según `nextStep`: P-003 (sin TOTP) o P-002 |
| 2a | P-003 Configurar app autenticadora | Escanea el QR o copia la clave, escribe el código de 6 dígitos | Navega a P-004 |
| 2b | P-004 Códigos de recuperación | Guarda los 10 códigos, marca "Guardé mis códigos" y continúa | Sigue al paso 3 |
| 2c | P-002 Verificar código | Escribe el código TOTP o, desde "Usar un código de recuperación", uno de sus códigos | Sigue al paso 3 |
| 3 | P-005 Elegir condominio | Solo si tiene más de un condominio: elige uno | Sigue al paso 4 |
| 4 | P-007 Consentimiento | Solo si no aceptó la versión vigente de ese condominio | P-010 tras aceptar |
| 5 | P-010 Inicio | Ve "1 contratación por decidir" | Puede ir a P-040 |
| E | P-001 / P-002 | Contraseña o código incorrecto, o cuenta bloqueada | Mismo mensaje neutro en todos los casos (`SIGN_IN_FAILED`) |

### F3 · Reservar un área con invitados (beneficio 1, K4 = 1 paso)

**Actor:** Ana (Owner de A-502) o Carla Díaz (Tenant de A-301) · **HU:** HU-005, HU-006, HU-006B, HU-007

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-010 Inicio | Pulsa "Reservar un área" | P-011 |
| 2 | P-011 Áreas comunes | Elige "Salón de fiestas" | P-012 con el área preseleccionada y la fecha de hoy |
| 3 | P-012 Nueva reserva · paso Disponibilidad | Cambia la fecha a 2026-12-12 y pulsa "Ver disponibilidad" | La página se recarga con las franjas ocupadas de ese día |
| 4 | P-012 · paso Franja | Elige unidad (si tiene más de una), inicio 19:00, fin 23:00 y personas de la unidad = 2 | — |
| 5 | P-012 · paso Invitados | Escribe 38 nombres (uno por línea) y marca el aviso de privacidad | — |
| 6 | P-012 | Pulsa "Confirmar reserva" | P-013 con la reserva `Confirmada` en el mismo envío |
| 6a | P-012 | Una regla rechaza la solicitud (cruce, aforo, cupo, horario…) | P-012 se vuelve a mostrar con los datos escritos y el error junto al campo y en el resumen |
| 6b | P-012 | La red se corta y el navegador reenvía | La misma clave de idempotencia devuelve la misma reserva: P-013 sin duplicado |
| 7 | P-013 Reserva confirmada | Pulsa "Ver mi reserva" | P-015 |

### F4 · Cancelar una reserva y recibir el aviso

**Actores:** Ana; Administrator · **HU:** HU-008

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-014 Mis reservas | Ana abre una reserva `Confirmada` | P-015 |
| 2 | P-015 Detalle | Pulsa "Cancelar reserva" (solo antes del inicio) | P-016 |
| 3 | P-016 Cancelar | Confirma con "Sí, cancelar" | P-014 con aviso de éxito; la reserva aparece `Cancelada` en el historial |
| A1 | P-062 Reservas del condominio | El Administrator abre la reserva de Ana y pulsa "Cancelar" | P-016 → P-062 con aviso de éxito |
| A2 | P-001 → P-010 | Ana inicia sesión después | P-010 muestra el aviso: área, fecha y franja de la reserva cancelada por la administración |
| A3 | P-010 | Ana pulsa "Entendido" | El aviso no vuelve a aparecer |

### F5 · Dejar pasar a un invitado en portería

**Actor:** Raúl Mendoza (Concierge) · **HU:** HU-009, HU-003B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-001 | Inicia sesión en la PC de portería | P-020 (el Concierge no tiene P-010) |
| 2 | P-020 Portería | Busca la reserva de A-502 (Salón de fiestas, 19:00–23:00) y al invitado "Pedro Ramos" | — |
| 3 | P-020 | Pulsa "Marcar ingreso" en la fila de Pedro Ramos | La fila muestra "Ingresó 19:07" y el botón desaparece |
| 4 | P-020 | Espera; la vista se actualiza sola cada 30 s | Una reserva cancelada desaparece en ≤ 60 s |
| E | P-020 | La sesión expira por inactividad | Banner "Tu sesión se cerró" con botón a P-001 |

### F6 · Registrar, anular y vincular un gasto

**Actor:** Administrator · **HU:** HU-010, HU-010B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-030 Gastos del mes | Pulsa "Registrar gasto" | P-032 |
| 2 | P-032 Registrar gasto | Completa descripción, monto, fecha, categoría, proveedor y adjunta el comprobante; pulsa "Registrar gasto" | P-031 del gasto nuevo con aviso de éxito |
| 2a | P-032 | Falta el proveedor en la lista | Enlace "Registrar proveedor" → P-043 → vuelve a P-032 |
| 3 | P-031 Detalle | Pulsa "Anular gasto" | P-033 |
| 4 | P-033 Anular | Escribe el motivo y confirma | P-031 con el gasto `Anulado`, el motivo y la fecha-hora |
| 5 | P-031 Detalle (otro gasto) | Pulsa "Vincular a una contratación" | P-034 |
| 6 | P-034 Vincular | Elige una contratación `Aprobada` y guarda | P-031 con el enlace al expediente |

### F7 · Consultar en qué se gastó la cuota (beneficio 2)

**Actor:** Luis Rojas (NonResidentOwner) o Ana (Owner) · **HU:** HU-011

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-010 Inicio | Pulsa "Gastos del condominio" | P-030 del mes actual |
| 2 | P-030 | Elige 2026-11 (selector de mes o "Mes anterior") | Totales por categoría y lista de gastos del mes |
| 3 | P-030 | Abre "Limpieza de cisterna" de S/ 1,200.00 del 08/11/2026 (la que tiene `factura-F001-0458.pdf`; hay otra fila con la misma descripción y fecha) | P-031 |
| 4 | P-031 | Pulsa "Descargar comprobante" | Descarga `factura-F001-0458.pdf` por la API |
| E | P-030 | Carla (solo `Tenant`) escribe `/expenses` | P-090 Acceso denegado |

### F8 · Registrar una contratación, decidirla y consultarla (K5)

**Actores:** Administrator, Marco (BoardMember), Luis (NonResidentOwner) · **HU:** HU-012, HU-013, HU-014

| # | Pantalla | Actor | Acción | Resultado |
|---|---|---|---|---|
| 1 | P-040 Contrataciones | Adm | Pulsa "Nueva contratación" | P-042 en `Borrador` |
| 2 | P-042 | Adm | Escribe título y justificación y pulsa "Guardar borrador" | P-042 en `Borrador`, con la sección de cotizaciones habilitada |
| 2b | P-042 | Adm | Agrega 2 cotizaciones de proveedores distintos con su PDF | P-042 con las cotizaciones listadas |
| 3 | P-042 | Adm | Pulsa "Enviar a la Junta Directiva" | P-041 en `Enviada a la Junta` |
| 4 | P-010 | Brd | Ve "1 contratación por decidir" y la abre | P-041 con el panel de decisión |
| 5a | P-041 | Brd | Elige "Rechazar", escribe el motivo y registra | P-041: vuelve a `Borrador`; el historial muestra el rechazo |
| 5b | P-042 → P-041 | Adm | Corrige, adjunta la garantía y reenvía | `Enviada a la Junta` |
| 6 | P-041 | Brd | Elige "Aprobar" y registra | `Aprobada`; historial con 2 decisiones en orden |
| 7 | P-040 → P-041 | NRO | Abre el expediente | Cotizaciones, PDF, justificación e historial "por la Junta Directiva", sin nombres |

### F9 · Cargar el padrón e invitar a una persona

**Actor:** Administrator · **HU:** HU-001, HU-001B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-050 Padrón | Pulsa "Registrar unidad" | P-051 |
| 2 | P-051 | Elige torre A, escribe `502`, guarda | P-052 de A-502 |
| 3 | P-052 Detalle de unidad | Pulsa "Vincular una persona" | P-053 con la unidad preseleccionada |
| 4 | P-053 | Escribe nombre y correo, elige "Propietario" y la fecha de inicio; guarda | P-054 de Ana |
| 5 | P-054 Ficha | En "Cuenta", elige el rol "Residente" y pulsa "Enviar invitación" | P-054 muestra "Invitación pendiente · vence 08/12/2026 10:00" |
| 6 | P-050 | Busca a una persona por su correo exacto | P-054 de esa persona, o "No hay ninguna persona con ese correo" |

### F10 · Configurar un área común

**Actor:** Administrator · **HU:** HU-004

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-060 Áreas comunes | Pulsa "Nueva área" o "Editar" en una existente | P-061 |
| 2 | P-061 | Define horario, duración máxima, aforo, anticipación máxima y reservas por unidad al mes; guarda | P-060 con aviso de éxito y los valores nuevos |
| 2a | P-061 | Otro usuario guardó antes (`412`) | P-061 con los valores actuales y el aviso de conflicto |

### F11 · Reservar a nombre de una unidad (Administrator)

**Actor:** Administrator · **HU:** HU-006, HU-006B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-062 Reservas del condominio | Pulsa "Reservar a nombre de una unidad" | P-012 en modo Administrator, sin área elegida |
| 2 | P-012 · paso Fecha | Elige "Parrilla" y la fecha 2026-12-19; pulsa "Ver disponibilidad" | La página se recarga con las franjas ocupadas de ese día |
| 3 | P-012 · paso Franja | Elige Torre A y la unidad 1104; en "Anfitrión" elige a Rosa Huamán (vínculo activo con A-1104) | El hint muestra "La unidad usó 3 de 4 reservas de esta área en diciembre." |
| 4 | P-012 | Define la franja y las personas de la unidad, y pulsa "Confirmar reserva" | P-013 con la reserva `Confirmada`; A-1104 llega a 4 de 4 |
| 4a | P-012 | La unidad ya usó su cupo del mes | P-012 con `RESERVATION_MONTHLY_LIMIT_REACHED` en el campo "Unidad" |
| 5 | P-012 (otra reserva) | Elige B-1203 (alquilada) y como anfitrión a su inquilino Pedro Salas | P-013 con la reserva `Confirmada`: el Administrator no está limitado por RN-077 |
| 6 | P-013 | Pulsa "Ver reservas del condominio" | P-062 con la reserva nueva en la lista del día |

### F12 · Editar los invitados después de reservar

**Actor:** Ana (anfitriona de la reserva del salón del 2026-12-12, 19:00–23:00) · **HU:** HU-007

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-014 Mis reservas | Abre "Salón de fiestas · 12/12/2026" | P-015 |
| 2 | P-015 Detalle | A las 18:30 escribe "Pedro Ramos" en "Agregar invitado" y pulsa "Agregar" | P-015 con Pedro Ramos en la lista y "Personas: 31 de 40" |
| 2a | P-015 | La reserva no tenía invitados: es el primero | Antes de agregarlo debe marcar la casilla del aviso de privacidad; sin marcarla ve `GUEST_PRIVACY_NOTICE_REQUIRED` |
| 2b | P-015 | La reserva ya tiene 40 personas | `RESERVATION_EXCEEDS_CAPACITY` en el resumen; la lista no cambia |
| 3 | P-015 | Pulsa "Quitar" en la fila de un invitado | P-015 sin ese invitado y con una persona menos |
| 4 | P-015 | A las 19:10 vuelve a abrir la reserva | Sin formulario de invitados ni botones "Quitar"; texto "La reserva ya empezó: la lista de invitados no se puede cambiar." |
| 4a | P-015 | Envía un formulario abierto antes de las 19:00 (la página quedó abierta) | `RESERVATION_GUEST_EDIT_TOO_LATE` en el resumen |

### F13 · Iniciar sesión como residente (sin MFA)

**Actor:** Carla Díaz (Resident, `Tenant` de A-301) · **HU:** HU-003B, HU-002B

| # | Pantalla | Acción del usuario | Resultado |
|---|---|---|---|
| 1 | P-001 Iniciar sesión | Escribe su correo y su contraseña, y pulsa "Ingresar" | Sin paso de MFA: sigue a P-005 si tiene más de un condominio; si no, a P-010 |
| 2 | P-005 Elegir condominio | Solo si tiene más de un condominio: elige "Residencial Los Olivos" | P-007 si no aceptó la versión vigente; si no, P-010 |
| 3 | P-010 Inicio | Ve sus próximas reservas y "Reservar un área", sin accesos a Gastos ni Contrataciones | — |
| E1 | P-001 | Falla la contraseña 5 veces seguidas | Cada vez ve el mismo mensaje neutro (`SIGN_IN_FAILED`) |
| E2 | P-001 | Durante los 900 s siguientes ingresa la contraseña correcta | Sigue viendo `SIGN_IN_FAILED`: el bloqueo no se revela |
| E3 | P-001 | Ingresa la contraseña correcta después de 900 s | Entra normalmente (paso 1) |
| E4 | Cualquier pantalla | Deja la app sin uso más de 1,800 s y luego pulsa un enlace | P-001 con "Tu sesión se cerró por inactividad. Ingresa de nuevo." y `returnUrl` a la pantalla pedida |
| E5 | Cualquier pantalla | Usa la app sin pausas por más de 43,200 s (12 h) | P-001 con el mismo aviso de sesión vencida |

---

## 3. Screen specs

### 3.0 Patrones compartidos

Estos patrones aplican a todas las pantallas. Cada Screen Spec describe solo lo propio.

#### 3.0.1 Reglas de accesibilidad comunes

| Tema | Regla |
|---|---|
| Estructura | Un solo `<h1>` por página, igual al título de la pestaña: `"{Título} · CondoHub"`. Landmarks `<header>`, `<nav aria-label="Principal">`, `<main id="main">`, `<footer>`. Enlace "Saltar al contenido" como primer elemento enfocable |
| Idioma | `<html lang="es-PE">` |
| Formularios | Cada campo con `<label for>` visible (nunca solo placeholder). Ayuda en `<p id="…-hint">` enlazada con `aria-describedby`. Campos obligatorios marcados con el texto "(obligatorio)", no solo con asterisco |
| Errores | Tras un envío con errores: resumen al inicio del `<main>` (`role="alert"`, `tabindex="-1"`, recibe el foco) con un enlace a cada campo; error junto al campo con `aria-invalid="true"` y `aria-describedby`. Ícono + texto, nunca solo color |
| Avisos de éxito | `role="status"` al inicio del `<main>` después de un Post/Redirect/Get |
| Foco | Anillo visible de 3 px `--color-focus` con separación de 2 px en todo elemento interactivo; nunca `outline: none` sin reemplazo |
| Tamaño | Texto en `rem`; el cuerpo es 1 rem = 16 px. Objetivos táctiles ≥ 44×44 px y separación ≥ 8 px |
| Reflujo | A 320 px CSS (200 % de 640 px) no hay scroll horizontal: las tablas pasan a tarjetas apiladas por debajo de 600 px (§3.0.3) |
| Íconos | SVG en línea con `aria-hidden="true"` si acompañan texto; los botones solo-ícono no existen en el MVP |
| Estados | Las insignias de estado combinan texto + color; el texto basta para entender el estado |
| Tiempo | Fechas en `<time datetime="2026-12-12T19:00:00-05:00">`. Formato visible: `dd/mm/aaaa`, hora `HH:mm` de 24 h, siempre en `America/Lima` |
| Movimiento | Sin animaciones salvo transiciones ≤ 150 ms; se anulan con `prefers-reduced-motion` |

#### 3.0.2 Layout base (`AppShell`)

```text
MÓVIL (< 960 px)                          ESCRITORIO (≥ 960 px)
┌────────────────────────────────┐        ┌────────────┬──────────────────────────────────────┐
│ [Saltar al contenido]          │        │ CondoHub   │ Residencial Los Olivos   [Cerrar sesión]│
│ CondoHub        [☰ Menú]      │        │            ├──────────────────────────────────────┤
│ Residencial Los Olivos         │        │ ▸ Inicio   │ <main>                                │
├────────────────────────────────┤        │ ▸ Reservar │  Migas (solo en niveles ≥ 2)          │
│ <main>                         │        │ ▸ Mis res. │  <h1>                                 │
│  ← Volver (niveles ≥ 2)        │        │ ▸ Gastos   │  [resumen de errores / aviso]         │
│  <h1>Título</h1>               │        │ ▸ Contrat. │  contenido (máx. 72 rem)              │
│  [resumen de errores / aviso]  │        │            │                                       │
│  contenido (ancho completo,    │        │            │                                       │
│  gutter 16 px)                 │        │            │                                       │
├────────────────────────────────┤        └────────────┴──────────────────────────────────────┘
│ footer: "CondoHub" · versión   │          sidebar 16 rem, fondo --color-surface, borde derecho
└────────────────────────────────┘
```

- **Menú en móvil:** `<details class="nav-menu"><summary>"Menú"</summary><nav>…</nav></details>`. Funciona sin JavaScript. El `summary` mide 44×44 px como mínimo.
- **Ítems del menú** según rol (ver [§5](#5-navigation-map)). El ítem activo lleva `aria-current="page"` y una barra izquierda de 4 px `--color-primary`.
- **Cabecera:** nombre del condominio de la sesión (`SelectedCondominiumId`). El MVP no define un cambio de condominio dentro de la sesión: para cambiar, el usuario cierra sesión y elige otro en P-005.
- **"Cerrar sesión"** es un `<form method="post">` con antiforgery (`POST /api/auth/sign-out`), no un enlace.
- **Páginas de acceso (P-001 a P-007):** layout `AuthShell` sin menú: logotipo textual "CondoHub" centrado, tarjeta de 28 rem de ancho máximo.

#### 3.0.3 Componentes

| Componente | Especificación |
|---|---|
| `Button` | Variantes `primary` (fondo `--color-primary`, texto blanco), `secondary` (fondo blanco, borde 1 px `--color-primary`, texto `--color-primary`), `danger` (fondo `--color-danger`, texto blanco), `link` (subrayado). Alto mínimo 48 px, padding horizontal 20 px, radio `--radius-md`. En móvil, los botones principales de un formulario ocupan el 100 % del ancho. Un formulario tiene un solo `primary`. Estado deshabilitado: solo cuando la acción no aplica, con el motivo en texto al lado |
| `FormField` | Label (16 px, peso 600) → hint (16 px, `--color-text-muted`) → input (alto 48 px, borde 1 px `--color-border`, radio `--radius-sm`) → error (16 px, `--color-danger`, ícono ⚠ + texto) |
| `MoneyInput` | Prefijo visible "S/" fuera del input, `inputmode="decimal"`, `pattern="^\d+([.]\d{1,2})?$"`, hint "Hasta 2 decimales. Ejemplo: 1200.50" |
| `DateInput` / `TimeInput` / `MonthInput` | Nativos (`type="date"`, `type="time" step="60"`, `type="month"`) con `min`/`max` del servidor. `step="60"` evita segundos |
| `FileInput` | `<input type="file">` nativo con `accept` y hint de formatos y tamaño (provisional hasta Q28: PDF, JPG o PNG, máx. 10 MB). Tras un error se debe volver a elegir el archivo; el hint lo dice |
| `Alert` | Variantes `info`, `success`, `warning`, `danger`: fondo `--color-*-subtle`, borde izquierdo 4 px `--color-*`, ícono + título en negrita + texto. `role="alert"` solo para errores tras un envío; `role="status"` para éxito |
| `Badge` | Píldora de 28 px de alto, texto 16 px peso 600, fondo `--color-*-subtle`, texto `--color-*`. Mapeo de estados en §3.0.5 |
| `Card` | Fondo `--color-surface`, borde 1 px `--color-border-subtle`, radio `--radius-md`, padding 16 px (24 px en ≥ 600 px). Una tarjeta enlazada es un `<a>` que envuelve el título, no la tarjeta entera |
| `DataTable` | `<table>` con `<caption>` (puede ser visualmente oculta), `<th scope="col">`. Por debajo de 600 px cada fila se muestra como tarjeta: cada celda con su etiqueta (`data-label`) delante del valor. Montos alineados a la derecha con `font-variant-numeric: tabular-nums` |
| `DescriptionList` | `<dl>` en dos columnas (≥ 600 px) o apiladas (móvil) para datos de detalle |
| `EmptyState` | Ícono decorativo + texto en `--color-text-muted` + acción opcional |
| `Pagination` | Enlaces "Anterior" / "Siguiente" + "Página 1 de 3" (`aria-label="Paginación"`). 20 elementos por página (máx. 50, API) |
| `ConfirmPage` | Las acciones destructivas usan una página de confirmación (P-016, P-033), no un `confirm()` de JavaScript ni un modal que dependa de JS |
| `Timeline` | `<ol>` con un ítem por evento: insignia + texto + `<time>`. Orden cronológico ascendente |
| `Stepper` (texto) | En formularios largos, encabezados `<h2>` numerados "1. …", "2. …". No es un asistente de varias páginas |

#### 3.0.4 Estados comunes de una pantalla

| Estado | Comportamiento |
|---|---|
| Cargando | SSR: no hay estado de carga en el cliente. Los envíos de formulario muestran el estado nativo del navegador. 🧩 JS opcional: al enviar, el botón principal pasa a `aria-disabled="true"` con el texto "Enviando…" para evitar dobles envíos (la idempotencia del servidor cubre el caso sin JS) |
| Vacío | `EmptyState` con el texto de `es-PE.resx` de esa lista |
| Error de validación (`422`) | La misma página se vuelve a renderizar con los valores escritos (excepto archivos y contraseñas), el resumen de errores con foco y el error junto al campo |
| Sin permiso (`403`) | P-090 |
| No existe u otro condominio (`404`) | P-091. Nunca se distingue "no existe" de "es de otro condominio" (RN-103) |
| Conflicto (`409`/`412`) | Alert `warning` con "Otra persona cambió estos datos. Revisa la versión actual." y los datos recargados |
| Sesión vencida (RN-113, RN-114) | Redirección a P-001 con `?reason=expired&returnUrl=…` |
| Puertas de sesión | Sin consentimiento vigente → P-007; MFA pendiente → P-002 o P-003 (arquitectura §4.1). La puerta es una **redirección del servidor** (`302`) antes de generar la página: el contenido protegido nunca llega a renderizarse |
| Error inesperado (`500`) | Página "Algo salió mal. Inténtalo de nuevo en unos minutos." con el `traceId` para soporte y enlace a Inicio (P-010). En las páginas de acceso (P-001 a P-007), sin sesión, el enlace va a P-001 |
| Demasiados intentos (`429`) | Alert `danger` con el texto de `AUTH_RATE_LIMITED` (RN-177); si llega `Retry-After`, "Espera {segundos} segundos e inténtalo de nuevo." |

#### 3.0.5 Etiquetas y estados de dominio

| Valor | Texto `es-PE` | Badge |
|---|---|---|
| `Reservation.Confirmed` | "Confirmada" | success |
| `Reservation.Cancelled` | "Cancelada" | danger |
| `Reservation.Completed` (calculado) | "Realizada" | neutral |
| `SupplierHire.Draft` | "Borrador" | neutral |
| `SupplierHire.Submitted` | "Enviada a la Junta" | warning |
| `SupplierHire.Approved` | "Aprobada" | success |
| `HireDecision.Rejected` | "Rechazada por la Junta Directiva" | danger |
| `HireDecision.Approved` | "Aprobada por la Junta Directiva" | success |
| `Expense.Active` | "Vigente" (no se muestra la insignia; solo se muestra la de anulado) | — |
| `Expense.Voided` | "Anulado" | danger |
| `OccupancyType.Owner` | "Propietario" | info |
| `OccupancyType.Tenant` | "Inquilino" | neutral |
| Invitación pendiente | "Invitación pendiente" | warning |
| Invitación vencida | "Invitación vencida" | danger |
| Cuenta activa | "Cuenta activa" | success |
| Sin cuenta | "Sin cuenta" | neutral |
| Rol `Administrator` / `BoardMember` / `Resident` / `NonResidentOwner` / `Concierge` | "Administración" / "Junta Directiva" / "Residente" / "Propietario no residente" / "Portería" | — |
| Categorías ⚠️ Q27 (provisional, del seeder) | `Maintenance` "Mantenimiento" · `Cleaning` "Limpieza" · `Security` "Seguridad" | — |

**Formatos.** Montos: `S/ 1,200.00` (separador de miles coma, decimal punto, siempre 2 decimales, `tabular-nums`). Fechas: `12/12/2026`. Franja: `19:00 – 23:00`. Fecha-hora: `25/11/2026 21:03`. El valor ISO completo va en el atributo `datetime` de `<time>`; los tests E2E de criterios que citan ISO (HU-014) deben leer ese atributo (ver [§6](#6-pendientes-y-decisiones-abiertas)).

#### 3.0.6 Mensajes de error por código

Textos propuestos para `es-PE.resx` (clave `Error_{CODE}`). La UI coloca el error en el campo indicado; si no hay campo, va solo en el resumen.

| Código | Campo | Texto propuesto |
|---|---|---|
| `SIGN_IN_FAILED` | — | "No pudimos iniciar sesión con esos datos. Revisa tu correo, tu contraseña o tu código." |
| `INVITATION_EXPIRED` | — | "Esta invitación venció. Pide una nueva a la administración." |
| `INVITATION_ALREADY_USED` | — | "Esta invitación ya no es válida. Pide una nueva a la administración." (texto de HU-002) |
| `INVITATION_REVOKED` | — | "Esta invitación fue anulada. Pide una nueva a la administración." (cada código de invitación tiene su propio texto: RN-165 reajustada el 2026-11-08) |
| `PASSWORD_LENGTH_INVALID` | Contraseña | "La contraseña debe tener entre 12 y 64 caracteres." |
| `PASSWORD_BREACHED` | Contraseña | "Esta contraseña aparece en filtraciones conocidas. Elige otra." |
| `UNIT_NUMBER_DUPLICATE` | Número | "Esta torre ya tiene una unidad con ese número." |
| `UNIT_NUMBER_INVALID_FORMAT` | Número | "El número de unidad debe tener 3 o 4 dígitos, sin guiones ni letras." |
| `PERSON_REGISTRATION_REJECTED` | — | "No se pudo registrar a la persona con estos datos." (texto de HU-001) |
| `OCCUPANCY_TENANT_NOT_ALLOWED` | Tipo de vínculo / Rol | "Un propietario no residente no puede tener un vínculo de inquilino." |
| `OCCUPANCY_NOT_STARTED` | Rol | "El vínculo de esta persona aún no empieza. Podrás invitarla desde su fecha de inicio." |
| `COMMON_AREA_INVALID_OPENING_HOURS` | Horario | "La hora de cierre debe ser posterior a la de apertura, el mismo día." |
| `COMMON_AREA_INVALID_LIMITS` | Campo afectado | "Ingresa un número entero mayor que 0." |
| `COMMON_AREA_CONFIG_FORBIDDEN` | — | (P-090) |
| `RESERVATION_OUTSIDE_OPENING_HOURS` | Inicio / Fin | "La franja está fuera del horario del área ({apertura} a {cierre})." |
| `RESERVATION_EXCEEDS_MAX_DURATION` | Fin | "La reserva supera la duración máxima del área ({duración})." |
| `RESERVATION_IN_THE_PAST` | Inicio | "La hora de inicio ya pasó." |
| `RESERVATION_TOO_FAR_AHEAD` | Fecha (día posterior al límite) / Inicio (el día límite, después de la hora límite) | "Solo puedes reservar hasta el {fecha límite} a las {hora límite}." (RN-079 por instante; el `max` del `DateInput` es solo una ayuda) |
| `RESERVATION_INVALID_TIME_SLOT` | Fin | "La hora de fin debe ser posterior a la de inicio." |
| `RESERVATION_SLOT_NOT_WHOLE_MINUTES` | Inicio / Fin | "Usa horas en minutos exactos, sin segundos." |
| `RESERVATION_OVERLAP` | Inicio | "El área ya está reservada en ese horario." (texto de la arquitectura §4.1) |
| `RESERVATION_MONTHLY_LIMIT_REACHED` | Unidad | "Tu unidad ya usó sus {n} reservas de esta área en {mes}." |
| `RESERVATION_UNIT_NOT_LINKED` | Unidad | "No tienes un vínculo activo con esta unidad." |
| `RESERVATION_UNIT_RENTED` | Unidad | "Esta unidad está alquilada: la reserva la hace su inquilino." |
| `RESERVATION_HOST_REQUIRED` | Personas de la unidad | "Indica al menos 1 persona de la unidad." |
| `RESERVATION_EXCEEDS_CAPACITY` | Invitados | "Son {total} personas y el aforo es {aforo}. Quita {exceso}." |
| `GUEST_PRIVACY_NOTICE_REQUIRED` | Aviso de privacidad | "Marca la casilla del aviso de privacidad para registrar invitados." |
| `RESERVATION_GUEST_EDIT_TOO_LATE` | — | "La reserva ya empezó: no se puede cambiar la lista de invitados." |
| `RESERVATION_CANCELLATION_TOO_LATE` | — | "La reserva ya empezó y no se puede cancelar." |
| `RESERVATION_ALREADY_CANCELLED` | — | "Esta reserva ya estaba cancelada." |
| `IDEMPOTENCY_KEY_REUSED` | — | "Este formulario ya se usó para otra reserva. Recarga la página e inténtalo de nuevo." (solo si la clave ya creó una reserva: un `4xx` no la consume, RN-163) |
| `GUEST_ALREADY_CHECKED_IN` | — | "Este invitado ya tiene su ingreso marcado." |
| `GUEST_CHECK_IN_NOT_ALLOWED` | — | "Esta reserva ya no está vigente hoy. No se puede marcar el ingreso." |
| `EXPENSE_RECEIPT_REQUIRED` | Comprobante | "Adjunta el comprobante del gasto." |
| `EXPENSE_AMOUNT_NOT_POSITIVE` | Monto | "El monto debe ser mayor que S/ 0.00." |
| `AMOUNT_INVALID_PRECISION` | Monto | "Usa como máximo 2 decimales." |
| `EXPENSE_DATE_OUT_OF_RANGE` | Fecha | "La fecha debe estar entre el {mín} y hoy." |
| `ATTACHMENT_TOO_LARGE` | Archivo | "El archivo supera {n} MB." |
| `ATTACHMENT_TYPE_NOT_ALLOWED` | Archivo | "Solo se aceptan archivos PDF, JPG o PNG." |
| `EXPENSE_IMMUTABLE` | — | "Un gasto registrado no se puede editar ni borrar. Si tiene un error, anúlalo y regístralo de nuevo." |
| `EXPENSE_VOID_REASON_REQUIRED` | Motivo | "Escribe el motivo de la anulación." |
| `EXPENSE_ALREADY_VOIDED` | — | "Este gasto ya estaba anulado." |
| `EXPENSE_HIRE_NOT_APPROVED` | Contratación | "Solo puedes vincular el gasto a una contratación aprobada." |
| `HIRE_INSUFFICIENT_QUOTES` | Cotizaciones | "Agrega cotizaciones de al menos 2 proveedores distintos." |
| `HIRE_JUSTIFICATION_TOO_SHORT` | Justificación | "La justificación debe tener al menos 20 caracteres." |
| `QUOTE_AMOUNT_NOT_POSITIVE` | Monto | "El monto debe ser mayor que S/ 0.00." |
| `HIRE_NOT_EDITABLE` | — | "Esta contratación ya no se puede editar porque está {estado}." |
| `HIRE_NOT_SUBMITTED` | — | "Esta contratación no está pendiente de decisión." |
| `HIRE_REJECTION_REASON_REQUIRED` | Motivo | "Escribe el motivo del rechazo." |
| `PERSONAL_DATA_FORBIDDEN` | — | (P-090) |
| `FIELD_REQUIRED` (RN-172) | Cada campo vacío | "Completa {el campo}." o "Elige {el campo}." según sea texto o lista; p. ej. "Completa la descripción.", "Elige la categoría.", "Completa el nombre del área." |
| `AMOUNT_INVALID_FORMAT` (RN-173) | Monto | "Escribe el monto con números y punto decimal. Ejemplo: 1200.50" |
| `VENDOR_RUC_INVALID_FORMAT` (RN-169) | RUC | "El RUC tiene 11 dígitos y empieza con 10 (persona natural) o 20 (empresa)." |
| `VENDOR_RUC_DUPLICATE` (RN-169) | RUC | "Ya hay un proveedor registrado con este RUC." |
| `TOWER_CODE_DUPLICATE` (RN-170) | Código de torre | "Este condominio ya tiene una torre con ese código." |
| `COMMON_AREA_NAME_DUPLICATE` (RN-171) | Nombre | "Ya hay un área común con ese nombre." |
| `OCCUPANCY_END_BEFORE_START` (RN-174) | Hasta | "La fecha de fin debe ser igual o posterior a la de inicio." |
| `OCCUPANCY_NOT_ACTIVE` (RN-175) | Rol | "Esta persona no tiene un vínculo vigente. Registra uno en el padrón antes de invitarla." |
| `OCCUPANCY_OVERLAP` (RN-176) | Desde / Hasta | "La persona ya tiene un vínculo con esta unidad en esas fechas." |
| `AUTH_RATE_LIMITED` (RN-177, `429`) | — | "Demasiados intentos. Espera un minuto y vuelve a intentarlo." (con `Retry-After`; ver §3.0.4) |
| `RESERVATION_HOST_NOT_SELECTED` (RN-178) | Anfitrión | "Elige al anfitrión de la reserva." |
| `RESERVATION_HOST_NOT_LINKED` (RN-178) | Anfitrión | "El anfitrión debe tener un vínculo vigente con la unidad elegida." |
| `HIRE_DECISION_CONFLICT` (RN-179, `409`) | — | "Otro miembro de la Junta ya decidió esta contratación. Revisa la decisión registrada." |

---

### 3.1 Acceso

#### P-001 · Iniciar sesión

| Campo | Detalle |
|---|---|
| **Propósito** | Primer paso del inicio de sesión para todos los roles |
| **Actor** | Todos |
| **HU** | HU-003, HU-003B |
| **Ruta** | `/sign-in?returnUrl=&reason=expired` |
| **Datos que muestra** | Aviso de sesión vencida si `reason=expired` |
| **Acciones** | Ingresar (`POST /api/auth/sign-in`) |
| **Reglas** | RN-111 y RN-153 (mismo mensaje ante correo inexistente, contraseña incorrecta o cuenta bloqueada); RN-113 y RN-114 (expiración); RN-177 (rate limit de 10/min por IP y por correo: `429` con `AUTH_RATE_LIMITED`) |

```text
AuthShell
┌──────────────────────────────────────┐
│              CondoHub                │  logotipo textual, h-size 2xl, color primary
│                                      │
│  ┌────────────────────────────────┐  │  Card (máx. 28 rem)
│  │ <h1>"Iniciar sesión"</h1>      │  │
│  │                                │  │
│  │ [Alert info, solo si           │  │  reason=expired:
│  │  reason=expired]               │  │  "Tu sesión se cerró por inactividad.
│  │                                │  │   Ingresa de nuevo."
│  │ [Alert danger: resumen error]  │  │  SIGN_IN_FAILED o 429
│  │                                │  │
│  │ "Correo electrónico"           │  │  input type=email, autocomplete=username,
│  │ [____________________________] │  │  required, autocapitalize=off
│  │                                │  │
│  │ "Contraseña"                   │  │  input type=password,
│  │ [____________________________] │  │  autocomplete=current-password
│  │                                │  │
│  │ [        Ingresar           ]  │  │  Button primary, ancho 100 %
│  │                                │  │
│  │ "¿No puedes ingresar? Comuní-  │  │  texto muted (sin enlace de recuperación:
│  │  cate con la administración."  │  │  ADR-0020)
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Estados:**
- **Inicial:** campos vacíos; foco en "Correo electrónico".
- **Error `SIGN_IN_FAILED`:** el correo se conserva, la contraseña se borra, resumen con foco. No hay error por campo (para no revelar cuál falló).
- **`429` (`AUTH_RATE_LIMITED`, RN-177):** alert con el texto de §3.0.6 y los segundos de `Retry-After`; el correo se conserva.
- **Éxito:** redirige según `nextStep`: `MfaEnrollmentRequired` → P-003, `MfaRequired` → P-002, `CondominiumSelectionRequired` → P-005, `ConsentRequired` → P-007, `SignedIn` → `returnUrl` o P-010 (P-020 para Concierge).
- **`returnUrl`** (validación de prototipos, docs/validation/registro-revision-prototipos.md VL-P001, obs. 5): P-002, P-003, P-004, P-005 y P-007 lo reciben y lo propagan sin cambios hasta que `nextStep` es `SignedIn`, y también al volver a P-001 (sesión parcial vencida, rechazo del consentimiento). Se conserva la ruta completa con sus identificadores (p. ej. `/reservations/r-8841`, `/invitations/{token}` de RN-122). Solo se acepta una ruta relativa del mismo origen: empieza con `/` y no con `//` ni `/\`. Una URL absoluta o una ruta de las pantallas de acceso se ignora y el destino es P-010 (P-020 para Concierge).

---

#### P-002 · Verificar código MFA

| Campo | Detalle |
|---|---|
| **Propósito** | Segundo factor para quien tiene Administrator o BoardMember en cualquier condominio |
| **Actor** | Administrator, BoardMember |
| **HU** | HU-003, HU-003B |
| **Ruta** | `/sign-in/mfa` y `/sign-in/mfa?method=recovery` |
| **Datos** | Ninguno de la cuenta (la sesión es parcial) |
| **Acciones** | Verificar código TOTP; usar un código de recuperación (`POST /api/auth/mfa`); volver a P-001 |
| **Reglas** | RN-008, RN-140 (TOTP también si en este condominio solo es Resident), RN-112 (códigos de un solo uso), RN-111 (los fallos de TOTP suman al bloqueo), RN-177 (`429` con `AUTH_RATE_LIMITED`) |

```text
AuthShell · Card
┌────────────────────────────────────┐
│ <h1>"Verificación en dos pasos"</h1>│
│ "Abre tu app autenticadora y       │
│  escribe el código de 6 dígitos."  │
│                                    │
│ [Alert danger: SIGN_IN_FAILED]     │
│                                    │
│ "Código de verificación"           │  input type=text, inputmode=numeric,
│ [ _ _ _ _ _ _ ]                    │  autocomplete=one-time-code, maxlength=6,
│                                    │  pattern=\d{6}, ancho 12 rem, letra 1.5 rem,
│                                    │  letter-spacing 0.25em, monoespaciada
│ [         Verificar          ]     │  Button primary
│                                    │
│ "¿No tienes tu celular?"           │
│ Usar un código de recuperación →   │  enlace a ?method=recovery
│ ← Volver a iniciar sesión          │  enlace a P-001
└────────────────────────────────────┘

Variante ?method=recovery:
  h1 "Usar un código de recuperación"
  label "Código de recuperación"  hint "Ejemplo: 7KQ2-M9XD. Cada código sirve una sola vez."
  input type=text, autocomplete=off, autocapitalize=characters, maxlength=9
  enlace "Usar el código de la app autenticadora"
```

**Estados:** error con el mismo texto neutro que P-001; el campo se vacía. `429` (`AUTH_RATE_LIMITED`, RN-177): alert con el texto de §3.0.6. Si la sesión parcial venció, vuelve a P-001 con `reason=expired` y el mismo `returnUrl`. Éxito según `nextStep`: P-005, P-007 o, con `SignedIn`, `returnUrl` o P-010 (ver P-001, `returnUrl`).

---

#### P-003 · Configurar la app autenticadora

| Campo | Detalle |
|---|---|
| **Propósito** | Enrolar el TOTP antes de crear la primera sesión |
| **Actor** | Administrator, BoardMember sin TOTP |
| **HU** | HU-003 |
| **Ruta** | `/sign-in/mfa/enroll` |
| **Datos** | Código QR del secreto TOTP y el mismo secreto en texto, agrupado de 4 en 4 |
| **Acciones** | Confirmar con el primer código (`POST /api/auth/mfa/enroll`) |
| **Reglas** | RN-008 (MFA obligatorio), PRINCIPIO-005 |

```text
AuthShell · Card (máx. 32 rem)
┌──────────────────────────────────────┐
│ <h1>"Protege tu cuenta"</h1>         │
│ "Tu rol exige un segundo paso al     │
│  iniciar sesión."                    │
│                                      │
│ <h2>"1. Instala una app              │
│      autenticadora"</h2>             │
│ "Por ejemplo, Microsoft Authenticator│
│  o Google Authenticator."            │
│                                      │
│ <h2>"2. Agrega CondoHub"</h2>        │
│  ┌────────────┐                      │  <img> QR 200×200 px, fondo blanco,
│  │  ▓▓ QR ▓▓  │                      │  alt="Código QR para agregar CondoHub
│  └────────────┘                      │  a tu app autenticadora"
│ "¿No puedes escanear? Escribe esta   │
│  clave en la app:"                   │
│  ABCD EFGH IJKL MNOP                 │  <code>, monoespaciada 1.25 rem,
│                                      │  seleccionable
│ <h2>"3. Escribe el código"</h2>      │
│ "Código de 6 dígitos"                │
│ [ _ _ _ _ _ _ ]                      │  mismo input que P-002
│ [      Activar verificación    ]     │  Button primary
└──────────────────────────────────────┘
```

**Estados:** código incorrecto → error en el campo, el QR y la clave se mantienen. Éxito → P-004, con el mismo `returnUrl`.
**Nota:** generar el QR en el servidor requiere una librería que aún no está aprobada (PRINCIPIO-009.4). Si no se aprueba, la pantalla funciona solo con la clave en texto.

---

#### P-004 · Códigos de recuperación

| Campo | Detalle |
|---|---|
| **Propósito** | Mostrar una sola vez los 10 códigos de recuperación |
| **Actor** | Administrator, BoardMember recién enrolado |
| **HU** | HU-003 |
| **Ruta** | `/sign-in/mfa/recovery-codes` (solo accesible justo después de P-003) |
| **Datos** | 10 códigos de un solo uso |
| **Acciones** | Confirmar que los guardó y continuar |
| **Reglas** | RN-112; los códigos no se vuelven a mostrar (la regeneración RN-141 está diferida, ADR-0020) |

```text
AuthShell · Card
┌──────────────────────────────────────┐
│ <h1>"Guarda tus códigos de           │
│      recuperación"</h1>              │
│ [Alert warning]                      │
│  "Solo los verás esta vez. Cada      │
│   código sirve una vez si pierdes tu │
│   celular. Guárdalos en un lugar     │
│   seguro, fuera de este equipo."     │
│                                      │
│  <ol> en 2 columnas (1 en < 360 px)  │  monoespaciada 1.25 rem, line-height 2
│   1. 7KQ2-M9XD    6. ....            │
│   2. ....         7. ....            │
│   ...                                │
│                                      │
│ [Imprimir]  🧩 JS opcional           │  Button secondary, window.print();
│                                      │  oculto sin JS
│ [☐] "Guardé mis códigos en un lugar  │  checkbox required
│      seguro"                         │
│ [          Continuar           ]     │  Button primary
└──────────────────────────────────────┘
```

**Estados:** sin marcar la casilla → error en la casilla "Confirma que guardaste tus códigos.". Si el usuario recarga la página, ya no ve los códigos: ve el mensaje "Los códigos ya se mostraron." y el botón "Continuar". La página se sirve con `Cache-Control: no-store`. Éxito según `nextStep`: P-005, P-007 o, con `SignedIn`, `returnUrl` o P-010 (ver P-001, `returnUrl`).

---

#### P-005 · Elegir condominio

| Campo | Detalle |
|---|---|
| **Propósito** | Elegir el condominio de la sesión cuando el usuario tiene vínculos o roles en más de uno |
| **Actor** | Usuario con más de un condominio |
| **HU** | HU-003 (nota RN-064), HU-002B (consentimiento por condominio) |
| **Ruta** | `/sign-in/condominium` |
| **Datos** | Lista de condominios (`id`, `name`) que devuelve `sign-in` |
| **Acciones** | Continuar con el condominio elegido (`POST /api/auth/condominium`) |
| **Reglas** | RN-064; después del TOTP y antes de crear la sesión |

```text
AuthShell · Card
┌──────────────────────────────────────┐
│ <h1>"¿A qué condominio quieres       │
│      entrar?"</h1>                   │
│ <fieldset> <legend class=sr-only>    │
│  ( ) Residencial Los Olivos          │  radio, fila completa clicable,
│  ( ) Torres del Parque               │  alto ≥ 56 px, borde --color-border,
│                                      │  seleccionado: borde 2 px primary
│ [          Continuar           ]     │
└──────────────────────────────────────┘
```

**Estados:** sin elección → error "Elige un condominio.". Si es el único condominio, la pantalla no se muestra. Éxito: P-007 si falta el consentimiento vigente de ese condominio; si no, `returnUrl` o P-010 (ver P-001, `returnUrl`).

---

#### P-006 · Activar cuenta por invitación

| Campo | Detalle |
|---|---|
| **Propósito** | Crear la cuenta desde el enlace de invitación |
| **Actor** | Persona invitada como Resident, NonResidentOwner o Concierge |
| **HU** | HU-002 |
| **Ruta** | `/invitations/{token}` |
| **Datos** | Nombre del condominio, rol con el que se invita, correo de la invitación (solo lectura) |
| **Acciones** | Crear cuenta (`POST /api/invitations/{token}/accept`); iniciar sesión si el correo ya tiene cuenta |
| **Reglas** | RN-007, RN-110 (vence a los 604,800 s), RN-116 (12–64 caracteres, sin reglas de composición), RN-117 (lista local de filtradas), RN-122 (cuenta existente), RN-139 (anulada), RN-165 (un solo uso). El `POST /api/invitations/{token}/accept` vuelve a validar RN-110, RN-139 y RN-165 aunque el `GET` haya mostrado el formulario: si la invitación venció, se anuló o se usó mientras la página estaba abierta, responde con su código y la página pasa al estado "Invitación no válida" |

```text
AuthShell · Card
┌──────────────────────────────────────┐
│ <h1>"Crea tu cuenta"</h1>            │
│ "Te invitaron a Residencial Los      │
│  Olivos como Residente."             │
│                                      │
│ <dl>                                 │
│  "Correo"  ana.quispe@example.pe     │  solo lectura
│ </dl>                                │
│                                      │
│ "Contraseña"                         │  input type=password,
│ [____________________________]       │  autocomplete=new-password,
│ "Entre 12 y 64 caracteres. Puedes    │  minlength=12, maxlength=64
│  usar una frase, por ejemplo: mi     │  hint
│  edificio tiene piscina"             │
│                                      │
│ [        Crear mi cuenta        ]    │  Button primary
└──────────────────────────────────────┘
```

**Estados:**
- **Contraseña rechazada** (`PASSWORD_LENGTH_INVALID`, `PASSWORD_BREACHED`): error en el campo, campo vacío.
- **Invitación no válida** (`INVITATION_EXPIRED`, `INVITATION_ALREADY_USED`, `INVITATION_REVOKED`): `<h1>` "Esta invitación no es válida"; la página no muestra el formulario; muestra un `Alert danger` con el texto del código y el enlace "Ir a iniciar sesión".
- **Correo con cuenta existente (RN-122):** `<h1>` "Ya tienes una cuenta"; sin formulario; `Alert info` "Ya tienes una cuenta en CondoHub con este correo. Inicia sesión para aceptar la invitación." + Button primary "Iniciar sesión" → P-001 con `returnUrl=/invitations/{token}`.
- **Éxito:** P-007.

---

#### P-007 · Consentimiento informado

| Campo | Detalle |
|---|---|
| **Propósito** | Recoger el consentimiento informado, incluida la transferencia internacional, antes de usar el condominio |
| **Actor** | Todos, la primera vez en cada condominio y cuando se publica una versión nueva |
| **HU** | HU-002B |
| **Ruta** | `/consent` (toda otra ruta redirige aquí mientras falte la aceptación) |
| **Datos** | Versión (`2026-11-01.v1`), nombre del condominio, texto del consentimiento (`ConsentVersion.TextResourceKey`) |
| **Acciones** | Acepto / No acepto (`POST /api/consents/current/decision`) |
| **Reglas** | RN-010 ⚠️ Q18 ⚠️ Q32, RN-011, RN-012, RN-070, RN-071 (versión nueva y consentimiento por condominio); PRINCIPIO-004.1 |

```text
AuthShell · contenido de lectura (máx. 40 rem, no Card estrecha)
┌──────────────────────────────────────────┐
│ <h1>"Antes de empezar: tus datos"</h1>   │
│ "Residencial Los Olivos · versión        │  texto muted
│  2026-11-01.v1"                          │
│                                          │
│ <h2>"Quién trata tus datos"</h2>  ⚠️ Q18 │  texto continuo, line-height 1.6,
│ <p>…</p>                                 │  sin caja con scroll propio
│ <h2>"Para qué los usamos"</h2>           │
│ <p>…</p>                                 │
│ <h2>"Qué datos guardamos"</h2>           │
│ <p>…</p>                                 │
│ ┌──────────────────────────────────────┐ │  Alert info destacado (no se puede
│ │ <h2>"Tus datos se guardan en         │ │  omitir: criterio de HU-002B)
│ │  Estados Unidos"</h2>                │ │
│ │ "CondoHub guarda tus datos en        │ │
│ │  Microsoft Azure, región South       │ │
│ │  Central US (Estados Unidos)…"       │ │
│ └──────────────────────────────────────┘ │
│ <h2>"Cuánto tiempo los guardamos"</h2>   │
│ <p>… 90 días … archivo … 1 año</p>       │
│ <h2>"Tus derechos"</h2>                  │
│ <p>…</p>                                 │
│                                          │
│ [            Acepto              ]       │  Button primary  (name=decision value=Accepted)
│ [          No acepto             ]       │  Button secondary (name=decision value=Rejected)
└──────────────────────────────────────────┘
  Los dos botones están en el mismo <form>; en ≥ 600 px van en fila,
  "Acepto" a la derecha.
```

**Estados:**
- **Versión nueva (RN-071):** encima del `h1`, `Alert info` "Actualizamos este texto. Léelo y acéptalo para seguir usando CondoHub.".
- **Rechazo:** página con `h1` "No aceptaste el consentimiento", texto "Sin tu aceptación no puedes usar CondoHub en {condominio}. Puedes aceptarlo cuando vuelvas a iniciar sesión." y Button primary "Volver a iniciar sesión". La sesión se cierra.
- **Éxito:** `returnUrl` o P-010 (P-020 para Concierge), con la validación de `returnUrl` de P-001.

---

### 3.2 Inicio

#### P-010 · Inicio

| Campo | Detalle |
|---|---|
| **Propósito** | Punto de entrada por rol: avisos pendientes y accesos directos |
| **Actor** | Administrator, BoardMember, Resident, NonResidentOwner (el Concierge va directo a P-020) |
| **HU** | HU-008 (aviso de cancelación), HU-013 (contador de la Junta) |
| **Ruta** | `/` |
| **Datos** | Avisos no vistos (`GET /api/me/notices`); `pendingHireDecisions` 🔒 BoardMember; próximas reservas de la unidad (máx. 3) 🔒 quien reserva |
| **Acciones** | "Entendido" en cada aviso (`POST /api/me/notices/{id}/seen`); accesos directos |
| **Reglas** | RN-088 (aviso solo si cancela otra persona), RN-099 (contador, también con 0), RN-015 (accesos financieros solo con `canViewFinancials`) |

```text
AppShell
┌──────────────────────────────────────────┐
│ <h1>"Hola, Ana"</h1>                     │  nombre de la sesión
│                                          │
│ ── Avisos (solo si hay) ──────────────── │  <section aria-labelledby>
│ ┌──────────────────────────────────────┐ │  Alert warning, uno por aviso
│ │ ⚠ "La administración canceló tu      │ │
│ │    reserva"                          │ │
│ │ "Salón de fiestas · 12/12/2026 ·     │ │
│ │  19:00 – 23:00"                      │ │
│ │ [Entendido]                          │ │  Button secondary (form POST)
│ └──────────────────────────────────────┘ │
│                                          │
│ ── 🔒 BoardMember ────────────────────── │
│ ┌──────────────────────────────────────┐ │  Card, borde izquierdo 4 px accent
│ │ "1 contratación por decidir"         │ │  texto 1.5 rem peso 700;
│ │ [Revisar contrataciones →]           │ │  "0 contrataciones por decidir"
│ └──────────────────────────────────────┘ │  sin botón primario cuando es 0
│                                          │
│ ── 🔒 Resident / NRO ─────────────────── │
│ <h2>"Tus próximas reservas"</h2>         │
│  • Salón de fiestas · 12/12 · 19:00–23:00│  lista de enlaces a P-015
│    [Confirmada]                          │
│  EmptyState: "No tienes reservas         │
│   próximas."                             │
│ [ Reservar un área ]                     │  Button primary → P-011
│                                          │
│ ── 🔒 Administrator ──────────────────── │  en lugar del bloque anterior
│ <h2>"Reservas de hoy"</h2>               │  (el Administrator no reserva
│ "3 reservas confirmadas"                 │  desde P-011, sino desde P-062)
│ [ Ver reservas del condominio ]          │  Button primary → P-062?date=hoy
│                                          │
│ ── Accesos ───────────────────────────── │  grid de Cards enlazadas:
│ ┌─────────────┐ ┌─────────────┐          │  1 col < 600 px, 2 col ≥ 600 px,
│ │ Gastos del  │ │ Contratacio-│          │  3 col ≥ 960 px
│ │ condominio  │ │ nes         │          │  🔒 canViewFinancials
│ └─────────────┘ └─────────────┘          │
│ ┌─────────────┐ ┌─────────────┐          │  🔒 Administrator:
│ │ Padrón      │ │ Áreas       │          │  Padrón, Áreas comunes,
│ └─────────────┘ └─────────────┘          │  Registrar gasto
│                                          │  (Reservas del condominio ya
│                                          │  está en su bloque)
└──────────────────────────────────────────┘
```

**Estados:**
- **Inquilino:** no ve accesos financieros (ni deshabilitados).
- **Administrator:** ve "Reservas de hoy" con el enlace a P-062, no "Tus próximas reservas" ni "Reservar un área" (coherente con el menú de §5). Si además tiene un vínculo como residente, ve también el bloque de residente (unión de roles).
- **Administrator sin reservas hoy:** "No hay reservas confirmadas para hoy." y el mismo botón.
- **BoardMember sin vínculo:** ve el contador y los accesos financieros, no "Reservar" (B2/B3 ⛔).
- **Avisos:** se muestran hasta que el usuario pulsa "Entendido" (ver [§6](#6-pendientes-y-decisiones-abiertas), punto 4).

---

### 3.3 Reservas

#### P-011 · Áreas comunes

| Campo | Detalle |
|---|---|
| **Propósito** | Elegir el área a reservar conociendo sus reglas |
| **Actor** | Resident (Owner o Tenant), NonResidentOwner |
| **HU** | HU-005 |
| **Ruta** | `/common-areas` |
| **Datos** | Por área (`GET /api/common-areas`): nombre, horario, duración máxima, aforo, anticipación máxima, reservas por unidad al mes |
| **Acciones** | "Reservar" → P-012 con `areaId` |
| **Reglas** | RN-019 (reserva con las reglas configuradas del área), RN-021, RN-022, RN-023, RN-079, RN-080 (valores que se muestran por área) |

```text
AppShell
┌──────────────────────────────────────────┐
│ <h1>"Reservar un área común"</h1>        │
│                                          │
│ ┌──────────────────────────────────────┐ │  Card por área
│ │ <h2>"Salón de fiestas"</h2>          │ │
│ │ <dl> (2 columnas en ≥ 600 px)        │ │
│ │  "Horario"        09:00 – 23:00      │ │
│ │  "Máximo"         5 horas            │ │  segundos → "5 horas", "4 h 30 min"
│ │  "Aforo"          40 personas        │ │
│ │  "Reserva con"    hasta 90 días de   │ │
│ │                   anticipación       │ │
│ │  "Por unidad"     2 reservas al mes  │ │
│ │ </dl>                                │ │
│ │ [ Reservar el Salón de fiestas ]     │ │  Button primary; el nombre del área va
│ └──────────────────────────────────────┘ │  en el texto del botón (enlace único)
│ ┌──────────────────────────────────────┐ │
│ │ <h2>"Parrilla"</h2> …                │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

**Estados:** sin áreas → `EmptyState` "La administración aún no configuró áreas comunes.".

---

#### P-012 · Nueva reserva

| Campo | Detalle |
|---|---|
| **Propósito** | Reservar una franja y registrar a los invitados **en un solo envío** (K4 = 1) |
| **Actor** | Resident, NonResidentOwner; Administrator a nombre de una unidad |
| **HU** | HU-005, HU-006, HU-006B, HU-007 |
| **Ruta** | `/reservations/new?areaId=&date=` |
| **Datos** | Área elegida y sus reglas; franjas ocupadas del día (`GET /api/common-areas/{id}/availability?date=`); unidades permitidas; cupo usado por la unidad en el mes; aviso de privacidad de invitados ⚠️ Q18 ⚠️ Q21 |
| **Acciones** | "Ver disponibilidad" (GET, recarga la página); "Confirmar reserva" (`POST /api/reservations` con `Idempotency-Key`) |
| **Reglas** | RN-019 (confirmación automática), RN-021, RN-022, RN-079 (horario, duración, anticipación, minutos enteros, `[inicio, fin)`), RN-023 (aforo = personas de la unidad + invitados), RN-024/RN-081 (cruce), RN-080 (cupo mensual; las canceladas no cuentan), RN-025/RN-075/RN-077 (unidad permitida; unidad alquilada), RN-076 y RN-178 (Administrator: anfitrión obligatorio y con vínculo vigente con la unidad, `RESERVATION_HOST_NOT_SELECTED` y `RESERVATION_HOST_NOT_LINKED` en "Anfitrión"), RN-086/RN-087 (invitados y aviso de privacidad), RN-163 (idempotencia) |

```text
AppShell (contenido máx. 40 rem)
┌──────────────────────────────────────────┐
│ ← Áreas comunes                          │
│ <h1>"Reservar Salón de fiestas"</h1>     │
│ "Horario 09:00 – 23:00 · máx. 5 h ·      │  resumen de reglas, texto muted
│  aforo 40"                               │
│ [Resumen de errores, si los hay]         │
│                                          │
│ <form method=get>  ── 1. Fecha ───────── │  formulario GET separado
│ <h2>"1. Elige la fecha"</h2>             │
│ "Fecha"                                  │  DateInput, min=hoy,
│ [ 12/12/2026 ]  [Ver disponibilidad]     │  max=hoy+anticipación;
│                                          │  Button secondary
│ <h3>"Ocupado ese día"</h3>               │
│  • 14:00 – 17:00                         │  <ul> de franjas Confirmadas, sin
│  • 18:00 – 22:00                         │  unidad ni nombre (privacidad)
│  EmptyState: "Libre todo el día"         │
│  (horario 09:00 – 23:00)                 │
│ </form>                                  │
│                                          │
│ <form method=post>                       │  formulario principal
│ <input hidden IdempotencyKey=UUIDv7>     │  generado al renderizar (ADR-0014)
│ <input hidden areaId, date>              │
│                                          │
│ <h2>"2. Elige la franja"</h2>            │
│ "Unidad"                     🔸          │  select solo si hay > 1 unidad;
│ [ A-502 ▾ ]                              │  con 1, texto fijo "Unidad A-502"
│ "Tu unidad usó 1 de 2 reservas de esta   │  hint dinámico (servidor)
│  área en diciembre."                     │
│                                          │
│ ┌ 🔒 Administrator ───────────────────┐  │
│ │ "Unidad" [ Torre A ▾ ][ 502 ▾ ]     │  │  cualquier unidad (RN-076)
│ │ "Anfitrión" [ Ana Quispe ▾ ]        │  │  personas con vínculo activo
│ └─────────────────────────────────────┘  │  con la unidad
│                                          │
│ "Desde"            "Hasta"               │  TimeInput step=60, min=apertura,
│ [ 19:00 ]          [ 23:00 ]             │  max=cierre; en fila ≥ 360 px
│ "Máximo 5 horas. Termina a las 23:00     │  hint
│  como muy tarde."                        │
│                                          │
│ <h2>"3. ¿Quiénes asisten?"</h2>          │
│ "Personas de tu unidad (contándote)"     │  input type=number, min=1,
│ [ 2 ]                                    │  max=aforo, inputmode=numeric
│                                          │
│ "Invitados (opcional)"                   │  <textarea rows=6>
│ ┌──────────────────────────────────────┐ │  hint: "Escribe un nombre completo por
│ │Pedro Ramos                           │ │  línea. Portería los verá para dejarlos
│ │Lucía Torres                          │ │  pasar."
│ └──────────────────────────────────────┘ │
│ "Total: 4 de 40 personas"  🧩 JS opc.    │  contador aria-live=polite; sin JS el
│                                          │  servidor valida y muestra el error
│ ┌ Aviso de privacidad de invitados ────┐ │  Alert info (texto ⚠️ Q18 ⚠️ Q21)
│ │ "Los nombres de tus invitados solo   │ │
│ │  se usan para que portería los deje  │ │
│ │  pasar y se eliminan 90 días después │ │
│ │  de la reserva…"                     │ │
│ │ [☐] "Informé a mis invitados de este │ │  checkbox; obligatorio si hay
│ │      aviso"                          │ │  invitados (GUEST_PRIVACY_NOTICE_
│ └──────────────────────────────────────┘ │  REQUIRED)
│                                          │
│ [        Confirmar reserva         ]     │  Button primary, ancho 100 %
│ "La reserva se confirma al instante si   │  texto muted
│  cumple las reglas del área."            │
│ </form>                                  │
└──────────────────────────────────────────┘
```

**Estados:**
- **Inicial:** fecha = `date` o hoy; disponibilidad del día; la franja vacía.
- **Sin unidades permitidas** (todas alquiladas o sin vínculo activo): sin formulario; `Alert info` "No tienes una unidad con la que puedas reservar. Si tu unidad está alquilada, la reserva la hace su inquilino.".
- **Cupo agotado:** el hint de la unidad pasa a `warning`: "Tu unidad ya usó sus 2 reservas de esta área en diciembre." El formulario sigue disponible para otro mes.
- **Error `422` / `403`:** la página se vuelve a mostrar con los valores escritos, incluidos los invitados y la casilla, y **la misma** clave de idempotencia; el error va en el campo de §3.0.6. En `RESERVATION_OVERLAP`, la lista "Ocupado ese día" se actualiza.
- **Modo Administrator sin anfitrión o con un anfitrión sin vínculo vigente** (RN-178): error en "Anfitrión" con `RESERVATION_HOST_NOT_SELECTED` o `RESERVATION_HOST_NOT_LINKED`; la lista de anfitriones se recalcula para la unidad elegida.
- **Éxito (`201`, también si es reenvío):** Post/Redirect/Get a P-013.
- **Concierge o BoardMember sin vínculo:** P-090.

---

#### P-013 · Reserva confirmada

| Campo | Detalle |
|---|---|
| **Propósito** | Confirmar en el mismo envío que la reserva quedó `Confirmada` |
| **Actor** | Quien reservó |
| **HU** | HU-005, HU-007 |
| **Ruta** | `/reservations/{id}/confirmed` |
| **Datos** | Área, unidad, fecha, franja, personas de la unidad, invitados (cantidad), total de personas |
| **Acciones** | "Ver mi reserva" → P-015; "Volver al inicio" |
| **Reglas** | RN-019 |

```text
AppShell (máx. 40 rem)
┌──────────────────────────────────────────┐
│        ✓ (ícono 48 px, success)          │  aria-hidden
│ <h1>"¡Reserva confirmada!"</h1>          │
│ [Confirmada]                             │  Badge success
│ ┌──────────────────────────────────────┐ │  Card
│ │ <dl>                                 │ │
│ │  "Área"      Salón de fiestas        │ │
│ │  "Unidad"    A-502                   │ │
│ │  "Fecha"     sábado 12/12/2026       │ │
│ │  "Horario"   19:00 – 23:00           │ │
│ │  "Personas"  4 (2 de tu unidad y 2   │ │
│ │              invitados)              │ │
│ │ </dl>                                │ │
│ └──────────────────────────────────────┘ │
│ "Portería verá a tus invitados el día de │
│  la reserva. Puedes cambiar la lista     │
│  hasta antes de las 19:00."              │
│ [       Ver mi reserva        ]          │  Button primary
│ [      Volver al inicio       ]          │  Button secondary
└──────────────────────────────────────────┘
```

**Estados:**
- **Sin invitados:** la fila "Personas" dice "1 (de tu unidad)" o "2 (de tu unidad)"; el párrafo de portería cambia a "No registraste invitados. Puedes agregarlos hasta antes de las 19:00." con el enlace "Agregar invitados" → P-015.
- **Reenvío idempotente** (la red se cortó y el navegador reenvió, `Idempotency-Replayed: true`): la pantalla es idéntica y **no** dice "ya existía". Se agrega solo un texto muted bajo el `h1`: "Si enviaste el formulario más de una vez, se guardó una sola reserva.".
- **Hecha por el Administrator (F11):** `h1` "Reserva confirmada para A-1104"; la `<dl>` agrega "Anfitrión: Rosa Huamán"; el párrafo cambia a "La unidad verá esta reserva en Mis reservas."; los botones son "Ver reservas del condominio" (primary → P-062) y "Reservar otra" (secondary → P-012).
- **Reserva cancelada después** (se abre el enlace más tarde): redirige a P-015, que muestra el estado `Cancelada`; P-013 nunca muestra "¡Reserva confirmada!" para una reserva que ya no lo está.
- **Reserva de otra unidad:** P-090 (`403`). **De otro condominio o inexistente:** P-091 (`404`).
- **Recarga de la página:** muestra lo mismo (es un `GET`); no crea otra reserva.

---

#### P-014 · Mis reservas

| Campo | Detalle |
|---|---|
| **Propósito** | Ver las reservas de las unidades del usuario y su historial |
| **Actor** | Resident, NonResidentOwner |
| **HU** | HU-008 |
| **Ruta** | `/reservations?view=upcoming\|history&page=` |
| **Datos** | `GET /api/reservations`: área, unidad, fecha, franja, estado, total de personas |
| **Acciones** | Abrir detalle (P-015); "Reservar un área" (P-011) |
| **Reglas** | RN-084 (las canceladas siguen visibles con quién y cuándo canceló), RN-085 (`Realizada` calculada al consultar) |

```text
AppShell
┌──────────────────────────────────────────┐
│ <h1>"Mis reservas"</h1>   [Reservar]     │  Button primary pequeño (≥ 44 px)
│ [Alert success: "Cancelaste tu reserva"] │  tras P-016
│                                          │
│ ( Próximas )( Historial )                │  2 enlaces tipo pestaña
│                                          │  (aria-current="page"), no JS
│ <ul>                                     │
│ ┌──────────────────────────────────────┐ │  Card enlazada por reserva
│ │ Salón de fiestas        [Confirmada] │ │
│ │ sáb. 12/12/2026 · 19:00 – 23:00      │ │
│ │ A-502 · 4 personas                   │ │
│ │ Ver detalle →                        │ │  enlace con texto
│ └──────────────────────────────────────┘ │  "Ver detalle de Salón de fiestas
│ ┌──────────────────────────────────────┐ │  12/12/2026" (sr-only)
│ │ Parrilla                 [Cancelada] │ │
│ │ dom. 20/12/2026 · 12:00 – 15:00      │ │
│ │ "Cancelada por la administración"    │ │  cancelledBy por rol
│ └──────────────────────────────────────┘ │
│ </ul>                                    │
│ Pagination                               │
└──────────────────────────────────────────┘
```

**Estados:** Próximas = `Confirmed` con inicio futuro o en curso, orden ascendente. Historial = `Cancelled` y `Realizada`, orden descendente. Vacío: "No tienes reservas próximas." / "Aún no tienes reservas anteriores.".

---

#### P-015 · Detalle de reserva

| Campo | Detalle |
|---|---|
| **Propósito** | Consultar una reserva, editar la lista de invitados antes del inicio y cancelarla |
| **Actor** | Anfitrión de la reserva; Administrator (consulta y cancela, **no** edita invitados) |
| **HU** | HU-007, HU-008 |
| **Ruta** | `/reservations/{id}` |
| **Datos** | `GET /api/reservations/{id}`: área, unidad, franja, estado, personas de la unidad, invitados (nombre e ingreso), datos de cancelación (rol y fecha-hora) |
| **Acciones** | 🔸 Anfitrión antes del inicio: agregar invitado (`POST …/guests` con `Idempotency-Key`), quitar invitado (`DELETE …/guests/{guestId}`); cancelar → P-016 (anfitrión o Administrator) |
| **Reglas** | RN-086 (edición solo antes de `startAt`), RN-023 (aforo), RN-083/RN-161 (cancelación antes del inicio), RN-085, matriz B5 (el Administrator no edita invitados) |

```text
AppShell (máx. 48 rem)
┌──────────────────────────────────────────┐
│ ← Mis reservas                           │
│ <h1>"Salón de fiestas"</h1> [Confirmada] │
│ [Alert success: "Agregaste a Pedro       │
│  Ramos"]                                 │
│ <dl>                                     │
│  "Fecha"     sábado 12/12/2026           │
│  "Horario"   19:00 – 23:00               │
│  "Unidad"    A-502                       │
│  "Personas"  39 de 40                    │
│ </dl>                                    │
│                                          │
│ <h2>"Invitados (37)"</h2>                │
│ <table> (tarjetas en móvil)              │
│  Nombre          | Ingreso  | Acción     │
│  Pedro Ramos     | —        | [Quitar]   │  Button secondary pequeño, form POST
│  Lucía Torres    | 19:07    |            │  con _method=DELETE; aria-label
│  …                                       │  "Quitar a Pedro Ramos"
│                                          │
│ 🔸 antes del inicio:                     │
│ <form> "Agregar invitado"                │
│ [ Nombre completo ______ ] [Agregar]     │  input + Button secondary
│ (si es el primer invitado: aviso de      │
│  privacidad + casilla, como en P-012)    │
│                                          │
│ ─────────────────────────────────────    │
│ 🔸 antes del inicio:                     │
│ [      Cancelar reserva        ]         │  Button danger (secondary visual:
│                                          │  borde danger) → P-016
└──────────────────────────────────────────┘
```

**Estados:**
- **Ya empezó o terminó:** sin formulario de invitados, sin botones Quitar ni Cancelar; texto "La reserva ya empezó: la lista de invitados no se puede cambiar.".
- **Cancelada:** Badge "Cancelada" + `<dl>` "Cancelada por" ("ti" / "la administración") y "Fecha" `12/12/2026 15:00`; sin acciones.
- **Vista del Administrator:** misma pantalla sin formulario de invitados ni botones Quitar; con "Cancelar reserva" antes del inicio; `←` vuelve a P-062.
- **Errores:** `RESERVATION_EXCEEDS_CAPACITY` y `RESERVATION_GUEST_EDIT_TOO_LATE` en el resumen; el nombre escrito se conserva.
- **No es anfitrión:** P-090.

---

#### P-016 · Cancelar reserva

| Campo | Detalle |
|---|---|
| **Propósito** | Confirmar una cancelación (acción sin vuelta atrás) |
| **Actor** | Anfitrión, Administrator |
| **HU** | HU-008 |
| **Ruta** | `/reservations/{id}/cancel` |
| **Datos** | Resumen de la reserva |
| **Acciones** | "Sí, cancelar" (`POST /api/reservations/{id}/cancellation`); "No, volver" |
| **Reglas** | RN-083, RN-161 (antes del inicio), RN-168 (ya cancelada), RN-084 y RN-088 (aviso al anfitrión si cancela otra persona), RN-026 (sale de portería en ≤ 60 s) |

```text
AppShell (máx. 32 rem) · ConfirmPage
┌──────────────────────────────────────────┐
│ <h1>"¿Cancelar esta reserva?"</h1>       │
│ ┌──────────────────────────────────────┐ │  Card
│ │ Salón de fiestas · A-502             │ │
│ │ sábado 12/12/2026 · 19:00 – 23:00    │ │
│ │ 39 personas                          │ │
│ └──────────────────────────────────────┘ │
│ "Tus invitados ya no figurarán en        │  anfitrión
│  portería. Esta acción no se puede       │
│  deshacer."                              │
│ 🔒 Adm: "Avisaremos a la unidad A-502    │  Administrator
│  cuando inicie sesión."                  │
│ [        Sí, cancelar          ]         │  Button danger
│ [         No, volver           ]         │  Button secondary → P-015
└──────────────────────────────────────────┘
```

**Estados:** éxito → P-014 (anfitrión) o P-062 (Administrator) con `Alert success`. `RESERVATION_CANCELLATION_TOO_LATE` o `RESERVATION_ALREADY_CANCELLED` → P-015 con el error en el resumen.

---

### 3.4 Portería

#### P-020 · Portería: reservas del día

| Campo | Detalle |
|---|---|
| **Propósito** | Dejar pasar a los invitados autorizados del día sin cuaderno ni llamadas |
| **Actor** | Concierge, en la PC de portería (escritorio ≥ 960 px; también usable en móvil) |
| **HU** | HU-009 |
| **Ruta** | `/concierge` |
| **Datos** | `GET /api/concierge/today`: fecha local, reservas `Confirmed` de hoy en `America/Lima` con unidad, área, franja e invitados (nombre e ingreso). **Sin** DNI, teléfono, correo ni nombre del anfitrión |
| **Acciones** | "Marcar ingreso" (`POST /api/concierge/guests/{guestId}/check-in`); 🧩 JS opcional: filtrar por nombre del invitado o por unidad (p. ej. "A-502") en la página |
| **Reglas** | RN-026 (refresco ≤ 60 s; polling de 30 s con `ETag`), RN-029, RN-030, RN-031, RN-158 (sin datos personales), RN-164 (ingreso único, solo reservas vigentes de hoy) |

```text
AppShell con menú mínimo (solo "Portería" y "Cerrar sesión") · ancho completo
┌────────────────────────────────────────────────────────────────────────────┐
│ <h1>"Portería · sábado 12/12/2026"</h1>                                    │
│ "Última actualización 19:05" ● (aria-live=polite)    [Actualizar ahora]   │ Button secondary
│                                                       (GET, funciona sin JS)
│ 🧩 "Buscar invitado" [______________]  (filtra en la página, aria-live con  │
│     "3 resultados")                                                         │
│ [Alert danger si falla el polling: "Sin conexión. Reintentando…"]          │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ <h2>19:00 – 23:00 · Salón de fiestas · A-502</h2>    "2 de 37 ingresaron"│ │
│ │ <table>                                                                │ │
│ │  <caption class=sr-only>Invitados de A-502, Salón de fiestas</caption> │ │
│ │  Invitado                 | Ingreso         | Acción                   │ │
│ │  ──────────────────────── | ─────────────── | ──────────────────────── │ │
│ │  Pedro Ramos              | —               | [ Marcar ingreso ]       │ │ Button primary
│ │  Lucía Torres             | ✓ Ingresó 19:07 |                          │ │ Badge success
│ │  …                                                                      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ <h2>12:00 – 15:00 · Parrilla · A-301</h2>               "0 invitados"  │ │
│ │ "Sin invitados registrados."                                           │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
  Orden: por hora de inicio ascendente. Letra de los nombres 1.125 rem
  (lectura a distancia). Filas de 56 px. Botón con aria-label
  "Marcar ingreso de Pedro Ramos".
```

**Estados:**
- **Vacío:** `EmptyState` "No hay reservas confirmadas para hoy.".
- **Marcar ingreso:** Post/Redirect/Get a `/concierge#reservation-{id}`; la fila muestra "Ingresó 19:07"; aviso `role="status"` "Registraste el ingreso de Pedro Ramos.". 🧩 Con JS se hace por `fetch` sin recargar y el foco pasa a la fila siguiente.
- **`GUEST_ALREADY_CHECKED_IN`:** aviso `warning` con el texto del código; la fila muestra la hora original.
- **`GUEST_CHECK_IN_NOT_ALLOWED`** (reserva cancelada mientras la página estaba abierta): aviso `danger` y la reserva desaparece en el siguiente refresco.
- **Polling:** script de ~2 KB; con `304` no cambia nada; con `200` reemplaza la lista conservando el filtro y el foco. Sin JS, `<meta http-equiv="refresh" content="60">` como respaldo (≤ 60 s, RN-026).
- **Sesión vencida durante el polling (`401`):** `Alert warning` fijo "Tu sesión se cerró. Inicia sesión de nuevo." + Button primary → P-001. La lista de reservas e invitados y el buscador se retiran de la pantalla y del DOM en ese mismo momento, y el polling se detiene: la PC compartida no vuelve a mostrar ningún nombre sin una sesión nueva (RN-137, HU-003B; validación VL-P020 obs. 1). La respuesta de `/concierge` lleva `Cache-Control: no-store`. El polling se envía con la cabecera `X-CondoHub-Background: poll` y el `meta refresh` sin JS con `?auto=1`: ninguno renueva la sesión (RN-113; 07-architecture.md ADR-0013). "Actualizar ahora" y "Marcar ingreso" sí cuentan como actividad; el buscador filtra en la página y no envía solicitudes, así que no cuenta.
- **Otro rol** (Resident, Administrator): P-090.

---

### 3.5 Gastos

**Monto anulado (criterio único de P-030 y P-031).** Un gasto anulado muestra su monto en `--color-text-muted`, **sin tachado**, junto al Badge "Anulado" y el texto "No suma al total".

#### P-030 · Gastos del mes

| Campo | Detalle |
|---|---|
| **Propósito** | Ver en qué se gastó la cuota: totales por categoría y cada gasto del mes |
| **Actor** | Propietario (R-Own, NRO), BoardMember, Administrator (política `CanViewCondominiumFinancials`) |
| **HU** | HU-011 |
| **Ruta** | `/expenses?month=2026-11&page=1` (sin `month`: mes actual) |
| **Datos** | `GET /api/expenses?month=`: totales por categoría (sin anulados), lista con descripción, monto, fecha del gasto, fecha de registro, categoría ⚠️ Q27, proveedor y estado |
| **Acciones** | Cambiar de mes; abrir detalle (P-031); 🔒 Administrator: "Registrar gasto" (P-032) |
| **Reglas** | RN-035 (mensaje de mes vacío), RN-090, RN-036 (sin unidades, personas ni deudas), RN-142 (anulados no suman), RN-143 (agrupa por fecha del gasto, no de registro), RN-015/RN-016/RN-105 (acceso evaluado en cada request) |

```text
AppShell (máx. 72 rem)
┌──────────────────────────────────────────────────────────┐
│ <h1>"Gastos del condominio"</h1>    🔒Adm [Registrar gasto]│ Button primary
│                                                          │
│ <form method=get> "Mes" [ noviembre 2026 ▾ ] [Ver]       │ MonthInput + Button secondary
│ ← Octubre 2026          Diciembre 2026 →                 │ enlaces prev/next (no después
│                                                          │ del mes actual)
│ <h2>"Totales de noviembre 2026"</h2>                     │
│ <table> (se mantiene como tabla también en móvil:        │
│          solo 2 columnas)                                │
│  Categoría          |              Total                 │
│  Mantenimiento      |          S/ 6,300.00               │
│  Limpieza           |          S/ 3,200.00               │
│  Seguridad          |          S/ 9,800.00               │
│  <tfoot> Total del mes |      S/ 19,300.00  (peso 700)   │ suma de las filas
│                                                          │
│ <h2>"Detalle (14 gastos)"</h2>                           │
│ <table> → tarjetas en < 600 px                           │
│  Fecha  | Descripción          | Categoría | Proveedor     | Monto        │
│  08/11  | Limpieza de cisterna | Limpieza  | Hidroclean SAC| S/ 1,200.00  │
│         | [Anulado] "No suma al total"                     (tachado NO; texto)
│         | "registrado el 20/11/2026"                       texto muted
│  28/11  | Reparación de bomba… | Manten.   | …             | S/ 850.00    │
│         | "registrado el 03/12/2026"                                      │
│  La descripción es el enlace a P-031.                                     │
│ Pagination                                               │
└──────────────────────────────────────────────────────────┘
```

**Estados:**
- **Mes vacío:** sin tablas; `EmptyState` "No hay gastos registrados para este mes." (RN-035).
- **Anulado:** Badge "Anulado" + texto "No suma al total"; el monto se muestra en `--color-text-muted`, **sin tachado** (criterio único de §3.5 para P-030 y P-031).
- **Paginación:** los totales por categoría, el total del mes y el contador "Detalle (N gastos)" son siempre del **mes completo**, no de la página visible.
- **Sin acceso** (inquilino, Concierge, propietario con vínculo vencido): P-090. El enlace a esta pantalla no aparece en su menú.
- **Mes con formato inválido:** se ignora y se muestra el mes actual con `Alert info` "Mostramos el mes actual.".

---

#### P-031 · Detalle de gasto

| Campo | Detalle |
|---|---|
| **Propósito** | Ver un gasto con su comprobante; corregirlo (anular) o vincularlo |
| **Actor** | Quien cumple `CanViewCondominiumFinancials`; acciones solo Administrator |
| **HU** | HU-011, HU-010B |
| **Ruta** | `/expenses/{id}` |
| **Datos** | Descripción, monto, fecha del gasto, fecha de registro, categoría, proveedor, comprobante (nombre, tamaño), estado, anulación (motivo, fecha-hora), contratación vinculada |
| **Acciones** | Descargar comprobante (`GET /api/expenses/{id}/receipt`); 🔒 Adm: "Anular gasto" (P-033), "Vincular a una contratación" (P-034) |
| **Reglas** | RN-091 (inmutable: no hay botón Editar ni Borrar), RN-092, RN-095, RN-107 (descarga con la política del registro), RN-036 |

```text
AppShell (máx. 48 rem)
┌──────────────────────────────────────────┐
│ ← Gastos de noviembre 2026               │
│ <h1>"Limpieza de cisterna"</h1>          │
│ [Anulado]                                │  solo si está anulado
│ [Alert success: "Registraste el gasto"]  │
│ ┌ Alert danger (si anulado) ───────────┐ │
│ │ "Anulado el 21/11/2026 09:00"        │ │
│ │ "Motivo: Monto mal digitado; se      │ │
│ │  registra de nuevo por S/ 1,000.00"  │ │
│ └──────────────────────────────────────┘ │
│ <dl>                                     │
│  "Monto"            S/ 1,200.00          │  1.5 rem, peso 700
│  "Fecha del gasto"  08/11/2026           │
│  "Registrado el"    20/11/2026           │
│  "Categoría"        Limpieza             │
│  "Proveedor"        Hidroclean SAC       │
│  "Contratación"     Pintura de fachada → │  solo si hay; enlace a P-041
│ </dl>                                    │
│ <h2>"Comprobante"</h2>                   │
│ 📄 factura-F001-0458.pdf · 180 KB        │
│ [ Descargar comprobante ]                │  Button secondary; <a download>
│                                          │
│ 🔒 Administrator, gasto vigente:         │
│ <h2>"Acciones"</h2>                      │
│ [ Vincular a una contratación ]          │  Button secondary (si no hay vínculo)
│ [ Anular gasto ]                         │  Button danger-secondary
│ "Un gasto registrado no se edita: si     │  texto muted
│  tiene un error, anúlalo y regístralo    │
│  de nuevo."                              │
└──────────────────────────────────────────┘
```

**Estados:** anulado → sin acciones; el monto se muestra en `--color-text-muted`, sin tachado (mismo criterio que P-030); sin acceso → P-090; de otro condominio → P-091. Llegada desde P-033 con un gasto que ya estaba anulado → `Alert info` "Este gasto ya estaba anulado.".

---

#### P-032 · Registrar gasto

| Campo | Detalle |
|---|---|
| **Propósito** | Registrar un gasto con su comprobante |
| **Actor** | Administrator |
| **HU** | HU-010 |
| **Ruta** | `/expenses/new` |
| **Datos** | Categorías ⚠️ Q27; proveedores (`GET /api/vendors`) |
| **Acciones** | "Registrar gasto" (`POST /api/expenses`, multipart, con `Idempotency-Key`); "Registrar proveedor" (P-043 con `returnUrl`) |
| **Reglas** | RN-032, RN-033 ⚠️ Q28 (comprobante obligatorio), RN-034, RN-093 (monto > 0, hasta 2 decimales), RN-094 (fecha entre hoy − 12 meses y hoy), RN-036 (sin nombres de unidades ni personas), RN-106, RN-166 (si falla la carga, no se guarda) |

```text
AppShell (máx. 40 rem)
┌──────────────────────────────────────────┐
│ ← Gastos                                 │
│ <h1>"Registrar gasto"</h1>               │
│ [Resumen de errores]                     │
│ <form method=post enctype=multipart>     │
│ <input hidden IdempotencyKey>            │
│                                          │
│ "Descripción (obligatorio)"              │  input text, maxlength=200
│ [ Limpieza de cisterna_____________ ]    │  hint: "No incluyas números de
│                                          │  unidad ni nombres de residentes."
│ "Monto (obligatorio)"                    │  MoneyInput
│ S/ [ 1200.00 ]                           │
│ "Fecha del gasto (obligatorio)"          │  DateInput max=hoy, min=hoy−12 meses
│ [ 08/11/2026 ]                           │  hint: "La fecha del comprobante, no la
│                                          │  de hoy."
│ "Categoría (obligatorio)"                │  select ⚠️ Q27
│ [ Limpieza ▾ ]                           │
│ "Proveedor (obligatorio)"                │  select ordenado por razón social
│ [ Hidroclean SAC ▾ ]                     │
│ ¿No está en la lista? Registrar          │  enlace → P-043?returnUrl=/expenses/new
│ proveedor                                │
│ "Comprobante (obligatorio)"              │  FileInput accept=".pdf,.jpg,.jpeg,.png"
│ [ Elegir archivo ]                       │  hint: "PDF, JPG o PNG, máx. 10 MB."
│                                          │  ⚠️ Q28
│ [Alert info] "Al registrarlo, el gasto   │
│  no se puede editar ni borrar; solo      │
│  anular con un motivo."                  │
│ [         Registrar gasto          ]     │  Button primary
│ [            Cancelar              ]     │  Button link → P-030
└──────────────────────────────────────────┘
```

**Estados:** errores `422`, `413`, `415` en su campo; los valores se conservan salvo el archivo (hint: "Vuelve a elegir el archivo."). Corte de red en la carga → mensaje del navegador; al reenviar, la idempotencia evita duplicados. Éxito → P-031 con `Alert success` "Registraste el gasto.". BoardMember o propietario → P-090.

**Sin proveedores:** si el condominio no tiene proveedores registrados, el `select` "Proveedor" se reemplaza por el texto "Aún no hay proveedores registrados." y el enlace "Registrar proveedor" (→ P-043 con `returnUrl=/expenses/new`) se muestra como Button secondary destacado; el resto del formulario sigue visible.

---

#### P-033 · Anular gasto

| Campo | Detalle |
|---|---|
| **Propósito** | Anular con motivo un gasto mal registrado, sin borrarlo |
| **Actor** | Administrator |
| **HU** | HU-010B |
| **Ruta** | `/expenses/{id}/void` |
| **Datos** | Resumen del gasto |
| **Acciones** | "Anular gasto" (`POST /api/expenses/{id}/void`); "Volver" |
| **Reglas** | RN-092 (motivo obligatorio; solo espacios cuenta como vacío), RN-167 (no se anula dos veces), RN-142 |

```text
AppShell (máx. 32 rem) · ConfirmPage
┌──────────────────────────────────────────┐
│ <h1>"Anular gasto"</h1>                  │
│ Card: Limpieza de cisterna · S/ 1,200.00 │
│       08/11/2026 · Hidroclean SAC        │
│ "El gasto seguirá visible para los       │
│  propietarios como anulado, con este     │
│  motivo. Dejará de sumar en los          │
│  totales. No se puede deshacer."         │
│ "Motivo de la anulación (obligatorio)"   │  textarea rows=4, maxlength=500
│ [__________________________________]     │
│ [          Anular gasto            ]     │  Button danger
│ [            Volver                ]     │  Button secondary → P-031
└──────────────────────────────────────────┘
```

**Estados:** `EXPENSE_VOID_REASON_REQUIRED` en el campo; `EXPENSE_ALREADY_VOIDED` → P-031 con el error. Éxito → P-031 con `Alert success` "Anulaste el gasto.". **`GET` de un gasto ya anulado:** no se muestra el formulario; redirige a P-031 con `Alert info` "Este gasto ya estaba anulado." (RN-167).

---

#### P-034 · Vincular gasto a una contratación

| Campo | Detalle |
|---|---|
| **Propósito** | Mostrar el sustento del gasto enlazándolo con la contratación aprobada que lo origina |
| **Actor** | Administrator |
| **HU** | HU-010B |
| **Ruta** | `/expenses/{id}/supplier-hire` |
| **Datos** | Resumen del gasto; contrataciones `Aprobadas` (`GET /api/supplier-hires?status=Approved`) |
| **Acciones** | "Vincular" (`PUT /api/expenses/{id}/supplier-hire`) |
| **Reglas** | RN-095 ⚠️ Q30 (solo contrataciones aprobadas), RN-172 (`FIELD_REQUIRED` si se envía sin elegir una opción) |

```text
AppShell (máx. 32 rem)
┌──────────────────────────────────────────┐
│ <h1>"Vincular a una contratación"</h1>   │
│ Card: Pintura de fachada – adelanto ·    │
│       S/ 9,250.00                        │
│ <fieldset><legend>"Contratación          │
│  aprobada"</legend>                      │
│  ( ) Pintura de fachada · aprobada       │  radios; solo Approved
│      25/11/2026                          │
│  ( ) Cambio de luminarias · aprobada     │
│      28/11/2026                          │
│ </fieldset>                              │
│ [            Vincular              ]     │  Button primary
│ [            Volver                ]     │
└──────────────────────────────────────────┘
```

**Opciones:** cada radio muestra el título de la contratación, "aprobada" y la fecha de la aprobación (`dd/mm/aaaa`); el texto completo es la etiqueta del radio. Orden: aprobación más reciente primero.

**Estados:** sin contrataciones aprobadas → `EmptyState` "No hay contrataciones aprobadas para vincular." y solo "Volver". Envío sin elegir → `FIELD_REQUIRED` "Elige la contratación." en el `fieldset` (RN-172). `EXPENSE_HIRE_NOT_APPROVED` (cambió de estado) → error en el `fieldset`.

---

### 3.6 Contrataciones

#### P-040 · Contrataciones

| Campo | Detalle |
|---|---|
| **Propósito** | Listar las contrataciones por estado; para la Junta, las que esperan su decisión |
| **Actor** | Propietario, BoardMember, Administrator |
| **HU** | HU-012, HU-013, HU-014 |
| **Ruta** | `/supplier-hires?status=Submitted\|Approved\|Draft` |
| **Datos** | `GET /api/supplier-hires?status=`: título, estado, fecha de envío o de decisión, cantidad de cotizaciones, monto menor y mayor |
| **Acciones** | Abrir expediente (P-041); 🔒 Adm: "Nueva contratación" (P-042), "Registrar proveedor" (P-043) |
| **Reglas** | RN-041 (Q25 resuelta el 2026-11-08: el propietario ve solo `Approved`; BoardMember, `Submitted` y `Approved`; Administrator, todos), RN-099 (contador de la Junta), RN-015 |

```text
AppShell (máx. 72 rem)
┌──────────────────────────────────────────────────────────┐
│ <h1>"Contrataciones"</h1>      🔒Adm [Nueva contratación]│
│                                                          │
│ Filtros (enlaces tipo pestaña, aria-current):            │
│ ( Por decidir (1) )( Aprobadas )( Borradores )           │
│   ↑ Brd, Adm         todos        ↑ solo Adm             │
│   Propietarios: solo la pestaña "Aprobadas" (Q25).       │
│                                                          │
│ <ul>                                                     │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <h2><a>Pintura de fachada</a></h2>  [Enviada a la Junta]│ │
│ │ "2 cotizaciones · desde S/ 18,500.00 hasta           │ │
│ │  S/ 21,000.00"                                       │ │
│ │ "Enviada el 24/11/2026"                              │ │
│ └──────────────────────────────────────────────────────┘ │
│ </ul>                                                    │
│ Pagination                                               │
└──────────────────────────────────────────────────────────┘
```

**Estados:** pestaña inicial: "Por decidir" para BoardMember; "Aprobadas" para propietarios; "Borradores" para Administrator. Un propietario que pide `?status=Submitted` o `?status=Draft`, o un BoardMember que pide `?status=Draft`, recibe la lista de "Aprobadas" (el filtro no permitido se ignora); la API no devuelve esos estados para su rol (Q25). Vacíos: "No hay contrataciones por decidir." · "Aún no hay contrataciones aprobadas." · "No hay borradores.". Inquilino o Concierge → P-090.

---

#### P-041 · Expediente de contratación

| Campo | Detalle |
|---|---|
| **Propósito** | Ver por qué se eligió a cada proveedor; decidir (Junta); enviar o editar (Administrator) |
| **Actor** | Propietario, BoardMember, Administrator |
| **HU** | HU-013, HU-014 |
| **Ruta** | `/supplier-hires/{id}` |
| **Datos** | Título, estado, justificación, cotizaciones (proveedor, RUC, monto, documento), historial de decisiones (resultado, motivo, **cargo** y fecha-hora; nunca el nombre) |
| **Acciones** | Descargar documento de cotización (`GET …/quotes/{quoteId}/document`); 🔒 BoardMember con estado `Submitted`: Aprobar / Rechazar con motivo (`POST /api/supplier-hires/{id}/decisions`); 🔒 Adm con estado `Draft`: "Editar" (P-042), "Enviar a la Junta Directiva" |
| **Reglas** | RN-039 ⚠️ Q24, RN-040, RN-098 (motivo obligatorio al rechazar; vuelve a `Borrador`), RN-099, RN-041 ⚠️ Q34 (decisiones por cargo, sin nombres; visibilidad por estado según Q25), RN-107, RN-179 (`409` `HIRE_DECISION_CONFLICT`); el Administrator no decide (`403`) |

```text
AppShell (máx. 56 rem)
┌──────────────────────────────────────────────────────────┐
│ ← Contrataciones                                         │
│ <h1>"Pintura de fachada"</h1>  [Enviada a la Junta]      │
│ [Alert success: "Registraste tu decisión"]               │
│                                                          │
│ <h2>"Cotizaciones"</h2>                                  │
│ <table> → tarjetas en móvil                              │
│  Proveedor          | RUC         | Monto        | Documento         │
│  Pinturas Lima SAC  | 20512345678 | S/ 18,500.00 | [Descargar PDF]   │
│  Color Perú EIRL    | 20587654321 | S/ 21,000.00 | [Descargar PDF]   │
│  (sin documento: "Sin documento")                                     │
│  aria-label del botón: "Descargar cotización de Pinturas Lima SAC"    │
│                                                          │
│ <h2>"Justificación de la elección"</h2>                  │
│ <blockquote> "Se elige Pinturas Lima SAC por menor       │
│  precio (S/ 2,500.00 menos) y 3 años de garantía frente  │
│  a 1" </blockquote>                                      │
│                                                          │
│ <h2>"Historial"</h2>                                     │  Timeline <ol>, ascendente
│  ● [Rechazada por la Junta Directiva] 22/11/2026 20:15   │
│    "Motivo: Falta la garantía por escrito de Pinturas    │
│     Lima SAC"                                            │
│  ● [Aprobada por la Junta Directiva] 25/11/2026 21:03    │
│  (sin decisiones: "Aún no hay decisiones de la Junta     │
│   Directiva.")                                           │
│                                                          │
│ ┌ 🔒 BoardMember · estado Enviada ───────────────────┐   │  Card, borde 2 px accent
│ │ <h2>"Tu decisión"</h2>                             │   │
│ │ <fieldset><legend>"¿Qué decide la Junta            │   │
│ │  Directiva?"</legend>                              │   │
│ │  ( ) Aprobar                                       │   │  radios 56 px
│ │  ( ) Rechazar                                      │   │
│ │ "Motivo (obligatorio si rechazas)"                 │   │  textarea rows=4
│ │ [_____________________________________________]    │   │
│ │ "La decisión queda registrada con el cargo         │   │  texto muted
│ │  'Junta Directiva' y la fecha-hora; tu nombre no   │   │
│ │  se muestra a los propietarios."                   │   │
│ │ [        Registrar decisión         ]              │   │  Button primary
│ └────────────────────────────────────────────────────┘   │
│                                                          │
│ ┌ 🔒 Administrator · estado Borrador ────────────────┐   │
│ │ [ Editar ]   [ Enviar a la Junta Directiva ]       │   │  secondary / primary
│ │ Checklist: ✓ 2 proveedores distintos               │   │  requisitos de envío con
│ │            ✗ Justificación de al menos 20 car.     │   │  ícono + texto
│ └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

**Estados:**
- **Errores de decisión:** `HIRE_REJECTION_REASON_REQUIRED` en el motivo; `HIRE_NOT_SUBMITTED` en el resumen.
- **`409` `HIRE_DECISION_CONFLICT` (dos miembros a la vez, RN-179):** `Alert warning` con el texto de §3.0.6, el expediente recargado y el panel desaparece si ya no está `Submitted`.
- **Estado no visible para el rol (Q25):** un propietario que abre una contratación en `Draft` o `Submitted`, o un BoardMember que abre una en `Draft`, recibe `404` → P-091 (se trata como inexistente para ese rol).
- **Estado `Aprobada`:** sin paneles de acción.
- **Envío del Administrator:** `HIRE_INSUFFICIENT_QUOTES` o `HIRE_JUSTIFICATION_TOO_SHORT` en el resumen, con enlace a P-042.
- **Inquilino, Concierge o propietario con vínculo vencido:** P-090.

---

#### P-042 · Crear o editar contratación

| Campo | Detalle |
|---|---|
| **Propósito** | Preparar el expediente en `Borrador`: título, justificación y cotizaciones comparadas |
| **Actor** | Administrator |
| **HU** | HU-012 |
| **Ruta** | `/supplier-hires/new` · `/supplier-hires/{id}/edit` |
| **Datos** | Título, justificación, cotizaciones; proveedores |
| **Acciones** | "Guardar borrador" (`POST`/`PUT /api/supplier-hires`); agregar cotización (`POST …/quotes`, multipart); editar cotización (`PUT …/quotes/{quoteId}`); "Enviar a la Junta Directiva" (`POST …/submission`) |
| **Reglas** | RN-037 ⚠️ Q23 ⚠️ Q30 (≥ 2 proveedores distintos), RN-038 (justificación ≥ 20 caracteres sin espacios de los extremos), RN-093, RN-096/RN-097 (solo editable en `Draft`), RN-100, RN-172 (`FIELD_REQUIRED`: título al guardar; proveedor y monto al agregar una cotización), RN-173 (`AMOUNT_INVALID_FORMAT` en el monto). La justificación puede quedar vacía en el borrador: se exige al enviar (RN-038) |

```text
AppShell (máx. 48 rem)
┌──────────────────────────────────────────┐
│ ← Contrataciones                         │
│ <h1>"Nueva contratación"</h1>            │  "Editar contratación" en edición
│ [Badge Borrador]                         │
│ [Alert warning si viene de un rechazo:   │
│  "La Junta Directiva rechazó esta        │
│  contratación: {motivo}"]                │
│                                          │
│ <form id=hire> ── 1. Datos ───────────── │
│ "Título (obligatorio)"                   │  input text, maxlength=150
│ [ Pintura de fachada______________ ]     │
│ "Justificación de la elección            │  textarea rows=5
│  (necesaria para enviar)"                │  hint: "Mínimo 20 caracteres. Explica
│ [_________________________________ ]     │  por qué eliges a este proveedor."
│ "38 caracteres"  🧩 JS opcional          │  contador aria-live=polite
│ [       Guardar borrador         ]       │  Button secondary
│ </form>                                  │
│                                          │
│ ── 2. Cotizaciones ───────────────────── │  solo tras guardar el borrador
│ <table> → tarjetas                       │  (necesita el id)
│  Proveedor         | Monto       | Doc.  | Acción
│  Pinturas Lima SAC | S/18,500.00 | PDF   | [Editar]
│  Color Perú EIRL   | S/21,000.00 | —     | [Editar]
│                                          │
│ <form multipart> "Agregar cotización"    │
│ "Proveedor" [ ▾ ]  Registrar proveedor → │  enlace a P-043 con returnUrl
│ "Monto"  S/ [ ______ ]                   │  MoneyInput
│ "Documento (opcional)" [Elegir archivo]  │  FileInput, ⚠️ Q28
│ [       Agregar cotización       ]       │  Button secondary
│                                          │
│ ── 3. Enviar ─────────────────────────── │
│ Checklist:                               │  <ul> con ícono + texto
│  ✓ "Cotizaciones de al menos 2           │
│     proveedores distintos"               │
│  ✓ "Justificación de al menos 20         │
│     caracteres"                          │
│ [   Enviar a la Junta Directiva   ]      │  Button primary
│ "Después de enviarla ya no podrás        │
│  editarla, salvo que la Junta la         │
│  rechace."                               │
└──────────────────────────────────────────┘
```

**Estados:** nueva → solo la sección 1 hasta guardar; luego redirige a `/supplier-hires/{id}/edit`. Edición en `Submitted` o `Approved` → la página no muestra formularios; `Alert info` con el texto de `HIRE_NOT_EDITABLE` y el enlace a P-041. Errores `QUOTE_AMOUNT_NOT_POSITIVE`, `AMOUNT_INVALID_PRECISION` y `AMOUNT_INVALID_FORMAT` en el monto; `FIELD_REQUIRED` en el título, el proveedor o el monto vacíos. Éxito del envío → P-041 con `Alert success` "Enviaste la contratación a la Junta Directiva.".

---

#### P-043 · Registrar proveedor

| Campo | Detalle |
|---|---|
| **Propósito** | Registrar un proveedor como dato (sin cuenta de usuario) |
| **Actor** | Administrator |
| **HU** | HU-012 |
| **Ruta** | `/vendors/new?returnUrl=` |
| **Datos** | — |
| **Acciones** | "Registrar proveedor" (`POST /api/vendors`) |
| **Reglas** | RN-042 (sin cuenta ni invitación, W6), RN-052 (RUC 10 y nombre de persona natural cifrados), RN-169 (`VENDOR_RUC_INVALID_FORMAT`, `VENDOR_RUC_DUPLICATE`), RN-172 (`FIELD_REQUIRED`) |

```text
AppShell (máx. 32 rem)
┌──────────────────────────────────────────┐
│ <h1>"Registrar proveedor"</h1>           │
│ "RUC (obligatorio)"                      │  input inputmode=numeric,
│ [ 20512345678 ]                          │  pattern=\d{11}, maxlength=11
│ "Razón social (obligatorio)"             │
│ [ Pinturas Lima SAC_______________ ]     │
│ [☐] "Es persona natural (RUC 10)"        │  checkbox
│ "Nombre de la persona (obligatorio si es │  el HTML lo envía visible; solo el
│  persona natural)"                       │  script lo oculta mientras la casilla
│ [_________________________________ ]     │  no está marcada (sin JS, siempre visible)
│ [Alert info] "El proveedor no recibe     │
│  una cuenta ni una invitación."          │
│ [       Registrar proveedor        ]     │  Button primary
│ [            Cancelar              ]     │  → returnUrl
└──────────────────────────────────────────┘
```

**Estados:** `VENDOR_RUC_INVALID_FORMAT` y `VENDOR_RUC_DUPLICATE` en el campo RUC con el texto de §3.0.6 (RN-169); `FIELD_REQUIRED` en el RUC, la razón social o el nombre de la persona natural vacíos (RN-172). Éxito → `returnUrl` con el proveedor preseleccionado.

---

### 3.7 Padrón

#### P-050 · Padrón: torres y unidades

| Campo | Detalle |
|---|---|
| **Propósito** | Navegar el padrón por torre y unidad, y encontrar a una persona por su correo exacto |
| **Actor** | Administrator |
| **HU** | HU-001 |
| **Ruta** | `/registry?tower={code}` |
| **Datos** | Torres (`GET /api/towers`); unidades de la torre elegida (`GET /api/towers/{id}/units`) con la cantidad de vínculos activos |
| **Acciones** | Agregar torre (`POST /api/towers`); "Registrar unidad" (P-051); "Registrar persona" (P-053); buscar por correo exacto (`GET /api/persons?email=`) |
| **Reglas** | RN-003, RN-058; ADR-0004 (sin búsqueda parcial por nombre: los datos están cifrados) |

```text
AppShell (máx. 72 rem)
┌──────────────────────────────────────────────────────────┐
│ <h1>"Padrón"</h1>  [Registrar unidad] [Registrar persona]│ secondary / primary
│                                                          │
│ <form method=get> ── Buscar persona ──────────────────── │
│ "Correo exacto"                                          │ input type=email
│ [ ana.quispe@example.pe ______ ] [Buscar]                │ hint: "Escribe el correo
│                                                          │ completo. No se busca por
│                                                          │ nombre."
│ Resultado: enlace a P-054, o "No hay ninguna persona con │
│ ese correo."                                             │
│                                                          │
│ ── Torres ────────────────────────────────────────────── │
│ ( Torre A )( Torre B )   [+ Agregar torre]               │ enlaces tipo pestaña;
│                                                          │ "Agregar torre" abre un
│                                                          │ <details> con input "Código"
│ <h2>"Torre A · 48 unidades"</h2>                         │
│ grid de Cards enlazadas (2 col móvil, 4 col ≥ 600,       │
│ 6 col ≥ 960):                                            │
│ ┌────────┐ ┌────────┐ ┌────────┐                         │
│ │ 501    │ │ 502    │ │ 503    │                         │ número 1.25 rem peso 700
│ │ 2 víncu│ │ 1 víncu│ │ Sin    │                         │ texto muted; "Sin vínculos"
│ │ los    │ │ lo     │ │ víncu. │                         │ con Badge neutral
│ └────────┘ └────────┘ └────────┘                         │
└──────────────────────────────────────────────────────────┘
```

**Estados:** sin torres → `EmptyState` "Agrega la primera torre del condominio." con el formulario abierto. Torre sin unidades → "Esta torre aún no tiene unidades." + "Registrar unidad".

---

#### P-051 · Registrar unidad

| Campo | Detalle |
|---|---|
| **Propósito** | Registrar una unidad en una torre |
| **Actor** | Administrator |
| **HU** | HU-001 |
| **Ruta** | `/registry/units/new?tower=` |
| **Datos** | Torres |
| **Acciones** | "Registrar unidad" (`POST /api/units`) |
| **Reglas** | RN-003 (único por torre), RN-058 (`^\d{3,4}$`) |

```text
AppShell (máx. 32 rem)
┌──────────────────────────────────────────┐
│ ← Padrón                                 │
│ <h1>"Registrar unidad"</h1>              │
│ "Torre (obligatorio)"  [ Torre A ▾ ]     │
│ "Número (obligatorio)"                   │  inputmode=numeric, pattern=\d{3,4},
│ [ 502 ]                                  │  maxlength=4
│ "3 o 4 dígitos, sin guiones. Ejemplo:    │  hint
│  502 o 1203."                            │
│ [        Registrar unidad          ]     │
│ [           Cancelar               ]     │
└──────────────────────────────────────────┘
```

**Estados:** `UNIT_NUMBER_DUPLICATE`, `UNIT_NUMBER_INVALID_FORMAT` en el número. Éxito → P-052 de la unidad nueva.

---

#### P-052 · Detalle de unidad

| Campo | Detalle |
|---|---|
| **Propósito** | Ver quién está vinculado a la unidad y como qué |
| **Actor** | Administrator |
| **HU** | HU-001 |
| **Ruta** | `/registry/units/{id}` |
| **Datos** | Unidad (torre y número); vínculos: persona, tipo, inicio, fin, estado (activo, futuro, terminado) |
| **Acciones** | "Vincular una persona" (P-053 con la unidad); abrir ficha (P-054) |
| **Reglas** | RN-001, RN-002, RN-077 (si hay inquilino activo, se indica que el propietario no reserva) |

```text
AppShell (máx. 56 rem)
┌──────────────────────────────────────────┐
│ ← Torre A                                │
│ <h1>"Unidad A-502"</h1>                  │
│ [Alert info si hay inquilino activo:     │
│  "Unidad alquilada: solo su inquilino    │
│  puede reservar."]                       │
│ <h2>"Vínculos"</h2>   [Vincular persona] │
│ <table> → tarjetas                       │
│  Persona      | Tipo         | Desde      | Hasta      | Estado  │
│  Ana Quispe   | [Propietario]| 01/11/2026 | —          | Activo  │
│  (nombre = enlace a P-054)                                        │
│ EmptyState: "Esta unidad no tiene personas vinculadas."           │
└──────────────────────────────────────────┘
```

**Estados:**
- **Sin vínculos:** en lugar de la tabla, `EmptyState` "Esta unidad no tiene personas vinculadas." con Button primary "Vincular una persona" → P-053?unitId=.
- **Vínculo activo:** columna "Estado" con Badge success "Activo" (`StartDate ≤ hoy` y sin `EndDate` o `EndDate ≥ hoy`, en `America/Lima`).
- **Vínculo futuro:** Badge warning "Empieza el 01/08/2027". Una nota bajo la tabla: "Una persona con un vínculo que aún no empieza no puede reservar ni ser invitada hasta esa fecha." (RN-157, HU-006B).
- **Vínculo terminado:** Badge neutral "Terminó el 15/12/2026". Los terminados van al final, en una sección `<details>` "Vínculos anteriores (n)" cerrada por defecto.
- **Orden:** activos primero (propietarios antes que inquilinos), luego futuros, luego terminados.
- **Unidad alquilada:** el `Alert info` superior aparece solo si hay un vínculo `Tenant` activo.
- **Recién registrada (desde P-051):** `Alert success` "Registraste la unidad A-502." encima del `h1`.
- **Otro condominio o inexistente:** P-091. **Otro rol:** P-090.

---

#### P-053 · Registrar persona y vínculo

| Campo | Detalle |
|---|---|
| **Propósito** | Registrar lo mínimo para invitar: nombre, correo y vínculo con la unidad |
| **Actor** | Administrator |
| **HU** | HU-001 |
| **Ruta** | `/registry/persons/new?unitId=` · también `/registry/persons/{id}/occupancies/new` para agregar un vínculo a una persona existente |
| **Datos** | Torres y unidades |
| **Acciones** | "Registrar" (`POST /api/persons` + `POST /api/persons/{id}/occupancies`) |
| **Reglas** | RN-057 ⚠️ Q18 (solo nombre, correo y vínculo antes del consentimiento), RN-001, RN-002 (NRO no puede ser `Tenant`), RN-153 (mensaje neutro ante correo duplicado), RN-131 (persona en periodo de retención: el vínculo se agrega a su ficha), RN-146 (sin DNI ni teléfono); RN-172 (campos obligatorios), RN-174 (fin ≥ inicio), RN-176 (`OCCUPANCY_OVERLAP`: sin vínculos superpuestos de la misma persona con la misma unidad) |

```text
AppShell (máx. 40 rem)
┌──────────────────────────────────────────┐
│ ← Unidad A-502                           │
│ <h1>"Registrar persona"</h1>             │
│ <h2>"Persona"</h2>                       │
│ "Nombre completo (obligatorio)"          │  autocomplete=off
│ [ Ana Quispe______________________ ]     │
│ "Correo electrónico (obligatorio)"       │  type=email
│ [ ana.quispe@example.pe___________ ]     │
│ [Alert info] "El DNI y el teléfono los   │  RN-146; no hay campos
│  registra la propia persona después de   │
│  aceptar el consentimiento."             │
│                                          │
│ <h2>"Vínculo con la unidad"</h2>         │
│ "Unidad" [ Torre A ▾ ][ 502 ▾ ]          │  preseleccionada si viene de P-052
│ <fieldset><legend>"Tipo de vínculo"      │
│  </legend>                               │
│  ( ) Propietario                         │
│  ( ) Inquilino                           │
│ </fieldset>                              │
│ "Desde (obligatorio)"   "Hasta (opcional)"│ DateInput
│ [ 01/11/2026 ]          [ __/__/____ ]   │  hint Hasta: "Último día del
│                                          │  vínculo. Déjalo vacío si no tiene fin."
│ [            Registrar             ]     │
└──────────────────────────────────────────┘
```

**Estados:** `PERSON_REGISTRATION_REJECTED` en el resumen, sin indicar el motivo. `OCCUPANCY_TENANT_NOT_ALLOWED` en el tipo de vínculo. `OCCUPANCY_END_BEFORE_START` en "Hasta"; `OCCUPANCY_OVERLAP` en "Desde" y "Hasta" (RN-176). Éxito → P-054 con `Alert success` "Registraste a Ana Quispe. Ya puedes invitarla." si el vínculo ya empezó, o "Registraste a Ana Quispe. Podrás invitarla desde el {fecha}." si su `StartDate` es futura (RN-157).

**Decisión del autor (2026-11-08, validación de prototipos):** toda persona del padrón, incluida la de portería, primero se registra aquí con un vínculo y después recibe su rol desde la invitación de P-054. P-054 solo invita a personas ya registradas. Una persona de portería sin unidad no se registra en el MVP; es una limitación aceptada, no un gap.

---

#### P-054 · Ficha de persona e invitación

| Campo | Detalle |
|---|---|
| **Propósito** | Ver la ficha mínima de la persona, sus vínculos y el estado de su cuenta; invitarla |
| **Actor** | Administrator |
| **HU** | HU-001, HU-001B |
| **Ruta** | `/registry/persons/{id}` |
| **Datos** | `GET /api/persons/{id}`: nombre, correo, vínculos, estado de la cuenta (sin cuenta / invitación pendiente con vencimiento / invitación vencida / cuenta activa) |
| **Acciones** | "Agregar vínculo" (P-053 en modo persona existente); "Enviar invitación" con rol (`POST /api/persons/{id}/invitations`) |
| **Reglas** | RN-007, RN-110, RN-157 (vínculo iniciado), RN-165, RN-146 (el Administrator no edita DNI ni teléfono); RN-175 (sin vínculo vigente no se invita) |

```text
AppShell (máx. 48 rem)
┌──────────────────────────────────────────┐
│ ← Padrón                                 │
│ <h1>"Ana Quispe"</h1>                    │
│ <dl>                                     │
│  "Correo"   ana.quispe@example.pe        │
│ </dl>                                    │
│ <h2>"Vínculos"</h2>   [Agregar vínculo]  │
│  • A-502 · [Propietario] · desde         │
│    01/11/2026                            │
│                                          │
│ <h2>"Cuenta"</h2>                        │
│ Caso "Sin cuenta":                       │
│  [Sin cuenta]                            │
│  <form> "Rol" [ Residente ▾ ]            │  opciones: Residente, Propietario no
│   [   Enviar invitación   ]              │  residente, Portería
│   "Le llegará un correo con un enlace    │
│    de un solo uso que vence en 7 días."  │
│ Caso "Invitación pendiente":             │
│  [Invitación pendiente] "Vence el        │
│   08/12/2026 10:00"                      │
│ Caso "Invitación vencida":               │
│  [Invitación vencida] + mismo form       │  reenviar
│ Caso "Cuenta activa":                    │
│  [Cuenta activa] "Residente"             │
└──────────────────────────────────────────┘
```

**Estados:** `OCCUPANCY_NOT_STARTED` y `OCCUPANCY_TENANT_NOT_ALLOWED` en el campo "Rol". Éxito de la invitación → la sección muestra "Invitación pendiente" y `Alert success` "Enviamos la invitación a ana.quispe@example.pe.". Vuelta desde P-053 tras agregar un vínculo a una persona existente → `Alert success` "Registraste el vínculo.". Antes del consentimiento, la ficha no muestra DNI ni teléfono (HU-001).

---

### 3.8 Configuración y administración de reservas

#### P-060 · Áreas comunes (administración)

| Campo | Detalle |
|---|---|
| **Propósito** | Ver y gestionar las áreas comunes y sus reglas |
| **Actor** | Administrator |
| **HU** | HU-004 |
| **Ruta** | `/admin/common-areas` |
| **Datos** | `GET /api/common-areas` con los cinco valores |
| **Acciones** | "Nueva área" y "Editar" (P-061) |
| **Reglas** | RN-159 (solo Administrator) |

```text
AppShell (máx. 72 rem)
┌──────────────────────────────────────────────────────────┐
│ <h1>"Áreas comunes"</h1>                   [Nueva área]  │
│ [Alert success: "Guardaste la Parrilla"]                 │
│ <table> → tarjetas                                       │
│  Área            | Horario       | Máx. | Aforo | Anticip. | Por unidad/mes | │
│  Salón de fiestas| 09:00 – 23:00 | 5 h  | 40    | 90 días  | 2              | [Editar]
│  Parrilla        | 11:00 – 22:00 | 4 h  | 15    | 30 días  | 4              | [Editar]
│ EmptyState: "Aún no hay áreas comunes." + [Nueva área]   │
└──────────────────────────────────────────────────────────┘
```

**Estados:**
- **Sin áreas:** sin tabla; `EmptyState` "Aún no hay áreas comunes. Crea la primera para que los residentes puedan reservar." con Button primary "Nueva área".
- **Después de guardar (desde P-061):** `Alert success` (`role="status"`) "Guardaste la Parrilla. Los cambios aplican a las reservas nuevas." encima de la tabla; la fila editada lleva `id="area-{id}"` y la URL termina en `#area-{id}` para llevar el foco a ella.
- **Formato de los valores:** la duración en horas y minutos ("4 h", "4 h 30 min"), la anticipación en días y horas ("30 días", "1 h"), el horario como "11:00 – 22:00". Los valores de la API están en segundos.
- **Botón "Editar":** `aria-label` "Editar Parrilla".
- **BoardMember, residente o Concierge** (abren la ruta directamente): P-090 (`403`, `COMMON_AREA_CONFIG_FORBIDDEN`, HU-004). El ítem "Áreas comunes" no aparece en su menú.

---

#### P-061 · Configurar área común

| Campo | Detalle |
|---|---|
| **Propósito** | Crear o editar las cinco reglas de un área |
| **Actor** | Administrator |
| **HU** | HU-004 |
| **Ruta** | `/admin/common-areas/new` · `/admin/common-areas/{id}` |
| **Datos** | Área actual y su `ETag` (campo oculto para `If-Match`) |
| **Acciones** | "Guardar" (`POST` o `PUT /api/common-areas/{id}`) |
| **Reglas** | RN-082 ⚠️ Q11 (apertura < cierre, mismo día), RN-159, RN-160 (enteros > 0; duración y anticipación múltiplos de 60 s), RN-162 (no cambia reservas confirmadas), RN-171 (nombre único), RN-172 (campos obligatorios). Corregido el 2026-11-08 (VL-P061): antes citaba RN-021 |

```text
AppShell (máx. 40 rem)
┌──────────────────────────────────────────┐
│ ← Áreas comunes                          │
│ <h1>"Editar Parrilla"</h1>               │  "Nueva área común"
│ [Alert info] "Los cambios aplican a las  │  RN-162
│  reservas nuevas. Las reservas ya        │
│  confirmadas no cambian."                │
│ <input hidden etag>                      │
│ "Nombre (obligatorio)"  [ Parrilla ]     │
│ <fieldset><legend>"Horario"</legend>     │
│  "Abre"  [ 11:00 ]   "Cierra" [ 22:00 ]  │  TimeInput step=60
│  hint: "El área no puede cruzar la       │
│  medianoche."                            │
│ </fieldset>                              │
│ <fieldset><legend>"Duración máxima de    │
│  una reserva"</legend>                   │
│  [ 4 ] "horas"  [ 0 ] "minutos"          │  2 inputs number; la UI envía segundos
│ </fieldset>                              │
│ "Aforo (personas, contando a la unidad)" │  number min=1
│ [ 15 ]                                   │
│ <fieldset><legend>"Anticipación máxima"  │
│  </legend>                               │
│  [ 30 ] "días" [ 0 ] "horas" [ 0 ] "min" │  3 inputs; la UI envía segundos
│ </fieldset>                              │
│ "Reservas por unidad al mes"  [ 4 ]      │  number min=1
│ [             Guardar              ]     │
└──────────────────────────────────────────┘
```

**Estados:** `COMMON_AREA_INVALID_OPENING_HOURS` en el `fieldset` del horario; `COMMON_AREA_INVALID_LIMITS` en el campo afectado; `412` → valores actuales recargados + `Alert warning` de conflicto. Éxito → P-060 con `Alert success`.

---

#### P-062 · Reservas del condominio

| Campo | Detalle |
|---|---|
| **Propósito** | Ver las reservas del condominio, reservar a nombre de una unidad y cancelar |
| **Actor** | Administrator |
| **HU** | HU-006, HU-006B, HU-008 |
| **Ruta** | `/admin/reservations?date=&areaId=&page=` |
| **Datos** | `GET /api/reservations` (Administrator): fecha, franja, área, unidad, estado, total de personas |
| **Acciones** | Filtrar por fecha y área; "Reservar a nombre de una unidad" (P-012 en modo Administrator); abrir detalle (P-015); "Cancelar" (P-016) antes del inicio |
| **Reglas** | RN-076 (el Administrator reserva con las mismas reglas, salvo RN-077), RN-161, RN-084 |

```text
AppShell (máx. 72 rem)
┌──────────────────────────────────────────────────────────┐
│ <h1>"Reservas del condominio"</h1>                       │
│                       [Reservar a nombre de una unidad]  │ Button primary
│ [Alert success: "Cancelaste la reserva de A-502"]        │
│ <form method=get>                                        │
│  "Fecha" [ 12/12/2026 ]  "Área" [ Todas ▾ ]  [Filtrar]   │
│ <table> → tarjetas                                       │
│  Horario       | Área            | Unidad | Personas | Estado       | Acción
│  19:00 – 23:00 | Salón de fiestas| A-502  | 39       | [Confirmada] | [Ver] [Cancelar]
│  12:00 – 15:00 | Parrilla        | A-301  | 3        | [Cancelada]  | [Ver]
│  aria-label de Cancelar: "Cancelar la reserva de A-502 de las 19:00"   │
│ EmptyState: "No hay reservas para este día."             │
│ Pagination                                               │
└──────────────────────────────────────────────────────────┘
```

**Estados:** "Cancelar" solo aparece en reservas `Confirmadas` que aún no empiezan.

---

### 3.9 Sistema

#### P-090 · Acceso denegado (403)

| Campo | Detalle |
|---|---|
| **Propósito** | Explicar que el usuario no tiene permiso, sin revelar datos |
| **Actor** | Todos |
| **HU** | HU-009 (Concierge en `/expenses` y `/persons/{id}`), HU-011 (inquilino en `/expenses`), HU-014 (inquilino y Concierge en el expediente) |
| **Reglas** | RN-118, PRINCIPIO-006 |

```text
AppShell
┌──────────────────────────────────────────┐
│        🔒 (ícono 48 px, aria-hidden)     │
│ <h1>"No tienes acceso a esta sección"</h1>│
│ "Tu rol en Residencial Los Olivos no     │
│  permite ver esta información."          │
│ [        Ir al inicio          ]         │  → P-010 (P-020 para Concierge)
└──────────────────────────────────────────┘
```

#### P-091 · No encontrado (404)

| Campo | Detalle |
|---|---|
| **Propósito** | Responder igual a un recurso inexistente o de otro condominio |
| **Actor** | Todos |
| **HU** | Todas (aislamiento entre condominios, RN-017, RN-103, PRINCIPIO-003) |
| **Ruta** | Cualquier ruta inexistente, o cualquier recurso (`{id}`) que no existe o es de otro condominio. Responde con estado HTTP `404` |
| **Datos** | Ninguno. No muestra el `id` pedido ni distingue "no existe" de "es de otro condominio" (RN-103) |
| **Acciones** | "Ir al inicio"; "Volver" |
| **Reglas** | RN-017, RN-103, PRINCIPIO-003 |

```text
AppShell (si hay sesión) o AuthShell (sin sesión) · contenido centrado, máx. 32 rem
┌──────────────────────────────────────────┐
│ [Saltar al contenido]                    │
│ CondoHub        [☰ Menú]                 │  cabecera normal (si hay sesión)
├──────────────────────────────────────────┤
│                                          │
│        🔍 (ícono 48 px, color muted,     │  SVG aria-hidden="true"
│            aria-hidden)                  │
│                                          │
│ <h1>"No encontramos lo que buscas"</h1>  │  --text-3xl, centrado;
│                                          │  <title>"No encontrado · CondoHub"
│ "Puede que el enlace esté mal escrito    │  --text-md, --color-text-muted,
│  o que ya no exista."                    │  centrado, máx. 28 rem
│                                          │
│ [         Ir al inicio           ]       │  Button primary, ancho 100 % en móvil;
│                                          │  → P-010 (P-020 para Concierge;
│                                          │  P-001 sin sesión: texto
│                                          │  "Ir a iniciar sesión")
│ [            Volver              ]       │  Button secondary; <a> al Referer del
│                                          │  mismo origen, o al listado padre
│                                          │  (ej.: /reservations/{id} → /reservations).
│                                          │  Se oculta si no hay a dónde volver
└──────────────────────────────────────────┘
```

**Estados:**
- **Con sesión:** usa `AppShell` con el menú del rol; el foco inicial va al `h1` (`tabindex="-1"`) para que el lector de pantalla anuncie el error.
- **Sin sesión:** usa `AuthShell`, sin menú; el botón principal es "Ir a iniciar sesión" → P-001.
- **Recurso de otro condominio:** idéntico al caso inexistente: mismo texto, mismo estado `404`, mismo tiempo de respuesta aproximado (nada en la página permite deducir que el recurso existe).
- **Llamadas a la API (`/api/*`):** no renderizan esta página; responden Problem Details `404` (arquitectura §4.1).

---

## 4. Design tokens

Los tokens se definen como variables CSS en `wwwroot/css/tokens.css` (CSS propio sin framework, arquitectura C1). Los nombres están en inglés (PRINCIPIO-001).

### 4.1 Colores

Todos los pares de texto cumplen **≥ 4.5:1** y los bordes de controles **≥ 3:1** (WCAG 2.1 AA, 1.4.3 y 1.4.11). Contraste calculado sobre `--color-surface` (#FFFFFF) y `--color-bg` (#F5F7FA).

| Token | Valor | Uso | Contraste vs. blanco / fondo |
|---|---|---|---|
| `--color-primary` | `#1D4E89` | Botón principal, enlaces, ítem activo, foco de selección | 8.39 / 7.82 |
| `--color-primary-hover` | `#163D6B` | Hover y active del primario | 10.97 / 10.22 |
| `--color-primary-subtle` | `#E7EEF8` | Fondo de Alert info y Badge info | texto primary: 7.18 |
| `--color-secondary` | `#2F6F5E` | Elementos secundarios de marca (encabezados de sección, íconos de estado positivo neutro) | 5.91 / 5.50 |
| `--color-accent` | `#A44A0A` | Destacados que piden atención sin ser error: contador de la Junta, borde del panel de decisión | 5.89 / 5.49 |
| `--color-bg` | `#F5F7FA` | Fondo de página | — |
| `--color-surface` | `#FFFFFF` | Tarjetas, formularios, tablas | — |
| `--color-surface-alt` | `#EEF1F5` | Filas alternas, cabecera de tabla | texto muted: 6.84 |
| `--color-text` | `#1A1F29` | Texto principal | 16.51 / 15.38 |
| `--color-text-muted` | `#4A5363` | Hints, metadatos, texto secundario | 7.75 / 7.22 |
| `--color-text-inverse` | `#FFFFFF` | Texto sobre primary, danger | — |
| `--color-border` | `#7A8496` | Bordes de inputs, radios y checkboxes | 3.77 / 3.51 |
| `--color-border-subtle` | `#D5DAE1` | Separadores y bordes de tarjeta (decorativos) | — |
| `--color-success` | `#1E7A3E` | Texto e íconos de éxito | 5.37 / 5.01 |
| `--color-success-subtle` | `#E8F5EC` | Fondo de Alert y Badge success | texto: 4.79 |
| `--color-warning` | `#8A5A00` | Texto e íconos de advertencia | 5.93 / 5.52 |
| `--color-warning-subtle` | `#FFF4DB` | Fondo de Alert y Badge warning | texto: 5.42 |
| `--color-danger` | `#B42318` | Errores, botón destructivo | 6.57 / 6.13 |
| `--color-danger-subtle` | `#FDECEA` | Fondo de Alert y Badge danger | texto: 5.75 |
| `--color-neutral-subtle` | `#EEF1F5` | Fondo de Badge neutral | texto muted: 6.84 |
| `--color-focus` | `#C2410C` | Anillo de foco (3 px + 2 px de separación) | 5.18 / 4.83 |

**Modo oscuro:** fuera del MVP. Los tokens permiten agregarlo con `@media (prefers-color-scheme: dark)` sin tocar componentes.
**Modo de alto contraste:** con `@media (forced-colors: active)` los bordes y el foco usan `CanvasText`/`Highlight`; ningún estado depende solo del fondo.

### 4.2 Tipografía

Fuentes del sistema (sin descargas; respetan el tamaño de fuente del sistema, arquitectura §6.3).

| Token | Valor |
|---|---|
| `--font-family-base` | `system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif` |
| `--font-family-mono` | `ui-monospace, "Cascadia Mono", "Roboto Mono", Menlo, Consolas, monospace` (códigos TOTP y de recuperación) |
| `--font-size-base` | `1rem` (16 px; `html { font-size: 100% }`, nunca en px) |

| Token | Tamaño | Alto de línea | Peso | Uso |
|---|---|---|---|---|
| `--text-sm` | 1rem (16 px) | 1.5 | 400 | Hints y metadatos (no hay texto menor de 16 px, PRINCIPIO-011) |
| `--text-md` | 1rem (16 px) | 1.5 | 400 | Cuerpo, inputs, botones |
| `--text-lg` | 1.125rem (18 px) | 1.5 | 400 | Nombres en portería, montos en tablas |
| `--text-xl` | 1.25rem (20 px) | 1.4 | 600 | `h3`, títulos de tarjeta |
| `--text-2xl` | 1.5rem (24 px) | 1.3 | 700 | `h2`, montos destacados, contador de la Junta |
| `--text-3xl` | 1.75rem (28 px) | 1.25 | 700 | `h1` en móvil |
| `--text-4xl` | 2rem (32 px) | 1.2 | 700 | `h1` en ≥ 960 px |

Reglas: `font-variant-numeric: tabular-nums` en montos, horas y tablas; ancho de línea de lectura ≤ 70 caracteres (`max-width: 40rem` en texto continuo); sin texto en mayúsculas sostenidas salvo los códigos; `letter-spacing` y `word-spacing` ajustables por el usuario (WCAG 1.4.12).

### 4.3 Espaciado, tamaños y forma

| Token | Valor | Uso |
|---|---|---|
| `--space-1` | 4px | Separación ícono–texto |
| `--space-2` | 8px | Separación mínima entre objetivos táctiles |
| `--space-3` | 12px | Separación label–input |
| `--space-4` | 16px | Gutter en móvil, padding de tarjeta |
| `--space-6` | 24px | Separación entre campos, padding de tarjeta ≥ 600 px |
| `--space-8` | 32px | Separación entre secciones |
| `--space-12` | 48px | Separación antes de acciones finales |
| `--radius-sm` | 6px | Inputs |
| `--radius-md` | 8px | Botones, tarjetas, alerts |
| `--radius-pill` | 999px | Badges |
| `--border-width` | 1px | Bordes |
| `--focus-ring` | `0 0 0 2px var(--color-surface), 0 0 0 5px var(--color-focus)` | Foco visible |
| `--shadow-card` | `0 1px 2px rgba(26,31,41,.08)` | Tarjetas (opcional) |

| Componente | Tamaño |
|---|---|
| Objetivo táctil mínimo | 44×44 px (PRINCIPIO-011) |
| Botón | Alto mín. 48 px; padding 12 × 20 px; ancho 100 % en móvil para la acción principal |
| Botón pequeño (acciones en tablas) | Alto mín. 44 px; padding 10 × 16 px |
| Input, select | Alto mín. 48 px; padding 12 × 14 px |
| Textarea | Mín. 4 filas; redimensionable vertical |
| Radio y checkbox | Control de 24×24 px dentro de una fila clicable de alto ≥ 44 px |
| Badge | Alto 28 px; padding 4 × 12 px; texto 16 px peso 600 |
| Fila de tabla | Alto mín. 48 px (56 px en portería) |
| Ícono | 20 px en línea con texto; 48 px en estados de página |
| Sidebar (≥ 960 px) | 16rem |
| Contenedor de lectura / formularios | máx. 40rem |
| Contenedor de detalle | máx. 48–56rem |
| Contenedor de listas y tablas | máx. 72rem |
| Tarjeta de acceso (`AuthShell`) | máx. 28rem |

### 4.4 Breakpoints

Diseño **móvil primero**; los breakpoints usan `em` para respetar el zoom del texto.

| Token | Valor | Cambio |
|---|---|---|
| base | < 37.5em (600 px) | Una columna; tablas como tarjetas; menú `<details>` |
| `--bp-sm` | ≥ 37.5em (600 px) | Tablas reales; `<dl>` en dos columnas; grids de 2–4 columnas |
| `--bp-lg` | ≥ 60em (960 px) | Sidebar fijo; `h1` de 32 px; grids de 3–6 columnas; portería a ancho completo |

---

## 5. Navigation map

Ítems del menú principal (`AppShell`) por rol. Un usuario con varios roles en el condominio ve la unión de sus ítems (matriz de permisos, regla 3), en el orden de la lista.

| Ítem del menú | Ruta | Adm | Brd | R-Own | R-Ten | NRO | Con |
|---|---|---|---|---|---|---|---|
| "Inicio" | `/` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| "Reservar" | `/common-areas` | — | — | ✅ | ✅ | ✅ | — |
| "Mis reservas" | `/reservations` | — | — | ✅ | ✅ | ✅ | — |
| "Gastos" | `/expenses` | ✅ | ✅ | ✅ | — | ✅ | — |
| "Contrataciones" (con contador para Brd) | `/supplier-hires` | ✅ | ✅ | ✅ | — | ✅ | — |
| "Padrón" | `/registry` | ✅ | — | — | — | — | — |
| "Áreas comunes" | `/admin/common-areas` | ✅ | — | — | — | — | — |
| "Reservas del condominio" | `/admin/reservations` | ✅ | — | — | — | — | — |
| "Portería" | `/concierge` | — | — | — | — | — | ✅ |
| "Cerrar sesión" | `POST /api/auth/sign-out` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

Un enlace que no aparece en el menú sigue protegido en el servidor: abrir la ruta directamente responde con P-090 (`403`) o P-091 (`404`).

```text
CondoHub
│
├── Acceso (AuthShell, sin menú)
│   ├── P-006  /invitations/{token} ............ Activar cuenta
│   │            └─→ P-007
│   ├── P-001  /sign-in ........................ Iniciar sesión
│   │   ├── P-003  /sign-in/mfa/enroll ......... Configurar app (Adm, Brd sin TOTP)
│   │   │     └── P-004  /sign-in/mfa/recovery-codes
│   │   ├── P-002  /sign-in/mfa ................ Verificar código (Adm, Brd)
│   │   │     └── ?method=recovery ............. Código de recuperación
│   │   ├── P-005  /sign-in/condominium ........ Elegir condominio (> 1)
│   │   └── P-007  /consent .................... Consentimiento (puerta de sesión)
│   └── (Cerrar sesión → P-001)
│
├── P-010  / ................................... Inicio (todos menos Concierge)
│
├── Reservas  🔒 Resident, NRO
│   ├── P-011  /common-areas ................... Áreas comunes
│   │   └── P-012  /reservations/new?areaId= ... Nueva reserva
│   │         └── P-013  /reservations/{id}/confirmed
│   └── P-014  /reservations ................... Mis reservas (Próximas | Historial)
│       └── P-015  /reservations/{id} .......... Detalle (invitados)
│             └── P-016  /reservations/{id}/cancel
│
├── Gastos  🔒 CanViewCondominiumFinancials (Adm, Brd, R-Own, NRO)
│   ├── P-030  /expenses?month= ................ Gastos del mes
│   │   └── P-031  /expenses/{id} .............. Detalle de gasto
│   │         ├── P-033  /expenses/{id}/void ............ 🔒 Adm
│   │         └── P-034  /expenses/{id}/supplier-hire ... 🔒 Adm
│   └── P-032  /expenses/new ................... Registrar gasto 🔒 Adm
│         └── P-043  /vendors/new?returnUrl=
│
├── Contrataciones  🔒 CanViewCondominiumFinancials
│   ├── P-040  /supplier-hires?status= ......... Contrataciones
│   │   └── P-041  /supplier-hires/{id} ........ Expediente (decisión 🔒 Brd)
│   └── P-042  /supplier-hires/new | /{id}/edit  Crear o editar 🔒 Adm
│         └── P-043  /vendors/new?returnUrl=
│
├── Administración  🔒 Administrator
│   ├── P-050  /registry ....................... Padrón
│   │   ├── P-051  /registry/units/new
│   │   ├── P-052  /registry/units/{id}
│   │   │     └── P-053  /registry/persons/new?unitId=
│   │   └── P-054  /registry/persons/{id} ...... Ficha e invitación
│   │         └── P-053  /registry/persons/{id}/occupancies/new
│   ├── P-060  /admin/common-areas
│   │   └── P-061  /admin/common-areas/new | /{id}
│   └── P-062  /admin/reservations
│         ├── P-012  /reservations/new (modo Administrator)
│         ├── P-015  /reservations/{id}
│         └── P-016  /reservations/{id}/cancel
│
├── Portería  🔒 Concierge
│   └── P-020  /concierge ...................... Reservas del día (inicio del Concierge)
│
└── Sistema
    ├── P-090  (403) Acceso denegado
    └── P-091  (404) No encontrado
```

---

## 6. Pendientes y decisiones abiertas

Puntos que esta especificación no puede cerrar sin una decisión del autor o una respuesta de [05-preguntas-abiertas.md](05-preguntas-abiertas.md). Ninguno bloquea empezar el HTML/CSS.

| # | Tema | Pantallas | Qué se asumió | Qué falta |
|---|---|---|---|---|
| 1 | ~~Visibilidad de contrataciones no decididas para propietarios (Q25)~~ **Resuelto el 2026-11-08 (decisión del autor):** el propietario ve solo `Approved`; BoardMember, `Submitted` y `Approved`; Administrator, todos. Lo no visible responde `404` → P-091 | P-040, P-041 | — | — (RN-041 actualizada) |
| 2 | Lista de categorías de gasto (Q27) | P-030, P-032 | Mantenimiento, Limpieza y Seguridad, del seeder | Lista cerrada |
| 3 | Formatos y tamaño de adjuntos (Q28) | P-032, P-042 | PDF, JPG o PNG, máx. 10 MB (provisional de la arquitectura) | ADR-0019 |
| 4 | Cuándo un aviso de cancelación cuenta como "visto" (HU-008) | P-010 | Al pulsar "Entendido"; si el usuario no lo pulsa, vuelve a verlo en el siguiente inicio de sesión | Confirmar con el criterio "ya vio el aviso" de HU-008 |
| 5 | Formato visible de fechas frente a los criterios en ISO (HU-014) | P-041 y todas | Visible `25/11/2026 21:03`; ISO en `<time datetime>` | Alinear los tests E2E para leer el atributo |
| 6 | Texto del consentimiento y del aviso de privacidad de invitados (Q18, Q21, Q32) | P-007, P-012, P-015 | Estructura de secciones; textos de ejemplo | Texto legal y su clave de `es-PE.resx` |
| 7 | Cambio de condominio dentro de la sesión | AppShell | No se ofrece; se cambia al volver a iniciar sesión (RN-064) | Confirmar si basta para el MVP |
| 8 | Generación del QR del TOTP | P-003 | Librería por aprobar; respaldo con la clave en texto | Aprobación humana de la dependencia (PRINCIPIO-009.4) |
| 9 | ~~¿El polling de portería cuenta como actividad de sesión? (RN-113)~~ **Resuelto el 2026-11-08: no cuenta.** | P-020 | La sesión del Concierge vence a los 1,800 s sin una acción suya, aunque la vista se actualice sola; el siguiente polling recibe `401` y se muestra el aviso fijo sin la lista | — (RN-113 actualizada) |
| 10 | ~~Código de error para RUC inválido~~ **Resuelto el 2026-11-08** | P-043 | `VENDOR_RUC_INVALID_FORMAT` y `VENDOR_RUC_DUPLICATE` (RN-169, §3.0.6) | — |
| 11 | ~~Rutas de páginas y endpoints faltantes (Q36)~~ **Resuelto el 2026-11-04:** el mapa de endpoints de la arquitectura §4.2 se completó en v0.4 | Varias | Rutas propuestas en §1.1 | — |
| 12 | Varias decisiones de la Junta (Q24) | P-041 | Basta 1 BoardMember | Respuesta a Q24 (el modelo admite votos individuales, RT4) |

Los pendientes de la validación de prototipos (filas ⏳ PENDIENTE de [10-validation-log.md](10-validation-log.md)) están registrados con su valor por defecto en [05-preguntas-abiertas.md](05-preguntas-abiertas.md) §9 (Q51 a Q95); un agente aplica ese valor mientras el autor no decida otra cosa.
