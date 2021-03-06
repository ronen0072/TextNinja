import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import PopModal from '../utilts/PopModal';
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
                        outputClassName={''}
                    >
                    {info}
                    </TextNinjaTool>
                </Grid>
        </PopModal>
    );
}
export default Wikipedia;