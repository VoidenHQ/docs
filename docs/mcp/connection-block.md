---
  id: connection-block
  title: MCP Connection Block
  sidebar_label: Connection Block
---

# MCP Connection Block <span className="doc-beta-badge">Beta</span>

The **MCP Connection block** (`/mcp`) connects to an external [MCP](https://modelcontextprotocol.io) server and runs one operation against it — the same way `.void` files already test REST and GraphQL requests. Use it to explore and test *someone else's* server. That's the reverse of the [Tool Block](./tool-block.md), which serves *your own* requests as tools.

Streamable-HTTP transport only, for now — remote servers or `localhost`. No stdio/local-process servers yet.

---

## Structure

Two children:

- **Server URL** (`mcpurl`) — the endpoint, e.g. `http://localhost:3000/mcp`.
- **Operation** (`mcpoperation`) — which call to make.

| Operation | What it does |
|-----------|----------------|
| `list_tools` | Lists the server's tools. |
| `call_tool` | Calls a named tool with a JSON arguments object. |
| `list_resources` | Lists the server's resources. |
| `read_resource` | Reads a resource by URI. |
| `list_prompts` | Lists the server's prompts. |
| `get_prompt` | Gets a named prompt with a JSON arguments object. |

`call_tool` and `get_prompt` arguments are written as JSON, and can contain `{{...}}` placeholders (environment and [runtime variables](../core-features-section/variables/runtime-variables.md)), resolved before the call is sent.

:::note
[Faker](/docs/plugins/core-plugins/voiden-faker.md) tokens don't resolve inside tool/prompt arguments yet — planned, not built.
:::

![An MCP Connection block, with Server URL, Type, Tool, and a JSON arguments editor](/img/mcp-connection-block.png)

---

## Auth and Headers

Reuses Voiden's existing **Auth** block and **Headers** table — nothing new to learn. Inherited auth from a `.voiden-inherited.void` file also applies.

---

## Importing from an existing config

Already have this server configured in Claude Desktop, Cursor, VS Code, or Windsurf? Paste its `mcpServers` JSON straight into a new MCP Connection block:

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

Voiden detects the paste and fills in the URL and headers automatically.

---

## Response

Running the block produces an **MCP Response** block, with the same **Assertions** table support as any other response.

![A call_tool operation and its MCP Response, showing status, timing, and the returned JSON](/img/mcp-response-block.png)

---

## Try it Out

1. Type `/mcp` and press **Enter**.
2. Set the **Server URL**.
3. Pick `list_tools` first to confirm the connection works.
4. Switch to `call_tool`, pick a tool, and write its arguments as JSON.
5. Run with **Cmd + Enter** / **Ctrl + Enter** and inspect the response.

---

## Summary

The MCP Connection block lets you connect to and test any Streamable-HTTP MCP server from a `.void` file — reusing Voiden's existing auth, headers, and assertions instead of a separate way of doing things.
