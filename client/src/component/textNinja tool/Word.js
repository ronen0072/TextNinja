
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getWord } from '../../store/actions/wordActions';
import PropTypes from 'prop-types';
import wordReducer from "../../store/reducers/wordReducer";

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
        styles: this.wordStyle,
        wordPadding: {}

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
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps');
    //     this.setState({
    //         fontSize: nextProps.fontSize,
    //         styles: this.wordStyle()
    //     });
    // }
    // shouldComponentUpdate(nextProps) {
    //     console.log('shouldComponentUpdate1: ',nextProps);
    //     console.log('shouldComponentUpdate2: ',this.props);
    //
    //     if(nextProps.fontSize !== this.props.fontSize){
    //         this.render()
    //     }
    //
    //     return this.props !== nextProps;
    // }

    wordPadding(){
        let amountOfSpace =  (this.state.numOfSyllables-1)*(this.props.fontSize)*0.1738;
        return {paddingLeft: amountOfSpace+'px',paddingRight:amountOfSpace+'px'};
    }
    setSyllables(syllables, numOfSyllables) {
        this.setState({
            ...this.state,
            syllables: syllables,
            numOfSyllables: numOfSyllables,
        });
        this.setDisplay(true);
    }
    setSoundURL(soundURL) {
        this.setState({
            ...this.state,
            soundURL: soundURL
        });
    }
    setDisplay(isOver) {
        if(this.props.chapterToSyllables){
            if(isOver) {
                this.setState({
                    ...this.state,
                    display: this.state.syllables,
                    wordPadding: {}
                });
            }
            else{
                this.setState({
                    ...this.state,
                    display: this.state.word,
                    wordPadding: this.wordPadding()
                });
            }
        }
    }
    setStyles(isOver) {
        console.log(this.state.styles);
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
    calcLetterSpacing = (fontSize)=>{
        return ((fontSize/(-1.95)) + 9.56);
    };
    wordStyle(fontSize){
        return {
            fontSize: fontSize+ 'px',
            letterSpacing: this.calcLetterSpacing(fontSize),
            lineHeight: (parseInt(fontSize) + 4) + 'px',
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
            if((syllables.charAt(i) === '*') && !(word.charAt(j) === '*')) {
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
        //console.log('createSyllables',data);
        for (var i = 0; i < data.syllables.count - 1; i++)
            syllables += data.syllables.list[i] + "*";
        syllables += data.syllables.list[data.syllables.count - 1];

        this.setSyllables(this.switchBack(syllables.toLowerCase()), data.syllables.count);
    }
    createSoundURL(data){
        this.setSoundURL(data.soundURL);
        //console.log("createSoundURL: ",this.soundURL);
    }

    wordFactory(){
        let word = this.props.words[this.props.words.findIndex( (element) => element.wordID === this.state.word)];
        //console.log('wordIndex',word);
        //if the word already exists?
        if(word){
            this.createSyllables(word);
            this.createSoundURL(word);
        }
        else{
            this.props.getWord(this.state.word).then((res)=>{
                this.createSyllables(res.data);
                this.createSoundURL(res.data);
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
    };

    handleOnClick = () => {
        this.props.onWordClick(this.state.soundURL);
    };
    render(){
        return (
            <b
                onMouseOver={this.handleOnMouseOver}
                onTouchStart={this.handleOnMouseOver}
                onMouseOut={this.handleOnBlur}
                onTouchEnd={this.handleOnBlur}
                onClick={() => this.props.onWordClick(this.state.soundURL)}
                style={{...this.state.wordPadding ,...this.state.styles}}
            >
                {this.state.display + " "}
            </b>
        );
    }
}
//
const mapStateToProps = (state) =>{
    return{
        words: state.word.words
    };
};

export default connect(mapStateToProps,{ getWord })(Word);