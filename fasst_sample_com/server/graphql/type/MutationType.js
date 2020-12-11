const { gql } = require('apollo-server-express');
import TortueResolver from '../resolver/tortueResolver';

module.exports = {
  typeDefs: gql`
    interface MutationResponse {
      ok: Boolean!
      error: String
    }


    type CreateOneTortleMutationResponse implements MutationResponse {
      ok: Boolean!
      error: String
      tortue: Tortue
    }

    type UpdateTortleMutationResponse implements MutationResponse {
      ok: Boolean!
      error: String
      tortue: Tortue
    }

    type DeleteTortleMutationResponse implements MutationResponse {
      ok: Boolean!
      error: String
    }

    type Mutation {
      createOneTortle(name: String, age: String, taille: String, terrestre: Boolean, species: String): CreateOneTortleMutationResponse
      deleteOneTortle(id: ID): DeleteTortleMutationResponse
      updateOneTortle(name: String, age: String, taille: String, terrestre: Boolean, species: String, id: ID): UpdateTortleMutationResponse
    }
  `,

  resolvers: {
    MutationResponse: {
      __resolveType () {
        return null;
      },
    },
    Mutation: {
      createOneTortle: (parent, { name, age, taille, terrestre, species }, context) => TortueResolver(context).createOneTortle({ name, age, taille, terrestre, species }),
      deleteOneTortle: (parent, {id}, context) => TortueResolver(context).deleteOneTortle(id),
      updateOneTortle: (parent, { name, age, taille, terrestre, species, id }, context) => TortueResolver(context).updateOneTortle({ name, age, taille, terrestre, species}, id)
    }
  }
};
