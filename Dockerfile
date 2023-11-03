FROM node:18.12.0-alpine as builder

WORKDIR /app
COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build