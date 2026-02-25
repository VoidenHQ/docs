---
id: voiden-editor
title: The Voiden Editor
sidebar_label: Voiden Editor
---

# The Voiden Editor

Voiden ships with its own custom editor, built on top of **Tiptap**. It looks like a rich-text editor, but everything is saved as clean **Markdown** underneath — file-based, Git-friendly, and readable outside Voiden.

![Voiden Editor](/img/geetingstarted/voideneditor.png)

---

## Block-Based Editing

The editor is structured around **blocks**. Instead of one long file, you insert purpose-specific blocks:

- Request blocks
- Variable blocks
- Assertion blocks
- Script blocks
- Markdown blocks

Each block has a clear role, making files easy to scan even as they grow.

---

## Write and Document Together

Requests, explanations, response comments, and usage notes all live in the same file — right next to each other.

No context switching. No separate tools.

---

## Keyboard-Friendly

Insert blocks with slash commands (e.g. `/endpoint`, `/headers`, `/json`), reorder them quickly, and run requests without leaving the editor.
