import React from "react"
import ReactMarkdown from "react-markdown/with-html"
import styled from "styled-components"
import _get from "lodash/get"
import { graphql } from "gatsby"

import {
  AboutBody,
  AboutBodySection,
  AboutBodyPhotos,
  Container,
  Gap,
  Header,
  Layout,
  PhotoGallery,
  SEO,
} from "../components"
import { useFooterData, useSiteMetadata } from "../hooks/graphql"
import "../styles/animate.min.css"

const HeroPic = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 1200px;
  width: calc(100vw - 60px);
  height: auto;
`

const AboutPage = ({ data }) => {
  const { siteMainMenu, siteTitle } = useSiteMetadata()
  const footer = useFooterData()
  const descriptionInfo = _get(data, "cms.about.descriptionInfo")
  const heroPic = _get(data, "cms.about.heroPicture[0]")
  const photos = _get(data, "cms.about.photos")

  return (
    <Layout center={true} footerLinks={footer.usefulLinks}>
      <Container isFullWidth>
        <Header menuLinks={siteMainMenu} siteTitle={siteTitle} />
        <SEO title="关于我" />
        <Gap gapSize={180} />
        <HeroPic src={heroPic.url} />
      </Container>
      <Gap gapSize={200} />
      <AboutBody>
        {descriptionInfo &&
          descriptionInfo.map((s, i) => (
            <AboutBodySection isAlt={i % 2 === 0} key={i}>
              <h2>{s.blurbTitle}</h2>
              <ReactMarkdown source={s.blurbContent} escapeHtml={false} />
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
