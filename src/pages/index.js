import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useWindowWidth } from "@react-hook/window-size"
import { Animated } from "react-animated-css"

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
import svgHandPointDown from "../images/icons/hand-point-down.svg"
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
  background-size: 420px;
  background-position: center 205px;
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

const IndexPage = () => {
  const { menuLinks, title } = useSiteMetadata()
  const windowWidth = useWindowWidth()
  console.log("windowWidth", windowWidth)
  const sideDistance =
    windowWidth <= theme.mobileWidth ? theme.gapSize * 3 : 100

  // Disable static content generation, only render lively, mainly due to useWindowWidth()
  // TODO: Replace useWindowWidth()
  if (typeof window === `undefined`) {
    return <></>
  }

  return (
    <Layout center={true} sideDistance={sideDistance}>
      <HomeContentContainer>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={150} />
        <TristaCutoutCenter />
        <Typing />
        {/* <ButtonAnimated
          animationIn="bounce"
          animationInDelay={9500}
          isVisible={true}
        >
          <ContinueButtonLink to="#project-gallery" />
        </ButtonAnimated> */}
      </HomeContentContainer>
      <Container sideDistance={sideDistance}>
        <Gap gapSize={150} id="project-gallery" />
        <ProjectGallery />
      </Container>
    </Layout>
  )
}

export default IndexPage
