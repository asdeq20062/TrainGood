const { db_query } = require('../services/db/mysql');

async function getBestPtModel(db){
    let sql_query = `
    SELECT pt_id as id, first_name, last_name, icon_url, phone_num, email, pt_exp, avg_rating as rating FROM
    (SELECT *, avg(rating) as avg_rating FROM pt_rate GROUP BY pt_id) as rating_table
    LEFT JOIN users
    ON rating_table.pt_id = users.id
    WHERE is_pt=true`;
    let result = await db_query(db, sql_query);
    return result;
}

module.exports = { getBestPtModel };