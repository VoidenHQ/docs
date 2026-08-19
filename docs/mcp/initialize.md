---
  id: initialize
  title: Initialize MCP
  sidebar_label: Initialize MCP
---

# Initialize MCP <span className="doc-beta-badge">Beta</span>

The fastest way to let Claude Code or Codex actually *run* your `.void` requests — not just write them. One click, scoped to whichever project you have open.

---

## Two ways to do it

- **Voiden app** — status bar → **Initialize MCP** button.

  ![The Voiden app's status bar, with the Initialize MCP button](/img/initialize-mcp-button.png)

- **Terminal** — `voiden agent`. See the [CLI docs](../developer-tools/voiden-cli.md#voiden-agent--register-with-an-agent-editor) for options.

  ![Running `voiden agent` in a terminal, registering Claude Code and Codex](/img/initialize-mcp-cli.png)

Both do the same thing: register a small MCP server for this project with Claude Code and/or Codex.

| Assistant | Registered in |
|-----------|------------------------|
| **Claude** | `.mcp.json` in your project root |
| **Codex** | `[mcp_servers.voiden-mcp]` in `~/.codex/config.toml` |

This is per-project and doesn't repeat itself automatically — click the button (or re-run `voiden agent`) again if you switch to a different project.

---

## What your assistant gets

Four fixed tools, always the same, no matter what your project contains:

| Tool | What it does |
|---|---|
| `list_void_files` | Lists every `.void` file in the project. |
| `list_requests` | Lists a file's requests, without running anything. |
| `run_request` | Actually runs a request and returns the result. |
| `write_result` | Records a result back into the `.void` file. |

That's it. **No** [Tool blocks](./tool-block.md) you've declared, and no `@voiden/mcp` — those are a separate, unrelated flow for publishing your own tools. See [Publishing with @voiden/mcp](./publish.md) if that's what you're after.

---

## Not the same as AI Skill

**AI Skill** (Settings → AI Skill) teaches your assistant the `.void` *format*, so it can write valid blocks — it doesn't register anything or let your assistant execute requests. **Initialize MCP** is the separate, explicit step for that. See [AI Skill](/docs/getting-started-section/settings/ai-skill) for the writing side.

---

## Summary

Click **Initialize MCP** (or run `voiden agent`) once per project, and your assistant can list, run, and record `.void` requests directly — no publishing, no server to host.
