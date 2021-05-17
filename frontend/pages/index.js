import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme)=>({
  home:{
    marginTop: '56px'
  },
  section1: {
    backgroundImage: `url('/section1-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  },
  section2: {
    backgroundImage: `url('/section2-bg.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
  },
  section3: {
    backgroundImage: `url('/section3-bg.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
  },
  btngroup: {
    position: 'absolute',
    top: '80%',
  },
  slogan1: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '32px',
    top: '30%',
    textShadow: '2px 2px #000000'
  }
}))

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <section className={classes.section1}>
        <div className={classes.slogan1}>
          A good trainer can help you get in shape, 
          <br></br>
          lose weight or give you great tips 
          <br></br>
          for an effective workout.
        </div>
        <ButtonGroup variant="contained" className={classes.btngroup}>
        <Link href="/signup">
            <Button variant="contained">    
                Sign Up
            </Button>
          </Link>
          <Link href="/showpt/1">
            <Button variant="contained">    
                Find
            </Button>
          </Link>
        </ButtonGroup>
      </section>
      <section className={classes.section2}>
      </section>
      <section className={classes.section3}>
      </section>
    </div>
  );
}
