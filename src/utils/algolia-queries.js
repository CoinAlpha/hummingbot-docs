const mdxQuery = `{
  pages: allMdx(
    filter: {
      fileAbsolutePath: { regex: "/content/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          description
        }
        fields {
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}
`;
const unnestFrontmatter = (node) => {
  const { frontmatter, ...rest } = node;

  return {
    ...frontmatter,
    ...rest,
  };
};

const queries = [
  {
    query: mdxQuery,
    transformer: ({ data }) =>
      data.pages.edges.map((edge) => edge.node).map(unnestFrontmatter),
  },
];

module.exports = queries;
