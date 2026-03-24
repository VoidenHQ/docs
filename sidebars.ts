import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

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
      defaultStyle: true,
    },
    {
      type: 'doc',
      id: 'getting-started-section/intro',
      label: 'Welcome to Voiden Hub',
    },
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: "doc",
        id: "getting-started-section/getting-started/installation",
      },
      items: [
        "getting-started-section/getting-started/installation",
        "getting-started-section/getting-started/quick-start",
        "getting-started-section/getting-started/postman-import",
        "getting-started-section/getting-started/openapi-imports",
        "getting-started-section/getting-started/openapi-validation",
        "getting-started-section/getting-started/the-basics",
      ],
    },
    {
      type: "category",
      label: "Settings",
      link: {
        type: "doc",
        id: "getting-started-section/settings/appearance-setting",
      },
      items: [
        "getting-started-section/settings/appearance-setting",
        "getting-started-section/settings/general-setting",
      ],
    },
    {
      type: "doc",
      id: "getting-started-section/getting-started/why-electron",
      label: "Why Voiden is Built on Electron?",
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Core Feature</span>",
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Voiden Blocks",
      link: {
        type: "doc",
        id: "core-features-section/voiden-blocks/voiden-blocks-intro",
      },
      items: [
        "core-features-section/voiden-blocks/voiden-blocks-intro",
        "core-features-section/voiden-blocks/voiden-basic-blocks",
        {
          type: "category",
          label: "REST Blocks",
          link: {
            type: "doc",
            id: "core-features-section/voiden-blocks/rest-blocks/endpoint-block",
          },
          items: [
            "core-features-section/voiden-blocks/rest-blocks/endpoint-block",
            "core-features-section/voiden-blocks/rest-blocks/headers-block",
            "core-features-section/voiden-blocks/rest-blocks/json-block",
            "core-features-section/voiden-blocks/rest-blocks/xml-block",
            "core-features-section/voiden-blocks/rest-blocks/query-params-block",
            "core-features-section/voiden-blocks/rest-blocks/path-params-block",
            "core-features-section/voiden-blocks/rest-blocks/multipart-table-block",
            "core-features-section/voiden-blocks/rest-blocks/url-encoded-block",
            "core-features-section/voiden-blocks/rest-blocks/binary-file-block",
            "core-features-section/voiden-blocks/rest-blocks/options-block",
          ],
        },
        {
          type: "category",
          label: "Socket & gRPC Blocks",
          link: {
            type: "doc",
            id: "core-features-section/voiden-blocks/web-socket",
          },
          items: [
            "core-features-section/voiden-blocks/web-socket",
            "core-features-section/voiden-blocks/grpcs",
          ],
        },
        {
          type: "category",
          label: "Authorization",
          link: {
            type: "doc",
            id: "core-features-section/voiden-blocks/advanced-authorization/basic-auth-block",
          },
          items: [
            "core-features-section/voiden-blocks/advanced-authorization/basic-auth-block",
            "core-features-section/voiden-blocks/advanced-authorization/api-key-block",
            "core-features-section/voiden-blocks/advanced-authorization/auth-bearer-block",
            "core-features-section/voiden-blocks/advanced-authorization/auth-digest-block",
            "core-features-section/voiden-blocks/advanced-authorization/auth-oauth1-block",
            "core-features-section/voiden-blocks/advanced-authorization/auth-oauth2-block",
          ],
        },
        "core-features-section/voiden-blocks/assertion-block",
        "core-features-section/voiden-blocks/reusable-blocks",
        "core-features-section/voiden-blocks/stitch-result",
        {
          type: "category",
          label: "GraphQL Blocks",
          link: {
            type: "doc",
            id: "core-features-section/voiden-blocks/graphql-query",
          },
          items: [
            "core-features-section/voiden-blocks/graphql-query",
            "core-features-section/voiden-blocks/graphql-variable",
          ],
        },
        {
          type: "category",
          label: "Pre & Post Script Blocks",
          link: {
            type: "doc",
            id: "core-features-section/voiden-blocks/pre-post-script/pre-script",
          },
          items: [
            "core-features-section/voiden-blocks/pre-post-script/pre-script",
            "core-features-section/voiden-blocks/pre-post-script/post-script"
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Voiden Variables",
      link: {
        type: "doc",
        id: "core-features-section/variables/variables-overview",
      },
      items: [
        "core-features-section/variables/variables-overview",
        "core-features-section/variables/environment-variables",
        "core-features-section/variables/runtime-variables",
      ],
    },
    {
      type: "doc",
      id: "core-features-section/history/history-overview",
      label: "Execution History",
    },
    {
      type:"doc",
      id: "core-features-section/multiple-endpoints/multiple-endpoints-overview",
      label: "Multiple Requests",
    },
     {
      type: 'doc',
      id: 'getting-started-section/advanced-environment-config',
      label: 'Advanced Environment Configuration',
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Git</span>",
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Git Integration",
      link: {
        type: "doc",
        id: "git-integration/overview",
      },
      items: [
        "git-integration/overview",
        "git-integration/git-integration-cli",
        "git-integration/git-integration-gui",
      ],
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Plugins</span>",
      defaultStyle: true,
    },
    {
      type: "doc",
      id: "plugins/intro",
      label: "Introduction",
    },
    {
      type: "category",
      label: "Core Plugins",
      link: {
        type: "doc",
        id: "plugins/core-plugins/voiden-rest-api",
      },
      items: [
        "plugins/core-plugins/voiden-rest-api",
        "plugins/core-plugins/md-preview",
        "plugins/core-plugins/advanced-authentication",
        "plugins/core-plugins/openapi-collection-importer",
        "plugins/core-plugins/postman-collection-importer",
        "plugins/core-plugins/simple-assertion",
        "plugins/core-plugins/voiden-faker",
        {
          type: "category",
          label: "Socket & gRPC APIs ",
          link: {
            type: "doc",
            id: "plugins/core-plugins/socket/overview",
          },
          items: [
            "plugins/core-plugins/socket/overview",
            "plugins/core-plugins/socket/web-socket",
            "plugins/core-plugins/socket/grpc",
          ],
        },
        "plugins/core-plugins/voiden-graphql",
        "plugins/core-plugins/voiden-scripting",
      ],
    },
    {
      type: "category",
      label: "Community Plugins",
      link: {
        type: "doc",
        id: "plugins/community-plugins/overview",
      },
      items: ["plugins/community-plugins/overview"],
    },
    {
      type: "category",
      label: "Build a Plugin",
      link: {
        type: "doc",
        id: "plugins/build-a-plugin",
      },
      items: [
        "plugins/build-a-plugin",
        "plugins/building-plugins/overview",
        "plugins/building-plugins/getting-started",
        "plugins/building-plugins/plugin-api",
        "plugins/building-plugins/manifest-reference",
      ],
    },
    {
      type: "html",
      value: "<span class='sidebar-section-title'>Developer Tools</span>",
      defaultStyle: true,
    },
    {
      type: "doc",
      id: "developer-tools/voiden-cli",
      label: "Voiden CLI",
    },
  ],
};

export default sidebars;
