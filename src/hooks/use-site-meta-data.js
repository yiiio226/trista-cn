import { useStaticQuery, graphql } from "gatsby"

/** @deprecated Use hooks/graphql/use-site-meta-data instead */
export const useSiteMetadata = () => {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query SiteMetaData {
  //       site {
  //         siteMetadata {
  //           title
  //           description
  //           author
  //           menuLinks {
  //             name
  //             link
  //           }
  //         }
  //       }
  //     }
  //   `
  // )
  // return site.siteMetadata
}
