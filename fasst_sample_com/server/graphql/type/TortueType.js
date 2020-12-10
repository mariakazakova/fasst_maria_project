const { gql } = require('apollo-server-express');

module.exports = {
  typeDefs: gql`
    type Tortue {
      id: ID
    }
    `,
  resolvers: {
  }
};
