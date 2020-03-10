import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import {connect} from "react-redux";
import {toggleMuted} from "../../../store/actions/preferencesActions";

const useStyles = makeStyles({
    root:{
        display:'block',
        marginLeft: 'auto',
    },
    iconOn: {
        display: 'block',
        color: '#59beee'
    },
    iconOff: {
        display: 'block',
        color: '#d9dad6'
    }
});

function Volume(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        volumeState: 'on',
        iconName: 'volume_up',
        iconStyle: classes.iconOn
    });
    useEffect(()=>{
        if(props.muted){
            //console.log('initialization Volume off: ',sessionStorage.sound);
            setState({
                volumeState: 'off',
                iconStyle: classes.iconOff,
                iconName: 'volume_off'
            });
        }
        else{
            //console.log('initialization Volume on: ',sessionStorage.sound);
            setState({
                volumeState: 'on',
                iconStyle: classes.iconOn,
                iconName: 'volume_up'
            });
        }
    }, [classes.iconOff, classes.iconOn]);


    const handleOnClick = () =>{
        if(props.muted){
            setState({
                volumeState: 'on',
                iconStyle: classes.iconOn,
                iconName: 'volume_up'
            });
        }
        else{
            setState({
                volumeState: 'off',
                iconStyle: classes.iconOff,
                iconName: 'volume_off'
            });
        }
        props.toggleMuted()
    };
    console.log('displayinline: ',props.displayInline);
    return (
        <Icon
            title={'volume '+ state.volumeState}
            fontSize="large"
            className={state.iconStyle + (props.displayInline? ' toolsIcon' : '')}
            onClick={handleOnClick}
        >
            {state.iconName}
        </Icon>
    )
}
const mapStateToProps = (state) => ({
    muted: state.preferences.muted,
});
export default connect(mapStateToProps,{ toggleMuted })(Volume);