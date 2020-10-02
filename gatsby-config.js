const sidebarCategories = {
  null: ["index", "intro/ecosystem", "intro/support"],
  Installation: [
    "installation/overview",
    "installation/download",
    "installation/docker",
    "installation/cloud",
    "installation/source",
    "installation/raspberry",
    "installation/updating",
  ],
  Operation: [
    "operation/client",
    "operation/command-ref",
    "operation/docker-commands",
    "operation/adv-command-ref",
    "operation/telegram",
    "installation/debug",
  ],
  Connectors: [
    "connectors/overview",
    "connectors/binance",
    "connectors/bittrex",
    "connectors/cryto-com",
    "connectors/eterbase",
    "connectors/huobi",
    "connectors/kraken",
    "connectors/kucoin",
    "connectors/liquid",
    "connectors/radar-relay",
    "connectors/bamboo-relay",
    "connectors/dolomite",
  ],
  Strategies: [
    "strategies/overview",
    "strategies/pure-market-making",
    "strategies/cross-exchange-market-making",
    "strategies/arbitrage",
    "strategies/celo-arb",
  ],
  "Advanced Market Making": [
    "strategies/adv-market-making",
    "strategies/order-levels",
    "strategies/inventory-skew",
    "strategies/filled-order-delay",
    "strategies/hanging-orders",
    "strategies/minimum-spread",
    "strategies/order-refresh-tolerance",
    "strategies/price-band",
    "strategies/ping-pong",
    "strategies/order-optimization",
    "strategies/add-transaction-costs",
    "strategies/external-price-source",
  ],
  Scripts: ["scripts/overview"],
  "Developing Connectors": [
    "developer/overview",
    "developer/architecture",
    "developer/tutorial",
    "developer/task1",
    "developer/task2",
    "developer/task3",
    "developer/task4",
    "developer/miscellaneous",
  ],
  "Developing Strategies": [
    "developer/strategies-overview",
    "developer/pure-market-making",
    "developer/cross-exchange-market-making",
    "developer/twap",
    "developer/arbitrage",
    "developer/build-strategy",
  ],
  "Release Notes": [
    "release-notes/0.31.0",
    "release-notes/0.30.0",
    "release-notes/0.29.0",
    "release-notes/0.28.1",
    "release-notes/0.28.0",
    "release-notes/0.27.0",
    "release-notes/0.26.1",
    "release-notes/0.26.0",
    "release-notes/0.25.0",
    "release-notes/0.24.1",
    "release-notes/0.24.0",
    "release-notes/0.23.0",
    "release-notes/0.22.0",
    "release-notes/0.21.0",
    "release-notes/0.20.0",
    "release-notes/0.19.1",
    "release-notes/0.18.1",
    "release-notes/0.18.0",
    "release-notes/0.17.1",
    "release-notes/0.17.0",
    "release-notes/0.16.0",
    "release-notes/0.15.0",
    "release-notes/0.14.0",
    "release-notes/0.13.0",
    "release-notes/0.12.1",
    "release-notes/0.12.0",
    "release-notes/0.11.1",
    "release-notes/0.11.0",
    "release-notes/0.10.1",
    "release-notes/0.10.0",
    "release-notes/0.9.1",
    "release-notes/0.9.0",
    "release-notes/0.8.1",
    "release-notes/0.8.0",
    "release-notes/0.7.0",
    "release-notes/0.6.0",
    "release-notes/0.5.1",
    "release-notes/0.5.0",
    "release-notes/0.4.0",
    "release-notes/0.3.1",
    "release-notes/0.3.0",
    "release-notes/0.2.0",
  ],
  Resources: [
    "resources/faq",
    "resources/glossary",
    "[Hummingbot whitepaper](https://hummingbot.io/hummingbot.pdf)",
  ],
};

const navConfig = {
  "Hummingbot Docs": {
    url: "https://docs.hummingbot.io",
    description:
      "Documentation for Hummingbot, the open source framework that helps you build and run crypto trading bots",
    omitLandingPage: true,
  },
  "Hummingbot Miner Docs": {
    url: "https://docs.hummingbot.io/miner",
    description:
      "Documentation for Hummingbot Miner, the decentralized market making platform",
  },
  "Hummingbot Academy": {
    url: "https://hummingbot.io/academy",
    description:
      "Guides and tutorials that teach you how to use Hummingbot and Hummingbot Miner",
  },
};

const footerNavConfig = {
  "Hummingbot website": {
    href: "https://hummingbot.io",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  "Hummingbot Miner": {
    href: "https://miner.hummingbot.io",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  Blog: {
    href: "https://hummingbot.io/blog",
    target: "_blank",
    rel: "noopener noreferrer",
  },
};

module.exports = {
  siteMetadata: {
    headerButtonText: "Launch Hummingbot Miner",
    headerButtonLink: "https://miners.hummingbot.io/",
    discordUrl: "https://discord.hummingbot.io",
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-theme-apollo-docs",
      options: {
        root: __dirname,
        siteName: "All Hummingbot Documentation",
        description:
          "Documentation for Hummingbot, the open source framework that helps you build and run crypto trading bots",
        sidebarCategories,
        subtitle: "Hummingbot Docs",
        githubRepo: "coinalpha/hummingbot",
        baseUrl: "https://docs.hummingbot.io",
        baseDir: "/",
        navConfig,
        footerNavConfig,
        twitterHandle: "hummingbot_io",
        youtubeUrl: "https://www.youtube.com/channel/UCxzzdEnDRbylLMWmaMjywOA",
        logoLink: "http://docs.hummingbot.io",
        /**
         * @todo Replace these two keys with own keys
         * @see https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-docs#algolia-configuration
         */
        algoliaApiKey: "768e823959d35bbd51e4b2439be13fb7",
        algoliaIndexName: "apollodata",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hummingbot Docs",
        short_name: "Hummingbot",
        start_url: "/",
        background_color: "#0D999E",
        theme_color: "#0D999E",
        icon: "src/images/brand-logo.png",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
        ],
      },
    },
  ],
};
