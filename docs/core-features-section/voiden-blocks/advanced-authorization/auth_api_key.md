---
  id: api-key-block
  title: Api Key Authorization Block
  sidebar_label: Api Key Authorization Block
  sidebar_position: 1
---

# API Key Authentication in Voiden

Voiden supports **API Key Authentication** as a secure and straightforward way to authenticate requests made to your workspace APIs. This method allows clients to include a unique key with each request to verify their identity and access.

---

## 🔐 What Is API Key Authentication?

API Key Authentication uses a unique, randomly generated string (the API key) that identifies the calling project or user. When included in a request, Voiden checks the key and grants access if it’s valid.

API Keys are:

* Easy to generate
* Easy to revoke
* Suitable for server-to-server communication
* Not tied to user accounts

---

## 🚀 How Voiden Implements API Key Auth

Voiden provides first-class support for API Key authentication across supported runtimes and API handlers.

### **1. Create API Key**

In your Voiden Dashboard:

1. Navigate to **Settings → API Keys**.
2. Click **Generate API Key**.
3. Copy and store it securely (you cannot view it again).

---

## 📥 Using API Keys in Requests

Include the API key block in the .void as :

> SCREENSHOT ABOUT THE COMMAND
---

## 🔒 Security Recommendations

* Store keys in **environment variables**.
* Rotate keys periodically.
* Revoke immediately if exposed.

---

## 🛑 When Not to Use API Keys

API Keys are not ideal for:

* End-user authentication
* Authorization based on roles/permissions

For user-based authentication, Voiden recommends **OAuth**, **JWT**, or **Session-based authentication**.

---

## 🧾 Summary

Voiden supports API Key Authentication as a simple and effective method for authenticating backend or automated services. With easy generation and secure usage, API Keys allow safe and controlled access to your Voiden-powered APIs.

If you need advanced authentication features, consider integrating with Voiden’s other auth mechanisms.
