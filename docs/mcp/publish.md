---
  id: publish
  title: Publishing with @voiden/mcp
  sidebar_label: Publish (@voiden/mcp)
---

# Publishing with @voiden/mcp <span className="doc-beta-badge">Beta</span>

`@voiden/mcp` is a separate package that turns your [Tool Block](./tool-block.md)-tagged requests into a real MCP server other agents can call. `voiden-mcp [path]` discovers every `/tool` block under `path`, verifies each one, and serves everything that passes — over stdio by default, or `--http` for a real network endpoint.

:::note
`@voiden/mcp` **only** publishes `/tool` blocks. It does not include Voiden's 4 built-in project tools (`list_void_files`, `list_requests`, `run_request`, `write_result`) — those are local to the Voiden app, via [`voiden agent`](../developer-tools/voiden-cli.md#voiden-agent--register-with-an-agent-editor). Registering `voiden agent` for a project and publishing `/tool` blocks with `@voiden/mcp` are two unrelated things.
:::

Running `@voiden/mcp` *is* the server starting — it doesn't send anything "to" a server elsewhere.

---

## How it works

1. **Discover** — scan every `.void` file for `/tool` blocks.
2. **Validate** — structural checks (unbound placeholders, dangling references, duplicate names, a read-only tool that actually mutates). A tool that fails is excluded.
3. **Verify** — run each tool's verification requests for real.
4. **Serve** — a failing tool is withdrawn (or served flagged **degraded**, per its own policy); a verified or unverified tool is served.

Run `voiden-mcp <path> --check` any time to see this decision without starting a live server — it prints served / withdrawn / degraded / excluded, with a reason for each.

---

## How a parameter resolves

Each row in a tool's **Parameters** table answers two questions:

| Field | Question it answers |
|---|---|
| `source` | *Who provides the value?* `agent` — supplied fresh on every call. `environment` — resolved from env files (or the serving process's own environment), never shown to the agent. |
| `binds` | *Where does it go?* The exact `{{token}}` name in the request. |

Both are always required — `source` says who, `binds` says where; neither implies the other. See the [Field Reference](./tool-block.md) for the full field list.

A param can only bind to a token that's already in the request. A hardcoded value has nothing to attach to — template that spot first.

---

## Hosting flags

| Flag | What it controls |
|---|---|
| `--port` | TCP port the server listens on. |
| `--host` | `127.0.0.1` (this machine only, default) or `0.0.0.0` (reachable from the network — opt-in). |
| `--dynamic-tools` | Off by default. Pass this to expose just 2 fixed tools (`search_tools`/`call_tool`) instead of one per tool — keeps a large surface from overwhelming an agent's context window. |
| `--print-config` | Prints a ready-to-paste `{"mcpServers": {...}}` entry once the server is up. Works with Claude Desktop, Claude Code, Cursor — and pasting it into a `.void` file fills in a Connection block automatically. |
| `--tunnel` | Optional. Wraps the server in a public `cloudflared` quick tunnel — only needed when the machine has no public IP of its own (a laptop, an ephemeral CI job). Requires `cloudflared` on `PATH`. |
| `--scheduler` | On by default. Keeps re-verifying tools after startup, on each entry's own [cadence](./tool-block.md#verification-table-toolverifies-rows), instead of just once. Works over stdio too — a state change triggers a clean restart. |
| `--no-restart` | Disables the auto-restart supervisor — use when something else already supervises the process (systemd, pm2, Docker). |

Every flag has a matching env var (`VOIDEN_PUBLISH_PORT`, `VOIDEN_PUBLISH_HOST`, etc.) — CLI flag wins, then env var, then the default. `voiden-mcp --check` is a dry run; `voiden-mcp --version` prints the installed version.

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

If you see `0 tool(s) served` with no explanation, run `voiden-mcp . --check` locally on the same commit — it names every excluded tool and why. The most common cause: a cross-file `requestFilePath` still holding an absolute path from wherever it was authored, or one with a leading slash (`/firstrequest.void` isn't relative — see [path portability](./tool-block.md#a-note-on-path-portability)).

---

## Importing a server config into Voiden

Paste any MCP server's config JSON — Claude Desktop, Cursor, Windsurf, `.mcp.json`, VS Code's `.vscode/mcp.json`, or `--print-config`'s own output — anywhere in a `.void` file, and Voiden fills in a [Connection Block](./connection-block.md) automatically. Every server in the config becomes its own block; headers import as an object or an array; `mcp-remote`-wrapped entries import too. A genuinely local server (spawns its own process) can't become a block and shows a toast explaining why.

---

## FAQ

**Do I need to buy a domain?**
No. `--tunnel` gives a public URL with zero domain and zero signup. If the machine already has a public IP, skip both — bind the port directly.

**What happens if a `source: environment` param has no value anywhere?**
That tool is excluded from what's served, with a reason printed — or add `--strict` to abort the whole publish instead.

**I see `0 tool(s) served` — why?**
Run `voiden-mcp <path> --check` — it prints exactly which tools were excluded and why. See the Render example above for the two most common causes.

**Does the scheduler work over stdio, or only `--http`?**
Both. Over stdio, a state change triggers a clean restart so a reconnecting client picks up the new list — needs the auto-restart supervisor, on by default.
