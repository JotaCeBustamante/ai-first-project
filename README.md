# CondoHub — Spec Pack

CondoHub is a multi-tenant platform that centralizes the day-to-day management of residential buildings and condominiums in Lima, Peru, connecting residents, the Board and the management company. This repository holds its **specification pack**: the product, business and architecture documents, the decision records, the QA audits, the prompts used to generate them and clickable HTML prototypes.

> Individual academic project of the *Diploma in AI-First Software Architecture*. Product and business documents are written in Spanish; technical documentation (README, ADRs) is in English, as required by [PRINCIPIO-001](00-constitucion.md).

## MVP focus

The MVP is limited to the two benefits an owner would not give up:

- **Book a common area in minutes** instead of a day-long email exchange.
- **See what every sol is spent on** — expenses, providers, quotes and approvals, visible to owners.

## Specification documents

| # | Document | Content |
|---|---|---|
| 00 | [Constitución](00-constitucion.md) | Non-negotiable principles for every human and AI agent (read first) |
| 01 | [Project Brief](01-project-brief.md) | Problem, users, opportunity and evidence |
| 02 | [Alcance](02-alcance.md) | MVP scope (MoSCoW) and cross-cutting requirements |
| 03 | [Reglas de negocio](03-reglas-de-negocio.md) | Business rules |
| 04 | [Glosario](04-glosario.md) | Domain glossary |
| 05 | [Preguntas abiertas](05-preguntas-abiertas.md) | Open questions |
| 06 | [User Stories](06-user-stories.md) | User stories and acceptance criteria |
| 07 | [Architecture](07-architecture.md) | Initial architecture, data model and API contracts |
| 08 | [Backlog](08-backlog.md) | Prioritized backlog |
| 09 | [UI Spec](09-ui-spec.md) | Screens, states and interaction rules |
| 10 | [Validation Log](10-validation-log.md) | Validation decisions and their status |

## Repository layout

```
.
├── 00-…10-*.md          Spec pack documents (above)
├── docs/
│   ├── adr/             Architecture Decision Records
│   ├── proposals/       Constitution amendment proposals
│   ├── security/        Permissions matrix
│   ├── validation/      Prototype review and spec finalizer reports
│   └── *-miro.md        Story map and Miro board exports
├── auditoria-qa/        QA audits and re-audits of the spec pack
├── prompts/             Agent prompts (XML) used to produce each document
└── prototypes/          Clickable HTML prototypes (open prototypes/index.html)
```

## Target stack

.NET 10 (Blazor, modular monolith + REST API), React Native with TypeScript, Entity Framework Core on Azure SQL Database, GitHub Actions CI/CD, deployed on Azure. See [00-constitucion.md](00-constitucion.md) and [07-architecture.md](07-architecture.md) for the full constraints (multi-tenancy, encryption, accessibility, quality gates).

## Viewing the prototypes

Open [prototypes/index.html](prototypes/index.html) in a browser. No build step or server is required.

## Contributing

Read the [constitution](00-constitucion.md) before contributing. Changes to `main` go through a pull request; changes to the constitution additionally require an accepted ADR ([ADR-0005](docs/adr/0005-agent-pull-requests-and-author-merge-policy.md)). Decisions are recorded in [docs/adr/](docs/adr/).

## Author

Jose Bustamante
