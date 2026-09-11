---
  id: publish
  title: Publishing with @voiden/mcp
  sidebar_label: Publish (@voiden/mcp)
---

# Publishing with @voiden/mcp <span className="doc-beta-badge">Beta</span>

This page is for turning your own requests into a server that other AI agents (or teammates) can call over the network — a step up from testing locally. It involves running a command in a terminal, so it's more technical than the rest of the MCP docs; if you just want an assistant to run requests in your own project, see [Initialize MCP](./initialize.md) instead, which needs none of this.

`@voiden/mcp` is a separate package that turns your [Tool Block](./tool-block.md)-tagged requests into a real MCP server other agents can call. `voiden-mcp [path]` discovers every `/tool` block under `path`, verifies each one, and serves everything that passes — over stdio by default, or `--http` for a real network endpoint.

:::note
`@voiden/mcp` **only** publishes `/tool` blocks. It does not include Voiden's 6 built-in project tools (`list_void_files`, `list_requests`, `run_request`, `write_result`, `list_environments`, `select_environment`) — those are local to the Voiden app, via [`voiden agent`](../developer-tools/voiden-cli.md#voiden-agent--register-with-an-agent-editor). Registering `voiden agent` for a project and publishing `/tool` blocks with `@voiden/mcp` are two unrelated things.
:::

Running `@voiden/mcp` *is* the server starting — it doesn't send anything "to" a server elsewhere.

---

## Quick start

Add at least one [Tool block](./tool-block.md) to a request, then from your project folder:

```bash
npx @voiden/mcp .
```

That's it — this discovers every `/tool` block, verifies it, and serves everything that passes over stdio. Nothing to configure first. Add `--http --port 3000` instead of the stdio default if you want a real network endpoint you can hit with `curl` or point another agent at. Everything past this point — the full flag list, OAuth, CI/CD, deploying somewhere always-on — is there for when you outgrow this, not required to get going.

---

## How it works

1. **Discover** — scan every `.void` file for `/tool` blocks.
2. **Validate** — structural checks (unbound placeholders, dangling references, duplicate names, a read-only tool that actually mutates). A tool that fails is excluded.
3. **Verify** — run each tool's verification requests for real.
4. **Serve** — a failing tool is withdrawn (or served flagged **degraded**, per its own policy); a verified or unverified tool is served.

Run `voiden-mcp <path> --check` any time to see this decision without starting a live server — it prints served / withdrawn / degraded / excluded, with a reason for each.

---

## How a parameter resolves

Every row in a tool's **Parameters** table is agent-supplied — the agent provides a fresh value on every call, and `binds` says exactly which `{{token}}` in the request receives it. There's no separate "environment"-sourced kind of param — every `{{token}}` the request uses currently needs its own Parameters row, even one you only ever want resolved from your environment and never touched by the agent. An undeclared token excludes the tool as `unresolved-placeholder`. See [Tool Block](./tool-block.md) for the full field list.

A param can only bind to a token that's already in the request. A hardcoded value has nothing to attach to — template that spot first.

---

## Hosting flags

Grouped by what they're for — most projects only ever touch **Network**.

:::tip
Most flags also have a matching env var (`--port` → `VOIDEN_PUBLISH_PORT`, and so on) — CLI flag wins, then env var, then the default below. The Environment flags (`--env`, `--profile`, `--environment`) and `--check` are the exceptions — CLI-only, no env var equivalent.
:::

### Network

| Flag | Default | What it does |
|---|---|---|
| `--port <n>` | `3000` | TCP port the server listens on. |
| `--host <addr>` | `127.0.0.1` | `127.0.0.1` = this machine only. `0.0.0.0` = reachable from the network — opt-in. |
| `--tunnel` | off | Public `cloudflared` quick tunnel — only needed with no public IP of your own. Requires `cloudflared` on `PATH`. |
| `--public-url <url>` | — | The externally-reachable URL clients actually use — for a manual port-forward or reverse proxy, instead of `--tunnel`. |

### Environment

