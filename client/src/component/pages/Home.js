import React, { useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Tools from '../textNinja tool/tools';
import FileUpload from '../textNinja tool/tools/FileUpload';
import TextNinjaTool from '../textNinja tool';
import {connect} from "react-redux";
import {toggleMinimizeMod} from "../../store/actions/preferencesActions";

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
        height: '85%',
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
    const initialInput = 'Hello and welcome to TextNinja! *br/' +
        ' TextNinja is a web application that helps children improve their reading ability in a effective and convenient way. *br/' +
        ' So how to get started? *br/' +
        ' You can give to TextNinja the input via a text field or by uploading a Word file *icon attach_file */icon .' +
        ' then the interactive text will appear immediately and you can start reading in comfortably way using the features of TextNinja like: ' +
        '*ul '+
            '*li Split words into syllables automatically. */li ' +
            '*li Highlight the word you read when you over the word. */li ' +
            '*li Highlight the word you read when you over the word. */li ' +
            '*li text to speech - On a click of a button you can hear a recording of the word. */li ' +
            '*li You can create a user or login through Google Authentication and practice the words in which difficulty was found during reading. */li ' +
        '*/ul '+
        'All features are switchable and customized with a click on the settings *icon settings */icon  and don\'t worry TextNinja will remember your setup until your next use.';
    const [input, setInput] = useState('');

    const openInput = (e) =>{
        if((props.minimizeMod && e && e.target.id === 'textNinjaInput')){
                props.toggleMinimizeMod();
        }
    };

    useEffect(()=>{
        if(!props.fileMod && !props.minimizeMod){
            let inputSS =  sessionStorage.textNinjaInput?  sessionStorage.textNinjaInput : '';
            setInput(inputSS);
        }
        },
        [props.fileMod, props.minimizeMod]
    );

    useEffect(() => {
        if(!props.fileMod && !props.minimizeMod){
            sessionStorage.setItem('textNinjaInput', input);
            setInput(input);
        }
    });

    const handleChange = (e) => {
        setInput(e.target.value)
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={11} md={12} className={classes.root}>
                <Grid container className={classes.wrap}>
                    <Grid item  xs={12}  md={props.minimizeMod? 1 : 6} className={'inputWrap'}>
                        <Grid container className={"textNinjaInput "+ ((props.fileMod || props.minimizeMod)? classes.readFileModOpen: '')} id='textNinjaInput' onClick={openInput}>
                            {props.minimizeMod?
                                null :
                                <Grid item xs={12} md={props.minimizeMod? 0 : 11} className={props.fileMod?  classes.readFileModOpen : 'textAreaWrap'} >
                                    {props.fileMod?
                                        <FileUpload setInput={setInput}/>
                                        :
                                        <textarea id="input" defaultValue={input} placeholder="Insert text" onChange={handleChange} style={{fontSize: props.fontSize+'px'}}/>
                                    }
                                </Grid>
                            }
                            <Grid item xs={12} md={props.minimizeMod? 12 : 1}  onClick={openInput}>
                                <Tools
                                    displayInline = {true}
                                    settingsOptions = {{
                                        fontSizeOption: true,
                                        syllablesOption: true,
                                        markWordOption: true,
                                        markLineOption: true,
                                    }}
                                    ClearOption={true}
                                    MinimizeOption={true}
                                    volumeOption={true}
                                    fileOption={true}
                                    setInput = {setInput}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={props.minimizeMod? 11 : 6} className={'textNinjaTool'}>
                        <TextNinjaTool
                            outputClassName={'textNinjaWrap'}
                        >
                            {input === ''? initialInput : input}
                        </TextNinjaTool>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = (state) =>{
    return{
        fontSize: state.preferences.fontSize,
        minimizeMod: state.preferences.minimizeMod,
        fileMod: state.preferences.fileMod,
    };
};

export default connect(mapStateToProps,{toggleMinimizeMod})(Home);