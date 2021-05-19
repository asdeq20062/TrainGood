import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { getCorrectApiHost } from '../../helper/helper';

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
        if(!confirm(`You will give this trainer ${newValue} marks?`)) return;

        let token = localStorage.getItem('access');
        let payload = {
            id: props.ptID,
            token: token,
            rate: newValue
        }
        // Send request
        let result = await fetch(getCorrectApiHost() + 'ratept',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', token: localStorage.getItem('access')},
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
        value={0}
        name={props.ptID.toString()}
        precision={1}
        onChange={handleChange}
        size="large"
        />
    </div>
    );
}
