---
  id: openapi-collection-importer
  title: OpenAPI Collection Importer
  sidebar_label: OpenAPI Collection Importer
---

# 🔌 OpenAPI Collection Import Plugin

The **OpenAPI Import** plugin (part of the **Voiden Core Plugins Pack**) lets you import your existing API definitions directly from an **OpenAPI** specification file — either JSON or YAML format.  

Easily browse, search, preview, and generate ready-to-use Voiden request files from your OpenAPI documentation.

---

## 🧩 How It Works

1. Open any **OpenAPI** file (`.json` or `.yaml`) inside Voiden.  
2. Once loaded, an **“OpenAPI Preview”** button appears at the top of the editor.  
3. Click the button to open a **preview view in the current tab**, showing all endpoints grouped by **tags**.  
4. You can click **Close** or press **Esc** anytime to exit the preview and return to your OpenAPI file content.

---

## 🧭 OpenAPI Preview View

The preview displays your API endpoints in an organized, interactive view.

### Features
- ✅ **Selectable Requests** — Use checkboxes to choose which endpoints to include in your Voiden project.  
- 🏷️ **Grouped by Tags** — Endpoints are automatically grouped by their OpenAPI tags.  
- 🔍 **Expandable Details** — Click **Show** on any request to view:
  - Request parameters, examples, and schemas  
  - Response details for each status code  
  - Example responses and schema definitions (based on the original OpenAPI file)
- 🔎 **Search & Filter** — A search bar at the top lets you quickly filter endpoints by name, method, or tag. This makes it easy to find specific APIs in large collections.

You can also:
- **Select All** requests within a single tag.  
- View endpoints by method type (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc.).

![Alt text](/img/plugins/openapi-collection/openapi-plugin.png)

---

## ⚙️ Generating Voiden Requests

After selecting the desired endpoints:

1. Click the **Generate** button at the bottom of the preview view.  
2. Voiden automatically creates a new folder in your workspace named after your **collection name** (from the OpenAPI file).  

   Example: A collection named **Pet Store** will create a folder named **pet-store/**.  
3. Inside that folder:
   - Each **tag** becomes its own subfolder.  
   - Each endpoint within that tag becomes an individual `.void` request file.

If a folder with the same name already exists, Voiden will display a popup asking whether you want to:
- **Overwrite** the existing folder (replace all existing files), or  
- **Create a New Folder**, which generates a new folder with the exported files.

![Alt text](/img/plugins/openapi-collection/openapi-plugin2.png)

---

## 🚀 Using the Generated Requests

Each generated `.void` file represents a complete Voiden request, pre-filled with:
- Method (`GET`, `POST`, etc.)  
- Path and parameters  
- Request body and example data (if defined in the OpenAPI spec)

You can open any `.void` file directly and start testing your API instantly inside Voiden — no manual setup required.

![Alt text](/img/plugins/openapi-collection/openapi-plugin3.png)

---

## 💡 Why Use OpenAPI Import?

- **Faster onboarding** — Import full API collections in seconds  
- **Consistent structure** — Automatically organized by tags  
- **Searchable preview** — Instantly filter endpoints by name or method  
- **Interactive details** — Inspect parameters, schemas, and responses before generating  
- **Editable requests** — All generated `.void` files remain fully customizable

---

## Example Workflow

1. Import `openapi.yaml`  
2. Click **OpenAPI Preview**  
3. Use the **search bar** to filter endpoints (for example, type “auth”)  
4. Select desired endpoints under the `users` and `auth` tags  
5. Click **Generate**  
6. Explore and test requests under the newly created **collection-named folder** (for example, `pet-store/`)  

If a folder with the same name already exists, choose between **Overwrite** or **New Folder** in the popup prompt.  
To return to your OpenAPI file, click **Close** or press **Esc** from the preview view.

---

With the **OpenAPI Import Plugin**, Voiden turns your existing API documentation into ready-to-test requests — making API testing smoother, faster, and more connected.