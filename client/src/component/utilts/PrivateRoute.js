import React, {Component, useState} from "react";
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import {connect} from "react-redux";

function PrivateRoute({auth: auth,  component: Component = null, render: Render = null, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => auth.isAuthenticated ?
                <Component {...props} /> :
                <Redirect
                    to={{
                        pathname: '/',
                    }}
                />
            }
        />
    );
};

const mapStateToProps = (state)=>({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);