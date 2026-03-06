---
  id: manifest-reference
  title: Manifest Reference
  sidebar_label: Manifest Reference
  sidebar_position: 4
---

# Manifest Reference <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

Every Voiden plugin requires a `manifest.json` file. This file tells Voiden about your plugin — its identity, capabilities, and dependencies. It's how the extension system discovers and manages your plugin.

---

## Required Fields

These fields must be present in every manifest:

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for your plugin. Use lowercase with hyphens (e.g., `my-plugin`). |
| `name` | `string` | Human-readable display name. |
| `description` | `string` | Short description of what the plugin does. |
| `version` | `string` | Semantic version string (e.g., `1.0.0`). |
| `author` | `string` | Author name or organization. |
| `enabled` | `boolean` | Whether the plugin is enabled by default. Usually `true`. |
| `readme` | `string` | Longer documentation text shown in the extension manager. |

### Minimal Example

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "description": "A simple Voiden plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "enabled": true,
  "readme": "This plugin adds useful features to Voiden."
}
```

---

## Optional Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `type` | `"core" \| "community"` | — | Plugin type. Use `"community"` for your plugins. |
| `priority` | `number` | `999` | Load order. Lower numbers load first. Use a higher number (e.g., `50`) unless other plugins depend on yours. |
| `repo` | `string` | — | Repository URL (GitHub). Used for installation and updates. |
| `capabilities` | `object` | — | Declares what your plugin provides (blocks, commands, etc.). |
| `dependencies` | `object` | — | Version constraints for core and SDK compatibility. |
| `features` | `string[]` | — | List of features provided, shown in the extension manager. |

---

## Priority

Priority determines the order in which plugins load. Lower numbers load first.

| Range | Intended Use |
|---|---|
| `1–10` | Foundational plugins that others depend on |
| `11–20` | Core feature plugins |
| `21–30` | Enhancement plugins |
| `31–50` | Utility and integration plugins |
| `50+` | Import tools, cosmetic plugins |

If your plugin depends on another plugin's helpers (via `ctx.helpers.from()`), make sure your priority is higher (loads later) than the plugin you depend on.

**Example:** `voiden-graphql` (priority 15) depends on `voiden-rest-api` (priority 10), so REST loads first.

---

## Capabilities

The `capabilities` object declares what features your plugin provides. This is primarily for documentation and the extension manager UI — Voiden doesn't enforce these declarations at runtime.

### blocks

Declares custom editor block types your plugin owns.

```json
{
  "capabilities": {
    "blocks": {
      "owns": ["my-block", "my-output"],
      "allowExtensions": true,
      "description": "Custom widget blocks"
    }
  }
}
```

| Field | Type | Description |
|---|---|---|
| `owns` | `string[]` | Block type names this plugin owns |
| `allowExtensions` | `boolean` | Whether other plugins can extend these blocks |
| `description` | `string` | Description of the block capability |

### slashCommands

Declares slash commands the plugin registers.

```json
{
  "capabilities": {
    "slashCommands": {
      "groups": [
        {
          "name": "My Commands",
          "commands": ["Insert widget", "Insert output"]
        }
      ]
    }
  }
}
```

### requestPipeline

Declares pipeline hooks the plugin registers.

```json
{
  "capabilities": {
    "requestPipeline": {
      "buildHandler": true,
      "responseHandler": true,
      "description": "Modifies requests and processes responses"
    }
  }
}
```

### editorActions

Declares editor toolbar actions.

```json
{
  "capabilities": {
    "editorActions": {
      "actions": [
        {
          "id": "my-action",
          "name": "Preview",
          "description": "Opens a preview panel",
          "icon": "Eye",
          "fileTypes": [".json", ".yaml"]
        }
      ]
    }
  }
}
```

### ui

Declares UI elements like sidebar buttons or panels.

```json
{
  "capabilities": {
    "ui": {
      "buttons": [
        {
          "id": "my-panel-btn",
          "location": "sidebar-left",
          "icon": "Globe",
          "tooltip": "Open My Panel"
        }
      ]
    }
  }
}
```

### paste

Declares paste handling capabilities.

```json
{
  "capabilities": {
    "paste": {
      "patterns": [
        {
          "name": "cURL",
          "pattern": "/^curl\\s+/i",
          "handles": "cURL command parsing"
        }
      ],
      "blockHandlers": ["my-block"]
    }
  }
}
```

### pipeline

Declares which pipeline stages the plugin hooks into.

```json
{
  "capabilities": {
    "pipeline": {
      "hooks": ["pre-send", "post-processing"]
    }
  }
}
```

### editor

Declares editor enhancements.

```json
{
  "capabilities": {
    "editor": {
      "autocomplete": true,
      "suggestions": true
    }
  }
}
```

---

## Dependencies

Declare version compatibility with Voiden core and the SDK:

```json
{
  "dependencies": {
    "core": "^1.0.0",
    "sdk": "^1.0.0"
  }
}
```

---

## Features

A list of human-readable feature descriptions shown in the extension manager:

```json
{
  "features": [
    "Custom widget block for data visualization",
    "Slash command for quick widget insertion",
    "Response panel integration",
    "Autocomplete support"
  ]
}
```

---

## Full Example

Here's a complete manifest combining all fields:

```json
{
  "id": "voiden-data-viz",
  "type": "community",
  "name": "Voiden Data Visualizer",
  "description": "Visualize API response data with interactive charts and tables",
  "version": "1.0.0",
  "author": "Your Name",
  "enabled": true,
  "priority": 30,
  "readme": "Data Visualizer adds interactive charts and table views to your API responses. Insert a visualization block with /chart, then send a request to see your data come alive.",
  "repo": "https://github.com/yourname/voiden-data-viz",

  "capabilities": {
    "blocks": {
      "owns": ["chart-block", "data-table"],
      "allowExtensions": true,
      "description": "Chart and table visualization blocks"
    },
    "slashCommands": {
      "groups": [
        {
          "name": "Data Visualization",
          "commands": ["Insert chart", "Insert data table"]
        }
      ]
    },
    "requestPipeline": {
      "responseHandler": true,
      "description": "Processes response data for visualization"
    }
  },

  "dependencies": {
    "core": "^1.0.0",
    "sdk": "^1.0.0"
  },

  "features": [
    "Interactive chart visualization for JSON responses",
    "Tabular data view with sorting and filtering",
    "Auto-detect chartable data in responses",
    "Multiple chart types: bar, line, pie, scatter"
  ]
}
```
