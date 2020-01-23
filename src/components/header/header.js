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
  width: 100%;
`

export const Header = ({ menuLinks, siteTitle }) => {
  const [showLogo, updateShowLogo] = React.useState(true)

  const toggleShowLogo = () => updateShowLogo(!showLogo)

  return (
    <HeaderWrapper>
      <Gap gapSize={60} />
      <Logo onClick={toggleShowLogo} hide={showLogo} />
      <Gap gapSize={20} />
      <Menu menuLinks={menuLinks} />
    </HeaderWrapper>
  )
}
