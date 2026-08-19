---
  id: voiden-mcp-client
  title: Voiden MCP Client
  sidebar_label: Voiden MCP Client
---

# Voiden MCP Client <span className="doc-beta-badge">Beta</span>

The **Voiden MCP Client** plugin lets you connect to an external [MCP](https://modelcontextprotocol.io) server — remote or local — and run a single operation against it, the same way `.void` files already test REST and GraphQL requests. Use it to explore, test, and assert on someone else's MCP server, the reverse direction of the [Voiden Tool](./voiden-mcp-tool.md) plugin, which serves your *own* requests as MCP tools.

Phase 1: Streamable-HTTP transport only.

---

## Key Features

### **MCP Operations**

- Connect to any Streamable-HTTP MCP server, remote or running on `localhost`.
- Run `list_tools`, `call_tool`, `list_resources`, `read_resource`, `list_prompts`, or `get_prompt` against it.
- Tool/prompt arguments are authored as JSON, with `{{...}}` placeholders — environment and runtime variables resolve before the call is sent. (Faker tokens don't yet resolve inside these arguments — support is planned.)

### **Config Import**

- Paste a Claude Desktop / Cursor / VS Code / Windsurf-style config directly into a `.void` file — both `{"mcpServers": {...}}` and VS Code's `{"servers": {...}}` shape are recognized — and Voiden fills in the URL and headers automatically. Every HTTP-transport server in the config becomes its own Connection block, not just the first.
- An `mcp-remote`-wrapped entry (`npx -y mcp-remote <url> [--header ...]`) unwraps into the real remote URL and headers directly — it's a stdio↔HTTP bridge, not a local server, so nothing gets spawned.

### **Reuses Existing Request Machinery**

- The same **Auth** block every other protocol uses — including inherited auth from a `.voiden-inherited.void` ancestor file.
- The same **Headers** table, with cookie merging.
- The same **Assertions** table, applied to the MCP response.
- The same code viewer every other block uses for rendering the response body — syntax highlighting, search, and selection, with JSON-encoded text content auto-detected and pretty-printed.

No separate auth system or assertion syntax to learn.

---

## Block Ownership

This plugin owns 3 block types for MCP server connection, operation, and response rendering:

- [`mcp-connection ↗`](/docs/mcp/connection-block.md)
- `mcpoperation` — the operation picker, part of the MCP Connection block
- `mcp-response` — response rendering

---

## Request Pipeline

The plugin registers build and response handlers for the MCP protocol, reusing the same shared request-building utilities (`voiden-rest-api`'s `context.helpers.requestUtils`) other protocols use for headers, cookies, query/path params, and auth — rather than a separate hand-rolled implementation.

---

## Dependencies

```json
{
  "core": ">=2.1.0",
  "sdk": "1.0.10"
}
```
