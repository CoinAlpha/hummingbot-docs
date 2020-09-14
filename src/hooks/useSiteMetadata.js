import { graphql, useStaticQuery } from "gatsby";

export default function useSiteMetadata() {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          headerButtonLink
          headerButtonText
          description
          siteName
          title
        }
      }
    }
  `);

  return site.siteMetadata;
}
