---
id: theme-creator
title: "Theme Creator"
sidebar_label: "Theme Creator"
description: "Create, edit, and live-preview custom color themes for Voiden — all without leaving the app."
custom_edit_url: "https://github.com/phurpa-tsering/theme-creator"
---

:::info Plugin Info
**Author:** Phurpa Tsering &nbsp;|&nbsp; **Version:** 1.0.1 &nbsp;|&nbsp; **Repository:** [phurpa-tsering/theme-creator](https://github.com/phurpa-tsering/theme-creator)
:::


A Voiden plugin for creating, editing, and live-previewing custom color themes — all without leaving the app.

## Overview

Theme Creator adds a full-featured theme editor directly inside Voiden. Pick colors for every UI token, see your changes applied instantly, and save themes that persist across app restarts.

## Getting Started

Click the **Themes** button in the right side of the status bar to open the Theme Creator panel.

## Features

### Browse & Manage Themes
- View all your custom themes in the sidebar with a live mini-preview of each
- Edit or delete any custom theme at any time
- Import themes from `.json` files shared by others
- Export any theme as a `.json` file to share or back up

### Create Custom Themes
- Start from a **Dark** or **Light** base template with sensible defaults
- Full color picker for every token — background, surface, text, border, accent, status, syntax, ANSI, HTTP method colors, and more
- Accent RGB triplets (`--accent-rgb`, `--accent-alt-rgb`) are auto-derived whenever you pick an accent color
- Collapsible color sections keep the editor organized: Base, Accent, Status, Syntax

### Live Preview
- Hit **Try Live** while editing to instantly apply your in-progress theme to the running app
- Hit **Restore** to revert back to your saved theme at any time
- When you save, the app automatically reverts to whichever theme was active in your settings

### Theme Storage
- Custom themes are saved as JSON files in your Voiden user data directory (`userData/themes/`)
- Themes persist across app restarts automatically

## Color Tokens Covered

| Group | Tokens |
|---|---|
| **Base** | Background layers, text, borders, selection, hover |
| **Accent** | Primary and secondary accent colors with RGB triplets |
| **Status** | Success, error, warning, info |
| **Syntax** | Tag, function, string, keyword, comment, constant, operator, entity, regexp, markup, special |
| **HTTP Methods** | GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS |
| **ANSI Terminal** | All 16 standard colors |
| **VCS** | Added, modified, removed, ignored |
| **Variables** | Valid, invalid, faker |

## Tips

- Use the **Export** button on any theme to use it as a starting point for a new one
- After exporting, import it back and tweak the colors to make it your own

## Requirements

- Voiden `>=2.0.0`

## Author

Phurpa Tsering

