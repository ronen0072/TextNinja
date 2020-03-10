import React, {useEffect, useState} from 'react';
import Word from './Word';
import {connect} from "react-redux";
import {
    setFontSize, setLineColor,
    toggleBreakDownToSyllables,
    toggleMarkLine,
    toggleMarkWord
} from "../../store/actions/preferencesActions";

function TextNinjaTool(props){
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
    const markLineEvent = (event, outputBackground)=>{
        let background;
        if(props.markLine){
            let lineHeight = parseInt(props.fontSize)+4;

            //let  lineShift = window.innerWidth > 960 ? lineHeight + 2 : lineHeight + 2;
            let shift = 0;
            if(!outputBackground) {
                shift = window.innerWidth > 960 ? 120 - lineHeight : 440 - lineHeight;
            }
            let y = event.clientY - ((event.clientY - (shift - props.fontSize)+8) % (lineHeight + 2));// - lineShift;


            // if(outputBackground === '.inner-content') {
            //     shift = 176;
            // }
            // if(outputBackground === '#wikiInfo') {
            //     shift = 184;
            // }
            let backgroundColor = props.lineColor;

            background = {
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% '+ lineHeight+'px',
                backgroundImage: 'radial-gradient('+backgroundColor+' , '+backgroundColor+')',
                backgroundPosition: '0 ' + ((y -shift)+2) +'px' //
            };
            //console.log('background: ', background);

        }
        return background;
    };
    const handleOnMouseMove= (e) => {
        let background = markLineEvent(e);

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

            <span
                style={state.backgroundColor}
                onMouseMove={handleOnMouseMove}
                onMouseOut={handleOnMouseOut}
                className={props.outputClassName}
            >
                {state.words && state.words.map( (word, index)=>{
                    return(
                        <Word
                            breakDownToSyllables={props.breakDownToSyllables}
                            markWord={props.markWord}
                            fontSize={props.fontSize}
                            onWordClick = {props.onWordClick}
                            key={index+word}>
                            {word}
                        </Word>
                    )
                })}
            </span>


    );
}
const mapStateToProps = (state) => ({
    muted: state.preferences.muted,
    breakDownToSyllables: state.preferences.breakDownToSyllables,
    markWord: state.preferences.markWord,
    markLine: state.preferences.markLine,
    lineColor: state.preferences.lineColor,
    fontSize: state.preferences.fontSize,
});
export default connect(mapStateToProps,{toggleBreakDownToSyllables, toggleMarkWord, toggleMarkLine, setFontSize, setLineColor})(TextNinjaTool);
