const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const transactionResolvers = {};

// Queries return entries in DB Table
transactionResolvers.transactionsFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Transaction"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Transaction', 'fetch');
    }
};

transactionResolvers.transactionFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Transaction"
            WHERE "transactionID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Transaction', 'fetch');
    }
};

// Mutations create or edit entries in DB
transactionResolvers.transactionCreate = async (_, { input }, context) => {
    const {
        paidByID,
        paidToID,
        amount,
        paymentDate
    } = input;
    try {
        const query = `
            INSERT INTO "Transaction" (
                "paidByID",
                "paidToID",
                "amount",
                "paymentDate"
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            paidByID,
            paidToID,
            amount,
            paymentDate
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Transaction', 'create');
    }
};

module.exports = transactionResolvers;