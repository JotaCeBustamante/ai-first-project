# CondoHub — Project Brief

> **Fase:** Descubrimiento (Agente Analyst, BMAD)
> **Fecha:** 2026-11-01
> **Última actualización:** 2026-11-02 (auditoría QA, [auditoria-qa.md](auditoria-qa/auditoria-qa.md))
> **Autor:** Jose Bustamante
> **Contexto:** Ejercicio académico individual del Diploma en AI-First Software Architecture
> **Documentos relacionados:** [04-glosario.md](04-glosario.md) · [05-preguntas-abiertas.md](05-preguntas-abiertas.md) · [auditoria-qa.md](auditoria-qa/auditoria-qa.md)

**Términos.** "Junta Directiva" son los propietarios elegidos para supervisar la gestión (rol `BoardMember`). "Junta de Propietarios" es la asamblea de todos los propietarios (Ley N.° 27157). Ambos se definen en [04-glosario.md](04-glosario.md) (A-19 de la auditoría).

**Convención de evidencia.** En este documento se distinguen tres tipos de afirmaciones:
- **[Evidencia]** viene de la experiencia directa del autor como residente de un edificio multifamiliar en Lima.
- **[Supuesto]** se considera razonable, pero no está validado.
- **[Qn]** remite a la pregunta abierta correspondiente.

---

## 1. Problema y oportunidad

### El problema

Los edificios multifamiliares de Lima con 1 a 4 torres (hasta ~480 departamentos) gestionan su operación diaria con **correo, WhatsApp, Excel y registros en papel**. Ninguno de estos canales centraliza la información ni la hace visible para los residentes y la Junta Directiva.

Esto genera dos dolores distintos:

**1. Dolor operativo: lentitud y pérdida de solicitudes**
- **[Evidencia]** Reservar un área común requiere 4 pasos manuales: (1) enviar la solicitud por correo, (2) esperar la confirmación, que llega aproximadamente un día después, (3) registrar a mano a los invitados en la recepción del piso 1 y (4) pedir el acceso el día del evento.
- **[Evidencia]** Una avería puede tardar **hasta 3 días** en ser atendida.
- **[Evidencia]** El administrador lleva la información de residentes, pagos, permisos y solicitudes en Excel. No puede responder todos los mensajes de WhatsApp y no tiene una vista centralizada y rápida.

**2. Dolor de confianza: falta de transparencia**
- **[Evidencia]** Los propietarios no ven por qué se eligió a un proveedor, qué cotizaciones se compararon, quién aprobó la contratación, en qué se usaron las cuotas de mantenimiento ni cómo avanzan las reparaciones.
- **[Evidencia]** En el edificio de referencia hubo **2 cambios de empresa administradora** por falta de transparencia y malos tratos. El reclamo se discute en asambleas.

### Qué se pierde hoy

| Quién | Qué pierde |
|---|---|
| Residentes | ~1 día por reserva; hasta 3 días por avería; sin visibilidad de su dinero |
| Administrador | Tiempo en canales dispersos; mensajes sin responder; deterioro de la relación con los propietarios |
| Junta Directiva | Capacidad de supervisar presupuestos, proveedores y reparaciones |
| Condominio | Historial y continuidad. Cada cambio de administradora puede llevarse la información, porque vive en su Excel **[Supuesto, Q9]** |

### La oportunidad

- La comunidad objetivo **ya está digitalizada**. La mayoría usa smartphone y hay pocos adultos mayores con dificultades tecnológicas **[Evidencia]**.
- La portería ya cuenta con **una computadora y pantalla**, y el personal tiene smartphone **[Evidencia]**.
- La falta de transparencia ya provoca **cambios de administración**. Esto sugiere que la Junta Directiva tiene una motivación real para exigir una solución.
- El tamaño del mercado en Lima y la oferta de la competencia están **sin investigar** **[Q1, Q3]**.

---

## 2. Usuarios y segmentos objetivo

### Segmento de mercado

**Condominios de edificios multifamiliares en Lima Metropolitana**, de 1 a 4 torres de hasta 20 pisos con hasta 6 departamentos por piso (**~120 a ~480 unidades**), gestionados por **una empresa administradora** contratada por los propietarios.

En general, una empresa administra un solo condominio, que puede tener varias torres, y no una cartera de condominios **[Evidencia]**.

### Usuarios

| Usuario | Quién es | Necesidad principal | Acceso a información sensible |
|---|---|---|---|
| **Empresa administradora** | Empresa elegida por los propietarios. Hoy trabaja en Excel | Tener en un solo lugar la información de residentes, pagos, permisos y solicitudes, con control rápido | Total (operativa) |
| **Personal operativo** | Conserjes y porteros, en su mayoría empleados de la administradora. Usan smartphone y la PC de portería | Saber quién tiene una reserva, quiénes son los invitados y a quién dar acceso | Limitado a la operación diaria |
| **Junta Directiva** | Propietarios elegidos para supervisar la gestión | Supervisar mantenimientos, presupuestos y proveedores; dar seguimiento a reparaciones | Total (supervisión) |
| **Propietario** | Dueño de la unidad, viva o no en el edificio | Ver recibos, anuncios de juntas y uso de cuotas; reservar; reportar averías; votar | Presupuestos y decisiones |
| **Inquilino** | ~30% de las unidades en el edificio de referencia **[Evidencia]** | Reservar áreas comunes, reportar averías y recibir anuncios | **No** ve presupuestos ni vota |

