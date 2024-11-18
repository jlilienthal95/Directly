const pool =  require('../../db/db');

const userResolvers = {};


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
        console.error(`Error creating user:`, err.message);
        throw new Error('Failed to create user');
    }
}

module.exports = userResolvers;