import React, {Fragment, useState, useEffect} from 'react';

import { connect } from 'react-redux'
import { Button } from '@material-ui/core';

import {makeStyles} from "@material-ui/core/styles";
import { clearErrors } from '../../store/actions/errorActions'
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
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(null,{ logout })(Logout);