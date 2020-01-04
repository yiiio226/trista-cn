import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

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

  return (
    <LinkWrapper to="" {...props}>
      <video
        //  poster={project.cover}
        autoPlay={true}
        loop={true}
        preload="metadata"
      >
        <source src={project.coverVideo} type="video/mp4" />
      </video>
    </LinkWrapper>
  )
}
