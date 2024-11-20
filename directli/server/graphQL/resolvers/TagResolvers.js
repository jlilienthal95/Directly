const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const tagResolvers = {};

// Queries to return entries from the Tag table
tagResolvers.tagsFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Tag"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Tag', 'fetch');
    }
};

tagResolvers.tagFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Tag"
            WHERE "tagID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Tag', 'fetch');
    }
};

// Mutations to create or edit entries in the Tag table
tagResolvers.tagCreate = async (_, { input }, context) => {
    const { text } = input;
    try {
        const query = `
            INSERT INTO "Tag" (
                "text"
            )
            VALUES ($1)
            RETURNING *
        `;
        const values = [text];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Tag', 'create');
    }
};

module.exports = tagResolvers;