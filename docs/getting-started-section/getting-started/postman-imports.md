---
  id: postman-import
  title: Postman Imports
  sidebar_label: Postman Imports
  sidebar_position: 2
---

# Import from Postman

Already doing your API work in Postman? Great — bring it all into Voiden in just a few steps. No rebuilding from scratch, no copy-pasting. Just import and keep going.

---

## What You'll Need

A Postman Collection exported as JSON. We recommend using the **v2.1 format** for best results.

> **Tip:** The quickest way to import is to drag your Postman JSON file directly into the file list panel on the left side of Voiden. That's all it takes.

---

## Generate Your Voiden Files

Once your collection is in, here's what to do:

1. **Open the imported file** — click on it in the left panel
2. **Hit "Generate Voiden Files"** — you'll see the button right there waiting for you
3. **Watch it organize itself** — Voiden creates a clean folder structure using your collection name
4. **You're done** — every request is now its own Voiden file, with endpoints, params, and configs all intact

![import-postman](/img/geetingstarted/import-postman.gif)

---

## Import Your Environment Variables Too

Got your environments set up in Postman? You don't have to start over.

1. Open your Postman collection in Voiden
2. Look for the **Import Environment Variables** button in the top-right corner
3. Click it and pick your exported Postman environment file
4. That's it — all your variables are right there in Voiden, exactly as they were

---

## What Gets Converted

- All HTTP endpoints (GET, POST, PUT, DELETE, and more)
- Request headers and authentication settings
- Query parameters and path variables
- Request body schemas and examples
- Response examples and status codes

---

## Ready to Go

One import, everything set up. Your Postman work becomes a structured, ready-to-use API foundation in Voiden — no manual effort, no room for mistakes.
