---
id: voiden-editor
title: The Voiden Editor
sidebar_label: Voiden Editor
---

# The Voiden Editor

Voiden ships with its own custom editor, built on top of **Tiptap** — a modern rich-text editor that keeps everything stored as clean Markdown underneath.

It may look polished and interactive on the surface, but under the hood, it’s structured, file-based, and Git-friendly.

This isn’t just a text box.  
It’s your workspace for building, linking, testing, and documenting APIs — all in one place.

---

## What Makes the Voiden Editor Different?

Most API tools separate requests, documentation, comments, and tests into different tabs or panels.

Voiden does the opposite.

The editor keeps everything together:
- Request related blocks are added as a normal text `using /` command and part of plugins rather than core.
- REST, GraphQL, WebSocket, and gRPC blocks introduced by plugins
- Variables  
- Assertions  
- Pre & Post scripts  
- Markdown documentation  
- Notes and comments  

Everything lives inside one structured file.

---

## Block-Based Editing

The Voiden Editor works using **blocks**.

Instead of writing everything in one long file, you insert specific blocks for specific purposes:

- Request blocks  
- Variable blocks  
- Assertion blocks  
- Script blocks  
- Markdown blocks  

Each block has a clear role, which keeps your files readable — even when they grow large.

This structure makes it easy to understand what a file does at a glance.

---

## Markdown at the Core

Even though the editor feels like a rich-text environment, everything is saved as **Markdown**.

That means:

- Files are readable outside Voiden  
- They work naturally with Git  
- You can diff, merge, and review changes  
- There is no hidden database  
- No proprietary format  

You get visual editing — without losing transparency.

---

## Write and Document Together

One of the biggest advantages of the Voiden Editor is that you can:

- Write API requests  
- Add explanations right next to them  
- Comment on JSON responses  
- Add usage notes  
- Document edge cases  

Documentation lives beside the logic it explains.

No context switching. No separate tools.

---

## Keyboard-Friendly and Fast

The editor supports:

- Slash commands to insert blocks (e.g. `/rest`, `/gqlquery`, `/assertions`)  
- Quick formatting  
- Easy block reordering  
- Fast request execution  

It’s designed to stay out of your way.

---

## Why It Matters

The Voiden Editor treats API work like real development work:

- Everything is file-based  
- Everything is version-controlled  
- Everything is readable  
- Everything is portable  

You build.  
You test.  
You document.  
All in one structured place.

---

## In Simple Terms

The Voiden Editor is your API workbench.

You define endpoints, send requests, validate responses, and explain everything — while it quietly keeps everything clean, structured, and Markdown-based underneath.

Because plain text is forever.