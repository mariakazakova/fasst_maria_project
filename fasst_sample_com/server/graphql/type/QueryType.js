const { gql } = require('apollo-server-express');
import TortueResolver from '../resolver/tortueResolver';

module.exports = {
  typeDefs: gql`
    type Query {
      homepage: Home
      getTortues: [Tortue],
      getTortue(id: ID): Tortue
    }
  `,
  resolvers: {
    Query: {
      homepage: () => {
        return { message: 'Starter kit' };
      },
      getTortues: (parent, args, context) => TortueResolver(context).getAllTortles(),
      getTortue: (parent, {id}, context) => TortueResolver(context).getOneTortle(id)
    }
  }
};
