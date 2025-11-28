---
  id: simple-assertion
  title: Simple Assertion
  sidebar_label: Simple Assertion
---

# Simple Assertions Plugin

The **Simple Assertions** plugin adds lightweight, easy-to-use assertion testing for HTTP responses inside Voiden. It enables users to validate API responses using a clean table-based interface and integrates directly into the response panel.

---

# 🚀 Key Features

### **Assertion Table Interface**

* Clean two-column format:

  * **Description | Field | Operator**
  * **Expected Value**
* Insertable using the `/assertions` slash command

### **Supported Assertion Types**

* **JSONPath** (for JSON responses)
* **XPath** (for XML responses)
* **Form field** assertions

### **Supported Operators**

* equals
* contains
* exists
* matches
* not equals
* starts with
* ends with

### **Result Visualization**

* Results appear as a **sub-panel** in the response tab
* Color-coded indicators for:

  * **Pass (Green)**
  * **Fail (Red)**

---

# 🧩 Capabilities

## 🔷 Block Ownership

The plugin owns the following block type:

* `assertions-table`

Extensions to this block type are **not allowed**.

---

## 🔷 Request Pipeline Integration

### **Post-Processing Handler**

After the HTTP response is received, the plugin:

* Evaluates all assertions in the table
* Generates assertion results
* Passes processed data to the response enhancer

---

## 🔷 Response Enhancements

The plugin adds support for:

* **Assertion Results View** inside the response tab
* Stylish visual feedback for each test case

---

# 🌟 Highlights

* Lightweight and simple testing system
* Perfect for verifying API responses on the fly
* Clean visual integration inside Voiden
* Zero configuration — just insert an assertion table and write
* Supports popular formats like JSONPath & XPath

---
