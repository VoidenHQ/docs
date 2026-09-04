---
  id: bruno-imports
  title: Bruno Imports
  sidebar_label: Bruno Imports
  sidebar_position: 5
---

# Import from Bruno

:::info Core Plugin
This feature is powered by the [Bruno Collection Importer](/docs/plugins/core-plugins/bruno-collection-importer) — a core plugin that comes bundled with Voiden, so there's nothing extra to install.
:::

Already living in [Bruno](https://www.usebruno.com)? No problem — bring your whole collection over to Voiden in a couple of clicks. No rebuilding from scratch, no copy-pasting requests one by one.

Voiden reads Bruno 3.0+'s whole-collection **OpenCollection** YAML export, and turns everything — requests, folders, environments, auth, even scripts — into ready-to-use `.void` files.

---

## What You'll Need

Either of the following, exported straight from Bruno:

- A full OpenCollection YAML export
- A Bruno environment file

> **Note:** A standalone classic `.bru` request file can't be imported on its own — export the full collection instead.

---

## How to Import

1. **Open the file** — your OpenCollection export or an environment file
2. **Find the "Import into Voiden" button** — it's sitting right there in the file's tab toolbar
3. **Click it** — Voiden rebuilds your folder structure exactly as it was, or converts the single request if you opened one from a directory-based export

![bruno-collection](/img/plugins/bruno-import/bruno-import.gif)

4. **You're done** — every request becomes its own `.void` file, with endpoints, params, auth, and scripts all in place

---

## Import Your Environments Too

Got environments set up in Bruno? You don't have to redo them.

1. Open your Bruno environment file (`environments/<name>.bru`) in Voiden
2. Click **Import into Voiden**
3. That's it — your environment is merged right into your existing Voiden environments, nothing gets overwritten

---

## What Gets Converted

- All HTTP endpoints, plus GraphQL, gRPC, and WebSocket requests
- Headers and authentication — Basic, Bearer, API Key, Digest, AWS Signature v4, NTLM, OAuth1, and OAuth2
- Query params, path variables, and `:param` URL segments
- Request bodies of every flavor — JSON, XML, plain text, form URL-encoded, multipart, raw files, GraphQL, and gRPC/WebSocket payloads
- `assert{}` blocks, turned into live assertion tables
- Pre-request and post-response scripts — brought in as live blocks when it's safe to, or commented out for you to review otherwise

---

## Ready to Go

One import, everything set up. Your Bruno collection becomes a clean, ready-to-use API foundation in Voiden — no manual rework, no room for mistakes.
