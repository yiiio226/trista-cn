# Building
FROM node:10-alpine AS build

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app
ENV NODE_ENV=production

# Only copy package.json, as it won't change that often
COPY package.json ./
RUN yarn --frozen-lockfile --non-interactive

# If project files change
COPY . .
RUN yarn build

# Serving
FROM nginx:alpine

COPY --from=build --chown=nginx:nginx /app/public /usr/share/nginx/html
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

# USER nginx

EXPOSE 80
# HEALTHCHECK  --interval=3s --timeout=3s \
#   CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
