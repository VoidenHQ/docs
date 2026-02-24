---
  id: post-script
  title: Post Script 
  sidebar_label: Post Script
  sidebar_position: 3
---

#  <div style={{display:"flex",alignItems:"center"}}> Post Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Post Script** runs after a response is received.
It allows you to read, process, validate, and store response data using JavaScript or Python.

This stage is useful when you need to extract values, perform checks, log information, or control workflow after the request completes.

To gain a deeper understanding of the [Post Script.](/docs/core-features-section/voiden-blocks/pre%20&%20post%20script/post-script.md)

---

## When the Post Script Runs

During execution, Voiden follows this order:

1. `pre-processing`
2. `pre-send`
3. Request is sent
4. `post-processing` — executes the **Post Script**

The Post Script runs at the `post-processing` stage.

---

## What You Can Do in a Post Script

Using the exposed `voiden` API, you can:

- Read response status
- Read response headers
- Read response body
- Check response time and size
- Store runtime variables
- Read environment variables
- Write logs
- Create assertions

---

## Accessing the Response

You can access the response using:

- `voiden.response.status`
- `voiden.response.statusText`
- `voiden.response.headers`
- `voiden.response.body`
- `voiden.response.time`
- `voiden.response.size`


## JavaScript

```js
const status = voiden.response.size;

voiden.assert(
  status,
  "==",
  397,
  "Response status should be 200"
);

voiden.log("Response received successfully");
```

![post](/img/plugins/openapi-collection/post-py.png)
## Python
```py
status = voiden.response.time

voiden.assert(
    status,
    "==",
    200,
    "Response status should be 200"
)

voiden.log("Response received successfully")
```

![post](/img/plugins/openapi-collection/post-response.png)

---

## Working with Runtime Variables

You can store values for later use:
```js
voiden.variables.set("lastStatus", voiden.response.status);
```

![post-status](/img/plugins/openapi-collection/post-runtime.gif)

## Logging

Logging lets you output messages during Post Script execution. These logs help you track response handling, debug issues, and understand script behavior.


```js
voiden.log("info", "Post-script executed");
```

## Supported levels

- log
- info
- debug
- warn
- error
- Logs appear in the UI.

Logs appear in the UI.

---

## Execution Environment

- JavaScript runs in an isolated Node.js subprocess.
- Python runs in a separate Python process.
- Scripts only access the exposed `voiden` API.

This ensures safe and controlled execution.

---

## Summary

The Post Script allows you to process and validate a response after it is received.

It gives you control over response handling, logging, variable management, and assertions — using either JavaScript or Python — while maintaining isolated and secure execution.