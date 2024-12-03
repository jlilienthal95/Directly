const { findAll, findOne, createEntry, editEntry, deleteEntry } = require('./dbHelpers'); // Import the helper functions

const commentResolvers = {
  // Queries return entries in DB Table
  commentFindAll: async () => 
    findAll('Comment'), // Fetch all comments using the helper function

  commentFindOne: async (_, { id }) => 
    findOne('Comment', 'commentID', id), // Fetch a single comment by ID using the helper function

  // Mutations create or edit entries in DB
  commentCreate: async (_, { input }) => {
    const fields = Object.keys(input); // Extract fields from the input object
    const values = Object.values(input); // Extract values from the input object
    return createEntry('Comment', fields, values); // Create a new comment using the helper function
  },

  commentEdit: async (_, { id, input }) => {
    const fields = Object.keys(input); // Extract fields from the input object
    const values = Object.values(input); // Extract values from the input object
    return editEntry('Comment', 'commentID', id, fields, values); // Edit the comment using the helper function
  },

  commentDelete: async (_, { id }) => 
    deleteEntry('Comment', 'commentID', id), // Delete the comment using the helper function
};

module.exports = commentResolvers;
