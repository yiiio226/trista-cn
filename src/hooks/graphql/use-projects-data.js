import { useStaticQuery, graphql } from "gatsby"
export const useProjectsData = () => {
  const { cms } = useStaticQuery(
    graphql`
      query ProjectsQuery {
        cms {
          projects: entries(section: "project") {
            id
            title
            slug
            ... on CMS_project_project_Entry {
              projectContentBody {
                ... on CMS_projectContentBody_image_BlockType {
                  id
                  typeHandle
                  image {
                    id
                    url
                    ... on CMS_images_Asset {
                      localImage {
                        publicURL
                        childImageSharp {
                          fluid(maxWidth: 1120, quality: 95) {
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      }
                    }
                  }
                }
              }
              heroPicture {
                id
                url
                ... on CMS_images_Asset {
                  localImage {
                    publicURL
                    childImageSharp {
                      fluid(maxWidth: 1200, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              projectCover {
                id
                url
                ... on CMS_images_Asset {
                  localImage {
                    publicURL
                    childImageSharp {
                      fluid(maxWidth: 1200, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              projectVideo {
                id
                url
                ... on CMS_videos_Asset {
                  localVideo {
                    publicURL
                  }
                }
                mimeType
                size
              }
              projectVideoSmall {
                id
                url
                ... on CMS_videos_Asset {
                  localVideo {
                    publicURL
                  }
                }
                mimeType
                size
              }
            }
          }
        }
      }
    `
  )
  return cms.projects
}
