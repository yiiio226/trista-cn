import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import SvgLogo from "../../images/logo.inline.svg"

const LogoWrapper = styled(Link)`
  display: flex;
  width: 144px;
  height: 88px;
  justify-content: center;
  align-items: center;
`

export const Logo = ({ ...props }) => {
  return (
    <LogoWrapper {...props} to="/">
      <SvgLogo />
    </LogoWrapper>
  )
}
