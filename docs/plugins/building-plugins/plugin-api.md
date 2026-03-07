---
  id: plugin-api
  title: Plugin API Reference
  sidebar_label: Plugin API Reference
  sidebar_position: 3
---

# Plugin API Reference

This is the complete reference for the `PluginContext` object passed to your plugin. Every method available for extending Voiden is documented here.

---

## Plugin Entry Point

Your plugin must export a default function that receives `PluginContext` and returns a `Plugin` object:

```typescript
import type { Plugin, PluginContext } from "@voiden/sdk";

export default function myPlugin(context: PluginContext): Plugin {
  return {
    onload(ctx: PluginContext) {
      // Called when your plugin is loaded
    },
    onunload() {
      // Called when your plugin is unloaded
    },
  };
}
```

| Method | Description |
|---|---|
| `onload(ctx)` | Called when the plugin initializes. Register all your features here. |
| `onunload()` | Called when the plugin is disabled or the app closes. Clean up resources. |

:::info
Both the outer function and `onload` receive a `PluginContext`. They reference the same object — use whichever is convenient.
:::

---

## Slash Commands

### `addVoidenSlashGroup(group)`

Register a group of slash commands that appear in the `/` menu.

```typescript
ctx.addVoidenSlashGroup({
  name: "my-group",
  title: "My Commands",
  commands: [
    {
      name: "my-command",
      label: "Insert Widget",
      description: "Inserts a widget block",
      slash: "/widget",
      icon: "Box",
      action: (editor) => {
        editor.commands.insertContent({
          type: "paragraph",
          content: [{ type: "text", text: "Widget inserted!" }],
        });
      },
    },
  ],
});
```

