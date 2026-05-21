---
id: command-options
title: Command Options
sidebar_label: Command Options
sidebar_position: 3
---

:::warning[Beta]
`@voiden/runner` is currently in beta. APIs and flags may change between releases.
:::

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
| `-e, --env <path>` | Load a `.env` file (`KEY=VALUE` format) |
| `--env-var <k=v>` | Set a single inline variable (repeatable) |

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
voiden-runner plugin list
voiden-runner plugin install <plugin-name>
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
