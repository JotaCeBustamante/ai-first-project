# CondoHub — Reauditoría QA del Spec Pack

> **Fase:** Validación (Agente QA, BMAD)
> **Fecha:** 2026-11-02
> **Alcance revisado:** constitución 1.1, project brief, alcance, reglas de negocio (RN-001 a RN-109), glosario, ADR-0001 a ADR-0009 y matriz de permisos, tal como aparecen en `agente-qa.xml`.
> **Método:** cada hallazgo cita la regla o sección donde está el defecto. Antes de registrarlo se comprobó que el pack no lo resuelve en otro documento. Este informe **no inventa reglas de negocio**: señala qué falta o qué se contradice, y la decisión queda en manos del autor.

## Resumen

| Severidad | Cantidad |
|---|---|
| CRÍTICA | 4 |
| ALTA | 12 |
| MEDIA | 23 |
| BAJA | 11 |
| **Total** | **50** |

| Tipo principal | Cantidad |
|---|---|
| Contradicción | 13 |
| Regla faltante | 17 |
| Ambigüedad | 12 |
| Inconsistencia de glosario | 4 |
| Debilidad de formato | 4 |

**Puntaje de madurez: 3 / 5** (la justificación está al final).

---

## Hallazgos CRÍTICOS

### RQ-C01 · Un agente de IA modificó la constitución
- **Tipo:** Contradicción (con la constitución)
- **Severidad:** CRÍTICA
- **Ubicación:** ADR-0009, "More Information" (último punto) y "Confirmation"; constitución: encabezado, PRINCIPIO-009.7 y párrafo inicial ("ningún requisito, ticket ni instrucción puede violarlos").
- **Problema:** ADR-0009 dice que la versión 1.1 "was written into `00-constitucion.md` by the AI agent instead of by the author's own PR; the author authorized this one-time exception to PRINCIPIO-009.7". La constitución prohíbe exactamente eso: "Solo un humano puede modificar este archivo, mediante un PR aprobado", y PRINCIPIO-009.7 dice que un agente **NUNCA** puede modificar `00-constitucion.md`. Esa prohibición no admite excepciones, porque ninguna instrucción puede violar un principio. Además, el propio ADR-0009 se contradice: su sección "Confirmation" exige que "The amendment PR is opened and merged by the author (never by an agent)". El alcance (D3) también repite que "Un agente no puede modificar la constitución". El resultado es que la versión 1.1 se aprobó con un procedimiento inválido, y de ella dependen decisiones que bloquean el CI: la separación de licencias entre runtime y herramientas (C-04), la excepción de merge del autor (A-18) y la meta de 3G (A-17). Un agente que lea el pack no sabe si debe aplicar la 1.0 o la 1.1.
- **Sugerencia:** que el autor vuelva a aplicar la enmienda con un PR propio, hecho por un humano y con todos los checks en verde, y que un humano la confirme. Después, hay que corregir ADR-0009 para que no describa una "excepción" que la constitución no permite (o para dejar constancia de esa ratificación). Si el autor quiere que existan excepciones al PRINCIPIO-009.7, eso requiere enmendar primero la cláusula de no negociabilidad, también mediante un PR humano.

### RQ-C02 · ADR-0008 está "aceptado", pero sus valores "no están decididos"
- **Tipo:** Contradicción / Ambigüedad
- **Severidad:** CRÍTICA
- **Ubicación:** ADR-0008 (`status: accepted`; sección "Values (accepted by the author on 2026-11-02)"; "Consequences"); RN-074; reglas §9 ("Q22 … ya se resolvieron"); glosario #17.
- **Problema:** el título de la sección dice que los valores fueron aceptados, pero el texto que sigue dice "are **not decided**. They are a starting point". En "Consequences" se lee "the ADR cannot be accepted until the author confirms the values", aunque el front matter dice `accepted`. RN-074, que es MUST de M2, exige cumplir "los valores que fija el ADR-0008" y a la vez advierte "⚠️ Los valores concretos están pendientes del ADR-0008". Además, §9 da Q22 por resuelta. Con todo esto, un agente no puede implementar ni probar el vencimiento de la invitación, el bloqueo por intentos fallidos, los códigos de recuperación, la duración de la sesión ni la recuperación de contraseña. Tampoco hay política de contraseñas (largo mínimo, contraseñas filtradas), aunque ASVS V2 la exige. M2 es la base de todo el MVP.
- **Sugerencia:** que el autor confirme o cambie cada valor de la tabla y deje un solo estado coherente en el ADR (`proposed` mientras no lo haga). Luego, convertir cada valor en una regla EARS propia en §2, cada una con su test, y reabrir Q22 hasta que eso esté hecho.

### RQ-C03 · El plazo de retención empieza para personas que siguen teniendo un rol activo
- **Tipo:** Contradicción / Regla faltante
- **Severidad:** CRÍTICA
- **Ubicación:** RN-005, RN-060, RN-072, RN-073; ADR-0003 ("`Resident` or `NonResidentOwner` is assigned by the Administrator when registering the occupancy"); glosario #52 (Exresidente).
- **Problema:** RN-005 fija el inicio de la retención cuando termina el último vínculo de la persona, "tenga o no cuenta de usuario", sin mirar sus roles. RN-060, en cambio, lo fija cuando se revoca el último rol de alguien que "no tiene vínculos activos". Ninguna regla dice si el rol Resident o NonResidentOwner se revoca solo cuando termina el último vínculo. De ahí salen tres efectos:
  1. Una persona que vende su unidad pero sigue siendo BoardMember (RN-065 permite tener los dos roles), o que conserva el rol Resident, empieza a contar los 90 días. Al vencer el plazo, `DataRetentionJob` archiva y borra de SQL Server su nombre y su correo mientras su cuenta sigue activa (RN-073 no la desactiva porque todavía tiene un rol). El inicio de sesión por índice ciego deja de funcionar y se archivan datos de un usuario activo.
  2. Cuando después se le revoca el rol, RN-060 fija un **segundo** inicio de plazo, y nada dice cuál de los dos prevalece.
  3. El glosario #52 define al exresidente con un "o" (vínculo terminado **o** rol revocado), lo que admite las dos lecturas.
