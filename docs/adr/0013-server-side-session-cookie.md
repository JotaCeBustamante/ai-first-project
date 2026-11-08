---
status: accepted
date: 2026-11-04
decision-makers: Jose Bustamante
consulted: Architect agent (BMAD)
informed: All contributors (human and AI)
---

# Server-side session with a cookie, not JWT, for the MVP web client

## Context and Problem Statement

RN-113 and RN-114 set 30 minutes of inactivity and 12 hours maximum per session. RN-105 requires evaluating financial access against the database on every request. Revoking a role or handing over the management company must end open sessions (RN-063, RN-137). The only MVP client is the same-origin web app.

## Decision Drivers

- Immediate revocation (RN-137).
- Exact, testable timeouts with `TimeProvider`.
- No tokens in browser storage.
- No email in plain text (PRINCIPIO-005, ADR-0004).

## Considered Options

1. **ASP.NET Core cookie authentication whose value is an opaque id of a `UserSession` row.**
2. Short-lived JWT plus refresh token.
3. Full ASP.NET Core Identity.

## Decision Outcome

Chosen option: **1**. Cookie `__Host-` (`HttpOnly`, `Secure`, `SameSite=Lax`). Every request validates the session, with an in-memory cache of **5 s** for the row that the replica revoking a session invalidates immediately (never for the financial policy). Only a user action updates `LastActivityAt`, at most once per minute. Antiforgery on unsafe methods. W1 will add a token flow with its own ADR.

**Amendment 2026-11-08 (author decision, RN-113).** An automatic request does **not** renew the session: the concierge polling (`GET /api/concierge/today` sent by the script with the header `X-CondoHub-Background: poll`) and the no-JS `meta refresh` (`/concierge?auto=1`) validate the session but do not touch `LastActivityAt`. "Actualizar ahora" is sent without that header and counts as activity. The concierge page and endpoint respond with `Cache-Control: no-store`.

**Partial session (2026-11-08, default of Q56).** After the password step and before MFA, condominium selection or consent, the session is partial: it allows only the sign-in, MFA, condominium selection and consent endpoints and pages, and it expires after 300 s.

### Consequences

- Good: immediate revocation; RN-113 and RN-114 times are exact and testable; no tokens in browser storage.
- Bad: one session read per request (mitigated by the short cache and an index on the hash).
- Bad: the future mobile app needs another mechanism.

## Pros and Cons of the Options

- **JWT + refresh token:** immediate revocation needs a deny list, which is a server-side session with more parts.
- **Full ASP.NET Core Identity:** stores the email in clear text (`NormalizedEmail`), against PRINCIPIO-005 and ADR-0004; only its hashing and cookie abstractions are used.

## More Information

Source: [07-architecture.md](../../07-architecture.md) §4.1 and §5, transcribed on 2026-11-08; Q44 and Q56 in [05-preguntas-abiertas.md](../../05-preguntas-abiertas.md). Tasks: T-010, T-028.3, T-041.
