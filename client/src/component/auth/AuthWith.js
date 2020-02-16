import React, { Fragment } from 'react';
import {Grid} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Facebook from '@material-ui/icons/Facebook';
import {makeStyles, withStyles} from "@material-ui/core/styles";
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
export default function(props){
    const classes = useStyles();
    return(
        <div className={classes.socialNetwork}>
            <h2 className="loginwith">Log in with<br/> social network</h2>

            <button className="social-login facebook">Log in with facebook  <Facebook/></button>
            {/*<button className="social-social-login twitter">Log in with Twitter</button>*/}
            <button className="social-login google">Log in with Google+</button>

        </div>
    );
}