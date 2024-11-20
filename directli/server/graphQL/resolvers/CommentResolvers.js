const pool =  require('../../db/db');
const errorCatch = require('../errorCatch');

const commentResolvers = {};

// Queries return entries in DB Table
commentResolvers.commentsFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Comment"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Comment', 'fetch');
    }
};

commentResolvers.commentFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Comment"
            WHERE "commentID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Comment', 'fetch');
    }
};

// Mutations create or edit entries in DB
commentResolvers.commentCreate = async (_, { input }, context) => {
    const {
        relatedItemID,
        relatedItemType,
        userID,
        datePosted,
        text
    } = input;
    try {
        const query = `
            INSERT INTO "Comment" (
                "userID",
                "relatedItemID",
                "relatedItemType",
                "datePosted",
                "text"
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [
            userID,
            relatedItemID,
            relatedItemType,
            datePosted,
            text
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Comment', 'create');
    }
};

module.exports = commentResolvers;