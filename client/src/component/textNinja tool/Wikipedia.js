import React, {useEffect, useState, Fragment} from 'react';
import {Backdrop, Grid, Icon, FormControl, Select, Input, Container, Button,} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import PopModal from '../utilts/PopModal';
import {connect} from "react-redux";
import TextNinjaHOC from "./TextNinjaHOC";
import Alert from "@material-ui/lab/Alert/Alert";
import axios from "axios";
import TextNinjaTool from "./index";

const useStyles = makeStyles(theme => ({
    wrapper:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));

function Wikipedia(props) {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');

    const getInfo = () => {
        return new Promise(function(resolve, reject) {
            axios.get(`/api/word/wiki/${props.title}`)
                .then((res) => {
                    console.log(`/api/word/wiki/${props.title}: `,res.data.wiki.info);
                    resolve(res.data.wiki.info);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })

        });
    };

    const handleClick = () =>{
        setTitle(props.title);
        getInfo().then((info)=>{
            console.log('useEffect: ', info);
            setInfo(info);
        })
    };
    
    return (
        <PopModal
            title={title}>
            <span onClick={handleClick}>{'get info about  ' + props.title}</span>
                <Grid item md={12} className={classes.wrapper}>
                    {!info && <Alert severity="error">{`No information on ${title} !`}</Alert>}
                    <TextNinjaTool
                        onWordClick = {props.playFun}
                        chapterToSyllables = {props.chapterToSyllables}
                        markWord = {props.markWord}
                        markLineEvent = {props.markLineEvent}
                        fontSize = {props.fontSize}
                        outputClassName={''}
                    >
                    {info}
                    </TextNinjaTool>
                </Grid>
        </PopModal>
    );
}
const mapStateToProps = (state) => ({
    // error: state.error,
    words: state.word.words,
});
export default connect(mapStateToProps, null )(TextNinjaHOC(Wikipedia));