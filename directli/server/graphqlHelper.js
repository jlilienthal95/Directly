const { graphql } = require('graphql');
const schema = require('./graphQL/schema');

// Helper to execute GraphQL queries/mutations from Express
const executeGraphQL = async (query, variables = {}) => {
  try {
    const result = await graphql(schema, query, null, null, variables);
    return result;
  } catch (err) {
    throw new Error(`Error executing GraphQL operation: ${err.message}`);
  }
};

module.exports = executeGraphQL;
