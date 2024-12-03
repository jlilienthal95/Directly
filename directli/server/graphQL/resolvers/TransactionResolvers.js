const { createEntry, findAll, findOne, editEntry, deleteEntry } = require('./dbHelpers');

const transactionResolvers = {
  // Fetch all transactions
  transactionFindAll: async () => {
    return findAll('Transaction');
  },

  // Fetch a single transaction by ID
  transactionFindOne: async (_, { id }) => {
    return findOne('Transaction', 'transactionID', id);
  },

  // Create a new transaction
  transactionCreate: async (_, { input }) => {
    const { paidByID, paidToID, amount } = input;

    // Define fields and values; exclude paymentDate (handled by PostgreSQL)
    const fields = ['paidByID', 'paidToID', 'amount'];
    const values = [paidByID, paidToID, amount];

    return createEntry('Transaction', fields, values);
  },

  // Edit an existing transaction
  transactionEdit: async (_, { id, input }) => {
    const fields = Object.keys(input);
    const values = Object.values(input);
    return editEntry('Transaction', 'transactionID', id, fields, values);
  },

  // Delete a transaction
  transactionDelete: async (_, { id }) => {
    return deleteEntry('Transaction', 'transactionID', id);
  },
};

module.exports = transactionResolvers;
