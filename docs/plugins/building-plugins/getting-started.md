---
  id: getting-started
  title: Getting Started
  sidebar_label: Getting Started
  sidebar_position: 2
---

# Getting Started: Build Your First Plugin

This guide walks you through building a Voiden plugin from scratch. We'll start with a minimal plugin and progressively add features so you can see how each API works.

---

## Step 1: Set Up the Project

Create a new directory for your plugin and initialize it:

```bash
mkdir my-voiden-plugin
cd my-voiden-plugin
npm init -y
```

Install the SDK and dev dependencies:

```bash
npm install @voiden/sdk
npm install --save-dev typescript esbuild @types/react
```

Your plugin will also need React as a peer dependency (Voiden provides it at runtime):

Update your `package.json`:

```json
{
  "name": "my-voiden-plugin",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/main.js",
  "scripts": {
    "build": "node esbuild.config.mjs",
    "dev": "node esbuild.config.mjs --watch"
  },
  "dependencies": {
    "@voiden/sdk": "^1.0.6"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "esbuild": "^0.24.0",
    "typescript": "^5.9.3",
    "@types/react": "^18.3.27"
  }
}
```

---

## Step 2: Configure TypeScript

Create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Step 3: Configure the Build

Create `esbuild.config.mjs`:

```javascript
import { build, context } from "esbuild";
import { copyFileSync, mkdirSync } from "fs";

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/index.tsx"],
  outfile: "dist/main.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  // These are provided by Voiden at runtime — don't bundle them
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@voiden/sdk",
    "@voiden/sdk/ui",
  ],
  logLevel: "info",
};

// Copy manifest.json to dist/
mkdirSync("dist", { recursive: true });
copyFileSync("src/manifest.json", "dist/manifest.json");

if (isWatch) {
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await build(buildOptions);
}
```

:::tip Why esbuild?
Voiden loads external plugins as single ESM bundles (`main.js`). esbuild bundles your TypeScript, React components, and dependencies into one file while keeping Voiden's runtime dependencies external.
:::

---

## Step 4: Create the Manifest

Create `src/manifest.json`:

```json
{
  "id": "my-voiden-plugin",
  "type": "community",
  "name": "My Voiden Plugin",
  "description": "A simple plugin that adds a greeting slash command",
  "version": "1.0.0",
  "author": "Your Name",
  "enabled": true,
  "priority": 50,
  "readme": "Adds a /hello slash command that inserts a greeting into your document.",
  "capabilities": {
    "slashCommands": {
      "groups": [
        {
          "name": "Greetings",
          "commands": ["Insert greeting"]
        }
      ]
    }
  },
  "dependencies": {
    "core": "^1.0.0",
    "sdk": "^1.0.0"
  },
  "features": [
    "Slash command to insert a greeting"
  ]
}
```

---

## Step 5: Write the Plugin

Create `src/index.tsx`:

```tsx
import type { Plugin, PluginContext } from "@voiden/sdk";

export default function myPlugin(context: PluginContext): Plugin {
  return {
    onload(ctx: PluginContext) {
      // Register a slash command group
      ctx.addVoidenSlashGroup({
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
                content: [
                  {
                    type: "text",
                    text: "Hello from my first Voiden plugin!",
                  },
                ],
              });
            },
          },
        ],
      });
    },

    onunload() {
      // Nothing to clean up for this simple plugin
    },
  };
}
```

That's it! This plugin registers a `/hello` slash command that inserts a greeting paragraph into the editor.

---

## Step 6: Build and Package

```bash
npm run build
```

This creates:
- `dist/main.js` — your bundled plugin
- `dist/manifest.json` — copied from `src/`

### Package as a ZIP

Voiden installs community plugins from `.zip` files. Package your `dist/` output into a ZIP:

```bash
cd dist && zip -r ../my-voiden-plugin.zip manifest.json main.js && cd ..
```

You should now have a `my-voiden-plugin.zip` file at the root of your project containing both `manifest.json` and `main.js`.

:::tip Automate packaging
Add a `package` script to your `package.json` so you can build and zip in one step:

