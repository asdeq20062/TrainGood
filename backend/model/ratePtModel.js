const { db_query } = require('../services/db/mysql');

async function checkRatedRecord (db, userId, ptId){
    let sql_query = `SELECT * FROM pt_rate WHERE user_id = ${userId} AND pt_id = ${ptId}`;
    let result = await db_query(db, sql_query); 
    return result;
}

async function ratePtModel (db, userId, ptId, rate){
    let sql_query = `INSERT INTO pt_rate (user_id, pt_id, rating) VALUES (${userId}, ${ptId}, ${rate})`;
    await db_query(db, sql_query);
}

module.exports = { checkRatedRecord, ratePtModel }