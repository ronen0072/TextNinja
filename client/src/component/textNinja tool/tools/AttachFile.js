import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import {connect} from "react-redux";
import {toggleMinimizeMod, toggleFileMod} from "../../../store/actions/preferencesActions";

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

function AttachFile(props) {
    const classes = useStyles();

    const handleOnClick = () =>{
        if(props.minimizeMod)
            props.toggleMinimizeMod();
        props.toggleFileMod();
    };
    return (
        <Icon
            title='attach file'
            fontSize="large"
            className={"toolsIcon "+ (props.fileMod?  classes.iconOn : classes.iconOff)}
            onClick={handleOnClick}
        >
            attach_file
        </Icon>
    )
}
const mapStateToProps = (state) => ({
    minimizeMod: state.preferences.minimizeMod,
    fileMod: state.preferences.fileMod,
});
export default connect(mapStateToProps,{ toggleMinimizeMod, toggleFileMod })(AttachFile);