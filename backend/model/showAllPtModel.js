const { db_query } = require('../services/db/mysql');
const { PAGE_ITEM_COUNT } = require('../setting');

async function showAllPtModel(db, page){
    let sql_query = `SELECT users.id, users.phone_num, users.email, users.first_name,
    users.last_name, users.pt_exp, users.icon_url, AVG(pt_rate.rating) as rating FROM users 
    LEFT JOIN pt_rate
    ON users.id = pt_rate.pt_id
    WHERE users.is_pt = 1
    GROUP BY users.id
    LIMIT ${page}, ${PAGE_ITEM_COUNT}`;
    let result = await db_query(db, sql_query);
    return result;
}

module.exports = { showAllPtModel };