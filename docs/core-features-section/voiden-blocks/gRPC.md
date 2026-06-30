---
  id: grpc
  title: gRPC
  sidebar_label: gRPC Block
  sidebar_position: 7
---

# gRPC Block

Voiden uses **gRPC** to enable fast, reliable, and strongly-typed communication between internal services and external clients. By leveraging gRPC, Voiden ensures efficient data exchange, low latency, and clear API contracts that scale well with complex and distributed systems.

The gRPC block is designed for performance-critical operations, structured communication, and service-to-service interactions where consistency and speed are essential.

---
## gRPC Requests

Voiden provides robust support for gRPC requests, allowing you to test and interact with gRPC services directly from the interface. With Voiden’s gRPC capabilities, you can efficiently work with real-time APIs, including:

- Unary gRPC calls  
- Server-side streaming  
- Client-side streaming  
- Bidirectional streaming  

This support enables seamless testing, validation, and exploration of gRPC-based services within Voiden.

### Try it Out

1. In your Voiden file, type `/grpcs` and press **Enter** to create a **gRPC block**.

![gRPC block setup](/img/voiden-blocks/grpcs.png)

2. Upload or reference a `.proto` file to define the service contract between the gRPC client and server.

3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux)
**or** click the **green Play button** in the toolbar.
4. You will see the **Response panel** for the **gRPC block**.

![gRPC response panel](/img/voiden-blocks/grpcs-pre.gif)

---
## Summary
Voiden’s gRPC block lets you create, test, and run unary and streaming gRPC requests directly from the interface, using Protocol Buffers and HTTP/2 for fast, strongly typed, and low-latency communication.
