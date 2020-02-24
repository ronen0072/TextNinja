const initState = {
    words:[],
};
const wordReducer = (state = initState, action)=>{
    switch(action.type){
        case 'GET_WORD':
            // console.log('get word', action.payload);
            return {
                ...state,
                words: [action.wordObj, ...state.words]
            };
        case 'GET_WORD_ERROR':
            console.log('get word error', action.err);
            return state;
        case 'SET_SYLLABLES':
            console.log('set syllables error', action.word);
            return state;
        case 'SET_SYLLABLES_ERROR':
            console.log('set syllables error', action.err);
            return state;
        default:
            return state;
    }
};
export default wordReducer;