---
id: overview
title: "@voiden/runner"
sidebar_label: Overview
sidebar_position: 1
---

`@voiden/runner` is the headless CLI that brings your `.void` files to life outside the Voiden desktop app. Test APIs in your terminal, automate runs in CI/CD, or schedule them as part of any workflow — all from the same files you author in Voiden.

---

## What it does

You design your requests in the Voiden desktop app and save them as `.void` files. The runner takes those files and executes them anywhere Node.js 18+ is available — no GUI, no browser, no desktop app needed.

```bash
voiden-runner run auth.void
```

That's it. Your request fires, results print to the terminal, and the process exits with a standard exit code your CI system can act on.

---

## Key capabilities

### Run anywhere
Execute `.void` files directly from the terminal, inside Docker containers, on CI runners, or in cron jobs. If Node.js is there, the runner works.

### Multiple output formats
Get human-readable output by default, switch to `--json` for machine-readable results, export a `--csv` report for spreadsheets or dashboards, or `--mail` the results as a formatted HTML report.

### Request chaining via persistent runtime variables
Just like in the Voiden app, the runner keeps a persistent session of runtime variables between requests. Values captured from one response are automatically available in the next request via `{{process.KEY}}` — no extra setup needed.

### Plugin-powered
The same five core plugins that run in the desktop app work identically in the CLI — scripting, assertions, faker, advanced auth, and GraphQL.

---

## Supported protocols

| Protocol | Status |
|---|---|
| REST (HTTP/HTTPS) | Supported |
| WebSocket (WSS) | Supported |
| gRPC | Supported |
| GraphQL | Supported (via `voiden-graphql` plugin) |

---

## In this section

- [Installation](./installation.md) — get the runner on your machine
- [Command Options](./command-options.md) — full flag reference for every command
- [Run a .void File](./run-a-void-file.md) — execute files and directories
- [Attach an Environment](./attach-environment.md) — load `.env` files and inline variables
- [Generate a Report](./generate-report.md) — JSON output and combined reports
- [Export to CSV](./export-csv.md) — detailed per-request CSV data
- [Send an Email Report](./email-report.md) — HTML reports delivered via SMTP
- [CI/CD Integration](./ci-cd.md) — GitHub Actions, GitLab CI, and more
