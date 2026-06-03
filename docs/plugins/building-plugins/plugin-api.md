---
  id: plugin-api
  title: Plugin API Reference
  sidebar_label: Plugin API Reference
  sidebar_position: 3
---

# Plugin API Reference

Complete reference for the `PluginContext` object passed to your plugin factory. Every method available for extending Voiden is documented here.

---

## Plugin Entry Point

```typescript
import type { CorePluginContext } from '@voiden/sdk/ui';
import manifest from '../manifest.json';

export default function createMyPlugin(context: CorePluginContext) {
  return {
    onload: async () => {
      // Register everything here
    },

    onunload: async () => {
      // Cancel subscriptions, clean up resources
    },

    metadata: manifest,
  };
}
```

| Hook | When it runs |
|---|---|
| `onload` | Called once when the plugin activates — register all features here |
| `onunload` | Called on disable or app close — cancel any subscriptions made in `onload` |
| `metadata` | Pass `manifest` directly — used for Extensions browser display |

:::info
Import `CorePluginContext` from `@voiden/sdk/ui`, not `@voiden/sdk`. The `/ui` path provides the full extended context including pipeline hooks, UI utilities, and all the APIs documented here.
:::

---

## Slash Commands

### `addVoidenSlashGroup(group)`

Register a group of slash commands that appear in the `/` menu.

```typescript
context.addVoidenSlashGroup({
  name: "my-group",
  title: "My Commands",
  commands: [
    {
      name: "insert-widget",
      label: "Insert Widget",
      description: "Inserts a widget block",
      slash: "/widget",
      icon: "Box",
      action: (editor) => {
        editor.commands.insertContent({ type: "paragraph", content: [{ type: "text", text: "Widget!" }] });
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
| `slash` | `string` | Yes | Trigger text (e.g. `/widget`) |
| `icon` | `string` | No | Lucide icon name |
| `action` | `(editor) => void` | Yes | Handler called when selected |
| `aliases` | `string[]` | No | Alternative trigger text |
| `singleton` | `boolean` | No | Allow only one instance in a document |
| `compareKeys` | `string[]` | No | Keys to compare for singleton detection |
| `isEnabled` | `(editor) => boolean` | No | Dynamic enable/disable |
| `shouldBeHidden` | `(editor) => boolean` | No | Dynamic visibility |

### `addVoidenSlashCommand(command)`

Register a single slash command without a group.

```typescript
context.addVoidenSlashCommand({
  name: "greet",
  label: "Say Hello",
  description: "Insert a greeting",
  slash: "/hello",
  action: (editor) => editor.commands.insertContent("Hello!"),
});
```

---

## Editor Extensions

### `registerVoidenExtension(extension)`

Register a TipTap node, mark, or plugin with the Voiden editor.

```typescript
import { Node } from "@tiptap/core";

const MyNode = Node.create({
  name: "myWidget",
  group: "block",
  content: "inline*",
  parseHTML() { return [{ tag: "div[data-type=my-widget]" }]; },
  renderHTML({ HTMLAttributes }) { return ["div", { "data-type": "my-widget", ...HTMLAttributes }, 0]; },
});

