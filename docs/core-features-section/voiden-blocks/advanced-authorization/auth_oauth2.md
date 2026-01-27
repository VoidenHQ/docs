---
  id: auth-oauth2-block
  title: OAuth2 Authorization Block
  sidebar_label: OAuth2 Authorization Block
  sidebar_position: 1
---


# OAuth2 Authorization Block
OAuth 2.0 is a widely used authorization framework that enables secure access to protected resources without exposing user credentials. It works through access tokens obtained via different grant types like Client Credentials, Authorization Code, or Refresh Tokens.

**Voiden** support OAuth 2.0 authentication, allowing seamless integration with modern APIs and identity providers such as Google, GitHub, and Microsoft.

---

###  Try it Out

1. In your Voiden file, type `/auth-oauth2` and press **Enter** to create a **Authorization Digest Block**.  

    ![Authorization OAuth1 Slash Command](/img/voiden-blocks/authorization/auth-oauth2.png)

2. Fill the required params for the block.

    ![Authorization OAuth1 Slash Command](/img/voiden-blocks/authorization/auth-oauth2-params.png)

3. Hit **Cmd + Enter** (Mac) or **Ctrl + Enter**  (Windows/Linux) to run the request  
    **or** click the **green Play button** in the toolbar.

4. Check the **Response Panel** 

---

###  Block Parameters
| Parameter | Value | Description |
| --- | --- | --- |
| access_token | string | The token issued by the authorization server after successful authentication. It grants access to protected resources on behalf of the user or application.
| token_type | string | Specifies the type of token issued. Commonly "Bearer", which means the token should be sent in the Authorization header using the Bearer scheme.
| header_prefix |	string | The prefix added before the token in the request header. For example, with a Bearer token type, the header becomes Authorization: Bearer `<access_token>`.