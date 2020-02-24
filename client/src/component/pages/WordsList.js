import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Container, Grid, Checkbox} from "@material-ui/core";
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
        height: '50px',
    },
    icon: {
        marginBottom: '-5px',
    },
    sendButton: {
        marginLeft: 'calc(50% - 40px)',
    },
    userMessage: {
        marginTop: '40px',
        marginBottom: '40px',
        width: '100%',
        height:'200px',
        fontSize: 'inherit'
    },
    input: {
        width: '100%',
        fontSize: 'inherit'
    },
    innerContent: {
        margin: '30px',
        width: 'auto'
    }
}));

function WordsList(props){
    const classes = useStyles();
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
    // useEffect(()=>{
    //         console.log('props.userWords: ',props.userWords);
    //     },
    // );
    const handleChange = (e) =>{
      if(e.target.checked){
          addToWordsToDelete(e.target.id);
      }
      else{
          removeFromWordsToDelete(e.target.id);
      }
    };
    const displayWords = () => {
        //console.log('displayWords: ',props.userWords);
        return (
            <span>
                    {props.userWords && props.userWords.map( (word, index)=>{
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
        )
    };
    const deleteWords = () =>{

    };

    return (
        <Container maxWidth="xl">
            <div className={'content'}>
                <h3 className="title">Words List</h3>
                {displayWords()}
                {(deleteBtn && wordsToDelete.length > 0) && (
                <span
                    id="checkIfSafe"
                >
                    Are you sure you want to delete?
                    <span
                        className="choose"
                        id='yes'
                        title='Yes'
                        onClick={()=>{
                            props.deleteUserWords(wordsToDelete);
                            setDeleteBtn(false);
                        }}>
                        Yes
                    </span>
                    <span
                        className='choose'
                        id='no'
                        title='No'
                        onClick={()=>setDeleteBtn(false)}>
                        No
                    </span>
                </span>
                )}
                { !deleteBtn && (
                    <span
                    className='choose'
                    id='delete'
                    title= 'delete'
                    onClick={()=>setDeleteBtn(true)}>
                   <Icon
                         className={classes.icon}
                   >delete
                   </Icon>delete
                </span>)}
                {(deleteBtn && wordsToDelete.length === 0)? <Alert severity="error"> you need to choose at least ono word</Alert> : null}
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