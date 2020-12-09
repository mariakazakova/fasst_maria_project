const { gql } = require('apollo-server-express');

module.exports = {
  typeDefs: gql`
    type Query {
      homepage: Home
    }
  `,
  resolvers: {
    Query: {
      homepage: () => {
        return { message: 'Starter kit' };
      },
    }
  }
};
