---
  id: variables-overview
  title: Variables Overview
  sidebar_label: Overview
  sidebar_position: 1
---

# Variables in Voiden

Stop repeating yourself! Variables in Voiden let you define values once and reuse them across all your API requests. No more hardcoding the same URLs, tokens, or data in every single void file.

## Why Use Variables?

- **Consistency**: Use the same base URL, authentication tokens, or user IDs everywhere
- **Environment Switching**: Change between dev, staging, and production with one click
- **Maintainability**: Update a value in one place and it reflects across all your requests
- **Security**: Keep sensitive data like API keys out of your request files

## Types of Variables

### 🌍 Environmental Variables
These are your configuration constants that change based on the environment you're working in.


### ⚡ Runtime Variables
These are dynamic values that get set during request execution and can be used in subsequent requests.


## Best Practices

1. **Use descriptive names**: `api_base_url` instead of `url1`
2. **Group related variables**: Prefix related vars like `db_host`, `db_port`
3. **Set defaults**: Provide sensible default values
4. **Use different environments**: Maintain separate dev, staging, and prod variable sets
5. **Secure sensitive data**: Never commit sensitive variables to version control

Variables turn your static API requests into dynamic, reusable, and maintainable workflows. Start using them to work smarter, not harder! 🚀