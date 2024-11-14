// graphql.js
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

module.exports = graphqlHTTP({
  schema,
  graphiql: true,  // Enable the GraphiQL interface for testing
});
