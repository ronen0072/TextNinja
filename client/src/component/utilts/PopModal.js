import React, {useEffect, useState, Fragment} from 'react';
import {Modal, Backdrop, Grid, Icon, Fade} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {element} from "prop-types";
import index from "../../store/reducers";

const useStyles = makeStyles(theme => ({
    root:{
    },
    trigger:{
        padding: 0,
        margin: 0,
    },
    close:{
        marginLeft: 'auto',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius:'15px',
        border:' 2px solid #e1e1e1',
        margin: '0 auto !important',
        marginBottom: '2px !important',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: theme.shadows[5],
        width: 'calc(150px + 40%)',
        minWidth: '200px',

    },
    title:{
        marginTop: '5px'
    },
    wrapper:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px'
    },

}));

function PopModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <span className={classes.trigger}
                onClick={handleOpen}
            >
                {props.children[0]}
            </span>
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
                    <Grid container className={classes.paper}>
                        <Icon
                            onClick={handleClose}
                            className={classes.close}>
                            close
                        </Icon>
                        <Grid item md={12}>
                            <h3 className={classes.title +" title"}>{props.title}</h3>
                        </Grid>
                        {props.children.filter((element, index) =>{
                            return index > 0;
                        })}
                    </Grid>
                </Fade>
            </Modal>
        </Fragment>
    );
}
const mapStateToProps = (state) => ({
    // error: state.error,
    words: state.word.words,
});
export default PopModal;