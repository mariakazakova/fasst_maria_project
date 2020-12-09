// const { pubsub } = require('../.');
const { gql } = require('apollo-server-express');

module.exports = {
  typeDefs: gql`
    type Subscription {}
  `,
  resolvers: {}
};
