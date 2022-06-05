import { useStaticQuery, graphql } from "gatsby"
export const useFooterData = () => {
  const { cms } = useStaticQuery(
    graphql`
      query FooterQuery {
        cms {
          footer: entry(section: "footer") {
            title
            ... on CMS_footer_footer_Entry {
              usefulLinks {
                ... on CMS_usefulLinks_email_BlockType {
                  email
                  typeHandle
                }
                ... on CMS_usefulLinks_links_BlockType {
                  linkText
                  linkHref
                  typeHandle
                }
              }
              footnote
            }
          }
        }
      }
    `
  )
  return cms.footer
}
