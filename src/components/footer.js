import React from "react"
import styled from "styled-components"
import uuid from "uuid/v4"
import ReactMarkdown from "react-markdown/with-html"

import { Logo } from "./header/logo"
import { FadeInUp } from "./fade-in-up"
import { ExternalLink } from "."

const FooterWrapper = styled(FadeInUp).attrs(() => ({
  threshold: -200,
  duration: 0.3,
}))`
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
    padding: 60px 15px;
  }

  ul {
    display: flex;

    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 780px) {
      flex-direction: column;
      text-align: center;
      margin-top: 60px;

      li {
        margin: 10px 0;
      }
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

const TailInfo = styled(FadeInUp).attrs(() => ({
  threshold: -30,
  duration: 0.3,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  font-size: 14px;
  text-align: center;
  color: rgba(153, 153, 153, 1);
  line-height: 180%;
  p {
    margin: 0;
    padding: 0;
  }
`

export const Footer = ({ links, footnote }) => {
  return (
    <>
      <FooterWrapper>
        <Logo />
        <ul className="links">
          {links &&
            links.map(l => {
              switch (l.typeHandle) {
                case "email":
                  return (
                    <li key={uuid()}>
                      <ExternalLink
                        label={`Email: ${l.email}`}
                        href={`mailto:${l.email}`}
                      />
                    </li>
                  )
                case "links":
                  return (
                    <li key={uuid()}>
                      <ExternalLink label={l.linkText} href={l.linkHref} />
                    </li>
                  )
                default:
                  return null
              }
            })}
        </ul>
      </FooterWrapper>
      <TailInfo>
        <ReactMarkdown key={uuid()} source={footnote} escapeHtml={false} />
      </TailInfo>
    </>
  )
}
