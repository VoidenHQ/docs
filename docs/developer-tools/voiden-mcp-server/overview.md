---
id: overview
title: "@voiden/mcp-server"
sidebar_label: Overview
sidebar_position: 1
---

# @voiden/mcp-server <span className="doc-beta-badge">Beta</span>

`@voiden/mcp-server` is an [MCP](https://modelcontextprotocol.io) server that
exposes your `.void` files to an AI agent as callable tools — list what
requests exist, actually run one, and record what happened back into the
file. It's the bridge that lets an assistant like Claude Code or Codex not
just *write* a `.void` request, but *execute* it and check the result, the
same way you'd hit Run in the Voiden app.

It runs as an ordinary local `stdio` process, started by the agent's host
(Claude Code, Codex, Claude Desktop) for the duration of a session. It has no
UI of its own and isn't a dependency of the Voiden app or `@voiden/runner` —
it's an independent package the host downloads and runs on demand via `npx`.
Under the hood it calls the exact same `@voiden/runner` execution engine the
CLI and the app's Run button use — just returned as structured data instead of
console text.

---

## Tools

| Tool | What it does |
|------|-----------|
| `list_void_files` | Lists every `.void` file in the project, as paths relative to the project root. |
| `list_requests` | Parses a `.void` file and lists its requests — label, request uid, method, URL — without executing anything. |
| `run_request` | Executes a request from a `.void` file — a real HTTP/GraphQL/WebSocket/etc. call, using the project's plugins and env. Omit the section label to run every request in the file. Returns a structured result: pass/fail, status, timing, headers, body. |
| `write_result` | Records a `run_request` result back into the `.void` file, as a `response` block placed right after the request it belongs to. Replaces any previous recorded result for that request. |

The intended loop is: **list** what's there → **run** it for real → read the
structured result and confirm it's actually correct, not just well-formed →
optionally **write** the result back into the file so it's recorded.

---

## Execution safety

`run_request` makes a real network call, and `write_result` edits a file on
disk with no locking. The server does no extra gating beyond describing this
in each tool's own description — the MCP host's per-call approval prompt
(the "allow this tool call?" confirmation Claude Code / Codex shows) is the
intended safety boundary, not something this package enforces itself.

Avoid calling `write_result` against a `.void` file that's open with unsaved
edits in Voiden at the same time — whichever side saves second wins, silently.

---

## Project root

The server resolves its project root from, in order: the first CLI argument,
the `VOIDEN_PROJECT_ROOT` environment variable, or the working directory the
host launched it from. All file paths passed to its tools are resolved
against that root and rejected if they'd resolve outside it.

---

## Getting it running

You don't install or run this package directly — one of its two callers does
that for you:

- The Voiden app's **Settings → AI Skill** toggle (see
  [AI Skill](/docs/getting-started-section/settings/ai-skill)) — for
  desktop users, scoped to whatever project is currently open.
- **`voiden-runner mcp install`** (see
  [@voiden/runner → Command Options](../voiden-runner/command-options.md)) —
  for CLI-only users with no Voiden app installed.

Both paths register the same server command
(`npx -y @voiden/mcp-server <project-path>`) with Claude Code and/or Codex,
and install a skill teaching the list → run → write-back loop above.
