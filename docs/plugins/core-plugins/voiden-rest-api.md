---
  id: voiden-rest-api
  title: Voiden Rest API
  sidebar_label: Voiden Rest API
---

# Voiden REST API Plugin

The **Voiden REST API Plugin** is a complete, extensible toolkit for building, testing, and visualizing HTTP/REST API requests within Voiden. It provides a powerful request pipeline system, custom block types, environment variable support, cURL import, and full control over request configuration.

---

# Key Features

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
* [Response body language override](#response-body-language-override)

### **Productivity Features**

* Environment variables (e.g., `{{base_url}}`)
* Built-in cURL import through paste
* Full integration into Voiden’s request/response pipeline
* Slash commands for quick insertion

---

# Capabilities

## Block Ownership

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

## Response Body Language Override

Voiden normally figures out how to render the response body on its own — it reads the `Content-Type` header, sees `application/json`, and gives you nicely formatted JSON. Simple.

But servers aren't always that cooperative. Sometimes you get `text/plain` back even though the body is perfectly valid JSON. Sometimes the content type is just wrong. Now you can tell Voiden exactly how you want the body rendered, no matter what the server says.

### How to Use It

In the response panel, there's a **language selector** sitting at the top of the response body section. Click it, pick what you want, and Voiden re-renders the body instantly.

![response-language](/img/plugins/response-language.png)

- **Auto** — Voiden decides based on `Content-Type` (this is the default)
- **Raw** — unprocessed output exactly as received
- **JSON** — pretty-print with JSON syntax highlighting
- **XML** — format as XML
- **HTML** — render as HTML markup
- **YAML** — format as YAML
- **JavaScript** — format with JavaScript syntax highlighting
- **Python** — format with Python syntax highlighting
- **Plain Text** — raw output, no formatting
- **Hex** — display the response as a hexadecimal representation
- **Base64** — display the response as a Base64-encoded string

This is purely a display thing — it changes how the body looks, not what it actually is. The real response data is untouched, and the override doesn't carry over to your next request.

### When It Comes in Handy

- The server sends `Content-Type: text/plain` but the body is JSON — flip it to JSON and actually read it
- You're dealing with an API that returns inconsistent content types
- You just want to eyeball the raw output without any formatting getting in the way

---

## Paste Handling

### **cURL Import**

Pattern: `/^curl\s+/i`
Automatically parses cURL commands and converts them into:

* Endpoints
* Headers
* Auth
* Query parameters
* Body

---

# Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0"
}
```


