import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Settings from './Settings';
import Volume from './Volume';
import Clear from './Clear';
import AttachFile from './AttachFile';
import Mininize from './Mininize';
import TextNinjaHOC from "../TextNinjaHOC";

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
    return(
        <Grid className={classes.wrap}>
            <Settings
                {...props.settingsOptions}
                toggleChapterToSyllables = {props.toggleChapterToSyllables}
                toggleMarkWord = {props.toggleMarkWord}
                toggleMarkLine = {props.toggleMarkLine}
                setFontSize = {props.setFontSize}
                changeOrder = {props.changeOrder}
            />
            {props.fileOption &&
                <AttachFile
                    readFromFileModToggle={props.readFromFileModToggle}
                    openInput={props.openInput}
                />
            }
            {props.volumeOption &&
               <Volume mutedFun={props.mutedFun}/>
            }
            {props.ClearOption &&
                <Clear clearFun={() => props.setInput('')} openInput={props.openInput}/>
            }
            {props.MinimizeOption &&
                <Mininize mod = {props.minimizeMod} toggle={props.toggleMinimizeMod}/>
            }
        </Grid>

    )

}

export default Tools;