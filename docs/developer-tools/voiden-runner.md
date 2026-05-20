---
id: voiden-runner
title: Voiden Runner
sidebar_label: Voiden Runner
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Voiden Runner <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

`@voiden/runner` lets you run your `.void` files outside the Voiden desktop app — straight from your terminal or inside any CI/CD pipeline. No GUI needed.

You build and edit your `.void` files in the Voiden app as usual. Then whenever you want to run them headlessly — in GitHub Actions, GitLab CI, Docker, or just a local terminal — `voiden-runner` handles it. Any platform that runs Node.js 18+ is supported.

---

## Installation

One command and you're ready to go:

```bash
npm install -g @voiden/runner
```

Requires **Node.js 18 or later**.

---

## Quick Start

Here's what a typical workflow looks like:

```bash
# Run a single file
voiden-runner run auth.void

# Run an entire folder recursively
voiden-runner run ./requests/

# Use a staging environment file
voiden-runner run ./requests/ --env .env.staging

# Stop on first failure — great for CI
voiden-runner run ./tests/ --env .env.ci --stop-on-failure

# Run tests, export a CSV report, and email it to the team
voiden-runner run ./tests/ \
  --env .env.staging \
  --csv ./results/report.csv \
  --mail-to team@company.com
```

---

## Commands

### `run`

The main command — runs one or more `.void` files and prints the results.

```
voiden-runner run <paths...> [options]
```

`<paths...>` accepts any mix of files, directories (recursive), and glob patterns.

| Flag | Description |
|---|---|
| `-e, --env <path>` | Standard `.env` file (`KEY=VALUE`) — merged on top of system env |
| `--env-var <k=v>` | Individual environment variable override (repeatable) |
| `--bail` | Stop on first failure, exit 1 |
| `--stop-on-failure` | Alias for `--bail` (shell `set -e` friendly) |
| `--fail-on-error` | Run all files first, then exit 1 if any failed |
| `--show-req` | Print sent request headers and body for each request |
| `--show-res` | Print response headers and body for each request |
| `--verbose` | Print script logs, plugin messages, and section dividers |
| `--json` | Machine-readable JSON output (suppresses normal output) |
| `--no-session` | Stateless run — does not load or save results or runtime variables |
| `--output-json <file>` | Write the full result object to a JSON file |
| `--csv <path>` | Export a full report to a CSV file. Use `.` for an auto-generated filename |
| `--mail` | Send an HTML summary + attached CSV using `VOIDEN_MAIL_TO` (requires `--csv`) |
| `--mail-to <address>` | Send HTML summary + attached CSV to this address (requires `--csv`) |
| `--mail-from <address>` | Sender address (default: `VOIDEN_MAIL_FROM` env) |
| `--mail-subject <text>` | Email subject (default: `VOIDEN_MAIL_SUBJECT` env or auto-summary) |
| `--smtp-host <host>` | SMTP server host (default: `VOIDEN_SMTP_HOST` env) |
| `--smtp-port <port>` | SMTP server port (default: `VOIDEN_SMTP_PORT` env) |
| `--smtp-secure` | Use TLS for SMTP (default: `VOIDEN_SMTP_SECURE` env) |
| `--smtp-user <user>` | SMTP username (default: `VOIDEN_SMTP_USER` env) |
| `--smtp-pass <pass>` | SMTP password (default: `VOIDEN_SMTP_PASS` env) |

---

### `session`

Check on or clean up the current session state — stored variables and accumulated run results.

```
voiden-runner session status
voiden-runner session vars
voiden-runner session clear
```

| Subcommand | Description |
|---|---|
| `status` | Shows how many variables and results are currently stored |
| `vars` | Lists all stored runtime variables and their current values |
| `clear` | Wipes everything — results and runtime variables |

---

### `report`

Generate a combined report from all the runs accumulated in the current session, or clear the results history.

```
voiden-runner report generate [--csv <path>] [--mail] [--mail-to <address>]
voiden-runner report clear
```

| Subcommand | Description |
|---|---|
| `generate` (alias `gen`) | Creates a combined report from all accumulated session results |
| `clear` | Clears the results history only — runtime variables are preserved |