- **Sugerencia:** que el autor decida (a) si terminar el último vínculo revoca automáticamente Resident o NonResidentOwner, y (b) que el plazo empiece solo cuando la persona ya no tiene **ni** vínculos activos **ni** roles en el condominio. Luego, unificar RN-005 y RN-060 en una sola regla con ese disparador y agregar el contraejemplo "BoardMember que vende su unidad".

### RQ-C04 · Un usuario es global, pero el correo solo es único dentro de cada condominio
- **Tipo:** Contradicción / Regla faltante
- **Severidad:** CRÍTICA
- **Ubicación:** RN-068; glosario #42 (Usuario: "global: un correo y una contraseña por persona"); ADR-0003 (Tenant resolution); ADR-0004 ("Open: … the uniqueness scope … is not decided"); glosario #5 y #43.
- **Problema:** RN-068 solo impide que el correo se repita "en el mismo condominio". Eso permite que dos personas distintas de dos condominios distintos tengan el mismo correo. Sin embargo, el usuario es global, el inicio de sesión busca la cuenta por el índice ciego del correo sin filtro de condominio (RN-104) y luego muestra el selector (RN-064). Si dos `Person` de condominios distintos comparten un correo, no se sabe a qué cuenta pertenecen, y se podrían fusionar o exponer datos entre condominios (PRINCIPIO-003). El pack tampoco define cómo se relacionan `Person`, que vive en el padrón de un condominio, y `User`, que es global: si hay una `Person` por condominio unida a un solo `User`, quién la une y con qué criterio.
- **Sugerencia:** que el autor decida el alcance de la unicidad del correo (global en `User`, por condominio en `Person`, o ambos) y el modelo `Person`–`User`. Después, corregir RN-068 y cerrar el punto abierto de ADR-0004. Hace falta una regla y un test para "el mismo correo en dos condominios".

---

## Hallazgos ALTOS

### RQ-A01 · Ninguna regla obliga a archivar y borrar los datos de una persona cuando vence su plazo
- **Tipo:** Regla faltante
- **Severidad:** ALTA
- **Ubicación:** RN-005, RN-060, RN-061; RN-028 y RN-089 (solo cubren invitados); PRINCIPIO-004.5.
- **Problema:** RN-005 y RN-060 solo "fijan el inicio del plazo". Para los invitados, RN-028 (copiar) y RN-089 (borrar) dicen qué pasa al vencer el plazo, pero no existe una regla equivalente para las personas del padrón. RN-061 da por hecho que "`DataRetentionJob` archiva los datos personales de una persona" sin que ninguna regla lo ordene. Tampoco se dice qué se archiva de la cuenta: `PasswordHash`, índices ciegos, secreto TOTP, registros de consentimiento ni los vínculos.
- **Sugerencia:** agregar reglas MUST equivalentes a RN-028 y RN-089 para las personas, con la lista cerrada de campos que se archivan, los que se seudonimizan (RN-061) y los que se borran.

### RQ-A02 · El NonResidentOwner conserva el acceso financiero aunque ya no tenga un vínculo `Owner` activo
- **Tipo:** Contradicción / Regla faltante
- **Severidad:** ALTA
- **Ubicación:** ADR-0001 (Rules: la política se concede a "`NonResidentOwner`" sin condición); glosario #19; matriz, regla 4 y columna NRO ("always `Owner` occupancies"); RN-015 y RN-016 (solo hablan de Resident).
- **Problema:** para el Resident, el acceso financiero depende de que tenga un vínculo `Owner` activo (RN-015 y RN-016). Para el NonResidentOwner, en cambio, basta el rol. Si Luis Rojas vende B-1203, su vínculo termina, pero el rol no se revoca (ver RQ-C03), así que sigue viendo gastos y contrataciones. El matiz "siempre vínculos Owner" de la matriz no dice "activos". Esto contradice el objetivo de RN-016, que es cortar el acceso desde la solicitud siguiente.
- **Sugerencia:** que el autor decida si el NonResidentOwner también necesita un vínculo `Owner` activo. Si es así, generalizar RN-015 y RN-016 a ambos roles y corregir ADR-0001, el glosario #19 y la columna NRO de la matriz.

### RQ-A03 · La definición de "vínculo activo" ignora `StartDate`
- **Tipo:** Ambigüedad / Inconsistencia de glosario
- **Severidad:** ALTA
- **Ubicación:** glosario #6 ("activo mientras su `EndDate` es nula o mayor o igual que la fecha actual"); ADR-0001 (tabla del modelo, `EndDate`); RN-001 (ejemplo con `StartDate = 2026-11-15`).
- **Problema:** según la definición, un vínculo que empieza en el futuro ya está activo hoy. Un comprador con `StartDate` futura vería la información financiera (RN-015) antes de ser propietario. Un inquilino que todavía no se muda bloquearía las reservas del propietario por RN-077 y podría reservar por RN-025. Además, RN-072 le permitiría entrar al condominio.
- **Sugerencia:** que el autor decida si un vínculo activo exige `StartDate ≤ fecha actual` en `America/Lima`, y corregir el glosario #6 y ADR-0001 con un ejemplo de vínculo futuro.

