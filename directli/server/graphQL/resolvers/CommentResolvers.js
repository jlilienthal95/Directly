const { findAll, findOne, createEntry, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers'); // Import the helper functions

const commentResolvers = {
  //BASIC CRUD OPERATIONS
  // Fetch all comments
  commentFindAll: async () => findAll('Comment'),

  // Fetch a single comment by ID
  commentFindOne: async (_, { id }) => findOne('Comment', 'commentID', id),

  // Create a single comment
  commentCreate: async (_, { input }) => {
    const fields = Object.keys(input); // Extract fields from the input object
    const values = Object.values(input); // Extract values from the input object
    return createEntry('Comment', fields, values); // Create a new comment using the helper function
  },

  // Edit a single comment, lookup by ID
  commentEdit: async (_, { id, input }) => {
    const fields = Object.keys(input); // Extract fields from the input object
    const values = Object.values(input); // Extract values from the input object
    return editEntry('Comment', 'commentID', id, fields, values); // Edit the comment using the helper function
  },

  // Delete a single comment, lookup by ID
  commentDelete: async (_, { id }) => deleteEntry('Comment', 'commentID', id),

  //NESTED DATA RETURNED
  //Fetch User who authored comment
  commentUser: async (parent) => {
    const result = await findAllByColumn('User', 'userID', parent.userID);
    return result[0];
  },

  //Fetch RelatedItem (Scene or Request type), return null if Account type
  commentRelatedItem: async (parent) => {
    if (parent.relatedItemType === 'Scene') {
      // Fetch and return the Scene data
      const scene = await findAllByColumn('Scene', 'sceneID', parent.relatedItemID);
      return scene[0];  // Assuming findAllByColumn returns an array
    } else if (parent.relatedItemType === 'Request') {
      // Fetch and return the Request data
      const request = await findAllByColumn('Request', 'requestID', parent.relatedItemID);
      return request[0];  // Assuming findAllByColumn returns an array
    }
    return null;  // Return null if neither type is matched
  },

};

module.exports = commentResolvers;
