---
id: type-generator
title: "Type Generator"
sidebar_label: "Type Generator"
description: "Generate strongly-typed models from API responses. Supports TypeScript, Dart, Go, Kotlin, Swift, and Java via quicktype — live preview with copy to clipboard."
custom_edit_url: "https://github.com/parvbajaj1/voiden-type-generator"
---

:::info Plugin Info
**Author:** Parv Bajaj &nbsp;|&nbsp; **Version:** 1.0.2 &nbsp;|&nbsp; **Repository:** [parvbajaj1/voiden-type-generator](https://github.com/parvbajaj1/voiden-type-generator)
:::


Generate strongly-typed model code from your API responses, without leaving Voiden.

Built on [quicktype](https://github.com/quicktype/quicktype). Supports TypeScript, Dart, Go, Kotlin, Swift, and Java.

---

## Features

- **Automatic capture** — hooks into the request pipeline so the latest response is always ready, no manual copy-paste
- **6 languages** — TypeScript · Dart · Go · Kotlin · Swift · Java
- **Live generation** — types regenerate as you adjust options or edit the JSON
- **Per-language options** — null safety, readonly, serialization frameworks, package names, and more
- **Persistent preferences** — remembers your last language, class name, and options
- **Tab-aware** — switching between `.void` files instantly loads the correct response
- **Edit JSON panel** — manually paste or edit the JSON if needed

---

## Installation

1. Download the latest `.zip` from [Releases](https://github.com/parvbajaj1/voiden-type-generator/releases)
2. In Voiden: **Extensions → ⋯ → Install from file** → select the `.zip`
3. The **Types** tab appears in the right sidebar

---

## Usage

1. Run any HTTP request that returns JSON
2. Open the **Types** tab in the right sidebar
3. Select your target language and set a class name
4. Click **Options** to configure language-specific settings
5. Generated code appears instantly — click the copy button to grab it

---

## Language Options

| Language | Options |
|---|---|
| **TypeScript** | Readonly fields, Types-only (no runtime code), Prefer unions |
| **Dart** | Null safety, copyWith method, Freezed support |
| **Go** | Package name |
| **Kotlin** | @Serializable (kotlinx), Package name |
| **Swift** | Structs (vs classes), Explicit casts |
| **Java** | Getters/setters, Package name |

---

## Development

### Prerequisites

- Node.js 18+
- A local checkout of the Voiden app (for the `@voiden/sdk` type definitions)

### Setup

```bash
npm install
```

### Build

```bash
npm run build   # compiles src/ → dist/main.js
npm run zip     # packages dist/main.js + manifest.json → dist/type-generator.zip
```

### Project structure

```
src/
  plugin.ts              # SDK entry point — pipeline hooks, sidebar registration
  ui/
    GenerateTab.tsx      # Sidebar UI component
  generator/
    quicktypeRunner.ts   # quicktype invocation wrapper
    languageConfig.ts    # Per-language renderer options
  types/
    pluginTypes.ts       # Shared TypeScript types
build.mjs                # Vite build script with Voiden shim plugin
zip.mjs                  # Packages dist/ into an installable .zip
manifest.json            # Plugin metadata and permissions
```

### How it works

The plugin registers two pipeline hooks:

- **PreProcessing** — captures the request URL, method, and the active tab ID before the request is sent
- **PostProcessing** — captures the response body and stores it keyed by tab ID

When the sidebar tab is open, it subscribes to incoming responses and to `tab:changed` events. On a tab switch it immediately loads (or clears) the stored response for that tab, then passes the JSON through quicktype to produce typed output.

---

## Permissions

| Permission | Why |
|---|---|
| `events` | Listens to `tab:changed` to track which `.void` file is active |
| `requestPipeline` | Hooks into PreProcessing + PostProcessing to capture request/response data |
| `sidebar` | Registers the "Types" tab in the right sidebar |

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss the approach.

1. Fork the repo
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes
4. Open a pull request

---

## License

MIT — see [LICENSE](https://github.com/parvbajaj1/voiden-type-generator/blob/master/LICENSE)

