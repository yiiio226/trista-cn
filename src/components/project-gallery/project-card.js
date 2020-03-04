import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import { Link } from "gatsby"

import IconLock from "../../images/icon_lock.inline.svg"
import IconLockBlack from "../../images/icon_lock_black.inline.svg"
import { FadeInUp } from "../fade-in-up"

const LinkWrapper = styled(
  ({ forceSquared, projectTileIsWide, project, ...rest }) => <Link {...rest} />
)`
  grid-column: ${props =>
    props.forceSquared
      ? "initial"
      : props.projectTileIsWide
      ? "1/3"
      : "initial"};
  text-decoration: none;
  border: none;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);
    overflow-y: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    .link-copy {
      transition: opacity 0.2s;
    }
  }
  @media (min-width: 781px) {
    &:hover .content {
      transform: translateY(-25px);
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.12);

      .link-copy {
        opacity: 1;
      }
    }
  }

  .link-copy {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    top: 0;
    opacity: 0;
    transition: opacity 0.2s;

    @media (max-width: 780px) {
      opacity: 1;
    }
  }

  video {
    width: 100%;
    height: 100%;
  }
`

const ProjectCoverImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const LinkCopy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  padding: 0 30px;
  color: ${props =>
    props.isInverseColor ? props.theme.colorInverse : props.theme.color};
  line-height: 180%;
  font-weight: 500;
  text-align: center;
  font-size: 24px;
  @media (max-width: 780px) {
    margin-top: 48px;
    padding: 0 12px;
    font-size: 18px;
  }
`

export const ProjectCard = props => {
  const { project } = props
  let { forceSquared } = props
  const noWindow = typeof window === `undefined`
  const videoRef = React.useRef()

  const { videoSquare, videoWide, imageSquare, imageWide } = React.useMemo(
    () =>
      (project.projectCardAssets || []).reduce((memo, v) => {
        const vt = v.__typename || ""
        if (vt.includes("videoSquare")) memo.videoSquare = v
        else if (vt.includes("videoWide")) memo.videoWide = v
        else if (vt.includes("imageSquare")) memo.imageSquare = v
        else if (vt.includes("imageWide")) memo.imageWide = v
        return memo
      }, {}),
    [project]
  )
  const projectTileIsWide = !!(
    _get(videoWide, "standard[0]") || _get(imageWide, "standard[0]")
  )
  const lowRes = !noWindow && window.innerWidth <= 780
  if (lowRes && !forceSquared) forceSquared = true

  const projectVideo = forceSquared ? videoSquare : videoWide || videoSquare
  const projectCover = React.useMemo(
    () =>
      _get(projectVideo, "cover[0].localImage.publicURL") ||
      (forceSquared
        ? _get(imageSquare, "standard[0].localImage.publicURL")
        : _get(imageWide, "standard[0].localImage.publicURL") ||
          _get(imageSquare, "standard[0].localImage.publicURL")),
    [projectVideo, imageWide, imageSquare]
  )

  /** Trying to fix muted not being set on ios video tag */
  if (videoRef.current && !videoRef.current.defaultMuted) {
    videoRef.current.defaultMuted = true
    videoRef.current.muted = true
  }

  // Have to disable ssr for this component for checking mobile
  if (noWindow) return null

  return (
    <LinkWrapper
      to={`/projects/${project.slug}`}
      projectTileIsWide={projectTileIsWide}
      {...props}
    >
      <FadeInUp
        threshold={-100}
        initialOffset={200}
        duration={1}
        initialOpacity={0.6}
      >
        <div className="content">
          <LinkCopy
            className="link-copy"
            isInverseColor={project.projectTileIsInversedColor}
          >
            {project.projectTitleShort}
            {project.isProtected &&
              (project.projectTileIsInversedColor ? (
                <IconLock style={{ marginLeft: 14 }} />
              ) : (
                <IconLockBlack style={{ marginLeft: 14 }} />
              ))}
          </LinkCopy>
          {projectVideo ? (
            <video
              preload="auto"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              ref={videoRef}
              poster={projectCover}
            >
              <source
                src={_get(
                  projectVideo,
                  `${lowRes ? "small" : "standard"}[0].localVideo.publicURL`
                )}
                type={_get(projectVideo, "small[0].mimeType")}
              />
            </video>
          ) : (
            (projectCover && (
              <ProjectCoverImg
                src={projectCover}
                alt={project.projectTitleShort}
              />
            )) ||
            null
          )}
        </div>
      </FadeInUp>
    </LinkWrapper>
  )
}