Accepts all the same mail and SMTP options as the `run` command.

---

### `plugin`

Manage which plugins are active. Core plugins are on by default — you only need this command if you want to disable something or install a community plugin.

```
voiden-runner plugin install [names...] [--all]
voiden-runner plugin uninstall <name>
voiden-runner plugin enable  [name] [--all]
voiden-runner plugin disable [name] [--all]
voiden-runner plugin list
```

Plugin state is saved to `~/.voiden/plugins.json` and carries over across sessions.

| Flag | Command | Description |
|---|---|---|
| `--all` | `install` | Install all core plugins at once |
| `--all` | `enable` | Re-enable all disabled plugins |
| `--all` | `disable` | Disable every plugin in one go |

---

## Environment Variables

Use `{{KEY}}` anywhere in a `.void` file — in the URL, headers, query params, body, or assertion expected values — and the runner will substitute the real value before sending the request.

### Priority (lowest → highest)

1. **System environment** — `process.env`, including CI/CD secrets and platform variables. Always available, no flag needed.
2. **`--env` file** — a standard `.env` file you pass at run time. Overrides system variables.
3. **`--env-var` overrides** — inline per-run overrides. Highest priority, wins over everything.

### `.env` file format

Standard `KEY=VALUE`, one variable per line:

```env
# .env.staging
BASE_URL=https://staging.api.example.com
API_KEY=sk-staging-abc123
USER_ID=42
```

```bash
voiden-runner run ./requests/ --env .env.staging
```

### In CI — no `--env` file needed

If you're running in CI, your platform's secrets and variables are already available as `{{KEY}}` — no extra file required:

<Tabs>
  <TabItem value="github" label="GitHub Actions" default>

```yaml
- run: voiden-runner run tests/
  env:
    BASE_URL: ${{ vars.BASE_URL }}      # → {{BASE_URL}}
    API_KEY:  ${{ secrets.API_KEY }}    # → {{API_KEY}}
```

  </TabItem>
  <TabItem value="gitlab" label="GitLab CI">

```yaml
# CI_* variables are injected automatically
api-tests:
  script: voiden-runner run tests/     # {{CI_COMMIT_SHA}}, {{API_KEY}} etc. just work
```

  </TabItem>
</Tabs>

Inside scripts, you can also read them with `voiden.env.get('KEY')`.

---

## Runtime Variables

Runtime variables let your requests **chain** — grab a value from one response and use it automatically in the next request, without any manual copy-pasting.

### How it works

1. Add a **runtime-variables block** to a `.void` file using the `/runtime-variables` slash command in the Voiden app.
2. Each row maps a **variable name** to a **capture expression** like `{{$res.body.access_token}}`.
3. After the request runs, the runner captures those values and holds them in memory.
4. Any later request in the same run (or even a separate run) can use `{{process.KEY}}` to get the captured value.

### What you can capture

| Expression | What it grabs |
|---|---|
| `{{$res.body.access_token}}` | A JSON field from the response body |
| `{{$res.body.data.items[0].id}}` | A nested path with an array index |
| `{{$res.headers.X-Request-Id}}` | A response header |
| `{{$res.status}}` | The HTTP status code |
| `{{$res.statusText}}` | The HTTP status text |
| `{{$res.time}}` | Response time in ms |
| `{{$req.headers.Authorization}}` | A header from the sent request |
| `{{$req.url}}` | The final URL after variable substitution |

### Using captured values

Reference them anywhere in a subsequent request with `{{process.KEY}}`:

```
GET {{process.baseUrl}}/users/{{process.userId}}
Authorization: Bearer {{process.token}}
```

### Inside scripts

```javascript
// Read a captured value
const token = voiden.variables.get('token')

// Write a value to be used by the next request
voiden.variables.set('token', voiden.response.body.access_token)
```

### Example — login then fetch a profile

**1. `login.void`** — captures the token and user ID:

```
runtime-variables block:
  token  →  {{$res.body.access_token}}
  userId →  {{$res.body.user.id}}
```

**2. `get-profile.void`** — uses them automatically:

```
GET /users/{{process.userId}}
Authorization: Bearer {{process.token}}
```

Run them together and the values flow through:

