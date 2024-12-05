const { createEntry, findAll, findOne, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers');

const sceneResolvers = {
  //BASIC CRUD OPERATIONS
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
      resolution,
      tagIDs
    } = input;

    const sceneFields = [
      'requestID',
      'createdByID',
      'sceneUrl',
      'thumbnailUrl',
      'status',
      'duration',
      'resolution'
    ];
    const sceneValues = [
      requestID,
      createdByID,
      sceneUrl,
      thumbnailUrl,
      status,
      duration,
      resolution
    ];
    const scene = await createEntry('Scene', sceneFields, sceneValues);
    // If tagIDs are provided, insert them into the SceneTags join table
    if (tagIDs && tagIDs.length > 0) {
      await Promise.all(
        tagIDs.map(async (tagID) => {
          const sceneTagFields = ['sceneID', 'tagID'];
          const sceneTagValues = [scene.sceneID, tagID];

          // Use createEntry to insert into the SceneTags table
          await createEntry('SceneTags', sceneTagFields, sceneTagValues);
        })
      );
    }
    return scene;
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

  //NESTED DATA RETURNED
  //Fetch the User who created a scene
  sceneCreatedBy: async (parent) => {
    const result = await findAllByColumn('User', 'userID', parent.createdByID)
    return result[0];
  },

  // Fetch all Comments on a scene
  sceneComments: async (parent) => await findAllByColumn(
      'Comment',
      'relatedItemID',
      parent.sceneID,
      { additionalColumn: 'relatedItemType', additionalValue: 'Scene' }
    ),
  

};

module.exports = sceneResolvers;
