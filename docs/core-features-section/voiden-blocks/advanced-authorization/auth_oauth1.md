---
  id: auth-oauth1-block
  title: OAuth1 Authorization Block
  sidebar_label: OAuth1 Authorization Block
  sidebar_position: 1
---

# OAuth1 Authorization Block

OAuth 1.0 is a secure protocol that allows an application to access protected resources on behalf of a user — without directly sharing their credentials.
It uses a signature-based approach, combining consumer keys, tokens, and cryptographic signing to verify each request’s authenticity.

**Voiden** supports OAuth 1.0 authentication as well, enabling you to connect with APIs that require this older but still widely used standard (such as some legacy or enterprise systems).

---

###  Try it Out

1. In your Voiden file, type `/auth-oauth1` and press **Enter** to create an **Authorization Digest Block**.  

![Authorization OAuth1 Slash Command](/img/voiden-blocks/authorization/auth-oauth1.png)

2. Fill the required params for the block.
3. Hit **Cmd + Enter** (Mac) or **Ctrl + Enter**  (Windows/Linux) to run the request  
**or** click the **green Play button** in the toolbar.

![Authorization OAuth1 Slash Command](/img/voiden-blocks/authorization/auth-oauth1-params.png)

---

###  Block Parameters
| Parameter | Value | Description |
| --- | --- | --- |
| consumer_key | string |	The public identifier for the client application, issued by the API provider. It tells the server which application is making the request.
| consumer_secret | string | The private key associated with the consumer key. It’s used along with the token secret to sign requests and verify authenticity.
| access_token | string	| A token that represents the user’s authorization and grants the client access to protected resources.
| token_secret | string	| A secret associated with the access token. Used together with the consumer secret to generate the request signature.
| signature_method | string |	The algorithm used to sign the request (e.g., HMAC-SHA1, RSA-SHA1, or PLAINTEXT). It ensures the request hasn’t been tampered with during transmission.

---

## Summary

OAuth1 signs each request with your consumer key, consumer secret, access token, and token secret — no bearer token flying around unprotected, just a cryptographic signature proving authenticity. Add it with `/auth-oauth1` and fill in those five fields whenever you're connecting to a legacy or enterprise API that still relies on this older standard.