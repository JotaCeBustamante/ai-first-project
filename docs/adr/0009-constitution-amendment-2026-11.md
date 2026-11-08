---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Constitution amendment of November 2026

## Context and Problem Statement

The QA audit of the Spec Pack ([auditoria-qa.md](../../auditoria-qa/auditoria-qa.md)) found contradictions inside the constitution and between the constitution and the tools it mandates. The author decided how to resolve them on 2026-11-01 and 2026-11-02. The constitution can only be changed by a human, through an approved PR and an ADR (header and PRINCIPIO-009.7). Since version 1.3, the human author's own PR with an accepted ADR and all status checks green is enough (second re-audit R2-C01, ADR-0005). This ADR justifies the change; the exact Spanish text is in [docs/proposals/constitution-amendment-2026-11.md](../proposals/constitution-amendment-2026-11.md).

## Decision Drivers

- Make the constitution internally consistent so that agents do not stop at day 1 (license scan) or build out-of-scope features (examples).
- Keep every non-negotiable intent: no GPL/AGPL, privacy, isolation, quality gates.

## Considered Options

For each finding, the options offered to the author are recorded in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md). The alternative to amending was to leave the contradictions in place, which blocks the CI (C-04) or forces agents to escalate on every task.

## Decision Outcome

Amend the constitution as follows:

| Finding | Principle | Change |
|---|---|---|
| C-04 | 002 | The license allowlist applies to runtime dependencies (direct and transitive). Development and CI tools required by PRINCIPIO-010 are allowed even under MPL-2.0, ISC or free proprietary licenses, **never GPL or AGPL**. ISC is added to the allowlist. The GitHub repository is public so CodeQL is free. |
| M-13 | 002 | "Paid dependency" means a package or library that requires a paid license. Cloud services are governed by the project budget (Q20). "Unmaintained" applies to direct dependencies only. |
| M-14 | 002 | Azure SQL Database in Azure; SQL Server 2025 (Developer edition, container) in local and CI. |
| M-17 | 001 | Product and business documents are in Spanish; technical documents (ADR, README, CHANGELOG, OpenAPI, Mermaid) in English. UI routes and endpoints are in English. |
| M-18 | 001, 003, 004, 010, 012 | Examples replaced by in-scope MVP examples (`UnitOccupancy`, `/api/reservations`, guests of a reservation). |
| A-18 | 010 | The human author may merge their own PRs without approval when all status checks are green (ADR-0005). |
| A-17 | 010 / 011 | 3G target: LCP < 4 s with the "Slow 3G" profile. Clarify that Blazor may use static SSR where it improves performance (ADR-0007). |
| B-02 | 007 | "comprobante adjunto" → "constancia adjunta" for payments. |
| B-05 | 010 | "2,5 s" → "2.5 s". |
| R2-C01 | Header, 009, 010 | Version 1.3. The author's own PRs that change `00-constitucion.md` or `.github/workflows/` are merged without approval, only with an accepted ADR in the same PR and all status checks green. PRs from the agents' GitHub App that touch those paths are always rejected (ADR-0005). |
| R2-A01 | 009, 010 | Version 1.3. An agent's `Co-Authored-By` trailer no longer blocks a change: it records AI assistance and the author is accountable for the change. |
| R2-A02 | 009 | Version 1.3. Two rulesets on `main`: status checks with no bypass, and 1 approval with a bypass only for the author's account. The protected-paths check runs from the workflow definition on `main`, not from the PR branch (ADR-0005; GitHub behavior to verify in week 1). |
| R2-A03 | 005 | Version 1.3. The TLS scan example uses `tlsx` by ProjectDiscovery (MIT, `-version-enum` and `-cipher-enum`) instead of the previous GPL-2.0 tool. `sslyze` was discarded (AGPL-3.0). |

### Consequences

- Good, because the license scan and the rest of the CI can be built in week 1.
- Good, because examples no longer point agents to out-of-scope features (W4, W12).
- Bad, because the author-merge exception weakens the "1 human approval" control for the author's own PRs.
- Bad, because a public repository raises the stakes of gitleaks and of the synthetic-data rule (PRINCIPIO-008).

### Confirmation

- The amendment is approved and adopted by the author (never by an agent), with this ADR, and bumps the constitution version to 1.1.
- The re-audit amendment RQ-A11 bumped the constitution version to 1.2 (ADR-0005); version 1.3 supersedes its `Co-Authored-By` blocking condition (R2-A01).
- The second re-audit amendments (R2-C01, R2-A01, R2-A02, R2-A03) bump the constitution version to 1.3.
- PRINCIPIO-009.10 (agents only act on GitHub through the GitHub App, which has no `workflows` permission) bumps the constitution version to 1.4 (R2-A02 follow-up, ADR-0005).
- After the merge, the CI license scan passes with the runtime/tooling split and still fails on any GPL or AGPL package.
- A grep over `00-constitucion.md` finds no `visitors`, `QR` or `Resident` entity examples.

## More Information

- Findings C-04, M-13, M-14, M-17, M-18, A-17, A-18, B-02 and B-05 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md).
- Related ADRs: ADR-0005 (PR policy), ADR-0006 (PIM cost is a budget decision), ADR-0007 (render modes).
- Adopted on 2026-11-02 as constitution version 1.1. The text was drafted with AI assistance; the author reviewed it, approved it and adopts it as their own amendment, and is accountable for it (header of the constitution: "Solo un humano puede modificar este archivo"). Following PRINCIPIO-009, the commit that records it includes the `Co-Authored-By` trailer.
- Adopted on 2026-11-02 as constitution version 1.3 (second re-audit R2-C01, R2-A01, R2-A02 and R2-A03 in [reauditoria-qa-2.md](../../auditoria-qa/reauditoria-qa-2.md); ADR-0005). The text was drafted with AI assistance; the author reviewed it, approved it and adopts it as their own amendment, and is accountable for it (same criterion as re-audit RQ-C01). The commit includes the `Co-Authored-By` trailer, which since version 1.3 does not block the merge (R2-A01).
- Adopted on 2026-11-02 as constitution version 1.4 (R2-A02 follow-up, ADR-0005), with the same criterion as versions 1.1 and 1.3: drafted with AI assistance and adopted by the author as their own amendment.
