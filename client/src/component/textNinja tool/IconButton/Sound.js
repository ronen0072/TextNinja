import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    iconOn: {
        color: '#59beee'
    },
    iconOff: {
        color: '#d9dad6'
    }
}));

export default function Sound() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        volumeState: 'on',
        iconName: 'volume_up',
        iconStyle: classes.iconOn
    });

    // const handleOnMouseOver = () =>{
    //     setState({
    //         iconStyle: classes.iconOnOver
    //     });
    // };
    //
    // const handleOnMouseLeave = () =>{
    //
    // };
    const handleOnClick = () =>{
        console.log('sdsadsadsa');
        if(state.iconName !== 'volume_up'){
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
    };
    return (
        <Icon
            title={'volume '+ state.volumeState}
            fontSize="large"
            className={state.iconStyle}
            onClick={handleOnClick}
            // onMouseOver={handleOnMouseOver}
            // onMouseLeave={handleOnMouseLeave}
        >
            {state.iconName}
        </Icon>
    )
}