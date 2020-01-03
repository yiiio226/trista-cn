import React from "react"
import styled from "styled-components"
import { ProjectCard } from "./project-card"

const GalleryWrapper = styled.div`
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  grid-template-columns: repeat(2, minmax(375px, 1fr));
  grid-auto-rows: 500px;
  grid-gap: ${props => props.theme.gapSize * 5}px;

  @media all and (max-width: ${props => props.theme.mobileWidth}px) {
    grid-template-columns: 1fr;

    & > a {
      grid-column: 1/2 !important;
    }
  }
`

export const ProjectGallery = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <GalleryWrapper>
      {data.map(p => (
        <ProjectCard
          key={p}
          primaryColor="rgba(0, 255, 0, 0.1)"
          isWide={p % 3 === 0}
          _num={p}
        />
      ))}
    </GalleryWrapper>
  )
}
