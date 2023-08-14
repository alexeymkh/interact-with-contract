FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY tsconfig.json ./
COPY src ./src
RUN yarn build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock ./

RUN yarn install --production && \
    yarn cache clean

CMD ["node", "dist/index.js"]
