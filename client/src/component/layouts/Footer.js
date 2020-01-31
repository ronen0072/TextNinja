import React from 'react';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from "@material-ui/core/Button";

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
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.footer}
        >
            <NavLink to='/' ><Button color={"inherit"} >Home</Button ></NavLink>
            <NavLink to='/About' ><Button color={"inherit"}>About</Button ></NavLink>
            <NavLink to='/Contact' ><Button  color={"inherit"}>Contact Us</Button ></NavLink>
        </BottomNavigation>
    );
}