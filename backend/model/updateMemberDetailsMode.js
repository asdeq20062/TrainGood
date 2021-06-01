const { db_query } = require('../services/db/mysql');

async function updateMemberDetailsMode(db, pw, phoneNum, email, firstName, lastName, birthday, ptExp, isPt, iconUrl, userId){
    try{
        let sql_query = `UPDATE users SET
        pw = ${pw},
        phone_num = ${phoneNum},
        email = ${email},
        first_name = ${firstName},
        last_name = ${lastName},
        birthday = ${birthday},
        pt_exp = ${ptExp},
        is_pt = ${isPt},
        icon_url = ${iconUrl}
        WHERE id = ${userId}`;
        await db_query(db, sql_query);
    } catch (err) {
        throw err;
    }

}

module.exports = { updateMemberDetailsMode };