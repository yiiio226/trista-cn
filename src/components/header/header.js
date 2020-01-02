import React from "react"
import styled from "styled-components"

import { Logo } from "./logo"
import { Menu } from "./menu"

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #efefef;
`

export const Header = ({ menuLinks, siteTitle }) => {
  return (
    <HeaderWrapper>
      <Logo></Logo>
      <Menu menuLinks={menuLinks} />
    </HeaderWrapper>
  )
}
