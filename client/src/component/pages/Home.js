
import React, {Component, Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Word from '../textNinja tool/Word';
import TextNinjaTool from '../textNinja tool';

var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%'
    },
    wrap:{
        height: '100%',
    }
});


function Home(){
    let classes = useStyles();
    const [state, setState] = React.useState({
        input: ""
    });
    const handleChange = (e) => {
        setState({
            [e.target.id]: e.target.value
        })
    };
    return (
        <Grid container xs={11} md={12} className={classes.root}>
            <Grid item xs={12} sm={12} md={6} className={"textNinjaInput"}>
                <Grid item xs={12} sm={11} md={11} className={classes.wrap} >
                    <textarea id="input" placeholder="Insert text" onChange={handleChange}></textarea>
                </Grid>
                    <Grid item xs={12} sm={1} md={11} className={''} >
                        {/*<tools/>*/}
                    </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={'output'}>
                <TextNinjaTool>{state.input}</TextNinjaTool>
                <Word>ronen</Word> <Word>finish</Word> <Word>ronen</Word>
            </Grid>
        </Grid>
    );
}

export default Home;