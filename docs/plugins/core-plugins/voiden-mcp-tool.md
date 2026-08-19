---
  id: voiden-mcp-tool
  title: Voiden Tool
  sidebar_label: Voiden Tool
---

# Voiden Tool <span className="doc-beta-badge">Beta</span>

The **Voiden Tool** plugin lets you mark an existing request as a named, typed capability an AI agent can call directly — instead of only the four generic run/list/write tools every project gets by default. Declare a `/tool` block once, and `create_user`, `refund_order`, `search_products` — whatever you name it — becomes a real, individually-described, individually-typed tool an agent can discover and call, with a verification policy deciding whether it's currently safe to serve.

---

## Key Features

### **Tool Declaration**

- Mark any existing request as an agent-callable tool, with its own name, title, description, and annotations (read-only, destructive, idempotent, open-world).
- A **Parameters** table declaring which `{{token}}` in the request the agent supplies a value for on each call, with a type, required flag, and description shown to the agent.
- A **Verification** policy: reference other requests as happy-path / error-contract / auth-check proof the tool works, each with its own mode (live / sandbox / none), optional cadence, and its own on-failure policy (withdraw or serve degraded) — set per verification row, not tool-wide. When more than one row fails at once, the most conservative policy among them wins.
- Cross-file request/verify references save a path relative to the referencing file's own project, not an absolute path baked to one machine — so they survive being cloned elsewhere.

### **Dynamic MCP Serving**

- A verified tool is registered as a real MCP tool — by [`@voiden/mcp`](/docs/mcp/publish.md) on its own, or by `voiden-runner mcp serve` alongside the 4 built-in tools in CI/no-app setups — with its own name, description, and typed input schema, not a generic pass-through.
- A failing tool is withdrawn from what's served by default, or kept and flagged degraded in its description, per its on-failure policy.
- A manual **enabled** override lets you add or remove a tool from what's served regardless of its current verification state.

### **Verification & Discovery from the CLI**

- `voiden-runner tool list` — discovers every `/tool` block in a project.
- `voiden-runner tool verify` — runs each tool's verification requests for real and reports verified / unverified / failing, with `--cadence` filtering and `--json` / `--write` output modes.
- `voiden-runner mcp serve [--http] [--check]` — serves a project live over MCP (stdio or streamable-HTTP), or reports served / withdrawn / degraded / excluded without starting a session.

### **Load-Time Validation**

A tool with an unbound or unresolved `{{placeholder}}`, a verification row pointing at a section that doesn't exist, a name collision with another tool, or a read-only tool whose underlying request actually mutates data is **excluded** from the served set entirely — reported separately from a verification failure, so you can tell "this is misconfigured" from "this is failing right now."

---

## Block Ownership

This plugin owns 3 block types for tool identity, parameters, and verification policy:

- [`tool ↗`](/docs/mcp/tool-block.md)
- `toolparams` — the parameters table, part of the Tool block
- `toolverifies` — the verification table, part of the Tool block

---

## Seeing What's Actually Served

This plugin doesn't add its own in-app preview — run `voiden-mcp <path> --check` (see [Publishing with @voiden/mcp](/docs/mcp/publish.md)) to see served / withdrawn / degraded / excluded for every tool, with a reason for each, without starting a live server.

---

## Dependencies

```json
{
  "core": ">=2.1.0",
  "sdk": "1.0.10"
}
```
