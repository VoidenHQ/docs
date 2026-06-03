---
  id: getting-started
  title: Getting Started
  sidebar_label: Getting Started
  sidebar_position: 2
---

# Build Your First Plugin

This guide walks you through building a Voiden plugin from scratch — from scaffolding the project to seeing your first slash command appear in the editor.

---

## Step 1: Scaffold the Project

Use [`@voiden/create-plugin`](/docs/developer-tools/create-plugin/create-plugin-overview) to generate a fully wired project in one command:

```bash
npm create @voiden/plugin my-voiden-plugin
```

The CLI will ask you a few questions — plugin name, ID, description, author, icon, and which optional features you want (runner support, main-process support, permissions). Answer them and the scaffolder does the rest.

Once it finishes:

```bash
cd my-voiden-plugin
npm install
```

Your project is ready. No manual `tsconfig.json`, no esbuild setup, no zip scripts to wire up — it's all there.

:::tip What got generated?
See [What it generates](/docs/developer-tools/create-plugin/create-plugin-overview) for a full breakdown of every file the scaffolder creates and why.
:::

---

## Step 2: Write the Plugin

Open `src/plugin.ts` — this is your entry point and the only file you need to start with.

```typescript
import type { CorePluginContext } from '@voiden/sdk/ui';
import manifest from '../manifest.json';

export default function createMyVoidenPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      // Register a slash command group
      context.addVoidenSlashGroup({
        name: "greetings",
        title: "Greetings",
        commands: [
          {
            name: "hello",
            label: "Say Hello",
            description: "Insert a friendly greeting",
            slash: "/hello",
            icon: "Smile",
            action: (editor) => {
              editor.commands.insertContent({
                type: "paragraph",
                content: [{ type: "text", text: "Hello from my first Voiden plugin!" }],
              });
            },
          },
        ],
      });
    },

    onunload: async () => {
      // Nothing to clean up for this simple plugin
    },

    metadata: manifest,
  };
}
```

This plugin registers a `/hello` slash command that inserts a greeting into the editor. That's all it takes.

:::info onload and onunload
`onload` is called once when the plugin activates — register everything here. `onunload` is called on disable or app close — cancel any subscriptions or listeners you created in `onload` to avoid memory leaks.
:::

---

## Step 3: Build and Package

```bash
npm run build    # compiles src/plugin.ts → dist/{id}.js
npm run zip      # packages dist/ → dist/{id}.zip
```

The zip is what Voiden installs. It contains your compiled bundle, `manifest.json`, and any other assets.

---

## Step 4: Install in Voiden

1. Open Voiden
2. Go to **Extensions → ⋯ → Install from file**
3. Select `dist/my-voiden-plugin.zip`

Voiden validates the ZIP and installs your plugin. Open any `.void` file, type `/hello` — you should see your **"Say Hello"** command in the slash menu. Select it and a greeting paragraph is inserted.

### What Voiden validates on install

- The ZIP contains `manifest.json` and the renderer bundle (`{id}.js`)
- `manifest.json` is valid JSON with the required fields: `id`, `name`, `version`
- The plugin ID does not conflict with a core extension

### Where plugins are stored

```
# macOS
~/Library/Application Support/Voiden/extensions/my-voiden-plugin/

# Linux
~/.config/Voiden/extensions/my-voiden-plugin/

# Windows
%APPDATA%/Voiden/extensions/my-voiden-plugin/
```

---

## Iterating During Development

The fastest loop:

```bash
npm run build && npm run zip
```

Then reinstall from the zip in Voiden (**Extensions → ⋯ → Install from file**). Voiden replaces the previous version in place. For renderer-only changes, you do not need to restart Voiden.

---

## Going Further: Add a Sidebar Panel

Extend your plugin with a sidebar panel using a React component:

