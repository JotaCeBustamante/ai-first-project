# CondoHub — Permissions matrix

> **Required by:** PRINCIPIO-006 (constitution 1.3). Every row has an authorization test.
> **Date:** 2026-11-02 · **Updated:** 2026-11-08 (Spec Finalizer: H3 visible states, H5 vendors)
> **Author:** Jose Bustamante
> **Sources:** [03-reglas-de-negocio.md](../../03-reglas-de-negocio.md) · [04-glosario.md](../../04-glosario.md) · [ADR-0001](../adr/0001-occupancy-type-instead-of-tenant-role.md) · [ADR-0003](../adr/0003-tenant-resolution-and-platform-processes.md) · [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md) · [reauditoria-qa-2.md](../../auditoria-qa/reauditoria-qa-2.md)

## How to read this matrix

**Columns.** The six roles of PRINCIPIO-006, with `Resident` split by occupancy type as ADR-0001 requires, plus the platform process (ADR-0003), which is not a role.

| Column | Who |
|---|---|
| **Adm** | `Administrator` |
| **Brd** | `BoardMember` (Junta Directiva) |
| **R-Own** | `Resident` with an active `Owner` occupancy in the current condominium |
| **R-Ten** | `Resident` with only `Tenant` occupancies in the current condominium |
| **NRO** | `NonResidentOwner` with an active `Owner` occupancy in the current condominium (only `Owner` occupancies, RN-002; without one, the role is revoked, RN-060) |
| **Con** | `Concierge` |
| **Sup** | `Supplier`. No accounts exist in this version (W6, RN-042), so every cell is ❌ |
| **Plat** | Platform process run by a human operator (ADR-0003, RN-062). Not a user role |

**Cells.**

| Symbol | Meaning | Response |
|---|---|---|
| ✅ | Allowed | `200` / `201` / `204` |
| 🔸 | Allowed only on own records (own unit, own reservation, own profile); the condition is in the "Condition" column | `403` when the user has no permission over the record (RN-118); `422` when a state or time rule blocks it (RN-102) |
| ❌ | Denied by an explicit rule | `403` (RN-118) |
| ⛔ | Denied by default: no rule grants it (least privilege, PRINCIPIO-006). Changing it requires a new rule | `403` |
| — | Not applicable | — |

**Rules that apply to every row.**

1. **Tenant first (RN-017, RN-103).** A resource from another condominium returns `404` for every role, before any permission check. Each endpoint has its `*_CrossTenantAccess_Returns404` test (PRINCIPIO-003).
2. **Session gates.** No row is reachable before accepting the current consent (RN-010, RN-071), before TOTP for any account that holds Administrator or BoardMember in any condominium, whichever condominium is chosen (RN-008, RN-140), or for a person without active occupancies or roles in the condominium (RN-072).
3. **Roles are per condominium (RN-065).** A user with several roles in the current condominium gets the union of their permissions. Administrator and BoardMember never coincide (RN-067).
4. **Financial access** is the `CanViewCondominiumFinancials` policy, evaluated against the database on every request (RN-105, ADR-0001). It is granted to Adm, Brd, R-Own and NRO, the last two only with an active `Owner` occupancy (RN-015, RN-016).
5. **Attachments** follow the permission of the record they belong to (RN-107).
6. **403 or 422 (RN-118, RN-102).** `403` when the user has no permission over the resource (for example, RN-066, RN-075, RN-077). `422` when the user has permission but a validation, state or time rule blocks the action (for example, RN-083, RN-086, RN-097). Both carry a Problem Details body with the rule's error code.

---

## 1. Platform and identity

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | Create a condominium | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | — | RN-062, ADR-0003 | `Authz_Condominium_Create` |
| P2 | Invite the first Administrator | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | — | RN-007, RN-062 | `Authz_Administrator_InviteFirst` |
| P3 | Reset the MFA of an Administrator or a BoardMember | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | — | RN-062, ADR-0003, ADR-0008 | `Authz_Mfa_Reset` |
| P4 | Assign or revoke `BoardMember` | ❌ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | ✅ | At the Junta Directiva's documented request | RN-066, ADR-0003 | `Authz_BoardMember_AssignRevoke` |
| P5 | Revoke the outgoing Administrator and Concierges (handover) | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | ✅ | At the Junta Directiva's documented request | RN-063 | `Authz_AdministratorHandover_Execute` |
| P6 | Invite a Resident, NonResidentOwner or Concierge | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | ✅ | — | RN-007 | `Authz_Invitation_Create` |
| P7 | Read the audit log (registry changes and platform actions) | ⛔ | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | Without names or contact data (RN-124) | RN-059, RN-062, RN-124 | `Authz_AuditLog_Read` |
| P8 | Read the cold archive | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Nobody holds `RetentionArchiveReader` in this version | RN-109, ADR-0006 | `Authz_RetentionArchive_Read` |
| P9 | Regenerate own recovery codes | 🔸 | 🔸 | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | Own account only, after validating a TOTP code; the previous codes stop working | RN-141, ADR-0008 | `Authz_RecoveryCodes_Regenerate` |

