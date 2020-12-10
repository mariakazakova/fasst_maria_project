const { gql } = require('apollo-server-express');

module.exports = {
  typeDefs: gql`
    type Tortue {
      _id: ID
      name: String
      age: String
      taille: String
      species: String
    }
    `,
  resolvers: {
  }
};
