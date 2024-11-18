const pool = require('../../db/db');

const categoryResolvers = {};

categoryResolvers.categoryCreate = async(parent, args, context) => {
    try{
        const query = `
        INSERT INTO "Category" ( "text" )
        VALUES ($1)
        RETURNING *
        `
        const values = [args.input.text];
        const results = await pool.query(query, values);
        return results.rows[0];
    } catch (err) {
        console.error(`Error creating category with value: ${args.input.text}:`, err.message);
        throw new Error('Failed to create category');
    }
}

module.exports = categoryResolvers;