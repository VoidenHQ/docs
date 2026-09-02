---
id: bruno-collection-importer
title: Bruno Collection Importer
sidebar_label: Bruno Collection Importer
---

# Bruno Collection Importer Plugin

The **Bruno Collection Importer** plugin makes it easy to move your API
collections from [Bruno](https://www.usebruno.com) into fully native Voiden
`.void` request files. It understands both Bruno's classic one-file-per-request
`.bru` format and Bruno 3.0+'s whole-collection **OpenCollection** YAML/JSON
export, and converts requests, folders, environments, auth, and scripts into
Voiden automatically — no manual re-typing of endpoints or headers.

---

## How It Works

1. Open a `.bru` request file, a Bruno environment file, or an exported
   OpenCollection YAML/JSON file in Voiden.
2. Look for the **Import into Voiden** button in the file's tab toolbar.
3. Click it. If you opened a whole OpenCollection export, Voiden builds a
   folder tree that matches your Bruno collection's structure exactly. If you
   opened a single file, it converts just that one.
4. Every request lands as its own `.void` file — endpoint, params, auth, and
   (where it's safe to) live scripts all included.

---

## What gets imported

| You open in Voiden | You get |
|---|---|
| A single `.bru` request file | One `.void` file |
| A whole OpenCollection YAML/JSON export | A folder tree matching your Bruno collection, one `.void` file per request |
| A single request from a directory-based OpenCollection layout | One `.void` file |
| A Bruno environment file (`environments/<name>.bru`) | A named Voiden environment — merged into your existing environments, not overwritten |

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
