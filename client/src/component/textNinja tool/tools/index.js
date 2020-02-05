import React, {useState} from 'react';
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
    const [state, setState] = useState({

    });

    return(
        <Grid className={classes.wrap}>
            <Settings/>
            <Volume mutedFun={props.mutedFun}/>
            <Clear/>
        </Grid>

    )

}

export default Tools;