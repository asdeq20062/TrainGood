import { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
    fontWeight: 'bold'
  },
  appBar: {
    background: `linear-gradient(to bottom right, silver, black)`
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logined, setLogined] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(()=>{
    // Check whether the token exists
    if(localStorage.getItem('access') != null){
      setLogined(true);
    } else {
      setLogined(false);
    }
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TrainGood
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <Link href="/"><MenuItem onClick={handleClose}>Home</MenuItem></Link>
              <Link href="/showpt/1"><MenuItem onClick={handleClose}>Find Personal Trainers</MenuItem></Link>
              {
                !logined && (
                  <div>
                    <Link href="/signup"><MenuItem onClick={handleClose}>Sign Up</MenuItem></Link>
                    <Link href="/login"><MenuItem onClick={handleClose}>Login</MenuItem></Link>
                  </div>
                )
              }
              {
                logined && (
                  <div>
                    <Link href="/myaccount"><MenuItem onClick={handleClose}>My account</MenuItem></Link>
                    <Link href="/logout"><MenuItem onClick={handleClose}>{localStorage.getItem('username')}, Logout</MenuItem></Link>
                  </div>
                )
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
