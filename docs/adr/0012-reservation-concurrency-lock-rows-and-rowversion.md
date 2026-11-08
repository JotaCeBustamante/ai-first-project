---
status: accepted
date: 2026-11-04
decision-makers: Jose Bustamante
consulted: Architect agent (BMAD)
informed: All contributors (human and AI)
---

# Reservation concurrency with lock rows and `rowversion`

## Context and Problem Statement

RN-081 requires that, when two overlapping reservations arrive at the same time, only the first is confirmed. RN-080 requires the monthly quota per unit to hold under concurrency. SQL Server has no range exclusion constraints, and PRINCIPIO-002 forbids Dapper, so the solution must be expressed with EF Core.

## Decision Drivers

- Correctness of RN-080 and RN-081 under concurrency.
- EF Core and LINQ only (PRINCIPIO-002).
- Deterministic tests (two submissions 200 ms apart, HU-006).

## Considered Options

1. **Two lock tables with `rowversion` as concurrency token.**
2. `SERIALIZABLE` transactions.
3. `sp_getapplock` with raw SQL.
4. Application-only validation.

## Decision Outcome

Chosen option: **1**. Two tables without business data: `CommonAreaDayLock (CommonAreaId, LocalDate)` and `UnitAreaMonthLock (UnitId, CommonAreaId, YearMonth)`, both with `rowversion`. Creating or cancelling a reservation reads both rows (creating them if missing), evaluates overlaps and quota with normal queries and touches both rows in the same transaction. If another transaction touched them first, EF Core throws `DbUpdateConcurrencyException`; the use case retries once with a new context, and the re-evaluation yields `RESERVATION_OVERLAP` or `RESERVATION_MONTHLY_LIMIT_REACHED`. Extra defense: a filtered unique index `(CommonAreaId, StartAt) WHERE Status = 'Confirmed'`. Because an area never crosses midnight (RN-021), a reservation touches a single day row.

### Consequences

- Good: EF Core and LINQ only; the HU-006 test is deterministic; only the affected area-day and unit-month are locked.
- Bad: two extra technical tables and a retry that must be covered by tests.

## Pros and Cons of the Options

- **`SERIALIZABLE`:** correct, but range locks cause deadlocks at peak hours and less predictable retries.
- **`sp_getapplock`:** works, but couples the domain to T-SQL and makes testing harder.
- **Application-only:** violates the HU-006 note.

## More Information

Source: [07-architecture.md](../../07-architecture.md) §5, transcribed on 2026-11-08. Rules: RN-021, RN-080, RN-081. Tasks: T-023, T-042.
