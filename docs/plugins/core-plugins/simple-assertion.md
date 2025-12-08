---
  id: simple-assertion
  title: Simple Assertion
  sidebar_label: Simple Assertion
---

# Simple Assertions Plugin

The **Simple Assertions** plugin adds lightweight, easy-to-use assertion testing for HTTP responses inside Voiden. It enables users to validate API responses using a clean table-based interface and integrates directly into the response panel.

---

# Key Features

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


> The plugin adds support for:
>
> * **Assertion Results View** inside the response tab
> * Stylish visual feedback for each test case


