const fs = require('fs');
const path = require('path');

function uploadImg(res, PhotoPath, fields, beforeOrAfter, currentDateTime, typeOfPhoto){
    let newPhotoPath = path.join(`./public/upload/${beforeOrAfter}/`, `b_${fields.user_id}_${fields.pt_id}_${currentDateTime}.${typeOfPhoto}`);
    fs.readFile(PhotoPath, function(err, data){
        fs.writeFile(newPhotoPath, data, function(err){
            fs.unlink(PhotoPath, function(err){
                if (err) {
                    return false;
                }
            })
        })
    })
    return newPhotoPath;
}

module.exports = { uploadImg };