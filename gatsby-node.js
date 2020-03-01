/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const _get = require("lodash/get")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { encrypt } = require("./src/components/encrypted/utils/encrypt")

/**
 * Replace `GatsbyImageSharpFluid_withWebp` with:
 * ```js
 * base64
 * aspectRatio
 * src
 * srcSet
 * srcWebp
 * srcSetWebp
 * sizes
 * ```
 */
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
            id
            isProtected
            password
            projectTitleShort
            projectTileColor
            projectTileColorSmall
            projectTileIsInversedColor
            projectTileIsWide
            projectDescription
            projectClient
            projectMyRole
            projectMyContribution
            projectDuration
            projectContentBody {
              ... on CMS_projectContentBody_textSection_BlockType {
                typeHandle
                body
              }
              ... on CMS_projectContentBody_image_BlockType {
                typeHandle
                image {
                  id
                  url
                  ... on CMS_images_Asset {
                    id
                    localImage {
                      id
                      publicURL
                      childImageSharp {
                        fluid(maxWidth: 1120, quality: 95) {
                          base64
                          aspectRatio
                          src
                          srcSet
                          srcWebp
                          srcSetWebp
                          sizes
                        }
                      }
                    }
                  }
                  mimeType
                  width
                  height
                  size
                }
              }
            }
            heroPicture {
              url
              ... on CMS_images_Asset {
                id
                localImage {
                  publicURL
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 90) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
              mimeType
              width
              height
              size
            }
            projectCover {
              url
              ... on CMS_images_Asset {
                id
                localImage {
                  publicURL
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 90) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
              mimeType
              width
              height
              size
            }
            projectCoverSmall {
              url
              ... on CMS_images_Asset {
                id
                localImage {
                  publicURL
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 90) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
              mimeType
              width
              height
              size
            }
            projectVideo {
              url
              ... on CMS_videos_Asset {
                id
                localVideo {
                  publicURL
                }
              }
              mimeType
              size
            }
            projectVideoSmall {
              url
              ... on CMS_videos_Asset {
                id
                localVideo {
                  publicURL
                }
              }
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
          let { id, url } = parent
          if (!id) throw new Error("id is required")
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
          let { id, url } = parent
          if (!id) throw new Error("id is required")
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
    const {
      slug,
      isProtected,
      password,
      heroPicture,
      projectCover,
      projectCoverSmall,
      projectVideo,
      projectVideoSmall,

      title,
      projectTitleShort,
      projectTileColor,
      projectTileColorSmall,
      projectTileIsInversedColor,
      projectTileIsWide,
    } = p

    for (let j = 0, iCur = i + 1; j < NEXT_ITEMS; j++, iCur++) {
      if (!data.projects[iCur]) {
        iCur = 0
      }
      const relatedP = data.projects[iCur]
      relatedP.projectTileIsWide = false // For related projects, please, do not go full width...
      const {
        projectDescription: _rProjectDescription,
        projectClient: _rProjectClient,
        projectMyRole: _rProjectMyRole,
        projectDuration: _rProjectDuration,
        projectContentBody: _rProjectContentBody,
        projectMyContribution: _rProjectMyContribution,
        ...restP
      } = relatedP
      relatedProjects.push(restP)
    }

    let encryptedProjectStr
    if (isProtected) {
      console.log("Encrypting project", `/projects/${slug}`)
      encryptedProjectStr = encrypt(p, password)
      p = null // Once we have it encrypted, delete it
    }

    createPage({
      path: `projects/${slug}`,
      component: template,
      context: {
        isProtected: isProtected,
        encryptedProjectStr,
        project: p,
        pMeta: {
          title,
          projectTitleShort,
          projectTileColor,
          projectTileColorSmall,
          projectTileIsInversedColor,
          projectTileIsWide,
          heroPicture,
          projectCover,
          projectCoverSmall,
          projectVideo,
          projectVideoSmall,
        },
        relatedProjects,
      },
    })
  })
}
