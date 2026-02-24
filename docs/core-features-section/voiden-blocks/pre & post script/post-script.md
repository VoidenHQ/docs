---
  id: post-script
  title: Post Script
  sidebar_label: Post Script Blocks
---

#  <div style={{display:"flex",alignItems:"center"}}> Pre Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Post Script** runs after a response is received.
It executes locally on your operating system inside Voiden — not on the API endpoint. The script runs in an isolated environment and processes the response after it returns to your machine.

Post Scripts are used to validate, extract, and manage response data dynamically.


Voiden supports writing Post Scripts in:

- **JavaScript**
- **Python**

---

## Try It Out

1. In your Voiden file, type `/post_script` and press **Enter** to insert a Post Script block.  

  ![post-script](/img/voiden-blocks/post-scripts.png)

2. Add your script logic inside the block.  

![post-done](/img/voiden-blocks/post-done.png)

3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux).  

![post-script-done](/img/voiden-blocks/post-script-done.png)

4. View results, logs, and assertions in the **Response panel**.

---

## What You Can Do

Using the exposed `voiden` API, you can:

- Read response status and status text  
- Read response headers  
- Read response body  
- Check response time and size  
- Store runtime variables  
- Read environment variables  
- Write logs  
- Create assertions  

---

## Execution Environment

- JavaScript runs in an isolated Node.js subprocess.  
- Python runs in a separate Python process.  
- Scripts only access the exposed `voiden` API.  

This ensures safe and controlled execution.

---

## Summary

The Post Script allows you to process and validate a response after it is received.

It provides controlled, local automation for response handling, validation, logging, and variable management using JavaScript or Python.