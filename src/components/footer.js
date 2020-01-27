import React from "react"
import styled from "styled-components"
import { Logo } from "./header/logo"

import { ExternalLink } from "."

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 70px 40px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);

  @media (max-width: 780px) {
    flex-direction: column;
  }

  ul {
    display: flex;

    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 780px) {
      flex-direction: column;
      text-align: center;
    }

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
          <ExternalLink
            href="mailto:hi@trista.design"
            label="Email: hi@trista.design"
          />
        </li>
        <li>
          <ExternalLink href="https://dribbble.com/yiiio" label="Dribbble" />
        </li>
        <li>
          <ExternalLink
            href="https://www.behance.net/tangh1993"
            label="Behance"
          />
        </li>
        <li>
          <ExternalLink
            href="https://www.linkedin.com/in/yiiio"
            label="LinkedIn"
          />
        </li>
      </ul>
    </FooterWrapper>
  )
}
