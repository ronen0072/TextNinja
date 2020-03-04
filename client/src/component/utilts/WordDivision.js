
import React, {Fragment, useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Separator from './Separator';

var useStyles = makeStyles({
    root: {

    },
    word:{
        display: 'block',
        fontSize: '40px',
        height: '50px',
        marginBottom: '20px'
    },
    Separator:{

    }
});

function WordDivision(props){
    let classes = useStyles();
    const [word, setWord] = React.useState([]);
    const [ArrayWord, setArrayWord] = React.useState([]);
    const [separators, setSeparators] = React.useState([]);
    const toggleSeparators = (index) =>{
        let newSeparators = separators;
        newSeparators[index] = !newSeparators[index];
        setSeparators(newSeparators);
        console.log(newSeparators);
        createSyllables();
    };
    const ref = useRef();
    useEffect(()=>{
        const prevProps = ref.current;
        ref.current = props;
        //console.log(props.word.split(''));
        if(prevProps !== props){
            // Check for sign up error
            if(props.word !== word){
                setWord(props.word);
                setArrayWord(props.word.split(''));
                let newSeparators = separators;
                newSeparators.fill(false);
                setSeparators(newSeparators);
                console.log(separators);
                props.onChange({count: 1, list:[props.word]});
            }

        }
    },[props, word, separators]);
    const createSyllables =  () => {
        let syllables = [];
        let lastSeparators = 0;
        let count = 1;
        for(let i = 0; i < word.length-1; i++){
            if(separators[i]){
                syllables.push(word.toString().substring(lastSeparators,i+1));
                lastSeparators = i+1;
                count++
            }
        }
        syllables.push(word.toString().substring(lastSeparators,word.length));
        props.onChange({count: count, list:syllables});
    };

    return(
        <div className={classes.word}>
            {ArrayWord.map((char, index)=>{
                return(
                    <Fragment key={index}>
                        {char}
                        {(index < ArrayWord.length -1)?<Separator onClick={toggleSeparators} index={index} key={word+index}/> : null}
                    </Fragment>
                )
            })}
        </div>
    )

}

export default WordDivision;