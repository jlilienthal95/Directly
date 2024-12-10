const userModel = require('../models/user');

const getAllUsers = (req, res, next) => {
    // req.url = '/'
    req.body = {
        query: `
            query {
                userFindAll {
                    userID
                    nameFirst
                    nameLast
                    displayName
                    email
                    dob
                    bio
                }
            }`
    }
    next();
}

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
