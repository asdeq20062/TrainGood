// Import model
const { updateMemberDetailsModel } = require('../model/updateMemberDetailsMode');

/*
    @param {Object} req.decoded_token
    @param {string} req.decoded_token.usernme
    @param {string} req.decoded_token.pw
    @param {int} req.decoded_token.id
    @param {int} req.decoded_token.iat
    @param {float} req.decoded_token.exp
    @param {Object} req.body
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
async function updateMemberDetailsController(req, res){
    
    // Assign payload
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

    // Assign decoded token id
    let user_id = req.decoded_token.id;

    try{
        await updateMemberDetailsModel(req.db, pw, phone_num, email, first_name, last_name, 
            birthday, pt_exp, is_pt, icon_url, user_id);
        return res.status(200).json({success: true});
    } catch (err) {
        return res.status(200).json({success: false});
    }
    
}

module.exports = { updateMemberDetailsController };