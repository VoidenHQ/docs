---
id: run-a-void-file
title: Run a .void File
sidebar_label: Run a .void File
sidebar_position: 4
---

The `run` command executes `.void` files created in the Voiden desktop app. Pass a file path, a directory, or a glob pattern — the runner handles them all.

---

## Run a single file

```bash
voiden-runner run auth.void
```

```bash
voiden-runner run ./requests/get-users.void
```

The runner prints a summary of each request and response to the terminal and exits with code `0` on success or `1` on failure.

---

## Run a directory

Pass a directory path and the runner automatically processes all `.void` files inside it — including nested subdirectories. No extra flags needed.

```bash
voiden-runner run ./api-tests
```

:::tip Controlling execution order
Files are executed in filesystem order. Use numbered subdirectories (e.g. `01-auth/`, `02-users/`) to control the sequence across folders.
:::

---

## Run with glob patterns

Target specific files across a directory tree using glob syntax:

```bash
voiden-runner run "./api-tests/**/*.void"
```

---

## Stop on first failure

Use `--bail` to halt execution the moment a request fails. Ideal for CI where fast feedback matters:

```bash
voiden-runner run ./api-tests --bail
```

To run all files to completion regardless of failures but still exit with an error code, use `--fail-on-error` instead:

```bash
voiden-runner run ./api-tests --fail-on-error
```

---

## Inspect requests and responses

Print what was actually sent and received for each request:

```bash
voiden-runner run auth.void --show-req --show-res
```

Use `--verbose` for additional detail including script logs and plugin messages:

```bash
voiden-runner run auth.void --verbose
```

---

## Runtime variables and request chaining

Just like in the Voiden app, the runner maintains a persistent session of runtime variables between requests. A value captured from one response is automatically available in the next request via `{{process.KEY}}` — enabling multi-step workflows like login → reuse token → access protected endpoint without any extra setup.

Use `voiden-runner session vars` to inspect what's currently stored, or `voiden-runner session clear` to reset the state between runs.

:::info Opting out of session state
Add `--no-session` to run a file in a fully stateless mode — no session variables are loaded or saved during that run.
:::
