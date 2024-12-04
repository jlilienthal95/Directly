const { createEntry, findAll, findOne, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers');

const requestResolvers = {
  //BASIC CRUD OPERATIONS
  // Fetch all requests
  requestFindAll: async () => findAll('Request'),

  // Fetch a single request by ID
  requestFindOne: async (_, { id }) => findOne('Request', 'requestID', id),

  
  // Create a new request
  requestCreate: async (_, { input }) => {
    const { categoryID, requestedByID, title, brief, descript, postLenMin, postLenMax } = input;
    // Define fields and values, excluding datePosted which is handled by PostgreSQL
    const fields = ['categoryID', 'requestedByID', 'title','brief', 'descript', 'postLenMin', 'postLenMax'];
    const values = [categoryID, requestedByID, title, brief, descript, postLenMin, postLenMax];
    return createEntry('Request', fields, values); // Let PostgreSQL handle datePosted
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
  // Fetch the scenes for a request
  requestScenes: async (parent) => findAllByColumn('Scene', 'requestID', parent.requestID),

  // Fetch the comments for a request
  requestComments: async (parent) => await findAllByColumn(
      'Comment',
      'relatedItemID',
      parent.requestID,
      { additionalColumn: 'relatedItemType', additionalValue: 'Request' }
    ),
};

module.exports = requestResolvers;
