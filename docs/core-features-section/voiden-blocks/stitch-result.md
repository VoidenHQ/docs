---
  id: stitch-result
  title: Stitch Blocks
  sidebar_label: Stitch Blocks
---

# Stitch Blocks <span style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"11px",fontWeight:"600",letterSpacing:"0.4px",padding:"3px 9px",borderRadius:"20px",background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff",verticalAlign:"middle",marginLeft:"8px",boxShadow:"0 1px 4px rgba(139,92,246,0.4)",textTransform:"uppercase"}}><img src="/img/flask-conical.svg" width="12" style={{filter:"brightness(0) invert(1)"}} />Beta</span>

Testing APIs one by one is fine — but what if you could run all the requests across your files automatically and get a clear pass/fail report for each one? That's exactly what **Stitch Blocks** does.

Stitch Blocks is an automation block that lets you select which files to run, configure how the run behaves, and execute everything in one go — no manual triggering, no jumping between files. Just a clean, automated run from start to finish.

Looking for the plugin details? [Check out the Voiden Stitch Plugin →](/docs/plugins/core-plugins/voiden-stitch/voiden-stitch.md)

---

## How to Insert

In your Voiden file, type `/stitch` and press **Enter** to create a **Stitch Runner**. The block will appear in your file, ready to configure.

![insert-block](/img/stitch-block/stitch-insert.gif)

---

## Configuring the Block

Once the Stitch Block is inserted, you'll see a set of options to control exactly how your run behaves.

![stitch-block](/img/stitch-block/stitch-block.png)

### Include

Select the folders you want to include in the run. Voiden will pick up all `.void` files within the selected folders and queue them for execution.

### Exclude

Select specific files you want to skip. Any file added here will be left out of the run, even if it sits inside an included folder.

### Environment

Set the environment you want to use for the run. This ensures all your requests use the right variables and base URLs for the selected environment.

### Stop on Failure

When enabled, the run stops as soon as a request fails — so you can catch issues early without waiting for the entire run to finish. When disabled, Voiden continues running all files regardless of failures.

### Isolate Variables

When enabled, each file runs in its own isolated variable scope. Changes made to variables in one file won't carry over to the next. When disabled, variable state is shared across all files in the run.

### Delay Between Files

Set a delay between each file execution. This is useful when your APIs have rate limits or when you need a small gap between runs to let things settle.

## Review the Files

Before hitting run, you can see the full list of files queued for execution. This gives you a clear picture of exactly what will run, so there are no surprises.

---

## Running Your Files

Once everything is configured, hit the **Run** button to kick off the automated run. Voiden will execute each file in sequence and once complete, you'll see the **Stitch Result** — a clear pass/fail breakdown for every file that was run, all in one place.

![stitch-run](/img/stitch-block/stitch-run.gif)

---

## Summary

Stitch Blocks gives you full control over automated API runs — choose your files, set your environment, configure the run behavior, and fire. It's the fastest way to validate multiple `.void` files at once and stay confident that your APIs are working exactly as expected.
