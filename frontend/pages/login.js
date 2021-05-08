import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200
        },
        marginTop: '56px',
        backgroundColor: 'silver',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '10px'
    }
}));

export default function Login (){
    const classes = useStyles();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Username and password
        let payload = {
            username: document.querySelector('#username').value, 
            pw: document.querySelector('#password').value
        };

        // Send request
        let result = await fetch(process.env.API_HOST + 'login',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        result = await result.json();

        /* 
            @param {boolean} result.success
            @param {string result.token
        */
        if(result.success){
            localStorage.setItem("access", result.token);
            localStorage.setItem("username", result.username);
            localStorage.setItem("id", result.id);
            Router.push('/');
        } else {
            alert('Invaild username or password.');
        }
    }

    return (
        <form className={classes.root} id="login" >
        <h1>Log In</h1>
        <div>
        <TextField id="username" label="Username"/>
        </div>
        <div>
        <TextField id="password" label="Password" type="password"/>
        </div>
        <Button variant="contained" onClick={ handleLogin }>Login</Button>
        </form>
    )
}