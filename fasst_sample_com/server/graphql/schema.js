const R = require('ramda');
const RA = require('ramda-adjunct');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = (schemaTypes) => {
  return R.map(R.prop('typeDefs'))(schemaTypes);
};

const resolvers = (types) => {
  const resolvers = R.compose(
    R.mergeAll,
    R.filter(RA.isNotNil),
    R.map(R.prop('resolvers'))
  )(types);

  return resolvers;
};

// const _enum = name => require(`./enum/${name}.js`);
// const _input = name => require(`./input/${name}.js`);
const _type = name => require(`./type/${name}.js`);

const schemaTypes = [
  // _type('SubscriptionType'),
  // _type('MutationType'),
  _type('HomeType'),
  _type('QueryType'),
];

module.exports = makeExecutableSchema({
  typeDefs: typeDefs(schemaTypes),
  resolvers: resolvers(schemaTypes)
});
