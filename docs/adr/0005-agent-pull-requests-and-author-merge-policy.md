---
status: accepted
date: 2026-11-02
decision-makers: Jose Bustamante
consulted: QA agent (BMAD)
informed: All contributors (human and AI)
---

# Agent pull requests through a GitHub App and merge policy for the author's own pull requests

## Context and Problem Statement

PRINCIPIO-009 and PRINCIPIO-010 require at least one human approval per pull request, and GitHub does not let a person approve their own PR. CondoHub is a one-person project. Decision D2 in [02-alcance.md](../../02-alcance.md) §7 (2026-11-01) has AI agents open PRs from a project GitHub App so that the author can approve them, but it was never recorded as an ADR (PRINCIPIO-012).

Two gaps remain (finding A-18):

- The author is the only code owner and the only approver, so an agent PR that modifies `00-constitucion.md` passes if the author approves it by mistake. No CI check rejects it, even though the example in PRINCIPIO-009 says the CI does.
- Nobody can approve the author's own PRs.

## Decision Drivers

- AI agents must never modify the constitution or the CI workflows (PRINCIPIO-009).
- The author must be able to merge their own work in a one-person project.
- Keep every quality gate (status checks) mandatory.
- Keep the constitution and the CI workflows changeable by the only human author (second re-audit R2-C01).

## Considered Options

1. **CI check plus a documented exception for the author** (amends PRINCIPIO-010).
2. CI check plus a second human reviewer (for example, a classmate or teacher).
3. CI check only; the author's PR policy stays open.

## Decision Outcome

Chosen option: **"CI check plus a documented exception for the author"**.

- **Agent identity (D2):** AI agents open PRs from a project **GitHub App** with minimal permissions (branches and PRs only). The App must not be able to approve or merge PRs; this is **not verified yet**, because the `contents: write` and `pull_requests: write` permissions it needs may allow both (third re-audit R3-A01, see Confirmation). The author reviews and approves agent PRs.
- **CI check:** a workflow fails, always, if the diff modifies `00-constitucion.md` or anything under `.github/workflows/` and the PR was opened by the agents' GitHub App. Every PR that changes those paths, including the author's, also requires an accepted ADR in the same PR (re-audit RQ-A11). An agent's `Co-Authored-By` trailer does **not** fail the check: it records AI assistance, and the human author is accountable for the change (second re-audit R2-A01; constitution 1.3).
- **Author exception:** the human author may merge their own PRs **without approval**, only when all status checks are green. This includes changes to `00-constitucion.md` or `.github/workflows/`, which also need the accepted ADR in the same PR (second re-audit R2-C01; constitution 1.3, PRINCIPIO-009 and PRINCIPIO-010). The exception never covers PRs opened by the agents' GitHub App.
- **GitHub configuration (second re-audit R2-A02):**
  - Two rulesets on `main`. Ruleset 1 requires all status checks, with **no bypass for anyone**. Ruleset 2 requires 1 approval, with a bypass **only for the author's account**; the GitHub App can never bypass it. Keeping them separate prevents the approval bypass from also skipping the status checks.
  - The protected-paths check runs from the workflow definition on `main`, not from the PR branch, so a PR cannot disable the check that should reject it.
  - **Not verified yet:** that GitHub behaves this way (separate rulesets with independent bypass lists, and the check running from `main`) has not been verified. Verifying it in GitHub is a **week 1 task** (see Confirmation).

- **Agent identity on GitHub (gap closed after the second re-audit, R2-A02):** an agent never pushes or opens PRs with a person's identity; it only works through the project GitHub App (PRINCIPIO-009.10, constitution 1.4). The App is installed **without** the `workflows` permission, so GitHub itself rejects any push from it that changes `.github/workflows/`. Week-1 verification: a push from the App that touches `.github/workflows/` is rejected.

### Consequences

- Good, because the constitution and workflows are protected by a technical control, not only by review.
- Good, because the author is not blocked by GitHub's self-approval restriction.
- Bad, because the author's own PRs get no second pair of eyes.
- Bad, because it requires amending PRINCIPIO-010 (see ADR-0009).

### Confirmation

- A test PR from the GitHub App that touches `00-constitucion.md` fails the check.
- A test PR from the author that touches `.github/workflows/`, with an accepted ADR, green status checks and a commit with an agent's `Co-Authored-By` trailer, can be merged without approval.
- Ruleset 2 lets only the author's account bypass the approval requirement; the GitHub App can never bypass it.
- Ruleset 1 keeps status checks required for every PR, including the author's, with no bypass.
- **Week 1 task (not verified yet):** verify in GitHub that (a) the author's approval bypass in ruleset 2 does not skip the status checks of ruleset 1, (b) a red status check blocks the author's merge, (c) a PR that modifies the protected-paths workflow is still evaluated with the version on `main`, and (d) negative case (R3-A01): the GitHub App tries to approve a PR opened by the author and then to merge it, and GitHub rejects both actions. If GitHub does not behave this way, the work stops and the author decides a new configuration through an ADR.

## More Information

- Decision D2 in [02-alcance.md](../../02-alcance.md) §7 and finding A-18 in [auditoria-qa.md](../../auditoria-qa/auditoria-qa.md).
- The constitutional text change is drafted in [docs/proposals/constitution-amendment-2026-11.md](../proposals/constitution-amendment-2026-11.md) and justified in ADR-0009.
- Second re-audit findings R2-C01, R2-A01 and R2-A02 in [reauditoria-qa-2.md](../../auditoria-qa/reauditoria-qa-2.md), decided by the author on 2026-11-02 and applied in constitution 1.3.
