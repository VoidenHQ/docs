---
id: ai-skill
title: AI Skill
sidebar_label: AI Skill
sidebar_position: 5
---

# AI Skill in Voiden

Your AI assistant is great at writing code but it doesn't know Voiden's `.void` format out of the box. This is why we have added an AI Skill that fixes that. Enable it once from your settings, and your AI assistant will know everything it needs to write, edit, and generate valid `.void` files together with you.

---

## How It Works

When you enable AI Skill, Voiden installs a skill in your home folder, where your assistant looks for skills:

| Assistant | Skill location |
|-----------|------------------------|
| **Claude** | `~/.claude/skills/voiden/` |
| **Codex** | `~/.codex/skills/voiden/` |

Each location holds a short `SKILL.md` and one guide per enabled plugin:

```
voiden/
├── SKILL.md                      ← the .void format, plus an index of the guides
└── extensions/
    ├── voiden-rest-api.md
    ├── voiden-advanced-auth.md
    └── ...one file per enabled plugin
```

`SKILL.md` covers what every `.void` file shares: structure rules, variable syntax, multi-request files, and environments. It starts with a short section telling the assistant which guide to read for which task, and each plugin's blocks are documented in that plugin's own guide. Your assistant reads `SKILL.md`, then opens the guides the task needs, so it can read your existing files and generate new ones correctly.

The skill is split this way from Voiden 2.3.2. Earlier versions wrote everything into one `SKILL.md`, which had grown large enough that some assistants only read the start of it.

If another tool has copied the Voiden skill into `~/.agents/skills/voiden/`, Voiden keeps that copy up to date as well. It doesn't create one there.

---

## Enabling AI Skill

Head to **Settings → AI Skill** and toggle on the assistant(s) you use:

<img src="/img/geetingstarted/ai-skill.png" alt="ai-skill" width="" />

- **Claude** — Installs the skill for Claude.
- **Codex** — Installs the skill for Codex-based assistants.

You can enable both at the same time. In this case, each gets its own copy.

:::tip
You don't need to regenerate the skill by hand. Voiden rebuilds it when the app starts, when you install, update, enable, or disable a plugin, and when you change this setting. Start a new assistant session afterwards so it loads the updated skill.
:::

This toggle only ever writes the skill files above — it teaches your assistant the `.void` *format*, nothing more. It doesn't register any MCP server and doesn't touch `.mcp.json` or `~/.codex/config.toml`.

:::note
Earlier versions of Voiden also registered `@voiden/mcp-server` as a side effect of this toggle. That's no longer the case — registering the MCP server (so your assistant can actually *execute* `.void` requests, not just write them) is now a separate, explicit action. See **Enabling MCP Execution** below.
:::

---

## Enabling MCP Execution

Writing valid `.void` requests and *running* them for real are two different capabilities. This toggle covers the first. For the second — letting your assistant list, execute, and record `.void` requests — use the **Initialize MCP** button in the status bar instead, scoped to whichever project you currently have open. See [Initialize MCP](/docs/mcp/initialize.md) for what it registers and what it gives your assistant.

Clicking it also refreshes the authoring skill from **How It Works** above —
but *not* a dedicated skill walking through how to use the MCP tools. Your
assistant picks that up from each tool's own description instead.

:::note
If you *also* have this page's toggle enabled for that assistant, the dedicated walkthrough skill is already installed too, from that toggle:

| Assistant | MCP walkthrough skill location |
|-----------|------------------------|
| **Claude** | `~/.claude/skills/voiden-mcp/SKILL.md` |
| **Codex** | `~/.codex/skills/voiden-mcp/SKILL.md` |
:::

:::tip
`.mcp.json` contains an absolute path specific to your machine. Voiden adds it
to your project's `.gitignore` automatically the first time it's written, so
it never gets committed.
:::

---

## What the Skill File Includes

The skill is built from two layers, so your assistant only learns what's actually relevant to your project:

### Core — Always Included

These fundamentals are in `SKILL.md`, no matter what plugins you have enabled:

- **`.void` file format** — frontmatter fields, block structure, UUID rules, variable syntax
- **Environment variables** — `{{VARIABLE_NAME}}` syntax and `.env` file usage
- **File naming conventions** — kebab-case naming, folder structure by resource

### Plugins — Included When Enabled

Each plugin adds its own guide under `extensions/`, covering its block types and syntax. Only enabled plugins get one:

| Plugin | Blocks covered by its guide |
|--------|---------------------------|
| **Voiden REST API** | `request`, `method`, `url`, `headers-table`, `query-table`, `path-table`, `json_body`, `xml_body`, `yml_body`, `text_body`, `multipart-table`, `url-table` |
| **Voiden GraphQL** | `gqlquery`, `gqlvariables` |
| **Simple Assertions** | `assertions-table` with all operators and field path syntax |
| **Advanced Authentication** | `auth` block with all auth types: `bearer`, `basic`, `apiKey`, `oauth2`, `oauth1`, `digest`, `awsSignature`, `ntlm`, `hawk`, `netrc` |
| **Voiden Scripting** | `pre_script`, `post_script`, full `vd` API reference |
| **Voiden Faker** | `{{$faker.*()}}` syntax with all available categories and methods |
| **Voiden MCP Client** | `mcp-connection`, `mcpoperation`, `mcp-response` |
| **Voiden Tool** | `tool`, `toolparams`, `toolverifies` |

---

## Example Usage

Once the skill is in place, your assistant knows exactly how Voiden works. Try asking things like:

- *"Create a POST request to `/api/users` with a JSON body and Bearer auth"*
- *"Add assertions to check the status is 200 and `body.id` exists"*
- *"Write a pre-script that reads `USER_ID` from variables and sets it as a header"*
- *"Generate a request body using faker for name, email, and UUID"*

It will produce valid `.void` blocks — correct format, correct block types, correct syntax — ready to drop straight into your file.

---

:::note
The skill files are auto-generated by Voiden. Don't edit them manually — any changes will be overwritten the next time the skill is rebuilt.
:::

---

## Summary

AI Skill installs a skill that teaches your AI assistant (Claude or Codex) the `.void` file format — covering core blocks, variable syntax, and whichever plugin features you have enabled. Enable it from **Settings → AI Skill**, and your assistant can generate valid `.void` blocks on request. Voiden rebuilds it automatically when your plugins change. To let your assistant actually *execute* requests, use the status bar's **Initialize MCP** button instead — a separate, per-project action.
