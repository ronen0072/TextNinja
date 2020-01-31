
import React, {Component, Fragment} from 'react';
import {makeStyles} from "@material-ui/core/styles";
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

var useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%'
    },
    wrap:{
        height: '100%',
    }
});


class Word extends Component{
    state={
        word: "",
        syllables:"",
        numOfSyllables: 0,
        soundURL:"",
        display: ""

    };

    setSyllables(syllables) {
        this.setState({
            syllables: syllables,
            display: syllables
        });
    }
    setSoundURL(soundURL) {
        this.setState({
            setSoundURL: soundURL
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

        this.setSyllables(this.switchBack(syllables.toLowerCase()));
    }
    createSoundURL(data){
        this.setSoundURL(data.soundURL);
        console.log("data.soundURL:",data.soundURL);
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

    handleOnMouseOver = (e) => {
        if(this.state.syllables || this.state.syllables === ""){
            this.wordFactory();
            // this.setState({
            //     display: this.state.syllables
            // });
        }

    };

    handleOnBlur = (e) => {
        this.setState({
            display: this.state.word
        });
    };

    handleOnClick = (e) => {

    };
    render(){
        console.log('Word',this.state.word);
        return (
            <b onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnBlur} onClick={this.handleOnClick} >{this.state.display + " "}</b>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        words: state.word.words
    };
};

export default connect(mapStateToProps,{ getWord })(Word);