import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import SvgLogo from "../../images/logo.inline.svg"
import { useHover } from "../../hooks"

const LogoWrapper = styled(Link)`
  display: flex;
  width: 144px;
  height: 88px;
  justify-content: center;
  align-items: center;
`

export const Logo = ({ ...props }) => {
  const [hoverRef, isHovered] = useHover()
  const [showLogo, updateShowLogo] = React.useState(true)

  React.useEffect(() => {
    if (isHovered && showLogo) updateShowLogo(false)
  }, [isHovered, showLogo])

  React.useEffect(() => {
    if (!showLogo) updateShowLogo(true)
  }, [showLogo])

  return (
    <LogoWrapper {...props} to="/" ref={hoverRef}>
      {showLogo && <SvgLogo />}
    </LogoWrapper>
  )
}
