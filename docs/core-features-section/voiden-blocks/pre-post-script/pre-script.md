---
  id: pre-script
  title: Pre Script
  sidebar_label: Pre Script Blocks
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  <div style={{display:"flex",alignItems:"center"}}> Pre Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Pre Script** block lets you run custom logic **before a request is sent**.

It executes locally inside Voiden — not on the API endpoint — in an isolated environment. Use it to dynamically prepare the request: generate tokens, update headers, set variables, or add conditional logic.

Voiden supports **JavaScript** and **Python**.

For a full reference of what you can do inside a script, see the [Voiden Scripting](/docs/plugins/core-plugins/voiden-scripting).

---

## How to Insert

1. In your Voiden file, type `/pre_script` and press **Enter**.

    ![pre-script](/img/voiden-blocks/pre-script.png)

2. Add your script logic inside the block.

    ![pre-done](/img/voiden-blocks/pre-done.png)

3. Run the request with **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux).

    ![pre-script-done](/img/voiden-blocks/pre-script-done.png)

4. View response and assertions in the **Response panel** and logs in the **Script Logs**.

---

## What You Can Access

Inside a Pre Script, the `voiden.request` object is fully writable:

| Property | Description |
|---|---|
| `voiden.request.url` | Request URL |
| `voiden.request.method` | HTTP method |
| `voiden.request.headers` | Request headers |
| `voiden.request.body` | Request body |
| `voiden.request.queryParams` | Query parameters |
| `voiden.request.pathParams` | Path parameters |

---

## Examples

The following are a few common examples of what you can do inside a Pre Script. Since scripts run in a full Node.js or Python process, you're not limited to these — you can write any logic you need.

## Override a Header

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    voiden.request.headers = [{ key: "Authorization", value: "Bearer token" }];
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    voiden.request.headers = [{"key": "Authorization", "value": "Bearer token"}]
    ```
  </TabItem>
</Tabs>

## Extend Headers Without Overriding

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    voiden.request.headers.push({ key: "X-Trace", value: "abc" });
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    voiden.request.headers.push({"key": "X-Trace", "value": "abc"})
    ```
  </TabItem>
</Tabs>

---

## Modify the Request Body

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    voiden.request.body = { name: "Voiden" };
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    # Python — all keys and string values must use double quotes
    voiden.request.body = {"name": "Voiden"}
    ```
  </TabItem>
</Tabs>

---

## Canceling the Request

You can stop the request from being sent entirely:

```js
voiden.cancel();
```

---

## Summary

Pre Scripts give you full control over the request before it is sent. Use them to inject auth tokens, transform payloads, add tracing headers, or conditionally cancel requests based on runtime state.
