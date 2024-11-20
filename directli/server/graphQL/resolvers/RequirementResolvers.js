const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const requirementResolvers = {};

// Queries to fetch entries in the DB table
requirementResolvers.requirementsFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Requirement"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Requirement', 'fetch');
    }
};

requirementResolvers.requirementFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Requirement"
            WHERE "requirementID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Requirement', 'fetch');
    }
};

// Mutation to create or edit entries in the DB table
requirementResolvers.requirementCreate = async (_, { input }, context) => {
    const {
        requestID,
        type,
        text
    } = input;
    try {
        const query = `
            INSERT INTO "Requirement" (
                "requestID",
                "type",
                "text"
            )
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [requestID, type, text];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Requirement', 'create');
    }
};

module.exports = requirementResolvers;
