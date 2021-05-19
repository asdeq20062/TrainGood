import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RatePt from './RatePt';
import CommentPt from './CommentPt';
import { Button } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import ShowDetails from './ShowDetails';

const useStyles = makeStyles(theme=>({
  root: {
    width: '300px',
    minHeight: '300px',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'silver',
    margin: '10px'
  },
  media: {
    height: 150,
    width: 150
  },
  comment: {
    justifyContent: 'center'
  }
}));

export default function PtCard(props) {
  const classes = useStyles();
  const [commentOpen, setCommentOpen] = useState(false);
  const [showDetailsOpen, setShowDetailsOpen] = useState(false);

  const imgErrorHandle = (e) => {
    e.target.src = '/no-icon.png';
  }

  const commentOpenHandle = (e) => {
    commentOpen? setCommentOpen(false): setCommentOpen(true);
  }

  const showDetailsOpenHandle = (e) => {
    showDetailsOpen? setShowDetailsOpen(false): setShowDetailsOpen(true);
  }
  
  return (
    <Card className={classes.root}>
        <img src={props.ptdata.icon_url && props.ptdata.icon_url!="" ?props.ptdata.icon_url:'/no-icon.png'} 
          className={classes.media}
          onError={imgErrorHandle}
          ></img>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {props.ptdata.first_name} {props.ptdata.last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            <b>Email:</b> {props.ptdata.email}
            <br></br>
            <b>Phone:</b> {props.ptdata.phone_num}
            <br></br>
            <b>Experience:</b> {props.ptdata.pt_exp? props.ptdata.pt_exp:0} years
            <br></br>
            <b>Rating:</b> { (+props.ptdata.rating).toFixed(1) || 0 }
            <br></br>
            <RatePt id={props.ptdata.id} ptID={props.ptdata.id}/>
          </Typography>
          <CardActions className={classes.comment}>
            <Button variant="contained" color="primary" onClick={commentOpenHandle}>Comment</Button>
            <Button variant="contained" color="primary" onClick={showDetailsOpenHandle}>Details</Button>
          </CardActions>
          <CommentPt 
            opened={commentOpen} 
            openHandle={commentOpenHandle}
            ptName={props.ptdata.first_name + " " + props.ptdata.last_name}
            ptID = {props.ptdata.id}
          />
          <ShowDetails
            opened={showDetailsOpen} 
            openHandle={showDetailsOpenHandle}
            ptName={props.ptdata.first_name + " " + props.ptdata.last_name}
            ptID = {props.ptdata.id}
          />
        </CardContent>
    </Card>
  );
}
