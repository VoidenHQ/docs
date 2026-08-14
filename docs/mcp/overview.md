---
  id: overview
  title: MCP in Voiden
  sidebar_label: Overview
---

# MCP in Voiden <span className="doc-beta-badge">Beta</span>

Voiden touches [MCP](https://modelcontextprotocol.io) in three separate ways. Pick the one that matches what you're doing:

| You want to... | Use |
|---|---|
| Call someone else's MCP server from a `.void` file | [Connection Block](./connection-block.md) (`/mcp`) |
| Turn your own requests into tools other agents can call | [Tool Block](./tool-block.md) (`/tool`) + [`@voiden/mcp`](./publish.md) |
| Let Claude Code / Codex run your `.void` requests in this project | [`voiden agent`](../developer-tools/voiden-cli.md#voiden-agent--register-with-an-agent-editor) |

These don't overlap:

- **`/mcp` block — a client.** Point it at someone else's server and call it, the same way a REST request calls an API.
- **`/tool` block + `@voiden/mcp` — a server.** Mark your own requests as tools and publish them so other agents can call *you*.
- **`voiden agent` — local execution, not publishing.** Bundled into the Voiden app itself, it gives an agent editor 4 fixed tools (list files, list requests, run a request, write back a result) for the project you have open. It has nothing to do with `@voiden/mcp`.

---

## Summary

`/mcp` calls other servers. `/tool` + `@voiden/mcp` turns your requests into a server. `voiden agent` lets an editor run your project locally. Three jobs, three pages.
