---
id: export-csv
title: Export to CSV
sidebar_label: Export to CSV
sidebar_position: 7
---

:::warning[Beta]
`@voiden/runner` is currently in beta. APIs and flags may change between releases.
:::

The `--csv` flag exports a detailed, per-request CSV file after a run. Every row maps to one request, making it easy to review results in a spreadsheet, import data into reporting tools, or archive test history over time.

---

## Basic usage

```bash
voiden-runner run ./api-tests --csv report.csv
```

Use `.` as the path to let the runner auto-generate a filename:

```bash
voiden-runner run ./api-tests --csv .
```

---

## CSV columns

| Column | Description |
|---|---|
| `File` | Path to the `.void` file that was executed |
| `Protocol` | Request protocol (`REST`, `WSS`, `gRPC`, `GraphQL`) |
| `Method` | HTTP method (`GET`, `POST`, etc.) |
| `URL` | Full resolved URL with variables substituted |
| `Success` | `true` or `false` |
| `Status` | HTTP status code |
| `StatusText` | HTTP status text (e.g. `OK`, `Not Found`) |
| `DurationMs` | Round-trip time in milliseconds |
| `SizeBytes` | Response size in bytes |
| `Error` | Error message if the request failed entirely |
| `RequestHeaders` | Headers sent with the request |
| `RequestBody` | Request body sent (if any) |
| `ResponseHeaders` | Headers returned in the response |
| `ResponseBody` | Response body received |
| `AssertionsPassed` | Number of assertions that passed |
| `AssertionsFailed` | Number of assertions that failed |
| `AssertionDetail` | Per-assertion breakdown |

---

## Combining with other output options

`--csv` works alongside `--json` and mail flags in the same run:

```bash
voiden-runner run ./api-tests \
  --output-json results.json \
  --csv report.csv \
  --mail-to team@example.com
```

---

## Common use cases

### Save as a CI artifact

```yaml
# GitHub Actions
- name: Run API tests
  run: voiden-runner run ./api-tests --csv report.csv

- name: Upload CSV
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: api-test-report
    path: report.csv
```

:::tip Use `if: always()`
This ensures the CSV is uploaded even when the test step fails — which is exactly when you want to inspect it.
:::

### Generate from a combined report

You can also generate the CSV from the `report` command after accumulating results across multiple runs:

```bash
voiden-runner report generate --csv combined.csv
```
