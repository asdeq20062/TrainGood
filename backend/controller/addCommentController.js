const formidable = require('formidable');
const { getImgType } = require('../helper/getImgType.js');
const { uploadImg } = require('../helper/uploadImg');

// Import model
const { addCommentModel } = require('../model/addCommentModel');


async function addCommentController(req, res){
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files){
        if (err) console.log(err);
        // Get current time
        let currentDate = new Date();
        let currentDateTime = currentDate.getTime();

        // Get type of before_photo
        let typeBeforePhoto = getImgType(files.before_photo.type);

        // Upload before_photo
        let newBeforePhotoPath = uploadImg(res, files.before_photo.path, fields, 'before', currentDateTime, typeBeforePhoto);
        if(!newBeforePhotoPath) return res.status(200).json({success: false, err: `Upload before_photo failed.`});

        // Get type of before_photo
        let typeAfterPhoto = getImgType(files.after_photo.type);

        // Upload after_photo
        let newAfterPhotoPath = uploadImg(res, files.after_photo.path, fields, 'after', currentDateTime, typeAfterPhoto);
        if(!newAfterPhotoPath) return res.status(200).json({success: false, err: `Upload after_photo failed.`});

        // Insert the comment record
        try{
            await addCommentModel(
                req.db, fields.user_id, req.db.escape(fields.pt_id), req.db.escape(fields.comment),
                req.db.escape(newBeforePhotoPath), req.db.escape(newAfterPhotoPath), req.db.escape(fields.create_date)
                );
            return res.status(200).json({success: true});
        }catch (err){
            return res.status(200).json({success: false, err: 'Comment failed.'});
        }
    })

}

module.exports = { addCommentController };