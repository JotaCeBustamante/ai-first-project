---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Blazor render modes and performance measurement for 3G and old phones

## Context and Problem Statement

PRINCIPIO-011 requires the app to work on old phones over 3G or slow 4G. PRINCIPIO-002 sets Blazor in Auto mode, which starts with a persistent SignalR connection and later downloads the WebAssembly runtime (several MB). There is no measurable 3G target, and the CI has no tool to measure the API p95 or the LCP required by PRINCIPIO-010 (finding A-17).

## Decision Drivers

- Meet PRINCIPIO-010 (p95 < 500 ms, LCP < 2.5 s on 4G) and PRINCIPIO-011 (3G, old phones).
- Measure performance in the CI, not by hand.
- Keep the stack of PRINCIPIO-002 (.NET 10, Blazor).
- Use only tools allowed by PRINCIPIO-002 (no GPL or AGPL in any version, including tooling; see ADR-0009).

## Considered Options

1. **Static server-side rendering (SSR) for resident pages, targets and CI measurement.**
2. Keep Auto mode everywhere; only set targets and measurement.
3. Open question plus a performance spike in week 1.

## Decision Outcome

Chosen option: **"Static SSR for resident pages, targets and CI measurement"**.

- Resident pages use **static server-side rendering**, with interactivity only in components that need it. Auto mode is used where justified.
- **3G target:** LCP < 4 s with the "Slow 3G" network profile. The 4G target of PRINCIPIO-010 (LCP < 2.5 s) stays.
- **CI measurement:**
  - LCP with **Lighthouse CI**.
  - API p95 with a **load test**.

### Load-test tool (accepted by the author on 2026-11-02)

k6 was suggested during the audit but **cannot be used**: its license is AGPL-3.0, which PRINCIPIO-002 forbids in any version, and the tooling exception of ADR-0009 does not cover GPL or AGPL. The load test uses **Locust** (MIT).

### Consequences

- Good, because resident pages avoid the WebAssembly download and the persistent connection on slow networks.
- Good, because performance regressions fail the CI.
- Bad, because pages that mix SSR and interactive components need more design care.
- Neutral, because PRINCIPIO-002 (constitution version 1.1, ADR-0009) now states that Blazor uses static server rendering and Auto mode where justified, so this decision complies with it.

### Confirmation

- Lighthouse CI runs on every PR against the resident pages with the "Slow 3G" and 4G profiles and fails above the targets.
- The load test runs in the CI against the dev environment and fails if the API p95 is ≥ 500 ms.
- axe still runs on every page (PRINCIPIO-010).

## More Information

- Finding A-17 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md), including the k6 correction.
- The 3G target was added to PRINCIPIO-010 in constitution version 1.1; the amendment text is in [docs/proposals/constitution-amendment-2026-11.md](../proposals/constitution-amendment-2026-11.md).
