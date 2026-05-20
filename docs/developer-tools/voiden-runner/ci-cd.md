---
id: ci-cd
title: CI/CD Integration
sidebar_label: CI/CD Integration
sidebar_position: 9
---

:::warning[Beta]
`@voiden/runner` is currently in beta. APIs and flags may change between releases.
:::

`@voiden/runner` works in any CI environment that runs shell commands. It follows standard exit code conventions — `0` on success, `1` on failure — so pipelines can gate on results without extra configuration.

---

## Exit codes

| Code | Meaning |
|---|---|
| `0` | All requests passed |
| `1` | One or more requests failed, or `--bail` / `--fail-on-error` triggered |

---

## GitHub Actions

```yaml
name: API Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  api-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install @voiden/runner
        run: npm install -g @voiden/runner

      - name: Run API tests
        run: |
          voiden-runner run ./api-tests --fail-on-error \
            --env .env.ci \
            --env-var API_KEY=${{ secrets.API_KEY }} \
            --csv report.csv
        env:
          BASE_URL: ${{ vars.BASE_URL }}

      - name: Upload CSV report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: api-test-report
          path: report.csv
```

:::tip `if: always()`
Upload the report artifact even when the test step fails — that's when you need it most.
:::

---

## GitLab CI

```yaml
api-tests:
  image: node:20-alpine
  stage: test
  script:
    - npm install -g @voiden/runner
    - voiden-runner run ./api-tests --fail-on-error
        --env .env.ci
        --env-var API_KEY=$API_KEY
        --csv report.csv
  artifacts:
    when: always
    paths:
      - report.csv
    expire_in: 7 days
  variables:
    BASE_URL: $BASE_URL
    API_KEY: $API_KEY
```

---

## Generic bash script

Works with CircleCI, Jenkins, Bitbucket Pipelines, or any system that executes shell commands:

```bash
#!/bin/bash
set -e

echo "Installing @voiden/runner..."
npm install -g @voiden/runner

echo "Running API tests..."
voiden-runner run ./api-tests \
  --env .env.ci \
  --fail-on-error \
  --csv report.csv

echo "All tests passed."
```

`set -e` ensures the script exits immediately if the runner returns a non-zero code.

---

## Windows (PowerShell)

```powershell
npm install -g @voiden/runner

voiden-runner run .\api-tests --fail-on-error `
  --env .env.ci `
  --env-var API_KEY=$env:API_KEY `
  --csv report.csv

Write-Host "All tests passed."
```

---

## Using npx (no global install)

Ideal for ephemeral CI containers:

```bash
npx @voiden/runner run ./api-tests --fail-on-error --csv report.csv
```

---

## Sending results after a CI run

Combine a CSV export with an email report so the team gets notified automatically:

```bash
voiden-runner run ./api-tests \
  --fail-on-error \
  --csv report.csv \
  --mail-to team@example.com \
  --smtp-host smtp.example.com \
  --smtp-port 587 \
  --smtp-user $SMTP_USER \
  --smtp-pass $SMTP_PASS
```
