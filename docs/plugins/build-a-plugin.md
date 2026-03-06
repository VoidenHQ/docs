---
  id: build-a-plugin
  title: Build a Plugin
  sidebar_label: Build a Plugin
---

# Build a Voiden Plugin <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

Ready to extend Voiden with your own features? The plugin system gives you access to slash commands, custom editor blocks, sidebar panels, request pipeline hooks, and much more.

Start here and follow the guides below to go from zero to a working plugin.

---

## Guides

| Guide | Description |
|---|---|
| **[Overview](/docs/plugins/building-plugins/overview)** | Understand the plugin architecture, what plugins can do, and what you'll need |
| **[Getting Started](/docs/plugins/building-plugins/getting-started)** | Build your first plugin step by step — from project setup to testing locally |
| **[Plugin API Reference](/docs/plugins/building-plugins/plugin-api)** | Full reference for every method on the `PluginContext` object |
| **[Manifest Reference](/docs/plugins/building-plugins/manifest-reference)** | Complete schema for the `manifest.json` file |

---

## Quick Start

If you just want to get going fast:

```bash
# 1. Create and initialize the project
mkdir my-voiden-plugin && cd my-voiden-plugin
npm init -y

# 2. Install dependencies
npm install @voiden/sdk
npm install --save-dev typescript esbuild @types/react

# 3. Create your plugin files (see Getting Started guide)

# 4. Build and package as a ZIP
npm run build
cd dist && zip -r ../my-voiden-plugin.zip manifest.json main.js && cd ..

# 5. Install in Voiden: Extension Browser → "Install from file" → select the ZIP
```

Head over to **[Getting Started](/docs/plugins/building-plugins/getting-started)** for the full walkthrough.
