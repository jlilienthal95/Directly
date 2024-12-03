const { createEntry, findAll, findOne, editEntry, deleteEntry } = require('./dbHelpers');

const notificationResolvers = {
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
};

module.exports = notificationResolvers;
