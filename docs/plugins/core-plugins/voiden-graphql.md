---
id: voiden-graphql
title: GraphQL
sidebar_label: GraphQL
---

#  <div style={{display:"flex",alignItems:"center"}}> GraphQL <small style={{alignSelf:"start",fontSize:"12px",marginLeft:"10px",padding:"5px",background:"#8a5cf67d",display:"flex",alignItems:"cetner",gap:"5px",borderRadius:"10px"}}><img src="/img/flask-conical.svg" width="14" /> Beta only</small></div>

> **Note:** This feature is currently in **Beta**.

GraphQL is a flexible and powerful API query language that allows clients to request exactly the data they need. Instead of working with multiple endpoints, GraphQL uses a single endpoint and relies on a strongly typed schema to describe available data and operations.

Voiden provides built-in support for **GraphQL queries, mutations, and subscriptions**, making it easy to test, explore, and manage GraphQL APIs in a clear and friendly environment.

---

## Core GraphQL Operations

GraphQL is built around three main operation types. Voiden supports all of them, [Jump to learn more about how GraphQL queries work.](/docs/core-features-section/voiden-blocks/graphql-query.md)



### Queries

**Queries** are used to fetch data from a GraphQL API.  
They are read-only operations and do not modify server-side data.

**Example Query**
```graphql
query GetUser {
  user(id: "123") {
    id
    name
    email
  }
}
```

### Queries allow you to

- Request only the fields you need  
- Fetch related data in a single request  
- Avoid over-fetching and under-fetching  

---
### Mutations

Mutations are used to create, update, or delete data.  
They are similar to **POST**, **PUT**, or **DELETE** operations in REST.

#### Example Mutation
```graphql
mutation CreateUser {
  createUser(input: {
    name: "Alice",
    email: "alice@example.com"
  }) {
    id
    name
  }
}
```
### Mutations help you

- Modify data in a structured way
- Receive immediate feedback from the server
- Keep API interactions predictable and type-safe

---

### Subscriptions

Subscriptions allow clients to receive **real-time updates** from the server.  
Once a subscription is established, the server automatically pushes data whenever a relevant event occurs.

#### Example Subscription
```graphql
subscription OnUserCreated {
  userCreated {
    id
    name
    email
  }
}
```
### Subscriptions are commonly used for

- Live updates
- Notifications
- Chat and real-time dashboards

---

### GraphQL Variables

GraphQL variables allow you to pass dynamic values into your queries, mutations, or subscriptions without hardcoding them directly in the request. This makes your GraphQL operations cleaner, safer, and easier to reuse.

Instead of changing the query every time a value changes, you define placeholders in the query and supply the actual values separately.

See the [GraphQL variable documenatation](https://graphql.org/learn/queries/#variables)


#### Example Using Variables

**Query**
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```
**Variables**
```json
{
  "id": "123"
}
```

---

Currently, Voiden provides two core building blocks for GraphQL functionality: the **Query block**, where you define and send GraphQL queries, and the **Variables block**, which allows you to supply dynamic values required by those queries. Together, they help keep GraphQL requests clean, flexible, and easy to manage.