### Diferencias relevantes entre segmentos

- **Propietario frente a inquilino:** el derecho de voz y voto, y la visibilidad financiera, son exclusivos del propietario.
- **Propietario que no reside en el edificio:** no está claro si participa activamente o delega en su inquilino **[Q14]**.
- **Personal operativo:** se asume que es empleado de la administradora. Falta validar el caso de una empresa de seguridad tercerizada **[Q15]**.

---

## 3. Propuesta de valor

### Lo que los usuarios no soltarían

El autor identificó dos beneficios que harían que un propietario no quiera volver a la forma anterior:

1. **Reservar un área común en minutos, no en un día.**
2. **Ver en qué se gasta cada sol de la cuota de mantenimiento y por qué se eligió a cada proveedor.**

### Propuesta por usuario

| Usuario | Hoy | Con CondoHub |
|---|---|---|
| Propietario e inquilino | Correo, espera de ~1 día y trámite en recepción | Reserva completa en **10 minutos como máximo** |
| Propietario e inquilino | Avería atendida en hasta 3 días, sin visibilidad | Avería atendida en **12 horas como máximo**, con seguimiento visible |
| Propietario y Junta Directiva | Sin información sobre proveedores ni gastos | Visibilidad de comparaciones, votaciones, aprobaciones, uso de cuotas y avances |
| Administradora | Excel, WhatsApp y mensajes sin responder | Información centralizada y menos carga de atención manual |
| Condominio | El historial depende de la administradora de turno | El historial se conserva aunque cambie la administradora **[Supuesto, Q9]** |

### Diferenciación

- **Transparencia como valor central.** La propuesta no es solo operativa, sino que busca reconstruir la confianza entre propietarios y administración.
- **Neutralidad.** CondoHub **no recibe ingresos de proveedores**, para que la plataforma no tenga incentivos en la elección de proveedores.
- **Frente a la competencia:** no se puede afirmar diferenciación hasta investigar Komunidad, EdifiSoft, Condominios Perú y ComunidadFeliz **[Q1, Q2]**.

---

## 4. Modelo de negocio preliminar

### Quién paga: modelo mixto

| Canal | Descripción | Quién paga |
|---|---|---|
| **B2B: alianza con administradoras** | La administradora incorpora CondoHub en su servicio | La administradora, o lo traslada a la cuota |
| **B2B2C: exigido por la Junta Directiva** | Si la administradora no está asociada, los propietarios lo exigen | Los propietarios, a través de la cuota de mantenimiento |

Aún no se define cuál canal se activa primero **[Q6]**.

### Precio y estimación de ingresos

- **Precio de referencia:** **S/ 5 por unidad al mes** **[Supuesto: disposición a pagar del autor, Q5]**.
- Equivale al **2.5%** de una cuota de mantenimiento de ~S/ 200 al mes **[Evidencia]**.

| Escenario | Unidades | Ingreso mensual | Ingreso anual |
|---|---|---|---|
| 1 torre | ~120 | S/ 600 | S/ 7,200 |
| 4 torres | ~480 | S/ 2,400 | S/ 28,800 |

### Ingresos descartados

- **Comisiones o pagos de proveedores:** descartados porque comprometen la neutralidad y la confianza.
- **Publicidad:** descartada por la misma razón.
- **Comisión por cobro de cuotas en línea (Yape, Plin):** sin definir **[Q8]**.

### Tensión del modelo por resolver

La administradora es la usuaria más intensiva, pero la transparencia la expone a más escrutinio por parte de los propietarios, que pueden reemplazarla. No está claro qué ganaría una administradora al asociarse **[Q7]**. Además, falta saber cuánto cobra una administradora para evaluar si S/ 5 por unidad es relevante frente a ese monto **[Q4]**.

---

## 5. Métricas de éxito (KPIs)

**Horizonte de medición:** 6 meses desde el inicio de uso en un condominio.

