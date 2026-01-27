---
  id: graphql-variable
  title: GraphQL Variable Block
  sidebar_label: GraphQL Variable Block
---
# GraphQL Variable

The **Variables block** in Voiden is used to pass dynamic values into your GraphQL queries, mutations, or subscriptions. Instead of hardcoding values directly inside the Query block, you define them here and let Voiden inject them at runtime.

This separation keeps your GraphQL requests clean, readable, and easy to reuse across different scenarios.

Key points about the Variables block:
- Used to send **dynamic input values** such as IDs, filters, or user input  
- Keeps queries flexible without changing their structure  
- Makes testing different cases simple by updating only the variables  
- Helps avoid duplication and hardcoded values  
- Works seamlessly with the Query block  

In simple terms, the Variables block provides the “inputs” for your GraphQL request, while the Query block defines the “logic.” Together, they make working with GraphQL in Voiden clear, organized, and efficient.


---
### Try It Out

1. In your Voiden file, type `/gqlvariables` and press **Enter** to create a **GraphQL variables**.

    ![graphql-variable](/img/voiden-blocks/graphql-variables.png)

2. Once the query includes variables, Voiden automatically creates a **Variables block**. This block appears as a **JSON code editor** where you can define the values for those variables.

    **Provide Variable Values**  
    - Enter values manually as JSON  
    - Use [**environment variables**](/docs/core-features-section/variables/enviroment-variables.md)
    - Use [**runtime variables**](/docs/core-features-section/variables/runtime-variables.md)

    This gives you flexibility to test different inputs without modifying the query itself.

3. Run the request using **Cmd + Enter** (Mac) or **Ctrl + Enter** (Windows/Linux),
**or** click the **green Play button** in the toolbar.

    ![graphql](/img/voiden-blocks/graphql-output.gif)

---
## Summary

The GraphQL Variables block in Voiden lets you pass dynamic values to your queries without hardcoding them. By separating inputs from query logic, it keeps requests clean, reusable, and easy to test across different scenarios.
