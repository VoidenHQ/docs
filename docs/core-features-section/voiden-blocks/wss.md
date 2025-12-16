---
  id: web-socket
  title: Wss
  sidebar_label: WebSocket Block
  sidebar_position: 6
---
#  <div style={{display:"flex",alignItems:"center"}}> WebSocket  Block<small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>


> **Note:** This feature is currently in **Beta**.

WebSocket is a communication protocol that enables **real-time, two-way communication** between a client and a server over a single, long-lived connection. Unlike traditional HTTP, WebSocket allows both sides to send data at any time, making it ideal for live and interactive applications.

WebSocket is standardized under **RFC 6455** and is supported by all modern browsers and servers.


---

### Try it Out
1. In your Voiden file, type `/wss `and press **Enter** to create a **Web-Socket**.

 ![web-socket](/img/voiden-blocks/web-socket-pre.png)

2. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),
**or** click the **green Play button** in the toolbar.
3. you see the **Response panel**, with **massage composer** for the **Web Socket**

![web-socket](/img/voiden-blocks/web-socket.gif)

---

# WebSocket Block

This section provides a comprehensive overview of the WebSocket request interface, detailing its functionality, core components, and best practices for managing real-time WebSocket communication in a structured and intuitive manner.

![websocket](/img/voiden-blocks/web-socket-interface.png)


## Response Panel
---
### Connection Status Indicator
Displays the current lifecycle state of the WebSocket connection:

- **Disconnected** — Default state; no active connection  
- **Connecting** — Attempting to establish a connection with the server  
- **Connected** — Connection established and ready for data exchange  
- **Disconnected** — Connection closed either intentionally or due to an error  

### Message Composition Panel
Provides tools for creating and transmitting messages:

- **Message Format** — Choose the payload type:
  - Plain Text  
  - JSON  
  - XML  
- **Message Editor** — Rich text editor with syntax highlighting for structured formats  
- **Send Action** — Sends the composed message to the connected WebSocket server  


### Message Activity Log
Maintains a complete record of WebSocket communication:

- **Outbound Messages** — Messages sent by the client (indicated by →)  
- **Inbound Messages** — Messages received from the server (indicated by ←)  
- **Timestamps** — Precise time records for each transmitted and received message  

---

## Summary
The WebSocket request interface delivers a robust and user-friendly environment for real-time communication, offering precise connection control, flexible message handling, and full visibility into message flow for effective debugging and monitoring.
