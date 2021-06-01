const { sign_token } = require('../services/jwt/jwt.js');

// Import model
const { loginModel } = require('../model/loginModel');

/*
    @param {Object} req.body
    @param {string} req.body.username
    @param {string} req.body.pw
*/

async function loginController (req, res){
    let username = req.db.escape(req.body.username);
    let pw = req.db.escape(req.body.pw);
    let result = await loginModel(req.db, username, pw);
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
}

module.exports = { loginController };