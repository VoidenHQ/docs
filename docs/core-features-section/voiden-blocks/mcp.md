---
  id: mcp
  title: MCP Connection
  sidebar_label: MCP Connection Block
  sidebar_position: 9
---

# MCP Connection Block

The **MCP Connection block** (`/mcp`) lets you connect to an external [MCP](https://modelcontextprotocol.io) server and run a single operation against it — list or call its tools, list or read its resources, list or get its prompts — the same way `.void` files already test REST and GraphQL requests. It's for *testing and exploring* someone else's MCP server, the reverse direction of the [Tool block](./tool.md), which *serves* your own requests as MCP tools.

Phase 1 supports **Streamable-HTTP** transport only — remote servers, or a local one running on `localhost`. Stdio/local-process servers aren't supported yet.

---

## Structure

An MCP Connection block has two children:

- **Server URL** (`mcpurl`) — the Streamable-HTTP endpoint, e.g. `http://localhost:3000/mcp` or a remote URL.
- **Operation** (`mcpoperation`) — which call to make, and against what.

| Operation | What it does |
|-----------|----------------|
| `list_tools` | Lists the tools the server exposes. |
| `call_tool` | Calls a named tool with a JSON arguments object. |
| `list_resources` | Lists the server's resources. |
| `read_resource` | Reads a resource by URI. |
| `list_prompts` | Lists the server's prompts. |
| `get_prompt` | Gets a named prompt with a JSON arguments object. |

`call_tool` and `get_prompt` take their arguments as a JSON object, written in the block's code editor — same as any other request field, this can contain `{{...}}` placeholders (environment variables and [runtime variables](./runtime_variables.md)), resolved before the call is sent.

:::note
[Faker](/docs/plugins/core-plugins/voiden-faker.md) tokens don't resolve inside tool/prompt arguments yet — only in the URL, headers, query/path params, and body of other protocols. Support for this block is planned but not yet built.
:::

---

## Auth and Headers

The MCP Connection block reuses Voiden's existing **Auth** block and **Headers** table — nothing MCP-specific to learn. Inherited auth from a `.voiden-inherited.void` ancestor file also applies, same as REST requests.

---

## Importing from an existing config

If you already have this server configured somewhere else — Claude Desktop, Cursor, VS Code, Windsurf — paste its `mcpServers` JSON config directly into a new MCP Connection block:

```json
{
  "mcpServers": {
    "my-server": {
      "url": "http://localhost:3000/mcp",
      "headers": { "Authorization": "Bearer ..." }
    }
  }
}
```

Voiden detects the paste, and fills in the block's URL and headers from the first HTTP-transport entry automatically.

---

## Response

Running an MCP Connection block produces an **MCP Response** block, rendered like any other response — with the same **Assertions** table support for checking the result, the same way you'd assert on a REST response's body or status.

---

## Try it Out

1. Type `/mcp` and press **Enter**.
2. Set the **Server URL** to your MCP server's endpoint.
3. In the **Operation** child, pick `list_tools` first to confirm the connection works and see what's actually available.
4. Switch to `call_tool`, pick a tool name from the list, and write its arguments as JSON.
5. Run the block with **Cmd + Enter** / **Ctrl + Enter** and inspect the response.

---

## Summary

The MCP Connection block lets you connect to and test any Streamable-HTTP MCP server directly from a `.void` file — list its tools/resources/prompts, call one, and assert on the result — reusing Voiden's existing auth, headers, and assertions machinery rather than introducing a separate way of doing things.
