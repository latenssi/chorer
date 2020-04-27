# BUILD
FROM node:13-alpine as build

WORKDIR /src

COPY . .

RUN npm ci

RUN npm run build

# RUN
FROM nginx:mainline-alpine

COPY --from=build /src/build /usr/share/nginx/html

COPY ./docker/app/nginx.conf /etc/nginx/conf.d/default.conf