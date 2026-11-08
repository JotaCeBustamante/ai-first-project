---
status: accepted
date: 2026-11-04
decision-makers: Jose Bustamante
consulted: Architect agent (BMAD)
informed: All contributors (human and AI)
---

# Modular monolith with Blazor SSR and a REST API in a single deployment

## Context and Problem Statement

One person, 16 weeks, an undefined cloud budget (Q20) and a high quality floor (PRINCIPIO-010). The MVP needs a documented API (OpenAPI, Postman) and a light web client for 3G. W1 postpones the mobile app, but the API must be able to serve it later.

## Decision Drivers

- Single maintainer: one pipeline, one artifact.
- Light pages for low-end Android on 3G (ADR-0007, PRINCIPIO-011).
- Business rules implemented once and shared by pages and API.

## Considered Options

1. **One .NET 10 solution with a `CondoHub.Web` host serving Blazor (static SSR with interactive islands) and Minimal APIs.**
2. Blazor and API in two deployments.
3. Microservices per module.
4. Blazor WebAssembly SPA over the API.

## Decision Outcome

Chosen option: **1**. Pages call the use cases in process; the API exposes the same use cases over HTTP. Modules are separated by namespace and protected by architecture tests (ArchUnitNET, Apache-2.0). Scheduled jobs use the same image with another command and run as separate Container Apps Jobs.

### Consequences

- Good: one pipeline and one artifact; rules are not duplicated; the API is ready for W1.
- Bad: module discipline depends on the architecture tests.
- Bad: a memory failure in a job could affect the web app if they shared a plan; mitigated by running jobs as separate Container Apps Jobs.

## Pros and Cons of the Options

- **Two deployments:** duplicates pipeline, cost and latency.
- **Microservices:** not viable for one person; no need for independent scaling (~480 units).
- **WebAssembly SPA:** heavy download on low-end Android, against ADR-0007.

## More Information

Source: [07-architecture.md](../../07-architecture.md) §5, accepted by the author on 2026-11-04 and transcribed on 2026-11-08. Tasks: T-001, T-052.
