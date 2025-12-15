---
  id: web-socket
  title: Wss
  sidebar_label: WebSocket
  sidebar_position: 6
---
# WebSocket (Beta)
> **Note:** This feature is currently in **Beta**.
## Overview
WebSocket is a communication protocol that enables **real-time, two-way communication** between a client and a server over a single, long-lived connection. Unlike traditional HTTP, WebSocket allows both sides to send data at any time, making it ideal for live and interactive applications.

WebSocket is standardized under **RFC 6455** and is supported by all modern browsers and servers.

---

# WebSocket Request Interface

This section provides a comprehensive overview of the WebSocket request interface, detailing its functionality, core components, and best practices for managing real-time WebSocket communication in a structured and intuitive manner.

![websocket](/img/voiden-blocks/web-socket-interface.png)


## Interface Components
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


## Connection Management
---
### Connecting to the Server
To initiate a WebSocket connection:
1. Select the **Connect** option  
2. Monitor the status indicator for connection progress  
3. Review detailed logs for connection diagnostics and confirmation  


### Sending Messages
To transmit a message through the WebSocket connection:
1. Enter the message content in the editor  
2. Select the appropriate message format (Text, JSON, or XML)  
3. Click **Send** to dispatch the message  
4. Confirm successful delivery via the message activity log  


### Receiving Messages
Incoming messages are processed in real time:
- Observe new entries in the activity log  
- Inspect message content along with associated timestamps  
- Use validation or test scripts to verify received payloads when required  


### Closed
To safely close the WebSocket connection:
1. Click **cancel**  
2. The connection state will update to **cancel**, confirming termination.  
3. click **pause**
4. The WebSocket connection is closed, and the status indicator reflects the **Disconnected** state.

---

### Try it Out
1. In your Voiden file, type `/wss `and press **Enter** to create a **Web-Socket**.

 ![web-socket](/img/voiden-blocks/web-socket-pre.png)

2. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),
**or** click the **green Play button** in the toolbar.
3. you see the **Response panel**, with **massage composer** for the **Web Socket**

![web-socket](/img/voiden-blocks/web-socket.gif)

---

## Summary
The WebSocket request interface delivers a robust and user-friendly environment for real-time communication, offering precise connection control, flexible message handling, and full visibility into message flow for effective debugging and monitoring.