| Flag | What it does |
|---|---|
| `-e, --env <path>` | One plain `.env` file, merged on top of the process's own env. |
| `--profile [name]` | A project [env profile](/docs/getting-started-section/advanced-environment-config) as the server's initial env — same system the `select_environment` tool exposes to an agent. Bare flag means `"default"`. |
| `--environment <name>` | Scope `--profile` to one named environment in it (e.g. `"dev"`, or `"staging.eu"`). |

:::note
`--env` and `--profile` are mutually exclusive — pick one. `--environment` only does anything alongside `--profile`.
:::

### Tool exposure

| Flag | What it does |
|---|---|
| `--dynamic-tools` | Off by default. Expose just 2 fixed tools (`search_tools`/`call_tool`) instead of one per tool — for a large surface that would otherwise overwhelm an agent's context window. |

### Inspecting the server

| Flag | What it does |
|---|---|
| `--check` | Dry run — prints served/withdrawn/degraded/excluded and exits, no live server started. |
| `--print-config` | Once the server is up, prints a ready-to-paste `{"mcpServers": {...}}` entry — also fills a Connection block automatically if pasted into a `.void` file. |
| `--verbose` | Print plugin-load diagnostics. Without it, a plugin failing to load does so silently — the server just serves 0 tools with no error. |

### Reliability

