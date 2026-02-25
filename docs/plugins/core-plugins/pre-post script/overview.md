---
  id: overview
  title: Overview
  sidebar_label: Overview
  sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  <div style={{display:"flex",alignItems:"center"}}> Voiden Scripting <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

Voiden Scripting lets you run **JavaScript** or **Python** code as part of your request lifecycle, using the exposed `voiden` API.

Scripts run at two stages:

- [**Pre Script**](/docs/plugins/core-plugins/pre-post%20script/pre-script) — runs before the request is sent
- [**Post Script**](/docs/plugins/core-plugins/pre-post%20script/post-script) — runs after the response is received

Both stages share the same `voiden` API.

Scripts run in an isolated environment. You have full freedom to use any library or perform any operation — Voiden simply exposes the `voiden` API on top of that.

---

## Blocks

Voiden Scripting introduces two blocks you can add to your `.void` file:

| Block | Description |
|---|---|
| [**Pre-Script**](/docs/plugins/core-plugins/pre-post%20script/pre-script) | Runs before the request is sent. Use it to modify headers, body, params, or cancel the request entirely. |
| [**Post-Script**](/docs/plugins/core-plugins/pre-post%20script/post-script) | Runs after the response is received. Use it to assert values, extract data, and store variables for later requests. |

---

## How Scripts Run

Voiden runs your scripts in an isolated environment so they can't interfere with the app. The way this works differs slightly between languages.

**JavaScript** scripts are sent to a separate Node.js process. The `voiden` API (env, variables) communicates back to the app via message passing, so every API call returns a Promise. This is why you need `await`.

**Python** scripts also run in a separate process, but before the script starts, Voiden pre-loads all your environment variables and runtime variables and passes them in directly. So the `voiden` API is just plain synchronous method calls — no `await` needed.

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    const token = await voiden.env.get("TOKEN");
    const userId = await voiden.variables.get("userId");
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    token = voiden.env.get("TOKEN")
    user_id = voiden.variables.get("userId")
    ```
  </TabItem>
</Tabs>

---

## Environment Variables

Environment variables are read-only values configured in your active environment.

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    const token = await voiden.env.get("API_TOKEN");
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    token = voiden.env.get("API_TOKEN")
    ```
  </TabItem>
</Tabs>

---

## Runtime Variables

Runtime variables are dynamic values you can create, read, and update during execution. They are useful for passing data between requests.

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    await voiden.variables.set("key", "value");
    const val = await voiden.variables.get("key");
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    voiden.variables.set("key", "value")
    val = voiden.variables.get("key")
    ```
  </TabItem>
</Tabs>

![pre-runtime](/img/plugins/pre-post/output.gif)

---

## Logging

Logs appear in Voiden's UI and help you debug, trace flow, or monitor values during script execution.

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    voiden.log("message");
    voiden.log("info", "pre-script ran");
    voiden.log("warn", "token missing");
    voiden.log("error", "request aborted");
    voiden.log("debug", "body:", voiden.request.body);
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    voiden.log("message")
    voiden.log("info", "pre-script ran")
    voiden.log("warn", "token missing")
    voiden.log("error", "request aborted")
    voiden.log("debug", "body:", voiden.request.body)
    ```
  </TabItem>
</Tabs>

![Voiden Script Log](/img/plugins/pre-post/voiden-log.gif)

**Supported levels:** `log` · `info` · `debug` · `warn` · `error`

---

## Assertions

Assertions let you validate values and surface pass/fail results in the Response panel.

![Voiden Script Assertion](/img/plugins/pre-post/voiden-script.png)

```js
voiden.assert(actual, operator, expectedValue, message);
```

| Parameter | Description |
|---|---|
| `actual` | The value to test (e.g. `voiden.response.status`) |
| `operator` | Comparison operator (e.g. `"=="`, `"contains"`, `"greater"`) |
| `expectedValue` | The value you expect |
| `message` | (Optional) Label shown in the assertion result |

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```js
    voiden.assert(voiden.response.status, "==", 200, "Status should be 200");
    voiden.assert(voiden.response.body.name, "contains", "Voiden", "Name check");
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```py
    voiden.assert(voiden.response.status, "==", 200, "Status should be 200")
    voiden.assert(voiden.response.body.name, "contains", "Voiden", "Name check")
    ```
  </TabItem>
</Tabs>
