---
  id: enviroment-variables
  title: Enviroment Variables
  sidebar_label: Enviroment
  sidebar_position: 2
---

# Environment Variables

Environment variables let you manage different configurations for various deployment environments (development, staging, production) without changing your code.

## Setting Your Environment

1. Look at the top navigation bar
2. Find the **environment selector** located next to the recent project selector
3. Click on the environment dropdown to open the selection popup

### Available Options
- **None**: No environment selected (uses only local variables)
- **Development**: Development environment variables
- **Staging**: Staging environment variables  
- **Production**: Production environment variables
- **Custom**: Any custom environments you've created

## How Variables are Resolved

- Local variables **always override** environment variables
- Environment variables override default global variables
- This ensures you can have environment-specific values while still allowing local overrides for testing

## Creating Environment Files

Environment files should always start with .env followed by the environment name.
For example:

- `.env` → Global defaults shared across all environments
- `.env.dev` → Development environment
- `.env.staging` → Staging environment
- `.env.prod` → Production environment

The base .env file acts as the global configuration, and environment-specific files override or extend these values.

  **Default Environment (`.env`)**
```env
API_BASE_URL=https://api.example.com
API_VERSION=v1
DB_HOST=localhost
```

### Benefits of Using Environment Variables

<table className="benefits-table">
  <thead>
    <tr>
      <th style={{width: "30%"}}>Area</th>
      <th style={{width: "30%"}}>Key Benefits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>🔒 Security</strong></td>
      <td>• Keep sensitive data out of codebase<br/>• Prevent accidental credential mixing<br/>• No hardcoded secrets</td>
    </tr>
    <tr>
      <td><strong>🚀 Developer Experience</strong></td>
      <td>• One-click environment switching<br/>• Personal local overrides<br/>• No manual configuration</td>
    </tr>
    <tr>
      <td><strong>🔄 Consistency</strong></td>
      <td>• Same base config for all teams<br/>• Identical structure across environments<br/>• Reduce "works on my machine" issues</td>
    </tr>
    <tr>
      <td><strong>⚡ Rapid Switching</strong></td>
      <td>• Test APIs in different environments<br/>• Compare staging vs production instantly<br/>• Validate environment features</td>
    </tr>
    <tr>
      <td><strong>🛡️ Collaboration</strong></td>
      <td>• Share base files via Git<br/>• Keep overrides private<br/>• Different local configs without conflicts</td>
    </tr>
    <tr>
      <td><strong>📁 Organization</strong></td>
      <td>• Clear environment separation<br/>• Easy to track variable changes<br/>• Simple to add new environments</td>
    </tr>
  </tbody>
</table>
