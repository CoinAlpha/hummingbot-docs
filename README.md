# Hummingbot Documentation

This is the documentation **source** for this repository.

The **deployed** version of the documentation for this repository is available at:

- https://docs.hummingbot.io/

## Gatsby theme apollo documentation

The documentation on [gatsby-theme-apollo-docs](https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages/gatsby-theme-apollo-docs#gatsby-theme-apollo-docs) provides detailed information for the documentation framework itself.

## Running and making changes locally

**This site requires Node version 12 and above**

1. Install required dependencies

```
npm install
```

2. Run development server

```
npm start
```

3. Open http://localhost:8000/ in web browser to preview locally

## Deploy previews

Documentation repositories should be setup with a "deploy preview" feature which automatically provides "preview" links in the _status checks_ section of pull requests.

In the event that it's not possible to run the documentation locally, pushing changes to the branch then viewing deploy previews from a pull request can be a suitable alternative that ensures changes to the documentation are properly rendered.

1. Push changes to your branch
2. Create a pull request
3. Click **Details** next to "**deploy/netlify** Deploy preview ready!" from the pull request
