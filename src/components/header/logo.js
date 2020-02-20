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
  border: none;
  @media (max-width: 780px) {
    width: 100px;
    height: 60px;
  }
`

export const Logo = ({ ...props }) => {
  const [isHovering, hoverRef] = useHover(0, 200)
  const [isPlaying, updateIsPlaying] = React.useState(false)
  const timerRef = React.useRef()

  React.useEffect(() => {
    if (isHovering) {
      if (timerRef.current) {
        return
      }

      updateIsPlaying(true)
      timerRef.current = setTimeout(() => {
        updateIsPlaying(false)
        clearTimeout(timerRef.current)
        timerRef.current = null
      }, 1500)
    }
  }, [isHovering])

  return (
    <LogoWrapper {...props} to="/" ref={hoverRef}>
      {isPlaying ? <SvgLogoAnimated /> : <SvgLogo />}
    </LogoWrapper>
  )
}
