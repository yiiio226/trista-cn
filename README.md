# Trista's Website

Visit the live version: https://trista.design

### Website High Level Architecture

![www-trista-design drawio (1)](https://user-images.githubusercontent.com/2988555/172033774-68a82592-d234-45c9-a7cb-9845a4b33f6a.svg)

- The website is hosted as static files on Aliyun OSS www.trista.design.
- The website content is on self-hosted CraftCMS [dev.cms.trista.design/admin](https://dev.cms.trista.design/admin).
- Build process: a Github Action to pull data from CraftCMS, build static web pages then push to Aliyun OSS.
  - Github Action holds an **access token** to upload files to Aliyun OSS (won't expire)
  - Build Shortcut for iOS holds another **access token** to trigger Github Action build (expires when Github updates policy)
  - Push commits to this repo also triggers the build process.
- [trista.cn](http://trista.cn) is registered at Aliyun, using self-hosted 301 service.
- Aliyun OSS doesn't support top-level domain as bucket domain, using www.trista.design.
  - Aliyun OSS bucket is Hongkong, to support domains without ICP license (both domains have no ICP license).
  - Using 传输加速 for optimal loading speed in China
- Google DNS has a bug of navigating `trista.design/projects/ada` to `www.trista.designprojects/ada`, messing domain and path together. Appending `?` to 301 target domain to mitigate this issue (301 - `https://www.trista.design?`).

### Key Components

- Self hosted
  - 301 service for [trista.cn](http://trista.cn) to https://www.trista.design.
  - Craft CMS for content administration at [dev.cms.trista.design/admin](https://dev.cms.trista.design/admin).
    - Postgres DB
    - Redis
  - Build trista.cn Shortcut on iOS, trigger build.
- 3rd party
  - Google Domain & DNS for trista.design.
  - Aliyun Domain & DNS for trista.cn.
  - Aliyun OSS for www.trista.design hosting.
