import React, {Fragment, useEffect, useState} from 'react';
import {Container, Checkbox, Fab, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {getUserWords, deleteUserWords} from "../../store/actions/userWordsActions";
import Alert from "@material-ui/lab/Alert/Alert";
import TextNinjaHOC from "../textNinja tool/TextNinjaHOC";
import Word from "../textNinja tool/Word";
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
    const [order, setOrder] = useState('time');
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
    ,[wordsToPractice, props.userWords]);
    const handleChangeOrder = (e) =>{
        if(order !== e.target.value){
            localStorage.setItem('orderBy', e.target.value);
            setOrder(e.target.value);
            let newWordsToPractice = wordsToPractice;
            if(e.target.value === 'difficulty'){
                newWordsToPractice.sort(compare);
                setWordsToDelete(newWordsToPractice);
            }
            else{
                props.getUserWords();
            }
        }

    };
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
                {wordsToPractice && wordsToPractice.map( (word)=>{
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
    return (
        <Container maxWidth="xl">
            <Grid container className={'content'}>
                <h3 className='title'>Words List</h3>
                <Grid item className='inner-content'>
                    {(wordsToPractice.length > 0)?
                        <Fragment>
                            {displayWords()}
                            {deleteButton()}
                        </Fragment>
                        :
                        <Alert severity="info">There are currently no words to practice!</Alert>
                    }
                </Grid>
                <Grid item className='wrap-settings'>
                    <Tools
                        settingsOptions = {{
                            fontSizeOption: true,
                            syllablesOption: true,
                            markWordOption: true,
                            orderOption: true,
                        }}
                        changeOrder = {handleChangeOrder}
                        volumeOption={true}
                        mutedFun={props.mutedFun}
                        toggleChapterToSyllables={props.toggleChapterToSyllables}
                        toggleMarkWord = {props.toggleMarkWord}
                        toggleMarkLine = {props.toggleMarkLine}
                        setFontSize = {props.setFontSize}
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
    messages: state.messages
});
export default connect(mapStateToProps,{ getUserWords, deleteUserWords })(TextNinjaHOC(WordsList));