---
status: accepted
date: 2026-11-04
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Defer account self-service, the board audit log view and the administrator handover until a pilot with real users is confirmed

## Context and Problem Statement

The QA review of the user stories proposed ten user stories (HU-S01 to HU-S10) for MUST rules with a human actor. The author discarded them on 2026-11-02, but the rules stayed MUST in [03-reglas-de-negocio.md](../../03-reglas-de-negocio.md). The backlog audit ([auditoria-backlog-qa.md](../../auditoria-qa/auditoria-backlog-qa.md), finding BK-M01, question Q35) found 28 MUST rules with no user story and no task, and no document that reconciles "mandatory" in the catalog with "not planned" in the backlog.

Since then, the backlog covers 11 of those 28 rules: issuing invitations (HU-001B, T-049), person retention (T-047), occupancy start and role revocation (T-041), TLS rejection (T-048), and the condominium selector (T-014.4). The remaining 17 rules belong to features that no user story or task implements.

## Decision Drivers

- Make the deferral explicit, so an agent does not implement the rules outside the plan and a reviewer does not declare the MVP incomplete.
- Keep the 16-week academic scope (Q20: final delivery on 2027-02-20, single author) under control.
- Do not defer prohibitions that protect data or access. RN-006 (no disability data other than one boolean) and RN-072 (no access to a condominium without occupancies or roles) are met by the data model and the condominium selector, so they are not deferred.

## Considered Options

1. **Defer the 17 rules and block any use with real users until they exist.**
2. Implement password recovery (RN-115) and the board audit log view (RN-124), and defer the rest.
3. Implement all of them in the MVP (about 9 user stories and 25 to 30 tasks).

## Decision Outcome

Chosen option: **"Defer the 17 rules and block any use with real users until they exist"**.

| Feature | Deferred rules |
|---|---|
| Owner profile (ID document and phone entered only by the owner) | RN-069, RN-145, RN-146, RN-148, RN-149, RN-150 |
| Login email change | RN-151, RN-152, RN-154, RN-155, RN-156 |
| Password recovery | RN-115 |
| Recovery code regeneration | RN-141 |
| TLS 1.2 notice at sign-in | RN-014 |
| Reactivation when a deactivated account accepts an invitation | RN-134 |
| Board audit log view | RN-124 |
| Administrator handover | RN-063 |

- The rules stay in the catalog with the mark **⏸ Diferida (ADR-0020)**. Agents must not implement them while the mark exists.
- The MVP is demonstrated **only with synthetic data** (PRINCIPIO-008), as in ADR-0010.
- If a pilot with real users is confirmed (Q20), the owner profile, password recovery, recovery code regeneration and the administrator handover become mandatory **before** the pilot starts, together with the blockers in [02-alcance.md](../../02-alcance.md) §0. The other features are reassessed at that point.
- The HU-001 acceptance criterion for `PERSONAL_DATA_OWNER_ONLY` is marked as deferred and is not tested in the MVP.

### Consequences

- Good, because every MUST rule now has a user story, a component and a task, or a formal deferral.
- Good, because the backlog stays at 130 executable tasks and about 75 hours.
- Bad, because a user who forgets their password has no self-service way back in. In the synthetic demo, the seeder recreates the account.
- Bad, because ID documents and phone numbers are never captured in the MVP, so RN-069 (duplicate ID check) has nothing to check.
- Bad, because a change of property management company can only be done by editing data directly until the handover command exists.
- Neutral: RN-014 depends on the TLS spike of T-048.4. If the ingress does not expose the negotiated TLS version, the rule must be rewritten before it is implemented.

### Confirmation

- [03-reglas-de-negocio.md](../../03-reglas-de-negocio.md) lists the deferred rules under "Reglas diferidas", and each one carries the mark.
- The backlog check script fails if a MUST rule appears neither in a task nor in a deferral list (suggestion BK-S01).
- Release checklist: operating with real users is blocked while the features required above are missing.

## More Information

- Finding BK-M01 and question Q35 in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md).
- [06-user-stories.md](../../06-user-stories.md), section "HUs sugeridas (descartadas)".
- Related: ADR-0006, ADR-0008, ADR-0010.
