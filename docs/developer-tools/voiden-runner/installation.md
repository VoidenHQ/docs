---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

:::warning[Beta]
`@voiden/runner` is currently in beta. APIs and flags may change between releases.
:::

`@voiden/runner` is published to npm. Install it globally to get the `voiden-runner` command available system-wide.

---

## Requirements

Node.js **18 or higher** is required. We recommend using the latest LTS release.

Check your version:

```bash
node --version
```

---

## Install globally

```bash
npm install -g @voiden/runner
```

Once installed, `voiden-runner` is available in any directory:

```bash
voiden-runner --version
```

---

## Run without installing (npx)

Since `@voiden/runner` is on npm, you can run it without a global install using `npx`:

```bash
npx @voiden/runner run auth.void
```

:::tip When to use npx
`npx` is ideal for CI/CD pipelines where you want to always pull the latest version without managing a global install. It downloads and caches the package automatically on first use.
:::

---

## Update to the latest version

```bash
npm install -g @voiden/runner@latest
```

---

## Verify the installation

```bash
voiden-runner --version
voiden-runner --help
```
