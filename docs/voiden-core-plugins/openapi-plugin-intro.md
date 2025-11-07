---
id: openapi-import
title: OpenAPI Import Plugin
sidebar_label: OpenAPI Import
sidebar_position: 1
---

# 🔌 OpenAPI Import Plugin

The **OpenAPI Import** plugin (part of the **Voiden Core Plugins Pack**) lets you import your existing API definitions directly from an **OpenAPI** specification file — either JSON or YAML format.  

Easily browse, preview, and generate ready-to-use Voiden request files from your OpenAPI documentation.

---

### 🧩 How It Works

1. Open any **OpenAPI** file (`.json` or `.yaml`) inside Voiden.  
2. Once loaded, a **“Generate OpenAPI Preview”** button appears at the top of the editor.  
3. Click the button to open a **right-side preview panel** — a mini Swagger-like interface showing all endpoints grouped by **tags**.

---

### 🧭 OpenAPI Preview Panel

The preview panel displays your API endpoints in an organized, interactive view:

- ✅ **Selectable Requests** — Use checkboxes to choose which endpoints to include in your Voiden project.  
- 🏷️ **Grouped by Tags** — Endpoints are automatically grouped by their OpenAPI tags.  
- 🔍 **Expandable Details** — Click **Show** on any request to view:
  - Request **parameters**, **examples**, and **schemas**  
  - Response details for each **status code**  
  - Example responses and schema definitions (based on data in the original OpenAPI file)

You can also:
- **Select All** requests within a single tag.
- View endpoints by method type (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, etc.).

![Alt text](/img/voiden-plugins/openapi-plugin.png)

---

### ⚙️ Generating Voiden Requests

After selecting the desired endpoints:

1. Click the **Generate** button at the bottom of the preview panel.  
2. Voiden automatically creates a new folder in your workspace:

```
openapi-import/
```

3. Inside that folder:
- Each **tag** becomes its own subfolder.
- Each endpoint within that tag becomes an individual `.void` request file.

For example:

![Alt text](/img/voiden-plugins/openapi-plugin2.png)

---

### 🚀 Using the Generated Requests

Each generated `.void` file represents a complete Voiden request, pre-filled with:
- Method (`GET`, `POST`, etc.)
- Path and parameters
- Request body and example data (if defined in the OpenAPI spec)

You can open any `.void` file directly and start testing your API instantly inside Voiden — no manual setup required.


![Alt text](/img/voiden-plugins/openapi-plugin3.png)


---

### 💡 Why Use OpenAPI Import?

- **Faster onboarding** — Import full API collections in seconds  
- **Consistent structure** — Automatically organized by tags  
- **Interactive preview** — Inspect parameters, schemas, and responses before generating  
- **Editable requests** — All generated `.void` files remain fully customizable

---

### Example Workflow

1. Import `openapi.yaml`  
2. Click **Generate OpenAPI Preview**  
3. Select endpoints under the `users` and `auth` tags  
4. Click **Generate**  
5. Explore and test requests under the `openapi-import` folder  

---

With the **OpenAPI Import Plugin**, Voiden turns your existing API documentation into ready-to-test requests — making API testing smoother, faster, and more connected.