import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.color};
    font-size: ${props => props.theme.fontSize}px;
    font-family: ${props => props.theme.fontFamily};
  }

  a {
    color: ${props => props.theme.color};
    text-decoration: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    &:hover {
      color: ${props => props.theme.colorTheme};
      border-bottom-color: #266d64;
    }
  }
`
