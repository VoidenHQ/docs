---
  id: voiden-stitch
  title: Voiden Stitch Plugin
  sidebar_label: Voiden Stitch
---

# Voiden Stitch

Testing APIs one by one works — but when you have multiple `.void` files to validate, doing it manually gets old fast. **Voiden Stitch** lets you insert a folder and run all the APIs inside it at once — one after another in Sequence, or all at the same time in Parallel — and see exactly what passed and what didn't, all in one place.

Curious how the block works? [Take a look at the Stitch Block →](/docs/core-features-section/voiden-blocks/stitch-result)

---

## Features

* Batch run multiple `.void` files sequentially in your preferred order, or in parallel with a single click
* Sequence / Parallel toggle to switch run modes right on the Stitch Runner
* Glob pattern matching for file inclusion/exclusion
* Shared or isolated variable scope per file
* Scenario-based variable overrides (CSV / JSON / YAML or inline)
* Aggregated assertion results in dedicated sidebar tab
* Per-file pass/fail with assertion counts and timing
* Stop-on-failure option (Sequence mode)
* Configurable delay between files (Sequence mode)
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

### Run Modes

The Stitch Runner has a **Sequence / Parallel** toggle that controls how your queued files execute:

- **Sequence** — files run one by one, in the order you've arranged them. Best when a later request depends on variables or state set by an earlier one.
- **Parallel** — flip the toggle and every queued file kicks off at the same time with a single click, instead of waiting for each one to finish before the next starts. Great for independent files like smoke tests or health checks, where speed matters more than run order.

Stop-on-failure and the delay between files only apply in Sequence mode, since they depend on files finishing in order.

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

Just drop a Stitch block into any `.void` file using `/stitch`, point it at the folders you care about, and hit run. You're in control of the order too — rearrange files however makes sense before kicking things off, and toggle between Sequence and Parallel depending on whether your files depend on each other or can all run at once. Voiden handles the rest — running your files, collecting results, and showing you a clean pass/fail breakdown with assertion counts and timing right in the sidebar. No manual triggering, no jumping between files.
