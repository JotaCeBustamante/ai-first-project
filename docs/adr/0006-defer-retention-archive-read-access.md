---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Build `DataRetentionJob` in the MVP and defer read access to the cold archive (PIM)

## Context and Problem Statement

PRINCIPIO-004.5 requires that the cold archive can only be read with the `RetentionArchiveReader` role, activated through Microsoft Entra PIM (maximum 8 hours). PIM requires an Entra ID P2 license, which is paid. Decision D3 in [02-alcance.md](../../02-alcance.md) §7 (2026-11-01) defers PIM, but it was never recorded as an ADR (PRINCIPIO-012).

The documents also disagree on whether `DataRetentionJob` is part of the MVP: the scope (§0) says the MVP can be demonstrated without it, while RN-005 and RN-028 are MUST, and the constitution example requires a test where reading without the role returns `403` (finding A-01).

## Decision Drivers

- Remove the contradiction between the scope, the business rules and the constitution example.
- Avoid a paid license (Entra ID P2) while only synthetic data exists.
- Keep R7 (excessive scope) under control.

## Considered Options

1. **Job in the MVP, without archive read access.**
2. Job out of the MVP; RN-005 and RN-028 become "blockers for real data".
3. Leave it as an open question (depends on Q20).

## Decision Outcome

Chosen option: **"Job in the MVP, without archive read access"**.

- `DataRetentionJob` and the immutable cold archive (Blob Archive) are built in the MVP.
- **Archive read access and PIM elevation are not implemented** (D3). No user holds `RetentionArchiveReader`, so every read attempt returns `403`, which satisfies the PRINCIPIO-004.5 example test.
- RN-005 and RN-028 stay **MUST**.
- Before operating with real data, the author must either acquire Entra ID P2 or amend PRINCIPIO-004.5 through the author's own PR with an accepted ADR (PRINCIPIO-010, constitution 1.3).

### Consequences

- Good, because the scope, the business rules and the constitution become consistent.
- Good, because no paid license is needed during the project.
- Bad, because archived data cannot be read at all until PIM (or an amendment) exists; this is acceptable only while data is synthetic.
- Neutral: per ADR-0009 (M-13), PIM's cost is a budget decision (Q20), not a PRINCIPIO-002 compliance issue.

### Confirmation

- Integration test (constitution example): simulate 91 days, run `DataRetentionJob`, verify the guest no longer exists in SQL Server and exists in the Archive container.
- Integration test: any attempt to read the archive returns `403`.
- Release checklist: operating with real data is blocked while PIM or an amendment is missing.

## More Information

- Decision D3 in [02-alcance.md](../../02-alcance.md) §7 and finding A-01 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md).
- `02-alcance.md` §0 must move `DataRetentionJob` from "blockers" to the MVP; archive read access with PIM, ARCO and the Libro de Reclamaciones remain blockers.
- Related: Q20 (budget and pilot) in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md).
