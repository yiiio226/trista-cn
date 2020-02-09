module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@trista`,
    menuLinks: [
      { name: "主页", link: "/" },
      { name: "关于我", link: "/about" },
      { name: "联系我", link: "copy:hi@trista.design" },
      // { name: "我的工作", link: "/portfolio" },
      // { name: "联系我", link: "/contact" },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/projects`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "CMS",
        fieldName: "cms",
        url: "https://dev.cms.trista.design/api",
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer GnIyCjNWZKR1MeN_6dadFIMmbypU1q-e`,
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
        refetchInterval: 10,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Trista`,
        short_name: `Trista`,
        start_url: `/`,
        background_color: `#267776`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
