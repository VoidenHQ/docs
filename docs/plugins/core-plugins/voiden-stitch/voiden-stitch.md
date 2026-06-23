---
  id: voiden-stitch
  title: Voiden Stitch Plugin
  sidebar_label: Voiden Stitch
---

# Voiden Stitch

Testing APIs one by one works — but when you have multiple `.void` files to validate, doing it manually gets old fast. **Voiden Stitch** lets you insert a folder and run all the APIs inside it at once, in sequence, and see exactly what passed and what didn't, all in one place.

Curious how the block works? [Take a look at the Stitch Block →](/docs/core-features-section/voiden-blocks/stitch-result)

---

## Features

* Batch run multiple `.void` files sequentially in your preferred order
* Glob pattern matching for file inclusion/exclusion
* Shared or isolated variable scope per file
* Scenario-based variable overrides (CSV / JSON / YAML or inline)
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

### Scenarios

Ever wished you could test the same request against multiple users, environments, or test cases without touching the request itself? That's exactly what scenarios are for.

A scenario is just a named set of variable values that steps in when your request runs — no changes to your environment, no editing between runs.

**Two ways to set one up:**
- Point it at a **CSV, JSON, or YAML file** — each key maps to a variable name in your request
- Or just type the values **inline** directly in the scenario field

You keep using `{{variable}}` exactly as you always have. When you hit run, Voiden fires the request once per scenario row and groups the results by scenario in the response panel. Once the run finishes, your environment is exactly as you left it.

---

## Dependencies

| Dependency | Version |
|---|---|
| `core` | `^1.0.0` |
| `sdk` | `^1.0.0` |
| `voiden-rest-api` | `^1.0.0` |

---

## Summary

Just drop a Stitch block into any `.void` file using `/stitch`, point it at the folders you care about, and hit run. You're in control of the order too — rearrange files however makes sense before kicking things off. Voiden handles the rest — running each file in sequence, collecting results, and showing you a clean pass/fail breakdown with assertion counts and timing right in the sidebar. No manual triggering, no jumping between files.
