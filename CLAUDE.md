# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This is a Claude Code AI operating system configuration repository. It contains no runnable application code — only configuration files that wire together 370+ MCP servers, 200+ skills, and a large library of agent definitions. Everything here is consumed by Claude Code at session start.

## Core Files

| File | Purpose |
|------|---------|
| `.mcp.json` | Registers all MCP servers (370+). Each entry uses `npx -y <package>` so no pre-install is needed. |
| `.claude/settings.json` | Sets `enableAllProjectMcpServers: true`, which auto-loads every server in `.mcp.json`. |
| `skills-lock.json` | Tracks installed skills by name, GitHub source repo, path within that repo, and a content hash for integrity. Managed by the Claude Code skills system (`/skills add`, etc.). |

## MCP Server Pattern

All servers follow the same shape in `.mcp.json`:

```json
"server-name": {
  "command": "npx",
  "args": ["-y", "<npm-package-name>"],
  "env": {
    "API_KEY": "YOUR_API_KEY_HERE"
  }
}
```

Placeholder values use `"YOUR_*_HERE"` or `"..."` — these must be replaced with real credentials before the server becomes functional. Servers without an `env` block (e.g. `playwright`, `filesystem`, `wikipedia`) work without credentials.

To add a new MCP server, append an entry to `.mcp.json` following the pattern above. No restart command is needed — Claude Code picks up `.mcp.json` changes on the next session.

## Skills System

Skills live in two places:

- **`skills-lock.json`** — the authoritative registry. Each skill entry maps a name to its GitHub source, relative file path, and SHA-256 hash. The file is managed automatically by `claude skills add <source>/<skill>`.
- **`.agents/skills/`** — the actual `SKILL.md` files fetched from GitHub sources. Subdirectory names follow a `<number>-<kebab-name>` convention (e.g. `003-agents-installation`, `031-architecture-adr-functional-requirements`). Skills from external repos are stored under their own subdirectory trees.

To invoke a skill in a session, use `/skill-name` (e.g. `/code-review`). The available skills list is shown in the system prompt.

## Agent Library

`.agents/agency-agents/` is reserved for the 232 AI specialist agents from `msitarzewski/agency-agents`. The `003-agents-installation` skill handles bootstrapping these into `.cursor/agents` or `.claude/agents` interactively.

## Credential Management

No credentials are stored in the repository. All env values in `.mcp.json` are placeholders. Supply real keys via:
- Shell environment variables (export before starting Claude Code)
- A `.env` file loaded by your shell profile (`.env` is not gitignored by default here, so take care)
- Injecting secrets through your deployment environment

## Repository Conventions

- There is no build, lint, or test step — this is configuration only.
- `.gitignore` excludes `logs/`, Prisma SQLite files, and `excalidraw.log`.
- When adding skills from GitHub, prefer running `claude skills add <owner>/<repo>` rather than manually editing `skills-lock.json`.
- When editing `.mcp.json`, keep entries alphabetically ordered within their logical group to make diffs readable.
