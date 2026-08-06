---
  id: voiden-mcp-tool
  title: Voiden Tool
  sidebar_label: Voiden Tool
---

# Voiden Tool

The **Voiden Tool** plugin lets you mark an existing request as a named, typed capability an AI agent can call directly — instead of only the four generic run/list/write tools every project gets by default. Declare a `/tool` block once, and `create_user`, `refund_order`, `search_products` — whatever you name it — becomes a real, individually-described, individually-typed tool an agent can discover and call, with a verification policy deciding whether it's currently safe to serve.

---

## Key Features

### **Tool Declaration**

- Mark any existing request as an agent-callable tool, with its own name, title, description, and read-only hint.
- A **Parameters** table splitting each `{{token}}` in the request between agent-supplied and environment-only sources — the agent never sees or controls environment-sourced values.
- A **Verification** policy: reference other requests as happy-path / error-contract / auth-check proof the tool works, each with its own mode (live / sandbox / none) and optional cadence, plus a tool-level on-failure policy (withdraw or serve degraded).

### **Dynamic MCP Serving**

- A verified tool is registered as a real MCP tool by [`@voiden/mcp-server`](/docs/developer-tools/voiden-mcp-server/overview.md) and `voiden-runner mcp serve` — alongside the four built-in ones — with its own name, description, and typed input schema, not a generic pass-through.
- A failing tool is withdrawn from what's served by default, or kept and flagged degraded in its description, per its on-failure policy.
- A manual **enabled** override lets you add or remove a tool from what's served regardless of its current verification state, from the Voiden app's **MCP** tab.

### **Verification & Discovery from the CLI**

- `voiden-runner tool list` — discovers every `/tool` block in a project.
- `voiden-runner tool verify` — runs each tool's verification requests for real and reports verified / unverified / failing, with `--cadence` filtering and `--json` / `--write` output modes.
- `voiden-runner mcp serve [--http] [--check]` — serves a project live over MCP (stdio or streamable-HTTP), or reports served / withdrawn / degraded / excluded without starting a session.

### **Load-Time Validation**

A tool with an unbound or unresolved `{{placeholder}}`, a verification row pointing at a section that doesn't exist, a name collision with another tool, or a read-only tool whose underlying request actually mutates data is **excluded** from the served set entirely — reported separately from a verification failure, so you can tell "this is misconfigured" from "this is failing right now."

---

## Block Ownership

This plugin owns 3 block types for tool identity, parameters, and verification policy:

- [`tool ↗`](/docs/core-features-section/voiden-blocks/tool.md)
- `toolparams` — the parameters table, part of the Tool block
- `toolverifies` — the verification table, part of the Tool block

---

## The Voiden App's MCP Tab

Beyond authoring, this plugin adds an **MCP** tab to the Voiden app (via the plug icon in the top bar) with three views:

- **List** — every `/tool` block discovered across the project.
- **Verify** — runs verification and shows verified / unverified / failing per tool.
- **Serve** — what would actually be served to an agent right now, with an Add/Remove control for the manual `enabled` override.

---

## Dependencies

```json
{
  "core": ">=2.1.0",
  "sdk": "1.0.10"
}
```
