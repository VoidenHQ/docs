---
  id: environment-variables
  title: Environment Variables
  sidebar_label: Environment
  sidebar_position: 2
---

# Environment Variables

Environment variables let you manage different configurations for various deployment environments (development, staging, production) without changing your code.

---

## Setting Your Environment

The environment selector lives in the **top navigation bar**, right next to the recent project selector. Click it and a card pops up where you can pick the environment you want to work in — just click the one you need and Voiden switches over instantly.

![select-envs](/img/voiden-blocks/env-variable/select-env.gif)

:::info Need profiles, public/private visibility, or a YAML-based hierarchy?
Check out [Advanced Environment Configuration](../../getting-started-section/advanced-environment-config) for the full system.
:::

---

## How Variables are Resolved

- Local variables **always override** environment variables
- Environment variables override default global variables
- This ensures you can have environment-specific values while still allowing local overrides for testing

---

## Creating Environment Files

Environment files should always start with `.env` followed by the environment name. For example:

- `.env` → Global defaults shared across all environments
- `.env.dev` → Development environment
- `.env.staging` → Staging environment
- `.env.prod` → Production environment

The base `.env` file acts as the global configuration, and environment-specific files override or extend these values.

**Default Environment (`.env`)**
```env
API_BASE_URL=https://api.example.com
API_VERSION=v1
DB_HOST=localhost
```

:::tip Value Preview & Copy
Every variable in the environment panel shows a preview of its resolved value. Hover over any variable to reveal a **copy** button — click it to copy the value directly to your clipboard.
:::

:::tip Jump to Source
`⌘ Cmd + Click` on any environment variable to jump directly to its definition in the env file.
:::

---

## Benefits of Using Environment Variables

<table className="benefits-table">
  <thead>
    <tr>
      <th style={{width: "30%"}}>Area</th>
      <th style={{width: "30%"}}>Key Benefits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Security</strong></td>
      <td>• Keep sensitive data out of codebase<br/>• Prevent accidental credential mixing<br/>• No hardcoded secrets</td>
    </tr>
    <tr>
      <td><strong>Developer Experience</strong></td>
      <td>• One-click environment switching<br/>• Personal local overrides<br/>• No manual configuration</td>
    </tr>
    <tr>
      <td><strong>Consistency</strong></td>
      <td>• Same base config for all teams<br/>• Identical structure across environments<br/>• Reduce "works on my machine" issues</td>
    </tr>
    <tr>
      <td><strong>Rapid Switching</strong></td>
      <td>• Test APIs in different environments<br/>• Compare staging vs production instantly<br/>• Validate environment features</td>
    </tr>
    <tr>
      <td><strong>Collaboration</strong></td>
      <td>• Share base files via Git<br/>• Keep overrides private<br/>• Different local configs without conflicts</td>
    </tr>
    <tr>
      <td><strong>Organization</strong></td>
      <td>• Clear environment separation<br/>• Easy to track variable changes<br/>• Simple to add new environments</td>
    </tr>
  </tbody>
</table>

---

## Summary

Once you get the hang of environment variables, managing different configurations across environments becomes second nature. Create your `.env` files, pick your environment from the selector in the top nav, and Voiden takes care of resolving the right values. Local overrides always win, so you can tweak things for your machine without affecting anyone else.
