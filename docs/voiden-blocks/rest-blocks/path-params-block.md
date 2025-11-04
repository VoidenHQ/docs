---
  id: path-params-block
  title: Path Params Block
  sidebar_label: Path Params Block
  sidebar_position: 10
---

# 🛣️ Path Params Block

Some APIs embed parameters directly into the **URL** path itself — like `/users/{id}` or `/products/{category}/{item}`.  
The **Path Params Block** lets you define these dynamic segments as a clean key-value table in **Voiden**, so you can swap values without manually editing your endpoint URL.

Define your placeholders once in the endpoint, then fill in the values in the table.
Voiden automatically substitutes them into the URL at runtime, keeping your endpoint template reusable and your parameter values visible.

---

### ▶️ Try it Out
1. Type `/path-params` and press Enter to create a Path Params Block.

![Path Params Block Slash Command](/img/voiden-blocks/headers-block-pre.png)

2. Add the key-value pairs to the table.
3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),  
**or** click the **green ▶️ Play button** in the toolbar. 
4. Check the **Response Panel**. In the **Request Summary / Security** section you’ll see your path params applied to the endpoint URL, confirming they’re being sent as expected.
---

![Path Params Block Response](/img/voiden-blocks/headers-block-post.png)

> 🎩 **Pro Tip:** Want to temporarily disable a path param without deleting it?  
> Use **Cmd + /** (Mac) or **Ctrl + /** (Windows/Linux) to comment it out.  
> It’ll stay visible but won’t be sent with the request.

---

The Path Params Block makes dynamic URLs manageable.  
No string concatenation. No template confusion. Just variables and values, cleanly separated in a simple table.