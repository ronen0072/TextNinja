
import React, { useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Tools from '../textNinja tool/tools';
import TextNinjaTool from '../textNinja tool';
import TextNinjaHOC from '../textNinja tool/TextNinjaHOC'

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

    },
    wrap90Height:{
        height: '88%',
        display: 'inlineBlock'

    }
});


function Home(props){
    let classes = useStyles();
    const [state, setState] = useState({
        input: ''
    });
    useEffect(()=>{
        document.getElementById("input").value = sessionStorage.textNinjaInput;
        setState({
            ...state,
            input: sessionStorage.textNinjaInput
        });
        },
        []
    );

    useEffect(() => {
        sessionStorage.setItem('textNinjaInput', state.input);
        document.getElementById("input").value = state.input;
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
        setState({
            ...state,
            input: ''
        });
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={11} md={12} className={classes.root}>
                <Grid container className={classes.wrap} >
                    <Grid item  xs={12} sm={12} md={6} className={'inputWrap'}>
                        <Grid container className={"textNinjaInput"}>
                            <Grid item xs={12} sm={12} md={11} className={classes.wrap90Height} >
                                <textarea id="input" placeholder="Insert text" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={1}>
                                <Tools mutedFun={props.mutedFun} clearFuc={clearInput}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <TextNinjaTool onWordClick = {props.playFun}>{state.input}</TextNinjaTool>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TextNinjaHOC(Home);