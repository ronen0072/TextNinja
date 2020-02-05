
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
        classStyles: this.props.classOnOut,
        wordPadding: {}

    };
    wordPadding(){
        let amountOfSpace =  (this.state.numOfSyllables-1)*(this.props.fontSize)*0.1738;
        return {paddingLeft: amountOfSpace+'px',paddingRight:amountOfSpace+'px'};
    }
    setSyllables(syllables, numOfSyllables) {
        this.setState({
            syllables: syllables,
            numOfSyllables: numOfSyllables,
            display: syllables
        });
    }
    setSoundURL(soundURL) {
        this.setState({
            soundURL: soundURL
        });
    }

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
        console.log('createSyllables',data);
        for (var i = 0; i < data.syllables.count - 1; i++)
            syllables += data.syllables.list[i] + "*";
        syllables += data.syllables.list[data.syllables.count - 1];

        this.setSyllables(this.switchBack(syllables.toLowerCase()), data.syllables.count);
    }
    createSoundURL(data){
        this.setSoundURL(data.soundURL);
        console.log("createSoundURL: ",this.soundURL);
    }

    wordFactory(){
        let word = this.props.words[this.props.words.findIndex( (element) => element.wordID === this.state.word)];
        console.log('wordIndex',word);
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

    componentDidMount = ()=>{
        this.setState({
            word: this.props.children,
            display: this.props.children
        });
        console.log('componentDidMount',this.props.words[this.props.words.findIndex( (element) => element.wordID === this.state.word)]);
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.children !== this.state.word){
            this.setState({
                word: this.props.children,
                display: this.props.children
            });
        }
    }

    handleOnMouseOver = () => {
        if(!this.state.syllables || this.state.syllables === ""){
            this.wordFactory();
            this.setState({
                classStyles: this.props.classOnOver
            });
        }
        else{
            this.setState({
                display: this.state.syllables,
                classStyles: this.props.classOnOver,
                wordPadding: {}
            });
        }

    };

    handleOnBlur = () => {
        this.setState({
            display: this.state.word,
            classStyles: this.props.classOnOut,
            wordPadding: this.wordPadding()
        });
    };

    handleOnClick = () => {
        this.props.onWordClick(this.state.soundURL);
    };
    render(){
        console.log('Word',this.props.children);
        return (
            <b
                className={this.state.classStyles}
                onMouseOver={this.handleOnMouseOver}
                onMouseOut={this.handleOnBlur}
                onClick={() => this.props.onWordClick(this.state.soundURL)}
                style={this.state.wordPadding}
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