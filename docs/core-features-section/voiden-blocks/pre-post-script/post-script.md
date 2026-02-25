---
  id: post-script
  title: Post Script
  sidebar_label: Post Script Blocks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  <div style={{display:"flex",alignItems:"center"}}> Post Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Post Script** block lets you run custom logic **after a response is received**.

It executes locally inside Voiden in an isolated environment. Use it to validate responses, extract values, store runtime variables, or write logs.

Voiden supports **JavaScript** and **Python**.

For a full reference of what you can do inside a script, see the [Voiden Scripting](/docs/plugins/core-plugins/voiden-scripting).

---

## How to Insert

1. In your Voiden file, type `/post_script` and press **Enter**.

    ![post-script](/img/voiden-blocks/post-scripts.png)

2. Add your script logic inside the block.

    ![post-done](/img/voiden-blocks/post-done.png)

3. Run the request with **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux).

    ![post-script-done](/img/voiden-blocks/post-script-done.png)

4. View response and assertions in the **Response panel** and logs in the **Script Logs**.

---

## What You Can Access

Inside a Post Script, the `voiden.response` object is read-only:

| Property | Description |
|---|---|
| `voiden.response.status` | HTTP status code |
| `voiden.response.statusText` | Status text (e.g. `"OK"`) |
| `voiden.response.headers` | Response headers |
| `voiden.response.body` | Response body |
| `voiden.response.time` | Response time in ms |
| `voiden.response.size` | Response size in bytes |

---

## Examples

The following are a few common examples of what you can do inside a Post Script. Since scripts run in a full Node.js or Python process, you're not limited to these — you can write any logic you need.

## Reading the Response

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    const status = voiden.response.status;

    voiden.assert(status, "==", 200, "Status should be 200");
    voiden.log("Response received successfully");
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    status = voiden.response.status

    voiden.assert(status, "==", 200, "Status should be 200")
    voiden.log("Response received successfully")
    ```
  </TabItem>
</Tabs>

---

## Variables

Runtime variables let you extract values from a response and carry them forward into other requests. This is useful for chaining requests — for example, storing a token or ID returned by one endpoint and using it in the next.

### Store a value

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    await voiden.variables.set("lastStatus", voiden.response.status);
    await voiden.variables.set("authToken", voiden.response.body.token);
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    voiden.variables.set("lastStatus", voiden.response.status)
    voiden.variables.set("authToken", voiden.response.body.token)
    ```
  </TabItem>
</Tabs>

### Read a value back

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    const token = await voiden.variables.get("authToken");
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    token = voiden.variables.get("authToken")
    ```
  </TabItem>
</Tabs>


---

## Summary

Post Scripts give you full control over the response after it is received. Use them to assert status codes, extract values into runtime variables, log response details, or chain data across multiple requests.
