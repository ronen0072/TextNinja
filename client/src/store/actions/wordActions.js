import axios from 'axios';
import {GET_WORD, SET_WORD_SYLLABLES} from './types';

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

export const setWordSyllables = (wordObj) => (dispatch, getState) =>{
    console.log('setWordSyllables: ', wordObj);
    const body = JSON.stringify({ wordObj });
    const config = {
        headers:{
            "content-type": 'application/json'
        }
    };
    axios.put('/api/words/syllables', body, config)
        .then((res) => {
            dispatch({
                type: SET_WORD_SYLLABLES,
                wordObj: wordObj
            });
        })
        .catch(error => {
            console.log(error);

        })
};