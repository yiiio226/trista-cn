# Trista's Website

Visit the live version: https://trista.design

### Website High Level Architecture

![www-trista-design drawio (1)](https://user-images.githubusercontent.com/2988555/172033774-68a82592-d234-45c9-a7cb-9845a4b33f6a.svg)

- The website is hosted as static files on Aliyun OSS www.trista.design.
- The website content is on self-hosted CraftCMS [dev.cms.trista.design/admin](https://dev.cms.trista.design/admin).
- Build process: a Github Action to pull data from CraftCMS, build static web pages then push to Aliyun OSS.
  - Github Action holds an **access token** to upload files to Aliyun OSS (as environment var, won't expire).
  - Build Shortcut for iOS holds another **access token** to trigger Github Action build (expires when Github updates policy), token is sent in POST request header as `Authorization: Basic <access_token>`.
  - Push commits to this repo also triggers the build process. As an alternative way to update website, just change randomly change README.md.
- [trista.cn](http://trista.cn) is registered on Aliyun, using self-hosted 301 service.
- Aliyun OSS doesn't support top-level domain as bucket domain, using www.trista.design.
  - Aliyun OSS bucket is Hongkong, to support domains without ICP license (both domains have no ICP license).
  - Using 传输加速 for optimal loading speed in China.
- Google DNS has a bug of navigating `trista.design/projects/ada` to `www.trista.designprojects/ada`, messing domain and path together. Appending `?` to 301 target domain to mitigate this issue (301 - `https://www.trista.design?`).

### Key Components

- Self hosted
  - 301 service for [trista.cn](http://trista.cn) to https://www.trista.design. **config**: [rankun203/trista-redirect-to-dribbble/docker-compose.yml](https://github.com/rankun203/trista-redirect-to-dribbble/blob/master/docker-compose.yml).
  - Craft CMS for content administration at [dev.cms.trista.design/admin](https://dev.cms.trista.design/admin). **config**: [yiiio226/trista-cn/docker-compose.yml#web](https://github.com/yiiio226/trista-cn/blob/master/docker-compose.yml#L14). Secrets in docker-compose.yml are all overriden in ignore docker-compose.override.yml.
    - Postgres DB (same docker-compose.yml)
    - Redis (same docker-compose.yml)
  - Build trista.cn Shortcut on iOS, trigger build.
- 3rd party
  - Google Domain & DNS for trista.design.
  - Aliyun Domain & DNS for trista.cn.
  - Aliyun OSS for www.trista.design hosting.

### Backup and Restore

Please refer to [this official document](https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes) for more info :)
