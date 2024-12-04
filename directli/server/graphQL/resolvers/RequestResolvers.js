const { createEntry, findAll, findOne, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers');

const requestResolvers = {
  //BASIC CRUD OPERATIONS
  // Fetch all requests
  requestFindAll: async () => findAll('Request'),

  // Fetch a single request by ID
  requestFindOne: async (_, { id }) => findOne('Request', 'requestID', id),

  
  // Create a new request
  requestCreate: async (_, { input }) => {
    const { categoryID, requestedByID, title, brief, descript, postLenMin, postLenMax, requirementIDs } = input;
    // Define fields and values, excluding datePosted which is handled by PostgreSQL
    const fields = ['categoryID', 'requestedByID', 'title','brief', 'descript', 'postLenMin', 'postLenMax'];
    const values = [categoryID, requestedByID, title, brief, descript, postLenMin, postLenMax];
    //Create and return the new Request
    const newRequest = await createEntry('Request', fields, values);
    //Isolate the returned requestID to enter into requestRequirements join table
    const requestID = newRequest.requestID;
    //Create entries in the RequestRequirements table for each requirementID
    const requestRequirementsPromises = requirementIDs.map((requirementID) => {
      // Each entry links the new request to an existing requirement
      return createEntry('RequestRequirements', ['requestID', 'requirementID'], [requestID, requirementID]);
    });
    
    await Promise.all(requestRequirementsPromises);
    console.log('requestID:', requestID)
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
  // Fetch the Comments on a request
  requestComments: async (parent) => await findAllByColumn(
      'Comment',
      'relatedItemID',
      parent.requestID,
      { additionalColumn: 'relatedItemType', additionalValue: 'Request' }
    ),

  requestRequirements: async (parent) => {
  // Get all requirement IDs associated with this request using dbhelpers
    const result = await findAllByColumn(
      'RequestRequirements',         // Table for the join
      'requestID',                   // Column in "RequestRequirements" for filtering
      parent.requestID,              // Value for the filtering column
      { additionalColumn: 'requirementID', additionalValue: parent.requirementID }  // Join with Requirement table based on requirementID
    );
  return result;
  },

  requestRequirementIDs: async (parent) => {
    let IDs = [];
    const results =  await findAllByColumn('RequestRequirements', 'requestID', parent.requestID)
    results.forEach(result => {
      if(result.requirementID){
        IDs.push(result.requirementID)
      }
    })
    return IDs
  },

  // Fetch the Scenes for a request
  requestScenes: async (parent) => findAllByColumn('Scene', 'requestID', parent.requestID),

  // Fetch the User who created the request
  requestUser: async (parent) =>  {
    const result = await findAllByColumn('User', 'userID', parent.requestedByID);
    return result[0];
  },
};

module.exports = requestResolvers;
