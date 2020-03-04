import React from 'react';
import TextNinjaTool from '../textNinja tool';
import TextNinjaHOC from '../textNinja tool/TextNinjaHOC'
import {Container, Grid} from "@material-ui/core";
import Tools from '../textNinja tool/tools'


function About(props){
    return (
        <Container maxWidth='xl'>
        <Grid container className={'content'}>
            <h3 className='title'>About Us</h3>
            <Grid item className='inner-content'>
                <h4 className={'smallLogo'}>TextNinja</h4>
                <TextNinjaTool
                    onWordClick = {props.playFun}
                    chapterToSyllables = {props.chapterToSyllables}
                    markWord = {props.markWord}
                    markLineEvent = {props.markLineEvent}
                    fontSize = {props.fontSize}
                    outputClassName={''}
                >
                    gool is to teach and improve children's reading abilities.Using features like such as automatic row highlighting,
                    word parsing by syllables and text-to-speech etc.
                    Registered users can practice words they have difficulty with
                </TextNinjaTool>

            </Grid>
            <Grid item className='wrap-settings'>
                <Tools
                    settingsOptions = {{
                        fontSizeOption: true,
                        syllablesOption: true,
                        markWordOption: true,
                        markLineOption: true,
                    }}
                    volumeOption={true}
                    mutedFun={props.mutedFun}
                    toggleChapterToSyllables={props.toggleChapterToSyllables}
                    toggleMarkWord = {props.toggleMarkWord}
                    toggleMarkLine = {props.toggleMarkLine}
                    setFontSize = {props.setFontSize}
                />
            </Grid>
        </Grid>
        </Container>
    );
}

export default TextNinjaHOC(About);