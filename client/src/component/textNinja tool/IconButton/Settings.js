import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    iconOnOver: {
        color: '#59beee'
    },
    iconOnLeave: {
        color: '#d9dad6'
    }
}));

export default function Settings() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        iconStyle: classes.iconOnLeave
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setState({
            iconStyle: classes.iconOnLeave
        });
        setOpen(false);
    };

    const handleOnMouseOver = () =>{
        setState({
            iconStyle: classes.iconOnOver
        });
    };

    const handleOnMouseLeave = () =>{

    };

    return (
        <div>
            <Icon
                title={'settings'}
                fontSize="large"
                className={state.iconStyle}
                onClick={handleOpen}
                onMouseOver={handleOnMouseOver}
                onMouseLeave={handleOnMouseLeave}
            >
                {'settings'}
            </Icon>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Settings</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}