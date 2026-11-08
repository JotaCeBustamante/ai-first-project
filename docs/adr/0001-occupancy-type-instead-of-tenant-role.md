---
status: accepted
date: 2026-11-01
decision-makers: Jose Bustamante
consulted: PM agent (BMAD)
informed: All contributors (human and AI)
---

# Model owner vs. tenant as a per-unit occupancy type instead of a new role

## Context and Problem Statement

The project brief ([01-project-brief.md](../../01-project-brief.md)) separates two kinds of people who live in a unit:

- **Owners** see the condominium's expenses, supplier hires and budgets, and take part in decisions.
- **Tenants** (~30% of the units in the reference building) can book common areas, report faults and read announcements. They **cannot** see financial information or take part in decisions.

The constitution ([00-constitucion.md](../../00-constitucion.md), PRINCIPIO-006) fixes the role set to exactly six roles: `Administrator`, `BoardMember`, `Resident`, `NonResidentOwner`, `Concierge` and `Supplier`. `Resident` covers both resident owners and tenants, and a new role cannot be added without amending the constitution.

The MVP features M5 (expense register) and M6 (supplier hires with visible justification), defined in [02-alcance.md](../../02-alcance.md), must be visible to owners and hidden from tenants. How do we enforce that distinction without breaking PRINCIPIO-006?

## Decision Drivers

- Comply with PRINCIPIO-006 and keep exactly six roles.
- Hide financial data from tenants, which the brief treats as a hard access boundary.
- Handle real-world cases: a person may own one unit and rent another, and occupancy changes over time (sale, end of lease).
- Keep tenant isolation (PRINCIPIO-003) and the data retention rules (PRINCIPIO-004.5) straightforward to apply.
- Keep the change small: one developer, 16 weeks.

## Considered Options

1. **`OccupancyType` attribute on the person–unit link** (`Owner` or `Tenant`).
2. **New `Tenant` role.**
3. **Owner flag on the person** (`IsOwner` on the user or person record).
4. **Restrict financial data to `NonResidentOwner` and `BoardMember` only.**

## Decision Outcome

Chosen option: **"`OccupancyType` attribute on the person–unit link"**. It is the only option that meets every driver without amending the constitution. Ownership is a fact about a person **and a specific unit**, not a property of a person's role in the system.

### Model

A `UnitOccupancy` entity links a person to a unit:

| Property | Type | Notes |
|---|---|---|
| `Id` | `Guid` | |
| `CondominiumId` | `Guid` | Required. Filtered by the global query filter (PRINCIPIO-003) |
| `UnitId` | `Guid` | |
| `PersonId` | `Guid` | |
| `OccupancyType` | `enum { Owner, Tenant }` | |
| `StartDate` | `DateOnly` | First day of the occupancy (inclusive). An occupancy whose `StartDate` is after the current date in `America/Lima` is not active yet |
| `EndDate` | `DateOnly?` | Last day of the occupancy (inclusive). `null` while no end date is known. The occupancy is **active** while `StartDate` is less than or equal to, and `EndDate` is `null` or greater than or equal to, the current date in `America/Lima`. A future `EndDate` may be registered |

### Rules

- **Financial access policy (`CanViewCondominiumFinancials`)** is granted to:
  - `Administrator` and `BoardMember`;
  - `NonResidentOwner` with at least one **active** `Owner` occupancy in the current condominium (re-audit RQ-A02);
  - `Resident` with at least one **active** `UnitOccupancy` where `OccupancyType = Owner` in the current condominium.
