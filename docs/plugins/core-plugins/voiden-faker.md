---
  id: voiden-faker
  title: Voiden Faker
  sidebar_label: Voiden Faker
---

# Voiden Faker

The **Voiden Faker** core plugin enables developers to generate dynamic, realistic test data directly inside Voiden HTTP requests. It integrates seamlessly into the request lifecycle, allowing any text field to be populated using Faker.js expressions.

**Type:** Core Plugin

Voiden Faker enhances the request-building experience by letting users embed Faker.js function calls inside request bodies, headers, params, and other supported fields.

Example usage:

```
{{$faker.person.firstName()}}
{{$faker.internet.email()}}
{{$faker.location.city()}}
```

These values are automatically evaluated during the `pre-send` stage of the request pipeline.

---

## ✨ Features

* Generate fake data using **Faker.js**
* Works in:

  * Headers
  * Query parameters
  * Path parameters
  * JSON bodies
  * Form data
* Supports advanced Faker namespaces like:

  * `person`
  * `internet`
  * `location`
  * `number`
  * And more
* Autocomplete support for Faker methods
* Inline suggestions while editing requests
* Evaluated securely during the request pre-send lifecycle

---

## 🧩 Capabilities

### **Pipeline Hooks**

The plugin registers a `pre-send` hook:

* Evaluates all `{{$faker.*}}` expressions
* Replaces them with generated values before the request is executed

### **Editor Enhancements**

* **Autocomplete:** Provides suggestions for Faker namespaces and methods
* **Suggestions:** Inline metadata, function hints, and dynamic method browsing

---

## 📘 Usage Examples

### **Example 1: Generate a Random Name**

```json
{
  "username": "{{$faker.person.firstName()}}"
}
```

### **Example 2: Fake Email in Headers**

```
Authorization: Bearer {{$faker.string.uuid()}}
X-User-Email: {{$faker.internet.email()}}
```

### **Example 3: Fake Data in Query Params**

```
?city={{$faker.location.city()}}&age={{$faker.number.int()}}
```

---

## 🔒 Security & Stability

* Runs strictly in a sandboxed environment
* Only executes pure Faker.js functions
* No access to external systems or file structures

---

## 📄 Readme

*Generates fake data using Faker.js in your HTTP requests. Use `{{$faker.person.firstName()}}` syntax in headers, query params, path params, and request bodies.*

---

If you'd like, I can generate:

* A combined documentation page for all Voiden core plugins
* Developer docs for implementing your own plugins
* Marketplace listing format
* Structured JSON → Markdown automation
