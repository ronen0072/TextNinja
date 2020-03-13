import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import {connect} from "react-redux";
import {toggleFileMod, toggleMinimizeMod} from "../../../store/actions/preferencesActions";

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

function Clear(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        iconName: 'clear_two_tone',
        iconStyle: classes.iconOnLeave
    });
    const handleOnMouseOver = () =>{
        setState({
            iconName: 'cancel_two_ton',
            iconStyle: classes.iconOnOver
        });
    };

    const handleOnMouseLeave = () =>{
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
        props.clearFun();
        if(props.minimizeMod)
            props.toggleMinimizeMod();
        if(props.fileMod)
            props.toggleFileMod();
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

const mapStateToProps = (state) => ({
    minimizeMod: state.preferences.minimizeMod,
    fileMod: state.preferences.fileMod,
});
export default connect(mapStateToProps,{ toggleMinimizeMod, toggleFileMod })(Clear);