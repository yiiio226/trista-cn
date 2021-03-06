import React from "react"
import _get from "lodash/get"
import { graphql } from "gatsby"
import styled from "styled-components"

import {
  Container,
  Gap,
  Header,
  Layout,
  ProjectGallery,
  SEO,
  Typing,
} from "../components"
import { useFooterData, useSiteMetadata } from "../hooks/graphql"
import tristaCutoutPng from "../images/trista-cutout.png"

const HomeContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  max-height: 900px;
`

const TristaCutoutCenter = styled.div`
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
  opacity: 0.14;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 306px;
  background-position: center 300px;
  @media (max-width: 780px) {
    background-position: center 240px;
    background-size: 220px;
  }
`

const ProjectsContainer = styled(Container)`
  max-width: 1240px;
  padding: 0 100px;
  @media (max-width: 780px) {
    padding: 0 30px;
  }
`

const IndexPage = ({ data }) => {
  const { siteMainMenu, siteTitle } = useSiteMetadata()
  const footer = useFooterData()
  const tristaCutout = _get(
    data,
    "cms.home.backgroundImage[0].localImage.publicURL",
    tristaCutoutPng
  )

  return (
    <Layout
      center={true}
      footerLinks={footer.usefulLinks}
      footnote={footer.footnote}
    >
      <HomeContentContainer isFullWidth>
        <Header menuLinks={siteMainMenu} siteTitle={siteTitle} />
        <SEO title={"主页"} />
        <Gap gapSize={215} mobileGapSize={155} />
        <TristaCutoutCenter src={tristaCutout} />
        <Typing actions={_get(data, "cms.home.typingSentences")} />
      </HomeContentContainer>
      <Gap gapSize={150} mobileGapSize={80} id="project-gallery" />
      <ProjectsContainer isFullWidth>
        <ProjectGallery
          projects={_get(data, "cms.home.projects")}
          loadByDefault={true}
        />
      </ProjectsContainer>
    </Layout>
  )
}

export const query = graphql`
  {
    cms {
      home: entry(section: "homePage") {
        title
        sectionHandle
        ... on CMS_homePage_homePage_Entry {
          backgroundImage {
            url
            ... on CMS_images_Asset {
              id
              localImage {
                publicURL
              }
            }
            mimeType
            width
            height
          }
          typingSentences {
            ... on CMS_typingSentences_text_BlockType {
              sentence
              duration
              typeHandle
            }
            ... on CMS_typingSentences_clear_BlockType {
              duration
              typeHandle
            }
            ... on CMS_typingSentences_sleep_BlockType {
              duration
              typeHandle
            }
            ... on CMS_typingSentences_flashCursor_BlockType {
              duration
              typeHandle
            }
          }
          projects {
            id
            title
            slug
            ... on CMS_project_project_Entry {
              isProtected
              projectTitleShort
              projectTileIsInversedColor
              heroPicture {
                url
                ... on CMS_images_Asset {
                  id
                  localImage {
                    publicURL
                  }
                }
                mimeType
                width
                height
                size
              }
              projectCardAssets {
                __typename
                ... on CMS_projectCardAssets_videoSquare_BlockType {
                  id
                  standard {
                    url
                    ... on CMS_videos_Asset {
                      id
                      localVideo {
                        publicURL
                      }
                    }
                  }
                  small {
                    url
                    ... on CMS_videos_Asset {
                      id
                      localVideo {
                        publicURL
                      }
                    }
                  }
                  cover {
                    url
                    ... on CMS_images_Asset {
                      id
                      localImage {
                        publicURL
                      }
                    }
                  }
                }
                ... on CMS_projectCardAssets_videoWide_BlockType {
                  id
                  standard {
                    url
                    ... on CMS_videos_Asset {
                      id
                      localVideo {
                        publicURL
                      }
                    }
                  }
                  small {
                    url
                    ... on CMS_videos_Asset {
                      id
                      localVideo {
                        publicURL
                      }
                    }
                  }
                  cover {
                    url
                    ... on CMS_images_Asset {
                      id
                      localImage {
                        publicURL
                      }
                    }
                  }
                }
                ... on CMS_projectCardAssets_imageSquare_BlockType {
                  id
                  standard {
                    url
                    ... on CMS_images_Asset {
                      id
                      localImage {
                        publicURL
                      }
                    }
                  }
                }
                ... on CMS_projectCardAssets_imageWide_BlockType {
                  id
                  standard {
                    url
                    ... on CMS_images_Asset {
                      id
                      localImage {
                        publicURL
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
