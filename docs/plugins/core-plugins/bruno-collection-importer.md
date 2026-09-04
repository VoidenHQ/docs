---
id: bruno-collection-importer
title: Bruno Collection Importer
sidebar_label: Bruno Collection Importer
---

# Bruno Collection Importer Plugin

Switching over from [Bruno](https://www.usebruno.com)? The **Bruno Collection
Importer** plugin makes it painless — it moves your API collections straight
into fully native Voiden `.void` request files, so you're not stuck re-typing
endpoints and headers by hand.

It works with Bruno 3.0+'s whole-collection **OpenCollection** YAML export
and with individual Bruno environment files, converting requests,
folders, environments, auth, and scripts into Voiden automatically. Importing
a standalone classic `.bru` request file on its own isn't supported — bring
in the full collection export instead.

---

## How It Works

1. Open a Bruno environment file or an exported OpenCollection YAML file
   in Voiden.
2. Look for the **Import into Voiden** button in the file's tab toolbar.
3. Click it — if you opened a whole OpenCollection export, Voiden builds a
   folder tree that matches your Bruno collection's structure exactly; if you
   opened just a single request from a directory-based OpenCollection layout,
   it converts that one.
4. That's it — every request lands as its own `.void` file, with its endpoint,
   params, auth, and (where it's safe to) live scripts all included.

---

## What gets imported

| You open in Voiden | You get |
|---|---|
| A whole OpenCollection YAML export | A folder tree matching your Bruno collection, one `.void` file per request |
| A single request from a directory-based OpenCollection layout | One `.void` file |
| A Bruno environment file (`environments/<name>.bru`) | A named Voiden environment — merged into your existing environments, not overwritten |

> A standalone classic `.bru` request file (outside of an OpenCollection export) can't be imported on its own.

---

## How requests are converted

### Body types

| Bruno body | Voiden block |
|---|---|
| JSON / XML / plain text | `json_body` / `xml_body` / `text_body` |
| Form URL-encoded | `url-table` |
| Multipart form | `multipart-table` — file fields become `fileLink` attachments when the original file still exists |
| Raw file | `restFile` placeholder |
| GraphQL | `gqlquery` / `gqlvariables` |
| gRPC | `socket-request`, wired to the request's `.proto` file, method, and streaming type |
| WebSocket | `socket-request` (url + protocol) |

### Everything else

- **Headers** → `headers-table`
- **Query & path params** → `query-table` / `path-table` — if a request has a
  query string but no explicit `params:query` list, the importer parses it
  from the URL instead
- **`:param` URL segments** → converted to Voiden's `{param}` placeholder style
- **Auth** — Basic, Bearer, API Key, Digest, AWS Signature v4, NTLM, OAuth1,
  and OAuth2 (all four grant types) all convert into a Voiden `auth` block

### Scripts & assertions

- A well-formed Bruno `assert{}` block becomes a live `assertions-table` block.
- Pre-request and post-response scripts become live `pre_script`/`post_script`
  blocks — but only when every line matches a pattern the importer recognizes
  as safe. If anything looks unfamiliar, the whole script is imported
  **commented out** instead, so you can review it before it runs.

---

## Requirements

The importer always needs the **Voiden REST API** plugin — it generates the
method/URL, headers, params, and body blocks every imported request is built
from.

A few other core plugins kick in automatically, only when a request actually
needs them:

| Plugin | Used for |
|---|---|
| Voiden GraphQL | GraphQL request bodies |
| Simple Assertions | `assert{}` blocks |
| Socket & gRPC | gRPC and WebSocket requests |
| Advanced Authentication | OAuth1 / OAuth2 |

---

## Good to know

- File and folder names are sanitized for filesystem compatibility, and
  nested folders are supported with no depth limit.
- Malformed field names and special characters in your Bruno collection are
  handled gracefully rather than failing the import.
- A whole-collection import shows live progress and can be cancelled midway.
