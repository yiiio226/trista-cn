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
              projectTitleShort
              projectTileColor
              projectTileColorSmall
              projectTileIsInversedColor
              projectTileIsWide
              projectDescription
              projectClient
              projectMyRole
              projectDuration
              projectContentBody {
                ... on CMS_projectContentBody_textSection_BlockType {
                  typeHandle
                  body
                }
                ... on CMS_projectContentBody_image_BlockType {
                  typeHandle
                  image {
                    url
                    ... on CMS_images_Asset {
                      localImage {
                        childImageSharp {
                          fluid(maxWidth: 1120, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      }
                    }
                    mimeType
                    width
                    height
                    size
                  }
                }
              }
              heroPicture {
                url
                ... on CMS_images_Asset {
                  localImage {
                    childImageSharp {
                      fluid(maxWidth: 1200, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                mimeType
                width
                height
                size
              }
              projectCover {
                url
                ... on CMS_images_Asset {
                  localImage {
                    childImageSharp {
                      fluid(maxWidth: 1200, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                mimeType
                width
                height
                size
              }
              projectVideo {
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
