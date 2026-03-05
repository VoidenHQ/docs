---
sidebar_position: 4
title: Advanced Environment
sidebar_label : Advanced Environment
id: advanced-environment-config
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Voiden supports a YAML-based **Advanced Environment Configuration** system — a dedicated way to manage environment values across profiles, with a clear separation between what's shareable and what stays local.

---

## Overview

Environment values are split into two distinct categories:

- **Public values** — safe to commit to version control (base URLs, feature flags, non-sensitive defaults)
- **Private values** — stays local to your machine, never committed (API keys, tokens, passwords)

Each category lives in its own YAML file. They hold different keys for different purposes — not two versions of the same data.

---

## Opening the Environment Panel

You can open the environment panel in two ways:

- Click the **No Environment** button in the top navbar, next to the project name
- Use the keyboard shortcut:

<Tabs>
  <TabItem value="mac" label="macOS" default>

| Action | Shortcut |
|---|---|
| Open Environment Panel | `⌘ Cmd + ⌥ Option + E` |

  </TabItem>
  <TabItem value="windows" label="Windows">

| Action | Shortcut |
|---|---|
| Open Environment Panel | `Alt + Ctrl + E` |

  </TabItem>
</Tabs>

---

## Setting Up YAML Configuration

Once the environment dialog is open:

**1.** At the bottom of the dialog, click **Edit Environment and Profile** in the footer.

![Environment Setup](/img/geetingstarted/env-setup.png)

**2.** A new tab will open — this is the YAML environment editor where you can add your public and private values and manage profiles.

![Advanced Environment](/img/geetingstarted/advance-env.png)

Here's an example of what a shared public YAML looks like inside the editor:

![Advanced Environment Example](/img/geetingstarted/advanced-env-example.png)

<Tabs>
  <TabItem value="public" label="env-public.yaml" default>

```yaml
thor:
  variables:
    description: "God of Thunder"
  children:
    production:
      variables:
        BASE_URL: "thor.com"
    test:
      children:
        staging:
          variables:
            BASE_URL: "staging.thor.com"
        local:
          variables:
            BASE_URL: "localhost:8080"
odin:
  variables:
    description: "The Allfather"
  children:
    production:
      variables:
        BASE_URL: "odin.com"
    test:
      children:
        staging:
          variables:
            BASE_URL: "staging.odin.com"
        local:
          variables:
            BASE_URL: "localhost:8080"
```

  </TabItem>
  <TabItem value="private" label="env-private.yaml">

```yaml
thor:
  children:
    test:
      variables:
        PASSWORD: "hunter2"
```

  </TabItem>
</Tabs>

:::tip Value Preview & Copy
Every variable in the environment panel shows a preview of its resolved value. Hover over any variable to reveal a **copy** button — click it to copy the value directly to your clipboard.
:::

:::tip Jump to Source (env only)
`⌘ Cmd + Click` on any environment variable to jump directly to its definition in the YAML file. Works for both `env-public.yaml` and `env-private.yaml`.
:::

---

## Default Configuration

When no profile is active, Voiden looks for files in this order:

| Priority | File | Purpose |
|---|---|---|
| 1 | `env-public.yaml` | Shared, non-sensitive values |
| 2 | `env-private.yaml` | Sensitive, local-only values |
| 3 | `.env` | Legacy fallback if no YAML files are found |

If neither YAML file is present, Voiden falls back to `.env` automatically — so existing projects work out of the box with no migration required.

---

## Profiles

Profiles are an advanced feature separate from the hierarchy system. Environments like `staging`, `production`, and `local` should live inside the **default profile** using the `children` structure shown above — that's what the hierarchy is for.

Profiles exist for cases where you need an entirely separate set of YAML files loaded from scratch, outside of the default profile's tree. Most teams won't need them.

![Advanced Enviroment Profile](/img/geetingstarted/env-profile.png)

### Switching Profiles

Open the environment panel and select your desired profile from the dialog.

![Advanced Envrionment Selector](/img/geetingstarted/advance-env-selector.png)

The selector lists every node in the hierarchy using dot notation, so you can target any level precisely:

```
thor
thor.production
thor.test
thor.test.staging
thor.test.local
odin
odin.production
odin.test
odin.test.staging
odin.test.local
```

Selecting a parent node (e.g. `thor.test`) applies all variables defined at that level. Selecting a child (e.g. `thor.test.staging`) applies its own variables on top, overriding any conflicts from the parent.

---

## What to Commit

| File | Commit to Git? |
|---|---|
| `env-public.yaml` | Yes |
| `env-private.yaml` | **No** — add to `.gitignore` |
| `env-{profile}-public.yaml` | Yes |
| `env-{profile}-private.yaml` | **No** — add to `.gitignore` |

A good `.gitignore` rule to cover all private files:

```
env-*-private.yaml
env-private.yaml
```
