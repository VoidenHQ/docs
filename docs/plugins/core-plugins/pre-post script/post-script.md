---
  id: post-script
  title: Post-Script
  sidebar_label: Post-Script
  sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  <div style={{display:"flex",alignItems:"center"}}> Post Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Post Script** runs after a response is received. It gives you read access to the full response object so you can validate, extract, and store data.

For all available `voiden` API operations — variables, logging, assertions, and more — see the [Overview](/docs/plugins/core-plugins/pre-post%20script/overview).

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
