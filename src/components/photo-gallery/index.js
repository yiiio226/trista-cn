import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import Img from "gatsby-image"
import Lightbox from "fslightbox-react"

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

const PhotoImgWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  cursor: pointer;
  @media (max-width: 1440px) {
    max-width: 44.44vw;
  }
  @media (max-width: 780px) {
    max-width: calc(100vw - 30px * 2);
  }

  /* Hover on image to zoom in */
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(0.98);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  .gatsby-image-wrapper {
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
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
  const [showLightbox, updateShowLightbox] = React.useState(false)
  const [lightboxIndex, updateLightboxIndex] = React.useState(1)
  const urls = React.useMemo(
    () => photos.map(p => _get(p, "photo[0].localImage.big.fluid.src")),
    [photos]
  )

  return (
    <>
      {showLightbox && (
        <Lightbox
          toggler={true}
          openOnMount={true}
          loadOnlyCurrentSource={true}
          sources={urls}
          sourceIndex={lightboxIndex}
          onClose={() => updateShowLightbox(false)}
        />
      )}
      {photos.map((p, i) => {
        const imgData = _get(p, "photo[0].localImage.childImageSharp.fluid")
        return (
          <PhotoItemWrapper index={i} key={i}>
            {imgData && (
              <PhotoImgWrapper
                onClick={() => {
                  updateLightboxIndex(i)
                  updateShowLightbox(true)
                }}
              >
                <Img fluid={imgData} alt="p.title" />
              </PhotoImgWrapper>
            )}

            <PhotoLabel index={i}>{p.title}</PhotoLabel>
          </PhotoItemWrapper>
        )
      })}
    </>
  )
}
