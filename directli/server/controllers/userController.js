const userModel = require('../models/user');

const getAllUsers = (req, res, next) => {
    // Extract requested fields from query parameters and generate array
    const fields = req.query?.fields?.split(','); // ['name', 'email', 'dob']

    // Check if fields exists as valid array
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ error: 'Fields parameter is required and must be an array' });
    }

    // Dynamically construct the GraphQL query
    const query = `
        query {
            userFindAll {
                ${fields.join('\n')}
            }
        }
    `;

    req.body = { query }; // Attach the query to the body
    next();
};

const getUser = (req, res, next) => {
//   req.url = `/graphql`;
  req.body = {
    query: `
      query ($id: ID!) {
        userFindOne(id: $id) {
          userID
          nameFirst
          nameLast
          displayName
          email
          dob
          bio
        }
      }
    `,
    variables: { id: req.params.id },
  };
    console.log('getUser');
    next()
};

module.exports = { getUser, getAllUsers };
