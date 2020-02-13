import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import Img from "gatsby-image"

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

const PhotoImgWrapper = styled(Img)`
  width: 100%;
  max-width: 640px;
  @media (max-width: 1440px) {
    max-width: 44.44vw;
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

  @media (max-width: 1440px) {
    padding-left: 5.56vw;
  }

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
      {photos.map((p, i) => {
        const imgData = _get(p, "photo[0].localImage.childImageSharp.fluid")
        return (
          <PhotoItemWrapper index={i} key={i}>
            {imgData && <PhotoImgWrapper fluid={imgData} alt="p.title" />}
            <PhotoLabel index={i}>{p.title}</PhotoLabel>
          </PhotoItemWrapper>
        )
      })}
    </>
  )
}
