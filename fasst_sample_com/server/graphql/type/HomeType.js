const { gql } = require('apollo-server-express');

module.exports = {
  typeDefs: gql`
    type Home {
      id: ID,
      message: String
    }
    `,
  resolvers: {
    Home: {
      id: () => 'start_kit'
    }
  }
};