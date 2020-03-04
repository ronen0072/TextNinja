import React, {Fragment, useEffect, useState} from 'react';
import {Container, Button, Fab} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {getUserWords, deleteUserWords, incDifficultyUserWords, decDifficultyUserWords} from "../../store/actions/userWordsActions";
import Alert from "@material-ui/lab/Alert/Alert";
import TextNinjaHOC from "../textNinja tool/TextNinjaHOC";
import WordDivision from "../utilts/WordDivision";
import Icon from "@material-ui/core/Icon";
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
    const [wordIndex, setWordIndex] = useState(0);
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
    useEffect(()=>{
            setWordsToPractice(props.userWords);
            console.log('props.userWords: ',props.userWords);
            props.getUserWords();
        },
        []
    );
    useEffect(()=>{
            if(wordsToPractice !== props.userWords)
                setWordsToPractice(props.userWords);
        }
    );

    const handleSubmit = () =>{
        let word = wordsToPractice[wordIndex];
        console.log('wordDivision: ', wordDivision);
        console.log('word.syllables: ', word.syllables);
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
    const displayWord = () => {
        let word = wordsToPractice[wordIndex] ;
        return (
            <WordDivision
                onChange={setWordDivision}
                fontSize={props.fontSize}
                word =  {word.wordID}
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
        <Container maxWidth="xl" className={classes.root}>
            <div className={'content'}>
                <h3 className="title">Divide Words</h3>
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
                            onClick={()=>{setWordIndex(wordIndex + 1)}}>
                            next
                            <Icon>forward</Icon>
                        </Button>
                    </div>
                    :
                    <Alert severity="info">There are currently no words to practice!</Alert>
                }

            </div>
        </Container>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token,
    userWords: state.userWords.userWords,
    error: state.error,
    messages: state.messages
});
export default connect(mapStateToProps,{ getUserWords, deleteUserWords, incDifficultyUserWords, decDifficultyUserWords })(TextNinjaHOC(DivideWords));