import { combineReducers} from "redux";
import wordReducer from './wordReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    word: wordReducer,
    error: errorReducer,
    auth: authReducer
})