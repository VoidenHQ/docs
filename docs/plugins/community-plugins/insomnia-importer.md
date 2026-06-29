---
id: insomnia-importer
title: "Insomnia Collection Importer"
sidebar_label: "Insomnia Collection Importer"
description: "Import Insomnia v4 (.json) and v5 (.yaml/.json) collection exports into Voiden — preserves folder structure, headers, query params, request bodies, and authentication."
custom_edit_url: "https://github.com/phurpa-tsering/insomnia-importer"
---

:::info Plugin Info
**Author:** Phurpa Tsering &nbsp;|&nbsp; **Version:** 1.1.0 &nbsp;|&nbsp; **Repository:** [phurpa-tsering/insomnia-importer](https://github.com/phurpa-tsering/insomnia-importer)
:::


A [Voiden](https://voiden.md) plugin that imports **Insomnia v4 (`.json`) and v5 (`.yaml`/`.yml`/`.json`) collection exports** directly into your Voiden workspace. It mirrors the same experience as the OpenAPI importer but targets the Insomnia export format, converting every request and folder into native Voiden `.void` files.

## What it does

- Reads an Insomnia v4 (JSON) or v5 (YAML/JSON) export and rebuilds the full folder hierarchy inside your active Voiden project
- Converts each request into a `.void` file with the correct block types — `json_body`, `xml_body`, `yml_body`, `restFile`, `multipart-table`, `url-table`, `headers-table`, `query-table`, and `path-table`
- Merges authentication (Basic, Bearer, API Key, OAuth2) into request headers automatically
- Sanitizes folder and file names for filesystem compatibility
- Shows a live progress indicator and reports any per-request errors without halting the whole import

## Supported body types

| Insomnia body | Voiden block |
|---------------|-------------|
| `application/json` | `json_body` |
| `application/xml` / `text/xml` | `xml_body` |
| `application/yaml` / `application/x-yaml` | `yml_body` |
| `application/octet-stream` / binary | `restFile` |
| `multipart/form-data` | `multipart-table` |
| `application/x-www-form-urlencoded` | skipped (not supported) |
| `application/graphql` | skipped (not supported) |

## Requirements

- Voiden `>=2.0.0`
- `voiden-rest-api` extension (must be loaded before this plugin)

## Usage

1. Export your collection from Insomnia: **Application → Export Data → Current Workspace** — pick **Insomnia v4 JSON** (older Insomnia) or **Insomnia v5 YAML/JSON** (newer Insomnia).
2. In Voiden, drop the exported file in the active working project and open it.
3. At the top right corner , you will see `Import into voiden`. 
4. The plugin creates a folder matching the workspace name and populates it with `.void` files

## Building

```bash
npm install
npm run build   # builds the plugin bundle
npm run release # build + generate manifest
```

## Author

[Phurpa Tsering](https://www.linkedin.com/in/phurpa-tsering-0767b1148)

