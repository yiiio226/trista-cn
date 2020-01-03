import React from "react"
import styled from "styled-components"
import { ProjectCard } from "./project-card"

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 400px);
  grid-gap: ${props => props.theme.gapSize * 5}px;
`

export const ProjectGallery = () => {
  const data = [1, 2, 3, 4, 5]
  return (
    <GalleryWrapper>
      {data.map(p => (
        <ProjectCard
          primaryColor="rgba(0, 255, 0, 0.1)"
          isWide={p === 3}
          _num={p}
        />
      ))}
    </GalleryWrapper>
  )
}
