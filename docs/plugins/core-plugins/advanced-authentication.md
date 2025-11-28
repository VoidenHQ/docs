---
  id: advanced-authentication
  title: Advanced Authentication
  sidebar_label: Advanced Authentication
---

# Advanced Authentication Plugin

The **Advanced Authentication** plugin provides comprehensive authentication support for HTTP and REST API requests inside Voiden. It includes everything from simple Bearer Tokens to complex enterprise-grade authentication schemes such as OAuth, AWS SigV4, NTLM, Hawk, and more.

---

# 🚀 Key Features

### **Supported Authentication Types**

* **Bearer Token** authentication
* **Basic Auth** (username/password)
* **API Key** authentication (header or query parameter)
* **OAuth 2.0** (supports custom token types)
* **OAuth 1.0** with signature generation
* **Digest Authentication**
* **AWS Signature v4**

### **Additional Features**

* Environment variable substitution in authentication fields
* Inherit authentication configuration from parent collections
* Quick auth type switching via dropdown
* Extensible authentication block type

---

# 🧩 Capabilities

## 🔷 Block Ownership

The plugin owns the following block type:

* `auth`

Extensions to this block type are **allowed**, enabling community plugins to introduce new authentication providers.

---

## 🔷 Slash Commands

The plugin adds a dedicated **Advanced Authentication** slash command group:

* Insert authorization block
* Insert Bearer Token auth
* Insert Basic Auth
* Insert API Key auth
* Insert OAuth 2.0 auth
* Insert OAuth 1.0 auth
* Insert Digest Auth
* Insert AWS Signature auth

These commands make inserting auth blocks fast and easy during API request creation.

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

* Supports enterprise-grade authentication workflows
* Easily switch between multiple auth types
* Highly configurable and compatible with Voiden's request pipeline
* Useful for APIs requiring secure or complex signing
* Fully integrated with collection-level inheritance and environment variables

---
