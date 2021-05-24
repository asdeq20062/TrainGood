function getImgType(img){
    let typeOfPhoto;
    switch(img){
        case 'image/jpeg':
            typeOfPhoto = 'jpeg';
            break;
        case 'image/png':
            typeOfPhoto = 'png';
            break;
    }
    return typeOfPhoto;
}

module.exports = { getImgType };


