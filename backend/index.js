const express = require('express');
const app = express();
const { database } = require('./services/db/mysql');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const { verify_token } = require('./services/jwt/jwt.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import controllers
const { signUpController } = require('./controller/signUpController');
const { loginController } = require('./controller/loginController');
const { memberDetailsController } = require('./controller/memberDetailsController');
const { updateMemberDetailsController } = require('./controller/updateMemberDetailsController');
const { ratePtController } = require('./controller/ratePtController');
const { ShowAllPtController } = require('./controller/showAllPtController');
const { countAllPtController } = require('./controller/countAllPtController');
const { addCommentController } = require('./controller/addCommentController');
const { getCommentController } = require('./controller/getCommentController');
const { delCommentController } = require('./controller/delCommentController');
const { getBestPtController } = require('./controller/getBestPtController');

// Use resource
app.use(express.static('public'));

// Set cors
app.use(cors());

// Connect db
app.use((req, res, next)=>{
    req.db = database();
    next();
})

// Parse Json
app.use(bodyParser.json());

// Sign up
app.post('/signup', signUpController);

// Log in
app.post('/login', loginController);

// Request member's details
app.post('/memberdetails', verify_token, memberDetailsController);

// Update member's details
app.post('/updatememberdetails', verify_token, updateMemberDetailsController);

// Rate the personal trainer
app.post('/ratept', verify_token, ratePtController);

// Show all personal trainers
app.get('/showallpt/:page', ShowAllPtController);

// Count all personal trainers
app.get('/countallpt', countAllPtController);

// Add comment
app.post('/addcomment', verify_token, addCommentController);

// Show comments
app.get('/getcomment/:ptid', getCommentController);

// Delete comments only for admin account
app.get('/delcomment/:commentid', verify_token, delCommentController);

// Get the trainer of the highest rating
app.get('/bestpt', getBestPtController);

const server = app.listen(process.env.PORT || 8080, function(){
    console.log('Server is running...');
    console.log(`You are using the env.${ process.env.NODE_ENV }. config.`)
})