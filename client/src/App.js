import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import PrivateRoute from './component/utilts/PrivateRoute'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import queryString from "query-string";
import {loadUser, loginWith} from "./store/actions/authActions";
import {Header, Footer} from './component/layouts';
import Home from './component/pages/Home';
import About from './component/pages/About';
import Contact from './component/pages/Contact';
import WordsList from './component/pages/WordsList';
import DivideWords from './component/pages/DivideWords';

import './App.css';
import {connect} from "react-redux";
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#59beee',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

class App extends Component{
    state = {};
    static getDerivedStateFromProps(props, state) {
        var token = queryString.parse(window.location.search).token;
        if ((!props.auth.isAuthenticated) && (props.auth.isAuthenticated !== (state.auth && state.auth.isAuthenticated))){
            if (token) {
                props.loginWith(token);
            } else {
                console.log('loadUser: ', props.auth);
                props.loadUser();
            }
        } else {
            if (token){
                window.location =  localStorage.getItem('return-location');
            }
        }
        return {auth: props.auth};

    }

    render(){
        return (
            <BrowserRouter>
                <div className="App">
                    <MuiThemeProvider theme = {theme}>
                        <Header />
                        <Route exact path='/' component={Home}/>
                        <Route path='/Home' component={Home}/>
                        <Route path='/about' component={About}/>
                        <Route path='/contact us' component={Contact} />
                        <PrivateRoute path='/words List' component={WordsList} />
                        <PrivateRoute path='/divide words'  component={DivideWords} />
                        <Footer />
                    </MuiThemeProvider>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state)=>({
    auth: state.auth
});
export default connect(mapStateToProps, {loadUser, loginWith})(App);

