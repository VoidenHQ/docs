---
id: terminal-overview
title: Terminal
sidebar_label: Terminal
---

# Terminal

Voiden has a built-in terminal, so you can run scripts, start a local server or use Git without leaving the app. It opens in your project folder and uses the shells already installed on your machine.

---

## Opening a Terminal

Use any of these:

- Press **Cmd+J** (macOS) or **Ctrl+J** (Windows/Linux).
- Click the terminal button in the status bar.
- Choose **Toggle Terminal** from the menu.

The terminal opens in the bottom panel, starting in your project folder. Use the same shortcut to hide it again.

To open another terminal, click **+** in the terminal panel. Each terminal gets its own tab.

---

## Choosing a Shell

Voiden detects the shells installed on your machine:

- **macOS and Linux:** your login shell, the shells listed in `/etc/shells`, and common extras such as `fish`, `nu` and `pwsh`, including ones installed with Homebrew.
- **Windows:** PowerShell 7, Windows PowerShell, Command Prompt, Git Bash and WSL.

The shell picker (**▾**) next to the **+** button shows which shell the current terminal uses. Open it to:

- **Open a new terminal in another shell** — when no terminal is open yet.
- **Switch the current terminal's shell** — when a terminal is open. The current session ends and the new shell starts in the same folder, so finish or save anything running in it first.
- **Set a shell as the default** — click **Set as default** next to it. New terminals start in that shell from then on.

---

## Setting the Default Shell

You can also set the default shell in **Settings → Integrations → Default shell**:

| Option | What it does |
|---|---|
| **Automatic** | Uses your system shell: your login shell (`$SHELL`) on macOS and Linux, and PowerShell 7 on Windows if it's installed, otherwise Windows PowerShell. |
| **A detected shell** | Always starts new terminals in that shell. |
| **Custom path…** | Enter the full path to any other shell executable, such as `/opt/homebrew/bin/fish` or `C:\path\to\shell.exe`. |

:::note
If the default shell can't be found — for example after it's uninstalled — Voiden falls back to **Automatic** instead of failing to open a terminal.
:::

The default only applies to new terminals. To change the shell of a terminal that's already open, use the shell picker in the terminal panel.
