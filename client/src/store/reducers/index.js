import { combineReducers} from "redux";
import wordReducer from './wordReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import messagesReducer from './messagesReducer';
import userWordsReducer from './userWordsReducer';

export default combineReducers({
    word: wordReducer,
    error: errorReducer,
    auth: authReducer,
    messages: messagesReducer,
    userWords: userWordsReducer,
})