
import React, {Component, Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {Settings, Sound} from './IconButton'


var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',

    },
    wrap:{
        paddingLeft: 0,
        color: '#d9dad6'//'#59beee'
    },
});




function Tools(props){
    let classes = useStyles();
    const [state, setState] = React.useState({
        
    });

    return(
        <Grid className={classes.wrap}>
            <Settings/>
            <Sound/>
            <Icon fontSize="large" >{'delete'}</Icon>

        </Grid>

    )

}

export default Tools;