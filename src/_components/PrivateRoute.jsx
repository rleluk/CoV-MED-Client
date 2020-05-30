import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authenticationService } from "../_services/authentication.service"

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        component = {props =>
            authenticationService.checkAuthorization() ? (
                <Component {...props} />
            ) : (
                <Redirect to ="/signin" />
        )}
    />
);