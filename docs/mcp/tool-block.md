---
  id: tool-block
  title: Tool Block
  sidebar_label: Tool Block
---

# Tool Block <span className="doc-beta-badge">Beta</span>

The **Tool block** (`/tool`) marks an existing request as a named, agent-callable tool. Instead of an AI agent only seeing generic tools, it sees `create_user`, `refund_order`, `search_products` — whatever you name it.

A `/tool` block doesn't build a request — it decorates one that already exists. By default that's the request in the same section.

:::note
This is a two-part page: day-to-day use first, then the full field-by-field reference in the collapsible section at the bottom. To actually serve a tool to an agent, see [Publishing with @voiden/mcp](./publish.md).
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

---

<details>
<summary><b>Full Field Reference</b> — every field, type, default, and validation check</summary>

Everything below configures *how the decoration works* — types, defaults, and every check that can exclude a tool from being served. For the concepts behind `source`/`binds`, see [How a parameter resolves](./publish.md#how-a-parameter-resolves).

## The tool block itself

| Field | Type | Required | Default | What it does |
|---|---|---|---|---|
| `name` | string | ✓ | — | The tool name an agent calls. Must be unique across everything you publish — a duplicate anywhere excludes **every** tool with that name (`duplicate-name` check, below). |
| `title` | string | — | empty | Human-readable display title. No effect on the MCP protocol name. |
| `description` | string | recommended | empty | What the agent reads to decide whether/how to call the tool. Treat it like a docstring, not a label. |
| `annotations` | object | — | `{}` | Standard MCP [tool annotations](https://modelcontextprotocol.io/), advisory only. Four booleans: `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`. `readOnlyHint: true` on a request that actually uses `POST`/`PUT`/`PATCH`/`DELETE` triggers the `readonly-mutating` check. |
| `enabled` | boolean | — | `true` | Manual on/off switch, independent of verification. `false` withdraws the tool no matter how it verifies. |
| `requestFilePath` | string | — | this tool's own file | Cross-file binding: which `.void` file the wrapped request lives in. Store this **relative to the project root** (`api/users.void`), not as an absolute path — an absolute path only works on the machine it was saved on. |
| `requestSectionLabel` | string \| `null` | — | not bound | Cross-section binding, paired with `requestFilePath`. **Absent** means "use the sibling request in this tool's own section." Once set to any value (even `""`), the tool is *bound*, and a target that doesn't resolve is a `dangling-request-reference` failure. |
| `requestUid` | string | internal | — | Links the tool to its sibling request when not cross-file-bound. Editor-managed. |
| `uid`, `pluginId`, `pluginVersion` | string | internal | — | Editor bookkeeping. Leave alone. |

### A note on path portability

`requestFilePath` (and `toolverifies`' own `filePath`, below) are saved relative to the project
root, and resolved back to absolute wherever they're read — the app, or `@voiden/mcp` on a
different machine. A relative path must have **no leading slash**: `firstrequest.void`, not
`/firstrequest.void` — a leading slash means "filesystem root," not "project root."

## Parameters table (`toolparams` rows)

| Field | Type | Required | Default | What it does |
|---|---|---|---|---|
| `name` | string | — | — | The argument name the agent sees. Doesn't have to match `binds`. |
| `binds` | string | ✓ | — | The exact `{{token}}` this param controls. No matching token in the request is an `unbound-param` failure. |
| `type` | enum | — | `string` | `string \| number \| integer \| boolean \| object \| array`. Still `string` for a file/binary token — an agent can only ever pass a string. |
| `required` | boolean | — | `false` | Whether the agent must supply it. |
| `description` | string | — | empty | Shown to the agent. |
| `source` | enum | ✓ | — | `agent` (fresh value on every call) or `environment` (resolved from `.voiden/env-*.yaml`, or the serving process's own env). A `source: environment` param that can't resolve anywhere excludes the tool from being served (or aborts under `--strict`). |

A `{{token}}` with no param row declaring it is the reverse problem — `unresolved-placeholder`.

## Verification table (`toolverifies` rows)

| Field | Type | Required | Default | What it does |
|---|---|---|---|---|
| `filePath` | string | — | this tool's own file | Which `.void` file the verification request lives in. Same project-root-relative convention as `requestFilePath` — a **separate** field. |
| `sectionLabel` | string | — | — | Which section to run. Must match exactly once a file has more than one section. A non-match is a `missing-section` failure. |
| `role` | enum | — | `happy-path` | `happy-path` — a normal successful call. `error-contract` — proves a documented failure mode still behaves (e.g. a 404 for a bad id). `auth-check` — runs first; if it fails, every other entry is skipped. |
| `cadence` | enum | — | `hourly` | `hourly \| daily \| weekly \| monthly` — only these four values are recognized (case-insensitive). Anything else silently falls back to `hourly`. |
| `mode` | enum | — | `live` | `live` runs for real. `sandbox` is a label only — runs exactly like `live`. `none` never runs automatically. |
| `onFailure` | enum | — | `withdraw` | Per-entry. `withdraw` pulls the tool from what's served. `advertise-degraded` keeps it served, flagged in its description. The most conservative entry wins if they disagree. |

Verification reads real signal: any [assertions](../core-features-section/voiden-blocks/assertion-block.md)
on the request are checked, falling back to plain transport success (no error, no 4xx/5xx) if
there are none. With scheduling on, each entry re-runs on its own cadence for the life of the
published server — not just once at startup.

## Validation checks that can exclude a tool

Run at discovery, and again on every scheduled re-check. Any of these excludes the tool from what's
served, with the reason printed:

| Check | Fires when |
|---|---|
| `unbound-param` | A param's `binds` names a token that doesn't exist in the request. |
| `unresolved-placeholder` | The request has a `{{token}}` with no param declaring it. |
| `missing-section` | A verify row's `sectionLabel` doesn't match any real section. |
| `dangling-request-reference` | The tool is bound to a file/section that doesn't exist. |
| `duplicate-name` | Two or more tools share the same `name` — all of them excluded. |
| `readonly-mutating` | `readOnlyHint: true` but the request actually mutates. |

A tool that passes all of these but fails **live verification** is withdrawn or degraded per its
own policy, not excluded outright — structural issues mean the block is misconfigured; verification
failures mean the API itself isn't healthy right now.

</details>
