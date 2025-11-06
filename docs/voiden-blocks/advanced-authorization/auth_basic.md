---
  id: basic-auth-block
  title: Basic Auth Block
  sidebar_label: Basic Auth Block
  sidebar_position: 1
---

# Basic Auth Block

Basic Auth is a simple authentication scheme where the client sends username and password directly in the api request. The credentials are encoded (but not encrypted) using Base64 encoding.

### ▶️ Try it Out

1. In your Voiden file, type `/auth-basic` and press **Enter** to create a **Basic Auth Block**.  

![Authorization Block Slash Command](/img/voiden-blocks/authorization/basic-auth.png)

2. Populate the **username** and **password** cell   

![Authorization Block Response](/img/voiden-blocks/authorization/basic-auth-param.png)

> 🎩 **Pro Tip:** Want to temporarily disable a header without deleting it?  
> Use **Cmd + /** (Mac) or **Ctrl + /** (Windows/Linux) to comment it out.  
> It’ll stay visible but won’t be sent with the request — perfect for quick testing.

---

# 🪪 Request Parameters
| Parameter | Value | Description |
|--- | ---| --- |
| username | string | User identifier for authentication |
| password | string | User password for authentication |