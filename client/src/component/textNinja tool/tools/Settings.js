import React, {useEffect, useState} from 'react';
import { Grid, Icon, FormControl, Select, Input, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import PopModal from '../../utilts/PopModal';
import {makeStyles} from "@material-ui/core/styles";
import { SketchPicker } from 'react-color';
import Switcher from '../../utilts/Switcher';


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
    },
    label:{
        paddingLeft: '15px',
        paddingTop: '6px'
    },

}));

export default function Settings(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        iconStyle: classes.iconOnLeave,
        lineColor: '#ffffff'
    });
    useEffect(()=>{
        let fontSize = sessionStorage.getItem('fontSize');
        //console.log('sessionStorage.fontSize: ',fontSize);
        fontSize = (fontSize !== undefined)? fontSize : 18;
        setState({
            fontSize: fontSize
        });
    }, []);

    const handleOnMouseOver = () =>{
        setState({
            iconStyle: classes.iconOnOver
        });
    };

    const handleOnMouseLeave = () =>{
        setState({
            iconStyle: classes.iconOnLeave
        });

    };

    const handleChangeComplete = (color) => {
        sessionStorage.setItem('lineColor', color.hex);
        console.log('lineColor: ',state.lineColor);
        setState({ lineColor: color.hex });

    };


    return (
        <PopModal title='Settings'>
            <Icon
                title={'settings'}
                fontSize="large"
                className={"toolsIcon " + state.iconStyle}
                onMouseOver={handleOnMouseOver}
                onMouseLeave={handleOnMouseLeave}
            >
                {'settings'}
            </Icon>
            <Grid item md={12}>
                {props.syllablesOption &&
                     <Switcher
                         sx={12} sm={12} md={12}
                         label="Chapter the word into syllables:"
                         name="chapterToSyllables"
                         onChange={props.toggleChapterToSyllables}
                     />
                }
                {props.markWordOption &&
                    <Switcher
                        sx={12} sm={12} md={12}
                        label="Word reading highlight:"
                        name="markWord"
                        onChange={props.toggleMarkWord}
                    />
                }
                {props.fontSizeOption &&
                    <Grid container className={classes.section}>
                        <Grid item sx={4} sm={4} md={4} className={classes.label}>
                            Font size:
                        </Grid>
                        <Grid item sx={8} sm={8} md={8}>
                            <FormControl>

                                {/*<InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>*/}
                                <Select native defaultValue={sessionStorage.getItem('fontSize')}
                                        onChange={props.setFontSize} input={<Input id="grouped-native-select"/>}>
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
                }
                {props.markLineOption &&
                    <Switcher
                        sx={12} sm={7} md={7}
                        label="Line reading highlight:"
                        name="markLine"
                        onChange={props.toggleMarkLine}>
                        <Grid item sx={12} sm={5} md={5}>
                            {' Pick color'}
                            <SketchPicker
                                className={classes.sketchPicker}
                                color={state.lineColor}
                                onChangeComplete={handleChangeComplete}
                            />
                        </Grid>
                    </Switcher>
                }

                {props.orderOption &&
                    <Grid container className={classes.section}>
                        <FormControl component="fieldset" className={classes.label}>
                            <FormLabel component="legend">Order By</FormLabel>
                            <RadioGroup aria-label="Order By" name="Order By" value={localStorage.getItem('orderBy')} onChange={props.changeOrder}>
                                <FormControlLabel value="time" control={<Radio />} label="Time" />
                                <FormControlLabel value="difficulty" control={<Radio />} label="Difficulty" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                }
            </Grid>
        </PopModal>
    );
}