import React, {Fragment, useEffect, useState} from 'react';
import {Container, Button, Fab, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {getUserWords, deleteUserWords, incDifficultyUserWords, decDifficultyUserWords} from "../../store/actions/userWordsActions";
import Alert from "@material-ui/lab/Alert/Alert";
import WordDivision from "../utilts/WordDivision";
import Icon from "@material-ui/core/Icon";
import Tools from "../textNinja tool/tools";

function compare( a, b ) {
    if ( a.difficulty < b.difficulty ){
        return -1;
    }
    if ( a.difficulty > b.difficulty ){
        return 1;
    }
    return 0;
}

const useStyles = makeStyles(theme => ({
    root:{
      height: '75vh',
    },
    error: {
        height: '60px',
    },
    next:{
        marginLeft: 'auto',
    },
    msg:{
        height: '50px',
    },
}));

function DivideWords(props){
    const classes = useStyles();
    const [order, setOrder] = useState(null);
    const [wordIndex, setWordIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(props.userWords && props.userWords.length);
    const [indexUp, setIndexUp] = useState(0);
    const [indexDown, setIndexDown] = useState(0);
    const [resetIndex, setResetIndex] = useState(false);
    const [wordsToPractice, setWordsToPractice] = useState([]);
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [wordsToDelete, setWordsToDelete] = useState([]);
    const [wordDivision, setWordDivision] = useState({});
    const [failMsg, setFailMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    const addToWordsToDelete = (id) =>{
        setWordsToDelete([...wordsToDelete, id]);
        setDeleteBtn(false);
    };
    const setNextIndex = (reset) =>{
        switch(props.divideWordsOrder) {
            case 'time':
            case 'difficulty':
                return simplePolicy(reset);
            case 'random':
                return randomPolicy(reset);
            case 'dynamic':{
                return dynamicPolicy(reset);
            }
            default:
                return simplePolicy(reset);
        }
    };
    const simplePolicy = (reset = false)=>{
        if(resetIndex || reset){
            setWordIndex(0);
            setResetIndex(false);
        }
        else
            setWordIndex(wordIndex+1);
    };
    const randomPolicy = (reset = false)=>{
        if(resetIndex || reset){
            let newWordsToPractice = [...props.userWords];
            let tamp =  newWordsToPractice[wordIndex];
            newWordsToPractice[wordIndex] = newWordsToPractice[lastIndex];
            newWordsToPractice[lastIndex] = tamp;
            setWordsToPractice(newWordsToPractice);
            setLastIndex(lastIndex-1);
            setResetIndex(false);
        }
        setWordIndex(Math.floor(Math.random() * lastIndex));
    };
    const dynamicPolicy = (reset = false)=>{
        if(resetIndex || reset){
            const index = Math.floor(props.userWords.length/2);
            setWordIndex(index);
            setIndexUp(index+1);
            setIndexDown(index-1);
            setResetIndex(false);
        }else{
            if(successMsg){
                setWordIndex(indexUp);
                if (indexUp < props.userWords.length){
                    setIndexUp(indexUp+1);
                }
                else {
                    setIndexUp(0);
                }
            }
            else{
                setWordIndex(indexDown);
                if(indexDown > 0){
                    setIndexDown(indexDown-1);
                }
                else{
                    setIndexDown(Math.floor(props.userWords.length/2));
                }


            }
        }
    };

    const handleSubmit = () =>{
        let word = wordsToPractice[wordIndex];
        let ans = true;
        if(word.syllables.count !== wordDivision.count)
            ans = false;

        for(let i = 0; (ans && i<word.syllables.count); i++){
            ans = (word.syllables.list[i] === wordDivision.list[i]);
        }
        if(ans){
            setSuccessMsg(ans);
            setFailMsg(!ans);
            setTimeout(() => setSuccessMsg(null), 5000);
            props.decDifficultyUserWords(wordsToPractice[wordIndex]);
        }else{
            setFailMsg(!ans);
            setSuccessMsg(ans);
            setTimeout(() => setFailMsg(null), 5000);
            props.incDifficultyUserWords(wordsToPractice[wordIndex]);
        }
        setTimeout(() => setWordIndex(wordIndex + 1), 3000);
    };
    useEffect(()=>{
            setWordsToPractice(props.userWords);
            props.getUserWords();
        },
        [props.getUserWords]
    );

    useEffect(
        ()=>{
            if(props.userWords && (wordsToPractice.length !== props.userWords.length || props.divideWordsOrder !== order)){
                let newWordsToPractice = [...props.userWords];
                if(props.divideWordsOrder === 'difficulty' || props.divideWordsOrder === 'dynamic' ){
                    newWordsToPractice.sort(compare);
                    setWordsToPractice(newWordsToPractice);
                    setResetIndex(true);
                    setNextIndex(true);
                }
                setWordsToPractice(newWordsToPractice);
                setLastIndex(newWordsToPractice.length-1);
            }
            if(props.divideWordsOrder !== order) {
                setOrder(props.divideWordsOrder);
                setResetIndex(true);
                setNextIndex(true);
            }
        }
        ,[props.userWords, props.divideWordsOrder, order, wordsToPractice.length]
    );


    const displayWord = () => {
        let word = wordsToPractice[wordIndex] ;
        if(word)
            return (
                <WordDivision
                    onChange={setWordDivision}
                    word =  {word.wordID}
                    audioURL = {word.soundURL}
                />
            );
    };
    const deleteButton = () =>{
        return (
            <Fragment>
                {!deleteBtn && (
                    <Button
                        className='choose'
                        id='delete'
                        title= 'delete'
                        onClick={()=>{
                            addToWordsToDelete(wordsToPractice[wordIndex]._id);
                            setDeleteBtn(true)
                        }}>
                       <Icon>delete</Icon>delete
                    </Button>)
                }
                {(deleteBtn && wordsToDelete.length > 0) && (
                    <span
                        id="checkIfSafe"
                    >
                        Are you sure you want to delete?
                         <Fab
                             id='yes'
                             className='choose'
                             title='Yes'
                             aria-label="Yes"
                             onClick={()=>{
                                 props.deleteUserWords(wordsToDelete);
                                 setDeleteBtn(false);
                             }}>
                           <b>Yes</b>
                        </Fab>
                        <Fab
                            id='no'
                            className='choose'
                            title='No'
                            aria-label="No"
                            onClick={()=>setDeleteBtn(false)}>
                            <b>no</b>
                        </Fab>
                    </span>
                )}
                {(deleteBtn && wordsToDelete.length === 0)? //error msg
                    <div className={classes.error}>
                        <Alert severity="error"> you need to choose at least ono word</Alert>
                    </div>
                    : null
                }
            </Fragment>
        )
    };

    return (
        <Container maxWidth="xl">
            <Grid container className={'content'}>
                <h3 className='title'>Divide Words</h3>
                <Grid item className='inner-content'>
                    {(wordsToPractice.length > 0)?
                        <div align="center">
                            <div className={classes.msg}>
                                {successMsg && <Alert severity="success">You're right, well done!!!</Alert>}
                                {failMsg && <Alert severity="error">You are wrong. Keep practice!</Alert>}
                            </div>
                            {displayWord()}
                            {deleteButton()}
                            <Button
                                className='choose'
                                id='submit'
                                title= 'submit'
                                onClick={()=>{handleSubmit()}}>
                                submit
                            </Button>
                            <Button
                                className='choose'
                                id='next'
                                title= 'next'
                                onClick={setNextIndex}>
                                next
                                <Icon>forward</Icon>
                            </Button>
                        </div>
                        :
                        <Alert severity="info">There are currently no words to practice!</Alert>
                    }

                </Grid>
                <Grid item className='wrap-settings'>
                    <Tools
                        settingsOptions = {{
                            divideWordsOrderOption: true,
                        }}
                        volumeOption={true}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token,
    userWords: state.userWords.userWords,
    error: state.error,
    messages: state.messages,
    divideWordsOrder: state.preferences.divideWordsOrder,
});
export default connect(mapStateToProps,{ getUserWords, deleteUserWords, incDifficultyUserWords, decDifficultyUserWords })(DivideWords);