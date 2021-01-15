# Hummingbot Client Documentation

This repository is documentation for the [Hummingbot](https://hummingbot.io) trading bot client, whose github repo can be found [here](https://github.com/coinalpha/hummingbot).

The **deployed** version of this documentation is available at:

- https://docs.hummingbot.io/

## gatsby-theme-apollo-docs

This site uses [gatsby-theme-apollo-docs](https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-docs).

1. Install required dependencies

### Setup

#### `.env`

If you are going to build and update site indexing for Algolia, you will need to save the `env-template` file as `.env` locally and populate the variable values. Currently, we only use environment values for Algolia search.

#### node

Node versions this repo has been successfully been run and tested with: 10.22.1, 12.19.0

### Running

- `yarn install` to install dependencies
- `yarn start` to launch local server
- Open a browser to the link provided in the console

## Deploy previews

Each pull request will be built and available for preview on netlify. To access the preview, look for the link in the status checks of the pull request.

1. Push changes to your branch
2. Create a pull request
3. Click **Details** next to "**deploy/netlify** Deploy preview ready!" from the pull request

## Deployment

This site uses [Algolia search](https://algolia.com) which requires the environment variables from `env-template`.

## Troubleshooting

Gatsby and react often results in conflicts. If you have errors running `npm start` or `gatsby develop`:

- you may need to try to uninstall and reinstall `react`, `react-dom`, and `gatsby` ([reference](https://github.com/gatsbyjs/gatsby/issues/19827#issuecomment-573986378))
- you can also try `yarn install` instead of `npm install`

## Contributions

When contributing, please review the [contributing guidelines](https://docs.hummingbot.io/developer/contributing/)

**Note**: Use `master` as base branch


## Components

### Callout

The Callout component uses custom css to provide 6 callout types, to use it in any mdx file, first import the component.
```
import Callout from "../../src/components/Callout";
```
1. Use the Callout tag to add the component, it takes props: `type` (callout type), `body`, `link`, `linkName`. link and linkName are always at the end of the body. If you don't need any link, you can leave `link` and `linkName` blank.
2. There are 6 different callout types: success, warning, danger, info, bug, quote. These are input for the Callout component's `type` prop, to render that type of callout.
3. You can use tags ` `` ` to surround text in the body input string to highlight, you can also use tags ` ## ` to surround text in the body input string to bold.

**Note:** Try to close each tag when bolding or highlighting body text, currently can't nest bold and highlight tags.

#### Example:
```
<Callout type="warning" body="#Binance# Perpetual connector is released as `beta version(0.33)`, trade it with your own risk. #Binance Perpetual is different from futures contract#, please see" link="https://www.binance.com/en/support/faq/360033524991" linkName="differences"/>
```

