FROM node:15-alpine
WORKDIR /app

COPY ./package.json /app

RUN yarn install

COPY . /app

# compiler le projet en js
RUN yarn build

# démarrage simple
CMD ["yarn", "start"]