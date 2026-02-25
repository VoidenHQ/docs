---
  id: pre-script
  title: Pre-Script
  sidebar_label: Pre-Script
  sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  <div style={{display:"flex",alignItems:"center"}}> Pre Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Pre Script** runs before a request is sent. It gives you access to the full request object so you can modify it before it leaves your machine.

For all available `voiden` API operations — variables, logging, assertions, and more — see the [Overview](/docs/plugins/core-plugins/pre-post%20script/overview).

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
