// Import model
const { ratePtModel, checkRatedRecord } = require('../model/ratePtModel');

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
async function ratePtController(req, res){

    let ptId = req.db.escape(req.body.id);
    let rate = req.db.escape(req.body.rate);
    let userId = req.db.escape(req.decoded_token.id);

    // Check whether the user rates itself
    if( ptId == userId ){
        return res.status(200).json({success: false, err: `You cannot rate yourself.`});
    }

    // Check whether the user has rated the personal trainer
    let queryResult = await checkRatedRecord(req.db, userId, ptId); 
    let isDuplicate = queryResult.length != 0? true: false;

    // Insert rating record
    if(!isDuplicate){
        await ratePtModel(req.db, userId, ptId, rate);
        return res.status(200).json({success: true});
    } else {
        return res.status(200).json({success: false, err: `You've rated this personal trainer before.`});
    }
}

module.exports = { ratePtController };