---
  id: installation
  title: Installation
  sidebar_label: Installation
  sidebar_position: 2
---

# Installation

Get Voiden up and running in under a minute — no accounts, no setup wizards, no background services phoning home.

---

## Step 1 — Download

Head to **[voiden.md/download](https://voiden.md/download)** and pick the build for your OS.

:::tip One download, that's it
No installer accounts, no telemetry opt-outs, no surprise toolbars. Download the file, open it, done.
:::

---

## Step 2 — Check System Requirements

Voiden is intentionally lightweight. If your machine is from the last five years, you're almost certainly fine.

### macOS

| Requirement | Minimum |
|---|---|
| OS | macOS 11 Big Sur or later |
| Chip | Apple Silicon or Intel |
| RAM | 4 GB |
| Disk | 200 MB free |

<img src="/img/geetingstarted/mac-install.png" alt="macOS installation" style={{width: '75%', borderRadius: '12px', marginTop: '12px'}} />

---

### Windows

| Requirement | Minimum |
|---|---|
| OS | Windows 10 or later (64-bit) |
| Processor | Intel or AMD |
| RAM | 4 GB |
| Disk | 200 MB free |


<img src="/img/geetingstarted/window-install.png" alt="Windows installation" style={{width: '75%', borderRadius: '12px', marginTop: '12px'}} />

---

### Linux

| Requirement | Minimum |
|---|---|
| OS | Ubuntu 20.04+, Fedora 34+, or any modern 64-bit distro |
| Processor | Intel or AMD |
| RAM | 4 GB |
| Disk | 200 MB free |



<img src="/img/geetingstarted/linux-install.png" alt="Linux installation" style={{width: '75%', borderRadius: '12px', marginTop: '12px'}} />

---

## Works Offline

Voiden is **offline-first** by design. Once installed, everything runs entirely on your local machine — your requests, your files, your environment variables. Nothing leaves your computer unless you send a request to an API yourself.

Here's what that means in practice:

- **No cloud dependency** — Voiden doesn't need to reach out to any server to function. Open it on a plane, in a basement, or on a locked-down corporate network and it works exactly the same.
- **No account required** — there's no login, no session, no token to refresh. Launch the app and you're in.
- **No forced syncs** — your `.void` files live on your disk. You decide if and how they get shared (git, a shared drive, whatever works for your team).
- **No background services** — Voiden doesn't install daemons or startup agents. It only runs when you open it.
- **Air-gapped friendly** — if you work in a restricted environment where outbound traffic is controlled, Voiden fits right in. No allowlist entries needed for the app itself.


---

You're all set. Now go break some APIs — *locally*.
