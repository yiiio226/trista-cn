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

export const Container = styled.div`
  margin: 0 auto;
  max-width: ${props =>
    props.isFullWidth
      ? "100%"
      : props.sideDistance
      ? "calc(100vw - " + props.sideDistance * 2 + "px)"
      : props.theme.mobileWidth + "px"};
  padding: 0
    ${props =>
      props.isFullWidth
        ? props.sideDistance
          ? props.sideDistance + "px"
          : "calc((100vw - " + props.theme.mobileWidth + "px)/2)"
        : 0};
`

export const Layout = ({ sideDistance, children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main>{children}</main>
        <Gap gapSize={100} />
        <Container sideDistance={sideDistance}>
          <Footer />
        </Container>
        <Gap gapSize={100} />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
