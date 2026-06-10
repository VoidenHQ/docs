---
id: generate-report
title: Generate a Report
sidebar_label: Generate a Report
sidebar_position: 6
---

Every run produces output you can read, parse, or forward. The runner supports JSON output for programmatic use, and the `report` command lets you build a combined report across multiple runs.

---

## JSON output

### Print to stdout

Use `--json` to emit machine-readable results to stdout instead of the default human-readable format. Normal terminal output is suppressed when this flag is active.

```bash
voiden-runner run auth.void --json
```

Pipe directly into `jq` or any tool that reads JSON:

```bash
voiden-runner run auth.void --json | jq '.results[0].status'
```

### Write to a file

Use `--output-json` to write the full result object to a file, useful for archiving or chaining into downstream tools:

```bash
voiden-runner run ./api-tests --output-json results.json
```

---

## Combined report

The `report` command generates a single consolidated report from all results accumulated across multiple individual `run` calls — useful when your test suite is split across separate pipeline stages.

```bash
# Run tests in two separate steps
voiden-runner run ./auth-tests --output-json auth.json
voiden-runner run ./user-tests --output-json users.json

# Generate a combined report from all accumulated results
voiden-runner report generate
```

`report generate` (or its alias `report gen`) accepts the same `--csv` and mail flags as `run`, so you can export or email the combined results directly:

```bash
voiden-runner report generate --csv combined.csv
voiden-runner report generate --mail-to team@example.com
```

To clear accumulated results without generating a report:

```bash
voiden-runner report clear
```

---

## Next steps

- [Export to CSV](./export-csv.md) — detailed per-request CSV data
- [Send an Email Report](./email-report.md) — HTML reports delivered via SMTP
