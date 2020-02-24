import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import { Link } from "gatsby"

import IconLock from "../../images/icon_lock.inline.svg"
import IconLockBlack from "../../images/icon_lock_black.inline.svg"
import { FadeInUp } from "../fade-in-up"

const LinkWrapper = styled(Link)`
  grid-column: ${props =>
    props.project.projectTileIsWide ? "1/3" : "initial"};
  text-decoration: none;
  border: none;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    opacity: 0;
    transition: opacity 0.2s;

    @media (max-width: 780px) {
      opacity: 1;
    }
  }

  video {
    max-width: 100%;
    max-height: 80%;
    margin-top: auto;
    transition: transform 0.2s;
  }
`

const ProjectCoverImg = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-image: url(${props => props.src});
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

export const ProjectCard = ({ ...props }) => {
  const project = props.project
  const noWindow = typeof window === `undefined`
  const videoRef = React.useRef()
  const [projectVideo, updateProjectVideo] = React.useState(
    _get(project, "projectVideo[0]")
  )
  const [projectTileColor, updateProjectTileColor] = React.useState(
    project.projectTileColor
  )

  const projectCover =
    _get(project, "projectCover[0].localImage.publicURL") ||
    _get(project, "heroPicture[0].localImage.publicURL")

  React.useEffect(() => {
    if (projectVideo && typeof window !== `undefined`) {
      if (window.innerWidth < 780) {
        // Mobile view
        const smallVideo = _get(project, "projectVideoSmall[0]")
        if (smallVideo) {
          updateProjectVideo(smallVideo)
          if (project.projectTileColorSmall) {
            updateProjectTileColor(project.projectTileColorSmall)
          }
        }
      }
    }
  }, [project, projectVideo, noWindow])

  /** Trying to fix muted not being set on ios video tag */
  if (videoRef.current && !videoRef.current.defaultMuted) {
    videoRef.current.defaultMuted = true
    videoRef.current.muted = true
  }

  // Have to disable ssr for this component for now
  if (noWindow) return null

  return (
    <LinkWrapper
      to={`/projects/${project.slug}`}
      projectTileColor={projectTileColor}
      {...props}
    >
      <FadeInUp threshold={-100} initialOffset={100} duration={0.8}>
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
                src={projectVideo.localVideo.publicURL}
                type={projectVideo.mimeType}
              />
            </video>
          ) : (
            (projectCover && <ProjectCoverImg src={projectCover} />) || null
          )}
        </div>
      </FadeInUp>
    </LinkWrapper>
  )
}
