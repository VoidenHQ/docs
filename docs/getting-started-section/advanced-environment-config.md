---
sidebar_position: 4
title: Advanced Environment
sidebar_label : Advanced Environment
id: advanced-environment-config
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  <div style={{display:"flex",alignItems:"center"}}> Advanced Environment <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

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

---

## Default Configuration

When no profile is active, Voiden looks for files in this order:

| Priority | File | Purpose |
|---|---|---|
| 1 | `env-public.yaml` | Shared, non-sensitive values |
| 2 | `env-private.yaml` | Sensitive, local-only values |
| 3 | `.env` | Legacy fallback if no YAML files are found |

If neither YAML file is present, Voiden falls back to `.env` automatically — so existing projects work out of the box with no migration required.

### Example

<Tabs>
  <TabItem value="public" label="env-public.yaml" default>

```yaml
baseUrl: https://api.example.com
timeout: 5000
featureFlags:
  newDashboard: true
```

  </TabItem>
  <TabItem value="private" label="env-private.yaml">

```yaml
apiKey: sk-your-secret-key-here
authToken: eyJhbGciOiJIUzI1NiIs...
```

  </TabItem>
</Tabs>

---

## Profiles

Profiles let you maintain multiple named environment configurations — for example, `staging`, `production`, or `local-dev` — each with their own public and private files.

![Advanced Enviroment Profile](/img/geetingstarted/env-profile.png)

### Switching Profiles

Open the environment panel and select your desired profile from the dialog.

![Advanced Envrionment Selector](/img/geetingstarted/advance-env-selector.png)

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
