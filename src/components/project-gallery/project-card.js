import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

// import { useHover } from "../../hooks"

const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.project.primaryColor || props.theme.color};
  grid-column: ${props => (props.project.isWide ? "1/3" : "initial")};
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);
  text-decoration: none;
  overflow-y: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-25px);
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.12);

    .link-copy {
      opacity: 1;
    }

    video {
      /* transform: translateY(24px); */
    }
  }

  .link-copy {
    opacity: 0;
    transition: opacity 0.2s;
  }

  video {
    max-width: 100%;
    max-height: 80%;
    margin-top: auto;
    transition: transform 0.2s;
  }
`

const LinkCopy = styled.div`
  margin-top: 70px;
  color: ${props =>
    props.isInverseColor ? props.theme.colorInverse : props.theme.color};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`

export const ProjectCard = ({ ...props }) => {
  const project = props.project
  // const [hoverRef, isHovered] = useHover()
  const videoRef = React.useRef()

  // React.useEffect(() => {
  //   const node = videoRef.current
  //   if (!node) return

  //   if (isHovered) {
  //     node.play()
  //   } else {
  //     node.pause()

  //     setTimeout(() => {
  //       if (node.paused) {
  //         node.currentTime = 0
  //       }
  //     }, 500)
  //   }
  // }, [isHovered])

  return (
    <LinkWrapper to={`/projects/${project.slug}`} {...props}>
      <LinkCopy className="link-copy" isInverseColor={project.isInverseColor}>
        {project.name}
      </LinkCopy>
      <video
        autoPlay={true}
        loop={true}
        preload="metadata"
        ref={videoRef}
        muted={true}
      >
        <source src={project.coverVideo} type={project.coverVideoType} />
      </video>
    </LinkWrapper>
  )
}
