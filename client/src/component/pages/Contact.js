import React, {useEffect, useRef, useState} from 'react';
import {Container, Grid, Fab, TextField} from "@material-ui/core";
import Send from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {sendMessage} from "../../store/actions/messagesActions";
import Alert from "@material-ui/lab/Alert/Alert";
import TextNinjaHOC from "../textNinja tool/TextNinjaHOC";
const useStyles = makeStyles(theme => ({
    error: {
        height: '50px',
    },
    sendIcon: {
        marginLeft: '10px',
    },
    sendButton: {
        marginLeft: 'calc(50% - 40px)',
    },
    userMessage: {
        marginTop: '40px',
        marginBottom: '40px',
        width: '100%',
        height:'200px',
        fontSize: 'inherit'
    },
    input: {
        width: '100%',
        fontSize: 'inherit'
    },
    innerContent: {
        margin: '30px',
        width: 'auto'
    }
}));

function Contact(props){
    const classes = useStyles();
    const [state, setState] = useState({
        name: '',
        email: '',
        userMessage: '',
        errorMsg: null,
        successMsg: null
    });

    const ref = useRef();
    useEffect(()=>{
        const { error, messages } = props;
        const prevProps = ref.current;
        ref.current = props;

        if(prevProps && error !== prevProps.error){
            // Check for sign up error

            if(error.id === 'SEND_MESSAGE_FAIL'){
                console.log('Error: ', error);
                setState({
                    ...state,
                    errorMsg: error.msg.msg,
                    successMsg: null
                });
            }else {
                setState({
                    ...state,
                    errorMsg: null
                });
            }
        }
        if(prevProps && messages !== prevProps.messages){
            // Check for sign up error

            if(messages.status === 200){
                console.log('messages: ', messages);
                setState({
                    ...state,
                    successMsg: messages.msg,
                    errorMsg: null
                });
            }else {
                setState({
                    ...state,
                    successMsg: null
                });
            }
        }
    },[props, state]);
    const handleChange = (e) => {
        setState({ ...state,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        const { name, email, userMessage } = state;

        const messageData = {
            name,
            email,
            userMessage
        };

        console.log('new messageData: ', messageData);
        // Attempt to sign up
        props.sendMessage(messageData);

        // Close the modal
        //handleClose();
    };
    return (
        <Container maxWidth="xl">
            <div className={'content'}>
                <h3 className="title">Contact Us</h3>
                <form onSubmit={handleSubmit} style={{fontSize: props.fontSize+'px'}}>
                    <Grid container className={classes.innerContent}>
                        <Grid item xs={12} className={classes.error}>
                            {state.errorMsg? <Alert severity="error"> {state.errorMsg} </Alert> : null}
                            {state.successMsg? <Alert severity="success"> {state.successMsg} </Alert> : null}
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes.inputWrap}>
                            <TextField
                                id="name"
                                label="name"
                                value={props.user? props.user.username : ''}
                                InputProps={{
                                    className: classes.input
                                }}
                                InputLabelProps={{
                                    className: classes.input
                                }}
                                className={classes.input}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} className={classes.inputWrap}>
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes.inputWrap}>
                            <TextField
                                id="email"
                                label="Email"
                                value={props.user? props.user.email : ''}
                                InputProps={{
                                    className: classes.input
                                }}
                                InputLabelProps={{
                                    className: classes.input
                                }}
                                className={classes.input}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <textarea
                                id="userMessage"
                                className={classes.userMessage} name="message"
                                placeholder="Write Us A Message"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Fab
                            variant="contained"
                            color={"primary"}
                            type="button"
                            className={classes.sendButton}
                            id="submitContactUs"
                            name="submit contact Us"
                            onClick={handleSubmit}
                        >
                            send  <Send className={classes.sendIcon}/>
                        </Fab>
                        <br/>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error,
    messages: state.messages
});
export default connect(mapStateToProps,{ sendMessage })(TextNinjaHOC(Contact));