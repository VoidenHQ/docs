---
  id: why-electron
  title: Why Voiden is Built on Electron?
  sidebar_label: Why Voiden is Built on Electron?
---

We chose Electron for Voiden very intentionally.

Not because footprint does not matter. It does. And not because Electron is free of tradeoffs. It is not. But based on the discussions we have had with the community, one line stuck with us: too much of this debate is often about “vibes, not reality.” The real question is not whether a framework has tradeoffs. Every framework does. The real question is whether those tradeoffs make sense for the kind of product you are trying to build.

For us, Voiden is not just a wrapper around a webpage, and not just another form based API client. We are building something much closer to an IDE for APIs with richer editing, local workflows, desktop behavior, extensibility, and a broader product surface than a simple request sender. That pushed us toward a stack that let us move fast, build deeply customized interfaces, and ship consistently across macOS, Windows, and Linux.

A big part of that decision was also maturity. Before Voiden was open source, we explored and prototyped with different frameworks. What we kept running into was not just feature gaps, but questions of ecosystem maturity, edge-case behavior, and how much risk we would be taking on across different operating systems and versions. We did not want to build on something where we would constantly be reacting to obscure OS specific problems, inconsistent runtime behavior, or framework level limitations that users would end up experiencing as product issues. We wanted to build on a platform that was already mature, battle tested, and predictable.

That mattered to us a lot. Because when you are building a serious desktop product, compatibility is not some nice to have checkbox. It is part of the product. Stability is part of the UX. Reliability is part of the UX. Users do not care whether a bug came from your app code, a runtime quirk, or a framework edge case. They just know the app broke. So for us, choosing a mature platform was not laziness or conservatism. It was part of taking the product seriously.

A lot of Electron’s bad reputation, frankly, was earned indirectly by bad product decisions, not always by the framework itself. Too many poorly designed desktop tools have trained people to see “Electron” and immediately assume “bloated.” In API tooling especially, products like Postman have shaped that perception so strongly that other Electron based tools often inherit some of that blame by association, whether it is deserved or not. That does not mean the concern is fake. It means the diagnosis is often too shallow. A badly designed app can be heavy in any stack. Electron just makes the blame more visible.

That is also why we think transparency matters. Instead of pretending resource usage is irrelevant, the better approach is to show it, own it, and improve it. If an app is consuming too much memory, users should be able to see that clearly and report it. Consumption should not be treated as some hidden implementation detail that users are expected to tolerate. We would much rather be open about the current footprint, keep optimizing it, and let people call us out when something is clearly off.

Electron’s own rationale lines up with a lot of this. Their argument is not that size does not matter. In fact, they openly acknowledge the tradeoff. Their case is that bundling Chromium, V8, and Node gives developers more control over stability, security, updates, and crossplatform consistency, instead of depending on whatever builtin webview an operating system happens to provide. That was a meaningful factor for us as well.

We also liked that Electron does not force an either or choice between web and native. Its model is very explicitly: use web technologies where they make sense, and use native code where you need deeper system access or heavier backend work. For a product like Voiden, that flexibility matters a lot.

And to be clear: we are not religious about this. We are not closing the door on other frameworks forever. Things evolve. Ecosystems mature. New options get better. But when we made the decision for Voiden, and even looking at it now, we believe it was the right one. We would rather stand on a mature, reliable foundation and build the product properly than chase premature optimizations that look good in a comparison chart but create instability where users actually feel it.

So the choice was never really about picking the trendiest framework or winning a theoretical benchmark argument. It was about building Voiden on a foundation we could trust one that gave us maturity, compatibility, predictability, and the room to build something ambitious without constantly fighting the platform underneath us.

We chose Electron not because it was the lightest option, but because it was the most dependable foundation for building Voiden well. And we will take stability, reliability, and real-world product quality over premature optimization every single time.
