import axios from 'axios';

import { returnErrors } from './errorActions'
import{
    MUTED_ON,
    MUTED_OFF,
    BREAK_DOWN_TO_SYLLABLES_ON,
    BREAK_DOWN_TO_SYLLABLES_OFF,
    MARK_WORD_ON,
    MARK_WORD_OFF,
    MARK_LINE_ON,
    MARK_LINE_OFF,
    SET_FONT_SIZE,
    SET_LINE_COLOR,
    SET_WORDS_LIST_ORDER,
    SET_DIVIDE_WORDS_ORDER
} from './types';

// toggle muted
export const toggleMuted = () => (dispatch, getState) =>{
    const muted = getState().preferences.muted;
    if(muted){
        dispatch({
            type: MUTED_ON,
        });
    }
    else {
        dispatch({
            type: MUTED_OFF
        });
    }
};

// toggle break down to syllables
export const toggleBreakDownToSyllables = () => (dispatch, getState) =>{
    const breakDownToSyllables = getState().preferences.breakDownToSyllables;
    if(breakDownToSyllables){
        dispatch({
            type: BREAK_DOWN_TO_SYLLABLES_OFF
        });
    }
    else {
        dispatch({
            type: BREAK_DOWN_TO_SYLLABLES_ON,
        });
    }
};

// toggle mark word
export const toggleMarkWord = () => (dispatch, getState) =>{
    const markWord = getState().preferences.markWord;
    if(markWord){
        dispatch({
            type: MARK_WORD_OFF
        });
    }
    else {
        dispatch({
            type: MARK_WORD_ON,
        });
    }
};

// toggle mark line
export const toggleMarkLine= () => (dispatch, getState) =>{
    const markLine = getState().preferences.markLine;
    if(markLine){
        dispatch({
            type: MARK_LINE_OFF
        });
    }
    else {
        dispatch({
            type: MARK_LINE_ON,
        });
    }
};

// set font size
export const setFontSize= (fontSize) => (dispatch) => {
    dispatch({
        type: SET_FONT_SIZE,
        fontSize
    });
};

// set mark line color
export const setLineColor= (lineColor) => (dispatch) => {
    dispatch({
        type: SET_LINE_COLOR,
        lineColor
    });
};
// set words list order
export const setWordsListOrder= (orderBy) => (dispatch) => {
    dispatch({
        type: SET_WORDS_LIST_ORDER,
        orderBy
    });
};

// set divide words order
export const setDivideWordsOrder= (orderBy) => (dispatch) => {
    dispatch({
        type: SET_DIVIDE_WORDS_ORDER,
        orderBy
    });
};