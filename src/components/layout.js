/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"

import "normalize.css"
import { theme } from "../constants/theme"
import { GlobalStyle } from "./global-style"
import { Footer, Gap } from "."
import { Container } from "./container"

const FooterContainer = styled(Container)`
  @media (max-width: 780px) {
    padding: 0 30px;
    max-width: unset;
  }
`

export const Layout = ({ sideDistance, children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main>{children}</main>
        <Gap gapSize={100} />
        <FooterContainer sideDistance={100}>
          <Footer />
        </FooterContainer>
        <Gap gapSize={100} />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