```json
{
  "scripts": {
    "build": "node esbuild.config.mjs",
    "package": "npm run build && cd dist && zip -r ../my-voiden-plugin.zip manifest.json main.js"
  }
}
```

Then just run `npm run package`.
:::

---

## Step 7: Install and Test in Voiden

Voiden has a built-in extension installer that lets you install plugins directly from a ZIP file — no manual file copying needed.

### Install from ZIP

1. Open Voiden
2. Open the **Extension Browser** (click the puzzle piece icon in the sidebar, or go to **Settings > Extensions**)
3. Click the **"Install from file"** button at the top of the extension browser
4. Select your `my-voiden-plugin.zip` file from the file picker
5. Voiden will validate the ZIP, extract it, and install your plugin automatically

That's it — your plugin is now installed and active.

### Verify It Works

1. Open any `.void` file (or create a new one)
2. Type `/hello` in the editor
3. You should see your **"Say Hello"** command in the slash menu
4. Select it — a greeting paragraph is inserted into the document

### What Voiden Validates

When you install from ZIP, Voiden checks the following:

- The ZIP contains both **`manifest.json`** and **`main.js`** (either at the root or inside a single top-level folder)
- The `manifest.json` is valid JSON
- The manifest includes the required fields: **`id`**, **`name`**, and **`version`**
- The plugin ID does not conflict with a core extension

If any of these checks fail, Voiden will show an error message explaining what went wrong.

### Where Plugins Are Stored

After installation, your plugin files live in Voiden's user data directory:

```
# macOS
~/Library/Application Support/Voiden/extensions/my-voiden-plugin/
  ├── manifest.json
  └── main.js

# Linux
~/.config/Voiden/extensions/my-voiden-plugin/

# Windows
%APPDATA%/Voiden/extensions/my-voiden-plugin/
```

Voiden also maintains an `installed.json` registry file alongside the extension folders to track all installed community plugins.

### Managing Your Plugin

Once installed, you can manage your plugin from the Extension Browser:

- **Enable / Disable** — Toggle your plugin on or off without uninstalling it
- **Uninstall** — Remove the plugin entirely
- **Update** — Install a new version by re-installing from a new ZIP file (same plugin ID will overwrite the previous version)

### Iterating During Development

When you're actively developing, the workflow looks like this:

1. Make changes to your source code
2. Run `npm run package` (builds and creates the ZIP)
3. In Voiden, click **"Install from file"** and select the new ZIP
4. The plugin is updated in place — Voiden replaces the previous version
5. Restart Voiden to pick up the changes

:::tip Watch mode
During development you can run `npm run dev` to have esbuild watch for changes and rebuild automatically. You'll still need to re-package and re-install the ZIP, but it saves the manual build step.
:::

---

## Going Further: Add a Sidebar Panel

Let's extend the plugin with a sidebar panel that shows a simple React component.

Update `src/index.tsx`:

```tsx
import React, { useState } from "react";
import type { Plugin, PluginContext } from "@voiden/sdk";

// A simple sidebar component
function MySidebar() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ marginBottom: "8px" }}>My Plugin</h3>
      <p>Button clicked {count} times</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        style={{
          padding: "6px 12px",
          borderRadius: "4px",
          border: "1px solid #444",
          background: "#2a2a2a",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default function myPlugin(context: PluginContext): Plugin {
  return {
    onload(ctx: PluginContext) {
      // Register the slash command
      ctx.addVoidenSlashGroup({
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
                content: [
                  { type: "text", text: "Hello from my first Voiden plugin!" },
                ],
              });
            },
          },
        ],
      });

      // Register a sidebar tab
      ctx.registerSidebarTab("right", {
        id: "my-plugin-sidebar",
        title: "My Plugin",
        icon: "Zap",
        component: MySidebar,
      });
    },

    onunload() {},
  };
}
```

Rebuild and restart Voiden. You'll see a new tab in the right sidebar.

---

## Going Further: Add a Status Bar Button

You can add a button to the bottom status bar that opens a custom tab:

