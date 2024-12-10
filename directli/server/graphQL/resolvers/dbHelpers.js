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
  try {
    const query = `SELECT * FROM "${table}"`;
    return executeQuery(query, [], table, 'fetch');
  } catch (err) {
    return errorCatch(err, table, 'fetch');
  }
}

// Helper for fetching one entry by ID
async function findOne(table, idColumn, id) {
  try {
    const query = `SELECT * FROM "${table}" WHERE "${idColumn}" = $1`;
    const result = await executeQuery(query, [id], table, 'fetch');
    return result[0];
  } catch (err) {
    return errorCatch(err, table, 'fetch');
  }
}

// Helper for creating a new entry
async function createEntry(table, fields, values) {
  try {
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const quotedFields = fields.map(field => `"${field}"`).join(', '); // Add quotes to fields for casing
    const query = `
      INSERT INTO "${table}" (${quotedFields})
      VALUES (${placeholders})
      RETURNING *
    `;
    const result = await executeQuery(query, values, table, 'create');
    return result[0];
  } catch (err) {
    return errorCatch(err, table, 'create');
  }
}

async function createEntriesFromArray(joinTable, fields, value, IDs) {
  try {
    //Check if IDs exist - tags/categories/requirements
    if (IDs && IDs.length > 0) {
      const promises = IDs.map(item => {
        return createEntry(joinTable, fields, [value, item]);
      });
      // Wait for all promises to resolve
      const results = await Promise.all(promises);
      // Return the created entries
      return results;
    }
    return []; // Return an empty array if the IDs array is empty
  } catch (err) {
    return errorCatch(err, joinTable, 'create from array');
  }
}

// Helper for editing an existing entry
async function editEntry(table, idColumn, id, fields, values) {
  try {
    const setClause = fields.map((field, i) => `"${field}" = $${i + 2}`).join(', ');
    const query = `
      UPDATE "${table}"
      SET ${setClause}
      WHERE "${idColumn}" = $1
      RETURNING *
    `;
    const result = await executeQuery(query, [id, ...values], table, 'edit');
    return result[0];
  } catch (err) {
    return errorCatch(err, table, 'edit');
  }
}

// Helper for deleting an entry
async function deleteEntry(table, idColumn, id) {
  try {
    const query = `DELETE FROM "${table}" WHERE "${idColumn}" = $1 RETURNING *`;
    const result = await executeQuery(query, [id], table, 'delete');
    return result[0];
  } catch (err) {
    return errorCatch(err, table, 'delete');
  }
}

// Fetch all rows from a table where a column matches a specific value
async function findAllByColumn(table, columnName, value, additionalCondition = {}) {
  try {
    const { additionalColumn, additionalValue } = additionalCondition;
    let query = `SELECT * FROM "${table}" WHERE "${columnName}" = $1`;
    const values = [value];

    if (additionalColumn && additionalValue !== undefined) {
      query += ` AND "${additionalColumn}" = $2`;
      values.push(additionalValue);
    }

    console.log('query:', query, 'values:', values);
    return await executeQuery(query, values, table, 'fetch');
  } catch (err) {
    return errorCatch(err, table, 'fetch');
  }
}

// Fetch all rows matching ID from a join table and return the associated ID
async function findIDsFromJoinTable(joinTable, inputColumn, ID, returnColumn) {
  try {
    let IDs = [];
    const results = await findAllByColumn(joinTable, inputColumn, ID);
    results.forEach(result => {
      IDs.push(result[returnColumn]);
    });
    return IDs;
  } catch (err) {
    return errorCatch(err, joinTable, 'fetch IDs');
  }
}

// Fetch all entries from Table, matching each ID from input Array
async function findAllFromIDArray(table, column, array) {
  try {
    if (array.length > 0) {
      const placeholders = array.map((_, i) => `$${i + 1}`).join(', ');
      const query = `SELECT * FROM "${table}" WHERE "${column}" IN (${placeholders})`;
      return await executeQuery(query, array, table, 'fetch');
    }
    return [];
  } catch (err) {
    return errorCatch(err, table, 'fetch from ID array');
  }
}

module.exports = {
  findAll,
  findAllByColumn,
  findAllFromIDArray,
  findOne,
  findIDsFromJoinTable,
  createEntry,
  createEntriesFromArray,
  editEntry,
  deleteEntry,
};