```tsx
import React, { useState } from "react";
import type { CorePluginContext } from '@voiden/sdk/ui';
import manifest from '../manifest.json';

function MySidebar() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: "16px" }}>
      <h3>My Plugin</h3>
      <p>Button clicked {count} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Click me</button>
    </div>
  );
}

export default function createMyVoidenPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      context.addVoidenSlashGroup({ /* ... as before */ });

      context.registerSidebarTab("right", {
        id: "my-plugin-sidebar",
        title: "My Plugin",
        icon: "Zap",
        component: MySidebar,
      });
    },
    onunload: async () => {},
    metadata: manifest,
  };
}
```

Rename `src/plugin.ts` to `src/plugin.tsx` if you add JSX — the build script detects both automatically.

---

## Going Further: Add a Status Bar Button

Add a button to the bottom status bar that opens a custom tab:

```tsx
import React from "react";
import type { CorePluginContext } from '@voiden/sdk/ui';
import manifest from '../manifest.json';

function MyExplorer() {
  return (
    <div style={{ padding: "16px" }}>
      <h2>My Explorer</h2>
      <p>This is a custom tab opened from the status bar.</p>
    </div>
  );
}

export default function createMyVoidenPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      context.registerPanel("main", {
        id: "my-explorer",
        title: "My Explorer",
        component: MyExplorer,
      });

      context.registerStatusBarItem({
        id: "my-explorer-btn",
        icon: "Compass",
        label: "Explorer",
        tooltip: "Open My Explorer",
        position: "left",
        onClick: () => {
          context.addTab("main", {
            id: "my-explorer",
            icon: "Compass",
            title: "My Explorer",
            props: {},
            component: MyExplorer,
          });
        },
      });
    },
    onunload: async () => {},
    metadata: manifest,
  };
}
```

---

## Going Further: Hook Into the Request Pipeline

Plugins can modify requests before sending and process responses after receiving. This is how plugins like **Voiden Faker** inject dynamic data:

```tsx
export default function createMyVoidenPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      context.onBuildRequest(async (request, editor) => {
        // Add a custom header to every request
        if (!request.headers) request.headers = [];
        request.headers.push({ key: "X-Plugin-Version", value: "1.0.0", enabled: true });
        return request;
      });

      context.onProcessResponse(async (response) => {
        console.log("Response received:", response.status);
      });
    },
    onunload: async () => {},
    metadata: manifest,
  };
}
```

:::warning
When modifying requests in `onBuildRequest`, never expand environment variables (text in `{{double braces}}`). Voiden handles variable substitution securely in a separate stage.
:::

---

## Going Further: Expose Helpers for Other Plugins

If your plugin provides utility functions that other plugins might use:

```tsx
context.exposeHelpers({
  formatTimestamp: (date: Date) => date.toISOString(),
  parseCSV: (text: string) => text.split("\n").map((row) => row.split(",")),
});
```

Other plugins can access them via:

```tsx
const helpers = context.helpers.from("my-voiden-plugin");
if (helpers) {
  const formatted = helpers.formatTimestamp(new Date());
}
```

:::info
Helpers should be pure functions — no side effects, no network calls, no file access.
:::

---

## Project Structure

After following this guide your project looks like:

```
my-voiden-plugin/
├── src/
│   ├── plugin.ts (or plugin.tsx)   ← your entry point
│   └── skill.md
├── manifest.json
├── changelog.json
├── package.json
├── tsconfig.json
├── build.mjs
├── build-main.mjs
├── zip.mjs
└── .github/
    └── workflows/
        └── release.yml
```

For larger plugins, split into components and utilities:

```
src/
├── plugin.tsx
├── components/
│   ├── Sidebar.tsx
│   └── Explorer.tsx
└── lib/
    └── parser.ts
```

---

## Next Steps

- **[Plugin API Reference](/docs/plugins/building-plugins/plugin-api)** — every method on `PluginContext`
- **[Manifest Reference](/docs/plugins/building-plugins/manifest-reference)** — complete `manifest.json` schema
- **[Test Locally](/docs/developer-tools/create-plugin/create-plugin-test-locally)** — build, zip, install workflow in detail
- **[Release to GitHub](/docs/developer-tools/create-plugin/create-plugin-release)** — ship with one `git tag`
- **[Submit to Voiden](/docs/developer-tools/create-plugin/create-plugin-submit)** — list your plugin in the Extensions browser
