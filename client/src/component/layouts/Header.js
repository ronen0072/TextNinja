import React from 'react';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Drawer, Hidden, IconButton, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';


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
    }
}));

export default function Header() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };
    const sideList = (side) => {
        let iconsName = ['home', 'info', 'contact_mail'];
        return(
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
            >
                <List>
                    {['Home', 'About', 'Contact Us'].map((text, index) => (
                        <NavLink to={'/'+text} key={text}>
                            <ListItem button>
                                <ListItemIcon> <Icon>{iconsName[index]}</Icon> </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button key={'Login'}>
                        {/*<ListItemIcon> </ListItemIcon>*/}
                        <ListItemText primary={'Login'} />
                    </ListItem>
                </List>
            </div>
        );
    };
    return (
        <AppBar position="static" className={classes.nav}>
            <Toolbar>
                <Typography variant="h3" className={classes.title}>
                    <NavLink to='/' >TextNinja</NavLink>
                </Typography>
                <Hidden xsDown>
                    <NavLink to='/' ><Button className={classes.nuvLink} color="inherit">Home</Button></NavLink>
                    <NavLink to='/About' ><Button className={classes.nuvLink} color="inherit">About</Button></NavLink>
                    <NavLink to='/Contact Us' ><Button className={classes.nuvLink} color="inherit">Contact Us</Button></NavLink>
                </Hidden>
                <div className={classes.alignRight}>
                    <Hidden xsDown>
                        <Button className={classes.nuvLink} color="inherit">Login</Button>
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
