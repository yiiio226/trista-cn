import React from "react"
import _get from "lodash/get"
import styled from "styled-components"
import uuid from "uuid/v4"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown/with-html"

import {
  Container,
  Gap,
  Header,
  Layout,
  ProjectGallery,
  SEO,
} from "../components"
import {
  useFooterData,
  useSiteMetadata,
  useProjectsData,
} from "../hooks/graphql"

const Body = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colorBgAlt};
  padding: 80px 120px;
  @media (max-width: 780px) {
    padding: 40px 30px;
  }
`

const PostCoverWrapper = styled(Img)`
  max-width: 1200px;
  width: 100%;
  box-shadow: 0px 10px 30px -2px rgba(0, 0, 0, 0.06);
`

/** Main body content style */
const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
  max-width: 1120px;
  @media (max-width: 780px) {
    padding: 0;
  }

  & > * {
    width: 680px;
    font-size: 14px;
    line-height: 200%;
    @media (max-width: 780px) {
      width: calc(100vw - 60px);
    }
  }

  * {
    margin-bottom: 0;
    max-width: 680px;
    color: rgba(102, 102, 102, 1);
  }

  .post-attr {
    margin: 10px 0 0;
  }

  .meta {
    font-size: 18px;
    line-height: 150%;
  }

  strong {
    color: #5c5c5c;
  }

  h1,
  h2 {
    margin: 80px 0 40px;
    font-size: 30px;
    line-height: 40px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    @media (max-width: 780px) {
      margin: 40px 0 20px;
    }
  }

  h3 {
    margin: 80px 0 0;
    font-size: 24px;
    line-height: 31px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  h4 {
    margin: 20px 0 0;
    font-size: 18px;
    line-height: 24px;
  }

  h5,
  h6 {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 24px;
  }

  ol,
  p {
    margin: 20px 0 0;
  }

  .project-image {
    max-width: 1120px;
    margin: 60px 0;
    width: 100vw;
    object-fit: scale-down;
    background-color: #ffffff;
    box-shadow: 0px 10px 30px -2px rgba(0, 0, 0, 0.06);

    /* 1200px = 1120px + 80px */
    @media (max-width: 1200px) {
      max-width: calc(100vw - 80px);
    }

    @media (max-width: 780px) {
      margin: 30px 0;
    }

    & * {
      max-width: unset;
    }
  }
`

const PostHR = styled.div`
  border-top: 1px solid #ccc;
  margin: 40px 0;
  width: 100%;
`

const PostHead = styled(Body)`
  background-color: #ffffff;
  padding: 100px 30px 60px;
  @media (max-width: 1260px) {
    padding: 50px 30px 30px;
  }
`

const RelatedProjects = styled(ProjectGallery)``

const RelatedProjectsWrapper = styled(Container)`
  margin-top: 80px;
  background-color: #fff;
  padding: 0 100px;
  max-width: 1240px;

  @media (max-width: 780px) {
    padding: 0 30px;
    max-width: unset;
  }

  h2 {
    font-size: 30px;
    margin-bottom: 0;
  }

  ${RelatedProjects} {
    margin-top: 65px;
  }
`

export default ({ pageContext }) => {
  const { project: curP, relatedProjects: curRelatedProjects } = pageContext
  const { siteMainMenu, siteTitle } = useSiteMetadata()
  const projects = useProjectsData()
  const project = projects.filter(p => p.id === curP.id)[0]
  const footer = useFooterData()
  const heroPic = _get(project, "heroPicture[0]")
  const [relatedProjects, updateRelatedProjects] = React.useState(
    curRelatedProjects
  )

  /** Transform related project ids into related projects */
  React.useEffect(() => {
    if (relatedProjects.length <= 0) return
    if (!relatedProjects[0].title) {
      const updatedRelatedProjects = relatedProjects.map(p => {
        const q = projects.filter(q => q.id === p.id)[0]
        q.projectTileIsWide = false
        return q
      })
      updateRelatedProjects(updatedRelatedProjects)
    }
  }, [projects, relatedProjects])

  return (
    <Layout center={true} footerLinks={footer.usefulLinks}>
      <Container>
        <Header menuLinks={siteMainMenu} siteTitle={siteTitle} />
        <SEO title={project.title} />
        <Gap gapSize={40} />
      </Container>
      <PostHead isFullWidth>
        <PostCoverWrapper fluid={heroPic.localImage.childImageSharp.fluid} />
        <PostBody>
          <div className="meta">
            <h1>{project.title}</h1>
            <p>{project.projectDescription}</p>
            <PostHR />
            <p className="post-attr">客户：{project.projectClient}</p>
            <p className="post-attr">角色：{project.projectMyRole}</p>
            <p className="post-attr">时间：{project.projectDuration}</p>
          </div>
        </PostBody>
      </PostHead>
      <Body isFullWidth>
        <PostBody>
          {project.projectContentBody.map(block => {
            switch (block.typeHandle) {
              case "textSection":
                return (
                  <ReactMarkdown
                    key={uuid()}
                    source={block.body}
                    escapeHtml={false}
                  />
                )
              case "image":
                return (
                  <React.Fragment key={uuid()}>
                    {block.image.map(node => {
                      return (
                        <Img
                          className="project-image"
                          key={uuid()}
                          fluid={_get(node, "localImage.childImageSharp.fluid")}
                          alt="Project screenshot"
                        />
                      )
                    })}
                  </React.Fragment>
                )
              default:
                return null
            }
          })}
        </PostBody>
      </Body>
      <RelatedProjectsWrapper isFullWidth>
        <h2>其他项目</h2>
        <RelatedProjects
          projects={relatedProjects}
          className="project-gallery"
          loadByDefault={true}
        />
      </RelatedProjectsWrapper>
    </Layout>
  )
}
