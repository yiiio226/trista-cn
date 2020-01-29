import React from "react"
import ReactMarkdown from "react-markdown/with-html"
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
import { Image } from "../components/images/image-trista-big"
import { useSiteMetadata } from "../hooks"
import "../styles/animate.min.css"

const AboutPage = ({ data }) => {
  const { menuLinks, title } = useSiteMetadata()
  const descriptionInfo = _get(data, "cms.about.descriptionInfo")
  const photos = _get(data, "cms.about.photos")

  return (
    <Layout center={true}>
      <Container>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={40} />
        <Image />
      </Container>
      <Gap gapSize={100} />
      <AboutBody>
        {descriptionInfo &&
          descriptionInfo.map((s, i) => (
            <AboutBodySection isAlt={i % 2 === 0} key={i}>
              <h2>{s.blurbTitle}</h2>
              <ReactMarkdown source={s.blurbContent} escapeHtml={false} />
            </AboutBodySection>
          ))}
        <AboutBodyPhotos isAlt isFullWidth sideDistance={120}>
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
