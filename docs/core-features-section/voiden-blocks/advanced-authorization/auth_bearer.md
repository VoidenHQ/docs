---
  id: auth-bearer-block
  title: Bearer Authorization Block
  sidebar_label: Bearer Authorization Block
  sidebar_position: 1
---

# Bearer Authorization Block

**Voiden** supports straightforward authentication to keep things secure without the headache. You can use the classic [Basic Authorization](/docs/core-features-section/voiden-blocks/advanced-authorization/auth_basic.md) method, where your username and password team up like old friends to get you in.

For a more modern approach, we also offer Bearer Token authentication—think of it as a VIP pass that does all the talking for you after the first introduction. Whichever you choose, you’re covered!

---

###  Try it Out

1. In your Voiden file, type `/auth-bearer` and press **Enter** to create a **Authorization Bearer Block**.  

![Authorization Bearer Slash Command](/img/voiden-blocks/authorization/auth-bearer.png)

2. Fill the required params for the block.

![Authorization Block Slash Command](/img/voiden-blocks/authorization/auth-bearer-params.png)

3. Hit **Cmd + Enter** (Mac) or **Ctrl + Enter**  (Windows/Linux) to run the request  
**or** click the **green  Play button** in the toolbar.

4. Check the **Response Panel** 

---

### Block Parameters
| Parameter | Value | Description |
| --- | --- | --- |
| token | string | The actual token value (e.g., a JWT or API key) that proves your identity.|