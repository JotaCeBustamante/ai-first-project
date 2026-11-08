---
status: accepted
date: 2026-11-04
decision-makers: Jose Bustamante
consulted: Architect agent (BMAD)
informed: All contributors (human and AI)
---

# Idempotency with a key generated when the form is rendered

## Context and Problem Statement

RN-163 and PRINCIPIO-011: on 3G a resident may resubmit without knowing whether the reservation was created. With static SSR there is no JavaScript to generate a key before submitting, and a browser resubmission repeats the same `POST`.

## Decision Drivers

- The monthly quota is consumed once (RN-080, RN-163).
- Works without JavaScript.
- Reusable by the future mobile app (W1).

## Considered Options

1. **Server-generated UUIDv7 placed as a hidden field on `GET`, passed as `Idempotency-Key` to the use case.**
2. Duplicate detection by "same unit, area and slot".
3. Client-only key with JavaScript.
4. Post/Redirect/Get without a key.

## Decision Outcome

Chosen option: **1**. API clients send the key in the header. `IdempotencyRecord (UserId, Key, Fingerprint, ResourceId, ExpiresAt)` is stored in the **same transaction** as the resource. Fingerprints: reservation = SHA-256 of area + unit + slot; guest = reservation + name; expense = description + amount + date + SHA-256 of the receipt. Same key and fingerprint → the original resource is returned; same key with another fingerprint → `IDEMPOTENCY_KEY_REUSED`. Only a `2xx` binds the key (a `4xx` does not consume it). Records are purged after 24 h.

### Consequences

- Good: the quota is consumed once and the HU-005 criterion is verifiable; the same mechanism covers `POST /api/reservations/{id}/guests` and `POST /api/expenses` (Q48) and serves W1.
- Bad: a form left open for more than 24 h creates a new resource when submitted (accepted and documented).

## Pros and Cons of the Options

- **Same unit, area and slot:** confuses a resubmission with a legitimate attempt and cannot distinguish the RN-081 race.
- **Client-only key:** does not work without JavaScript.
- **PRG without a key:** does not cover a lost `POST` response.

## More Information

Source: [07-architecture.md](../../07-architecture.md) §5, transcribed on 2026-11-08. Rules: RN-163. Tasks: T-022.3, T-025, T-030, T-040, T-042.
