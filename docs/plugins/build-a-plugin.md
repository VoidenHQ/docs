---
  id: build-a-plugin
  title: Build a Plugin
  sidebar_label: Build a Plugin
---

# Build a Voiden Plugin

Ready to extend Voiden with your own features? The plugin system gives you access to slash commands, custom editor blocks, sidebar panels, request pipeline hooks, and much more.

The fastest way to get started is with [`@voiden/create-plugin`](/docs/developer-tools/create-plugin/create-plugin-overview) — the official scaffolder that generates a fully wired project in one command.

---

## Quick Start

```bash
npm create @voiden/plugin my-plugin
cd my-plugin
npm install
npm run build
npm run zip
```

Then in Voiden: **Extensions → ⋯ → Install from file → `dist/my-plugin.zip`**

That's it — your plugin is live inside Voiden.

---

## Guides

| Guide | Description |
|---|---|
| **[Overview](/docs/plugins/building-plugins/overview)** | Plugin architecture, lifecycle, and what plugins can do |
| **[Getting Started](/docs/plugins/building-plugins/getting-started)** | Build your first plugin — scaffold, write code, install in Voiden |
| **[Plugin API Reference](/docs/plugins/building-plugins/plugin-api)** | Full reference for every method on the `PluginContext` object |
| **[Manifest Reference](/docs/plugins/building-plugins/manifest-reference)** | Complete schema for the `manifest.json` file |

---

## @voiden/create-plugin

The scaffolder sets up everything you need in under a minute — Vite build config, manifest, zip packager, GitHub Actions release workflow, and a typed TypeScript entry point. No manual `tsconfig.json`, no esbuild setup, no zip commands to remember.

See the **[@voiden/create-plugin docs](/docs/developer-tools/create-plugin/create-plugin-overview)** for the full reference including CLI prompts, the generated file structure, local testing, GitHub releases, and submitting to the Voiden registry.
