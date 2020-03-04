import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {LinearProgress, Button} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert/Alert";
import {makeStyles} from "@material-ui/core/styles";

var useStyles = makeStyles({
    customFileInput:{
        display: 'none'
    },
    uploadBtn:{
        marginRight: '10px'
    },
    inputUpload:{
        marginTop: '10px',
        marginBottom: '10px',
    },
    messageWrap:{
        marginTop: '-5px',
        height: '50px'
    },
    progressWrap:{
        marginTop: '5px',
        height: '10px'
    }
});
const FileUpload = (props) => {
    let classes = useStyles();
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [message, setMessage] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(-1);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = e => {
        e.preventDefault();
        if(file !== ''){
            const formData = new FormData();
            formData.append('file', file);
            console.log('formData: ',formData);
            try {
                axios.post('/api/get-file-content', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: progressEvent => {
                        setUploadPercentage(
                            parseInt(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            )
                        );

                        // Clear percentage
                        setTimeout(() => setUploadPercentage(-1), 10000);
                        setTimeout(() => setMessage(null), 10000);
                    }
                }).then((res)=>{
                    props.setInput(res.data.text);
                    setMessage({status: 200, msg: 'File Uploaded'});
                    setTimeout(() => setMessage(null), 10000);
                });
            } catch (err) {
                if (err.response.status === 500) {
                    setMessage({status: 500, msg: 'There was a problem with the server'});
                    setTimeout(() => setMessage(null), 10000);
                } else {
                    setMessage({status: 400, msg: err.response.data.msg});
                    setTimeout(() => setMessage(null), 10000);
                }
            }
        }
        else{
            setMessage({status: 400, msg: 'You must select a file!!!'});
            setTimeout(() => setMessage(null), 10000);
        }
    };

    return (
        <Fragment>
            <div className={classes.messageWrap}>
                {message? <Alert severity={message.status > 200? 'error' : 'success'}> {message.msg} </Alert> : null}
            </div>
            <form onSubmit={onSubmit}>
                <div className={classes.inputUpload}>
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        value='Upload'
                        className={classes.uploadBtn}
                    >
                        Upload
                    </Button>
                    <input
                        type='file'
                        className={classes.customFileInput}
                        id='customFile'
                        onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>

                </div>
                <div className={classes.progressWrap}>
                    {uploadPercentage > -1? <LinearProgress variant="determinate" value={uploadPercentage} /> : null}
                </div>
            </form>
        </Fragment>
    );
};

export default FileUpload;