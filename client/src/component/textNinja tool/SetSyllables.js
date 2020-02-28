import React, {useEffect, useState, Fragment} from 'react';
import {Backdrop, Grid, Icon, FormControl, Select, Input, Container, Button,} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import PopModal from '../utilts/PopModal';
import WordDivision from '../utilts/WordDivision'
import {connect} from "react-redux";
import { setWordSyllables } from "../../store/actions/wordActions";
import TextNinjaHOC from "./TextNinjaHOC";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles(theme => ({
    wrapper:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));

function SetSyllables(props) {
    const classes = useStyles();
    const [wordDivision, setWordDivision] = useState({});
    const [wordObj, setWordObj] = useState({});

    useEffect(()=>{
    }, []);
    useEffect(()=>{
        if(!wordObj || wordObj._id !== props.word_id)
            setWordObj(props.words.find(wordObj => (wordObj._id === props.word_id)));
    });
    const CreateNewWordObj = () =>{
       return new Promise(function(resolve, reject) {
            let newWordObj = wordObj;
            wordObj.syllables = wordDivision;

           console.log('NewWordObj: ', newWordObj);
           resolve(newWordObj);
        });
    };

    const handleSubmit = () => {
        CreateNewWordObj().then((resolve) => {
            console.log('handleSubmit: ', resolve);
            setWordObj(resolve);
            props.setWordSyllables(resolve);
        }).catch((err) => {
            console.log('handleSubmit: ', err);
        })
    };
    
    return (
        <PopModal
            title='Set Syllables'>
            Set Syllables
            <Grid item md={12} className={classes.msg}>
                {false && <Alert severity="success">You're right, well done!!!</Alert>}
                {false && <Alert severity="error">You are wrong. Keep practice!</Alert>}
            </Grid>
            <Grid item md={12} className={classes.wrapper}>
                <WordDivision
                    onChange={setWordDivision}
                    fontSize={props.fontSize}
                    word = {props.word}
                />
            </Grid>
            <Grid item md={12} className={classes.wrapper}>
                <Button
                    className='choose'
                    id='submit'
                    title= 'submit'
                    onClick={()=>{handleSubmit()}}
                >
                    submit
                </Button>
            </Grid>
        </PopModal>
    );
}
const mapStateToProps = (state) => ({
    // error: state.error,
    words: state.word.words,
});
export default connect(mapStateToProps,{ setWordSyllables })(TextNinjaHOC(SetSyllables));