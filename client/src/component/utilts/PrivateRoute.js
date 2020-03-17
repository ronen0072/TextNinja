import React from "react";
import { Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

function PrivateRoute({auth,  component: Component = null, render: Render = null, ...rest }) {
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