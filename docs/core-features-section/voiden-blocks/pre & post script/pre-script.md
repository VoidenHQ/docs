---
  id: pre-script
  title: Pre Script
  sidebar_label: Pre Script Blocks
---

#  <div style={{display:"flex",alignItems:"center"}}> Pre Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Pre Script** block lets you run custom logic **before a request is sent**.

It executes locally inside Voiden — not on the API endpoint — in an isolated environment. Use it to dynamically prepare the request: generate tokens, update headers, set variables, or add conditional logic.

Voiden supports **JavaScript** and **Python**.

For a full reference of what you can do inside a script, see the [Voiden Script Plugin](/docs/plugins/core-plugins/pre-post%20script/overview).

---

## How to Insert

1. In your Voiden file, type `/pre_script` and press **Enter**.

    ![pre-script](/img/voiden-blocks/pre-script.png)

2. Add your script logic inside the block.

    ![pre-done](/img/voiden-blocks/pre-done.png)

3. Run the request with **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux).

    ![pre-script-done](/img/voiden-blocks/pre-script-done.png)

4. View response and assertions in the **Response panel** and logs in the **Script Logs**.
