const { findAll, findOne, createEntry, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers');

const userResolvers = {
  // Fetch all users
  userFindAll: async () => {
    return findAll('User');
  },
  
  // Fetch a single user by ID
  userFindOne: async (_, { id }) => findOne('User', 'userID', id),
  
  // Fetch all requests made by a User
  userRequests: async (parent) => await findAllByColumn('Request', 'requestedByID', parent.userID),

  //Fetch all scenes made by a User
  userScenes: async (parent) => await findAllByColumn('Scene', 'createdByID', parent.userID),

  //Fetch all comments made by a User
  userComments: async (parent) => await findAllByColumn('Comment', 'userID', parent.userID),

  //Fetch all notifications for a User
  userNotifications: async (parent) => await findAllByColumn('Notification', 'userID', parent.userID),
  
  // Create a new user
  userCreate: async (_, { input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return createEntry('User', fields, values);
  },

  // Edit an existing user
  userEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('User', 'userID', id, fields, values);
  },

  // Delete a user
  userDelete: async (_, { id }) => {
    return deleteEntry('User', 'userID', id);
  },
};

module.exports = userResolvers;