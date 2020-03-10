import React, { useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Tools from '../textNinja tool/tools';
import FileUpload from '../textNinja tool/tools/FileUpload';
import TextNinjaTool from '../textNinja tool';
import {connect} from "react-redux";

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
                                <Grid item xs={12} md={minimizeMod? 0 : 11} className={fileMod?  classes.readFileModOpen : 'textareaWrap'} >
                                    {fileMod?
                                        <FileUpload setInput={setInput}/>
                                        :
                                        <textarea id="input" placeholder="Insert text" onChange={handleChange} style={{fontSize: props.fontSize+'px'}}/>
                                    }
                                </Grid>
                            }
                            <Grid item xs={12} md={minimizeMod? 12 : 1} id='textNinjaTool' onClick={openInput}>
                                <Tools
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
                                    readFromFileModToggle = {readFromFileModToggle}
                                    toggleMinimizeMod={ toggleMinimizeMod }
                                    minimizeMod = {minimizeMod}
                                    openInput = {openInput}
                                    setInput = {setInput}
                                    displayInline = {true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={minimizeMod? 11 : 6} className={'textNinjaTool'}>
                        <TextNinjaTool
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
const mapStateToProps = (state) =>{
    return{
        fontSize: state.preferences.fontSize,
    };
};

export default connect(mapStateToProps,null)(Home);