
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
    hide:{
        opacity: 0,
    },
    display:{
        opacity: 1,
    },
    semiDisplay:{
        opacity: 0.1,
    }
});




function Separator(props){
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const [MouseOver, setMouseOver] = React.useState(false);
    const handleOnMouseOver = () =>{
        setMouseOver(true);
    };
    const handleOnBlur = () =>{
        setMouseOver(false);
    };
    const handleOnClick = () =>{
        setState(!state);
        if(props.onClick){
            props.onClick(props.index);
        }
    };

    return(
        <b onMouseOver={handleOnMouseOver}
           onMouseOut={handleOnBlur}
           onClick={handleOnClick}
            className={(state? classes.Display : (MouseOver? classes.semiDisplay : classes.hide))}>•</b>
    )

}

export default Separator;