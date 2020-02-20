import React, { useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Tools from '../textNinja tool/tools';
import FileUpload from '../textNinja tool/tools/FileUpload';
import TextNinjaTool from '../textNinja tool';
import TextNinjaHOC from '../textNinja tool/TextNinjaHOC'
import axios from 'axios';
import AttachFile from "../textNinja tool/tools/AttachFile";

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

    },
    readFileModOpen:{
        height: 'auto',
    },
    open:{
        height: '100%',
        zDepth: '-1',
        backgroundColor: '#fff212',
        position: 'relative',
        left:' 0px',
        top: '0px',
    },
    toolsWrap:{
        display: 'flex',
    }
});


function Home(props){
    let classes = useStyles();
    const [fileMod, setFileMod] = useState(false);
    const [input, setInput] = useState('');
    const [minimizeMod, setMinimizeMod] = useState(false);
    const toggleMinimizeMod = () => {
        setMinimizeMod(!minimizeMod);
    };
    const openInput = (e, toOpen) =>{
        if((e && (e.target.id === 'textNinjaInput' || e.target.id === 'textNinjaTool')) || toOpen){
            setMinimizeMod(false);
        }
    };

    useEffect(()=>{
        if(!fileMod && !minimizeMod){
            let inputSS =  sessionStorage.textNinjaInput?  sessionStorage.textNinjaInput : '';
            document.getElementById("input").value = inputSS;
            setInput(inputSS);
        }
        },
        []
    );

    useEffect(() => {
        if(!fileMod && !minimizeMod){
            sessionStorage.setItem('textNinjaInput', input);
            document.getElementById("input").value = input;
        }
    });

    const handleChange = () => {
        setInput(document.getElementById("input").value)
    };

    const readFromFileModToggle = () => {
        setFileMod(!fileMod);
    };


    return (
        <Grid container className={classes.root}>
            <Grid item xs={11} md={12} className={classes.root}>
                <Grid container className={classes.wrap}>
                    <Grid item  xs={12}  md={minimizeMod? 1 : 6} className={'inputWrap'}>
                        <Grid container className={"textNinjaInput "+ ((fileMod || minimizeMod)? classes.readFileModOpen: '')} id='textNinjaInput' onClick={openInput}>
                            {minimizeMod?
                                null :
                                <Grid item xs={12} md={minimizeMod? 0 : 11} className={fileMod?  classes.readFileModOpen : classes.wrap90Height} >
                                    {fileMod?
                                        <FileUpload setInput={setInput}/>
                                        :
                                        <textarea id="input" placeholder="Insert text" onChange={handleChange} style={{fontSize: props.fontSize+'px'}}/>
                                    }
                                </Grid>
                            }
                            <Grid item xs={12} md={minimizeMod? 12 : 1} id='textNinjaTool' onClick={openInput}>
                                <Tools
                                    mutedFun={props.mutedFun}
                                    toggleChapterToSyllables={props.toggleChapterToSyllables}
                                    toggleMarkWord = {props.toggleMarkWord}
                                    toggleMarkLine = {props.toggleMarkLine}
                                    setFontSize = {props.setFontSize}
                                    readFromFileModToggle = {readFromFileModToggle}
                                    toggleMinimizeMod={ toggleMinimizeMod }
                                    minimizeMod = {minimizeMod}
                                    openInput = {openInput}
                                    setInput = {setInput}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={minimizeMod? 11 : 6} className={'textNinjaTool'}>
                        <TextNinjaTool
                            onWordClick = {props.playFun}
                            chapterToSyllables = {props.chapterToSyllables}
                            markWord = {props.markWord}
                            markLineEvent = {props.markLineEvent}
                            fontSize = {props.fontSize}
                            outputClassName={'textNinjaWrap'}
                        >
                            {input}
                        </TextNinjaTool>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TextNinjaHOC(Home);