```bash
voiden-runner run login.void get-profile.void --env .env
```

### Persistence

Captured runtime variables are saved to disk at `~/.voiden/.process.env.json` so they survive across separate `voiden-runner` calls.

- Add `--no-session` to keep everything in-memory for a single run only.
- Run `voiden-runner session clear` to wipe all stored variables.

Your `.void` files are never touched — they stay exactly as you wrote them.

---

## Sessions & Persistence

By default, `voiden-runner` keeps a **stateful session**. Variables captured in one run are automatically available in the next, and every run's results are accumulated so you can generate a single combined report later.

### Running in steps

This means you can split a multi-step workflow across several commands:

```bash
voiden-runner run login.void        # captures token
voiden-runner run get-profile.void  # uses {{process.token}} automatically
```

### Generating a combined report

Every `run` call adds its results to the session. When you're ready, generate a single report covering all of them:

```bash
voiden-runner run login.void
voiden-runner run users.void
voiden-runner run posts.void

# One CSV for all three runs
voiden-runner report --csv ./session-report.csv

# Or email it straight to the team
voiden-runner report --mail-to qa@company.com
```

### Checking and clearing session state

```bash
# See how much is stored
voiden-runner session status

# Wipe everything and start fresh
voiden-runner session clear
```

---

## Plugins

All core plugins ship **enabled by default** — there's nothing to install or configure to get started. You can disable plugins individually or all at once if you need a leaner run.

### `voiden-scripting`

Runs the **pre-request** and **post-response** scripts embedded in your `.void` files. Supports JavaScript, Python, and Shell.

| Language | How it runs |
|---|---|
| JavaScript | In-process — zero overhead |
| Python | `python3` subprocess (detected at startup) |
| Shell (bash) | `bash` subprocess with temp file isolation |

**What's available inside scripts:**

| Property / Method | Description |
|---|---|
| `voiden.request.url` | Request URL (read/write in pre-script) |
| `voiden.request.method` | HTTP method (read/write in pre-script) |
| `voiden.request.headers` | Headers array `[{key, value}]` (read/write) |
| `voiden.request.body` | Request body string (read/write) |
| `voiden.request.queryParams` | Query params array (read/write) |
| `voiden.request.pathParams` | Path params array (read/write) |
| `voiden.response` | Full response object (post-script only) |
| `voiden.response.status` | HTTP status code |
| `voiden.response.body` | Parsed response body |
| `voiden.response.headers` | Response headers `{key: value}` |
| `voiden.env.get('KEY')` | Read a value from the `--env` file |
| `voiden.variables.get('KEY')` | Read a runtime variable |
| `voiden.variables.set('KEY', val)` | Write a runtime variable for the next request |
| `voiden.assert(actual, op, expected, msg?)` | Emit a pass/fail assertion |
| `voiden.log(level?, ...args)` | Log a line (shows up with `--verbose`) |
| `voiden.cancel()` | Cancel the request before it's sent |

**Assertion operators:** `==` `===` `!=` `!==` `>` `>=` `<` `<=` `contains` `includes` `matches` `truthy` `falsy` `eq` `neq` `gte` `lte` `greater` `less`

**Pre-script — stamp a timestamp header before sending:**

```javascript
voiden.request.headers.push({ key: 'X-Run-Ts', value: String(Date.now()), enabled: true })
voiden.log('info', 'Added X-Run-Ts')
```

**Post-script — check the response and capture the token:**

```javascript
const body = voiden.response.body
voiden.assert(voiden.response.status, '==', 200, 'status is 200')
voiden.assert(body.access_token, 'truthy', null, 'token present')
voiden.variables.set('token', body.access_token)
```

---

### `simple-assertions`

Checks the assertion rows in your `assertions-table` block against the actual response — no scripting required.

**Supported field paths:**

| Path | Resolves to |
|---|---|
| `status` | HTTP status code |
| `statusText` | HTTP status text |
| `responseTime` | Response time in ms |
| `header.<Name>` | A specific response header |
| `body.data.id` | A JSON path into the parsed body |
| `body.items[0].name` | Array index access |

