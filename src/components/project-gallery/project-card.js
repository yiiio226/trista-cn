import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { useHover } from "../../hooks"

const LinkWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  background-color: ${props => props.project.primaryColor || props.theme.color};
  grid-column: ${props => (props.project.isWide ? "1/3" : "initial")};
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-25px);
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.12);
  }

  video {
    max-width: 100%;
    max-height: 80%;
    margin-top: auto;
  }
`

export const ProjectCard = ({ ...props }) => {
  const project = props.project
  const [hoverRef, isHovered] = useHover()
  const videoRef = React.useRef()

  React.useEffect(() => {
    if (isHovered) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()

      setTimeout(() => {
        if (videoRef.current.paused) {
          videoRef.current.currentTime = 0
        }
      }, 500)
    }
  }, [isHovered])

  return (
    <LinkWrapper to="/" {...props} ref={hoverRef}>
      <video autoPlay={false} loop={true} preload="metadata" ref={videoRef}>
        <source src={project.coverVideo} type={project.coverVideoType} />
      </video>
    </LinkWrapper>
  )
}
