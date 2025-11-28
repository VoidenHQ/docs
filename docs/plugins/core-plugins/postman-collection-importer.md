---
  id: postman-collection-importer
  title: Postman Collection Importer
  sidebar_label: Postman Collection Importer
---

# Postman Collection Importer Plugin

The **Postman Collection Importer** plugin enables smooth migration from **Postman v2.1 JSON collections** into fully native **Voiden .void request files**. It automatically converts folders, variables, requests, headers, and bodies into the Voiden ecosystem, leveraging the REST API plugin for formatting and block generation.

---

## Capabilities

### **UI Enhancements**

Adds a new import button in the left sidebar:

* **Button ID:** `postman-import-btn`
* **Location:** Sidebar (left)
* **Icon:** `PackageImport`
* **Tooltip:** *Import Postman Collection*
* **Description:** Opens a file picker for importing Postman v2.1 JSON files.

---

### **File System Operations**

Automatically creates project structure based on Postman collection hierarchy:

* **Create Directory** — mirrors folder nesting from Postman
* **Write File** — generates `.void` files for individual requests

**Capability Description:** Converts Postman folder/request hierarchy into Voiden's filesystem layout.

---

### **Integration Dependencies**

Depends on the **voiden-rest-api** plugin:

* **Reason:** Required for creating valid REST blocks (headers, bodies, method, etc.)
* **Required:** Yes

---

## Features

### **Import Functionality**

* Import **Postman Collection v2.1 JSON**
* Auto-generate matching folder structure
* Preserve collection hierarchy & request names
* Sanitize file and folder names
* Unlimited nested folder support

### **Request Conversion**

Converts Postman request structure into Voiden-native blocks:

* **HTTP Methods:** GET, POST, PUT, DELETE, PATCH, etc.
* **Headers:** mapped to `headers-table`
* **Query Params:** converted to `query-table`
* **JSON Body:** mapped to `json_body`
* **Form Data:** mapped to `multipart-table`
* **URL-encoded Body**
* **Raw Body Conversion:** auto-detected and converted to proper Voiden block type

### **Processing & Optimization**

* Progress tracking during import
* Batch file creation with system-safe throttling
* Generates `.void` markdown files with proper YAML frontmatter
* Uses `voiden-rest-api` helpers for consistent output formatting

### **Stability & Compatibility**

* Handles malformed field names gracefully
* Supports special characters
* Ensures Voiden-safe path creation

---

## Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0",
  "voiden-rest-api": "^1.0.0"
}
```

---

## Readme Summary

"Import Postman collections (v2.1) and automatically convert them into Voiden .void request files. Supports nested folders, headers, request bodies, and query parameters."

---

If you'd like, I can also produce a **comparison table between OpenAPI and Postman importers**, or merge this into a unified documentation bundle.
