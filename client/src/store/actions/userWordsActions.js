
import axios from 'axios';
import {
    GET_USER_WORDS,
    ADD_USER_WORD,
    DELETE_USER_WORDS,
    INCREASE_WORD_DIFFICULTY,
    DECREASE_WORD_DIFFICULTY,
} from './types';
import {tokenConfig} from "./authActions";
// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

export const getUserWords = () => (dispatch, getState) =>{
    //return new Promise(function(resolve, reject) {
        axios.get('/api/user/words',  tokenConfig(getState().auth.token))
        .then((res) => {
            console.log('geUserWords: ',res);
            dispatch({
                type: GET_USER_WORDS,
                payload: res.data
            });
            //resolve(res.data.words);
        })
        .catch(error => {
           console.log(error);
           //reject(error);
        })
    //});
};
export const deleteUserWords = (wordsToDelete) => (dispatch, getState) =>{
    console.log('wordsToDelete: ', `/api/user/words/[${wordsToDelete}]`);

     axios.delete(`/api/user/words/${wordsToDelete}`, tokenConfig(getState().auth.token))
        .then((res) => {
            dispatch({
                type: DELETE_USER_WORDS,
                wordsToDelete: wordsToDelete
            });
        })
        .catch(error => {
            console.log(error);
        })
};
export const addUserWords = (wordObj) => (dispatch, getState) =>{
    let word_id = wordObj._id;
    const body = JSON.stringify({ wordObj });
    axios.put(`/api/user/words/${word_id}`, body, tokenConfig(getState().auth.token))
        .then((res) => {
            dispatch({
                type: ADD_USER_WORD,
                wordObj: wordObj
            });
        })
        .catch(error => {
            console.log(error);

        })
};

export const incDifficultyUserWords = (wordObj) => (dispatch, getState) =>{
    let word_id = wordObj._id;
    setDifficultyUserWords(word_id, 'inc', dispatch, getState);
};
export const decDifficultyUserWords = (wordObj) => (dispatch, getState) =>{
    let word_id = wordObj._id;
    setDifficultyUserWords(word_id, 'dec', dispatch, getState);
};
const setDifficultyUserWords = (word_id, method, dispatch, getState) =>{
    console.log('setDifficultyUserWords: ', word_id, method);
    axios.put(`/api/user/words/difficulty/${word_id}/${method}`, null, tokenConfig(getState().auth.token))
        .then((res) => {
            dispatch({
                type: ((method === 'inc')? INCREASE_WORD_DIFFICULTY : DECREASE_WORD_DIFFICULTY),
                payload: res.data,
            });
        })
        .catch(error => {
            console.log(error);
        })
};