### RQ-A04 · ADR-0001 dice que las vistas financieras solo muestran datos agregados; M5 exige mostrar cada gasto
- **Tipo:** Contradicción
- **Severidad:** ALTA
- **Ubicación:** ADR-0001, Rules, último punto ("Financial views show aggregated data only (by category, supplier and month)"); RN-090; alcance M5 ("ven cada gasto con su comprobante"); RN-041 (expediente completo).
- **Problema:** ADR-0001 está aceptado y su modelo figura como "Fijado" en el glosario. Un agente que lo siga mostraría solo totales, mientras que RN-090 exige el detalle de cada gasto con su comprobante. El ADR se actualizó el 2026-11-02 por A-02 y A-03, pero esta línea quedó con el texto anterior a C-03.
- **Sugerencia:** actualizar ADR-0001 para que diga "detalle de cada gasto y del expediente, sin datos de unidades específicas (RN-036)" y citar C-03.

### RQ-A05 · Códigos HTTP en conflicto: 403 en la matriz, 422 en RN-102
- **Tipo:** Contradicción
- **Severidad:** ALTA
- **Ubicación:** matriz, leyenda de 🔸 ("`403` outside the condition"), filas B3, B5, B6 y H1, y P4 · Adm (❌ = 403); ADR-0003, Confirmation ("Administrator cannot assign `BoardMember` through the API (`403`)"); RN-102 (todo rechazo por regla de negocio → `422`); RN-066, RN-075, RN-077, RN-083, RN-086 y RN-097 (cada una con su código de error).
- **Problema:** varios rechazos tienen a la vez un código de negocio (y por RN-102 deben responder 422) y una celda de la matriz que espera 403:
  - `RESERVATION_UNIT_NOT_LINKED` y `RESERVATION_UNIT_RENTED` frente a B3 🔸;
  - `RESERVATION_CANCELLATION_TOO_LATE` frente a B6 🔸;
  - `RESERVATION_GUEST_EDIT_TOO_LATE` frente a B5 🔸;
  - `HIRE_NOT_EDITABLE` frente a la condición de H1;
  - `ROLE_ASSIGNMENT_NOT_ALLOWED` frente a P4 · Adm ❌ y a ADR-0003.

  Como los tests de la matriz comprueban el código HTTP de cada celda, siempre fallará uno de los dos tests, el de la regla o el de la matriz.
- **Sugerencia:** definir un criterio único (por ejemplo, 403 cuando el usuario no tiene permiso sobre el recurso y 422 cuando una regla de estado o de tiempo lo impide) y aplicarlo tanto en RN-102 como en la leyenda de la matriz, celda por celda.

### RQ-A06 · La Junta Directiva y la unión de roles chocan con el PRINCIPIO-006
- **Tipo:** Contradicción / Ambigüedad
- **Severidad:** ALTA
- **Ubicación:** PRINCIPIO-006 ("Un Resident o NonResidentOwner ve solo … nunca datos de otros residentes"); matriz, regla 3 (unión de permisos), filas P7 y S2b; RN-059 (log visible para la Junta Directiva); RN-065 (Ana es Resident y BoardMember); RN-036 (solo restringe "los roles Resident y NonResidentOwner"); alcance §5 ("quien tiene acceso financiero … **nunca** morosidad … ni datos de unidades específicas"); brief §2 (Junta Directiva: acceso "Total (supervisión)"); glosario #34 ("Solo lo ven … el Administrator y la Junta Directiva"); RN-047 ("⚠️ Falta confirmar que la Junta Directiva puede ver el estado de cuenta"); matriz, Gaps ("P-06").
- **Problema:** hay varios conflictos encadenados.
  1. Con la regla de unión, Ana (Resident y BoardMember) ve el log de auditoría (con nombres y vínculos de vecinos) y, en S2b, el estado de cuenta de cada unidad. Eso contradice el "nunca" del PRINCIPIO-006, que se aplica al rol Resident que ella tiene.
  2. RN-036 solo protege las vistas de Resident y NonResidentOwner, mientras que el alcance §5 prohíbe los datos por unidad a **todo** el que tiene acceso financiero, Junta incluida. El brief le da a la Junta acceso "Total".
  3. El glosario #34 afirma como un hecho que la Junta ve el estado de cuenta, la matriz marca S2b · Brd con ✅, y RN-047 y la sección Gaps lo dejan pendiente.
  4. La pendiente se cita con dos códigos distintos: "A-05" en RN-047 y "P-06" en la matriz.
- **Sugerencia:** que el autor decida si la regla más restrictiva del PRINCIPIO-006 prevalece sobre la unión de roles, y si la Junta Directiva puede ver datos por unidad. Después, alinear RN-036, el alcance §5, el glosario #34 y la matriz (S2b · Brd en ⛔ mientras siga pendiente), y unificar la referencia (A-05 o P-06).

### RQ-A07 · Se tratan datos de invitados y del padrón sin el consentimiento que exige el PRINCIPIO-004.1, y eso no figura como bloqueante
- **Tipo:** Contradicción (con la constitución)
- **Severidad:** ALTA
- **Ubicación:** PRINCIPIO-004.1 ("Se recoge el consentimiento informado del titular antes de tratar sus datos"); RN-087 (solo un aviso, mostrado al anfitrión); RN-057 (nombre y correo antes del consentimiento); alcance §0, "Bloqueantes para operar con datos reales".
- **Problema:** el invitado es el titular de sus datos y nunca da su consentimiento: el aviso de RN-087 lo ve el residente, no el invitado. RN-057 guarda nombre y correo antes de que la persona acepte. Ambas reglas llevan ⚠️ Q18, pero el principio no admite excepciones, y la lista de bloqueantes para operar con datos reales no las incluye. Tampoco incluye la inscripción del banco de datos (Q18) ni los valores de ADR-0008 (RQ-C02).
- **Sugerencia:** agregar estas piezas a la lista de bloqueantes del alcance §0 y registrar en un ADR la base legal del tratamiento previo al consentimiento, o enmendar el PRINCIPIO-004.1 con un PR humano. La decisión de fondo es legal (Q18).

