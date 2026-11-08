---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Crypto-shredding for ARCO cancellation and pseudonymization on retention

## Context and Problem Statement

PRINCIPIO-004.5 of the constitution ([00-constitucion.md](../../00-constitucion.md)) requires that, 90 days after a relationship ends, `DataRetentionJob` moves personal data to an **immutable** Azure Blob Storage container (Archive tier) and deletes it from SQL Server. PRINCIPIO-004.6 requires that an accepted ARCO cancellation request is **also executed on the cold archive**. An immutable (WORM) blob cannot be deleted before its retention period expires, so both rules cannot be met literally (finding C-01).

In addition, deleting a person from SQL Server breaks operational records that reference them: who decided on a supplier hire (RN-040), who made a reservation, and who checked in a guest. "Who approved" is the core of the transparency value proposition (finding C-08).

How do we honor immutability, ARCO cancellation and record traceability at the same time?

## Decision Drivers

- Comply with PRINCIPIO-004.5 (immutable archive, deletion after 1 year) and PRINCIPIO-004.6 (cancellation also on the archive) without amending the constitution.
- Keep supplier hire files complete for owners (RN-041, C-03).
- Keep referential integrity of reservations, check-ins and hire decisions.
- Keep the design small: one developer, 16 weeks.

## Considered Options

For the immutability vs. cancellation conflict (C-01):

1. **Crypto-shredding**: one encryption key per data subject in Azure Key Vault; cancellation destroys the key.
2. **Remove immutability** from the archive and rely on the role, the audit log and soft delete (amends PRINCIPIO-004.5).
3. **Cancellation does not touch the archive**; the archive expires after 1 year (amends PRINCIPIO-004.6; legally risky under Ley N.° 29733).
4. Leave it as an open question.

For what remains in the operational database (C-08):

1. **Pseudonymize**: keep `PersonId` and the role held at the time of the event; move personal data to the archive.
2. **Exclude decisions from retention**: keep the decision maker's name as a management record (amends PRINCIPIO-004.5).
3. Leave it as an open question.

## Decision Outcome

Chosen options: **"Crypto-shredding"** and **"Pseudonymize"**.

### Crypto-shredding

- Each data subject (person) has their own data encryption key in Azure Key Vault.
- Archived records of that person are encrypted with AES-256-GCM (PRINCIPIO-005) using that key.
- An accepted ARCO cancellation **destroys the person's key**. The immutable blob stays in the archive but becomes irreversibly unreadable.
- The lifecycle policy still deletes the blob 1 year after archiving (PRINCIPIO-004.5).

### Pseudonymization

When `DataRetentionJob` archives a person:

- Operational records that reference them (supplier hire decisions, reservations and check-ins) **keep the `PersonId` and the role held at the time of the event**.
- Personal data (name, DNI, phone, email) moves to the cold archive and is deleted from SQL Server.
- Supplier hire decisions are shown to owners by role ("Junta Directiva") and date-time, not by name (C-03), so the file stays complete.

### Consequences

- Good, because immutability and cancellation are both met without a constitutional amendment.
- Good, because "who approved" remains traceable (by `PersonId` and role) after retention.
- Bad, because Key Vault holds one key per person (cost and key-management overhead must be checked against Q20).
- Bad, because destroying a key is irreversible: a mistaken cancellation cannot be undone.
- Neutral, because ARCO itself is out of the MVP scope (M-23); only the mechanism is decided here.

### Confirmation

- Integration test: archive a synthetic person, destroy their key, and verify the archived blob can no longer be decrypted while the blob itself still exists.
- Integration test: after archiving a BoardMember, the hire decision still shows `decidedBy` (as `PersonId`) and the role, and no personal data of that person remains in SQL Server.
- Code review checks that personal data of archived persons is never re-derivable from operational tables.

## More Information

- Findings C-01 and C-08 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md).
- Related: RN-005, RN-028 and RN-040 must be updated to state what is kept ([03-reglas-de-negocio.md](../../03-reglas-de-negocio.md)).
- Open: who is the data controller (Q18) in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md); revocation of consent (Q32).
- Re-audit RQ-A01 and RQ-A12 (2026-11-02): what is archived, deleted without archiving and pseudonymized for a person is fixed in RN-126 to RN-128; the audit log is encrypted and pseudonymized, never deleted while the condominium exists (RN-129, RN-130).
- Second re-audit R2-C02 and R2-A04 (2026-11-02): an archived `Person` row is kept with only `PersonId` and `CondominiumId`, so references stay valid; foreign keys to `Person` use `DeleteBehavior.Restrict` in EF Core, never cascade. Account-level secrets (`PasswordHash`, TOTP secret, recovery codes) belong to the global `User` and are deleted only with the account (RN-127, RN-128).
