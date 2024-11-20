const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const notificationResolvers = {};

// Queries return entries in DB Table
notificationResolvers.notificationsFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Notification"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Notification', 'fetch');
    }
};

notificationResolvers.notificationFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Notification"
            WHERE "notificationID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Notification', 'fetch');
    }
};

// Mutations create or edit entries in DB
notificationResolvers.notificationCreate = async (_, { input }, context) => {
    const {
        userID,
        relatedItemID,
        relatedItemType,
        dateCreated
    } = input;
    try {
        const query = `
            INSERT INTO "Notification" (
                "userID",
                "relatedItemID",
                "relatedItemType",
                "dateCreated"
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            userID,
            relatedItemID,
            relatedItemType,
            dateCreated
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Notification', 'create');
    }
};

module.exports = notificationResolvers;