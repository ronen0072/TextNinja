
import React, {Component, Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";


var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',

    },
    wrap:{
        paddingLeft: 0,
        color: '#d9dad6'//'#59beee'
    },
});




function IconButton(props){
    const classes = useStyles();
    const [state, setState] = React.useState({
        input: props.children
    });
    const handleOnMouseOver = () =>{
        if(props.onMouseOver){
            props.onMouseOver();
        }
    };
    const handleOnBlur = () =>{
        if(props.onMouseOut){
            props.onMouseOut();
        }
    };
    const handleOnClick = () =>{
        if(props.onClick){
            props.onClick();
        }
    };

    return(
        <Icon fontSize="large" >{props.children}</Icon>
    )

}

export default IconButton;