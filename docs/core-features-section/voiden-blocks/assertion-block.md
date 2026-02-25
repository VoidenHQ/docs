---
  id: assertion-block
  title: Assertion Blocks
  sidebar_label: Assertion Blocks
---

Assertions help you double-check that your API is behaving itself. Think of them as little guards that say, “Hey response… are you sure you’re correct?”  
Voiden proudly supports Assertions as a **reusable block**, because why should only your code get superpowers?

> **Note:** Make sure the **Assertion Plugin** is enabled — without it, your assertions are basically on vacation.

---

### How to Use the Assertion Block

1. **Add the Block**  
   Type **`/assertion-block`** and—*poof!*—your assertion template appears like a magician’s trick (minus the smoke).

![assertion](/img/voiden-blocks/assertion-show.png)

---

2. **Run It**  
   Give your request a gentle nudge by either:  
   - Pressing **Cmd + Enter** (on macOS) or **Ctrl + Enter** (on Windows/Linux), or  
   - Clicking the big, bright **green  Play button**—the one that screams “press me!”  

---
     
3. **Check the Results**  
   Slide over to the **Response Panel** — you’ll spot your shiny new **Assertion Check** waiting to tell you if things went perfectly… or hilariously wrong.

![asserion](/img/voiden-blocks/assertion.gif)

### Available Operators

| Operator | Aliases | Description |
| :--- | :--- | :--- |
| `equals` | `eq`, `==`, `===` | Exact equality |
| `not-equals` | `ne`, `!=`, `!==` | Not equal |
| `contains` | `includes` | String contains |
| `not-contains` | `not-includes` | String does not contain |
| `starts-with` | `startswith` | String starts with |
| `ends-with` | `endswith` | String ends with |
| `matches` | `regex` | Regex pattern match |
| `exists` | `is-defined` | Value exists |
| `not-exists` | `is-null`, `is-undefined` | Value does not exist |
| `greater-than` | `gt`, `>` | Greater than (numeric) |
| `less-than` | `lt`, `<` | Less than (numeric) |
| `greater-equal` | `gte`, `>=` | Greater or equal (numeric) |
| `less-equal` | `lte`, `<=` | Less or equal (numeric) |
| `is-empty` | `empty` | Empty array/string/object |
| `not-empty` | *None* | Not empty |
| `is-truthy` | `truthy` | Truthy value |
| `is-falsy` | `falsy` | Falsy value |
| `type-is` | `typeof` | Type check |

### Available fields

| Field | Example |
| :--- | :--- |
| status | 200 |
| statusText | OK |
| responseTime | 500 |
| duration | 1000 |
| header | `header.Content-Type` might have `applcation/json` |
| body | `body.data[0].id` would read the id from `{ "data": [ { "id": 0} ] }` |

