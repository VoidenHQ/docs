# Simple Assertions Plugin

The **Simple Assertions** plugin provides an easy and intuitive way to validate HTTP responses directly inside Voiden. It allows you to verify not only response bodies, but also **status**, **status codes**, **headers**, and **response time**, all from a clean, table-based interface integrated into the response panel.

This makes assertion testing lightweight, readable, and tightly coupled with real API responses—without adding unnecessary complexity.

---

## What You Can Assert

The Simple Assertions plugin now supports assertions on multiple parts of an HTTP response:
- **Status Code** (e.g. 200, 201, 400, 500)
- **Status Text** (success or failure state)
- **Response Time** (performance checks)
- **Headers** (specific header values)
- **Body** (JSON)

This gives you both **functional validation** and **basic performance checks** in one place.

---

## Key Features

### **Assertion Table Interface**

- Clean, easy-to-read table format:
- Insertable using the `/assertions` slash command

![assertion](/img/plugins/openapi-collection/simple-assertion.gif)

The table format keeps tests readable, even when you add multiple assertions.

---

### What Can You Check?

Simple Assertions let you check the parts of a response that actually matter—without digging through raw output or logs. You choose the field, set what you expect, and Voiden takes care of the rest.

Here’s what you can assert against:

### 1. Status / Status Code
Check whether the request succeeded or failed using the HTTP status code. This is great for confirming expected outcomes like `200 OK` or handling error cases such as `401 Unauthorized`.

![statuscheck](/img/plugins/openapi-collection/check-status.gif)

### 2. Status Text
Check the human-readable status message returned by the server, such as `OK`, `Created`, or `Bad Request`. This adds an extra layer of clarity beyond just the numeric status code.

![checkstatus](/img/plugins/openapi-collection/checktext.gif)

### 3. Response Time / Duration
Check how long the request took to complete. This helps you keep an eye on performance and spot slow responses before they become an issue.

![responsetime](/img/plugins/openapi-collection/responsetime.gif)

### 4. Response Headers
Check specific response headers and their values, such as `Content-Type`, authentication headers, or any custom metadata your API returns.

![headerconnection](/img/plugins/openapi-collection/headercoonection.gif)

### 5. Response Body
Check the actual response content. Depending on the format, you can validate JSON fields to make sure the response structure and data are exactly what you expect.

![responsebody](/img/plugins/openapi-collection/responsebody.gif)



In short, Simple Assertions let you check not just *what* the API returns, but *how* it behaves—clearly, quickly, and without unnecessary noise.

---

## Why Use Simple Assertions

- Validate API behavior without writing scripts
- Catch incorrect responses early
- Verify performance with response time checks
- Ensure headers and status codes are correct
- Keep tests close to real responses

Simple Assertions are designed to be quick, visual, and easy to maintain—ideal for both exploratory testing and everyday API validation.

---

### **Supported Operators**

Simple Assertions support a wide range of operators, along with familiar aliases, so you can write checks in a way that feels natural to you. The table below groups operators by purpose to make them easy to scan and understand.


| Category | Purpose | Supported Operators |
|--------|--------|---------------------|
| **Equality** | Exact value matching | `equals`, `eq`, **==**, **===** |
| **Inequality** | Value must not match | `not-equals`, `ne`, **!=**, **!==** |
| **Contains** | Partial value matching | `contains`, `includes` |
| **Not Contains** | Value must not contain | `not-contains`, `not-includes` |
| **Starts With** | Prefix validation | `starts-with`, `startswith` |
| **Ends With** | Suffix validation | `ends-with`, `endswith` |
| **Pattern Match** | Regex-based validation | `matches`, `regex` |
| **Exists** | Field presence check | `exists`, `is-defined` |
| **Not Exists** | Field absence check | `not-exists`, `is-null`, `is-undefined` |
| **Greater Than** | Numeric comparison | `greater-than`, `gt`, `>` |
| **Less Than** | Numeric comparison | `less-than`, `lt`, `<` |
| **Greater or Equal** | Inclusive comparison | `greater-equal`, `gte`, **>=** |
| **Less or Equal** | Inclusive comparison | `less-equal`, `lte`, **&lt;=** |
| **Empty Check** | Empty value validation | `is-empty`, `empty` |
| **Not Empty** | Value must exist | `not-empty` |
| **Truthy Check** | Logical truth check | `is-truthy`, `truthy` |
| **Falsy Check** | Logical false check | `is-falsy`, `falsy` |
| **Type Check** | Data type validation | `type-is`, `typeof` |

---

## Summary

The Simple Assertions plugin in Voiden lets you validate **status**, **status codes**, **response time**, **response headers**, and **response bodies** using a simple table-based interface. With clear operators and visual feedback built directly into the response panel, it provides a practical and approachable way to add confidence to your API testing workflow.
