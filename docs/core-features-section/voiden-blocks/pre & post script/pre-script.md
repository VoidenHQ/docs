---
  id: pre-script
  title: Pre Script
  sidebar_label: Pre Script Blocks
---

#  <div style={{display:"flex",alignItems:"center"}}> Pre Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.


The **Pre Script** allows you to run custom logic **before a request is sent**.

It executes locally on your operating system inside Voiden — not on the API endpoint. The script runs in an isolated environment and can modify the request before it leaves your machine.

Pre Scripts are useful when you need to:

- Generate dynamic values (tokens, timestamps, IDs)
- Modify headers
- Update query or path parameters
- Prepare or serialize request body data
- Set runtime variables
- Add conditional logic before execution

Voiden supports writing Pre Scripts in:

- **JavaScript**
- **Python**

---

## Try It Out

1. In your Voiden file, type `/pre_script` and press **Enter** to insert a Pre Script block.

  ![pre-script](/img/voiden-blocks/pre-script.png)

2. Add your script logic inside the block.

  ![pre-done](/img/voiden-blocks/pre-done.png)

3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux).

![pre-script-done](/img/voiden-blocks/pre-script-done.png)

4. You will see the request execute and the results appear in the **Response panel**.

---

## What You Can Modify

Inside a Pre Script, you can access and modify the request using the exposed `voiden`  API.

### Request Fields

- `voiden.request.url`
- `voiden.request.method`
- `voiden.request.headers`
- `voiden.request.body`
- `voiden.request.queryParams`
- `voiden.request.pathParams`

---

## Summary

The Pre Script runs before a request is sent and executes locally inside Voiden.

It allows you to dynamically prepare and modify the request — including headers, parameters, body data, variables, logging, and validation — using JavaScript or Python, all within a secure and isolated environment.