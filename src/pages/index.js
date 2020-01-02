import React from "react"
import Typist from "react-typist"

import "normalize.css"

import SEO from "../components/seo"
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <SEO title="Trista" />
    <Typist>
      <span>你好，我是 Trista</span>
      <Typist.Backspace count={7} delay={1000} />
      <span>一名设计师</span>
      <Typist.Delay ms={500} />
    </Typist>
  </Layout>
)

export default IndexPage
