---
  id: environments
  title: Environments
  sidebar_label: Environments
  sidebar_position: 1
---

# 🌍 Environments

**Voiden** supports multiple `.env` files to manage different environments — development, staging, production, or any custom setup you need.  
Switch between environments without changing your requests.  
Variables defined in your `.env` files automatically populate throughout your blocks.

---

### How it works?

Voiden uses a tiered inheritance model:
- Global variables: Define shared values in `.env`.
- Environment-specific overrides: Create `.env.staging`, `.env.production`, etc. to override specific values.
- Automatic merging: When you select an environment, Voiden loads the global `.env` first, then applies overrides from the environment-specific file.

---
### Example

`.env` (global)
```
API_URL=https://api.example.com
API_KEY=default-key-123
TIMEOUT=30
```

`.env.staging`
```
API_URL=https://staging-api.example.com
API_KEY=staging-key-456
```

When you switch to the **staging** environment:
- `API_URL` → `https://staging-api.example.com` (overridden)
- `API_KEY` → `staging-key-456` (overridden)
- `TIMEOUT` → `30` (inherited from global)

---

### Using Variables in Requests

Reference variables using `{{VARIABLE_NAME}}` syntax in any block:

**Endpoint Block:**
```
GET {{API_URL}}/users
```

**Request Body:**
```
{
  "timeout": {{TIMEOUT}}
}
```

### Switching Environments
Select your active environment from the environment selector in the toolbar.  
Voiden instantly updates all variable references across your entire file — no manual find-and-replace needed.

### Why Tiered Variables Matter

No duplication — Shared values live in one place  
Clear overrides — Environment files only contain what's different  
Easy maintenance — Change a global default once, affects all environments that don't override it