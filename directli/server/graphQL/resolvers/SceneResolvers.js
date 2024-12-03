const { createEntry, findAll, findOne, editEntry, deleteEntry } = require('./dbHelpers');

const sceneResolvers = {
  // Fetch all scenes
  sceneFindAll: async () => {
    return findAll('Scene');
  },

  // Fetch a single scene by ID
  sceneFindOne: async (_, { id }) => {
    return findOne('Scene', 'sceneID', id);
  },

  // Create a new scene
  sceneCreate: async (_, { input }) => {
    const { 
      requestID, 
      createdByID, 
      sceneUrl, 
      thumbnailUrl, 
      status, 
      duration, 
      resolution 
    } = input;

    // Exclude dateSubmitted, as it will be handled by PostgreSQL automatically
    const fields = [
      'requestID',
      'createdByID',
      'sceneUrl',
      'thumbnailUrl',
      'status',
      'duration',
      'resolution'
    ];
    const values = [
      requestID,
      createdByID,
      sceneUrl,
      thumbnailUrl,
      status,
      duration,
      resolution
    ];

    return createEntry('Scene', fields, values); // Let PostgreSQL handle dateSubmitted
  },

  // Edit an existing scene
  sceneEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('Scene', 'sceneID', id, fields, values);
  },

  // Delete a scene
  sceneDelete: async (_, { id }) => {
    return deleteEntry('Scene', 'sceneID', id);
  },
};

module.exports = sceneResolvers;
