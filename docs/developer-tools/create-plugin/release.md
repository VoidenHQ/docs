---
id: create-plugin-release
title: Release to GitHub
sidebar_label: Release to GitHub
sidebar_position: 5
---

The scaffold includes a pre-wired GitHub Actions workflow. Push a version tag and it builds everything, creates a GitHub Release, and uploads all the assets — no manual uploads needed.

---

## Before you release

1. Bump `version` in `manifest.json` to the new release version.
2. Add an entry to `changelog.json`:

```json
[
  {
    "version": "1.1.0",
    "date": "2026-06-01",
    "title": "My new feature",
    "description": "Short summary of what changed.",
    "changes": {
      "Added": ["New slash command"],
      "Fixed": ["Bug with sidebar panel"]
    }
  }
]
```

3. Run the release script to build all bundles and validate the manifest:

```bash
npm run release
```

If the manifest is invalid JSON or missing required fields, the script prints an error and exits before you tag anything.

---

## Tag and push

```bash
git add .
git commit -m "release v1.1.0"
git tag v1.1.0
git push origin v1.1.0
```

Pushing the tag triggers the GitHub Actions workflow.

---

## What the workflow does

The pre-generated `.github/workflows/release.yml` runs automatically on every version tag push:

1. Checks out the repo and sets up Node 20
2. Installs dependencies
3. Builds the renderer bundle → `dist/{id}.js`
4. Builds the main-process bundle → `dist/{id}-main.cjs` (skips if `src/main-process.ts` absent)
5. Builds the runner bundle → `dist/runner.js` (only if runner support was selected)
6. Creates a GitHub Release and uploads assets

### Release assets

| Asset | Required | Purpose |
|---|---|---|
| `manifest.json` | Yes | Plugin identity, read by the Extensions browser |
| `dist/{id}.js` | Yes | Renderer bundle |
| `src/skill.md` | Yes | AI skill description |
| `changelog.json` | No | Release history shown to users |
| `dist/{id}-main.cjs` | No | Main-process bundle (if applicable) |
| `dist/runner.js` | No | Runner bundle (if applicable) |

:::tip Name matters for runner
When uploading the runner bundle as a release asset, the file must be named exactly `runner.js`. The `release.yml` handles this automatically — do not rename it manually.
:::

---

## Trigger a release

```bash
git tag v1.2.0
git push origin v1.2.0
```

You can monitor the workflow in the **Actions** tab of your GitHub repository. Once it completes, the release appears under **Releases** with all assets attached.
