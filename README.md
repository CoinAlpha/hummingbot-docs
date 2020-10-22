# Hummingbot Client Documentation

This repository is documentation for the [Hummingbot](https://hummingbot.io) trading bot client, whose github repo can be found [here](https://github.com/coinalpha/hummingbot).

The **deployed** version of this documentation is available at:

- https://docs.hummingbot.io/

## gatsby-theme-apollo-docs

This site uses [gatsby-theme-apollo-docs](https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-docs).

## Running locally

### Setup

#### `.env`

If you are going to build and update site indexing for Algolia, you will need to save the `env-template` file as `.env` locally and populate the variable values. Currently, we only use environment values for Algolia search.

#### node

Node versions this repo has been successfully been run and tested with: 10.22.1, 12.19.0

### Running

- `npm install` to install dependencies
- `npm start` to launch local server
- Open a browser to the link provided in the console.

## Deploy previews

Documentation repositories should be setup with a "deploy preview" feature which automatically provides "preview" links in the _status checks_ section of pull-requests.

In the event that it's not possible to run the documentation locally, pushing changes to the branch for a pull-request can be a suitable alternative that ensures changes to the documentation are properly rendered.

## Deployment

This site uses [Algolia search](https://algolia.com) which requires the environment variables from `env-template`.

## Troubleshooting

Gatsby and react often results in conflicts. If you have errors running `npm start` or `gatsby develop`:

- you may need to try to uninstall and reinstall `react`, `react-dom`, and `gatsby` ([reference](https://github.com/gatsbyjs/gatsby/issues/19827#issuecomment-573986378))
- you can also try `yarn install` instead of `npm install`
