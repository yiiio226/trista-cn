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

export const Container = styled.div`
  margin: 0 auto;
  max-width: ${props =>
    props.sideDistance
      ? "calc(100vw - " + props.sideDistance * 2 + "px)"
      : props.theme.mobileWidth + "px"};
`

export const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
