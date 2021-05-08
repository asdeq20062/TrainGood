import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default function RatePt(props) {
    const classes = useStyles();

    const handleChange = async (e, newValue) => {
        let token = localStorage.getItem('access');
        let payload = {
            id: props.ptID,
            token: token,
            rate: newValue
        }
        // Send request
        let result = await fetch(process.env.API_HOST + 'ratept',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        result = await result.json();

        // Check if success
        if(result.success){
            alert(`You've rated the trainer successfully!`);
        }else{
            alert(result.err);
        }
    }


    return (
    <div className={classes.root}>
        <Rating
        name={props.ptID.toString()}
        precision={0.5}
        onChange={handleChange}
        />
    </div>
    );
}
