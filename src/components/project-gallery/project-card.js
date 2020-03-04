import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import { Link } from "gatsby"

import IconLock from "../../images/icon_lock.inline.svg"
import IconLockBlack from "../../images/icon_lock_black.inline.svg"
import { FadeInUp } from "../fade-in-up"

const LinkWrapper = styled(Link)`
  grid-column: ${props =>
    props.forceSquared
      ? "initial"
      : props.project.projectTileIsWide
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
    background-color: ${props => props.projectTileColor || props.theme.color};
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
  const { project, forceSquared } = props
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
  console.log(
    "Debug test: title, videoSquare, videoWide, imageSquare, imageWide",
    project.title,
    videoSquare,
    videoWide,
    imageSquare,
    imageWide
  )
  const [projectVideo, updateProjectVideo] = React.useState(
    forceSquared
      ? _get(videoSquare, "standard[0]")
      : _get(videoWide, "standard[0]") || _get(videoSquare, "standard[0]")
  )
  const [projectCover, updateProjectCover] = React.useState(
    forceSquared
      ? _get(videoSquare, "cover[0].localImage.publicURL") ||
          _get(imageSquare, "standard[0].localImage.publicURL")
      : _get(videoWide, "cover[0].localImage.publicURL") ||
          _get(videoSquare, "cover[0].localImage.publicURL") ||
          _get(imageWide, "standard[0].localImage.publicURL") ||
          _get(imageSquare, "standard[0].localImage.publicURL")
  )
  const [projectTileColor, updateProjectTileColor] = React.useState(
    project.projectTileColor
  )

  React.useEffect(() => {
    if (typeof window === `undefined`) return
    // console.log(project, project.title, project.projectTileIsWide, forceSquared)

    if (
      window.innerWidth <= 780 ||
      (project.projectTileIsWide && forceSquared)
    ) {
      // Replace videos
      const smallVideo = _get(project, "projectVideoSmall[0]")
      if (smallVideo) {
        // Mobile view
        updateProjectVideo(smallVideo)
      }

      // Replace cover photos
      const smallCover = _get(
        project,
        "projectCoverSmall[0].localImage.publicURL"
      )
      if (smallCover) {
        updateProjectCover(smallCover)
      }

      // Replace tile color
      if (project.projectTileColorSmall) {
        updateProjectTileColor(project.projectTileColorSmall)
      }
    }
  }, [project, projectVideo, noWindow])

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
      projectTileColor={projectTileColor}
      {...props}
    >
      <FadeInUp
        threshold={-100}
        initialOffset={200}
        duration={0.8}
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
          {projectVideo && projectVideo.localVideo ? (
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
                src={projectVideo.localVideo.publicURL}
                type={projectVideo.mimeType}
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
