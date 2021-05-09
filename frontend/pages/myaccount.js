import React, { useState, useEffect } from 'react';
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

    pw: '',
    pwError: false,
    pwErrorText: '',

    first_name: '',
    last_name: '',

    phone_num: '',
    phoneNumError: false,
    phoneNumErrorText: '',

    email: '',
    emailError: false,
    emailErrorText: '',

    birthday: '',
    birthdayError: false,
    birthdayErrorText: '',

    is_pt: '',

    pt_exp: '',
    ptexpError: false,
    ptexpErrorText: '',

    icon_url: ''
}

export default function SignUp() {
    const classes = useStyles();
    const [ispt, setIspt] = useState(null);
    const [formData, setFormData] = useState(initFormDate);

    useEffect(async ()=>{
        // Fetch account's information
        let accountInformation = await fetch(getCorrectApiHost() + 'memberdetails',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: localStorage.getItem('access')})
        });
        accountInformation = await accountInformation.json();
        accountInformation = accountInformation[0];

        // Create a Date object for birthday
        let birthday = new Date(accountInformation.birthday);

        // Set form data
        setFormData({
            ...formData,
            ...accountInformation,
            birthdayYear: birthday.getUTCFullYear(),
            birthdayMonth: (birthday.getUTCMonth() + 1).toString().length == 1? '0' + (birthday.getUTCMonth() + 1): (birthday.getUTCMonth() + 1),
            birthdayDay: birthday.getUTCDate().toString().length == 1? '0' + birthday.getUTCDate(): birthday.getUTCDate(),
            pw2: accountInformation.pw
        })

        // Set is pt?
        setIspt(accountInformation.is_pt? 'yes': 'no');
    },[]);

    const handleIspt = (e) => {
        setIspt(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        let newFormData = {...formData};
        let validFlag = true;
        let spaceRegExr = / /g;
        let floatRegExr = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/g;
        let phoneRegExr = /^[1-9][0-9]*$/g;
        let monthRegExr = /^(0[1-9]|1[0-2])$/g;
        let yearRegExr = /\d{4}/g;
        let dayRegExr = /(0[1-9]|[12]\d|3[01])/g;
        let emailRegExr = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

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

        // Attach token
        let token = localStorage.getItem('access');
        newFormData = {...newFormData, token: token};

        // Update
        if(!validFlag){
            setFormData(newFormData);
        }
        
        // Send request
        if(validFlag){
            let result = await fetch(getCorrectApiHost() + 'updatememberdetails',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newFormData)
            });
            result = await result.json();
            if(result.success){
                alert('Successfully update account information.')
                Router.push('/');
            }else{
                alert('Update failed.')
            }
        }
    }

    const handleChange = (field) => 
        (event)=>{
            setFormData({
                ...formData,
                [field]: event.target.value
            })
        }

    return (
    <form className={classes.root} id="signup" >
        <h1>Account Information</h1>
        <fieldset>
            <legend>Personal Information</legend>
            <div>
            <TextField type="password" error={formData.pwError} helperText={formData.pwErrorText} id="pw" label="Password" value={formData.pw} onChange={handleChange('pw')} variant={formData.pw?'filled':'standard'}/>
            <TextField type="password" error={formData.pwError} helperText={formData.pwErrorText} id="pw2" label="Confirmed Password" value={formData.pw2} onChange={handleChange('pw2')} variant={formData.pw2?'filled':'standard'}/>
            </div>
            <div>
            <TextField id="first_name" label="First Name" value={formData.first_name} onChange={handleChange('first_name')} variant={formData.first_name?'filled':'standard'} />
            <TextField id="last_name" label="Last Name" value={formData.last_name} onChange={handleChange('last_name')}  variant={formData.last_name?'filled':'standard'}/>
            </div>
            <div>
            <TextField error={formData.phoneNumError} helperText={formData.phoneNumErrorText} id="phone_num" label="Phone" value={formData.phone_num} onChange={handleChange('phone_num')}  variant={formData.phone_num?'filled':'standard'}/>
            <TextField error={formData.emailError} helperText={formData.emailErrorText} id="email" label="Email" value={formData.email} onChange={handleChange('email')}  variant={formData.email?'filled':'standard'}/>
            </div>
            <div>
            <TextField error={formData.birthdayError} helperText={formData.birthdayErrorText} id="byear" label="Year of Birth" value={formData.birthdayYear} onChange={handleChange('birthdayYear')}  variant={formData.birthdayYear?'filled':'standard'}/>
            <TextField error={formData.birthdayError} helperText={formData.birthdayErrorText} id="bmonth" label="Month of Birth" value={formData.birthdayMonth} onChange={handleChange('birthdayMonth')}  variant={formData.birthdayMonth?'filled':'standard'}/>
            <TextField error={formData.birthdayError} helperText={formData.birthdayErrorText} id="bday" label="Day of Birth" value={formData.birthdayDay} onChange={handleChange('birthdayDay')}  variant={formData.birthdayDay?'filled':'standard'}/>
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
            <TextField error={formData.ptexpError} helperText={formData.ptexpErrorText} id="pt_exp" label="Experience (Years)"  value={formData.pt_exp} onChange={handleChange('pt_exp')}  variant={formData.pt_exp?'filled':'standard'}/>
            </div>
            <div>
            <TextField id="icon_url" label="Icon URL"  value={formData.icon_url} onChange={handleChange('icon_url')}  variant={formData.icon_url?'filled':'standard'}/>
            </div> 
        </fieldset>
        <Button variant="contained" onClick={handleSubmit}>Update</Button>
    </form>
    );
}
