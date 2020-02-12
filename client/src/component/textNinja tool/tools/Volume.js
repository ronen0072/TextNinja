import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles({
    root:{
        display:'block',
        marginLeft: 'auto',
    },
    iconOn: {
        color: '#59beee'
    },
    iconOff: {
        color: '#d9dad6'
    }
});

export default function Volume(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        volumeState: 'on',
        iconName: 'volume_up',
        iconStyle: classes.iconOn
    });
    useEffect(()=>{
        if(sessionStorage.sound === 'true'){
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
    }, []);


    const handleOnMouseOver = () =>{
        console.log('sessionStorage.sound: ',sessionStorage.sound);
    };
    //
    // const handleOnMouseLeave = () =>{
    //
    // };
    const handleOnClick = () =>{
        if(state.volumeState !== 'on'){
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
        props.mutedFun();
    };
    return (
        <Icon
            title={'volume '+ state.volumeState}
            fontSize="large"
            className={"toolsIcon "+ state.iconStyle}
            onClick={handleOnClick}
            onMouseOver={handleOnMouseOver}
            // onMouseLeave={handleOnMouseLeave}
        >
            {state.iconName}
        </Icon>
    )
}