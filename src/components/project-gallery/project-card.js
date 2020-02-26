import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import { Link } from "gatsby"

import IconLock from "../../images/icon_lock.inline.svg"
import IconLockBlack from "../../images/icon_lock_black.inline.svg"
import { FadeInUp } from "../fade-in-up"
import { getFrame } from "./device-frames"
import { ProjectVideo } from "./project-video"

const LinkWrapper = styled(Link)`
  grid-column: ${props =>
    props.project.projectTileIsWide ? "1/3" : "initial"};
  text-decoration: none;
  border: none;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  /* margin-top: 70px; */
  padding: 0 30px;
  color: ${props =>
    props.isInverseColor ? props.theme.colorInverse : props.theme.color};
  line-height: 180%;
  font-weight: 500;
  text-align: center;
  font-size: 24px;
  flex: 1;
  @media (max-width: 780px) {
    /* margin-top: 48px; */
    padding: 0 12px;
    font-size: 18px;
  }
`

const CardMediaWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  /* max-width: 100%;
  max-height: 80%; */
  /* width: 200px; */
  /* height: 400px; */
  flex: 3;
  width: ${props => props.width}px;
  margin-top: auto;

  video {
    max-width: 100%;
    max-height: 100%;
    /* transition: transform 0.2s; */
  }
`

const CoverFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 200px;
  min-height: 400px;
  background: url(${props => props.src});
  background-size: cover;
  background-position: center top;
`

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  padding: 12.5% 9.5% 0;
`

const CardMedia = ({ project, updateProjectTileColor }) => {
  const noWindow = typeof window === `undefined`
  const [projectVideo, updateProjectVideo] = React.useState(
    _get(project, "projectVideo[0]")
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
  }, [project, projectVideo, noWindow, updateProjectTileColor])

  const projectCoverFrame = React.useMemo(
    () =>
      project.projectCoverFrame && project.projectCoverFrame !== "no"
        ? getFrame(project.projectCoverFrame)
        : null,
    [project]
  )

  console.log("projectCoverFrame", projectCoverFrame)

  return (
    <CardMediaWrapper width={250}>
      <Screen>
        {projectVideo ? (
          <ProjectVideo
            cover={projectCover}
            src={projectVideo.localVideo.publicURL}
            type={projectVideo.mimeType}
          />
        ) : (
          (projectCover && <ProjectCoverImg src={projectCover} />) || null
        )}
      </Screen>
      {projectCoverFrame && <CoverFrame src={projectCoverFrame.url} />}
    </CardMediaWrapper>
  )
}

export const ProjectCard = ({ ...props }) => {
  const project = props.project
  const noWindow = typeof window === `undefined`
  const [projectTileColor, updateProjectTileColor] = React.useState(
    project.projectTileColor
  )

  // Have to disable ssr for this component for now
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
          <CardMedia
            project={project}
            updateProjectTileColor={updateProjectTileColor}
          />
        </div>
      </FadeInUp>
    </LinkWrapper>
  )
}
