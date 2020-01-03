import React from "react"
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
import { useSiteMetadata } from "../hooks"

const FullScreenContainer = styled(Container)`
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
  return (
    <Layout center={true}>
      <FullScreenContainer>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={150} />
        <Typing />
        <ContinueButton />
      </FullScreenContainer>
      <Gap gapSize={150} />
      <Container sideDistance={100}>
        <ProjectGallery />
      </Container>
    </Layout>
  )
}

export default IndexPage
