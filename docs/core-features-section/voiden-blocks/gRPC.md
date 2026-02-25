---
  id: grpcs
  title: gRPCS 
  sidebar_label: gRPC Block
  sidebar_position: 7
---

# gRPC Block



Voiden uses **gRPC** to enable fast, reliable, and strongly-typed communication between internal services and external clients. By leveraging gRPC, Voiden ensures efficient data exchange, low latency, and clear API contracts that scale well with complex and distributed systems.

gRPCs in Voiden are designed for performance-critical operations, structured communication, and service-to-service interactions where consistency and speed are essential.

---
## gRPC Requests

Voiden provides robust support for gRPC requests, allowing you to test and interact with gRPC services directly from the interface. With Voiden’s gRPC capabilities, you can efficiently work with real-time APIs, including:

- Unary gRPC calls  
- Server-side streaming  
- Client-side streaming  
- Bidirectional streaming  

This support enables seamless testing, validation, and exploration of gRPC-based services within Voiden.
### Try it Out
1. In your Voiden file, type `/grpcs` and press **Enter** to create a **GRPC**.

![grpcs](/img/voiden-blocks/grpcs.png)

2. Proto files (`.proto`) define the contract between gRPC clients and servers. Voiden lets you add and use these files directly, making gRPC development and testing simpler and more intuitive.

3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),
**or** click the **green Play button** in the toolbar.
4. you see the **Response panel** for the **GRPC**

![grpcs](/img/voiden-blocks/grpcs-pre.gif)

---
## Summery
Voiden’s gRPC support enables fast, strongly typed, and low-latency communication using Protocol Buffers and HTTP/2. It allows you to create, test, and run unary and streaming gRPC requests directly from the interface, making gRPC development simple and efficient.