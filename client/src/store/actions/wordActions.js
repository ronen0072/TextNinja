
import axios from 'axios';
import { GET_WORD, SET_SYLLABLES} from './types';
// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

// export const getWord = word => (dispatch, getState) => {
//     axios.get(`/api/words/${word}`)
//         .then(res =>{
//             console.log(res);
//             dispatch({
//                 type: GET_WORD,
//                 payload: res
//             })
//         })
//         // .catch(err =>
//         //     dispatch(returnErrors(err.response.data, err.response.status))
//         // );
// };
export const getWord = word => (dispatch, getState) =>{
    return new Promise(function(resolve, reject) {
        axios.get(`/api/words/${word}`)
        .then((res) => {
            console.log(res);
            dispatch({
                type: GET_WORD,
                payload: res
            });
            resolve(res);
        })
        // .catch(error => {
        //     // TBD: Handle errors for Redux
        //
        //     reject(error);
        // })

    });
};