| # | KPI | Línea base actual | Meta | Cómo se mide |
|---|---|---|---|---|
| K1 | **Adopción mensual:** % de unidades con al menos un uso en el mes. "Uso" = al menos un inicio de sesión de una persona vinculada a la unidad en el mes (B-07 de la auditoría) | 0% | **≥ 50%** | Unidades activas en el mes ÷ total de unidades |
| K2 | **Tiempo para completar una reserva**, desde la solicitud hasta la confirmación con acceso habilitado | ~1 día (24 h) | **≤ 10 minutos** | Mediana entre la hora de solicitud y la hora de confirmación |
| K3 | **Tiempo de atención de averías** | Hasta 3 días (72 h) | **≤ 12 horas** | Percentil 90 entre el reporte y la atención. Falta definir si "atención" es la primera respuesta o la solución **[Q12]** |
| K4 | **Pasos manuales por reserva** | 4 (correo, confirmación, registro de invitados, solicitud de acceso) | **1** | Conteo de interacciones fuera de la plataforma |
| K5 | **Contrataciones de proveedores con sustento visible** (comparación y aprobación de la Junta Directiva accesibles para los propietarios) | 0% **[Supuesto]** | **100%** | Contrataciones con sustento visible ÷ total de contrataciones. Mientras no se defina desde qué monto un gasto exige una contratación, el denominador solo incluye las contrataciones registradas **[Q30]** |
| K6 | **Retención del condominio** como cliente | — | **≥ 1 renovación** al cumplir 6 meses | Condominios que renuevan ÷ condominios activos. No es medible dentro de las 16 semanas del proyecto (B-07 de la auditoría) |

**Métricas de seguimiento sin meta definida**, porque falta la línea base **[Q13]**:
- Volumen mensual de mensajes de WhatsApp a la administración: se espera que disminuya.
- Número de reclamos sobre transparencia registrados en actas de asamblea: se espera que disminuya.

---

## 6. Riesgos identificados y supuestos

### Riesgos

| # | Riesgo | Probabilidad | Impacto | Señal temprana |
|---|---|---|---|---|
| R1 | **Baja adopción.** Los vecinos siguen usando WhatsApp y correo. El autor lo identifica como el **riesgo principal** | Alta | Alto | K1 < 30% al tercer mes |
| R2 | **Resistencia de la administradora.** La transparencia expone su gestión y puede no querer asociarse | Media | Alto | Rechazo en las entrevistas a administradoras |
| R3 | **Competencia existente** que ya resuelve el problema a un precio similar o menor | Desconocida | Alto | Resultado de la investigación Q1 |
| R4 | **Incumplimiento normativo** en datos personales (Ley N.° 29733) o en la validez de votaciones digitales (Ley N.° 27157) | Media | Alto | Revisión legal **[Q18, Q19]** |
| R5 | **Disposición a pagar menor** que S/ 5 por unidad en otros edificios | Media | Medio | Encuesta a propietarios **[Q5]** |
| R6 | **Pérdida del cliente** si cambia la administradora asociada | Media | Medio | Rotación de administradoras en la cartera |
| R7 | **Alcance excesivo** para un proyecto individual de 16 semanas que incluye documentación y un prototipo funcional | Alta | Alto | Retraso en los entregables intermedios |

### Supuestos clave por validar

| # | Supuesto | Base actual | Validación |
|---|---|---|---|
| S1 | Los dolores del edificio de referencia se repiten en otros edificios del segmento | 1 edificio | Entrevistas en 3–5 edificios **[Q16]** |
| S2 | Los propietarios pagarían S/ 5 por unidad al mes | Opinión del autor | Encuesta **[Q5]** |
| S3 | La Junta Directiva tiene suficiente poder para exigir la herramienta a la administradora | 2 cambios de administración en el edificio de referencia | Entrevistas con Juntas Directivas |
| S4 | La comunidad está lo bastante digitalizada para adoptar la herramienta | Observación del autor | Encuesta de uso de smartphone y apps |
| S5 | Una reserva en 10 minutos es viable operativamente para la administración | Expectativa del autor | Validar con la administradora **[Q10]** |
| S6 | El historial del condominio pertenece a los propietarios y no a la administradora | Ninguna | Revisión legal **[Q9]** |

---

## 7. Restricciones conocidas

### Del proyecto académico

| Restricción | Detalle |
|---|---|
| **Fecha de entrega** | 20 de febrero de 2027, ~16 semanas desde el 1 de noviembre de 2026 |
| **Equipo** | Individual: una sola persona cubre todas las fases |
| **Presupuesto** | Sin definir **[Q20]** |
| **Entregable esperado** | Documentación **y prototipo funcional** **[Supuesto: probable según el autor; confirmar con las bases del Diploma, Q20]** |
| **Validación con usuarios** | Acceso a un solo edificio de referencia. Las entrevistas a otros edificios dependen del tiempo disponible |

### De negocio

- **Neutralidad:** no se aceptan ingresos de proveedores ni publicidad.
- **Precio de referencia:** S/ 5 por unidad al mes como máximo.
- **Segmento acotado:** edificios multifamiliares en Lima de 1 a 4 torres (~120 a ~480 unidades).

### Regulatorias (Perú)

- **Ley N.° 29733**, Ley de Protección de Datos Personales, y su reglamento (D.S. N.° 016-2024-JUS): tratamiento de datos de residentes, consentimiento y posible inscripción del banco de datos **[Q18]**.
- **Ley N.° 27157** y su reglamento: régimen de unidades inmobiliarias de propiedad exclusiva y común, Junta de Propietarios y validez de acuerdos y votaciones **[Q19]**.

### De acceso y permisos

- Los **inquilinos** no acceden a presupuestos ni votan.
- Solo los **propietarios** y la **Junta Directiva** participan en decisiones y en la supervisión financiera.