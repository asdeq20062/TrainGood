const fs = require('fs');
const path = require('path');
// Import model
const { getBeforeAndAfterPhotos, delCommentModel } = require('../model/delCommentModel');

async function delCommentController(req, res){
    // Check whether the user is admin
    if(req.decoded_token.username != 'admin'){
        return res.status(200).json({sucess: false, err: `You don't have right to do this.`})
    }

    // Delete the before_photo and after_photo
    try{
        let result = await getBeforeAndAfterPhotos(req.db, req.db.escape(req.params.commentid));
        let deletePhoto = [];
        deletePhoto.push(path.join('../', result[0].before_photo));
        deletePhoto.push(path.join('../', result[0].after_photo));
        for(let i = 0; i<deletePhoto.length; i++){
            fs.unlinkSync(deletePhoto[i]);
        }
    } catch (err){
        console.log(err);
        return res.status(200).json({success: false, err: `Delete photos failed.`});
    }

    // Delete record from database
    try{
        let result = await delCommentModel(req.db, req.db.escape(req.params.commentid));
        return res.status(200).json({success: true});
    }catch (err){
        console.log(err);
        return res.status(200).json({success: false, err: `Delete comments failed.`});
    }
}

module.exports = { delCommentController };