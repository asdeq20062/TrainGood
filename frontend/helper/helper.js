function getExpiryTimeFromToken(token){
    let getMiddlePartOfToken = token.split('.')[1];
    let decodeToken = new Buffer(getMiddlePartOfToken, 'base64');
    let expiryTime = (decodeToken.toString()).exp;
    return expiryTime;
}

function checkTokenExpired(expiryTime){
    let currentDate = new Date;
    let currentTime = currentDate.getTime()/1000;
    let isExpired = currentTime > expiryTime? true: false;
    return isExpired;
}

function getCorrectApiHost(){
    if(typeof(window)==='undefined'){
        return process.env.SERVER_API_HOST;
    } else {
        return process.env.BROWSER_API_HOST;
    }
}

module.exports = {
    getExpiryTimeFromToken,
    checkTokenExpired,
    getCorrectApiHost
}