const pool =  require('../../db/db');
const errorCatch = require('../errorCatch');

const userResolvers = {};

//Queries return entries in DB Table
userResolvers.usersFindAll = async () => {
    try{
        const result = await pool.query('SELECT * FROM "User"')
        return result.rows;
    } catch(err) {
        errorCatch(err, 'User', 'fetch');
    }
};

userResolvers.userFindOne = async (_, args) => {
    try {
        const query = `
            SELECT *
            FROM "User"
            WHERE "userID" = $1
        `;
        const values = [args.id]
        const result = await pool.query(query, values);
        return result.rows[0]
    } catch(err) {
        errorCatch(err, 'User', 'fetch');
    }
}

//Mutations create or edit entries in DB
userResolvers.userCreate = async(_, { input }, context ) => {
    const {
        nameFirst,
        nameLast,
        displayName,
        email,
        phone,
        address,
        dob,
        bio,
        profPicUrl
    } = input;
    try{
        const query = `
            INSERT INTO "User" (
                "nameFirst",
                "nameLast",
                "displayName",
                "email",
                "phone",
                "address",
                "dob",
                "bio",
                "profPicUrl"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [
            nameFirst,
            nameLast,
            displayName,
            email,
            phone,
            address,
            dob,
            bio,
            profPicUrl
        ];
        const result = await pool.query(query, values);
        return result.rows[0]
    } catch(err) {
        errorCatch(err, 'User', 'create');
    }
}

userResolvers.userEdit = async (_, { id, input }, context) => {
    const {
        nameFirst,
        nameLast,
        displayName,
        email,
        phone,
        address,
        dob,
        bio,
        profPicUrl
    } = input;
    try {
        const query = `
            UPDATE "User"
            SET 
                "nameFirst" = COALESCE($1, "nameFirst"),
                "nameLast" = COALESCE($2, "nameLast"),
                "displayName" = COALESCE($3, "displayName"),
                "email" = COALESCE($4, "email"),
                "phone" = COALESCE($5, "phone"),
                "address" = COALESCE($6, "address"),
                "dob" = COALESCE($7, "dob"),
                "bio" = COALESCE($8, "bio"),
                "profPicUrl" = COALESCE($9, "profPicUrl")
            WHERE "userID" = $10
            RETURNING *
        `;
        const values = [
            nameFirst,
            nameLast,
            displayName,
            email,
            phone,
            address,
            dob,
            bio,
            profPicUrl,
            id
        ];
        const result = await pool.query(query, values);
        console.log('result:', result);
        return result.rows[0];
    } catch (err) {
        errorCatch(err, 'User', 'edit');
    }
};

userResolvers.userDelete = async (_, { id }) => {
    try {
        const query = `
            DELETE FROM "User"
            WHERE "userID" = $1
            RETURNING *
        `;
        const values = [id];
        const result = await pool.query(query, values);
        
        // If the user is not found, return a meaningful message
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }

        return result.rows[0];  // return deleted user details
    } catch (err) {
        errorCatch(err, 'User', 'delete');
        throw err;
    }
};

module.exports = userResolvers;