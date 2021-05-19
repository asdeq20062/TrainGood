import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import { getCorrectApiHost } from '../helper/helper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    marginTop: '56px',
    backgroundColor: 'silver',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '10px'
  },
  radiobox: {
      display: 'flex',
      justifyContent: 'center'
  },
  isptLabel: {
      marginTop: '13px',
      marginRight: '10px'
  }
}));

var initFormDate = {
    username: null,
    usernameError: false,
    usernameErrorText: '',

    pw: null,
    pwError: false,
    pwErrorText: '',

    first_name: null,
    last_name: null,

    phone_num: null,
    phoneNumError: false,
    phoneNumErrorText: '',

    email: null,
    emailError: false,
    emailErrorText: '',

    birthday: null,
    birthdayError: false,
    birthdayErrorText: '',

    is_pt: null,

    pt_exp: null,
    ptexpError: false,
    ptexpErrorText: '',

    icon_url: null
}

export default function SignUp() {
    const classes = useStyles();
    const [ispt, setIspt] = useState("no");
    const [formData, setFormData] = useState(initFormDate);

    const handleIspt = (e) => {
        setIspt(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // RegExr for validation
        let newFormData = {...formData}; // temp object for validation
        let validFlag = true;
        let spaceRegExr = / /g;
        let floatRegExr = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/g;
        let phoneRegExr = /^[1-9][0-9]*$/g;
        let monthRegExr = /^(0[1-9]|1[0-2])$/g;
        let yearRegExr = /\d{4}/g;
        let dayRegExr = /(0[1-9]|[12]\d|3[01])/g;
        let emailRegExr = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

        // Username
        let username = document.querySelector('#username');
        if(username.value == ""){ // Check if empty
            newFormData = {...newFormData, usernameError: true, usernameErrorText: `Can't be blank`};
            validFlag = false;
        } else if (spaceRegExr.test(username.value)){ // Check whether spacing included
            newFormData = {...newFormData, usernameError: true, usernameErrorText: `Can't include spacing`};
            validFlag = false;            
        } else {
            newFormData = {...newFormData, usernameError: false, username: username.value, usernameErrorText: ""};
        }
        // Password
        let pw = document.querySelector('#pw');
        let pw2 = document.querySelector('#pw2');
        if(pw.value != pw2.value){
            newFormData = {...newFormData, pwError: true, pwErrorText:`Password should be consistent`};
            validFlag = false;
        } else if (pw.value == "" || pw2.value == ""){ // Check if empty
            newFormData = {...newFormData, pwError: true, pwErrorText:`Can't be blank`};
            validFlag = false;
        } else if (spaceRegExr.test(pw.value)){ // Check whether spacing included
            newFormData = {...newFormData, pwError: true, pwErrorText:`Can't include spacing`};
            validFlag = false;           
        } else {
            newFormData = {...newFormData, pwError: false, pwErrorText:"", pw: pw.value};
        }

        // First Name
        let first_name = document.querySelector('#first_name');
        newFormData = {...newFormData, first_name: first_name.value};

        // Last Name
        let last_name = document.querySelector('#last_name');
        newFormData = {...newFormData, last_name: last_name.value};

        // Phone Num
        let phone_num = document.querySelector('#phone_num');
        if (!phoneRegExr.test(phone_num.value)){ // Check phone format
            newFormData = {...newFormData, phoneNumError: true, phoneNumErrorText:`Invalid format`};
            validFlag = false;  
        } else {
            newFormData = {...newFormData, phone_num: phone_num.value, phoneNumError: false, phoneNumErrorText:''};
        }

        // Email
        let email = document.querySelector('#email');
        if (spaceRegExr.test(email.value)){ // Check whether spacing included
            newFormData = {...newFormData, emailError: true, emailErrorText:`Can't include spacing`};
            validFlag = false;  
        } else if (!emailRegExr.test(email.value)){ //Check email format
            newFormData = {...newFormData, emailError: true, emailErrorText:`Invalid format`};
            validFlag = false;              
        } else {
            newFormData = {...newFormData, email: email.value, emailError: false, emailErrorText:''};
        }

        // Birthday ( Should be combined into format 'YYYY-MM-DD' )
        let year = document.querySelector('#byear').value? document.querySelector('#byear').value: 0;
        let month = document.querySelector('#bmonth').value? document.querySelector('#bmonth').value: 0;
        let day = document.querySelector('#bday').value? document.querySelector('#bday').value: 0;

        if(!yearRegExr.test(year) || !monthRegExr.test(month) || !dayRegExr.test(day)){ // Check format
            newFormData = {...newFormData, birthdayError: true, birthdayErrorText:`Year/ Month/ Day of birth should be YYYY-MM-DD`};
            validFlag = false;
        } else {
            let birthday = year + '-' + month + '-' + day;
            newFormData = {...newFormData, birthday: birthday, birthdayError: false, birthdayErrorText:''};
        }

        // is pt?
        let is_pt = ispt == 'yes'? true: false;
        newFormData = {...newFormData, is_pt: is_pt};

        // Exp
        let pt_exp = document.querySelector('#pt_exp');

        if(!floatRegExr.test(pt_exp.value)){ // Check if floating number
            newFormData = {...newFormData, ptexpError: true, ptexpErrorText:`Experience should be number`};
            validFlag = false;
        } else {
            newFormData = {...newFormData, pt_exp: pt_exp.value, ptexpError: false, ptexpErrorText: ''};
        }

        // Icon URL
        let icon_url = document.querySelector('#icon_url');
        newFormData = {...newFormData, icon_url: icon_url.value}; 

        // Update
        if(!validFlag){
            setFormData(newFormData);
        }
        

        // Send request
        if(validFlag){
            let result = await fetch(getCorrectApiHost() + 'signup',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            result = await result.json();
            if(result.success){
                alert('Successfully sign up.')
                Router.push('/');
            }else{
                alert('Username has already exist.')
            }
        }
    }

    return (
    <form className={classes.root} id="signup" >
        <h1>Sign Up</h1>
        <fieldset>
            <legend>Personal Information</legend>
            <div>
            <TextField error={formData.usernameError} helperText={formData.usernameErrorText} id="username" label="Username"/>
            </div>
            <div>
            <TextField type="password" error={formData.pwError} helperText={formData.pwErrorText} id="pw" label="Password"/>
            <TextField type="password" error={formData.pwError} helperText={formData.pwErrorText} id="pw2" label="Confirmed Password"/>
            </div>
            <div>
            <TextField id="first_name" label="First Name"/>
            <TextField id="last_name" label="Last Name"/>
            </div>
            <div>
            <TextField error={formData.phoneNumError} helperText={formData.phoneNumErrorText} id="phone_num" label="Phone"/>
            <TextField error={formData.emailError} helperText={formData.emailErrorText} id="email" label="Email"/>
            </div>
            <div>
            <TextField error={formData.birthdayError} helperText={formData.birthdayErrorText} id="byear" label="Year of Birth"/>
            <TextField error={formData.birthdayError} helperText={formData.birthdayErrorText} id="bmonth" label="Month of Birth"/>
            <TextField error={formData.birthdayError} helperText={formData.birthdayErrorText} id="bday" label="Day of Birth"/>
            </div>
        </fieldset>
        <fieldset style={{marginTop: '10px', marginBottom: '10px'}}>
            <legend>Personal Trainer Details</legend>
            <div className={classes.radiobox}>
                <FormLabel className={classes.isptLabel} component="legend">Are you a personal trainer?</FormLabel>
                <RadioGroup row aria-label="ispt" name="ispt" value={ispt} onChange={handleIspt} className={classes.radiogroup}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </div>
            <div>
            <TextField error={formData.ptexpError} helperText={formData.ptexpErrorText} id="pt_exp" label="Experience (Years)"/>
            </div>
            <div>
            <TextField id="icon_url" label="Icon URL"/>
            </div> 
        </fieldset>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </form>
    );
}
