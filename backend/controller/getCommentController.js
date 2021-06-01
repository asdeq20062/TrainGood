// Import model
const { getCommentModel } = require('../model/getCommentModel');

async function getCommentController(req, res){
    try{
        let result = await getCommentModel(req.db, req.db.escape(req.params.ptid));
        return res.status(200).json({success: true, result: result});
    } catch (err) {
        return res.status(200).json({success: false});
    }

}

module.exports = { getCommentController };