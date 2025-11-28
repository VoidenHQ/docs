---
  id: intro
  title: Introduction
  sidebar_label: Introduction
---

# Voiden Plugins

Voiden provides a powerful and flexible plugin architecture that allows both internal teams and the community to extend the platform with new features, UI components, integrations, and automation workflows.

This document gives a high-level overview of how plugins work in Voiden, our core plugin offerings, and the guidelines for community-created plugins.

---

## 🔌 What Are Voiden Plugins?

Voiden plugins are modular extensions that allow developers to add new capabilities to the Voiden ecosystem **without modifying the core system**. These plugins can:

* Add new commands or tools
* Extend existing UI or editor functionality
* Provide integrations with external services
* Customize behavior inside the Voiden environment
* Automate tasks or workflows

Plugins are isolated, secure, and follow Voiden’s strict plugin lifecycle rules to maintain platform stability.

---

## 🧩 Core Plugins (Official Plugins)

Voiden ships with a curated set of **core plugins** that are:

* Built and maintained by the Voiden team
* Optimized for performance and security
* Pre-installed for all users

Examples of core plugins include:

* **Voiden REST API** – Provides easy-to-use blocks and utilities to make REST API requests, including GET, POST, PUT, DELETE, headers, and dynamic variables.
* **Advanced Authentication** – Offers built‑in authentication flows, token management, API key handling, and secure credential storage.
* **Markdown Preview** – Renders real‑time markdown previews with formatting utilities, syntax highlighting, and editor enhancements.
* **OpenAPI Collection Import** – Allows users to import OpenAPI specifications to auto‑generate API blocks, endpoints, and request structures.
* **Postman Collection Import** – Lets users import Postman collections to instantly create runnable API requests inside Voiden.
* **Voiden Faker** – Provides a wide library of fake data generators (names, emails, numbers, lorem text, JSON mocks, etc.) for testing APIs and workflows without real data.

These plugins form the foundation of Voiden and ensure consistency across all installations.

---

## 🌍 Community Plugins

Voiden encourages developers from around the world to contribute plugins. Community plugins allow endless customization and innovation.

### What Community Plugins Can Do

Community developers can build plugins that:

* Add new UI panels or widgets
* Provide new terminal commands
* Connect Voiden to external APIs or cloud services
* Create automation (e.g., auto-format, code runners, watchers)
* Theme or customize the Voiden interface

### Plugin Submission Workflow

To maintain quality and security, all community plugins go through a **review process**:

1. **Developer Submits Plugin**

   * Submission includes code, metadata, permission requirements, and a description.

2. **Inspection by Voiden Team**

   * We check for:

     * Security vulnerabilities
     * Performance issues
     * Unnecessary permissions
     * Code stability and compatibility

3. **Go / No-Go Decision**

   * **Go** → Plugin is approved, published, and becomes available in the Voiden Plugin Marketplace.
   * **No-Go** → Plugin is rejected with feedback and suggestions for improvement.

This ensures that plugins remain safe and reliable for all users.

---

## 📦 Plugin Marketplace

Once approved, community plugins are published to the **Voiden Plugin Marketplace**, where users can:

* Browse plugins by category
* Install, update, or remove plugins
* View ratings and reviews

The marketplace ensures discoverability and keeps the plugin ecosystem vibrant.

---

## 📘 Summary

* Voiden supports both **core** and **community** plugins.
* Core plugins are official, optimized, and pre-installed.
* Community plugins allow developers to extend Voiden with custom functionality.
* Every community plugin undergoes an **approval process** for safety and performance.
* Plugins run in a sandboxed environment to maintain platform stability.

Voiden’s plugin system makes the platform truly extensible, powerful, and community‑driven.

