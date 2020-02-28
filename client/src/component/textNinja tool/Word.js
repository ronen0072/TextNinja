
import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { getWord } from '../../store/actions/wordActions';
import { addUserWords } from '../../store/actions/userWordsActions';
import WordMenu from "./WordMenu";
import {MenuItem, MenuList} from "@material-ui/core";

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};
String.prototype.insertAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index);
};

class Word extends Component{
    state={
        word: "",
        syllables:"",
        numOfSyllables: 0,
        soundURL:"",
        display: "",
        styles: this.wordStyle(this.props.fontSize),
        wordPadding: {},
        wordObj: {},
        menuOpenPosition: null,
        menuOpen: false,
    };

    componentDidMount = ()=>{
        this.setState({
            ...this.state,
            word: this.props.children,
            display: this.props.children,
            fontSize: this.props.fontSize,
        });
        let word = this.props.words[this.props.words.findIndex( (element) => element.wordID === this.state.word)];
        if(word){
            this.createSyllables(word);
            this.createSoundURL(word);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.children !== this.state.word || this.props.fontSize !== this.state.fontSize){
            this.setState({
                ...this.state,
                word: this.props.children,
                display: this.props.children,
                fontSize: this.props.fontSize,
                styles: this.wordStyle(this.props.fontSize)
            });
        }
        const wordObj = this.props.words.find((wordObj) => {return wordObj._id === this.state.wordObj._id});
        if(wordObj && (wordObj.updateIn && !this.state.wordObj.updateIn) &&  (wordObj.updateIn > !this.state.wordObj.updateIn)) {
            this.updateWordObj(wordObj);
            this.createSyllables(wordObj);
        }
    }

    updateWordObj(wordObj){
        this.setState({
            wordObj:wordObj,
        });
    }

    wordPadding(){
        let amountOfSpace =  (this.state.numOfSyllables-1)*(this.props.fontSize)*0.1738;
        return {paddingLeft: amountOfSpace+'px',paddingRight:amountOfSpace+'px'};
    }
    setSyllables(syllables, numOfSyllables) {
        //console.log('setSyllables: ', syllables);
        this.setState({
            syllables: syllables,
            numOfSyllables: numOfSyllables,
        });
        this.setDisplay(true);
    }
    setSoundURL(soundURL) {
        this.setState({
            soundURL: soundURL
        });
    }

    setDisplay(isOver) {
        if(this.props.chapterToSyllables){
            if(isOver) {
                this.setState({
                    display: this.state.syllables,
                    wordPadding: {}
                });
            }
            else{
                this.setState({
                    display: this.state.word,
                    wordPadding: this.wordPadding()
                });
            }
        }
    }
    setStyles(isOver) {
        //console.log(this.state.styles);
        if(this.props.markWord){
            if(isOver) {
                this.setState({
                    styles: this.syllablesStyle(this.props.fontSize),
                });
            }
            else{
                this.setState({
                    styles: this.wordStyle(this.props.fontSize),
                });
            }
        }
    }

    calcLetterSpacing(fontSize){
        return ((fontSize/(-1.95)) + 9.56);
    };

    wordStyle(fontSize){
        return {
            fontSize: fontSize+ 'px',
            letterSpacing: this.calcLetterSpacing(fontSize),
            lineHeight: (parseInt(fontSize) + 6) + 'px',
            margin: 0
        }
    };

    syllablesStyle(fontSize){
        return{
            fontSize: (parseInt(fontSize) + 4)+'px',
            lineHeight: fontSize+'px',
            margin: 0
        }
    };

    switchBack(syllables){
        var word = this.state.word;
        var i,j;
        for(i = 0, j = 0; i<syllables.length; i++, j++){
            if((syllables.charAt(i) === '•') && !(word.charAt(j) === '•')) {
                i++;
            }
            if(syllables.charAt(i).toUpperCase() === word.charAt(j)){
                syllables = syllables.replaceAt(i, word.charAt(j));
            }
            if(!(syllables.charAt(i) === word.charAt(j))){
                syllables = syllables.insertAt(i, word.charAt(j));
            }
        }
        syllables = syllables.insertAt(syllables.length, word.substr(j));
        return syllables;
    }

    createSyllables(data){
        var syllables = '';
        console.log('createSyllables',data);
        for (var i = 0; i < data.syllables.count - 1; i++)
            syllables += data.syllables.list[i] + "•";
        syllables += data.syllables.list[data.syllables.count - 1];
        this.setSyllables(this.switchBack(syllables), data.syllables.count);
    }
    createSoundURL(data){
        this.setSoundURL(data.soundURL);
    }

    wordFactory(){
        let word = this.props.words[this.props.words.findIndex( (element) => element.wordID === this.state.word)];
        if(!word)
            word = this.props.userWords[this.props.userWords.findIndex( (element) => element.wordID === this.state.word)];

        //if the word already exists?
        if(word){
            this.setState({
                wordObj: word
            });
            this.createSyllables(word);
            this.createSoundURL(word);
        }
        else{
            this.props.getWord(this.state.word.toLowerCase())
                .then((wordObj)=>{
                    this.setState({
                       wordObj: wordObj
                    });
                    this.createSyllables(wordObj);
                    this.createSoundURL(wordObj);
                }
            );
        }
    }

    handleOnMouseOver = () => {
        if(!this.state.syllables || this.state.syllables === ""){
            this.wordFactory();
        }
        else{
            this.setDisplay(true)
        }
        this.setStyles(true);
    };

    handleOnBlur = () => {
        this.setDisplay(false);
        this.setStyles(false);
        this.setState({
            menuOpen: false
        });
    };

    handleOnClick = () => {
        this.props.onWordClick(this.state.soundURL);
        this.props.addUserWords(this.state.wordObj);
    };

    handleOnContextMenu = (e) => {
        e.preventDefault();

        this.setState({
            menuOpenPosition: {
                mouseX: e.clientX - 60,
                mouseY: e.clientY + 10,
            },
            menuOpen: true
        });
        console.log('handleOnContextMenu: ', window.getSelection().toString().replace(/\•/g, ""));
    };

    render(){
        return (
            <Fragment>
                <b
                    onMouseOver={this.handleOnMouseOver}
                    onTouchStart={this.handleOnMouseOver}
                    onMouseOut={this.handleOnBlur}
                    onTouchEnd={this.handleOnBlur}
                    onClick={this.handleOnClick}
                    onContextMenu={this.handleOnContextMenu}
                    style={{...this.state.wordPadding ,...this.state.styles}}
                >
                    {this.state.display + " "}
                </b>
                <WordMenu
                    open={this.state.menuOpen}
                    openPosition={this.state.menuOpenPosition}
                    word={this.state.wordObj.wordID}
                    word_id={this.state.wordObj._id}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        words: state.word.words,
        userWords: state.userWords.userWords,
    };
};

export default connect(mapStateToProps,{ getWord, addUserWords })(Word);