import React, {useState} from 'react';
import { Modal, Backdrop, Grid, Icon, Fade } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { SketchPicker } from 'react-color';
import Switcher from './Switcher';


const useStyles = makeStyles(theme => ({
    root:{
    },
    section:{
        padding: '10px 5%',
        borderTop:' 1px solid rgb(238, 238, 238)',
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
        padding: theme.spacing(2, 4, 3),
        width: 'calc(250px + 30%)',
        minWidth: '250px'
    },
    iconOnOver: {
        color: '#59beee'
    },
    iconOnLeave: {
        color: '#d9dad6'
    },
    subTitle:{
        margin: '5px 0 5px 0',
    },
    sketchPicker:{
        width: 'auto !important',
        maxWidth: '300px',
        padding: '0 !important',
        borderRadius: '0 !important',
        boxShadow:' rgba(0, 0, 0, 0.15) 0px 0px 0px 0px, rgba(0, 0, 0, 0.15) 0px 0px 0px !important'
    }
}));

export default function Settings() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        iconStyle: classes.iconOnLeave,
        background: '#fff'
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
        if(!open){
            setState({
                iconStyle: classes.iconOnLeave
            });
        }
    };

    const handleChangeComplete = (color) => {
        setState({ background: color.hex });
    };

    return (
        <span>
            <Icon
                title={'settings'}
                fontSize="large"
                className={"toolsIcon " + state.iconStyle}
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
                    <Grid container className={classes.paper}>
                        <Grid item md={12}>
                            <h2 id="transition-modal-title">Settings</h2>
                            <Switcher
                                sx={12} sm={12} md={12}
                                label="Highlight the word when mouse moves over it"
                                name="markWord"
                                onChange={()=>{console.log("onChange")}}
                                />
                            <Switcher
                                sx={12} sm={5} md={5}
                                label="mark line"
                                name="markLine"
                                onChange={()=>{console.log("onChange")}}>
                                <Grid item sx={12} sm={5} md={5}>
                                    {' Pick color'}
                                    <SketchPicker
                                        className={classes.sketchPicker}
                                        color={ state.background }
                                        onChangeComplete={ handleChangeComplete }
                                    />
                                </Grid>
                            </Switcher>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </span>
    );
}