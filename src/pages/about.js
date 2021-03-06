import React from "react"
import ReactMarkdown from "react-markdown/with-html"
import styled from "styled-components"
import _get from "lodash/get"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import {
  AboutBody,
  AboutBodySection,
  AboutBodyPhotos,
  Container,
  FadeInUp,
  Gap,
  Header,
  Layout,
  PhotoGallery,
  SEO,
} from "../components"
import { useFooterData, useSiteMetadata } from "../hooks/graphql"

const HeroPic = styled(Img)`
  margin: 0 auto;
  max-width: 1200px;
  width: calc(100vw - 60px);

  @media (max-width: 1440px) {
    width: 83.33vw;
  }

  @media (max-width: 780px) {
    width: calc(100vw - 40px);
  }
`

const AboutPage = ({ data }) => {
  const { siteMainMenu, siteTitle } = useSiteMetadata()
  const footer = useFooterData()
  const descriptionInfo = _get(data, "cms.about.descriptionInfo")
  const heroPic = _get(data, "cms.about.heroPicture[0]")
  const photos = _get(data, "cms.about.photos")

  return (
    <Layout
      center={true}
      footerLinks={footer.usefulLinks}
      footnote={footer.footnote}
    >
      <Container isFullWidth>
        <Header menuLinks={siteMainMenu} siteTitle={siteTitle} />
        <SEO title="关于我" />
        <Gap gapSize={180} mobileGapSize={100} />
        {heroPic && (
          <HeroPic
            fluid={heroPic.localImage.childImageSharp.fluid}
            alt="Trista hero picture"
          />
        )}
      </Container>
      <Gap gapSize={200} mobileGapSize={60} />
      <AboutBody>
        {descriptionInfo &&
          descriptionInfo.map((s, i) => (
            <AboutBodySection isAlt={i % 2 === 0} key={i} isFullWidth>
              <h2>
                <FadeInUp>{s.blurbTitle}</FadeInUp>
              </h2>
              <FadeInUp>
                <ReactMarkdown source={s.blurbContent} escapeHtml={false} />
              </FadeInUp>
            </AboutBodySection>
          ))}
        <AboutBodyPhotos isAlt isFullWidth>
          <PhotoGallery photos={photos} />
        </AboutBodyPhotos>
      </AboutBody>
    </Layout>
  )
}

export const query = graphql`
  {
    cms {
      about: entry(section: "aboutMe") {
        title
        sectionHandle
        ... on CMS_aboutMe_aboutMe_Entry {
          sectionHandle
          typeHandle
          heroPicture {
            url
            ... on CMS_images_Asset {
              id
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
          }
          descriptionInfo {
            ... on CMS_descriptionInfo_blurb_BlockType {
              blurbTitle
              blurbContent
            }
          }
          photos {
            title
            ... on CMS_photo_photos_Entry {
              photo {
                url
                ... on CMS_images_Asset {
                  id
                  localImage {
                    publicURL
                    childImageSharp {
                      fluid(maxWidth: 640, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                    big: childImageSharp {
                      fluid(maxWidth: 4096, quality: 80) {
                        src
                      }
                    }
                  }
                }
                mimeType
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export default AboutPage
