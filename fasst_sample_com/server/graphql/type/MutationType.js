const { gql } = require('apollo-server-express');

module.exports = {
  typeDefs: gql`
    interface MutationResponse {
      ok: Boolean!
      error: String
    }

    type Mutation {}
  `,

  resolvers: {
    MutationResponse: {
      __resolveType () {
        return null;
      },
    },
    Mutation: {}
  }
};
