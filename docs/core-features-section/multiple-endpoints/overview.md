---
  id: multiple-endpoints-overview
  title: Multiple Requests
  sidebar_label: Multiple Requests
---

# Multiple Requests <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

Voiden lets you add multiple requests directly in your `.void` file — no switching between tabs, no juggling separate files. Just stack your requests one after another and run them all at once.

---

## How It Works

1. Add your requests directly in the file, one after another.

![multi-endpoint](/img/multi-endpoints/multi-req.png)

2. Click the **Run All** button.

![multi-endpoint](/img/multi-endpoints/multi-endpoint.gif)

3. Voiden runs each request in sequence and displays the responses one by one — so you can see exactly what each request returned, in order.

---

## Running Requests

You are in control of what runs and when.

- **Run a single request** — place your cursor inside the request section you want to execute, then press **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux). Voiden runs only that request and shows its response.
- **Run all requests** — press **Cmd + Shift + Enter** (Mac) or **Ctrl + Shift + Enter** (Windows/Linux) to run every request in the file in sequence, one after another.

:::note Running Requests
To run a single request, make sure your cursor is placed inside that request's section before pressing the shortcut.
:::

---

## Request Labels

Each request in your file gets a unique color indicator and a label — both assigned automatically by Voiden, so everything is visually distinct from the moment you add it. The label gives each request a recognizable name, and the color carries through to the response panel, so you can instantly match every response back to the request that triggered it — no guessing, no counting rows.

Not a fan of the auto-generated label? You can rename it too. Just **double-click the label** to edit it and give it something that makes sense for your workflow.

This makes it especially easy to scan results when you have several requests running in sequence — each response clearly labeled and tied to its source at a glance.

---

## Why It's Useful

- Test a full API flow from top to bottom in a single file.
- Review each response as it comes in, without triggering requests manually one at a time.
- Keep related requests together in one place — clean, readable, and easy to share.

---

## Summary

Multiple Requests is the fastest way to test a full API flow in one place. Stack your requests, run one or all of them, and follow each response back to its source through color and label — no jumping between files, no losing track of what came from where.
