const db = require('../db/sampleData.js');
const pool = require('../db/db');
const categoryResolvers = require('./resolvers/CategoryResolvers.js');
const userResolvers = require('./resolvers/UserResolvers.js');

const resolvers = {
    Query: {
        usersFindAll: async () => {
                const result = await pool.query('SELECT * FROM "User"')
                return result.rows;
        },
        userFindOne: async (_, args) => {
            return db.users.find((u) => u.userID === args.id)
        }
    },
    Mutation: {
        categoryCreate: categoryResolvers.categoryCreate,
        userCreate: userResolvers.userCreate,
    }
}

module.exports = resolvers;