const { createEntry, createEntriesFromArray, findAll, findOne, editEntry, deleteEntry, findAllByColumn, findIDsFromJoinTable, findAllFromIDArray } = require('./dbHelpers');

const requestResolvers = {
  //BASIC CRUD OPERATIONS
  // Fetch all requests
  requestFindAll: async () => findAll('Request'),

  // Fetch a single request by ID
  requestFindOne: async (_, { id }) => findOne('Request', 'requestID', id),

  // Create a new request and create any associated join entries for Requirements, Categories, and Tags
  requestCreate: async (_, { input }) => {
    const { categoryID, requestedByID, title, brief, descript, postLenMin, postLenMax, requirementIDs, categoryIDs, tagIDs } = input;
    const fields = ['categoryID', 'requestedByID', 'title','brief', 'descript', 'postLenMin', 'postLenMax'];
    const values = [categoryID, requestedByID, title, brief, descript, postLenMin, postLenMax];
    // Create and return the new Request
    const newRequest = await createEntry('Request', fields, values);
    // Isolate the returned requestID to enter into join tables (Requirements, Categories, Tags)
    const requestID = newRequest.requestID;
    // Create entries in the join tables for each Requirement, category, and/or tag
    const requirements = await createEntriesFromArray('RequestRequirements', ['requestID', 'requirementID'], requestID, requirementIDs);
    const categories = await createEntriesFromArray('RequestCategories', ['requestID', 'categoryID'], requestID, categoryIDs)
    const tags = await createEntriesFromArray('RequestTags', ['requestID', 'tagID'], requestID, tagIDs);
    return newRequest;
  },

  // Edit an existing request
  requestEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('Request', 'requestID', id, fields, values);
  },
  
  // Delete a request
  requestDelete: async (_, { id }) => deleteEntry('Request', 'requestID', id),

  //NESTED DATA RETURNED
  // Fetch the IDs for all Categories on one Request from the RequestCategories join table
  requestCategoryIDs: async (parent) => await findIDsFromJoinTable('RequestCategories', 'requestID', parent.requestID, 'categoryID'),

  // Fetch all Categories for one Request
  requestCategories: async (parent) => {
    const IDs = await requestResolvers.requestCategoryIDs(parent);
    return await findAllFromIDArray('Category', 'categoryID', IDs);
  },

  // Fetch the Comments on a request
  requestComments: async (parent) => await findAllByColumn(
      'Comment',
      'relatedItemID',
      parent.requestID,
      { additionalColumn: 'relatedItemType', additionalValue: 'Request' }
    ),
  
  // Fetch the IDs for all Requirements on one Request from the RequestRequirements join table
  requestRequirementIDs: async (parent) => await findIDsFromJoinTable('RequestRequirements', 'requestID', parent.requestID, 'requirementID'),
  
  // Fetch all Requirements for one Request
  requestRequirements: async (parent) => {
    const IDs = await requestResolvers.requestRequirementIDs(parent);
    return await findAllFromIDArray('Requirement', 'requirementID', IDs)
  },
  
  // Fetch the Scenes for a Request
  requestScenes: async (parent) => findAllByColumn('Scene', 'requestID', parent.requestID),

  // Fetch the IDs for all Tags on one Request from the RequestTags join table
  requestTagIDs: async (parent) => await findIDsFromJoinTable('RequestTags', 'requestID', parent.requestID, 'tagID'),

  //Fetch all Tags for one Request
  requestTags: async (parent) => {
    const IDs =  await requestResolvers.requestTagIDs(parent);
    return await findAllFromIDArray('Tag', 'tagID', IDs);
  },

  // Fetch the User who created the request
  requestUser: async (parent) =>  {
    const result = await findAllByColumn('User', 'userID', parent.requestedByID);
    return result[0];
  },
};

module.exports = requestResolvers;