### RQ-A08 · El aforo, el anfitrión y la reserva hecha por el Administrator son ambiguos
- **Tipo:** Ambigüedad / Regla faltante
- **Severidad:** ALTA
- **Ubicación:** RN-023 (⚠️ A-09); glosario #51; RN-076; matriz B3.
- **Problema:** RN-023 es MUST y es el corazón de M3, pero no dice cómo se cuentan el anfitrión y los acompañantes: si se declaran o si son un número fijo. Los términos "anfitrión" y "acompañantes de la unidad" no están en el glosario. Cuando el Administrator reserva a nombre de una unidad (RN-076), no se sabe quién es el anfitrión, ni si a él también se le aplican RN-077 (unidad alquilada), RN-079 (anticipación) y RN-080 (límite mensual). RN-076 dice "cualquier unidad", lo que puede leerse como que no aplica ninguna regla.
- **Sugerencia:** que el autor resuelva A-09, defina "anfitrión" y "acompañante" en el glosario y escriba una regla explícita sobre qué validaciones aplican a las reservas que crea el Administrator.

### RQ-A09 · No está claro si `Rejected` es un estado o un evento de la contratación
- **Tipo:** Ambigüedad / Contradicción
- **Severidad:** ALTA
- **Ubicación:** RN-096 (cuatro estados, incluido `Rejected`); RN-097 (solo se edita en `Draft`); RN-098 (rechaza y "devuelve a `Draft`", con ⚠️ A-06); glosario #29; RN-040.
- **Problema:** si `Rejected` es un estado en el que la contratación se queda, RN-097 impide corregirla y el ejemplo de RN-098 deja de valer. Si no lo es, RN-096 sobra o está mal. Tampoco se dice si el historial de rechazos se conserva y si los propietarios lo ven en el expediente (RN-041). RN-040 guarda una sola decisión, pero una contratación puede rechazarse, reenviarse y aprobarse, es decir, tener varias decisiones.
- **Sugerencia:** decidir si `Rejected` es un estado o un evento, y agregar una regla sobre el historial de decisiones y su visibilidad para los propietarios.

### RQ-A10 · Ninguna regla valida que la franja esté bien formada
- **Tipo:** Regla faltante
- **Severidad:** ALTA
- **Ubicación:** M3: RN-021, RN-022, RN-078 y RN-079; glosario #23.
- **Problema:** ninguna regla rechaza una franja con `fin ≤ inicio`. Una franja de 20:00 a 19:00, o de 20:00 a 20:00, pasa RN-021 (ambas horas están dentro del horario) y RN-022 (la duración es negativa o cero, así que no supera el máximo). Tampoco está definida la granularidad de la franja (minutos o segundos).
- **Sugerencia:** agregar una regla Unwanted con su propio código de error para las franjas cuyo fin no es posterior al inicio. El autor decide la granularidad y si existe una duración mínima.

### RQ-A11 · La excepción de merge del autor abre un hueco en el control de cambios de la constitución
- **Tipo:** Contradicción
- **Severidad:** ALTA
- **Ubicación:** encabezado de la constitución ("mediante un PR aprobado"); PRINCIPIO-009, "Control técnico" ("PR obligatorio, 1 aprobación"); PRINCIPIO-010, excepción del autor; ADR-0005 (el check solo detecta PR "from the agents' GitHub App").
- **Problema:**
  1. Con la excepción, el autor puede mergear sin aprobación un PR que cambie `00-constitucion.md`. El encabezado exige un "PR aprobado".
  2. El "Control técnico" sigue diciendo "1 aprobación" sin mencionar el bypass que describe ADR-0005.
  3. El check del CI solo reconoce a la GitHub App. Un agente que trabaja en local con la cuenta del autor (con el trailer `Co-Authored-By`) no es detectado, y su trabajo se mergea con la excepción del autor. Es justo lo que describe ADR-0009 (ver RQ-C01).
- **Sugerencia:** decidir si los cambios a `00-constitucion.md` y a `.github/workflows/` quedan fuera de la excepción del autor. Además, convendría que el check rechace también los commits que tengan el trailer `Co-Authored-By` de un agente, y que el texto del "Control técnico" se actualice.

### RQ-A12 · El log de auditoría no tiene contenido, retención ni seudonimización definidos
- **Tipo:** Regla faltante / Contradicción
- **Severidad:** ALTA
- **Ubicación:** RN-059 (guarda "el valor anterior, el valor nuevo, quién hizo el cambio"); RN-062; glosario #50 (lo contrapone al log técnico, "que no contiene datos personales"); PRINCIPIO-004.5; RN-061.
- **Problema:** el log de auditoría contiene datos personales (vínculos, nombres, autores de los cambios), pero ninguna regla dice si se cifra, cuánto tiempo se guarda ni si se seudonimiza a los 90 días como los demás registros. Si se conserva para siempre, choca con el PRINCIPIO-004.5. Si se archiva, la Junta Directiva pierde la trazabilidad. Además, es visible para la Junta (ver RQ-A06).
- **Sugerencia:** agregar reglas sobre los campos del log de auditoría, su cifrado (PRINCIPIO-005) y su tratamiento dentro de `DataRetentionJob`.

---

## Hallazgos MEDIOS