- The policy is evaluated against the database on each request. It is never derived from a claim, so access is removed from the first request after the last active `Owner` occupancy ends (RN-016).
- A `NonResidentOwner` may only have `Owner` occupancies.
- A `Tenant` occupancy never grants financial access, even if the same person has another `Owner` occupancy in a different condominium. Access is always checked inside the current tenant.
- When the last active occupancy of a person in a condominium ends, the `Resident` and `NonResidentOwner` roles are revoked there (RN-060). The 90-day retention period of PRINCIPIO-004.5 starts only when the person has neither active occupancies nor roles, from the later of the last `EndDate` and the last role revocation (RN-005).
- Financial views show each expense with its receipt and the full supplier-hire file, never data about specific units or other residents (RN-036, RN-090, RN-041; audit C-03, re-audit RQ-A04).

### Consequences

- Good, because the role set stays exactly as PRINCIPIO-006 defines it, with no constitutional amendment.
- Good, because it models mixed cases correctly: owning one unit while renting another, or several owners of the same unit.
- Good, because the occupancy history keeps a dated record of who owned or rented each unit, which `DataRetentionJob` can use.
- Bad, because authorization now depends on role **and** data, so `[Authorize(Roles = ...)]` alone is not enough. Every financial endpoint must use the named policy.
- Bad, because the permissions matrix becomes more complex: rows for `Resident` must state the occupancy condition.

### Confirmation

- `docs/security/permissions-matrix.md` lists `Resident (Owner)` and `Resident (Tenant)` separately (as columns) for every financial resource.
- Integration tests (xUnit) cover at least the following:
  - `ResidentTenant_CannotReadExpenses_Returns403`
  - `ResidentOwner_CanReadExpenses_Returns200`
  - `NonResidentOwner_CanReadSupplierHires_Returns200`
  - `ResidentOwner_AfterOccupancyEnds_CannotReadExpenses_Returns403`
  - `ResidentOwner_CrossTenantExpenses_Returns404`
- Code review checks that no financial endpoint uses a role-only authorization attribute.
- The users module (identity, authentication, roles) keeps line coverage at or above 90% (PRINCIPIO-010).

## Pros and Cons of the Options

### `OccupancyType` attribute on the person–unit link

- Good, because it complies with PRINCIPIO-006.
- Good, because it represents ownership per unit and over time.
- Neutral, because it adds one entity, which M1 (condominium registry) needs anyway to link people to units.
- Bad, because it needs policy-based authorization and more tests.

### New `Tenant` role

- Good, because it uses simple role-based checks.
- Bad, because it **violates PRINCIPIO-006**. It would need a constitutional amendment through a human-approved PR and ADR.
- Bad, because a role is global to the user, so it cannot represent a person who owns one unit and rents another.

### Owner flag on the person

- Good, because it is the simplest change.
- Bad, because it cannot represent different relationships with different units.
- Bad, because it has no history. A sale or the end of a lease overwrites the value, and the record of when access ended is lost.

### Restrict financial data to `NonResidentOwner` and `BoardMember` only

- Good, because it needs no model change.
- Bad, because it hides the expense register from **resident owners**, who are most of the units (~70%) and the main audience of the transparency value proposition. It defeats beneficio 2 of the brief.

## More Information

- Source of the decision: decision D1 in [02-alcance.md](../../02-alcance.md), section 7, approved by the author on 2026-11-01.
- Related open questions in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md):
  - **Q14:** whether non-resident owners delegate to their tenants. If delegation is needed, it will be a separate, explicit grant and never an implicit consequence of `Tenant` occupancy.
  - **Q19:** what may be approved digitally under Ley N.° 27157.
- Follow-up: under Ley N.° 27157, the board (Junta Directiva) is formed by owners. Assigning `BoardMember` should therefore require an active `Owner` occupancy. This must be confirmed in the legal review (Q19) before it becomes a validation rule.
- Revisit this decision if the constitution's role set changes or if Q14 shows that delegation from owner to tenant is common.
- Updated on 2026-11-02 after the QA audit ([auditoria-qa.md](../../auditoria-qa/auditoria-qa.md), findings A-02 and A-03): `EndDate` is inclusive and evaluated in `America/Lima`, and the short-lived claim alternative was removed.
