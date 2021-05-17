const express = require('express');
const app = express();
const {database, db_query} = require('./services/db/mysql');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const {sign_token, verify_token} = require('./services/jwt/jwt.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set cors
app.use(cors());

// Connect db
const db = database();

// Personal Trainers in each page
const PAGE_ITEM_COUNT = 10;

// Parse Json
app.use(bodyParser.json());

// Sign up
/*
    @param {Object} req.body
    @param {string} req.body.username
    @param {string} req.body.pw
    @param {string} req.body.phone_num
    @param {string} req.body.email
    @param {string} req.body.first_name
    @param {string} req.body.last_name
    @param {datetime} req.body.birthday for example: 1990-1-1
    @param {float} req.body.pt_exp
    @param {boolean} req.body.is_pt
    @param {icon_url} req.body.url
*/
app.post('/signup', async function (req, res){
    // Assign payload
    let username = db.escape(req.body.username);

    // Check whether the username is duplicate
    let sql_query = `SELECT * FROM users WHERE username = ${username}`;
    let check_username_exist = await db_query(db, sql_query);
    if(check_username_exist.length!=0){
        return res.json({success: false, err:'Username exists.'});
    }

    // Continue to assign payload
    let pw = db.escape(req.body.pw);
    let phone_num = db.escape(req.body.phone_num);
    let email = db.escape(req.body.email);
    let first_name = db.escape(req.body.first_name);
    let last_name = db.escape(req.body.last_name);
    
    // Change to datetime format
    let birthday;
    if(req.body.birthday){
        let year = req.body.birthday.split('-')[0];
        let month = req.body.birthday.split('-')[1];
        let day = req.body.birthday.split('-')[2];
        birthday = db.escape(new Date(year, month - 1, day));
    } else {
        birthday = db.escape(req.body.birthday);
    }

    // Continue to assign payload
    let pt_exp = db.escape(req.body.pt_exp);
    let is_pt = db.escape(req.body.is_pt);
    let icon_url = db.escape(req.body.icon_url);

    // Insert a new member
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
        ${phone_num},
        ${email},
        ${first_name},
        ${last_name},
        ${birthday},
        ${pt_exp},
        ${is_pt},
        ${icon_url}
        )`;
    try{
        await db_query(db, sql_query);
        return res.status(200).json({success: true});
    } catch(err){
        return res.status(200).json({success: false});
    }
    
})

// Log in
/*
    @param {Object} req.body
    @param {string} req.body.username
    @param {string} req.body.pw
*/
app.post('/login', async function (req, res){
    let sql_username = db.escape(req.body.username);
    let sql_pw = db.escape(req.body.pw);
    let sql_query = `SELECT * FROM users WHERE username = ${sql_username} AND pw = ${sql_pw}`;
    let result = await db_query(db, sql_query);
    if(result[0]){
        // JSON.parse and JSON.stringify are used to change the textrow to plain object
        let payload = JSON.parse(JSON.stringify(result[0]));
        // Delete the 'pw' key for security
        delete payload.pw;
        let token = sign_token(payload);
        return res.status(200).json({success: true, token: token, id: payload.id, username: req.body.username});
    }else{
        return res.status(200).json({success: false});
    }
})

// Request member's details
/*
    @param {Object} req.decoded_token
    @param {string} req.decoded_token.usernme
    @param {string} req.decoded_token.pw
    @param {int} req.decoded_token.id
    @param {int} req.decoded_token.iat
    @param {float} req.decoded_token.exp
*/
app.post('/memberdetails', verify_token, async function (req, res){
    let user_id = db.escape(req.decoded_token.id);
    let sql_query = `SELECT * FROM users WHERE id = ${user_id}`;
    let result = await db_query(db, sql_query);
    return res.status(200).json(result);
})

// Update member's details
/*
    @param {Object} req.decoded_token
    @param {string} req.decoded_token.usernme
    @param {string} req.decoded_token.pw
    @param {int} req.decoded_token.id
    @param {int} req.decoded_token.iat
    @param {float} req.decoded_token.exp
    @param {Object} req.body
    @param {string} req.body.pw
    @param {string} req.body.phone_num
    @param {string} req.body.email
    @param {string} req.body.first_name
    @param {string} req.body.last_name
    @param {datetime} req.body.birthday for example: 1990-1-1
    @param {float} req.body.pt_exp
    @param {boolean} req.body.is_pt
    @param {icon_url} req.body.url
*/
app.post('/updatememberdetails', verify_token, async function (req, res){
    
    // Assign payload
    let pw = db.escape(req.body.pw);
    let phone_num = db.escape(req.body.phone_num);
    let email = db.escape(req.body.email);
    let first_name = db.escape(req.body.first_name);
    let last_name = db.escape(req.body.last_name);

    // Change to datetime format
    let birthday;
    if(req.body.birthday){
        let year = req.body.birthday.split('-')[0];
        let month = req.body.birthday.split('-')[1];
        let day = req.body.birthday.split('-')[2];
        birthday = db.escape(new Date(year, month - 1, day));
    } else {
        birthday = db.escape(req.body.birthday);
    }

    // Continue to assign payload
    let pt_exp = db.escape(req.body.pt_exp);
    let is_pt = db.escape(req.body.is_pt);
    let icon_url = db.escape(req.body.icon_url);

    // Assign decoded token id
    let user_id = req.decoded_token.id;

    // Update the member's details
    let sql_query = `UPDATE users SET
    pw = ${pw},
    phone_num = ${phone_num},
    email = ${email},
    first_name = ${first_name},
    last_name = ${last_name},
    birthday = ${birthday},
    pt_exp = ${pt_exp},
    is_pt = ${is_pt},
    icon_url = ${icon_url}
    WHERE id = ${user_id}`;

    try{
        await db_query(db, sql_query);
        return res.status(200).json({success: true});
    } catch (err) {
        return res.status(200).json({success: false});
    }
    
})

// Rate the personal trainer
/*
    @param {Object} req.body
    @param {int} req.body.pt_id
    @param {int} req.body.rate Range: 1-5
    @param {Object} req.decoded_token
    @param {string} req.decoded_token.usernme
    @param {string} req.decoded_token.pw
    @param {int} req.decoded_token.id
    @param {int} req.decoded_token.iat
    @param {float} req.decoded_token.exp
*/
app.post('/ratept', verify_token, async function (req, res){

    let pt_id = db.escape(req.body.id);
    let rate = db.escape(req.body.rate);
    let user_id = db.escape(req.decoded_token.id);

    // Check whether the user rates itself
    if(pt_id == user_id){
        return res.status(200).json({success: false, err: `You cannot rate yourself.`});
    }

    // Check whether the user has rated the personal trainer
    let sql_query = `SELECT * FROM pt_rate WHERE user_id = ${user_id} AND pt_id = ${pt_id}`;
    let query_result = await db_query(db, sql_query); 
    let is_duplicate = query_result.length != 0? true: false;

    // Insert rating record
    if(!is_duplicate){
        sql_query = `INSERT INTO pt_rate (user_id, pt_id, rating) VALUES (${user_id}, ${pt_id}, ${rate})`;
        await db_query(db, sql_query);
        return res.status(200).json({success: true});
    } else {
        return res.status(200).json({success: false, err: `You've rated this personal trainer before.`});
    }
})

