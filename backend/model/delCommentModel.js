const { db_query } = require('../services/db/mysql');

async function getBeforeAndAfterPhotos(db, commentId){
    try{
        let sql_query = `SELECT * FROM pt_comment WHERE comment_id = ${commentId}`;
        let result = await db_query(db, sql_query);
        return result;
    } catch (err) {
        throw err;
    }
}

async function delCommentModel(db, commentId){
    try{
        let sql_query = `DELETE FROM pt_comment WHERE comment_id = ${commentId}`;
        let result = await db_query(db, sql_query);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { getBeforeAndAfterPhotos, delCommentModel };