
import axios from 'axios';
import { GET_WORD, SET_SYLLABLES} from './types';
// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

export const getWord = word => (dispatch, getState) =>{
    return new Promise(function(resolve, reject) {
        axios.get(`/api/words/${word}`)
        .then((res) => {
            //console.log(res);
            let wordObj = res.data;
            delete wordObj.type;
            dispatch({
                type: GET_WORD,
                wordObj: wordObj
            });
            resolve(wordObj);
        })
        .catch(error => {
           console.log(error);
            reject(error);
        })

    });
};
