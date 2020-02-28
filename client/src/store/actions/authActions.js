import axios from 'axios';

import { returnErrors } from './errorActions'
import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from './types';

// Check token & load user
export const loadUser = (token) => (dispatch, getState) =>{
    // User loading
    dispatch({ type: USER_LOADING });
    axios.get('/auth/user', tokenConfig(getState().auth.token))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        });
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status,));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

// Sign up User
export const signUp = ({ username, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, email, password });
    axios.post('auth/signup', body, config)
        .then(res=>dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL'));
            dispatch({
                type: SIGNUP_FAIL
            });
        });
};

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

// Login User
export const login =({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('auth/login', body, config)
        .then(res=>dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};
// Login User
export const loginWith =(token) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.get('/auth/user', tokenConfig(token))
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: res.data.user, token},
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status,));
            dispatch({
                type: AUTH_ERROR
            });
        });

};

// Setup config/headers and token
export const tokenConfig = (token) => {

    // Headers
    const config = {
        headers:{
            "content-type": 'application/json'
        }
    };

    // If token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
};
