import React, {useEffect, useState} from 'react';
import { Grid, Icon, FormControl, Select, Input, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import PopModal from '../../utilts/PopModal';
import {makeStyles} from "@material-ui/core/styles";
import { SketchPicker } from 'react-color';
import Switcher from '../../utilts/Switcher';
import {connect} from "react-redux";
import {
    toggleBreakDownToSyllables,
    toggleMarkWord,
    toggleMarkLine,
    setFontSize,
    setLineColor,
    setWordsListOrder,
    setDivideWordsOrder
} from "../../../store/actions/preferencesActions";


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
        display: 'block',
        color: '#59beee'
    },
    iconOnLeave: {
        display: 'block',
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

function Settings(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        iconStyle: classes.iconOnLeave,
        lineColor: '#ffffff'
    });
    const [divideWordsOrderDefaultValue, setDivideWordsOrderDefaultValue] = useState('time');
    const [wordsListOrderDefaultValue, setWordsListOrderDefaultValue] = useState('time');
    useEffect(()=>{
        setWordsListOrderDefaultValue(props.wordsListOrder);
        setDivideWordsOrderDefaultValue(props.divideWordsOrder);
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
        console.log('lineColor: ',color.hex);
        props.setLineColor(color.hex);
    };


    return (
        <PopModal title='Settings'>
            <Icon
                title={'settings'}
                fontSize="large"
                className={state.iconStyle + (props.displayInline? ' toolsIcon' : '')}
                onMouseOver={handleOnMouseOver}
                onMouseLeave={handleOnMouseLeave}
            >
                {'settings'}
            </Icon>
            <Grid item md={12}>

                {props.syllablesOption &&
                     <Switcher
                         sx={12} sm={12} md={12}
                         label="break down the word into syllables:"
                         name="breakDownToSyllables"
                         checked={props.breakDownToSyllables}
                         onChange={props.toggleBreakDownToSyllables}
                     />
                }

                {props.markWordOption &&
                    <Switcher
                        sx={12} sm={12} md={12}
                        label="Word reading highlight:"
                        name="markWord"
                        checked={props.markWord}
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
                                <Select native defaultValue={props.fontSize}
                                    onChange={(e)=>props.setFontSize(e.target.value)} input={<Input id="grouped-native-select"/>}>
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
                        checked={props.markLine}
                        onChange={props.toggleMarkLine}>
                        <Grid item sx={12} sm={5} md={5}>
                            {'Pick color'}
                            <SketchPicker
                                className={classes.sketchPicker}
                                color={props.lineColor}
                                onChangeComplete={handleChangeComplete}
                            />
                        </Grid>
                    </Switcher>
                }

                {props.wordsListOrderOption &&
                    <Grid container className={classes.section}>
                        <FormControl component="fieldset" className={classes.label}>
                            <FormLabel component="legend">Order By</FormLabel>
                            <RadioGroup
                                aria-label="Order By"
                                name="Order By"
                                defaultValue={wordsListOrderDefaultValue}
                                onChange={(e)=> props.setWordsListOrder(e.target.value)}
                            >
                                <FormControlLabel value="time" control={<Radio />} label="Time" />
                                <FormControlLabel value="difficulty" control={<Radio />} label="Difficulty" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                }

                {props.divideWordsOrderOption &&
                <Grid container className={classes.section}>
                    <FormControl component="fieldset" className={classes.label}>
                        <FormLabel component="legend">Order By</FormLabel>
                        <RadioGroup
                            aria-label="Order By"
                            name="Order By"
                            defaultValue={divideWordsOrderDefaultValue}
                            onChange={(e)=> props.setDivideWordsOrder(e.target.value)}
                        >
                            <FormControlLabel value="time" control={<Radio />} label="Time" />
                            <FormControlLabel value="difficulty" control={<Radio />} label="Difficulty" />
                            <FormControlLabel value="dynamic" control={<Radio />} label="Dynamic" />
                            <FormControlLabel value="random" control={<Radio />} label="Random" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                }
            </Grid>
        </PopModal>
    );
}
const mapStateToProps = (state) => ({
    muted: state.preferences.muted,
    breakDownToSyllables: state.preferences.breakDownToSyllables,
    markWord: state.preferences.markWord,
    fontSize: state.preferences.fontSize,
    wordsListOrder: state.preferences.wordsListOrder,
    divideWordsOrder: state.preferences.divideWordsOrder,
});
export default connect(mapStateToProps,{
    toggleBreakDownToSyllables,
    toggleMarkWord,
    toggleMarkLine,
    setFontSize,
    setLineColor,
    setWordsListOrder,
    setDivideWordsOrder,
})(Settings);