**SlashCommandDefinition:**

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Unique identifier |
| `label` | `string` | Yes | Display text in the menu |
| `description` | `string` | Yes | Description shown below the label |
| `slash` | `string` | Yes | The trigger text (e.g., `/widget`) |
| `icon` | `string` | No | Icon name from [lucide-react](https://lucide.dev/icons) |
| `action` | `(editor) => void` | Yes | Handler called when the command is selected |
| `aliases` | `string[]` | No | Alternative trigger text |
| `singleton` | `boolean` | No | Allow only one instance of this block in a document |
| `compareKeys` | `string[]` | No | Keys to compare for singleton detection |
| `isEnabled` | `(editor) => boolean` | No | Dynamic enable/disable |
| `shouldBeHidden` | `(editor) => boolean` | No | Dynamic visibility |

### `addVoidenSlashCommand(command)`

Register a single slash command (without a group).

```typescript
ctx.addVoidenSlashCommand({
  name: "greet",
  label: "Say Hello",
  description: "Insert a greeting",
  slash: "/hello",
  action: (editor) => {
    editor.commands.insertContent("Hello!");
  },
});
```

---

## Editor Extensions

### `registerVoidenExtension(extension)`

Register a TipTap extension (custom node, mark, or plugin) with the Voiden editor.

```typescript
import { Node } from "@tiptap/core";

const MyNode = Node.create({
  name: "myWidget",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "div[data-type=my-widget]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "my-widget", ...HTMLAttributes }, 0];
  },
});

ctx.registerVoidenExtension(MyNode);
```

### `unregisterVoidenExtension(name)`

Remove a previously registered TipTap extension.

```typescript
ctx.unregisterVoidenExtension("myWidget");
```

### `registerCodemirrorExtension(extension)`

Register a CodeMirror extension with the code editor. Useful for autocomplete, linting, or syntax highlighting.

```typescript
const myExtension = myCodemirrorPlugin();
ctx.registerCodemirrorExtension(myExtension);
```

### `unregisterCodemirrorExtension(extension)`

Remove a previously registered CodeMirror extension.

```typescript
ctx.unregisterCodemirrorExtension(myExtension);
```

---

## UI Registration

### `registerSidebarTab(side, tab)`

Add a tab to the left or right sidebar.

```typescript
ctx.registerSidebarTab("right", {
  id: "my-sidebar",
  title: "My Panel",
  icon: "Zap",
  component: MySidebarComponent,
});
```

**TabDefinition:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique tab identifier |
| `title` | `string` | Yes | Display title |
| `icon` | `string` | No | Icon name from lucide-react |
| `component` | `React.ComponentType` | Yes | React component to render |
| `badge` | `string \| number` | No | Badge content shown on the tab |

### `registerPanel(panelId, panel)`

Register a panel component that can be opened as a tab.

```typescript
ctx.registerPanel("main", {
  id: "my-panel",
  title: "My Panel",
  component: MyPanelComponent,
});
```

### `addTab(panelId, tab)`

Open a new tab in a panel area. The component must have been registered with `registerPanel` first, or you can provide it inline.

```typescript
ctx.addTab("main", {
  id: "my-tab",
  icon: "FileText",
  title: "My Tab",
  props: { someData: "value" },
  component: MyComponent,
});
```

### `registerEditorAction(action)`

Add a button to the code editor toolbar. Use the `predicate` to control when it appears.

```typescript
ctx.registerEditorAction({
  id: "my-action",
  component: MyActionButton,
  predicate: (tab) => {
    // Only show for .json files
    return tab.title?.endsWith(".json");
  },
});
```

### `registerStatusBarItem(item)`

Add an item to the bottom status bar.

```typescript
ctx.registerStatusBarItem({
  id: "my-status",
  icon: "Activity",
  label: "My Plugin",
  tooltip: "Click to open",
  position: "left",
  onClick: () => {
    // Open a tab, toggle a panel, etc.
  },
});
```

**StatusBarItem:**

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `icon` | `string \| React.ComponentType` | Yes | Icon name or component |
| `label` | `string` | No | Text label next to the icon |
| `tooltip` | `string` | Yes | Hover tooltip |
| `position` | `'left' \| 'right'` | Yes | Which side of the status bar |
| `onClick` | `() => void` | Yes | Click handler |

---

## UI Utilities

### `ctx.ui`

Access UI helpers and shared components.

```typescript
// Get prose styling classes for themed content
const classes = ctx.ui.getProseClasses();

// Panel controls
ctx.ui.openRightPanel();
ctx.ui.closeRightPanel();
ctx.ui.toggleRightPanel();
ctx.ui.openBottomPanel();
ctx.ui.closeBottomPanel();

// Open a specific sidebar tab
ctx.ui.openRightSidebarTab("my-sidebar");
```

### `ctx.ui.components`

Shared UI components you can use in your React components:

| Component | Description |
|---|---|
| `CodeEditor` | Generic code editor (CodeMirror-based) |
| `Table` | Styled table component |
| `TableBody` | Table body |
| `TableRow` | Table row |
| `TableCell` | Table cell |
| `NodeViewWrapper` | TipTap node view wrapper |
| `RequestBlockHeader` | Request block header with link/unlink |

**CodeEditor Props:**

```typescript
<ctx.ui.components.CodeEditor
  readOnly={false}
  lang="json"
  value='{"key": "value"}'
  onChange={(value) => console.log(value)}
  showReplace={false}
/>
```

### `ctx.ui.hooks`

Request-related React hooks:

| Hook | Description |
|---|---|
| `useSendRestRequest(editor)` | Returns `{ refetch, isLoading, error, data, cancelRequest }` |

---

## Request Pipeline

### `onBuildRequest(handler)`

Register a handler that modifies the request object before it's sent. Handlers run in registration order.

```typescript
ctx.onBuildRequest(async (request, editor) => {
  // Add a custom header
  request.headers.push({
    key: "X-Custom",
    value: "my-value",
    enabled: true,
  });
  return request;
});
```

:::warning
Never expand environment variables (`{{VARIABLE}}`) in your handler. Voiden handles variable substitution securely in a separate stage.
:::

### `onProcessResponse(handler)`

Register a handler that runs after a response is received.

```typescript
ctx.onProcessResponse(async (response) => {
  // Log or transform the response
  console.log(`Status: ${response.status}`);
});
```

### `registerResponseSection(section)`

Register a section to display in the response panel.

```typescript
ctx.registerResponseSection({
  id: "my-results",
  name: "My Results",
  component: MyResultsComponent,
  order: 10,
});
```

---

## Project & File Access

### `ctx.project`

Access project-level operations:

```typescript
// Get the active project path
const projectPath = await ctx.project.getActiveProject();

// Open a file in the editor
await ctx.project.openFile("requests/users.void");

// Create a new file
await ctx.project.createFile("requests/new.void", "# New Request\n");

// Create a new folder
await ctx.project.createFolder("requests/subfolder");

// Get all .void files in the project
const voidFiles = await ctx.project.getVoidFiles();

// Import a cURL command as a new document
await ctx.project.importCurl("My Request", 'curl -X GET https://api.example.com/users');

// Get the active editor instance
const voidenEditor = ctx.project.getActiveEditor("voiden");
const codeEditor = ctx.project.getActiveEditor("code");
```

---

## Helpers

### `exposeHelpers(helpers)`

Expose utility functions that other plugins can use.

```typescript
ctx.exposeHelpers({
  parseJSON: (text: string) => JSON.parse(text),
  formatDate: (date: Date) => date.toISOString(),
});
```

### `ctx.helpers.from(pluginId)`

Get helpers exposed by another plugin.

```typescript
const fakerHelpers = ctx.helpers.from("voiden-faker");
if (fakerHelpers) {
  // Use helpers from the faker plugin
}
```

### `ctx.helpers.parseVoid(markdown)`

Parse a `.void` markdown document into Voiden's internal format.

```typescript
const doc = ctx.helpers.parseVoid("# My Document\nSome content");
```

:::info
Helpers must be **pure functions** — no side effects, no network calls, no file system access. They're meant for data transformation and parsing only.
:::

---

## Paste Handling

### `ctx.paste`

Register handlers for clipboard paste events.

#### `registerBlockOwner(handler)`

Claim ownership of a block type for paste handling. Only one owner per block type.

```typescript
ctx.paste.registerBlockOwner({
  blockType: "my-block",
  allowExtensions: true,
  handlePasteInside: (text, html, node, view) => {
    // Handle paste inside your block
    // Return true if handled, false to use default behavior
    return false;
  },
  processBlock: (block) => {
    // Validate/transform block on paste
    return block;
  },
});
```

#### `registerPatternHandler(handler)`

Handle specific paste patterns (e.g., URLs, cURL commands).

```typescript
ctx.paste.registerPatternHandler({
  canHandle: (text) => text.startsWith("curl "),
  handle: (text, html, view) => {
    // Parse and insert the cURL command
    return true; // Return true if handled
  },
});
```

#### `registerBlockExtension(extension)`

Extend a block type owned by another plugin.

```typescript
ctx.paste.registerBlockExtension({
  blockType: "request",
  extendBlock: (block, context) => {
    // Add transient properties to the block
    return block;
  },
});
```

---

## Voiden Tab Management

### `openVoidenTab(title, content, options)`

Open a new Voiden editor tab with JSON content.

```typescript
await ctx.openVoidenTab("Preview", documentJSON, { readOnly: true });
```

### `registerLinkableNodeTypes(nodeTypes)`

Register node types that can be linked/referenced across files.

```typescript
ctx.registerLinkableNodeTypes(["my-block", "my-output"]);
```

### `registerNodeDisplayNames(displayNames)`

Register human-readable names for node types shown in the UI.

```typescript
ctx.registerNodeDisplayNames({
  "my-block": "My Widget",
  "my-output": "Widget Output",
});
```

---

## Full PluginContext Type

For reference, here is the complete `PluginContext` interface:

```typescript
interface PluginContext {
  // Editor Extensions
  registerVoidenExtension(extension: any): void;
  unregisterVoidenExtension(extensionName: string): void;
  registerCodemirrorExtension(extension: any): void;
  unregisterCodemirrorExtension(extension: any): void;

  // Slash Commands
  addVoidenSlashCommand(command: SlashCommandDefinition): void;
  addVoidenSlashGroup(group: SlashCommandGroup): void;

  // UI Registration
  registerSidebarTab(side: "left" | "right", tab: TabDefinition): void;
  registerPanel(panelId: string, panel: TabDefinition): void;
  addTab(tabId: string, tab: Panel): void;
  registerEditorAction(action: EditorAction): void;
  registerStatusBarItem(item: StatusBarItem): void;

  // Helpers
  exposeHelpers(helpers: PluginHelpers): void;
  helpers: {
    parseVoid(markdown?: string): any;
    from<T>(pluginId: string): T | undefined;
  };

  // Project & Files
  project: {
    getActiveEditor(type: "code" | "voiden"): any;
    getActiveProject(): Promise<string>;
    getVoidFiles(): Promise<DocumentTab[]>;
    createFile(filePath: string, content: string): Promise<void>;
    createFolder(folderPath: string): Promise<void>;
    openFile(relativePath: string): Promise<void>;
    importCurl(title: string, curlString: string): Promise<void>;
  };

  // UI Utilities
  ui: {
    getProseClasses(): string;
    openRightPanel(): void;
    closeRightPanel(): void;
    toggleRightPanel(): void;
    openBottomPanel(): void;
    closeBottomPanel(): void;
    openRightSidebarTab(tabId: string): void;
    components: UIComponents;
    hooks: RequestHooks;
  };

  // Request Pipeline
  onBuildRequest(handler: RequestBuildHandler): void;
  onProcessResponse(handler: ResponseProcessHandler): void;
  registerResponseSection(section: ResponseSection): void;

  // Paste Handling
  paste: PasteAPI;

  // Tab Management
  openVoidenTab(title: string, content: any, options?: { readOnly?: boolean }): Promise<void>;
  registerLinkableNodeTypes(nodeTypes: string[]): void;
  registerNodeDisplayNames(displayNames: Record<string, string>): void;
}
```