| Flag | Default | What it does |
|---|---|---|
| `--no-scheduler` | scheduler **on** | Turns off periodic re-verification (each tool re-runs on its own [cadence](./tool-block.md#verification) otherwise, over stdio too via a clean restart on change). |
| `--scheduler-interval-minutes <n>` | `1` | How often the scheduler *checks* what's due — not how often a tool actually re-verifies, which is still its own cadence. |
| `--no-restart` | restart **on** | Turns off the auto-restart supervisor — use when something else already supervises the process (systemd, pm2, Docker `--restart=always`). |

:::note
`@voiden/mcp` is still early (`0.0.x`) and this flag surface is changing fast — if something here doesn't match what `voiden-mcp --help` prints for you, trust the CLI's own `--help` output.
:::

### Auth

`--http`/`--tunnel` serve with **no authentication** by default — whoever reaches the URL has full tool access. Turn on auth with `--oauth`, `--sso-*`, `--api-key`, or any combination (whichever credential is presented is checked; any that matches lets the request through).

#### No auth (default)

```bash
voiden-mcp . --http --tunnel
```

Nothing gates the MCP endpoint. `/health` is always open, with or without auth on.

#### `--oauth`

```bash
voiden-mcp . --http --tunnel --oauth
```

Adds `.well-known/oauth-protected-resource`, `.well-known/oauth-authorization-server`, `/register`, `/authorize`, `/token`, `/revoke`, and a bearer-token check in front of the MCP endpoint. Required by MCP clients that mandate a full OAuth 2.1 handshake before connecting at all (e.g. claude.ai's connector UI).

- `/authorize` auto-approves — no login page. `voiden-mcp` is a single-operator, locally-run tool, so this satisfies clients that require the protocol shape without adding a new identity check.
- Registered clients and issued tokens persist to `~/.voiden/mcp-oauth.json` — a restart doesn't force reconnected clients to re-authenticate.
- The issuer must be HTTPS or loopback — combine `--oauth` with `--tunnel` for a public HTTPS URL, or `--public-url` if you're already behind your own port-forward/reverse proxy. Without either, `--oauth` only works on the default `127.0.0.1`/`localhost` bind.

#### `--sso-*` — delegate login to your own IdP

```bash
voiden-mcp . --http --tunnel \
  --sso-authorize-url https://your-idp.example.com/oauth/authorize \
  --sso-token-url https://your-idp.example.com/oauth/token \
  --sso-registration-url https://your-idp.example.com/oauth/register
```

Replaces `--oauth`'s auto-approve with a real login at your own IdP. `--sso-authorize-url` + `--sso-token-url` together turn OAuth mode on by themselves — no need to also pass `--oauth`.

- `--sso-registration-url` is required alongside the two above — your IdP's Dynamic Client Registration (RFC 7591) endpoint. Many enterprise IdPs (Okta, Auth0, Keycloak) support this when configured for it.
- `--sso-revocation-url` is optional, for an IdP with a revocation endpoint.
- An IdP with only one fixed, manually-created app and no DCR (how plain "Sign in with Google/GitHub" work) isn't supported yet — `--sso-client-id`/`--sso-client-secret` exist only to fail with an explanatory error if you try.

#### `--api-key` — a static shared secret

```bash
voiden-mcp . --http --tunnel --api-key
# → 🔑 API key required — pass "Authorization: Bearer <generated-key>"
```

A shared Bearer token — no browser, no handshake. Independent of `--oauth`/`--sso-*`, and combinable with either. Pass the flag alone to auto-generate a key, persisted under `~/.voiden/mcp-api-keys.json` and printed at startup — or pass `--api-key <value>` (or set `VOIDEN_PUBLISH_API_KEY`, once `--api-key` is present, to keep the literal value off the command line) to set one explicitly.

---

## Running it from CI/CD

CI jobs have no public inbound networking — a bound port isn't reachable from outside the job. Two options:

- **Ephemeral / preview**: add `--tunnel` for a public URL that lives as long as the job.
- **Always-on**: CI can't host a persistent server itself. Deploy to something that can — a self-hosted runner, or a platform like Railway/Render/Fly.io.

```yaml
# .github/workflows/publish-mcp.yml (illustrative)
- name: Run MCP server
  env:
    VOIDEN_PUBLISH_PORT: 3000
    STRIPE_API_KEY: ${{ secrets.STRIPE_API_KEY }}
  run: npx @voiden/mcp ./api --http --tunnel
```

---

## Worked example: deploying to Render

[Render](https://render.com)'s free tier needs no card and gives a stable HTTPS URL. The same shape works on Railway, Fly.io, or any platform that runs a start command and injects `$PORT`.

1. **Push a repo with your `.void` files.** No `package.json` needed — `npm install` creates one.
2. **New → Web Service on Render**, pointed at that repo.
3. **Build Command:**
   ```bash
   npm install @voiden/mcp@latest
   ```
   Not `-g` — Render's build container doesn't run as root.
4. **Start Command:**
   ```bash
   npx voiden-mcp . --http --port $PORT --host 0.0.0.0
   ```
5. **Deploy.** Your MCP endpoint is `https://your-app.onrender.com/mcp`; `/health` is live too.

If you see `0 tool(s) served` with no explanation, run `voiden-mcp . --check` locally on the same commit — it names every excluded tool and why. The most common cause: a cross-file `requestFilePath` still holding an absolute path from wherever it was authored, or one with a leading slash. `requestFilePath` is relative to the project root — `/firstrequest.void` isn't actually relative (a leading slash means filesystem root), and an absolute path only resolves on the machine that saved it.

---

## Importing a server config into Voiden

Paste any MCP server's config JSON — Claude Desktop, Cursor, Windsurf, `.mcp.json`, VS Code's `.vscode/mcp.json`, or `--print-config`'s own output — anywhere in a `.void` file, and Voiden fills in a [Connection Block](./connection-block.md) automatically. Every server in the config becomes its own block; headers import as an object or an array; `mcp-remote`-wrapped entries import too. A genuinely local server (spawns its own process) can't become a block and shows a toast explaining why.

---

## FAQ

**Do I need to buy a domain?**
No. `--tunnel` gives a public URL with zero domain and zero signup. If the machine already has a public IP, skip both — bind the port directly.

**What happens if the request has a `{{token}}` that isn't declared as any parameter?**
That tool is excluded from what's served as an `unresolved-placeholder`, with the reason printed by `--check`. This applies even to a token you intend to resolve from your environment; every `{{token}}` the request uses currently needs a matching Parameters row.

**I see `0 tool(s) served` — why?**
Run `voiden-mcp <path> --check` — it prints exactly which tools were excluded and why. See the Render example above for the two most common causes.

**Does the scheduler work over stdio, or only `--http`?**
Both. Over stdio, a state change triggers a clean restart so a reconnecting client picks up the new list — needs the auto-restart supervisor, on by default.
