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

When you enable AI Skill, Voiden generates a `skill.md` file inside your project's `.voiden` directory, right where your assistant can find it:

| Assistant | Skill file location |
|-----------|------------------------|
| **Claude** | `.claude/skills/voiden/skill.md` |
| **Codex** | `.codex/skills/voiden/skill.md` |

The file covers the full `.void` format: block types, structure rules, variable syntax, and the features from your enabled plugins. Your assistant picks it up automatically as context, so it can read your existing files and generate new ones correctly when required.

---

## Enabling AI Skill

Head to **Settings → AI Skill** and toggle on the assistant(s) you use:

<img src="/img/geetingstarted/ai-skill.png" alt="ai-skill" width="" />

- **Claude** — Generates a skill file for Claude.
- **Codex** — Generates a skill file for Codex-based assistants.

You can enable both at the same time. In this case, each will get their own file.

:::tip
Whenever you enable or disable a plugin, come back here and regenerate the skill file so your assistant stays in sync with your current setup.
:::

This toggle only ever writes the skill file above — it teaches your assistant the `.void` *format*, nothing more. It doesn't register any MCP server and doesn't touch `.mcp.json` or `~/.codex/config.toml`.

:::note
Earlier versions of Voiden also registered `@voiden/mcp-server` as a side effect of this toggle. That's no longer the case — registering the MCP server (so your assistant can actually *execute* `.void` requests, not just write them) is now a separate, explicit action. See **Enabling MCP Execution** below.
:::

---

## Enabling MCP Execution

Writing valid `.void` requests and *running* them for real are two different capabilities. This toggle covers the first. For the second — letting your assistant list, execute, and record `.void` requests via [`@voiden/mcp-server`](/docs/developer-tools/voiden-mcp-server/overview.md) — use the **Initialize MCP** button in the status bar instead, scoped to whichever project you currently have open:

| Assistant | Registered in |
|-----------|------------------------|
| **Claude** | `.mcp.json` in your project root |
| **Codex** | `[mcp_servers.voiden-mcp]` in `~/.codex/config.toml` |

Clicking it also installs a second skill file, separate from the authoring skill above, that teaches your assistant how to use those tools:

| Assistant | MCP skill file location |
|-----------|------------------------|
| **Claude** | `~/.claude/skills/voiden-mcp/SKILL.md` |
| **Codex** | `~/.codex/skills/voiden-mcp/SKILL.md` |

See [`@voiden/mcp-server`](/docs/developer-tools/voiden-mcp-server/overview.md)
for the full list of tools this gives your assistant — including any
[Tool blocks](/docs/core-features-section/voiden-blocks/tool.md) your project
declares.

:::note
Initializing MCP is per-project and doesn't repeat itself automatically — it only happens when you click the button. If you later change which project is open, click it again for that project.
:::

:::tip
`.mcp.json` contains an absolute path specific to your machine. Voiden adds it
to your project's `.gitignore` automatically the first time it's written, so
it never gets committed.
:::

---

## What the Skill File Includes

The skill file is built from two layers, so your assistant only learns what's actually relevant to your project:

### Core — Always Included

These fundamentals are always present, no matter what plugins you have enabled:

- **`.void` file format** — frontmatter fields, block structure, UUID rules, variable syntax
- **Environment variables** — `{{VARIABLE_NAME}}` syntax and `.env` file usage
- **File naming conventions** — kebab-case naming, folder structure by resource

### Plugins — Included When Enabled

Each plugin adds its own block types and syntax. Only what's enabled in your project gets included:

| Plugin | Blocks added to skill file |
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

Once the skill file is in place, your assistant knows exactly how Voiden works. Try asking things like:

- *"Create a POST request to `/api/users` with a JSON body and Bearer auth"*
- *"Add assertions to check the status is 200 and `body.id` exists"*
- *"Write a pre-script that reads `USER_ID` from variables and sets it as a header"*
- *"Generate a request body using faker for name, email, and UUID"*

It will produce valid `.void` blocks — correct format, correct block types, correct syntax — ready to drop straight into your file.

---

:::note
The `skill.md` file is auto-generated by Voiden. Don't edit it manually — any changes will be overwritten the next time it's regenerated.
:::

---

## Summary

AI Skill generates a `skill.md` file that teaches your AI assistant (Claude or Codex) the `.void` file format — covering core blocks, variable syntax, and whichever plugin features you have enabled. Enable it from **Settings → AI Skill**, and your assistant can generate valid `.void` blocks on request. Regenerate the file after changing plugins to keep it up to date. To let your assistant actually *execute* requests, use the status bar's **Initialize MCP** button instead — a separate, per-project action.
