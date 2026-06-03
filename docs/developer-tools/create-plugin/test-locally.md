---
id: create-plugin-test-locally
title: Test Locally
sidebar_label: Test Locally
sidebar_position: 4
---

The local testing workflow is: build → zip → install in Voiden. It takes under 10 seconds and gives you a live plugin running inside the real app.

---

## Build your plugin

```bash
npm run build
```

This compiles two bundles:

| Output | Source | Build tool |
|---|---|---|
| `dist/{id}.js` | `src/plugin.ts` | Vite |
| `dist/{id}-main.cjs` | `src/main-process.ts` | esbuild (skips gracefully if file absent) |

If you selected **Runner** support during scaffolding:

```bash
npm run build:runner
# → dist/runner.js
```

:::info How bundling works
Host-provided packages like `react`, `@tiptap/core`, and `lucide-react` are **not** bundled into your plugin. Instead, `build.mjs` emits inline shim code that reads `window.__voiden_shims__['react']` at runtime — the Voiden app injects these before loading any plugin. This keeps your plugin bundle small (typically 5–15 kB) and ensures a single React instance across all plugins.
:::

---

## Package into a zip

```bash
npm run zip
# → dist/{id}.zip
```

The zip contains exactly what Voiden expects:

```
my-plugin.zip
├── {id}.js           ← renderer bundle (required)
├── manifest.json     ← plugin identity (required)
├── changelog.json    ← release history (optional)
├── skill.md          ← AI skill description (optional)
└── {id}-main.cjs     ← main-process bundle (optional)
```

If `manifest.icon` points to a local image file, `zip.mjs` automatically reads it, converts it to a base64 data URL, and writes the result into `manifest.json` inside the zip. The original path stays in your source `manifest.json`.

:::warning zip must be on your PATH
On macOS and Linux it is pre-installed. On Windows, use WSL or install [7-Zip CLI](https://www.7-zip.org/) and ensure it is on your PATH.
:::

---

## Install in Voiden

Open Voiden and go to:

**Extensions → ⋯ → Install from file → select `dist/{id}.zip`**

Voiden validates the zip, extracts it, and installs your plugin. If the same plugin ID is already installed, it replaces the previous version in place.

After installation, verify it works:
- Check the Extensions browser — your plugin should appear under **Community**
- Try any slash commands, sidebar tabs, or block types you registered
- Open the browser DevTools (View → Toggle Developer Tools) to inspect console output

---

## Iterating quickly

The fastest loop for development:

```bash
npm run build && npm run zip
```

Then reinstall from the zip in Voiden. For changes that only affect renderer logic (not `main-process.ts`), you typically do not need to restart Voiden — reinstalling the zip is enough.

For main-process changes, a full Voiden restart is required after reinstalling.
