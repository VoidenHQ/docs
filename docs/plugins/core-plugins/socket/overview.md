---
  id: overview
  title: overview
  sidebar_label: Overview
  sidebar_position: 1
---
# Socket & gRPC APIs

Voiden supports **Socket and gRPC APIs** through its core plugin system, enabling developers to generate dynamic, realistic test data directly within Socket and gRPC requests.

---

## Why Sockets & gRPC APIs Matter

Modern applications rely on real-time and streaming communication for speed, scalability, and responsiveness. The **Sockets & gRPC APIs Plugin** exists to address these needs by providing native support for persistent connections and high-performance messaging within Voiden.

This plugin is important because it:
- Enables **real-time, bidirectional communication** that traditional request–response APIs cannot handle efficiently  
- Supports **high-throughput and low-latency workflows** using gRPC and REST 
- Simplifies testing and debugging of **streaming and event-driven APIs**  
- Provides clear visibility into connection state, message flow, and live data  
- Unifies WebSocket and gRPC workflows in a single, consistent interface  

By using Sockets and gRPC APIs in Voiden, developers can confidently build, test, and scale modern applications that depend on continuous data exchange and real-time interactions.

---

## WebSocket vs gRPC vs REST

| Feature | REST | WebSocket | gRPC |
|------|------|-----------|------|
| Communication Model | Request–Response | Persistent, Bidirectional | RPC (Unary & Streaming) |
| Connection Type | Short-lived | Long-lived | Long-lived |
| Data Format | JSON / XML | Text / JSON | Protobuf (binary) |
| Best For | CRUD APIs, public APIs | Live updates, events, chat | Internal services, high-performance systems |

---

### Summary
- **REST** is best for simple, stateless APIs and standard CRUD operations.  
- **WebSocket** excels at real-time, event-driven, bidirectional communication.  
- **gRPC** is ideal for high-performance, strongly typed, and streaming service-to-service interactions.
