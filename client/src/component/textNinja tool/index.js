
import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Word from './Word';

var syllablesFontSize = 18;
var fontSize = syllablesFontSize -4;



var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        // height: '100%'
    },
});




function TextNinjaTool(props){
    let classes = useStyles();
    const [state, setState] = useState({
        input: props.children,
        backgroundColor: {},
        fontSize: props.fontSize
    });
    useEffect(()=>{
        setState({
            ...state,
            fontSize: sessionStorage.getItem('fontSize')
        });
        console.log('props.fontSize: ',props.fontSize);
    }, []);

    let words;
    if(props.children){
        words = props.children.split(" ");
    }
    const calcLetterSpacing = (fontSize)=>{
        return ((fontSize/(-1.95)) + 9.56);
    };
    const wordStyle = ()=>{
        let style = {
            fontSize: props.fontSize+'px',
            letterSpacing: calcLetterSpacing(props.fontSize),
            lineHeight: (parseInt(props.fontSize)+4)+'px',
            margin: 0
            };
        return style;
    };
    const syllablesStyle = ()=>{
        let style = {
            fontSize: (parseInt(props.fontSize) + 4)+'px',
            lineHeight: props.fontSize+'px',
            margin: 0
        };
        return style;
    };
    const handleOnMouseMove= (e) => {
        let background = props.markLineEvent(e);

        setState({
            ...state,
            backgroundColor: background
        })
    };
    const handleOnMouseOut= (e) => {
        setState({
            ...state,
            backgroundColor: {}
        })
    };
    return (
        <Grid item xs={12} sm={12} md={6} className={'textNinjaTool'}>
            <div style={state.backgroundColor} onMouseMove={handleOnMouseMove} onMouseOut={handleOnMouseOut} className={'textNinjaWrap'}>
                {words && words.map( (word, index)=>{
                    return(
                        <Word
                            chapterToSyllables={props.chapterToSyllables}
                            markWord={props.markWord}
                            fontSize={props.fontSize}
                            stylesOnOver={syllablesStyle()}
                            stylesOnOut={wordStyle()}
                            onWordClick = {props.onWordClick}
                            key={index}>
                            {word}
                        </Word>
                    )
                })}
            </div>

        </Grid>
    );
}

export default TextNinjaTool;
