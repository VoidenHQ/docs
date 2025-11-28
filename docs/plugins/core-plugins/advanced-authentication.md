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

## 🔷 Slash Commands

The plugin adds a dedicated **Advanced Authentication** slash command group:

* Insert authorization  [`auth-block ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth.md)
* Insert Bearer Token auth [`auth-bearer ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_bearer.md)
* Insert Basic Auth [`auth-basic ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_basic.md)
* Insert API Key auth [`auth-api-key ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_api_key.md)
* Insert OAuth 2.0 auth [`auth-oauth2 ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_oauth2.md)
* Insert OAuth 1.0 auth [`auth-oauth1 ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_oauth1.md)
* Insert Digest Auth [`auth-digest ↗`](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_digest.md)

These commands make inserting auth blocks fast and easy during API request creation.

---

# 🔗 Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0"
}
```

