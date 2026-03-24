---
  id: options-block
  title: Options Block
  sidebar_label: Options Block
---

# Options Block <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

Global settings are great as a baseline — but sometimes a single request needs to behave differently from everything else. The Options Block gives you per-request control without touching your global config. Drop it into any section, set what you need, and Voiden handles the rest. Everything outside that section stays exactly as it was.

---

## Inserting the Block

Type `/options` anywhere inside a `.void` file to insert the options table. It lives inline with the rest of your request — right alongside headers, body, and auth.

![option-block](/img/options/options.gif)

:::tip
The options block is a **singleton per section**. Inserting `/options` a second time in the same section replaces the existing table rather than stacking a second one on top.
:::

---

## How It Works

Under the hood, the flow is straightforward:

1. When a request is sent, `getRequestFromJson` reads all **enabled** rows from the `options-table` block.
2. Each row's `key` and `value` are collected into a `Record<string, string>` object and attached to the request as `metadata`.
3. The Electron main process reads `metadata` before executing the HTTP fetch and applies any recognized options.
4. Unrecognized keys are **ignored silently** — a typo won't break anything, but it also won't do what you expect. Use the built-in autocomplete to stay accurate.

---

## Supported Options

| Key | Values | Default | Description |
|---|---|---|---|
| `follow_redirects` | `true` / `false` | `true` (from global settings) | Whether to follow HTTP 3xx redirects automatically. Set to `false` to stop at the redirect and inspect the raw response. |

:::note
`timeout` is currently a **global-only** setting, configured under **Settings → Requests → Timeout**. It is applied at the HTTP agent level and cannot be overridden per-request via the options table yet. Only `follow_redirects` is read from per-request metadata at this time.
:::

---

## Option Details

### `follow_redirects`

By default, Voiden follows redirects transparently — your request goes out, the server responds with a `302`, and Voiden quietly chases it until it lands somewhere final. Most of the time, that's exactly what you want.

But sometimes you need to see what's happening *in between*. Setting `follow_redirects` to `false` stops Voiden at the first `3xx` response and returns it directly — `Location` header and all.

![req-options](/img/options/options-req.png)

```
follow_redirects    false
```

| Value | Behavior |
|---|---|
| `true` _(default)_ | Follows all 3xx redirects transparently. Returns the final response. |
| `false` | Stops at the first 3xx. Returns the redirect response directly. |

**When `false` is useful:**

- **Debugging redirect chains** — see exactly where a request is being sent before the client follows it
- **Verifying redirect targets** — confirm the `Location` header points to the right place after a login, move, or alias
- **OAuth callback flows** — catch the redirect carrying an auth code or token in the query string before it's consumed by the next request

If `follow_redirects` isn't present in the options table at all, the value falls back to the global setting under **Settings → Requests → Follow Redirects**.

---

## Precedence

When an options table is present, it always wins — for that request and that request only.

```
per-request options-table  >  global settings
```

The moment the request completes, the override is gone. Nothing leaks into other requests, other sections, or other files.

---

## Scoping in Multi-Request Files

Each section in a `.void` file owns its options independently. An options block in one section has zero effect on any other — they don't share state or inherit from each other.

```
GET https://api.example.com/login
[options]
follow_redirects    false
# Stops at the redirect — grab the Location header directly

---

GET https://api.example.com/dashboard
# No options block — falls back to the global follow_redirects setting
```

This makes it easy to test different behaviors side by side in the same file without them interfering with each other.

---

## Autocomplete

The key column has built-in autocomplete. Start typing in the first cell and Voiden shows all supported option keys with short descriptions inline. It's the fastest way to discover what's available and avoid silent misses from typos.

---

## Linked Blocks

Like headers, query params, and auth, the options table supports **block linking**. Link a shared options configuration from another file so multiple requests can reuse the same settings without duplication.

If the source file changes, linked blocks display a **source sync indicator** — so you always know when you're looking at something that might be out of date.
