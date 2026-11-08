---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Defer ARCO requests and the virtual Libro de Reclamaciones until a pilot with real users is confirmed

## Context and Problem Statement

PRINCIPIO-004.6 requires that ARCO requests are registered with their legal due date and are visible to the administrator. PRINCIPIO-007 requires a virtual Libro de Reclamaciones under Ley N.° 29571. The constitution says its principles are not negotiable and that any conflict must be escalated to a human.

The business rules catalog ([03-reglas-de-negocio.md](../../03-reglas-de-negocio.md), "Alcance del catálogo") has no rules for either feature and forbids agents from implementing them until Q20 confirms a pilot with real users (audit M-23). [02-alcance.md](../../02-alcance.md) §0 lists both as **blockers for operating with real data**. The decision exists in the product documents, but it was never recorded as an ADR (PRINCIPIO-012), unlike the equivalent PIM decision (ADR-0006). The QA review of the user stories (2026-11-02) flagged this gap.

## Decision Drivers

- Record the deferral explicitly, so it is not read as a silent violation of PRINCIPIO-004.6 and PRINCIPIO-007.
- Keep the 16-week academic scope (Q20: final delivery on 2027-02-20, single author) under control.
- Never expose real residents to a platform without ARCO and the Libro de Reclamaciones.

## Considered Options

1. **Defer both features and block any use with real users until they exist.**
2. Build both features in the MVP.
3. Amend PRINCIPIO-004.6 and PRINCIPIO-007 through the author's own PR (PRINCIPIO-010).

## Decision Outcome

Chosen option: **"Defer both features and block any use with real users until they exist"**.

- The MVP is demonstrated **only with synthetic data** (PRINCIPIO-008). ARCO requests and the Libro de Reclamaciones are not implemented in it.
- No user stories or business rules are written for them until Q20 confirms a pilot with real users. Agents must not implement them while their rules do not exist.
- If a pilot is confirmed, both features become mandatory **before** the pilot starts, together with the other blockers in [02-alcance.md](../../02-alcance.md) §0.
- The constitution is not amended: both principles stay in force and apply in full to any operation with real users.

### Consequences

- Good, because the deferral is traceable and consistent with ADR-0006.
- Good, because the MVP scope stays within the 16-week plan.
- Bad, because the MVP cannot be used with real residents, not even in a small trial, until both features exist.
- Neutral: the crypto-shredding mechanism for ARCO cancellation is already decided (ADR-0002); only the request workflow is deferred.

### Confirmation

- Release checklist: operating with real users is blocked while ARCO requests or the Libro de Reclamaciones are missing.
- [03-reglas-de-negocio.md](../../03-reglas-de-negocio.md) keeps the explicit prohibition for agents in "Alcance del catálogo".

## More Information

- [02-alcance.md](../../02-alcance.md) §0, "Bloqueantes para operar con datos reales".
- Audit finding M-23 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md).
- QA review of the user stories in [06-user-stories.md](../../06-user-stories.md), section "Revisión QA → Constitución".
- Related: Q20 in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md); ADR-0002; ADR-0006.
