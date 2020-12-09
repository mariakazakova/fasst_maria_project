
FROM node

ARG BUILD_VERSION="latest"

RUN mkdir /service

WORKDIR /service

COPY .babelrc \
  .eslintrc.json \
  app.js  \
  envVars.yml \
  package.json \
  webpack.common.js \
  webpack.dev.js \
  webpack.prod.js \
  webpack.parts.js ./

COPY config ./config
COPY app ./app
COPY server ./server
COPY public/images ./public/images
COPY public/icons ./public/icons

RUN yarn install
RUN yarn global add nodemon
RUN yarn run make:production

RUN rm -rf yarn.lock
RUN rm -rf package-lock.json

RUN sed -i -- "s/__VERSION__/${BUILD_VERSION}/" server/lib/version.js
RUN sed -i -- "s/__DATE__/$(date)/" server/lib/version.js

EXPOSE 3000

CMD ["yarn","run", "server:production"]
