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

## Color-Coded Sections

Each request in your file gets a unique color indicator. That same color carries through to the response panel, so you can instantly match every response back to the request that triggered it — no guessing, no counting rows.

This makes it especially easy to scan results when you have several requests running in sequence, each response clearly tied to its source at a glance.

---

## Why It's Useful

- Test a full API flow from top to bottom in a single file.
- Review each response as it comes in, without triggering requests manually one at a time.
- Keep related requests together in one place — clean, readable, and easy to share.

---

## Summary

Multiple Requests turns your `.void` file into a complete request runner. Add your requests and watch each response come in — color-coded, ordered, and easy to follow. It's the simplest way to test a full API flow without ever leaving a single file.
