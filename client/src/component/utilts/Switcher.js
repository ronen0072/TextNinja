import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControlLabel, Grid, Switch} from "@material-ui/core";

const useStyles = makeStyles ({
    root:{
        display:'block',
        marginLeft: 'auto',
    },
    section:{
        padding: '10px 5%',
        borderTop:' 1px solid rgb(238, 238, 238)',
    },
    subTitle:{
        margin: '5px 0 5px 0',
    },
});

export default function Switcher(props) {
    const classes = useStyles();
    const [state, setState] = useState(false);
    useEffect(()=>{
        setState({
            switcherState: sessionStorage.getItem(props.name) === 'true'
        });
    }, [props.name]);
    
    const handleChange = () =>{
        setState({
            switcherState: !state.switcherState
        });
        props.onChange();
    };
    
    return (
        <Grid container className={classes.section}>
            <Grid item sx={props.sx} sm={props.sm} md={props.md}>
                {props.title? <h4 className={classes.subTitle}>{props.title + ': '} </h4> : ''}
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.checked}
                            onChange={handleChange}
                            value="checkedB"
                            color="primary"
                        />
                    }
                    labelPlacement="start"
                    label={props.label}
                />
            </Grid>
            {props.children}
        </Grid>
    )
}