---
  id: runtime-block
  title: Runtime Block
  sidebar_label: Runtime variable Block
  sidebar_position: 3
---


# Runtime Variables

## First Method (Request & Response Capturing)

The First Method allows capturing dynamic data from both **requests** and **responses** while executing an API call. These captured values can be reused anywhere in subsequent requests through runtime variables.

---

## Captured Data Types (Request Side)

You can capture the following data blocks from the **request**:

### 1. URL
Captures URL-related values such as dynamic segments or processed endpoints.

**Access Syntax:**
```
{{$req.url}}
```

---

### 2. Headers
Captures any request header sent during the API execution.

**Access Syntax:**
```
{{$req.headers.<headerName>}}
```

---

### 3. Path Parameters
Captures dynamic path parameters present in the URL.

**Access Syntax:**
```
{{$req.pathParams.<paramName>}}
```

---

### 4. Query Parameters
Captures values present in the query string of the request.

**Access Syntax:**
```
{{$req.queryParams.<paramName>}}
```

---

### 5. (Content Type)
Captures the body content and identifies the request's content type (JSON, XML, Form-Data, etc.).

**Access Syntax:**
```

{{$req.contentType}}
```

---

## Captured Data Types (Response Side)

The First Method also captures structured information returned by the server.

### 1. Response Headers
Captures all response header values.

**Access Syntax:**
```
{{$res.headers.<headerName>}}
```

---

### 2. Response Body
Captures the response body and allows accessing nested keys.

**Access Syntax:**
```
{{$res.body}}
```

---

### 3. Response Code
Captures the status code returned by the server (e.g., 200, 404, 500).

**Access Syntax:**
```
{{$res.status}}
```

---

## Summary

| Type | Capturable | Access Syntax |
|------|------------|----------------|
| Request | URL | `{{$req.url.<key>}}` |
| Request | Headers | `{{$req.headers.<headerName>}}` |
| Request | Path Params | `{{$req.pathParams.<paramName>}}` |
| Request | Query Params | `{{$req.queryParams.<paramName>}}` |
| Request | Body / Content Type | `{{$req.body.<key>}}` / `{{$req.contentType}}` |
| Response | Headers | `{{$res.headers.<headerName>}}` |
| Response | Body | `{{$res.body.<key>}}` |
| Response | Status Code | `{{$res.status}}` |

