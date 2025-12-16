import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Automatically generate sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Getting Started</span>",
      defaultStyle: true
    },
    {
      type: 'doc',
      id: 'getting-started-section/intro',
      label: 'Welcome to Voiden hub',
    },
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started-section/getting-started/installation", "getting-started-section/getting-started/quick-start", "getting-started-section/getting-started/postman-import", "getting-started-section/getting-started/openapi-imports", "getting-started-section/getting-started/the-basics"],
    },
    {
      type: 'category',
      label: 'Settings',
      items: ['getting-started-section/settings/appearance-setting', 'getting-started-section/settings/general-setting']
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Core Feature</span>",
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Voiden Blocks",
      items: ["core-features-section/voiden-blocks/voiden-blocks-intro", "core-features-section/voiden-blocks/voiden-basic-blocks",
        {
          type: "category",
          label: "REST Blocks",
          items: ["core-features-section/voiden-blocks/rest-blocks/endpoint-block", "core-features-section/voiden-blocks/rest-blocks/headers-block", "core-features-section/voiden-blocks/rest-blocks/json-block", "core-features-section/voiden-blocks/rest-blocks/xml-block", "core-features-section/voiden-blocks/rest-blocks/query-params-block", "core-features-section/voiden-blocks/rest-blocks/path-params-block", "core-features-section/voiden-blocks/rest-blocks/multipart-table-block", "core-features-section/voiden-blocks/rest-blocks/url-encoded-block", "core-features-section/voiden-blocks/rest-blocks/binary-file-block"]
        },
        {
          type: "category",
          label: "Socket Blocks",
          items: [
            "core-features-section/voiden-blocks/web-socket",
            "core-features-section/voiden-blocks/grpcs"
          ],
        },
        {
          type: "category",
          label: "Authorization",
          items: ["core-features-section/voiden-blocks/advanced-authorization/basic-auth-block", "core-features-section/voiden-blocks/advanced-authorization/api-key-block", "core-features-section/voiden-blocks/advanced-authorization/auth-bearer-block", "core-features-section/voiden-blocks/advanced-authorization/auth-digest-block", "core-features-section/voiden-blocks/advanced-authorization/auth-oauth1-block", "core-features-section/voiden-blocks/advanced-authorization/auth-oauth2-block"],
        },
        "core-features-section/voiden-blocks/assertion-block",
        "core-features-section/voiden-blocks/reusable-blocks"

      ],
    },
    {
      type: "category",
      label: "Voiden Variables",
      items: ["core-features-section/variables/variables-overview", "core-features-section/variables/enviroment-variables", "core-features-section/variables/runtime-variables"],
    },
    {
      type: 'html',
      value: "<span class='sidebar-section-title'>Git</span>",
      defaultStyle: true
    },
    {
      type: "category",
      label: "Git Integration",
      items: ["git-integration/overview", "git-integration/git-integration-cli", "git-integration/git-integration-gui"],
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Plugins</span>",
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'plugins/intro',
      label: 'Introduction',
    },
    {
      type: "category",
      label: "Core Plugins",
      items: ["plugins/core-plugins/voiden-rest-api", "plugins/core-plugins/md-preview", "plugins/core-plugins/advanced-authentication", "plugins/core-plugins/openapi-collection-importer", "plugins/core-plugins/postman-collection-importer", "plugins/core-plugins/simple-assertion", "plugins/core-plugins/voiden-faker", "plugins/core-plugins/socket and grpcs"],
    },
    {
      type: "category",
      label: "Community Plugins",
      items: ["plugins/community-plugins/overview"],
    },
    {
      type: 'doc',
      id: "plugins/build-a-plugin",
      label: 'Create Your First Plugin'
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Developer Tools</span>",
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'developer-tools/voiden-cli',
      label: 'Voiden CLI',
    },
  ],

};

export default sidebars;

