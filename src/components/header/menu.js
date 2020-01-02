import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const MenuNavWrapper = styled.nav`
  width: 100%;

  .active {
    color: #0f0;
  }

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0 80px;

    li {
      margin: 0;
      padding: 0;
      min-width: 100px;
      text-align: center;
    }
  }
`

export const Menu = ({ menuLinks }) => {
  return (
    <MenuNavWrapper>
      <ul>
        {menuLinks.map(link => (
          <li
            key={link.name}
            style={{
              listStyleType: `none`,
              padding: `1rem`,
            }}
          >
            <Link to={link.link} activeClassName="active">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </MenuNavWrapper>
  )
}
