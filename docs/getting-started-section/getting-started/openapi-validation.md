---
id: openapi-validation
title: OpenAPI Schema Validation
sidebar_label: OpenAPI Schema Validation
sidebar_position: 9
---

# OpenAPI Schema Validation 

Voiden supports **OpenAPI Schema Validation** for files generated from OpenAPI imports.  
When you import an OpenAPI `.yaml` or `.json` file and generate Voiden requests, Voiden automatically validates your requests and request bodies **against the schema** on request call.

That means:
- No guessing  
- No assumptions  
- Only what your OpenAPI spec actually defines  

If it’s in the schema, Voiden checks it. If it’s not, Voiden ignores it. Simple and predictable.

---

## How It Works

Once an OpenAPI schema is imported and a `.void` file is generated:

- APIs are separated by each `.void` files  
- Request bodies are generated from the schema  
- Errors and Warnings are shown **after the request is sent**

You get fast feedback while editing—not after things break.

---


## OpenAPI Schema Validation in Voiden 

Getting started is quick and easy:

1. **Open** the generated `.void` file in Voiden.
2. **Run it** using whichever option you prefer:
   -  Press **Cmd + Enter** on macOS  
     **or** **Ctrl + Enter** on Windows/Linux  
   - Click the bright **green Play button** in the toolbar

![openapi_valid](/img/plugins/openapi-collection/openapi-valid.gif)


---

## Supported Validation Rules

Voiden currently supports the following OpenAPI validation checks:

### Validation Support Overview

| Category | Supported Rules |
|-------|----------------|
| **Type Validation** | string, number, integer, boolean, array, object |
| **String Constraints** | minLength, maxLength, pattern, format (email, UUID, URI, date-time), enum |
| **Number Constraints** | minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, enum |
| **Array Constraints** | minItems, maxItems, uniqueItems, items, contains |
| **Object Constraints** | required, properties, additionalProperties, minProperties, maxProperties |
| **Schema Composition** | oneOf, anyOf, allOf, not |
| **Special Rules** | nullable, required vs optional parameters |

---

## What Voiden Validates (and What It Doesn’t)

Voiden validates **only what is explicitly defined** in your OpenAPI specification:
- Required vs optional fields  
- Data types and constraints  
- Allowed and disallowed properties  

Voiden does **not** infer undocumented fields or apply assumptions.  
This keeps validation accurate, predictable, and aligned with your API contract.

---

## Summary

OpenAPI Schema Validation in Voiden ensures your generated `.void` files stay true to your API contract. By validating request bodies, parameters, and structures directly against your OpenAPI schema, Voiden helps you test APIs with confidence—and without surprises.
