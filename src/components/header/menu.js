import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { ClickToCopyLink } from "../click-to-copy-link"

const MenuNavWrapper = styled.nav`
  width: 100%;

  .active {
    color: ${props => props.theme.colorTheme};
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: center;
    list-style: none;

    li {
      margin: 0;
      padding: 0;
      text-align: center;

      a {
        display: inline-block;
        min-width: 100px;
        line-height: 48px;
        font-size: ${props => props.theme.fontSize}px;
        color: ${props => props.theme.color};
        text-decoration: none;
        font-family: ${props => props.theme.fontFamily};
        font-weight: 600;

        &:hover {
          color: ${props => props.theme.colorTheme};
        }
      }
    }
  }
`

export const Menu = ({ menuLinks }) => {
  return (
    <MenuNavWrapper>
      <ul>
        {menuLinks.map(link => {
          let linkEle = (
            <Link to={link.link} activeClassName="active">
              {link.name}
            </Link>
          )

          if (link.link.startsWith("copy:")) {
            linkEle = (
              <ClickToCopyLink link={link} successText="Email 复制成功" />
            )
          }

          return <li key={link.name}>{linkEle}</li>
        })}
      </ul>
    </MenuNavWrapper>
  )
}
