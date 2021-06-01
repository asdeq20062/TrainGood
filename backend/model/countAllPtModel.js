const { db_query } = require('../services/db/mysql');
const { PAGE_ITEM_COUNT } = require('../setting');

async function countAllPtModel(db){
    let sql_query = `SELECT count(*) as count FROM users WHERE is_pt = true`;
    let query_result = await db_query(db, sql_query);
    let res_result = {count: query_result[0].count, item_count: PAGE_ITEM_COUNT};
    return res_result;
}

module.exports = { countAllPtModel };