// Import model
const { memberDetailsModel } = require('../model/memberDetailsModel');

/*
    @param {Object} req.decoded_token
    @param {string} req.decoded_token.usernme
    @param {string} req.decoded_token.pw
    @param {int} req.decoded_token.id
    @param {int} req.decoded_token.iat
    @param {float} req.decoded_token.exp
*/
async function memberDetailsController(req, res){
    let userid = req.db.escape(req.decoded_token.id);
    let result = await memberDetailsModel(req.db, userid);
    return res.status(200).json(result);
}

module.exports = { memberDetailsController };