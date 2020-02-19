import React from "react"
import styled from "styled-components"
import { motion, useViewportScroll, useTransform } from "framer-motion"

import { Logo as _Logo } from "./logo"
import { Menu } from "./menu"
import { Gap } from "../gap"

const Logo = styled(_Logo)``

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

const FullWidthBg = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 20px -2px rgba(0, 0, 0, 0.06);
  transform: translateY(-${props => (1 - (props.showPercent || 0)) * 100}px);
`

const HeaderCollapsed = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${Logo} {
    max-width: 80px;
  }

  max-width: 1240px;
  width: calc(100% - 200px);
  height: 100px;
  @media (max-width: 780px) {
    width: calc(100% - 60px);
  }
`

const HeaderCollapsedAuto = ({ menuLinks, threshold = 210 }) => {
  const { scrollY } = useViewportScroll()
  const showPercent = Math.min(Math.max(0, (scrollY - threshold) / 100), 1)

  return (
    <FullWidthBg showPercent={showPercent}>
      <HeaderCollapsed>
        <Logo />
        <Menu menuLinks={menuLinks} />
      </HeaderCollapsed>
    </FullWidthBg>
  )
}

export const Header = ({ menuLinks }) => {
  return (
    <>
      <HeaderCollapsedAuto menuLinks={menuLinks} />
      <HeaderWrapper>
        <Gap gapSize={60} />
        <Logo />
        <Gap gapSize={20} />
        <Menu menuLinks={menuLinks} />
      </HeaderWrapper>
    </>
  )
}
