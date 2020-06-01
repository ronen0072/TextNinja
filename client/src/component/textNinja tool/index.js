import React, {useEffect, useState} from 'react';
import Word from './Word';
import {connect} from "react-redux";
import {Icon} from '@material-ui/core';
import stringToHTML from '../utilts/ConvertingStringToHTML'
import {
    setFontSize, setLineColor,
    toggleBreakDownToSyllables,
    toggleMarkLine,
    toggleMarkWord
} from "../../store/actions/preferencesActions";
import PopModal from "../utilts/PopModal";

const htmlSimpleTags = new Map([['*br', 'br'], ['*img', 'img'], ['*icon', 'icon']]);
const htmlOpenTags = new Set(['*ul', '*li', '*br/', '*img', '*icon']);

const htmlcloseTags = new Map([['*/ul', 'ul'], ['*/li', 'li'], ['*/HtmlScope!', 'HtmlScope'], ['*br/', 'br'], ['*/img', 'img'], ['*/icon', 'icon']]);


function TextNinjaTool(props) {
    const [state, setState] = useState({
        input: props.children,
        backgroundColor: {},
        fontSize: props.fontSize,
        words: []
    });
    let isHtmlTag = false;
    let isHtmlSimpleTag = false;
    let stack = [];

    const tagContent = (htmlTag) => {
        var reverseRes = [];
        let word = stack.pop();
        while (stack.length > 0 && word !== htmlTag) {
            // console.log('word:', word);
            reverseRes.push(word);
            word = stack.pop();
        }
        if (stack.length === 0) {
            isHtmlTag = false;
            isHtmlSimpleTag = false;
        }
        const res = reverseRes.reverse();
        return res
    };

    function htmlTag(htmlTag, content) {
        const tags = new Map([['ul',
            <ul style={{marginTop: parseInt(props.fontSize) + 4}} className={'textNinjaUl'}>{content}</ul>], ['li',
            <li>{content}</li>], ['br', <br/>], ['img',<img src={content} />], ['icon',
            <Icon
            title={content}
            fontSize='small'
            className=''
        >{content}</Icon>]]);
        if(htmlTag === 'img'){
            console.log('img content: ', content);
        }
        return tags.get(htmlTag);
    }

    useEffect(() => {
        setState({
            ...state,
            input: props.children,
            fontSize: props.fontSize,
            words: props.children ? props.children.split(" ") : []
        });
    }, [props.children, props.fontSize]);

    useEffect(() => {
        if (state.input !== props.children) {
            setState({
                ...state,
                input: props.children,
                fontSize: props.fontSize,
                words: props.children ? props.children.split(" ") : []
            });
        }
    });
    const markLineEvent = (event, outputBackground) => {
        let background;
        if (props.markLine) {
            let lineHeight = parseInt(props.fontSize) + 4;

            //let  lineShift = window.innerWidth > 960 ? lineHeight + 2 : lineHeight + 2;
            let shift = 0;
            if (outputBackground === 'textNinjaWrap') {
                shift = window.innerWidth > 960 ? 120 - lineHeight : 360 - lineHeight;
            }
            if (outputBackground === 'inner-content') {
                shift = 170;
            }
            let y = event.clientY - ((event.clientY - (shift - props.fontSize) + 8) % (lineHeight + 2));// - lineShift;
            // if(outputBackground === '#wikiInfo') {
            //     shift = 184;
            // }
            let backgroundColor = props.lineColor;

            background = {
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% ' + lineHeight + 'px',
                backgroundImage: 'radial-gradient(' + backgroundColor + ' , ' + backgroundColor + ')',
                backgroundPosition: '0 ' + ((y - shift) + 2) + 'px' //
            };
            //console.log('background: ', background);

        }
        return background;
    };
    const handleOnMouseMove = (e) => {
        let background = markLineEvent(e, props.outputClassName);

        setState({
            ...state,
            backgroundColor: background
        })
    };
    const handleOnMouseOut = (e) => {
        setState({
            ...state,
            backgroundColor: {}
        })
    };
    // const splitStringToWords = (string) => {
    //     const words = string.split(" ");
    //     {
    //         words && words.map((word, index) => {
    //             console.log('word: ', word);
    //             return (
    //                 <Word
    //                     breakDownToSyllables={props.breakDownToSyllables}
    //                     markWord={props.markWord}
    //                     fontSize={props.fontSize}
    //                     onWordClick={props.onWordClick}
    //                     key={index + word}>
    //                     {word}
    //                 </Word>
    //             );
    //         })
    //     }
    // };
    //
    // const splitChildrens = (obj)=>{
    //     if(obj && obj.type){
    //         console.log('obj: ', obj, Array.isArray(obj.props.children));
    //         return  Array.isArray(obj.props.children) ?
    //             obj.props.children.map((childObj) => {
    //                 return splitChildrens(childObj);
    //             }) : splitChildrens(obj.props.children);
    //     }
    //     else{
    //         // console.log('obj: ', obj);
    //         return obj? splitStringToWords(obj) : null;
    //     }
    // };

    return (
        <div
            style={state.backgroundColor}
            onMouseMove={handleOnMouseMove}
            onMouseOut={handleOnMouseOut}
            className={props.outputClassName}
        >
            {state.words && state.words.map((word, index) => {
                let content;

                if ((htmlOpenTags.has(word) || htmlcloseTags.has(word))) {
                    if (htmlOpenTags.has(word)) {
                        stack.push(word.substring(1));
                        isHtmlTag = true;
                        if (htmlSimpleTags.has(word))
                            isHtmlSimpleTag = true;
                    }
                    if (htmlcloseTags.has(word)) {
                        const tag = htmlcloseTags.get(word);
                        console.log('stack: ', stack);
                        // if (word === '*/HtmlScope!') {
                        //     content = stringToHTML(tagContent(tag).join(' '));
                        // } else {
                            content = htmlTag(tag, tagContent(tag));
                        // }
                    }
                } else {
                    if(isHtmlSimpleTag){
                        content = word;
                    }
                    else{
                        content = <Word
                            breakDownToSyllables={props.breakDownToSyllables}
                            markWord={props.markWord}
                            fontSize={props.fontSize}
                            onWordClick={props.onWordClick}
                            key={index + word}>
                            {word}
                        </Word>
                    }
                }
                if (isHtmlTag)
                    content && stack.push(content);
                else
                    return (
                        content
                    )
            })}
        </div>
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
export default connect(mapStateToProps, {
    toggleBreakDownToSyllables,
    toggleMarkWord,
    toggleMarkLine,
    setFontSize,
    setLineColor
})(TextNinjaTool);
