const { db_query } = require('../services/db/mysql');

async function loginModel(db, username, pw){
    let sql_query = `SELECT * FROM users WHERE username = ${username} AND pw = ${pw}`;
    let result = await db_query(db, sql_query);
    return result;
}

module.exports = { loginModel };