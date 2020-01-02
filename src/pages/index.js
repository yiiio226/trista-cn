import React from "react"

import "normalize.css"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { Typing } from "../components/typing"

const IndexPage = () => (
  <Layout>
    <SEO title="Trista" />
    <Typing />
  </Layout>
)

export default IndexPage
