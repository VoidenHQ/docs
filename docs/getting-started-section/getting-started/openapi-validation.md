---
id: openapi-validation
title: OpenAPI Schema Validation
sidebar_label: OpenAPI Schema Validation
sidebar_position: 9
---

# OpenAPI Schema Validation

When you import an OpenAPI `.yaml` or `.json` file and generate Voiden requests, Voiden automatically validates your request bodies **against the schema** on every call — no extra setup required.

No guessing. No assumptions. Just what your spec actually defines.

---

## How It Works

Once you've imported an OpenAPI schema and generated a `.void` file:

- Each API is separated into its own `.void` file
- Request bodies are pre-generated directly from the schema
- Validation errors and warnings appear **after each request is sent**, inline in the response panel

You get immediate feedback while you're working — not after something breaks in a way that's harder to trace.

---

## Running Validation

Open the generated `.void` file and run a request:

- **Keyboard:** `Cmd + Enter` on macOS / `Ctrl + Enter` on Windows & Linux
- **Mouse:** click the green **▶ Play** button in the toolbar

Voiden will validate the request body against the schema automatically.

<img src="/img/plugins/openapi-collection/openapi-valid.gif" alt="OpenAPI validation in action" style={{width: '80%', borderRadius: '12px', marginTop: '8px'}} />

---

## Supported Validation Rules

Voiden covers a broad set of OpenAPI validation checks out of the box:

| Category | Supported Rules |
|---|---|
| **Type Validation** | `string`, `number`, `integer`, `boolean`, `array`, `object` |
| **String Constraints** | `minLength`, `maxLength`, `pattern`, `format` (email, UUID, URI, date-time), `enum` |
| **Number Constraints** | `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, `multipleOf`, `enum` |
| **Array Constraints** | `minItems`, `maxItems`, `uniqueItems`, `items`, `contains` |
| **Object Constraints** | `required`, `properties`, `additionalProperties`, `minProperties`, `maxProperties` |
| **Schema Composition** | `oneOf`, `anyOf`, `allOf`, `not` |
| **Special Rules** | `nullable`, required vs optional parameters |

---

## What Gets Validated — and What Doesn't

Voiden validates **only what is explicitly defined** in your OpenAPI spec:

- Required vs optional fields
- Data types and their constraints
- Allowed and disallowed properties

:::info No assumptions
Voiden never infers undocumented fields or applies validation beyond what your schema defines. This keeps behaviour predictable and your tests aligned with your actual API contract.
:::

---

## Why This Matters

Most API testing tools let you send anything to an endpoint. Voiden ties your requests to the schema you already wrote, which means:

- You catch malformed request bodies **before** they reach your server
- Your `.void` files act as living, validated documentation
- Onboarding a new team member means handing them a file — the schema tells them exactly what's valid

The goal isn't to restrict what you can do. It's to make the right thing the easy thing.
