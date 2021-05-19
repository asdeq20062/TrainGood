import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, Input } from '@material-ui/core';
import { getCorrectApiHost } from '../../helper/helper'

const useStyles = makeStyles((theme) => ({
    dialog:{
        textAlign: 'center'
    },
    title: {
        margin: 0,
        padding: theme.spacing(2),
    },
    comment: {
        width: '50ch',
        margin: '10px'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    submit: {
        justifyContent: 'center'
    },
    img: {
        height: '200px'
    },
    imgBox: {
        justifyContent: 'center'
    }
}));

export default function CommentPt(props) {
    const classes = useStyles();
    const [beforePhoto, setBeforePhoto] = useState('/no-icon.png');
    const [afterPhoto, setAfterPhoto] = useState('/no-icon.png');

    const handleClose = () => {
        props.openHandle();
    };

    const submitHandle = async () => {
        if(document.querySelector(`#beforePhoto`).files[0]==null || document.querySelector(`#afterPhoto`).files[0]==null){
            alert('You have not chosen the photos.');
            return;
        }
        /*let payload1 = {
            token: localStorage.getItem('access'),
            user_id: +localStorage.getItem('id'),
            pt_id: props.ptID,
            before_photo: document.querySelector(`#beforePhoto`).files[0],
            after_photo: document.querySelector(`#afterPhoto`).files[0],
            comment: document.querySelector(`#comment`).value,
            create_date: new Date()
        };*/
        let payload = new FormData();
        payload.append("user_id", +localStorage.getItem('id'));
        payload.append("pt_id", props.ptID);
        payload.append("before_photo", document.querySelector(`#beforePhoto`).files[0], document.querySelector(`#beforePhoto`).files[0].name);
        payload.append("after_photo", document.querySelector(`#afterPhoto`).files[0], document.querySelector(`#afterPhoto`).files[0].name);
        payload.append("comment", document.querySelector(`#comment`).value);
        payload.append("create_date", new Date());
        let result = await fetch(getCorrectApiHost() + 'addcomment',
        {
            method: 'POST',
            headers: {token: localStorage.getItem('access')},
            body: payload
        });
        result = await result.json();
        handleClose();
    }

    const beforeChangeHandle = (e) => {       
        // Check whether ssr
        if(typeof(document)=='undefined') return;
        // Check whether the field is beforePhoto or afterPhoto
        let beforeOrAfter = e.target.id == 'beforePhoto'? 'before': 'after';
        // Check whether the uploadfile is null
        if(document.querySelector(`#${beforeOrAfter}Photo`).files[0]!=null){
            let uploadFile = document.querySelector(`#${beforeOrAfter}Photo`).files[0];
            let url = URL.createObjectURL(uploadFile);
            if(beforeOrAfter=='before') setBeforePhoto(url);
            if(beforeOrAfter=='after') setAfterPhoto(url);
        } else {
            if(beforeOrAfter=='before') setBeforePhoto('/no-icon.png');
            if(beforeOrAfter=='after') setAfterPhoto('/no-icon.png');
        }

    }

    return (
    <div>
        <Dialog open={props.opened} className={classes.dialog}>
            <MuiDialogTitle disableTypography className={classes.title}>
                <Typography variant="h6">Comments on {props.ptName}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            Trainer ID: {props.ptID}
                <div id="beforePhotoPreview" className={classes.imgBox}>
                    <img src={beforePhoto} className={classes.img}></img>
                </div>
                <i>Photo before training</i>
                <Input
                    id="beforePhoto"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={beforeChangeHandle}
                />
                <div id="afterPhotoPreview" className={classes.imgBox}>
                    <img  src={afterPhoto} className={classes.img}></img>
                </div>
                <i>Photo after training</i>
                <Input
                    id="afterPhoto"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={beforeChangeHandle}
                />
                <TextField
                    id="comment"
                    label="Your comment"
                    multiline
                    rowsMax={10}
                    variant="filled"
                    className={classes.comment}
                />

            <div className={classes.submit}>
                <Button variant="outlined" onClick={submitHandle}>Submit</Button>
            </div>
        </Dialog>
    </div>
    );
}
