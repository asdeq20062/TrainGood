// Import model
const { countAllPtModel } = require('../model/countAllPtModel');

async function countAllPtController(req, res){
    let result = await countAllPtModel(req.db);
    return res.status(200).json(result);
}

module.exports = { countAllPtController };