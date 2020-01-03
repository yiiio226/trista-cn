import React from "react"
import styled from "styled-components"
import { useWindowWidth } from "@react-hook/window-size"

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

const ContinueButton = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(50% - 30px);
  width: 60px;
  height: 90px;
  background-color: ${props => props.theme.colorBgPlaceholder};
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
        <ContinueButton />
      </FullScreenContainer>
      <Gap gapSize={150} />
      <Container sideDistance={sideDistance}>
        <ProjectGallery />
      </Container>
    </Layout>
  )
}

export default IndexPage
