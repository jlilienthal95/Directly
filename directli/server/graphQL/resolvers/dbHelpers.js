const pool = require('../../db/db');
const errorCatch = require('../errorCatch');

/**
 * A generic helper for querying the database.
 * @param {string} query - The SQL query string.
 * @param {array} values - The values to be passed into the query.
 * @param {string} table - The name of the table.
 * @param {string} operation - The type of operation (fetch, create, delete, etc.).
 * @returns {Promise<any>} - The query result or an error object.
 */
async function executeQuery(query, values, table, operation) {
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    return errorCatch(err, table, operation);
  }
}

// Helper for fetching all entries
async function findAll(table) {
  const query = `SELECT * FROM "${table}"`;
  return executeQuery(query, [], table, 'fetch');
}

// Helper for fetching one entry by ID
async function findOne(table, idColumn, id) {
  const query = `SELECT * FROM "${table}" WHERE "${idColumn}" = $1`;
  const result = await executeQuery(query, [id], table, 'fetch');
  return result[0];
}

// Helper for creating a new entry
async function createEntry(table, fields, values) {
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const quotedFields = fields.map(field => `"${field}"`).join(', '); // Add quotes to fields for casing
    const query = `
      INSERT INTO "${table}" (${quotedFields})
      VALUES (${placeholders})
      RETURNING *
    `;
    const result = await executeQuery(query, values, table, 'create');
    return result[0];
  }
  

// Helper for editing an existing entry
async function editEntry(table, idColumn, id, fields, values) {
  const setClause = fields.map((field, i) => `"${field}" = $${i + 2}`).join(', ');
  const query = `
    UPDATE "${table}"
    SET ${setClause}
    WHERE "${idColumn}" = $1
    RETURNING *
  `;
  const result = await executeQuery(query, [id, ...values], table, 'edit');
  return result[0];
}

// Helper for deleting an entry
async function deleteEntry(table, idColumn, id) {
  const query = `DELETE FROM "${table}" WHERE "${idColumn}" = $1 RETURNING *`;
  const result = await executeQuery(query, [id], table, 'delete');
  return result[0];
}

// Fetch all rows from a table where a column matches a specific value
async function findAllByColumn(table, columnName, value) {
    const query = `SELECT * FROM "${table}" WHERE "${columnName}" = $1`;
    return await executeQuery(query, [value], table, 'fetch');
  }

module.exports = {
  findAll,
  findOne,
  createEntry,
  editEntry,
  deleteEntry,
  findAllByColumn,
};
