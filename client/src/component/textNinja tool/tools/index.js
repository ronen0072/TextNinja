import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Settings from './Settings';
import Volume from './Volume';
import Clear from './Clear';


var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
    },
    wrap:{
        paddingRight: '0.5vw',
        color: '#d9dad6'//'#59beee'
    },
});




function Tools(props){
    let classes = useStyles();
    return(
        <Grid className={classes.wrap}>
            <Settings
                toggleChapterToSyllables = {props.toggleChapterToSyllables}
                toggleMarkWord = {props.toggleMarkWord}
                toggleMarkLine = {props.toggleMarkLine}
                setFontSize = {props.setFontSize}
            />
            <Volume mutedFun={props.mutedFun}/>
            <Clear  clearFun={props.clearFuc}/>
        </Grid>

    )

}

export default Tools;