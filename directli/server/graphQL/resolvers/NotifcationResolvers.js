const { createEntry, findAll, findOne, editEntry, deleteEntry, findAllByColumn } = require('./dbHelpers');

const notificationResolvers = {
  //BASIC CRUD OPERATIONS
  // Fetch all notifications
  notificationFindAll: async () => {
    return findAll('Notification');
  },

  // Fetch a single notification by ID
  notificationFindOne: async (_, { id }) => {
    return findOne('Notification', 'notificationID', id);
  },

  // Create a new notification
  notificationCreate: async (_, { input }) => {
    const { userID, relatedItemID, relatedItemType } = input;

    // Exclude dateCreated, as it will be handled by PostgreSQL automatically
    const fields = ['userID', 'relatedItemID', 'relatedItemType'];
    const values = [userID, relatedItemID, relatedItemType];

    return createEntry('Notification', fields, values); // Let PostgreSQL handle dateCreated
  },

  // Edit an existing notification
  notificationEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('Notification', 'notificationID', id, fields, values);
  },

  // Delete a notification
  notificationDelete: async (_, { id }) => {
    return deleteEntry('Notification', 'notificationID', id);
  },

  //FETCHES NESTED DATA

  // Fetch User notification belongs to
  notificationUser: async (parent) => {
    const result = await findAllByColumn('User', 'userID', parent.userID);
    return result[0];
  },

  // Fetch RelatedItem (Scene or Request), return nothing if Account Type
  notificationRelatedItem: async (parent) => {
    if (parent.relatedItemType === 'Scene') {
      // Fetch and return the Scene data
      const scene = await findAllByColumn('Scene', 'sceneID', parent.relatedItemID);
      return scene[0];
    } else if (parent.relatedItemType === 'Request') {
      // Fetch and return the Request data
      const request = await findAllByColumn('Request', 'requestID', parent.relatedItemID);
      return request[0];
    }
    //Otherwise (it type is Account) return null
    return null;
  }
};

module.exports = notificationResolvers;
