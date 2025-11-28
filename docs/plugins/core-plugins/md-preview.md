---
  id: md-preview
  title: Markdown Preview
  sidebar_label: Markdown Preview
---

# Markdown Preview Plugin

**Markdown Preview** is a core Voiden plugin that provides live preview and full GitHub Flavored Markdown (GFM) rendering for `.md` and `.markdown` files. It allows users to seamlessly switch between editing and previewing Markdown content inside the Voiden editor.

---

## Capabilities

### **Editor Actions**

The plugin registers custom editor actions for Markdown files:

* **Preview Markdown Button**

  * **ID:** `md-preview-toggle`
  * **Name:** Preview Markdown
  * **Description:** Opens a read-only preview tab with GFM rendering.
  * **Icon:** `BookOpen`
  * **Supported File Types:** `.md`, `.markdown`

**Capability Description:** Adds a toggle button to the Voiden code editor toolbar for Markdown previewing.

---

## Features

### **Rendering & Preview**

* Live Markdown preview inside a Voiden tab
* Read-only preview mode to avoid accidental edits
* Preview panel can be shown or hidden via toggle

### **GitHub Flavored Markdown (GFM) Support**

* Tables with proper cell formatting
* Strikethrough text
* Task lists (`- [ ]` and `- [x]`)
* Blockquotes
* Proper line break and blank line preservation

### **Links & Media**

* Inline and reference-style links
* Inline and reference-style images

### **Syntax Support**

* Inline code and fenced code blocks
* Automatic syntax highlighting
* Ordered and unordered lists
* Automatic heading anchor IDs

### **Advanced Markdown Features**

* YAML frontmatter parsing
* Support for custom YAML blocks (Cube Blocks)
* Self-contained Markdown engine built on `unified/remark`

---

## Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0"
}
```

---

## Readme Summary

"Toggle between edit and preview modes for Markdown files. Supports GFM tables, strikethrough, task lists, and more."

---

If you'd like a **developer integration guide**, **architecture diagram**, or **JSON schema documentation**, let me know!
