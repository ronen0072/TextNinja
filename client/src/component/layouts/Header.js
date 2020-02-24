import React, {useState, useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Drawer,
    Hidden,
    IconButton,
    Typography,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Icon,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,


} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LoginAndSignUpModal from '../auth/LoginAndSignUpModal';
import Logout from "../auth/Logout";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#171717',
        color: '#ffffff'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {

    },
    alignRight:{
        marginLeft: 'auto'
    },
    nav: {
        backgroundColor: '#171717',
        color: '#ffffff'
    },
    nuvLink:{
        lineHeight: '2rem',
        paddingTop: '1.5rem'
    },
    paper: {
        marginRight: theme.spacing(2),
        backgroundColor: '#171717',
        color: '#ffffff',
        zDepth: '3'
    }
}));

function Header(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const anchorRef = useRef(null);

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const sideList = (side) => {
        let iconsName = ['home', 'info', 'contact_mail'];
        return(
            <div
                className={classes.list}
                role="presentation"

                //onKeyDown={toggleDrawer(side, false)}
            >
                <List>
                    {['Home', 'About', 'Contact Us'].map((text, index) => (
                        <NavLink to={'/'+text} key={text}  onClick={toggleDrawer(side, false)}>
                            <ListItem button>
                                <ListItemIcon> <Icon>{iconsName[index]}</Icon> </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Divider />
                <List>
                    {!props.auth.isAuthenticated?
                    <LoginAndSignUpModal>
                        <ListItem button key={'Login'} >
                            {/*<ListItemIcon> </ListItemIcon>*/}
                            <ListItemText primary={'Login'} />
                        </ListItem>
                    </LoginAndSignUpModal> :
                    <Logout>
                        <ListItem button key={'Logout'}  onClick={toggleDrawer(side, false)}>
                            {/*<ListItemIcon> </ListItemIcon>*/}
                            <ListItemText primary={'Logout'} />
                        </ListItem>
                    </Logout>
                    }
                </List>
            </div>
        );
    };
    const mdBar = () => {
        return(
            <Hidden xsDown>
                <NavLink to='/' ><Button className={classes.nuvLink} color="inherit">Home</Button></NavLink>
                <NavLink to='/About' ><Button className={classes.nuvLink} color="inherit">About</Button></NavLink>
                <NavLink to='/Contact Us' ><Button className={classes.nuvLink} color="inherit">Contact Us</Button></NavLink>

                <Button
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classes.nuvLink}
                        color="inherit">
                    practice
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper className={classes.paper}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}
                                    >


                                        <MenuItem onClick={handleClose}>  <NavLink to='/words list' >Words List</NavLink></MenuItem>
                                        <MenuItem onClick={handleClose}><NavLink to='/divide practice' >divide practice</NavLink></MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Hidden>
        )
    };


    return (
        <AppBar position="static" className={classes.nav}>
            <Toolbar>
                <Typography variant="h3" className={classes.title}>
                    <NavLink to='/' >TextNinja</NavLink>
                </Typography>
                {mdBar()}
                <div className={classes.alignRight}>
                    <Hidden xsDown>
                        {!props.auth.isAuthenticated? <LoginAndSignUpModal/> : <Logout/>}
                    </Hidden>
                    <Hidden smUp>
                        <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                            {sideList('left')}
                        </Drawer>
                    </Hidden>
                </div>
            </Toolbar>
        </AppBar>
    );
}
const mapStateToProps = (state)=>({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);