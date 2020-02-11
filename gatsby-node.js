/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const _get = require("lodash/get")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

/**
 * Using:
 *   base64
 *   aspectRatio
 *   src
 *   srcSet
 *   srcWebp
 *   srcSetWebp
 *   sizes
 * as GatsbyImageSharpFluid_withWebp
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/project-template.js`)
  const result = await graphql(`
    {
      cms {
        projects: entries(section: "project") {
          id
          slug
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  createProjectPages(createPage, projectTemplate, {
    projects: _get(result, "data.cms.projects", []),
  })
}

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    CMS_images_Asset: {
      localImage: {
        type: "File",
        async resolve(parent) {
          let url = parent.url
          if (url.startsWith("//")) url = `https:${url}`

          return createRemoteFileNode({
            url: encodeURI(url),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
    CMS_videos_Asset: {
      localVideo: {
        type: "File",
        async resolve(parent) {
          let url = parent.url
          if (url.startsWith("//")) url = `https:${url}`

          return createRemoteFileNode({
            url: encodeURI(url),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

const createProjectPages = (createPage, template, data) => {
  const NEXT_ITEMS = 2

  data.projects.forEach((p, i) => {
    const relatedProjects = []

    for (let j = 0, iCur = i + 1; j < NEXT_ITEMS; j++, iCur++) {
      if (!data.projects[iCur]) {
        iCur = 0
      }
      const relatedP = data.projects[iCur]
      relatedP.projectTileIsWide = false // For related projects, please, do not go full width...
      relatedProjects.push(relatedP)
    }

    createPage({
      path: `projects/${p.slug}`,
      component: template,
      context: {
        project: p,
        relatedProjects,
      },
    })
  })
}
