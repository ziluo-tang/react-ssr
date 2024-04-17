FROM node:18.12.1-alpine

LABEL author="tangxiaoxin"

LABEL email="1302947749@qq.com"

COPY . /app

WORKDIR /app

CMD node dist/server/index.js
