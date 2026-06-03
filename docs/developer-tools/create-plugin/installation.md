---
id: create-plugin-installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

`@voiden/create-plugin` does not need to be installed. Use `npm create` or `npx` to run the scaffolder directly — it downloads on first use and never clutters your global packages.

---

## Create a plugin

```bash
# Recommended
npm create @voiden/plugin my-plugin

# Using npx
npx @voiden/create-plugin my-plugin
```

Replace `my-plugin` with the folder name you want the project created in.

---

## Run interactively

If you omit the project name, the CLI will prompt you for it:

```bash
npm create @voiden/plugin
npx @voiden/create-plugin
```

---

## After scaffolding

Once the CLI finishes, follow the printed next steps:

```bash
cd my-plugin
npm install
npm run build    # compile renderer + main-process bundles
npm run zip      # package → dist/my-plugin.zip
```

Then open Voiden and install the zip:

**Extensions → ⋯ → Install from file → `dist/my-plugin.zip`**

Your plugin is now live inside Voiden.

---

## Requirements

| Requirement | Version |
|---|---|
| Node.js | 18 or higher |
| `zip` on PATH | Pre-installed on macOS/Linux. On Windows, use WSL or [7-Zip CLI](https://www.7-zip.org/) |

:::tip No global install needed
`npm create` and `npx` both pull the latest version automatically. You will always scaffold with the most up-to-date template without any manual update step.
:::