```tsx
import React from "react";
import type { Plugin, PluginContext } from "@voiden/sdk";

function MyExplorer() {
  return (
    <div style={{ padding: "16px" }}>
      <h2>My Explorer</h2>
      <p>This is a custom tab opened from the status bar.</p>
    </div>
  );
}

export default function myPlugin(context: PluginContext): Plugin {
  return {
    onload(ctx: PluginContext) {
      // Register the component so tabs can find it
      ctx.registerPanel("main", {
        id: "my-explorer",
        title: "My Explorer",
        component: MyExplorer,
      });

      // Add a button to the status bar
      ctx.registerStatusBarItem({
        id: "my-explorer-btn",
        icon: "Compass",
        label: "Explorer",
        tooltip: "Open My Explorer",
        position: "left",
        onClick: () => {
          ctx.addTab("main", {
            id: "my-explorer",
            icon: "Compass",
            title: "My Explorer",
            props: {},
            component: MyExplorer,
          });
        },
      });
    },

    onunload() {},
  };
}
```

---

## Going Further: Hook Into the Request Pipeline

Plugins can modify requests before they're sent and process responses after they arrive. This is how plugins like **Voiden Faker** inject dynamic data.

```tsx
import type { Plugin, PluginContext } from "@voiden/sdk";

export default function myPlugin(context: PluginContext): Plugin {
  return {
    onload(ctx: PluginContext) {
      // Modify requests before sending
      ctx.onBuildRequest(async (request, editor) => {
        // Add a custom header to every request
        if (!request.headers) request.headers = [];
        request.headers.push({
          key: "X-Plugin-Version",
          value: "1.0.0",
          enabled: true,
        });
        return request;
      });

      // Process responses after receiving
      ctx.onProcessResponse(async (response) => {
        console.log("Response received:", response.status);
      });
    },

    onunload() {},
  };
}
```

:::warning Pipeline Hooks
When modifying requests in `onBuildRequest`, never expand environment variables (text in `{{double braces}}`). Voiden handles variable substitution securely in a separate stage.
:::

---

## Going Further: Expose Helpers for Other Plugins

If your plugin provides utility functions that other plugins might need, you can expose them:

```tsx
ctx.exposeHelpers({
  formatTimestamp: (date: Date) => date.toISOString(),
  parseCSV: (text: string) => text.split("\n").map((row) => row.split(",")),
});
```

Other plugins can access your helpers via:

```tsx
const myHelpers = ctx.helpers.from("my-voiden-plugin");
if (myHelpers) {
  const formatted = myHelpers.formatTimestamp(new Date());
}
```

:::info
Helpers should be **pure functions** — no side effects, no network calls, no file access. Think data transformation and parsing only.
:::

---

## Project Structure Recap

After following this guide, your project should look like:

```
my-voiden-plugin/
├── src/
│   ├── manifest.json          # Plugin metadata
│   └── index.tsx              # Plugin entry point
├── dist/
│   ├── manifest.json          # Copied during build
│   └── main.js               # Bundled output
├── package.json
├── tsconfig.json
└── esbuild.config.mjs
```

For larger plugins, you'll want to split into more files:

```
my-voiden-plugin/
├── src/
│   ├── manifest.json
│   ├── index.tsx              # Plugin entry point
│   ├── components/            # React components
│   │   ├── Sidebar.tsx
│   │   └── Explorer.tsx
│   ├── lib/                   # Utility functions
│   │   └── parser.ts
│   └── nodes/                 # Custom TipTap nodes (advanced)
│       └── MyBlock.tsx
├── dist/
├── package.json
├── tsconfig.json
└── esbuild.config.mjs
```

---

## Next Steps

- **[Plugin API Reference](/docs/plugins/building-plugins/plugin-api)** — Full reference for every method on `PluginContext`
- **[Manifest Reference](/docs/plugins/building-plugins/manifest-reference)** — Complete schema for `manifest.json`
- Browse the **core-extensions** source code for real-world examples of advanced patterns like custom TipTap blocks and complex pipeline hooks
