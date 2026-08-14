---
  id: tool
  title: Tool
  sidebar_label: Tool Block
  sidebar_position: 8
---

# Tool Block <span className="doc-beta-badge">Beta</span>

The **Tool block** (`/tool`) marks an existing request in your `.void` file as a named, described, agent-callable capability — instead of an AI agent only ever seeing the four generic `list_requests` / `run_request` / etc. tools every project gets by default, it sees `create_user`, `refund_order`, `search_products` — whatever you name it — with its own description, typed parameters, and a policy for whether it's currently safe to hand to an agent at all.

A `/tool` block doesn't build a request itself — it decorates one that already exists. By default that's the request in the same section; it can also point at a request in a different file or section (see [Binding to a different request](#binding-to-a-different-request) below). If the request it's bound to disappears, the tool has nothing to run.

:::note
This page covers what the block's fields do and how to use them day to day. For the exhaustive field-by-field reference — types, defaults, every validation check — see the [`/tool` Block Field Reference](./mcp-tool-block-reference.md). For turning a tool into a real, running MCP server, see [Publishing Tools as an MCP Server](../../developer-tools/mcp-tool-publish-guide.md).
:::

---

## Adding a Tool

1. Put your cursor in the same section as the request you want to expose (a `request` block, e.g. from Voiden REST API).
2. Type `/tool` and press **Enter**.
3. Fill in the tool's identity:

| Field | What it's for |
|-------|----------------|
| **Name** | The function name an agent calls — short, action-shaped, e.g. `create_user`. Must be unique across every tool served by the same `@voiden/mcp` instance. |
| **Title** | A human-readable label — doesn't affect the MCP protocol name. |
| **Description** | What the tool does and when to use it — this is what an agent actually reads to decide whether to call it. |
| **Annotations** | Four checkboxes describing the tool's behavior to a calling agent — see below. |

![A /tool block with Name, Title, Description, annotations, a parameter row, and a verification row filled in](/img/tool-block.png)

**Annotations** are four standard MCP hints about what the tool actually does, so an agent can reason about a call before making it:

| Annotation | What it signals |
|------------|-----------------|
| **Read-only** | This tool never mutates anything. The only annotation Voiden itself cross-checks — at serve time, `@voiden/mcp` compares it against the underlying request's HTTP method and excludes the tool if it's marked read-only but actually uses `POST`/`PUT`/`PATCH`/`DELETE`. |
| **Destructive** | Calling this tool may cause irreversible or destructive changes (e.g. deleting a record), as opposed to purely additive ones. Only meaningful when Read-only is unchecked. |
| **Idempotent** | Calling this tool again with the same arguments has no additional effect beyond the first call (e.g. a `PUT` that sets a fixed value, vs. a `POST` that creates a new record every time). Only meaningful when Read-only is unchecked. |
| **Open-world** | This tool interacts with an open-ended, unpredictable domain — a live web search, a third-party API you don't control — rather than a closed one with a fixed, known shape, like your own database. |

Other than Read-only, these are documentation hints for the agent's own judgment, not something Voiden validates or enforces — checking a box doesn't change how the tool runs.

There's also a manual **Enabled** override (default on) that force-withdraws or restores a tool regardless of what verification says — the one override that isn't a verification outcome. Toggle it from the Voiden app's **MCP** tab rather than in the block itself.

---

## Binding to a different request

By default, a `/tool` block decorates the request sitting in its own section. It can instead bind to a request living in a different file and/or section — useful for keeping a dedicated "tool catalog" file separate from the APIs it wraps, rather than scattering `/tool` blocks throughout every request file. This is an advanced, hand-edited pairing rather than something exposed as a form field today — see the [field reference](./mcp-tool-block-reference.md#the-tool-block-itself) for the exact `requestFilePath`/`requestSectionLabel` behavior, including what counts as "bound" once set, and the path-portability rules for saving a file path that still resolves on a different machine.

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

**`source: environment`** — the value is never shown to or settable by the agent. It resolves silently, from your project's environment files (`.voiden/env-public.yaml` / `env-private.yaml`), or from the serving process's own environment when there's no project env file — use this for API keys, base URLs, tokens, or anything else an agent shouldn't be trusting itself with or making up. A param that can't resolve anywhere excludes the tool from what's served (or aborts the whole publish under `--strict`), rather than sending a request with a literal unresolved `{{token}}` in it.

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
| **Cadence** | `hourly`, `daily`, `weekly`, or `monthly` — only these four values are recognized (case-insensitive); anything else silently falls back to `hourly`. Controls how often this row re-runs once a published server's `--scheduler` is live. |
| **Mode** | `live` (runs for real, default), `sandbox` (a label only — Voiden runs it exactly like `live`; it just documents that the target endpoint is already a sandbox), or `none` (skip this row automatically). |

**On failure**, set at the tool level, decides what happens when verification fails:

- **Withdraw from agent** (default) — the tool is hidden entirely.
- **Keep, flagged degraded** — the tool stays visible, with a warning prefixed onto its description.

A tool with no verification rows attached is still served — just marked **unverified** rather than **verified**.

---

## Serving

A `/tool` block by itself doesn't do anything — it becomes a real, callable MCP tool once [`@voiden/mcp`](../../developer-tools/mcp-tool-publish-guide.md) (or `voiden-runner mcp serve`) discovers it, checks it structurally, runs its verification rows, and decides to serve it. See [Publishing Tools as an MCP Server](../../developer-tools/mcp-tool-publish-guide.md) for hosting it as a real server, and the [field reference](./mcp-tool-block-reference.md#validation-checks-that-can-exclude-a-tool) for the full list of checks that can exclude a tool before verification even runs.

---

## Try it Out

1. Write a request — for example, a `POST /users` request with a JSON body.
2. Place your cursor in that section and type `/tool`.
3. Name it `create_user`, write a description an agent would actually understand, and add a **Parameters** row for each `{{token}}` in the request — `source: agent` for whatever the agent should supply, `source: environment` for anything that shouldn't leave your machine.
4. Add a **Verification** row pointing at a request that confirms this endpoint actually works.
5. Run `voiden-runner tool verify` from your terminal, or open the Voiden app's **MCP** tab to see the same decision live — verified/unverified/failing, and whether it's currently served.

---

## Summary

The Tool block turns an existing request into a named, typed, agent-callable capability — with parameters split between what the agent controls and what stays server-side, and a verification policy that decides whether it's actually safe to serve. It never runs on its own; [`@voiden/mcp`](../../developer-tools/mcp-tool-publish-guide.md) and `voiden-runner mcp serve` are what pick it up and expose it to an AI agent.
