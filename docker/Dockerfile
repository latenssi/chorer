# BUILD
FROM node:13-alpine as build

RUN apk add --update \
    build-base \
    gcc \
    wget \
    git \
    python3

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# RUN
FROM nginx:mainline-alpine

COPY --from=build /src/build /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf