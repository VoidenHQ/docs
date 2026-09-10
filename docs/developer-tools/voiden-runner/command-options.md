---
id: command-options
title: Command Options
sidebar_label: Command Options
sidebar_position: 3
---

All options are appended after specifying the command and your file or directory path:

```bash
voiden-runner <command> [file|directory] [options]
```

---

## Run Options

Executes one or more `.void` files. Accepts a file path, a directory path, or a glob pattern.

```bash
voiden-runner run <paths...> [options]
```

### Execution

| Option | Description |
|---|---|
| `--bail`, `--stop-on-failure` | Stop immediately after the first failed request |
| `--fail-on-error` | Run all files, then exit with code `1` if any failed |
| `--no-session` | Stateless run — does not load or save session variables |

### Environment

| Option | Description |
|---|---|
| `-e, --env <path>` | Load a plain `.env` file (`KEY=VALUE` format) — for a path outside the project's profile convention. Mutually exclusive with `--profile`. |
| `--profile [name]` | Use a project env profile (`.voiden/env-<profile>-{public,private}.yaml`, merged — or that profile's legacy `.env*` fallback). Bare `--profile` means `"default"`. Mutually exclusive with `--env`. See [Attach an Environment](./attach-environment.md). |
| `--environment <name>` | Scope `--profile` to one named environment within it (e.g. `"dev"`, or a dotted child like `"staging.eu"`) instead of merging every environment together. Only valid with `--profile`, not `--env`. |
| `--env-var <k=v>` | Set a single inline variable (repeatable) — always wins over `--env`/`--profile` |

### Output

| Option | Description |
|---|---|
| `--show-req` | Print sent request headers and body |
| `--show-res` | Print response headers and body |
| `--verbose` | Print script logs, plugin messages, and section dividers |
| `--json` | Machine-readable JSON output (suppresses normal terminal output) |
| `--output-json <file>` | Write the full result object to a JSON file |
| `--csv <path>` | Export a report to CSV (use `.` for an auto-generated filename) |

### Email Report

| Option | Description |
|---|---|
| `--mail` | Send an HTML report to the address in `VOIDEN_MAIL_TO` env var |
| `--mail-to <address>` | Send HTML report to this address |
| `--mail-from <address>` | Sender address (defaults to `VOIDEN_MAIL_FROM` env) |
| `--mail-subject <text>` | Custom email subject line |
| `--smtp-host <host>` | SMTP server hostname |
| `--smtp-port <port>` | SMTP port |
| `--smtp-secure` | Enable TLS/SSL |
| `--smtp-user <user>` | SMTP username |
| `--smtp-pass <pass>` | SMTP password |

---

## Session Management

The session stores runtime variables and results captured across runs. Use these subcommands to inspect or reset that state.

```bash
voiden-runner session status    # Show counts of stored variables and results
voiden-runner session vars      # List all stored runtime variables
voiden-runner session clear     # Wipe all session state
```

:::info
Session state is stored at `~/.voiden/.process.env.json`. Use `--no-session` on the `run` command to skip loading or saving session state for a one-off run.
:::

---

## Report Generation

Generate a combined report from all accumulated run results. Accepts the same `--csv` and mail/SMTP options as `run`.

```bash
voiden-runner report generate [options]   # Generate report from accumulated results
voiden-runner report gen [options]        # Alias for generate
voiden-runner report clear                # Wipe accumulated results history only
```

---

## Plugin Management

Manage the runner's plugins.

```bash
voiden-runner plugin list                          # List all available and installed plugins
voiden-runner plugin install <plugin-name>          # Install a plugin (--all installs every core plugin)
voiden-runner plugin install <plugin-name>@<ver>    # Pin an exact version
voiden-runner plugin update <plugin-name>           # Update to the latest registry version (--all for every installed plugin with an update)
voiden-runner plugin uninstall <plugin-name>         # Remove an installed plugin (--all for every installed plugin)
voiden-runner plugin enable <plugin-name>
voiden-runner plugin disable <plugin-name>
```

**Core plugins:**

| Plugin | Description | Enabled by default |
|---|---|:---:|
| [Voiden REST API](../../plugins/core-plugins/voiden-rest-api.md) | Handles standard HTTP REST requests | ✓ |
| [Advanced Authentication](../../plugins/core-plugins/advanced-authentication.md) | Bearer tokens, basic auth, and API keys | ✓ |
| [Simple Assertions](../../plugins/core-plugins/simple-assertion.md) | Evaluates assertion blocks against response fields | ✓ |
| [Voiden Faker](../../plugins/core-plugins/voiden-faker.md) | Generates dynamic test data via `{{$faker.*}}` patterns | ✓ |
| [Voiden GraphQL](../../plugins/core-plugins/voiden-graphql.md) | Converts GraphQL blocks to standard HTTP POST requests | ✓ |
| [Voiden Scripting](../../plugins/core-plugins/voiden-scripting.md) | Runs JavaScript, Python, or shell pre/post-request scripts | ✓ |
| [Socket & gRPC](../../plugins/core-plugins/socket/overview.md) | WebSocket and gRPC request support | ✓ |

---

## MCP Integration

Enables the AI-agent run/verify loop for CLI-only users who don't have the
Voiden desktop app (which has its own equivalent Settings toggle — see
[AI Skill](/docs/getting-started-section/settings/ai-skill)). Registers
`voiden-runner mcp serve` with Claude Code and/or Codex — a standalone server
exposing the same 6 fixed tools as [`voiden agent`](../voiden-cli.md#voiden-agent--register-with-an-agent-editor)
(list/run/write plus list/select environment),
plus any [Tool blocks](/docs/mcp/tool-block.md) in the project — and installs
a skill teaching the list/run/verify/write-back workflow.

```bash
voiden-runner mcp install                                # both Claude Code and Codex
voiden-runner mcp install --claude                        # Claude Code only
voiden-runner mcp install --codex                          # Codex only
voiden-runner mcp install -p ./my-project                  # register against a specific project dir (default: cwd)
voiden-runner mcp install --local-server ./dist/index.js   # point at a local build instead of npx, for testing before publish
```

| Option | Description |
|---|---|
| `--claude` | Install for Claude Code only |
| `--codex` | Install for Codex only |
| `-p, --project <path>` | Project directory to register the MCP server against (default: `.`) |
| `--local-server <path>` | Use `node <path>` instead of `npx -y @voiden/runner mcp serve`, for testing a local build before publish |

Restart Claude Code / Codex (or run `/mcp`) afterwards to pick up the new
server.

```bash
voiden-runner mcp uninstall [--claude] [--codex] [-p <path>]   # remove the registration + skill
voiden-runner mcp status [-p <path>]                            # show what's currently installed
```

:::info
`mcp install` writes a project-scoped `.mcp.json` (Claude Code) containing an
absolute, machine-specific path — it's added to your project's `.gitignore`
automatically. Codex's registration instead lives in the user-level
`~/.codex/config.toml`, not per-project.
:::
