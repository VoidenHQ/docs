---
  id: openapi-collection-importer
  title: OpenAPI Collection Importer
  sidebar_label: OpenAPI Collection Importer
---

# OpenAPI Collection Importer Plugin

The **OpenAPI Collection Importer** plugin enables seamless migration from OpenAPI (v3.0) JSON specifications into native **Voiden .void request files**. It automatically converts folders, requests, headers, parameters, and bodies into Voiden-compatible structures using the REST API plugin.

---

## Capabilities

### **UI Enhancements**

Adds a new button to the left sidebar:

* **Button ID:** `openapi-import-btn`
* **Location:** Sidebar (left)
* **Icon:** `PackageImport`
* **Tooltip:** *Import OpenAPI Collection*
* **Function:** Opens a file picker and initiates collection import.

---

### **File System Operations**

The plugin performs controlled filesystem modifications:

* **Create Directory** — mirrors OpenAPI folder nesting
* **Write File** — generates `.void` request files

**Capability Description:** Converts OpenAPI hierarchy into Voiden's folder and file system.

---

### **Integration Dependencies**

Relies on the **voiden-rest-api** plugin:

* **Reason:** Needed for generating REST API blocks (headers, methods, bodies, etc.)
* **Dependency:** Required

---

## Features

### **Import Functionality**

* Import OpenAPI **v3.0 JSON** specifications
* Auto-create folders matching OpenAPI hierarchy
* Convert each request to `.void` files
* Preserve all folder & request names
* Sanitize names for filesystem safety
* Unlimited nested folder support

### **Request Conversion**

Supported conversions include:

* **HTTP Methods:** GET, POST, PUT, DELETE, PATCH, etc.
* **Headers:** mapped to `headers-table`
* **Query Parameters:** converted to `query-table`
* **JSON Bodies:** converted to `json_body`
* **Form Data:** converted to `multipart-table`
* **URL-encoded Data**
* **Path Parameters**
* Full compatibility with Voiden REST blocks

### **Generation & Processing**

* Batch file creation with throttling
* Progress tracking during import
* Generates markdown with full YAML frontmatter
* Uses **voiden-rest-api helpers** for consistent block formatting

### **Stability Enhancements**

* Handles special characters
* Safely creates nested directories
* Ensures valid `.void` formatting

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

"Import OpenAPI collections (v3.0) and convert them into Voiden .void request files. Supports nested folders, headers, request bodies, and query parameters."

---

If you'd like me to add diagrams, import workflow illustrations, or a step-by-step usage guide, just let me know!
