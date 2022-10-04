FROM node:18-alpine

WORKDIR /app

COPY package* /app/
RUN npm i

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 8080
