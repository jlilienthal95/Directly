const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

const categoryResolvers = {};

//Queries return entries in DB
categoryResolvers.categoryFindOne = async(_, args) => {
    try {
        const query = `
            SELECT *
            FROM "Category"
            WHERE "categoryID" = $1
        `
        const values = [args.id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'Category', "fetch");
    }
}

categoryResolvers.categoryFindAll = async() => {
    try {
        const query = `SELECT * FROM "Category"`;
        const result = await pool.query(query);
        return result.rows;
    } catch(err) {
        errorCatch(err, 'Category', 'fetch');
    }
}

//Mutations create or edit entries in DB
categoryResolvers.categoryCreate = async(_, args) => {
    try {
        const query = `
        INSERT INTO "Category" ( "text" )
        VALUES ($1)
        RETURNING *
        `
        const values = [args.input.text];
        const results = await pool.query(query, values);
        return results.rows[0];
    } catch (err) {
        errorCatch(err, 'Category', 'create');
    }
}

module.exports = categoryResolvers;