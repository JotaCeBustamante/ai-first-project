---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Account and session security based on OWASP ASVS 4.0 level 2

## Context and Problem Statement

The business rules cover invitations (RN-007), TOTP for Administrator and BoardMember (RN-008) and Argon2id (RN-009), but not password recovery (mentioned in [02-alcance.md](../../02-alcance.md) §6), first-time TOTP enrollment, recovery codes, lockout after failed attempts, invitation expiry (Q22) or session duration (finding M-16).

## Decision Drivers

- Use a recognized standard instead of ad-hoc values.
- Keep MFA mandatory for Administrator and BoardMember (PRINCIPIO-005).
- Keep the platform process (ADR-0003) as the last resort for MFA reset.

## Considered Options

1. **Follow OWASP ASVS 4.0 level 2 and fix the values in this ADR.**
2. Fix the values directly in the audit.
3. Leave everything in Q22.

## Decision Outcome

Chosen option: **"Follow OWASP ASVS 4.0 level 2"**. This answers Q22.

- Password recovery, TOTP enrollment, recovery codes, lockout, invitation expiry and session duration follow the ASVS 4.0 level 2 requirements (chapters V2 Authentication and V3 Session Management).
- Recovery codes **complement, not replace**, the MFA reset by the platform process (ADR-0003).

### Values (accepted by the author on 2026-11-02)

The author accepted these values on 2026-11-02 (re-audit finding RQ-C02). Each one is a business rule with its own test:

| Topic | Value | Rule |
|---|---|---|
| Invitation validity | 7 days | RN-110 |
| Lockout | 15 min after 5 consecutive failed attempts (password or TOTP) | RN-111 |
| Recovery codes | 10 single-use codes, shown once | RN-112 |
| Recovery code regeneration | After validating a TOTP code, the user can regenerate 10 new codes; the previous ones stop working (second re-audit R2-A09) | RN-141 |
| TOTP scope | The TOTP belongs to the global `User` account. Required when the user holds `Administrator` or `BoardMember` in any condominium, and asked at every sign-in whichever condominium is chosen (second re-audit R2-A09) | RN-008 |
| TOTP enrollment | Mandatory before the first session after the user gets `Administrator` or `BoardMember` (second re-audit R2-A09) | RN-140 |
| MFA reset | Only by the platform process, for an Administrator or a BoardMember (second re-audit R2-A09; ADR-0003) | RN-062 |
| Session | 30 min of inactivity; 12 h maximum | RN-113, RN-114 |
| Password recovery | Single-use email link valid for 1 h | RN-115 |
| Password length | 12 to 64 characters, no composition rules (ASVS V2.1) | RN-116 |
| Breached passwords | Rejected against a local list; the password is never sent to an external service (ASVS V2.1.7) | RN-117 |

### Consequences

- Good, because the values can be justified against a public standard.
- Bad, because the local breached-password list has to be chosen and kept up to date, with a license allowed by PRINCIPIO-002.

### Confirmation

- Each confirmed value has an integration test in the users module (90 % coverage, PRINCIPIO-010).
- Agents must not send real recovery or invitation emails; dev uses a test mailbox (PRINCIPIO-009).

## More Information

- Finding M-16 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md); Q22 in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md).
- Rules to add in `03-reglas-de-negocio.md` §2; rules RN-110 to RN-117 implement the values.
- Second re-audit finding R2-A09 in [reauditoria-qa-2.md](../../auditoria-qa/reauditoria-qa-2.md): TOTP per global account, mandatory enrollment, BoardMember MFA reset and recovery code regeneration (RN-008, RN-062, RN-112, RN-140, RN-141).
