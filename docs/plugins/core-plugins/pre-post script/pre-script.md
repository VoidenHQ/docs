---
  id: pre-script
  title: Pre Script 
  sidebar_label: Pre Script
  sidebar_position: 2
---
#  <div style={{display:"flex",alignItems:"center"}}> Pre Script <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

The **Pre Script** runs before a request is sent.
It allows you to modify or prepare the request dynamically using JavaScript or Python.
This stage is useful when your request needs calculated values, updated headers, runtime variables, or conditional logic before execution.

Discover everything you need to know about the [Pre Script](/docs/core-features-section/voiden-blocks/pre%20&%20post%20script/pre-script.md) in the detailed

---

## When the Pre Script Runs

During request execution, Voiden follows this order:

1. `pre-processing` — captures editor context  
2. `pre-send` — executes the **Pre Script**  

The Pre Script runs at the `pre-send` stage.

---

## What You Can Do in a Pre Script

Using the exposed `voiden` API, you can:

- Modify request URL
- Change HTTP method
- Override or extend headers
- Update query parameters
- Update path parameters
- Modify the request body
- Read environment variables
- Read and write runtime variables
- Write logs
- Create assertions
- Cancel the request flow

---

## Accessing the Request

You can modify the request using:

- `voiden.request.url`
- `voiden.request.method`
- `voiden.request.headers`
- `voiden.request.body`
- `voiden.request.queryParams`
- `voiden.request.pathParams`


### Override Example (JavaScript)

```js
voiden.request.headers = [{ key: "Authorization", value: "Bearer token" }];
```

---

## Extending Request Properties

You can extend existing request properties inside the Pre Script without completely overriding them.  

### JavaScript

```js
voiden.request.headers.push({ key: "X-Trace", value: "abc" });
voiden.request.queryParams.push({ key: "page", value: "1" });
voiden.request.pathParams.push({ key: "id", value: "123" });
```
![pre-extending](/img/plugins/openapi-collection/pre-extending.png)

### Python 

```js
voiden.request.headers = [{"key": "Authorization", "value": "Bearer token"}]
voiden.request.headers.push({"key": "X-Trace", "value": "abc"})
```

![pre-extending](/img/plugins/openapi-collection/pre-extending-py.png)

---

## Modifying the Request Body

You can modify the request body dynamically inside the Pre Script. JavaScript and Python share the same syntax.

### Javascript
```js
voiden.request.body ={ name: "Voiden" };
```

![pre-request](/img/plugins/openapi-collection/pre-req.png)

### Python

```py
# For python all keys and string values in objects should be enclosed in double quotes. 
voiden.request.body = {"name": "Voiden"}
```

![pre-request](/img/plugins/openapi-collection/pre-req-script.png)

---

## Working with Variables

Variables allow you to store and reuse values during request execution. Voiden supports both environment variables and runtime variables for flexible and controlled data management.

### Environment Variables (Read-only)


Environment variables are predefined values configured in your active environment.  

```js
const token = await voiden.env.get("API_TOKEN");
```

![pre-env](/img/plugins/openapi-collection/pre-env.png)

### Runtime Variables (Read / Write)

Runtime variables are dynamic values that can be created, updated, and reused during execution.
They are useful for passing data between requests.

```js
await voiden.variables.get("key");
await voiden.variables.set("key", "value");
```

![pre-runtime](/img/plugins/openapi-collection/output.gif)

---

### Logging

Logging allows you to print messages during script execution. These logs appear inside Voiden’s interface and help you debug, track flow, or monitor important values.

```js
voiden.log("request started");
voiden.log("info", "pre-script executed");
voiden.log("error", "missing token");
```


### Support Level

- log
- info
- debug
- warn
- error

---

### Creating Assertions
```js
//actual — The value you want to test (for example, a response status or body field).
//operator — The comparison operator used to validate the value (such as ==, contains, greater, etc.).
//expectedValue — The value you expect actual to match or compare against.
//message — (Optional) A custom message shown in the assertion result.

voiden.assert(actual, operator, expectedValue, message);
```

---

### Canceling the Request

If needed, you can stop the request from being sent:

```js
voiden.cancel();
```

## Execution Environment

- JavaScript runs in an isolated Node.js subprocess.
- Python runs in a separate Python process.
- Scripts only access the exposed `voiden` API.

This ensures safe and controlled execution.

---

## Summary

The Pre Script allows you to prepare and modify a request before it is sent.

It gives you full control over request configuration, variables, logging, and validation — using either JavaScript or Python — while keeping execution isolated and secure.