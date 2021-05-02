import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '300px',
    maxHeight: '350px',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'silver',
    margin: '10px'
  },
  media: {
    height: 150,
    width: 'auto'
  },
});

export default function PtCard(props) {
  const classes = useStyles();

  const imgerrorhandle= (e) => {
    e.target.src = '/no-icon.png';
  }
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img src={props.ptdata.icon_url && props.ptdata.icon_url!="" ?props.ptdata.icon_url:'/no-icon.png'} 
          className={classes.media}
          onError={imgerrorhandle}
          ></img>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.ptdata.first_name} {props.ptdata.last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Email:</b> {props.ptdata.email}
            <br></br>
            <b>Phone:</b> {props.ptdata.phone_num}
            <br></br>
            <b>Experience:</b> {props.ptdata.pt_exp? props.ptdata.pt_exp:0} years
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
