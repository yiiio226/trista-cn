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
  max-width: 1240px;
  padding: 0 100px;
  @media (max-width: 780px) {
    padding: 0 30px;
    max-width: unset;
  }
`

export const Layout = ({ footerLinks, footnote, children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main>{children}</main>
        <Gap gapSize={100} />
        <FooterContainer isFullWidth>
          <Footer links={footerLinks} footnote={footnote} />
        </FooterContainer>
        <Gap gapSize={60} shrinkOnMobile={false} />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
