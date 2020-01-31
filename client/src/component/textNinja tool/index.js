
import React, {Component, Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Word from './Word';

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


function TextNinjaTool(props){
    let classes = useStyles();
    const [state, setState] = React.useState({
        input: props.children
    });

    let words = props.children.split(" ");

    console.log('TextNinjaTool word',words);
    return (
        <Grid item xs={12} sm={12} md={6} className={'output'}>
            {words && words.map( (word, index)=>{
                console.log('word',word);
                return(
                    <Word key={index}>{word}</Word>
                )
            })}
            {props.children}
        </Grid>
    );
}

export default TextNinjaTool;