// Show all personal trainers
app.get('/showallpt/:page', async function (req, res){
    let page = (req.params.page - 1 ) * PAGE_ITEM_COUNT;
    let sql_query = `SELECT users.id, users.phone_num, users.email, users.first_name,
    users.last_name, users.pt_exp, users.icon_url, AVG(pt_rate.rating) as rating FROM users 
    LEFT JOIN pt_rate
    ON users.id = pt_rate.pt_id
    WHERE users.is_pt = 1
    GROUP BY users.id
    LIMIT ${page}, ${PAGE_ITEM_COUNT}`;
    try{
        let query_result = await db_query(db, sql_query);
        return res.status(200).json(query_result);
    }catch{
        return res.status(200).json({success: false, err: `Invalid page.`});
    }
})

// Count all personal trainers
app.get('/countallpt', async function (req, res){
    let sql_query = `SELECT count(*) as count FROM users WHERE is_pt = true`;
    let query_result = await db_query(db, sql_query);
    let res_result = {count: query_result[0].count, item_count: PAGE_ITEM_COUNT};
    return res.status(200).json(res_result);
})


const server = app.listen(process.env.PORT || 8080, function(){
    console.log('Server is running...');
    console.log(`You are using the env.${ process.env.NODE_ENV }. config.`)
})