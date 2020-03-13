import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Settings from './Settings';
import Volume from './Volume';
import Clear from './Clear';
import AttachFile from './AttachFile';
import Mininize from './Mininize';
import {connect} from "react-redux";
import {toggleFileMod, toggleMinimizeMod} from "../../../store/actions/preferencesActions";

var useStyles = makeStyles({
    root: {

        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
    },
    wrap:{
        zIndex: '1',
        paddingRight: '0.5vw',
        color: '#d9dad6',//'#59beee'
        minHeight: '40px',
    },
});

function Tools(props){
    let classes = useStyles();

    const openInput = (e) =>{
        console.log(e.target.id);
        if((props.minimizeMod && e &&  e.target.id === 'textNinjaTools')){
            props.toggleMinimizeMod();
        }
    };

    return(
        <Grid className={classes.wrap} onClick={openInput} id='textNinjaTools'>
            <Settings
                {...props.settingsOptions}
                changeOrder = {props.changeOrder}
                displayInline = {props.displayInline}
            />
            {props.fileOption &&
                <AttachFile/>
            }
            {props.volumeOption &&
               <Volume
                   displayInline = {props.displayInline}
               />
            }
            {props.ClearOption &&
                <Clear clearFun={() => props.setInput('')}/>
            }
            {props.MinimizeOption &&
                <Mininize/>
            }
        </Grid>

    )

}

const mapStateToProps = (state) => ({
    minimizeMod: state.preferences.minimizeMod,
});
export default connect(mapStateToProps,{ toggleMinimizeMod, toggleFileMod })(Tools);