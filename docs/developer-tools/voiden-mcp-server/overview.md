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
same way you'd hit Run in the Voiden app. If your project declares any
[Tool blocks](/docs/core-features-section/voiden-blocks/tool.md), it also
serves those as their own named, typed tools alongside the four built-in ones.

It runs as an ordinary local `stdio` process, started by the agent's host
(Claude Code, Codex, Claude Desktop) for the duration of a session. It has no
UI of its own and isn't a dependency of the Voiden app or `@voiden/runner` —
it's an independent package the host downloads and runs on demand via `npx`.
Under the hood it calls the exact same `@voiden/runner` execution engine the
CLI and the app's Run button use — just returned as structured data instead of
console text.

---

## Tools

Every project gets four fixed tools:

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

## Dynamic Tool Serving

If your project uses the [Voiden Tool](/docs/plugins/core-plugins/voiden-mcp-tool.md)
plugin, every declared [Tool block](/docs/core-features-section/voiden-blocks/tool.md)
gets its own entry alongside the four fixed tools above — named, described,
and typed from what you wrote in the block, not a generic pass-through.

This happens once, when the server process starts:

1. **Discover** — scan every `.void` file for `/tool` blocks.
2. **Validate** — structural checks (unbound placeholders, dangling
   verification references, duplicate names, a read-only tool that actually
   mutates). A tool that fails any of these is excluded entirely.
3. **Verify** — run each tool's verification requests for real.
4. **Decide** — a manual `enabled: false` override always withdraws a tool
   first; otherwise a failing tool is withdrawn (or served with a
   **⚠ degraded** note, per its own policy), and a verified or unverified
   tool is served.
5. **Register** — each served tool becomes a real, individually-callable MCP
   tool for the rest of that session.

Because this only happens at startup, editing a tool's verification rows or
its `enabled` flag doesn't take effect until the next time the agent's host
spawns a fresh server — restart the session, or use your host's reload
command (Claude Code: `/mcp`).

To see the same decision without connecting an agent, run:

```bash
npx @voiden/mcp-server <project-path> --check
```

This prints served / withdrawn / degraded / excluded for every discovered
tool and exits non-zero if anything is failing or excluded — useful in CI,
or just to sanity-check before connecting a real session. The Voiden app's
**MCP** tab (List / Verify / Serve) shows the same thing live, and lets you
toggle the manual `enabled` override directly.

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

You don't install or run this package directly — one of these registers it
for you:

- The Voiden app's **status bar → Initialize MCP** button — registers the
  server for whichever project is currently open, and installs the skill
  that teaches the list → run → write-back loop above. This is a deliberate,
  explicit action scoped to one project at a time; it's no longer tied to
  the Settings → AI Skill toggle (see that page's note on what changed).
- **`voiden-runner mcp install`** (see
  [@voiden/runner → Command Options](../voiden-runner/command-options.md)) —
  for CLI-only users with no Voiden app installed.

Both register the same server command
(`npx -y @voiden/mcp-server@latest <project-path>`) with Claude Code and/or
Codex.

:::note
Registering the server is a separate step from editing what it serves.
Neither path re-registers automatically — if `.mcp.json` (Claude Code) or
`~/.codex/config.toml` (Codex) already points at this project, nothing
touches it again on its own. Re-run Initialize MCP (or `mcp install`)
yourself if you ever need to.
:::
