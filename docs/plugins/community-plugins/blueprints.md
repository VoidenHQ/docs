---
id: blueprints
title: "Blueprints"
sidebar_label: "Blueprints"
description: "Save and reuse common API request structures as blueprints. Insert them anywhere with a slash command."
custom_edit_url: "https://github.com/parvbajaj1/voiden-blueprints"
---

:::info Plugin Info
**Author:** Parv Bajaj &nbsp;|&nbsp; **Version:** 1.0.9 &nbsp;|&nbsp; **Repository:** [parvbajaj1/voiden-blueprints](https://github.com/parvbajaj1/voiden-blueprints)
:::


A [Voiden](https://voiden.md) community plugin that lets you save reusable API request structures as `.void` files and insert them anywhere with a slash command.

## Features

- **Slash commands** — type `/bp-<name>` to instantly insert a blueprint into any page
- **Native `.void` files** — blueprints are regular `.void` files, no custom format or lock-in
- **Shared or local** — shared blueprints live in `.blueprints/` (committed to Git), local ones in `.voiden/blueprints/` (gitignored)
- **Conflict detection** — blueprints that contain a block already present in the current section are automatically disabled in the slash menu
- **Always fresh** — content is read from disk on every invocation, no manual refresh needed
- **Auto-reloads** — editing a blueprint file updates the slash menu within ~1.5 seconds
- **Enable / disable** — toggle individual blueprints without deleting them
- **Copy from file** — create a blueprint from any existing `.void` file in your project

## Installation

Download the latest `voiden-blueprints.zip` from [Releases](https://github.com/parvbajaj1/voiden-blueprints/blob/master/../../releases) and install it via the Voiden extensions manager.

## Usage

### Creating a blueprint

1. Click **Blueprints** in the status bar
2. Click **New Blueprint**
3. Enter a name (e.g. `get-user`) — the file saves as `blueprint-get-user.void` and the slash command becomes `/bp-get-user`
4. Choose **Shared** (committed to Git) or **Local** (your machine only)
5. Click **Create & Open**, then add your request structure to the file

### Inserting a blueprint

Open any `.void` file, type `/bp-` and select your blueprint from the slash menu.

### File locations

| Type | Path | Git |
|---|---|---|
| Shared | `.blueprints/blueprint-<name>.void` | Committed |
| Local | `.voiden/blueprints/blueprint-<name>.void` | Ignored |

### Naming

| What | Example |
|---|---|
| File on disk | `blueprint-get-user.void` |
| Slash command | `/bp-get-user` |
| Display name | Blueprint Get User |

## Development

```bash
npm install
npm run build
```

Requires Node 18+.

## License

MIT

