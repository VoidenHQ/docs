---
  id: overview
  title: Plugin Development Overview
  sidebar_label: Overview
  sidebar_position: 1
---

# Plugin Development Overview

Voiden's plugin system lets you extend the application with new features, UI components, editor blocks, and integrations — all without touching the core codebase. Whether you want to add a simple slash command or build a full protocol handler, plugins give you the tools to make it happen.

This section walks you through everything you need to know to build your own Voiden plugin.

---

## What Can Plugins Do?

Plugins have access to a rich set of APIs through the `PluginContext` object. Here's what you can build:

| Capability | Description | Example |
|---|---|---|
| **Slash Commands** | Add commands to the `/` menu in the editor | `/assertions`, `/hello` |
| **Custom Editor Blocks** | Create new Tiptap node types rendered in the document | Request blocks, table blocks |
| **Sidebar Tabs** | Add tabs to the left or right sidebar | API catalog browser |
| **Panels & Tabs** | Register custom panels in the main content area | Explorer panels |
| **Status Bar Items** | Add buttons to the bottom status bar | Quick-launch buttons |
| **Editor Actions** | Add toolbar buttons to the code editor | Markdown preview toggle |
| **Pipeline Hooks** | Intercept and modify requests before sending or responses after receiving | Fake data injection, assertion testing |
| **Paste Handlers** | Handle custom clipboard content (e.g., cURL commands) | cURL import on paste |
| **Helpers** | Expose utility functions for other plugins to use | Data parsers, formatters |
| **CodeMirror Extensions** | Extend the code editor with autocomplete, linting, etc. | Faker.js autocomplete |

---

## Plugin Architecture

Every Voiden plugin follows the same pattern:

```
my-plugin/
├── src/
│   ├── manifest.json      # Plugin metadata & capabilities
│   ├── index.ts           # Entry point — exports the plugin function
│   └── ...                # Your components, utilities, etc.
├── dist/
│   ├── manifest.json      # Copied from src during build
│   └── main.js            # Bundled output
├── my-plugin.zip           # Packaged for installation (contains manifest.json + main.js)
├── package.json
├── tsconfig.json
└── esbuild.config.mjs     # Build configuration
```

The final deliverable is a **ZIP file** containing `manifest.json` and `main.js`. Users install plugins in Voiden through the Extension Browser by clicking **"Install from file"** and selecting the ZIP.

### The Plugin Function

At its core, a plugin is a function that receives a `PluginContext` and returns an object with `onload` and `onunload` lifecycle methods:

```typescript
import type { Plugin, PluginContext } from "@voiden/sdk";

export default function myPlugin(context: PluginContext): Plugin {
  return {
    onload(ctx: PluginContext) {
      // Register slash commands, panels, hooks, etc.
    },
    onunload() {
      // Clean up resources
    },
  };
}
```

### Plugin Lifecycle

```
You build and package your plugin as a ZIP
    │
    ▼
User installs via Extension Browser → "Install from file"
    │
    ▼
Voiden validates the ZIP (manifest.json + main.js)
    │
    ▼
Plugin is extracted to the extensions directory
    │
    ▼
On next startup, Extension Registry loads manifest metadata
    │
    ▼
Plugin Loader filters enabled plugins
    │
    ▼
Your plugin function is called with PluginContext
    │
    ▼
onload() is called — register your features here
    │
    ▼
Plugin is active (user interacts with your features)
    │
    ▼
onunload() is called on disable or app close
```

### The Manifest

Every plugin needs a `manifest.json` that describes its identity and capabilities. This is how Voiden discovers and manages your plugin:

```json
{
  "id": "my-plugin",
  "type": "community",
  "name": "My Plugin",
  "description": "A brief description of what it does",
  "version": "1.0.0",
  "author": "Your Name",
  "enabled": true,
  "priority": 50
}
```

See the [Manifest Reference](/docs/plugins/building-plugins/manifest-reference) for the full schema.

---

## Prerequisites

Before you start building a plugin, make sure you have:

- **Node.js 20+** installed
- **npm** or **yarn** package manager
- Basic knowledge of **TypeScript** and **React**
- Familiarity with Voiden's editor (you should know what blocks, slash commands, and panels are from using the app)

---

## Where to Go Next

| Page | What You'll Learn |
|---|---|
| [Getting Started](/docs/plugins/building-plugins/getting-started) | Build your first plugin step by step |
| [Plugin API Reference](/docs/plugins/building-plugins/plugin-api) | Full reference for the `PluginContext` API |
| [Manifest Reference](/docs/plugins/building-plugins/manifest-reference) | Complete `manifest.json` schema |

---

## Existing Plugins for Reference

The best way to learn is by studying existing plugins. Here are some good ones to look at, ordered by complexity:

| Plugin | Complexity | Good For Learning |
|---|---|---|
| **md-preview** | Simple | Editor actions, helper exposure |
| **voiden-faker** | Medium | Pipeline hooks, CodeMirror extensions, TipTap suggestions |
| **simple-assertions** | Medium | Custom blocks, response processing, slash commands |
| **voiden-rest-api** | Complex | Full block ownership, paste handlers, pipeline hooks |

You can find these in the `core-extensions/src/` directory of the Voiden source code.
