---
id: create-plugin-overview
title: "@voiden/create-plugin"
sidebar_label: Overview
sidebar_position: 1
---

`@voiden/create-plugin` is the official CLI scaffolder for Voiden community plugins. Run one command and get a fully wired TypeScript project — Vite build config, manifest, zip packager, and typed entry point — ready to build and install in Voiden in under a minute.

```bash
npm create @voiden/plugin my-plugin
```

---

## What it generates

The scaffold creates a complete project structure so you can focus on writing your plugin, not configuring build tools:

```
my-plugin/
├── src/
│   ├── plugin.ts          ← your plugin entry point (start here)
│   ├── main-process.ts    ← Electron IPC handlers (only if selected)
│   └── skill.md           ← AI skill description
├── manifest.json          ← plugin identity, permissions, capabilities
├── changelog.json         ← release history
├── package.json
├── tsconfig.json
├── build.mjs              ← Vite build (renderer bundle)
├── build-main.mjs         ← esbuild build (main-process bundle)
├── zip.mjs                ← packages dist/ into an installable .zip
├── generate-manifest.mjs  ← validates manifest before release
└── .github/
    └── workflows/
        └── release.yml    ← GitHub Actions: build & publish on git tag
```

If you select **Runner** support during setup, two extra files are added for [`@voiden/runner`](../voiden-runner/overview.md) CLI compatibility:

```
├── build-runner.mjs
└── src/
    └── runner.ts
```

---

## CLI prompts

During scaffold, you are asked a series of questions:

### Identity

| Prompt | What to enter |
|---|---|
| Plugin display name | Human-readable name shown in the Extensions browser (e.g. `My HTTP Formatter`) |
| Plugin ID | Kebab-case unique identifier, auto-derived from the display name (e.g. `my-http-formatter`) |
| Description | One-line description shown in the Extensions browser |
| Author | Your name or team name |
| Icon | Lucide icon name, local image path, or `https://` URL — see [Icon System](#icon-system) |
| Initial version | SemVer starting version. Default: `1.0.0` |
| Minimum Voiden version | Default: `>=2.0.0` |
| Load priority | Integer. Use `30+` for community plugins. Lower = loads earlier |

### Optional extras

| Option | What it adds |
|---|---|
| Runner | `src/runner.ts` and `build-runner.mjs` for headless `@voiden/runner` CLI support |
| Main process | `src/main-process.ts` with Electron IPC stubs for native OS access |

### Permissions

| Permission | APIs it unlocks |
|---|---|
| File System | `context.fs.read/write/create/delete/list/exists` |
| Settings | `context.settings.get/set/delete/onChange` + `context.ui.registerSettings` |
| Events | `context.events.on(...)` for workspace lifecycle events |
| Command Palette | `context.registerCommand(...)` |
| Context Menus | `context.registerContextMenu(...)` |

:::info
Permissions gate specific `context.*` APIs. The host enforces them at call time — missing a required permission throws a `PluginPermissionError` and shows an amber badge in the Extensions browser.
:::

---

## Icon system

Set the `icon` field in `manifest.json` to one of these formats:

| Format | Example | How it works |
|---|---|---|
| Lucide name (recommended) | `"Plug"`, `"Globe"`, `"Zap"` | Voiden resolves the PascalCase name to a `lucide-react` icon at render time — no hosting needed |
| Local file | `"src/icon.png"` | `zip.mjs` embeds it as a base64 data URL inside the zip's `manifest.json` |
| URL | `"https://cdn.example.com/icon.png"` | Rendered as `<img src={...}>` |

If `icon` is omitted or unrecognised, Voiden shows a generic community plugin icon as fallback.

---

## In this section

- [Installation](./installation.md) — scaffold your first plugin
- [Start Building](./start-building.md) — edit your plugin and link to the full Plugin API
- [Test Locally](./test-locally.md) — build, zip, and install in Voiden
- [Release to GitHub](./release.md) — tag a release and let CI do the rest
- [Submit to Voiden](./submit-to-voiden.md) — open a PR to list your plugin in the Extensions browser