## 2. Condominium registry (M1, S5)

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Create or edit towers and units | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | — | M1, RN-003, RN-058 | `Authz_Units_Write` |
| R2 | Register persons and occupancies, end an occupancy | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | Name, email and occupancy only; never the DNI, foreigner card or phone (RN-146) | M1, RN-001, RN-002, RN-057, RN-146 | `Authz_Occupancies_Write` |
| R3 | Read the registry (all persons and occupancies) | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | — | M1 | `Authz_Registry_Read` |
| R4 | Read own contact data and own occupancies | 🔸 | 🔸 | 🔸 | 🔸 | 🔸 | 🔸 | ❌ | — | Own record only | PRINCIPIO-006 | `Authz_OwnProfile_Read` |
| R5 | Read another resident's contact data | ✅ | ⛔ | ❌ | ❌ | ❌ | ⛔ | ❌ | — | — | RN-018 | `Authz_OtherResidentContact_Read` |
| R6 | Read the administration's contact data | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | — | — | PRINCIPIO-006 | `Authz_AdministrationContact_Read` |
| R7 | Import the registry from CSV (S5) | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | — | S5, RN-051, RN-101 | `Authz_RegistryImport_Execute` |
| R8 | Register or edit own DNI or foreigner card and own phone | 🔸 | 🔸 | 🔸 | 🔸 | 🔸 | 🔸 | ❌ | — | Own profile only, after accepting the current consent. Optional fields (RN-147). Formats: RN-148, RN-149, RN-150 (`422`) | M1, RN-145, RN-147 to RN-150 | `Authz_OwnIdentityContact_Write` |
| R9 | Register or edit another person's DNI, foreigner card or phone | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Only the data subject writes these fields; the Administrator can read them (R5) | RN-146 | `Authz_OtherPersonIdentityContact_Write` |
| R10 | Change own sign-in email | 🔸 | 🔸 | 🔸 | 🔸 | 🔸 | 🔸 | ❌ | — | Own login email only, after password + TOTP re-authentication (RN-155) and confirming a link sent to the new email (RN-151). No one changes another person's login email | RN-151, RN-152, RN-154, RN-155, RN-156 | `Authz_OwnEmail_Change` |

## 3. Common-area reservations (M3)

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B1 | Configure common areas and their rules | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | — | M3, RN-082 | `Authz_CommonAreas_Write` |
| B2 | See availability | ✅ | ⛔ | ✅ | ✅ | ✅ | ⛔ | ❌ | — | — | M3 | `Authz_Availability_Read` |
| B3 | Create a reservation | ✅ | ⛔ | 🔸 | 🔸 | 🔸 | ⛔ | ❌ | — | Adm: any unit (RN-076). Others: only a unit with an active occupancy (RN-025, RN-075); an owner cannot book a unit with an active `Tenant` occupancy (RN-077) | RN-025, RN-075, RN-076, RN-077 | `Authz_Reservations_Create` |
| B4 | Read own reservations | ✅ | ⛔ | 🔸 | 🔸 | 🔸 | ⛔ | ❌ | — | Reservations of a unit with an active occupancy | M3, RN-088 | `Authz_Reservations_ReadOwn` |
| B5 | Edit the guest list | ⛔ | ⛔ | 🔸 | 🔸 | 🔸 | ⛔ | ❌ | — | Own reservation (`403` otherwise). After the slot starts: `422` (RN-086) | RN-086 | `Authz_ReservationGuests_Write` |
| B6 | Cancel a reservation | ✅ | ⛔ | 🔸 | 🔸 | 🔸 | ⛔ | ❌ | — | Adm: any (RN-026). Others: own reservation (`403` otherwise); after the slot starts: `422` (RN-083) | RN-026, RN-083 | `Authz_Reservations_Cancel` |

## 4. Concierge view (M4)

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G1 | Read today's confirmed reservations with their guests | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ✅ | ❌ | — | Only `Confirmed` reservations of the current date in `America/Lima` | RN-029 | `Authz_ConciergeView_Read` |
| G2 | Check in a guest | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ✅ | ❌ | — | Once per guest, only for a `Confirmed` reservation of the current date; otherwise `422` (RN-164) | RN-030, RN-164 | `Authz_GuestCheckIn_Create` |

## 5. Expenses (M5)

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Register an expense | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | — | — | RN-032 | `Authz_Expenses_Create` |
| E2 | Annul an expense | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | With a reason | RN-091, RN-092 | `Authz_Expenses_Annul` |
| E3 | Read expenses (detail, totals, annulled) and download receipts | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | — | Without unit-specific data for R-Own and NRO (RN-036) | RN-015, RN-031, RN-035, RN-090, RN-107 | `Authz_Expenses_Read` |

