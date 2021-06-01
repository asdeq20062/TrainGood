const { db_query } = require('../services/db/mysql');

async function addCommentModel(db, userId, ptId, comment, beforePhoto, afterPhoto, createDate){
    try{
        let sql_query = `INSERT INTO pt_comment (user_id, pt_id, comment, before_photo, after_photo, create_date) 
        VALUES
        (${userId}, ${ptId}, ${comment}, 
        ${beforePhoto}, ${afterPhoto}, ${createDate})`;
        await db_query(db, sql_query);
    } catch(err) {
        throw err;
    }
}

module.exports = { addCommentModel };