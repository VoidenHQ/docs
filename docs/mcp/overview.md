---
  id: overview
  title: MCP in Voiden
  sidebar_label: Overview
---

# MCP in Voiden <span className="doc-beta-badge">Beta</span>

Voiden touches [MCP](https://modelcontextprotocol.io) in three separate ways. Pick the one that matches what you're doing:

| You want to... | Use |
|---|---|
| Let Claude Code / Codex run your `.void` requests in this project | [Initialize MCP](./initialize.md) |
| Call someone else's MCP server from a `.void` file | [Connection Block](./connection-block.md) (`/mcp-client`) |
| Turn your own requests into tools other agents can call | [Tool Block](./tool-block.md) (`/tool`) + [`@voiden/mcp`](./publish.md) |

These don't overlap:

- **Initialize MCP — local execution, not publishing.** One click in the app (or `voiden agent` from the terminal) gives an agent editor 6 fixed tools for the project you have open right now: list files, list requests, run a request, write back a result, and list/select an environment.
- **`/mcp-client` block — a client.** Point it at someone else's server and call it, the same way a REST request calls an API.
- **`/tool` block + `@voiden/mcp` — a server.** Mark your own requests as tools and publish them so other agents can call *you*.

---

## Summary

Start with **Initialize MCP** — it's the fastest way to let an agent work in your project, and most people never need more than that. Reach for `/mcp-client` to test someone else's server, or `/tool` + `@voiden/mcp` when you're ready to publish your own.
