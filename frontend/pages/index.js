import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ButtonGroup, Grid } from '@material-ui/core';
import Link from 'next/link';
import { getCorrectApiHost } from '../helper/helper';
import { useEffect } from 'react';
import PtCard from '../component/PtPage/PtCard';

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
    position: 'relative',
    justifyContent: 'center'
  },
  section2: {
    backgroundImage: `url('/section2-bg.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    minHeight: '100vh',
    backgroundAttachment: 'fixed',
    justifyContent: 'center',
    display: 'flex',
    position: 'relative',
    overflowX: 'hidden'
  },
  section3: {
    backgroundImage: `url('/section3-bg.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    width: '100vw',
    height: '100vh'
  },
  btngroup: {
    position: 'absolute',
    top: '80%'
  },
  slogan1: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '32px',
    top: '30%',
    textShadow: '2px 2px #000000'
  },
  topTrainerTitle: {
    marginTop: '50px',
    fontFamily: 'fantasy',
    textAlign: 'center',
    WebkitTextFillColor: 'transparent',
    fontSize: '80px',
    WebkitTextStroke: '2px #FF2D51',
    textShadow:
      `5px 5px 0 #000,
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000`
  },
  showOnScroll: {
    transform: 'translateX(1000px)',
    transition: 'transform 2s, opacity 2s ease-out',
    opacity: '0',
    willChange: 'transform, opacity'
  },
  isVisible:{
    transform: 'translateX(0px)',
    opacity: '1'
  },
  topTrainerBox: {
    marginTop: '20px',
    justifyContent: 'center',
    textAlign: 'center'
  },
  topTrainerContent: {
    justifyContent: 'center'
  }
}))

export default function Home({data}) {
  const classes = useStyles();
  var scroll = typeof(window)!='undefined'? window.requestAnimationFrame: function(callback){ window.setTimeout(callback, 1000/60)};

  const isElementInViewPort = (elemt) => {
    let rect = elemt.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) 
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }

  const loop = () => {
    let elementsToShow = document.querySelectorAll(`.${classes.showOnScroll}`);
    elementsToShow.forEach((element)=>{
      if(isElementInViewPort(element)){
        element.classList.add(classes.isVisible);
      }else{
        element.classList.remove(classes.isVisible);
      }
    });
    scroll(loop);
  }

  useEffect(()=>{
    window.addEventListener('scroll', loop);
    return function cleanUp(){
      window.removeEventListener('scroll', loop);
    }
  },[])

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
        <div className={`${classes.topTrainerBox} ${classes.showOnScroll}`}>
          <span className={classes.topTrainerTitle}>Top Trainers</span>
          <Grid container direction="row" className={classes.topTrainerContent}>
          {
            data.map(pt =>
              {
                  return <PtCard ptdata = {pt}/>
              }
            )
          }   
          </Grid>
        </div>
      </section>
      <section className={classes.section3}>
      </section>
    </div>
  );
}

export async function getServerSideProps(){
  // fetch total of personal trainers
  let res = await fetch(getCorrectApiHost() + 'bestpt',
      {method: 'GET'}
  );
  let data = await res.json();
  return { 
      props: {
          /*
              @param {int} data.id
              @param {string} data.phone_num
              @param {string} data.email
              @param {string} data.frist_name
              @param {string} data.last_name
              @param {int} data.pt_exp
              @param {string} data.icon_url
              @param {string} data.rating
          */
          data: data
      }
  }
}
