---
  id: insomnia-imports
  title: Insomnia Imports
  sidebar_label: Insomnia Imports
  sidebar_position: 4
---

# Import from Insomnia

:::info Community Plugin
This feature is powered by the [Insomnia Collection Importer](/docs/plugins/community-plugins/insomnia-importer) — a community-built plugin. Make sure it's installed in Voiden before you get started.
:::

Already have collections in Insomnia? You don't have to start from scratch. Voiden can import your existing Insomnia v4 exports and convert them into ready-to-use `.void` files — folder structure, headers, query params, request bodies, and authentication all included.

---

## How to Import

1. In Insomnia, go to **Application → Export Data → Current Workspace** and export as **Insomnia v4 JSON**
2. Drop the exported `.json` file into your active Voiden project and open it
3. Click **"Import into Voiden"** in the top-right corner
4. Voiden creates a folder matching your workspace name and populates it with `.void` files — one per request

That's it. Your entire Insomnia collection is now in Voiden and ready to run.