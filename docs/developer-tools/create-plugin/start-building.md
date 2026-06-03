---
id: create-plugin-start-building
title: Start Building
sidebar_label: Start Building
sidebar_position: 3
---

After scaffolding, open the project in your editor. Most of the work happens in two files: `src/plugin.ts` and `manifest.json`.

---

## Your entry point — `src/plugin.ts`

This is the file you edit. It exports a single default function that receives a `CorePluginContext` and returns `{ onload, onunload, metadata }`.

```ts
import type { CorePluginContext } from '@voiden/sdk/ui';
import manifest from '../manifest.json';

export default function createMyPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      // Register everything here
    },

    onunload: async () => {
      // Clean up subscriptions, listeners, etc.
    },

    metadata: manifest,
  };
}
```

| Hook | When it runs |
|---|---|
| `onload` | Called once when the plugin is activated. Register block types, slash commands, sidebar tabs, commands, event listeners, and context menus here |
| `onunload` | Called when the plugin is disabled or the app unloads. Cancel any subscriptions made in `onload`. Always store unsubscribe functions and call them here to avoid memory leaks |
| `metadata` | Pass `manifest` directly — Voiden uses this to display plugin info in the Extensions browser |

The entry file can be named `plugin.ts` or `plugin.tsx` (for JSX) — the build script detects both automatically.

---

## Your manifest — `manifest.json`

The single source of truth for your plugin. Voiden reads this when loading the plugin and the Extensions browser displays it to users.

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
  "permissions": ["filesystem", "events"],
  "capabilities": {},
  "features": []
}
```

:::warning Bump version before every release
Voiden uses `version` to decide whether to offer an update. Always increment it before building and publishing a new release.
:::

:::info Capabilities are auto-populated
Do not edit the `capabilities` field manually. `build.mjs` scans your compiled bundle and fills it in automatically at build time.
:::

---

## Where to start based on what you're building

| Goal | What to do |
|---|---|
| Add a custom block type | Define a TipTap `Node`, call `context.registerVoidenExtension(YourNode)` in `onload` |
| Add a slash command | Call `context.addVoidenSlashGroup(...)` in `onload` |
| Add a sidebar panel | Write a React component, call `context.registerSidebarTab(...)` |
| Add a command palette entry | Declare `"commandPalette"` in permissions, call `context.registerCommand(...)` |
| React to workspace events | Declare `"events"` in permissions, call `context.events.on(...)` — store the unsubscribe function and call it in `onunload` |
| Read or write project files | Declare `"filesystem"` in permissions, use `context.fs.*` |
| Persist plugin settings | Declare `"settings"` in permissions, use `context.settings.*` and `context.ui.registerSettings(...)` |
| Add native OS features | Create `src/main-process.ts`, register `ipcMain` handlers, run `npm run build:main` |

---

## Plugin API docs

For the full reference — every `context.*` method, all event names, TipTap node registration, and more — see the **[Plugin API Reference](../../plugins/building-plugins/plugin-api.md)**.

If you want a guided walkthrough from zero, the **[Build a Plugin](../../plugins/building-plugins/getting-started.md)** guide walks through a complete example step by step, from project setup to installing the plugin in Voiden.

---

## Fast iteration loop

```bash
npm run build && npm run zip
```

Then in Voiden: **Extensions → ⋯ → Install from file → `dist/my-plugin.zip`**

Voiden replaces the previous version in place. Restart Voiden to pick up changes that affect the main process or plugin registration.
