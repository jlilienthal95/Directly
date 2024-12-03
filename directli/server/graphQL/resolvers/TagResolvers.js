const { createEntry, findAll, findOne, editEntry, deleteEntry } = require('./dbHelpers');

const tagResolvers = {
  // Fetch all tags
  tagFindAll: async () => {
    return findAll('Tag');
  },

  // Fetch a single tag by ID
  tagFindOne: async (_, { id }) => {
    return findOne('Tag', 'tagID', id);
  },

  // Create a new tag
  tagCreate: async (_, { input }) => {
    const { text } = input;

    // Define fields and values
    const fields = ['text'];
    const values = [text];

    return createEntry('Tag', fields, values);
  },

  // Edit an existing tag
  tagEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('Tag', 'tagID', id, fields, values);
  },

  // Delete a tag
  tagDelete: async (_, { id }) => {
    return deleteEntry('Tag', 'tagID', id);
  },
};

module.exports = tagResolvers;