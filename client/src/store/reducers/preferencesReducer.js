import {
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
} from '../actions/types';

const initialState = {
    muted: localStorage.getItem('muted')? (localStorage.getItem('muted') === 'true') : false,
    breakDownToSyllables: localStorage.getItem('breakDownToSyllables')? (localStorage.getItem('breakDownToSyllables') === 'true') : true,
    markWord: localStorage.getItem('markWord')? (localStorage.getItem('markWord') === 'true') : true,
    markLine: localStorage.getItem('markLine')? (localStorage.getItem('markLine') === 'true') : true,
    lineColor: localStorage.getItem('lineColor')?localStorage.getItem('lineColor') : '#994288',
    fontSize: localStorage.getItem('fontSize')? localStorage.getItem('fontSize') : 16,
    wordsListOrder:  localStorage.getItem('wordsListOrderBy')? localStorage.getItem('wordsListOrderBy') : 'time',
    divideWordsOrder:  localStorage.getItem('divideWordsOrderBy')? localStorage.getItem('divideWordsOrderBy') : 'time'
};

export default function (state = initialState, action) {
    switch(action.type){
        case MUTED_ON:
        case MUTED_OFF:
            localStorage.setItem('muted', !state.muted);
            return{
                ...state,
                muted: !state.muted
            };
        case BREAK_DOWN_TO_SYLLABLES_ON:
        case BREAK_DOWN_TO_SYLLABLES_OFF:
            localStorage.setItem('breakDownToSyllables', !state.breakDownToSyllables);
            return{
                ...state,
                breakDownToSyllables: !state.breakDownToSyllables
            };
        case MARK_WORD_ON:
        case MARK_WORD_OFF:
            localStorage.setItem('markWord', !state.markWord);
            return{
                ...state,
                markWord: !state.markWord
            };
        case MARK_LINE_ON:
        case MARK_LINE_OFF:
            localStorage.setItem('markLine', !state.markLine);
            return{
                ...state,
                markLine: !state.markLine
            };
        case SET_FONT_SIZE:
            localStorage.setItem('fontSize', action.fontSize);
            return{
                ...state,
                fontSize: action.fontSize
            };
        case SET_LINE_COLOR:
            localStorage.setItem('lineColor', action.lineColor);
            return{
                ...state,
                lineColor: action.lineColor
            };
        case SET_WORDS_LIST_ORDER:
            localStorage.setItem('wordsListOrderBy', action.orderBy);
            return{
                ...state,
                wordsListOrder: action.orderBy
            };
        case SET_DIVIDE_WORDS_ORDER:
            localStorage.setItem('divideWordsOrderBy', action.orderBy);
            return{
                ...state,
                divideWordsOrder: action.orderBy
            };
        default:
            return state;

    }
}