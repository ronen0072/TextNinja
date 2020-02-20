import React from 'react';
import TextNinjaTool from '../textNinja tool';
import TextNinjaHOC from '../textNinja tool/TextNinjaHOC'
import {Container} from "@material-ui/core";


function About(props){
    return (
        <Container maxWidth="xl">
        <div className={'content'}>
            <h3 className="title">About Us</h3>
            <div className="inner-content">
                <h4 className={'smallLogo'}>TextNinja</h4>
                <TextNinjaTool
                    onWordClick = {props.playFun}
                    chapterToSyllables = {props.chapterToSyllables}
                    markWord = {props.markWord}
                    markLineEvent = {props.markLineEvent}
                    fontSize = {props.fontSize}
                    outputClassName={''}
                >
                    is a tool designed to help people with dyslexic to improve their reading abilities.
                    Features such as automatic row highlighting, word parsing by syllables and text to speech etc.
                </TextNinjaTool>
            </div>
        </div>
        </Container>
    );
}

export default TextNinjaHOC(About);