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
    const [input, setInput] = useState('');

    const openInput = (e) =>{
        if((props.minimizeMod && e && e.target.id === 'textNinjaInput')){
                props.toggleMinimizeMod();
        }
    };

    useEffect(()=>{
        if(!props.fileMod && !props.minimizeMod){
            let inputSS =  sessionStorage.textNinjaInput?  sessionStorage.textNinjaInput : '';
            document.getElementById("input").value = inputSS;
            setInput(inputSS);
        }
        },
        []
    );

    useEffect(() => {
        if(!props.fileMod && !props.minimizeMod){
            sessionStorage.setItem('textNinjaInput', input);
            document.getElementById("input").value = input;
        }
    });

    const handleChange = () => {
        setInput(document.getElementById("input").value)
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={11} md={12} className={classes.root}>
                <Grid container className={classes.wrap}>
                    <Grid item  xs={12}  md={props.minimizeMod? 1 : 6} className={'inputWrap'}>
                        <Grid container className={"textNinjaInput "+ ((props.fileMod || props.minimizeMod)? classes.readFileModOpen: '')} id='textNinjaInput' onClick={openInput}>
                            {props.minimizeMod?
                                null :
                                <Grid item xs={12} md={props.minimizeMod? 0 : 11} className={props.fileMod?  classes.readFileModOpen : 'textareaWrap'} >
                                    {props.fileMod?
                                        <FileUpload setInput={setInput}/>
                                        :
                                        <textarea id="input" placeholder="Insert text" onChange={handleChange} style={{fontSize: props.fontSize+'px'}}/>
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
        minimizeMod: state.preferences.minimizeMod,
        fileMod: state.preferences.fileMod,
    };
};

export default connect(mapStateToProps,{toggleMinimizeMod})(Home);