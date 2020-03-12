import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import queryString from "query-string";

import {loadUser, loginWith} from "./store/actions/authActions";
import store from "./store/store";
import {Header, Footer} from './component/layouts';
import Home from './component/pages/Home';
import About from './component/pages/About';
import Contact from './component/pages/Contact';
import WordsList from './component/pages/WordsList';
import DivideWords from './component/pages/DivideWords';

import './App.css';
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
    static getDerivedStateFromProps(){
        var token = queryString.parse(window.location.search).token;

        if(token){
            console.log(token);
            store.dispatch(loginWith(token));
            window.history.back();
        }
        else {
            store.dispatch(loadUser());
        }
        return null;
    }
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <MuiThemeProvider theme = {theme}>
                            <Header />
                            <Route exact path='/' component={Home}/>
                            <Route path='/Home' component={Home}/>
                            <Route path='/about' component={About}/>
                            <Route path='/contact us' component={Contact} />
                            <Route path='/words List' component={WordsList} />
                            <Route path='/divide words' component={DivideWords} />
                            <Footer />
                        </MuiThemeProvider>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;