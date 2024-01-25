FROM node:18 as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY --chown=node:node dist ./dist

RUN yarn install --frozen-lockfile --production

ENV NODE_ENV=production \
    PORT=3000
EXPOSE 3000

CMD yarn start

# reduce docker image size
FROM node:18-alpine as runner
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app .

ENV NODE_ENV=production \
    PORT=3000
EXPOSE 3000

CMD yarn start
