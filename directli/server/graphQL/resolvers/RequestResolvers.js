const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const requestResolvers = {};

// Queries return entries in DB Table
requestResolvers.requestsFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Request"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Request', 'fetch');
    }
};

requestResolvers.requestFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Request"
            WHERE "requestID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Request', 'fetch');
    }
};

// Mutations create or edit entries in DB
requestResolvers.requestCreate = async (_, { input }, context) => {
    const {
        requestedBy,
        categoryID,
        title,
        datePosted,
        brief,
        descript,
        postLenMin,
        postLenMax,
    } = input;

    try {
        const query = `
            INSERT INTO "Request" (
                "categoryID",
                "requestedBy",
                "title",
                "datePosted",
                "brief",
                "descript",
                "postLenMin",
                "postLenMax"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [
            categoryID,
            requestedBy,
            title,
            datePosted,
            brief,
            descript,
            postLenMin,
            postLenMax
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Request', 'create');
    }
};

module.exports = requestResolvers;