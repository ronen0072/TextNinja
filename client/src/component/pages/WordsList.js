import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Container, Grid, Checkbox, Fab} from "@material-ui/core";
import Send from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {getUserWords, deleteUserWords} from "../../store/actions/userWordsActions";
import Alert from "@material-ui/lab/Alert/Alert";
import TextNinjaHOC from "../textNinja tool/TextNinjaHOC";
import Word from "../textNinja tool/Word";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles(theme => ({
    error: {
        height: '60px',
    },
    icon: {
        marginBottom: '-5px',
    },
}));

function WordsList(props){
    const classes = useStyles();
    const [wordsToPractice, setWordsToPractice] = useState([]);
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [wordsToDelete, setWordsToDelete] = useState([]);
    const addToWordsToDelete = (id) =>{
        setWordsToDelete([...wordsToDelete, id]);
        setDeleteBtn(false);
    };
    const removeFromWordsToDelete = (_id) =>{
        let newWordToDelete =  wordsToDelete.filter((id)=>{return _id !== id});
        setWordsToDelete(newWordToDelete);
    };
    useEffect(()=>{
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
    const handleChange = (e) =>{
      if(e.target.checked){
          addToWordsToDelete(e.target.id);
      }
      else{
          removeFromWordsToDelete(e.target.id);
      }
    };
    const displayWords = () => {
        return (
            <span>
                {wordsToPractice && wordsToPractice.map( (word, index)=>{
                    return(
                        <div key={word._id}>
                            <Checkbox
                                id={word._id}
                                onChange={handleChange}
                            />
                            <Word
                                chapterToSyllables={props.chapterToSyllables}
                                markWord={props.markWord}
                                fontSize={props.fontSize}
                                onWordClick = {props.playFun}
                            >
                                {word.wordID}
                            </Word>  <br/>
                        </div>
                    )
                })}
            </span>
        );
    };
    const deleteButton = () =>{
        return (
            <Fragment>
                {!deleteBtn && (
                    <span
                        className='choose'
                        id='delete'
                        title= 'delete'
                        onClick={()=>setDeleteBtn(true)}>
                       <Icon
                           className={classes.icon}
                       >delete
                       </Icon>delete
                    </span>)
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
                               setDeleteBtn(false);}}>
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
///   deleteButton();
    return (
        <Container maxWidth="xl">
            <div className={'content'}>
                <h3 className="title">Words List</h3>
                {(wordsToPractice.length > 0)?
                    <Fragment>
                        {displayWords()}
                        {deleteButton()}
                    </Fragment>
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
export default connect(mapStateToProps,{ getUserWords, deleteUserWords })(TextNinjaHOC(WordsList));