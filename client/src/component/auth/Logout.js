import React, {Fragment} from 'react';
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { logout } from '../../store/actions/authActions'
const useStyles = makeStyles(theme => ({
    root:{
        color: '#ffffff',
    },
    nuvLink:{
        lineHeight: '2rem',
        paddingTop: '1.5rem'
    },
}));


function Logout(props) {
    const classes = useStyles();

    return (
        <Fragment>
           {props.children?
               <div onClick={props.logout}>
                  {props.children}
               </div>
                   :
               <Button
                   onClick={props.logout}
                   className={classes.nuvLink}
                   color="inherit">
                   Logout
               </Button>
           }
        </Fragment>
    );
}

export default connect(null,{ logout })(Logout);