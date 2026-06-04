---
id: overview
title: Introduction
sidebar_label: Introduction
sidebar_position: 1
---

# Welcome to Community Plugins

Community plugins are built by developers like you — extending Voiden with new blocks, workflows, and integrations that the core team hasn't built yet. Every plugin listed here was submitted by the community and approved by the Voiden team.

## How to build your own plugin

Getting started is straightforward with the [`@voiden/create-plugin`](/docs/developer-tools/create-plugin/create-plugin-overview) scaffolding tool. It sets up everything you need — the right folder structure, a local dev environment, and a build pipeline — so you can focus on writing the plugin itself.

Head over to the **[@voiden/create-plugin docs](/docs/developer-tools/create-plugin/create-plugin-overview)** to get started.

## How your plugin ends up here

Once your plugin is ready and your repo has a `README.md`, here's how it gets listed in the docs:

1. **Submit a PR** to [VoidenHQ/plugin-registry](https://github.com/VoidenHQ/plugin-registry) adding your plugin entry to `extensions.json`
2. **The Voiden team reviews** and approves your PR
3. **Your plugin page goes live automatically** — the docs fetch your `README.md` directly from your repo and publish it here, no manual step required

Keep your `README.md` up to date and it will always reflect the latest version in the docs.
