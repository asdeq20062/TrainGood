import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { getCorrectApiHost } from '../../helper/helper';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dialog:{
        textAlign: 'center',
        justifyContent: 'center'
    },
    title: {
        margin: 0,
        padding: theme.spacing(2),
    },
    photoContainer: {
        display: 'flex'
    },  
    photoBox: {
        display: 'block',
        margin: '10px'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    photos: {
        height: '200px',
        width: '180px'
    },
    pagination: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    deleteBtn: {
        backgroundColor: 'red'
    }
}));


export default function ShowDetails(props) {
    const classes = useStyles();
    const [details, setDetails] = useState(0);
    const [curPage, setCurPage] = useState(1);

    useEffect(async ()=>{
        if(props.opened){
            let result = await fetch(getCorrectApiHost() + 'getcomment/' + props.ptID, {method: 'GET'});
            result = await result.json();
            if(result.success && result.result.length != 0){
                setDetails(result.result);
            }else if(result.success && result.result.length == 0){
                setDetails(0);
            }else{
                alert('Fetch failed.');
            }
        }
    },[props.opened, details]);

    const handleClose = () => {
        props.openHandle();
    };

    const deleteHandle = async (e) => {
        e.preventDefault();
        if(confirm('Confirm to delete?')){
            // Check whether there are any comments
            if(details == 0 ){
                alert('No comment can be deleted.');
                return;
            }
            // Send request
            let result = await fetch(getCorrectApiHost() + 'delcomment/' + details[curPage - 1].comment_id, 
            {
                method: 'GET',
                headers: { token: localStorage.getItem('access') }
            });
            result = await result.json();
            if(result.success){
                alert('Comment is deleted successfully.');
                let nextPage = curPage - 1 <= 0? 1: curPage -1;
                setCurPage(nextPage);
            }else{
                alert(result.err);
            }
        }
    }

    // Remove the 'public/' string in url
    const getRidPublicWord = (url) => {
        let index = url.indexOf('/') + 1;
        return url.slice(index, url.length);
    }
    
    const changePageHandle = (event, page) => {
        setCurPage(page);
    }

    return (
    <div>
        <Dialog open={props.opened} className={classes.dialog}>
            <MuiDialogTitle disableTypography className={classes.title}>
                <Typography variant="h6">Clients of {props.ptName}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            { process.browser && (localStorage.getItem('username') == 'admin')&&
                <div className={classes.delete}>
                    <Button onClick={deleteHandle} variant="contained" className={classes.deleteBtn}>Delete</Button>
                </div>
            }

            
            {(details?true:false)&&
            <div>
                Trainer ID: {props.ptID}
                <br></br>
                Comment ID: {details[curPage - 1].comment_id}
                <br></br>
                Client: {details[curPage - 1].trainee_first_name + ' ' + details[curPage - 1].trainee_last_name }
                <div className={classes.photoContainer}>
                    <div className={classes.photoBox}>
                        <div>Before:</div>
                        <img className={classes.photos} src={getCorrectApiHost() + getRidPublicWord(details[curPage - 1].before_photo)}></img>
                    </div>
                    <div className={classes.photoBox}>
                        <div>After:</div>
                        <img className={classes.photos} src={getCorrectApiHost() + getRidPublicWord(details[curPage - 1].after_photo)}></img>
                    </div>
                </div>
                <div>
                    Comment:
                    <br></br>
                    <span>{details[curPage - 1].comment}</span>
                </div>
            </div>}

            {(!details) && 'No Data Here.'}
            <Grid 
                container
                direction="row"
                className = {classes.pagination}
                justify="center"
            >
                <Pagination 
                    defaultPage={1}
                    page={curPage}
                    count={details.length} 
                    color="secondary"
                    onChange={changePageHandle}
                    className={classes.pagination}
                />        
            </Grid>

        </Dialog>
    </div>
    );
}
