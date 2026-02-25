---
  id: intro
  title: Introduction
  sidebar_label: Introduction
---

# Voiden Plugins

Voiden provides a powerful and flexible plugin architecture that allows both internal teams and the community to extend the platform with new features, UI components, integrations, and automation workflows.

This document gives a high-level overview of how plugins work in Voiden, our core plugin offerings, and the guidelines for community-created plugins.

---

## What Are Voiden Plugins?

Voiden is designed to be open and extensible. To achieve that, we have decided to enable plugins. 
Voiden plugins are modular extensions that allow developers to add new capabilities to the Voiden ecosystem **without modifying the core system**. These plugins can:

* Add new commands or tools
* Extend existing UI or editor functionality
* Provide integrations with external services
* Customize behavior inside the Voiden environment
* Automate tasks or workflows

Plugins are isolated, secure, and follow Voiden’s strict plugin lifecycle rules to maintain platform stability.

---

## Core Plugins (Official Plugins)

Voiden comes with a curated set of **core plugins** that are useful for everyone working with APIs. These plugins are:

* Built and maintained by the Voiden team
* Optimized for performance and security
* Pre-installed for all users

Examples of core plugins include:

* **[Voiden REST API](/docs/plugins/core-plugins/voiden-rest-api.md)** – Provides easy-to-use blocks and utilities to make REST API requests, including GET, POST, PUT, DELETE, headers, and dynamic variables. 
* **[Advanced Authentication](/docs/plugins/core-plugins/advanced-authentication.md)** – Offers built‑in authentication flows, token management, API key handling, and secure credential storage.
* **[Markdown Preview](/docs/plugins/core-plugins/md-preview.md)** – Renders real‑time markdown previews with formatting utilities, syntax highlighting, and editor enhancements.
* **[OpenAPI Collection Import](/docs/plugins/core-plugins/openapi-collection-importer.md)** – Allows users to import OpenAPI specifications to auto‑generate API blocks, endpoints, and request structures.
* **[Postman Collection Import](/docs/plugins/core-plugins/postman-collection-importer.md)** – Lets users import Postman collections to instantly create runnable API requests inside Voiden.
* **[Voiden Faker](/docs/plugins/core-plugins/voiden-faker.md)** – Provides a wide library of fake data generators (names, emails, numbers, lorem text, JSON mocks, etc.) for testing APIs and workflows without real data.

These plugins are the foundation of Voiden and ensure consistency across all installations.

---

## Community Plugins

Voiden plans to open the plugin creation to more developers. Community plugins will allow endless customization and innovation. This is what will make Voiden really customizable and extensible. 

### What Community Plugins WILL Do

Voiden will enable community developers to build plugins that:

* Add new UI panels or widgets
* Provide new terminal commands
* Connect Voiden to external APIs or cloud services
* Create automation (e.g., auto-format, code runners, watchers)
* Theme or customize the Voiden interface

### Plugin Submission Workflow - More information will follow!

We will let the community know when we are ready to start accepting new plugins. But one thing is for sure: To maintain quality and security, all community plugins will go through a **review process**:

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

## Plugin Marketplace - More Info will follow here as well...

Once approved, all community plugins will be published to the **Voiden Plugin Marketplace**, where users can:

* Browse plugins by category
* Install, update, or remove plugins
* View ratings and reviews

The marketplace will ensure discoverability and keep the plugin ecosystem vibrant. That's the Voiden mission for creating a super extensible API Client that fits everyone's needs. 

---

## Summary

* Voiden currently supports **core** plugins
* Voiden plans to support **community** plugins.
* Core plugins are official, optimized, and pre-installed.
* Community plugins will allow developers to extend Voiden with custom functionality.
* Every community plugin will undergo an **approval process**.
* Plugins run in a sandboxed environment to maintain platform stability.

Voiden’s plugin system makes the platform truly extensible, powerful, and community‑driven.