### RQ-M01 · El flujo de consentimiento tiene vacíos
- **Tipo:** Ambigüedad / Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-010, RN-070, RN-071; RN-008, RN-064, RN-014, RN-088 y RN-099; glosario #18.
- **Problema:**
  - RN-010 bloquea "pantallas" pero no dice nada de los endpoints de la API, así que un agente podría proteger solo la interfaz.
  - RN-070 deja la cuenta "sin activar", un estado que no está definido (RN-073 habla de "desactivar"). Tampoco se dice si el usuario puede reconsiderar, ni qué pasa si un usuario ya activo rechaza una versión nueva (RN-071).
  - Quien rechaza conserva nombre y correo mientras su vínculo siga activo, sin consentimiento.
  - No se define el orden de los pasos del inicio de sesión: TOTP, selector de condominio, consentimiento, aviso de TLS, avisos de cancelación y contador de contrataciones.
  - No se dice si el consentimiento es por usuario global o por condominio (titular del banco de datos, Q18).
- **Sugerencia:** definir los estados de la cuenta y el orden de los pasos del inicio de sesión. Extender RN-010 a "ninguna solicitud" y decidir el alcance del consentimiento.

### RQ-M02 · No se define cómo invitar a una persona que ya tiene cuenta en otro condominio
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-007; glosario #17 y #42; ADR-0003.
- **Problema:** RN-007 crea cuentas a partir de una invitación, pero el usuario es global. Si Luis ya tiene cuenta, no se sabe si la invitación de un segundo condominio crea otra cuenta, le pide una contraseña nueva o solo agrega el vínculo.
- **Sugerencia:** agregar una regla para el caso "invitación a un correo que ya tiene cuenta".

### RQ-M03 · Unicidad y normalización del DNI
- **Tipo:** Contradicción / Ambigüedad · **Severidad:** MEDIA
- **Ubicación:** RN-069 ("del mismo condominio"); ADR-0004, More Information ("the uniqueness scope of DNI … is not decided"; "the normalization rule … must be fixed"); glosario, campo `DocumentNumber` ("DNI o carné de extranjería").
- **Problema:** RN-069 decide algo que el ADR declara abierto. Las reglas de normalización no están fijadas. Como el índice ciego no incluye el tipo de documento, un DNI y un carné de extranjería con los mismos dígitos chocarían.
- **Sugerencia:** cerrar en ADR-0004 el alcance de la unicidad, la normalización y si el tipo de documento entra en el índice ciego.

### RQ-M04 · `RetentionArchiveReader`: ¿séptimo rol o rol de Azure?
- **Tipo:** Ambigüedad / Inconsistencia de glosario · **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-004.5 ("el rol `RetentionArchiveReader`"); PRINCIPIO-006 ("Los roles son exactamente estos"); RN-109; matriz P8; glosario (no aparece).
- **Problema:** no queda claro si es un rol de la aplicación, lo que violaría "exactamente seis roles", o un rol de Azure RBAC/Entra. RN-109 habla de "cualquier usuario" de la aplicación.
- **Sugerencia:** definirlo en el glosario como un rol de infraestructura (si lo es) y aclararlo en ADR-0006.

### RQ-M05 · La clave por titular no encaja con los invitados
- **Tipo:** Ambigüedad · **Severidad:** MEDIA
- **Ubicación:** RN-108; ADR-0002 ("Each data subject (person)"); glosario #24 y #45; RN-028.
- **Problema:** los invitados no son `Person` y no tienen identificador de titular. No se sabe si cada invitado tiene su propia clave (25 claves de Key Vault por reserva), si se usa una por reserva o si se reconoce al mismo invitado en varias reservas para una futura cancelación ARCO.
- **Sugerencia:** definir qué es un "titular" para el invitado y cuál es la granularidad de su clave.

### RQ-M06 · No se definen la inmutabilidad del archivo frío ni cómo se prueba
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-004.5; ADR-0006, Confirmation; alcance §6 (Blob Archive).
- **Problema:** no se fija el período de la política de inmutabilidad. Si supera el año, la política de ciclo de vida no podrá borrar los blobs al cumplirse 1 año. Tampoco hay una regla para el borrado definitivo a 1 año, ni se dice contra qué Storage corren en local y en el CI los tests de integración del archivo frío (el emulador local podría no soportar el nivel Archive ni la inmutabilidad; hay que verificarlo).
- **Sugerencia:** fijar en un ADR el período de inmutabilidad, la regla del borrado al año y el entorno de prueba del archivo frío.

### RQ-M07 · RN-080 no dice qué reservas cuentan para el límite mensual
- **Tipo:** Ambigüedad · **Severidad:** MEDIA
- **Ubicación:** RN-080.
- **Problema:** el ejemplo habla de reservas "confirmadas", pero la regla dice "reservas". No se sabe si cuentan las `Cancelled` y las `Completed`.
- **Sugerencia:** listar los estados que cuentan para el límite.

### RQ-M08 · Faltan validaciones y cambios de la configuración de áreas
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-082; el párrafo de "reglas de un área común" en §3; matriz B1.
- **Problema:** solo se valida el horario. Ninguna regla impide un aforo de 0, una duración máxima de 0, una anticipación de 0 o un límite mensual de 0. Tampoco se dice qué pasa con las reservas confirmadas cuando el Administrator reduce el aforo o el horario, ni cuando desactiva o elimina un área.
- **Sugerencia:** agregar reglas Unwanted para los valores de configuración y una regla que defina el efecto de los cambios sobre las reservas futuras.

### RQ-M09 · No se define qué es una "reserva propia" ni a quién se notifica
- **Tipo:** Ambigüedad · **Severidad:** MEDIA
- **Ubicación:** RN-083 ("su propia reserva"); RN-088 ("cada reserva suya"); matriz B4 ("Reservations of a unit"), B5 y B6 ("own reservation").
- **Problema:** la reserva es de la unidad, pero la crea una persona. No se sabe si un conviviente puede cancelar o editar la reserva que hizo otro miembro de la unidad, ni a quién avisa RN-088 cuando la reserva la creó el Administrator (RN-076).
- **Sugerencia:** definir "reserva propia" en el glosario y precisar a quién se notifica.

