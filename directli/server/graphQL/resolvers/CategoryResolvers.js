const { findAll, findOne, createEntry, editEntry, deleteEntry } = require('./dbHelpers'); // Import the helper functions

const categoryResolvers = {
  // Fetch all categories
  categoryFindAll: async () => {
    return findAll('Category'); // Use the helper function to get all categories
  },

  // Fetch a single category by ID
  categoryFindOne: async (_, { id }) => {
    return findOne('Category', 'categoryID', id); // Use the helper function to get a category by ID
  },

  // Create a new category
  categoryCreate: async (_, { input }) => {
    const fields = Object.keys(input); // Extract fields from the input object
    const values = Object.values(input); // Extract values from the input object
    return createEntry('Category', fields, values); // Use the helper function to create a new category
  },

  // Edit an existing category
  categoryEdit: async (_, { id, input }) => {
    const fields = Object.keys(input); // Extract fields from the input object
    const values = Object.values(input); // Extract values from the input object
    return editEntry('Category', 'categoryID', id, fields, values); // Use the helper function to edit the category
  },

  // Delete a category
  categoryDelete: async (_, { id }) => {
    return deleteEntry('Category', 'categoryID', id); // Use the helper function to delete the category
  },
};

module.exports = categoryResolvers;
