---
  id: binary-file-block
  title: Binary File Block
  sidebar_label: Binary File Block
  sidebar_position: 11
---

# Binary File Block
When your API needs a raw file — no form wrapping, no multipart boundaries, just pure binary data — this is your block.  
The **Binary File Block** lets you send a single file directly as the request body, exactly the way some APIs expect it for uploads, imports, or processing.

Voiden handles the content-type detection and binary encoding automatically, so you can focus on what you're uploading, not how it's packaged.

---

###  Try it Out
1. Type `/file` to add a **Binary File Block**.

![voiden-binery](/img/voiden-blocks/binery-file.png)

2. Choose your file with the `@filename` syntax.
3. Press **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux) to fire it into the Matrix.

---

![voiden-blocks](/img/voiden-blocks/auth-binery.gif)
<!-- ![Binary File Block Response](/img/voiden-blocks/headers-block-post.png) -->

---

The Binary File Block strips away the complexity of file uploads.  
Just your file, delivered directly to the API that needs it.