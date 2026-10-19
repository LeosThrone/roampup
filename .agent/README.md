# RoamPup Antigravity Handoff

## Included
- `SRS.md`: scope, requirements and acceptance criteria.
- `ARCHITECTURE.md`: stack direction, architecture, data model, API boundaries, provider rules, testing and milestones.
- `AGENT_SKILL.md`: reusable coding-agent skill instructions.
- `.agent/skills/roampup-builder/SKILL.md`: same skill in a folder-based layout.
- `ANTIGRAVITY_PROMPT.md`: initial prompt for Antigravity.
- `DECISIONS_TEMPLATE.md` and `docs/DECISIONS.md`: provider/architecture decision log template.

## Use it
1. Extract this package into your RoamPup repository or copy the docs into the repo root.
2. Keep `SRS.md` and `ARCHITECTURE.md` available to the agent for every session.
3. If your Antigravity environment supports folder-based skills, copy `.agent/skills/roampup-builder/SKILL.md` to the skill path required by your installed version. Verify its exact supported path and format.
4. Open the existing repo and paste `ANTIGRAVITY_PROMPT.md` as the first task.
5. Require a repository audit before coding.
6. Verify provider terms, quotas, attribution and costs before live integration.
7. Put keys in environment variables; never commit secrets.

## Suggested placement
```text
docs/SRS.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
.agent/skills/roampup-builder/SKILL.md
ANTIGRAVITY_PROMPT.md
```

This is a requirements and architecture baseline, not proof that live provider APIs or the existing repository have been audited. The agent must verify those before implementation.
