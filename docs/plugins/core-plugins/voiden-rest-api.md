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

1. Supports all HTTP methods: **GET, POST, PUT, DELETE, PATCH**, and more.
2. URL builder with path parameters and query string management.
3. Autocomplete-enabled header editor.
4. Body types:
    * JSON
    * XML
    * Form-data
    * URL-encoded
    * Multipart (with file upload support)
    * Binary Files

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

* [`endpoint ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/endpoint-block.md)
* [`headers-table ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/headers-block.md)
* [`query-table ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/query-params-block.md)
* [`path-table ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/path-params-block.md)
* [`url-table ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/url-encoded-block.md)
* [`multipart-table ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/multipart-table-block.md)
* [`json_body ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/json-block.md)
* [`xml_body ↗`](/docs/core-features-section/voiden-blocks/rest-blocks/xml-block.md)

### **Response Panel**

* `Response Body`
* `Response Headers`
* `Request Headers`
* `Request Summary/Security`

The plugin also allows **block extensions**, enabling future customization and community add-ons.

---

## 🔷 Paste Handling

### **cURL Import**

Pattern: `/^curl\s+/i`
Automatically parses cURL commands and converts them into:

* Endpoints
* Headers
* Auth
* Query parameters
* Body

---

# 🔗 Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0"
}
```


