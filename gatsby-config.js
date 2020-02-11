require("dotenv").config()

module.exports = {
  siteMetadata: {},
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
        name: `assets-images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets-videos`,
        path: `${__dirname}/src/assets/videos`,
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
          Authorization: `Bearer ${process.env.API_AUTH}`,
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
        refetchInterval: 10,
      },
    },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: "CMS_images_Asset",
    //     imagePath: "url",
    //     name: "localImage",
    //   },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
  ],
}
