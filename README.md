# Trista's Website

Visit the live version: https://trista.design

### Website High Level Architecture

![www-trista-design drawio](https://user-images.githubusercontent.com/2988555/172033539-ca2adffb-55b7-451d-a2ba-d7d1db43fb9f.svg)

- The website is hosted as static files on Aliyun OSS www.trista.design
- The website content is on self-hosted CraftCMS [dev.cms.trista.design/admin](https://dev.cms.trista.design/admin)
- Build process: a Github Action to pull data from CraftCMS, build static web pages then push to Aliyun OSS
