import React from 'react';
import Facebook from '@material-ui/icons/Facebook';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root:{
    },
    socialNetwork:{
        backgroundColor: '#ffffff',
        color: '#00000',
        padding: theme.spacing(2, 4, 3),
    },
    field:{
        color: '#ffffff',
    },
    input: {
        width: '100%',
        marginBottom: '5px',
        color: '#00000',
    },
}));
 function AuthWith(props){
    const classes = useStyles();
    return(
        <div className={classes.socialNetwork}>
            <h2 className="loginwith">Log in with<br/> social network</h2>

            <a  href="http://localhost:5000/auth/facebook" ><button className="social-login facebook">Log in with facebook  <Facebook/></button></a>
            {/*<button className="social-social-login twitter">Log in with Twitter</button>*/}
            <a  href="http://localhost:5000/auth/google" ><button className="social-login google">Log in with Google+</button></a>

        </div>
    );
}
export default AuthWith;