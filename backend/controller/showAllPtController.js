const { PAGE_ITEM_COUNT } = require('../setting');

// Import model
const { showAllPtModel } = require('../model/showAllPtModel');

async function ShowAllPtController(req, res){
    let page = (req.params.page - 1 ) * PAGE_ITEM_COUNT;
    try{
        let result = await showAllPtModel(req.db, page);
        return res.status(200).json(result);
    }catch{
        return res.status(200).json({success: false, err: `Invalid page.`});
    }
}

module.exports = { ShowAllPtController };