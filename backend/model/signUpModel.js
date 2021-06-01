const { db_query } = require('../services/db/mysql');

async function checkUsernameDuplicate(db, username){
    let sql_query = `SELECT * FROM users WHERE username = ${username}`;
    let result = await db_query(db, sql_query);
    return result;
}

async function signUpModel(db, username, pw, phoneNum, email, firstName, lastName, birthday, ptExp, isPt, iconUrl){
    try{
        sql_query = `INSERT INTO users (
            username,
            pw,
            phone_num,
            email,
            first_name,
            last_name,
            birthday,
            pt_exp,
            is_pt,
            icon_url
            ) VALUES (
            ${username},
            ${pw},
            ${phoneNum},
            ${email},
            ${firstName},
            ${lastName},
            ${birthday},
            ${ptExp},
            ${isPt},
            ${iconUrl}
            )`;
        await db_query(db, sql_query);
    } catch (err) {
        throw err;
    }
}

module.exports = { checkUsernameDuplicate, signUpModel };