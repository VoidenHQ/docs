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

