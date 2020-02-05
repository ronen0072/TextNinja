import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
    root:{
    },
    iconOnOver: {
        color: '#ff7970',
    },
    iconOnClick: {
        color: '#ee1200',
    },
    iconOnLeave: {
        color: '#d9dad6',
    }
});

export default function Clear() {
    const classes = useStyles();
    const [state, setState] = useState({
        iconName: 'clear_two_tone',
        iconStyle: classes.iconOnLeave
    });
    const handleOnMouseOver = () =>{
        console.log( classes.iconOnOver);
        setState({
            iconName: 'cancel_two_ton',
            iconStyle: classes.iconOnOver
        });
    };

    const handleOnMouseLeave = () =>{
        console.log("handleOnMouseLeave");
        setState({
            iconName: 'clear_two_tone',
            iconStyle: classes.iconOnLeave
        });
    };
    const handleOnClick = () =>{
        setState({
            iconName: 'cancel_two_ton',
            iconStyle: classes.iconOnClick
        });
        setTimeout(()=>{
            setState({
                iconName: 'cancel_two_ton',
                iconStyle: classes.iconOnLeave
            });
        }, 300);
            
    };
    return (
        <Icon
            title={'clean'}
            fontSize="large"
            className={"toolsIcon "+ state.iconStyle}
            onClick={handleOnClick}
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
        >
            {state.iconName}
        </Icon>
    )
}