import React from "react"
import styled from "styled-components"

import { Logo } from "./logo"
import { Menu } from "./menu"
import { Gap } from "../gap"

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1240px;
  @media (max-width: 780px) {
    max-width: unset;
  }
`

export const Header = ({ menuLinks }) => {
  return (
    <HeaderWrapper>
      <Gap gapSize={60} />
      <Logo />
      <Gap gapSize={20} />
      <Menu menuLinks={menuLinks} />
    </HeaderWrapper>
  )
}
