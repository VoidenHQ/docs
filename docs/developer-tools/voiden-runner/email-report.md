---
id: email-report
title: Send an Email Report
sidebar_label: Email Report
sidebar_position: 8
---

The runner can send a dark-themed HTML report via SMTP after a run completes. The report shows a card for each request executed — including request/response headers, bodies, and assertion results — so recipients get a full picture without needing terminal access.

---

## Send to an address

Use `--mail-to` to specify the recipient directly in the command:

```bash
voiden-runner run ./api-tests --mail-to team@example.com
```

To send to multiple recipients, set the `VOIDEN_MAIL_TO` environment variable (comma-separated) and use `--mail` instead:

```bash
VOIDEN_MAIL_TO=team@example.com,qa@example.com voiden-runner run ./api-tests --mail
```

---

## SMTP configuration

Provide SMTP credentials as flags or environment variables:

```bash
voiden-runner run ./api-tests \
  --mail-to team@example.com \
  --mail-from ci@example.com \
  --mail-subject "API Test Results — $(date +%Y-%m-%d)" \
  --smtp-host smtp.gmail.com \
  --smtp-port 587 \
  --smtp-secure \
  --smtp-user ci@example.com \
  --smtp-pass $SMTP_PASSWORD
```

Or use environment variables so credentials stay out of your command history:

| Variable | Description |
|---|---|
| `VOIDEN_MAIL_TO` | Default recipient(s), comma-separated |
| `VOIDEN_MAIL_FROM` | Default sender address |
| `VOIDEN_SMTP_HOST` | SMTP hostname |
| `VOIDEN_SMTP_PORT` | SMTP port |
| `VOIDEN_SMTP_USER` | SMTP username |
| `VOIDEN_SMTP_PASS` | SMTP password |

With those set, the command simplifies to:

```bash
voiden-runner run ./api-tests --mail
```

---

## Configure SMTP via Environment File

Create an `.env.mail` file (add it to `.gitignore`) and load it alongside your test environment:

```env
VOIDEN_MAIL_TO=team@example.com
VOIDEN_MAIL_FROM=ci@example.com
VOIDEN_SMTP_HOST=smtp.gmail.com
VOIDEN_SMTP_PORT=587
VOIDEN_SMTP_USER=ci@example.com
VOIDEN_SMTP_PASS=your-app-password
```

```bash
voiden-runner run ./api-tests --env .env.staging --env .env.mail --mail
```

---

## Combine with CSV

Send the email report and export a CSV in the same run:

```bash
voiden-runner run ./api-tests \
  --csv report.csv \
  --mail-to team@example.com
```

---

## Send from the `report` command

If you accumulate results across multiple pipeline stages, generate and mail a combined report at the end:

```bash
voiden-runner report generate \
  --mail-to team@example.com \
  --csv combined.csv
```

:::tip App passwords
When using Gmail or Outlook, generate an app-specific password rather than using your main account password. Standard passwords are blocked for programmatic SMTP access on most providers.
:::
