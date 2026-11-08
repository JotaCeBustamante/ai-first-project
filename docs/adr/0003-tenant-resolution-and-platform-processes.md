---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Tenant resolution, roles per condominium and platform processes

## Context and Problem Statement

PRINCIPIO-003 restricts every query to the authenticated user's condominium through an EF Core global query filter, and forbids `IgnoreQueryFilters()` outside platform processes documented in an ADR. Several processes need cross-condominium access, but no ADR exists (finding C-07). "Current condominium" (RN-015, RN-017) is undefined for a person linked to two condominiums.

Accounts can only be created by an Administrator invitation (RN-007), so nobody can create the condominium, the first Administrator, or reset an Administrator's MFA (C-05). The second re-audit found that date-driven events (end of occupancies, automatic role revocation, account deactivation) had no authorized component (R2-A06), and that a BoardMember who loses their TOTP and recovery codes had no way back (R2-A09). The outgoing management company controls accounts, roles and `OccupancyType`, so the board cannot revoke it when the company changes (C-06), which is the core pain of the brief. Finally, it is undefined whether a user can hold several roles, who assigns `BoardMember`, and whether an Administrator who is also a BoardMember can approve their own hire (A-10).

## Decision Drivers

- Keep exactly the six roles of PRINCIPIO-006.
- Keep `IgnoreQueryFilters()` limited to a closed, documented list (PRINCIPIO-003).
- Let the board replace the management company without losing condominium data.
- Separate the duties of the supervised party (Administrator) and the supervisors (BoardMember).
- AI agents never run these processes in production (PRINCIPIO-009).

## Considered Options

Bootstrap (C-05): (1) **platform CLI process run by a human operator**; (2) seeder plus BoardMember-authorized MFA reset; (3) a new `PlatformOperator` role (amends PRINCIPIO-006); (4) open question.

Management company change (C-06): (1) **platform process at the board's request**; (2) the board does it in the app (needs a quorum, Q24); (3) open question.

Tenant resolution (C-07): (1) **global identity with a condominium selector**; (2) one account per condominium; (3) open question.

Roles (A-10): (1) **resolve all now** (multiple roles per condominium, BoardMember assigned by the platform process, Administrator/BoardMember incompatibility, residence as a declaration); (2) resolve 1–3 and leave residence open; (3) open question.

## Decision Outcome

Chosen options: **platform CLI process**, **platform process at the board's request**, **global identity with a condominium selector**, and **resolve all role questions now**.

### Platform process

- A **platform command** (CLI), not a user role, can:
  - create a condominium and issue the invitation for its first Administrator;
  - reset the MFA of an Administrator or of a BoardMember (second re-audit R2-A09);
  - at the board's documented request (minutes), revoke the outgoing company's accounts (its Administrator and Concierge users) and invite the new Administrator;
  - assign or revoke the `BoardMember` role at the board's request.
- Only a **human CondoHub operator** runs it. An AI agent must not run it in production (PRINCIPIO-009).
- Every run is written to the audit log.
- Condominium data (registry, reservations, expenses, hires) stays with the condominium when the company changes.

### Tenant resolution

- The **user account is global**: one email and one password per person.
- If a person has occupancies or roles in more than one condominium, they **choose one at sign-in**. The chosen `CondominiumId` is stored in the session and is the "current condominium" used by the global query filter, RN-015 and RN-017.

### Roles

- A user can hold **several roles**, and roles are assigned **per condominium**.
- `BoardMember` is assigned only by the platform process, not by the Administrator.
- `Administrator` and `BoardMember` cannot be held by the same user in the same condominium.
- `Resident` or `NonResidentOwner` is assigned by the Administrator when registering the occupancy, and is revoked automatically when the person's last active occupancy in that condominium ends; other roles are unaffected (RN-060, re-audit RQ-C03). Residence is a **declaration**; the system does not verify it.
- A person has one `Person` record per condominium and at most one global `User`, unique by email. Accepting an invitation links the `Person` to the `User` of that email, after signing in if the `User` already exists (RN-121, RN-122, re-audit RQ-C04).

### Closed list of processes allowed to use `IgnoreQueryFilters()`

1. Sign-in (user lookup before a condominium is chosen).
2. Invitation acceptance.
3. `DataRetentionJob`.
4. Synthetic-data seeders (non-production only, PRINCIPIO-008).
5. The platform CLI process described above.
6. `OccupancyLifecycleJob` (second re-audit R2-A06): a daily job that executes the date-driven events: end of occupancies, automatic revocation of `Resident` and `NonResidentOwner` (RN-060) and account deactivation when a person has no active occupancies or roles in any condominium (RN-073). It needs cross-condominium queries for RN-073.

Any other use is a violation of PRINCIPIO-003.

A reservation's `Completed` status (RN-085) is computed when it is read, not stored by a job, so it needs no component in this list.

### Consequences

- Good, because the six roles stay unchanged and the board can replace the management company.
- Good, because the cross-tenant surface is a closed, reviewable list.
- Bad, because a human operator is a single point of dependency for onboarding and company changes.
- Bad, because roles per condominium make the permissions matrix larger.

### Confirmation

- A Roslyn analyzer or architecture test fails the build if `IgnoreQueryFilters()` is called outside the six allowed components.
- Integration test: `OccupancyLifecycleJob` run on 2027-02-01 revokes the `Resident` role of a person whose last occupancy ended on 2027-01-31, and deactivates her account if she has no other occupancy or role in any condominium.
- Integration test: a user with roles in condominiums A and B only sees A's data after choosing A.
- Integration test: assigning `BoardMember` to a user who is `Administrator` in the same condominium is rejected.
- Integration test: the Administrator cannot assign `BoardMember` through the API (`403`).
- Every platform CLI run produces an audit log entry.

## More Information

- Findings C-05, C-06, C-07 and A-10 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md). Second re-audit findings R2-A06 and R2-A09 in [reauditoria-qa-2.md](../../auditoria-qa/reauditoria-qa-2.md).
- Open: which documented backing is enough to start a company change (Q19, Q24); data ownership (Q9, Q18); whether `BoardMember` requires an active `Owner` occupancy (Q19, ADR-0001 follow-up); how to switch condominium during a session (not decided).
- Related open questions in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md).
