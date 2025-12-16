---
  id: socket and grpcs
  title: Socket & gRPC APIs
  sidebar_label: Socket & gRPC APIs
---

#  Sockets & gRPC APIs 

The **Sockets & gRPC APIs** Plugin enables real-time, bidirectional communication using **WebSockets (WSS)** and **gRPC** within Voiden. It provides a unified interface to build, test, stream, and monitor socket-based APIs, supporting both message-based and streaming communication.

---

## Key Features

### **Real-Time Communication**

1. Native support for **WebSocket (WSS)** connections.
2. Full **gRPC socket support**, including:
   - Unary calls
   - Server-side streaming
   - Client-side streaming
   - Bidirectional streaming
3. Persistent connections with live message exchange.
4. Multiple concurrent socket connections.

---

### **Response & Streaming Visualization**

- Real-time message streaming
- Bidirectional communication logs
- Connection status indicators
- Message history viewer
- Dedicated response panel for socket communication

---

### **Productivity & Developer Experience**

- Slash commands for quick block insertion:
  - WebSocket blocks
  - gRPC socket blocks
- Paste support for common CLI tools:
  - `websocat` for WebSockets
  - `grpcurl` for gRPC
- Automatic parsing of connection details, headers, metadata, and payloads
- Protocol Buffer (`.proto`) file import and parsing

---

## Capabilities

## Block Ownership

This plugin owns **6 custom block types** for socket-based communication, enabling structured request creation and message handling:

### **Socket & gRPC Blocks**

- [`wss↗`](/docs/core-features-section/voiden-blocks/wss.md)
- [`gRPC↗`](/docs/core-features-section/voiden-blocks/gRPC.md)

Block extensions are supported, allowing future customization and add-ons

---

## Request Pipeline

The plugin integrates deeply into Voiden’s request lifecycle by registering:

- **Build Handlers** — Construct socket and gRPC requests  
- **Response Handlers** — Process incoming messages  
- **Streaming Handlers** — Manage continuous and bidirectional streams  

This ensures reliable handling of long-lived, real-time connections.

---

<!-- ## Paste Handling

### **WebSocket Import**
Pattern: `/^websocat\s+/i`

Automatically extracts:
- WebSocket URLs
- Headers
- Protocols
- Connection options

### **gRPC Import**
Pattern: `/^grpcurl\s+/i`

Automatically extracts:
- Service endpoints
- Proto files
- Metadata
- Request bodies
- Service and method definitions -->

<!-- --- -->

## File Support

### **Proto Files**
- Supported extension: `.proto`
- Built-in parser for service discovery
- Dynamic service and method selection from imported proto definitions

---

## Dependencies

```json
{
  "core": "^1.0.0",
  "sdk": "^1.0.0"
}
