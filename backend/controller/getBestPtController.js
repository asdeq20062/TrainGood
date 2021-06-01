// Import model
const { getBestPtModel } = require('../model/getBestPtModel');

async function getBestPtController(req, res){
    let result = await getBestPtModel(req.db);
    // Change the type of avg_rating to float
    let tmpArr = result.map((items) => {
        return (Number.parseFloat(items.rating));
    })
    // Get the max value
    let max = Math.max(...tmpArr);
    // Filter the index of max rating records
    let maxRecord = result.filter((item, index, array)=>{
        return (Number.parseFloat(item.rating)) == max;
    })
    return res.status(200).json(maxRecord);
}

module.exports = { getBestPtController };