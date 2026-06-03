---
  id: overview
  title: Plugin Development Overview
  sidebar_label: Overview
  sidebar_position: 1
---

# Plugin Development Overview

Voiden's plugin system lets you extend the application with new features, UI components, editor blocks, and integrations — all without touching the core codebase. Whether you want to add a simple slash command or build a full protocol handler, plugins give you the tools to make it happen.

---

## What Can Plugins Do?

Plugins have access to a rich set of APIs through the `PluginContext` object:

| Capability | Description | Example |
|---|---|---|
| **Slash Commands** | Add commands to the `/` menu in the editor | `/assertions`, `/hello` |
| **Custom Editor Blocks** | Create new Tiptap node types rendered in the document | Request blocks, table blocks |
| **Sidebar Tabs** | Add tabs to the left or right sidebar | API catalog browser |
| **Panels & Tabs** | Register custom panels in the main content area | Explorer panels |
| **Status Bar Items** | Add buttons to the bottom status bar | Quick-launch buttons |
| **Pipeline Hooks** | Intercept and modify requests before sending or responses after receiving | Fake data injection, assertion testing |
| **Paste Handlers** | Handle custom clipboard content (e.g., cURL commands) | cURL import on paste |
| **Helpers** | Expose utility functions for other plugins to use | Data parsers, formatters |
| **CodeMirror Extensions** | Extend the code editor with autocomplete, linting, etc. | Faker.js autocomplete |
| **Command Palette** | Add entries to the `⌘⇧P` command palette | Quick-run commands |
| **Context Menus** | Inject items into right-click context menus | Tab-level actions |

---

## Plugin Architecture

Every Voiden plugin scaffold produces this structure:

```
my-plugin/
├── src/
│   ├── plugin.ts          ← your entry point — edit this
│   └── skill.md           ← AI skill description
├── manifest.json          ← plugin identity, permissions, capabilities
├── changelog.json         ← release history
├── package.json
├── tsconfig.json
├── build.mjs              ← Vite build (renderer bundle)
├── build-main.mjs         ← esbuild build (main-process bundle)
├── zip.mjs                ← packages dist/ into an installable .zip
└── .github/
    └── workflows/
        └── release.yml    ← GitHub Actions: build & publish on git tag
```

The final deliverable is a **ZIP file** containing at minimum `{id}.js` and `manifest.json`. Users install it in Voiden via **Extensions → ⋯ → Install from file**.

:::tip Use the scaffolder
[`@voiden/create-plugin`](/docs/developer-tools/create-plugin/create-plugin-overview) generates this entire structure in one command — no manual config files needed.

```bash
npm create @voiden/plugin my-plugin
```
:::

### The Plugin Function

A plugin is a factory function that receives a `CorePluginContext` and returns `{ onload, onunload, metadata }`:

```typescript
import type { CorePluginContext } from '@voiden/sdk/ui';
import manifest from '../manifest.json';

export default function createMyPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      // Register slash commands, blocks, sidebar tabs, hooks, etc.
    },

    onunload: async () => {
      // Cancel subscriptions and clean up
    },

    metadata: manifest,
  };
}
```

| Hook | Purpose |
|---|---|
| `onload` | Called once when the plugin activates. Register everything here |
| `onunload` | Called on disable or app close. Always cancel subscriptions made in `onload` |
| `metadata` | Pass `manifest` directly — Voiden uses it for the Extensions browser display |

### Plugin Lifecycle

```
npm run build && npm run zip
    │
    ▼
User installs via Extensions → ⋯ → Install from file
    │
    ▼
Voiden validates the ZIP (manifest.json + {id}.js)
    │
    ▼
Plugin extracted to extensions directory
    │
    ▼
Extension Registry loads manifest metadata
    │
    ▼
onload() is called — your features register
    │
    ▼
Plugin is active
    │
    ▼
onunload() is called on disable or app close
```

### The Manifest

`manifest.json` is the source of truth for your plugin. Voiden reads it when loading and the Extensions browser displays it to users:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "description": "What this plugin does",
  "version": "1.0.0",
  "voidenVersion": ">=2.0.0",
  "author": "Your Name",
  "icon": "Globe",
  "type": "community",
  "priority": 30,
  "permissions": [],
  "capabilities": {}
}
```

:::info capabilities are auto-populated
Do not fill in `capabilities` manually. The `build.mjs` script scans your compiled bundle at build time and fills it in automatically.
:::

See the [Manifest Reference](/docs/plugins/building-plugins/manifest-reference) for the full schema.

---

## How Bundling Works

`build.mjs` uses Vite to compile your plugin entry point into a single ESM file at `dist/{id}.js`. Host-provided packages like `react`, `@tiptap/core`, and `lucide-react` are **not** bundled — instead, the build emits inline shim code that reads from `window.__voiden_shims__` at runtime. Voiden injects these shims before loading any plugin.

This keeps plugin bundles small (typically 5–15 kB) and ensures a single React instance across all plugins.

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18 or higher |
| `zip` on PATH | Pre-installed on macOS/Linux. On Windows, use WSL or [7-Zip CLI](https://www.7-zip.org/) |

Basic familiarity with TypeScript and React is helpful. You should also know what blocks, slash commands, and panels are from using Voiden — the APIs map directly to what you see in the app.

---

## Where to Go Next

| Page | What You'll Learn |
|---|---|
| [Getting Started](/docs/plugins/building-plugins/getting-started) | Build your first plugin step by step |
| [Plugin API Reference](/docs/plugins/building-plugins/plugin-api) | Full reference for the `PluginContext` API |
| [Manifest Reference](/docs/plugins/building-plugins/manifest-reference) | Complete `manifest.json` schema |

---

## Existing Plugins for Reference

The best way to learn is by studying existing plugins:

| Plugin | Complexity | Good For Learning |
|---|---|---|
| **md-preview** | Simple | Editor actions, helper exposure |
| **voiden-faker** | Medium | Pipeline hooks, CodeMirror extensions, TipTap suggestions |
| **simple-assertions** | Medium | Custom blocks, response processing, slash commands |
| **voiden-rest-api** | Complex | Full block ownership, paste handlers, pipeline hooks |

You can find these in the `core-extensions/src/` directory of the Voiden source code.
