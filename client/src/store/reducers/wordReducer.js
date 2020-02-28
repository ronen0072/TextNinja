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
        case 'SET_WORD_SYLLABLES':
            const wordObj = action.wordObj;
            console.log('set syllables', action);
            let newWords = state.words.filter((word)=>{
                return word._id !== wordObj._id
            });

            console.log('set syllables', {...wordObj,  updateIn: new Date()});
            return {
                ...state,
                words: [{...wordObj,  updateIn: new Date()}, ...newWords],
            };
            return state;
        case 'SET_SYLLABLES_ERROR':
            console.log('set syllables error', action.err);
            return state;
        default:
            return state;
    }
};
export default wordReducer;