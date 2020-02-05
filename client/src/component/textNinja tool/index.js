
import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Word from './Word';

var syllablesFontSize = 18;
var fontSize = syllablesFontSize -4;

function calcLetterSpacing(fontSize){
    return ((fontSize/(-1.95)) + 9.56);
}

var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%'
    },
    wrap:{
        height: '100%',
    },
    wordStyle:{
        fontSize: fontSize+'px',
        letterSpacing: calcLetterSpacing(fontSize),
        lineHeight: syllablesFontSize+'px',
        marginLeft: 0
    },
    syllablesStyle:{
        fontSize: syllablesFontSize+'px',
        letterSpacing: calcLetterSpacing(syllablesFontSize),
        lineHeight: fontSize+'px',
        margin: 0
    }
});




function TextNinjaTool(props){
    let classes = useStyles();
    const [state, setState] = useState({
        input: props.children
    });

    let words;
    if(props.children){
        words = props.children.split(" ");
    }
    console.log('TextNinjaTool word',words);
    return (
        <Grid item xs={12} sm={12} md={6} className={'textNinjaWrap'}>
            {words && words.map( (word, index)=>{
                console.log('word',word);
                return(
                    <Word
                        fontSize={fontSize}
                        classOnOver={classes.syllablesStyle}
                        classOnOut={classes.wordStyle}
                        onWordClick = {props.onWordClick}
                        key={index}>
                        {word}
                    </Word>
                )
            })}
        </Grid>
    );
}

export default TextNinjaTool;