### RQ-M10 · La vista de disponibilidad puede revelar qué unidad reservó
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** matriz B2; alcance M3; PRINCIPIO-006.
- **Problema:** ninguna regla dice qué muestra la disponibilidad a los residentes. Si muestra la unidad que reservó, viola el PRINCIPIO-006.
- **Sugerencia:** agregar una regla con los datos que muestra la disponibilidad.

### RQ-M11 · Faltan los flujos alternativos de la portería
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-026, RN-029, RN-030; matriz G2 y B5 · Con ⛔; W12.
- **Problema:** no se dice qué hace el Concierge cuando llega una persona que no está en la lista, si puede marcar dos veces al mismo invitado, si puede marcar el ingreso fuera de la franja o si puede deshacer una marca. RN-026 fija 60 s para retirar una reserva cancelada, pero no hay un plazo equivalente para que aparezcan las reservas nuevas del día ni los invitados que se agregan hasta el inicio (RN-086).
- **Sugerencia:** agregar reglas para estos casos, o declararlos fuera de alcance de forma explícita.

### RQ-M12 · No se sabe si los gastos anulados entran en los totales, ni quién anuló
- **Tipo:** Ambigüedad / Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-035, RN-092, RN-032; glosario #49.
- **Problema:** RN-035 no dice si los totales por categoría excluyen los gastos anulados. RN-092 registra el motivo y la fecha-hora, pero no quién anuló. Ninguna regla guarda quién registró el gasto, aunque la transparencia ("quién") es el centro del beneficio 2.
- **Sugerencia:** precisar el tratamiento de los anulados en los totales y registrar al autor del registro y de la anulación.

### RQ-M13 · "Exactamente 2 decimales" es ambiguo en la API
- **Tipo:** Ambigüedad · **Severidad:** MEDIA
- **Ubicación:** RN-093; RN-055.
- **Problema:** un número JSON no conserva los ceros finales (`1200.00` se serializa como `1200`), así que aplicada al pie de la letra la regla rechazaría montos válidos. Tampoco se sabe si `1200.5` se rechaza. No hay monto máximo.
- **Sugerencia:** definir el formato de entrada (cadena decimal o número con máximo 2 decimales) y decidir si existe un máximo.

### RQ-M14 · El modelo no registra qué cotización ganó ni identifica a los proveedores
- **Tipo:** Regla faltante / Inconsistencia de glosario · **Severidad:** MEDIA
- **Ubicación:** RN-037, RN-097 (el contraejemplo habla de la "cotización ganadora"), RN-052, RN-032; glosario #16 ("En esta versión es un dato dentro de una contratación") y #27.
- **Problema:** ninguna regla obliga a marcar la cotización o el proveedor elegidos. "Proveedores distintos" (RN-037) no dice con qué criterio se distinguen (¿RUC?), y el RUC 10 está cifrado sin índice ciego (ADR-0004 solo cubre correo y DNI). Además, los gastos también tienen proveedor (RN-032), lo que contradice el glosario #16, según el cual el proveedor solo existe dentro de una contratación.
- **Sugerencia:** definir la identidad de `Vendor` (RUC y cómo se valida), la marca de la cotización elegida y si los gastos referencian la entidad `Vendor` o un texto.

### RQ-M15 · Los identificadores `SupplierHire` contradicen la regla del glosario sobre "supplier"
- **Tipo:** Inconsistencia de glosario · **Severidad:** MEDIA
- **Ubicación:** glosario, "Ambigüedad: supplier" ("`Supplier` en el código significa únicamente el rol"); glosario #29 y #31; matriz H1 a H3; ADR-0001 (`NonResidentOwner_CanReadSupplierHires_Returns200`).
- **Problema:** la entidad se llama `SupplierHire` y `SupplierHireFile`, y los tests `Authz_SupplierHires_*`, en contra de la regla que el propio glosario establece. El renombre a `Vendor*` está "pendiente" (M-24), y un agente no sabe qué nombre usar.
- **Sugerencia:** decidir el nombre ahora, antes de escribir código, y propagarlo al glosario, a la matriz y a ADR-0001.

### RQ-M16 · El traspaso de administradora y la operación de plataforma están incompletos
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-062, RN-063; ADR-0003; glosario #44; brief Q15.
- **Problema:**
  - Ninguna regla dice cómo se sabe qué Concierges pertenecen a la administradora saliente: no hay ningún atributo que vincule al personal con una empresa, y el caso de la seguridad tercerizada sigue abierto (Q15).
  - RN-062 solo restablece el MFA del Administrator; un BoardMember que pierde el TOTP y sus códigos de recuperación queda sin salida.
  - No se define cómo se autentica el operador de plataforma (credenciales, MFA, acceso a producción).
- **Sugerencia:** agregar reglas sobre estos tres puntos.

### RQ-M17 · Quedan decisiones abiertas dentro de reglas MUST de M6
- **Tipo:** Ambigüedad · **Severidad:** MEDIA
- **Ubicación:** RN-039 (⚠️ Q24: basta un BoardMember o hace falta mayoría); RN-041 (⚠️ Q25: visibilidad según el estado); matriz H3 (sin condición de estado).
- **Problema:** con la matriz actual, los propietarios podrían ver contrataciones en `Draft`, y una sola persona decide en nombre de la Junta.
- **Sugerencia:** priorizar Q24 y Q25 antes de implementar M6. Mientras tanto, la matriz debería fijar un comportamiento por defecto de forma explícita.

### RQ-M18 · Hay reglas compuestas y patrones EARS mezclados
- **Tipo:** Debilidad de formato · **Severidad:** MEDIA
- **Ubicación:**
  - RN-092: exige motivo **y** muestra, y además lleva un código Unwanted dentro de una regla Event-driven;
  - RN-098: tres acciones y un código Unwanted;
  - RN-102: cuatro obligaciones;
  - RN-103: dos condiciones;
  - RN-059: cuatro eventos;
  - RN-065: DEBE y PUEDE juntos;
  - RN-062: tres eventos;
  - RN-025: excepción por referencia ("salvo RN-077").
