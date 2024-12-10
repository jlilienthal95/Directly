const { createEntry, createEntriesFromArray, findAll, findOne, findIDsFromJoinTable, findAllFromIDArray, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers');

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

  // Create a new scene and create any associated join entries for Categories and Tags
  sceneCreate: async (_, { input }) => {
    const { requestID, createdByID, sceneUrl, thumbnailUrl, status, duration, resolution, categoryIDs, tagIDs } = input;
    const sceneFields = [ 'requestID', 'createdByID', 'sceneUrl', 'thumbnailUrl', 'status', 'duration', 'resolution' ];
    const sceneValues = [ requestID, createdByID, sceneUrl, thumbnailUrl, status, duration, resolution ];
    // Create and return the new Scene
    const newScene = await createEntry('Scene', sceneFields, sceneValues);
    // Isolate the returned sceneID to enter into join tables (Requirements, Categories, Tags)
    const sceneID = newScene.sceneID;
    // Create entries in the join tables for each category and/or tag
    const categories = await createEntriesFromArray('SceneCategories', ['sceneID', 'categoryID'], sceneID, categoryIDs);
    const tags = await createEntriesFromArray('SceneTags', ['sceneID', 'tagID'], sceneID, tagIDs);
    console.log(`sceneID: ${sceneID} categories: ${categories}, tags: ${tags}`);
    return newScene;
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
  // Fetch the IDs for all Categories on one Scene from the SceneCategories join table
  sceneCategoryIDs: async (parent) => await findIDsFromJoinTable('SceneCategories', 'sceneID', parent.sceneID, 'categoryID'),

  // Fetch all Categories for one Scene
  sceneCategories: async (parent) => {
    const IDs = await sceneResolvers.sceneCategoryIDs(parent);
    return await findAllFromIDArray('Category', 'categoryID', IDs);
  },

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
  
  // Fetch the IDs for all Tags on one Scene from the SceneTags join table
  sceneTagIDs: async (parent) => await findIDsFromJoinTable('SceneTags', 'sceneID', parent.sceneID, 'tagID'),

  // Fetch all Tags for one Scene
  sceneTags: async (parent) => {
    const IDs = await sceneResolvers.sceneTagIDs(parent);
    return await findAllFromIDArray('Tag', 'tagID', IDs);
  },
};

module.exports = sceneResolvers;
