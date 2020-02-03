
import React, { useState, useEffect, Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Tools from '../textNinja tool/Tools';
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
        display: 'inlineBlock'

}
});


function Home(){
    let classes = useStyles();
    const [state, setState] = useState({
        input: ''
    });
    useEffect(()=>{
        document.getElementById("input").value = sessionStorage.textNinjaInput;
        setState({
            input: sessionStorage.textNinjaInput
        });
        }, [])
    useEffect(() => {
        // Update the document title using the browser API
        if(state.input !== '') {
            sessionStorage.setItem('textNinjaInput', state.input);
        }

    });
    const handleChange = () => {
        setState({
            input: document.getElementById("input").value
        });
        // sessionStorage.setItem('textNinjaInput', state.input);
        console.log('state.input: ',state.input);
        console.log('sessionStorage: ',sessionStorage.textNinjaInput)
    };
    const clearInput = () => {
        document.getElementById("input").value = '';
        handleChange();
    };

    return (
        <Grid container xs={11} md={12} className={classes.root}>
            <Grid container xs={12} sm={12} md={6} className={"textNinjaInput"}>
                <Grid item xs={12} sm={11} md={11} className={classes.wrap} >
                    <textarea id="input" placeholder="Insert text" onChange={handleChange}></textarea>
                </Grid>
                <Grid item xs={12} sm={1} md={1} className={classes.wrap} >
                    <Tools/>
                </Grid>
            </Grid>
            <TextNinjaTool>{state.input}</TextNinjaTool>
        </Grid>
    );
}

export default Home;