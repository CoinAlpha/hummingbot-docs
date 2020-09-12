const themeOptions = require('gatsby-theme-apollo-docs/theme-options');

module.exports = {
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Hummingbot docs',
        description: 'Documentation for Hummingbot, the open source framework that helps you build and run crypto trading bots',
        githubRepo: 'coinalpha/hummingbot',
        spectrumPath: '/',
        sidebarCategories: {
          null: [
            'index', 
            'intro/ecosystem', 
            'intro/support'
          ],
          'Tutorial': [
            'tutorial/overview',
            'tutorial/install',
            'tutorial/configure',
            'tutorial/run',
          ],
          'Installation': [
            'installation/overview',
            'installation/download',
            'installation/docker',
            'installation/source',
          ],
          'Resources': [
            'resources/faq',
            'resources/glossary',
            '[Hummingbot whitepaper](https://hummingbot.io/hummingbot.pdf)',
          ],
        },
        navConfig: {
          'Hummingbot docs': {
            url: 'https:/docs.hummingbot.io',
            description:
              'Documentation for Hummingbot, the open source framework that helps you build and run crypto trading bots',
            omitLandingPage: true
          },
          'Hummingbot Miner docs': {
            url: 'https:/docs.hummingbot.io/miner',
            description:
              'Documentation for Hummingbot Miner, the decentralized market making platform'
          },
          'Hummingbot for Developers': {
            url: 'https:/docs.hummingbot.io/developers',
            description:
              "Learn how to build Hummingbot trading strategies and connectors for any exchange or protocol"
          },
        },
        footerNavConfig: {
          'Hummingbot website': {
            href: 'https://hummingbot.io',
            target: '_blank',
            rel: 'noopener noreferrer'
          },
          'Hummingbot Miner': {
            href: 'https://miner.hummingbot.io',
            target: '_blank',
            rel: 'noopener noreferrer'
          },
          Blog: {
            href: 'https://hummingbot.io/blog',
            target: '_blank',
            rel: 'noopener noreferrer'
          },
        },
        twitterHandle: 'hummingbot_io',
        youtubeUrl: 'https://www.youtube.com/channel/UCxzzdEnDRbylLMWmaMjywOA?view_as=subscriber',
        logoLink: 'http://docs.hummingbot.io',
      },
    },
  ],
};
