---
id: attach-environment
title: Attach an Environment
sidebar_label: Attach an Environment
sidebar_position: 5
---

:::warning[Beta]
`@voiden/runner` is currently in beta. APIs and flags may change between releases.
:::

The runner resolves environment variables from three sources, applied in this order — later sources override earlier ones:

1. **System environment** — variables already in your shell
2. **`.env` file** — loaded with `-e` / `--env`
3. **Inline overrides** — set with `--env-var`

---

## Load an Environment File

Use `-e` (or `--env`) to pass a standard `.env` file:

```bash
voiden-runner run auth.void -e .env.staging
```

```bash
voiden-runner run auth.void --env .env.production
```

A typical `.env` file:

```env
BASE_URL=https://staging.api.example.com
API_KEY=sk-staging-abc123
TIMEOUT=5000
```

Variables defined here are available in your `.void` files as `{{BASE_URL}}`, `{{API_KEY}}`, and so on.

:::tip Absolute paths work too
```bash
voiden-runner run auth.void --env /Users/jane/envs/production.env
```
:::

---

## Inline variable overrides

Use `--env-var` to set or override a single variable at runtime. The flag is repeatable:

```bash
voiden-runner run auth.void --env-var BASE_URL=https://api.example.com
```

```bash
voiden-runner run auth.void \
  --env-var BASE_URL=https://api.example.com \
  --env-var API_KEY=sk-abc123 \
  --env-var USER_ID=42
```

---

## Combining a file with inline overrides

Load a base environment from a file and override specific values for the current run:

```bash
voiden-runner run ./api-tests \
  --env .env.staging \
  --env-var API_KEY=$SECRET_KEY
```

`--env-var` always wins over values defined in the `.env` file.

---

## Injecting secrets in CI

Never commit secrets to version control. Inject them from your CI system's secret store instead:

```bash
# In your CI shell, $API_KEY comes from a secret environment variable
voiden-runner run ./api-tests \
  --env .env.ci \
  --env-var API_KEY=$API_KEY
```

:::warning Keep secrets out of .env files that are committed
Use `.env.example` for documentation and `.env.local` (gitignored) for actual values.
:::
