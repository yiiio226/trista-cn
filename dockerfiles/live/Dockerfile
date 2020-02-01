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

EXPOSE 8000
