const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const sceneResolvers = {};

// Queries return entries in DB Table
sceneResolvers.scenesFindAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM "Scene"');
        return result.rows;
    } catch (err) {
        errorCatch(err, 'Scene', 'fetch');
    }
};

sceneResolvers.sceneFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Scene"
            WHERE "sceneID" = $1
        `;
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Scene', 'fetch');
    }
};

// Mutations create or edit entries in DB
sceneResolvers.sceneCreate = async (_, { input }, context) => {
    const {
        requestID,
        createdByID,
        sceneUrl,
        thumbnailUrl,
        dateSubmitted,
        status,
        duration,
        resolution
    } = input;

    try {
        const query = `
            INSERT INTO "Scene" (
                "requestID",
                "createdByID",
                "sceneUrl",
                "thumbnailUrl",
                "dateSubmitted",
                "status",
                "duration",
                "resolution"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [
            requestID,
            createdByID,
            sceneUrl,
            thumbnailUrl,
            dateSubmitted,
            status,
            duration,
            resolution
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Scene', 'create');
    }
};

module.exports = sceneResolvers;
