---
  id: headers-block
  title: Headers Block
  sidebar_label: Headers Block
  sidebar_position: 4
---

# Headers Block

Headers are the unsung heroes of every HTTP request — quietly carrying your tokens, credentials, and content types through the network jungle.  

In **Voiden**, the **Headers Block** lets you define, organize, and toggle these headers just the way you want — cleanly, visually, and without the clutter of endless text fields.

Each header is a simple **key-value pair**, and you can add as many as you need.  Use it for authentication, custom metadata, or any other HTTP header your API expects.  
You can also enable, disable, or comment out headers directly — no need to delete and rewrite them.

---

###  Try it Out

1. In your Voiden file, type `/headers` and press **Enter** to create a **Headers Block**.  

![Headers Block Slash Command](/img/voiden-blocks/headers-block-pre.png)

2. Add your header **key-value pairs** — for example:  

```
Authorization: Bearer some-bearer-token
hello: world
```

3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),  
**or** click the **green  Play button** in the toolbar.  
4. Check the **Response Panel** — you’ll see your headers echoed back to you, confirming they’re being sent as expected.

---

![Headers Block Response](/img/voiden-blocks/headers-block-post.png)

>  **Pro Tip:** Want to temporarily disable a header without deleting it?  
> Use **Cmd + /** (Mac) or **Ctrl + /** (Windows/Linux) to comment it out.  
> It’ll stay visible but won’t be sent with the request — perfect for quick testing.

---

Headers Blocks make your requests expressive and flexible — no hidden forms, no pop-ups.  
Just visible, editable headers right where they belong: next to your request.