**Supported operators:** `equals` `notEquals` `contains` `notContains` `startsWith` `endsWith` `greaterThan` `lessThan` `gte` `lte` `isEmpty` `isNotEmpty` `isNull` `isNotNull` `matches` `exists` `notExists`

---

### `voiden-faker`

Generates realistic fake data on the fly — just drop a `{{$faker.*}}` pattern anywhere in your request and it gets replaced with a fresh value before each send.

```
{{$faker.person.firstName()}}
{{$faker.internet.email()}}
{{$faker.string.uuid()}}
{{$faker.number.int({"min":1,"max":100})}}
```

---

### `voiden-advanced-auth`

Reads the `auth` block from your `.void` file and injects the right credentials into the request automatically.

| Auth type | Runner support |
|---|---|
| Bearer token | Yes |
| Basic auth | Yes |
| API key (header or query) | Yes |
| OAuth 2.0, OAuth 1.0, AWS SigV4, Digest, NTLM | Desktop app only — the runner emits a warning |

`{{KEY}}` patterns inside token or key fields are resolved from your system env or `--env` file.

---

### `voiden-graphql`

Handles GraphQL requests — takes your `gqlquery` and `gqlvariables` blocks and rewrites them as a standard `POST` with `Content-Type: application/json` and a `{query, variables}` body. No extra setup needed.

---

## Output Formats

### Default — human-readable

Clean, colour-coded output that's easy to scan:

```
  voiden-runner · 3 files · 5 plugins active
────────────────────────────────────────────────────────────────

[1/3] auth.void
  ✓  REST POST  https://api.example.com/auth  200 OK  342ms  1.2KB

[2/3] users.void
  ✓  REST GET   https://api.example.com/users  200 OK  128ms
       assertions: 3 passed
       ✓  status is 200
       ✓  body has items
       ✓  items count > 0

[3/3] delete-missing.void
  ✗  REST DELETE  https://api.example.com/users/999  404 Not Found  89ms
       assertions: 1 passed · 1 failed
       ✗  status is 200  (got 404, expected == 200)

────────────────────────────────────────────────────────────────
  Summary  3 requests  ·  2 passed  ·  1 failed  ·  559ms total
────────────────────────────────────────────────────────────────
```

### `--json` — machine-readable

Use `--json` when you want to pipe results into another tool, script, or log aggregator:

```json
{
  "summary": { "total": 3, "passed": 2, "failed": 1, "totalDurationMs": 559, "activePlugins": ["..."] },
  "requests": [
    {
      "file": "/path/to/auth.void",
      "protocol": "rest", "method": "POST", "url": "...",
      "success": true, "status": 200, "durationMs": 342,
      "requestHeaders": { "Content-Type": "application/json" },
      "requestBody": "{\"email\":\"...\"}",
      "responseHeaders": { "content-type": "application/json" },
      "body": "{\"access_token\":\"...\"}",
      "reportEntries": []
    }
  ]
}
```

---

## Reports — CSV and Email

### CSV

Export a full report to a CSV file — useful for sharing with stakeholders or dropping into a spreadsheet:

```bash
# Save to a specific file
voiden-runner run ./tests/ --csv ./results/report.csv

# Let the runner auto-name the file in the current directory
voiden-runner run ./tests/ --csv .
```

CSV columns: `File`, `Protocol`, `Method`, `URL`, `Success`, `Status`, `StatusText`, `DurationMs`, `SizeBytes`, `Error`, `RequestHeaders`, `RequestBody`, `ResponseHeaders`, `ResponseBody`, `AssertionsPassed`, `AssertionsFailed`, `AssertionDetail`

### Email

Send a polished HTML report directly to an inbox — great for automated nightly runs or post-deploy checks:

```bash
voiden-runner run ./tests/ \
  --env .env.ci \
  --csv ./results/report.csv \
  --mail-to qa@company.com
```

The email contains a dark-themed HTML report with per-request cards showing headers, bodies, and assertion results. The subject line is auto-generated from the pass/fail summary unless you set `--mail-subject`.

### SMTP configuration

Add these to your `.env` file or set them as environment variables:

