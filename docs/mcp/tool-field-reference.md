---
  id: tool-field-reference
  title: Tool Block Field Reference
  sidebar_label: Field Reference
---

# Tool Block Field Reference <span className="doc-beta-badge">Beta</span>

Every field on a [Tool Block](./tool-block.md), its **Parameters** table, and its **Verification**
table. For the concepts behind `source`/`binds` and how to actually publish a tool, see
[Publishing with @voiden/mcp](./publish.md).

A `/tool` block decorates a request that already exists — it never generates or replaces one.
Everything below configures *how that decoration works*.

---

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

---

## Parameters table (`toolparams` rows)

Each row lets an agent (or the environment) control one spot in the request — see
[How parameters resolve](./publish.md#how-a-parameter-resolves) for why `source` and `binds` are
both required.

| Field | Type | Required | Default | What it does |
|---|---|---|---|---|
| `name` | string | — | — | The argument name the agent sees. Doesn't have to match `binds`. |
| `binds` | string | ✓ | — | The exact `{{token}}` this param controls. No matching token in the request is an `unbound-param` failure. |
| `type` | enum | — | `string` | `string \| number \| integer \| boolean \| object \| array`. Still `string` for a file/binary token — an agent can only ever pass a string. |
| `required` | boolean | — | `false` | Whether the agent must supply it. |
| `description` | string | — | empty | Shown to the agent. |
| `source` | enum | ✓ | — | `agent` (fresh value on every call) or `environment` (resolved from `.voiden/env-*.yaml`, or the serving process's own env). A `source: environment` param that can't resolve anywhere excludes the tool from being served (or aborts under `--strict`). |

A `{{token}}` with no param row declaring it is the reverse problem — `unresolved-placeholder`.

---

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
there are none.

With scheduling on, each entry re-runs on its own cadence for the life of the published server —
not just once at startup.

---

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
