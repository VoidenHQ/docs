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
---

## Create a gRPC Request

In your Voiden file, type `/grpcs` and press **Enter** to create a **gRPC Request**. 


![grpcs](/img/voiden-blocks/grpcs.png)

---

## Add Proto File 
Add your Proto file (`.proto`) to define the contract between the gRPC client and server.  
   
   Voiden allows you to import and use Proto files directly, enabling automatic service discovery and making gRPC development and testing simpler and more intuitive.

---

## Select a Service

A single proto file can contain **multiple services**.  
For example, you might see services like:

- **UserService**
- **PassService**

![services](/img/plugins/socket/userservice.png)

In Voiden, you simply choose the service you want (for example, `UserService`) from the dropdown—no manual configuration needed.

---

## Choose a Method

Each service exposes one or more **methods**.  
For example, a `UserService` might include:

- `GetUser` — fetch user details  
- `CreateUser` — create a new user  
- `UserListener` — listen for user updates  
- `Chat` — bidirectional chat streaming  

![methods](/img/plugins/socket/method.png)

Once you select a method, Voiden automatically knows what input it expects based on the proto definition.

---

## Run The Request
 Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),
**or** click the **green Play button** in the toolbar.
 you see the **Response panel** for the **GRPC**

![grpcs](/img/voiden-blocks/grpcs-pre.gif)

---
## Summery
Voiden’s gRPC support enables fast, strongly typed, and low-latency communication using Protocol Buffers and HTTP/2. It allows you to create, test, and run unary and streaming gRPC requests directly from the interface, making gRPC development simple and efficient.