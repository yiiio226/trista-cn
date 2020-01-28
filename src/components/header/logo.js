import React from "react"
import { Link } from "gatsby"
import useHover from "@react-hook/hover"
import styled from "styled-components"
import SvgLogoAnimated from "../../images/logo.inline.svg"
import SvgLogo from "../../images/logo-static.inline.svg"

const LogoWrapper = styled(Link)`
  display: flex;
  width: 144px;
  height: 88px;
  justify-content: center;
  align-items: center;
`

export const Logo = ({ ...props }) => {
  const [isHovering, hoverRef] = useHover(0, 200)
  const [isPlaying, updateIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (!isPlaying && isHovering) {
      updateIsPlaying(true)
      setTimeout(() => updateIsPlaying(false), 3000)
    }
  }, [isHovering, isPlaying])

  return (
    <LogoWrapper {...props} to="/" ref={hoverRef}>
      {/* {isPlaying ? <SvgLogoAnimated /> : <SvgLogo />} */}
      <SvgLogoAnimated />
    </LogoWrapper>
  )
}
