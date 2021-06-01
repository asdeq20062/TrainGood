// Import model
const { checkUsernameDuplicate, signUpModel } = require('../model/signUpModel');

/*
    @param {Object} req.body
    @param {string} req.body.username
    @param {string} req.body.pw
    @param {string} req.body.phone_num
    @param {string} req.body.email
    @param {string} req.body.first_name
    @param {string} req.body.last_name
    @param {datetime} req.body.birthday for example: 1990-1-1
    @param {float} req.body.pt_exp
    @param {boolean} req.body.is_pt
    @param {icon_url} req.body.url
*/
async function signUpController(req, res){
    // Assign payload
    let username = req.db.escape(req.body.username);

    // Check whether the username is duplicate
    let check_username_exist = await checkUsernameDuplicate(req.db, username);
    if(check_username_exist.length!=0){
        return res.json({success: false, err:'Username exists.'});
    }

    // Continue to assign payload
    let pw = req.db.escape(req.body.pw);
    let phone_num = req.db.escape(req.body.phone_num);
    let email = req.db.escape(req.body.email);
    let first_name = req.db.escape(req.body.first_name);
    let last_name = req.db.escape(req.body.last_name);
    
    // Change to datetime format
    let birthday;
    if(req.body.birthday){
        let year = req.body.birthday.split('-')[0];
        let month = req.body.birthday.split('-')[1];
        let day = req.body.birthday.split('-')[2];
        birthday = req.db.escape(new Date(year, month - 1, day));
    } else {
        birthday = req.db.escape(req.body.birthday);
    }

    // Continue to assign payload
    let pt_exp = req.db.escape(req.body.pt_exp);
    let is_pt = req.db.escape(req.body.is_pt);
    let icon_url = req.db.escape(req.body.icon_url);

    try{
        await signUpModel(req.db, username, pw, phone_num, email, first_name, last_name, birthday, pt_exp, is_pt, icon_url);
        return res.status(200).json({success: true});
    } catch(err){
        return res.status(200).json({success: false});
    }
    
}

module.exports = { signUpController };