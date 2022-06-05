import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { cms } = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        cms {
          siteMetadata: entry(section: "siteMetadata") {
            title
            sectionHandle
            ... on CMS_siteMetadata_siteMetadata_Entry {
              id
              siteTitle
              siteMainMenu {
                ... on CMS_siteMainMenu_menuLink_BlockType {
                  id
                  typeHandle
                  linkLink
                  linkTitle
                }
                ... on CMS_siteMainMenu_clickToCopyLink_BlockType {
                  id
                  linkLink
                  linkTitle
                  typeHandle
                }
              }
              siteDescription
              siteAuthor
            }
          }
        }
      }
    `
  )
  return cms.siteMetadata
}
