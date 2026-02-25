---
  id: post-script
  title: Post Script
  sidebar_label: Post Script Blocks
---

#  <div style={{display:"flex",alignItems:"center"}}> Post Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Post Script** block lets you run custom logic **after a response is received**.

It executes locally inside Voiden in an isolated environment. Use it to validate responses, extract values, store runtime variables, or write logs.

Voiden supports **JavaScript** and **Python**.

For a full reference of what you can do inside a script, see the [Voiden Script Plugin](/docs/plugins/core-plugins/pre-post%20script/overview).

---

## How to Insert

1. In your Voiden file, type `/post_script` and press **Enter**.

    ![post-script](/img/voiden-blocks/post-scripts.png)

2. Add your script logic inside the block.

    ![post-done](/img/voiden-blocks/post-done.png)

3. Run the request with **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux).

    ![post-script-done](/img/voiden-blocks/post-script-done.png)

4. View response and assertions in the **Response panel** and logs in the **Script Logs**.
