import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import {Hidden} from "@material-ui/core";


const useStyles = makeStyles({
    root:{
    },
    forward:{

    },
    back:{
        transform: 'rotate(180deg)'
    },
    up:{
        transform: 'rotate(270deg)'
    },
    down:{
        transform: 'rotate(90deg)'
    },
    iconOnOver: {
        color: '#59beee'
    },
    iconOnClick: {
        color: '#426ebd'
    },
    iconOnLeave: {
        color: '#d9dad6'
    },

});

export default function Minimize(props) {
    const classes = useStyles();
    const [iconStyle, setIconStyle] = useState( classes.iconOnLeave);
    const handleOnMouseOver = () =>{
        setIconStyle(classes.iconOnOver);
    };

    const handleOnMouseLeave = () =>{
        setIconStyle( classes.iconOnLeave);
    };
    const handleOnClick = () =>{
        setIconStyle(classes.iconOnClick);
        setTimeout(()=>{
            setIconStyle(classes.iconOnLeave);
        }, 300);
        props.toggle();
    };
    return (
        <span

            onClick={handleOnClick}
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
        >
            <Hidden smDown>
                <Icon title= {props.mod? 'open' : 'close'}
                      fontSize="large"
                      className={"toolsIcon "+ iconStyle +' '+(props.mod? '' : classes.back)}
                >
                    arrow_forward_ios
                </Icon>
            </Hidden>
            <Hidden mdUp>
                <Icon title= {props.mod? 'open' : 'close'}
                      fontSize="large"
                      className={"toolsIcon "+ iconStyle +' '+(props.mod? classes.down : classes.up ) }
                >
                    arrow_forward_ios
                </Icon>
            </Hidden>
        </span>

    )
}