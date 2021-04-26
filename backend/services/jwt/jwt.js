const jwt = require('jsonwebtoken');
require('dotenv').config(); 


// Environment settings
const secret = process.env['JWT_SERCET'] || 'gymisgood';

/*
    @param {Object} payload
    @param {string} payload.username
    @param {string} payload.pw
*/
function sign_token(payload){
    let token = jwt.sign(
        payload,
        secret,
        {
            expiresIn: "24h"
        }
        );
    return token;
}


function verify_token(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    let token = req.body.token;
    try{
        let decode = jwt.verify(token, secret);
    }
    catch{
        res.json({success: false});
    }
    next();
}


module.exports = {
    sign_token,
    verify_token
}