---
  id: why-electron
  title: Why Voiden is Built on Electron?
  sidebar_label: Why Voiden is Built on Electron?
---

# Why Voiden is Built on Electron?

We chose Electron for Voiden very intentionally — and we think it is worth explaining why.

Not because the tradeoffs do not exist. They do. But too much of the "Electron debate" is driven by vibes rather than reality. The right question is never whether a framework has tradeoffs. Every framework does. The right question is whether those tradeoffs make sense for the product you are building.

For Voiden, they do.

---

## Voiden Is an IDE for APIs, Not a Form Sender

Voiden is not a wrapper around a webpage. It is not a simple request sender with a pretty UI. We are building something much closer to an IDE — with a rich custom editor, local workflows, extensibility, desktop-native behavior, and a product surface that goes well beyond filling out fields and hitting send.

That kind of product needs a stack that can move fast, support deeply customized interfaces, and ship consistently across macOS, Windows, and Linux. Electron gave us all of that from day one.

---

## Maturity Was a Non-Negotiable

Before Voiden was open source, we explored and prototyped with several different frameworks. What we kept running into was not just feature gaps — it was questions of ecosystem maturity, edge-case behavior, and the real-world risk of building on something still finding its footing.

We did not want to spend our time reacting to obscure OS-specific bugs, inconsistent runtime behavior, or framework limitations that users would experience as product failures. We wanted a platform that was already battle-tested and predictable.

When you are building a serious desktop product, that matters more than most people admit. Stability is part of the UX. Reliability is part of the UX. Users do not care whether something broke because of your code, a runtime quirk, or a framework edge case — they just know the app broke. Choosing a mature platform was not laziness. It was part of taking the product seriously.

---

## Electron's Reputation Is Often Misdirected

A lot of Electron's bad reputation was earned indirectly — by poorly built apps, not by the framework itself. Too many badly designed tools have trained people to see "Electron" and immediately assume "bloated." In API tooling especially, products like Postman have shaped that perception so strongly that other Electron-based tools often inherit the blame by association, whether it is deserved or not.

The concern is not fake. But the diagnosis is usually too shallow. A badly designed app can be heavy in any stack. Electron just makes the blame more visible.

---

## Transparency Over Pretending

Instead of treating resource usage as something to hide, we think the better approach is to show it, own it, and keep improving it. If Voiden is consuming more memory than it should, users should be able to see that and report it. We would rather be open about the current footprint and keep optimizing it than pretend the tradeoff does not exist.

That is also why Electron's own reasoning resonated with us. Their argument is not that size does not matter — they openly acknowledge the tradeoff. Their case is that bundling Chromium, V8, and Node gives developers more control over stability, security, and cross-platform consistency, instead of depending on whatever webview the operating system happens to ship. For a product like Voiden, that kind of predictability is worth a lot.

---

## Web Where It Makes Sense, Native Where It Does Not

Electron does not force an either-or choice between web and native. Use web technologies where they make sense. Use native code where you need deeper system access. For Voiden — with its filesystem integration, local script execution, Git panel, and offline-first architecture — that flexibility matters a great deal.

---

## The Decision Stands

We are not religious about this. Things evolve, ecosystems mature, and we are not closing the door on anything forever. But when we made this decision, and even looking at it now, we believe it was the right call.

We would rather build on a mature, reliable foundation and do the product justice than chase premature optimizations that look good in a benchmark but create instability where users actually feel it.

We chose Electron not because it was the lightest option, but because it was the most dependable foundation for building Voiden well. And we will take stability, reliability, and real-world product quality over premature optimization every single time.
