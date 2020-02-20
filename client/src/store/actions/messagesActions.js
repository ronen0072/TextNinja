import axios from 'axios';
import {returnErrors} from "./errorActions";
import{SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL} from './types';

export const sendMessage =({name, email, userMessage }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, userMessage });

    axios.post('api/contact', body, config)
        .then(res=>{
            const msg  =  res.data.msg;
            const status  =  res.status;
            dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: { msg, status }
        });
        })
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status, 'SEND_MESSAGE_FAIL' ));
            dispatch({
                type: SEND_MESSAGE_FAIL
            });
        });
};