## 6. Supplier hires (M6)

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| H1 | Create, edit and submit a hire | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | Outside `Draft`: `422` (RN-097) | RN-037, RN-038, RN-096, RN-097 | `Authz_SupplierHires_Write` |
| H2 | Approve or reject a hire | ❌ | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | Only in `Submitted` (`422 HIRE_NOT_SUBMITTED` otherwise); rejection needs a non-blank reason | RN-039, RN-098 | `Authz_SupplierHires_Decide` |
| H3 | Read the hire file and download quotes | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | — | The decision is shown by position, not by name (RN-041). Visible states (Q25, 2026-11-08): Adm all; Brd `Submitted` and `Approved`; R-Own and NRO only `Approved`. A hidden hire responds `404` | RN-041, RN-107 | `Authz_SupplierHires_Read` |
| H4 | Link an expense to a hire | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | The hire must be `Approved` | RN-095 | `Authz_ExpenseHireLink_Write` |
| H5 | Register a vendor and list vendors (`POST /api/vendors`, `GET /api/vendors`) | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | No user account is created (W6). Added 2026-11-08 (10-validation-log row 69) | RN-042, RN-169 | `Authz_Vendors_Write` |

## 7. Should features (S1–S4)

| # | Action | Adm | Brd | R-Own | R-Ten | NRO | Con | Sup | Plat | Condition | Source | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1a | Report a fault | ⛔ | ⛔ | ✅ | ✅ | ⛔ | ⛔ | ❌ | — | — | S1 ("el residente reporta") | `Authz_FaultReports_Create` |
| S1b | Change a fault's status | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | No rule says who changes it (see gaps) | RN-043, RN-044 | `Authz_FaultReports_ChangeStatus` |
| S2a | Register a payment | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | With a payment proof | S2, RN-046 | `Authz_Payments_Create` |
| S2b | Read a unit's account statement | ✅ | ❌ | 🔸 | ❌ | 🔸 | ❌ | ❌ | — | R-Own and NRO: only units where they hold an active `Owner` occupancy. Brd: only with its own `Owner` occupancy, through the R-Own column | RN-047, glossary #34 | `Resident_CannotReadOtherUnitDebts`, `Authz_AccountStatement_Read` |
| S2c | Read aggregated delinquency (total owed, number of units) | ✅ | ✅ | ⛔ | ⛔ | ⛔ | ❌ | ❌ | — | No unit or person identified | RN-125 | `Authz_DelinquencySummary_Read` |
| S3a | Publish an announcement | ✅ | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | — | S3 | `Authz_Announcements_Create` |
| S3b | Read an "all residents" announcement | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ | ❌ | — | — | S3 | `Authz_Announcements_ReadAll` |
| S3c | Read an "owners only" announcement | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | — | — | RN-048 | `Authz_Announcements_ReadOwnersOnly` |
| S4 | Read the KPI dashboard | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ❌ | — | No rule says who sees it (see gaps) | S4, RN-049 | `Authz_KpiDashboard_Read` |

---

## Tests

- Each row is one xUnit `[Theory]` in the integration tests, with one `InlineData` per column, asserting the response code of the cell (for example, `Authz_Expenses_Read(role: R-Ten, expected: 403)`).
- The tests required by ADR-0001 are covered by rows E3 and H3: `ResidentTenant_CannotReadExpenses_Returns403`, `ResidentOwner_CanReadExpenses_Returns200`, `NonResidentOwner_CanReadSupplierHires_Returns200`, `ResidentOwner_AfterOccupancyEnds_CannotReadExpenses_Returns403` and `ResidentOwner_CrossTenantExpenses_Returns404`.
- The constitution's example test `Resident_CannotReadOtherUnitDebts` is covered by row S2b.
- These tests count toward the 90 % coverage of the users module (PRINCIPIO-010, audit M-15).

## Gaps: cells denied by default that probably need a rule

These cells are ⛔ because no rule grants them. They are implementable as they are (deny), but the author should decide whether to grant them. Each one needs a rule in `03-reglas-de-negocio.md` before it changes.

| Cell | Why it may need a rule |
|---|---|
| P7 · Adm | The Administrator cannot read the audit log of their own registry changes. RN-059 only names the Junta Directiva. |
| G1 · Adm | The Administrator cannot see the concierge view, although M3 lets them cancel reservations. |
| B5 · Adm | The Administrator can create (RN-076) and cancel (RN-026) any reservation but cannot edit its guest list. |
| B2, B3 · Brd, Con | A BoardMember without an occupancy cannot book. With an occupancy, the R-Own or R-Ten column applies (rule 3 above). |
| S1a · NRO | A non-resident owner cannot report a fault; S1 says "el residente". |
| S1b · all | No rule says who moves a fault from `Reported` to `InProgress` or `Resolved`. S1 is Should. |
| S3b · Con | Concierges do not see general announcements. |
| S4 · all | No rule says who sees the KPI dashboard. S4 is Should. |
