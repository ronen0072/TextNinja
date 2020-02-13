
import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Word from './Word';

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
        fontSize: props.fontSize,
        words : []
    });
    useEffect(()=>{
        setState({
            ...state,
            input: props.children,
            fontSize: props.fontSize,
            words: props.children? props.children.split(" ") : []
        });
    }, []);

    useEffect(()=>{
        if( state.input !== props.children){
            setState({
                ...state,
                input: props.children,
                fontSize: props.fontSize,
                words: props.children? props.children.split(" ") : []
            });
        }
    });

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
            <div
                style={state.backgroundColor}
                onMouseMove={handleOnMouseMove}
                onMouseOut={handleOnMouseOut}
                className={'textNinjaWrap'}
            >
                {state.words && state.words.map( (word, index)=>{
                    return(
                        <Word
                            chapterToSyllables={props.chapterToSyllables}
                            markWord={props.markWord}
                            fontSize={props.fontSize}
                            onWordClick = {props.onWordClick}
                            key={index+word}>
                            {word}
                        </Word>
                    )
                })}
            </div>

        </Grid>
    );
}

export default TextNinjaTool;
