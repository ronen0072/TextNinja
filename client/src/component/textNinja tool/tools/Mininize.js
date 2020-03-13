import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import {Hidden} from "@material-ui/core";
import {connect} from "react-redux";
import {toggleMinimizeMod} from "../../../store/actions/preferencesActions";


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
function Minimize(props) {
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
        props.toggleMinimizeMod();
    };
    return (
        <span

            onClick={handleOnClick}
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
        >
            <Hidden smDown>
                <Icon title= {props.minimizeMod? 'open' : 'close'}
                      fontSize="large"
                      className={"toolsIcon "+ iconStyle +' '+(props.minimizeMod? '' : classes.back)}
                >
                    arrow_forward_ios
                </Icon>
            </Hidden>
            <Hidden mdUp>
                <Icon title= {props.minimizeMod? 'open' : 'close'}
                      fontSize="large"
                      className={"toolsIcon "+ iconStyle +' '+(props.minimizeMod? classes.down : classes.up ) }
                >
                    arrow_forward_ios
                </Icon>
            </Hidden>
        </span>

    )
}
const mapStateToProps = (state) => ({
    minimizeMod: state.preferences.minimizeMod,
});
export default connect(mapStateToProps,{ toggleMinimizeMod })(Minimize);