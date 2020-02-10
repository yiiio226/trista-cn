import React from "react"
import styled from "styled-components"

// import { photos } from "./photos-data"

const PhotoItemWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.index % 2 === 0 ? "row" : "row-reverse")};
  align-items: center;
  padding: 100px 0;

  @media (max-width: 780px) {
    padding: 20px 0;
    flex-direction: column;
  }
`

const PhotoImgWrapper = styled.img`
  max-width: 640px;
  @media (max-width: 1440px) {
    max-width: 45vw;
  }
  @media (max-width: 780px) {
    max-width: calc(100vw - 30px * 2);
  }
`

const PhotoLabel = styled.label`
  font-size: 18px;
  line-height: 24px;
  padding-left: ${props => (props.index % 2 === 0 ? 80 : 0)}px;
  padding-right: ${props => (props.index % 2 === 0 ? 0 : 80)}px;

  @media (max-width: 780px) {
    font-size: 14px;
    line-height: 19px;
    padding: 14px 0 0;
    max-width: calc(100vw - 30px * 2);
    text-align: center;
  }
`

export const PhotoGallery = ({ photos = [] }) => {
  return (
    <>
      {photos.map((p, i) => (
        <PhotoItemWrapper index={i} key={i}>
          <PhotoImgWrapper src={p.photo[0].url} alt={p.title} />
          <PhotoLabel index={i}>{p.title}</PhotoLabel>
        </PhotoItemWrapper>
      ))}
    </>
  )
}
