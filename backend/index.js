const express = require('express');
const app = express();
const {database, db_query} = require('./services/db/mysql');
require('dotenv').config(); 
const {sign_token, verify_token} = require('./services/jwt/jwt.js');
const bodyParser = require('body-parser');
const moment = require('moment');

// Connect db
const db = database();

// Parse Json
app.use(bodyParser.json());

// Show all users
app.get('/', verify_token, async function (req, res){
    let alluser = await db_query(db, 'SELECT * FROM users');
    console.log(alluser);
})

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
    // Check payload
    let username = db.escape(req.body.username);

    // Check whether the username is duplicate

    // Continue to check payload
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

    // Continue to check payload
    let pt_exp = db.escape(req.body.pt_exp);
    let is_pt = db.escape(req.body.is_pt);
    let icon_url = db.escape(req.body.icon_url);

    // Insert a new member
    let sql_query = `INSERT INTO users (\
        username,\
        pw,\
        phone_num,\
        email,\
        first_name,\
        last_name,\
        birthday,\
        pt_exp,\
        is_pt,\
        icon_url\
        ) VALUES (\
        ${username},\
        ${pw},\
        ${phone_num},\
        ${email},\
        ${first_name},\
        ${last_name},\
        ${birthday},\
        ${pt_exp},\
        ${is_pt},\
        ${icon_url}
        )`;
    let result = await db_query(db, sql_query);
    res.setHeader('Content-Type', 'application/json');
    res.json({result: result});
})

// Log in
/*
    @param {Object} req.body
    @param {string} req.body.username
    @param {string} req.body.pw
*/
app.post('/login', async function (req, res){
    let payload = {
        username: req.body.username,
        pw: req.body.pw
    };
    let sql_username = db.escape(req.body.username);
    let sql_pw = db.escape(req.body.pw);
    let sql_query = `SELECT * FROM users WHERE username = ${sql_username} AND pw = ${sql_pw}`;
    let result = await db_query(db, sql_query);
    res.setHeader('Content-Type', 'application/json');
    if(result[0]){
        res.json({success: true, result: result[0]});
    }else{
        res.json({success: false, result: []});
    }
})

// Request member's details

// Update member's details

// Rate the personal trainer

// Request personal trainers


const server = app.listen(process.env.PORT || 8080, function(){
    console.log('Server is running...');
})