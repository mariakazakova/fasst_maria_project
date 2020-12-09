FROM node:15.2.1-alpine
WORKDIR /app
COPY ./package*.json /app/
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["yarn", "server:production"]