- **Problema:** las reglas compuestas no se pueden verificar de forma atómica, y el código de error queda colgado de un patrón que no le corresponde.
- **Sugerencia:** dividir cada una en reglas atómicas, cada una con su patrón, su código y su test.

### RQ-M19 · Faltan reglas de cifrados TLS y de TLS interno
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** PRINCIPIO-005 ("cifrados CBC … prohibidos"; TLS 1.3 entre servicios internos); RN-013 (solo TLS 1.0 y 1.1); RN-014 (⚠️ Q31); alcance §6 ("Confirmar que Azure SQL Database … admite TLS 1.3 como versión mínima").
- **Problema:** no hay reglas para los cifrados permitidos con TLS 1.2 ni para el TLS 1.3 interno. La dependencia de Azure SQL con TLS 1.3 no está registrada como pregunta abierta y podría impedir cumplir el principio.
- **Sugerencia:** agregar esas reglas y registrar la verificación de Azure SQL como una pregunta con responsable.

### RQ-M20 · Los adjuntos no tienen validación ni cifrado de campo
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-033, RN-046, RN-106 (⚠️ Q28); PRINCIPIO-005 ("todos los datos personales … se cifran a nivel de campo").
- **Problema:** no hay formatos, tamaño máximo ni escaneo de malware definidos para archivos que se sirven a muchos usuarios. Las constancias y los comprobantes pueden contener datos personales y bancarios, pero solo se exige un contenedor privado, sin el cifrado con claves de Key Vault que pide el principio.
- **Sugerencia:** resolver Q28 y decidir si los adjuntos se cifran con claves gestionadas por el cliente o a nivel de aplicación.

### RQ-M21 · Falta el ADR de la librería Argon2id
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** alcance §6 ("Elegirla mediante un ADR"); RN-009; ADR-0001 a ADR-0009 (ninguno trata este tema).
- **Problema:** RN-009 es MUST en M2, y un agente no puede añadir la dependencia sin aprobación (PRINCIPIO-009.4). Sin el ADR, M2 queda bloqueado.
- **Sugerencia:** escribir el ADR con la librería elegida, su licencia y su estado de mantenimiento.

### RQ-M22 · La descripción del gasto no está definida
- **Tipo:** Inconsistencia de glosario · **Severidad:** MEDIA
- **Ubicación:** RN-036 ("La descripción de un gasto es texto libre", ⚠️ M-20); glosario #27 (no menciona la descripción); alcance M5 (monto, fecha, categoría, proveedor y comprobante).
- **Problema:** RN-036 habla de un campo que no existe en la definición del gasto. Además, el PDF del comprobante puede contener datos de una unidad específica, y ninguna validación puede impedirlo.
- **Sugerencia:** agregar el campo al glosario y resolver M-20 tanto para la descripción como para el contenido de los comprobantes.

### RQ-M23 · Faltan validaciones de las fechas de los vínculos
- **Tipo:** Regla faltante · **Severidad:** MEDIA
- **Ubicación:** RN-001, RN-002; glosario #6; ADR-0001.
- **Problema:** nada impide una `EndDate` anterior a la `StartDate`, dos vínculos iguales y superpuestos de la misma persona con la misma unidad, ni dos inquilinos superpuestos en una unidad.
- **Sugerencia:** agregar reglas Unwanted con su código de error, según lo que decida el autor.

---

## Hallazgos BAJOS

### RQ-B01 · La marca ⚠️ se usa de forma inconsistente
- **Tipo:** Debilidad de formato · **Severidad:** BAJA
- **Ubicación:** RN-036, RN-064, RN-074, RN-098 y RN-108 (tienen la nota ⚠️ en el cuerpo, pero no en el encabezado); RN-047 (el encabezado cita Q28, pero el cuerpo habla de A-05).
- **Problema:** la convención dice que la regla "marcada con ⚠️" puede cambiar, pero estas reglas no están marcadas en el encabezado, que es donde un agente busca la marca.
- **Sugerencia:** poner la marca en el encabezado de todas ellas.

### RQ-B02 · Quedan notas desactualizadas y referencias cruzadas que no coinciden
- **Tipo:** Inconsistencia de glosario / Contradicción · **Severidad:** BAJA
- **Ubicación:**
  - glosario #6 ("falta corregir el ADR-0001", aunque ADR-0001 ya se actualizó el 2026-11-02);
  - alcance §5 ("falta aclararlo en el PRINCIPIO-002", aunque la versión 1.1 ya lo aclara);
  - ADR-0002 ("RN-005, RN-028 and RN-040 must be updated") y ADR-0006 ("`02-alcance.md` §0 must move…"), que ya están aplicados;
  - ADR-0001, Pros and Cons ("a role is global to the user"), que contradice los roles por condominio de ADR-0003;
  - ADR-0003 (Q19 y Q24 para el respaldo del traspaso) frente a RN-063 (Q9 y Q24).
- **Problema:** estas notas confunden sobre qué está vigente.
- **Sugerencia:** limpiar las notas que ya se aplicaron y unificar las referencias.

### RQ-B03 · Hay identificadores usados en las reglas que no están en el glosario
- **Tipo:** Inconsistencia de glosario · **Severidad:** BAJA
- **Ubicación:** tabla "Identificadores de campos" del glosario. Faltan `decidedByRole` (RN-040), `status`, `cancelledBy` y `cancelledAt` (RN-084), `RequiresAccessibleElevator` (RN-006), `Email` (ADR-0004) y `RetentionArchiveReader`.
- **Problema:** el glosario dice que, si un término no está, no se inventa un sinónimo. Sin estas entradas, los agentes usarán nombres distintos.
- **Sugerencia:** agregarlos a la tabla.

