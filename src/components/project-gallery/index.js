import React from "react"
import styled from "styled-components"
import { ProjectCard } from "./project-card"

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 400px);
  grid-gap: ${props => props.theme.gapSize * 5}px;
`

export const ProjectGallery = () => {
  return (
    <GalleryWrapper>
      {[1, 2, 3, 4].map(p => (
        <ProjectCard primaryColor="#f00" />
      ))}
    </GalleryWrapper>
  )
}
