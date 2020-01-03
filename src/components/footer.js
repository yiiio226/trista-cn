import React from "react"
import styled from "styled-components"
import { Logo } from "./header/logo"

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 70px 80px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);

  ul {
    display: flex;

    list-style: none;
    margin: 0;
    padding: 0;

    a {
      display: inline-block;
      margin: 0 16px;
      line-height: 32px;
      font-size: ${props => props.theme.fontSizeFooterLinks}px;
      color: ${props => props.theme.color};
      text-decoration: none;
      font-family: ${props => props.theme.fontFamily};
      border-bottom: 2px solid rgba(0, 0, 0, 0);

      &:hover {
        /* font-weight: 600; */
        color: ${props => props.theme.colorTheme};
        border-bottom-color: ${props => props.theme.colorTheme};
      }
    }
  }
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <Logo />
      <ul className="links">
        <li>
          <a href="mailto:hi@trista.design" target="_blank">
            Email: hi@trista.design
          </a>
        </li>
        <li>
          <a href="https://dribbble.com/yiiio" target="_blank">
            Dribbble
          </a>
        </li>
        <li>
          <a href="https://www.behance.net/tangh1993" target="_blank">
            Behance
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/yiiio" target="_blank">
            LinkedIn
          </a>
        </li>
      </ul>
    </FooterWrapper>
  )
}
