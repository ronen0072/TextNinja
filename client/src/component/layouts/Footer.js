import React from 'react';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Button, BottomNavigation, Hidden, Grid} from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        width: 500,
    },
    footer:{
        bottom: 0,
        right: 0,
        left: 0,
        position: 'fixed',
        backgroundColor: '#0b0b0b',
        color: '#ffffff'
}
});

export default function Footer() {
    const classes = useStyles();

    return (

        <Grid container>
            <Hidden smDown>
                <Grid xs={12} >
                    <BottomNavigation className={classes.footer}>
                        <NavLink to='/' ><Button color={"inherit"} >Home</Button></NavLink>
                        <NavLink to='/About' ><Button color={"inherit"}>About</Button ></NavLink>
                        <NavLink to='/Contact us' ><Button  color={"inherit"}>Contact Us</Button ></NavLink>
                    </BottomNavigation>
                </Grid>
            </Hidden>
            <Grid xs={12} className={classes.footer+" copyright"}><a href={'https://ronen-finish-personal-web.firebaseapp.com/'}>© 2020 Copyright Ronen Finish. All rights reserved</a></Grid>
        </Grid>


    );
}
