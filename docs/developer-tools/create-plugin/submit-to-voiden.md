---
id: create-plugin-submit
title: Submit to Voiden
sidebar_label: Submit to Voiden
sidebar_position: 6
---

Once your plugin has a published GitHub release, you can submit it to the Voiden plugin registry. The Voiden team reviews the PR, verifies the plugin, and makes it available to everyone in the Extensions browser.

---

## Before you submit

Make sure your plugin has:

- At least one tagged GitHub release with `manifest.json`, `dist/{id}.js`, and `src/skill.md` attached as release assets
- A clear description in `manifest.json`
- A `changelog.json` with at least one entry
- Passes a basic install test in Voiden (build → zip → install from file)

---

## Submit a PR to the registry

### 1. Fork the registry

Go to [VoidenHQ/plugin-registry](https://github.com/VoidenHQ/plugin-registry) and fork it to your GitHub account.

### 2. Add your entry to `extensions.json`

Clone your fork and add your plugin's entry to the `extensions.json` file:

```json
{
  "type": "community",
  "id": "my-plugin",
  "repo": "your-github-username/my-plugin-repo",
  "name": "My Plugin",
  "description": "One-line description of what your plugin does.",
  "version": "1.0.0",
  "author": "Your Name",
  "priority": 30,
  "bundled": false,
  "voidenVersion": ">=2.0.0",
  "mainProcess": false,
  "capabilities": {},
  "features": []
}
```

| Field | Notes |
|---|---|
| `id` | Must match the `id` in your `manifest.json` exactly |
| `repo` | Your GitHub repo in `owner/repo` format |
| `version` | The version of the release you are submitting |
| `bundled` | Always `false` for community plugins |
| `mainProcess` | Set to `true` only if your plugin has a `{id}-main.cjs` release asset |
| `capabilities` | Copy from your built `manifest.json` after running `npm run build` |

### 3. Open a pull request

Push your change to your fork and open a pull request to `VoidenHQ/plugin-registry`:

- **Title:** `feat: add [your-plugin-name]`
- **Body:** Briefly describe what your plugin does and link to your GitHub release

### 4. Wait for review

The Voiden team will:
1. Install your plugin from the release assets
2. Verify the manifest fields are correct
3. Test the core functionality
4. Merge the PR and deploy — your plugin will appear in the Extensions browser for all users

:::info Review timeline
The team aims to review submissions within a few business days. You will receive feedback directly on the PR if any changes are needed.
:::

---

## Updating a listed plugin

To update an existing listing after releasing a new version:

1. Push a new tagged release on GitHub (see [Release to GitHub](./release.md))
2. Open a PR to `plugin-registry` updating the `version` field in `extensions.json`

The PR title convention for updates is: `chore: update [your-plugin-name] to vX.X.X`

---

## Install flow for users

Once your plugin is listed, users can install it directly from inside Voiden:

**Extensions → Browse → find your plugin → Install**

Voiden fetches the `manifest.json` and renderer bundle from your latest GitHub release automatically.
