---
  id: basic-auth-block
  title: Basic Authorization Block
  sidebar_label: Basic Authorization Block
  sidebar_position: 1
---

# Basic Authorization Block

Basic Authorization is a simple authentication scheme where the client sends username and password directly in the api request. The credentials are encoded (but not encrypted) using Base64 encoding.

### ▶️ Try it Out

1. In your Voiden file, type `/auth-basic` and press **Enter** to create a **Basic Authorization Block**.  

![Authorization Block Slash Command](/img/voiden-blocks/authorization/basic-auth.png)

2. Fill the required params for the block.

![Authorization Block Response](/img/voiden-blocks/authorization/basic-auth-param.png)

3. Hit **Cmd + Enter** (Mac) or **Ctrl + Enter**  (Windows/Linux) to run the request  
**or** click the **green ▶️ Play button** in the toolbar.

4. Check the **Response Panel** 

> 🎩 **Pro Tip:** Want to temporarily disable a header without deleting it?  
> Use **Cmd + /** (Mac) or **Ctrl + /** (Windows/Linux) to comment it out.  
> It’ll stay visible but won’t be sent with the request — perfect for quick testing.

---

###  🪪 Block Parameters
| Parameter | Value | Description |
| --- | --- | --- |
| username | string | User identifier for authentication |
| password | string | User password for authentication |