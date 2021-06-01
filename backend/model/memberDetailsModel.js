const { db_query } = require('../services/db/mysql');

async function memberDetailsModel(db, userid){
    let sql_query = `SELECT * FROM users WHERE id = ${userid}`;
    let result = await db_query(db, sql_query);
    return result;
}

 module.exports = { memberDetailsModel };