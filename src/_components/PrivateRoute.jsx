import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authenticationService } from "../_services"

export const PrivateRoute = (props) => {
    return authenticationService.checkAuthorization() ? (
            <Route exact={props.exact} path={props.path} component={props.component} />
        ) : ( 
            <Redirect to="/signin" />
        )
};
    
