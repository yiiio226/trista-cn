/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const _get = require("lodash/get")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/project-template.js`)
  const result = await graphql(`
    {
      cms {
        projects: entries(section: "project") {
          id
          title
          slug
          ... on CMS_project_project_Entry {
            projectTitleShort
            projectTileColor
            projectTileColorSmall
            projectTileIsInversedColor
            projectTileIsWide
            projectDescription
            projectClient
            projectMyRole
            projectDuration
            projectContentBody {
              ... on CMS_projectContentBody_textSection_BlockType {
                typeHandle
                body
              }
              ... on CMS_projectContentBody_image_BlockType {
                typeHandle
                image {
                  url
                  mimeType
                  width
                  height
                  size
                }
              }
            }
            heroPicture {
              url
              mimeType
              width
              height
              size
            }
            projectCover {
              url
              mimeType
              width
              height
              size
            }
            projectVideo {
              url
              mimeType
              size
            }
            projectVideoSmall {
              url
              mimeType
              size
            }
          }
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

const createProjectPages = (createPage, template, data) => {
  const NEXT_ITEMS = 2

  data.projects.forEach((p, i) => {
    const relatedProjects = []

    for (let j = 0, iCur = i + 1; j < NEXT_ITEMS; j++, iCur++) {
      if (!data.projects[iCur]) {
        iCur = 0
      }
      const relatedP = data.projects[iCur]
      relatedP.projectTileIsWide = false // Please, do not go full width...
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
