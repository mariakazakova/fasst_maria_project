const R = require('ramda');
const { ApolloServer, PubSub } = require('apollo-server-express');
const pubsub = new PubSub();
const isDevelopment = (process.env.NODE_ENV === 'development');

const initGraphQL = async (app, server) => {
  const schema = require('./schema');
  const apolloServer = new ApolloServer({
    schema,
    introspection: isDevelopment,
    playground: isDevelopment,
    context: async ({ req }) => {
      let user = {};
      let userTeam = null;
      const sessionId = R.pathOr(null, ['session', 'id'], req);

      return {
        host: R.pathOr(null, ['header', 'host'], req),
        cookie: R.pathOr(null, ['header', 'cookie'], req),
        user,
        userTeam,
        sessionId
      };
    }
  });

  apolloServer.applyMiddleware({ app });

  apolloServer.installSubscriptionHandlers(server);
};

module.exports = {
  initGraphQL,
  pubsub
};