---
id: overview
title: "@voiden/mcp-server"
sidebar_label: Overview
sidebar_position: 1
---

# @voiden/mcp-server <span className="doc-beta-badge">Beta</span>

`@voiden/mcp-server` is an [MCP](https://modelcontextprotocol.io) server with
four built-in tools that give an AI agent structured access to your `.void`
files — list what requests exist, actually run one, and record what happened
back into the file. It's the bridge that lets an assistant like Claude Code or
Codex not just *write* a `.void` request, but *execute* it and check the
result, the same way you'd hit Run in the Voiden app.

Those four tools are fixed and always present, regardless of what your
project contains. Plugins can register additional tools into the same
server on top of them — the
[Voiden Tool](/docs/plugins/core-plugins/voiden-mcp-tool.md) plugin does
exactly this: declare a [Tool block](/docs/core-features-section/voiden-blocks/tool.md)
in a `.void` file, and it's served as its own individually-named, described,
and typed tool alongside the four built-in ones. See
[Dynamic Tool Serving](#dynamic-tool-serving) below.

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

![Voiden's MCP tab listing the four built-in tools served to a connected agent](/img/mcp-server-tools-list.png)

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

![Authoring a /tool block — name, description, read-only hint, and a verification row — that gets discovered and served](/img/mcp-server-tool-registered.gif)

Because this only happens at startup, editing a tool's verification rows or
its `enabled` flag doesn't take effect until the next time the agent's host
spawns a fresh server — restart the session, or use your host's reload
command (Claude Code: `/mcp`).

To see the same decision without connecting an agent, run:

```bash
npx @voiden/mcp-server <project-path> --check
```

![Running the --check command in a terminal against a project's MCP server](/img/mcp-server-check-output.gif)

This prints served / withdrawn / degraded / excluded for every discovered
tool and exits non-zero if anything is failing or excluded — useful in CI,
or just to sanity-check before connecting a real session. The Voiden app's
**MCP** tab (List / Verify / Serve preview) shows the same thing live, and lets you
toggle the manual `enabled` override directly.

![The Voiden app's MCP tab](/img/voiden-app-mcp-tab.gif)

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
  server for whichever project is currently open, and refreshes the general
  `.void`-authoring skill (see [AI Skill](/docs/getting-started-section/settings/ai-skill)).
  It does *not* install a dedicated skill walking through the list → run →
  write-back loop — your assistant picks that up from each tool's own
  description instead. This is a deliberate, explicit action scoped to one
  project at a time; it's no longer tied to the Settings → AI Skill toggle
  (see that page's note on what changed).
- **`voiden-runner mcp install`** (see
  [@voiden/runner → Command Options](../voiden-runner/command-options.md)) —
  for CLI-only users with no Voiden app installed. Unlike the button above,
  this *does* install a standalone skill teaching the list → run →
  write-back loop, since a CLI-only setup has no app-composed authoring
  skill to fall back on.

![The Voiden app's status bar, with the Initialize MCP button](/img/initialize-mcp-button.png)

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

---

## Using It With an Agent

Once the server is registered, you don't call `list_requests` or
`run_request` yourself — you talk to the agent in plain language, and it
decides which tool to reach for based on each tool's name and description,
the same way it decides between any of its other tools.

A few concrete prompts and what they trigger under the hood:

| You say | What the agent does |
|---------|----------------------|
| "What `.void` files are in this project?" | Calls `list_void_files`. |
| "What requests are in `auth.void`?" | Calls `list_requests` with that file path — nothing runs yet. |
| "Run the login request in `auth.void`" | Calls `run_request` with the file path and section label, and reads back pass/fail, status, timing, headers, and body. |
| "Run it again and save the result" | Calls `run_request`, then `write_result` with the returned result — a `response` block appears in the file, right after the request. |
| "Create a user named Jane" (with a `create_user` [Tool block](/docs/core-features-section/voiden-blocks/tool.md) declared) | Calls `create_user` directly with `name: "Jane"` — it's a first-class tool by then, not something the agent knows to translate into `run_request` + a section label. |

Every call still goes through your host's own per-call approval prompt
before anything actually runs — see [Execution safety](#execution-safety).
Nothing here bypasses that.

If the agent doesn't seem to be using a tool you expect it to have, ask it
directly — "what tools do you have from voiden-mcp?" — or check your host's
own connection status (Claude Code: `/mcp`) to confirm the server is
actually running and the tool you're expecting was served, not withdrawn or
excluded (see [Dynamic Tool Serving](#dynamic-tool-serving) above).
