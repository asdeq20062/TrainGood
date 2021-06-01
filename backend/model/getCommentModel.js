const { db_query } = require('../services/db/mysql');

async function getCommentModel(db, ptId){
    try{
        let sql_query = `SELECT pt_comment.*, users.first_name as trainee_first_name, users.last_name as trainee_last_name FROM pt_comment 
        LEFT JOIN users 
        ON pt_comment.user_id = users.id
        WHERE pt_id = ${ptId}`;
        let result = await db_query(db, sql_query);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { getCommentModel };