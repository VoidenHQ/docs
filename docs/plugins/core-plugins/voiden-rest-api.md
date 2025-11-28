---
  id: voiden-rest-api
  title: Voiden Rest API
  sidebar_label: Voiden Rest API
---

# Voiden REST API Plugin

The **Voiden REST API Plugin** is a complete, extensible toolkit for building, testing, and visualizing HTTP/REST API requests within Voiden. It provides a powerful request pipeline system, custom block types, environment variable support, cURL import, and full control over request configuration.

---

# 🚀 Key Features

### **HTTP Request Building**

* Supports all HTTP methods: **GET, POST, PUT, DELETE, PATCH**, and more.
* URL builder with path parameters and query string management.
* Autocomplete-enabled header editor.
* Body types:

  * JSON
  * XML
  * Form-data
  * URL-encoded
  * Multipart (with file upload support)

### **Response Visualization**

* Status code display
* Response headers panel
* Pretty-printed body viewer
* Syntax highlighting (JSON & XML)
* Collapsible response sections

### **Productivity Features**

* Environment variables (e.g., `{{base_url}}`)
* Built-in cURL import through paste
* Full integration into Voiden’s request/response pipeline
* Slash commands for quick insertion

---

# 🧩 Capabilities

## 🔷 Block Ownership

This plugin owns **13 custom block types**, enabling structured API request creation and response visualization:

### **Request Blocks**

* `method`
* `url`
* `request`
* `headers-table`
* `query-table`
* `path-table`
* `url-table`
* `multipart-table`
* `json_body`
* `xml_body`

### **Response Blocks**

* `response-status`
* `response-headers`
* `response-body`

The plugin also allows **block extensions**, enabling future customization and community add-ons.

---

## 🔷 Paste Handling

### **cURL Import**

Pattern: `/^curl\s+/i`
Automatically parses cURL commands and converts them into:

* Method
* URL
* Headers
* Auth
* Query parameters
* Body

### **Block-Level Paste Handlers**

* **method** → cleans pasted content and inserts plain text
* **url** → strips formatting and inserts clean URL

---

## 🔷 Request Pipeline Integration

The plugin registers:

### **Build Handler**

Constructs the final HTTP request object using all blocks.

### **Response Handler**

Parses, formats, and visualizes the API response in Voiden.

This makes the REST API plugin fully compatible with Voiden’s pipeline-based execution system.

---

## 🔷 Slash Commands

The plugin adds a **REST API** command group:

* Insert request block
* Insert headers table
* Insert query parameters
* Insert request body

---

# 🔗 Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0"
}
```

---

# 🌟 Highlights

* Comprehensive REST API testing environment
* Visual, structured request building
* Full multipart & file upload support
* cURL → Voiden auto-conversion
* Clean response visualization
* Powered by Voiden SDK pipeline
* Extendable block system

---
