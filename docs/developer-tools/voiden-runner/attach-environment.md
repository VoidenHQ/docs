---
id: attach-environment
title: Attach an Environment
sidebar_label: Attach an Environment
sidebar_position: 5
---

The runner resolves environment variables from four sources, applied in this order — later sources override earlier ones:

1. **System environment** — variables already in your shell
2. **A plain `.env` file** (`-e` / `--env`) **or a project env profile** (`--profile`) — pick one, not both
3. **`--environment`** — scopes a profile down to one named environment inside it
4. **Inline overrides** — set with `--env-var`

`--env` and `--profile` are two different, mutually exclusive ways to point at variables — combining them is a usage error, not a silent priority order.

---

## Load a Plain `.env` File

Use `-e` (or `--env`) to pass a standard `.env` file — for something outside your project's profile setup entirely, like a CI-provided secrets path:

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

:::note --env is plain-dotenv only
`--env` only accepts a `KEY=VALUE` `.env` file. Passing it a `.yaml`/`.yml` path errors — a real profile is always a *pair* of files (`env-<profile>-public.yaml` + `-private.yaml`, merged), which a single `--env` path can't represent. Use `--profile` for that instead. `--environment` also only applies with `--profile` — a plain `.env` file has no named-environment concept to scope to.
:::

---

## Use a Project Env Profile

If your project already uses Voiden's [Advanced Environment Configuration](/docs/getting-started-section/advanced-environment-config) (`.voiden/env-<profile>-public.yaml` + `-private.yaml`), reach it from the CLI with `--profile` instead of pointing `--env` at a raw file path — the same profile system the MCP `select_environment` tool exposes to an agent:

```bash
voiden-runner run auth.void --profile staging
```

Bare `--profile` (no name) means the `"default"` profile:

```bash
voiden-runner run auth.void --profile
```

Both `-public.yaml` and `-private.yaml` for that profile are always merged together — there's no way to load just one.

If a profile has no YAML at all, `--profile <name>` falls back to that profile's legacy `.env*` file(s) instead of erroring.

### Scoping to one named environment

A profile's YAML can define multiple named environments (including nested ones, e.g. `staging.eu`). Use `--environment` to pick just one instead of merging every environment in the profile together:

```bash
voiden-runner run auth.void --profile staging --environment staging.eu
```

Omit `--environment` to use the profile's whole flattened tree.

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

## Combining a file or profile with inline overrides

Load a base environment and override specific values for the current run — `--env-var` always wins, whether the base came from `--env` or `--profile`:

```bash
voiden-runner run ./api-tests \
  --env .env.staging \
  --env-var API_KEY=$SECRET_KEY
```

```bash
voiden-runner run ./api-tests \
  --profile staging \
  --env-var API_KEY=$SECRET_KEY
```

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
