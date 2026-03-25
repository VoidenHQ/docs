---
  id: the-basics
  title: Voiden Basics
  sidebar_label: Voiden Basics
  sidebar_position: 1
---

# The Basics

Before you start conjuring API magic, let’s cover a few Voiden fundamentals — the kind that make everything click.

---

## The Voiden Editor

Voiden ships with its own custom editor, built on top of **Tiptap** (a rich-text editor that’s secretly Markdown in a nice outfit).  
This isn’t just a text box — it’s your playground for building, linking, and commenting on API blocks like a pro.

![editor](/img/geetingstarted/voiden-editor.png)

You can write, format, insert blocks, comment on JSON, add notes, and still keep everything cleanly stored as Markdown underneath.  
Because plain text is forever.

---

## Files and Structure

Everything in Voiden is, at its core, a **Markdown file**.  
We just use the `.void` extension — not because we’re fancy, but because it makes it easier for Voiden to process your files, track blocks, and work its behind-the-scenes magic.

<img src="/img/geetingstarted/file.png" alt="structure" width="500" style={{borderRadius: "12px"}} />

Think of `.void` files as Markdown with superpowers.  They’re still readable, editable, and totally version-controllable.  

---

## Git-Friendly by Design

No databases. No proprietary formats. No “export to Markdown” button.  
Your Voiden projects are **pure Markdown**, ready to commit, diff, merge, and roll back — just like any source code.

Want to know how Voiden works with Git? Check out the [**Git Integration documentation.**](/docs/git-integration/overview.md) 

![git-gui](/img/geetingstarted/git-gui.png)

- Want to see what changed? Run `git diff`.  
- Need to resolve a conflict? Open it in your favorite editor.  
- Want to brag about a perfect merge? Go ahead, you’ve earned it.

Voiden keeps your workflow transparent, flexible, and 100% yours.

---

## Voiden Terminal

Voiden comes with a **built-in terminal** — so you never have to leave the app to run a command. Whether you need to run a script, check a git status, or do anything else you would normally do in a terminal, you can do it right inside Voiden.

It’s lightweight, fast, and designed to fit naturally into your workflow — no switching windows, no context loss.

![Voiden Terminal](/img/geetingstarted/terminal.png)

:::tip
Voiden also has a **CLI** — so you can open projects, files, and directories straight from your terminal. Check out the **[Voiden CLI docs](/docs/developer-tools/voiden-cli.md)** to see what’s possible.
:::



---

## Response Panel

Every request you send has a dedicated place to show its results. The **Response Panel** is a right-side panel that displays everything about your request and response — status code, headers, body, timing, and more — all in one clean view.

![response](/img/geetingstarted/response-panel.png)

It updates the moment a response comes back, so you always have the latest data right in front of you without any extra steps.

---

### Flexible Layout

The Response Panel isn't locked to the right side. You can move it to the **bottom** of the editor if that works better for your screen setup — or keep it docked alongside the built-in terminal so both panels sit together in one place.

![response-panel](/img/geetingstarted/response-flexible.gif)

It's designed to adapt to how you work, not the other way around.

---
### Extendable with Tabs

The Response Panel doesn't stop at just the response. It comes with built-in tabs like **Script Logs** and **History** out of the box — and can be extended further through plugins. Install a plugin and new tabs appear automatically, giving you more context right where you need it, without cluttering the main editor.

![script-history](/img/geetingstarted/extendable.gif)

---

### Ready to get started?

 [**Install Voiden**](./installation.md)
 to set up Voiden on your system and start building.

