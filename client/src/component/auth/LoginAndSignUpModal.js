import React, {useState, Fragment, useEffect} from 'react';

import { connect } from 'react-redux'

import {
    Modal,
    Backdrop,
    Grid,
    Fade,
    Button
} from '@material-ui/core';

import {makeStyles} from "@material-ui/core/styles";
import { clearErrors } from '../../store/actions/errorActions'
import AuthWith from "./AuthWith";
import SignUp from "./SignUp";
import Login from "./Login";

const useStyles = makeStyles(theme => ({
    root:{
        color: '#ffffff',
    },
    nuvLink:{
        lineHeight: '2rem',
        paddingTop: '1.5rem'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        width: 'calc(250px + 30%)',
        minWidth: '250px'
    },
    local:{
        backgroundColor: '#313033',
        color: '#ffffff',
        padding: theme.spacing(2, 4, 3),
    },
}));


function LoginAndSignUpModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        loginMod: true
    });
    useEffect(()=>{
        if(open){
            if(props.isAuthenticated){
                toggleModal()
            }
        }
    });
    const toggleModal = () => {
        // Clear error
        props.clearErrors();
        setState({
            loginMod: true
        });
        setOpen(!open);
    };

    const toggleMod = ()=>{
        setState({
            loginMod: !state.loginMod
        });
    };
    return (
        <Fragment>
            {props.children?
                <div onClick={toggleModal}>
                    {props.children}
                </div>
                :
                <Button
                    onClick={toggleModal}
                    className={classes.nuvLink}
                    color="inherit">
                    Login
                </Button>
            }

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={toggleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Grid container className={classes.paper}>
                        <Grid item xs={12} sm={6} md={6} className={classes.local}>
                            {state.loginMod? <Login/> : <SignUp/>}
                            Already have an account?<Button onClick={toggleMod} color="primary"> { state.loginMod? 'Sign Up' : 'Login' } </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <AuthWith/>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </Fragment>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(mapStateToProps,{ clearErrors })(LoginAndSignUpModal);