### RQ-B04 · RN-094 expresa un plazo en meses
- **Tipo:** Debilidad de formato · **Severidad:** BAJA
- **Ubicación:** RN-094; Convenciones ("los tiempos en segundos").
- **Problema:** "12 meses" no es un valor en segundos y deja sin definir el caso límite (un gasto del 2025-11-20 registrado el 2026-11-20).
- **Sugerencia:** expresar el plazo según la convención y dar un ejemplo del caso límite.

### RQ-B05 · El ejemplo de RN-016 contradice ADR-0008
- **Tipo:** Contradicción · **Severidad:** BAJA
- **Ubicación:** RN-016, contraejemplo ("hasta que vence su token, 30 días después"); ADR-0008 (sesión de 12 h como máximo).
- **Problema:** el ejemplo sugiere tokens de 30 días.
- **Sugerencia:** cambiar el ejemplo para que sea neutral respecto a la duración de la sesión.

### RQ-B06 · "Al mismo tiempo" en RN-081 es vago
- **Tipo:** Debilidad de formato · **Severidad:** BAJA
- **Ubicación:** RN-081.
- **Problema:** "al mismo tiempo" no es un criterio verificable. Lo que importa es la concurrencia antes de guardar.
- **Sugerencia:** redactarla como "Si al guardar una reserva existe otra `Confirmed` superpuesta guardada antes…".

### RQ-B07 · Hay reglas MUST para funcionalidades Should
- **Tipo:** Ambigüedad · **Severidad:** BAJA
- **Ubicación:** RN-046, RN-047 y RN-049 (MUST para S2 y S4); Convenciones, "Prioridad".
- **Problema:** un agente podría entender que tiene que construir S2 y S4 en el MVP.
- **Sugerencia:** aclarar que el MUST se aplica solo cuando la funcionalidad se construya.

### RQ-B08 · Algunos ejemplos de la constitución siguen apuntando a funcionalidades fuera de alcance
- **Tipo:** Contradicción · **Severidad:** BAJA
- **Ubicación:** PRINCIPIO-005, ejemplo ("En un emulador con Android 9 la app…", cuando W1 deja fuera la app); PRINCIPIO-006, ejemplo ("registro de visitantes", que es W12); ADR-0009, Confirmation (el grep busca "visitors", en inglés).
- **Problema:** el objetivo de M-18 no se cumplió del todo, y el grep en inglés no detecta los textos en español.
- **Sugerencia:** cambiar los ejemplos, con un PR humano, y usar términos en español en el grep.

### RQ-B09 · El formato del número de unidad no valida el piso ni la posición
- **Tipo:** Regla faltante · **Severidad:** BAJA
- **Ubicación:** RN-058; glosario #3; brief §2 (hasta 20 pisos y 6 departamentos por piso).
- **Problema:** se aceptarían `2507` o `0502`.
- **Sugerencia:** que el autor decida si se valida el rango.

### RQ-B10 · K1 y K4 no se pueden calcular con los datos que hoy se registran
- **Tipo:** Regla faltante · **Severidad:** BAJA
- **Ubicación:** alcance S4 (calcula K1, K2, K4 y K5); brief K4 ("interacciones fuera de la plataforma"); glosario #54.
- **Problema:** K4 mide algo que ocurre fuera del sistema, y ninguna regla registra los inicios de sesión por unidad que necesita K1.
- **Sugerencia:** sacar K4 de S4 o definir cómo se mide, y agregar una regla de registro de inicios de sesión.

### RQ-B11 · El rol Supplier no tiene una regla que impida asignarlo
- **Tipo:** Regla faltante · **Severidad:** BAJA
- **Ubicación:** RN-042; matriz, columna Sup.
- **Problema:** RN-042 prohíbe crear cuentas "para los proveedores", algo que no se puede probar. Ninguna regla impide asignar el rol `Supplier` a un usuario.
- **Sugerencia:** agregar una regla que rechace la asignación de ese rol en esta versión.

---

## Puntaje de madurez: 3 / 5

**Justificación.**

Fortalezas:
- Las reglas usan EARS de forma consistente, con ejemplos y contraejemplos sintéticos y concretos.
- Los rechazos tienen códigos de error estables y un formato de respuesta único (RN-102).
- Existe una matriz de permisos con un test por fila.
- Los hallazgos de la auditoría anterior son trazables.
- Las decisiones de arquitectura están registradas en ADR.
- Las preguntas abiertas están marcadas de forma explícita.

M3, M4 y M5 están casi listos para un agente.

El pack todavía no está listo para que un agente lo implemente sin escalar. Estas son las razones:
1. **Gobierno:** la versión vigente de la constitución se aprobó con un procedimiento que la propia constitución prohíbe (RQ-C01), y la excepción de merge deja un hueco en el control de cambios (RQ-A11).
2. **Identidad y retención** (base de M1 y M2): el alcance de la unicidad del correo es incompatible con el usuario global (RQ-C04), el plazo de retención puede empezar para usuarios activos (RQ-C03) y no hay una regla que archive a las personas (RQ-A01).
3. **Contradicciones entre documentos aceptados:** ADR-0008 es aceptado y no decidido a la vez (RQ-C02), ADR-0001 contradice RN-090 (RQ-A04) y la matriz espera 403 donde RN-102 exige 422 (RQ-A05).
4. **Ambigüedades abiertas en reglas MUST** del beneficio central (RQ-A08 y RQ-A09).

Si se resuelven las 4 CRÍTICAS y las 12 ALTAS, el pack podría subir a 4. Para llegar a 5, además, habría que cerrar las preguntas que hoy condicionan reglas MUST: Q11, Q18, Q21, Q24, Q25, Q28 y Q31.
