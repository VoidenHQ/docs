---
  id: runtime-variables
  title: Runtime Variables
  sidebar_label: Runtime
  sidebar_position: 3
---

# Runtime Variables

Need a variable that's not fixed but depends on another request's response? Runtime variables let you capture values from one API call and reuse them in subsequent requests.

---

## What are Runtime Variables?

Runtime variables are dynamic values that get set during request execution. They're perfect for scenarios like:
- Capturing an auth token from login and using it in authenticated requests
- Storing a user ID from a create-user response
- Saving an order ID to use in later order management calls


## Creating Runtime Variables

Add a `/runtime-variables` block in your voiden file:

  ![Runtime Variable](/img/voiden-blocks/runtime/variable.gif)

---

### Available Data Sources

1. **From Request ($req)**
  Access data from the current request:

    URL:  `{{$req.url}}`

    Headers: `{{$req.headers.Authorization}}`

    Content Type: `{{$req.contentType}}`

    Body: `{{$req.body.email}}`

    Path Parameters: `{{$req.params.userId}}`

    Query Parameters: `{{$req.query.page}}`

2. **From Response ($res)**
  Access data from the API response:

    Status Code: `{{$res.statusCode}}`

    Response Body: `{{$res.body.data.user_id}}`

    Headers: `{{$res.headers.x-rate-limit}}`

    Content Type: `{{$res.contentType}}`

> ***Accessing Nested Data***
>
> - **Objects**
>
>     Use dot notation to access nested properties:
>     ```yaml
>     user_email: "{{$res.body.user.contact.email}}"
>     api_version: "{{$res.body.meta.api.version}}"
>     ```
> - **Arrays**
>   Access array elements by index or let Voiden auto-select:
>
>      1. Specific Index:
>
>       ```json
>       first_item: "{{$res.body.items[0].name}}"
>       third_user: "{{$res.body.users[2].id}}"
>       ```
>     2. Auto-select (first match):
>
>       ```yaml
>         any_product: "{{$res.body.products.name}}"  # Gets first product's name
>       any_id: "{{$res.body.ids}}"                 # Gets first ID in array
>       ```

---

# Example Workflow

1. **First request**

    In the first request , add the Runtime block , and attach to a data source for every variable

    ![Capture Variable](/img/voiden-blocks/runtime/set.gif)

    And run the request by either:  
    - Pressing **Cmd + Enter** (on macOS) or **Ctrl + Enter** (on Windows/Linux), **or**  
    - Clicking the bright **green  Play button** in the toolbar.  

---

2. **Second request**

    Reference the variables using `process` anywhere 

      ![Access Variable](/img/voiden-blocks/runtime/access-variable.gif)
  

---

# Best Practices
- Use descriptive names: session_token instead of token1
- Handle null cases: Ensure the data path exists before using it
- Test extraction: Verify runtime variables capture the expected values
- Chain carefully: Make sure dependent requests execute in the correct order

Runtime variables transform your isolated API calls into connected workflows! 
