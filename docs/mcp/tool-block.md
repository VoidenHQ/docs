---
  id: tool-block
  title: Tool Block
  sidebar_label: Tool Block
---

# Tool Block <span className="doc-beta-badge">Beta</span>

The **Tool block** (`/tool`) marks an existing request as a named, agent-callable tool. Instead of an AI agent only seeing generic tools, it sees `create_user`, `refund_order`, `search_products` — whatever you name it.

A `/tool` block doesn't build a request — it decorates one that already exists. By default that's the request in the same section.

:::note
This page covers the fields and day-to-day use. For every field in full detail, see the [Field Reference](./tool-field-reference.md). To actually serve a tool to an agent, see [Publishing with @voiden/mcp](./publish.md).
:::

---

## Adding a Tool

1. Put your cursor in the same section as the request you want to expose.
2. Type `/tool` and press **Enter**.
3. Fill in the identity fields:

| Field | What it's for |
|-------|----------------|
| **Name** | The function name an agent calls, e.g. `create_user`. Must be unique across every tool you publish. |
| **Title** | A human-readable label. |
| **Description** | What the tool does. This is what an agent reads to decide whether to call it. |
| **Annotations** | Four hints about the tool's behavior — see below. |

![A /tool block with Name, Title, Description, annotations, a parameter row, and a verification row filled in](/img/tool-block.png)

**Annotations** — standard MCP hints for the calling agent:

| Annotation | Meaning |
|------------|-----------------|
| **Read-only** | Never mutates anything. The only one Voiden checks — a read-only tool whose request is `POST`/`PUT`/`PATCH`/`DELETE` gets excluded from publishing. |
| **Destructive** | May cause irreversible changes (e.g. deleting a record). |
| **Idempotent** | Calling it again with the same arguments has no extra effect. |
| **Open-world** | Talks to an open-ended domain (a live web search) rather than a fixed one (your own database). |

Other than Read-only, these are just hints for the agent — Voiden doesn't enforce them.

There's also an **Enabled** switch (on by default) that force-removes a tool regardless of verification. Toggle it from the app's **MCP** tab.

---

## Parameters

The **Parameters** table answers one question per row: *this request has a `{{token}}` — who fills it in?*

| Field | What it's for |
|-------|----------------|
| **Name** | The input name the agent sees (only shown when Source is `agent`). |
| **Binds** | Which `{{token}}` in the request receives the value. |
| **Type** | `string`, `number`, `integer`, `boolean`, `object`, or `array`. |
| **Required** | Whether the agent must supply it. |
| **Description** | Shown to the agent. |
| **Source** | `agent` or `environment` — see below. |

- **`source: agent`** — the agent supplies the value on every call.
- **`source: environment`** — pulled silently from your project's `.voiden/env-*.yaml` files, never shown to the agent. Use this for API keys, tokens, and anything else the agent shouldn't handle.

:::note
`binds` is just the token's name, not a special keyword. When Source is `environment`, that same name doubles as the lookup key in your environment files.
:::

---

## Verification

The **Verification** table proves a tool actually works before it's served — each row points at a request that tests it.

| Field | What it's for |
|-------|----------------|
| **Section label** | Which request proves this tool works. |
| **File (optional)** | A different `.void` file, if the request lives elsewhere. |
| **Role** | `happy-path`, `error-contract`, or `auth-check`. A failing `auth-check` skips everything else. |
| **Cadence** | `hourly`, `daily`, `weekly`, or `monthly` — how often this re-runs once published. |
| **Mode** | `live` (runs for real), `sandbox` (label only, runs the same), or `none` (never runs automatically). |

**On failure** (set at the tool level):

- **Withdraw** (default) — hide the tool entirely.
- **Keep, flagged degraded** — keep it visible, with a warning in its description.

No verification rows? The tool still gets served, just marked **unverified**.

---

## Try it Out

1. Write a request — e.g. `POST /users` with a JSON body.
2. Place your cursor in that section and type `/tool`.
3. Name it `create_user`, write a clear description, and add a Parameters row for each `{{token}}`.
4. Add a Verification row pointing at a request that confirms the endpoint works.
5. Open the app's **MCP** tab to see it live — verified/unverified/failing, and whether it's currently served.

---

## Summary

The Tool block turns a request into a named, typed tool — parameters split between agent-supplied and server-side, plus a verification policy deciding whether it's safe to serve. It never runs on its own; [`@voiden/mcp`](./publish.md) is what publishes it.
