---
  id: environment-variables
  title: Environment Variables
  sidebar_label: Environment
  sidebar_position: 2
---

# Environment Variables

Environment variables let you manage different configurations for various deployment environments (development, staging, production) without changing your code.

---

## Setting Your Environment

The environment selector lives in the **top navigation bar**, right next to the recent project selector. Click it and a card pops up where you can pick the profile and environment you want to work in.

You'll see all your created profiles and their environments listed on the card — just click the one you need and Voiden switches over instantly.

![select-envs](/img/voiden-blocks/env-variable/select-env.gif)

At the bottom of the card you'll also find an **Edit Environment** option. Hit that to open up a full view of all your environments and runtime variables in one place — handy when you want to review, tweak, or manage everything without leaving your workflow.

---

## Profiles

Voiden lets you create different profiles to organise your environments however makes sense for your workflow. Think of a profile as a named collection — you can set one up for a specific project, a team, or a context like personal vs work.

![profile-env](/img/voiden-blocks/env-variable/profile-env.png)

To switch between profiles, head to the **top right corner** of the app. You'll find a profile selector there — click it to see all your created profiles and pick the one you want to work in. Everything updates to match that profile straight away.

---

## Managing Your Environments

All your environments live in the **left panel**, so they're always within reach. No digging through menus — just glance left and everything is right there.

### Display Name
You can give each environment a display name to make it easy to tell apart at a glance. Instead of seeing a plain file name, you'll see whatever friendly name you set. Great when you have multiple environments and want to keep things clear.

### Public or Private

Every environment can be set to either **public** or **private**, giving you control over who can see it.

- **Public** — the environment is visible to everyone who has access to the project. Good for shared configs like staging or production that the whole team needs.
- **Private** — the environment is only visible to you. Perfect for personal credentials, local overrides, or anything you'd rather keep to yourself.

<img src="/img/voiden-blocks/env-variable/visibility-env.png" alt="visibility-env" style={{borderRadius: "12px"}} />

Just set the visibility when creating or editing an environment and Voiden handles the rest.

### Child Environments

Voiden supports child environments, so you can build on top of an existing environment without starting from scratch. 

To create one, find the **+** icon next to any parent environment in the left panel and click it. A new child environment gets created under that parent, inheriting its context while giving you a separate space to work in.

---

## Where Environment Files Live

All your environment YAML files are tucked away inside a hidden **`.voiden/`** folder at the root of your project. Nice and out of the way — you'll never accidentally bump into them while working on your actual files.

### Git Takes Care of Itself

Here's the part that's easy to love — Voiden automatically manages your `.gitignore` so you never have to worry about accidentally committing something you shouldn't.

- **Private environments** get added to `.gitignore` on their own. They stay on your machine, full stop.
- **Public environments** are left out of `.gitignore` so your team can commit and share them without any extra steps.

Voiden patches the `.gitignore` automatically in three situations:
- When you create a new environment profile
- When you save changes to an environment
- When a new `.gitignore` shows up at the project root

Set it up once and forget about it — Voiden keeps everything in the right place.

## How Variables are Resolved

- Local variables **always override** environment variables
- Environment variables override default global variables
- This ensures you can have environment-specific values while still allowing local overrides for testing

---

## Creating Environment Files

Environment files should always start with .env followed by the environment name.
For example:

- `.env` → Global defaults shared across all environments
- `.env.dev` → Development environment
- `.env.staging` → Staging environment
- `.env.prod` → Production environment

The base .env file acts as the global configuration, and environment-specific files override or extend these values.

 **Default Environment (`.env`)**
```env
API_BASE_URL=https://api.example.com
API_VERSION=v1
DB_HOST=localhost
```

:::tip Value Preview & Copy
Every variable in the environment panel shows a preview of its resolved value. Hover over any variable to reveal a **copy** button — click it to copy the value directly to your clipboard.
:::

:::tip Jump to Source
`⌘ Cmd + Click` on any environment variable to jump directly to its definition in the env file.
:::

### Benefits of Using Environment Variables

<table className="benefits-table">
  <thead>
    <tr>
      <th style={{width: "30%"}}>Area</th>
      <th style={{width: "30%"}}>Key Benefits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong> Security</strong></td>
      <td>• Keep sensitive data out of codebase<br/>• Prevent accidental credential mixing<br/>• No hardcoded secrets</td>
    </tr>
    <tr>
      <td><strong> Developer Experience</strong></td>
      <td>• One-click environment switching<br/>• Personal local overrides<br/>• No manual configuration</td>
    </tr>
    <tr>
      <td><strong> Consistency</strong></td>
      <td>• Same base config for all teams<br/>• Identical structure across environments<br/>• Reduce "works on my machine" issues</td>
    </tr>
    <tr>
      <td><strong> Rapid Switching</strong></td>
      <td>• Test APIs in different environments<br/>• Compare staging vs production instantly<br/>• Validate environment features</td>
    </tr>
    <tr>
      <td><strong> Collaboration</strong></td>
      <td>• Share base files via Git<br/>• Keep overrides private<br/>• Different local configs without conflicts</td>
    </tr>
    <tr>
      <td><strong> Organization</strong></td>
      <td>• Clear environment separation<br/>• Easy to track variable changes<br/>• Simple to add new environments</td>
    </tr>
  </tbody>
</table>

---

## Summary

Once you get the hang of environment variables, you'll wonder how you ever worked without them. Set up your profiles, organise your environments in the left panel, and switch between them in seconds from the card in the top nav. Need a variation of an existing environment? Create a child and build on top of it. Want to share it with the team? Make it public. Want to keep it to yourself? Set it to private and Voiden makes sure it never leaves your machine. It just works.