| Variable | Description |
|---|---|
| `VOIDEN_SMTP_HOST` | **Required.** SMTP server hostname (e.g. `smtp.gmail.com`) |
| `VOIDEN_SMTP_PORT` | SMTP port. Defaults to `587` (or `465` if secure) |
| `VOIDEN_SMTP_SECURE` | Set to `true` to use TLS/SSL (port 465) |
| `VOIDEN_SMTP_USER` | SMTP login username |
| `VOIDEN_SMTP_PASS` | SMTP login password |

---

## Passing Results to Other Tools

### `--output-json <file>`

Write the full result to a JSON file so another script, CLI, or tool can pick it up:

```bash
voiden-runner run auth.void --output-json result.json
my-deploy-cli --data result.json

# Each run writes its own file — chain them freely
voiden-runner run login.void --output-json login.json
voiden-runner run users.void --output-json users.json
my-report-tool login.json users.json
```

### `--json` pipe

Pipe the output straight to another command:

```bash
voiden-runner run auth.void --json | jq .
voiden-runner run tests/ --json | my-cli --stdin
voiden-runner run tests/ --json > results.json && python3 analyse.py results.json
```

---

## Exit Codes

The exit code tells your shell or CI pipeline whether everything passed.

| Code | When |
|---|---|
| `0` | All done — no failures (unless `--fail-on-error` or `--bail`/`--stop-on-failure` is set) |
| `1` | A request failed and `--fail-on-error`, `--bail`, or `--stop-on-failure` is set |
| `1` | Something went wrong — bad flag, no files found, missing SMTP config, etc. |

Works universally: bash `$?`, PowerShell `$LASTEXITCODE`, `set -e`, `&&`/`||` chains, and every CI/CD platform.

---

## CI/CD

Install once and run on any CI/CD platform that supports Node.js:

```bash
npm install -g @voiden/runner
```

<Tabs>
  <TabItem value="github" label="GitHub Actions" default>

```yaml
jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }

      - run: npm install -g @voiden/runner

      - name: Write env file
        run: |
          echo "BASE_URL=${{ secrets.BASE_URL }}" >> .env.ci
          echo "API_KEY=${{ secrets.API_KEY }}"   >> .env.ci

      - name: Run API tests
        run: |
          voiden-runner run ./tests/ \
            --env .env.ci \
            --stop-on-failure \
            --json | tee results.json

      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: api-test-results, path: results.json }
```

  </TabItem>
  <TabItem value="gitlab" label="GitLab CI">

```yaml
api-tests:
  image: node:20
  script:
    - npm install -g @voiden/runner
    - echo "BASE_URL=$BASE_URL" >> .env.ci
    - echo "API_KEY=$API_KEY"   >> .env.ci
    - voiden-runner run ./tests/ --env .env.ci --stop-on-failure
```

  </TabItem>
  <TabItem value="windows-cmd" label="Windows (cmd)">

```batch
voiden-runner run tests\ --env .env.ci --stop-on-failure
if %ERRORLEVEL% neq 0 exit /b 1
```

  </TabItem>
  <TabItem value="windows-ps" label="Windows (PowerShell)">

```powershell
voiden-runner run tests/ --env .env.ci --stop-on-failure
if ($LASTEXITCODE -ne 0) { exit 1 }
```

  </TabItem>
</Tabs>

### Request chaining in CI

Variables captured via runtime-variable blocks flow automatically across all files in a single run — no extra wiring needed:

```bash
voiden-runner run login.void get-users.void create-post.void \
  --env .env.ci \
  --stop-on-failure
```

---

## Supported Protocols

| Protocol | Block types |
|---|---|
| REST (HTTP/HTTPS) | `method`, `url`, `headers-table`, `query-table`, `json_body`, … |
| WebSocket (`ws://` / `wss://`) | `socket-request`, `surl`, `smethod` |
| gRPC (`grpc://` / `grpcs://`) | `socket-request`, `proto`, `grpc-messages-node` |
| GraphQL | `gqlquery`, `gqlvariables` |

---

## Summary

Once it clicks, `voiden-runner` becomes a natural part of your workflow. Build your requests in the Voiden app, run them headlessly from the terminal, chain multi-step flows using runtime variables, and ship automated reports straight to your team's inbox. Whether you're running locally or wiring it into a full CI/CD pipeline, the setup is the same — install, point at your files, and go.
