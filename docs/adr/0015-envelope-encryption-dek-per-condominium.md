---
status: accepted
date: 2026-11-04
decision-makers: Jose Bustamante
consulted: Architect agent (BMAD)
informed: All contributors (human and AI)
---

# Field encryption with envelope encryption and a cached DEK per condominium

## Context and Problem Statement

PRINCIPIO-005 requires AES-256-GCM with keys in Azure Key Vault for every personal data field, and the API p95 must be under 500 ms (PRINCIPIO-010). One Key Vault call per field (~20–50 ms) would make listing 40 guests impossible. ADR-0002 already requires a key per data subject, but **only** for the cold archive.

## Decision Drivers

- PRINCIPIO-005 compliance.
- p95 < 500 ms.
- Limit the blast radius of a key incident to one condominium.
- No new dependencies.

## Considered Options

1. **One 256-bit DEK per condominium, wrapped by a Key Vault KEK and cached in memory for up to 1 h.**
2. SQL Server Always Encrypted.
3. One Key Vault call per operation.
4. A single global DEK.

## Decision Outcome

Chosen option: **1**. The wrapped DEK lives in `Condominium.DataKeyWrapped` (KEK: RSA-HSM or AES in Key Vault). It is unwrapped with Managed Identity and kept in memory for up to 1 h. An EF Core `ValueConverter` encrypts and decrypts with `System.Security.Cryptography.AesGcm`; properties are marked `[PersonalData]` and an architecture test checks that all of them use the converter. The blind index uses a separate HMAC key (ADR-0004). `DataRetentionJob` re-encrypts with the data subject key when archiving (ADR-0002).

### Consequences

- Good: meets PRINCIPIO-005 without new dependencies and with low Key Vault cost; rotating the KEK is cheap.
- Bad: the DEK lives in process memory (mitigated: Managed Identity, no memory dumps in production, container without shell).
- Bad: rotating a DEK requires a re-encryption job.

## Pros and Cons of the Options

- **Always Encrypted:** limits queries, and its support in EF Core and in Linux CI containers is fragile.
- **One Key Vault call per operation:** breaks the p95.
- **Single global DEK:** one incident exposes every condominium.

## More Information

Source: [07-architecture.md](../../07-architecture.md) §5, transcribed on 2026-11-08. Rules: RN-052, RN-129. Tasks: T-006.
