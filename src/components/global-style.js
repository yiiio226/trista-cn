import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.color};
    font-size: ${props => props.theme.fontSize}px;
    font-family: ${props => props.theme.fontFamily};
  }
`
