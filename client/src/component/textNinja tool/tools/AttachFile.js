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

export default function AttachFile(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        attachFileMod: false,
        iconStyle: classes.iconOff
    });

    const handleOnClick = () =>{
        setState({
            attachFileMod: !state.attachFileMod,
        });
        props.readFromFileModToggle();
        props.openInput(null,true);
    };
    return (
        <Icon
            title='attach file'
            fontSize="large"
            className={"toolsIcon "+ (state.attachFileMod?  classes.iconOn : classes.iconOff)}
            onClick={handleOnClick}
        >
            attach_file
        </Icon>
    )
}