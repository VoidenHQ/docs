---
  id: options-block
  title: Options Block
  sidebar_label: Options Block
---

# Options Block

The **Options Block** gives you per-request control over how Voiden handles a request. Use it to fine-tune settings like timeout and redirect behavior without touching your global config.

---

## How to Insert

Type `/options` and press **Enter**. The block appears in your file, ready to configure.

---

## Available Settings

### Timeout

Set how long Voiden should wait for a response before failing, in milliseconds. By default, requests wait indefinitely.

Use this when you want fast, predictable failures — especially useful in automated runs with Stitch Blocks where a slow endpoint can hold up everything else.

### Follow Redirects

Control whether Voiden automatically follows `3xx` redirect responses.

- **Enabled** — Voiden follows the redirect and returns the final response. This is the default.
- **Disabled** — Voiden stops at the redirect and returns it directly. Use this when you want to inspect the `Location` header or verify that a redirect is pointing to the right place.

---

## Quick Reference

| Setting | Default | Description |
|---|---|---|
| Timeout | No limit | Max wait time in milliseconds |
| Follow Redirects | Enabled | Whether to follow `3xx` responses |

---

## Summary

Options apply only to the request they are attached to — no global impact. If no Options Block is present, Voiden uses its defaults.
