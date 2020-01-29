import React from "react"
import _get from "lodash/get"
import { graphql } from "gatsby"
import styled from "styled-components"
import { useWindowWidth } from "@react-hook/window-size"
// import { Animated } from "react-animated-css"

import {
  Container,
  Gap,
  Header,
  Layout,
  ProjectGallery,
  SEO,
  Typing,
} from "../components"
import { useSiteMetadata } from "../hooks"
import { theme } from "../constants/theme"
// import svgHandPointDown from "../images/icons/hand-point-down.svg"
import "../styles/animate.min.css"
import tristaCutout from "../images/trista-cutout.png"

const HomeContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  min-height: 600px;
`

const TristaCutoutCenter = styled.div`
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
  opacity: 0.14;
  background-image: url(${tristaCutout});
  background-repeat: no-repeat;
  background-size: 306px;
  background-position: center 300px;
`

// const ButtonAnimated = styled(Animated)`
//   position: absolute;
//   bottom: 0;
//   left: calc(50% - 30px);
// `

// const ContinueButtonLink = styled(Link)`
//   display: block;
//   width: 60px;
//   height: 90px;
//   background-image: url(${svgHandPointDown});
//   background-repeat: no-repeat;
//   opacity: 0.2;
// `

const IndexPage = ({ data }) => {
  const { menuLinks, title } = useSiteMetadata()
  const windowWidth = useWindowWidth()
  console.log("windowWidth", windowWidth)
  const sideDistance =
    windowWidth <= theme.mobileWidth ? theme.gapSize * 3 : 100

  // console.log("home page data", data)

  // Disable static content generation, only render lively, mainly due to useWindowWidth()
  // TODO: Replace useWindowWidth()
  if (typeof window === `undefined`) {
    return <></>
  }

  return (
    <Layout
      center={true}
      sideDistance={sideDistance}
      footerLinks={_get(data, "cms.footer.usefulLinks")}
    >
      <HomeContentContainer>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={235} />
        <TristaCutoutCenter />
        <Typing actions={_get(data, "cms.home.typingSentences")} />
      </HomeContentContainer>
      <Container sideDistance={sideDistance}>
        <Gap gapSize={150} id="project-gallery" />
        <ProjectGallery />
      </Container>
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
            ... on CMS_project_project_Entry {
              heroPicture {
                url
                mimeType
                width
                height
              }
              projectVideo {
                size
                url
              }
              title
            }
          }
        }
      }

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
        }
      }
    }
  }
`

export default IndexPage
