---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Blind index (HMAC) for lookups and uniqueness on encrypted fields

## Context and Problem Statement

PRINCIPIO-005 requires field-level AES-256-GCM encryption for personal and contact data, including email and DNI. AES-GCM is non-deterministic: encrypting the same value twice gives different ciphertexts. The system therefore cannot find a user by email at sign-in, nor check that an email or DNI is unique. The scope ([02-alcance.md](../../02-alcance.md) §0) mentions "blind indexes or bounded searches" without deciding (finding A-13).

## Decision Drivers

- Keep every personal field encrypted (PRINCIPIO-005).
- Support sign-in by email and uniqueness of email and DNI.
- Avoid storing any value that can be reversed without a Key Vault key.

## Considered Options

1. **Blind index with HMAC-SHA256** stored next to the encrypted value.
2. **Email in clear text** (TDE only); violates PRINCIPIO-005 and requires an amendment.
3. Leave it as an open question (blocks M1 and M2).

## Decision Outcome

Chosen option: **"Blind index with HMAC-SHA256"**.

- For fields that are searched or must be unique (**email** and **DNI**), the system stores an **HMAC-SHA256** of the normalized value, computed with a key different from the encryption key, also stored in Azure Key Vault.
- Sign-in and uniqueness checks use the blind index. The value itself stays encrypted with AES-256-GCM.
- **Partial-name searches are not supported.**

### Consequences

- Good, because PRINCIPIO-005 is met and sign-in works.
- Good, because uniqueness can be enforced with a database unique index on the blind-index column.
- Bad, because the Administrator cannot search people by partial name; lookups are exact.
- Bad, because rotating the HMAC key requires recomputing every blind index.

### Confirmation

- Integration test: two people with the same email (different casing or surrounding spaces) cannot be registered in the same scope.
- Integration test: sign-in finds the user by email while the `Email` column contains only ciphertext.
- Database check: no plaintext email or DNI exists in any table.

## More Information

- Finding A-13 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md).
- Uniqueness scope (re-audit RQ-C04): email is unique across the platform on `User` (RN-121) and within each condominium on `Person` (RN-068); DNI is unique within each condominium on `Person` (RN-069).
- Normalization: email is trimmed and lowercased; DNI or carné de extranjería is uppercased with spaces and separators removed.
