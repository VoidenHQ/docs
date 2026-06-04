import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_URL =
  'https://raw.githubusercontent.com/VoidenHQ/plugin-registry/main/extensions.json';
const OUTPUT_DIR = join(__dirname, '../docs/plugins/community-plugins');

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

/**
 * Rewrite relative image/link src in markdown to absolute GitHub raw URLs so
 * they render correctly when the README is embedded in the docs site.
 */
function rewriteRelativeUrls(markdown, repo, branch) {
  const rawBase = `https://raw.githubusercontent.com/${repo}/${branch}`;
  const htmlBase = `https://github.com/${repo}/blob/${branch}`;

  // Markdown images: ![alt](./path) or ![alt](path)
  markdown = markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (_, alt, src) => {
      const cleanSrc = src.startsWith('./') ? src.slice(2) : src;
      return `![${alt}](${rawBase}/${cleanSrc})`;
    }
  );

  // Markdown links: [text](./path) — only relative paths, skip anchors
  markdown = markdown.replace(
    /\[([^\]]*)\]\((?!https?:\/\/)(?!#)([^)]+)\)/g,
    (_, text, href) => {
      const cleanHref = href.startsWith('./') ? href.slice(2) : href;
      return `[${text}](${htmlBase}/${cleanHref})`;
    }
  );

  return markdown;
}

async function fetchReadme(repo) {
  for (const branch of ['main', 'master']) {
    try {
      const url = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;
      const text = await fetchText(url);
      return { text, branch };
    } catch {
      // try next branch
    }
  }
  return null;
}

async function main() {
  console.log('Fetching plugin registry...');
  const registry = JSON.parse(await fetchText(REGISTRY_URL));
  const communityPlugins = registry.filter((p) => p.type === 'community');

  console.log(`Found ${communityPlugins.length} community plugin(s)`);
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const plugin of communityPlugins) {
    const { id, name, repo, description = '', author = '', version = '' } = plugin;

    const result = await fetchReadme(repo);
    let body;

    if (result) {
      body = rewriteRelativeUrls(result.text, repo, result.branch);
      // Strip the first H1 if it matches the plugin name to avoid duplication
      // with the frontmatter title Docusaurus renders
      body = body.replace(/^#\s+.+\n?/, '');
      console.log(`  ✓ ${id} — README fetched from ${repo}`);
    } else {
      body = `> No README found for this plugin.\n\n${description}`;
      console.warn(`  ⚠ ${id} — no README found, using description fallback`);
    }

    const escapedDescription = description.replace(/"/g, '\\"');
    const content = `---
id: ${id}
title: "${name}"
sidebar_label: "${name}"
description: "${escapedDescription}"
custom_edit_url: "https://github.com/${repo}"
---

:::info Plugin Info
**Author:** ${author} &nbsp;|&nbsp; **Version:** ${version} &nbsp;|&nbsp; **Repository:** [${repo}](https://github.com/${repo})
:::

${body}
`;

    writeFileSync(join(OUTPUT_DIR, `${id}.md`), content);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
