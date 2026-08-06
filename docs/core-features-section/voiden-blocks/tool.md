---
  id: tool
  title: Tool
  sidebar_label: Tool Block
  sidebar_position: 8
---

# Tool Block

The **Tool block** (`/tool`) marks an existing request in your `.void` file as a named, described, agent-callable capability — instead of an AI agent only ever seeing the four generic `list_requests` / `run_request` / etc. tools every project gets by default, it sees `create_user`, `refund_order`, `search_products` — whatever you name it — with its own description, typed parameters, and a policy for whether it's currently safe to hand to an agent at all.

A `/tool` block doesn't build a request itself — it decorates one that already exists in the same section. If you remove the request it's attached to, the tool has nothing to run.

---

## Adding a Tool

1. Put your cursor in the same section as the request you want to expose (a `request` block, e.g. from Voiden REST API).
2. Type `/tool` and press **Enter**.
3. Fill in the tool's identity:

| Field | What it's for |
|-------|----------------|
| **Name** | The function name an agent calls — short, action-shaped, e.g. `create_user`. |
| **Title** | A human-readable label. |
| **Description** | What the tool does and when to use it — this is what an agent actually reads to decide whether to call it. |
| **Read-only hint** | Tells the agent this tool never mutates anything. Voiden checks this against the underlying request's HTTP method and excludes the tool from being served if it's marked read-only but actually uses `POST`/`PUT`/`PATCH`/`DELETE`. |

---

## Parameters

The **Parameters** table (`toolparams`) answers one question per row: *this request has a `{{token}}` — who fills it in, the agent or Voiden itself?*

| Field | What it's for |
|-------|----------------|
| **Name** | The input name a calling agent sees, when `source` is `agent`. |
| **Binds** | Which `{{token}}` in the underlying request receives the resolved value. |
| **Type** | `string`, `number`, `integer`, `boolean`, `object`, or `array` — shapes the tool's schema. |
| **Required** | Whether the agent must supply it. |
| **Description** | Shown to the agent alongside the tool's own description. |
| **Source** | `agent` or `environment` — see below. |

**`source: agent`** — the value comes from the AI agent's own call, each time it invokes the tool. This is the only kind of param that shows up in the tool's schema at all.

**`source: environment`** — the value is never shown to or settable by the agent. It resolves silently, from your project's environment files (`.voiden/env-public.yaml` / `env-private.yaml`) — use this for API keys, base URLs, tokens, or anything else an agent shouldn't be trusting itself with or making up.

:::note
This only resolves automatically when your project has exactly one named environment. If it has more than one, there's currently no way to pick which one a served tool uses — keep the project to a single environment if you rely on `source: environment` params.
:::

:::note
`binds` is just the name of the `{{token}}` it fills in — not a special keyword. When `source` is `environment`, that same name doubles as the lookup key in your environment files, which is easy to misread as something more meaningful than it is.
:::

---

## Verification

The **Verification** table (`toolverifies`) is how Voiden decides whether a tool is actually safe to hand to an agent, instead of taking your word for it. Each row points at another request that proves this tool still works.

| Field | What it's for |
|-------|----------------|
| **Section label** | Which section (request) proves this tool works. |
| **File (optional)** | A different `.void` file, if the verifying request lives elsewhere — defaults to this tool's own file. |
| **Role** | `happy-path`, `error-contract`, or `auth-check`. An `auth-check` gates the rest — if it fails, the other rows are skipped and the tool is marked failing. |
| **Cadence** | An optional label (e.g. `nightly`) — lets you filter which rows run with `voiden-runner tool verify --cadence nightly`. |
| **Mode** | `live` (runs for real, default), `sandbox` (a label only — Voiden runs it exactly like `live`; it just documents that the target endpoint is already a sandbox), or `none` (skip this row automatically). |

**On failure**, set at the tool level, decides what happens when verification fails:

- **Withdraw from agent** (default) — the tool is hidden entirely.
- **Keep, flagged degraded** — the tool stays visible, with a warning prefixed onto its description.

A tool with no verification rows attached is still served — just marked **unverified** rather than **verified**.

---

## Serving

A `/tool` block by itself doesn't do anything — it becomes a real, callable MCP tool once [`@voiden/mcp-server`](../../developer-tools/voiden-mcp-server/overview.md) (or `voiden-runner mcp serve`) discovers it, checks it structurally, runs its verification rows, and decides to serve it. See that page for the full discover → validate → verify → serve pipeline, and for how to manually add or remove a tool from what's served regardless of its verification state.

---

## Try it Out

1. Write a request — for example, a `POST /users` request with a JSON body.
2. Place your cursor in that section and type `/tool`.
3. Name it `create_user`, write a description an agent would actually understand, and add a **Parameters** row for each `{{token}}` in the request — `source: agent` for whatever the agent should supply, `source: environment` for anything that shouldn't leave your machine.
4. Add a **Verification** row pointing at a request that confirms this endpoint actually works.
5. Run `voiden-runner tool verify` from your terminal, or open the Voiden app's **MCP** tab to see the same decision live — verified/unverified/failing, and whether it's currently served.

---

## Summary

The Tool block turns an existing request into a named, typed, agent-callable capability — with parameters split between what the agent controls and what stays server-side, and a verification policy that decides whether it's actually safe to serve. It never runs on its own; `@voiden/mcp-server` and `voiden-runner mcp serve` are what pick it up and expose it to an AI agent.
