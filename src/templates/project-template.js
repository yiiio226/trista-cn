import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import { Container, Gap, Header, Layout, SEO } from "../components"
// import { Image } from "../components/images/image-trista-big"
import { useSiteMetadata } from "../hooks/use-site-meta-data"

// TODO: Move article related css to separate component
const Body = styled(Container)`
  background-color: ${props => props.theme.colorBgAlt};
  padding-top: 100px;
  padding-bottom: 100px;

  h2 {
    font-size: 32px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 150%;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 150%;
  }
`

export default ({ data }) => {
  const { menuLinks, title } = useSiteMetadata()
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout center={true}>
      <Container>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={40} />
      </Container>
      <Gap gapSize={100} />
      <Body isFullWidth>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Body>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
