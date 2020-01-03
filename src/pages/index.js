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

const FullScreenContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  min-height: 600px;
`

const ButtonAnimated = styled(Animated)`
  position: absolute;
  bottom: 0;
  left: calc(50% - 30px);
`

const ContinueButtonLink = styled(Link)`
  display: block;
  width: 60px;
  height: 90px;
  background-image: url(${svgHandPointDown});
  background-repeat: no-repeat;
  opacity: 0.2;
`

const IndexPage = () => {
  const { menuLinks, title } = useSiteMetadata()
  const windowWidth = useWindowWidth()
  const sideDistance =
    windowWidth <= theme.mobileWidth ? theme.gapSize * 3 : 100

  return (
    <Layout center={true} sideDistance={sideDistance}>
      <FullScreenContainer>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={150} />
        <Typing />
        <ButtonAnimated
          animationIn="bounce"
          animationInDelay={7000}
          isVisible={true}
        >
          <ContinueButtonLink to="#project-gallery" />
        </ButtonAnimated>
      </FullScreenContainer>
      <Gap gapSize={150} id="project-gallery" />
      <Container sideDistance={sideDistance}>
        <ProjectGallery />
      </Container>
    </Layout>
  )
}

export default IndexPage
