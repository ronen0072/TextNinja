import React, {useState, useEffect, useRef} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SetSyllables from "./SetSyllables";
import Wikipedia from "./Wikipedia";
import Typography from '@material-ui/core/Typography';

const initialState = {
    mouseX: null,
    mouseY: null,
};

export default function WordMenu(props) {
    const [position, setPosition] = useState(initialState);
    const [open, setOpen] = useState(false);


    const ref = useRef();
    useEffect(()=>{
        const { error } = props;
        const prevProps = ref.current;
        ref.current = props;

        if(prevProps !== props){
            // Check for sign up error
            if(props.open){
                handleOpen();
            }
        }
    });
    const handleOpen = () => {
        setPosition(props.openPosition);
    };
    const handleClose = () => {
        setPosition(initialState);
        getWhatToSearch();
    };
    const getWhatToSearch = () => {
        let whatToSearch = window.getSelection().toString().replace(/\•/g, "");
        if(whatToSearch === '')
            whatToSearch = props.word;
        return whatToSearch;
    };
    return (
        <Menu
            keepMounted
            open={position.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                position.mouseY !== null && position.mouseX !== null
                    ? { top: position.mouseY, left: position.mouseX }
                    : undefined
            }
        >
            {(getWhatToSearch() === props.word) && <MenuItem onClick={handleClose}><SetSyllables word_id={props.word_id} word={props.word}/></MenuItem>}
            <MenuItem onClick={handleClose}><Wikipedia title={getWhatToSearch()}/></MenuItem>
        </Menu>
    );
}
