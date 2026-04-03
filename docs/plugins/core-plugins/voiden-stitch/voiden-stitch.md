---
  id: voiden-stitch
  title: Voiden Stitch Plugin
  sidebar_label: Voiden Stitch
---

# Voiden Stitch <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

Testing APIs one by one works — but when you have multiple `.void` files to validate, doing it manually gets old fast. **Voiden Stitch** lets you insert a folder and run all the APIs inside it at once, in sequence, and see exactly what passed and what didn't, all in one place.

Curious how the block works? [Take a look at the Stitch Block →](/docs/core-features-section/voiden-blocks/stitch-result)

---

## Features

* Batch run multiple `.void` files sequentially
* Glob pattern matching for file inclusion/exclusion
* Shared or isolated variable scope per file
* Aggregated assertion results in dedicated sidebar tab
* Per-file pass/fail with assertion counts and timing
* Stop-on-failure option
* Configurable delay between files
* Abort/cancel support

---

## Capabilities

### Blocks

| Block | Description |
|---|---|
| `stitch` | Defines a batch run — configure file patterns, exclusions, environment, and run behavior |

### Slash Commands

| Command | Description |
|---|---|
| `/stitch` → **Insert Stitch Runner** | Inserts a Stitch block into your `.void` file |

---

## Dependencies

| Dependency | Version |
|---|---|
| `core` | `^1.0.0` |
| `sdk` | `^1.0.0` |
| `voiden-rest-api` | `^1.0.0` |

---

## Summary

Just drop a Stitch block into any `.void` file using `/stitch`, point it at the folders you care about, and hit run. Voiden handles the rest — running each file in order, collecting results, and showing you a clean pass/fail breakdown with assertion counts and timing right in the sidebar. No manual triggering, no jumping between files.
