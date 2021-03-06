import React, {useEffect, useState, useRef, Fragment} from 'react';
import { connect } from 'react-redux'
import {
    TextField,
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    IconButton,
    Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import { login } from '../../store/actions/authActions'

const useStyles = makeStyles(theme => ({
    root:{
        color: '#ffffff',
    },
    field:{
        color: '#ffffff',
    },
    input: {
        width: '100%',
        marginBottom: '5px',
        color: '#ffffff',
    },
    btn:{
        marginBottom: '5px',
    }
}));


function Login(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        password: '',
        showPassword: false,
        msg: null
    });

    const ref = useRef();
    useEffect(()=>{
        const { error } = props;
        const prevProps = ref.current;
        ref.current = props;

        if(prevProps && error !== prevProps.error){
            // Check for sign up error
            if(error.id === 'LOGIN_FAIL'){
                console.log('Error: ', error);
                setState({
                    ...state,
                    msg: error.msg.msg
                });
            }else {
                setState({
                    ...state,
                    msg: null
                });
            }
        }
    },[props, state]);

    const handleChange = (e) => {
        setState({ ...state,
            [e.target.id]: e.target.value
        });
    };

    const handleClickShowPassword = () => {
        setState({ ...state,
            showPassword: !state.showPassword
        });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = state;

        const newUser = {
            username,
            email,
            password
        };

        // Attempt to sign up
        props.login(newUser);
    };
    return (
        <Fragment>
            <h2 className="logoLX">Login</h2><br/>
            {state.msg? <Alert severity="error"> {state.msg} </Alert> : null}
            <form className={classes.root} noValidate onSubmit={(handleSubmit )}>
                <TextField
                    id="email"
                    label="Email"
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.input
                    }}
                    className={classes.input}
                    onChange={handleChange}
                    variant="filled"
                />
                <FormControl className={classes.input} variant="filled">
                    <InputLabel className={classes.input} htmlFor="password">Password</InputLabel>
                    <FilledInput
                        id="password"
                        className={classes.input}
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.password}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    className={classes.input}
                                >
                                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button
                    id="submitSignUp"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.btn}
                >
                    Login
                </Button>
            </form>
        </Fragment>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(mapStateToProps,{ login })(Login);