context.registerVoidenExtension(MyNode);
```

### `unregisterVoidenExtension(name)`

Remove a previously registered TipTap extension.

```typescript
context.unregisterVoidenExtension("myWidget");
```

### `registerCodemirrorExtension(extension)`

Register a CodeMirror extension with the code editor (autocomplete, linting, syntax highlighting).

```typescript
context.registerCodemirrorExtension(myCodemirrorPlugin());
```

### `unregisterCodemirrorExtension(extension)`

Remove a previously registered CodeMirror extension.

---

## UI Registration

### `registerSidebarTab(side, tab)`

Add a tab to the left or right sidebar.

```typescript
context.registerSidebarTab("right", {
  id: "my-sidebar",
  title: "My Panel",
  icon: "Zap",
  component: MySidebarComponent,
  badge: 3,  // optional — shows a badge on the tab
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique tab identifier |
| `title` | `string` | Yes | Display title |
| `icon` | `string` | No | Lucide icon name |
| `component` | `React.ComponentType` | Yes | React component to render |
| `badge` | `string \| number` | No | Badge content shown on the tab |

### `registerPanel(panelId, panel)`

Register a panel component that can be opened as a tab.

```typescript
context.registerPanel("main", {
  id: "my-panel",
  title: "My Panel",
  component: MyPanelComponent,
});
```

### `addTab(panelId, tab)`

Open a tab in a panel. Provide the component inline or after `registerPanel`.

```typescript
context.addTab("main", {
  id: "my-tab",
  icon: "FileText",
  title: "My Tab",
  props: {},
  component: MyComponent,
});
```

### `registerEditorAction(action)`

Add a button to the code editor toolbar.

```typescript
context.registerEditorAction({
  id: "my-action",
  component: MyActionButton,
  predicate: (doc) => doc.title?.endsWith(".json"),
});
```

### `registerStatusBarItem(item)`

Add an item to the bottom status bar.

```typescript
context.registerStatusBarItem({
  id: "my-status",
  icon: "Activity",       // string or React.ComponentType
  label: "My Plugin",
  tooltip: "Click to open",
  position: "left",
  onClick: () => { /* open a tab, toggle panel, etc. */ },
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `icon` | `string \| React.ComponentType` | Yes | Lucide icon name or component |
| `label` | `string` | No | Text label next to the icon |
| `tooltip` | `string` | Yes | Hover tooltip |
| `position` | `'left' \| 'right'` | Yes | Which side of the status bar |
| `onClick` | `() => void` | Yes | Click handler |

### `registerTopBarItem(item)`

Inject an icon button into the top navigation bar.

```typescript
import { Rocket } from "lucide-react";

context.registerTopBarItem({
  id: "my-topbar-btn",
  icon: Rocket,           // React.ComponentType — import from lucide-react
  tooltip: "Launch",
  position: "right",      // 'left' | 'right', defaults to 'right'
  onClick: () => { /* ... */ },
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `icon` | `React.ComponentType<any>` | Yes | Icon component (e.g. from `lucide-react`) |
| `tooltip` | `string` | No | Hover tooltip |
| `position` | `'left' \| 'right'` | No | Side of the nav bar (default: `'right'`) |
| `onClick` | `() => void` | Yes | Click handler |

:::info
`registerTopBarItem` is also available as `context.ui.registerTopBarItem` — both point to the same API.
:::

---

## Command Palette

Requires manifest permission: `"commandPalette"`

### `registerCommand(cmd)`

Register an entry in the command palette (`⌘⇧P`).

```typescript
import { Play } from "lucide-react";

context.registerCommand({
  id: "my-plugin.run-all",
  label: "My Plugin: Run All Tests",
  description: "Execute all .void files in the project",
  icon: Play,
  shortcut: "⌘⇧T",
  when: () => true,       // optional — hide the command when returns false
  action: () => { /* ... */ },
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier (e.g. `"my-plugin.action"`) |
| `label` | `string` | Yes | Display label in the palette |
| `description` | `string` | No | Subtitle shown below the label |
| `icon` | `React.ComponentType` | No | Icon component |
| `shortcut` | `string` | No | Keyboard shortcut hint (display only — not bound automatically) |
| `when` | `() => boolean` | No | Command is hidden when this returns `false` |
| `action` | `() => void` | Yes | Executed when the command is selected |

---

## Context Menus

Requires manifest permission: `"contextMenus"`

### `registerContextMenu(item)`

Inject an item into a right-click context menu surface.

```typescript
import { Copy } from "lucide-react";

context.registerContextMenu({
  id: "my-plugin.copy-request",
  label: "Copy as cURL",
  icon: Copy,
  surface: "tab",           // 'tab' | 'file' | 'block'
  when: (target) => !!target.filePath?.endsWith(".void"),
  action: (target) => {
    console.log("Right-clicked:", target);
  },
});
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier |
| `label` | `string` | Yes | Display label |
| `icon` | `React.ComponentType` | No | Icon component |
| `surface` | `'tab' \| 'file' \| 'block'` | Yes | Which context menu this item appears in |
| `when` | `(target: any) => boolean` | No | Item is hidden when this returns `false` |
| `action` | `(target: any) => void` | Yes | Called with the right-clicked target object |

---

## Events

Requires manifest permission: `"events"`

### `context.events.on(event, callback)`

Subscribe to workspace lifecycle events. Always store the returned unsubscribe function and call it in `onunload`.

```typescript
const cleanupFns: Array<() => void> = [];

context.events.on('tab:changed', ({ tabId, title, type }) => {
  console.log('Tab changed to:', title);
});

context.events.on('file:saved', ({ filePath, tabId }) => {
  console.log('Saved:', filePath);
});

context.events.on('project:changed', ({ projectPath }) => {
  console.log('Project switched to:', projectPath);
});

context.events.on('environment:changed', ({ envPath }) => {
  console.log('Active environment changed:', envPath);
});

context.events.on('request:sent', ({ request }) => {
  console.log('Request sent:', request.url);
});

context.events.on('response:received', ({ response }) => {
  console.log('Response:', response.status);
});

// In onunload — cancel all subscriptions:
cleanupFns.forEach(fn => fn());
```

**Supported events:**

| Event | Payload | Description |
|---|---|---|
| `'tab:changed'` | `{ tabId, title, type }` | A different document tab became active |
| `'file:saved'` | `{ filePath, tabId }` | A file was saved |
| `'project:changed'` | `{ projectPath }` | The active project folder changed |
| `'environment:changed'` | `{ envPath }` | The active environment file changed |
| `'request:sent'` | `{ request }` | A request was sent |
| `'response:received'` | `{ response }` | A response was received |

---

## File System

Requires manifest permission: `"filesystem"`

All paths are relative to the active project root. There is no access to paths outside the open project.

### `context.fs`

```typescript
// Read a file
const content = await context.fs.read('config.json');

// Write to a file (creates if missing)
await context.fs.write('output.txt', 'hello world');

// Create a new file with optional initial content
await context.fs.create('notes/new.md', '# Notes\n');

// Create a directory (and any missing parents)
await context.fs.createDirectory('reports/2026');

// Delete a file or directory
await context.fs.delete('temp.txt');

// Move a file (creates destination directory if missing)
await context.fs.move('old/path.void', 'new/path.void');

// Check if a path exists
const exists = await context.fs.exists('config.json');

// List entries at a path (defaults to project root)
const entries = await context.fs.list('src');
// Returns: [{ name: 'plugin.ts', path: 'src/plugin.ts', type: 'file' }, ...]
```

| Method | Signature | Description |
|---|---|---|
| `read` | `(path) => Promise<string>` | Read a file's text content |
| `write` | `(path, content) => Promise<void>` | Write text to a file (creates if missing) |
| `create` | `(path, content?) => Promise<void>` | Create a new file with optional initial content |
| `createDirectory` | `(path) => Promise<void>` | Create a directory and any missing parents |
| `delete` | `(path) => Promise<void>` | Delete a file or directory |
| `move` | `(fromPath, toPath) => Promise<void>` | Move a file; creates the destination directory if missing |
| `exists` | `(path) => Promise<boolean>` | Return `true` if the path exists |
| `list` | `(path?) => Promise<Entry[]>` | List entries at a path; defaults to project root |

---

## Settings

Requires manifest permission: `"settings"`

### `context.settings`

Persist and retrieve plugin configuration values (plain JSON, stored per-plugin).

```typescript
// Get a value
const theme = await context.settings.get<string>('theme');

// Set a value
await context.settings.set('theme', 'dark');

// Delete a key
await context.settings.delete('theme');

// Subscribe to changes — returns an unsubscribe function
const unsub = context.settings.onChange((key, value) => {
  console.log(`Setting changed: ${key} = ${value}`);
});
// Call unsub() in onunload
```

### `context.ui.registerSettings(section)`

Register a settings section in the Voiden Settings panel. The host renders the fields using its own UI primitives — no custom React components needed.

```typescript
import { Sliders } from "lucide-react";

context.ui.registerSettings({
  id: "my-plugin-settings",
  title: "My Plugin",
  icon: Sliders,
  fields: [
    {
      type: "toggle",
      key: "enabled",
      label: "Enable feature",
      description: "Turn the feature on or off",
      defaultValue: true,
    },
    {
      type: "text",
      key: "apiKey",
      label: "API Key",
      placeholder: "sk-...",
    },
    {
      type: "number",
      key: "timeout",
      label: "Timeout (ms)",
      defaultValue: 5000,
      min: 0,
      max: 30000,
    },
    {
      type: "select",
      key: "mode",
      label: "Mode",
      options: [
        { label: "Fast", value: "fast" },
        { label: "Accurate", value: "accurate" },
      ],
      defaultValue: "fast",
    },
  ],
});
```

**Supported field types:** `text`, `number`, `select`, `toggle`

Each field accepts `key` (used with `context.settings.get/set`), `label`, and `description?`. Values are persisted automatically via the settings API.

---

## Theme

### `context.theme`

Ready-to-use Tailwind class tokens that map to the active Voiden theme. Use these in your plugin's JSX instead of hard-coding colour values so your UI automatically follows light/dark mode.

```tsx
function MyPanel() {
  const { theme } = usePluginContext(); // or receive it as a prop

  return (
    <div className={`${context.theme.bg.surface} ${context.theme.text.primary} p-4`}>
      <h2 className={`${context.theme.text.ui} font-medium mb-2`}>My Plugin</h2>

      <button className={`${context.theme.button.primary} px-3 py-1 rounded`}>
        Send
      </button>

      <span className={`${context.theme.http.get} ${context.theme.http.getBg} px-2 py-0.5 rounded text-xs`}>
        GET
      </span>

      <p className={context.theme.status.successText}>Passed</p>
    </div>
  );
}
```

**Token groups:**

| Group | Tokens | Example use |
|---|---|---|
| `theme.bg` | `primary`, `surface`, `panel`, `overlay`, `active`, `hover`, `accent`, `alt` | Container backgrounds |
| `theme.text` | `primary`, `muted`, `ui`, `light`, `accent`, `alt` | Text colours |
| `theme.border` | `DEFAULT`, `light`, `subtle`, `line` | Borders and dividers |
| `theme.button` | `primary`, `primaryHover`, `secondary`, `secondaryFg`, `danger`, `dangerHover` | Button backgrounds |
| `theme.status` | `successBg/Text`, `errorBg/Text`, `warningBg/Text`, `infoBg/Text` | Status indicators |
| `theme.http` | `get`, `post`, `put`, `patch`, `delete`, `head`, `options` + `*Bg` variants | HTTP method badges |
| `theme.icon` | `primary`, `secondary`, `success`, `error`, `warning`, `info` | Icon colours |
| `theme.interactive` | `active`, `hover` | Interactive state backgrounds |
| `theme.code` | `bg`, `fg`, `selection`, `line`, `gutter` | Code display |
| `theme.menu` | `bg`, `hover`, `separator` | Dropdown/context menus |
| `theme.badge` | `coreBg/Fg/Border`, `officialBg/Fg/Border`, `communityBg/Fg/Border` | Extension type badges |
| `theme.test` | `passedBg/Text`, `failedBg/Text` | Assertion result chips |

`THEME_CLASSES` can also be imported directly for use outside a plugin context:

```typescript
import { THEME_CLASSES } from '@voiden/sdk/ui';
```

---

## Request Pipeline

### `onBuildRequest(handler)`

Modify the request object before it is sent. Multiple handlers run in registration order.

```typescript
context.onBuildRequest(async (request, editor) => {
  request.headers.push({ key: "X-Custom", value: "my-value", enabled: true });
  return request;
});
```

:::warning
Never expand environment variables (`{{VARIABLE}}`) in your handler. Voiden handles variable substitution securely in a separate stage.
:::

### `onProcessResponse(handler)`

Run logic after a response is received.

```typescript
context.onProcessResponse(async (response) => {
  console.log(`Status: ${response.status}`);
});
```

### `registerResponseSection(section)`

Register a section to display in the response panel.

```typescript
context.registerResponseSection({
  id: "my-results",
  name: "My Results",
  component: MyResultsComponent,
  order: 10,
});
```

---

## Project & File Access

### `context.project`

```typescript
// Get the active project path
const projectPath = await context.project.getActiveProject();

// Get all .void files in the project
const files = await context.project.getVoidFiles();

// Open a file in the editor
await context.project.openFile("requests/users.void");

// Create a file
await context.project.createFile("requests/new.void", "# New Request\n");

// Create a folder
await context.project.createFolder("requests/subfolder");

// Import a cURL command as a new document tab
await context.project.importCurl("My Request", "curl -X GET https://api.example.com/users");

// Get the active editor instance
const editor = context.project.getActiveEditor("voiden");
```

---

## Helpers

### `exposeHelpers(helpers)`

Expose utility functions for other plugins to consume.

```typescript
context.exposeHelpers({
  parseJSON: (text: string) => JSON.parse(text),
  formatDate: (date: Date) => date.toISOString(),
});
```

### `context.helpers.from(pluginId)`

Get helpers exposed by another plugin.

```typescript
const fakerHelpers = context.helpers.from("voiden-faker");
if (fakerHelpers) {
  const value = fakerHelpers.generate("name");
}
```

### `context.helpers.parseVoid(markdown)`

Parse a `.void` markdown document into Voiden's internal format.

```typescript
const doc = context.helpers.parseVoid("# My Document\nSome content");
```

:::info
Helpers must be pure functions — no side effects, no network calls, no file access.
:::

---

## Paste Handling

### `context.paste.registerBlockOwner(handler)`

Claim ownership of a block type for paste handling. Only one owner per block type.

```typescript
context.paste.registerBlockOwner({
  blockType: "my-block",
  allowExtensions: true,
  handlePasteInside: (text, html, node, view) => false,
  processBlock: (block) => block,
});
```

### `context.paste.registerPatternHandler(handler)`

Handle specific paste patterns (e.g. cURL, URLs).

```typescript
context.paste.registerPatternHandler({
  canHandle: (text) => text.startsWith("curl "),
  handle: (text, html, view) => {
    // Parse and insert
    return true;
  },
});
```

### `context.paste.registerBlockExtension(extension)`

Extend a block type owned by another plugin.

```typescript
context.paste.registerBlockExtension({
  blockType: "request",
  extendBlock: (block, context) => block,
});
```

---

## Tab Management

### `openVoidenTab(title, content, options?)`

Open a new Voiden editor tab with JSON document content.

```typescript
await context.openVoidenTab("Preview", documentJSON, { readOnly: true });
```

### `registerLinkableNodeTypes(nodeTypes)`

Register node types that can be linked/referenced across files.

```typescript
context.registerLinkableNodeTypes(["my-block", "my-output"]);
```

### `registerNodeDisplayNames(displayNames)`

Register human-readable display names for node types shown in the UI.

```typescript
context.registerNodeDisplayNames({
  "my-block": "My Widget",
  "my-output": "Widget Output",
});
```

### `registerTableSuggestions(tableType, suggestions)`

Register autocomplete suggestions for table cell blocks. Maps column indices to suggestion items.

```typescript
context.registerTableSuggestions("headers-table", {
  0: [
    { label: "Content-Type", description: "Media type of the request body" },
    { label: "Authorization", description: "Auth credentials" },
    { label: "Accept", description: "Acceptable response media types" },
  ],
  1: [
    { label: "application/json" },
    { label: "text/plain" },
  ],
});
```

---

## Help Commands

### `registerHelpCommand(cmd)`

Register a command in the Voiden help panel.

```typescript
context.registerHelpCommand({
  id: "my-plugin.help",
  label: "My Plugin: How to use",
  description: "Learn how to use My Plugin",
  component: MyHelpContent,
});
```

---

## UI Utilities

### `context.ui`

```typescript
// Panel controls
context.ui.openRightPanel();
context.ui.closeRightPanel();
context.ui.toggleRightPanel();
context.ui.openBottomPanel();
context.ui.closeBottomPanel();

// Open a specific sidebar tab
context.ui.openRightSidebarTab("my-sidebar");

// Show a toast notification
context.ui.showToast("Saved!", "success");  // 'info' | 'success' | 'warning' | 'error'

// Prose styling classes that follow the active theme
const classes = context.ui.getProseClasses();
```

### `context.ui.components`

Shared UI components for use inside your React components:

| Component | Description |
|---|---|
| `CodeEditor` | CodeMirror-based code editor |
| `Table`, `TableBody`, `TableRow`, `TableCell` | Styled table primitives |
| `NodeViewWrapper` | TipTap node view wrapper |
| `RequestBlockHeader` | Request block header with link/unlink support |

```tsx
<context.ui.components.CodeEditor
  lang="json"
  value='{"key": "value"}'
  onChange={(v) => console.log(v)}
  readOnly={false}
/>
```

---

## Full PluginContext Type Reference

```typescript
interface PluginContext {
  // Slash commands
  addVoidenSlashCommand(command: SlashCommandDefinition): void;
  addVoidenSlashGroup(group: SlashCommandGroup): void;
  getVoidenSlashGroups(): SlashCommandGroup[];

  // Editor extensions
  registerVoidenExtension(extension: any): void;
  unregisterVoidenExtension(name: string): void;
  registerCodemirrorExtension(extension: any): void;
  unregisterCodemirrorExtension(extension: any): void;

  // UI registration
  registerSidebarTab(side: 'left' | 'right', tab: TabDefinition): void;
  registerPanel(panelId: string, panel: TabDefinition): void;
  addTab(tabId: string, tab: Panel): void;
  registerEditorAction(action: EditorAction): void;
  registerStatusBarItem(item: StatusBarItem): void;
  registerTopBarItem(item: PluginTopBarItem): void;
  registerHelpCommand(cmd: PluginHelpCommand): void;

  // Command palette (requires "commandPalette" permission)
  registerCommand(cmd: PluginCommand): void;

  // Context menus (requires "contextMenus" permission)
  registerContextMenu(item: PluginContextMenuItem): void;

  // Events (requires "events" permission)
  events: {
    on(event: string, callback: (data: any) => void): () => void;
  };

  // File system (requires "filesystem" permission)
  fs: {
    read(path: string): Promise<string>;
    write(path: string, content: string): Promise<void>;
    create(path: string, content?: string): Promise<void>;
    createDirectory(path: string): Promise<void>;
    delete(path: string): Promise<void>;
    move(fromPath: string, toPath: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    list(path?: string): Promise<Array<{ name: string; path: string; type: 'file' | 'directory' }>>;
  };

  // Settings (requires "settings" permission)
  settings: {
    get<T = any>(key: string): Promise<T | undefined>;
    set<T = any>(key: string, value: T): Promise<void>;
    delete(key: string): Promise<void>;
    onChange(callback: (key: string, value: any) => void): () => void;
  };

  // Theme tokens
  theme: ThemeClasses;

  // Project & file access
  project: {
    getActiveEditor(type: 'code' | 'voiden'): any;
    getActiveProject(): Promise<string>;
    getVoidFiles(): Promise<DocumentTab[]>;
    createFile(filePath: string, content: string): Promise<void>;
    createFolder(folderPath: string): Promise<void>;
    openFile(relativePath: string): Promise<void>;
    importCurl(title: string, curlString: string): Promise<void>;
  };

  // Helpers
  exposeHelpers(helpers: Record<string, (...args: any[]) => any>): void;
  helpers: {
    parseVoid(markdown?: string): any;
    from<T>(pluginId: string): T | undefined;
  };

  // Request pipeline
  onBuildRequest(handler: (request: any, editor: Editor) => any): void;
  onProcessResponse(handler: (response: any) => void): void;
  registerResponseSection(section: ResponseSection): void;

  // Paste handling
  paste: {
    registerBlockOwner(handler: BlockPasteHandler): void;
    registerBlockExtension(extension: BlockExtension): void;
    registerPatternHandler(handler: PatternHandler): void;
  };

  // Tab & node management
  openVoidenTab(title: string, content: any, options?: { readOnly?: boolean }): Promise<void>;
  registerLinkableNodeTypes(nodeTypes: string[]): void;
  registerNodeDisplayNames(displayNames: Record<string, string>): void;
  registerTableSuggestions(tableType: string, suggestions: TableSuggestionsConfig): void;

  // UI utilities
  ui: {
    getProseClasses(): string;
    openRightPanel(): void;
    closeRightPanel(): void;
    toggleRightPanel(): void;
    openBottomPanel(): void;
    closeBottomPanel(): void;
    openRightSidebarTab(tabId: string): void;
    showToast(message: string, type?: 'info' | 'success' | 'warning' | 'error'): void;
    registerTopBarItem(item: PluginTopBarItem): void;
    registerSettings(section: PluginSettingsSection): void;
    components: UIComponents;
    hooks: { useSendRestRequest(editor: any): { refetch(): void; isLoading: boolean; error: any; data: any; cancelRequest(): void } };
  };
}
```
