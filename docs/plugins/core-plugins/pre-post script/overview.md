---
  id: overview
  title: Overview 
  sidebar_label: Overview
  sidebar_position: 2
---
#  <div style={{display:"flex",alignItems:"center"}}> Overview <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

Voiden Scripting allows you to run JavaScript or Python code as part of your request lifecycle.

Scripts can execute in two stages:

- [**Pre Script**](/docs/plugins/core-plugins/pre-post%20script/pre-script.md) — runs before the request is sent
- [**Post Script**](/docs/plugins/core-plugins/pre-post%20script/post-script.md) — runs after the response is received

Through the exposed `voiden` API, scripts can modify requests, process responses, manage variables, write logs, create assertions, and control request flow.

Scripts run in isolated environments, ensuring safe and controlled execution.

Voiden currently provides scripting support using **JavaScript** and **Python** runtimes, We’re planning to extend the scripting engine to support additional languages in future.