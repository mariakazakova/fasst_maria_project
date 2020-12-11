const { gql } = require('apollo-server-express');
import TortueResolver from '../resolver/tortueResolver';

module.exports = {
  typeDefs: gql`
    type Query {
      homepage: Home
      getTortues: [Tortue],
      getTortue: [Tortue]
    }
  `,
  resolvers: {
    Query: {
      homepage: () => {
        return { message: 'Starter kit' };
      },
      getTortues: (parent, args, context) => TortueResolver(context).getAllTortles(),
      getTortue: (parent, args, context) => TortueResolver(context).getOneTortue()
    }
  }
};
