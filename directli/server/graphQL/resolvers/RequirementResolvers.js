const { createEntry, findAll, findOne, editEntry, deleteEntry } = require('./dbHelpers');

const requirementsResolvers = {
  // Fetch all requirements
  requirementFindAll: async () => {
    return findAll('Requirement');
  },

  // Fetch a single requirement by ID
  requirementFindOne: async (_, { id }) => {
    return findOne('Requirement', 'requirementID', id);
  },

  // Create a new requirement
  requirementCreate: async (_, { input }) => {
    const { requestID, type, text } = input;

    // Define fields and values
    const fields = ['requestID', 'type', 'text'];
    const values = [requestID, type, text];

    return createEntry('Requirement', fields, values);
  },

  // Edit an existing requirement
  requirementEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('Requirement', 'requirementID', id, fields, values);
  },

  // Delete a requirement
  requirementDelete: async (_, { id }) => {
    return deleteEntry('Requirement', 'requirementID', id);
  },
};

module.exports = requirementsResolvers;
