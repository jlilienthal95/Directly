// graphql.js
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const schema = require('./schema');
const resolvers = require('./resolvers');
const db = require('../db/db');

// Combine schema and resolvers
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

module.exports = graphqlHTTP({
  schema: executableSchema,
  context: { client: db },
  graphiql: false, // Enable graphiql only during testing
});