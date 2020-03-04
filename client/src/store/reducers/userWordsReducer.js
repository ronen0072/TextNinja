const initState = {
    userWords:[],
};
const wordReducer = (state = initState, action)=>{
    switch(action.type){
        case 'GET_USER_WORDS':
            console.log('GET_USER_WORDS', action.payload.words);
            return {
                ...state,
                userWords: [...action.payload.words]
            };
        case 'ADD_USER_WORD':
            let exist = true;
            for(let i = 0; i < state.userWords.length; i++){
                if(state.userWords[i]._id === action.wordObj._id)
                    exist = false;
            }
            return {
                ...state,
                userWords: exist? [...state.userWords, action.wordObj] : state.userWords
            };
        case 'DELETE_USER_WORDS':{
            let wordsToDelete = action.wordsToDelete;
            console.log('delete words', wordsToDelete);

            let userWords = state.userWords.filter((wordObj)=>{
                for(let i = 0; i < wordsToDelete.length; i++){
                    if(wordObj._id === wordsToDelete[i])
                        return false;
                }
                return true;
            });
            return {
                ...state,
                userWords:userWords
            };
        }
        case 'DECREASE_WORD_DIFFICULTY':
        case 'INCREASE_WORD_DIFFICULTY':{
            let userWords = state.userWords;
            userWords = userWords.map((wordObj)=> {
                if (action.payload.wordID === wordObj._id)
                    wordObj.difficulty = action.payload.difficulty;
                return wordObj;
            });
            return {
                ...state,
                userWords: userWords
            };
        }
        default:
            return state;
    }
};
export default wordReducer;