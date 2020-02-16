import React, {useEffect, useState, Fragment} from 'react';
import { Modal, Backdrop, Grid, Icon, Fade, FormControl, InputLabel, Select, Input,  } from '@material-ui/core';
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

export default function Settings(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        iconStyle: classes.iconOnLeave,
        lineColor: '#ffffff'
    });
    useEffect(()=>{
        let fontSize = sessionStorage.getItem('fontSize');
        console.log('sessionStorage.fontSize: ',fontSize);
        fontSize = (fontSize !== undefined)? fontSize : 18;
        setState({
            fontSize: fontSize
        });
    }, []);

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
        sessionStorage.setItem('lineColor', color.hex);
        console.log('lineColor: ',state.lineColor);
        setState({ lineColor: color.hex });

    };
    
    return (
        <Fragment>
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
                                 label="Chapter the word into syllables:"
                                 name="chapterToSyllables"
                                 onChange={props.toggleChapterToSyllables}
                             />
                            <Switcher
                                sx={12} sm={12} md={12}
                                label="Word reading highlight:"
                                name="markWord"
                                onChange={props.toggleMarkWord}
                            />
                            <Grid container className={classes.section}>
                                <Grid item sx={4} sm={4} md={4}>
                                    Font size:
                                </Grid>
                                <Grid item sx={8} sm={8} md={8}>
                                    <FormControl className={classes.formControl}>

                                        {/*<InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>*/}
                                        <Select native defaultValue={sessionStorage.getItem('fontSize')} onChange={props.setFontSize} input={<Input id="grouped-native-select" /> }>
                                            <option value={12}>12</option>
                                            <option value={14}>14</option>
                                            <option value={16}>16</option>
                                            <option value={18}>18</option>
                                            <option value={20}>20</option>
                                            <option value={22}>22</option>
                                            <option value={24}>24</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Switcher
                                sx={12} sm={7} md={7}
                                label="Line reading highlight:"
                                name="markLine"
                                onChange={props.toggleMarkLine}>
                                <Grid item sx={12} sm={5} md={5}>
                                    {' Pick color'}
                                    <SketchPicker
                                        className={classes.sketchPicker}
                                        color={ state.lineColor }
                                        onChangeComplete={ handleChangeComplete }
                                    />
                                </Grid>
                            </Switcher>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </Fragment>
    );
}